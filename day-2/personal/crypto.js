const crypto = require('crypto');

const randomInt = crypto.randomInt(100000000);
const randomString = crypto.randomBytes(10);
const uuid = crypto.randomUUID()
const user="aiman";

const nameWithId = user + "-" + uuid;
console.log(nameWithId)






