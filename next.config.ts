import type {NextConfig} from "next";
import path from "path";

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        SITE_NAME: process.env.SITE_NAME, SITE_ORG: process.env.SITE_ORG,
    }, webpack: (config, {dev}) => {
        if (dev) {
            const jsonRuleIndex = config.module.rules.findIndex((rule: any) => rule.test && rule.test.toString().includes('json'));

            if (jsonRuleIndex !== -1) {
                config.module.rules.splice(jsonRuleIndex, 1);
            }
            config.module.rules.push({
                test: /zh_CN\.json$/, include: [path.resolve(__dirname, 'src/dictionaries')], type: 'json', use: [{
                    loader: path.resolve(__dirname, 'loaders/dictionary-interface-loader.ts')
                }]
            });
        }
        return config;
    }, turbopack: {
        rules: {
            '**/src/dictionaries/zh_CN.json': {
                loaders: [path.resolve(__dirname, 'loaders/dictionary-interface-loader.ts')], as: '*.json'
            }
        }
    }
};

export default nextConfig;
