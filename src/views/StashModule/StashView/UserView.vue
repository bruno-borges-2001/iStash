<template>
  <div
    class="d-flex flex-column align-center flex-grow-1 full-width full-height pa-4"
  >
    <p class="mb-0">{{ $t("message.by") }}</p>
    <h1>{{ owner.name }}</h1>
    <v-switch label="Shared" v-model="switchValue" />
    <v-card
      elevation="5"
      :disabled="!stash.shared"
      class="full-width users-container"
    >
      <header class="d-flex align-center">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          placeholder="Search user"
          v-model="searchFilter"
        ></v-text-field>
        <v-btn icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </header>
      <div style="height: calc(100% - 70px)">
        <div v-if="usersList.length > 0">
          <v-card
            v-for="item in usersList"
            :key="item.id"
            class="user-card full-width mt-2"
            elevation="4"
          >
            <v-card-title class="text-h4 text-capitalize justify-center pb-0">
              {{ item.name }}
            </v-card-title>
            <v-card-actions style="padding-top: 0">
              <v-spacer></v-spacer>
              <div
                v-if="item.userStatus !== 2"
                style="color: green; font-size: 1.5rem"
              >
                {{ userStatus(item.userStatus) }}
              </div>
              <div v-else>
                <v-btn v-if="isOwner" icon @click="handleRemoveUser(item.uid)">
                  <v-icon color="#d90310">mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </div>
        <div class="full-height d-flex justify-center align-center" v-else>
          {{ $t("message.nousers") }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { OWNER, INVITED, REJECTED, ACCEPTED } from "@/helpers/UserStatus";

export default {
  data: () => ({
    switchValue: false,
    searchFilter: "",
  }),
  computed: {
    users() {
      return this.stash?.usersInfo;
    },
    owner() {
      return this.users?.find((el) => el.userStatus === OWNER) || { name: "" };
    },
    isOwner() {
      return this.owner?.uid === this.$store.state.userId;
    },

    usersList() {
      return this.users
        ?.filter((el) => el.userStatus !== OWNER && el.userStatus !== REJECTED)
        .sort((a) => -a.userStatus);
    },
  },
  methods: {
    userStatus(id) {
      switch (id) {
        case OWNER:
          return this.$t("keys.owner");
        case INVITED:
          return this.$t("keys.invited");
        case ACCEPTED:
          return "";
      }
    },
    handleRemoveUser(_id) {
      this.stash.removeUser(_id);
    },
  },
  props: {
    stash: Object,
  },

  created() {
    this.switchValue = this.stash.shared;
  },

  watch: {
    switchValue(newVal) {
      this.stash?.setShared(newVal);
    },
  },
};
</script>

<style scoped>
.user-card {
  max-width: 1000px;
}

.users-container {
  height: 90%;
  max-height: 650px;
  max-width: 1120px;
  padding: 0 4rem;
}
</style>
