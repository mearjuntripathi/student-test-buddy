import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, FileText, Plus, TrendingUp, Clock, Award } from "lucide-react";
import ScheduleTestDialog from "@/components/ScheduleTestDialog";

interface DashboardProps {
  userData: {
    name: string;
    email: string;
    interests: string[];
    wantsUpdates: boolean;
  };
}

export default function Dashboard({ userData }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Student Test Hub
              </h1>
              <p className="text-muted-foreground">Welcome back, {userData.name}!</p>
            </div>
            <Button variant="outline" size="sm">
              Profile Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Interests Banner */}
        <Card className="mb-8 bg-gradient-hero text-white shadow-large">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">Your Interests</h2>
            <div className="flex flex-wrap gap-2">
              {userData.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  {interest}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-white/90">
              We've personalized your dashboard based on these interests
            </p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-educational-primary" />
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-muted-foreground">Available Tests</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-educational-secondary" />
              <h3 className="text-2xl font-bold">3</h3>
              <p className="text-muted-foreground">Scheduled Tests</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-educational-success" />
              <h3 className="text-2xl font-bold">8</h3>
              <p className="text-muted-foreground">Completed Tests</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-educational-warning" />
              <h3 className="text-2xl font-bold">85%</h3>
              <p className="text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recommended Tests */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recommended Tests
              </CardTitle>
              <CardDescription>
                Tests tailored to your interests in {userData.interests.slice(0, 2).join(" and ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg hover:shadow-soft transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">Advanced JavaScript Assessment</h4>
                  <Badge variant="outline">Technology</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Test your knowledge of ES6+, async programming, and modern JavaScript frameworks.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    45 mins
                  </span>
                  <Button size="sm" className="bg-gradient-primary">
                    Start Test
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg hover:shadow-soft transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">Financial Analysis Fundamentals</h4>
                  <Badge variant="outline">Finance</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Evaluate your skills in financial modeling, ratio analysis, and investment principles.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    60 mins
                  </span>
                  <Button size="sm" className="bg-gradient-primary">
                    Start Test
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Available Tests
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent Test Reports
              </CardTitle>
              <CardDescription>
                Your latest test results and performance insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">React Development Quiz</h4>
                  <Badge variant="default" className="bg-educational-success">
                    Passed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Score: 92% • Completed 2 days ago
                </p>
                <Button size="sm" variant="outline">
                  View Report
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">Banking Operations Test</h4>
                  <Badge variant="default" className="bg-educational-warning">
                    Review
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Score: 78% • Completed 5 days ago
                </p>
                <Button size="sm" variant="outline">
                  View Report
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">Data Structures & Algorithms</h4>
                  <Badge variant="default" className="bg-educational-success">
                    Excellent
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Score: 96% • Completed 1 week ago
                </p>
                <Button size="sm" variant="outline">
                  View Report
                </Button>
              </div>

              <Button variant="outline" className="w-full">
                View All Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks you might want to perform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ScheduleTestDialog>
                <Button variant="outline" className="h-20 flex-col gap-2 hover:shadow-soft">
                  <Calendar className="w-6 h-6" />
                  Schedule a Test
                </Button>
              </ScheduleTestDialog>
              <Button variant="outline" className="h-20 flex-col gap-2 hover:shadow-soft">
                <Plus className="w-6 h-6" />
                Create Self-Test
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 hover:shadow-soft">
                <FileText className="w-6 h-6" />
                Practice Questions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}