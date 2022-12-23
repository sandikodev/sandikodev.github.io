/* eslint-disable @next/next/no-css-tags */

import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';

import Layout from '@/components/layout/Layout';

const Page = () => {
  return (
    <Flex mt={100} alignItems='center' justifyContent='center'>
      <link rel='stylesheet' href='/css/projects.css' />
      <div className='flex flex-col'>
        <Skills />
        <Works />
      </div>
    </Flex>
  );
};

export default Page;

Page.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

type ISkill = {
  title: string;
  value: string;
};
const Skills = () => {
  const data: ISkill[] = [
    {
      title: 'Networking',
      value: '95%',
    },
    {
      title: 'DevOps',
      value: '80%',
    },
    {
      title: 'Mobile Apps',
      value: '90%',
    },
    {
      title: 'Electronics and Robotics',
      value: '70%',
    },
  ];
  return (
    <Box
      id='skills'
      aria-label='skills'
      className='section skills has-before'
      style={{ backgroundImage: "url('./images/skills-bg.png')" }}
    >
      <div className='container-project'>
        <div className='skills-content'>
          <p className='section-subtitle'>Skills</p>
          <h2 className='h2 section-title'>My Skills</h2>
          <p className='section-text'>
            here some of my Experiences in Network and App Development.
          </p>
          <ul className='skills-list'>
            {data.map((skill: ISkill, key: number) => (
              <li className='skills-item' key={key}>
                <div className='wrapper'>
                  <h3 className='skill-title'>{skill.title}</h3>

                  <data className='skill-value' value={skill.value}>
                    {skill.value}
                  </data>
                </div>

                <div className='progress-box'>
                  <div
                    className='progress'
                    style={{ width: `${skill.value}` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='skills-banner has-before'></div>
      </div>
    </Box>
  );
};

type ICard = {
  title: string;
  text: string;
  img: string;
};
const Works = () => {
  const data: ICard[] = [
    {
      title: 'Smart City',
      text: 'IoT',
      img: '/images/portfolio-1.jpg',
    },
    {
      title: 'Networking',
      text: 'Internet',
      img: '/images/portfolio-2.jpg',
    },
    {
      title: 'Mobile Apps',
      text: 'Mobile',
      img: '/images/portfolio-3.jpg',
    },
    {
      title: 'Web Apps',
      text: 'Web',
      img: '/images/portfolio-4.jpg',
    },
    {
      title: 'Desktop Apps',
      text: 'Desktop',
      img: '/images/portfolio-5.jpg',
    },
    {
      title: 'Robotics',
      text: 'Electronics',
      img: '/images/portfolio-6.jpg',
    },
  ];
  return (
    <Box className='section portfolio' id='portfolio' aria-label='portfolio'>
      <div className='portfolio container-project'>
        <p className='section-subtitle'>Portfolio</p>
        <h2 className='h2 section-title'>Selected Works</h2>
        <ul className='has-scrollbar'>
          {data.map((card: ICard, key: number) => (
            <li className='scrollbar-item' key={key}>
              <div className='card'>
                <figure
                  className='card-banner img-holder'
                  style={{ width: 600, height: 675 }}
                >
                  <Image
                    src={card.img}
                    width='600'
                    height='675'
                    loading='lazy'
                    alt={card.title}
                    className=''
                  />
                </figure>
                <a href='#' className='card-content'>
                  {/* <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon> */}
                  <h3 className='h3 card-title'>{card.title}</h3>
                  <p className='card-text'>{card.text}</p>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};
