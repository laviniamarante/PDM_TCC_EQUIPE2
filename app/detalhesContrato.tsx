import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetalhesContrato() {

  const { id } = useLocalSearchParams();

  return (
    <View>
        <Text> Detalhes do Contrato</Text>
    </View>
  );
}