import type { ReactNode } from "react";
export default function Panel({title,action,children}:{title:string;action?:ReactNode;children:ReactNode}){ return <section className="panel"><div className="panel-head"><h3>{title}</h3>{action}</div>{children}</section>; }
