/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import { Inventory } from '../models/inventory';


const addInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { art_id, name, stock } = req.body;
    
        const inventory = new Inventory({art_id, name, stock})
        await inventory.save()
        return res.status(201).send(inventory)

    } catch (error) {
        console.error(error);
        res.status(400).send('error');
    }
};

const getInventories = async (req: Request, res: Response, next: NextFunction) => {
    const inventories = await Inventory.find();
    return res.status(200).json(inventories);
};

const getInventory = async (req: Request, res: Response, next: NextFunction) => {
    const art_id:string = req.params.art_id;
    const inventory = await Inventory.findOne({ art_id });
    return res.status(200).json(inventory);
};

const updateInventory = async (req: Request, res: Response, next: NextFunction) => {
    let art_id:string = req.params.art_id;
    let name: string = req.body.name ?? null;
    let stock: number = req.body.stock ?? null;

    const filter = { art_id };
    const update = { name, stock};

    let inventory = await Inventory.findOneAndUpdate(filter, update, {
    returnOriginal: false
    });
    return res.status(200).json(inventory);
};

const deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
    let art_id:string = req.params.art_id;

    let inventory = await Inventory.findOneAndDelete({art_id}, {
        returnOriginal: false
        });
    return res.status(200).json(inventory);
};

export default { getInventories, getInventory, updateInventory, addInventory, deleteInventory };
