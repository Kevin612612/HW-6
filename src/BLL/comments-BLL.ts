//Business Layer



//(1) updateCommentById
//(2) deleteComment
//(3) findCommentById

import {commentsRepository} from "../repositories/comments-repository-db";
import {commentViewModel} from "../types";

export const commentsBusinessLayer = {

    //(1) method updates comment by ID
    async updateCommentById(id: string, content: string): Promise<boolean | number> {
        const result = await commentsRepository.updateCommentById(id, content)
        return result ? result : 404
    },



    //(2) method deletes comment by ID
    async deleteComment(id: string): Promise<boolean | number> {
        const result = await commentsRepository.deleteComment(id)
        return result ? result : 404
    },



    //(3) method find comment by Id
    async findCommentById(id: string): Promise<commentViewModel | null | number> {
        const result = await commentsRepository.findCommentById(id)
        return result ? result : 404
    },
}