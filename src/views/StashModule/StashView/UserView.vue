<template>
  <div
    class="d-flex flex-column align-center flex-grow-1 full-width full-height pa-4"
  >
    <p class="mb-0">{{ $t("message.by") }}</p>
    <h1>{{ owner.name }}</h1>
    <v-switch :label="$t('message.sharedstash')" v-model="switchValue" />
    <v-card
      elevation="5"
      :disabled="!stash.shared"
      class="full-width users-container"
    >
      <header class="d-flex align-center">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          :placeholder="$t('message.searchuser')"
          v-model="searchFilter"
        ></v-text-field>
        <v-dialog
          :submitMessage="$t('button.save')"
          :onSubmit="handleAddUser"
          @close="clearDialogData"
          class="ma-2"
          iconButton
          v-if="isOwner"
        >
          <template v-slot:button>
            <v-icon> mdi-plus </v-icon>
          </template>
          <template v-slot:default>
            <invite-user-dialog :usersList="users" ref="userDialog" />
          </template>
        </v-dialog>
      </header>
      <div style="max-height: calc(100% - 70px); overflow-y: auto">
        <div v-if="usersList.length > 0">
          <v-card
            v-for="item in usersList"
            :key="item.uid"
            class="user-card full-width mt-2"
            elevation="9"
            style="border: 1px solid #aaa3"
          >
            <v-card-title class="text-h4 text-capitalize justify-center pb-0">
              {{ item.name }}
            </v-card-title>
            <v-btn
              v-if="isOwner && item.userStatus === 1"
              @click="cancelInvite(item.uid)"
              class="cancel-btn"
              icon
              ><v-icon>mdi-close</v-icon></v-btn
            >
            <v-card-actions style="padding-top: 0">
              <v-spacer></v-spacer>
              <div
                v-if="item.userStatus !== 2"
                class="d-flex align-end"
                style="color: green; height: 36px;"
              >
                {{ userStatus(item.userStatus) }}
              </div>
              <div v-else>
                <v-btn v-if="isOwner" icon @click="handleRemoveUser(item.uid)">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </div>
        <div class="full-height d-flex justify-center align-center" v-else>
          {{
            searchFilter.length > 0
              ? $t("message.nosearchuser")
              : $t("message.nousers")
          }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import Dialog from "../../../layouts/Dialog.vue";
import { OWNER, INVITED, REJECTED, ACCEPTED } from "@/helpers/UserStatus";
import InviteUserDialog from "@/components/Dialogs/InviteUserDialog.vue";

export default {
  components: { "v-dialog": Dialog, InviteUserDialog },
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
        .sort((a) => -a.userStatus)
        .filter(
          (el) =>
            el.name.includes(this.searchFilter) ||
            el.email.split("@")[0].includes(this.searchFilter)
        );
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
    handleAddUser() {
      const value = this.$refs.userDialog.getData;

      if (!value) return false;

      this.stash.addUser(value);

      return true;
    },
    cancelInvite(_id) {
      this.stash.rejectInvite(_id, true);
    },
    clearDialogData() {
      if (this.$refs.userDialog) this.$refs.userDialog.clearData();
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

.cancel-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
