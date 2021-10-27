const { getAll, getOne, add, update, remove } = require("../../database/productsRepository")
const fs = require("fs")
async function getProducts(ctx) {
    try {
        const products = getAll()
        ctx.body = {
            products,
        }
    } catch (e) {
        ctx.status = 404
        ctx.body = {
            success: false,
            data: [],
            error: e.message,
        }
    }
}
async function renderList(ctx) {
    const products = getAll()

    return ctx.render("listPrd", { products })
}
async function renderOne(ctx) {
    const { id } = ctx.params
    const product = getOne(id)
    await ctx.render("ProductById", { product })
}

async function rendershowAdd(ctx) {
    await ctx.render("add")
}
async function renderAdd(ctx) {
    const postData = ctx.request.body
    add(postData)
    await ctx.redirect("/api/products")
}
async function getProduct(ctx) {
    try {
        const { id } = ctx.params
        const getCurrentProduct = getOne(id)
        if (getCurrentProduct) {
            return (ctx.body = getCurrentProduct)
        }
        throw new Error('Product Not Found with that id!')
            // return (ctx.body = {
            //     status: "error!",
            //     message: "Product Not Found with that id!",
            // })
    } catch (e) {
        ctx.status = 404

        return (ctx.body = {
            success: false,
            error: e.message,
        })
    }
}
async function addProduct(ctx) {
    try {
        const postData = ctx.request.body
        add(postData)
        ctx.status = 201
        return (ctx.body = {
            success: true,
        })
    } catch (e) {
        return (ctx.body = {
            success: false,
            error: e.message,
        })
    }
}
async function updateProduct(ctx) {
    try {
        const { id } = ctx.params
        const postData = ctx.request.body
        update(id, postData)
        return (ctx.body = {
            success: true,
        })
    } catch (e) {
        return (ctx.body = {
            success: false,
            error: e.message,
        })
    }
}
async function removeProduct(ctx) {
    try {
        const { id } = ctx.params
        remove(id)
        return (ctx.body = {
            status: true,
            message: "success",
        })
    } catch (e) {
        return (ctx.body = {
            success: false,
            error: e.message,
        })
    }
}
module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    removeProduct,
    renderList,
    renderOne,
    rendershowAdd,
    renderAdd,
}