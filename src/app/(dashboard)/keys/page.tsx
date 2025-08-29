"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
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
import { Badge } from "~/components/ui/badge";

type KeyItem = {
  id: string;
  name: string;
  masked: string;
  createdAt: string;
  revoked: boolean;
};

export default function KeysPage() {
  const [name, setName] = useState("");
  const [justCreated, setJustCreated] = useState<{ key: string; id: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<KeyItem[]>([]);

  async function createKey() {
    setLoading(true);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = (await res.json()) as { key: string; id: string };
      if (res.ok) {
        setJustCreated({ key: data.key, id: data.id });
        await load();
      } else {
        alert("Failed to create key");
      }
    } finally {
      setLoading(false);
    }
  }

  async function load() {
    const res = await fetch("/api/keys", { cache: "no-store" });
    const data = (await res.json()) as { items?: KeyItem[] };
    setItems(data.items ?? []);
  }

  async function revokeKey(id: string) {
    const res = await fetch(`/api/keys?keyId=${id}`, { method: "DELETE" });
    await load();
  }

  useEffect(() => {
    void load();
  }, []);

  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) router.replace("/");
  }, [isSignedIn, router]);

  if (!isSignedIn) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-pink-200 to-purple-200">
      <div className="space-y-12 p-10">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-md">
            🔑 API Key Dashboard
          </h1>
          <Link href="/docs">
            <Button className="flex items-center gap-2 rounded-xl bg-white text-purple-700 hover:bg-purple-600 hover:text-white transition">
              <BookOpen className="h-5 w-5" />
              API Docs
            </Button>
          </Link>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Generate API Key */}
          <Card className="rounded-2xl bg-white/90 shadow-lg border border-purple-200 backdrop-blur-sm">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-purple-700">
                Generate API Key
              </CardTitle>
              <Button
                className="flex items-center gap-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => void createKey()}
                disabled={loading}
              >
                <Plus className="h-5 w-5" />
                Create
              </Button>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Key Name (e.g. production)"
                className="mt-2 rounded-lg border-gray-300 focus:ring focus:ring-pink-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Display New Key */}
          <Card className="rounded-2xl bg-white/90 shadow-lg border border-sky-200 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-sky-700">
                Your New API Key
              </CardTitle>
            </CardHeader>
            <CardContent>
              {justCreated ? (
                <>
                  <p className="text-sm text-gray-600">Copy your key now:</p>
                  <div className="mt-2 flex items-center gap-2 rounded-lg bg-gray-100 p-3 shadow-inner">
                    <code className="break-all font-mono text-sm text-gray-900">
                      {justCreated.key}
                    </code>
                    <CopyButton value={justCreated.key} />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    ⚠️ You won’t be able to see it again.
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No new key generated yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Keys Table */}
        <Card className="rounded-2xl bg-white/95 shadow-lg border border-pink-200 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-pink-600">
              Your Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500">
                    <TableHead className="text-white font-semibold">Name</TableHead>
                    <TableHead className="text-white font-semibold">Key</TableHead>
                    <TableHead className="text-white font-semibold">Created</TableHead>
                    <TableHead className="text-white font-semibold">Status</TableHead>
                    <TableHead className="text-right text-white font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((row, i) => (
                    <TableRow
                      key={row.id}
                      className={`
                        ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        hover:bg-purple-50 transition
                      `}
                    >
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="font-mono text-sm text-gray-700">{row.masked}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(row.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {row.revoked ? (
                          <Badge variant="secondary" className="bg-gray-300 text-gray-700">Revoked</Badge>
                        ) : (
                          <Badge className="bg-green-500 text-white">Active</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={row.revoked}
                          onClick={() => void revokeKey(row.id)}
                        >
                          Revoke
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {items.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-gray-500 py-6"
                      >
                        No API Keys yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Footer Tip */}
        <p className="text-center text-gray-800 font-medium">
          💡 Use <code className="bg-gray-200 px-1 py-0.5 rounded">x-api-key</code>{" "}
          in headers. Check{" "}
          <Link href="/docs" className="text-purple-700 underline hover:text-pink-600">
            Documentation
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
