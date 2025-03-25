import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "./actions/get-restaurant-by-slug";
import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

// interface RestaurantMenuPageProps {
//   params: { slug: string }; // ⬅️ Removido o Promise<>
//   searchParams: { consumptionMethod: string };
// }

// export interface PageProps {
//   params: { slug: string };
//   searchParams?: { consumptionMethod?: string };
// }

export interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Record<string, unknown>;
}

export async function generateStaticParams() {
  return [{ slug: "algum-slug" }, { slug: "outro-slug" }];
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: PageProps) => {
  console.log("RestaurantMenuPage started");

  const { slug } = await params; // ✅ Pegando o slug corretamente
  console.log("Slug:", slug);

  const { consumptionMethod } = searchParams || {};
  console.log("ConsumptionMethod:", consumptionMethod);

  if (!isConsumptionMethodValid(String(consumptionMethod || ""))) {
    console.log("Invalid consumption method");
    return notFound();
  }

  try {
    console.log("getRestaurantBySlug call");
    const restaurant = await getRestaurantBySlug({ slug });
    console.log("Restaurant:", restaurant);

    if (!restaurant) {
      console.log("Restaurant not found");
      return notFound();
    }

    return (
      <div>
        <RestaurantHeader restaurant={restaurant} />
        <RestaurantCategories restaurant={restaurant} />
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return notFound();
  }
};

export default RestaurantMenuPage;
