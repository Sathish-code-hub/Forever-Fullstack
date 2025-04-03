import productModel from "../models/productModel.js"
import {v2 as cloudinary} from 'cloudinary'
import path from 'path';


// add product func
const addproduct = async (req, res) => {
    
    try {

        const {name,description,price,category,subCategory,sizes,bestSeller} = req.body

        const image1 = req.files.image1?.[0]
        const image2 = req.files.image2?.[0]
        const image3 = req.files.image3?.[0]
        const image4 = req.files.image4?.[0]

        
        const images = [image1,image2,image3,image4].filter((item) => item !== undefined)

        const imagesUrl = await Promise.all(
            images.map(async (file) => {
                try {
                    const filePath = file.path.replace(/\\/g, "/"); // Convert Windows path to Unix format       
                    let result = await cloudinary.uploader.upload(filePath, { resource_type: 'image' })        
                    return result.secure_url; // Store the image URL
                } catch (err) {
                    
                    return null; // Prevent breaking Promise.all()
                }
            })
        );
        
        


        const newProduct = new productModel({
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === 'true' ? true : false,
            image: imagesUrl, // Save uploaded image URLs in database
            date:Date.now(),
        });

        await newProduct.save();
        console.log(newProduct)

        res.json({success: true, message: "product added successfully" });
    

   
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

// remove product func
const removeproduct = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product removed"})
        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

// list product func
const listproduct = async (req, res) => {

    try {

        const products = await productModel.find({});
        res.json({success:true,products})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

// single product info
const productinfo = async (req, res) => {
    try {

        const { productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success: true,product})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export { addproduct, removeproduct, listproduct, productinfo }