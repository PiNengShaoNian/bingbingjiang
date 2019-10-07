import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon, AtBadge } from 'taro-ui'
import './index.less'
import "taro-ui/dist/style/components/icon.scss"
import "taro-ui/dist/style/components/badge.scss"

export default class OrderBar extends Component {
    render() {
        return (
            <View className={'order-bar'}>
                <AtBadge value={'1'}>
                    <View className={'icon-wrapper'}>
                        <AtIcon
                            value={'shopping-cart'}
                            className={'icon'}
                        />
                    </View>
                </AtBadge>
            </View>
        )

    }
}