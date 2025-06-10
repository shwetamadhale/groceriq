import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PreferencesForm from './pages/PreferencesForm';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function Dashboard() {
  return (
    <div>
      <h2>Dashboard - Protected Content</h2>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to GrocerIQ</h1>
      <Link to="/sign-in">Sign In</Link> | <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={
            <>
              <SignedIn><Dashboard /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
            </>
          } />
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
          <Route path="/preferences" element={<PreferencesForm />} />

        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
