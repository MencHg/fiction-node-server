const crypto = require('crypto');
function cryptoKit(opts) {
    let newVal = crypto.createHash('sha256').update(opts).digest('hex');
    return newVal
}
module.exports  = cryptoKit;