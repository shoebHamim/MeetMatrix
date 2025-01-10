import React, { ReactNode } from 'react'

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      navbar
      {children}
      Footer
      </main>
  )
}

export default RootLayout