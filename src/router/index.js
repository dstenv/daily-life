import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ShowView from '../views/Show/ShowView.vue'
import SearchView from '../views/SearchView.vue'
import Recommended from '../views/HomeView/RecommendedView.vue'
import MyHome from '../views/HomeView/MyHome.vue'
import MovieView from '../views/MovieView/MovieView.vue'
import MyView from "../views/MyView.vue";

import PopularMovies from "../views/MovieView/PopularMovies.vue";
import ComingSoon from "../views/MovieView/ComingSoon.vue";
import HitMoviesView from '../views/HomeView/HitMoviesView.vue'
import LoginView from "../views/MovieView/LoginView.vue";
import CalendarView from '../views/HomeView/CalendarView.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '',
    redirect:{
        name: "home",
        path: "/home",
    }
  },
  {
    path: '/show',
    name: 'show',
    component: ShowView,
  },
  {
    path: '/show/toppage',
    name: 'toppage',
    component: () => import('../views/Show/TopPage/TopPage.vue'),
    meta: {
      hiddenBar: true
    }
  },
  {
    path: '/show/detail',
    name: 'showdetail',
    component: () => import('../views/Show/Detail/ShowDetail.vue'),
    meta: {
      hiddenBar: false
    }
  },
  {
    path: '/brandpage',
    name: 'brandpage',
    component: () => import('../views/Show/brandPage/BrandHome.vue'),
    meta: {
      hiddenBar: true
    }
  },
  {
    path: '/artistpage',
    name: 'artistpage',
    component: () => import('../views/Show/atistPage/ArtistPage.vue'),
    meta: {
      hiddenBar: true
    }
  },
  {
    path: '/ticketpage',
    name: 'ticketpage',
    component: () => import('../views/Show/ticketList/TicketPage.vue'),
    meta: {
      hiddenBar: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta:{hiddenTop: true,hiddenBar: true}
  },
  {
    path: '/home',
    name: 'home',
    component: Recommended,
    meta: {
      hiddenBar: false,
    }
  },

  {
    path: '/homeview/:id',
    name: 'homeview',
    component: MyHome,
    meta: {
      hiddenBar: true
    }
  },
  {
    path: '/movie',
    name: 'movie',
    component: MovieView,
    
  },
  {
    path: '/sel',
    name: 'sel',
    component: MovieView
  },
  {
    path: '/my',
    name: 'my',
    component: MyView
  },

  {
    path: '/popularmovies',
    name: 'popularmovies',
    component: PopularMovies
  },

  {
    path: '/comingsoon',
    name: 'comingsoon',
    component: ComingSoon
  },
  {
    path: '/HitMoviesView',
    name: 'hitmoviesview',
    component: HitMoviesView,
    meta: {
      hiddenBar: true
    }
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    component: LoginView,
    meta: {
      hiddenBar: true
    }
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('../views/CityView.vue'),
    meta:{hiddenTop: true,hiddenBar: true}
  },
    {
    path: '/cinema',
    name: 'cinema',
    component: () => import('../views/CinemaView.vue'),
    meta:{hiddenTop: true,hiddenBar: true,}
  },
  {
     path: '/showncinema',
     name: 'showncinema',
     component: () => import('@/views/ShownCinema.vue'),
     meta: {
      hiddenBar: true,
      keepAlive: false,
     }
     },
  {
    path: '/CalendarView',
    name: 'calendarview',
    component: CalendarView,
    meta: {
      hiddenBar: true
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
