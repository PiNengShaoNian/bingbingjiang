import { actionTypes } from '../constants/index'

const INITIAL_STATE = {
  currentShowDish: null,
  showDish: false,
  order: {},
  categoryBadges: {}
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SHOW_DISH:
      return {
        ...state,
        currentShowDish: action.dish
      }
    case actionTypes.SET_SHOW_DISH:
      return {
        ...state,
        showDish: action.showDish
      }
    case actionTypes.SET_ORDER:
      return {
        ...state,
        order: action.order
      }
    case actionTypes.SET_CATEGORY_BADGES: 
      return {
        ...state,
        categoryBadges: action.badges
      }
    default:
      return state
  }
}
