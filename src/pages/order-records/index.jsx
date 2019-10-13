import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { checkOrderStatus } from '../../api'
import './index.less'

const tasksChunk = (arr, func, count, delay = 200) => {
  let tasks = arr.concat()
  let timer = null
  let task

  const start = () => {
    for (let i = 0; i < Math.min(count || 1, tasks.length); i++) {
      task = tasks.shift();
      func(task);
    }
  };

  return () => {
    timer = setInterval(() => {
      if (tasks.length === 0) {
        return clearInterval(timer)
      }

      start()
    }, delay);
  }
}

export default class OrderRecords extends Component {

  state = {
    orders: []
  }

  componentDidMount() {
    const orders = []
    const orderIds = Taro.getStorageSync('orders')
    tasksChunk(
      orderIds,
      (id) => {
        checkOrderStatus(id)
          .then(res => {
            if (res.code === 0) {
              orders.push(res.data.result)
              this.setState({
                orders: [...orders]
              })
            }
          })
      },
      2
    )()

  }

  componentDidShow() {
    Taro.setNavigationBarTitle({
      title: '订单记录'
    })

  }

  render() {
    const { orders } = this.state

    return (
      <View className='order-records'>
        <View className='records'>
          {orders.map(order => (
            <View className='order-record'>
              <View className='site-status'>
                <Text>冰冰酱</Text>
                <Text className={order.status === 0
                    ? 'in-process'
                    : ''}>{
                  order.status === 0
                    ? '订单待确认'
                    : '订单已完成'}</Text>
              </View>
              <View className='count-sum'>
                <View className='count'>
                  <Text>菜品数量：</Text>
                  <Text>共{order.count}件菜品</Text>
                </View>
                <View className='sum'>￥{order.sum}</View>
              </View>
              <View className='date'>
                <Text>菜品数量：</Text>
                <Text>共{order.count}件菜品</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}