// This makes the page static
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Configure your application settings and preferences
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Settings panel coming soon...</p>
      </div>
    </div>
  );
}
