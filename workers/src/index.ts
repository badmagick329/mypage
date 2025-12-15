import { GitHubClient } from "./githubclient";

async function main() {
  console.log(`[${new Date().toISOString()}] - Starting worker`);
  const interval = setInterval(() => {
    try {
      fetchNewData();
    } catch (error) {
      console.error("Error in fetchNewData interval:", error);
    }
  }, 1000 * 60 * 30);
}

async function fetchNewData() {
  console.log(`[${new Date().toISOString()}] - Fetching new data`);
  const client = new GitHubClient(`${getDataDir()}/activity.json`);
  await client.fetchNewData();
}

function getDataDir(): string | undefined {
  return process.env.DATA_DIR;
}

main();
