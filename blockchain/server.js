// Import necessary libraries
const express = require('express');
const multer = require('multer'); // For handling file uploads
const cors = require('cors'); // For enabling Cross-Origin Resource Sharing
const fs = require('fs'); // For interacting with the file system
const path = require('path');  // For working with file paths
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Gemini AI SDK
require('dotenv').config(); // To load environment variables (like API key) from a .env file

// --- Configuration ---
const app = express(); // Create an Express application
const port = 5002; // Port the server will run on
const UPLOAD_DIR = './uploads'; // Folder to temporarily store uploaded images

// --- Middleware Setup ---
app.use(cors()); // Enable CORS for all origins (adjust in production if needed)
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

// --- File System Setup ---
// Create the uploads folder synchronously at startup if it doesn't exist
if (!fs.existsSync(UPLOAD_DIR)) {
  try {
    fs.mkdirSync(UPLOAD_DIR);
    console.log(`Created upload directory: ${UPLOAD_DIR}`);
  } catch (err) {
    console.error(`Error creating upload directory ${UPLOAD_DIR}:`, err);
    process.exit(1); // Exit if we can't create the upload folder
  }
}

// --- Multer Configuration (for File Uploads) ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR); // Save files to the uploads directory
  },
  filename: function (req, file, cb) {
    // Create a unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, ''); // Basic sanitization
    const finalFileName = uniqueSuffix + '-' + safeOriginalName;
    cb(null, finalFileName);
  }
});

// Multer middleware instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } // Limit file size (e.g., 15MB)
});

// --- Gemini API Initialization ---
// Check if the API key is loaded from the .env file
if (!process.env.GEMINI_API_KEY) {
  console.error("-----------------------------------------------------");
  console.error("FATAL ERROR: GEMINI_API_KEY is not defined.");
  console.error("Please create a '.env' file in the 'server' directory");
  console.error("and add the line: GEMINI_API_KEY=YOUR_ACTUAL_API_KEY");
  console.error("-----------------------------------------------------");
  process.exit(1); // Exit if API key is missing
}
// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- Helper Function ---
// Converts a file buffer (raw data) into the format Gemini needs
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString('base64'), // Convert buffer to base64 string
      mimeType
    },
  };
}

// --- API Endpoint: /analyze ---
// This handles the image upload and analysis request
// 1. Multer middleware (`upload.single`) handles the file upload first.
// 2. An intermediate function handles specific Multer errors.
// 3. The main async function processes the request if upload is successful.
app.post('/analyze', (req, res, next) => {
    // Let Multer process the 'image' field
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Handle known Multer errors (e.g., file size limit)
            console.error("Multer error during upload:", err);
            return res.status(400).json({ error: 'Image upload error', message: `Multer error: ${err.message}` });
        } else if (err) {
            // Handle other unexpected errors during upload
            console.error("Unknown error during upload:", err);
            return res.status(500).json({ error: 'Image upload failed', message: err.message });
        }
        // If upload is successful, proceed to the main route handler
        next();
    });
}, async (req, res) => { // Main route handler

  // Keep track of the uploaded file path for cleanup
  let uploadedFilePath = req.file ? req.file.path : null;
  // Variable to store the raw text response from Gemini
  let geminiResponseText = null;

  // Main try block for the analysis process
  try {
    // --- Input Validation ---
    // Check if an image file was actually uploaded
    if (!req.file) {
      console.log("Validation Error: No image file uploaded.");
      return res.status(400).json({ error: 'Please upload an image file using the "image" field.' });
    }
    // Ensure we stored the path correctly
    if (!uploadedFilePath) {
        console.error("Logic Error: req.file exists but uploadedFilePath is null.");
        return res.status(500).json({ error: "Internal server error processing file path."});
    }
    console.log(`Received image: ${uploadedFilePath}`);

    // Check if requirements text was provided
    if (!req.body.requirements) {
      console.log("Validation Error: No requirements provided.");
      return res.status(400).json({ error: 'Please add requirements in the "requirements" field.' });
    }

    // --- Parse Requirements ---
    let requirementsList;
    try {
      requirementsList = JSON.parse(req.body.requirements);
      // Validate that it's a non-empty array of strings
      if (!Array.isArray(requirementsList)) {
        throw new Error('Requirements must be a valid JSON array string.');
      }
      if (requirementsList.length === 0) {
        throw new Error('Requirements array cannot be empty.');
      }
      if (!requirementsList.every(item => typeof item === 'string' && item.trim() !== '')) {
         throw new Error('All items in the requirements array must be non-empty strings.');
       }
       console.log(`Parsed requirements: ${requirementsList.length} items`);
    } catch (parseError) {
      console.error("JSON Parsing Error for requirements:", parseError);
      // Send specific error for bad requirements format
      return res.status(400).json({ error: 'Invalid requirements format.', message: parseError.message });
    }

    // --- Prepare Prompt for Gemini ---
    // Instruct Gemini to return ONLY JSON
    const prompt = `Analyze the provided image against the following requirements. Return your response ONLY as a JSON array of objects. Each object must have exactly two keys: "requirement" (containing the exact text of the requirement) and "status" (containing only the string "Present" or "Not Present"). Do not include any introductory text, explanations, markdown formatting (like \`\`\`json), or anything else outside the JSON array itself.

Requirements List:
${JSON.stringify(requirementsList)}

Example of expected JSON output format:
[
  {"requirement": "The first requirement text", "status": "Present"},
  {"requirement": "The second requirement text", "status": "Not Present"}
]
`;

    // --- Prepare Image Data ---
    console.log(`Reading image file: ${uploadedFilePath}`);
    const imageBuffer = await fs.promises.readFile(uploadedFilePath); // Read file asynchronously
    const imagePart = fileToGenerativePart(imageBuffer, req.file.mimetype); // Convert to Gemini format

    // --- Call Gemini API ---
    console.log(`Using Gemini model: gemini-1.5-flash`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Sending request to Gemini API...");
    const result = await model.generateContent([prompt, imagePart]); // Send prompt and image
    const response = await result.response; // Get the response object

    // --- Handle Gemini Response ---
    // Check for safety blocks *before* trying to get text
    if (!response.candidates || response.candidates.length === 0 || !response.candidates[0].content) {
       console.error("Gemini Response Blocked or Empty:", response.promptFeedback || 'No feedback available');
       const blockReason = response.promptFeedback?.blockReason || 'Unknown';
       const safetyRatings = response.promptFeedback?.safetyRatings || [];
       return res.status(500).json({ // Use 500 or maybe 400/422 if it's due to prompt content
            error: 'Gemini response was empty or blocked.',
            details: `Reason: ${blockReason}. Safety Ratings: ${JSON.stringify(safetyRatings)}`
        });
     }

    // Assign the raw text response
    geminiResponseText = response.text();
    console.log("Received Gemini Raw Response (first 100 chars):", geminiResponseText.substring(0, 100) + "...");

    // --- Process Gemini's Text Response (Parse JSON) ---
    let analysisResults = []; // To store the parsed [{requirement, status}, ...]
    let presentCount = 0;     // To count how many requirements are "Present"
    const totalRequirements = requirementsList.length; // Original number sent

    // Inner try block specifically for parsing the JSON response
    try {
        // Ensure we actually got some text
        if (typeof geminiResponseText !== 'string' || geminiResponseText.trim() === '') {
             throw new Error("Gemini response text is empty or not a string.");
        }

        // Attempt to extract the JSON array part (in case Gemini adds extra text/markdown)
        const jsonMatch = geminiResponseText.match(/(\[\s*\{[\s\S]*?\}\s*\])/);
        let jsonStringToParse;

        if (!jsonMatch || !jsonMatch[0]) {
            // If no clear array markers found, try parsing the whole trimmed text
            console.warn("No clear JSON array markers (like [ ... ]) found in response. Attempting to parse entire response text.");
            jsonStringToParse = geminiResponseText.trim();
        } else {
            // Found something looking like a JSON array, parse that part
            console.log("Potential JSON array markers found. Parsing extracted part.");
            jsonStringToParse = jsonMatch[0];
        }

        // Parse the determined JSON string
        analysisResults = JSON.parse(jsonStringToParse);

        // Validate the parsed result
        if (!Array.isArray(analysisResults)) {
            throw new Error("Parsed response is not a valid JSON array.");
        }

        // Iterate through the parsed results, validate structure, and count "Present"
        let processedRequirementsCount = 0;
        analysisResults.forEach((item, index) => {
            if (item && typeof item === 'object' && item.hasOwnProperty('requirement') && item.hasOwnProperty('status')) {
                 processedRequirementsCount++;
                 // Count only if status is "Present" (case-insensitive check)
                 if (typeof item.status === 'string' && item.status.trim().toLowerCase() === 'present') {
                     presentCount++;
                 }
            } else {
                 // Warn if an item doesn't match the expected format
                 console.warn(`Skipping invalid item structure in Gemini JSON response at index ${index}:`, JSON.stringify(item));
            }
        });

        // Log a warning if the number of results from Gemini doesn't match the input
        if (processedRequirementsCount !== totalRequirements) {
            console.warn(`Warning: Gemini returned ${processedRequirementsCount} valid results, but ${totalRequirements} requirements were originally sent. Calculation based on original total.`);
        }

    } catch (jsonError) { // Catch errors specifically from JSON parsing
        console.error("Failed to parse Gemini response as JSON:", jsonError);
        // Check if we have the raw text to include in the error response
        if (geminiResponseText !== null) {
            console.error("Gemini Raw Response that failed parsing:", geminiResponseText);
            return res.status(500).json({
                error: "Failed to process Gemini's response structure.",
                details: `Could not parse the analysis results as expected JSON. ${jsonError.message}`,
                geminiRawResponse: geminiResponseText // Include raw response for debugging
            });
        } else {
             // Raw text wasn't available (e.g., response was blocked earlier)
            return res.status(500).json({
                error: "Failed to process Gemini's response structure.",
                details: `Could not parse the analysis results as expected JSON. Raw response text was not available. ${jsonError.message}`,
                geminiRawResponse: null // Indicate raw text is unavailable
            });
        }
    }

    // --- Calculate Final Percentage ---
    // Calculate based on the accurate count from JSON parsing
    const presentPercentage = totalRequirements > 0
        ? Math.round((presentCount / totalRequirements) * 100)
        : 0; // Avoid division by zero

    // --- Send Successful Response to Frontend ---
    console.log(`Analysis complete: ${presentCount}/${totalRequirements} present (${presentPercentage}%)`);
    res.status(200).json({
        total: totalRequirements,
        present: presentCount,
        notPresent: totalRequirements - presentCount,
        percentage: presentPercentage,
        analysisDetails: analysisResults, // The structured array of results
        geminiRawResponse: geminiResponseText // The original raw text from Gemini
    });

  // Outer catch block for any other errors during the process
  } catch (error) {
    console.error('Error in /analyze endpoint:', error); // Log the full error server-side
    res.status(500).json({
        error: 'An unexpected error occurred during analysis.',
        // Avoid sending detailed internal error messages like error.message to the client in production
        // details: error.message // Potentially include this during development/debugging
    });
  // Finally block ensures the uploaded file is deleted even if errors occur
  } finally {
    if (uploadedFilePath) {
      try {
        await fs.promises.unlink(uploadedFilePath); // Asynchronously delete the file
        console.log(`Deleted uploaded file: ${uploadedFilePath}`);
      } catch (unlinkErr) {
        // Log deletion errors, but don't block the response
        console.error(`Error deleting uploaded file ${uploadedFilePath}:`, unlinkErr);
      }
    }
  }
});

// --- Basic Root Route ---
// Just to check if the server is running
app.get('/', (req, res) => {
    res.send('Gemini Requirement Analyzer Server is running.');
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});