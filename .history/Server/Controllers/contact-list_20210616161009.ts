import express, { Request, Response, NextFunction } from 'express';

// Clothing Model Reference - db.clothing
import Clothing from '../Models/clothing';

// import Util Functions

import { UserDisplayName } from '../../Utl';


// Display Functions

// Read in CRUD
export function DisplayClothingListPage(req: Request, res: Response, next: NextFunction): void
{
    // db.clothing.find()
    Clothing.find((err, clothingCollection) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        
        res.render('index', { title: 'Clothing List', page: 'clothing-list', clothing: clothingCollection, displayName: UserDisplayName(req)});
    });
}

// Display Edit page
export function DisplayEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // pass the id to the db

    Clothing.findById(id, {}, {}, (err, clothingItemToEdit) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the edit view
        res.render('index', { title: 'Edit', page: 'update', clothing: clothingItemToEdit, displayName: UserDisplayName(req) });
    });
}

// Display Create page
export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('index', { title: 'Add', page: 'update', clothing: '', displayName: UserDisplayName(req)});
}

// Process Functions

// Process (E)dit page
export function ProcessEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Clothing Item
    let updatedClothingItem = new Clothing
    ({
      "_id": id,
      "name": req.body.name,
      "brand": req.body.brand,
      "category": req.body.category,
      "colour": req.body.colour,
      "size": req.body.size,
      "price": req.body.price
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    Clothing.updateOne({_id: id}, updatedClothingItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/clothing-list');
    });
}

// Process (C)reate page
export function ProcessAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new Clothing
  let newContact = new Clothing
  ({
    "name": req.body.name,
    "brand": req.body.brand,
    "category": req.body.category,
    "colour": req.body.colour,
    "size": req.body.size,
    "price": req.body.price
  });

  // db.clothing.insert({clothing data is here...})
  Clothing.create(newContact, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/clothing-list');
  });
}

// Process (Delete page)
export function ProcessDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.clothing.remove({"_id: id"})
  Clothing.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/clothing-list');
  });
}