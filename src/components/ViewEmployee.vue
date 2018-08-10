<template>
  <div id="view-customer card">
    <ul class="collection with-header card-content" >
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">customer ID#: {{customer_id}}</li>
      <li class="collection-item">Department: {{dept}}</li>
      <li class="collection-item">Position: {{position}}</li>
      <li class="collection-item">Email: {{email}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deletecustomer" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-customer', params: { customer_id: customer_id }}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'view-customer',
    data () {
      return {
        customer_id: null,
        name: null,
        dept: null,
        position: null,
        email: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('customers').where('customer_id', '==', to.params.customer_id).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.customer_id = doc.data().customer_id
            vm.name = doc.data().name
            vm.dept = doc.data().dept
            vm.position = doc.data().position
            vm.email = doc.data().email
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('customers').where('customer_id', '==', this.$route.params.customer_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.customer_id = doc.data().customer_id
            this.name = doc.data().name
            this.dept = doc.data().dept 
            this.position = doc.data().position
            this.email = doc.data().email
          })
        })
      },
      deletecustomer () {
      if(confirm ('Are you sure?')) {
        db.collection('customers').where('customer_id', '==', this.$route.params.customer_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/')
            })
          })
        }
      }
    }
  }
</script>
