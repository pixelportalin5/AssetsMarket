import nextConfig from "@assetsmarket/config-eslint/next";

export default [...nextConfig, { ignores: [".next/**", "node_modules/**"] }];
