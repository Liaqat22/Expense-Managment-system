import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div className='layout'>
      
      <Header/>
<div style={{minHeight : '100vh'}}>
<main>
    {children}
</main>
</div>
      <Footer/>

    </div>
  )
}

export default Layout
