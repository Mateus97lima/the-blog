

import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const postsTable = sqliteTable('posts',{
id:text('id').primaryKey(),
slug:text('slug').notNull().unique(),
title:text('title').notNull(),
author:text('author').notNull(),
excerpt:text('excerpt').notNull(),
coverImageUrl:text('coverImageUrl').notNull(),
published:text('published').notNull(),
createdAt:integer('createdAt',{mode:'boolean'}).notNull(),
updatedAt:text('updatedAt').notNull(),

});


export type PostsTableSelectMode = InferSelectModel<typeof postsTable>;
export type PostsTableInsertMode = InferInsertModel<typeof postsTable>;
