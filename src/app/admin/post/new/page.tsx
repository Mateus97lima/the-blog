import { ManagePostForm } from "@/components/Admin/ManagePostForm";


export const dynamic = 'force-dynamic';

export default async function AdminNewPage() {
  return (
    <>
    <h1>Criar post</h1>
  <ManagePostForm/>
  </>
  );
}
