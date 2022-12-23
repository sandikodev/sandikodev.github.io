import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { Frame } from '@/components/Frame';
import Layout from '@/components/layout/Layout';

import {
  container_frame,
  text_reveal,
  text_reveal_fade,
} from '@/utils/animation';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const Page = () => {
  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Box className='layout flex min-h-screen flex-col items-center justify-center text-center'>
        <Featuring />
      </Box>
    </>
  );
};

Page.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Page;

const Featuring = () => {
  const texts = [{ content: 'SANDIKO.DEV' }];

  const textList = texts.map((text, index) => (
    <div className='overflow-hidden' key={index}>
      <motion.div
        style={{ fontSize: '5rem' }}
        className='gradient-text mb-8'
        variants={text_reveal}
      >
        {text.content}
      </motion.div>
    </div>
  ));

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial='initial'
        animate='animate'
        exit='exit'
        className='flex'
      >
        <motion.div variants={container_frame} className='md:w-2/3 lg:pl-36'>
          {textList}
          <motion.p
            variants={text_reveal_fade}
            style={{
              lineHeight: '2.1rem',
              fontSize: '17px',
              textAlign: 'justify',
            }}
          >
            I'm a Full Stack developer ,<br />
            my background is Network Engineer. I'm actually an IoT Entusiast.
            <br />
            Loved build thing's, Application that aim human life. <br />
            Currently working with{' '}
            <span className='gradient-text'>
              SmartCity, Beloved React Technology, staticaly Typescript and Rust
            </span>
            .<br />
            My main character was shaped from beyond the edge of{' '}
            <span className='underline-span'>Technology</span> .
          </motion.p>
        </motion.div>
        <div className='fixed w-1/3 md:static md:block'>
          <Frame radius='rounded-md' />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
