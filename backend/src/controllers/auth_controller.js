const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const authCtrl = {};

function generateToken(params = {}) {
  return jwt.sign({ params }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
}

authCtrl.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || typeof username === undefined || username === null) {
    res.status(400).send({ error: "Nome inválido" });
  }
  if (username.length > 30) {
    res.status(400).send({ error: "Nome muito grande" });
  }

  if (!email || typeof email === undefined || email === null) {
    res.status(400).send({ error: "Email inválido" });
  }

  if (!password || typeof password === undefined || password === null) {
    res.status(400).send({ error: "Senha inválida" });
  }

  try {
    if (await User.findOne({ email })) {
      res.status(400).send({ error: "Usuário já existente" });
    } else {
      const newUser = new User({ username, email, password });
      await newUser.save();
      newUser.password = undefined;

      res.status(200).send({
        newUser,
        token: generateToken({ id: newUser.id }),
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

authCtrl.authenticate = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(400).send({ error: "Usuário não existe" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400).send({ error: "Senha inválida" });
    }

    user.password = undefined;

    res.status(200).send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    console.log(err);
  }
};

authCtrl.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).send({ error: "Usuário não existe" });
    } else {
      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });

      const msg = {
        to: email,
        from: "blogfides@outlook.com",
        subject: "Recupere sua senha",
        text: "Blog fides suporte",
        html: `
            <div  style="font-family: Open-sans, sans-serif; border-bottom: 1px solid #ccc">
              <div style="padding: 20px 10px; text-align: center;">
                  <h4>Olá ${user.username}, Recupere sua senha</h4>
                  <a href="http://localhost:3000/recuperar-senha/${token}">recuperar senha</a>
              </div>
            </div>
          `,
      };

      sgMail
        .send(msg)
        .then(() => {
          res.status(202).send({ success: "Verifique seu email" });
        })
        .catch((err) => {
          res.status(400).send({ error: "Email não enviado, tente novamente" });
        });
    }
  } catch (err) {
    res.status(400).send({ error: "Senha não recuperada, tente novamente" });
  }
};

authCtrl.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;
  try {
    if (userId) {
      const user = await User.findOne({ _id: userId });
      user.password = newPassword;
      await user.save();
      res.status(200).send({ success: "Senha criada com sucesso" });
    } else {
      const user = await User.findOne({ passwordResetToken: req.params.token });
      if (user) {
        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.status(200).send({ success: "Senha recuperada com sucesso" });
      } else {
        res.status(404).send({ error: "Sessão expirada" });
      }
    }
  } catch (error) {
    res.status(400).send({ error: "Senha não recuperada, tente novamente" });
  }
};

module.exports = authCtrl;
