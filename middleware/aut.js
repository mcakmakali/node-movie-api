const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null)
        return  next({ message: 'Token is required!', code: 401 }) ;
