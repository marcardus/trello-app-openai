import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";
import useAuthStore from "./store/authStore";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<AuthForm type="login" />} />
          <Route path="/register" element={<AuthForm type="register" />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/profile" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
