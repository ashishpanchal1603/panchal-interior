import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadName, leadPhone, leadEmail, leadMessage, calcType, details } = body;

    console.log("\n--- [INQUIRY ATTEMPT] ---");
    console.log(`👤 Name: ${leadName}`);
    console.log(`📞 Phone: ${leadPhone}`);
    console.log(`✉️ Email: ${leadEmail || "Not Provided"}`);
    console.log(`💬 Notes: ${leadMessage || "None"}`);
    console.log(`🛠️ Type: ${calcType || "General Quote Request"}`);

    if (!leadName || !leadPhone) {
      console.warn("⚠️ Aborting inquiry: Missing name or phone number.");
      return NextResponse.json(
        { error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    // Logging to local database file (data/leads.json)
    try {
      const dataDirectory = path.join(process.cwd(), "data");
      const filePath = path.join(dataDirectory, "leads.json");

      // Ensure directory exists
      await fs.mkdir(dataDirectory, { recursive: true });

      let currentLeads = [];
      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        currentLeads = JSON.parse(fileContent);
      } catch (readError) {
        currentLeads = [];
      }

      const newLead = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        leadName,
        leadPhone,
        leadEmail: leadEmail || "",
        leadMessage: leadMessage || "",
        calcType: calcType || "general",
        details: details || null,
        createdAt: new Date().toISOString(),
        status: "Pending" // Default status
      };

      currentLeads.push(newLead);
      await fs.writeFile(filePath, JSON.stringify(currentLeads, null, 2), "utf-8");
      console.log("📁 Lead logged successfully to local database leads.json");
    } catch (dbError) {
      console.error("❌ Failed to log lead to leads.json database:", dbError);
    }

    // 1. Generate text summaries for email and text alerts
    let summaryText = "";
    let summaryHtml = "";

    if (calcType === "full") {
      const { bhk, packageTier, scope } = details;
      summaryText = `🏠 Config: ${bhk}\n💎 Package: ${packageTier}\n🛠️ Included: ${scope.join(", ")}`;
      summaryHtml = `
        <p><strong>🏠 Configuration:</strong> ${bhk.replace("-", " ").toUpperCase()}</p>
        <p><strong>💎 Quality Package:</strong> ${packageTier.toUpperCase()}</p>
        <p><strong>🛠️ Included Rooms:</strong> ${scope.map((s: string) => `<span style="background:#f4eae0; color:#493d2e; padding:3px 8px; border-radius:4px; font-size:11px; margin-right:5px; font-weight:bold;">${s}</span>`).join(" ")}</p>
      `;
    } else if (calcType === "kitchen") {
      const { layout, lengthA, lengthB, lengthC, finish } = details;
      const runningFeet = layout === "straight" ? lengthA : layout === "u-shape" ? (lengthA + lengthB + (lengthC || 8)) : (lengthA + lengthB);
      summaryText = `📐 Kitchen Layout: ${layout}\n📏 Sizing: Side A: ${lengthA}ft${lengthB ? `, Side B: ${lengthB}ft` : ""}${lengthC ? `, Side C: ${lengthC}ft` : ""}\n✨ Total: ${runningFeet} running ft\n🎨 Finish: ${finish}`;
      summaryHtml = `
        <p><strong>📐 Kitchen Layout:</strong> ${layout.replace("-", " ").toUpperCase()}</p>
        <p><strong>📏 Sizing:</strong> Side A: ${lengthA}ft ${lengthB ? `x Side B: ${lengthB}ft` : ""}${lengthC ? ` x Side C: ${lengthC}ft` : ""}</p>
        <p><strong>✨ Total Length:</strong> ${runningFeet} running ft</p>
        <p><strong>🎨 Shutter Finish:</strong> ${finish.toUpperCase()}</p>
      `;
    } else if (calcType === "wardrobe") {
      const { type, width, height, finish } = details;
      const area = width * height;
      summaryText = `🚪 Wardrobe Style: ${type}\n📏 Size: ${width}ft (W) x ${height}ft (H)\n✨ Area: ${area} sq.ft\n🎨 Finish: ${finish}`;
      summaryHtml = `
        <p><strong>🚪 Wardrobe Style:</strong> ${type.toUpperCase()}</p>
        <p><strong>📏 Sizing:</strong> ${width}ft (W) x ${height}ft (H)</p>
        <p><strong>✨ Total Area:</strong> ${area} sq.ft</p>
        <p><strong>🎨 Door Finish:</strong> ${finish.toUpperCase()}</p>
      `;
    }

    // Subject lines
    const emailSubject = `New Lead: ${leadName} - ${calcType ? calcType.toUpperCase() : "General Inquiry"}`;
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e7dfd3; border-radius: 12px; background-color: #fffdfa;">
        <h2 style="color: #b08752; font-family: serif; border-bottom: 2px solid #b08752; padding-bottom: 10px; margin-top: 0;">Panchal Interior Lead Alert</h2>
        
        <p style="font-size: 14px; color: #5c4f3d;">A user has submitted a new inquiry. Here are the details:</p>
        
        <div style="background-color: #faf7f2; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2a2015; margin-top: 0; font-size: 15px; border-bottom: 1px solid #e7dfd3; padding-bottom: 5px;">Customer Contact Information</h3>
          <p style="margin: 6px 0; font-size: 13px;"><strong>👤 Name:</strong> ${leadName}</p>
          <p style="margin: 6px 0; font-size: 13px;"><strong>📞 Phone:</strong> <a href="tel:${leadPhone}" style="color: #b08752; text-decoration: none; font-weight: bold;">${leadPhone}</a></p>
          ${leadEmail ? `<p style="margin: 6px 0; font-size: 13px;"><strong>✉️ Email:</strong> <a href="mailto:${leadEmail}" style="color: #b08752; text-decoration: none;">${leadEmail}</a></p>` : ""}
          ${leadMessage ? `<p style="margin: 6px 0; font-size: 13px;"><strong>💬 Project Details:</strong> ${leadMessage}</p>` : ""}
        </div>
        
        ${calcType ? `
        <div style="background-color: #faf7f2; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2a2015; margin-top: 0; font-size: 15px; border-bottom: 1px solid #e7dfd3; padding-bottom: 5px;">Estimator Specifications</h3>
          <div style="font-size: 13px; line-height: 1.6; color: #5c4f3d;">
            ${summaryHtml}
          </div>
        </div>
        ` : ""}
        
        <p style="font-size: 11px; color: #a79a86; text-align: center; border-top: 1px solid #e7dfd3; padding-top: 15px; margin-top: 30px;">
          This lead was generated automatically from Gota, Ahmedabad cost estimator page.
        </p>
      </div>
    `;

    // 2. Dispatch SMTP Email Alert
    let emailSent = false;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.RECEIVER_EMAIL) {
      console.log("📨 Attempting to send email via SMTP...");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Panchal Interior Lead" <${process.env.SMTP_USER}>`,
        to: process.env.RECEIVER_EMAIL,
        subject: emailSubject,
        html: emailHtml,
      });
      emailSent = true;
      console.log(`✅ Email sent successfully to ${process.env.RECEIVER_EMAIL}`);
    } else {
      console.warn("⚠️ SMTP email notification skipped: Missing SMTP environment variables in .env.local.");
    }

    // 3. Dispatch Telegram Notification (Instant Text notification)
    let telegramSent = false;
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      console.log("💬 Attempting to send Telegram notification...");
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      
      const telegramMessage = `✨ *New Lead Received* ✨\n\n` +
        `👤 *Name:* ${leadName}\n` +
        `📞 *Phone:* ${leadPhone}\n` +
        (leadEmail ? `✉️ *Email:* ${leadEmail}\n` : "") +
        (leadMessage ? `💬 *Notes:* ${leadMessage}\n` : "") +
        (calcType ? `\n🛠️ *Specs:*\n${summaryText}` : "");

      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      });
      
      if (response.ok) {
        telegramSent = true;
        console.log("✅ Telegram message sent successfully!");
      } else {
        const errorText = await response.text();
        console.error("❌ Telegram API error response:", errorText);
      }
    } else {
      console.warn("⚠️ Telegram notification skipped: Missing TELEGRAM environment variables in .env.local.");
    }

    return NextResponse.json({
      success: true,
      emailSent,
      telegramSent,
    });
  } catch (error: any) {
    console.error("Inquiry Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
