"use client"; // ✅ Ensures client-side rendering

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { TextField, Box, Typography, Paper } from "@mui/material";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "process.env.NEXT_PUBLIC_BACKEND_URL");

export default function MessageBoard() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; timestamp: string }[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages`);
        const data = await res.json();
        console.log("Fetched messages:", data);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socket.on("message", (newMsg) => {
      setMessages((prev) => [newMsg, ...prev]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && message.trim()) {
      socket.emit("message", { text: message });
      setMessage("");
    }
  };

  // ✅ Convert ISO timestamps to a consistent format
  const formatTimestamp = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, textAlign: "center" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message and press Enter..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={sendMessage}
      />
      <Paper sx={{ mt: 3, p: 2, textAlign: "left", height: 300, overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <Typography key={index} sx={{ mb: 1 }}>
            [{formatTimestamp(msg.timestamp)}] - {msg.text}
          </Typography>
        ))}
      </Paper>
    </Box>
  );
}
