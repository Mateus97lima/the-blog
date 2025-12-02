import { MenuAdmin } from "@/components/Admin/MenuAdmin";
import { requireLoginSessionOrRedirectFormApiOrRedirect } from "@/lib/login/manage_login";



export default async function AdminPostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

await requireLoginSessionOrRedirectFormApiOrRedirect()

  return (
 <>
 <MenuAdmin/>
 {children}
 </>
  );
}
