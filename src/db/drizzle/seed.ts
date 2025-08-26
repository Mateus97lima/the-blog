import { JsonPostRepository } from "@/repositories/Post/json-post-repository";
import { drizzleDb } from ".";
import { postsTable } from "./schemas";

(async () => {
    try {


        const jsonPostRepository = new JsonPostRepository();
        const posts = await jsonPostRepository.findAll();

        if (!posts || posts.length === 0) {
            console.log("ℹ️ Nenhum post encontrado para migrar.");
            return;
        }



        await drizzleDb.transaction(async (tx) => {
            await tx.delete(postsTable);
            

            await tx.insert(postsTable).values(posts);

        });

    } catch (error) {
        console.error("❌ Erro durante a migração:", error);
    }
})();
