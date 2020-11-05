import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import Router from './router'
import {handleOptions} from './lib/utils'
import { DefaultRoute, HelloRoute } from './routes'

// Entry
addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

/**
* Event Handlers (API || CLIENT APP)
*/
async function handleEvent(event) {
  const url = new URL(event.request.url);
  let options = {};

  /**
  * Handles /api events
  */
 const apiRequest = url.pathname.split("/")[1] === "api";
 if (apiRequest) return await handleRouterRequest(event.request);
 
  /**
   * Serves Static Index
   */
  try {
    return await getAssetFromKV(event, options);
  } catch (e) {
    // Always falls back to serving index.html 
    return getAssetFromKV(event, {
      mapRequestToAsset: (req) =>
        new Request(`${new URL(req.url).origin}/index.html`, req),
    });
  }
}

/** 
 * @param {Request} request 
 */
async function handleRouterRequest(request) {
  // Handles 'OPTIONS' request (Preflight)
  if (request.method === 'OPTIONS') return handleOptions(request)

  const r = new Router()

  r.get('.*/hello', HelloRoute)
  r.get( '.*/.*', DefaultRoute) 

  const response = await r.route(request)
  return response
}