import { AddCard } from "@/components/AddCard"
import { AddPassword } from "@/components/AddPassword"
import { YourCards } from "@/components/YourCards"
import { YourPasswords } from "@/components/YourPasswords"
import { Metadata } from "next"
import { currentUser } from "@clerk/nextjs/server"
import React from "react"; 

export const metadata: Metadata = {
  title: 'Home',
  description: 'This is homepage',
}
export default async function Home() {
  const user = await currentUser()
 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-primary">Password Manager</h1>
      <div className="grid gap-8">
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Add Card</h2>
            <AddCard />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mt-6 md:mt-0 mb-4 text-primary">Add Password</h2>
            <AddPassword />
          </div>
        </section>
        <section className="grid md:grid-cols-2 gap-8 my-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Your Cards</h2>
            <YourCards cards={Array.isArray(user?.privateMetadata.cards)?user?.privateMetadata.cards:[]}/>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Your Passwords</h2>
            <YourPasswords passwords={Array.isArray(user?.privateMetadata.passwords)?user?.privateMetadata.passwords:[]}/>
          </div>
        </section>
      </div>
    </div>
  )
}

