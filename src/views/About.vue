<template>
  <div id="about-view">
    <div class="wrapper-header">
      <h1>ABOUT ME</h1>
      <div class="settings">
        <button id="btn-edit" :class="{ active: edit_form }" @click="edit_form = !edit_form">{{ edit_form ? "Cancel" : "Edit Form" }}</button>
        <button id="btn-save" v-if="edit_form" class="submit" @click="saveForm()">Save Form</button>
      </div>
    </div>
    <form>
      <div class="wrapper-input">
        <label>NAME</label>
        <input v-if="edit_form" v-model="user_form.name"/>
        <p v-else>{{ store.user.name.toLocaleUpperCase() }}</p>
      </div>
      <div class="wrapper-input">
        <label>SURNAME</label>
        <input v-if="edit_form" v-model="user_form.surname"/>
        <p v-else>{{ store.user.surname.toLocaleUpperCase() }}</p>
      </div>
      <div class="wrapper-input">
        <label>STUDENT CODE</label>
        <input v-if="edit_form" v-model="user_form.code"/>
        <p v-else>{{ store.user.code.toLocaleUpperCase() }}</p>
      </div>
      <div class="wrapper-songs">
        <label>FAVORITE SONGS</label>
        <ul v-if="favoriteSongs.length > 0">
          <li v-for="song in favoriteSongs">
            <img :src="song.album.images[1].url" alt="album logo"/>
            <div class="song-info">
              <p class="song-name">{{ song.name }}</p>
              <p class="song-artists">{{ getArtists(song.artists) }}</p>
            </div>
          </li>
        </ul>
        <div v-else class="empty">NO SONGS FOUND</div>
      </div>
    </form>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth';
import songsAPI from '../data/songs'
import IconEdit from '../components/icons/IconEdit.vue'

export default {
  components: { IconEdit },
  data() {
    const store = authStore();
    return {
      store,
      edit_form: false,
      user_form: {
        name   : store.user.name,
        surname: store.user.surname,
        code   : store.user.code
      }
    }
  },
  methods: {
    getArtists(artists) {
      return artists.map(artist => artist.name).join(", ");
    },
    saveForm() {
      this.store.setUserData(this.user_form.name, this.user_form.surname, this.user_form.code);
      this.edit_form = false;
    }
  },
  computed: {
    favoriteSongs() {
      return this.store.getFavoriteSongs.map(songID => {
        return songsAPI.find(song => song.id === songID);
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>