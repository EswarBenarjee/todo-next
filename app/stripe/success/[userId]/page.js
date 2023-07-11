"use client";

import React, { useEffect } from "react";

import toast from "react-hot-toast";

import NavbarComponent from "../../../Navbar";

import { useRouter } from "next/navigation";
import { Nav } from "react-bootstrap";

export default function Stripe({ params: { userId } }) {
  const { push } = useRouter();

  useEffect(() => {
    if (userId) {
      fetch("/api/premium/success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success("Payment Successful");
          }

          push("/");
        })
        .catch((err) => {
          toast.error("Server Error");
        });
    }
  }, []);

  return (
    <div>
      <NavbarComponent />
      <main className="text-center p-5">
        <h1>Payment Gateway</h1>
        <img src="/favicon.ico" alt="To Do Application" />
      </main>
    </div>
  );
}
