import { useCallback, useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { MyButton } from "../../components/myButton/myButton";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./rideDetail.styles";
import icons from "../../constants/icons";
import { rideType, responseRideType } from "../../service/types/ride.type";
import { api, handleError } from "../../service/api";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  route: any;
  navigation: any;
};

export function RideDetail({ route, navigation }: Props) {
  const rideId = route.params.id;
  const userId = route.params.userId;
  const [footerTitle, setFooterTitle] = useState("");
  const [ride, setRide] = useState<rideType>();

  const RequestRideDetail = async () => {
    //buscar dados de corrida aberta na API para o usuario
    try {
      const response: responseRideType = await api.get("/rides/" + rideId);

      if (response.data) {
        setFooterTitle(
          response.data.passenger_name + " - " + response.data.passenger_phone
        );
        setRide(response.data);
      }
    } catch (error) {
      handleError(error);
      navigation.goBack();
    }
  };

  const AcceptedRide = async () => {
    //aceitar corrida
    try {
      const json = {
        driver_user_id: userId,
      };

      const response: responseRideType = await api.put(
        "/rides/" + rideId + "/accept",
        json
      );

      if (response.data) {
        Alert.alert("Corrida aceita com sucesso");
        navigation.goBack();
      }
    } catch (error) {
      handleError(error);
      navigation.goBack();
    }
  };

  const FinishRide = async () => {
    try {
      const json = {
        driver_user_id: userId,
      };

      const response: responseRideType = await api.put(
        "/rides/" + rideId + "/cancel",
        json
      );

      if (response.data) {
        Alert.alert("Corrida finalizada com sucesso");
        navigation.goBack();
      }
    } catch (error) {
      handleError(error);
      navigation.goBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      RequestRideDetail();
    }, [])
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: Number(ride?.pickup_latitude),
          longitude: Number(ride?.pickup_longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: Number(ride?.pickup_latitude),
            longitude: Number(ride?.pickup_longitude),
          }}
          title="Localização final"
          description={ride?.dropoff_address}
          image={icons.location}
        />
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>{footerTitle}</Text>
        <View style={styles.footerField}>
          <Text style={styles.text}>Origem</Text>
          <TextInput
            style={styles.input}
            value={ride?.pickup_address}
            editable={false}
          />
        </View>
        <View style={styles.footerField}>
          <Text style={styles.text}>Destino</Text>
          <TextInput
            style={styles.input}
            value={ride?.dropoff_address}
            editable={false}
          />
        </View>
      </View>
      {ride?.status === "pending" && (
        <MyButton label="Aceitar carona" onClick={AcceptedRide} />
      )}
      {ride?.status === "accepted" && (
        <MyButton label="Finalizar carona" theme="red" onClick={FinishRide} />
      )}
    </View>
  );
}
