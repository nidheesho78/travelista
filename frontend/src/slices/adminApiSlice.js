import { apiSlice } from "./apiSlice";

const ADMIN_URL = '/api/admin'


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        adminLogin:builder.mutation({
            query:(data)=>({
               url:`${ADMIN_URL}/login` ,
               method:'POST',
               body:data
            })
        }),
        adminRegister:builder.mutation({
            query:(data) => ({
                url:`${ADMIN_URL}/register`,
                method:'POST',
                body:data
            })
        }),
        adminLogout:builder.mutation({
            query:()=>({
               url:`${ADMIN_URL}/logout` ,
               method:'POST',
            })
        }),
        adminUpdateUser:builder.mutation({
            query:(data)=>({
               url:`${ADMIN_URL}/update-user` ,
               method:'PUT',
               body:data
            })
        }),
        getUser:builder.query({
            query:()=>({
               url:`${ADMIN_URL}/get-user` ,
               method:'GET',
            })
        }),
        deleteUserData:builder.mutation({
            query:(data)=>({
               url:`${ADMIN_URL}/delete-user` ,
               method:'DELETE',
               body:data
            })
        }),
        blockUser:builder.mutation({
            query:(data)=>({
               url:`${ADMIN_URL}/block-user/:userId` ,
               method:'PUT',
               body:data
            })
        }),
        unBlockUser:builder.mutation({
            query:(data)=>({
               url:`${ADMIN_URL}/unblock-user/:userId` ,
               method:'PUT',
               body:data
            })
        }),

        addNewUser:builder.mutation({
            query:(data)=>({
               url:`${ADMIN_URL}/add-user` ,
               method:'POST',
               body:data
            })
        })
    })
})


export const {useAdminLoginMutation,useAdminRegisterMutation,useAdminLogoutMutation,useAddCategoryMutation,useAdminUpdateUserMutation
    ,useGetUserQuery,useBlockUserMutation,useUnBlockUserMutation,useDeleteUserDataMutation,useAddNewUserMutation} = adminApiSlice