import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface OnboardingChatProps {
  onComplete: (userData: {
    name: string;
    email: string;
    interests: string[];
    wantsUpdates: boolean;
  }) => void;
}

const INTEREST_OPTIONS = [
  "Technology", "Banking", "Finance", "Healthcare", "Engineering", 
  "Marketing", "Sales", "Data Science", "Design", "Management"
];

export default function OnboardingChat({ onComplete }: OnboardingChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 Welcome to Student Test Hub. To help us personalize your experience, could you tell me what areas interest you the most? For example: Technology, Banking, Finance, Healthcare, or anything else.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [currentStep, setCurrentStep] = useState<'interests' | 'updates' | 'signup'>('interests');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [wantsUpdates, setWantsUpdates] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [customInput, setCustomInput] = useState('');
  
  const { toast } = useToast();

  const addMessage = (text: string, isBot: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleInterestSelection = (interest: string) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    setSelectedInterests(newInterests);
  };

  const handleInterestsSubmit = () => {
    if (selectedInterests.length === 0) {
      toast({
        title: "Please select at least one interest",
        variant: "destructive"
      });
      return;
    }

    addMessage(`Great! I'm interested in: ${selectedInterests.join(", ")}`);
    setTimeout(() => {
      addMessage(`Great! So you're interested in: ${selectedInterests.join(", ")}. Would you like to receive future updates and job alerts related to your interests and background? Please choose "Yes" or "No".`, true);
      setCurrentStep('updates');
    }, 1000);
  };

  const handleUpdatesChoice = (choice: boolean) => {
    setWantsUpdates(choice);
    addMessage(choice ? "Yes" : "No");
    
    setTimeout(() => {
      addMessage(`Thanks for sharing! Now, to get started and unlock all features, please sign up by providing your Full Name, Email Address, and Password. Let me know when you're ready, and I'll guide you through.`, true);
      setCurrentStep('signup');
    }, 1000);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    addMessage(`I'm ready to sign up!`);
    
    setTimeout(() => {
      addMessage(`Welcome aboard, ${formData.name}! 🎉 You're all set to explore your personalized dashboard where you can find tests tailored to your interests, schedule and take upcoming tests, review your past test reports, and create your own self-tests. Ready to start?`, true);
      
      setTimeout(() => {
        onComplete({
          name: formData.name,
          email: formData.email,
          interests: selectedInterests,
          wantsUpdates
        });
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <Card className={`max-w-[80%] p-4 ${
              message.isBot 
                ? 'bg-gradient-card shadow-soft' 
                : 'bg-gradient-primary text-white shadow-medium'
            }`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span className={`text-xs mt-2 block ${
                message.isBot ? 'text-muted-foreground' : 'text-white/70'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </Card>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t bg-card p-6 space-y-4">
        {currentStep === 'interests' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedInterests.includes(interest)
                      ? 'bg-gradient-primary text-white shadow-soft'
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => handleInterestSelection(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Or type your own interest..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customInput.trim()) {
                    handleInterestSelection(customInput.trim());
                    setCustomInput('');
                  }
                }}
              />
              <Button 
                onClick={() => {
                  if (customInput.trim()) {
                    handleInterestSelection(customInput.trim());
                    setCustomInput('');
                  }
                }}
                variant="outline"
              >
                Add
              </Button>
            </div>
            
            <Button 
              onClick={handleInterestsSubmit}
              className="w-full bg-gradient-primary hover:opacity-90 shadow-medium"
            >
              Continue
            </Button>
          </div>
        )}

        {currentStep === 'updates' && (
          <div className="flex gap-4">
            <Button 
              onClick={() => handleUpdatesChoice(true)}
              className="flex-1 bg-gradient-primary hover:opacity-90 shadow-medium"
            >
              Yes, send me updates
            </Button>
            <Button 
              onClick={() => handleUpdatesChoice(false)}
              variant="outline"
              className="flex-1"
            >
              No, thanks
            </Button>
          </div>
        )}

        {currentStep === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
            <Button 
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 shadow-medium"
            >
              Complete Signup
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}