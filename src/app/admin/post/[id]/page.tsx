 export const dynamic = 'force-dynamic';

type AdminIdnPageProps = {
    params:Promise<{
        id: string
    }>
}


export default async function AdminIdnPage({params}: AdminIdnPageProps) {
    const { id } = await params;
return(
    <div className="py-16 text-6xl">
   AdminIdPage{id}
    </div>
)
}
