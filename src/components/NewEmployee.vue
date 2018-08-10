<template>
  <div id="new-customer">
    <div class="container">
    <h3>New customer</h3>
    <div class="row">
    <form @submit.prevent="savecustomer" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="customer_id" required>
          <label>customer_id#</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="name" required>
          <label>Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="dept" required>
          <label>Department</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="position" required>
          <label>Position</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="email" required>
          <label>Email</label>
        </div>
      </div>
      <div class="row">
      <button type="submit" class="btn blue">Submit</button>
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
      name: 'new-customer',
      data () {
        return {
          customer_id: null,
          name: null,
          dept: null,
          position: null,
          email: null
        }
      },
      methods: {
        savecustomer () {
          db.collection('customers').add({
            customer_id: this.customer_id,
            name: this.name,
            dept: this.dept,
            position: this.position,
            email: this.email
          })
          .then(docRef => {
            console.log('Client added: ', docRef.id)
            this.$router.push('/')
          })
          .catch(error => {
            console.error('Error adding customer: ', error)
          })
        }
      }
    }
</script>
<style scoped>
input[type=text]:not(.browser-default):focus:not([readonly])+label {
  color: #2196F3;
}
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
