import { Image, ImageBackground, Text, TouchableOpacity } from "react-native";
import icons from "../../constants/icons";
import { styles } from "./home.style";
import { RoutesEnums } from "../../routes/routes.type";

type Props = {
  navigation: any;
};

export function Home({ navigation }: Props) {
  const OpenPassenger = () => {
    navigation.navigate(RoutesEnums.Passenger);
  };

  const OpenRide = () => {
    navigation.navigate(RoutesEnums.Ride);
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={icons.background}
    >
      <Image style={styles.logo} source={icons.logo} />

      <TouchableOpacity style={styles.button} onPress={OpenPassenger}>
        <Image style={styles.image} source={icons.passenger} />
        <Text style={styles.title}>Passageiro</Text>
        <Text style={styles.description}>Encontre uma carona para voce</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={OpenRide}>
        <Image style={styles.image} source={icons.driver} />
        <Text style={styles.title}>Motorista</Text>
        <Text style={styles.description}>Ofereça carona em seu carro</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
