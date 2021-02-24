const User = require("../models/User");

const userCtrl = {};

userCtrl.authenticated = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    res.status(200).send(user);
  } catch (err) {
    res.status(401).send(err);
  }
};

userCtrl.userEdit = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ _id: req.userId });
    user.username = username;
    user.password = password;

    user.save();
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
};

userCtrl.addWriter = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user.role === "admin") {
      res.status(500).send({ error: "Administrador não pode virar escritor" });
    } else {
      await User.findOneAndUpdate(
        { email: email },
        {
          role: "writer",
        }
      );
    }
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
};

userCtrl.getWriters = async (req, res) => {
  try {
    const writers = await User.find({ role: "writer" });

    res.status(200).send(writers);
  } catch (err) {
    console.log(err);
  }
};

userCtrl.removeWriter = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        role: "user",
      }
    );
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
};

module.exports = userCtrl;
