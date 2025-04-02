import { Text, TouchableOpacity } from "react-native";
import { styles } from "./myButton.styles";

type Props = {
  label: string;
  onClick?: () => void;
  theme?: "yellow" | "red";
};

export const MyButton = ({ label, theme = "yellow", onClick }: Props) => {
  return (
    <TouchableOpacity
      style={theme === "yellow" ? styles.buttonYellow : styles.buttonRed}
      onPress={onClick}
    >
      <Text style={theme === "yellow" ? styles.textDark : styles.textLight}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
