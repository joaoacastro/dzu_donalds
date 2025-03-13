"use server";

import { ConsumptionMethod } from "@prisma/client";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    price: number;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {

    try {
      const restaurant = await db.restaurant.findUnique({
        where: {
          slug: input.slug,
        }
      })
      if (!restaurant){
        throw new Error("Restaurant not found");
      }

      const productsWithPrices = await db.product.findMany({
        where: {
          id: {
            in: input.products.map((product) => product.id),
          },
        },
      });
    
      if (productsWithPrices.length !== input.products.length) {
        throw new Error("Some products were not found");
      }
    
      const productsWithPricesAndQuantities = input.products.map((product) => ({
        productId: product.id,
        quantity: product.price,
        price: productsWithPrices.find((p) => p.id === product.id)!.price,
      }));
    
      await db.order.create({
        data: {
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
          consumptionMethod: input.consumptionMethod,
          restaurantId: restaurant.id,
        },
      });
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; // Re-throw the error to be handled elsewhere
    }

};
