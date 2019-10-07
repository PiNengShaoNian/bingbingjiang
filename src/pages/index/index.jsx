import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, ScrollView, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import OrderBar from './components/OrderBar'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'
import "taro-ui/dist/style/components/flex.scss"

const remEequalPx = 16

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)

    this.state = {
      activeCategoryItem: 0,
      scrollTop: 0,
      categories: [{
        title: '时光鸡',
        dishes: [{
          name: '时光大鸡排',
          desc: '咬一口就让你记住他 核心卖点：甄选专供日本出口的三代育饲跑...',
          url: require('@/assets/image/1.jpg')
        }, {
          name: '时光大鸡排',
          desc: '咬一口就让你记住他 核心卖点：甄选专供日本出口的三代育饲跑...',
          url: require('@/assets/image/1.jpg')
        }, {
          name: '时光大鸡排',
          desc: '咬一口就让你记住他 核心卖点：甄选专供日本出口的三代育饲跑...',
          url: require('@/assets/image/1.jpg')
        }, {
          name: '时光大鸡排',
          desc: '咬一口就让你记住他 核心卖点：甄选专供日本出口的三代育饲跑...',
          url: require('@/assets/image/1.jpg')
        }, {
          name: '时光大鸡排',
          desc: '咬一口就让你记住他 核心卖点：甄选专供日本出口的三代育饲跑...',
          url: require('@/assets/image/1.jpg')
        }, {
          name: '时光大鸡排',
          desc: '咬一口就让你记住他 核心卖点：甄选专供日本出口的三代育饲跑...',
          url: require('@/assets/image/1.jpg')
        }, {
          name: '时光大鸡排',
          desc: '咬一口就让你记住他 核心卖点：甄选专供日本出口的三代育饲跑...',
          url: require('@/assets/image/1.jpg')
        },]
      }, {
        title: '奶霸',
        dishes: [{
          name: '超级奶霸',
          url: require('@/assets/image/2.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '超级奶霸',
          url: require('@/assets/image/2.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '超级奶霸',
          url: require('@/assets/image/2.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '超级奶霸',
          url: require('@/assets/image/2.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '超级奶霸',
          url: require('@/assets/image/2.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '超级奶霸',
          url: require('@/assets/image/2.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '超级奶霸',
          url: require('@/assets/image/2.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '超级奶霸',
          url: require('@/assets/image/2.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '超级奶霸',
          url: require('@/assets/image/2.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '超级奶霸',
          url: require('@/assets/image/2.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        },]
      }, {
        title: '奶冰',
        dishes: [{
          name: '草莓奶冰',
          url: require('@/assets/image/3.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '草莓奶冰',
          url: require('@/assets/image/3.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '草莓奶冰',
          url: require('@/assets/image/3.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '草莓奶冰',
          url: require('@/assets/image/3.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '草莓奶冰',
          url: require('@/assets/image/3.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '草莓奶冰',
          url: require('@/assets/image/3.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '草莓奶冰',
          url: require('@/assets/image/3.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '草莓奶冰',
          url: require('@/assets/image/3.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        }, {
          name: '草莓奶冰',
          url: require('@/assets/image/3.jpg'),
          desc: '绵绵奶冰,新鲜水果搭配纯真炼乳满满的事令浆果成就了这份奶冰浪漫，优雅甜蜜'
        },]
      }]
    }

    this.categoryesHeightMap = this.getCategoriesHeightMap(this.state.categories)
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

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  render() {
    const { scrollTop } = this.state
    return (
      <View className={'index-page-wrapper'}>
        <View className={'top-bar'}>
          <View>桌台 桌内点餐1号/1位</View>
        </View>
        <View className={'index-content at-row'}>
          <ScrollView
            className={'nav at-col at-col-3'}
            scrollY
          >
            {this.state.categories.map((v, i) => (
              <View
                className={'category active'}
                className={i === this.activeCategoryItem
                  ? 'category active'
                  : 'category'}
                key={v.title}
                data-index={i}
                onClick={this.handleCategoryItemClick}
              >
                {v.title}
              </View>
            ))}
          </ScrollView>
          <ScrollView
            className={'dishes at-col at-col-9'}
            scrollY
            scrollWithAnimation
            scrollTop={scrollTop}

            onScroll={this.onScroll}
          >
            {this.state.categories.map(v => (
              <View key={v.title}>
                <View className={'category-name'}>- {v.title}</View>
                {v.dishes.map(v => (
                  < View className={'dish at-row'} key={v.name}>
                    <Image
                      src={v.url}
                      className={'dish-img at-col'}
                    />
                    <View className={'desc at-col at-col-7'}>
                      <View className={'name'}>{v.name}</View>
                      <View className={'text'}>{v.desc}</View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
        <OrderBar />
      </View >
    )
  }
}

export default Index
