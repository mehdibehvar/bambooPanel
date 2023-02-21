export default {
  meEndpoint: '/api/employee',
  addCourseEndpoint: '/api/course',
  getAllTeachersEndpoint: '/api/employee/getallteachers',
  getAllLessonsEndpoint: '/api/lesson',
  loginEndpoint: '/api/auth/employee/login',
  registerEndpoint: '/api/auth/employee/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
