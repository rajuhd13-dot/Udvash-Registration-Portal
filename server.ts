import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route for submission
  app.post("/api/submit", async (req, res) => {
    console.log("Received POST to /api/submit");
    try {
      const data = req.body;
      console.log("Data received:", data);
      const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL?.trim();
      console.log("Using SCRIPT_URL (length:", SCRIPT_URL?.length, "):", SCRIPT_URL);

      if (!SCRIPT_URL || SCRIPT_URL === "undefined" || !SCRIPT_URL.startsWith("http")) {
        console.error("Invalid or missing GOOGLE_SCRIPT_URL:", SCRIPT_URL);
        return res.status(400).json({ 
          success: false, 
          error: "Invalid Setup",
          details: `The GOOGLE_SCRIPT_URL environment variable is either missing or invalid. Received: "${SCRIPT_URL}". Please ensure it is correctly defined in the platform's Environment Variables (not just .env.example).` 
        });
      }

      // Helper to ensure leading zeros are preserved in Google Sheets by prepending a single quote
      const formatString = (val: any) => {
        if (val === undefined || val === null || val === '') return '';
        return `'${val}`;
      };

      // Map fields to match human-readable headers for the user's Google Sheet
      const mappedData = {
        'Timestamp': new Date().toLocaleString('en-GB'), // A
        'Full Name': data.fullName || '', // B
        'Nick Name': data.nickName || '', // C
        'T-PIN': formatString(data.teachersPin), // E (D is empty/hidden)
        'Institute': data.institute || '', // F
        'Department': data.department || '', // G
        'HSC Passing Year': data.hscPassingYear || '', // H
        'Religion': data.religion || '', // K (I, J are empty)
        'Gender': data.gender || '', // L
        'Mobile Number 1': formatString(data.mobileNumber1), // M
        'Mobile Number 2': formatString(data.mobileNumber2), // N
        'Nagad Number': formatString(data.nagadNumber), // O
        'Email': data.email || '', // V (P, Q, R, S, T, U are empty)
        'Facebook ID': data.facebookId || '', // W
        'Teacher Activity Choice 1': data.activities?.[0] || '', // X
        'Teacher Activity Choice 2': data.activities?.[1] || '', // Y
        'Teacher Activity Choice 3': data.activities?.[2] || '', // Z
        'Teacher Activity Choice 4': data.activities?.[3] || '', // AA
        'Subjects': (() => {
          const subjects = (data.subjects || []).filter((s: any) => s && String(s).trim() !== '');
          const scriptSubjects = (data.scriptSubjects || [])
            .filter((s: any) => s && String(s).trim() !== '')
            .map((s: any) => `(Script E: ${s})`);
          return Array.from(new Set([...subjects, ...scriptSubjects])).join(', ');
        })(), // AB
        'Version Priority Choice 1': data.versionPriority?.[0] || '', // AC
        'Version Priority Choice 2': data.versionPriority?.[1] || '', // AD
        'Medium of Study (HSC Level)': data.mediumOfEducation || '', // AE
        'MS Teams Telegram': data.teamsTelegram || '', // AF
        'Admition Unit': data.admissionUnit || '', // AG
        'Admission Position': formatString(data.admissionPosition), // AH
        'HSC Number': formatString(data.hscRoll), // AI
        'HSC Reg Number': formatString(data.hscRegistration), // AJ
        'HSC Board': data.hscBoard || '', // AK
        'HSC GPA': formatString(data.gpa), // AL
        'Evaluation Method': data.evaluationMethod || '', // AM
        'বাংলায় সম্পূর্ণ নাম': data.bengaliName || '', // AN
        'Date of Birth': data.dob || '', // AO
        'Blood Group': data.bloodGroup || '', // AP
        'College Name': data.collegeName || '', // AQ
        'Fathers Name': data.fatherName || '', // AR
        'Fathers Occupation': data.fatherOccupation || '', // AS
        'Fathers Mobile': formatString(data.fatherMobile), // AT
        'Mothers Name': data.motherName || '', // AU
        'Mothers Occupation': data.motherOccupation || '', // AV
        'Mothers Mobile': formatString(data.motherMobile), // AW
        'National ID No': formatString(data.nid), // AX
        'Present Area': data.presentArea || '', // AY
        'Home District': data.homeDistrict || '', // AZ
        'Campus': data.campus || '', // BX (Gap from BA-BW)
        'Evaluation Shift': Array.isArray(data.evaluationShift) ? data.evaluationShift.join(', ') : (data.evaluationShift || ''), // BY
        'Image File Name': data.userImgName || '', // CC (Gap from BZ-CB)
        'ID Card File Name': data.idCardName || '', // CD
        'Academic Student': data.isAcademicStudent || '', // CE
        'Why Join': data.whyJoin || '', // CF
        'Action': 'Pending', // CG
        'action': 'registration' 
      };

      console.log("Sending to Apps Script:", SCRIPT_URL);
      console.log("Mapped Data Sample:", JSON.stringify(mappedData).substring(0, 500) + "...");

      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(mappedData),
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        signal: controller.signal
      });
      clearTimeout(id);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Apps Script Error Response:", errorText);
        throw new Error(`Google Script returned ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("Apps Script Result:", result);

      if (result.success || result.status === "success") {
        res.json({ success: true, message: "Successfully submitted to Google Sheets!" });
      } else {
        console.error("Apps Script reported failure:", result);
        throw new Error(result.error || "Apps Script failed to process the request");
      }
    } catch (error: any) {
      console.error("Critical Error in /api/submit:", error);
      res.status(500).json({ 
        success: false, 
        error: "Submission Error", 
        details: error.message || "Failed to communicate with Google Apps Script. Double check the URL and deployment settings."
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
