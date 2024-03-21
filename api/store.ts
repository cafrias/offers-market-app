import { API_URL } from "@/constants/config";

export interface GetStoreResult {
	Id: number;
	Name: string;
	Address?: string;
	Lat: number;
	Lng: number;
	Website?: string;
	Phone?: string;
	Email?: string;
}

export function getStore(id: number): Promise<GetStoreResult> {
	return fetch(`${API_URL}/store/${id}`).then((response) => response.json());
}
