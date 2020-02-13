<template>
  <div class="item-list">
    <Item v-for="item in $store.getters.displayItems" :key="item.id" :item="item" />
  </div>
</template>

<script>
import Item from '@/components/Item.vue';
import { fetchListData } from '@/api/api';

export default {
  components: {
    Item,
  },
  beforeMount() {
    this.loadItems();
  },
  // data() {
  //   return {
  //     displayItems: [],
  //   };
  // },
  methods: {
    loadItems() {
      this.$bar.start();
      this.$store
        .dispatch('fetchListData', {
          type: 'top',
        })
        // fetchListData('top')
        .then(items => {
          this.displayItems = items;
          this.$bar.finish();
        })
        .catch(() => this.$bar.fail());
    },
  },
};
</script>
