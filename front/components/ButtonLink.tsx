import React from 'react'
import { generateButtonClasses } from './Button';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  size: string,
  href: string,
  as?: string,
  primary?: boolean,
  white?: boolean,
  outline?: boolean
}

const ButtonLink = ({ children, href, as, ...rest}: Props) => {
  const buttonClasses = generateButtonClasses(rest); 

  return <Link href={href} as={as} className={buttonClasses}>{children}</Link>;
};

export default ButtonLink 