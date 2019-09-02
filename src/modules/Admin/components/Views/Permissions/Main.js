import React, { Component } from 'react'
import { Tabs } from '@app-init/ui'

class Main extends Component {
  constructor(props) {
    super(props)
  }

  renderUserView() {
    return (
      <div id="users" key="users">
        <table className="table table-hover">
          <thead>
            <tr>
              <td>
                {this.props.usersAutoComp}
              </td>
            </tr>
          </thead>
        </table>
        {this.props.usersList}
      </div>
    )
  }

  renderModulesView() {
    return (
      <div id="modules" key="modules">
        <table className="table table-hover">
          <thead>
            <tr>
              <td>
                {this.props.apisAutoComp}
              </td>
            </tr>
          </thead>
        </table>
        {this.props.apisList}
      </div>
    )
  }

  renderRoutesView() {
    return (
      <div id="routes" key="routes">
        {this.props.routesList}
      </div>
    )
  }

  renderContent() {
    return (
      <div>
        <div className="card">
          <div className="card-body card-padding">
            <Tabs
              fill
              current={this.props.currentTab}
            >
              <Tabs.Nav>
                <a target="users">
                  <span>
                    <i className="fa fa-users" /> Users
                  </span>
                </a>
                <a target="modules">
                  <span>
                    <i className="fa fa-cubes" /> Modules
                  </span>
                </a>
                <a target="routes">
                  <span>
                    <i className="fa fa-th-large" /> Routes
                  </span>
                </a>
              </Tabs.Nav>
              <Tabs.Content>
                <div key="users">{this.renderUserView()}</div>
                <div key="modules">{this.renderModulesView()}</div>
                <div key="routes">{this.renderRoutesView()}</div>
              </Tabs.Content>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.renderContent()
  }
}

export default Main
