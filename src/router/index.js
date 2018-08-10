import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import ViewEmployee from '@/components/ViewEmployee';
import NewEmployee from '@/components/NewEmployee';
import EditEmployee from '@/components/EditEmployee';
import login from '@/components/Login';
import register from '@/components/Register';
import firebase from 'firebase';



Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-customer',
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:customer_id',
      name: 'view-customer',
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:customer_id',
      name: 'edit-customer',
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

//Nav Guards
router.beforeEach((to, from, next) => {
  //check from required auth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // check if not logged in
    if(!firebase.auth().currentUser) {
      //go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //proceed to route
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
    // check if not logged in
    if(firebase.auth().currentUser) {
      //go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //proceed to route
      next();
    }    
  } else {
       //proceed to route
       next();   
  }
});





export default router;



