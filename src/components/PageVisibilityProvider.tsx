"use client";
import { createContext, useContext, type ReactNode } from 'react';
const Context=createContext({plans:true,templates:true});
export const usePageVisibility=()=>useContext(Context);
export default function PageVisibilityProvider({value,children}:{value:{plans:boolean;templates:boolean};children:ReactNode}){return <Context.Provider value={value}>{children}</Context.Provider>;}
