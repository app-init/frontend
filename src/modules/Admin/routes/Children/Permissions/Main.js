import UI from '../../../components/UI'
import PermissionsReducer from '~/modules/Admin/reducers/Permissions'

let permissionsContainer = () => import(/* webpackChunkName: "Admin", webpackPrefetch: true */ '../../../containers/Permissions/MainContainer')

var route = {
  route: {
    path: '/permissions',
    exact: true,
  },
  ui: {
    stateTitle: UI.StateTitle.Permissions.Main,
    content: permissionsContainer
  },
  reducer: {
    name: 'permissions',
    data: PermissionsReducer 
  },

  mapStateToProps: (state) => {
    let stateObj = state.permissions.main.data

    return {
      apis: stateObj.apis,
      users: stateObj.users,
      routes: stateObj.routes,
      allUsers: stateObj.allUsers
    }
  },

  api: (utils) => {
    let state = utils.getState('permissions')

    if (!state.data || (!state.data.allUsers && !state.data.routes)) {
      let api = {
        setup: {
          path: 'permissions.setup'
        },
        users: {
          path: 'users.list'
        },
        routes: {
          path: 'routes.list'
        }
      }

      return utils.request(api).then((data) => {
        return data.setup.then((setup) => {
          return data.users.then((users) => {
            return data.routes.then((routes) => {
              let action = {
                data : {
                  users: setup.users,
                  apis: setup.apis,
                  allUsers: users,
                  routes: routes
                }
              }

              utils.dispatch('INIT', action, 'permissions.main')

              return action
            })
          })
        })
      })
    } else {
      let api = {
        path: 'permissions.setup'
      }

      return utils.request(api).then((data) => {
        let action = {
          ...data,
          users: state.data.allUsers,
          app: state.data.routes
        }

        utils.dispatch('INIT', action, 'permissions.main')

        return action
      })
    }
  }
}

export default route
