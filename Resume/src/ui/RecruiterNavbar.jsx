import { Link, useNavigate } from "react-router-dom";

const RecruiterNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // Check if the recruiter is logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/get-started");
  };

  return (
    <nav className="fixed top-0 w-full bg-black text-white p-4 z-50 border-b border-white/20">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Recruiter Dashboard
        </Link>
        
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link to="/recruiter-dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/recruiter-login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/recruiter-registration" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default RecruiterNavbar;