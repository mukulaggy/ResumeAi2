import StudentNavbar from "../ui/StudentNavbar";
import Footer from "../components/Footer";

const StudentLayout = ({ children }) => {
  return (
    <div className="App bg-black text-white min-h-screen">
      <StudentNavbar />
      <main className="pt-20 pb-8 px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default StudentLayout;