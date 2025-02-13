import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [jobDescriptionWordCount, setJobDescriptionWordCount] = useState(0);
  const [analyzeResults, setAnalyzeResults] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shortlistedResumes, setShortlistedResumes] = useState([]);
  const [showShortlisted, setShowShortlisted] = useState(false);
  const [recruiterData, setRecruiterData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New state for loader

  // Fetch recruiter data on component mount
  useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://resumeai-h4y7.onrender.com/api/recruiter/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecruiterData(response.data);
      } catch (error) {
        console.error("Error fetching recruiter data:", error);
        localStorage.removeItem("token");
        navigate("/recruiter-login");
      }
    };

    fetchRecruiterData();
  }, [navigate]);

  // Handle resume upload
  const handleResumeUpload = async (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      // Validate file type
      const invalidFiles = files.filter(
        (file) => file.type !== "application/pdf" && !file.name.endsWith(".pdf")
      );
      if (invalidFiles.length > 0) {
        setError("Please upload only PDF files.");
        return;
      }

      const formData = new FormData();
      files.forEach((file) => formData.append("resumes", file));

      try {
        setLoading(true); // Start loading
        setError("");

        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://resumeai-h4y7.onrender.com/api/recruiter/upload-resumes",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Validate if uploaded files are resumes
        const uploadedResumes = response.data.data;
        const resumePatterns = [
          /experience/i,
          /education/i,
          /skills/i,
          /projects/i,
          /certifications/i,
          /summary/i,
          /objective/i,
          /work\s*history/i,
          /professional\s*experience/i,
        ];

        const validResumes = uploadedResumes.filter((resume) =>
          resumePatterns.some((pattern) => pattern.test(resume.text))
        );

        if (validResumes.length < uploadedResumes.length) {
          setError("Some uploaded files do not appear to be resumes.");
        }

        setResumes((prevResumes) => [...prevResumes, ...validResumes]);
      } catch (error) {
        console.error("Error uploading resumes:", error);
        setError("Failed to upload resumes. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  // Handle job description change
  const handleJobDescriptionChange = (event) => {
    const text = event.target.value;
    setJobDescription(text);
    const wordCount = text.trim().split(/\s+/).filter((word) => word !== "").length;
    setJobDescriptionWordCount(wordCount);
  };

  // Analyze resumes
  const analyzeResumes = async () => {
    if (resumes.length === 0) {
      setError("Please upload at least one resume.");
      return;
    }

    if (jobDescriptionWordCount < 50) {
      setError("Job description must be at least 50 words.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://resumeai-h4y7.onrender.com/api/recruiter/analyze-resumes",
        { resumes, jobDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAnalyzeResults(response.data.data);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);

      const newShortlisted = response.data.data
        .filter((result) => result.isShortlisted)
        .map((result) => result.filename);
      setShortlistedResumes((prevShortlisted) => [
        ...prevShortlisted,
        ...newShortlisted,
      ]);
    } catch (error) {
      console.error("Error analyzing resumes:", error);
      setError("Failed to analyze resumes. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/recruiter-login");
  };

  // Toggle shortlisted resumes view
  const toggleShortlistedResumes = () => {
    setShowShortlisted(!showShortlisted);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-wider">RESUME ANALYZER</h1>
            {recruiterData && (
              <p className="text-gray-400 mt-2">
                Welcome, {recruiterData.recruiterName} from {recruiterData.companyName}
              </p>
            )}
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-black rounded-xl border border-white p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Upload Resumes</h2>
            <input
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              multiple
              className="text-white w-full border border-white p-5 rounded-md bg-black"
              disabled={loading} // Disable input while loading
            />
            {loading && (
              <div className="mt-4 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400">Parsing resumes...</p>
              </div>
            )}
            {resumes.length > 0 && !loading && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Uploaded Resumes:</h3>
                <ul className="list-disc list-inside">
                  {resumes.map((resume, index) => (
                    <li key={index} className="flex justify-between items-center mb-2">
                      <span>{resume.filename}</span>
                      <button
                        onClick={() => handleRemoveResume(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black rounded-xl border border-white p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              placeholder="Paste job description here..."
              className="text-white w-full p-2 border border-white rounded-md bg-black focus:outline-none focus:ring-2 focus:ring-white"
            />
            <p className="text-sm mt-2 text-gray-400">
              {jobDescriptionWordCount} words (Minimum 50 words required)
            </p>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            onClick={analyzeResumes}
            disabled={resumes.length === 0 || jobDescriptionWordCount < 50}
          >
            Analyze Resumes
          </Button>

          <Button onClick={toggleShortlistedResumes}>
            {showShortlisted ? "Hide Shortlisted Resumes" : "Show Shortlisted Resumes"}
          </Button>
        </div>

        {/* Rest of the code remains the same */}
        <AnimatePresence>
          {showShortlisted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-black rounded-xl border border-white p-6 mb-8"
            >
              <h2 className="text-2xl font-semibold mb-4">Shortlisted Resumes</h2>
              {shortlistedResumes.length > 0 ? (
                <ul className="list-disc list-inside">
                  {shortlistedResumes.map((resumeName, index) => (
                    <li key={index} className="text-gray-300">
                      {resumeName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No resumes have been shortlisted yet.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {analyzeResults && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-black rounded-xl border border-white p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>

              {analyzeResults.map((result, index) => (
                <div key={index} className="mb-8 border-b border-white pb-4 last:border-b-0">
                  <h3 className="text-xl font-semibold mb-4">{result.filename}</h3>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Match Percentage</h4>
                    <div className="bg-white/20 rounded-full h-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.matchPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-white h-full rounded-full"
                      />
                    </div>
                    <p className="text-right text-sm mt-1">{result.matchPercentage}% Match</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Summary</h4>
                    <p className="text-gray-300">{result.summary}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Strengths</h4>
                    <ul className="list-disc list-inside text-green-400">
                      {result.strengths.map((strength, strengthIndex) => (
                        <li key={strengthIndex}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Weaknesses</h4>
                    <ul className="list-disc list-inside text-red-400">
                      {result.weaknesses.map((weakness, weaknessIndex) => (
                        <li key={weaknessIndex}>{weakness}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Recommendation</h4>
                    <p className="text-gray-300">{result.recommendation}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
};
      




const Button = ({ children, ...props }) => (
  <button
    className="bg-white text-black font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
    {...props}
  >
    {children}
  </button>
);

export default RecruiterDashboard;