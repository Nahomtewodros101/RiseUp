import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import prisma from "@/lib/db"
import { signJwtToken, type UserJwtPayload } from "@/lib/auth"

// Request body validation schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json()
    const validatedData = loginSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json({ error: "Invalid input data", details: validatedData.error.format() }, { status: 400 })
    }

    const { email, password } = validatedData.data

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create JWT payload
    const payload: UserJwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "user" | "admin",
    }

    // Sign JWT token
    const token = await signJwtToken(payload)

    // Create a response object
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    // Set auth cookie in the response
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

