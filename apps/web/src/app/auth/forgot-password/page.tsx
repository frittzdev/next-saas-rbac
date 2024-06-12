'use client'

import { Label } from '@radix-ui/react-label'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label>E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <Button type="submit" className="w-full">
        Recover password
      </Button>

      <Button variant="link" className="size:sm w-full" asChild>
        <Link href="/auth/sign-in">Sign in instead</Link>
      </Button>
    </form>
  )
}
