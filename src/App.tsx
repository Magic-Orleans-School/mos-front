import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RequireAdmin from './components/RequireAdmin';
import PublicPage from './pages/PublicPage';
import LoginPage from './pages/admin/LoginPage';
import AdminPage from './pages/admin/AdminPage';
import EventsPage from './pages/admin/events/EventsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/events" element={<EventsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
