function Route(state = {}, action) {
  switch (action.type) {
    case 'PERMISSIONS_ROUTES_INIT':
      var newState = {...state}

      if (action.permissions !== undefined) {
        newState.permissions = action.permissions
      }

      if (action.users !== undefined) {
        newState.users = action.users
      }

      return Object.assign({}, state, newState)
    default:
      return state
  }
}

export default Route
