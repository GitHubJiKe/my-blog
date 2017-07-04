import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<div>
            <AutoComplete
                hintText="Type anything"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
            />
            <AutoComplete
                hintText="Type anything"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                floatingLabelText="Full width"
                fullWidth={true}
            />
        </div>);
    }
}