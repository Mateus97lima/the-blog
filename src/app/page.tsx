import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <Header />
      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <Link className='w-full h-full overflow-hidden rounded-xl' href='#'>
          <Image
          className='group-hover:scale-105 transition'
            src='/images/bryen_0.png'
            width={1200}
            height={720}
            alt='titulo do post'
          />
        </Link>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id tenetur,
          doloremque fugiat iste, dolor sequi quibusdam illo voluptatem nesciunt
          nobis rerum omnis, pariatur doloribus corrupti consequuntur deleniti
          ut? Earum, expedita.
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <p className='text-6xl font-bold text-center py-8'> footer</p>
      </footer>
    </Container>
  );
}
