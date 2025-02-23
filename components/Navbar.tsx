'use client'
import React from 'react'
import { Moon,Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  SignedIn,
  UserButton
} from '@clerk/nextjs'
import Link from 'next/link'

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  )
}

const Navbar = () => {
  const {theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return (
    <nav className='flex justify-between items-center h-16 bg-violet-900 p-3'>
        <div className='font-bold tex-xl'>
            Uk-Pass
        </div>
        <ul className='flex gap-3 items-center'>
       
          <SignedIn>
          <UserButton>
          <UserButton.MenuItems>
          <UserButton.Link
            label="Home"
            labelIcon={<DotIcon />}
            href="/Home"
          />
          </UserButton.MenuItems>
          </UserButton>
          </SignedIn>
        <Button onClick={toggleTheme} variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <li>
        <Link href="/Home">Home</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
        </ul>
    </nav>
  )
}

export default Navbar
