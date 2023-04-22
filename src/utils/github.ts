import { Octokit } from "octokit";
import { COLLABORATION_REPOS, GITHUB_USERNAME, POPULAR_REPO_SHOW_COUNT } from "../../src/consts";

const octokit = new Octokit({
  auth: import.meta.env.GITHUB_AUTH_TOKEN,
});

export async function getRepository(repoName: string) {
  const repository = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: repoName.split("/")[0],
    repo: repoName.split("/")[1],
  });

  return repository.data as unknown as Promise<RawRepository>;
}

export async function getRepositories() {
  const repositories = await octokit.request("GET /search/repositories", {
    q: `user:${GITHUB_USERNAME}`,
    sort: "stars",
    order: "desc",
    per_page: POPULAR_REPO_SHOW_COUNT,
  });

  return repositories.data.items as unknown as Promise<RawRepository[]>;
}

export async function getTopFiveRepositories(): Promise<Repository[]> {
  const repos = await getRepositories();

  const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  const slicedRepos = sortedRepos.slice(0, POPULAR_REPO_SHOW_COUNT);
  const mappedRepos = slicedRepos.map(mapRepository);

  return mappedRepos;
}

export async function getCollaborationRepositories() {
  const responses = await Promise.allSettled(COLLABORATION_REPOS.map((repoName: string) => getRepository(repoName)));
  const repos = responses
    .map((response) => (response.status === "fulfilled" ? response.value : null))
    .filter(Boolean) as RawRepository[];

  const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  const slicedRepos = sortedRepos.slice(0, POPULAR_REPO_SHOW_COUNT);
  const mappedRepos = slicedRepos.map(mapRepository);

  return mappedRepos;
}

export function mapRepository(rawRepo: RawRepository): Repository {
  return {
    id: rawRepo.id,
    name: rawRepo.name,
    url: rawRepo.html_url,
    description: rawRepo.description,
    createdDate: rawRepo.created_at,
    updatedDate: rawRepo.updated_at,
    startCount: rawRepo.stargazers_count,
    watchersCount: rawRepo.watchers_count,
    forksCount: rawRepo.forks_count,
    language: rawRepo.language,
  };
}
