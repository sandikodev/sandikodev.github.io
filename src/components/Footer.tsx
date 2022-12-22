import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';
type IFooter = {
  className: string;
};

const Footer: FC<IFooter> = ({ className }) => {
  return (
    <Box>
      <footer className={className}>
        ©
        <UnderlineLink
          href='https://theodorusclarence.com?ref=tsnextstarter'
          className='mr-2 uppercase'
        >
          sandikodev
        </UnderlineLink>
        {new Date().getFullYear()}
      </footer>
    </Box>
  );
};
export default Footer;
