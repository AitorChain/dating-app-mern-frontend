import './Header.scss'
import { Forum, Person } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <div className="header">
      <IconButton>
        <Person fontSize='large' className="header__icon" />
      </IconButton>
      <img className='header__logo' src="logo192.png" alt="header" />
      <IconButton>
        <Forum fontSize='large' className="header__icon" />
      </IconButton>
    </div>
  )
}

export default Header