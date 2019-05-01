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

export {
    signUpNewMember,
}