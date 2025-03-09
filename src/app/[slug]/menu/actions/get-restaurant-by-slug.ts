import { db } from "@/lib/prisma";

interface GetRestaurantBySlugProps {
  slug: string;
}

export async function getRestaurantBySlug(props: GetRestaurantBySlugProps) {
    console.log("getRestaurantBySlug started, slug:", props.slug);
  try {
    const restaurant = await db.restaurant.findUnique({
      where: { slug: props.slug },
      include: {
        menuCategories: {
          include: { products: true },
        },
      },
    });
        console.log("Restaurant:", restaurant);
    return restaurant;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    throw error;
  }
}
