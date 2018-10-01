module.exports = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

// module.exports = (req, res) => {
//     if(req.session.user)
//     {
//         req.session.destroy(() => {
//             req.clearCookie('cookie-name');
//             res.redirect('/')
//         })
//     }
//     }