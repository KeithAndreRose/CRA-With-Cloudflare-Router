import respondWith from "./respondWith"

export default async function checkAuthorization(request){
  const auth = request.clone().headers.get('Authorization')
  if(atob(auth) !== PASSWORD){
    return respondWith(
      new Response('Unauthorized', { status: 401})
    )
  }
}