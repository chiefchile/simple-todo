import React, { Component } from 'react';

export class Message extends Component {
	state = {
		style: null
	}

	componentDidMount() {
		this.setStyle();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.result !== prevProps.result) {
			this.setStyle();
		}
	}

	setStyle() {
		if (this.props.result) {
			let style = null;
			if (this.props.result.code === 0) {
				style = 'alert alert-success';
			} else {
				style = 'alert alert-danger';
			}
			this.setState({ style: style });
			this.addFadeOutStyle();
		}
	}

	addFadeOutStyle() {
		setTimeout(() => {
			let style = this.state.style;
			this.setState({ style: style + ' fade-out' });
		}, 3000)
	}

	render() {
		if (this.props.result) {
			return <div className={this.state.style} role="alert">{this.props.result.msg}</div>
		} else {
			return <div className="empty-msg"></div>
		}
	}
}