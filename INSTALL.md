# Installation

In order to set this project up make sure you got
- NodeJS
- npm or yarn (yarn is faster)
- A MariaDB database

1. Run `npm install` or for yarn: `yarn install`
2. Rename the `.envexample` to `.env` and enter your database login details and the port you want to use.
3. Run `npm run dev` or for yarn: `yarn run dev`
4. ???
5. Profit!

## MariaDB basic setup
- Create new database `CREATE DATABASE <DBName>;`
- Create new user `CREATE USER '<DBUser>'@'<DBHost>' IDENTIFIED BY '<DBPassword>';`
- Grant privileges of the user to the database `GRANT ALL ON '<DBName>'.* TO '<DBUser>'@'<DBHost>';`
