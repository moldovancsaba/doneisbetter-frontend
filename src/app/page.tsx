"use client"; // ✅ Ensures client-side rendering

import MessageBoard from "../components/MessageBoard";

export default function Home() {
  return (
    <main>
      <MessageBoard />
    </main>
  );
}
