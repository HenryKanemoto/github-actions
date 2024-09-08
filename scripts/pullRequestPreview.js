import { execSync } from "child_process";

console.log("[DEPLOY_PREVIEW]: START");
const command = "npm run deploy:staging ";
const output = execSync(command, { encoding: "utf-8" });
const outputLines = output.split("\n");
const DEPLOY_URl = outputLines[outputLines.length - 1];
console.log("[DEPLOY_PREVIEW]: END");

console.log(`You can see the deploly preview on: ${DEPLOY_URl}`);

console.log("[GITHUB_COMMENT]: START");

const { GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_PR_NUMBER} = process.env;
console.log("GITHUB_REPOSITORY", GITHUB_REPOSITORY);
console.log("GITHUB_PR_NUMBER", GITHUB_PR_NUMBER);


//HEADER da requisição
const defaultHeaders = {};
defaultHeaders["authorization"] = `token ${GITHUB_TOKEN}`;
defaultHeaders["accept"] =
  "application/vnd.github.v3+json; application/vnd.github.antiope-preview+json";
defaultHeaders["content-type"] = "application/json";

const GH_COMMENT = `
- Deploy URL: [${DEPLOY_URl}](${DEPLOY_URl})
`;
fetch(
    `https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${GITHUB_PR_NUMBER}/comments`,
    {
      headers: defaultHeaders,
      method: "POST",
      body: JSON.stringify({
        body: GH_COMMENT,
      }),
    }
  )
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .catch((err) => {
      console.log("[COMMENT_ON_GITHUB: ERROR]");
      throw new Error(err);
    })
    .finally(() => {
      console.log("[COMMENT_ON_GITHUB: END]");
    });