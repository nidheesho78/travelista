import  { useState } from "react";
import { BASE_URLB } from "../../config"; // Make sure to import your BASE_URL

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  console.log(categoryName);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URLB}/add-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
        setCategoryName(""); // Clear the input after successful submission
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setError("An error occurred while creating the category.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Create Category</h2>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleCategorySubmit}>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
