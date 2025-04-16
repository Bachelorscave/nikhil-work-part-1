import ApiManager from "./ApiService";

export default user_login = async data =>{

    try{

        const result = await ApiManager("/api/users/login",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            data:data
        })
        console.log(JSON.stringify(result));
        return result
    }catch(error){
        return error.response.data
    }
}