const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud',(error) => {

        if(!error)
        {
            console.log('MongoDb database connect successfully....');
            
        }
        else{
            console.log("Error in Database connection " + JSON.stringify(error,undefined,5));
            
        }

} );

module.exports = mongoose;