export interface AdminSession {
  isAdmin: boolean;
  role?: string;
}

export interface JWTPayload {
  role: string;
  iat?: number;
  exp?: number;
}

export interface LoginCredentials {
  password: string;
}
