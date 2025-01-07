import React, { ReactNode } from 'react'

const MainLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      navbar
      {children}
      Footer
      </main>
  )
}

export default MainLayout