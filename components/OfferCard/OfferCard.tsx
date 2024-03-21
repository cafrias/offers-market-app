import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";

import { Link } from "../Link/Link";

import { Offer } from "@/api/offer";

export interface OfferCardProps {
	offer: Offer;
}

export function OfferCard({ offer }: OfferCardProps) {
	return (
		<View style={styles.card}>
			<View style={{ flexDirection: "row" }}>
				<Image source={{ uri: offer.Picture }} style={styles.image} />

				<View style={{ flexWrap: "wrap", flex: 1 }}>
					<View style={{ flex: 1 }}>
						<Text style={styles.title}>{offer.Name}</Text>
					</View>
					<Link href={`/stores/${offer.StoreId}`}>{offer.StoreName}</Link>
					<Text style={styles.price}>{printPrice(offer.Price)}</Text>
				</View>
			</View>
		</View>
	);
}

const borderWidth = 1;
const cardHeight = 120;

const styles = StyleSheet.create({
	card: {
		margin: 16,
		marginBottom: 0,
		borderStyle: "solid",
		borderColor: "black",
		borderWidth,
		padding: 0,
		height: cardHeight,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		flexShrink: 1,
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
	},
	image: {
		width: "25%",
		height: cardHeight - borderWidth * 2,
		resizeMode: "cover",
		marginRight: 6,
	},
});

function printPrice(price: number) {
	return `$${new Intl.NumberFormat().format(price / 100)}`;
}
