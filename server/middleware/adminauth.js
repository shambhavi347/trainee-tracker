const jwt = require("jsonwebtoken");
const Admin = require("../dbmodel/admin");

const Authenticate = async (req, res, next) => {
  try {
    // const token = req.cookies.jwtoken;
    // const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const admin = await Admin.findOne({
      _id: _id,
      // _id: verifyToken._id,
      // "tokens.token": token,
    });
    if (!admin) {
      throw new Error("Admin not found");
    }
    // req.token = token;
    req.rootUser = admin;
    // req.AdminID = rootAdmin._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized : token not provided");
    console.log(err);
  }
};
module.exports = Authenticate;
