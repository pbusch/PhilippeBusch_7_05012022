const passwordValidator = require("password-validator");

module.exports = (req, res, next) => {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    String(req.body.email).toLowerCase()
  );

  if (!emailFormat) {
    return res.status(400).json({ error: "invalid email" });
  }

  const nameFormat =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
      String(req.body.name)
    );

  if (!nameFormat) {
    return res.status(400).json({ error: "invalid name" });
  }

  const schema = new passwordValidator();
  schema.is().min(3);

  if (!schema.validate(req.body.password)) {
    return res.status(400).json({ error: "invalid password" });
  }
  next();
};
