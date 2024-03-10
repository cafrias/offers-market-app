import { getLatestOffers } from "@/api/offer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { Text, StyleSheet, ScrollView, View, Pressable } from "react-native";

export default function Page() {
  const offers = useSuspenseQuery({
    queryKey: ["latestOffers"],
    queryFn: getLatestOffers,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: "Offers Market" }} />
      <Text style={styles.heading}>Latest offers</Text>
      {offers.data.items.map((offer) => (
        <View key={offer.Id} style={styles.card}>
          <Text>{offer.Name}</Text>
          <Link href={`/stores/${offer.StoreId}`}>{offer.StoreName}</Link>
          <Text style={styles.price}>{printPrice(offer.Price)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

function printPrice(price: number) {
  return `$${new Intl.NumberFormat().format(price / 100)}`;
}
