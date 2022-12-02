const express = require("express");
const router = express.Router();
const query = require("../model/Investor.js");
const client = require("../connection/connection");
const bcrypt = require("bcryptjs");

router.use(express.json());
const auth = require("../middleware/auth");

// router.put("/editprofile/:p_id", (req, res) => {
//     const {image, first_name,last_name,email} = req.body;
//     console.log(req.body);
//     client.query(
//         `UPDATE public."user" SET image= $1, first_name = $2, last_name = $3 , email = $4  WHERE p_id = ${req.params.p_id} `,
//      [email, first_name,last_name,image],
//         (error, result) => {
//             if(!error){
//                 res.status(200).send(result.rows);
//                 console.log("Edit successfully");
//             }
//             else{
//                 console.log(error);
//                 console.log("not updated");
//             }
//         }
//       );
// });

router.patch("/editprofile", auth, (req, res) => {
  const { name, contact, image } = req.body;
  const user = req.user.email;
  client.query(
    `UPDATE users SET "user_image"= COALESCE($4,"user_image") ,name= COALESCE($2,name),phone_no= COALESCE($3,phone_no) WHERE email = $1`,
    [user, name, contact, image],
    (error, result) => {
      if (!error) {
        res.status(200).send("ok");
        console.log("Edit successfully");
      } else {
        res.status(400).send(error.stack);
        console.log("not updated");
      }
    }
  );
});

router.get("/useprofile", auth, (req, res) => {
  // const {image, first_name,last_name,email} = req.body;
  // console.log(req.body);
  //res.status(200).send(result.rows);
  const user = req.user.email;
  client.query(
    `SELECT * FROM users where email=$1`,
    [user],
    (error, result) => {
      if (!error) {
        res.status(200).send(result.rows);
        console.log("Edit successfully");
      } else {
        res.send("kk");
        console.log(error);
        console.log("not updated");
      }
    }
  );
});
router.patch("/changepass", auth, async (req, res) => {
  const { password, currpass } = req.body;
  const user = req.user.email;
  let dbpass;
  client.query(
    `select password from users where email = $1`,
    [user],
    async (error, result) => {
      if (!error) {
        dbpass = result.rows[0].password;
        if (await bcrypt.compare(currpass, dbpass)) {
          encryptedPassword = await bcrypt.hash(password, 10);
          await client.query(
            `UPDATE users SET "password"= $2  WHERE email = $1`,
            [user, encryptedPassword],
            (error, result) => {
              if (!error) {
                res.status(200).send("ok");
                console.log("Edit successfully");
              } else {
                res.status(400).send(error.stack);
                console.log("not updated");
              }
            }
          );
        } else {
          res.status(401).send("Wrong Password");
        }
      } else {
        res.status(400).send(error.stack);
        console.log("not updated");
        return;
      }
    }
  );
});
module.exports = router;
