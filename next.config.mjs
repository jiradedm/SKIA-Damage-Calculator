/** @type {import('next').NextConfig} */
import { execSync } from "child_process";

const lastCommitCommand = "git rev-parse HEAD";

const nextConfig = {
  async generateBuildId() {
    return execSync(lastCommitCommand).toString().trim() || "";
  },
  output: "export",
  basePath: "/SKIA-Damage-Calculator",
  assetPrefix: "https://jiradedm.github.io/SKIA-Damage-Calculator",
};

export default nextConfig;
