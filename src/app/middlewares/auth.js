/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

function authMiddleware(request, response, next) {
    const authToken = request.headers.authorization;

    console.log("TOKEN RECEBIDO:", authToken);
    console.log("HEADERS RECEBIDOS:", request.headers);
    console.log("REQUEST USER ID:", request.userId);

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const tokenParts = authToken.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return response.status(401).json({ error: 'Token mal formatado' });
    }

    const token = tokenParts[1];

    try {
        const decoded = jwt.verify(token, authConfig.secret);

        request.userId = decoded.id;
        request.userName = decoded.name;

        console.log("REQUEST USER ID DEPOIS DE ATRIBUIR:", request.userId);

    } catch (err) {
        return response.status(401).json({ error: 'Token inválido' });
    }

    return next();
}

export default authMiddleware;
