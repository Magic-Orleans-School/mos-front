import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';

export default function AdminPage() {
  return (
    <PageLayout>
      <h1>Administration</h1>
      <nav>
        <Link to="/admin/events" className="btn">Gérer les événements</Link>
      </nav>
    </PageLayout>
  );
}
