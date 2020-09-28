/**
 * @function useCors 
 * @param {Headers} Headers
 * @return {Headers}
*/
export default (Headers) => {
  Headers.append("Access-Control-Allow-Origin", "*")
  Headers.append("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS, PUT, DELETE")
  Headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Shopify-Access-Token, Authorization")
  Headers.append("Access-Control-Allow-Credentials", "true")
  return Headers
}