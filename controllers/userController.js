import User from '../db/Models/userModel.js'
import bcrypt from "bcryptjs"
import generateTokenandSetcookie from '../utils/helpers/generateToken.js';

const signupUser = async(req,res) => {
    try {

            // We will parse this data with the help of body-parser
        const {name, email, username, password} = req.body

            // User exists or not
        const user = await User.findOne(
            { $or: [{ email }, { username }] 
        });

        if(user) {return res.status(400)}

        const hashpass = await bcrypt.genSalt(10)
        const hashedPsw = await bcrypt.hash(password,hashpass)

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPsw
        })

        await newUser.save()
        if(newUser) {
            generateTokenandSetcookie(newUser._id,res)

            res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            username:newUser.username

        })}
        else {res.status(400)}

    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error", error.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const { 
            username, 
            password } = req.body;

        // Kullanıcıyı bul
        let user;
        try {
            user = await User.findOne({ username });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Internal" });
        }

        // Kullanıcı kontrolü
        if (!user) {
            return res.status(400).json({ message: "There is no such a user" });
        }

        // Şifre kontrolü
        const isPaswCorr = await bcrypt.compare(password, user.password);

        if (!isPaswCorr) {
            return res.status(400).json({ message: "Password is not correct" });
        }

        // Token oluştur ve çereze ekle
        generateTokenandSetcookie(user._id, res);

        // Başarılı cevap
        res.status(200).json({
            _id: user._id,
            name: user.username,
            email: user.email,
            username: user.username,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { signupUser, loginUser };
