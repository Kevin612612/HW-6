//Business Layer


//(1) allCommentsByPostId
//(2) newPostedCommentByPostId
//(3) allPosts
//(4) newPostedPost
//(5) findPostById
//(6) updatePostById
//(7) deletePost

import {
    postViewModel,
    PostsTypeSchema,
    postsCollection,
    CommentsTypeSchema,
    commentsCollection, blogViewModel, commentViewModel
} from "../repositories/mongodb";
import {blogsRepository} from "../repositories/blogs-repository-db";
import {postsRepository} from "../repositories/posts-repository-db";
import {commentsRepository} from "../repositories/comments-repository-db";

let countOfPosts = 0
let countOfComments = 0

export const postBusinessLayer = {

    //(1) this method return all comments by postId
    async allCommentsByPostId(postId: string,
                              pageNumber: number,
                              pageSize: number,
                              sortBy: any,
                              sortDirection: any): Promise<CommentsTypeSchema | number> {
        const sortedItems = await commentsRepository.allComments(postId, sortBy, sortDirection);
        const quantityOfDocs = await commentsCollection.countDocuments({postId: postId})

        return {
            pagesCount: Math.ceil(quantityOfDocs / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: quantityOfDocs,
            items: sortedItems.slice((pageNumber - 1) * (pageSize), (pageNumber) * (pageSize))
        }
    },


    //(2) creates new comment by postId
    async newPostedCommentByPostId(postId: string, content: string, userId: string, userLogin: string): Promise<commentViewModel | number> {
        countOfComments++
        // const idName: string = id ? id : countOfComments.toString()

        const newComment = {
            id: countOfComments.toString(),
            content: content,
            userId: userId,
            userLogin: userLogin,
            createdAt: new Date(),
            postId: postId,
        }

        const result = await commentsRepository.newPostedComment(newComment)

        return {
            id: newComment.id,
            content: newComment.content,
            userId: newComment.userId,
            userLogin: newComment.userLogin,
            createdAt: newComment.createdAt
        };
    },


    //(3) this method return all posts
    async allPosts(pageNumber: number,
                   pageSize: number,
                   sortBy: any,
                   sortDirection: any): Promise<PostsTypeSchema | number> {

        const sortedItems = await postsRepository.allPostByBlogId(sortBy, sortDirection);
        const quantityOfDocs = await postsCollection.countDocuments({})

        return {
            pagesCount: Math.ceil(quantityOfDocs / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: quantityOfDocs,
            items: sortedItems.slice((pageNumber - 1) * (pageSize), (pageNumber) * pageSize)
        }
    },


    //(4) method creates post with specific blogId
    async newPostedPost(blogId: string,
                        blogName: string,
                        title: string,
                        shortDescription: string,
                        content: any): Promise<postViewModel | number> {
        countOfPosts++

        const newPost: postViewModel = {
            id: countOfPosts.toString(),
            title: title,
            shortDescription: shortDescription,
            blogId: blogId,
            blogName: blogName,
            content: content,
            createdAt: new Date(),
        }
        const result = await postsRepository.newPostedPost(newPost)

        return {
            id: newPost.id,
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            content: newPost.content,
            createdAt: newPost.createdAt,
        };
    },


    //(5) method take post by postId
    async findPostById(postId: string): Promise<postViewModel | undefined> {
        const result = await postsRepository.findPostById(postId)
        return result
    },


    //(6) method updates post by postId
    async updatePostById(postId: string, blogId: string, blogName: string, title: string, shortDescription: string, content: string): Promise<boolean | number> {
        const result = await postsRepository.updatePostById(postId, blogId, blogName, title, shortDescription, content)
        return result ? result : 404
    },


    //(7) method deletes by postId
    async deletePost(postId: string): Promise<boolean | undefined> {
        const result = await postsRepository.deletePost(postId)
        return result
    },
}
