import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  const reqBody = await request.json();
  const { token, todoId, name } = reqBody;

  if (!token) {
    return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  if (!todoId) {
    return NextResponse.json(
      { error: "Todo item not found 1" },
      { status: 404 }
    );
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.tokenData.id);

    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }

    const removeIndex = user.todoItems.map((item) => item.id).indexOf(todoId);

    if (removeIndex === -1) {
      return NextResponse.json(
        { error: "Todo item not found" },
        { status: 404 }
      );
    }

    user.todoItems[removeIndex].name = name;

    const savedUser = await user.save();
    if (!savedUser) {
      return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      todos: savedUser.todoItems,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
