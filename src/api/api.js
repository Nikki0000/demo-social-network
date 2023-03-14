import axios from "axios"



const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "594301d4-5e10-4b5a-b5ad-6549ff84c6b9"
    }
});


export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
        });
    },
    follow(userid) {
        return instance.post(`follow/${userid}`)
    },
    unfollow(userid) {
        return instance.delete(`follow/${userid}`)
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId);
    }
        
}


export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status){
        return instance.put(`profile/status`, {
            status: status
        });
    }
}



export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {
            email, password, rememberMe
        });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

