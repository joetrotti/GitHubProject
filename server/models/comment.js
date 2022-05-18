const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS comment (
    comment_id INT NOT NULL AUTO_INCREMENT,  
    commentText VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT comment_pk PRIMARY KEY(comment_id)
  )`;
  await con.query(sql);
}
createTable();

let getComments = async () => {
  const sql = `SELECT * FROM comment`;
  return await con.query(sql);
};

async function getComment(comment) {
  let sql;
  if(comment.commentId) {
    sql = `SELECT * FROM comment
      WHERE comment_id = ${comment.commentId}
    `;
  } else {
    sql = `SELECT * FROM users
      WHERE commentText = "${comment.commentText}"
    `;
  }

  return await con.query(sql);
}

async function orderComment() {
  const sql = `SELECT * FROM comment
    ORDER BY comment_id DESC
  `;
  return await con.query(sql);
}

module.exports = { getComments, getComment, orderComment};