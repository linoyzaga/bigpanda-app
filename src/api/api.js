const axios = require('axios');
const headers = {
    'content-type': 'application/json',
};

function handleSessions(promise) {
    return promise.catch((error) => {
        if (error.response.status === 401) document.location.href = '/comments';
        else {
            console.log('API Error: ', error);
            throw error;
        }
    });
}

class API {
    static getComments(page, filter) {
        const opts = {
            method: 'get',
            headers,
            url: '/comments',
            params: {
                page
            }
        };

        if (filter) {
            opts.params.filter = filter;
        }

        return handleSessions(axios(opts));
    }

    static postComment(email, message) {
        const opts = {
            method: 'post',
            headers,
            url: '/comments',
            data: {
                email,
                message
            }
        };

        return handleSessions(axios(opts));
    }
}

module.exports = API;
