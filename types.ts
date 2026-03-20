export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  packSize: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type AddToCartFunction = (productNameOrPackSize: string, quantity: number) => string;

export interface VoiceAgentProps {
  onAddToCart: AddToCartFunction;
}
