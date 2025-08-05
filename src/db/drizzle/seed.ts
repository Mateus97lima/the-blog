import { JsonPostRepository } from "@/repositories/Post/json-post-repository";
import { drizzleDb } from ".";
import { postsTable } from "./schemas";

(async () => {
    try {
        console.log("🔄 Iniciando migração de posts...");

        const jsonPostRepository = new JsonPostRepository();
        const posts = await jsonPostRepository.findAll();

        if (!posts || posts.length === 0) {
            console.log("ℹ️ Nenhum post encontrado para migrar.");
            return;
        }

        console.log(`📚 ${posts.length} posts encontrados no JSON.`);

        await drizzleDb.transaction(async (tx) => {
            await tx.delete(postsTable);
            console.log("🧹 Posts antigos removidos.");

            await tx.insert(postsTable).values(posts);
            console.log("✅ Posts migrados com sucesso!");
        });

    } catch (error) {
        console.error("❌ Erro durante a migração:", error);
    }
})();
