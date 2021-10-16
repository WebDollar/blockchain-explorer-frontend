const crypto = require('crypto-browserify')

export default {

    SHA256(bytes){

        let sha256 = crypto.createHash('sha256'); //sha256
        sha256.update(bytes);

        return sha256.digest();
    }

}