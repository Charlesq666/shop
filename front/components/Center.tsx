import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`

export default function Center ({children} : Props) {
  return (
    <StyledDiv>
      {children}
    </StyledDiv>
  )
}