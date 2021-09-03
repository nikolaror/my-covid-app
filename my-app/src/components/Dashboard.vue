<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
          <div class="row">
            <div class="col-md-12">
                <UserForm @createFast="generateFast($event)" @createPcr="generatePcr($event)" />
            </div>
          </div>
    </div>
    <div class="row mrgnbtm">
        <Users v-if="users.length > 0" :users="users" />
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import UserForm from './UserForm.vue'
import Users from './Users.vue'
import { getAllUsers, generateFastTest, generatePcrTest } from '../services/UserService'

export default {
  name: 'Dashboard',
  components: {
    Header,
    UserForm,
    Users
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0
      }
  },
  methods: {
    getAllUsers() {
      getAllUsers().then(response => {
        console.log(response)
        this.users = response
        this.numberOfUsers = this.users.length
      })
    },
    generateFast(data) {
      generateFastTest(data).then(response => {
        let blob = new Blob([response], { type: response.type })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = data.FirstName+'_'+data.LastName+"_Covid.pdf"
        document.body.appendChild(link)
        link.click()
      })
      .catch(error => {
         console.log(error);
          throw new Error(error);
       });
    },
    generatePcr(data) {
      generatePcrTest(data).then(response => {
        let blob = new Blob([response], { type: response.type })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = data.FirstName+'_'+data.LastName+"_PCR.pdf"
        document.body.appendChild(link)
        link.click()
      })
      .catch(error => {
         console.log(error);
          throw new Error(error);
       });
    }
  },
  mounted () {
    //this.getAllUsers();
  }
}
</script>