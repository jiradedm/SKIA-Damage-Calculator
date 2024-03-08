/** @type {import('next').NextConfig} */
import { execSync } from "child_process";

const lastCommitCommand = "git rev-parse HEAD";

const nextConfig = {
  async generateBuildId() {
    return execSync(lastCommitCommand).toString().trim() || "";
  },
  output: "export",
};

export default nextConfig;
