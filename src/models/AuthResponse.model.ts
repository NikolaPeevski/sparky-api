export default class AuthResponse {
  public tokenType: string;

  public token: string;

  public expiresAt: Date;

  public refreshToken: string;

  constructor(tokenType: string, token: string, expiresAt: Date, refreshToken: string) {
    this.tokenType = tokenType;
    this.token = token;
    this.expiresAt = expiresAt;
    this.refreshToken = refreshToken;
  }
}
