import { findAllPostAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';

import Link from 'next/link';
import { AdminButtonDelete } from '../AdminButtonDelete';
import ErrorMessage from '../../ErrorMessage';

export async function PostsListAdmin() {
  const posts = await findAllPostAdmin();

  console.log('POSTS', posts);

  if (posts.length <= 0)
    return <ErrorMessage contentTitle='ei' content='Bora criar algum post' />;

  return (
    <div className='mb-16 text-3xl '>
      {posts.map(post => {
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
            <AdminButtonDelete
              id={post.id}
              title={post.title}
            ></AdminButtonDelete>
          </div>
        );
      })}
    </div>
  );
}
