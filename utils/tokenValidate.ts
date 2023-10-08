import jwtDecode from "jwt-decode";

export function tokenValidate(token: string) {
  
  if (!token) return false;

  const decoded = jwtDecode<{ exp: number, iat: number }>(token);

  if (!decoded)
    return false;

  if (new Date(decoded.exp * 1000) > new Date())
    return true;

  return false;

}