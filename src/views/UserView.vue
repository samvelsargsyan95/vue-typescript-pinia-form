<template>
  <div class="user">
    <v-card class="mx-auto pa-3">
      <template v-if="formStore.isAccessUserPage">
        <p><b>User Name:</b> {{ formStore.formData?.userName }}</p>
        <p><b>Phone Number:</b> {{ formStore.formData?.phoneNumber }}</p>
      </template>

      <template v-if="!formStore.isAccessUserPage">
        <v-alert
          density="compact"
          type="warning"
          text="For the user information, first You need to add information from the form part..."
        ></v-alert>
      </template>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFormStore } from "@/stores/useFormStore";

export default defineComponent({
  setup() {
    const formStore = useFormStore();

    return { formStore };
  },
});
</script>


<style lang="scss" scoped>
.user {
  & b {
    font-size: 18px;
  }
}
</style>
