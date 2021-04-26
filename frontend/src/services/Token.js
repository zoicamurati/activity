const Token = {

    async getToken() {
        const token =  localStorage.getItem('user-token');

        if (!token) {
            return null
        }
        const item = JSON.parse(token)

        const now = new Date()

        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {

            // If the item is expired, delete the item from storage
            localStorage.removeItem('user-token')
            return null
        }
        return item.value

    },

    setToken(token,ttl) {

        const now = new Date()

        const item = {
            value: token,
            expiry: now.getTime() + ttl,
        }

        return localStorage.setItem('user-token',JSON.stringify(item));
    },


    removeToken() {
        return localStorage.removeItem('user-token');
    }


}

export default Token;