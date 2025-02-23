"use server"
import { clerkClient } from "@clerk/nextjs/server"; 


interface Card {
  cardNo: string;
  CVV: number;
  expiry: string;
}

interface Password{
  website:string,
  username:string,
  password:string
}
const client = await clerkClient()

export async function addCardServer(
  cardNo: string,
  CVV: number,
  expiry: string,
  userId: string
) {
  const user = await client.users.getUser(userId)
  let cards: Card[] = []
  if(Array.isArray(user.privateMetadata.cards)){
    cards = user.privateMetadata.cards || []
  cards.push({cardNo, expiry , CVV})

  await client.users.updateUserMetadata(userId,{
    privateMetadata:{
      cards: cards
    }
  })
}
else{
  await client.users.updateUserMetadata(userId,{
    privateMetadata:{
      cards: [{cardNo,CVV,expiry}] 
    }
  })
}

}
  
export async function addPasswordServer(
  website:string,
  username:string,
  password:string,
  userId: string
) {
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  let passwords: Password[] = []
  if(Array.isArray(user.privateMetadata.passwords)){
    passwords = user.privateMetadata.passwords || []
    passwords.push({website, username , password})
  await client.users.updateUserMetadata(userId,{
    privateMetadata:{
      passwords : passwords
    }
  })
}
else{
  await client.users.updateUserMetadata(userId,{
    privateMetadata:{
      passwords : [{website, username , password}]
    }
  })
}
}

 
