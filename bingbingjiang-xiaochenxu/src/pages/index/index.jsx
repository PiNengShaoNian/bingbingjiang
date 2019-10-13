import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtFloatLayout, AtIcon } from 'taro-ui'
import OrderBar from './components/OrderBar'
import Dish from '../../base/Dish'
import {
  setCurrentShowDish as action_setCurrentShowDish,
  setShowDish as action_setShowDish,
  setOrder as action_setOrder,
  setCategoryBadges as action_setCategoryBadges
} from '../../actions'
import { getDishes, BASE_URL } from '../../api'
import './index.less'
import "taro-ui/dist/style/components/flex.scss"
import "taro-ui/dist/style/components/float-layout.scss"
import "taro-ui/dist/style/components/badge.scss"
import "taro-ui/dist/style/components/icon.scss"

const remEequalPx = 16
const processDishes = (data) => {
  const result = []
  data.reduce((accumulator, dish) => {
    let category = accumulator.find((v => {
      return dish.category === v.title
    }))
    if (!category) {
      category = {
        title: dish.category,
        dishes: []
      }

      accumulator.push(category)
    }

    category.dishes.push(dish)

    return accumulator
  }, result)
  return result
}

@connect(({ showDish, currentShowDish, order, categoryBadges }) => ({
  showDish,
  currentShowDish,
  order,
  categoryBadges
}),
  (dispatch) => ({
    setShowDish(showDish) {
      dispatch(action_setShowDish(showDish))
    },
    setCurrentShowDish(dish) {
      dispatch(action_setCurrentShowDish(dish))
    },
    setOrder(order) {
      dispatch(action_setOrder(order))
    },
    setCategoryBadges(categoryBadges) {
      dispatch(action_setCategoryBadges(categoryBadges))
    }
  })
)
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)

    this.state = {
      activeCategoryItem: 0,
      scrollTop: 0,
      categories: []
    }

  }

  componentDidMount() {
    getDishes()
      .then(res => {
        if (res.code === 0) {
          const result = processDishes(res.data.list)
          this.setState({
            categories: result
          })
          this.categoryesHeightMap = this.getCategoriesHeightMap(result)
        }
      })


  }

  componentDidShow() {
    if (!Object.keys(this.props.order).length) {
      this.props.setCategoryBadges({})
    }
  }

  getCategoriesHeightMap = (categories) => {
    const map = categories.map(v => {
      return remEequalPx + 8 * remEequalPx * v.dishes.length
    })
    map.forEach((v, i) => {
      map[i] = v + (map[i - 1] || 0)
    })
    return map
  }

  onScroll = (e) => {
    const { scrollTop } = e.detail

    const heightMap = this.categoryesHeightMap.slice()

    if (!heightMap.includes(scrollTop)) heightMap.push(scrollTop)
    else return

    let activeIndex = heightMap
      .sort((v1, v2) => v1 - v2)
      .findIndex(v => v === scrollTop)

    this.setState({
      activeCategoryItem: activeIndex,
    })
  }

  handleCategoryItemClick = (e) => {
    const { target: { dataset: { index = 0 } } } = e
    this.setState({
      activeCategoryItem: index,
      scrollTop: this.categoryesHeightMap[index - 1] || 0
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

  handleDishItemClick = (dish) => {
    this.props.setCurrentShowDish(dish)
    this.props.setShowDish(true)
  }

  handleDishModalClose = () => {
    this.props.setShowDish(false)
  }

  showOrHide = {
    show: {
      display: 'block'
    },
    hide: {
      display: 'none'
    }
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

  handleNavigateToSearchPageClick = () => {
    Taro.navigateTo({
      url: '/pages/search/index'
    })
  }

  handleOrderRecordsClick = () => {
    Taro.navigateTo({
      url: '/pages/order-records/index'
    })
  }

  render() {
    const { scrollTop } = this.state
    const { showDish, currentShowDish, categoryBadges } = this.props

    return (
      <View className='index-page-wrapper' >
        <View className='top-bar'>
          <View>
            <AtIcon value='alert-circle' size='17' />
            <Text style={{ marginLeft: '10PX' }}>桌台 桌内点餐1号/1位</Text>
            <View className='top-bar-left'>
              <AtIcon value='search' onClick={this.handleNavigateToSearchPageClick} size='20' />
              <AtIcon value='bullet-list' onClick={this.handleOrderRecordsClick} size='20' />
            </View>
          </View>
        </View>
        <View className='index-content at-row'>
          <ScrollView
            className='nav at-col at-col-3'
            scrollY
          >
            {this.state.categories.map((v, i) => (
              <View
                className={i === this.activeCategoryItem
                  ? 'category active'
                  : 'category'}
                key={v.title}
                data-index={i}
                onClick={this.handleCategoryItemClick}
              >
                {v.title}
                <View
                  className='category-badge'
                  style={categoryBadges[v.title]
                    && categoryBadges[v.title] > 0
                    ? this.showOrHide.show
                    : this.showOrHide.hide
                  }>
                  {categoryBadges[v.title]}
                </View>
              </View>
            ))}
          </ScrollView>
          <ScrollView
            className='dishes at-col at-col-9'
            scrollY
            scrollWithAnimation
            scrollTop={scrollTop}
            onScroll={this.onScroll}
          >
            {this.state.categories.map(category => (
              <View key={category.title}>
                <View className='category-name'>- {category.title}</View>
                {category.dishes.map(dish => (
                  <Dish
                    dish={dish}
                    key={dish._id}
                    onAddToOrderBtnClick={this.handleAddOrderBtnClick}
                    onDishItemClick={this.handleDishItemClick}
                  />
                ))}
              </View>
            ))}
            <View style={{ height: '5rem' }} />
          </ScrollView>
        </View>
        <OrderBar {...this.getOrderDishesInfo()} />
        <AtFloatLayout
          isOpened={showDish}
          onClose={this.handleDishModalClose}
          className='dish-modal'
        >
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            style={{
              height: '30vh',
              marginBottom: '1rem'
            }}
            autoplay>
            {
              currentShowDish.imgUrls.map(url => (
                <SwiperItem  key={url}>
                  <View className='swiper-slide'>
                    <Image className='slide-img' src={`${BASE_URL}/${url}`} className='image' />
                  </View>
                </SwiperItem>
              ))
            }
          </Swiper>
          <View className='price-btn at-row'>
            <Text className='price at-col'>￥{currentShowDish.price}</Text>
            <View className='add-to-order at-col at-col__offset-8'>
              <View
                className='icon'
                onClick={() => this.handleAddOrderBtnClick(currentShowDish, currentShowDish.category)}
              >
                +
              </View>
            </View>
          </View>
          <View>
            <View className='name'>{currentShowDish.name}</View>
            <View className='desc'>{currentShowDish.desc}</View>
          </View>
        </AtFloatLayout>
      </View >
    )
  }
}

export default Index
