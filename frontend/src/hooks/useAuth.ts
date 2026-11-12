import { useEffect, useState } from "react";
import { loadUser } from "../stores/auth";
import type { User } from "../types";
export function useAuth(){ const [user,setUser]=useState<User|null>(null); useEffect(()=>{loadUser().then(setUser).catch(()=>undefined)},[]); return user; }
