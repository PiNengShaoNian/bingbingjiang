import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

export default function NoData({ isShow }) {
    return (
        <View className='no-data' style={{
            display: isShow ? 'block' : 'none'
        }}>
            <Image className='no-data-img' src={require('@/assets/image/no-data.jpg')} />
        </View>
    )
}