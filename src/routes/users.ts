import express from "express"
import { user } from "../db/schema/auth.js";
import {and, ilike, or, sql, eq, getTableColumns, desc} from "drizzle-orm"
import { db } from "../db/index.js";
const router = express.Router();

// Get all users with optional search, filtering and pagination
router.get("/", async(req, res) => {
    try{
        const {search, role, page = 1, limit = 10} = req.query;
        const currentPage = Math.max(1, Number(page) || 1);
        const limitPerPage = Math.max(1, Math.min(100, Number(limit) || 10));
        const offset = (currentPage - 1) * limitPerPage;
        const filterConditions = []
        if(search){
            filterConditions.push(
                or(
                    ilike(user.name, `%${search}%`),
                    ilike(user.email, `%${search}%`)
                )
            );
        } 
        if(role){
            const validRoles = ['student', 'teacher', 'admin'] as const;
            if(validRoles.includes(role as typeof validRoles[number])){
                filterConditions.push(eq(user.role, role as typeof validRoles[number]))
            }
        }
        const whereClause = filterConditions.length > 0 ? and(...filterConditions): undefined;
        const countResult = await db.select({count: sql<number>`count(*)`}).from(user).where(whereClause)
        const totalCount = countResult[0]?.count ?? 0;
        const usersList = await db.select({
            ...getTableColumns(user)
        }).from(user)
        .where(whereClause)
        .orderBy(desc(user.createdAt))
        .limit(limitPerPage)
        .offset(offset);

        res.status(200).json({
            data: usersList,
            pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPages: Math.ceil(totalCount/limitPerPage)
            }
        })
    }catch(e){
        console.error(`GET /users error: ${e}`)
        res.status(500).json({error: 'Failed to get users'});
    }
})

export default router
