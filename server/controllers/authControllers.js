const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');
const Data = require('../models/data');
const { QueryTypes } = require('sequelize');
const sequelize = require('../sequelize');

exports.register = async (req, res) => {
  const query = "SELECT * FROM data where uname = :uname OR email = :email";
  try {
    const check = await sequelize.query(query, {
      replacements: { uname: req.body.uname, email: req.body.email },
      type: QueryTypes.SELECT
    });

    if (!check.length) {
      const hash = await bcrypt.hash(req.body.pass, 13);
      const data1 = {
        ...req.body,
        pass: hash,
      };
      const data = await Data.create(data1);
      res.send({
        success: true,
        data: data,
        data1: {
          notuserCreated: false,
        },
      });
    } else {
      res.send({
        success: true,
        data1: {
          notuserCreated: true,
        },
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    });
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { uname, pass } = req.body;
    const user = await Data.findOne({ where: { uname } });
    if (!user) {
      res.json({ success: false });
      return;
    }
    const isValid = await bcrypt.compare(pass, user.pass);
    if (!isValid) {
      res.json({ success: false });
      return;
    }
    const token = generateToken({id:user.id, userName: user.uname, Name: user.name, Email: user.email });
    res.json({ success: true, token });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error.message);
  }
};
