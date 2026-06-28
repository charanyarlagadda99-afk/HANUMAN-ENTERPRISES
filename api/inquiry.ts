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
      ? `New Order Request - ${name} ${company ? `(${company})` : ""}`
      : `New Inquiry - ${name} ${company ? `(${company})` : ""}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f2e9;padding:24px;border-radius:12px;">
        <div style="background:#2f6d43;padding:20px 24px;border-radius:8px;margin-bottom:20px;">
          <h1 style="color:#ffffff;margin:0;font-size:20px;">
            ${isOrder ? "New Order Request" : "New Inquiry"} - Hanuman Enterprises
          </h1>
          <p style="color:#b9df88;margin:6px 0 0;font-size:13px;">
            ${isOrder ? "Customer wants to place an order" : "New inquiry from your website"}
          </p>
        </div>
        <div style="background:#ffffff;border-radius:8px;padding:24px;margin-bottom:16px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;width:35%;color:#7a5a36;font-weight:bold;font-size:13px;">Full Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;font-size:14px;font-weight:bold;color:#26302b;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;color:#7a5a36;font-weight:bold;font-size:13px;">Phone</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;font-size:14px;color:#26302b;">${phone}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;color:#7a5a36;font-weight:bold;font-size:13px;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;font-size:14px;color:#26302b;">${email || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;color:#7a5a36;font-weight:bold;font-size:13px;">Company</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;font-size:14px;color:#26302b;">${company || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;color:#7a5a36;font-weight:bold;font-size:13px;">Quantity</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;font-size:14px;color:#26302b;">${quantity ? quantity + " kg" : "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;color:#7a5a36;font-weight:bold;font-size:13px;">Delivery Location</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0ece0;font-size:14px;color:#26302b;">${delivery_location || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#7a5a36;font-weight:bold;font-size:13px;">Message</td>
              <td style="padding:10px 0;font-size:14px;color:#26302b;">${message || "None"}</td>
            </tr>
          </table>
        </div>
        <div style="background:#2f6d43;padding:16px 24px;border-radius:8px;text-align:center;">
          <p style="color:#ffffff;margin:0 0 10px;font-size:14px;font-weight:bold;">
            ${isOrder ? "Contact this customer to confirm order details." : "Respond within 24 hours for best conversion."}
          </p>
          <a href="tel:${phone}" style="display:inline-block;background:#ffffff;color:#26302b;padding:8px 20px;border-radius:6px;font-weight:bold;font-size:13px;text-decoration:none;">
            Call ${name} Now
          </a>
        </div>
        <p style="text-align:center;color:#9a9e97;font-size:11px;margin-top:16px;">
          Hanuman Enterprises - Kondakarla Village, Anakapalli - GST: 37CJTPJ8744A1ZU
        </p>
      </div>
    `,
  });

  // Email to CUSTOMER
  if (email?.trim()) {
    await resend.emails.send({
      from: "Hanuman Enterprises <onboarding@resend.dev>",
      to: [email.trim()],
      subject: isOrder
        ? "Your Order Request Received - Hanuman Enterprises"
        : "We received your inquiry - Hanuman Enterprises",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f2e9;padding:24px;border-radius:12px;">
          <div style="background:#2f6d43;padding:20px 24px;border-radius:8px;margin-bottom:20px;">
            <h1 style="color:#ffffff;margin:0;font-size:20px;">Hanuman Enterprises</h1>
            <p style="color:#b9df88;margin:6px 0 0;font-size:13px;">Eco-Friendly Biomass Fuel Bricks</p>
          </div>
          <div style="background:#ffffff;border-radius:8px;padding:24px;margin-bottom:16px;">
            <h2 style="color:#26302b;margin:0 0 12px;">Hi ${name},</h2>
            <p style="color:#5f665f;line-height:1.7;font-size:15px;">
              Thank you for ${isOrder ? "placing an order request" : "reaching out to us"}.
              We have received your ${isOrder ? "order" : "inquiry"} and our team will
              contact you within <strong>24 hours</strong> to
              ${isOrder ? "confirm your order details and pricing" : "discuss your requirements"}.
            </p>
            <div style="background:#f4f2e9;border-radius:8px;padding:16px;margin-top:16px;">
              <p style="margin:0;font-size:12px;font-weight:bold;color:#7a5a36;text-transform:uppercase;letter-spacing:0.1em;">
                Your Submission Summary
              </p>
              <table style="width:100%;margin-top:10px;">
                ${quantity ? `<tr><td style="font-size:13px;color:#7a5a36;padding:4px 0;width:40%;">Quantity Required</td><td style="font-size:13px;color:#26302b;font-weight:bold;">${quantity} kg</td></tr>` : ""}
                ${delivery_location ? `<tr><td style="font-size:13px;color:#7a5a36;padding:4px 0;">Delivery Location</td><td style="font-size:13px;color:#26302b;font-weight:bold;">${delivery_location}</td></tr>` : ""}
                ${company ? `<tr><td style="font-size:13px;color:#7a5a36;padding:4px 0;">Business</td><td style="font-size:13px;color:#26302b;font-weight:bold;">${company}</td></tr>` : ""}
              </table>
            </div>
            <div style="margin-top:20px;padding:16px;background:#eaf3e8;border-radius:8px;border-left:4px solid #2f6d43;">
              <p style="margin:0;font-size:14px;color:#2f6d43;font-weight:bold;">What happens next?</p>
              <ol style="margin:10px 0 0;padding-left:18px;color:#5f665f;font-size:13px;line-height:2;">
                <li>Our sales team reviews your request</li>
                <li>We call you to confirm pricing and delivery</li>
                <li>Payment and dispatch details are shared</li>
                <li>Order delivered to your location</li>
              </ol>
            </div>
          </div>
          <div style="background:#26302b;padding:16px 24px;border-radius:8px;">
            <p style="color:#b9df88;margin:0;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:0.1em;">
              Need Immediate Help?
            </p>
            <p style="color:#ffffff;margin:8px 0 0;font-size:14px;line-height:1.8;">
              Phone: +91 81878 69698<br>
              Phone: +91 89784 61866<br>
              Email: hanumanentp23@gmail.com
            </p>
          </div>
          <p style="text-align:center;color:#9a9e97;font-size:11px;margin-top:16px;">
            Kondakarla Village, Atchutapuram Mandal, Anakapalli District - 531033<br>
            GST: 37CJTPJ8744A1ZU
          </p>
        </div>
      `,
    });
  }

  return res.status(200).json({ success: true });
}