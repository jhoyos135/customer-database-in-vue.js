 <template>
  <nav>
      <div class="nav-wrapper indigo">
        <div class="container">
          <router-link v-if="isLoggedIn" to="/" class="brand-logo left">Hello <span class="email">{{currentUser}}</span></router-link>
          <ul class="right">
            <li v-if="isLoggedIn" ><router-link to="/">Dashboard</router-link></li>
            <li v-if="!isLoggedIn" ><router-link to="/login">login</router-link></li>
            <li v-if="!isLoggedIn" ><router-link to="/register">register</router-link></li>
            <li v-if="isLoggedIn" ><button v-on:click="logout" class="btn black">Logout</button></li>
            </ul>  
        </div>
      </div>

    </nav>

    
  </template>

  

  <script>
  import firebase from 'firebase';

  export default {
    name: 'navbar',
    data() {
      return {
        isLoggedIn: false,
        currentUser: false
      }
    },
    created() {
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
      }
    },
    methods: {
      logout: function() {
        firebase
        .auth()
        .signOut()
        .then( () => {
          this.$router.go({path: this.$router.path});
        });
      } //Logout function 
    }
  }


  </script>

  <style scoped>

  .brand-logo {
    font-size: 1.5em;
  }
  </style>
  
  