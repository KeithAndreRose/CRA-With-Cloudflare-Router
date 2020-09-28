import useCors from "./useCors"

/**
 * Append additional headers to response object
 * 
 * @param {Response} Response
 */
export default async function respondWith(Response){
  // Use CORS headers
  useCors(Response.headers)
 
  return Response
}