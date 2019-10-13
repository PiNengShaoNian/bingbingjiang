import Taro from '@tarojs/taro'
import { BASE_URL } from '../../api'
import { AtIcon } from 'taro-ui'
import './index.less'
import "taro-ui/dist/style/components/flex.scss"

export default function Dish({ dish, onAddToOrderBtnClick, onDishItemClick }) {
  return (
    <View
      className='dish-component at-row'
      key={dish.name}
      onClick={() => { onDishItemClick && onDishItemClick(dish)}}
    >
      <Image
        src={`${BASE_URL}/${dish.imgUrls[0] || ''}`}
        className='dish-img at-col'
      />
      <View className='desc at-col at-col-7'>
        <View className='name'>{dish.name}</View>
        <View className='text'>{dish.desc}</View>
        <View className='desc-bottom at-row'>
          <Text className='price at-col'>￥{dish.price}</Text>
          <View
            className='add-to-order at-col at-col__offset-4'
          >
            <View
              className='icon'
              onClick={(e) => {
                e.stopPropagation()
                onAddToOrderBtnClick(dish, dish.category)
              }}
            >
              +
          </View>
          </View>
        </View>
      </View>
    </View>
  )
}