
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Workflow } from "lucide-react"; // Using Workflow as a generic icon for Jira
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (provider: string) => {
    // In a real app, this would initiate OAuth flow
    console.log(`Attempting to login with ${provider}`);
    // For now, simulate successful login and redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-primary">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold">MyDevJournal</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to access your timeline and summaries.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full text-lg py-6 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleLogin("Git")}
          >
            <Github className="mr-2 h-6 w-6" />
            Sign in with Git Provider
          </Button>
          <Button
            variant="outline"
            className="w-full text-lg py-6 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleLogin("Jira")}
          >
            <Workflow className="mr-2 h-6 w-6" />
            Sign in with Jira
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground">
            Secure and easy access to your development insights.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
