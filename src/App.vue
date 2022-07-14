<template>
  <div id="app">
   {{counter}}
   <button @click="counter+=1">+</button>
   <button @click="counter-=1">-</button>
  <button data-test-id="reset" v-if="counter < 0" @click="counter = 0">Reset</button>
  </div>
</template>

<script>

export default {
  name: "App",
data(){
  return{
    counter:0
  }
}
};
</script>

<style>

</style>
