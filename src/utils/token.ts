import jwt from "jsonwebtoken";

export type TokenData = {
  id: number;
  roles: string[];
};

export function getTokenFromHeader(header: string): string {
  if (!header || !header.includes("Bearer ")) return null;

  const token = header.split("Bearer ")[1];
  return token;
}

export function verifyToken(token: string): Promise<TokenData> {
  const secretJwt =
    process.env.SECRET_JWT || "goiabailuminattivoadoracomcaimbranaorelha";
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secretJwt,
      {
        algorithms: ["HS256"],
      },
      (err: jwt.VerifyErrors, decoded: TokenData) => {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
}
