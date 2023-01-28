import React from 'react'

function Footer() {
  return (
    <p className='text-center w-full text-gray-500 text-sm p-4'>
        &copy; Team Debugger | {new Date().getFullYear()} | All Rights Reserved
    </p>
  )
}


export default Footer
