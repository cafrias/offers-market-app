import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

export interface PaginationControlsProps {
	onPrev: () => void;
	onNext: () => void;
	total: number;
	current: number;
}

export function PaginationControls({
	onPrev,
	onNext,
	total,
	current,
}: PaginationControlsProps) {
	const prevPageBtn = useMemo(() => {
		if (current === 1) {
			return null;
		}

		return (
			<Pressable role="button" onPress={onPrev}>
				<Text>Previous page</Text>
			</Pressable>
		);
	}, [current, onPrev]);

	const nextPageBtn = useMemo(() => {
		if (current >= total) {
			return null;
		}

		return (
			<Pressable role="button" onPress={onNext}>
				<Text>Next page</Text>
			</Pressable>
		);
	}, [current, total]);

	return (
		<View>
			{prevPageBtn}
			<Text>
				Page {current} of {total}
			</Text>
			{nextPageBtn}
		</View>
	);
}
