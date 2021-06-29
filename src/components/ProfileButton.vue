<template>
  <div class="dropdown">
    <button
      class="action_button button"
      @click="this.$emit('onclick')"
      id="profileMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <p class="m-0 action_button_text">
        {{ displayName }}
      </p>
    </button>
    <ul class="dropdown-menu" aria-labelledby="profileMenuButton">
      <li>
        <a class="dropdown-item" href="#">
          <span class="d-flex align-items-center">
            <BIconInfoCircle /> &nbsp; About
          </span>
        </a>
      </li>
      <li>
        <a class="dropdown-item" href="#">
          <span class="d-flex align-items-center">
            <BIconCode /> &nbsp; Code
          </span>
        </a>
      </li>
      <li>
        <a class="dropdown-item" href="#">
          <span class="d-flex align-items-center">
            <BIconBook /> &nbsp; Docs
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProfileButton",
  computed: {
    user() {
      return this.$store.state.user;
    },
    displayName() {
      return this.user.display_name;
    },
  },
};
</script>
