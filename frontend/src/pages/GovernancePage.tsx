import { listAudit } from "../api/audit";
import Panel from "../components/common/Panel";
import { PAGE_LABELS } from "../constants/domain";
import { useAsync } from "../hooks/useAsync";
import { dateTime } from "../utils/format";
export default function GovernancePage(){ const {data,error}=useAsync(listAudit); return <><header className="page-head"><div><div className="eyebrow">{PAGE_LABELS[4]}</div><h1>审计与复核</h1><p>保留资产创建、方案运行和复核动作；JWT 角色决定写入边界。</p></div><span className="method-tag">{data?.total||0} 条记录</span></header>{error&&<div className="error-box">{error}</div>}<Panel title="最近审计轨迹">{data?.items.map(item=><div className="audit-row" key={item.id}><span className="mono">{dateTime(item.created_at)}</span><strong>{item.action}</strong><span className="muted">{item.resource_type} / {item.resource_id.slice(0,12)}…</span></div>)}</Panel></>; }
