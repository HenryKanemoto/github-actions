import { execSync } from "child_process";

console.log("[DEPLOY_PREVIEW]: START");
const command = "npm run deploy:staging ";
const output = execSync(command, { encoding: "utf-8" });
const outputLines = output.split("\n");
const DEPLOY_URl = outputLines[outputLines.length - 1];
console.log("[DEPLOY_PREVIEW]: END");

console.log(`You can see the deploly preview on: ${DEPLOY_URl}`);

//console.log("[GITHUB_COMMENT]: START");
//console.log("[GITHUB_COMMENT]: END");