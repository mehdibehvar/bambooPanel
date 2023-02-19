export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/api/auth/employee/login',
  registerEndpoint: '/api/auth/employee/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
