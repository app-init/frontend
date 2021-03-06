import React, { Component } from 'react'
import TemplateInfo from '../../components/Views/SettingsTemplates/Info'
import { Utils } from '@app-init/ui'

class InfoContainer extends Component {
  constructor(props) {
    super(props)
    this.utils = new Utils()
  }

  render() {
    console.log('INFO CONTAINER', this.props)
    return (
      <TemplateInfo
        template={this.props.template}
        routes={this.props.routes}
      />
    )
  }
}

export default InfoContainer
