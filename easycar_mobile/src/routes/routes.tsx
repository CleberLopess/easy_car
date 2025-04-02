import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../screens/home/home";
import { Passenger } from "../screens/passenger/passenger";
import { RoutesEnums } from "./routes.type";
import { Ride } from "../screens/ride/ride";
import { RideDetail } from "../screens/rideDetail/rideDetail";

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RoutesEnums.Home}>
        <Stack.Screen
          name={RoutesEnums.Home}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={RoutesEnums.Passenger}
          component={Passenger}
          options={{
            headerShadowVisible: false,
            headerTransparent: true,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name={RoutesEnums.Ride}
          component={Ride}
          options={{
            headerTitle: "Viagens Disponiveis",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name={RoutesEnums.RideDetail}
          component={RideDetail}
          options={{
            headerShadowVisible: false,
            headerTransparent: true,
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
