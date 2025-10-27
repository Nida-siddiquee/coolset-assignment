"use client";

import HomePage from "@/components/Organisms/HomePage/HomePage";
import { groceryItems } from "@/utils/constants";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-sm min-h-[600px] ">
        <HomePage groceryItems={groceryItems} />
      </div>
    </div>
  );
}
