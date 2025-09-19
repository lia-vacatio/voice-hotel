import type { NextConfig } from "next";

// NOTE:
// basePath must be undefined or a non-empty string that starts with "/".
// Setting it to an empty string can break routing and cause 404 on root.
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = {
  /* config options here */
  // URL 경로 커스터마이징 (환경변수 존재할 때만 적용)
  ...(configuredBasePath
    ? { basePath: configuredBasePath, assetPrefix: configuredBasePath }
    : {}),
};

export default nextConfig;
