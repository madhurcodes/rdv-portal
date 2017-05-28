/**
 * Created by Nikhil on 28/05/17.
 */
import React, { Component } from 'react';
/*import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import MenuItem from 'material-ui/MenuItem';*/
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Card, CardText, CardTitle} from 'material-ui'
import TextField from 'material-ui/TextField';
/*import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Add from 'material-ui/svg-icons/content/add';
import { checkLogin } from '../utils/sessionAPI'
import { getCategories, addCategory, deleteCategory } from '../utils/categoryAPI'
import Loading from './Loading'
import Error from './Error'
import Alert from './Alert'*/

class BasicInfo extends Component {
  render() {
    return (
      <div style={{display: "flex", flexWrap: "wrap"}}>
        <TextField
          id="email"
          type="text"
          //value={this.state.email}
          floatingLabelText="Name"
          inputStyle={{textAlign: "center"}}
          //onChange={this.handleInputChange}
          style={{width: "40%", margin: "auto"}}
        />
        <TextField
          id="email"
          type="text"
          //value={this.state.email}
          floatingLabelText="Subheading (optional)"
          inputStyle={{textAlign: "center"}}
          //onChange={this.handleInputChange}
          style={{width: "40%", margin: "auto"}}
        />
        <SelectField
          id="role"
          floatingLabelText="Type"
          //value={this.state.role}
          //labelStyle={{textAlign: "center"}}
          //onChange={this.handleSelectChange}
          style={{width: "40%", margin: "auto"}}
        />
        <SelectField
          id="role"
          floatingLabelText="Category"
          //value={this.state.role}
          //labelStyle={{textAlign: "center"}}
          //onChange={this.handleSelectChange}
          style={{width: "40%", margin: "auto"}}
        />
        <Toggle label="Will Registration be required for this event?" style={{width: "40%", margin: "auto", marginTop: "20px", fontSize: "16px"}}/>
      </div>
    )
  }
}

class DetailedInfo extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

class Registration extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

class Requirements extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

class EventCreate extends Component {
  render() {
    return (
      <div style={{alignItems: "centre"}}>
        <Card style={{width:"100%", maxWidth:"1000px", display:"inline-block", height: "500px", marginTop:'20px'}} zDepth={1}>
          <CardTitle title="Create Event"/>
          <CardText>
            <Tabs>
              <Tab label="Basic Info">
                <BasicInfo/>
              </Tab>
              <Tab label="Detailed Info">
                <DetailedInfo/>
              </Tab>
              <Tab label="Registration">
                <Registration/>
              </Tab>
              <Tab label="Requirements">
                <Requirements/>
              </Tab>
            </Tabs>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default EventCreate;