import http from '@/config/http'

export const login = queryParams => {
  return http.get('/signIn', queryParams)
}
