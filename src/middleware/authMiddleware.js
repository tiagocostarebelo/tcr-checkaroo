import { supabase } from '../config/supabaseClient';

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized: Authorization header missing.'
        });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized: Authorization header format is "Bearer <token>".'
        })
    }

    const token = parts[1];

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error) {
            console.error('Supabase auth.getUser() error:', error.message);

            if (error.message === 'JWT expired' || error.message.toLowerCase().includes('jwt expired')) {
                return res.status(401).json({
                    success: false,
                    error: 'Unauthorized: Token has expired.'
                });
            }

            return res.status(401).json({ success: false, error: 'Unauthorized: Invalid or malformed token.' });
        }

        if (!user) {
            console.warn('Token validated but no user object returned by Supabase')
            return res.status(401).json({
                success: false,
                error: 'Unauthorized: User not found for this token'
            })
        }

        req.user = user;

        next();

    } catch (error) {
        console.error('Unexpected error in authentication middleware:', error.stack || error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error during authentication process.'
        });
    }
}

export default authMiddleware;