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

async function getPost(post) {
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

async function orderPosts() {
    const sql = `SELECT * FROM posts
      ORDER BY post_id DESC
    `;
    return await con.query(sql);
  }



module.exports = { getPosts, getPost, orderPosts};