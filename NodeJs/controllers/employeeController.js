const express  = require('express');
var objectId = require('mongoose').Types.ObjectId;
var router = express.Router();



var { Employee } = require('../models/employee');

// -------------------------------------------------------------------------------------------------

// retrive data
//  localhost:3000/employees
// data send to the broser so we need to use response object
router.get('/',(req,res) => {

        Employee.find( (error,docs) => {
            if(!error){
                res.send(docs);
            }
            else{
                console.log("error in retriving employee data : " + JSON.stringify(error,undefined,2));
                
            }
        });
});


// -------------------------------------------------------------------------------------------------

// retrive data for perticuler id

router.get('/:id', (req,res) => {
    // id comes from the b so we use req
        if(!objectId.isValid(req.params.id))
        {
            return res.status(400).send(`no record for given id : ${req.params.id}`)
        }
        else
        {
            Employee.findById( req.params.id, (error,docs) => {
                    if(!error)
                    {
                        res.send(docs);
                    }
                    else{
                        console.log("error in retriving id by id : " + JSON.stringify(error,undefined,2));
                        
                    }
            });
        }

});


// -------------------------------------------------------------------------------------------------
// store data from database
// data comes from the broser so we need to use request object
router.post('/',(req,res) => {
        var emp = new Employee({
            // here we send json data
            name :req.body.name,
            position : req.body.position,
            office : req.body.office,
            salary : req.body.salary, 


        });

        emp.save((error,docs) => {
            if(!error)
            {
                res.send(docs);
                // here we use res object becouse we need to send something msg to the browser
            }
            else
            {
                console.log("error in employee save : " + JSON.stringify(error,undefined,2));
                
            }

        });
});

// -------------------------------------------------------------------------------------------------
// update data in database

router.put('/:id', (req,res) => {
        if(!objectId.isValid(req.params.id))
        {
            console.log("wrong id");
            
            return res.status(400).send(`no record for given id : ${ req.params.id }`);
            
            
        }
        else
        {
            // emp is normal object not same like  post method bcoz here we update data not create emp. new object
            var emp = {
                name:req.body.name,
                position : req.body.position,
                office:req.body.office,
                salary : req.body.salary,
            };
            console.log("right id ");

            Employee.findByIdAndUpdate(req.params.id,{ $set :emp },{ new: true }, (error,docs) => {
                // { new: true } so docs pera. have return updated value of employee. other wise return old value
                if(!error){
                    res.send(docs);
                    console.log('response dend');
                    
                }
                else{
                    console.log("error in employee update :" + JSON.stringify(error,undefined,2));
                    
                }
            });
        }
});

// -------------------------------------------------------------------------------------------------
// Delete data in database

router.delete('/:id', (req,res) => {
        if(!objectId.isValid(req.params.id)){
            return  res.status(400).send(`no record found for given id : ${ $res.params.id }`);
        }else{
            console.log('employee Delete :',req.params.id);
            Employee.findByIdAndDelete(req.params.id, (error,docs) => {
                if(!error)
                {
                    res.send(docs);
                }else{
                    console.log('Error in  employee Delete :' + JSON.stringify(error,undefined,2));
                }
            });
        }
});

module.exports = router;