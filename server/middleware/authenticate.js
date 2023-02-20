const jwt = require("jsonwebtoken");
const Institute = require("../dbmodel/instituteSchema");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootInstitute = await Institute.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootInstitute) {
      throw new Error("Institute not found");
    }
    req.token = token;
    req.rootInstitute = rootInstitute;
    // req.InstituteID = rootInstitute._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorized : token not provided");
    console.log(err);
  }
};
module.exports = Authenticate;
