<template>
  <div id="app">
   {{counter}}
   <button @click="counter+=1">+</button>
   <button @click="counter-=1">-</button>
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
