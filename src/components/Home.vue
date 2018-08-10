<template>
  <div id="home">
    <ul class="collection with-header" id="names">
      <input class="white-text" type="text" placeholder="Filter by Name" icon="search" v-model="filter">
      <li class="collection-header"><h4>Customers</h4></li>
      <li v-for="customer in customers" v-bind:key="customer.id" class="collection-item">
        <!-- <div class="chip">{{customer.dept}}</div> -->
        {{customer.name}}: {{customer.email}}
         <router-link class="secondary-content" v-bind:to="{ name: 'view-customer', params: { customer_id: customer.customer_id }}"><i class="fa fa-eye fa-2x blue-text"></i></router-link>
      </li>
    </ul> 
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
      
  </div>
  
</template>

<script>

  import db from './firebaseInit'
  export default {
    name: 'home',
    data: function() {
      return {
        filter: '',
        customers: [],
        loading: true
      }
    },
    created () {
      db.collection('customers').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'customer_id': doc.data().customer_id,
            'name': doc.data().name,
            'dept': doc.data().dept,
            'position': doc.data().position,
            'email' : doc.data().email
          }
          this.customers.push(data)
        })
      })
    },
computed: {
    customers() {
      var customers_filtered = this.customers.filter((customer) => {
          return customer.toLowerCase().includes(this.filter.toLowerCase());
        });
       return customers_filtered;
    }
    
  }
  }


</script>



<style>
input[type=text]:not(.browser-default):focus:not([readonly])+label {
  color: #2196F3;
}
input[type=text]:not(.browser-default):focus:not([readonly]) {
      border-bottom: 1px solid #2196F3;
      box-shadow: 0 1px 0 0 #2196F3;
}
  .collection.with-header .collection-item {
    line-height: 2em;
  }
        #app {
        width: 100%;
        height: 100vh;
        background-image: url(https://source.unsplash.com/category/wallpaper/1920x1080);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }
</style>
