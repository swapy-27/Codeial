module.exports.index= function(req,res){
    return res.status(200).json({
        message:'hey Iam version 2 ! cool',
        comments:{}
    })
}