import React from 'react'

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  size?: string,
  primary?: boolean,
  white?: boolean,
  outline?: boolean,
  black?: boolean,
  block?: boolean,
  type?: 'button' | 'submit' | 'reset';
}

export const generateButtonClasses = ({ primary, white, outline, size, black, block } : Props) => {
  let buttonClasses = 'py-1 px-4 rounded cursor-pointer inline-flex items-center justify-center';

  if (block) {
    buttonClasses += ' w-full block';
  }

  if (primary && !outline) {
    buttonClasses += ' bg-white border border-white text-black';
  } else if (primary && outline) {
    buttonClasses += ' bg-transparent text-white border-2 border-white';
  } 

  if (black && !outline) {
    buttonClasses += ' bg-black border border-white text-white';
  } else if (black && outline) {
    buttonClasses += ' bg-transparent text-white border-2 border-black';
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


const Button = ({ onClick, children, type, ...rest}: Props) => {
  const buttonClasses = generateButtonClasses(rest); 

  return <button onClick={onClick} className={buttonClasses} type={type} >{children}</button>;
};

export default Button