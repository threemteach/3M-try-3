export default function Loading() {
  return <div role="status" aria-label="Loading dashboard" className="space-y-6">
    <span className="sr-only">Loading dashboard…</span>
    <div className="h-8 w-48 rounded-md bg-[#e7e4ed]" />
    <div className="grid grid-cols-3 gap-4">{[0,1,2].map(i=><div key={i} className="h-24 rounded-lg border border-[#e3e5e9] bg-white"/>)}</div>
    <div className="h-72 rounded-lg border border-[#e3e5e9] bg-white" />
  </div>;
}
