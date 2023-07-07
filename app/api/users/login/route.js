import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    const user = await User.findOne({ username });
    if (!user)
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 400 }
      );

    if (!user.authenticate(password)) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: username,
    };

    // Create JWT
    const token = await jwt.sign({ tokenData }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
