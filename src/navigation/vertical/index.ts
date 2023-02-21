// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'خانه',
      path: '/home',
      icon: 'mdi:home-outline',
    },
    {
      title: 'افزودن دوره',
      path: '/addcourse',
      icon: 'mdi:file-outline',
    },
    {
      title: 'افزودن درس',
      path: '/addlesson',
      icon: 'mdi:file-outline',
    },

  ]
}

export default navigation
