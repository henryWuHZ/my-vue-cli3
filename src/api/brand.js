import http from '@/config/http'

export const addBrand = queryParams => {
    return http.post('/api/brand/add', queryParams)
}

export const deleteBrand = queryParams => {
    return http.post('/api/brand/delete', queryParams)
}

export const updateBrand = queryParams => {
    return http.post('/api/brand/edit', queryParams)
}

export const getBrands = queryParams => {
    return http.get('/api/brand/list', queryParams)
}
