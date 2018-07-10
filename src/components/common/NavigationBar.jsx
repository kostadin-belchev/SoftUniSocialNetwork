import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import isUserLoggedIn from '../../infrastructure/isUserLoggedIn'
// import logo from '../../logo.png'
import '../../styles/navigation.css'

// eslint-disable-next-line
const ListItemLink = ({ to, exact, ...rest }) => (
  <Route path={to} exact={exact} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest} />
    </li>
  )} />
)

class NavigationBar extends Component {
  render () {
    let loggedInUserContent
    if (isUserLoggedIn) {
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
            {loggedInUserContent
              ? null
              : <a className='navbar-brand' href='#'>S</a>
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
            {loggedInUserContent
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
            }
            {loggedInUserContent
              ? null
              : (<ul className='nav navbar-nav navbar-right'>
                <li><a href='#'><span className='glyphicon glyphicon-user' /> My Account</a></li>
              </ul>)
            }
            {/* if logged in show the above */}
          </div>
        </div>
      </nav>
    )
  }
}

export default NavigationBar
