import React from 'react'

type Props = {
  children: React.ReactNode;
  size: string,
  primary?: boolean,
  white?: boolean,
  outline?: boolean
}

export const generateButtonClasses = ({ primary, white, outline, size } : Props) => {
  let buttonClasses = 'bg-blue-500 border-0 text-white py-1 px-4 rounded cursor-pointer inline-flex items-center';

  if (white && !outline) {
    buttonClasses += ' bg-white text-black';
  } else if (white && outline) {
    buttonClasses += ' bg-transparent text-white border border-white';
  }

  if (primary) {
    buttonClasses += ' bg-red-500 border border-red-500';
  }

  if (size === 'l') {
    buttonClasses += ' text-xl py-2 px-5';
  }

  return buttonClasses;
};


const Button = ({ children, ...rest}: Props) => {
  const buttonClasses = generateButtonClasses(rest); 

  return <button className={buttonClasses}>{children}</button>;
};

export default Button