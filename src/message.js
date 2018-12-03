import React, {Component} from 'react';

export class Message extends Component {

	getClassName() {
		if (this.props.result.code === 0) {
			return 'alert alert-success';
		} else {
			return 'alert alert-danger';
		}
	}
	
	render () {
		if (this.props.result) {
			return <div className={this.getClassName()} role="alert">{this.props.result.msg}</div>	
		} else {
			return null;
		}
	}
}