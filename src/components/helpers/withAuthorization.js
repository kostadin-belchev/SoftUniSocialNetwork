import React, {Component} from 'react'
import auth from '../../infrastructure/auth'
import requester from '../../infrastructure/requester'
import Unauthorized from '../common/Unauthorized'

function withAuthorization (WrappedComponent, roles) {
  return class WithAuthorization extends Component {
    constructor (props) {
      super(props)
      this.state = {
        roles: [],
        requestHasFinished: false
      }
    }
    componentDidMount () {
      // eslint-disable-next-line
      auth.getUser(sessionStorage.getItem('userId')).then((userInfo) => {
        if (userInfo._kmd.roles && userInfo._kmd.roles.length > 0) {
          let userRoleId = userInfo._kmd.roles[0].roleId
          requester.get('roles', userRoleId, 'master').then((roleObj) => {
            // console.log(roleObj)
            // console.log('roleObj.name: ')
            // console.log(roleObj.name)
            this.setState((prevState) => {
              return prevState.roles.push(roleObj.name)
            }, () => this.setState({ requestHasFinished: true }))
          })
        } else {
          this.setState({ requestHasFinished: true })
        }
      }).catch(err => console.log(err))
    }

    render () {
      let userHasAccess = false
      for (let role of roles) {
        userHasAccess = userHasAccess || this.state.roles.indexOf(role) !== -1
      }

      if (userHasAccess) {
        return <WrappedComponent {...this.props} />
      } else {
        return (
          <div>
            {!this.state.requestHasFinished ? null : <Unauthorized {...this.props} />}
          </div>
        )
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
