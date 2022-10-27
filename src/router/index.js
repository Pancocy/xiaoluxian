import { createRouter ,createWebHashHistory } from "vue-router";
import {useUserStore} from '../store/user'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
// import Show from '../components/Show.vue'
// import Detail from '../components/Detail.vue'
import Blog from '../components/Blog.vue'
import Class from '../components/Class.vue'
import courseDeatile from '../views/courseDetail.vue'
import Cart from '../views/cart.vue'
import Confirm from '../views/confirm.vue'
const router= createRouter({
    routes:[
        {path:'/',component:Home,name:'Home'},
        {path:'/about',component:About},
        // {path:'/detail',component:Detail},
        // {path:'/show',component:Show},
        {path:'/videoCourse/:courseId/:chapterId',component:Blog},
        {path:'/login',component:Class},
        {path:'/about/coursedetail',component:courseDeatile},
        {path:'/cart',component:Cart,
        beforeEnter:(to,from ,next)=>{
            if(useUserStore().userInfo.id){
                next()
            }else{
                next('/login')
            }
        }
        },
        {
            path:'/confirmOrder',
            component:Confirm
        }

    ],
    history:createWebHashHistory(),
})
export default router