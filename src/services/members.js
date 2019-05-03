import axios from 'axios';

const signUpNewMember = (username, email, password, uid) => {
    return axios({
        url: 'http://localhost:5000/members/create',
        method: 'post',
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
        url: 'http://localhost:5000/members/login',
        method: 'put',
        params: {
            uid: uid,
            email: email,
            lastSignInTime: lastSignInTime,
        },
    });
};

export {
    signUpNewMember,
    loginToBackEnd
}
