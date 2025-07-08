import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Header() {
  return (
    <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome to your dashboard. Here's an overview of your components.</p>
    </div>
  )
}
