"use client";

import { Button } from "@/app/components/ui/button";

export function TestButton() {
  const handleClick = () => {
    console.log("Test button clicked");
  };

  return (
    <div>
      <Button onClick={handleClick} className="bg-blue-500">
        Test Button
      </Button>
    </div>
  );
}