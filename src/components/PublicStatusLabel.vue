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
        "bg-success": props.isPublic == true,
        "bg-danger": props.isPublic == false,
      };
    }

    return {
      labelName: labelName,
      classObject: classObject,
    };
  },
};
</script>

<style scoped>
.public-status-label {
  border-radius: 20px;
  color: white;
}
</style>
