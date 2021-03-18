<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="red">
              <h4 slot="title" class="card-title">Register</h4>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>User ID</label>
                <md-input v-model="name"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input type="password" v-model="password"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Confirm Password...</label>
                <md-input type="password" v-model="confirmpassword"></md-input>
              </md-field>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                v-on:click="checkForm"
              >
                <h3 style="color:red">Get Started</h3>
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import axios from "axios";
import qs from "qs";
var validator = require("validator");

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmpassword: null
    };
  },
  methods: {
    checkForm: function(e) {
      // console.log(typeof(this.password))
      if (
        !this.name ||
        !this.email ||
        !this.password ||
        !this.confirmpassword
      ) {
        alert("Please enter all fields");
        e.preventDefault();
      } else if (!validator.isEmail(this.email)) {
        alert("Your email is invalide");
        e.preventDefault();
      } else if (this.password != this.confirmpassword) {
        alert("Passwords do not match");
      } else {
        axios
          .post(
            "http://192.168.43.57:5000/api/register",
            qs.stringify({
              name: this.name,
              email: this.email,
              password: this.password
              //confirmpassword:this.confirmpassword
            }),
            {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          )
          .then(response => {
            this.$router.replace("/home");
            console.log("done");
          })
          .catch(error => {
            console.log(error.response.data.message.message);
            console.log("-----------------------------");
            console.log(error.response.data.message.errmsg);

            if (
              error.response.data.message.message &&
              error.response.data.message.message.indexOf(
                "E11000 duplicate key error collection: myFirstDatabase.users index: name_1 dup key"
              ) != -1
            )
              alert("name is already existed");

            if (
              error.response.data.message.message &&
              error.response.data.message.message.indexOf(
                "User validation failed: password: Path `password`"
              ) != -1
            )
              alert("password required length (8)");

            if (
              error.response.data.message.errmsg &&
              error.response.data.message.errmsg.indexOf(
                "E11000 duplicate key error collection:"
              ) != -1
            )
              alert("email is already existed");
          });
      }
    }
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/Artboard_8.png")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="css"></style>
