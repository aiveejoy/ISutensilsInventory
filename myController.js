const Item = require('./model.js');

// Create and Save a newItem
module.exports.create = (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Item content can not be empty"
    //     });
    // }

    // Create a new Item
    const newItem = new Item({
        item: req.body.item, 
        quantity: req.body.quantity,
        priority: req.body.priority
    });

    // Save Item in the database
    newItem.save()
    .then(data => {
        res.send(data);
        // console.log("na save mam");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Item."
        });
    });
};


// Retrieve and return all items from the database.
exports.findAll = (req, res) => {
    Item.find({"dateDeleted":null})
    .then(items => {
        // console.log(items);
        res.send(items);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving items."
        });
    });
};

// Find a single item with a itemId
exports.findOne = (req, res, id) => {
    // mongoose.set('useFindAndModify', false),
    Item.findByIdAndUpdate(id)
    .then(items => {
        if(!items) {
            return res.status(404).send({
                message: "Note not found with id " + id
            });            
        }
        res.send(items);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving item with id " + id
        });
    });
};
exports.check = (req, res, id) => {
    console.log("iddddddddddd--- > "+id);
    // mongoose.set('useFindAndModify', false),
    Item.findOne({_id: id})
    .then(items => {
        if(!items) {
            return res.status(404).send({
                message: "Note not found with id " + id
            });            
        }
        res.send(items);
        console.log(items)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving item with id " + id
        });
    });
};

exports.update = (req, res, id) => {
    var newQ=req.body.quantity;
    // console.log("idididid-- "+id);
    // console.log("iii-- "+req.body.item);
    // console.log("QQQQ-- "+newQ);   
    // console.log("ddd-- "+req.body.priority);
    // console.log("IQ-- "+req.body.inevQ);
    // console.log("IQ-- "+req.body.lacking);
    Item.findByIdAndUpdate(id, {
        item: req.body.item, 
        quantity: newQ,
        priority: req.body.priority,
        inevQ: req.body.inevQ,
        lacking: req.body.lacking
    }, {new: true})
    .then(items => {
        if(!items) {
            return res.status(404).send({
                message: "Note not found with id " + id
            });
        }
        res.send(items);
        // console.log(items);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + id
        });
    });
};

// Delete a items with the specified noteId in the request
exports.delete = (req, res, id) => {
    console.log("iddddddddddd--- > "+id);
    Item.findByIdAndUpdate(id,{
        dateDeleted: req.body.dateDeleted
    },{new: true})
    .then(items=> {
        if(!items) {
            return res.status(404).send({
                message: "Note not found with id " + id
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + id
        });
    });
};
