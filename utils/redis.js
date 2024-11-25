const { Redis } = require("ioredis");


const client = new Redis({
    port: 12691, // Redis port
    host: "redis-12691.c264.ap-south-1-1.ec2.cloud.redislabs.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "k7PFFSxo3wtMksiR7vcDzJqr4EJYPN5q",
    db: 0, // Defaults to 0
    maxConnections: 100 // adjust this value based on your needs

});

module.exports = client;