const path = require('path')
const Post = require('../database/models/post')

module.exports = (req, res) => {
var query = {_id:req.params.id}


let { title, description, content } = req.body;
Post.update(query, { title, description, content }, function(err, post) {
if(err){
console.log(err)
return;
} else{
res.redirect("/");
}
})
}