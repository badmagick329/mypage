import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetIn: RATE_LIMIT_WINDOW_MS,
    };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - record.count,
    resetIn: record.resetTime - now,
  };
}

export function checkRateLimitStatus(request: NextRequest): {
  errorResponse?: NextResponse;
} {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(clientIp);
  console.log(`Rate limit status for IP ${clientIp}:`, rateLimit);

  if (!rateLimit.allowed) {
    const retryAfterSeconds = Math.ceil(rateLimit.resetIn / 1000);
    return {
      errorResponse: NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfterSeconds.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": retryAfterSeconds.toString(),
          },
        },
      ),
    };
  }

  return {};
}
