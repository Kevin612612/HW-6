//Data access Layer


import {blogViewModel} from "./mongodb";

export let blogs: Array<blogViewModel> = [
    {
    id: '1',
    name: "blog1",
    description: "blog1 about nothing",
    websiteUrl: "/url/uri",
    createdAt: new Date(-3)
},
    {
        id: '2',
        name: "blog2",
        description: "blog2 about nothing",
        websiteUrl: "/url/uri",
        createdAt: new Date(-2)
    },
    {
        id: '3',
        name: "blog3",
        description: "blog3 about nothing",
        websiteUrl: "/url/uri",
        createdAt: new Date(-1)
    }
    ]

let countOfBlogs = blogs.length


export const blogsRepository = {

    //method returns all blogs
    async allBlogs(): Promise<blogViewModel []> {
        return blogs
    },

    //method posts new blog
    async newPostedBlog(name: string, description: string, websiteUrl: string): Promise<blogViewModel> {
        countOfBlogs++

        const newBlog: blogViewModel = {
            id: countOfBlogs.toString(),
            name: name.toString(),
            description: description.toString(),
            websiteUrl: websiteUrl.toString(),
            createdAt: new Date()
        }

        blogs.push(newBlog)
        return newBlog
    },

    //method returns blog by ID
    async getBlogById(id: string): Promise <blogViewModel | number> {
        const blog = blogs.find(b => b.id === id)
        if (blog) {
            return blog
        } else {
            return 404
        }
    },

    //method updates blog by ID
    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<blogViewModel | number> {

        const blog = blogs.find(b => b.id === id)

        if (blog) {
            blog.name = name;
            blog.description = description;
            blog.websiteUrl = websiteUrl;
            return blog
        } else {
            return 404
        }

    },

    //method deletes by ID
    async deleteBlog(id: string): Promise<blogViewModel[] | number> {
        const newBlog = blogs.filter(b => b.id !== id)
        if (newBlog.length < blogs.length) {
            blogs = newBlog
            return blogs
        } else {
            return 404
        }
    }
}