import Taro, { Component } from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'
import { getDishes, BASE_URL } from '../../api'
import { connect } from '@tarojs/redux'
import { debounce } from 'lodash'
import {
  setCategoryBadges as action_setCategoryBadges,
  setOrder as action_setOrder
} from '../../actions'
import NoData from '../../base/NoData'
import Dish from '../../base/Dish'
import './index.less'

@connect(
  ({ categoryBadges, order }) => ({
    categoryBadges,
    order
  }),
  (dispatch) => ({
    setCategoryBadges(badges) {
      dispatch(action_setCategoryBadges(badges))
    },
    setOrder(order) {
      dispatch(action_setOrder(order))
    }
  })
)
class Search extends Component {

  state = {
    dishes: []
  }

  componentDidMount() {
    getDishes()
      .then(res => {
        if (res.code === 0) {
          this.originDishes = res.data.list
          this.setState({
            dishes: []
          })
        }
      })
  }

  handleCancelSearchClick = () => {
    Taro.navigateBack()
  }

  handleSearchInputChange = debounce((e) => {
    const { value } = e.detail
    let nextDishes
    if (value) {
      nextDishes = this.originDishes.filter(dish => dish.name.indexOf(value) > -1)
    }
    else nextDishes = []
    this.setState({
      dishes: nextDishes
    })
  }, 200)

  componentDidShow() {
    Taro.setNavigationBarTitle({
      title: '搜索'
    })
  }

  handleAddOrderBtnClick = (dish, category) => {
    const { categoryBadges, order } = this.props
    let prevBadge = categoryBadges[category] || 0
    let nextOrder = {
      ...order,
      [dish.name]: {
        ...dish,
        count: (order[dish.name] && order[dish.name].count || 0) + 1,
        category: category
      },
    }

    this.props.setOrder(nextOrder)

    this.props.setCategoryBadges({
      ...categoryBadges,
      [category]: ++prevBadge
    })
  }

  render() {
    const { dishes } = this.state

    return (
      <View className='search-page'>
        <View className='search-input'>
          <Input
            type='text'
            className='input'
            placeholder='请输入菜名'
            onInput={this.handleSearchInputChange}
          />
          <Text className='cancel-search' onClick={this.handleCancelSearchClick}>取消</Text>
        </View>
        <NoData isShow={dishes.length === 0 ? true : false} />
        <View className='search-dishes'>
          {dishes.map(dish => (
            <Dish
              dish={dish}
              key={dish._id}
              onAddToOrderBtnClick={this.handleAddOrderBtnClick}
            />
          ))}
        </View>
      </View>
    )
  }
}

export default Search