/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth'

function authMiddleware(request, response, next) {
    const authToken = request.headers.authorization;

    console.log("TOKEN RECEBIDO:", authToken)
    console.log("HEADERS RECEBIDOS:", request.headers); // Debug
    console.log("REQUEST USER ID:", request.userId); // Debug

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' });
    }
    const tokenParts = authToken.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return response.status(401).json({ error: 'Token mal formatado' });
    }

    const token = tokenParts[1];

    try {
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                throw new Error();
            }

            request.userId = decoded.id;
            request.userName = decoded.name;

            console.log("REQUEST USER ID DEPOIS DE ATRIBUIR:", request.userId);
            
            next()
        })
    } catch (err) {
        return response.status(401).json({ error: 'Token is valid' })
    }
}

export default authMiddleware