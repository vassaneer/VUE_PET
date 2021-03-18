<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Shop</h1>
            <h4>
              ทุกคนสามารถซื้อของต่างๆเพื่อเอาไปเลี้ยงน้อนๆได้
              โดยที่อาหารแต่ละอย่างจะมีราคา และให้ค่าสถานะที่ต่างกันไป
              ด้านล่างคือเงินของคุณ และสามารถกดเพื่อเติมเงินได้
            </h4>
            <a
              class="md-button md-success md-lg md-theme-default"
              target="_blank"
              ><div class="md-ripple">
                <div class="md-button-content">
                  <i class="fas fa-copyright"></i> {{ money }}
                </div>
              </div></a
            >
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section text-center">
        <div class="container">
          <div class="team">
            <div class="md-layout">
              <div
                v-for="item of items"
                class="md-layout-item md-medium-size-33 md-small-size-100" :key="item.name"
              >
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg1"
                        alt="Thumbnail Image"
                        class="img rounded img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      {{ item.name }}
                      <br />
                    </h4>
                    <md-card-content>
                      <p>
                        ลดความหิว = {{ item.hungry }} เพิ่มความสุข =
                        {{ item.mental }}
                      </p>
                      <!-- <p>คุณมีจำนวน : 0 แก้ว</p> -->
                    </md-card-content>
                    <md-card-actions class="text-center">
                      <button
                        data-v-573a91af=""
                        type="button"
                        class="md-button md-success md-sm md-theme-default"
                        v-on:click="buy(item.id)"
                      >
                        <div class="md-ripple">
                          <div class="md-button-content">
                            1 แก้ว = {{ item.price }} coin
                          </div>
                        </div>
                      </button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
require('dotenv').config()
export default {
  data() {
    return {
      name: null,
      email: null,
      message: null,
      items: this.shop_all,
      money: null,
      id: null
    };
  },
  async created() {
    // check is have token
  console.log( process.env.VUE_APP_API_HOST)
    await axios
      .get(
         process.env.VUE_APP_API_HOST+"/api/shop/all",
        {},
        { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
      )
      .then(response => {
        this.items = response.data.shop;
        console.log("done");
      })
      .catch(error => {
        console.log(error);
      });
    this.id = await localStorage.getItem("id");
    await axios
      .post(
        process.env.VUE_APP_API_HOST+"/api/money",
        qs.stringify({ user_id: this.id }),
        { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
      )
      .then(async response => {
        this.money = response.data.money;
        console.log("done");
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    buy: function(_shop_id) {
      console.log(_shop_id);

      axios
        .post(
          process.env.VUE_APP_API_HOST+"/api/shop/select",
          qs.stringify({
            user_id: this.id,
            shop_id: _shop_id
          }),
          { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
        )
        .then(response => {
          console.log(response);
          if (response.data.message == "fail") {
            alert("Money not enough");
          } else {
            this.$router.replace("/Shop");
          }
          location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bgshop-01.png")
    },
    teamImg1: {
      type: String,
      default: require("@/assets/img/milk.jpg")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/kendall.jpg")
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

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
