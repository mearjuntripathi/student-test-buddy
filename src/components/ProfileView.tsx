import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Camera, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileViewProps {
  userData: {
    name: string;
    email: string;
    interests: string[];
    wantsUpdates: boolean;
  };
  onBack: () => void;
  onUpdateProfile: (data: any) => void;
}

export default function ProfileView({ userData, onBack, onUpdateProfile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    interests: userData.interests,
  });
  const { toast } = useToast();

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      interests: userData.interests,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Profile Settings
              </h1>
              <p className="text-muted-foreground">Manage your account information</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Picture Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" alt={userData.name} />
                  <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-primary"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <p className="font-medium">{userData.name}</p>
                <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                <Button variant="outline" size="sm">
                  Upload new picture
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="shadow-medium">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} className="bg-gradient-primary">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm font-medium p-3 bg-muted rounded-md">{userData.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm font-medium p-3 bg-muted rounded-md">{userData.email}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {userData.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="bg-gradient-primary/10">
                      {interest}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <p className="text-sm text-muted-foreground">
                    Contact support to modify your interests
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Email Notifications</Label>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <span className="text-sm">Receive updates and job alerts</span>
                  <Badge variant={userData.wantsUpdates ? "default" : "secondary"}>
                    {userData.wantsUpdates ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Your activity summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-educational-primary">12</div>
                  <div className="text-sm text-muted-foreground">Tests Available</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-educational-secondary">8</div>
                  <div className="text-sm text-muted-foreground">Tests Completed</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-educational-success">85%</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-educational-warning">3</div>
                  <div className="text-sm text-muted-foreground">Scheduled</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}