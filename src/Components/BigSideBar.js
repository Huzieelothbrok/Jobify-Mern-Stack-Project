import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import NavLinks from './NavLinks'
const BigSideBar = () => {
  const {showSidebar,toggleSidebar} = useAppContext()
  return (
    <Wrapper>
    <div className={showSidebar?'sidebar-container show-sidebar':'sidebar-container'}>
      <div className="content">
        <header>
          <Logo/>
        </header>
        <NavLinks toggleSidebar={toggleSidebar}/> 
      </div>
    </div>
    </Wrapper>
  )
}

export default BigSideBar