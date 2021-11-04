const fs = require("fs");
const path = require('path');

const users_db = path.resolve(__dirname, './users.json');

module.exports = {
    getUsers: () => {
        let usersJson = fs.readFileSync(users_db, { encoding: 'utf-8' });
        let users;
        if (usersJson == "") {
            users = [];
        } else {
            users = JSON.parse(usersJson);
        }
        return users
    },
    setUsers: (data) => {
        fs.writeFileSync(
            users_db,
            JSON.stringify(data, null, 2),
        );
    },
};