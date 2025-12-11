import { NextResponse } from "next/server";

const DISCORD_MESSAGE_LIMIT = 2000;

type DiscordEmbed = {
  title: string;
  color: number;
  fields: { name: string; value: string; inline: boolean }[];
  timestamp: string;
};
const SERVICE_DOWN_MESSAGE =
  "It seems the service is currently unavailable. Please try again later or contact me via Email.";

export function checkWebhookUrl(): {
  errorResponse?: NextResponse;
  webhookUrl?: string;
} {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  console.log("ENV CHECK - DISCORD_WEBHOOK_URL exists:", !!webhookUrl);
  console.log(
    "ENV CHECK - All env keys:",
    Object.keys(process.env).filter(
      (k) => k.includes("DISCORD") || k.includes("NODE"),
    ),
  );
  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not configured");
    return {
      errorResponse: NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      ),
    };
  }
  return { webhookUrl };
}

export async function sendDiscordMessage({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<{ errorResponse?: NextResponse }> {
  const checkWebhookUrlResult = checkWebhookUrl();
  if (checkWebhookUrlResult.errorResponse) {
    return checkWebhookUrlResult;
  }
  const webhookUrl = checkWebhookUrlResult.webhookUrl!;

  try {
    const embed = createEmbed({ name, email });

    const messageExceedsLimit = message.length > DISCORD_MESSAGE_LIMIT;

    let discordResponse: Response;

    if (messageExceedsLimit) {
      discordResponse = await sendMessageAsFile({
        embed,
        message,
        webhookUrl,
      });
    } else {
      discordResponse = await sendMessageAsEmbed({
        embed,
        message,
        webhookUrl,
      });

      if (!discordResponse.ok) {
        console.error("Discord webhook failed:", await discordResponse.text());
        return {
          errorResponse: NextResponse.json(
            { error: SERVICE_DOWN_MESSAGE },
            { status: 500 },
          ),
        };
      }
    }
  } catch (error) {
    console.error("Error sending message to Discord:", error);
    return {
      errorResponse: NextResponse.json(
        {
          error: SERVICE_DOWN_MESSAGE,
        },
        { status: 500 },
      ),
    };
  }

  return {};
}

async function sendMessageAsEmbed({
  embed,
  message,
  webhookUrl,
}: {
  embed: DiscordEmbed;
  message: string;
  webhookUrl: string;
}) {
  const discordPayload = {
    content: message,
    embeds: [embed],
  };

  return await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(discordPayload),
  });
}

async function sendMessageAsFile({
  embed,
  message,
  webhookUrl,
}: {
  embed: DiscordEmbed;
  message: string;
  webhookUrl: string;
}) {
  const formData = new FormData();

  const payload = {
    content: "Message attached as file (exceeded character limit)",
    embeds: [embed],
  };

  formData.append("payload_json", JSON.stringify(payload));

  const messageBlob = new Blob([message], { type: "text/plain" });
  formData.append("files[0]", messageBlob, "message.txt");

  return await fetch(webhookUrl, {
    method: "POST",
    body: formData,
  });
}

function createEmbed({ name, email }: { name: string; email: string }) {
  return {
    title: "Contact Form Submission",
    color: 0x5865f2,
    fields: [
      { name: "Name", value: name.slice(0, 1024), inline: true },
      { name: "Email", value: email.slice(0, 1024), inline: true },
    ],
    timestamp: new Date().toISOString(),
  };
}
