import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

// Helper function to count words
const countWords = (text) => {
  return text.trim().split(/\s+/).filter((word) => word !== "").length;
};

const StudentDashboard = () => {
  const [resume, setResume] = useState({ file: null, text: "" });
  const [jobDescription, setJobDescription] = useState("");
  const [jobDescriptionWordCount, setJobDescriptionWordCount] = useState(0);
  const [analyzeResults, setAnalyzeResults] = useState(null);
  const [tellAboutResumeResults, setTellAboutResumeResults] = useState(null);
  const [missingKeywordsResults, setMissingKeywordsResults] = useState(null);
  const [improveSkillsResults, setImproveSkillsResults] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "https://resumeai-h4y7.onrender.com/api/upload-resume",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload resume");
        }

        const data = await response.json();
        setResume({ file, text: data.text });
      } catch (error) {
        setError("Failed to upload resume. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleJobDescriptionChange = (event) => {
    const text = event.target.value;
    setJobDescription(text);
    const wordCount = countWords(text);
    setJobDescriptionWordCount(wordCount);
  };

  const analyzeResume = async () => {
    if (!resume.text) {
      setError("Please upload a resume.");
      return;
    }

    if (!jobDescription) {
      setError("Please provide a job description.");
      return;
    }

    if (jobDescriptionWordCount < 50) {
      setError("Job description must be at least 50 words. Please provide a more detailed job description.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://resumeai-h4y7.onrender.com/api/analyze-resume",
        {
          method: "POST",
          body: JSON.stringify({
            resumeText: resume.text,
            jobDescription,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setAnalyzeResults(data);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tellAboutResume = async () => {
    if (!resume.text) {
      setError("Please upload a resume first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://resumeai-h4y7.onrender.com/api/tell-about-resume",
        {
          method: "POST",
          body: JSON.stringify({
            resumeText: resume.text,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get resume summary");
      }

      const data = await response.json();
      setTellAboutResumeResults(
        data.summary
          .replace(/\*/g, "")
          .split("\n")
          .filter((line) => line.trim() !== "")
      );
    } catch (error) {
      setError("Failed to get resume summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const improveSkills = async () => {
    if (!resume.text) {
      setError("Please upload a resume.");
      return;
    }

    if (!jobDescription) {
      setError("Please provide a job description.");
      return;
    }

    if (jobDescriptionWordCount < 50) {
      setError("Job description must be at least 50 words. Please provide a more detailed job description.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://resumeai-h4y7.onrender.com/api/improve-skills",
        {
          method: "POST",
          body: JSON.stringify({
            resumeText: resume.text,
            jobDescription,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get skill improvement suggestions");
      }

      const data = await response.json();
      setImproveSkillsResults(
        Array.isArray(data.suggestions)
          ? data.suggestions.map((s) => s.replace(/^\*\s*/, ""))
          : data.suggestions
              .replace(/\*/g, "")
              .split("\n")
              .filter((line) => line.trim() !== "")
      );
    } catch (error) {
      setError("Failed to get skill improvement suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const missingKeywords = async () => {
    if (!resume.text) {
      setError("Please upload a resume.");
      return;
    }

    if (!jobDescription) {
      setError("Please provide a job description.");
      return;
    }

    if (jobDescriptionWordCount < 50) {
      setError("Job description must be at least 50 words. Please provide a more detailed job description.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://resumeai-h4y7.onrender.com/api/missing-keywords",
        {
          method: "POST",
          body: JSON.stringify({
            resumeText: resume.text,
            jobDescription,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to identify missing keywords");
      }

      const data = await response.json();
      setMissingKeywordsResults(
        Array.isArray(data.missingKeywords)
          ? data.missingKeywords.map((k) => k.replace(/^\*\s*/, ""))
          : data.missingKeywords
              .replace(/\*/g, "")
              .split(",")
              .map((k) => k.trim())
              .filter((k) => k !== "")
      );
    } catch (error) {
      setError("Failed to identify missing keywords. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ResultSection = ({ title, content, textColor = "text-gray-300" }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="text-white bg-black rounded-xl border border-white p-6 mb-6"
    >
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className={`${textColor} bg-black/20 p-4 rounded-md`}>
        {Array.isArray(content) ? (
          <ul className="list-disc list-inside">
            {content.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider">RESUME ANALYZER</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-black rounded-xl border border-white p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
            <input
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="text-white w-full border border-white p-5 rounded-md bg-black"
              disabled={loading}
            />
            {loading && !resume.text && (
              <div className="flex items-center mt-2 text-blue-400">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full mr-2"
                />
                Parsing your resume...
              </div>
            )}
            {resume.file && (
              <p className="text-sm mt-2">{resume.file.name} uploaded</p>
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
              disabled={loading}
            />
            <p className="text-sm mt-2 text-gray-400">
              More than 50 words required.
            </p>
          </motion.div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            onClick={analyzeResume}
            disabled={!resume.text || jobDescriptionWordCount < 50 || loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>
          <Button onClick={tellAboutResume} disabled={!resume.text || loading}>
            Tell Me About Resume
          </Button>
          <Button
            onClick={improveSkills}
            disabled={!resume.text || jobDescriptionWordCount < 50 || loading}
          >
            How Can I Improve My Skills
          </Button>
          <Button
            onClick={missingKeywords}
            disabled={!resume.text || jobDescriptionWordCount < 50 || loading}
          >
            The Keywords Missing
          </Button>
        </div>

        <AnimatePresence>
          {analyzeResults && (
            <ResultSection
              title="Analysis Results"
              content={
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">
                      Match Percentage
                    </h3>
                    <div className="bg-white/20 rounded-full h-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${analyzeResults.matchPercentage}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-white h-full rounded-full"
                      />
                    </div>
                    <p className="text-right text-sm mt-1">
                      {analyzeResults.matchPercentage}% Match
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Missing Skills</h3>
                    <ul className="list-disc list-inside text-red-400">
                      {analyzeResults.missingSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Improvement Suggestions
                    </h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {analyzeResults.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </>
              }
            />
          )}

          {tellAboutResumeResults && (
            <ResultSection
              title="Resume Summary"
              content={tellAboutResumeResults}
            />
          )}

          {improveSkillsResults && (
            <ResultSection
              title="Skill Improvement Suggestions"
              content={improveSkillsResults}
            />
          )}

          {missingKeywordsResults && (
            <ResultSection
              title="Missing Keywords"
              content={missingKeywordsResults}
              textColor="text-red-400"
            />
          )}
        </AnimatePresence>
      </div>
      {showConfetti && <Confetti colors={["#FFFFFF", "#CCCCCC"]} />}
    </div>
  );
};

const Button = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white text-black font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
    {...props}
  >
    {children}
  </motion.button>
);

export default StudentDashboard;