import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Import your Button component

const TopBar = () => {
  return (
    <div className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/icon.png"
              alt="Site Logo"
              width={40}
              height={40}
            />
            <span className="ml-2 text-xl font-bold">Basedmanga</span>
          </Link>
        </div>

        <div className="flex items-center">
          <Link href="/profile">
            <Button className="mr-2">Go to Profile</Button>
          </Link>
          <Link href="/upload">
            <Button className="mr-2">Upload manga</Button>
          </Link>
          <Link href="/chat">
            <Button>Chat</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
