import DiscordIcon from "@/app/_components/svgs/DiscordIcon";
import EmailIcon from "@/app/_components/svgs/EmailIcon";
import GithubIcon from "@/app/_components/svgs/GithubIcon";
import ContactForm from "@/app/contact/_components/ContactForm";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with me for collaboration, job opportunities, or just to say hello. Reach out via email, GitHub, or Discord.",
  keywords: [
    "contact developer",
    "hire developer",
    "web developer contact",
    "freelance developer",
    "collaboration",
  ],
  openGraph: {
    title: "Contact | Uzair",
    description:
      "Want to work together? Get in touch via email, GitHub, or Discord.",
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

const EMAIL = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;
const DISCORD_USER = process.env.NEXT_PUBLIC_DISCORD_USER;

const iconProps = "w-8 h-8 hover:opacity-80 transition-all hover:scale-110";
export default function Contact() {
  return (
    <div className="flex w-full flex-col items-center px-2">
      <div className="container max-w-2xl">
        <h1 className="my-8 text-center text-3xl font-black">Contact</h1>
        <p className="mb-8 text-center text-lg">
          Want to work together? Here&apos;s how to reach me.
        </p>

        <div className="mb-8 flex justify-around gap-4">
          <a href={EMAIL} target="_blank">
            <EmailIcon className={iconProps} />
          </a>
          <a href="https://github.com/badmagick329" target="_blank">
            <div className="flex">
              <GithubIcon className={iconProps} />
              <ExternalLink className="h-3 w-3" />
            </div>
          </a>
          <a href={DISCORD_USER} target="_blank">
            <div className="flex">
              <DiscordIcon className={iconProps} />
              <ExternalLink className="h-3 w-3" />
            </div>
          </a>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
