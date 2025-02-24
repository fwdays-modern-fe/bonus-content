/** @type {import('next').NextConfig} */

import {NextFederationPlugin} from "@module-federation/nextjs-mf";

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options){
    if(!options.isServer){
      config.plugins.push(
          new NextFederationPlugin({
            name: 'host',
            remotes: {
              list: 'list@http://localhost:6061/remoteEntry.js'
            },
            filename: "static/chunks/remoteEntry.js"
          })
      )
    }

    return config;
  }
};

export default nextConfig;
