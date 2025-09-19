import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ScheduleTestDialogProps {
  children: React.ReactNode;
  interests: string[];
}

export default function ScheduleTestDialog({ children, interests }: ScheduleTestDialogProps) {
  const [date, setDate] = useState<Date>();
  const [student, setStudent] = useState("");
  const [testTopic, setTestTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [minusMarks, setMinusMarks] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleScheduleTest = () => {
    if (!date || !student || !testTopic || !duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Test Scheduled Successfully!",
      description: `${testTopic} scheduled for ${student} on ${format(date, "PPP")}`,
    });

    // Reset form
    setDate(undefined);
    setStudent("");
    setTestTopic("");
    setDuration("");
    setMinusMarks(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Schedule a Test
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar Section */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border pointer-events-auto"
              />
              {date && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Selected: {format(date, "PPPP")}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Form Section */}
          <Card className="shadow-soft">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-semibold">Test Details</h3>
              
              {/* Student Selection */}
              <div className="space-y-2">
                <Label htmlFor="student">Student *</Label>
                <Select value={student} onValueChange={setStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                    <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                    <SelectItem value="alex-brown">Alex Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Test Topic */}
              <div className="space-y-2">
                <Label htmlFor="topic">Test Topic *</Label>
                <Select value={testTopic} onValueChange={setTestTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select test topic" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {interests.map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Minus Marks Option */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="minus-marks">Enable Minus Marks</Label>
                  <p className="text-sm text-muted-foreground">
                    Deduct marks for wrong answers
                  </p>
                </div>
                <Switch
                  id="minus-marks"
                  checked={minusMarks}
                  onCheckedChange={setMinusMarks}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleScheduleTest}
                  className="flex-1 bg-gradient-primary"
                >
                  Schedule Test
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}