
const { requireSigin, userMiddleware } = require("../middleware");
const { addOrder, getOrders, getOrder } = require("../controller/order");
const router = require("express").Router();

router.post("/addOrder", requireSigin, userMiddleware, addOrder); 
router.get("/getOrders", requireSigin, userMiddleware, getOrders);
router.post("/getOrder", requireSigin, userMiddleware, getOrder);

module.exports = router; 