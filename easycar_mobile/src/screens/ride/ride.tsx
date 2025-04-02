import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import { styles } from "./ride.styles";
import icons from "../../constants/icons";
import { RoutesEnums } from "../../routes/routes.type";
import { useCallback, useEffect, useState } from "react";
import { responseRidesType } from "../../service/types/ride.type";
import { api, handleError } from "../../service/api";
import { CurrentDate } from "../../utils/date";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  navigation: any;
};

export function Ride({ navigation }: Props) {
  const userId = 2; //id do usuario(vem do login)
  const [rides, setRides] = useState<any>();

  const OpenRideDetail = (id: number) => {
    navigation.navigate(RoutesEnums.RideDetail, { id, userId });
  };

  const RequestRides = async () => {
    //buscar dados de corrida aberta na API
    try {
      const response: responseRidesType = await api.get(
        "/rides/drivers/" + userId
      );

      if (response.data[0]) setRides(response.data);
    } catch (error) {
      handleError(error);
      navigation.goBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      RequestRides();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        keyExtractor={(ride) => ride.ride_id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ride}
            onPress={() => OpenRideDetail(item.ride_id)}
          >
            <View style={styles.containerName}>
              {item.driver_user_id == userId && (
                <Image style={styles.icon} source={icons.car} />
              )}
              <Text style={styles.name}>{item.passenger_name}</Text>
            </View>
            <Text style={styles.address}>Origem: {item.pickup_address}</Text>
            <Text style={styles.address}>Destino: {item.dropoff_address}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
