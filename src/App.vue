<template>
  <v-app>
    <v-main class="mt-3 main">
      <nav-bar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue"

export default defineComponent({
  name: "App",

  components: {
    NavBar
  }
});
</script>

<style scoped lang="scss">
.main {
  width: 35%;
  margin-left: auto;
  margin-right: auto;
}
</style>
