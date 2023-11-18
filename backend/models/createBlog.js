import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema(
   { 
    title:{
        type:String,
        required:true
    },
     category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },

    images:[String],
   
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    keywords:[String],
    

},
{
    timestamps:true
}
);

const Blog = mongoose.model('Blog',blogSchema);
export default Blog;