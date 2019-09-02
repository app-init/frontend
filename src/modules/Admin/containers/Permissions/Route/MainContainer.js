import React, { Component } from 'react'
import { Utils } from '@app-init/ui'
import Main from '../../../components/Views/Permissions/Route/Route'

export default class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.utils = new Utils('permissions.routes')
  }

  handleUserAdd(uid, permission) {
    const api = {
      path: 'permissions.routes.add',
      data: {
        uid: uid,
        route: this.props.match.params.name,
        permission,
      },
    }

    this.utils.request(api).then(data => {
      this.utils.dispatch('INIT', { permissions: data })
    })
  }

  handleDescriptionEdit(route, permission, description) {
    const api = {
      path: 'permissions.descriptions.edit',
      data: {
        route,
        permission,
        description,
      }
    }

    this.utils.request(api).then(data => {
      this.utils.dispatch('INIT', {permissions: data})
    })
  }

  render() {
    let route= this.props.match.params.name
    return (
      <Main
        route={route}
        permissions={this.props.permissions}
        handleUserAdd={(uid, perm) => this.handleUserAdd(uid, perm)}
        handleDescriptionEdit={(route, perm, description) =>
          this.handleDescriptionEdit(route, perm, description)}
        users={this.props.users}
      />
    )
  }
}
