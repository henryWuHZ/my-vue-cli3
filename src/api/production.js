import http from '@/config/http'

export const coverUpload = queryParams => {
    return http.post('/api/file/upload', queryParams)
}

export const getSelectList = queryParams => {
    return http.get('/api/goods/selectList', queryParams)
}
