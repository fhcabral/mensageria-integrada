<template>
  <MazDrawer variant="right" v-model="isOpenedRight">
    <template #title> Drawer right </template>
    <template #default="{ close }">
      <div style="padding: 16px">
        <p>Content</p>
        <div class="flex flex-wrap gap-05">
          <MazBtn color="danger" @click="close"> Close </MazBtn>
          <MazBtn color="success" @click="close"> Confirm </MazBtn>
        </div>
      </div>
    </template>
  </MazDrawer>
</template>

<script setup lang="ts">
import MazDrawer from "maz-ui/components/MazDrawer";
const isOpenedRight = inject("isOpenedRight", ref(false));
</script>
