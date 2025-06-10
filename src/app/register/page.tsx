
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpenCheck, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface RegisteredUser {
  name: string;
  email: string;
  password?: string; // Password should not ideally be stored, but for this simulation it is.
}

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      const existingUsersString = localStorage.getItem('commitChronicleRegisteredUsers');
      const existingUsers: RegisteredUser[] = existingUsersString ? JSON.parse(existingUsersString) : [];

      if (existingUsers.find(user => user.email === email)) {
        toast({
          title: "Registration Failed",
          description: "This email is already registered.",
          variant: "destructive",
        });
        return;
      }

      const newUser: RegisteredUser = { name, email, password }; // Storing password for simulation
      existingUsers.push(newUser);
      localStorage.setItem('commitChronicleRegisteredUsers', JSON.stringify(existingUsers));

      toast({
        title: "Registration Successful!",
        description: "You can now log in with your new account.",
      });
      router.push("/login");
    } catch (error) {
      console.error("Error during registration (localStorage):", error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred during registration.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
             <BookOpenCheck className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Create Commit Chronicle Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join Commit Chronicle to track your progress.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="user@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
