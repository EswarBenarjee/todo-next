import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  const reqBody = await request.json();
  const { token } = reqBody;

  if (!token) {
    return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.tokenData.id);

    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 401 });
    }

    user.has_premium = false;

    const savedUser = await user.save();

    if (!savedUser) {
      return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      hasPremium: user.has_premium,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
