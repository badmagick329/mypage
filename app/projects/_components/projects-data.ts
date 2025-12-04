export type ProjectData = {
  name: string;
  githubProjectName: string;
  homePage?: string;
  mediaList?: ProjectMedia[];
  tagline: string;
  shortDescription: string;
  description: string;
  why: string;
  tech: string[];
};

export type ProjectMedia = { url: string; text: string; type: string };

export const projectsData = [
  {
    name: "Remote Video Encoding Service",
    githubProjectName: "ffmpeg_service",
    description:
      "Offload a batch of ffmpeg commands to your VPS/homelab. Files are sent to the server, processed, and copied to their respective destinations.",
    tagline: "Offload heavy video encoding to your server",
    shortDescription:
      "Batch process FFmpeg commands on a remote server, freeing your local machine from slow AV1 encodes.",
    why: "AV1 encoding can be slow. I was re-encoding a lot of videos and had been leaving my PC running overnight for these.",
    tech: ["React", "Typescript", "Docker", "FFmpeg"],
  },
  {
    name: "Red Velvet Gfy Archive",
    githubProjectName: "mgck",
    homePage: "https://mgck.ink/gfys",
    description:
      "Browse High Quality Gfys of the girl group Red Velvet, migrated from Gfycat.",
    tagline: "Preserving content from Gfycat's shutdown",
    shortDescription:
      "A searchable archive of high-quality Red Velvet clips rescued before Gfycat's 2023 shutdown.",
    why: "On September 1 2023, Gfycat was shutdown. People had uploaded several clips to this platform that were going to be lost when it went down.",
    tech: [
      "Next.js",
      "React",
      "Django",
      "Typescript",
      "Python",
      "Postgres",
      "Docker",
    ],
  },
  {
    name: "Discord Emotes and Stickers",
    githubProjectName: "mgck",
    homePage: "https://mgck.ink/discordgifs",
    description:
      "Create emotes and stickers for Discord from your video clips, complying with Discord's size limits.",
    tagline: "Create Discord emotes without the size limit guesswork",
    shortDescription:
      "Turn video clips into Discord-ready emotes and stickers, automatically optimized to meet file size limits.",
    why: "When creating your own stickers or emotes for discord you often have to play a 'guess the frame size' game while you recreate the gif over and over to get it just under discord's size limit. This can be very tedious.",
    tech: ["Next.js", "React", "Typescript", "FFmpeg", "Docker"],
  },
  {
    name: "Kpop Releases",
    githubProjectName: "mgck",
    homePage: "https://mgck.ink/kpop",
    description:
      "Stay ahead of the latest Kpop comebacks by your favourite groups. Search for any comebacks you may have missed.",
    tagline: "Never miss a Kpop comeback",
    shortDescription:
      "Track upcoming releases and discover past comebacks from your favorite Kpop groups.",
    why: "It can be easy to miss a release by a group you like, or keep up with what's coming up ahead unless you are actively keeping up with the news.",
    tech: [
      "Next.js",
      "React",
      "Django",
      "Typescript",
      "Python",
      "Postgres",
      "Docker",
    ],
  },
  {
    name: "Food Inventory Manager",
    githubProjectName: "foodinventorymanager",
    description:
      "A food inventory management app. It features automated receipt parsing and a conversational AI assistant accessible via Discord.",
    tagline: "Pantry tracking with receipt parsing and an AI chatbot",
    shortDescription:
      "Manage household food inventory with automated receipt parsing and a conversational Discord assistant.",
    why: "I'd often forget the expiry dates for foods resulting in food waste. My flatmate is also unable to physically check what food items are available at home. This lets her look that up through the app.",
    tech: ["Next.js", "React", "Typescript", "Gemini", "Docker"],
  },
  {
    name: "Website for a copywriter",
    githubProjectName: "blog",
    description:
      "A professional website with an integrated blog, built for a freelance copywriter.",
    homePage: "https://kristalomu.com",
    tagline: "A website for a copywriter",
    shortDescription:
      "A professional website with an integrated blog, built for a freelance copywriter.",
    why: "A copywriter wanted a website built.",
    tech: ["Next.js", "React", "Typescript", "Velite", "Docker"],
  },
  {
    name: "Tetris in the Terminal",
    githubProjectName: "tetris",
    description: "A tetris clone in the terminal, written in Rust 🦀",
    mediaList: [
      {
        url: "/videos/clitetris.mp4",
        text: "some text here explaining things in the video",
        type: "video/mp4",
      },
    ],

    tagline: "Classic Tetris, reimagined for the terminal",
    shortDescription:
      "A fully playable Tetris clone built in Rust for the command line.",
    why: "I was learning Rust and listening to a tetris theme based song that just came out then. I felt it would be cool to build a CLI tetris game with that song as the soundtrack.",
    tech: ["Rust"],
  },
  {
    name: "Video Summariser",
    githubProjectName: "gemini_summariser",
    description:
      "A video summariser with a follow up Q&A mode. Supports both local and YouTube videos.",
    tagline: "Get to the point of any video, fast",
    shortDescription:
      "Summarise local or YouTube videos with AI, then ask follow-up questions.",
    why: "Nobody likes getting clickbaited. I wanted a tool that would give me a detailed yet concise summary to learn what the YouTube video was about. YouTube's integrated summariser is terrible at this.",
    tech: ["Python", "Gemini"],
  },
  {
    name: "School Inventory and Sales Manager",
    githubProjectName: "inventorymanager",
    homePage: "https://inv.mgck.ink",
    description:
      "An inventory and sales manager built for my family's schools.",
    tagline: "Replacing paper workflows with a custom solution",
    shortDescription:
      "A custom inventory and sales system built to replace error-prone paper-based workflows for schools.",
    why: "My family's schools were using a paper-based and highly error-prone system to manage the school inventory and sales. They asked me to build an app that would mirror their old workflow but also prevent the different ways data was being entered incorrectly.",
    tech: [
      "Next.js",
      "React",
      "Typescript",
      "Django",
      "Python",
      "Postgres",
      "Docker",
    ],
  },
  {
    name: "Spotify Playlist Maker",
    githubProjectName: "spotify-playlist-cli",
    description:
      "A CLI app to create filtered Spotify playlists from existing playlists. You can filter by release date and/or artists.",

    tagline: "Filter Spotify playlists from the command line",
    shortDescription:
      "A CLI tool to generate new Spotify playlists filtered by release date or artist.",
    why: "I was about to leave for a flight and I needed music. I wanted to create a playlist of old songs pulled from my one big playlist.",
    tech: ["C#"],
  },
  {
    name: "Download Watcher",
    githubProjectName: "download-watcher",
    description:
      "A background watcher that cleans up your download folder based on the rules you specify. It can also be run as a one-off to cleanup any other folders.",
    tagline: "Automate your download folder cleanup",
    shortDescription:
      "A background service that organises and cleans your downloads based on custom rules.",
    why: "There's a lot of junk that piles up in your download folder. Some of it is used just once and can be removed after. Some of it needs to be moved elsewhere. This automates the organisation and cleanup.",
    tech: ["C#"],
  },
  {
    name: "Cublaster Game",
    githubProjectName: "gamejam24",
    description:
      "A 3D browser-based game where you control a geometric shape and blast enemies off the platform.",

    homePage: "https://badmagick.itch.io/cublaster",
    tagline: "A 3D browser game built with Three.js",
    shortDescription:
      "A browser-based 3D game where you blast enemies off a platform, built for a game jam.",
    why: "This was built for a game jam. I wanted to learn some Three.js.",
    tech: ["Javascript", "Three.js"],
  },
  {
    name: "Pomodoro in the Terminal",
    githubProjectName: "pomodoro-cli",
    description: "A simple and customisable terminal based pomodoro app.",
    tagline: "A simple, customisable pomodoro timer for the CLI",
    shortDescription:
      "A simple, customisable pomodoro timer for the command line.",
    why: "I was looking into the pomodoro method. I was also learning Go and this was a good excuse to make a CLI Go app.",
    tech: ["Go"],
  },
  {
    name: "Advent of Code 2024",
    githubProjectName: "advent-of-code-2024",
    description: "Advent of code challenges for 2024.",
    tagline: "AoC 2024 solutions in C#",
    shortDescription:
      "My solutions to the Advent of Code 2024 challenges, written in C#.",
    why: "I was learning C#.",
    tech: ["C#"],
  },
  {
    name: "Advent of Code 2023",
    githubProjectName: "aoc2023",
    description: "Advent of code challenges for 2023.",
    tagline: "AoC 2023 solutions in Go",
    shortDescription:
      "My solutions to the Advent of Code 2023 challenges, written in Go.",
    why: "I was learning Go.",
    tech: ["Go"],
  },
  {
    name: "Ink Scrollable List",
    githubProjectName: "ink-scrollable-list",
    description:
      "A scrollable list component package for React Ink. Supports keyboard navigation and customisable scroll bars.",
    tagline: "A scrollable list component for React Ink",
    shortDescription:
      "A keyboard-navigable, scrollable list component for building terminal UIs with React Ink.",
    why: "I needed a scrollable list component for the server side TUI.",
    tech: ["React", "Typescript"],
  },
] as ProjectData[];
