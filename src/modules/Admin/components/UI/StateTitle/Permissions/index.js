const Main = () => import(/* webpackChunkName: "Admin", webpackPrefetch: true */ './Main')
const User = () => import(/* webpackChunkName: "Admin", webpackPrefetch: true */ './User')
const Api = () => import(/* webpackChunkName: "Admin", webpackPrefetch: true */ './Api')
const Route = () => import(/* webpackChunkName: "Admin", webpackPrefetch: true */ './Route')

export default {
  Main: Main,
  User: User,
  Api: Api,
  Route: Route
}
