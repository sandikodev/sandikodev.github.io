import Layout from '@/components/layout/Layout';

const Page = () => {
  return <div className='h-80'></div>;
};

export default Page;
Page.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
