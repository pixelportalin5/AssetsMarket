import nodeConfig from "@assetsmarket/config-eslint/node";

export default [...nodeConfig, { ignores: ["dist/**", "node_modules/**"] }];
