<template>
  <div id="app">
    {{ counter }} / {{counter2}}
    <button @click="counter += 1">+</button>
    <button @click="counter -= 1">-</button>
    <button data-test-id="reset" v-if="counter < 0" @click="counter = 0">
      Reset
    </button>
    <hr/>
    <button @click="counter2 += 1">plus</button>
    <button @click="counter2 -= 1">minus</button>
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
      counter2: 0,
    };
  },
  watch: {
    initialValue: {
      immediate: true,
      handler(newValue) {
        this.counter = newValue;
      },
    },
    counter(){
      this.counter2 = 0
    }
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
