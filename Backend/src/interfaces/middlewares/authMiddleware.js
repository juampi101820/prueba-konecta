const jwt = require('jsonwebtoken');

// Revision de JWT
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Token de autenticacion requerido' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: payload.id,
            usuario: payload.usuario,
            roles: payload.roles
        };
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token invalido o expirado' });
    }
};

module.exports = authMiddleware;
