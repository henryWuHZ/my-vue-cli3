import http from '@/config/http'

export const login = queryParams => {
    return http.post('/api/user/signIn', queryParams)
}
