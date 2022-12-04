const query = `
CREATE TABLE IF NOT EXISTS Users (
    name VARCHAR(50) ,
    email VARCHAR(50) PRIMARY KEY,
    password VARCHAR(150) ,
    token VARCHAR(100) 
)`;

module.exports = query;
