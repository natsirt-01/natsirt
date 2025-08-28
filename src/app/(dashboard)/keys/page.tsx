import Link from "next/link";
import { Button } from "~/components/ui/button";
import { BookOpen, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import CopyButton from "~/components/copy-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Separator } from "~/components/ui/separator";
import { SignedIn } from "@clerk/nextjs";

export default function KeysPage() {
  const sampleApiKey = "hsehshdsrhdrhjdrhdhrd";

  return (
    <SignedIn>
    <div className="w-full min-h-screen space-y-10 p-10 bg-gradient-to-br from-sky-200 via-pink-200 to-purple-200">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-purple-700">🔑 API Keys</h1>
        <div className="flex gap-3">
          <Link href="/docs">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-pink-400 text-pink-600 hover:bg-pink-100 hover:text-pink-700"
              aria-label="Open API Guide"
            >
              <BookOpen className="h-5 w-5" />
              View Documentation
            </Button>
          
          </Link>
        </div>
      </div>

      {/* Generate API Key */}
      <Card className="w-full shadow-lg border border-sky-200">
        <CardHeader className="flex flex-row items-center justify-between bg-sky-100 rounded-t-lg px-8 py-5">
          <CardTitle className="text-xl font-semibold text-sky-700">
            Generate API Key
          </CardTitle>
          <Button
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            aria-label="Create API Key"
          >
            <Plus className="h-5 w-5" />
            Create
          </Button>
        </CardHeader>
        <CardContent className="space-y-5 p-8">
          <div className="flex gap-3">
            <Input
              placeholder="Key Name (e.g., Production)"
              aria-label="API Key Name"
              className="border-pink-300 focus:border-pink-500 focus:ring-pink-400"
            />
          </div>

          {/* Visible once */}
          <div className="rounded-lg border border-purple-300 bg-purple-50 p-5">
            <p className="text-sm font-medium text-purple-800">
              Here is your API Key (visible once):
            </p>
            <div className="mt-3 flex items-center gap-3">
              <code className="text-sm break-all font-mono text-purple-900 bg-purple-100 px-3 py-1 rounded">
                {sampleApiKey}
              </code>
              <CopyButton value={sampleApiKey} />
            </div>
            <p className="text-purple-700 mt-2 text-xs">
              ⚠️ Save this key securely. You won&apos;s be able to see it again.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Your Keys Table */}
      <Card className="w-full shadow-md border border-pink-200">
        <CardHeader className="bg-pink-100 px-8 py-5">
          <CardTitle className="text-xl font-semibold text-pink-700">
            Your Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-100">
                <TableHead className="text-purple-700">Name</TableHead>
                <TableHead className="text-purple-700">Key</TableHead>
                <TableHead className="text-purple-700">Created</TableHead>
                <TableHead className="text-purple-700">Status</TableHead>
                <TableHead className="text-right text-purple-700">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

            {/* Example row */}
              {/*
              <TableRow>
                <TableCell>Name of Key</TableCell>
                <TableCell className="font-mono">{sampleApiKey}</TableCell>
                <TableCell>8/25/2025</TableCell>
                <TableCell>
                  <Badge variant="secondary">Revoked</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm">
                    Revoke
                  </Button>
                </TableCell>
              </TableRow>
              */}

              {/* Empty state */}
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-pink-600 text-center text-sm italic py-8"
                >
                  No API Key yet
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Separator className="bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 h-1 rounded-full" />
      <p className="text-base text-gray-800">
        💡 Tip: Call secured endpoints with the{" "}
        <code className="bg-sky-100 px-2 py-1 rounded font-mono text-sky-800">
          x-api-key
        </code>{" "}
        header. See{" "}
        <Link className="underline text-purple-700 hover:text-purple-900 font-semibold" href="/docs">
          Docs
        </Link>
      </p>
    </div>
    </SignedIn>
  );
}