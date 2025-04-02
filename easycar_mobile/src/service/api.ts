import axios from "axios";
import { Alert } from "react-native";

export const api = axios.create({
  baseURL: "http://192.168.1.7:3001", //192.168.1.7 preciso desse ip pois o celular estar rodando na rede, nao localmente
  timeout: 15000, //10 segundos
});

export const handleError = (error: any) => {
  if (error.response.data) Alert.alert(error.response.data);
  else Alert.alert("Ocorreu um erro, Tente novamente mais tarde");
};
