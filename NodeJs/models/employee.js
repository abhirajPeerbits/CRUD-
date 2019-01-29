const mongoose = require('mongoose');

var Employee = mongoose.model('Employee',{
    name: { type :String },
    position : { type : String },
    office : { type : String },
    salary : { type : String },


});

// have same identifier at both side.

module.exports={ Employee };
//  ES6 shor hend
// module.exports = {
//         Employee:Employee
// };