import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY as string);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email, company, quantity, message, type, delivery_location } = req.body;

  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  // Save to Supabase
  const { error: dbError } = await supabase.from("leads").insert([
    {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      company: company?.trim() || null,
      quantity_kg: quantity ? parseInt(quantity) : null,
      message: message
        ? `${message}${delivery_location ? ` | Delivery: ${delivery_location}` : ""}`
        : delivery_location
        ? `Delivery location: ${delivery_location}`
        : null,
      source: type === "order" ? "order_now" : "website_form",
    },
  ]);

  if (dbError) {
    console.error("Supabase error:", dbError);
    return res.status(500).json({ error: "Database error" });
  }

  const isOrder = type === "order";

  // Email to OWNER
  await resend.emails.send({
    from: "Hanuman Enterprises <onboarding@resend.dev>",
    to: ["hanumanentp23@gmail.com"],
    subject: isOrder
      ? `🛒 New Order — ${name} ${company ? `(${company})` : ""}`
      : `📋 New Inquiry — ${name} ${company ? `(${company})` : ""}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f2e9;padding:24px;border-radius:12px;">
        <div style="background:#2f6d43;padding:20px 24px;border-radius:8px;margin-bottom:20px;">
          <h1 style="color:#fff;margin:0;font-size:20px;">
            ${isOrder ? "🛒 New Order Request" : "🌿 New Inquiry"} — Hanuman Enterprises
          </h1>
          <p style="color:#b9df88;margin:6px 0 0;font-size:13px;">
            ${isOrder ? "Customer wants to place an order" : "New inquiry from your website"}
          </p>
        </div>
        <div style="background:#fff;border-radius:8px;padding:24px;margin-bottom:16px;">
          <table style="width:100%;border-collapse:collapse;">
            ${[
              ["Name", name],
              ["Phone", phone],
              ["Email", email || "—"],
              ["Company", company || "—"],
              ["Quantity", quantity ? quantity + " kg" : "—"],
              ["Message", message || "—"],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0ece0;width:35%;color:#7a5a36;font-weight:bold;font-size:13px;">${label}</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0ece0;font-size:14px;color:#26302b;">${value}</td>
              </tr>
            `).join("")}
          </table>
        </div>
        <div style="background:#2f6d43;padding:16px 24px;border-radius:8px;text-align:center;">
          <a href="tel:${phone}" style="display:inline-block;background:#fff;color:#26302b;padding:8px 20px;border-radius:6px;font-weight:bold;font-size:13px;text-decoration:none;">
            📞 Call ${name} Now
          </a>
        </div>
      </div>
    `,
  });

  // Email to CUSTOMER (if they provided email)
  if (email?.trim()) {
    await resend.emails.send({
      from: "Hanuman Enterprises <onboarding@resend.dev>",
      to: [email.trim()],
      subject: isOrder
        ? "Your Order Request Received — Hanuman Enterprises"
        : "We received your inquiry — Hanuman Enterprises",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f2e9;padding:24px;border-radius:12px;">
          <div style="background:#2f6d43;padding:20px 24px;border-radius:8px;margin-bottom:20px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">🌿 Hanuman Enterprises</h1>
            <p style="color:#b9df88;margin:6px 0 0;font-size:13px;">Eco-Friendly Biomass Fuel Bricks</p>
          </div>
          <div style="background:#fff;border-radius:8px;padding:24px;margin-bottom:16px;">
            <h2 style="color:#26302b;margin:0 0 12px;">Hi ${name},</h2>
            <p style="color:#5f665f;line-height:1.7;">
              Thank you for ${isOrder ? "placing an order request" : "reaching out to us"}. 
              We have received your ${isOrder ? "order" : "inquiry"} and our team will 
              contact you within <strong>24 hours</strong> to ${isOrder ? "confirm your order details and pricing" : "discuss your requirements"}.
            </p>
            <div style="background:#f4f2e9;border-radius:8px;padding:16px;margin-top:16px;">
              <p style="margin:0;font-size:13px;color:#7a5a36;font-weight:bold;">YOUR SUBMISSION DETAILS</p>
              <p style="margin:8px 0 0;font-size:14px;color:#26302b;">
                ${quantity ? `Quantity: <strong>${quantity} kg</strong><br>` : ""}
                ${message ? `Message: ${message}<br>` : ""}
              </p>
            </div>
          </div>
          <div style="background:#26302b;padding:16px 24px;border-radius:8px;">
            <p style="color:#b9df88;margin:0;font-size:13px;font-weight:bold;">NEED IMMEDIATE ASSISTANCE?</p>
            <p style="color:#fff;margin:8px 0 0;font-size:14px;">
              📞 +91 81878 69698 &nbsp;|&nbsp; +91 89784 61866<br>
              ✉️ hanumanentp23@gmail.com
            </p>
          </div>
          <p style="text-align:center;color:#9a9e97;font-size:11px;margin-top:16px;">
            Kondakarla Village, Atchutapuram Mandal, Anakapalli District – 531033<br>
            GST: 37CJTPJ8744A1ZU
          </p>
        </div>
      `,
    });
  }

  return res.status(200).json({ success: true });
}