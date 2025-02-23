"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
Form,
FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast"
import { addPasswordServer } from "@/actions/actions"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  website: z.string().url({
    message: "Please enter a valid website URL.",
  }),

  username: z.string().min(3, {
    message: "Username must be at least 3 characters long.",
  }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "Password must include at least one letter, one number, and one special character.",
  }),
});

export function AddPassword() {
  const {user,isLoaded} = useUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      username : "",
      password : ""
      },
      })
      
      async function onSubmit(values: z.infer<typeof formSchema>) {
        
    if(!isLoaded || !user){
      toast.error("User not found. Please log in.")
      return
    }
    
    if(user){
      addPasswordServer(values.website, values.username, values.password, user?.id)
      toast.success("Password added")
      form.reset()
      router.refresh()
    }

  }




  return (
    <Card className="w-full h-fit md:h-full pb-14 md:pb-0 flex flex-col">
      <CardHeader>
        <CardTitle>Add New Password</CardTitle>
      </CardHeader>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-5">
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Website" {...field} />
              </FormControl>
              <FormDescription>
                This is your Website.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your Username.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Password" {...field} />
              </FormControl>
              <FormDescription>
                This is your Password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form> 
    </Card>
  )
}

