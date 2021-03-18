<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Feed Your Pets</h1>
            <h4>
              การให้อาหารทำให้ค่าความสุขเพิ่มขึ้น และค่าความหิวลดลง
              และเมื่อพวกเราเลี้ยงจนน้อนโตเต็มที่
              น้อนก็จะพัฒนาไปเป็นอีกร่างนึงได้
              ด้านล่างคือเงินของคุณกดเพื่อเติมเงินได้
              และมีจำนวนอาหารกดเพื่อดูค่าสถานะที่จะได้
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
            <p>
              <md-button v-for="item of inventory" :key="item.name">
                {{ item.name }} = {{ item.amount }}
                <md-tooltip md-direction="top"
                  ><p>ลดค่าความหิว {{ item.hungry }}</p>
                  เพิ่มค่าความสุข {{ item.mental }}</md-tooltip
                >
              </md-button>
            </p>
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
                class="md-layout-item md-medium-size-33 md-small-size-100"
                v-for="pet of pets" :key="pet.name"
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
                      {{ pet.name }}
                      <br />
                    </h4>
                    <md-card-actions class="text-center">
                      <button
                        data-v-573a91af=""
                        type="button"
                        class="md-button md-primary md-sm md-theme-default"
                        v-for="item of inventory"
                        v-on:click="feeding(pet.id, item.id)" :key="item.name"
                      >
                        <div class="md-ripple">
                          <div class="md-button-content">{{ item.name }}</div>
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
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/Artboard_6.png")
    },
    teamImg1: {
      type: String,
      default: require("@/assets/img/raccoon.gif")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/egg.gif")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/slime.gif")
    },
    teamImg4: {
      type: String,
      default: require("@/assets/img/logo.gif")
    }
  },
  data() {
    return {
      name: null,
      email: null,
      message: null,
      items: null,
      money: null,
      id: null,
      inventory: null,
      pets: null,
      connection: null
    };
  },
  async created() {
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
    await axios
      .get(
        process.env.VUE_APP_API_HOST+"/api/pet/all",
        {},
        { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
      )
      .then(response => {
        this.pets = response.data.pet;
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
    await axios
      .post(
        process.env.VUE_APP_API_HOST+"/api/inventory/all",
        qs.stringify({ user_id: this.id }),
        { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
      )
      .then(async response => {
        this.inventory = response.data.inventory;
        console.log(this.inventory);
      })
      .catch(error => {
        console.log(error);
      });

    console.log("websocket");
    this.connection = new WebSocket(process.env.VUE_APP_WEBSOCKET_HOST);
    this.connection.onopen = function(event) {
      console.log("successful");
    };
  },
  methods: {
    feeding: function(pet_id, shop_id) {
      console.log(pet_id);
      //alert("Feeded"); //ยังไม่ได้ต่อ
      console.log(this.connection);
      var msg = {
        type: "action",
        message: "API.feeding", // message {API.feeding, API.playing,}
        player_id: this.id,
        pet_id: pet_id,
        shop_id: shop_id,
        skin_id: 8
      };
      this.connection.send(JSON.stringify(msg));
      alert("Feeded"); //ให้อาหารได้หลังจากต่อไปแล้ว
      location.reload()
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  components: {}
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
