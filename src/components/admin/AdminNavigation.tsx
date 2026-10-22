"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, LayoutTemplate, CreditCard } from "lucide-react";
const links = [
  {href:"/admin",label:"Projects",icon:FolderKanban},
  {href:"/admin/catalog?type=plans",label:"Plans",icon:CreditCard},
  {href:"/admin/catalog?type=templates",label:"Templates",icon:LayoutTemplate},
];
export default function AdminNavigation(){
  const pathname=usePathname();
  return <nav aria-label="Content management" className="flex flex-wrap gap-2 border-b border-[#ddd7e5] bg-white px-4 py-3 sm:px-7">{links.map(({href,label,icon:Icon})=><Link key={href} href={href} aria-current={href==='/admin'&&pathname==='/admin'?'page':undefined} className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ${pathname==='/admin'&&href==='/admin'?'bg-[#302451] text-white':'text-[#50465f] hover:bg-[#f1eef5]'}`}><Icon size={16}/>{label}</Link>)}</nav>;
}
