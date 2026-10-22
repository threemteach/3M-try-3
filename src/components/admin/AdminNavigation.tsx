"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FolderKanban, LayoutTemplate, CreditCard } from "lucide-react";
const links = [
  {href:"/admin",label:"Projects",icon:FolderKanban},
  {href:"/admin/catalog?type=plans",label:"Plans",icon:CreditCard},
  {href:"/admin/catalog?type=templates",label:"Templates",icon:LayoutTemplate},
  {href:"/admin/visibility",label:"Page visibility",icon:LayoutTemplate},
];
export default function AdminNavigation(){
  const pathname=usePathname();
  const router=useRouter();
  useEffect(()=>{links.forEach(link=>router.prefetch(link.href));},[router]);
  const [type,setType]=useState('plans');
  useEffect(()=>{setType(new URLSearchParams(window.location.search).get('type') || 'plans');});
  return <nav aria-label="Content management" className="flex gap-1 px-2 lg:flex-col lg:px-3">{links.map(({href,label,icon:Icon})=>{const active=href==='/admin'?pathname==='/admin'||pathname.startsWith('/admin/projects'):pathname==='/admin/catalog'&&href.endsWith(type);return <Link key={href} href={href} aria-current={active?'page':undefined} className={`inline-flex flex-1 items-center gap-3 rounded-md px-4 py-3 text-sm font-medium lg:flex-none ${active?'bg-[#eeeaf5] text-[#503b78]':'text-[#686471] hover:bg-[#f6f7f9]'}`}><Icon size={17}/>{label}</Link>;})}</nav>;
}
