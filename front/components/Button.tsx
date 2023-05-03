import React from 'react'

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  size?: string,
  primary?: boolean,
  white?: boolean,
  outline?: boolean
}

export const generateButtonClasses = ({ primary, white, outline, size } : Props) => {
  let buttonClasses = 'bg-blue-500 py-1 px-4 rounded cursor-pointer inline-flex items-center';

  if (primary && !outline) {
    buttonClasses += ' bg-white border border-white text-black';
  } else if (primary && outline) {
    buttonClasses += ' bg-transparent text-white border-2 border-white';
  } 

  if (white && !outline) {
    buttonClasses += ' bg-white text-black';
  } else if (white && outline) {
    buttonClasses += ' bg-transparent text-green-900 border border-green-900';
  }

  if (size === 'l') {
    buttonClasses += ' text-xl py-2 px-5';
  }

  return buttonClasses;
};


const Button = ({ onClick, children, ...rest}: Props) => {
  const buttonClasses = generateButtonClasses(rest); 

  return <button onClick={onClick} className={buttonClasses} >{children}</button>;
};

export default Button