import axios from 'axios';
const baseURL = 'http://localhost:5000/';

const signUpNewMember = (username, email, password, uid) => {
    return axios({
        url:  baseURL + 'members/create',
        method: 'POST',
        data: {
            username: username,
            email: email,
            password: password,
            uid: uid
        },
    });
}

const loginToBackEnd = (uid, email, lastSignInTime) => {
    return axios({
        url: baseURL + 'members/login',
        method: 'PUT',
        params: {
            uid: uid,
            email: email,
            lastSignInTime: lastSignInTime,
        },
    });
};

const createPost = (member_id, caption) => {
    return axios({
        url: baseURL + 'posts/create',
        method: 'POST',
        data: {
            member_id: member_id,
            caption: caption,
        }
    });
};

export {
    signUpNewMember,
    loginToBackEnd,
    createPost,
}
