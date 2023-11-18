import { useEffect, useState } from "react";
import { BASE_URLB } from "../../config.js";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URLB}/get-users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Adjust the URL accordingly
        const data = await response.json();

        if (response.ok) {
          setUserData(data.userData);
        } else {
          setError("Error Fetching Data");
        }
      } catch (error) {
        setError("Error Fetching Data");
      }
    };

    fetchData();
  }, []);

 const handleBlock = async (userId) => {
   try {
     const res = await fetch(`${BASE_URLB}/block-user/${userId}`, {
       method: "put",
     });

     const result = await res.json();
     console.log("Result:", result);

     if (!res.ok) {
       throw new Error(result.message);
     }

     console.log("User blocked successfully");
     toast.success(result.message);
   } catch (error) {
     console.error("Error blocking user:", error);
     toast.error(error.message);
   }
 };

 const handleUnblock = async (userId) => {
   try {
     const res = await fetch(`${BASE_URLB}/unblock-user/${userId}`, {
       method: "put",
     });

     const result = await res.json();
     console.log("Result:", result);

     if (!res.ok) {
       throw new Error(result.message);
     }

     console.log("User unblocked successfully");
     toast.success(result.message);
   } catch (error) {
     console.error("Error unblocking user:", error);
     toast.error(error.message);
   }
 };


  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      {userData && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Name</th>
              <th className="py-2 px-4 border-b text-center">Email</th>
              <th className="py-2 px-4 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 transition duration-300"
              >
                <td className="py-2 px-4 border-b text-center">{user.name}</td>
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  {user.is_blocked ? (
                    <button
                      onClick={() => handleUnblock(user._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded
      hover:bg-green-600 transition duration-300"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
};

export default AdminUsers;
