import { respondWith } from "../lib/utils";

/**
 * @param {request} request
 */
export default async function (request){
  return respondWith(
    new Response("Nothing's Here", {
      status: 404,
      statusText: 'Not Found',
      headers: new Headers({"content-type": "application/json"}),
    })
  )
}