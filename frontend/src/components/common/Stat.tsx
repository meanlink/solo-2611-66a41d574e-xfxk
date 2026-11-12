import { toneClass } from "../../utils/tone";
import { number } from "../../utils/format";
export default function Stat({label,value,unit="",tone="neutral"}:{label:string;value:number|string;unit?:string;tone?:string}){ return <div className="stat"><div className="stat-label">{label}</div><div className={`stat-value ${toneClass(tone)}`}>{number(value)}<small>{unit && <span className="muted"> {unit}</span>}</small></div></div>; }
