//  # Authentication middleware
const SECRET = process.env.SECRET;

const jsonwebtoken = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const bearerHeader = req.header("Authorization");
  console.log(bearerHeader);

  if (!bearerHeader) {
    return res.status(404).send({
      success: false,
      message: "Token missing",
    });
  }
  // Check if the header starts with "Bearer "
  if (!bearerHeader.startsWith("Bearer ")) {
    return res.status(403).send({
      success: false,
      message: "Invalid token format",
    });
  }
  const part = bearerHeader.split(" ");
  console.log(part);
  const token = part[1];

  jsonwebtoken.verify(token, SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(403).send({
        succes: false,
        message: "Invalid Token",
        message: "Invalid Token",
        message: "Invalid Token",
        error,
      });
    } else {
      console.log("Decoded Payload :", decoded);
      req.decodedData = decoded;
    }

    next();
  });
};

module.exports = authenticateToken;