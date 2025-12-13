import { GitHubClient } from "./githubclient";

const reposProcessed = [] as string[];

async function main() {
  fetchNewData();
  const interval = setInterval(() => {
    fetchNewData();
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

  for (const repo of repos) {
    try {
      const commits = await client.getCommits(repo, client.lastFetch);
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
