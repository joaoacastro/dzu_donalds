"use server";

import { db } from "@/lib/prisma";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: string;
  restaurantId: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });
  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod,
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: input.customerCpf,
    },
  });
};
