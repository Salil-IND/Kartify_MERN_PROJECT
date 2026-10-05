import { Product } from "../models/product.models.js";


export const createProduct = async (req, res) =>{
    const {name, description, price, category, image, stock} = req.body;

    if (!name || !description || !price || !category || !image || !stock){
        return res.status(400).json({
            message:"Missing Required Fields"
        })
    }

    if(typeof parseInt(price) !== "number" || parseInt(price)<=0){
        return res.status(400).json({
            message:"Invalid Price"
        })
    }

    if(typeof parseInt(stock) !== "number" || parseInt(stock)<0){
        return res.status(400).json({
            message:"Invalid Stock"
        })
    }

    const product = await Product.create({name, description, price, category, image, stock})


    return res.status(201).json({
        message:`Product successfully created: ${product._id}`
    })
}

export const getProducts = async (req, res, next)=>{
    const {search, category} = req.query;

    if(search || category){
        next();
    } else {

        const products = await Product.find({}).lean();

        const response = {
            success:true,
            count: products.length,
            products:products,
        }




        return res.status(200).json(response);
    }
}

export const getProductById = async (req, res) => {
    console.log("Entereg wrong controller");
    const id = req.params.id;

    if(!id){
        return res.status(401).json({   
            message:"Invalid Product Id"
        })
    }

    const product = await Product.findById(id);

    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }

    return res.status(200).json({
        message:"Product was found",
        productData:product
    })

}

export const filterProducts = async (req, res) =>{
    const {search = "", category = ""} = req.query;

    const filters = {};
    if(search){
        filters.name = {$regex: search, $options: "i"};
    }
    if(category){
        filters.category = category;
    }

    const filteredProducts = await Product.find(filters).lean();

    return res.status(200).json({
        success:true,
        count:filteredProducts.length,
        products:filteredProducts
    })
}

