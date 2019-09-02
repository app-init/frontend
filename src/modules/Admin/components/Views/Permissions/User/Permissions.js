import React, { Component } from 'react'
import { Button, Inputs, Tabs, Utils } from '@app-init/ui'

class Permissions extends Component {
  constructor(props) {
    super(props)
    this.utils = new Utils()
  }

  renderPermissionsTable() {
    const userRoutes = Object.keys(this.props.routePermissions)
      .sort()
      .filter(name => name !== 'admin')

    // TODO make dynamic
    const labels = {
      bzcompliance: <i className="fa fa-bug" />,
      jobs: <i className="fa fa-tasks" />,
      'support-exceptions': <i className="fa fa-globe" />,
      system: <i className="fa fa-database" />,
      findsbr: <i className="fa fa-search" />,
      'release-planning': <i className="fa fa-calendar" />,
    }

    const tabHeader = userRoutes.map(route => {
      const label = labels[route] !== undefined ? labels[route] : <i className="fa fa-cube" />
      return (
        <a target={route} key={route}>
          <span>
            {label} {route}
          </span>
        </a>
      )
    })

    const tabBody = (
      userRoutes.map(route => {
        return this.createTabContent(route, this.getUserPermissions(route))
      })
    )

    const tabs = (
      <Tabs
        current={userRoutes[0]} //Set the current tab to the first listed
        fill
      >
        <Tabs.Nav>
          {tabHeader}
        </Tabs.Nav>
        <Tabs.Content>
          {tabBody}
        </Tabs.Content>
      </Tabs>
    )

    return tabs
  }

  // returns user's permission data for an route that includes all the
  // route permissions and default permissions initialized
  getUserPermissions(route) {
    // const userPermissions = this.props.permissions[app]
    const userPermissions = this.props.permissions[route]
    const routePermissions = this.props.routePermissions[route] || []
    const defaultPermissions = ['admin', 'moderator']

    const result = {...userPermissions}

    // setting any route/default permissions
    // not already in user's permissions as false
    routePermissions.map(perm => {
      if (result[perm] === undefined) {
        result[perm] = false
      }
    })

    defaultPermissions.map(perm => {
      if (result[perm] === undefined) {
        result[perm] = false
      }
    })

    return result
  }

  createTabContent(route, permissions) {
    const header = (
      <tr>
        <th>Name</th>
        <th>Status</th>
      </tr>
    )

    const createPermissionRow = (route, perm) => {
      return (
        <tr key={`${route}-${perm}`}>
          <td width="50%">
            {perm}
          </td>
          <td width="50%" style={{paddingLeft: '0px'}}>
            <Inputs.Switch
              value={this.getUserPermissions(route)[perm] || false}
              // onChange={() => this.props.togglePermission(route, perm)}
            />
          </td>
        </tr>
      )
    }

    const permissionsList = Object.keys(permissions).sort().map(perm => {
      return createPermissionRow(route, perm)
    })

    return (
      <div id={route} key={route}>
        <div className="row">
          <div className="col-lg-3">
            <table className="table table-hover issue-tracker">
              <thead>
                {header}
              </thead>
              <tbody>
                {permissionsList}
              </tbody>
            </table>
          </div>
          <div className="col-lg-3">
            {this.renderAddPermissionField(route)}
          </div>
        </div>
      </div>
    )
  }

  // only show the field to add new permission if user is a system admin
  renderAddPermissionField(route) {
    const isAdmin = this.utils.checkPermissions('system', 'admin')
    if (!isAdmin) {
      return <div />
    }

    return (
      <div>
        <Inputs.Text
          value={this.props.inputs[route] || ''}
          // value={'attempt'}
          placeholder={'Permission Name'}
          onChange={e => this.props.handleInputChange(e, route)}
        />
        <Button
          btnStyle="primary"
          style={{marginTop: '10px'}}
          onClick={() => this.props.addRoutePermission(route)}
        >
          Add
        </Button>
      </div>
    )
  }

  render() {
    return this.renderPermissionsTable()
  }
}

Permissions.defaultProps = {
  routePermissions: {},
}

export default Permissions
