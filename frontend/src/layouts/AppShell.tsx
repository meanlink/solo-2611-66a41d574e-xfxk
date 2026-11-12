import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearToken } from "../api/client";
import { ROLES, NAV_ITEMS } from "../constants/enums";
import { CLIENT_NAME, ENTITY_LABELS, PROJECT_NAME } from "../constants/domain";
import { useAuth } from "../hooks/useAuth";
export default function AppShell(){ const user=useAuth(); const navigate=useNavigate(); const location=useLocation(); return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-mark">Δ</div><div><strong>{PROJECT_NAME}</strong><small>{CLIENT_NAME}</small></div></div><nav className="nav-list">{NAV_ITEMS.map(item=><NavLink className={({isActive})=>`nav-link ${isActive?"active":""}`} to={item.path} key={item.path}><b className="mono">{item.icon}</b><span>{item.label}</span></NavLink>)}</nav><div className="sidebar-foot"><div className="user-line"><span>{user?.display_name||"读取中"}</span><span className="mono">{user?ROLES[user.role]:"—"}</span></div><button className="button" onClick={()=>{clearToken();navigate("/login")}}>退出登录</button></div></aside><main className="main-stage"><Outlet/></main></div>; }
