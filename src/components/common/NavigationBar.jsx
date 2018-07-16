import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import isUserLoggedIn from '../../infrastructure/isUserLoggedIn'
// import logo from '../../logo.png'
import '../../styles/navigation.css'
import isUserAdminLoggedIn from '../../infrastructure/isUserAdminLoggedIn'
import observer from '../../infrastructure/observer'

// eslint-disable-next-line
const ListItemLink = ({ to, exact, ...rest }) => (
  <Route path={to} exact={exact} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest} />
    </li>
  )} />
)

class NavigationBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedOut: false
    }

    this.updateState = this.updateState.bind(this)
    observer.subscribe(observer.events.loggedOut, this.updateState)
  }

  updateState () {
    this.setState({ loggedOut: true })
  }

  render () {
    // eslint-disable-next-line
    let username = sessionStorage.getItem('username')
    let loggedInUserContent
    if (isUserLoggedIn()) {
      loggedInUserContent = true
    }
    return (
      <nav className='navbar navbar-inverse'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            {!loggedInUserContent
              ? null
              : <a className='navbar-brand' href='/wall'>S</a>
            }
            {/* <a className='navbar-brand' href='#'><img src={logo} alt='logo' /></a> */}
          </div>
          <div className='collapse navbar-collapse' id='myNavbar'>
            <ul className='nav navbar-nav'>
              <ListItemLink to='/' exact>Welcome</ListItemLink>
              <ListItemLink to='/about'>About</ListItemLink>
              <ListItemLink to='/contacts'>Contacts</ListItemLink>
            </ul>
            {/* if logged in show the below */}
            {/* {!loggedInUserContent
              ? null
              : (<form className='navbar-form navbar-right' role='search'>
                <div className='form-group input-group'>
                  <input type='text' className='form-control' placeholder='Search..' />
                  <span className='input-group-btn'>
                    <button className='btn btn-default' type='button'>
                      <span className='glyphicon glyphicon-search' />
                    </button>
                  </span>
                </div>
              </form>
              )
            } */}
            {!loggedInUserContent
              ? null
              : (<ul className='nav navbar-nav navbar-right'>
                <ListItemLink to='/myProfile'><span className='glyphicon glyphicon-user' /> {username}</ListItemLink>
                <ListItemLink to='/wall'>Home</ListItemLink>
                <ListItemLink to='/logout'>Logout</ListItemLink>
                {isUserAdminLoggedIn() ? <ListItemLink to='/adminPanel'>Admin Panel</ListItemLink> : null}
              </ul>)
            }
            {this.state.loggedOut ? null : null}
            {/* if logged in show the above */}
          </div>
        </div>
      </nav>
    )
  }
}

export default NavigationBar
