import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  const reqBody = await request.json();
  const { userId } = reqBody;

  if (!userId) {
    return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }

    user.has_premium = true;

    const savedUser = await user.save();
    if (!savedUser) {
      return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
