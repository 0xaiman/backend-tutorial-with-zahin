function notFound(req,res){
    res.status(404).json({message:" not found"});
}

export default notFound;