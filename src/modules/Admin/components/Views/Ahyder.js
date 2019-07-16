import React from 'react'

import { Inputs, Form, Button, Label } from '~/components'
import CheckOld from '~/components/UI/Inputs/CheckOld'
import Utils from '~/utils'

export default class AhyderContainer extends React.Component {
  constructor(props) {
    super(props)

    this.utils = new Utils('permissions.application')

    this.state = {
      userValue: '',
      apiValue: '',
      text: '',
      data: [
        {'city': 'Abbeville', 'state': 'Louisiana'},
        {'city': 'Aberdeen', 'state': 'Maryland'},
        {'city': 'Aberdeen', 'state': 'Mississippi'},
        {'city': 'Aberdeen', 'state': 'South Dakota'},
        {'city': 'Aberdeen', 'state': 'Washington'},
        {'city': 'Abilene', 'state': 'Texas'},
        {'city': 'Abilene', 'state': 'Kansas'},
        {'city': 'Abingdon', 'state': 'Virginia'},
        {'city': 'Abington', 'state': 'Massachusetts'},
        {'city': 'Absecon', 'state': 'New Jersey'},
        {'city': 'Accokeek', 'state': 'Maryland'},
        {'city': 'Acton', 'state': 'Massachusetts'},
        {'city': 'Acushnet', 'state': 'Massachusetts'},
        {'city': 'Acworth', 'state': 'Georgia'},
        {'city': 'Ada', 'state': 'Oklahoma'},
        {'city': 'Adams', 'state': 'Massachusetts'},
        {'city': 'Addison', 'state': 'Illinois'},
        {'city': 'Addison', 'state': 'Texas'},
        {'city': 'Adelanto', 'state': 'California'},
        {'city': 'Adelphi', 'state': 'Maryland'},
        {'city': 'Adrian', 'state': 'Michigan'},
        {'city': 'Affton', 'state': 'Missouri'}, 
      ]
    }

    this.searchText = ''
  }

  getUsersResults(results) {
    if (this.state.userValue != results.searchText) {
      this.setState({userValue: results.searchText})
    }
  }

  getApiResults(results) {
    if (this.state.apiValue != results.searchText) {
      this.setState({apiValue: results.searchText})
    }
  }

  toggleChecked(e) {
    this.setState({checked: e})
  }

  handleSubmit(form) {
    console.log(form)
    return {input: true}
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h2>Autocomplete</h2>
        <Form name="testing" form={{input: ''}} onSubmit={(form) => this.handleSubmit(form)}>
          <Label form="testing" id="input">Enter a User</Label>
          <Inputs.Autocomplete 
            placeholder="Enter a user..."
            minSearch={3}
            data={this.state.data}
            searchKey="city"
            // onChange={(results) => console.log(results)}
            form="testing"
            id="input"
          />
          <Button type="submit">Submit</Button>
        </Form>
        <h2>Checkbox</h2>
        {/* <CheckOld
          label="Self Managed" 
          checked={true}
        />         */}
        <Inputs.Check
          label="Self Managed" 
        />        
      </div>
    )
  }
}
