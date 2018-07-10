import React, { Component } from 'react'

class BoundForm extends Component {
  constructor (props) {
    super(props)

    this.state = stateFromChildren(this.props.children)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
    // do stuff
    this.props.onSubmit(Object.assign({}, this.state))
  }

  render () {
    return (
      <form onSubmit={this.onSubmit} {...this.props}>
        {React.Children.map(this.props.children, (child) => {
          if (child.type === 'input' && child.props.name) {
            return React.cloneElement(child, {onChange: this.onChange, value: this.state[child.props.name]})
          }
          if (child.type === 'textarea' && child.props.name) {
            return React.cloneElement(child, {onChange: this.onChange, value: this.state[child.props.name]})
          }
          if (child.type === 'button' && child.props.name) {
            return React.cloneElement(child, {onChange: this.onChange, value: this.state[child.props.name]})
          }
          // we can continue the extension here as much as we like, checkbox, radiobutton, etc.
          return child
        })}
      </form>
    )
  }
}

function stateFromChildren (children) {
  const inputs = {}

  React.Children.forEach(children, (child) => {
    if (child.type === 'input' && child.props.name) {
      inputs[child.props.name] = ''
    }
    if (child.type === 'textarea' && child.props.name) {
      inputs[child.props.name] = ''
    }
  })

  return inputs
}

export default BoundForm
