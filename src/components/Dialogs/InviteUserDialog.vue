<template>
  <div>
    <v-card-title>Procurar Usuários</v-card-title>
    <v-text-field
      v-model="searchValue"
      placeholder="Procure o e-mail"
      append-icon="mdi-magnify"
    ></v-text-field>
    <v-btn-toggle
      v-model="selectedIndex"
      class="item-field d-flex flex-column"
      style="width: 100%"
    >
      <v-btn
        v-for="item in data"
        :key="item.uid"
        height="auto"
        class="user-button"
      >
        <div class="pa-2">
          <span style="display: block">{{ item.name }}</span>
          <small>{{ item.email }}</small>
        </div>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
import firestore from "../../plugins/firebase/firestore";

export default {
  props: {
    usersList: Array,
  },
  data: () => ({
    searchValue: "",

    data: [],
    selectedIndex: null,

    waiting: false,
  }),
  computed: {
    users() {
      return firestore
        .collection("users")
        .where("email", ">=", this.searchValue.toLowerCase())
        .where("email", "<=", this.searchValue.toLowerCase() + "\uf8ff");
    },
    noShowUsers() {
      return [
        this.$store.state.currentUser.uid,
        ...this.usersList.filter((el) => el.userStatus > 0).map((el) => el.uid),
      ];
    },
    selectedValue() {
      return this.data[this.selectedIndex];
    },
    getData() {
      if (isNaN(this.selectedIndex)) return false;

      return { ...this.selectedValue, userStatus: 1 };
    },
  },

  methods: {
    async searchUsers() {
      if (this.waiting) return;

      if (this.searchValue.length > 0) {
        const response = await this.users.get();
        this.data = response.docs
          .filter((el) => !this.noShowUsers.includes(el.id))
          .map((el) => el.data());
      }
    },
    clearData() {
      this.searchValue = "";
      this.data = [];
      this.selectedIndex = null;
    },
  },

  watch: {
    searchValue(value) {
      if (value.length === 0) {
        this.data = [];
      }

      this.searchUsers();

      if (!this.waiting) {
        setTimeout(() => {
          this.waiting = false;
          this.searchUsers();
        }, 3000);
      }

      this.waiting = true;
    },
  },
};
</script>

<style scoped>
.user-button:not(:last-child) {
  margin-bottom: 1rem;
}

.item-field {
  overflow: auto;
  max-height: calc(80vh - 64px - 66px - 52px - 36px);
}
</style>
