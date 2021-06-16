import express, { Request, Response, NextFunction } from 'express';

import Clothing from "../Models/clothing";

export function DisplayClothingListPage(req: Request, res: Response, next: NextFunction): void
{
    Clothing.find(function(err, clothingCollection)
    {
        if(err)
        {
            return console.error(err);
        }

        //Render clothing list content partial page
        res.render('index', {title: 'Clothing List', page: 'clothing-list', clothing: clothingCollection})
    });
}

export function DisplayEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    //Pass the id to the db

    Clothing.findById(id, {}, {}, (err, clothingItemToEdit) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //Show the edit view
        res.render('index', {title: 'Edit', page: 'edit', clothing: clothingItemToEdit})
    });

}