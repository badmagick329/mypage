import { GitHubClient } from "./githubclient";

async function main() {
  console.log(`[${new Date().toISOString()}] - Starting worker`);
  await fetchNewData();
  const interval = setInterval(() => {
    try {
      fetchNewData();
    } catch (error) {
      console.error("Error in fetchNewData interval:", error);
    }
  }, 1000 * 60 * 60);
}

async function fetchNewData() {
  console.log(`[${new Date().toISOString()}] - Fetching new data`);
  const cacheDir = getDataDir();
  if (!cacheDir) {
    throw new Error("DATA_DIR is not set");
  }
  const client = new GitHubClient(cacheDir);
  await client.fetchNewData();
}

function getDataDir(): string | undefined {
  return process.env.DATA_DIR;
}

main();
