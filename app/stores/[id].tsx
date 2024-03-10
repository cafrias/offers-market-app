import { Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getStore } from "@/api/store";
import { useMemo } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type StoreParams = {
  id: string;
};

export default function StorePage() {
  const { id } = useLocalSearchParams<StoreParams>();

  const parsedId = useMemo(() => {
    if (!id) {
      throw new Error("Invalid store id");
    }

    const res = parseInt(id, 10);
    if (isNaN(res)) {
      throw new Error("Invalid store id");
    }
    return res;
  }, [id]);

  const store = useSuspenseQuery({
    queryKey: ["store", parsedId] as const,
    queryFn: ({ queryKey: [key, parsedId] }) => getStore(parsedId),
  });

  return (
    <View>
      <Stack.Screen options={{ title: store.data.Name }} />

      <Text>{store.data.Name}</Text>
      <Text>{store.data.Address}</Text>
      <Text>{store.data.Phone}</Text>
      <Text>{store.data.Email}</Text>
      <Text>{store.data.Website}</Text>

      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: store.data.Lat,
          longitude: store.data.Lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ height: 400, width: 400 }}
      >
        <Marker
          coordinate={{ latitude: store.data.Lat, longitude: store.data.Lng }}
        />
      </MapView>
    </View>
  );
}
