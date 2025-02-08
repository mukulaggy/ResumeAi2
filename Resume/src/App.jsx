import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import StudentLayout from "./layouts/StudentLayout";
import RecruiterLayout from "./layouts/RecruiterLayout";
import Home from "./pages/Home/Home";
import SelectionPage from "./pages/SelectionPage/SelectionPage";
import StudentAuth from "./components/StudentAuth";
import RecruiterLogin from "./components/RecruiterLogin";
import RecruiterRegistration from "./components/RecruiterRegistration";
import StudentDashboard from "./pages/StundentDashboard/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard/RecruiterDashboard";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("Clerk Key:", clerkPubKey);

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<SelectionPage />} />
          <Route path="/student-auth" element={<StudentAuth />} />
          <Route path="/recruiter-registration" element={<RecruiterRegistration />} />
          <Route path="/recruiter-login" element={<RecruiterLogin />} />

          {/* Student Routes */}
          <Route
            path="/student-dashboard"
            element={
              <SignedIn>
                <StudentLayout>
                  <StudentDashboard />
                </StudentLayout>
              </SignedIn>
            }
          />
          <Route
            path="/student/*"
            element={
              <SignedIn>
                <StudentLayout>
                  <Routes>
                    {/* Add more student-specific routes here */}
                  </Routes>
                </StudentLayout>
              </SignedIn>
            }
          />
          <Route
            path="/student/*"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          />

          {/* Recruiter Routes */}
          <Route
            path="/recruiter-dashboard"
            element={
              <RecruiterLayout>
                <RecruiterDashboard />
              </RecruiterLayout>
            }
          />
          <Route
            path="/recruiter/*"
            element={
              <RecruiterLayout>
                <Routes>
                  {/* Add more recruiter-specific routes here */}
                </Routes>
              </RecruiterLayout>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;