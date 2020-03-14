const jwt = require('jsonwebtoken');
const db = require('../config/db');



let tokenVerification = (req, res, next) => {


    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        const { correo } = decoded.usuario;

        db.query('SELECT * FROM usuarios WHERE correo = $1', [correo], (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            if (results.rowCount <= 0) {
                return res.status(400).json({
                    error: 'Usuario no encontrado'
                });
            }

            req.usuario = results.rows[0];
            next();
        });


    })

};



module.exports = {
    tokenVerification
};
