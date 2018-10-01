 
 
module.exports = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/')
    }
 
    next()
}


// module.exports = (req, res, next) => {
//     if (req.session.userId) {
//         next();
//     }
// }


// module.exports = (req, res, next) => {
//     console.log(req.session)
//     }