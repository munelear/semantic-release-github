module.exports = (repositoryUrl) => {
  console.log(`Received url: ${repositoryUrl}`);
  const [match, auth, host, path] = /^(?!.+:\/\/)(?:(?<auth>.*)@)?(?<host>.*?):(?<path>.*)$/.exec(repositoryUrl) || [];
  try {
    const [, owner, repo] = /^\/(?<owner>[^/]+)?\/?(?<repo>.+?)(?:\.git)?$/.exec(
      new URL(match ? `ssh://${auth ? `${auth}@` : ''}${host}/${path}` : repositoryUrl).pathname
    );
    console.log(`Returning owner/repo: ${owner}/${repo}`);
    return {owner, repo};
  } catch {
    return {};
  }
};
