import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react";

interface Cardprops {
      cardNo:string,
      expiry:string,
      CVV:number
} 

export function YourCards({cards}:{cards:Cardprops[]}) {
  return (
    <div className="space-y-4 h-full ">
      {cards.length<=0 && <span className="text-muted-foreground">No cards added</span>}
      {cards.map((card: Cardprops) => (
        <Card key={card.cardNo} className="w-full">
          <CardHeader>
            <CardTitle>CardNo: {card.cardNo}</CardTitle>
            <CardDescription>CVV: {card.CVV}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Expires: {card.expiry}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

