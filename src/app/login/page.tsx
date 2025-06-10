
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpenCheck, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useToast } from "@/hooks/use-toast";

interface RegisteredUser {
  name: string;
  email: string;
  password?: string; 
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    // Clear previous user session info
    localStorage.removeItem('commitChronicleLoggedInUser');
    localStorage.removeItem('commitChronicleLoggedInUserName');

    // Check for Nisha's hardcoded credentials first
    if (email === "nisha.kashyap@innogent.in" && password === "Nisha@2245") {
      console.log("Nisha Kashyap logged in (simulated hardcoded)");
      localStorage.setItem('commitChronicleLoggedInUser', email);
      localStorage.setItem('commitChronicleLoggedInUserName', "Nisha Kashyap");
      router.push("/dashboard");
      return;
    }

    // Check for users registered in localStorage
    try {
      const existingUsersString = localStorage.getItem('commitChronicleRegisteredUsers');
      const existingUsers: RegisteredUser[] = existingUsersString ? JSON.parse(existingUsersString) : [];
      
      const foundUser = existingUsers.find(user => user.email === email && user.password === password);

      if (foundUser) {
        console.log(`${foundUser.name} logged in (simulated from localStorage)`);
        localStorage.setItem('commitChronicleLoggedInUser', foundUser.email);
        localStorage.setItem('commitChronicleLoggedInUserName', foundUser.name);
        router.push("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during login (localStorage):", error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred during login.",
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
          <CardTitle className="text-3xl font-bold">Commit Chronicle</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to access your personalized dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <Button
            className="w-full text-lg py-6 shadow-sm hover:shadow-md transition-shadow"
            onClick={handleLogin}
          >
            <LogIn className="mr-2 h-5 w-5" />
            Sign In
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Link href="/register" className="text-sm text-primary hover:underline">
            Don't have an account? Register
          </Link>
          <p className="text-xs text-muted-foreground">
            Your secure portal to development insights.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
