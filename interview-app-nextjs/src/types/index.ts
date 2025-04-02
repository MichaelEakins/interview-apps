export interface ShopItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}

export type KioskState = 'welcome' | 'shop' | 'checkout' | 'confirmation';
