import React, { Component } from 'react'
import { Utils } from '@app-init/ui'
import Main from '../../../components/Views/Permissions/User/User'
import Permissions from '../../../components/Views/Permissions/User/Permissions'

export default class MainContainer extends Component {
  constructor(props) {
    super(props)

    this.utils = new Utils('permissions.user')
    this.newPermission = {}

    let stateObj = this.props.user

    this.state = {
      routes: stateObj.routes || [],
      permissions: this.constructPermissionsObj(props),
      inputs: {},
      tool: '',
      newRoute: '',
    }
  }

  constructPermissionsObj(props) {
    const permissions = {}
    const inputs = {}

    //Construct initial dictionary with all values false
    Object.keys(props.routes).forEach(route => {
      permissions[route] = {}
      inputs[route] = ''

      props.routes[route].forEach(perm => {
        permissions[route][perm] = false
      })
    })

    //Proceed to filp values to true for supplied permissions
    Object.keys(props.user.permissions_obj).forEach(route => {
      props.user.permissions_obj[route].forEach(perm => {
        permissions[route][perm] = true
      })
    })
    return permissions
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.user = nextProps.user
      const permissions = this.constructPermissionsObj(nextProps)

      this.oldPermissions = permissions
      this.oldRoutes = this.user.routes

      this.setState({
        permissions,
        routes: this.user.routes,
      })
    }
    return true
  }

  handleChange(event) {
    this.setState({
      newRoute: event.target.value,
    })
  }

  addPermission() {
    const {permission, route} = this.newPermission
    if (permission && route) {
      if (this.props.permissions_obj[route] === undefined) {
        this.setState({
          inputs: {
            [route]: '',
          },
          routes: [...this.state.routes, route],
        })
      }

      this.setState({
        permissions: {
          ...this.props.permissions_obj,
          [route]: {
            ...this.props.permissions_obj[route],
            [permission]: true,
          },
        },
      })
    }
  }

  removeNewPermission(id) {
    const newPermissions = [...this.state.pendingAdds]
    const index = newPermissions.find(permission => permission.id === id)
    newPermissions.splice(index, 1)

    this.setState({
      pendingAdds: newPermissions,
    })
  }

  addNewRoute() {
    const route = this.state.newRoute
    if (route && !this.state.routes.includes(route)) {
      this.setState({
        routes: [...this.state.routes, route],
        permissions: {
          ...this.state.permissions,
          [route]: {},
        },
        newRoute: '',
      })
    }
  }

  addRoutePermission(route) {
    const newPermission = this.state.inputs[route]
    if (newPermission) {

      let stateObj = this.state

      stateObj.permissions[route][newPermission] = true
      stateObj.inputs[route] = ''

      this.setState({...stateObj})
    }
  }

  togglePermission(route, perm) {
    const permissions = this.state.permissions
    const routePermissions = permissions[route]

    if (routePermissions === undefined) {
      console.log('ROUTE PERMISSIONS CAME IN UNDEFINED WHEN TRYING TO TOGGLE')
      this.setState({
        permissions: {
          ...permissions,
          [route]: [
            perm,
          ],
        }
      })
    } else {

      //Store current permissions datea
      let updatedPermissions = this.state.permissions

      //Update toggled value (Flip its value)
      updatedPermissions[route][perm] = !updatedPermissions[route][perm]

      //Set the newley updated permissions to the container state
      this.setState({
        permissions: {
          ...updatedPermissions
        }
      })
    }
  }

  handleInputChange(text, route) {
    this.setState({
      inputs: {
        [route]: text,
      },
    })
  }

  createPermissionsComponent() {
    return (
      <Permissions
        routePermissions={this.props.routes}
        routes={this.props.user.routes}
        permissions={this.state.permissions}
        inputs={this.state.inputs}
        togglePermission={(route, perm) => this.togglePermission(route, perm)}
        handleInputChange={(event, route) => this.handleInputChange(event, route)}
        addRoutePermission={(route) => this.addRoutePermission(route)}
      />
    )
  }

  submitChanges() {
    const permissions_obj = {}
    const permissions = this.state.permissions
    const routes = [...this.state.routes]

    Object.keys(permissions).forEach(route => {
      permissions_obj[route] = []
      const routePermissions = permissions[route]
      // adding to routes list so that permission is set for the
      // new route
      if (!routes.includes(route)) {
        routes.push(route)
      }

      Object.keys(routePermissions)
        // only adding permissions that are checked
        .filter(perm => routePermissions[perm])
        .forEach(selectedPerm => {
          permissions_obj[route].push(selectedPerm)
        })
    })

    const data = {
      ...this.props.user,
      permissions_obj,
      routes: routes,
    }

    const api = {
      path: 'permissions.users.edit',
      data,
    }

    const listApi = {
      path: 'permissions.routes.list',
    }

    this.loading(true)
    this.utils.request(api).then(userData => {
      this.utils.request(listApi).then(listData => {
        this.utils.dispatch('INIT', {user: userData, routes: listData})
        this.loading(false)
      })
    })
  }

  revertChanges() {

    //Get old permissions from props, since props would not have changed
    //throughout the process of adding and modifying permissions

    let oldPermissions = this.constructPermissionsObj(this.props)

    this.setState({
      permissions: oldPermissions,
      routes: this.props.routes,
    })
  }

  loading(isLoading) {
    this.setState({loading: isLoading})
  }

  changeTool(tool) {
    this.setState({
      tool,
    })
  }

  render() {
    return (
      <Main
        user={this.user}
        routes={this.props.user.routes}
        newRoute={this.state.newRoute}
        tool={this.state.tool}
        handleChange={(event, type) => this.handleChange(event, type)}
        submitChanges={() => this.submitChanges()}
        revertChanges={() => this.revertChanges()}
        permissionsComponent={this.createPermissionsComponent()}
        changeTool={tool => this.changeTool(tool)}
        addNewRoute={route => this.addNewRoute(route)}
      />
    )
  }
}
