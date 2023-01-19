//Data access Layer



import {blogsCollection, blogViewModel} from "./mongodb";




export const blogsRepository = {

    //method returns structured Array
    async allBlogs(searchNameTerm: string, sortBy: string, sortDirection: string): Promise<blogViewModel[]> {
        const order = sortDirection == 'asc' ? 1 : -1; // порядок сортировки
        return await blogsCollection
            .find({name : {$regex : searchNameTerm, $options:'i'}}, {projection: {_id: 0}})
            .sort(sortBy, order)
            .toArray();
    },



    //method posts new blog in Db
    async newPostedBlog(newBlog: blogViewModel): Promise<boolean> {
        const result = await blogsCollection.insertOne(newBlog)
        return result.acknowledged;
    },



    //method returns blog by ID
    async getBlogById(id: string): Promise<blogViewModel | undefined> {
        const result = await blogsCollection.findOne({id: id}, {projection: {_id: 0}})
        return result ? result : undefined
    },



    //method updates blog by ID
    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean | number> {
        const result = await blogsCollection.updateOne({id: id}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }
        })
        return result.matchedCount === 1
    },

    //method deletes by ID
    async deleteBlog(id: string): Promise<boolean | number> {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
}
