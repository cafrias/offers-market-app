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

type GetLatestOffersParams = {
  search?: string;
};

export async function getLatestOffers({
  search,
}: GetLatestOffersParams): Promise<PagedResult<Offer>> {
  const params = new URLSearchParams();
  if (search) {
    params.set("q", search);
  }

  return fetch(`${API_URL}/offers?${params.toString()}`).then((response) =>
    response.json()
  );
}
