<template>
  <div class="public-status-label px-2" :class="classObject()">
    {{ labelName }}
  </div>
</template>

<script>
export default {
  name: "PublicStatusLabel",
  props: {
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    labelName() {
      return this.isPublic ? "Public" : "Private";
    },
  },
  methods: {
    classObject() {
      return {
        "bg-success": this.isPublic,
        "bg-danger": !this.isPublic,
      };
    },
  },
};
</script>

<style scoped>
.public-status-label {
  border-radius: 20px;
  color: white;
}
</style>
