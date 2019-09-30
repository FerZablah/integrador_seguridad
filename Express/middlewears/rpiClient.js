const rpiClient = async (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ','');
    if(token === process.env.RPI_SECRET){
        next();
    }
    else{
        res.status(403).send("No tienes autorización para ejecutar esta acción");
    }
}

module.exports = rpiClient;