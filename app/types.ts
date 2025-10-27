
export type GroceryItem = {
  id: number;
  name: string;
  section: string;
  price: number;
  weight: number;
};
export type SortConfig = {
  key: "price" | "weight" | null;
  direction: "asc" | "desc";
};