"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteProjectButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function removeProject() {
    setPending(true);
    setError("");
    const response = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error ?? "Delete failed.");
      setPending(false);
      return;
    }
    router.refresh();
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 transition hover:bg-red-100"
      >
        Delete
      </button>
    );
  }

  return (
    <div className="absolute inset-x-3 bottom-3 z-20 rounded-2xl border border-red-200 bg-white p-3 shadow-xl">
      <p className="text-xs font-semibold text-[#302451]">
        Permanently delete “{title}” and its images?
      </p>
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={removeProject}
          disabled={pending}
          className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white disabled:opacity-50"
        >
          {pending ? "Deleting…" : "Yes, delete"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={pending}
          className="rounded-full bg-[#302451]/8 px-3 py-1.5 text-xs font-bold text-[#302451]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
