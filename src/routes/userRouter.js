require("dotenv").config();
const router = require("express").Router();

const auth = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

// USER 
router.post("/register", authMiddleware.validateBody, auth.insert);
router.get("/login", authMiddleware.validateBody, auth.login);
router.put("/update", authMiddleware.validateToken, auth.update);
router.post("/cart", authMiddleware.validateToken, auth.update);
router.post("/add", authMiddleware.validateToken, auth.addItem);
router.post("/upload", authMiddleware.validateToken, auth.uploadPict);
router.get("/get", auth.getList);



module.exports = router;
