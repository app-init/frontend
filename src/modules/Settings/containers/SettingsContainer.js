import React, { Component } from 'react'
// import { connect } from 'react-redux'

import { Utils } from '@app-init/ui'

import Settings from '../components/Views/SettingsComponent'

class SettingsContainer extends Component {
  constructor(props) {
    super(props)
    this.utils = new Utils('dashboard')
    this.user = this.utils.getUser()
    // this.state = {
    //   loading: true,
    // }
  }

  // componentWillMount() {
  //   this.user = this.utils.getUser()
  //   let api = {
  //     path: 'settings.build',
  //   }

  //   this.utils.request(api).then(data => {
  //     const get = {
  //       path: 'settings.get',
  //       data: {
  //         output: 'uid',
  //       },
  //     }
  //     this.utils.request(get).then(settings => {
  //       this.utils.dispatch('SETTINGS', { data: { templates: data, settings } })
  //       this.setState({ loading: false })
  //     })
  //   })
  // }

  render() {
    return (
      <Settings
        user={this.user}
        // settings={this.props.data.settings}
        // templates={this.props.data.templates}
        settings={this.props.settings}
        templates={this.props.templates}
        tab={this.props.match.params.tab}
      />
    )
  }
}

// const mapStateToProps = state => ({ data: state.dashboard.settings })
// export default connect(mapStateToProps)(SettingsContainer)
export default SettingsContainer
