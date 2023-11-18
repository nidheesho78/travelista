export const BASE_URL='http://localhost:5000/api/users'
export const BASE_URLB = 'http://localhost:5000/api/admin'
export const userInLocal=JSON.parse(localStorage.getItem('user'))
export const adminInLocal=JSON.parse(localStorage.getItem('admin'))

export const token= userInLocal?  userInLocal.token:null;
export const adminToken= adminInLocal? adminInLocal.token:null;


console.log("tokeninconfig",token);
console.log("tokeninconfig",adminToken);
