import { useCors } from '.'

export default async function handleOptions(request) {
  const headers = useCors(new Headers({ Allow: 'GET, HEAD, POST, OPTIONS' }))
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  if (
    request.headers.get('Origin') !== null &&
    request.headers.get('Access-Control-Request-Method') !== null &&
    request.headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check the requested method + headers
    // you can do that here.
    return new Response(null, { headers })
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers,
    })
  }
}
