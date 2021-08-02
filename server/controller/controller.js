var Userdb = require("../model/model");

// creating and save new user

exports.create = (req, res) => {
  //validating req
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
  });

  //save user detail in DB
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "some error occurred while creating a create operation",
      });
    });
};
//getting and return all user/ single user
exports.find = (req, res) => {
  Userdb.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occurred while getting users",
      });
    });
};

//update a new identified user by userid
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      Message: "Data to update cannot be Empty",
    });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user id with ${id} .May be user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occurred while updating user details",
      });
    });
};
//delete a user by user id
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user id with ${id} .May be user not found`,
        });
      } else {
        res.send({
          message: "USer was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occurred while delete the user",
      });
    });
};
