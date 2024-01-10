import User from '../db/Models/userModel.js'
import bcrypt from "bcryptjs"
import generateTokenandSetcookie from '../utils/helpers/generateToken.js';

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

export {loginUser}