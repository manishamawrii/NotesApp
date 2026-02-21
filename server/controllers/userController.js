import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken =(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "user already exists" });

    // ❌ DO NOT HASH HERE
    const user = await User.create({
      name,
      email,
      password, // plain password
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // 🔥 ADD LOGS HERE
    console.log("Login email:", email);
    console.log("Login password:", password);
    console.log("DB user:", user);
    console.log("DB hash:", user?.password);
    console.log(await bcrypt.compare("1234", "$2b$10$nRSZ0fNZ87UVWU3hmVWJ8uf.4ofig8x71On1CPNkjlNSg4iemqaRG"));


    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   const isMatch = await bcrypt.compare(password, user.password);



    console.log("Password match:", isMatch); // also add this

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};






// jwt.sign(payload, secretOrPrivateKey, [options])

// Yeh function JWT token banane ka kaam karta hai. Iske teen main cheezein hoti hain:

// Payload (data) → { id }

// Secret / Private Key → process.env.JWT_SECRET

// Options (optional) → { expiresIn: "30d" }


// generateToken function

// Yeh ek chhoti si function hai jo token banati hai.




// jwt.sign(...) kya karta hai?

// Yeh ek JWT token (JSON Web Token) banata hai.

// Token ek string hoti hai (encrypted form me), jo user ki identity prove karti hai.

// Iska kaam: login ke baad user ko identify karna.

// jwt.sign(...) kya karta hai?

// Yeh ek JWT token (JSON Web Token) banata hai.

// Token ek string hoti hai (encrypted form me), jo user ki identity prove karti hai.

// Iska kaam: login ke baad user ko identify karna.

// Payload ({ id })

// Yeh part user ka data rakhta hai.

// Example: Agar user ka id = 101 hai, toh payload hoga:

// { "id": 101 }


// Matlab token ke andar user ka id chipka diya gaya.

// Secret (process.env.JWT_SECRET)

// Yeh ek chhupa hua password hai jo sirf aapke server ko maloom hai.

// Token banate waqt aur verify karte waqt yehi use hota hai.

// Agar yeh secret leak ho gaya toh koi bhi fake token bana sakta hai ⚠️.

// Isliye isse .env file me rakha jata hai.

// Expiry ({ expiresIn: "30d" })

// Yeh bolta hai ki token sirf 30 din ke liye valid hai.

// 30 din ke baad token expire ho jayega aur user ko dobara login karna hoga.

// Return value (token string)

// Function finally ek lamba encrypted string return karta hai.

// Example token:

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...


// Is token ko aap frontend (browser/localStorage/cookie) me store karte ho.












// // bcryptjs is a JavaScript implementation of the bcrypt algorithm.

// // It is used to encrypt (hash) user passwords before saving them in the database.

// // Instead of storing raw/plain passwords (which is insecure), we store a hashed version.

// // Later, when the user logs in, we compare the entered password with the stored hash.

// jwt.sign() kya karta hai?

// jwt.sign(payload, secretOrPrivateKey, options) ek JWT token string return karta hai.
// Ye string ek combination hota hai teen parts ka:

// Header → kaunsa algorithm use hua (jaise HS256)

// Payload → aapka data (id, email, etc.)

// Signature → payload + secret key ko mila kar ek hash banaya jata hai