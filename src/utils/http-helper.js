const axios = require('axios')

class HttpHelper {

    async get(address, body, timeout = 20000){
        const out = await axios.get(address, {params: body})
        return out.data
    }

    async post(address, body, json = true, timeout = 20000){
        const out = await axios.post(address, body, {
            headers: {
                'content-type': 'text/json'
            }
        } )
        return out.data
    }

}

export default new HttpHelper();
