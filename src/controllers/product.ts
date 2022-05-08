import { Request, Response, NextFunction } from 'express';
import { Inventory } from '../models/inventory';
import { Product } from '../models/product';


const calculateQty = (contain_articles: any[]) => {
    const mapped_quantity_article: number[] = contain_articles.map( contain_article => { 
        if (contain_article.amount_of <= 0 ) {
            return contain_article.article.stock
        }
        if( contain_article.article.stock >= contain_article.amount_of ) {
           return  Math.floor(contain_article.article.stock/contain_article.amount_of);
        } 
        return 0
    });
    return Math.min(...mapped_quantity_article)
}



const getProductsAndAvailableQuantity = async (req: Request, res: Response, next: NextFunction) => {
    let products = await Product.find().populate('contain_articles.article').exec();
    console.log(JSON.stringify(products));

    const mapped_prod = products.map( prod => { 
       return { ...prod.toJSON(), qty: calculateQty(prod.contain_articles)};
    });
    console.log(JSON.stringify(mapped_prod));
    return res.status(200).json(mapped_prod)
};


const sellProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log('AAAA');
    console.log(req.body);
    const id:string = req.params.id;
    const qty:number = req.body.qty;

    console.log(qty)
    if(qty <= 0){
        return res.status(200).json(`The quantity must be bigger than 0`)
    }
    let product = await Product.findOne().populate('contain_articles.article').exec();
    let max_qty = calculateQty(product.contain_articles);
    if(max_qty < qty){
        return res.status(200).json(`Can not sell ${qty}, the availability is ${max_qty} products`)
    }

    product.contain_articles.forEach( (contain_article: any) => {
        contain_article.article.stock -= contain_article.amount_of*qty;
        contain_article.article.save();  
    });

    console.log(product);

    return res.status(200).json(product);
};


const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find().populate('contain_articles').exec();
    return res.status(200).json(products);
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id:string = req.params.id;
    const product = await Product.findById(id).populate('contain_articles').exec();
    return res.status(200).json(product);
};

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const product = new Product({name})
        await product.save()
        return res.status(201).send(product)

    } catch (error) {
        console.error(error);
        res.status(400).send('error');
    }
};

const addInventory = async (req: Request, res: Response, next: NextFunction) => {
    const id:string = req.params.id;
    const contain_articles: [{ art_id: number, amount_of:number }] = req.body;
    if(contain_articles){

        //search all articles
        const mapped_contained_articles_ids: number[] = contain_articles.map( (contain_article) => contain_article.art_id)
        const articles = await Inventory.find({ art_id: mapped_contained_articles_ids });
        
        const mapped_contained = articles.map( (article) => { return { article, amount_of: contain_articles.find( (contain_article) => contain_article.art_id === article.art_id)?.amount_of } })
        console.log(mapped_contained);
        const product = await Product.findByIdAndUpdate(id,
            {contain_articles: mapped_contained},
            {safe: true, upsert: true, new: true}
        ).populate('contain_articles.article').exec();
        return res.status(200).json(product);

    }
};


export default { getProductsAndAvailableQuantity, sellProduct, getProducts , getProduct, addProduct, addInventory, calculateQty };
