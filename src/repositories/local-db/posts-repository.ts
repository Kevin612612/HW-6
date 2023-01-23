//Data access Layer


import {blogs} from "./blogs-repository";
import {postViewModel} from "../mongodb";

export let posts: Array<postViewModel> = [
    {
        id: "1",
        title: "one",
        shortDescription: "first",
        content: "hello",
        blogId: "345",
        blogName: "kevin",
        createdAt: new Date(-3)
    },
    {
        id: "2",
        title: "two",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string",
        createdAt: new Date(-2)
    },
    {
        id: "3",
        title: "three",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string",
        createdAt: new Date(-1)
    }
]

let countOfPosts = posts.length


export const postsRepository = {

    //method returns all posts
    async allPosts(): Promise<postViewModel[]> {
        return posts;
    },

    //method posts new post
    async newAddedPost(title: string, shortDescription: string, content: string, blogId: string): Promise<postViewModel> {
        countOfPosts++

        const newPost: postViewModel = {
            id: countOfPosts.toString(),
            title: title.toString(),
            shortDescription: shortDescription.toString(),
            content: content.toString(),
            blogId: blogId.toString(),
            blogName: blogs.find(b => b.id === blogId)?.name.toString()!,
            createdAt: new Date()
        }

        posts.push(newPost)
        return newPost
    },

    //method returns post by ID
    async getPostById(id: string): Promise<postViewModel | number> {
        const post = posts.find(b => b.id === id)
        if (post) {
            return post
        } else {
            return 404
        }
    },

    //method updates post by id
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<postViewModel | number> {

        const post = posts.find(b => b.id === id)

        if (post) {
            post.id = id
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content;
            post.blogId = blogId;
            post.blogName = blogs.find(b => b.id === blogId)?.name.toString()!
            return post
        } else {
            return 404
        }

    },

    //method deletes post by ID
    async deletePost(id: string): Promise<postViewModel[] | number> {
        const newPosts = posts.filter(b => b.id !== id)
        if (newPosts.length < posts.length) {
            posts = newPosts
            return posts
        } else {
            return 404
        }
    },

}