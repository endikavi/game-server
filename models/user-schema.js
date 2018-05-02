const mongoose = require ('mongoose');
//esquema de usuario

const UserSchema = mongoose.Schema({
    
    UserConf: {type : Array , unique : false , "default" : [] , unique: false , required : true},
    check: {type: Boolean , unique : false , default : false , required : true}
    
});
    
    /*
    preferences:{type : Array , "default" : [], unique: false , required : false},
    
    email: {type: String , unique : true , required : true} ,
    username: {type: String , min: 1, max: 15, unique: true , required : true} ,
    premium: {type: Boolean , unique : false , default : false} ,
    mobileid: {type: Number , unique : false , default : false} ,
    mobileinfo: {type : Array , "default" : [], unique: false , required : false},
    
    savegame: {type : Array , "default" : [], unique: false , required : false} ,
    savegametwo: {type : Array , "default" : [], unique: false , required : false} ,
    savegamethree: {type : Array , "default" : [], unique: false , required : false}
    */

//exportamos el modulo
module.exports = mongoose.model('User', UserSchema);