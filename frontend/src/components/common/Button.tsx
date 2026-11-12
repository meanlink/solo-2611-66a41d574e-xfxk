import type { ButtonHTMLAttributes } from "react";
export default function Button({primary=false,className="",...props}:ButtonHTMLAttributes<HTMLButtonElement>&{primary?:boolean}){ return <button className={`button ${primary?"primary":""} ${className}`} {...props}/>; }
