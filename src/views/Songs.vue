<template>
  <div id="songs-view">
    <div class="wrapper-header">
      <h1>SONGS</h1>
      <div class="wrapper-search">
        <input id="input-search" v-model="search" placeholder="Search by title..."/>
      </div>
      <div class="wrapper-settings">
        <button id="btn-show-favorites" :class="{active: show_favorites}" @click="show_favorites = !show_favorites">Show
          Favorites
        </button>
      </div>
    </div>
    <div class="wrapper-songs">
      <table>
        <tr ref="header">
          <th id="th-id">#</th>
          <th id="th-title" :class="{ active: sort.by === 'title' }" @click="sortBy('title')">
            Title
            <IconCaretUp v-if="sort.by === 'title'" :class="{ 'flip-vertical': sort.order === 'desc' }"
                         color="var(--c-accent-secondary)"/>
          </th>
          <th id="th-artist">Artist</th>
          <th id="th-album">Album</th>
          <th id="th-duration" :class="{ active: sort.by === 'duration' }" @click="sortBy('duration')">
            Duration
            <IconCaretUp v-if="sort.by === 'duration'" :class="{ 'flip-vertical': sort.order === 'desc' }"
                         color="var(--c-accent-secondary)"/>
          </th>
        </tr>
        <tr v-for="(song, index) in filteredSongs" :key="song.id" :class="{ active: store.getNowPlayingSongId === song.id }" class="song"
            @click="selectSong(song)">
          <td id="td-index">
            <IconPlay v-if="store.getNowPlayingSongId === song.id"/>
            <span v-else id="txt-index">{{ index + 1 }}</span>
          </td>
          <td id="td-title">
            <img :src="song.album.images[1].url"/>
            {{ song.name }}
          </td>
          <td id="td-artist">{{ getArtists(song.artists) }}</td>
          <td id="td-album">{{ song.album.name }}</td>
          <td id="td-duration">
            {{ getTime(song.duration_ms) }}
            <IconHeart :class="{ active: auth.getFavoriteSongs.includes(song.id) }"
                       @click="auth.toggleFavorite(song.id)"/>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import {authStore} from "@/stores/auth";
import {usePlayerStore} from "@/stores/player";
import songList from '@/data/songs';
import IconPlay from '../components/icons/IconPlay.vue';
import IconCaretUp from '../components/icons/IconCaretUp.vue';
import IconHeart from '../components/icons/IconHeart.vue';

export default {

  components: {IconPlay, IconCaretUp, IconHeart},
  data() {
    const store = usePlayerStore();
    const auth = authStore();
    return {
      store,
      auth,
      songs: [...songList],
      sort: {
        by: null,
        order: 'asc'
      },
      search: '',
      clicks: 0,
      show_favorites: false
    }
  },
  methods: {
    getTime(time_in_ms) {
      let min = Math.floor((time_in_ms / 1000 / 60) << 0);
      let sec = Math.floor((time_in_ms / 1000) % 60);

      return `${min}:${sec.toString().length === 1 ? '0' : ''}${sec}`;
    },
    getArtists(artists) {
      return artists.map(artist => artist.name).join(', ');
    },
    sortBy(by) {
      if (by === this.sort.by) {
        this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
        this.sort.by = this.sort.order === 'asc' ? null : this.sort.by;
      } else {
        this.sort.by = by;
      }
      switch (this.sort.by) {
        case 'title':
          this.songs.sort((a, b) => {
            if (this.sort.order === 'asc') {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
            } else {
              if (b.name.toLowerCase() < a.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
            }
            return 0;
          });
          break;
        case 'duration':
          this.songs.sort((a, b) => {
            if (this.sort.order === 'asc') {
              if (a.duration_ms < b.duration_ms) {
                return -1;
              }
              if (a.duration_ms > b.duration_ms) {
                return 1;
              }
            } else {
              if (b.duration_ms < a.duration_ms) {
                return -1;
              }
              if (b.duration_ms > a.duration_ms) {
                return 1;
              }
            }
            return 0;
          });
          break;
        default:
          this.songs = [...songList];
          break;
      }
    },
    selectSong(song) {
      this.clicks++;
      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          this.clicks = 0;
          console.log("big black cats")
        }, 500);
      } else {
        clearTimeout(this.timer);
        this.store.setNowPlaying(song);
        console.log("big black dogs")
        this.clicks = 0;
      }
    }
  },
  mounted() {
    this.store.setPlaylist(this.songs);
  },
  computed: {
    filteredSongs() {
      return this.songs.filter(song => {
        let valid = song.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        if (valid && this.show_favorites) {
          valid = this.auth.getFavoriteSongs.includes(song.id);
        }
        return valid;
      });
    }
  },
}
</script>


<style lang="scss" scoped>

</style>