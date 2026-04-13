import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  // API Routes
  app.post("/api/enroll", async (req, res) => {
    try {
      if (!SCRIPT_URL) {
        throw new Error("GOOGLE_SCRIPT_URL is not configured");
      }

      const { studentName, studentEmail, courseTitle, phone } = req.body;
      
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "enroll",
          data: {
            timestamp: new Date().toISOString(),
            studentName,
            studentEmail,
            courseTitle,
            phone
          }
        }),
      });

      const responseText = await response.text();
      console.log("Google Script Response:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Invalid response from Google Script: ${responseText.substring(0, 100)}`);
      }

      if (!response.ok || result.success !== true) {
        throw new Error(result.error || "Failed to save to Google Sheets via Script");
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error saving enrollment to Google Sheets:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      if (!SCRIPT_URL) {
        throw new Error("GOOGLE_SCRIPT_URL is not configured");
      }

      const { fullName, email, subject, message } = req.body;
      
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "contact",
          data: {
            timestamp: new Date().toISOString(),
            fullName,
            email,
            subject,
            message
          }
        }),
      });

      const responseText = await response.text();
      console.log("Google Script Contact Response:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Invalid response from Google Script: ${responseText.substring(0, 100)}`);
      }

      if (!response.ok || result.success !== true) {
        throw new Error(result.error || "Failed to save inquiry to Google Sheets via Script");
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error saving inquiry to Google Sheets:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/sheet-data", async (req, res) => {
    try {
      if (!SCRIPT_URL) {
        throw new Error("GOOGLE_SCRIPT_URL is not configured");
      }

      const response = await fetch(`${SCRIPT_URL}?action=getData`);
      if (!response.ok) throw new Error("Failed to fetch data from Google Sheets via Script");
      
      const result = await response.json();
      res.json({ data: result.data || [] });
    } catch (error: any) {
      console.error("Error reading from Google Sheets:", error);
      res.status(500).json({ error: error.message });
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
