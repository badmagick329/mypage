"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await sendMessageRequest({
      event: e,
      setStatus,
      setErrorMessage,
    });
  }

  if (status === "success") {
    return <SuccessCard setStatus={setStatus} />;
  }

  return (
    <Card className="rounded-md">
      <CardHeader>
        <CardTitle className="mb-4 text-xl font-semibold">
          Or send a message
        </CardTitle>
        <CardDescription>
          And I&apos;ll get back to you as soon as I can.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 md:px-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="bg-background focus:ring-ring rounded-md border px-4 py-2 focus:ring-2 focus:outline-none"
              placeholder="Your name"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-background focus:ring-ring rounded-md border px-4 py-2 focus:ring-2 focus:outline-none"
              placeholder="you@example.com"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="bg-background focus:ring-ring rounded-md border px-4 py-2 focus:ring-2 focus:outline-none"
              placeholder="Your message here..."
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <div className="mx-auto">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 font-medium transition-colors hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function SuccessCard({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<FormStatus>>;
}) {
  return (
    <div className="border-success/50 bg-success/10 rounded-md border p-6 text-center">
      <p className="text-lg font-medium">Message sent!</p>
      <p className="text-muted-foreground mt-1 text-sm">
        I&apos;ll get back to you soon.
      </p>
      <button
        onClick={() => setStatus("idle")}
        className="mt-4 text-sm underline underline-offset-4 hover:cursor-pointer hover:no-underline"
      >
        Send another message
      </button>
    </div>
  );
}

async function sendMessageRequest({
  event,
  setStatus,
  setErrorMessage,
}: {
  event: React.FormEvent<HTMLFormElement>;
  setStatus: React.Dispatch<React.SetStateAction<FormStatus>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  setStatus("submitting");
  setErrorMessage("");

  const form = event.currentTarget;
  const formData = new FormData(form);

  const data = {
    name: formData.get("name")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    message: formData.get("message")?.toString().trim(),
  };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || "Failed to send message");
    }

    setStatus("success");
    form.reset();
  } catch (error) {
    setStatus("error");
    setErrorMessage(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
}
