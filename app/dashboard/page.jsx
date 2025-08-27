import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <a
              href="/dashboard/add-product"
              className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add New Product
            </a>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              Logged in as: <span className="font-medium text-gray-900">{session.user?.name}</span>
            </p>
            <p className="text-gray-600">
              Email: <span className="font-medium text-gray-900">{session.user?.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
