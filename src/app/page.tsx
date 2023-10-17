'use client'

import { useState } from 'react'

export default function Home() {
  // Keep track of the classification result and model loading status;
  const [result, setResult] = useState(null)
  const [ready, setReady] = useState<boolean | null>(null);

  const classify = async (text?: string) => {
    if (!text) return;
    if (!ready) setReady(false);

    // Make a request to the /classify route on the server
    const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);

    if (!ready) {
      setReady(true);
    }

    const json = await result.json();
    setResult(json);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">AI Workshop</h1>
      <h2 className="text-2xl mb-4 text-center">Demo App</h2>
      <input
        type="text"
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4 text-slate-950"
        placeholder="Enter text here"
        onInput={e => {
          classify(e.target.value);
        }}
      />

      {ready !== null && (
        <pre className="bg-gray-900 p-2 rounded">
          {
            (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  )
}
