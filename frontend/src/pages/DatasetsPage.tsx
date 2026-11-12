import { listDatasets } from "../api/datasets";
import DataTable from "../components/common/DataTable";
import Panel from "../components/common/Panel";
import StatusBadge from "../components/common/StatusBadge";
import { ENTITY_LABELS, PAGE_LABELS } from "../constants/domain";
import { useAsync } from "../hooks/useAsync";
import { checksum } from "../utils/format";
export default function DatasetsPage(){ const {data,error}=useAsync(listDatasets); return <><header className="page-head"><div><div className="eyebrow">{PAGE_LABELS[1]}</div><h1>{ENTITY_LABELS[1]}</h1><p>列出可用样本、来源、行数与内容校验，确保每次运行都能定位输入版本。</p></div><span className="method-tag">{data?.total||0} 份资产</span></header>{error&&<div className="error-box">{error}</div>}<div className="grid-3 content-grid">{data?.items.map(item=><Panel key={item.id} title={item.name} action={<StatusBadge status={item.status}/>}><div className="eyebrow">{item.source}</div><p className="muted">{item.description}</p><div className="stat-row"><div className="stat"><div className="stat-label">样本</div><div className="stat-value">{item.row_count.toLocaleString()}</div></div><div className="stat"><div className="stat-label">校验</div><div className="mono" style={{marginTop:12}}>{checksum(item.checksum)}</div></div></div></Panel>)}</div><div style={{marginTop:34}}><Panel title="字段抽样"><DataTable rows={[{name:"content_checksum",value:data?.items[0]?.checksum||"—"},{name:"role_scope",value:"admin / analyst / reviewer"},{name:"storage",value:"database JSON snapshot"}]}/></Panel></div></>; }
