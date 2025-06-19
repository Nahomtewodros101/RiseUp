import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields (name, email, subject, message) are required" },
        { status: 400 }
      );
    }

    await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === "465", 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptionsToYou = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: "nahomtewodrosm@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    const mailOptionsToUser = {
      from: `"Qmem Cloud" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Your Message",
      text: `Hi ${name},\n\ we have received your message and will get back to you soon.\n\nBest,\nNahom Tewodros`,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! we have  received your message and will get back to you soon.</p>
        <p>Best,<br>Qmem Cloud</p>
      `,
    };

    await Promise.all([
      transporter.sendMail(mailOptionsToYou),
      transporter.sendMail(mailOptionsToUser),
    ]);

    return NextResponse.json(
      { success: true, message: "Contact saved and emails sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact request:", error);
    if (error instanceof Error) {
      if (error.message.includes("email")) {
        return NextResponse.json(
          { error: "Failed to send emails" },
          { status: 500 }
        );
      }
    }
    return NextResponse.json(
      { error: "An unexpected error occurred while saving contact" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Failed to load contacts:", error);
    console.error("Request URL:", req.url);
    console.error("Request Method:", req.method);
    return NextResponse.json(
      { error: "An unexpected error occurred while loading contacts" },
      { status: 500 }
    );
  }
}