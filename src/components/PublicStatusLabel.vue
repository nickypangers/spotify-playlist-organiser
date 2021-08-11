<template>
  <div class="public-status-label px-2" :class="classObject()">
    {{ labelName }}
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "PublicStatusLabel",
  props: {
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const labelName = computed(() => (props.isPublic ? "Public" : "Private"));

    function classObject() {
      return {
        "bg-label-success": props.isPublic == true,
        "bg-label-error": props.isPublic == false,
      };
    }

    return {
      labelName: labelName,
      classObject: classObject,
    };
  },
};
</script>

<style lang="scss" scoped>
.public-status-label {
  border-radius: 0.7rem;
  color: $white;
  font-size: 0.9rem;
  padding: 0.2rem 0;
}

.bg-label-success {
  background-color: $green;
}

.bg-label-error {
  background-color: red;
}
</style>
