import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtToast } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { BASE_URL, submitOrder } from '../../api'
import { setOrder as action_setOrder } from '../../actions'

import './index.less'
import "taro-ui/dist/style/components/flex.scss"
import "taro-ui/dist/style/components/nav-bar.scss"
import "taro-ui/dist/style/components/icon.scss"
import "taro-ui/dist/style/components/toast.scss";

@connect(
  ({ order }) => ({
    order
  }),
  (dispatch) => ({
    setOrder(order) {
      dispatch(action_setOrder(order))
    }
  })
)
export default class Payment extends Component {

  state = {
    repastType: 0,
    isOpenSubmitOrderSuccessToast: false
  }

  handleSwitchItemClick(type) {
    this.setState({
      repastType: type
    })
  }

  handleBackIconClick = () => {
    Taro.navigateBack()
  }

  getOrderDishesInfo = () => {
    const { order } = this.props

    let dishesCount = 0
    let price = 0

    Object.keys(order).forEach(v => {
      dishesCount += order[v].count
      price += order[v].price * order[v].count
    })

    return { dishesCount, price }
  }

  handleSubmitOrderClick = () => {
    const { order } = this.props
    submitOrder(order)
      .then(res => {
        if (res.code === 0) {
          const orders = Taro.getStorageSync('orders') || []
          orders.push(res.data.result._id)
          Taro.setStorageSync('orders', orders)
          this.setState({
            isOpenSubmitOrderSuccessToast: true
          })

          this.props.setOrder({})
        }
      })
  }

  componentDidShow() {
    Taro.setNavigationBarTitle({
      title: '提交订单'
    })
  }

  handleOrderRecordsClick = () => {

  }

  render() {
    const { repastType, isOpenSubmitOrderSuccessToast } = this.state
    const { order } = this.props
    return (
      <View className='payment-page' >
        <View></View>
        <View className='repast-type'>
          <View className='text'>
            选择就餐方式
                    </View>
          <View className='switches'>
            <View
              className={repastType === 0
                ? 'switch-item active'
                : 'switch-item'}
              onClick={() => this.handleSwitchItemClick(0)}
            >
              食堂
            </View>
            <View
              className={repastType === 1
                ? 'switch-item active'
                : 'switch-item'}
              onClick={() => this.handleSwitchItemClick(1)}
            >
              外带
           </View>
          </View>
        </View>

        <View className='order-detail'>
          {Object.keys(order).map(dishName => (
            <View className='dish' key={dishName}>
              <Image className='image' src={`${BASE_URL}/${order[dishName].imgUrls[0]}`} />
              <View className='name-count'>
                <View className='name'>{dishName}</View>
                <View className='count'>数量: {order[dishName].count}</View>
              </View>
              <View className='sum'>￥{order[dishName].price * order[dishName].count}</View>
            </View>
          ))}
          <View className='aggregate'>
            小计 ￥<Text className='price-text'>{this.getOrderDishesInfo().price}</Text>
          </View>
        </View>

        <View className='bottom-btn'>
          <View className='bottom-text'>
            ￥<Text style={{ fontSize: '1.2rem' }}>{this.getOrderDishesInfo().price}</Text>
          </View>
          <View className='btn' onClick={this.handleSubmitOrderClick}>提交订单</View>
        </View>
        <AtToast isOpened={isOpenSubmitOrderSuccessToast} duration={1800} text="订单提交成功" status='success' />
      </View>
    )
  }
}