const userTable = `
    CREATE TABLE IF NOT EXISTS users
    (
        id          INT                 NOT NULL AUTO_INCREMENT,
        full_name   VARCHAR(100)        NOT NULL,
        password    VARCHAR(64)         NOT NULL,
        email       VARCHAR(150) UNIQUE NOT NULL,
        birthday    DATETIME            NOT NULL,
        is_admin    BOOLEAN             NOT NULL,
        is_verified BOOLEAN             NOT NULL,
        PRIMARY KEY (id)
    )
`;

const lostItemsTable = `
    CREATE TABLE IF NOT EXISTS lost_items
    (
        id       INT          NOT NULL AUTO_INCREMENT,
        location VARCHAR(150) NOT NULL,
        what     VARCHAR(150) NOT NULL,
        img_name VARCHAR(20)  NOT NULL,
        PRIMARY KEY (id)
    )
`;

const packingListTable = `
    CREATE TABLE IF NOT EXISTS packing_list
    (
        id   INT          NOT NULL AUTO_INCREMENT,
        item VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    )
`;

const alpacrashEvent = `
    CREATE TABLE IF NOT EXISTS alpacrash_event
    (
        id   INT         NOT NULL AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL,
        year INT         NOT NULL,
        PRIMARY KEY (id)
    )
`;

const alpacrashProject = `
    CREATE TABLE IF NOT EXISTS alpacrash_project
    (
        id          INT          NOT NULL AUTO_INCREMENT,
        event_id    INT          NOT NULL,
        title       VARCHAR(40)  NOT NULL,
        img_name    VARCHAR(50)  NOT NULL,
        description TEXT         NOT NULL,
        link        VARCHAR(100) NOT NULL,
        FOREIGN KEY (event_id) REFERENCES alpacrash_event (id),
        PRIMARY KEY (id)
    )
`;

const alpacrashUsers = `
    CREATE TABLE IF NOT EXISTS alpacrash_users
    (
        id         INT NOT NULL AUTO_INCREMENT,
        user_id    INT NOT NULL,
        project_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (project_id) REFERENCES alpacrash_project (id),
        PRIMARY KEY (id)
    )
`;

const questions = `
    CREATE TABLE IF NOT EXISTS questions
    (
        id      INT         NOT NULL AUTO_INCREMENT,
        user_id INT         NOT NULL,
        title   VARCHAR(50) NOT NULL,
        text    TEXT        NOT NULL,
        topic   VARCHAR(24) NOT NULL,

        FOREIGN KEY (user_id) REFERENCES users (id),
        PRIMARY KEY (id)
    )
`;

const answers = `
    CREATE TABLE IF NOT EXISTS answers
    (
        id          INT  NOT NULL AUTO_INCREMENT,
        user_id     INT  NOT NULL,
        question_id INT  NOT NULL,
        text        TEXT NOT NULL,
        FOREIGN KEY (question_id) REFERENCES questions (id),
        FOREIGN KEY (user_id) REFERENCES users (id),
        PRIMARY KEY (id)
    )
`;

module.exports = [userTable, lostItemsTable, lostItemsTable, packingListTable, alpacrashEvent, alpacrashProject, alpacrashUsers, questions, answers];
