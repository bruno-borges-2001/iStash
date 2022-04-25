<template>
  <notifications
    ignoreDuplicates
    animation-type="velocity"
    :animation="animation"
    :position="position"
    :group="group"
    classes="notification"
  />
</template>

<script>
export default {
  name: "NotificationComponent",
  props: {
    group: String,
    position: { type: String, default: "bottom center" },
  },
  computed: {
    animation() {
      return {
        enter(element) {
          let height = element.clientHeight;
          return {
            height: [height, 0],
            opacity: [1, 0],
          };
        },
        leave: {
          height: 0,
          opacity: 0,
        },
      };
    },
  },
};
</script>

<style>
.notification {
  font-size: 1rem;
  padding: 1rem;

  margin: 0.5rem;
  color: white;
  background: rgb(2, 0, 36);

  border-radius: 8px;
}
.notification > .notification-title {
  font-size: 1.2rem;
}

.notification > .notification-title {
  border-bottom: 1px solid gray;
  margin-bottom: 5px;
}
</style>
