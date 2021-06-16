import express, { Request, Response, NextFunction } from 'express';

// Clothing Model Reference - db.clothing
import Contact from '../Models/contact';

// import Util Functions

import { UserDisplayName } from '../../Utl';


// Display Functions

// Read in CRUD
export function DisplayContactListPage(req: Request, res: Response, next: NextFunction): void
{
    // db.clothing.find()
    Contact.find((err, contactCollection) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        
        res.render('index', { title: 'Contact List', page: 'contact-list', clothing: contactCollection, displayName: UserDisplayName(req)});
    });
}

// Display Edit page
export function DisplayEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // pass the id to the db

    Contact.findById(id, {}, {}, (err, contactItemToEdit) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the edit view
        res.render('index', { title: 'Edit', page: 'update', contact: contactItemToEdit, displayName: UserDisplayName(req) });
    });
}

// Display Create page
export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('index', { title: 'Add', page: 'update', contact: '', displayName: UserDisplayName(req)});
}

// Process Functions

// Process (E)dit page
export function ProcessEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Contact Item
    let updatedContactItem = new Contact
    ({
      "_id": id,
      "name": req.body.name,
      "email": req.body.email,
      "phonenumber": req.body.phonenumber
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    Contact.updateOne({_id: id}, updatedContactItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/contact-list');
    });
}

// Process Create page
export function ProcessAddPage(req: Request, res: Response, next: NextFunction): void
{
  // Instantiate a new Contact

  let newContact = new Contact
  ({
    "name": req.body.name,
      "email": req.body.email,
      "phonenumber": req.body.phonenumber
  });

  // db.contact.insert({contact data is here...})

  Contact.create(newContact, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
}

// Process (Delete page)
export function ProcessDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.contact.remove({"_id: id"})
  Contact.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contact-list');
  });
}