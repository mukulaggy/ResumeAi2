import { UserButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

const StudentNavbar = () => {
  const { user } = useUser();
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-black text-white p-4 z-50 border-b border-white/20">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/student-dashboard" className="text-2xl font-bold">
          Resume Analyzer
        </Link>
        
        <div className="flex items-center gap-6">
          {user && (
            <>
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
                <div className="flex flex-col">
                  <span className="text-sm">{user.fullName}</span>
                  <span className="text-xs text-gray-400">Student</span>
                </div>
              </div>
              <SignOutButton className="bg-red-600  px-2 py-2 rounded-2xl"/>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;