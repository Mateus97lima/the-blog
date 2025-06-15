import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostCoverImagem } from '@/components/PostCoverImage';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <Header />
      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImagem imageProps={{
        width:1200,
        height:720,
        src:'/images/bryen_6.png',
        alt:'alt imagem',
        priority:true
      }}
      linkProps={{
        href:'/post/ishgidg'
      }}
      />

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
