<template>
  <!-- HEADER -->
  <Header v-if="isLogged"/>
  <!-- HEADER END -->

  <!-- BODY -->
  <div id="section-body" >
    <Navigation v-if="isLogged" />
    <router-view class="section-router"></router-view>
  </div>
  <!-- BODY END -->

  <!-- PLAYER -->
  <div id="section-player">
    <AudioPlayer v-if="isLogged"/>
  </div>
  <!-- PLAYER END -->
</template>

<script>
import { computed } from 'vue';
import Header from "@/components/HeaderComponent.vue";
import AudioPlayer from "@/components/AudioPlayerComponent.vue";
import Navigation from "@/components/Navigation.vue";
import { authStore } from "@/stores/auth";

export default {
  components: {
    Navigation,
    Header,
    AudioPlayer,
  },
  setup() {
    const store = authStore();
    const isLogged = computed(() => store.isLogged);

    return {
      isLogged,
    };
  },
};
</script>
