import Stripe from "stripe";
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

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://todo-mern-chi.vercel.app//payment?success=true",
      cancel_url: "https://todo-mern-chi.vercel.app//payment?canceled=true",
      client_reference_id: user._id.toString(),
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
