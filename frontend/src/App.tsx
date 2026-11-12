import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./layouts/AppShell";
import AnalysesPage from "./pages/AnalysesPage";
import DatasetsPage from "./pages/DatasetsPage";
import GovernancePage from "./pages/GovernancePage";
import LoginPage from "./pages/LoginPage";
import OverviewPage from "./pages/OverviewPage";
import RunDetailPage from "./pages/RunDetailPage";
import { getToken } from "./api/client";

function Protected() {
  return getToken() ? <AppShell/> : <Navigate to="/login" replace/>;
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage/>}/>
    <Route element={<Protected/>}>
      <Route path="/overview" element={<OverviewPage/>}/>
      <Route path="/datasets" element={<DatasetsPage/>}/>
      <Route path="/analyses" element={<AnalysesPage/>}/>
      <Route path="/runs/:runId" element={<RunDetailPage/>}/>
      <Route path="/governance" element={<GovernancePage/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/overview" replace/>}/>
  </Routes>;
}
