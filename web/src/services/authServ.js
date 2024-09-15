import axios from 'axios';

const authSer = {
    login(email,password){
        return axios.post('http://localhost:3000/api/auth/login', {email,password});
    }
};

export default authSer;