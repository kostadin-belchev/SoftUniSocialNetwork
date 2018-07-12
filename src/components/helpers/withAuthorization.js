import React, {Component} from 'react'

function withAuthorization (WrappedComponent, roles) {
  return class WithAuthorization extends Component {
    constructor (props) {
      super(props)
      this.state = {
        roles: []
      }
    }
    componentDidMount () {
      // eslint-disable-next-line
      let roles = sessionStorage.getItem('userRoles')
      if (roles) {
        this.setState({ roles: roles.split(',') })
      }
    }

    render () {
      let userHasAccess = false
      for (let role of roles) {
        userHasAccess = userHasAccess || this.state.roles.indexOf(role) !== -1
      }

      if (userHasAccess) {
        return <WrappedComponent {...this.props} />
      } else {
        return <h1>Unauthorized</h1>
      }
    }
  }
}

export function withAdminAuthorization (Component) {
  return withAuthorization(Component, ['Admin'])
}

export function withModeratorAuthorization (Component) {
  return withAuthorization(Component, ['Moderator', 'Admin'])
}
