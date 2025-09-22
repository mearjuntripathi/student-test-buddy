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
  email: string;
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

export default function OnboardingChat({ email, onComplete }: OnboardingChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 Welcome to Student Test Hub. To help us personalize your experience, could you tell me what areas interest you the most? For example: Technology, Banking, Finance, Healthcare, or anything else.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [currentStep, setCurrentStep] = useState<"interests" | "updates" | "signup">("interests");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [wantsUpdates, setWantsUpdates] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", email: email, password: "" });
  const [customInput, setCustomInput] = useState("");
  
  const { toast } = useToast();

  const addMessage = (text: string, isBot = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleInterestSelection = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleInterestsSubmit = () => {
    if (selectedInterests.length === 0) {
      toast({ title: "Please select at least one interest", variant: "destructive" });
      return;
    }

    addMessage(`Great! I'm interested in: ${selectedInterests.join(", ")}`);
    setTimeout(() => {
      addMessage(
        `Awesome! Would you like to receive future updates and job alerts related to your interests? (Yes/No)`,
        true
      );
      setCurrentStep("updates");
    }, 600);
  };

  const handleUpdatesChoice = (choice: boolean) => {
    setWantsUpdates(choice);
    addMessage(choice ? "Yes ✅" : "No ❌");

    setTimeout(() => {
      addMessage(
        `Thanks for sharing! Now, please sign up with your Full Name, Email, and Password to unlock your personalized dashboard.`,
        true
      );
      setCurrentStep("signup");
    }, 600);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    addMessage(`Signing up as ${formData.name}...`);

    setTimeout(() => {
      addMessage(
        `Welcome aboard, ${formData.name}! 🎉 You're all set to explore your personalized dashboard with tailored tests and insights.`,
        true
      );
      setTimeout(() => {
        onComplete({
          name: formData.name,
          email: formData.email,
          interests: selectedInterests,
          wantsUpdates
        });
      }, 1200);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto border rounded-lg bg-card shadow-lg">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed shadow
                ${message.isBot 
                  ? "bg-muted text-foreground rounded-bl-none" 
                  : "bg-primary text-primary-foreground rounded-br-none"}`}
            >
              {message.text}
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t bg-background p-6 space-y-4">
        {currentStep === "interests" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedInterests.includes(interest)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
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
                  if (e.key === "Enter" && customInput.trim()) {
                    handleInterestSelection(customInput.trim());
                    setCustomInput("");
                  }
                }}
              />
              <Button
                onClick={() => {
                  if (customInput.trim()) {
                    handleInterestSelection(customInput.trim());
                    setCustomInput("");
                  }
                }}
                variant="outline"
              >
                Add
              </Button>
            </div>

            <Button
              onClick={handleInterestsSubmit}
              className="w-full bg-primary text-primary-foreground shadow"
            >
              Continue
            </Button>
          </div>
        )}

        {currentStep === "updates" && (
          <div className="flex gap-4">
            <Button
              onClick={() => handleUpdatesChoice(true)}
              className="flex-1 bg-primary text-primary-foreground"
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

        {currentStep === "signup" && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              disabled
              className="bg-muted text-muted-foreground cursor-not-allowed"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              required
            />
            <Button type="submit" className="w-full bg-primary text-primary-foreground shadow">
              Complete Signup
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
