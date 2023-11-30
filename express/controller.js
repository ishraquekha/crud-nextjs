const db = require('./mysqlcon')

// Methods to be executed on routes
const getUser = async (req, res)=>{
    const users = await db.query({query: "SELECT * FROM user",values: []});
    return res.status(200).json({ users: users });
}
  
const addUser = async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const addUser = await db.query({query: `INSERT INTO user (name, email, password) VALUES('${name}','${email}','${password}')`});
    return res.status(200).json({ response: { message: 'message', userAdded: addUser.affectedRows } });
  }

const editUser = async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const update = await db.query({query: `UPDATE user SET name = '${name}', email = '${email}', password= '${password}' WHERE id = '${req.body.id}'`});
    const result = update.affectedRows;
    let message='';
    result?message = "success":message = "error";
    return res.status(200).json({ message:message,userUpdate: update.affectedRows });
  }

const deleteUser = async(req,res)=>{
    const id = req.body.id;
    const deleteUser = await db.query({query: "DELETE FROM user WHERE id = ?",values: [id],});
    const result = deleteUser.affectedRows;
    let message='';
    result?message = "success":message = "error";
    return res.status(200).json({ response: { message: message, userDeleted: deleteUser.affectedRows } });
  }

  
// Export of all methods as object
module.exports = {
    getUser,
    addUser,
    editUser,
    deleteUser
}