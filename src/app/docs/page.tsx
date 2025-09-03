"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { KeyRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { useState } from "react";

const baseUrl =
  typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

export default function DocPage() {
  const [key, setKey] = useState("");
  const [out, setOut] = useState("");
  const [postBody, setPostBody] = useState("Hello World");

  async function runGet() {
    const res = await fetch(`${baseUrl}/api/ping`, {
      headers: { "x-api-key": key },
    });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function runPost() {
    const res = await fetch(`${baseUrl}/api/echo`, {
      method: "POST",
      headers: { "x-api-key": key, "content-type": "application/json" },
      body: JSON.stringify({ postBody }),
    });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-300 to-sky-500 p-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between bg-white/70 backdrop-blur-md rounded-2xl shadow-lg px-6 py-4 mb-8">
        <h1 className="text-3xl font-extrabold text-sky-700 drop-shadow-sm">
          🔑 API Documentation
        </h1>
        <Link href="/keys">
          <Button className="flex items-center gap-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 shadow-md transition">
            <KeyRound className="h-5 w-5" />
            Keys Dashboard
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Auth Instructions */}
        <Card className="rounded-2xl border border-sky-200 bg-white/90 shadow-md">
          <CardHeader className="border-b border-sky-100">
            <CardTitle className="text-xl font-bold text-sky-700">
              How Authentication Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <p>
              Use the <code className="bg-gray-200 px-1 rounded">x-api-key</code>{" "}
              header. Create a key in{" "}
              <code className="bg-gray-200 px-1 rounded">/keys</code> and store
              it securely.
            </p>

            <div>
              <h3 className="font-semibold text-sky-600">Base URL</h3>
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-3 text-green-400 text-sm shadow-inner">
                <code>{baseUrl + "/api"}</code>
              </pre>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-sky-600">GET /api/ping</h3>
                <pre className="overflow-x-auto rounded-lg bg-gray-900 p-3 text-green-400 text-sm shadow-inner">
                  <code>{`curl -H 'x-api-key: <YOUR_KEY>' \\
${baseUrl}/api/ping`}</code>
                </pre>
                <pre className="overflow-x-auto rounded-lg bg-gray-900 p-3 text-green-400 text-sm shadow-inner mt-2">
                  <code>{`const r = await fetch('${baseUrl}/api/ping', { 
  headers: { 'x-api-key': process.env.MY_KEY! }
});`}</code>
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-sky-600">POST /api/echo</h3>
                <pre className="overflow-x-auto rounded-lg bg-gray-900 p-3 text-green-400 text-sm shadow-inner">
                  <code>{`curl -X POST \\
-H 'x-api-key: <YOUR_KEY>' \\
-H 'content-type: application/json' \\
-d '{"hello":"world"}' \\
${baseUrl}/api/echo`}</code>
                </pre>
                <pre className="overflow-x-auto rounded-lg bg-gray-900 p-3 text-green-400 text-sm shadow-inner mt-2">
                  <code>{`const r = await fetch('${baseUrl}/api/echo', {
  method: 'POST',
  headers: { 
    'x-api-key': process.env.MY_KEY!, 
    'content-type': 'application/json' 
  },
  body: JSON.stringify({ hello: 'world' })
});`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Tester */}
        <Card className="rounded-2xl border border-sky-200 bg-white/90 shadow-md">
          <CardHeader className="border-b border-sky-100">
            <CardTitle className="text-xl font-bold text-sky-700">
              Interactive Tester
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Paste your API key (sk_...)"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="rounded-lg border-sky-300 focus:border-sky-500 focus:ring-sky-500"
            />

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={runGet}
                className="rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-md"
              >
                Test GET /api/ping
              </Button>
              <Button
                onClick={runPost}
                variant="secondary"
                className="rounded-lg border-sky-300 text-sky-700 hover:bg-sky-100"
              >
                Test POST /api/echo
              </Button>
            </div>

            <Label className="text-sm font-semibold text-sky-700">
              POST body (JSON)
            </Label>
            <Textarea
              rows={5}
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              className="rounded-lg border-sky-300 focus:border-sky-500 focus:ring-sky-500"
            />

            <Label className="text-sm font-semibold text-sky-700">
              Response
            </Label>
            <div className="max-h-107 overflow-y-auto rounded-lg border border-sky-300 bg-gray-50 p-2 text-gray-700">
              <pre className="whitespace-pre-wrap text-sm">{out}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
