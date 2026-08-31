const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

// === Multer setup (store file in memory) ===
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("❌ Unsupported file type"));
  },
});

// === POST /api/contact/send ===
router.post("/send", upload.single("file"), async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, Email, and Message are required." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Capture the exact time of the request
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // === Full-Width, Fluid, Professional Email Template ===
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>New Portfolio Lead</title>
      <style>
        /* Email Client Resets */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; }
        
        /* Mobile Responsive Styles */
        @media screen and (max-width: 600px) {
          .fluid-container { width: 100% !important; max-width: 100% !important; border-radius: 0 !important;}
          .header-padding { padding: 30px 20px !important; }
          .content-padding { padding: 30px 20px !important; }
          .stack-column { display: block !important; width: 100% !important; margin-bottom: 15px !important; }
          .mobile-text-sm { font-size: 14px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f1f5f9;">

      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 20px 0;">
        <tr>
          <td align="center">
            
            <table class="fluid-container" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 800px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
              
              <tr>
                <td class="header-padding" align="left" style="background-color: #0f172a; padding: 40px; border-bottom: 4px solid #06b6d4;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="color: #06b6d4; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; padding-bottom: 5px;">
                        System Notification
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #ffffff; font-size: 28px; font-weight: 800; mso-line-height-rule: exactly; line-height: 1.2;">
                        New Connection Request
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #94a3b8; font-size: 14px; padding-top: 10px;">
                        Received on: ${timestamp} (IST)
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td class="content-padding" style="padding: 40px; background-color: #ffffff;">
                  
                  <h3 style="margin: 0 0 20px 0; color: #334155; font-size: 18px; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Sender Details</h3>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                    <tr>
                      <td class="stack-column" width="50%" valign="top" style="padding-bottom: 20px; padding-right: 10px;">
                        <p style="margin: 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Name</p>
                        <p style="margin: 5px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 600;">${name}</p>
                      </td>
                      <td class="stack-column" width="50%" valign="top" style="padding-bottom: 20px;">
                        <p style="margin: 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Email Address</p>
                        <p style="margin: 5px 0 0 0; color: #06b6d4; font-size: 16px; font-weight: 600;">
                          <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td class="stack-column" width="50%" valign="top" style="padding-right: 10px;">
                        <p style="margin: 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Phone</p>
                        <p style="margin: 5px 0 0 0; color: #0f172a; font-size: 16px;">${phone || "Not Provided"}</p>
                      </td>
                      <td class="stack-column" width="50%" valign="top">
                        <p style="margin: 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Subject</p>
                        <p style="margin: 5px 0 0 0; color: #0f172a; font-size: 16px;">${subject || "No Subject"}</p>
                      </td>
                    </tr>
                  </table>

                  <h3 style="margin: 0 0 15px 0; color: #334155; font-size: 18px; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Message Payload</h3>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="background-color: #f8fafc; border-left: 4px solid #06b6d4; padding: 20px; border-radius: 0 8px 8px 0;">
                        <p style="margin: 0; color: #334155; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                      </td>
                    </tr>
                  </table>

                  ${req.file ? `
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                    <tr>
                      <td style="background-color: #f0fdfa; border: 1px dashed #14b8a6; padding: 15px 20px; border-radius: 8px;">
                        <p style="margin: 0; color: #0f766e; font-size: 15px; font-weight: 600;">
                          📎 File Attached: <span style="font-weight: 400;">${req.file.originalname}</span>
                        </p>
                        <p style="margin: 5px 0 0 0; color: #0d9488; font-size: 12px;">The file has been attached securely to this email.</p>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                </td>
              </tr>

              <tr>
                <td align="center" style="background-color: #f8fafc; padding: 25px; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #64748b; font-size: 13px;">
                    Automated transmission from <strong>Alok Kumar's Cloud Portfolio</strong>.<br>
                    Hosted on Vercel Edge Network.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    // === Attachments ===
    const attachments = req.file
      ? [{ filename: req.file.originalname, content: req.file.buffer }]
      : [];

    // === Send Email ===
    await transporter.sendMail({
      from: `"${name} (Portfolio)" <${process.env.EMAIL_USER}>`, 
      replyTo: email, 
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `Portfolio Lead: ${subject || name}`,
      html: htmlContent,
      attachments,
    });

    res.json({ success: true, message: "✅ Message delivered successfully!" });
  } catch (err) {
    console.error("❌ Transmission Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Error handling middleware for Multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File is too large. Maximum size is 5MB." });
    }
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

module.exports = router;