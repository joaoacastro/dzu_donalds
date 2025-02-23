import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";
import CarProductItem from "./cart-product-item";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="mb-2 border-b-2 border-b-red-400 pb-4 text-center">
            CARRINHO
          </SheetTitle>
          <SheetDescription className="pb-6">Seus itens:</SheetDescription>
        </SheetHeader>
        <div className="py-5">
          {products.map((product) => (
            <CarProductItem key={product.id} product={product} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
