import { FC } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';
type IFooter = {
  className: string;
};

const Footer: FC<IFooter> = ({ className }) => {
  return (
    <footer className={className}>
      © {new Date().getFullYear()} By{' '}
      <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
        Theodorus Clarence
      </UnderlineLink>
    </footer>
  );
};
export default Footer;
