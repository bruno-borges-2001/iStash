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

.notification.success {
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(27, 180, 14, 0.9) 0%,
    rgba(12, 122, 0, 0.4) 100%
  );
}
.notification.info {
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(221, 195, 31, 0.9) 0%,
    rgba(232, 229, 35, 0.4) 100%
  );
}
.notification.error {
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(238, 22, 22, 0.9) 0%,
    rgba(236, 12, 12, 0.4) 100%
  );
}
</style>
