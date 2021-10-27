const Router = require("koa-router")
const productHandler = require("../controller/product/product")
const validator = require("../validator/validator")

const router = new Router({
    prefix: "/api",
})
router.get("/", async (ctx) => {
    await ctx.render("index")
})
router.get("/products", productHandler.renderList)
router.get("/products/create", productHandler.rendershowAdd)
router.post("/products/create", productHandler.renderAdd)
router.put("/product/:id", validator, productHandler.updateProduct)
router.delete("/remove/:id")
router.get("/product/:id", productHandler.renderOne)
module.exports = router