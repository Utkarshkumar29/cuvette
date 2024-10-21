const mongoose=require('mongoose')

const companySchema=new mongoose.Schema({
    name:{
        type:String
    },
    phoneNo:{
        type:Number
    },
    companyName:{
        type:String
    },
    companyEmail:{
        type:String
    },
    employeeSize:{
        type:String
    },
    isEmailVerified:{
        type:Boolean
    },
    isPhoneNoVerified:{
        type:Boolean
    }
})

const Company=mongoose.model("company",companySchema)

module.exports=Company