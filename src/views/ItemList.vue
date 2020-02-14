<template>
  <div class="item-list-view">
    <div class="item-list-nav">
      <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; previous</router-link>
      <a v-else>&lt; previous</a>
      <span>{{ page || 1 }}/{{ maxPage }}</span>
      <router-link
        v-if="(page || 1) < maxPage"
        :to="'/' + type + '/' + ((Number(page) || 1) + 1)"
      >more &gt;</router-link>
      <a v-else>more &gt;</a>
    </div>
    <div class="item-list">
      <Item v-for="item in $store.getters.displayItems" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item.vue';
import { fetchListData } from '@/api/api';
import { titleMixin } from '../utils/mixins';

function capitalizeFirstLetter(title) {
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export default {
  components: {
    Item,
  },
  beforeMount() {
    this.loadItems();
  },
  title() {
    return `${capitalizeFirstLetter(this.$route.params.type)}`;
  },
  mixins: [titleMixin],
  // data() {
  //   return {
  //     displayItems: [],
  //   };
  // },
  computed: {
    type() {
      return this.$route.params.type;
    },
    page() {
      return this.$route.params.page;
    },
    maxPage() {
      return this.$store.getters.maxPage;
    },
  },
  methods: {
    loadItems() {
      this.$bar.start();
      this.$store
        .dispatch('fetchListData', {
          // type: this.$route.params.type,
          type: this.type,
        })
        // fetchListData('top')
        .then(items => {
          if (this.page && (this.page > this.maxPage || this.page <= 0 || !Number(this.page))) {
            this.$router.replace(`/${this.type}/1`);
            return;
          }
          this.displayItems = items;
          this.$bar.finish();
        })
        .catch(() => this.$bar.fail());
    },
  },
};
</script>
