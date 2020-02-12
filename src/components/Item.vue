<template>
  <ul>
    <li>
      <a :href="item.url">{{ item.title }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
