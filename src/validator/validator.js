const yup = require("yup")
async function validator(ctx, next) {
    try {
        const postData = ctx.request.body
        let schema = yup.object().shape({
            name: yup.string().required(),
            price: yup.number().positive().integer().required(),
            description: yup.string().required(),
            product: yup.string().required(),
            color: yup.string().required(),
            createdAt: yup.string().required(),
            image: yup.string().required(),
        })

        await schema.validate(postData)
        next()
    } catch (e) {
        ctx.status = 400
        ctx.body = {
            sucess: false,
            errors: e.errors,
            errorName: e.name,
            errorPrice: e.price,
            errorDes: e.description,
            errorProduct: e.product,
            errorColor: e.color,
            errorCreatAt: e.createdAt,
            errorImage: e.image,
        }
    }
}
module.exports = validator