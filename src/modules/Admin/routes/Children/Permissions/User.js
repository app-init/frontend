import UI from '../../../components/UI'
import PermissionsReducer from '~/modules/Admin/reducers/Permissions'

let userContainer= () => import(/* webpackChunkName: "Admin", webpackPrefetch: true */ '../../../containers/Permissions/User/MainContainer')

var route = {
  route: {
    path: '/permissions/user/:uid',
    exact: true,
  },
  ui: {
    stateTitle: UI.StateTitle.Permissions.User,
    content: userContainer
  },
  reducer: {
    name: 'permissions',
    data: PermissionsReducer 
  },

  mapStateToProps: (state) => {
    let stateObj = state.permissions.user

    return {
      user: stateObj.user,
      routes: stateObj.routes
    }
  },

  api: (utils, match) => {
    const api = {
      user: {
        path: 'permissions.users.get',
        data: {
          uid: match.params.uid,
        },
      },
      list: {
        path: 'permissions.routes.list',
      }
    }

    return utils.request(api).then(data => {
      return data.user.then(user => {
        return data.list.then(routes => {
          let action = { user, routes }

          utils.dispatch('INIT', action, 'permissions.user')

          return action
        })
      })
    })
  }
}

export default route
