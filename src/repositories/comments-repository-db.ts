//Data access Layer


//(1) allComments
//(2) newPostedComment
//(3) updateCommentById
//(4) deleteComment
//(5) findCommentById

import {blogsCollection, blogViewModel, commentsCollection, commentViewModel, postsCollection} from "./mongodb";

export const commentsRepository = {

    //(1) method returns comments by postId
    async allComments(postId: string, sortBy: any, sortDirection: any): Promise<commentViewModel[]> {
        const order = sortDirection === 'asc' ? 1 : -1; // порядок сортировки
        return await commentsCollection
            .find({})
            .sort(sortBy, order)
            .toArray();
    },


    //(2) method create new comment
    async newPostedComment(newComment: commentViewModel): Promise<boolean> {
        const result = await commentsCollection.insertOne(newComment)
        return result.acknowledged;
    },


    //(3) method update comment by Id
    async updateCommentById(id: string, content: string): Promise<boolean | number> {
        const result = await commentsCollection.updateOne({id: id}, {
            $set: {
                content: content
            }
        })
        return result.matchedCount === 1
    },



    //(4) method delete comment by Id
    async deleteComment(id: string): Promise<boolean | number> {
        const result = await commentsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },



    //(5) method returns comment by Id
    async findCommentById(id: string): Promise<commentViewModel | undefined> {
        const result = await commentsCollection.findOne({id: id}, {projection: {_id: 0}})
        return result ? result : undefined
    },
}