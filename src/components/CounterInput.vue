<template>
  <div>
    <p>Enter new value:</p>
    <!-- поддержка v model -->
    <input
      type="text"
      :value="value"
      @input="$emit('change', $event.target.value)"
    />
    <hr />
    By the way,
    <slot></slot>
    <hr />
    <slot name="warning"></slot>
  </div>
</template>

<script>
export default {
  name: "CounterInput",
  props: {
    value: {
      type: Number,
      required: true,
    },
    //поле model позволяет переопределить имя свойства которое будет приходить когда
    //используем v-model и имя события которое мы используем
    model:{
prop: "value",
event: "change"
    }
  },
};
</script>
