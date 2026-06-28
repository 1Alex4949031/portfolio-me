<template>
  <header class="section-heading">
    <b>{{ num }}</b>
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
  </header>
</template>

<script setup>
defineProps({
  num: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
});
</script>
