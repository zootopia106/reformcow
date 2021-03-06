import React, { Component } from 'react'

// Import Styles
import "./styles/styles.css"

class DemoLink extends Component {

  constructor(props) {
    super(props)

    this.state = {
      show: true
    }

    this.onClose = this.onClose.bind(this)
  }

  onClose() {
    this.setState({ show: false })
  }

  render() {
    if (!this.state.show) return null
    return (

      <div className="demo-link">
        <i className="fa fa-times close-button" aria-hidden="true" onClick={ this.onClose }></i>&nbsp;&nbsp;
        <span className="link" onClick={ this.props.onClick }>ReformCOW Intro & Demo</span>&nbsp;&nbsp;
      </div>

    )
  }
}

export default DemoLink
