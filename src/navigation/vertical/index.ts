// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';



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
      icon: "mdi:add-circle-outline"
    },
    {
      title: 'افزودن درس',
      path: '/addlesson',
      icon: 'ic:round-note-add',
    },
  

  ]
}

export default navigation
