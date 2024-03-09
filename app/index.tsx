import { getLatestOffers } from "@/api/offer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Page() {
  const offers = useSuspenseQuery({
    queryKey: ["latestOffers"],
    queryFn: getLatestOffers,
  });
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }}>
      <Text>Latest offers</Text>
      {offers.data.items.map((offer) => (
        <Text key={offer.Id}>
          {offer.Name} - {offer.Price}
        </Text>
      ))}
    </View>
  );
}
