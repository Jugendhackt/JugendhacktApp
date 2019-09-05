# Installation
In order to set this project up make sure you got
- NodeJS
- npm or yarn (yarn is faster)
- A MariaDB database

1. Run `npm install` or for yarn: `yarn install`
2. Rename the `.envexample` to `.env` and enter:
    * Port
    * Database details (see next section)
    * [Vapid keys](https://github.com/Jugendhackt/JugendhacktApp/blob/f6c09bad83a002eb4eb0034fe1cc5944cba515f1/push.js#L2)
    * Your [badgr](https://badgr.io) email and password (access token gets generated using `badgr.sh`)
3. Rename the `data/.zuliprc` to `data/.zuliprc` and enter your [Zulip](https://community.jugendhackt.org/) email, access token and server
3. Run `npm run dev` or for yarn: `yarn run dev`
5. Profit!

## MariaDB setup
- Create new database `CREATE DATABASE <DBName>;`
- Create new user `CREATE USER '<DBUser>'@'<DBHost>' IDENTIFIED BY '<DBPassword>';`
- Grant privileges of the user to the database `GRANT ALL ON '<DBName>'.* TO '<DBUser>'@'<DBHost>';`
