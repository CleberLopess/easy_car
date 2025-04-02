import { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";
import { MyButton } from "../../components/myButton/myButton";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./passenger.styles";
import icons from "../../constants/icons";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { api, handleError } from "../../service/api";
import { CurrentDate } from "../../utils/date";
import { responseRidesType } from "../../service/types/ride.type";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  navigation: any;
};

export function Passenger({ navigation }: Props) {
  const userId = 1; //id do usuario(vem do login)
  const [myLocation, setMyLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [footerTitle, setFooterTitle] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [rideStatus, setRideStatus] = useState("");
  const [rideId, setRideId] = useState(0);
  const [driverName, setDriverName] = useState("");

  const RequestPermissionAndGetLocation = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    const currentLocation = await getCurrentPositionAsync();

    if (granted && currentLocation.coords) {
      return {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
    }

    return {};
  };

  const RequestRideFromUser = async () => {
    try {
      const response: responseRidesType = await api.get("/rides", {
        params: {
          passenger_user_id: userId,
          pickup_date: CurrentDate({ format: "YYYY-MM-DD" }),
          status_not: "finished",
        },
      });

      if (response.data[0]) return response.data[0];
    } catch (error) {
      handleError(error);
      navigation.goBack();
    }
  };

  const RequestAddressName = async (location: {
    latitude: number;
    longitude: number;
  }) => {
    //buscar o nome do endereço
    const response = await reverseGeocodeAsync(location);

    if (
      response[0].street &&
      response[0].streetNumber &&
      response[0].district
    ) {
      setPickupAddress(
        `${response[0].street}, ${response[0].streetNumber} - ${response[0].district}`
      );
    }
  };

  const AskForRide = async () => {
    //solicitar uma corrida
    try {
      const json = {
        passenger_user_id: userId,
        pickup_address: pickupAddress,
        dropoff_address: dropoffAddress,
        pickup_latitude: myLocation.latitude,
        pickup_longitude: myLocation.longitude,
      };

      const response: responseRidesType = await api.post("/rides", json);

      if (response.data) {
        Alert.alert("Corrida solicitada com sucesso");
        navigation.goBack();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const CancelRide = async () => {
    //cancelar uma corrida
    try {
      const response: responseRidesType = await api.delete("/rides/" + rideId);

      if (response.data) {
        Alert.alert("Corrida cancelada com sucesso");
        navigation.goBack();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const FinishRide = async () => {
    //finalizar uma corrida
    try {
      const response: responseRidesType = await api.put(
        "/rides/" + rideId + "/finish",
        { passenger_user_id: userId }
      );

      if (response.data) {
        Alert.alert("Corrida cancelada com sucesso");
        navigation.goBack();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const LoadScreen = async () => {
    //buscar dados de corrida aberta na API para o usuario
    const response = await RequestRideFromUser();
    const location = await RequestPermissionAndGetLocation();

    if (!response?.ride_id && location.latitude) {
      setFooterTitle("Encontre a sua carona");
      setMyLocation(location);
      RequestAddressName(location);

      return;
    }

    setFooterTitle(
      response?.status === "pending"
        ? "Aguardando carona..."
        : "Carona confirmada"
    );
    setMyLocation({
      latitude: Number(response!.pickup_latitude),
      longitude: Number(response!.pickup_longitude),
    });

    setPickupAddress(response!.pickup_address);
    setDropoffAddress(response!.dropoff_address);
    setRideStatus(response!.status);
    setRideId(response!.ride_id);
    setDriverName(response!.driver_name + " - " + response!.driver_phone);
  };

  useFocusEffect(
    useCallback(() => {
      LoadScreen();
    }, [])
  );

  return (
    <View style={styles.container}>
      {myLocation.latitude ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              ...myLocation,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={myLocation}
              title="Minha localização"
              description="Av. Paulista, 1000"
              image={icons.location}
            />
          </MapView>

          <View style={styles.footer}>
            <Text style={styles.footerTitle}>{footerTitle}</Text>
            <View style={styles.footerField}>
              <Text style={styles.text}>Origem</Text>
              <TextInput
                style={styles.input}
                value={pickupAddress}
                editable={rideStatus !== "" && false}
                onChangeText={setPickupAddress}
              />
            </View>
            <View style={styles.footerField}>
              <Text style={styles.text}>Destino</Text>
              <TextInput
                style={styles.input}
                value={dropoffAddress}
                editable={rideStatus === "" && true}
                onChangeText={setDropoffAddress}
              />
            </View>
            {rideStatus === "accepted" && (
              <View style={styles.footerField}>
                <Text style={styles.text}>Motorista</Text>
                <TextInput
                  style={styles.input}
                  value={driverName}
                  editable={false}
                />
              </View>
            )}
          </View>

          {rideStatus === "" && (
            <MyButton label="confirmar" onClick={AskForRide} />
          )}
          {rideStatus === "pending" && (
            <MyButton label="cancelar" onClick={CancelRide} theme="red" />
          )}
          {rideStatus === "accepted" && (
            <MyButton
              label="finalizar carona"
              onClick={FinishRide}
              theme="red"
            />
          )}
        </>
      ) : (
        <View>
          <ActivityIndicator style={styles.loading} size="large" />
        </View>
      )}
    </View>
  );
}
