import { Tabbar, TabbarItem,Calendar , NavBar, Search, Swipe, SwipeItem,Lazyload,Toast, Rate, Popup, Overlay, Icon, PullRefresh, Sticky, IndexBar, IndexAnchor, Cell } from 'vant'

const UIComponents = [
    Tabbar, TabbarItem, NavBar, Search, Swipe, SwipeItem,
    Lazyload, Toast, Rate, Popup, Overlay, Icon, PullRefresh, Sticky,
    Search,IndexBar, IndexAnchor, Cell,Calendar ,
]


const VantUIPlugin = {};

VantUIPlugin.install = function (Vue) {

    UIComponents.forEach(Component => {

        Vue.use(Component)

    })

}

export default VantUIPlugin