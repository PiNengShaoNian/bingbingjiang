import { actionTypes } from '../constants'

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}

export const setCurrentShowDish = (dish) => {
  return {
    type: actionTypes.SET_CURRENT_SHOW_DISH,
    dish
  }
}

export const setCategoryBadges = (badges) => {
  return {
    type: actionTypes.SET_CATEGORY_BADGES,
    badges
  }
}

export const setShowDish = (showDish) => {
  return {
    type: actionTypes.SET_SHOW_DISH,
    showDish
  }
}

export const setOrder = (order) => {
  return {
    type: actionTypes.SET_ORDER,
    order
  }
}