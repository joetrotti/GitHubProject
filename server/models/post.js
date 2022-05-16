const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS posts (
    post_id INT NOT NULL AUTO_INCREMENT,  
    postText VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT post_pk PRIMARY KEY(post_id)
  )`;
  await con.query(sql);
}
createTable();

let getPosts = async () => {
  const sql = `SELECT * FROM posts`;
  return await con.query(sql);
};

async function getUser(post) {
  let sql;
  if(post.postId) {
    sql = `SELECT * FROM post
      WHERE post_id = ${post.postId}
    `;
  } else {
    sql = `SELECT * FROM post
      WHERE postText = "${post.postText}"
    `;
  }

  return await con.query(sql);
}

async function login(username, password) {
  const user = await userExists(username);
  if(!user[0]) throw Error('User not found')
  if(user[0].user_password !== password) throw Error("Password is incorrect");

  return user[0];
}

async function register(user) {
  const u = userExists(user.username);
  if(u.length>0) throw Error("Username already exists");

  const sql = `INSERT INTO users (username, user_password)
    VALUES ("${user.username}", "${user.password}")
  `;

  const insert = await con.query(sql);
  const newUser = await getUser(user);
  return newUser[0];
}

async function deleteUser(userId) {
  const sql = `DELETE FROM users 
    WHERE user_id = ${userId}
  `;
  await con.query(sql);
 
}

async function userExists(username) {
  const sql = `SELECT * FROM users
    WHERE username = "${username}"
  `;
  return await con.query(sql);
}


// ORDER BY example
async function order(table, column) {
  const sql = `SELECT ${column}
    FROM ${table}
    ORDER BY ${column}
  `;
  return await con.query(sql);
}

async function orderWhere(table, selection, column, condition) {
  const sql = `SELECT ${selection}
    FROM ${table}
    WHERE ${column} = ${condition}
    ORDER BY ${selection}
  `;
  return await con.query(sql);
}

async function orderUsernames() {
  const sql = `SELECT * FROM users
    ORDER BY username DESC
  `;
  return await con.query(sql);
}


module.exports = { getPosts, };