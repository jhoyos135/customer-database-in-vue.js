<template>
  <div id="new-customer">
    <div class="container">
    <h3>Edit customer</h3>
    <div class="row">
    <form @submit.prevent="updatecustomer" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input disabled type="text" v-model="customer_id" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="name" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="dept" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="position" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="email" required>
        </div>
      </div>
      <div class="row">
      <button type="submit" class="btn blue">Update</button>
      <router-link to="/" class="btn grey">Cancel</router-link>
      </div>
    </form>
  </div>
    </div>

  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'edit-customer',
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
      db.collection('customers').where('customer_id', '==', to.params.customer_id).get().then((querySnapshot) => {
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
      updatecustomer () {
        db.collection('customers').where('customer_id', '==', this.$route.params.customer_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              customer_id: this.customer_id,
              name: this.name,
              dept: this.dept,
              position: this.position,
              email: this.email
            })
            .then(() => {
              this.$router.push({ name: 'view-customer', params: { customer_id: this.customer_id }})
            });
          })
        })
      }
    }
  }
</script>

<style scoped>
input[type=text]:not(.browser-default):focus:not([readonly]) {
      border-bottom: 1px solid #2196F3;
      box-shadow: 0 1px 0 0 #2196F3;
}
h3 {
  margin: 0;
}

  #new-customer {
    background-color: white;
    border-radius: 5px;
  }
  
</style>