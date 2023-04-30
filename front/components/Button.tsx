import React from 'react'
import styled, {css} from 'styled-components'

const StyledButton = styled.button`
  background-color: #5542F6;
  border:0;
  color:#fff;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  svg{
    height: 16px;
    margin-right: 5px;
  }
  ${props => props?.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props?.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}
  ${props => props?.primary && css`
    background-color: #F65442; 
    border: 1px solid #F65442;
  `}
  ${props => props?.size=== 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px; 
    svg{
      height: 20px;
    }
  `}
`

type Props = {
  children: React.ReactNode;
  size: string,
  primary?: boolean,
  white?: boolean,
  outline?: boolean
}

const Button = ( {children, ...rest} : Props) => {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}

export default Button