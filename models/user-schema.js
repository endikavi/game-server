const mongoose = require ('mongoose');
//esquema de usuario

const UserSchema = mongoose.Schema({
    
    UserConf: {type : Array , unique : false , "default" : [] , unique: false , required : true},
    Check: {type: Boolean , unique : false , default : false , required : true},
    uid: {type: String , unique : true , required : true}
    
});
    
//exportamos el modulo
module.exports = mongoose.model('User', UserSchema);