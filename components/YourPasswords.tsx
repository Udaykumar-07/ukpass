'use client'
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface Password{
  website:string,
  username:string,
  password:string
}

export function YourPasswords({passwords}:{passwords:Password[]}) {
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([])

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => (prev.includes(id) ? prev.filter((passId) => passId !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4 h-full">
      {passwords.length<=0 && <span className="text-muted-foreground">No passwords added</span>}
      {passwords.map((passwords:Password,index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle><Link href={passwords.website} target="_blank" className="text-blue-700 underline">{passwords.website}</Link></CardTitle>
            <CardDescription>{passwords.username}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-sm">Password: {visiblePasswords.includes(index) ? passwords.password : "••••••••"}</p>
            <Button variant="ghost" size="icon" onClick={() => togglePasswordVisibility(index)}>
              {visiblePasswords.includes(index) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

