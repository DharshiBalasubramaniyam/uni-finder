import {useEffect, useState} from "react";

export default function Home() {

  const [message, setMessage] = useState("Loading...");

  const fetchMessage = async () => {
    try {
      const response = await fetch("/api/test");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
      setMessage("Failed to load message");
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Uni Finder</h1>
      <p className="mt-4 text-lg">
        {message}
      </p>
    </main>
  );
}
