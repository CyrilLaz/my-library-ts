module.exports.PORT = process.env.PORT || 3000;
module.exports.NODE_ENV = process.env.NODE_ENV;
module.exports.COUNTER_URL = process.env.COUNTER_URL||'http://localhost:3001/';
module.exports.MONGO_URL = process.env.MONGO_URL;
module.exports.SESSION_SECRET = process.env.SESSION_SECRET||'SECRET';
