export type ProjectData = {
  name: string;
  githubProjectName: string;
  homePage?: string;
  description: string;
  why: string;
  tech: string[];
};

export const projectsData = [
  {
    name: "Remote Video Encoding Service",
    githubProjectName: "ffmpeg_service",
    description:
      "Offload a batch of ffmpeg commands to your VPS/homelab. Files are processed and copied to their respective destinations.",
    why: "AV1 encoding can be slow. I'd been re-encoding a lot of videos and had been leaving my PC running overnight for these.",
    tech: ["React", "Typescript", "Docker", "FFmpeg"],
  },
  {
    name: "Red Velvet Gfy Archive",
    githubProjectName: "mgck",
    homePage: "https://mgck.ink/gfys",
    description:
      "Browse High Quality Gfys of the girl group Red Velvet migrated from Gfycat.",
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
    why: "When creating your own stickers or emotes for discord you often have to play a 'guess the frame size' game while you recreate the gif over and over to get it just under discord's size limit. This can be very tedious.",
    tech: ["Next.js", "React", "Typescript", "FFmpeg", "Docker"],
  },
  {
    name: "Kpop Releases",
    githubProjectName: "mgck",
    homePage: "https://mgck.ink/kpop",
    description:
      "Stay ahead of the latest Kpop comebacks by your favourite groups. Search for any comebacks you may have missed.",
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
    why: "I'd often forget the expiry dates for foods resulting in food waste. My flatmate is also unable to physically check what food items are available at home. This lets her look that up through the app.",
    tech: ["Next.js", "React", "Typescript", "Gemini", "Docker"],
  },
  {
    name: "Website for a copywriter",
    githubProjectName: "blog",
    description: "A professional website and blog for a copywriter.",
    why: "A copywriter wanted a website built.",
    tech: ["Next.js", "React", "Typescript", "Velite", "Docker"],
  },
  {
    name: "Tetris in the Terminal",
    githubProjectName: "tetris",
    description: "A tetris clone in the terminal, written in Rust 🦀",
    why: "I was learning Rust and listening to a tetris theme based song that just came out then. I felt it would be cool to build a CLI tetris game with that song as the soundtrack.",
    tech: ["Rust"],
  },
  {
    name: "Video Summariser",
    githubProjectName: "gemini_summariser",
    description:
      "A video summariser with a follow up Q&A mode. Supports both local and YouTube videos.",
    why: "Nobody likes getting clickbaited. I wanted a tool that would give me a detailed yet concise summary to learn what the YouTube video was about. YouTube's integrated summariser is terrible at this.",
    tech: ["Python", "Gemini"],
  },
  {
    name: "School Inventory and Sales Manager",
    githubProjectName: "inventorymanager",
    homePage: "https://inv.mgck.ink",
    description:
      "An inventory and sales manager build for my family's schools.",
    why: "My family's schools were using a paper based and highly error prone system to manage the school inventory and sales. They asked me to build an app that would mirror their old workflow but also prevent the different ways data was being entered incorrectly.",
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
    why: "I was about to leave for a flight and I needed music. I wanted to create a playlist of old songs based on my one big playlist where I dump all the songs I like.",
    tech: ["C#"],
  },
  {
    name: "Download Watcher",
    githubProjectName: "download-watcher",
    description:
      "A background watcher that cleans up your download folder based on the rules you specify. It can also be run as a one-off to cleanup any other folders.",
    why: "There's a lot of junk that piles up in your download folder. Some of it is used just once and can be removed after. Some of it needs to be moved elsewhere. I'm too lazy to do that manually.",
    tech: ["C#"],
  },
  {
    name: "Cublaster Game",
    githubProjectName: "gamejam24",
    description:
      "A 3D browser-based game where you control a geometric shape and blast enemies off the platform.",
    why: "This was built for a game jam. I'd been curious about Three.js for a while and I thought this could be the perfect excuse to learn it.",
    tech: ["Javascript", "Three.js"],
  },
  {
    name: "Pomodoro in the Terminal",
    githubProjectName: "pomodoro-cli",
    description: "A simple and customisable terminal based pomodoro app.",
    why: "I was looking into the pomodoro method. I was also learning Go and this was a good excuse to make a CLI app myself.",
    tech: ["Go"],
  },
  {
    name: "Advent of Code 2024",
    githubProjectName: "advent-of-code-2024",
    description: "Advent of code challenges for 2024.",
    why: "I was learning C#.",
    tech: ["C#"],
  },
  {
    name: "Advent of Code 2023",
    githubProjectName: "aoc2023",
    description: "Advent of code challenges for 2023.",
    why: "I was learning Go.",
    tech: ["Go"],
  },
  {
    name: "Ink Scrollable List",
    githubProjectName: "ink-scrollable-list",
    description:
      "A scrollable list component package for React Ink. Supports keyboard navigation and customizable scroll bars.",
    why: "I needed a scrollable list component for the server side TUI.",
    tech: ["React", "Typescript"],
  },
] as ProjectData[];
