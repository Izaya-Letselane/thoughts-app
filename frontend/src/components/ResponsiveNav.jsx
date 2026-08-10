import { useState } from "react"
import Navbar from "./Navbar"
import MobileNav from './MobileNav'


const ResponsiveNav = () => {
   const [showNav, setShowNav] = useState(false)
  const openNavHandler = ()=>setShowNav(true)
  const closeNavHandler = ()=>setShowNav(false)
  return (
    <div className="relative" >
        <Navbar openNav={openNavHandler}/>
        <MobileNav showNav={showNav} closeNav={closeNavHandler}/>
      
    </div>
  
  )
}

export default ResponsiveNav