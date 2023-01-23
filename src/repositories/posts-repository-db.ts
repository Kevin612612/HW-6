//Data access Layer



//(1) allPosts
//(2) allPostByBlogId
//(3) newPostedPost
//(4) findPostById
//(5) updatePostById
//(6) deletePost

import {blogsCollection, postsCollection, postViewModel} from "./mongodb";


export const postsRepository = {

    //(1) method returns posts by blogID
    async allPosts(blogId: string, sortBy: any, sortDirection: any): Promise<postViewModel[]> {
        const order = sortDirection === 'asc' ? 1 : -1; // порядок сортировки
        return await postsCollection
            .find({blogId : blogId}, {projection: {_id: 0}})
            .sort( sortBy, order)
            .toArray();
    },


    //(2) method returns all posts
    async allPostByBlogId(sortBy: any, sortDirection: any): Promise<postViewModel[]> {
        const order = sortDirection === 'asc' ? 1 : -1; // порядок сортировки
        return await postsCollection
            .find({}, {projection: {_id: 0}})
            .sort( sortBy, order)
            .toArray();
    },



    //(3) method posts new post
    async newPostedPost(newPost: postViewModel): Promise<boolean> {
        const result = await postsCollection.insertOne(newPost)
        return result.acknowledged;
    },



    //(4) method returns post by ID
    async findPostById(id: string): Promise<postViewModel | number> {
        const post = await postsCollection.findOne({id: id}, {projection: {_id: 0}})
        return post ? post : 404
    },



    //(5) method updates post by ID
    async updatePostById(postId: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | number> {

        const blogFoundName = await blogsCollection.findOne({id: blogId})
        let postFound
        if (blogFoundName) {
            postFound = await postsCollection.find({id: postId})
            if (postFound) {
                const result = await postsCollection.updateOne({id: postId}, {
                    $set: {
                        blogId: blogId,
                        blogName: blogFoundName.name,
                        content: content,
                        id: postId,
                        shortDescription: shortDescription,
                        title: title,
                    }
                })
                return result.matchedCount === 1
            } else {
                return 404
            }
        } else {
            return 404
        }
    },

    //(6) method deletes by ID
    async deletePost(postId: string): Promise<boolean | number> {
        const result = await postsCollection.deleteOne({id: postId})
        return result.deletedCount ? result.deletedCount === 1 : 404
    }
}
