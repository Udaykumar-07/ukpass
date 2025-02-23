import type React from "react"
import { Button } from "@/components/ui/button"
import { Shield, Key, Lock } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to UKPass</h1>
      <p className="text-xl mb-8 max-w-2xl">Your secure, easy-to-use password manager for all your UK-based needs.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Shield className="w-12 h-12 mb-4" />}
          title="Bank-Level Security"
          description="Your passwords are encrypted with state-of-the-art technology."
        />
        <FeatureCard
          icon={<Key className="w-12 h-12 mb-4" />}
          title="Easy Access"
          description="Access your passwords securely from any device, anytime."
        />
        <FeatureCard
          icon={<Lock className="w-12 h-12 mb-4" />}
          title="UK Compliance"
          description="Fully compliant with UK data protection regulations."
        />
      </div>
      <Link href='/sign-in'>
      <Button size="lg" className="text-lg px-8 py-6">
       Get Started
      </Button></Link>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-sm">
      {icon}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

