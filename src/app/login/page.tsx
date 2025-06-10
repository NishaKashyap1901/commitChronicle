
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpenCheck, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // Simulate login for nisha.kashyap@innogent.in
    if (email === "nisha.kashyap@innogent.in" && password === "Nisha@2245") {
      // In a real app, you would set some auth state (e.g., context, token in localStorage)
      // For now, we just redirect.
      console.log("Nisha Kashyap logged in (simulated)");
      router.push("/dashboard");
    } else if (email && password) {
      // Generic login attempt for demonstration if not Nisha
      // This part can be removed if only Nisha's login is to be simulated
      console.log("Attempting to login with (generic):", { email, password });
      // router.push("/dashboard"); // Or show error for non-Nisha credentials
      alert("Invalid credentials. Only Nisha's simulated login is configured.");
    }
     else {
      alert("Please enter email and password.");
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
