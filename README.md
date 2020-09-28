# CRA with Cloudflare Router

This is a template of a Create-React-App and Cloudflare Worker 

It's intended to be clone using [`degit`](https://github.com/Rich-Harris/degit) and deployed with [Cloudflare Worker Sites](https://workers.cloudflare.com/sites)

The client app includes SCSS, React Router Dom, boilerplate app state with useContext and useReducer, and two basic routes (Index, 404 Route).

The serverless worker included handles to serve static content and a `/api` end point where serverless methods can be added additional routes.
