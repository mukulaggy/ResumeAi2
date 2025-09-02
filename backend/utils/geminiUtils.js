const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const axios = require("axios");
const fs = require("fs");

// Extract text from a PDF file or Bufferc
const extractTextFromPDF = async (input) => {
  try {
    let dataBuffer;

    if (Buffer.isBuffer(input)) {
      // Input is already a buffer
      dataBuffer = input;
    } else if (typeof input === "string") {
      // Input is a file path
      dataBuffer = fs.readFileSync(input);
    } else {
      throw new Error(
        "Invalid input type for PDF extraction. Must be a Buffer or string path."
      );
    }

    const data = await pdfParse(dataBuffer);
    return data.text.trim(); // cleaner output
  } catch (error) {
    console.error("Error extracting text from PDF:", error.message);
    throw error;
  }
};



// Extract text from a DOC/DOCX file or Buffer
const extractTextFromDOC = async (input) => {
  try {
    if (Buffer.isBuffer(input)) {      // Write buffer to temp file and process
      const tmpPath = `/tmp/${Date.now()}.docx`;
      fs.writeFileSync(tmpPath, input);
      const result = await mammoth.extractRawText({ path: tmpPath });
      fs.unlinkSync(tmpPath);
      return result.value;
    } else if (typeof input === "string") {
      const result = await mammoth.extractRawText({ path: input });
      return result.value;
    } else {
      throw new Error("Invalid input type for DOC extraction");
    }
  } catch (error) {
    console.error("Error extracting text from DOC/DOCX:", error);
    throw error;
  }
};

// Analyze the resume against a job description using Gemini API
const analyzeResumeWithGemini = async (resumeText, jobDescription) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const prompt = `Analyze this resume against the job description and provide the following details:

Resume: ${resumeText}
Job Description: ${jobDescription}

Format:
Match Percentage: <percentage>
Missing Skills: <comma-separated list>
Suggestions: <improvement suggestions>
`;

    const response = await axios.post(
      url,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    return parseAnalysisResults(response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "");
  } catch (error) {
    console.error("Error analyzing resume with Gemini:", error);
    throw error;
  }
};

// Parse the response from Gemini API
const parseAnalysisResults = (analysisText) => {
  if (!analysisText) return { matchPercentage: 0, missingSkills: [], suggestions: [] };

  const cleanText = analysisText
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/-\s*/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\n\s*\n/g, "\n")
    .trim();

  const matchPercentageMatch = cleanText.match(/Match Percentage:\s*(\d+)%/);
  const matchPercentage = matchPercentageMatch ? parseInt(matchPercentageMatch[1], 10) : 0;

  const missingSkillsMatch = cleanText.match(/Missing Skills:\s*(.*?)(?=\n|$)/);
  const missingSkills = missingSkillsMatch
    ? missingSkillsMatch[1].split(/,\s*/).map((s) => s.trim())
    : [];

  const suggestionsMatch = cleanText.match(/Suggestions:\s*([\s\S]*)/i);
  const suggestions = suggestionsMatch
    ? suggestionsMatch[1].split(/\n/).map((s) => s.trim()).filter(Boolean)
    : [];

  return { matchPercentage, missingSkills, suggestions };
};

module.exports = { extractTextFromPDF, extractTextFromDOC, analyzeResumeWithGemini, parseAnalysisResults };