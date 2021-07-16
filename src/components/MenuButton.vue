<template>
  <div class="dropdown">
    <button
      class="menu-button"
      id="menuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <BIconThreeDots />
    </button>
    <ul class="dropdown-menu" aria-labelledby="menuButton">
      <li>
        <a class="dropdown-item" href="#">
          <span class="d-flex align-items-center">
            <BIconInfoCircle /> &nbsp; About
          </span>
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="https://github.com/nickypangers/spotify-playlist-organiser"
          target="_blank"
        >
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
  name: "MenuButton",
  computed: {},
};
</script>

<style scoped>
.menu-button {
  background: white;
  border: none;
  outline: none;
  border-radius: 15px;
  height: 3rem;
  width: 3rem;
  margin: 0px 5px;
  background-color: rgb(247, 248, 250);
}
</style>
