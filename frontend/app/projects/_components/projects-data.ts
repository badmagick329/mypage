import { ProjectData } from "@/lib/types";

export const projectsData = [
  {
    name: "School Inventory and Sales Manager",
    githubProjectName: "inventorymanager",
    homePage: "https://inv.mgck.ink",
    mediaList: [
      {
        url: "/videos/inventorymanager.mp4",
        text: "",
        type: "video/mp4",
      },
      {
        url: "/videos/inventorymanager2.mp4",
        text: "All actions are logged for admin review",
        type: "video/mp4",
      },
    ],
    description:
      "An inventory and sales manager built for my family's schools.",
    tagline: "Replacing paper workflows with a custom solution",
    shortDescription:
      "A custom inventory and sales system built to replace error-prone paper-based workflows for schools.",
    why: "My family's private schools relied on a paper-based, highly error-prone system to manage combined inventories and sales across their schools. I solved the issue with an app that would mirror the existing workflow in a digital, secure environment. The app also introduced safeguards against incorrect data entries. App features different admin permissions to maintain control and can monitor sales amounts and total revenue, as well as inventory sizes for different products. It also logs every action taken by the users for admins to review later.",
    tech: [
      "Next.js",
      "React",
      "Django",
      "Typescript",
      "Tailwind",
      "Python",
      "Postgres",
      "Docker",
    ],
    tags: [
      "Next.js",
      "React",
      "Typescript",
      "Django",
      "Python",
      "Postgres",
      "Web App",
      "SQL",
      "Docker",
      "Tailwind",
    ],
    createdAt: Date.parse("2024-01-25T20:51:03Z"),
  },
  {
    name: "Remote Video Encoding Service",
    githubProjectName: "ffmpeg_service",
    description:
      "Offload batches of ffmpeg commands to your homelab or VPS instances. Files are sent to the servers, processed, and copied back to your machine.",
    mediaList: [
      {
        url: "/videos/remoteffmpeg.mp4",
        text: "",
        type: "video/mp4",
      },
    ],
    tagline: "Offload heavy video encoding to your server",
    shortDescription:
      "Batch process FFmpeg commands on a remote server, freeing your local machine from slow AV1 encodes.",
    why: "AV1 video encoding can be slow. Workloads can keep your computer busy for hours and you can't do much while you're waiting for this process. This lets you send your workload to one or more remote machines where they will be processed in parallel, and the results will be sent back to your machine.",
    tech: ["React", "Typescript", "Tailwind", "SQLite", "FFmpeg", "Docker"],
    tags: [
      "React",
      "Typescript",
      "Docker",
      "CLI App",
      "SQL",
      "Tailwind",
      "FFmpeg",
      "SQLite",
    ],
    createdAt: Date.parse("2025-08-17T01:16:37Z"),
  },
  {
    name: "Discord Emotes and Stickers",
    githubProjectName: "mgck",
    homePage: "https://mgck.ink/discordgifs",
    description:
      "Create emotes and stickers for Discord from your video clips, complying with Discord's size limits.",
    mediaList: [
      {
        url: "/videos/discordgifs.mp4",
        text: "",
        type: "video/mp4",
      },
    ],
    tagline: "Create Discord emotes without the size limit guesswork",
    shortDescription:
      "Turn video clips into Discord-ready emotes and stickers, automatically optimized to meet file size limits.",
    why: "When creating your own stickers or emotes for Discord, you often have to play a 'guess the frame size' game. This results in recreating the emote and sticker multiple times to get the right size. With this app, you can automate this tedious process.",
    tech: ["Next.js", "React", "Typescript", "Tailwind", "FFmpeg", "Docker"],
    tags: [
      "Next.js",
      "React",
      "Typescript",
      "FFmpeg",
      "Docker",
      "Web App",
      "Tailwind",
    ],
    createdAt: Date.parse("2023-07-04T18:01:12Z"),
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
    why: "A copywriter wanted me to create a website that also includes a blog. A modern interface with easy-to-use customisation options that allow the owner to update and monitor the website and blog traffic.",
    tech: ["Next.js", "React", "Typescript", "Tailwind", "Velite", "Docker"],
    tags: ["Next.js", "React", "Typescript", "Docker", "Tailwind"],
    createdAt: Date.parse("2024-04-30T21:23:31Z"),
  },
  {
    name: "Red Velvet Gfy Archive",
    githubProjectName: "mgck",
    homePage: "https://mgck.ink/gfys",
    description:
      "A webpage to browse high-quality GIFs of the K-pop girl group Red Velvet, migrated from Gfycat.",
    mediaList: [
      {
        url: "/videos/gfys.mp4",
        text: "Browse through Red Velvet GIFs",
        type: "video/mp4",
      },
      {
        url: "/videos/gfys2.mp4",
        text: "Filter results by account, date, title or tags",
        type: "video/mp4",
      },
      {
        url: "/videos/gfys3.mp4",
        text: "Autoplay the filtered results on loop",
        type: "video/mp4",
      },
    ],
    tagline: "Preserving content from Gfycat's shutdown",
    shortDescription:
      "A searchable archive of high-quality Red Velvet clips rescued before Gfycat's 2023 shutdown.",
    why: "On September 1 2023, Gfycat was shut down, which led to people losing a lot of clips they had created and stored on the site. I built a webpage in a short amount of time to store and display some of those GIFs, so they wouldn't be lost forever.",
    tech: [
      "Next.js",
      "React",
      "Django",
      "Typescript",
      "Tailwind",
      "Python",
      "Postgres",
      "Docker",
    ],
    tags: [
      "Next.js",
      "React",
      "Django",
      "Typescript",
      "Python",
      "Postgres",
      "Web App",
      "SQL",
      "Docker",
      "Tailwind",
    ],
    createdAt: Date.parse("2023-07-04T18:01:12Z"),
  },
  {
    name: "Tetris in the Terminal",
    githubProjectName: "tetris",
    description: "A tetris clone in the terminal, written in Rust 🦀",
    mediaList: [
      {
        url: "/videos/clitetris.mp4",
        text: "",
        type: "video/mp4",
      },
    ],

    tagline: "Classic Tetris, reimagined for the terminal",
    shortDescription:
      "A fully playable Tetris clone built in Rust for the command line.",
    why: "While learning Rust, I was listening to the title song for the movie about the creation of Tetris. So, I decided to build a Tetris game for the terminal, with the song playing in the background as you play. You can choose any mp3 you want as the soundtrack.",
    tech: ["Rust"],
    tags: ["Rust", "CLI App", "Game"],
    createdAt: Date.parse("2023-04-26T23:24:16Z"),
  },
  {
    name: "Food Inventory Manager",
    githubProjectName: "foodinventorymanager",
    description:
      "A food inventory management app. It features automated receipt parsing and a conversational AI assistant accessible via Discord.",
    mediaList: [
      {
        url: "/videos/foodinventory.mp4",
        text: "Web app with receipt parsing",
        type: "video/mp4",
      },
      {
        url: "/videos/foodinventory2.mp4",
        text: "Conversational agent",
        type: "video/mp4",
      },
    ],
    tagline: "Pantry tracking with receipt parsing and an AI chatbot",
    shortDescription:
      "Manage household food inventory with automated receipt parsing and a conversational Discord assistant.",
    why: "Keeping track of everything in your pantry can be a challenge, especially when it comes to use-by dates. This app makes it easy to view the content of your fridge, freezer and pantry, no matter where you are. Best-by dates help you reduce food waste, and the displayed quantities ensure you only buy the amount you need during your weekly shop. You can also input your Ocado PDF-receipts for home deliveries to avoid having to manually enter each item. An AI chatbot is also available through discord which makes it easier to query the app and even remove items as you're cooking.",
    tech: [
      "Next.js",
      "React",
      "Typescript",
      "Tailwind",
      "Postgres",
      "Gemini",
      "BullMQ",
      "Docker",
    ],
    tags: [
      "Next.js",
      "React",
      "Typescript",
      "AI",
      "Docker",
      "Postgres",
      "SQL",
      "Web App",
      "Tailwind",
    ],
    createdAt: Date.parse("2023-10-15T18:05:09Z"),
  },
  {
    name: "Kpop Releases",
    githubProjectName: "mgck",
    homePage: "https://mgck.ink/kpop",
    description:
      "Stay ahead of the latest Kpop comebacks by your favourite groups. Search for any comebacks you may have missed.",
    mediaList: [
      {
        url: "/videos/kpop.mp4",
        text: "",
        type: "video/mp4",
      },
    ],
    tagline: "Never miss a Kpop comeback",
    shortDescription:
      "Track upcoming releases and discover past comebacks from your favorite Kpop groups.",
    why: "A lot of things happen in the world of K-pop, and it's very easy to miss out on a release of your favourite artist. I built a website that gathers this data for you and displays the comebacks by group and date. The interface makes it easy to search for upcoming or past releases by date, title or artist name. Releases also include a link to the YouTube to view the Music Video.",
    tech: [
      "Next.js",
      "React",
      "Django",
      "Typescript",
      "Tailwind",
      "Python",
      "Postgres",
      "Docker",
    ],
    tags: [
      "Next.js",
      "React",
      "Django",
      "Typescript",
      "Python",
      "Postgres",
      "Docker",
      "Web App",
      "SQL",
      "Tailwind",
    ],
    createdAt: Date.parse("2023-07-04T18:01:12Z"),
  },
  {
    name: "Video Summariser",
    githubProjectName: "gemini_summariser",
    description:
      "A video summariser with a follow up Q&A mode. Supports both local and YouTube videos.",
    mediaList: [
      {
        url: "/videos/geminisummariser.mp4",
        text: "",
        type: "video/mp4",
      },
    ],
    tagline: "Get to the point of any video, fast",
    shortDescription:
      "Summarise local or YouTube videos with AI, then ask follow-up questions.",
    why: "Nobody likes getting clickbaited. There are many summary tools available, including YouTube's integrated summariser. However, I've found most of those rather insufficient. So, I created a tool that would give users a more detailed yet concise summary to learn what a specific YouTube video was about. You can even ask follow-up questions.",
    tech: ["Python", "Gemini"],
    tags: ["Python", "AI"],
    createdAt: Date.parse("2024-10-24T00:47:22Z"),
  },
  {
    name: "Spotify Playlist Maker",
    githubProjectName: "spotify-playlist-cli",
    mediaList: [
      {
        url: "/videos/spotifyplaylistcli.mp4",
        text: "",
        type: "video/mp4",
      },
    ],
    description:
      "A CLI app to create filtered Spotify playlists from existing playlists. You can filter by release date and/or artists.",

    tagline: "Filter Spotify playlists from the command line",
    shortDescription:
      "A CLI tool to generate new Spotify playlists filtered by release date or artist.",
    why: "People often use one or two giant playlists for all the songs they like on Spotify. While this is convenient, you lose the ability to filter songs by specific artists or release dates for a listening session. This lets you create playlists based on those filters, pulling songs only from your chosen playlists.",
    tech: ["C#"],
    tags: ["C#", "CLI App"],
    createdAt: Date.parse("2024-12-23T19:22:49Z"),
  },
  {
    name: "Download Watcher",
    githubProjectName: "download-watcher",
    description:
      "A background watcher that cleans up your download folder based on the rules you specify. It can also be run as a one-off to cleanup any other folders.",
    mediaList: [
      {
        url: "/videos/downloadwatcher.mp4",
        text: "",
        type: "video/mp4",
      },
    ],
    tagline: "Automate your download folder cleanup",
    shortDescription:
      "A background service that organises and cleans your downloads based on custom rules.",
    why: "There's a lot of junk that piles up in your download folder. Some of it is used just once and can be removed after, while some of it needs to be moved elsewhere. This app automates the organisation and cleanup.",
    tech: ["C#"],
    tags: ["C#", "CLI App"],
    createdAt: Date.parse("2024-10-01T18:47:43Z"),
  },
  {
    name: "Cublaster Game",
    githubProjectName: "gamejam24",
    description:
      "A 3D browser-based game where you control a geometric shape and blast enemies off the platform.",

    mediaList: [
      {
        url: "/videos/cublaster.mp4",
        text: "",
        type: "video/mp4",
      },
    ],
    homePage: "https://badmagick.itch.io/cublaster",
    tagline: "A 3D browser game built with Three.js",
    shortDescription:
      "A 3D browser-based game where you control a geometric shape and blast enemies off the platform.",
    why: "Participated in a game jam with a friend and used the experience as an opportunity to learn Three.js.",
    tech: ["Javascript", "Three.js"],
    tags: ["Javascript", "Three.js", "Game", "Web App"],
    createdAt: Date.parse("2024-07-21T12:24:24Z"),
  },
  {
    name: "Pomodoro in the Terminal",
    githubProjectName: "pomodoro-cli",
    description: "A simple and customisable terminal based pomodoro app.",
    mediaList: [
      {
        url: "/videos/pomodoro.mp4",
        text: "Timer defaults",
        type: "video/mp4",
      },
      {
        url: "/videos/pomodoro2.mp4",
        text: "Custom flags let you change the number of periods and their duration",
        type: "video/mp4",
      },
    ],
    tagline: "A simple, customisable pomodoro timer for the CLI",
    shortDescription:
      "A simple, customisable pomodoro timer for the command line.",
    why: "I was looking into the pomodoro method. I was also learning Go and this was a good excuse to make a CLI Go app.",
    tech: ["Go"],
    tags: ["Go", "CLI App"],
    createdAt: Date.parse("2023-06-22T20:33:08Z"),
  },
  {
    name: "This Page",
    homePage: "https://hello.mgck.ink",
    githubProjectName: "mypage",
    description: "My personal website and portfolio.",
    tagline: "My personal website and portfolio",
    shortDescription: "My personal website and portfolio.",
    why: "I wanted to showcase some of the things I've built on a single website.",
    tech: ["Next.js", "React", "Typescript", "Tailwind", "Docker"],
    tags: ["Next.js", "React", "Typescript", "Web App", "Tailwind"],
    createdAt: Date.parse("2025-12-01T23:12:25Z"),
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
    tags: ["C#"],
    createdAt: Date.parse("2024-12-01T19:05:17Z"),
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
    tags: ["Go"],
    createdAt: Date.parse("2023-12-01T20:15:20Z"),
  },
  {
    name: "Ink Scrollable List",
    githubProjectName: "ink-scrollable-list",
    description:
      "A scrollable list component package for React Ink. Supports keyboard navigation and customisable scroll bars.",
    mediaList: [
      {
        url: "/videos/inkscrollablelist.mp4",
        text: "",
        type: "video/mp4",
      },
    ],
    tagline: "A scrollable list component for React Ink",
    shortDescription:
      "A keyboard-navigable, scrollable list component for building terminal UIs with React Ink.",
    why: "I needed a scrollable list component for the server-side terminal user interface of my remote ffmpeg service.",
    tech: ["React", "Typescript"],
    tags: ["React", "Typescript"],
    createdAt: Date.parse("2025-10-21T15:19:26Z"),
  },
] as ProjectData[];
