import { respondWith } from "../lib/utils";

/**
 * @param {request} request
 */
export default async function HelloRoute(request){
  return respondWith(
    new Response('Hi, you found a worker API', { headers: new Headers({"content-type": "application/json"}) })
  )
}