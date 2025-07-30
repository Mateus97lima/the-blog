import { PostsListAdmin } from "@/components/PostsListAdmin";
import { SpinLoader } from "@/components/SpinLoader";

import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
title: 'post Admin',
}

export default async function AdminPostPage() {

return(
  <Suspense fallback={<SpinLoader className="mb-26"/> }  >
    <PostsListAdmin/>
  </Suspense>
)
}
