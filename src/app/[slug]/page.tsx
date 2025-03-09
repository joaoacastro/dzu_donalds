import Image from "next/image";
import { notFound } from "next/navigation";

import ConsumptionMethodOption from "./components/consumption-method-option";
import { getRestaurantBySlug } from "./menu/actions/get-restaurant-by-slug";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug({ slug });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl}
          width={82}
          height={82}
          alt={restaurant.name}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
        <p>{restaurant?.description}</p>
      </div>
      <div className="space-y-2 pt-24 text-center">
        <div className="5rem rounded-3xl bg-amber-300 p-4">
          <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
          <p className="opacity-87">
            Escolha como prefere aproveitar sua refeição. Estamos aqui para
            oferecer praticidade e sabor em cada detalhe
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 pt-14">
        <ConsumptionMethodOption
          buttonText="Para comer aqui"
          imageAlt="Comer aqui"
          imageUrl="/dine_in.png"
          option="DINE_IN"
          slug={slug}
        />
        <ConsumptionMethodOption
          buttonText="Para Viagem"
          imageAlt="Viagem"
          imageUrl="/takeaway.png"
          option="TAKEAWAY"
          slug={slug}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
