import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// Define la interfaz extendida del usuario
interface IUser {
  /**
   * Roles del usuario
   */
  roles?: string[];
  /**
   * Agregar cualquier otro campo que tú manejes
   */
  id: string; // Asegúrate de incluir el campo 'id' si lo usas en tu modelo
}

// Extiende la interfaz del módulo "next-auth"
declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    user?: {
      id: string;
      roles?: string[];
    } & DefaultSession["user"];
  }
}

// Extiende la interfaz del módulo "next-auth/jwt"
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}