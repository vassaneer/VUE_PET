<template>
  <div ip="app">
    <div v-if="id != null">
      <Home />
    </div>
    <div v-else>
      <Login @Logined="Logined($event)" />
    </div>
  </div>
</template>
<script>
import Login from "./Login.vue";
import Home from "./Home.vue";

export default {
  data() {
    return {
      user: {
        username: "matt"
      },
      id: null,
      token: null
    };
  },
  created() {
    this.id = localStorage.getItem("id");
    this.token = localStorage.getItem("token");
  },
  components: {
    Login,
    Home
  },
  methods: {
    Logined(value) {
      this.id = value;
      console.log(this.id);
    }
  }
};
</script>
