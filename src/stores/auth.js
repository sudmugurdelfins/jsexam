import { defineStore } from 'pinia';
import {useRouter} from "vue-router";
export const authStore = defineStore('auth', {

    state: () => ({
        user: {
            name: "NAME",
            surname: "SURNAME",
            code: "IT1234",
            liked_songs: localStorage.liked_songs ? localStorage.liked_songs.split(",") : []
        },
        isLogged: localStorage.isLogged ?? false
    }),
    getters: {
        getUser() {
            return this.user;
        },
        isAuthenticated() {
            return this.isLogged;
        },
        getFavoriteSongs() {
            return this.user.liked_songs;
        }
    },
    actions: {
        setUserData(name, surname, code) {
            this.user.name = name;
            this.user.surname = surname;
            this.user.code = code;
        },
        login(email, password) {
            console.log("BEING CALLED OUT!!!!")
            if (email === "test" && password === "123456") {
                localStorage.isLogged = true;
                this.isLogged = true;
                console.log(this.isAuthenticated);
                return true;
            } else {
                console.log("Login was not successful!");
                return false;
            }
        },
        logout() {
            localStorage.clear();
            this.isLogged = false;
            const router = useRouter();
        },
        toggleFavorite(songID) {
            const song_index = this.user.liked_songs.indexOf(songID);

            if (song_index < 0) {
                this.user.liked_songs.push(songID);
            } else {
                this.user.liked_songs.splice(song_index, 1);
            }

            localStorage.liked_songs = this.user.liked_songs.join(",");
        }
    }
});