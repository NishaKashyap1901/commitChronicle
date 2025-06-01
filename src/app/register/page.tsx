
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpenCheck, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = () => {
    // In a real app, this would involve API calls for registration
    console.log("Attempting to register user");
    // For now, simulate successful registration and redirect to login or dashboard
    router.push("/login"); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
             <BookOpenCheck className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join MyDevJournal to track your progress.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="Your Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="user@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" placeholder="••••••••" />
          </div>
          <Button
            className="w-full text-lg py-6 shadow-sm hover:shadow-md transition-shadow"
            onClick={handleRegister}
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Register
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Link href="/login" className="text-sm text-primary hover:underline">
            Already have an account? Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
