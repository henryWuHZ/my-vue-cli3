import http from '@/config/http'

export const addModel = queryParams => {
    return http.post('/api/model/add', queryParams)
}

export const deleteModel = queryParams => {
    return http.post('/api/model/delete', queryParams)
}

export const updateModel = queryParams => {
    return http.post('/api/model/edit', queryParams)
}

export const getModels = queryParams => {
    return http.get('/api/model/list', queryParams)
}

export const getBrands = queryParams => {
    return http.get('/api/brand/opts', queryParams)
}
