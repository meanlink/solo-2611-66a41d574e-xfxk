import { useParams } from "react-router-dom";
import { getRun } from "../api/runs";
import BarChart from "../components/common/BarChart";
import DataTable from "../components/common/DataTable";
import Panel from "../components/common/Panel";
import Stat from "../components/common/Stat";
import StatusBadge from "../components/common/StatusBadge";
import { PAGE_LABELS } from "../constants/domain";
import { useAsync } from "../hooks/useAsync";
import { checksum, dateTime } from "../utils/format";
export default function RunDetailPage(){ const {runId}=useParams(); const {data,error}=useAsync(()=>getRun(runId||""),[runId]); return <><header className="page-head"><div><div className="eyebrow">{PAGE_LABELS[3]}</div><h1>判读结果</h1></div>{data&&<StatusBadge status={data.status}/>}</header>{error&&<div className="error-box">{error}</div>}{!data?<div className="empty">正在读取结果…</div>:<div className="content-grid"><section><span className="method-tag">{data.result.method}</span><h2 className="run-headline" style={{marginTop:18}}>{data.result.headline}</h2><p className="muted" style={{maxWidth:800,lineHeight:1.8}}>{data.result.narrative}</p></section><div className="stat-row">{data.result.metrics.map(metric=><Stat key={metric.label} label={metric.label} value={metric.value} unit={metric.unit} tone={metric.tone}/>)}</div><div className="content-grid grid-main"><Panel title="效应与分组"><BarChart series={data.result.series}/></Panel><Panel title="运行证据"><div className="content-grid"><div><span className="eyebrow">checksum</span><div className="mono">{checksum(data.checksum)}</div></div><div><span className="eyebrow">created</span><p>{dateTime(data.created_at)}</p></div><div><span className="eyebrow">run id</span><div className="mono">{data.id}</div></div></div></Panel></div><Panel title="算法限制"><p className="caveat">{data.result.caveat}</p></Panel><Panel title="结果表"><DataTable rows={data.result.table}/></Panel></div>}</>; }
