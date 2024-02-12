<template>
  <div class="form-view">
    <the-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheForm from '@/components/TheForm.vue'

export default defineComponent({
  components: {
    TheForm
  }
})
</script>

