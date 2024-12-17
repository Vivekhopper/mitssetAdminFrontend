import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes ,Navigate } from "react-router-dom";
import Loader from "./components/utils/Loader";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/utils/ProtectedRoute";
const Dashboard = lazy(() => import("./components/Admin/Dashboard"));
const ResultsTable = lazy(() => import("./components/Results/ResultsTable"));
const PieChart = lazy(() => import("./components/Graphs/PieChart"));
const BarGraph = lazy(() => import("./components/Graphs/BarGraph"));
const LoginAdmin = lazy(() => import("./components/Admin/LoginAdmin"));

function App() {
  const { isAuthenticated } = useSelector((state) => state.authSlice);
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LoginAdmin />} />
            {/* protected route */}
            <Route
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/results" element={<ResultsTable />} />
              <Route path="/piechart" element={<PieChart />} />
              <Route path="/bargraph" element={<BarGraph />} />
            </Route>
            <Route path="*" element={<Navigate to={'/'}/>}/>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
export default App;
