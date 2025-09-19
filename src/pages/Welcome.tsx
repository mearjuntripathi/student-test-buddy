import { useState } from "react";
import OnboardingChat from "@/components/OnboardingChat";
import Dashboard from "@/components/Dashboard";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-education.jpg";

interface UserData {
  name: string;
  email: string;
  interests: string[];
  wantsUpdates: boolean;
}

export default function Welcome() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setIsCompleted(true);
  };

  if (isCompleted && userData) {
    return <Dashboard userData={userData} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Students learning with digital devices" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Student Test Hub
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              Personalized testing platform for your academic and career success
            </p>
          </div>
        </div>
      </div>

      {/* Onboarding Chat Section */}
      <div className="container mx-auto px-6 py-8">
        <Card className="max-w-4xl mx-auto shadow-large">
          <div className="h-[600px]">
            <OnboardingChat onComplete={handleOnboardingComplete} />
          </div>
        </Card>
      </div>

      {/* Features Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Student Test Hub?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get personalized tests, track your progress, and improve your skills with our comprehensive platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center shadow-soft hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Tests</h3>
              <p className="text-muted-foreground">
                Get tests tailored to your interests and career goals for maximum relevance and engagement.
              </p>
            </Card>
            
            <Card className="p-6 text-center shadow-soft hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Detailed Analytics</h3>
              <p className="text-muted-foreground">
                Track your performance with comprehensive reports and insights to identify areas for improvement.
              </p>
            </Card>
            
            <Card className="p-6 text-center shadow-soft hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Feedback</h3>
              <p className="text-muted-foreground">
                Receive immediate results and explanations to accelerate your learning and skill development.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}