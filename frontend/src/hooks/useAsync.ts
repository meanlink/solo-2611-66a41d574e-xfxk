import { useCallback, useEffect, useState } from "react";
export function useAsync<T>(loader:()=>Promise<T>, deps:unknown[] = []) {
  const [data,setData] = useState<T|null>(null);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);
  const reload = useCallback(()=>{
    setLoading(true); setError("");
    loader().then(setData).catch((e)=>setError(e.message)).finally(()=>setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },deps);
  useEffect(reload,[reload]);
  return {data,error,loading,reload};
}
