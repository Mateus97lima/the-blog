import { ManagePostForm } from '@/components/Admin/ManagePostForm';
import { makePublicPostFromDb } from '@/dto/post/dto';
import { findPostByIdAdmin } from '@/lib/post/queries/admin';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar um post',
};

type AdminIdnPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminIdnPage({ params }: AdminIdnPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id).catch(()=> undefined);

  if (!post) notFound();

  const publicPost = makePublicPostFromDb(post);
  return (
    <div className='flex flex-col  gap-6'>
      <h1 className='text-xl/relaxed font-extrabold'>Editar post</h1>
      <ManagePostForm mode='update' publicPost={publicPost} />
    </div>
  );
}
