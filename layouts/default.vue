<template> 
  <div class="app-layout">
    <div class="sidebar">
      <p>チャンネル一覧</p>
      <input type="text" placeholder="チャンネルの追加" v-model="name" v-if="isAuthenticated" v-on:keydown.enter="addMessage">
      <input type="text" placeholder="チャンネルの追加" v-model="name" v-else v-on:click="openLoginModal">
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="30%">
        <div class="image-container">
          <img src="~/assets/btn_google_signin_light_normal_web@2x.png" v-on:click="login"/>
        </div>
    </el-dialog>
      <p v-for="(channel,index) in channels" :key="index" >
        <nuxt-link :to="`/channels/${channel.id}`" class="link">{{ channel.name }}</nuxt-link>
      </p>
      <p v-if="isAuthenticated" class="logout" v-on:click="logout">ログアウト</p>
    </div>
    <div class="main-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { db,firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      channels: [],
      name:null,
      dialogVisible: false,
    }
  },
  computed: {
    isAuthenticated() {
        return this.$store.getters.isAuthenticated
      }
  },
  methods: {
    ...mapActions(['setUser']),
      addMessage(event) {
        if (this.keyDownedForJPConversion(event)) { return }
        const channelId = this.$route.params.id
        db.collection('channels').add({
          name:this.name,
          createdAt: new Date().getTime(),
        }).then(() => {
          this.name = null
        })
      },
      keyDownedForJPConversion (event) {
          const codeForConversion = 229
          return event.keyCode === codeForConversion
      },
       openLoginModal(){
        this.dialogVisible = true
      },
      login() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const user = result.user
          this.setUser(user)
          console.log(this.$store.state.user)
          this.dialogVisible = false
        }).catch((error) => {
          window.alert(error)
        })
      },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null)
          window.alert('ログアウトに成功！')
        }).catch((e) => {
          window.alert('ログアウトに失敗しました')
          console.log(e)
        })
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user)
        db.collection('profiles').doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
       })
      }
    })
    // db.collection('channels').get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //        this.channels.push({id: doc.id, ...doc.data()})

    //     })
    //   })
    db.collection('channels').orderBy('createdAt')
      .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
              const doc = change.doc
              if (change.type === 'added') {
                  this.channels.push({id: doc.id, ...doc.data()})
              }
          })
      })
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.app-layout {
 display: flex;
}

.sidebar {
 width: 300px;

 /* ここを変更 */
 background: #4A4141;

 height: 100vh;
 padding: 20px;
 color: #DDDDDD;
 overflow: scroll;
}
.sidebar p {
  
  padding-top: 4px;
}
.link{
  color: #DDDDDD;
}

.main-content {
 width: 100%;

 /* ここを変更 */
 background: #F1F1F1;

 height: 100vh;
}
.logout {
  position: absolute;
  bottom: 10px;
  cursor: pointer;
}
.image-container {
 display: flex;
 justify-content: center;
}
img {
 width: 70%;
 cursor: pointer;
}
</style>
