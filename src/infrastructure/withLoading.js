import React from 'react'
import '../styles/notifications.css'

export default function withLoading (WrappedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.state = { ready: false, data: [] }
    }
    componentDidMount () {
      if (this.props.reqArguments) {
        console.log(this.props.reqArguments)
        let arg1Value = this.props.reqArguments.arg1
        let arg2Value = this.props.reqArguments.arg2
        this.props.request(arg1Value, arg2Value).then(data => this.receivedData(data))
      } else {
        this.props.request().then(data => this.receivedData(data))
      }
    }
    receivedData (data) { this.setState({ ready: true, data }) }
    render () {
      if (this.state.ready) {
        return <WrappedComponent data={this.state.data} {...this.props} />
      }
      return (<div id='loadingBox'><span>Loading &hellip;</span></div>)
    }
  }
}
