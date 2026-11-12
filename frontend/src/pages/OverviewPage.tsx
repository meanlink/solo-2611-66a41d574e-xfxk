import { Link } from "react-router-dom";
import { listDatasets } from "../api/datasets";
import { listRuns } from "../api/runs";
import { getWorkspace } from "../api/workspace";
import BarChart from "../components/common/BarChart";
import Panel from "../components/common/Panel";
import Stat from "../components/common/Stat";
import StatusBadge from "../components/common/StatusBadge";
import { ENTITY_LABELS, PAGE_LABELS } from "../constants/domain";
import { useAsync } from "../hooks/useAsync";
import { checksum, dateTime } from "../utils/format";
export default function OverviewPage(){ const workspace=useAsync(getWorkspace); const datasets=useAsync(listDatasets); const runs=useAsync(listRuns); const latest=runs.data?.items[0]; return <><header className="page-head"><div><div className="eyebrow">{PAGE_LABELS[0]}</div><h1>今天要判读什么？</h1><p>{workspace.data?.context_note||"正在读取工作区背景…"}</p></div><Link className="button primary" to="/analyses">创建分析</Link></header><div className="stat-row"><Stat label={ENTITY_LABELS[1]} value={datasets.data?.total||0} unit="份"/><Stat label="分析方案" value={runs.data?.total||0} unit="次运行"/><Stat label="最近状态" value={latest?.status==="completed"?"就绪":"待运行"} tone={latest?.status==="completed"?"positive":"neutral"}/><Stat label="数据校验" value={datasets.data?.items[0]?checksum(datasets.data.items[0].checksum):"—"}/></div><div className="content-grid grid-main" style={{marginTop:32}}><Panel title="最近运行序列" action={latest&&<StatusBadge status={latest.status}/>}>{latest?.result?.series?.length?<BarChart series={latest.result.series.slice(0,8)}/>:<div className="empty"><div><h3>首条结果尚未生成</h3><p>从分析编排选择资产并运行。</p></div></div>}</Panel><Panel title="操作提示"><div className="content-grid"><div><div className="eyebrow">01 / 资产</div><p>{datasets.data?.items[0]?.name||"等待资产加载"}</p></div><div><div className="eyebrow">02 / 计算</div><p>所有指标由 Python 后端计算，前端只渲染返回结果。</p></div><div><div className="eyebrow">03 / 复核</div><p>最近更新时间：{latest?dateTime(latest.created_at):"—"}</p></div></div></Panel></div></>; }
