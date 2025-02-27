"use client"

import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CarProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="mb-2 border-b-2 border-b-red-400 pb-4 text-center">
              CARRINHO
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-[95%] flex-col py-5">
            <div className="flex-auto">
              {products.map((product) => (
                <CarProductItem key={product.id} product={product} />
              ))}
            </div>
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-sm font-semibold">{formatCurrency(total)}</p>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full rounded-full" onClick={() => setFinishOrderDialogIsOpen(true)}>Finalizar Pedido</Button>
          </div>
        </SheetContent>
      </Sheet>
        {/* Renderizando o componente FinishOrderDialog */}
        {finishOrderDialogIsOpen && (
          <FinishOrderDialog
            open={finishOrderDialogIsOpen}
            onOpenChange={setFinishOrderDialogIsOpen}
          />
        )}
    </>
  );
};

export default CartSheet;
