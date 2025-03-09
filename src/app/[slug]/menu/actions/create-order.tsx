"use server";

import { ConsumptionMethod } from "@prisma/client";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  restaurantId: string;
}

export const createOrder = async (input: CreateOrderInput) => {
    try {
      const productsWithPrices = await db.product.findMany({
        where: {
          id: {
            in: input.products.map((product) => product.id),
          },
        },
      });
    
      const productsWithPricesAndQuantities = input.products.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        price: productsWithPrices.find((p) => p.id === product.id)!.price,
      }));
    
      await db.order.create({
        data: {
          consumptionMethod: input.consumptionMethod,
          restaurantsId: input.restaurantId,
          status: "PENDING", // Assuming you have a status enum in your Prisma schema
          customerName: input.customerName,
          CustomerCpf: removeCpfPunctuation(input.customerCpf),
          orderProducts: {
            createMany: {
              data: productsWithPricesAndQuantities,
            },
          },
          total: productsWithPricesAndQuantities.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0,
          ),
        },
      });
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; // Re-throw the error to be handled elsewhere
    }

};
