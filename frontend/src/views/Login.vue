<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img :src="leaf2" alt="leaf2" class="leaf2" v-show="leafShow" />
    <div class="section section-signup page-header" :style="signupImage">
      <div class="container">
        <div class="md-layout">
            <div class="brand">
              <h1>Welcome to HappyPet</h1>
            </div>
          <div
            class="md-layout-item md-size-33 md-medium-size-40 md-small-size-50 md-xsmall-size-70 mx-auto text-center"
          >
            <login-card header-color="red">
              <h4 slot="title" class="card-title">Login</h4>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>User ID</label>
                <md-input v-model="name"></md-input>
              </md-field>
              <!-- <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field> -->
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input type="password" v-model="password"></md-input>
              </md-field>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg "
                v-on:click="checkForm"
              >
                Get Started
              </md-button>
              <md-button
                href="#/register"
                slot="footer"
                class="md-simple md-success md-lg"
              >
                Register
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>
    </parallax>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import axios from "axios";
import qs from "qs";
var validator = require("validator");
require('dotenv').config()

export default {
  components: {
    LoginCard
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/Artboard_1.png") //background
    },
    leaf2: {
      type: String,
      default: require("@/assets/img/leaf2.png")
    },
    // signup: {
    //   type: String,
    //   default: require("@/assets/img/city.jpg")
    // }
  },
  data() {
    return {
      name: null,
      password: null,
      id: null,
      leafShow: false
    };
  },
  methods: {
    checkForm: function(e) {
      // console.log(typeof(this.password))
      if (!this.name || !this.password) {
        alert("Please enter all fields");
        e.preventDefault();
      } else if (this.password.length < 8) {
        alert("Password must be at least 8 characters");
        e.preventDefault();
      }

      // else if(!validator.isEmail(this.email)){
      //   alert('Your email is invalide')
      //   e.preventDefault();
      // }
      else {
        axios
          .post(
            process.env.VUE_APP_API_HOST+"/api/login",
            qs.stringify({
              name: this.name,
              password: this.password
            }),
            {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          )
          .then(response => {
            //console.log(response)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);
            this.$emit("Logined", response.data.id);
          })
          .catch(error => {
            if (
              error.response.data.error &&
              error.response.data.error.indexOf(
                "Login failed,please check your credentials !"
              ) != -1
            )
              alert("Can not found your data!");
          });
      }
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`
      };
    }
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  }
};
</script>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
