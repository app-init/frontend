import UI from '../../../components/UI'
import PermissionsReducer from '~/modules/Admin/reducers/Permissions'

let routeContainer = () => import(/* webpackChunkName: "Admin", webpackPrefetch: true */ '../../../containers/Permissions/Route/MainContainer')

var route = {
  route: {
    path: '/permissions/routes/:name',
    exact: true,
  },
  ui: {
    stateTitle: UI.StateTitle.Permissions.Route,
    content: routeContainer
  },
  reducer: {
    name: 'permissions',
    data: PermissionsReducer 
  },

  mapStateToProps: (state) => {
    let stateObj = state.permissions.route

    return {
      permissions: stateObj.permissions,
      users: stateObj.users
    }
  },

  api: (utils, match) => {
    const api = {
      permissions: {
        path: 'permissions.routes.get',
        data: {
          route: match.params.name
        }
      },
      users: {
        path: 'users.list'
      }
    }


    return utils.request(api).then(data => {
      return data.permissions.then(permissions => {
        return data.users.then(users => {
          let action = { permissions, users }

          utils.dispatch('INIT', action, 'permissions.routes')

          return action
        })
      })
    })
  }
}

export default route
