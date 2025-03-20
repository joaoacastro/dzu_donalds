// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { ConsumptionMethod } from "@prisma/client";
// import { Loader2Icon } from "lucide-react";
// import { useParams, useSearchParams } from "next/navigation";
// import { useContext, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { PatternFormat } from "react-number-format";
// import { toast } from "sonner";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
// } from "@/components/ui/drawer";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// import { createOrder } from "../actions/create-order";
// import { CartContext } from "../contexts/cart";
// import { isValidCpf } from "../helpers/cpf";

// const formSchema = z.object({
//   name: z.string().trim().min(1, {
//     message: "O nome é obrigatório.",
//   }),
//   cpf: z
//     .string()
//     .trim()
//     .min(1, {
//       message: "O CPF é obrigatório.",
//     })
//     .refine((value) => isValidCpf(value), {
//       message: "CPF Inválido",
//     }),
// });

// type FormSchema = z.infer<typeof formSchema>;

// interface FinishOrderDialogProps {
//   open: boolean; // Prop para controlar se está aberto ou não
//   onOpenChange: (open: boolean) => void; // Prop para controlar o fechamento
//   products: Array<{ id: string; quantity: number }>;
//   restaurantId: string;
//   consumptionMethod: ConsumptionMethod;
// }

// const FinishOrderDialog = ({
//   open,
//   onOpenChange,
//   products,
//   restaurantId,
//   consumptionMethod,
// }: FinishOrderDialogProps) => {
//   const { slug } = useParams<{ slug: string }>();
//   const { products } = useContext(CartContext);
//   const searchParams = useSearchParams();
//   const [isPending, startTransition] = useTransition();
//   const form = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       cpf: "",
//     },
//     shouldUnregister: true,
//   });

//   const onSubmit = async (data: FormSchema) => {
//     try {
//       const consumptionMethod = searchParams.get(
//         "consumptionMethod",
//       ) as ConsumptionMethod;
//       startTransition(async () => {
//         await createOrder({
//           consumptionMethod,
//           customerCpf: data.cpf,
//           customerName: data.name,
//           products,
//           slug,
//         });
//         onOpenChange(false); // Fechar o Drawer ao enviar o formulário)
//         toast.success("Pedido realizado com sucesso!");
//       });
//     } catch (error) {
//       console.log("Error creating order", error);
//     }
//     onOpenChange(false); // Fechar o Drawer ao enviar o formulário
//   };

//   return (
//     <Drawer open={open} onOpenChange={onOpenChange}>
//       {" "}
//       {/* Usando a prop "open" */}
//       <DrawerContent>
//         <DrawerHeader>
//           <DrawerTitle>Finalizar Pedido?</DrawerTitle>
//           <DrawerDescription>
//             Insira suas informações abaixo para finalizar o seu pedido.
//           </DrawerDescription>
//         </DrawerHeader>

//         <div className="p-5">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Nome:</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Digite seu nome..." {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="cpf"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>CPF:</FormLabel>
//                     <FormControl>
//                       <PatternFormat
//                         placeholder="Digite seu CPF..."
//                         format="###.###.###-##"
//                         customInput={Input}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <DrawerFooter>
//                 <Button
//                   type="submit"
//                   variant="destructive"
//                   className="rounded-full"
//                   disabled={isPending}
//                 >
//                   {isPending && <Loader2Icon className="animate-spin" />}
//                   Finalizar
//                 </Button>
//                 <DrawerClose asChild>
//                   <Button
//                     onClick={() => onOpenChange(false)}
//                     variant="outline"
//                     className="w-full rounded-full"
//                   >
//                     {" "}
//                     {/* Fechar ao clicar em Cancelar */}
//                     Cancel
//                   </Button>
//                 </DrawerClose>
//               </DrawerFooter>
//             </form>
//           </Form>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// };

// export default FinishOrderDialog;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createOrder } from "../actions/create-order";
import { CartContext } from "../contexts/cart";
import { isValidCpf } from "../helpers/cpf";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório",
    })
    .refine((value) => isValidCpf(value), {
      message: "Cpf inválido",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext) as {
    products: Array<{ id: string; quantity: number }>;
  };
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;
      startTransition(async () => {
        await createOrder({
          consumptionMethod,
          customerCpf: data.cpf,
          customerName: data.name,
          products,
          slug,
        });
        onOpenChange(false);
        toast.success("Pedido finalizado!");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button className="hidden" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar seu pedido.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <Button
                  variant="destructive"
                  className="w-full rounded-full"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending && <Loader2Icon className="animate-spin" />}
                  Finalizar
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full rounded-full">
                    Cancelar
                  </Button>
                </DrawerClose>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
