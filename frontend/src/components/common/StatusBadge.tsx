import { STATUS_LABELS } from "../../constants/enums";
export default function StatusBadge({status}:{status:string}){ const positive=["ready","completed"].includes(status); const negative=status==="failed"; return <span className={`status ${negative?"negative":positive?"positive":"neutral"}`}>{STATUS_LABELS[status]||status}</span>; }
