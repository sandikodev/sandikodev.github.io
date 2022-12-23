import * as React from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      {/* <Head>
      <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      <meta name="description" content={process.env.NEXT_PUBLIC_APP_DESC} />
      <link rel="icon" href={process.env.NEXT_PUBLIC_APP_ICON} />
    </Head> */}
      <header className='fixed inset-x-0 z-40 items-center justify-center'>
        <Navbar />
      </header>
      <main className='flex flex-grow flex-col overflow-x-hidden'>
        {children}
      </main>
      <Footer className='fixed bottom-0 flex h-16 w-full items-center justify-center border-solid' />
    </>
  );
}
