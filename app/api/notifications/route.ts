import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authMiddleware, getCurrentUser, isAdmin } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const authResult = await authMiddleware(request);
    if (authResult) {
      return authResult;
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authMiddleware(request);
    if (authResult) {
      return authResult;
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdminUser: boolean = await isAdmin();
    console.log("Is admin:", isAdminUser, "User ID:", user.id);
    if (!isAdminUser) {
      return NextResponse.json(
        { error: "Only admins can create notifications" },
        { status: 403 }
      );
    }

    const data = await request.json();
    console.log("Request body:", data);
    const {
      message,
      type,
      scheduled,
      scheduledDate,
      targetAudience,
      isPriority,
      creator, 
    } = data;

    if (!message || !type || !targetAudience || !creator || !creator.id) {
      return NextResponse.json(
        { error: "Message, type, target audience, and creator are required" },
        { status: 400 }
      );
    }

    if (creator.id !== user.id) {
      console.log("Creator mismatch:", {
        creatorId: creator.id,
        userId: user.id,
      });
      return NextResponse.json(
        { error: "Invalid creator ID" },
        { status: 403 }
      );
    }

    const notification = await prisma.notification.create({
      data: {
        message,
        type,
        targetAudience,
        isPriority,
        creator: { connect: { id: user.id } }, 
        scheduled,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}
