//Business Layer

import {postViewModel, PostsTypeSchema, postsCollection} from "../repositories/mongodb";
import {blogsRepository} from "../repositories/blogs-repository-db";
import {postsRepository} from "../repositories/posts-repository-db";



let countOfPosts = 0

export const postBusinessLayer = {
    //this method return all posts
    async getAllPosts(pageNumber: any,
                      pageSize: any,
                      sortBy: any,
                      sortDirection: any): Promise<PostsTypeSchema | number> {


        const sortedItems = await postsRepository.everyPosts( sortBy, sortDirection);
        const quantityOfDocs = await postsCollection.countDocuments({})

        return {
            pagesCount: Math.ceil(quantityOfDocs / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: quantityOfDocs,
            items: sortedItems.slice((+pageNumber - 1) * (+pageSize), (+pageNumber) * (+pageSize))
        }
    },


    //this method return all posts by blogId
    async getAllPostByBlogId(blogId: any,
                             pageNumber: any,
                             pageSize: any,
                             sortBy: any,
                             sortDirection: any): Promise<PostsTypeSchema | number> {
        const blog = await blogsRepository.getBlogById(blogId)
        if (blog != undefined) {
            const sortedItems = await postsRepository.allPosts(blogId, sortBy, sortDirection);
            const quantityOfDocs = await postsCollection.countDocuments({blogId : blogId})

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


    //method creates post with specific blogId
    async newPostedPost(blogId: string,
                        title: any,
                        shortDescription: any,
                        content: any): Promise<postViewModel | number> {
        countOfPosts++

        const foundBlog = await blogsRepository.getBlogById(blogId)

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
            const inserted = await postsRepository.newAddedPost(newPost)

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



    //method take post by postId
    async findPostById(postId: string): Promise<postViewModel | number> {
        return await postsRepository.getPostById(postId)
    },



    //method updates post by ID
    async updatePostById(postId: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean | number> {
        const result = await postsRepository.updatePost(postId, title, shortDescription, content, blogId)
        return result ? result : 404
    },



    //method deletes by ID
    async delPost(id: string): Promise<boolean | number> {
        return await postsRepository.deletePost(id)

    },
}
