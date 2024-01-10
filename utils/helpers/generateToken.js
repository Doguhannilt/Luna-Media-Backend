import jwt from 'jsonwebtoken'
const generateTokenandSetcookie = (userId, res) => {
    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 1000,
        sameSite: 'strict' // CSRF
    })

    return token;
}


/*
What is CSRF?
Cross-site request forgery (also known as CSRF)
 is a web security vulnerability that allows an attacker 
 to induce users to perform actions that they do not intend to perform. 
 It allows an attacker to partly circumvent the same origin policy,
 which is designed to prevent different websites from interfering with each other.
*/
export default  generateTokenandSetcookie