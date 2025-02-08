import RecruiterNavbar from "../ui/RecruiterNavbar";

const RecruiterLayout = ({ children }) => {
  return (
    <div className="App bg-black text-white min-h-screen">
      <RecruiterNavbar />
      <main className="pt-20 pb-8 px-4">{children}</main>
    </div>
  );
};

export default RecruiterLayout;