"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addCardServer } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  cardNumber: z
    .string()
    .min(13, { message: "Card number must be at least 13 digits." })
    .max(19, { message: "Card number must be at most 19 digits." })
    .regex(/^\d+$/, { message: "Card number must contain only digits." }),

  CVV: z
    .string()
    .min(3, { message: "CVV must be at least 3 digits." })
    .max(4, { message: "CVV must be at most 4 digits." })
    .regex(/^\d+$/, { message: "CVV must contain only numbers." }),

  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be in MM/YY format." }),
});

export function AddCard() {
  const { user, isLoaded } = useUser();
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      CVV: "",
      expiryDate: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded || !user) {
      toast.error("User not found. Please log in.");
      return;
    }
   
    if(user){

      addCardServer(values.cardNumber, Number(values.CVV), values.expiryDate, user?.id)
      }
      toast.success("Card Added")
      form.reset()
      router.refresh()
  }
  

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Add New Card</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-5">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Card Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="CVV"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your CVV"
                    {...field}
                    maxLength={4}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); 
                      field.onChange(value); 
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

         
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date (MM/YY)</FormLabel>
                <FormControl>
                  <Input placeholder="MM/YY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Submit"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
