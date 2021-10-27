const fs = require("fs")
const products = require("./products.json")

function getAll() {
    return products
}

function getOne(id) {
    return products.find((product) => product.id === parseInt(id))
}

function add(data) {
    const addProduct = [data, ...products]
    return fs.writeFileSync(
        "./src/database/products.json",
        JSON.stringify(addProduct)
    )
}

function update(id, data) {
    let product = products.find((prd) => prd.id == id)
    if (product) {
        product = {...product, ...data }
    }
    const productsUpdated = products.map((prd) => {
        if (prd.id == product.id) {
            return product
        }
        return prd
    })
    return fs.writeFileSync("./src/database/products.json", JSON.stringify(productsUpdated))
}

function remove(id) {
    const prd = products.filter((product) => product.id != parseInt(id))
    return fs.writeFileSync("./src/database/products.json", JSON.stringify(prd))
}
module.exports = {
    getOne,
    getAll,
    add,
    update,
    remove
}