import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./day2/pages/LoginPage";
import StudentDashboard from "./day2/pages/StudentDashboard";
import AdminDashboard from "./day2/pages/AdminDashboard";
import CreateRequestPage from "./day2/pages/CreateRequestPage";
import RequestDetailsPage from "./day2/pages/RequestDetailsPage";

function HomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate
      to={user.role === "admin" ? "/admin-dashboard" : "/student-dashboard"}
      replace
    />
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-request" element={<CreateRequestPage />} />
        <Route path="/request/:id" element={<RequestDetailsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
