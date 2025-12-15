import { GitHubClient } from "./githubclient";

const reposProcessed = [] as string[];

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
  console.log(`[${new Date().toISOString()}] - Starting fetchNewData`);
  const client = new GitHubClient(`${getDataDir()}/activity.json`);
  if (await client.isNearRateLimit()) {
    console.log("exiting");
    return;
  }
  const repos = await client.getRepos();

  const lastFetch = client.lastFetch();
  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i]!;
    console.log(`[${i + 1}/${repos.length}] - Processing repo: ${repo.name}`);
    try {
      const commits = await client.getCommits(repo, lastFetch);
      for (const commit of commits) {
        await client.extractDataFromCommit(repo, commit);
      }

      client.saveToFile();
      reposProcessed.push(repo.name);

      if (await client.isNearRateLimit()) {
        console.log("stopping...");
        break;
      }
    } catch (error) {
      console.error(`Error processing repo ${repo.name}:`, error);
      break;
    }
  }

  console.log("repos processed");
  console.log(reposProcessed);
}

function getDataDir(): string | undefined {
  return process.env.DATA_DIR;
}

main();
