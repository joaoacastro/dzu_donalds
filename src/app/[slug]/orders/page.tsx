import { isValidCpf } from "../menu/helpers/cpf";
import CpfForm from "./components/cpf-form";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;
  if (!cpf || !isValidCpf(cpf)) {
    return <CpfForm />;
  }
  return <h1>Orders Page!</h1>;
};

export default OrdersPage;
