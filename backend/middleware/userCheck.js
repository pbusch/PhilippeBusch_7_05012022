const passwordValidator = require("password-validator");

// Validation RegEx du mail et du nom - Validation de la complexité du mot de passe
module.exports = (req, res, next) => {
  if (req.body.email) {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      String(req.body.email).toLowerCase()
    );

    if (!emailFormat) {
      return res.status(400).json({ error: "invalid email" });
    }
  }

  const nameFormat =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
      String(req.body.name)
    );

  if (!nameFormat || !req.body.name) {
    return res.status(400).json({ error: "invalid name" });
  }

  const schema = new passwordValidator();
  schema.is().min(3);

  if (!schema.validate(req.body.password)) {
    return res.status(400).json({ error: "invalid password" });
  }

  if (!schema.validate(req.body.newPassword)) {
    return res.status(400).json({ error: "invalid new password" });
  }

  next();
};
