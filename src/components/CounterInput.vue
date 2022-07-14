<template>
  <div>
    <p>Enter new value:</p>
    <!-- поддержка v model -->
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <hr />
    By the way,
    <slot></slot>
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
  },
};
</script>
