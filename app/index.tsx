import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useCallback, useState } from "react";
import { Text, StyleSheet, ScrollView, TextInput } from "react-native";

import { getLatestOffers } from "@/api/offer";
import { OfferCard } from "@/components/OfferCard/OfferCard";
import { PaginationControls } from "@/components/PaginationControls/PaginationControls";
import { useDebounce } from "@/utils/useDebounce";

export default function Page() {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 500);
	const [page, setPage] = useState(1);

	const offers = useSuspenseQuery({
		queryKey: ["latestOffers", debouncedSearch, page] as const,
		queryFn: ({ queryKey: [_, search, page] }) =>
			getLatestOffers({ search, page }),
	});
	const { total } = offers.data;

	const onPrev = useCallback(() => {
		if (page > 1) {
			setPage((prev) => prev - 1);
		}
	}, [page]);

	const onNext = useCallback(() => {
		if (page < total) {
			setPage((prev) => prev + 1);
		}
	}, [page, total]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Stack.Screen options={{ title: "Offers Market" }} />
			<TextInput value={search} onChangeText={setSearch} />
			<Text style={styles.heading}>Latest offers</Text>
			{offers.data.items.map((offer) => {
				return <OfferCard key={offer.Id} offer={offer} />;
			})}
			<PaginationControls
				onPrev={onPrev}
				onNext={onNext}
				total={total}
				current={page}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 16,
		paddingBottom: 16,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
	},
});
