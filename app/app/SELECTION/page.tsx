"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

export default function SelectionPage() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [streamName, setStreamName] = useState("");

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "User") {
      router.push("/DASHBOARD");
    }
  };

  const handleStreamerSubmit = () => {
    router.push(`/DASHBOARD?role=Streamer&name=${encodeURIComponent(streamName)}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white relative"
      style={{
        backgroundImage: `url('https://wallpaper.dog/large/20473159.jpg')`,
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Greeting Text */}
      <div className="relative z-10 flex flex-col items-center mb-16">
        <h1
          className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-extrabold leading-tight text-transparent bg-clip-text text-center"
          style={{
            backgroundImage: "linear-gradient(to right, #FFDEE9, #B5FFFC)",
            textShadow: `
              0px 0px 10px rgba(255, 255, 255, 0.9),
              0px 0px 20px rgba(255, 170, 200, 0.8),
              0px 0px 30px rgba(150, 255, 255, 0.7)`,
            whiteSpace: "nowrap",
          }}
        >
          Dive Deep into the Melody of Life
        </h1>
      </div>

      {/* Selection Content */}
      <div className="relative z-10 flex flex-col items-center space-y-10 text-center p-6 max-w-lg">
        <div className="text-2xl font-semibold tracking-wider text-white hover:scale-105 transform transition-all duration-500 cursor-pointer">
          Please Select Your Role
        </div>
        <div className="space-y-6">
          <Button
            onClick={() => handleRoleSelection("User")}
            className="w-64 px-4 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            hover:opacity-90 rounded-lg shadow-lg transition-all hover:scale-105"
          >
            User
          </Button>
          <Button
            onClick={() => setRole("Streamer")}
            className="w-64 px-4 py-3 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 
            hover:opacity-90 rounded-lg shadow-lg transition-all hover:scale-105"
          >
            Streamer
          </Button>
        </div>

        {/* Streamer Input Section */}
        {role === "Streamer" && (
          <div className="mt-6 space-y-4 w-full max-w-md p-4 bg-black/50 rounded-lg shadow-md">
            <Input
              type="text"
              placeholder="Enter Stream Name"
              value={streamName}
              onChange={(e) => setStreamName(e.target.value)}
              className="w-full bg-white/90 text-black border-none rounded-lg shadow-sm p-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <Button
              onClick={handleStreamerSubmit}
              className="w-full px-4 py-3 bg-gradient-to-r from-teal-400 via-green-400 to-emerald-500 
              hover:opacity-90 rounded-lg shadow-lg transition-all hover:scale-105"
            >
              Proceed to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
