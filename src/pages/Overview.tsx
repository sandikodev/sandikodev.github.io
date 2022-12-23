import { motion } from 'framer-motion';
import Link from 'next/link';

import { Frame } from '@/components/Frame';

// import SeoTags from "@/components/SeoTags";
// import PageTemplate from "@/templates/page.template";
import { container_frame, text_reveal } from '@/utils/animation';

const Overview = () => {
  const overviews = [
    {
      content: {
        title: 'Codetree',
        link: 'https://codetree.vercel.app/',
        status: '',
        description: 'Lightning fast Web base code editor .',
        stacks: [
          'Redis',
          'Prisma',
          'Typescript',
          'NextJs',
          'React',
          'PostgresQL',
          'Graphql',
        ],
      },
    },
  ];

  const overviewList = overviews.map((project, index) => (
    <div className='mt-10 overflow-hidden' key={index}>
      <Link href={project.content.link}>
        <a target='_blank' rel='noreferrer noopener'>
          <motion.div
            className='hover:text-third flex transform flex-col duration-700 hover:scale-110'
            variants={text_reveal}
          >
            <div className='mr-2 flex'>
              <h1 className='mr-3'>{project.content.title}</h1>
              <div>{project.content.status}</div>
            </div>
            <h3 className='mb-2 text-xl'>{project.content.description}</h3>
            <div className='flex w-80 flex-wrap'>
              {project.content.stacks.map((stack, key) => (
                <div
                  key={key}
                  className='my-1 mr-1 rounded-md bg-transparent px-1 text-gray-400'
                >
                  {stack}
                </div>
              ))}
            </div>
          </motion.div>
        </a>
      </Link>
    </div>
  ));

  return (
    <>
      {/* <SeoTags /> */}
      <motion.div
        initial='initial'
        animate='animate'
        exit='exit'
        className='flex'
      >
        <motion.div
          variants={container_frame}
          className='z-20 md:w-1/2 lg:pl-36'
        >
          {overviewList}
        </motion.div>
        <div className='fixed w-1/2 md:static md:block'>
          <Frame radius='rounded-full ' />
        </div>
      </motion.div>
    </>
  );
};

export default Overview;

// Overview.Template = PageTemplate;
