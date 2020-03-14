const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const tokenList = {}


const signup = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let cryptedPass = bcrypt.hashSync(contraseña, salt);

    const response = await db.query('INSERT INTO usuarios (nombre,correo,contraseña) VALUES ($1,$2,$3) RETURNING id', [nombre, correo, cryptedPass], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        return res.status(200).json({
            id: results.rows[0].id,
            nombre,
            correo
        });

    });

};

const login = (req, res) => {
    const { correo, contraseña } = req.body;
    db.query('SELECT * FROM usuarios WHERE correo = $1', [correo], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }


        if (results.rowCount > 0) {
            if (!bcrypt.compareSync(contraseña, results.rows[0].contraseña)) {
                return res.status(400).json({
                    ok: false,
                    error: 'Not valid usuario or contraseña'
                    
                });
            }

            const { id, nombre, correo } = results.rows[0];
            var usuario = {
                id,
                nombre,
                correo
            };

            let token = jwt.sign({usuario}, process.env.SEED, { expiresIn: Number(process.env.CADUCIDAD_TOKEN) });

            let refreshToken = jwt.sign({usuario}, process.env.SEED, { expiresIn: Number(process.env.CADUCIDAD_TOKEN) })
            const response = {
                "token": token,
                "refreshToken": refreshToken,
            };

            tokenList[refreshToken] = response

            return res.json({
                id,
                nombre,
                correo,
                token: token,
                refreshToken: refreshToken,
                expiresIn: Number(process.env.CADUCIDAD_TOKEN)
            });
        }
        else {
            return res.status(400).json({
        
                error: 'Not valid usuario or contraseña'
                
            });
        }

    });

};

const refreshToken = (req, res) => {
    const { token, refreshToken } = req.body;
    if ((refreshToken) && (refreshToken in tokenList)) {

        var decodedToken = jwt.decode(token);
        const { id, nombre, correo } = decodedToken.usuario;
        const usuario = {
            id,
            correo,
            nombre
        }
        const newToken = jwt.sign({usuario}, process.env.SEED, { expiresIn: Number(process.env.CADUCIDAD_TOKEN) })
        const response = {
            "token": newToken,
        }
        tokenList[refreshToken].token = newToken
        return res.status(200).json(response);

    } else {
        return res.status(404).json({
            error: 'Refresh token not found'
        });
    }
}

const perfil = async (req, res) => {
    var usuario = req.usuario;
    delete usuario.contraseña;
    return res.json(usuario);
};




module.exports = {
    login,
    signup,
    perfil,
    refreshToken
}