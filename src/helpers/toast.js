import { computed } from "vue";
import store from "../store";

const toastEl = computed(() => store.state.toastEl);

function displayToast() {
  toastEl.value.show();
}

export { displayToast };
