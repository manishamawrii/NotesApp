import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
  name:{ type:String, required:true},
  email:{type:String, required:true,unique:true},
  password:{type:String,required:true}
})


userSchema.pre('save',async function(next)
{
  if(!this.isModified("password")) return next();
  this.password= await bcrypt.hash(this.password,10);
  next();

});
const User=mongoose.model('Userdet',userSchema);
export default User;






// userSchema.pre("save", async function(next) { ... })

// Ye ek middleware / hook hai jo document database me save hone se pehle automatically run hota hai.

// Matlab: Jab bhi aap user.save() likhoge, ye function sabse pehle chalega, uske baad document save hoga.


// if (!this.isModified("password")) return next();

// this yaha current user document ko refer karta hai.

// isModified("password") check karta hai ki kya password field badla hai.

// Agar password change nahi hua (jaise aap sirf name update kar rahe ho), to dobara hash karna bekaar hai.

// Isliye condition lagayi hai → agar password modify nahi hua, to middleware skip karo aur next() karke normal save continue karo.


// this.password = await bcrypt.hash(this.password, 10);

// Agar password naya hai ya update hua hai, to bcrypt.hash() function use hota hai.

// Parameters:

// this.password → User ka plain password jo form me diya gaya.

// 10 → Salt rounds (jitna bada number, utna strong aur slow hashing).

// Ye plain text password ko ek hashed string me convert karke wapas this.password me save kar deta hai.

// next();

// Mongoose ko batata hai ki middleware ka kaam khatam ho gaya.

// Ab normal save process continue karo → yani ab user ka data (hashed password ke saath) DB me save ho jaayega.


// User register karega: { name: "Manisha", email: "test@test.com", password: "12345" }

// user.save() call hoga → pre("save") middleware trigger hoga.

// Password modify hai → hashing chalegi → "12345" convert ho jaayega ek hashed string me.

// Hashed password DB me save hoga. (Plain text kabhi nahi save hoga)


// Schema = Blueprint (ghar ka naksha)

// Model = Ghar banane ka tool (naksha se ghar banana)

// Document = Actual ghar (database me saved user)


// // 1. Schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String
// });

// // 2. Model
// const User = mongoose.model("User", userSchema);

// // 3. Document (instance of User)
// const newUser = new User({
//   name: "Manisha",
//   email: "manisha@test.com",
//   password: "12345"
// });

// // 4. Save to DB
// await newUser.save();


// isModified("fieldName") mongoose ka built-in method hai jo check karta hai ki kya given field ko change kiya gaya hai ya nahi is save operation ke andar.

// Agar aap naya user create kar rahe ho, to password naya hai →


// isModified("password") === true.

// Agar aap user ka sirf name update kar rahe ho, password me koi change nahi → isModified("password") === false. 


// Jab user login karta hai, wo plain password enter karta hai.

// bcrypt ka compare() function plain password ko hash ke saath compare karta hai.

// Agar match ho gaya → login success ✅, warna fail ❌.


// bcrypt = ek algorithm/library jo password ko hash karta hai.

// hash = one-way irreversible random string jo password ko secure banata hai.


// Adds Salt → bcrypt automatically adds a random value (called salt) before hashing.

// So even if two users have the same password, their hashes will be different.

// Slow hashing → bcrypt is designed to be a little slow.

// This makes brute-force attacks (guessing passwords repeatedly) very hard.

// Secure & industry standard → bcrypt is widely used and trusted for password security.

// User signs up → password "mypassword123"

// bcrypt hashes it → "d93n32n9832nnsdd@#..." (saved in DB)

// User logs in → bcrypt takes the entered password and compares it with the stored hash.

// If it matches → login success ✅


// mongoose.model()

// This function creates a model in MongoDB.

// A model is like a class in OOP → we use it to create objects (documents) in a MongoDB collection.

// Syntax:

// mongoose.model("ModelName", schema);

// "Userdet" → actual model name (collection banane ke liye use hota hai).

// User (variable) → aapke code me model ko access karne ka reference/handler hai.

// 👉 So in short: "Userdet" is model name, and User is just the JavaScript variable holding that model.

// type: mongoose.Schema.Types.ObjectId → this means the user field will store the unique ID of a User document (the _id MongoDB automatically generates).