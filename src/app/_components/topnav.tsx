"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function TopNav() {
  return (
    <nav className="w-full bg-white/70 backdrop-blur-md shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left side - Title */}
        <div className="text-2xl font-extrabold text-sky-700 drop-shadow-sm hover:text-sky-500 transition">
          API-Keys
        </div>

        <SignedOut>
          <div className="cursor-pointer">
          <SignInButton>
            <span className="px-5 py-2 rounded-lg bg-gradient-to-r from-sky-500 via-pink-500 to-purple-600 
              text-white font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition">
              Sign In
            </span>
          </SignInButton>
        </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}