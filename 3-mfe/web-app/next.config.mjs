/** @type {import('next').NextConfig} */
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig = {
    webpack(config, options) {
        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: "host",
                    remotes: {
                        movies: "movies@http://localhost:5001/assets/moviesRemoteEntry.js",
                    },
                    filename: 'assets/moviesRemoteEntry.js',
                })
            );
        }

        return config;
    },
};


export default nextConfig; // Export the configuration object
