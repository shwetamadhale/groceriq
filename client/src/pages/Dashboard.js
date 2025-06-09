import { useUser } from '@clerk/clerk-react';

export default function Dashboard() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome{user.firstName ? `, ${user.firstName}` : ''}!</h1>
      <p>Here you'll manage your grocery items.</p>
      
      {/* Add this debug section temporarily */}
      <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5' }}>
        <h3>User Info (debug):</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}