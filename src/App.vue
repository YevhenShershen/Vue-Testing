<template>
  <div id="app">
    {{ counter }}
    <button @click="counter += 1">+</button>
    <button @click="counter -= 1">-</button>
    <button data-test-id="reset" v-if="counter < 0" @click="counter = 0">
      Reset
    </button>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    initialValue: {
      type: Number,
      default: 0,
    },
  },
   data() {
    return {
      counter: 0,
    };
  },
  watch: {
    initialValue: {
      immediate: true,
      handler(newValue) {
        this.counter = newValue;
      },
    },
  },
   methods: {
    handleKeyPress(e) {
      if (e.key === "-") {
        this.counter -= 1;
      }
      if (e.key === "+") {
        this.counter += 1;
      }
    },
  },
  //Mounted — самый популярный хук жизненного цикла. Обычно его используют для извлечения данных для компонента
  mounted() {
    document.addEventListener("keyup", this.handleKeyPress);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.handleKeyPress);
  },
};
</script>

<style></style>
