import React from 'react'
import styled, {css} from 'styled-components'

type Props = {
  children: React.ReactNode;
  size: string,
  primary?: boolean,
  white?: boolean,
  outline?: boolean
}

const Button = ({ children, size, primary, white, outline }: Props) => {
  const baseClasses =
    'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

  const sizeClasses = size === 'l' ? 'text-lg px-6 py-3' : '';

  const primaryClasses = primary
    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';

  const whiteClasses = white
    ? outline
      ? 'bg-transparent text-white border border-white hover:bg-white hover:text-black'
      : 'bg-white text-black'
    : '';

  const classes = `${baseClasses} ${sizeClasses} ${primaryClasses} ${whiteClasses}`;

  return <button className={classes}>{children}</button>;
};

export default Button