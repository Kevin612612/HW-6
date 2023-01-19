//Business Layer

import {blogViewModel, blogsTypeSchema, blogsCollection} from "../repositories/mongodb";
import {blogsRepository} from "../repositories/blogs-repository-db";

let countOfBlogs = 0


export const blogBusinessLayer = {
    //this method transform all found data and returns them to router
    async createAllRequiredBlogs(searchNameTerm: any, sortBy: any, sortDirection: any, pageNumber: any, pageSize: any): Promise<blogsTypeSchema> {


        const sortedItems = await blogsRepository.allBlogs(searchNameTerm, sortBy, sortDirection);
        const quantityOfDocs = await blogsCollection.countDocuments({name : {$regex : searchNameTerm, $options:'i'}})

        return {
            pagesCount:	Math.ceil(quantityOfDocs/+pageSize),
            page:  +pageNumber,
            pageSize: +pageSize,
            totalCount: quantityOfDocs,
            items: sortedItems.slice((+pageNumber-1)*(+pageSize), (+pageNumber)*(+pageSize))
        }
    },



    //method creates blog
    async newPostedBlog(name: string,
                        description: string,
                        websiteUrl: string,
                        id: string): Promise<blogViewModel | number | null> {
        countOfBlogs++

        const idName: string = id ? id : countOfBlogs.toString()

        const newBlog = {
            createdAt: new Date(),
            description: description.toString(),
            id: idName,
            name: name.toString(),
            websiteUrl: websiteUrl.toString(),
        }

        const inserted = await blogsRepository.newPostedBlog(newBlog)

        if (inserted) {
            return {
                createdAt: newBlog.createdAt,
                description: newBlog.description.toString(),
                id: newBlog.id.toString(),
                name: newBlog.name.toString(),
                websiteUrl: newBlog.websiteUrl.toString(),
            };
        } else {
            return 404
        }
    },



    //method take blog by blogId
    async findBlogById(id: string): Promise<blogViewModel | null | number> {
        const result = await blogsRepository.getBlogById(id)
        return result ? result : 404
    },



    //method updates blog by ID
    async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean | number> {
        const result = await blogsRepository.updateBlog(id, name, description, websiteUrl)
        return result ? result : 404
    },



    //method deletes by ID
    async deleteBlog(id: string): Promise<boolean | number> {
        const result = await blogsRepository.deleteBlog(id)
        return result ? result : 404
    },
}
