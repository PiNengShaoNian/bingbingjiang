import Taro from '@tarojs/taro'

export const BASE_URL = 'http://127.0.0.1:3001'

export const getDishes = () => {
    return Taro.request({
        url: `${BASE_URL}/dish/list`,
        header: {
            'content-type': 'application/json'
        }
    })
        .then(res => {
            return res.data
        })
}

export const submitOrder = (order) => {
    return Taro.request({
        url: `${BASE_URL}/order/submit`,
        header: {
            'content-type': 'application/json'
        },
        method: 'POST',
        data: {
            order
        }
    })
    .then(res => {
        return res.data
    })
}

export const checkOrderStatus = (id) => {
    return Taro.request({
        url: `${BASE_URL}/order/check`,
        method: 'GET',
        data: {
            id
        }
    })
    .then(res => {
        return res.data
    })
}