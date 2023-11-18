import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";



//create a category 
const createCategory = asyncHandler(async (req, res) => {
  const { name} = req.body;


  // Check if the category name is already taken
  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    return res.status(400).json({
      message: 'Category name is already taken. Choose a different name.',
    });
  }

  // Check if the description length exceeds the limit
  

  const category = new Category({
    name,
   
  });

  console.log('category',category);

  try {
    await category.save();
    res.status(201).json({
      message: 'Category created successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create the category',
      error: error.message,
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {

  const categoryId = req.params.categoryId
  const category = await Category.findByIdAndUpdate(categoryId,{$set:req.body});
console.log('category',category);
  if (!category) {
    res.status(404).json({
      message: 'Category not found',
    });
    return;
  }

  // Check if the updated category name is already taken
  // const newName = req.body.name;
  // if (newName && newName !== category.name) {
  //   const existingCategory = await Category.findOne({ name: newName });

  //   if (existingCategory) {
  //     return res.status(400).json({
  //       message: 'Category name is already taken. Choose a different name.',
  //     });
  //   }
  // }

  // Check if the updated description length exceeds the limit
  
  // Update the category properties
  category.name = newName || category.name;

  // Save the updated category
  const updatedCategory = await category.save();

  res.status(200).json({
    _id: updatedCategory._id,
    name: updatedCategory.name,
   
  });
});



//List all Category 
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error('Error in listing categories:', error);
    res.status(500).json({
      message: 'Error in listing categories',
      error: error.message,
    });
  }
};


//Unlist a category

const unlistCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    // Update the category to be unlisted
    await Category.findByIdAndUpdate(categoryId, { isListed:false  });

    res.status(200).json({
      message: 'Category unlisted successfully',
    });
  } catch (error) {
    console.error('Error unlisting category:', error);
    res.status(500).json({
      message: 'Could not unlist the category',
      error: error.message,
    });
  }
};


//Get all categories
const listCategory = async (req,res) => {
  console.log('hiiiiiiiiiiiiiiiiii')
   const categoryId  = req.params.categoryId;
   console.log(categoryId,'/////');
    try{
        const categories = await Category.findByIdAndUpdate(categoryId,{$set:{isListed:true}});
        res.status(200).json({ 
            categories,
            message:'Catgegory listed Successfully'
            
        });
    }catch(error) {
        res.status(500)
        throw new Error('Failed to list category')
    }
}

//Delete a category

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);


    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Failed to delete category:', error);
    res.status(500).json({
      message: 'Failed to delete the Category',
      error: error.message,
    });
  }
};

export {
    createCategory,
    getCategories,
    unlistCategory,
    listCategory,
    updateCategory,
    deleteCategory

};