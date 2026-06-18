import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, city, model, budget, message } = body;

    // 1. Validation
    if (!name || !phone || !email || !city || !model || !budget) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Format phone with prefix if not already present
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    const formattedPhone = phone.startsWith("+") ? phone : `+91 ${cleanPhone}`;

    // 2. Save enquiry to database
    const { data: dbData, error: dbError } = await supabase
      .from("franchise_enquiries")
      .insert([
        {
          full_name: name,
          phone: formattedPhone,
          email: email,
          city: city,
          preferred_model: model,
          budget_range: budget,
          message: message || null,
          status: "new",
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database Save Error:", dbError);
      return NextResponse.json(
        { error: "Database save failed. Please try again." },
        { status: 500 }
      );
    }

    // 3. Initialize Resend client
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY in server environment.");
      return NextResponse.json(
        { error: "Email configuration error on server." },
        { status: 500 }
      );
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // 4. Create HTML templates with Zé Chai branding
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>We’ve Received Your Franchise Enquiry | Zé Chai</title>
        <style>
          body {
            background-color: #F2E8C4;
            margin: 0;
            padding: 0;
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #1A1A1A;
          }
          .wrapper {
            background-color: #F2E8C4;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fdfaf0;
            border: 4px solid #E8401C;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          }
          .logo-container {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo-circle {
            display: inline-block;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background-color: #E8401C;
            color: #F2E8C4;
            font-size: 24px;
            font-weight: 800;
            line-height: 60px;
            text-align: center;
          }
          h1 {
            color: #E8401C;
            font-size: 24px;
            font-weight: 800;
            text-align: center;
            margin-top: 0;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .details-card {
            background-color: #F2E8C4;
            background-opacity: 0.3;
            border: 1px solid rgba(232, 64, 28, 0.1);
            border-radius: 16px;
            padding: 24px;
            margin: 30px 0;
          }
          .details-title {
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: rgba(26, 26, 26, 0.5);
            margin-bottom: 15px;
            border-bottom: 2px solid #E8401C;
            padding-bottom: 6px;
          }
          .details-row {
            margin-bottom: 12px;
            font-size: 15px;
          }
          .details-row:last-child {
            margin-bottom: 0;
          }
          .details-label {
            font-weight: bold;
            color: #E8401C;
            display: inline-block;
            width: 140px;
          }
          .footer {
            margin-top: 40px;
            border-top: 1px solid rgba(26, 26, 26, 0.1);
            padding-top: 25px;
            font-size: 15px;
            font-weight: 600;
          }
          .footer-brand {
            color: #E8401C;
            font-weight: 800;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="logo-container">
              <div class="logo-circle">zé</div>
            </div>
            <h1>Enquiry Received!</h1>
            <p>Hello <strong>${name}</strong>,</p>
            <p>Thank you for your interest in partnering with Zé Chai.</p>
            <p>We have successfully received your franchise enquiry and our team will review your application shortly.</p>
            <p>Our franchise team will contact you within 24 hours regarding the next steps.</p>
            
            <div class="details-card">
              <div class="details-title">Your Submitted Details</div>
              <div class="details-row"><span class="details-label">Full Name:</span> ${name}</div>
              <div class="details-row"><span class="details-label">Phone Number:</span> ${formattedPhone}</div>
              <div class="details-row"><span class="details-label">Email:</span> ${email}</div>
              <div class="details-row"><span class="details-label">City/District:</span> ${city}</div>
              <div class="details-row"><span class="details-label">Preferred Model:</span> ${model}</div>
              <div class="details-row"><span class="details-label">Investment Budget:</span> ${budget}</div>
              <div class="details-row"><span class="details-label">Message:</span> ${
                message ? message : "<span style='color:#a1a1a1; font-style:italic;'>None</span>"
              }</div>
            </div>
            
            <p>We appreciate your interest in becoming part of the Zé Chai family.</p>
            
            <div class="footer">
              Regards,<br>
              <span class="footer-brand">Zé Chai Franchise Team</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Franchise Enquiry Received</title>
        <style>
          body {
            background-color: #F2E8C4;
            margin: 0;
            padding: 0;
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #1A1A1A;
          }
          .wrapper {
            background-color: #F2E8C4;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fdfaf0;
            border: 4px solid #E8401C;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
          }
          h1 {
            color: #E8401C;
            font-size: 24px;
            font-weight: 800;
            margin-top: 0;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .details-card {
            background-color: #ffffff;
            border: 2px solid #E8401C;
            border-radius: 16px;
            padding: 24px;
            margin: 30px 0;
          }
          .details-title {
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #E8401C;
            margin-bottom: 15px;
            border-bottom: 1px solid rgba(232, 64, 28, 0.15);
            padding-bottom: 6px;
          }
          .details-row {
            margin-bottom: 12px;
            font-size: 15px;
            line-height: 1.5;
          }
          .details-row:last-child {
            margin-bottom: 0;
          }
          .details-label {
            font-weight: bold;
            color: rgba(26, 26, 26, 0.6);
            display: block;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 2px;
          }
          .details-value {
            color: #1A1A1A;
            font-weight: 600;
          }
          .cta-text {
            font-weight: bold;
            color: #E8401C;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <h1>🚀 New Franchise Enquiry</h1>
            <p>A new franchise enquiry has been submitted through the website landing page.</p>
            
            <div class="details-card">
              <div class="details-title">Applicant Details</div>
              
              <div class="details-row">
                <span class="details-label">Full Name</span>
                <span class="details-value">${name}</span>
              </div>
              
              <div class="details-row">
                <span class="details-label">Phone</span>
                <span class="details-value">${formattedPhone}</span>
              </div>
              
              <div class="details-row">
                <span class="details-label">Email</span>
                <span class="details-value">${email}</span>
              </div>
              
              <div class="details-row">
                <span class="details-label">City/District</span>
                <span class="details-value">${city}</span>
              </div>
              
              <div class="details-row">
                <span class="details-label">Preferred Model</span>
                <span class="details-value" style="color: #E8401C;">${model} Model</span>
              </div>
              
              <div class="details-row">
                <span class="details-label">Investment Budget</span>
                <span class="details-value">${budget}</span>
              </div>
              
              <div class="details-row">
                <span class="details-label">Message</span>
                <span class="details-value" style="font-weight: normal; font-size: 14px;">
                  ${message ? message : "<em>No message provided</em>"}
                </span>
              </div>

              <div class="details-row" style="margin-top: 20px; border-top: 1px dashed rgba(26, 26, 26, 0.1); padding-top: 10px;">
                <span class="details-label">Submitted At</span>
                <span class="details-value" style="font-size: 13px; font-weight: normal;">${timestamp}</span>
              </div>
            </div>
            
            <p class="cta-text">Please contact this lead as soon as possible to discuss their application.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 5. Send emails simultaneously via Promise.all
    const [customerMail, adminMail] = await Promise.all([
      resend.emails.send({
        from: "Zé Chai Franchise <onboarding@resend.dev>",
        to: email,
        subject: "✅ We’ve Received Your Franchise Enquiry | Zé Chai",
        html: customerHtml,
      }),
      resend.emails.send({
        from: "Zé Chai System <onboarding@resend.dev>",
        to: "zechai.official@gmail.com",
        subject: "🚀 New Franchise Enquiry Received",
        html: adminHtml,
      }),
    ]);

    // 6. Check for sending errors
    if (customerMail.error || adminMail.error) {
      console.error("Resend Sending Error(s):", {
        customerMailError: customerMail.error,
        adminMailError: adminMail.error,
      });
      return NextResponse.json(
        {
          error: "Failed to dispatch notification emails.",
          details: {
            customerMail: customerMail.error,
            adminMail: adminMail.error,
          },
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: dbData.id }, { status: 200 });
  } catch (err: any) {
    console.error("API Enquiry Route Exception:", err);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
