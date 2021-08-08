import axios from "axios";

class AuthenticationManager {
    isLoggedIn() {
        return !!localStorage.getItem("token");
    }
    login(data, callback, errorCallback){
        
        axios.post('login', data)
        .then((response)=>{
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            callback && callback();
        })
        .catch((error)=>{
            console.error(error);
            errorCallback && errorCallback();
        });
    }
}

export default new AuthenticationManager();