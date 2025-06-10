
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Workflow, LinkIcon, Trash2 } from "lucide-react"; // Workflow for Jira

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, integrations, and application preferences.
        </p>
      </div>
      
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Nisha Kashyap" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="nisha.kashyap@innogent.in" />
          </div>
          <Button>Save Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connect your Git and Jira accounts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Github className="h-8 w-8 text-foreground" />
              <div>
                <h3 className="font-medium">Git Provider</h3>
                <p className="text-sm text-muted-foreground">Connected as: nisha-kashyap-git</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <LinkIcon className="mr-2 h-4 w-4" />
              Reconnect
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Workflow className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-medium">Jira</h3>
                <p className="text-sm text-muted-foreground">Connected to: nisha-k.atlassian.net</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <LinkIcon className="mr-2 h-4 w-4" />
              Reconnect
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>Manage your data export settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Export settings will be available here. For now, use the Export section in the main dashboard.
          </p>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Actions here are irreversible.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete Account
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            This will permanently delete all your data associated with Commit Chronicle.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
