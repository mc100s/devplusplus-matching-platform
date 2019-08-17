import React from 'react'
import api from '../api'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

function MainNavbar(props) {
  function handleLogoutClick(e) {
    api.logout()
  }
  return (
    <nav className="MainNavbar">
      <NavLink className="MainNavbar__link MainNavbar__link--main" to="/" exact>
        <img src="/logo-white.png" className="MainNavbar__logo" alt="logo" />
      </NavLink>
      {!api.isLoggedIn() && (
        <NavLink className="MainNavbar__link" to="/signup">
          Signup
        </NavLink>
      )}
      {!api.isLoggedIn() && (
        <NavLink className="MainNavbar__link" to="/login">
          Login
        </NavLink>
      )}
      {api.isLoggedIn() && (
        <Link className="MainNavbar__link" to="/" onClick={handleLogoutClick}>
          Logout
        </Link>
      )}
    </nav>
  )
}

export default withRouter(MainNavbar)
