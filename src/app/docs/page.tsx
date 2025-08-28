import Link from "next/link";
import { Button } from "~/components/ui/button";
import { KeyRound } from "lucide-react";

export default function DocPage() {
  return (
    <div
      className="min-h-screen p-6"
      style={{ background: "linear-gradient(to right, #9333ea, #ec4899, #38bdf8)" }}
    >
      <div className="mx-auto max-w-4xl space-y-6 bg-white/90 rounded-2xl shadow-xl p-8">
        {/* Top Toolbar */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-sky-400 to-purple-500 bg-clip-text text-transparent">
            API Guide
          </h1>
          <div className="flex gap-2">
            <Link href="/keys">
              <Button
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-sky-400 text-white shadow-md hover:opacity-90 transition"
                aria-label="Open Keys Dashboard"
              >
                <KeyRound className="h-5 w-5" />
                Keys Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Guide Content Placeholder */}
        <div className="rounded-xl border border-pink-300 bg-white p-6 shadow-sm">
          <p className="text-gray-700 text-lg">
            Welcome to the <span className="font-semibold text-pink-500">API Guide</span>!  
            Here you’ll find everything you need to integrate and use your API keys securely.
          </p>
          <p className="mt-3 text-sm text-sky-600">
            Use the navigation above to return to your <span className="font-semibold">Keys Dashboard</span>.
          </p>
        </div>
      </div>
    </div>
  );
}