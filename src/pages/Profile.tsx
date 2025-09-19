import { useState } from "react";
import ProfileView from "@/components/ProfileView";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  
  // Mock user data - in real app, this would come from auth context or API
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    interests: ["Technology", "Finance", "Banking"],
    wantsUpdates: true,
  });

  const handleUpdateProfile = (data: any) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  return (
    <ProfileView
      userData={userData}
      onBack={() => navigate("/")}
      onUpdateProfile={handleUpdateProfile}
    />
  );
}