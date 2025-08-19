import { ManagePostForm } from "@/components/Admin/ManagePostForm";
import { Metadata } from "next";


export const dynamic = 'force-dynamic';

export const metadata : Metadata ={
    title:'criar post',
}

export default async function AdminNewPage() {
  return (
    <div className="flex flex-col  gap-6">
    <h1 className="text-xl/relaxed font-extrabold">Criar post</h1>
  <ManagePostForm/>
  </div>
  );
}
