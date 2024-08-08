import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        default:Date.now()
    },
    passwordArray:{
        type:[String],
        validate: v => Array.isArray(v) && v.length>=4
    },
    passwordCollectionId:{
        type:String,
        required:true,
        default:Date.now()  
    },
    attempts:{
        type:Number,
        required:true,
        default:3
    },
    lastLogin:{
        type:Date
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})

//login
userSchema.methods.matchPassword = async function(enteredPassword){
    let passHashArray = this.password.split(process.env.JWT_SECRET);
    let verify = true, passArr = [];
    const salt = bcrypt.genSaltSync(10);
    enteredPassword.forEach((ele,index) => { 
        passArr.push(bcrypt.hashSync(ele,salt));        
        if(!bcrypt.compareSync(ele,passHashArray[index])) verify=false; 
    })
    return verify;
}

//register
userSchema.pre('save', async function(next){
    if(!this.isModified('passwordArray')) next();
    const salt = await bcrypt.genSalt(10)
    let passHashArray = []
    this.passwordArray.forEach(ele => passHashArray.push(bcrypt.hashSync(ele,salt)));
    this.passwordArray = [...passHashArray];
    this.password = this.passwordArray.join(process.env.JWT_SECRET)
})

const User = mongoose.model('userproject', userSchema)

export default User