import jwt from 'jsonwebtoken';

export const signJwt = (payload: any) => {
  try{
    const secret = process.env.JWT_SECRET;
    if(!secret) return null;

    const signedToken = jwt.sign(payload, secret, { expiresIn: '30m' });
    return signedToken;
  }
  catch(e) {
    console.log(`ERROR IN SIGNING JWT - ${e}`);
    return null;
  }
}

export const verifyJwt = (payload: any) => {
  try{
    const secret = process.env.JWT_SECRET;
    if(!secret) return null;

    const decodedToken = jwt.verify(payload, secret);
    return decodedToken;
  }
  catch(e) {
    console.log(`ERROR IN VERIFING JWT - ${e}`);
    return null;
  }
}