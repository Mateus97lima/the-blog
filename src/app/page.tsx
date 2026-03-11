
import { LoginInic } from '@/components/LoginInic';
import { PostFeatured } from '@/components/PostFeatured';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

 export const dynamic = 'force-static'

export default async function HomePage() {

  return (

    <main className=" max-w-6xl mx-auto px-6">
    <LoginInic/>
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16'/>}>
        <PostFeatured/>
        <PostsList />
    </Suspense>
</main>

  );
}
