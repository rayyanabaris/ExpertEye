const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Aes = require("../utils/aes256");
const Users = require("../models/UserModel");
const dotenv = require("dotenv").config();
const Response = require("../utils/response");

const userMiddleware = async (req, res, next) => {
  try {
    // Check for Bearer token in Authorization header
    if (req.method === "GET" || req.method === "DELETE") {
      if (req?.headers?.authorization?.startsWith("Bearer")) {
        const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header

        if (token) {
          try {
            // Verify token and get decoded data
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID from decoded token
            const user = await Users.findById(decoded?.User_id);

            // If user is not found, respond with "Auth Failed"
            if (!user) {
              return Response(res, {}, "Auth Failed", 401, null);
            }

            // Attach the user object to req.user for later use in routes
            req.user = user;
            next(); // Proceed to the next middleware or route handler
          } catch (error) {
            return Response(res, {}, error.message, 406, null);
          }
        } else {
          return Response(res, {}, "Auth Failed", 405, null);
        }
      } else {
        return Response(res, {}, "You are not Authorized", 408, null);
      }
    } else {
      // Decrypt and process the request body (for non-GET/DELETE requests)
      const token = req.headers.authorization.split(" ")[1];
      const user_id = jwt.verify(token, process.env.JWT_SECRET).User_id;

      const [user] = await Promise.all([Users.findById(user_id)]);
      const data = await Aes.decrypt(
        req.body.encode,
        "b3885c485dc58d47687c99ff6a4de54846911fe87cd5bc76c2b02c33a5a67735",
        "92df48d25386f2ec3a28eef0b908635c"
      );

      if (!user) {
        return Response(res, {}, "Auth Failed", 402, null);
      }

      req.body = data;
      req.user = user._id;
      req.role_id = user.role_id;
      next();
    }
  } catch (error) {
    console.log(error.message);
    return Response(res, {}, "Authentication Failed", 403, null);
  }
};
const adminMiddleware = async (req, res, next) => {
  try {
    // Check for Bearer token in Authorization header
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response(res, {}, "You are not Authorized", 401, null);
    }

    const token = authHeader.split(" ")[1]; // Extract token from Authorization header

    try {
      // Verify the token and decode the payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user_id = decoded?.User_id;

      // For GET and DELETE requests, just verify and attach the user
      if (req.method === "GET" || req.method === "DELETE") {
        const user = await Users.findById(user_id);

        if (!user) {
          return Response(res, {}, "Auth Failed", 401, null);
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
          return Response(res, {}, "You are not authorized", 403, null);
        }

        req.user = user; // Attach user object to the request
        return next(); // Proceed to the next middleware or route handler
      }

      // For other methods, decrypt the body and verify the user
      const [user] = await Promise.all([Users.findById(user_id)]);
      if (!user) {
        return Response(res, {}, "Auth Failed", 401, null);
      }

      // Check if the user is an admin
      if (user.role !== "admin") {
        return Response(res, {}, "You are not authorized", 403, null);
      }

      // Decrypt the request body
      const data = await Aes.decrypt(
        req.body.encode,
        "b3885c485dc58d47687c99ff6a4de54846911fe87cd5bc76c2b02c33a5a67735", // AES key
        "92df48d25386f2ec3a28eef0b908635c" // AES IV
      );

      req.body = data; // Attach decrypted body data
      req.user = user._id; // Attach user ID to the request
      req.role = user.role; // Optionally attach role ID if needed
      next(); // Proceed to the next middleware or route handler

    } catch (error) {
      // Handle token verification errors
      return Response(res, {}, "Authentication Failed", 403, null);
    }
  } catch (error) {
    console.log(error.message); // Log any unexpected errors
    return Response(res, {}, "Authentication Failed", 403, null);
  }
};
const userLogin = async (req, res, next) => {
  try {
    // Log request body for debugging
    console.log("Encrypted data:", req.body.encode);

    // Decrypt the encoded data
    const data = await Aes.decrypt(
      req.body.encode,
      "b3885c485dc58d47687c99ff6a4de54846911fe87cd5bc76c2b02c33a5a67735", // Key
      "92df48d25386f2ec3a28eef0b908635c" // IV
    );

    // Log decrypted data for debugging
    console.log("Decrypted data:", data);

    // Attach decrypted data to req.body
    req.body = data;

    // Proceed to next middleware
    next();
  } catch (error) {
    console.error("Decryption error:", error);
    Response(res, {}, "Authentication Failed", 403, null);
  }
};
const adminLogin = async (req, res, next) => {
  try {
    if (!req.body.encode) {
      return Response(res, {}, "Missing encrypted data", 400, null);
    }

    console.log("Encrypted data:", req.body.encode); // Log encrypted data for debugging
    
    const data = await Aes.decrypt(
      req.body.encode,
      "b3885c485dc58d47687c99ff6a4de54846911fe87cd5bc76c2b02c33a5a67735", // Key
      "92df48d25386f2ec3a28eef0b908635c" // IV
    );

    if (!data) {
      return Response(res, {}, "Decryption failed", 403, null);
    }

    console.log("Decrypted data:", data); // Log decrypted data
    req.body = data;

    const adminUser = await Users.findOne({ email: req.body.email });

    if (!adminUser) {
      return Response(res, {}, "User not found", 404, null);
    }

    //if (adminUser.role !== "admin") {
     // return Response(res, {}, "Authentication Failed: Admin role required", 403, null);
   // }

    next(); // Proceed to loginAdmin controller
  } catch (error) {
    console.error("Error during admin login:", error);
    Response(res, {}, "Authentication Failed", 403, null);
  }
};



module.exports = { userMiddleware,adminMiddleware, userLogin, adminLogin };
