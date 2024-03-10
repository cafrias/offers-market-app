import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function StorePage() {
  const { id } = useLocalSearchParams();
  return <Text>Store {id}</Text>;
}
