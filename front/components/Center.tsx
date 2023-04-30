import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function Center ({children} : Props) {
  return (
    <div className="flex items-center justify-center px-5">
      {children}
    </div>
  )
}