import { ManagePostForm } from '@/components/Admin/ManagePostForm';
import {  findPostByIdFromApiAdmin } from '@/lib/post/queries/admin';
import { PublicPostForApiSchema } from '@/lib/post/schemas';
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
  const postRes = await findPostByIdFromApiAdmin(id);

if (!postRes.success) {
 console.log(postRes.errors)
 notFound();
  }

  const post = postRes.data;
  const publicPost = PublicPostForApiSchema.parse(post);
  return (
    <div className='flex flex-col  gap-6'>
      <h1 className='text-xl/relaxed font-extrabold'>Editar post</h1>
      <ManagePostForm mode='update' publicPost={publicPost} />
    </div>
  );
}
