import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon, AtBadge } from 'taro-ui'
import './index.less'
import "taro-ui/dist/style/components/icon.scss"
import "taro-ui/dist/style/components/badge.scss"
import "taro-ui/dist/style/components/flex.scss"

export default class OrderBar extends Component {
  showOrHide = {
    show: {
      display: 'block'
    },
    hide: {
      display: 'none'
    }
  }

  handleSelectedDishesClick = () => {
    Taro.navigateTo({
      url: '/pages/payment/index'
    })
  }

  render() {
    const { dishesCount, price } = this.props
    
    return (
      <View className='order-bar at-row'>
        <AtBadge className='at-col' value={dishesCount ? dishesCount : ''}>
          <View className='icon-wrapper'>
            <AtIcon
              value='shopping-cart'
              className='icon'
            />
          </View>
        </AtBadge>
        <View className='order-price at-col'>
          <View
            className='no-order'
            style={dishesCount > 0 ? this.showOrHide['hide'] : this.showOrHide['show']}
          >
            未选购商品
                      </View>
          <View
            className='payment'
            style={dishesCount > 0 ? this.showOrHide['show'] : this.showOrHide['hide']}
          >
            ￥{price}
          </View>
        </View>
        <View
          className='selected'
          style={dishesCount > 0 ? this.showOrHide['show'] : this.showOrHide['hide']}
          onClick={this.handleSelectedDishesClick}
        >选好了</View>
      </View>
    )
  }
}