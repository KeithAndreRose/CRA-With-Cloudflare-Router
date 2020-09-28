/**
 * SETTINGS_DATA is a KV namespace
 * KV namespaces need to be generated
 * Ref: https://developers.cloudflare.com/workers/cli-wrangler/commands#kvnamespace
 */
export default async key => await SETTINGS_DATA.get(key)