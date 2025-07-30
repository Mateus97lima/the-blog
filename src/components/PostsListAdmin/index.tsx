
import { findAllPostAdmin } from '@/LIb/post/queries/admin';
import clsx from 'clsx';


import Link from 'next/link';
import { AdminButtonDelete } from '../Admin/AdminButtonDelete';


export async function PostsListAdmin() {
  const post = await findAllPostAdmin();
  return (
    <div className='mb-16 text-3xl '>
      {post.map(post => {
        return (
          <div
            className={clsx(
              'py-2 px-2 ',
              !post.published && 'bg-slate-300',
              'flex gap-2 items-center justify-between ',
            )}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className='text-2xl text-slate-600 italic'>
                (post não publicado)
              </span>
            )}
    <AdminButtonDelete id={post.id} title={post.title}></AdminButtonDelete>
          </div>
        );
      })}
     
    </div>
  );
}
