<template>
  <div class="navbar">
    <nav class="my-3 py-3">
      <router-link
        v-for="(item, index) of navLinks"
        :key="index"
        :to="item.path"
        :class="{
          'me-4': index === navLinks.lenth - 1,
          active: formStore.activeLink === item.name,
        }"
        @click="formStore.changeActiveLink(item.name)"
        class="navbar__link me-4"
        >{{ item.name }}</router-link
      >
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from "vue";
import { useFormStore } from "@/stores/useFormStore";
import { useRouter } from "vue-router";

// Define a type for the link objects
interface NavLink {
  name: string;
  path: string;
}

export default defineComponent({
  name: "NavBar",
  setup() {
    const formStore = useFormStore();

    // Use TypeScript's Ref type with a generic to define the type of navLinks
    const navLinks: Ref<NavLink[]> = ref<NavLink[]>([
      {
        name: "Form",
        path: "/form",
      },
      {
        name: "User",
        path: "/user",
      },
    ]);

    // Corrected the type of activeLink to be a Ref of type string
    const activeLink: Ref<string> = ref("Form");

    const router = useRouter();

    watch(() => router.currentRoute.value.name, (newVal) => {
      if (newVal) {
        formStore.changeActiveLink(newVal)
      }
    });

    // Return the reactive properties
    return { formStore, navLinks, activeLink };
  },
});
</script>


<style lang="scss" scoped>
.navbar {
  & nav {
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
  }
  &__link {
    text-decoration: none;
    font-weight: bold;
    color: grey;
    padding-bottom: 14.5px;
  }

  .active {
    color: #1976d2;
    border-bottom: 2px solid #1976d2;
  }
}
</style>
