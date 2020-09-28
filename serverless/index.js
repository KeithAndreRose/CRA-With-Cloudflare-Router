import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import Router from './router'
import {handleOptions, respondWith} from './lib/utils'

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

  
  // Root route response
  r.get('.*/hello', () => 
    respondWith(
      new Response('Hi, you found a worker API', { headers: new Headers({"content-type": "application/json"}) })
    )
  )

  // Catch all route/404 response
  r.get( '.*/.*',
    () =>
      respondWith(
        new Response("Nothing's Here", {
          status: 404,
          statusText: 'Not Found',
          headers: new Headers({"content-type": "application/json"}),
        })
      )
  ) 

  const response = await r.route(request)
  return response
}