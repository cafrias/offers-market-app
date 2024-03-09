import { API_URL } from "@/constants/config";

interface PagedResult<T> {
  items: T[];
  total: number;
}

interface Offer {
  Id: number;
  StoreId: number;
  BrandId: number;
  Quantity: number;
  Available: number;
  Name: string;
  Price: number;
  Picture: string;
  ExpirationDate: string;
  CreatedAt: string;
  UpdatedAt: string;
  StoreName: string;
  BrandName: string;
}

export async function getLatestOffers(): Promise<PagedResult<Offer>> {
  return fetch(`${API_URL}/offers`).then((response) => response.json());
}
