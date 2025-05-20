import { DashboardPage } from '@/components/dashboard/dashboard-page';

export default function Dashboard() {
  return (
    <>
      <div
        style={{
          background: '#ff0',
          color: '#000',
          padding: 16,
          fontWeight: 'bold',
        }}
      >
        TEST: Dashboard route is rendering
      </div>
      <DashboardPage />
    </>
  );
}
