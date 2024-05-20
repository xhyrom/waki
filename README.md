**Waki** stands for **Wak**aTime **I**ntegration Proxy. It is a simple proxy server that forwards requests to multiple WakaTime instances.

Runs fully on [Cloudflare Workers](https://workers.cloudflare.com/).

## Requirements

- [node.js](https://nodejs.org/)
- [pnpm](https://pnpm.js.org/)
- [cloudflare account](https://cloudflare.com)

## How to setup

After cloning the repository and installing the dependencies, you need to run the following command to deploy the worker:

```bash
pnpm run deploy
```

Then, you need to set the following environment variables in your Cloudflare account:

- `API_TOKEN` - randomly generated token that will be used to authenticate requests
- `PROVIDERS` - list of WakaTime instances (in JSON format)
- `MAIN_PROVIDER` - main WakaTime instance which will be used to retrieve the user's data, etc...

Look at the `vars.example` file for more information.

You can set the environment variables using the Cloudflare dashboard or using the `wrangler` CLI.

```bash
wrangler secret put API_TOKEN
wrangler secret put PROVIDERS
wrangler secret put MAIN_PROVIDER
```