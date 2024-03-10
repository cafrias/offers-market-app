import { getLatestOffers } from "@/api/offer";
import { useDebounce } from "@/utils/useDebounce";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Pressable,
} from "react-native";

export default function Page() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);

  const offers = useSuspenseQuery({
    queryKey: ["latestOffers", debouncedSearch, page] as const,
    queryFn: ({ queryKey: [key, search, page] }) =>
      getLatestOffers({ search, page }),
  });

  const prevPageBtn = useMemo(() => {
    if (page === 1) {
      return null;
    }

    return (
      <Pressable onPress={() => setPage(page - 1)}>
        <Text>Previous page</Text>
      </Pressable>
    );
  }, [page]);

  const nextPageBtn = useMemo(() => {
    if (page >= offers.data.total) {
      return null;
    }

    return (
      <Pressable onPress={() => setPage(page + 1)}>
        <Text>Next page</Text>
      </Pressable>
    );
  }, [page, offers.data.total]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: "Offers Market" }} />
      <TextInput value={search} onChangeText={setSearch} />
      <Text style={styles.heading}>Latest offers</Text>
      {offers.data.items.map((offer) => (
        <View key={offer.Id} style={styles.card}>
          <Text>{offer.Name}</Text>
          <Link href={`/stores/${offer.StoreId}`}>{offer.StoreName}</Link>
          <Text style={styles.price}>{printPrice(offer.Price)}</Text>
        </View>
      ))}
      <View>
        {prevPageBtn}
        <Text>
          Page {page} of {offers.data.total}
        </Text>
        {nextPageBtn}
      </View>
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
