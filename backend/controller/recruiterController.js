const Recruiter = require("../Model/recruiter.js");
const { extractTextFromPDF, extractTextFromDOC } = require("../utils/geminiUtils");
const ResumeModel = require("../Model/resumeModel.js");
const axios = require("axios");
const fs = require("fs");

// Get recruiter dashboard
const getDashboard = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user.id).select("-password");
    res.json(recruiter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload multiple resumes
const uploadResumes = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const extractedTexts = [];
    for (const file of files) {
      try {
        let text = "";
        if (file.mimetype === "application/pdf") {
          text = await extractTextFromPDF(file.path);
        } else if (
          file.mimetype === "application/msword" ||
          file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          text = await extractTextFromDOC(file.path);
        } else {
          throw new Error("Unsupported file type");
        }

        // Validate if the extracted text is a resume
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

        const isValidResume = resumePatterns.some((pattern) => pattern.test(text));
        if (!isValidResume) {
          throw new Error("Uploaded file does not appear to be a valid resume");
        }

        extractedTexts.push({ filename: file.originalname, text });
      } catch (error) {
        console.error(`Error processing file ${file.originalname}:`, error);
        extractedTexts.push({
          filename: file.originalname,
          error: error.message,
        });
      } finally {
        // Delete the uploaded file after processing
        fs.unlinkSync(file.path);
      }
    }

    res.status(200).json({
      message: "Resumes uploaded successfully",
      data: extractedTexts,
    });
  } catch (error) {
    console.error("Error uploading resumes:", error);
    res.status(500).json({ error: "Failed to upload resumes" });
  }
};

// Analyze resumes against job description
const analyzeResumes = async () => {
  if (resumes.length === 0) {
    setError("Please upload at least one resume.");
    return;
  }

  if (jobDescriptionWordCount < 50) {
    setError("Job description must be at least 50 words.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const batchSize = 5; // Process 5 resumes at a time
    const delayBetweenBatches = 5000; // 5 seconds delay between batches
    const analysisResults = [];

    for (let i = 0; i < resumes.length; i += batchSize) {
      const batch = resumes.slice(i, i + batchSize);
      const token = localStorage.getItem("token");

      // Process each resume in the batch
      const batchResults = await Promise.all(
        batch.map(async (resume) => {
          let retries = 3; // Retry up to 3 times
          while (retries > 0) {
            try {
              const response = await axios.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDTmpqjsYvoft5S2LJmBMnue8sSXRjgA0w",
                {
                  contents: [
                    {
                      parts: [
                        {
                          text: `
                            Analyze this resume against the job description and provide a concise analysis in exactly this format:

                            **Match Percentage**: [number]%

                            **Summary**: 
                            One or two sentences about overall fit.

                            **Strengths**:
                            * Key strength 1
                            * Key strength 2
                            * Key strength 3

                            **Weaknesses**:
                            * Missing skill 1
                            * Missing skill 2
                            * Missing skill 3

                            **Recommendation**:
                            One sentence recommendation.

                            Resume Text:
                            ${resume.text}

                            Job Description:
                            ${jobDescription}

                            Rules:
                            1. Keep all sections brief and to the point
                            2. Strengths and Weaknesses should be bullet points starting with *
                            3. Use exact section headers with ** marks
                            4. Match percentage should be a number between 0-100
                            5. Maximum 3-4 points each in Strengths and Weaknesses
                            6. No extra sections or text
                          `,
                        },
                      ],
                    },
                  ],
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );

              return {
                filename: resume.filename,
                ...parseAnalysisResponse(response.data.candidates[0].content.parts[0].text),
                isShortlisted: parseAnalysisResponse(response.data.candidates[0].content.parts[0].text).matchPercentage > 70,
              };
            } catch (error) {
              if (error.response?.status === 429 && retries > 0) {
                // Retry after a delay
                retries--;
                await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
              } else {
                throw error; // Throw error if retries are exhausted or it's not a 429 error
              }
            }
          }
          return null; // Skip this resume if all retries fail
        })
      );

      analysisResults.push(...batchResults.filter((result) => result !== null));

      // Add a delay between batches to avoid rate limiting
      if (i + batchSize < resumes.length) {
        await new Promise((resolve) => setTimeout(resolve, delayBetweenBatches));
      }
    }

    setAnalyzeResults(analysisResults);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    const newShortlisted = analysisResults
      .filter((result) => result.isShortlisted)
      .map((result) => result.filename);
    setShortlistedResumes((prevShortlisted) => [
      ...prevShortlisted,
      ...newShortlisted,
    ]);
  } catch (error) {
    console.error("Error analyzing resumes:", error);
    setError("Failed to analyze resumes. Please try again.");
  } finally {
    setLoading(false);
  }
};

// Helper function to parse the Gemini API response
const parseAnalysisResponse = (analysisText) => {
  const result = {
    matchPercentage: 0,
    summary: "No summary available",
    strengths: ["No strengths listed"],
    weaknesses: ["No weaknesses listed"],
    recommendation: "No recommendation available",
  };

  try {
    // Extract Match Percentage
    const matchPercentageMatch = analysisText.match(/\*\*Match Percentage\*\*:\s*(\d+)%/);
    if (matchPercentageMatch) {
      result.matchPercentage = parseFloat(matchPercentageMatch[1]);
    }

    // Extract Summary
    const summaryMatch = analysisText.match(/\*\*Summary\*\*:\s*([\s\S]*?)(?=\n\s*\*\*Strengths\*\*|\n\s*\*\*Weaknesses\*\*|\n\s*\*\*Recommendation\*\*|$)/);
    if (summaryMatch) {
      result.summary = summaryMatch[1].trim();
    }

    // Extract Strengths
    const strengthsMatch = analysisText.match(/\*\*Strengths\*\*:\s*([\s\S]*?)(?=\n\s*\*\*Weaknesses\*\*|\n\s*\*\*Recommendation\*\*|$)/);
    if (strengthsMatch) {
      result.strengths = strengthsMatch[1]
        .split("\n")
        .map((s) => s.replace(/^\*\s*/, "").trim())
        .filter((s) => s.length > 0);
    }

    // Extract Weaknesses
    const weaknessesMatch = analysisText.match(/\*\*Weaknesses\*\*:\s*([\s\S]*?)(?=\n\s*\*\*Recommendation\*\*|$)/);
    if (weaknessesMatch) {
      result.weaknesses = weaknessesMatch[1]
        .split("\n")
        .map((s) => s.replace(/^\*\s*/, "").trim())
        .filter((s) => s.length > 0);
    }

    // Extract Recommendation
    const recommendationMatch = analysisText.match(/\*\*Recommendation\*\*:\s*([\s\S]*?)(?=\n|$)/);
    if (recommendationMatch) {
      result.recommendation = recommendationMatch[1].trim();
    }
  } catch (error) {
    console.error("Error parsing analysis response:", error);
  }

  console.log("Parsed Results:", result);
  return result;
};

// Get shortlisted resumes
const getShortlistedResumes = async (req, res) => {
  try {
    const shortlistedResumes = await ResumeModel.find({ isShortlisted: true });
    res.status(200).json({ data: shortlistedResumes });
  } catch (error) {
    console.error("Error fetching shortlisted resumes:", error);
    res.status(500).json({ error: "Failed to fetch shortlisted resumes" });
  }
};

module.exports = {
  uploadResumes,
  analyzeResumes,
  getShortlistedResumes,
  getDashboard,
};