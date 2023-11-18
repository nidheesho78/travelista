import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:{type:String,
        required:true

    },
    isListed:{
        type:Boolean,
        default:true
    }
})
const Category = mongoose.model('Category',categorySchema)

export default Category