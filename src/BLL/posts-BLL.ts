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
    async allCommentsByPostId(postId: any,
                              pageNumber: any,
                              pageSize: any,
                              sortBy: any,
                              sortDirection: any): Promise<CommentsTypeSchema | number> {
        const post = await postsRepository.findPostById(postId)
        if (post != 404) {
            const sortedItems = await commentsRepository.allComments(postId, sortBy, sortDirection);
            const quantityOfDocs = await commentsCollection.countDocuments({postId: postId})

            return {
                pagesCount: Math.ceil(quantityOfDocs / +pageSize),
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: quantityOfDocs,
                items: sortedItems.slice((+pageNumber - 1) * (+pageSize), (+pageNumber) * (+pageSize))
            }
        } else {
            return 404
        }
    },


    //(2) creates new comment by postId
    async newPostedCommentByPostId(postId: any, content: any): Promise<commentViewModel | number> {
        const foundPost = await postsRepository.findPostById(postId)

        const userId = ''
        const userLogin = ''


        countOfComments++
        // const idName: string = id ? id : countOfComments.toString()

        const newComment = {
            id: countOfComments.toString(),
            content: content,
            userId: userId,
            userLogin: userLogin,
            createdAt: new Date()
        }


        const inserted = await commentsRepository.newPostedComment(newComment)

        if (inserted) {
            return {
                id: newComment.id,
                content: newComment.content,
                userId: newComment.userId,
                userLogin: newComment.userLogin,
                createdAt: newComment.createdAt
            };
        } else {
            return 404
        }
    },


    //(3) this method return all posts
    async allPosts(pageNumber: any,
                   pageSize: any,
                   sortBy: any,
                   sortDirection: any): Promise<PostsTypeSchema | number> {


        const sortedItems = await postsRepository.allPostByBlogId(sortBy, sortDirection);
        const quantityOfDocs = await postsCollection.countDocuments({})

        return {
            pagesCount: Math.ceil(quantityOfDocs / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: quantityOfDocs,
            items: sortedItems.slice((+pageNumber - 1) * (+pageSize), (+pageNumber) * (+pageSize))
        }
    },


    //(4) method creates post with specific blogId
    async newPostedPost(blogId: string,
                        title: any,
                        shortDescription: any,
                        content: any): Promise<postViewModel | number> {
        countOfPosts++

        const foundBlog = await blogsRepository.findBlogById(blogId)

        let newPost: postViewModel

        if (foundBlog) {
            newPost = {
                blogId: blogId,
                blogName: foundBlog.name,
                content: content,
                createdAt: new Date(),
                id: countOfPosts.toString(),
                shortDescription: shortDescription,
                title: title,
            }
            const inserted = await postsRepository.newPostedPost(newPost)

            return {
                blogId: newPost.blogId,
                blogName: newPost.blogName,
                content: newPost.content,
                createdAt: newPost.createdAt,
                id: newPost.id,
                shortDescription: newPost.shortDescription,
                title: newPost.title,
            };
        } else {
            return 404
        }
    },


    //(5) method take post by postId
    async findPostById(postId: string): Promise<postViewModel | number> {
        return await postsRepository.findPostById(postId)
    },


    //(6) method updates post by ID
    async updatePostById(postId: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | number> {
        const result = await postsRepository.updatePostById(postId, title, shortDescription, content, blogId)
        return result ? result : 404
    },


    //(7) method deletes by ID
    async deletePost(id: string): Promise<boolean | number> {
        return await postsRepository.deletePost(id)
    },
}
