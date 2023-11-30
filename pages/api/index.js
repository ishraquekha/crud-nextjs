import query from "../../lib/mysqlcon";

export default async function handler(req,res){
    if (req.method === "GET") {
        const users = await query({ query: "SELECT * FROM user", values: []});
        res.status(200).json({ users: users });
      }
      if (req.method === "POST") {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const addUser = await query({query: `INSERT INTO user (name, email, password) VALUES('${name}','${email}','${password}')`});
    
        res.status(200).json({ response: { message: 'message', userAdded: addUser.affectedRows } });
      }
      if (req.method === "PUT") {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const update = await query({ query: `UPDATE user SET name = '${name}', email = '${email}', password= '${password}' WHERE id = '${req.body.id}'`});
        const result = update.affectedRows;
        let message='';
        result?message = "success":message = "error";
        res.status(200).json({ message:message,userUpdate: update.affectedRows });
      }
      if (req.method === "DELETE") {
        const id = req.body.id;
        const deleteUser = await query({query: "DELETE FROM user WHERE id = ?",  values: [id]});
        const result = deleteUser.affectedRows;
        let message='';
        result?message = "success":message = "error";
        res.status(200).json({ response: { message: message, userDeleted: deleteUser.affectedRows } });
      }
}