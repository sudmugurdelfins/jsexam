<template>
    <div id="main-header" class="active">
        <div class="wrapper-logo">
            <img src="@/assets/logo.svg" alt="logo"/>
            <h2>KRAKEN.FM</h2>
        </div>
        <div class="wrapper-profile">
            <div class="section-user">
                <span class="avatar"></span>
                <h3 id="txt-full-name">{{ fullName }}</h3>
            </div>
            <button id="btn-logout" @click="logout">LOGOUT</button>
        </div>
    </div>
</template>
<script>
import {authStore} from "@/stores/auth";
import router from "@/router";
import {computed} from "vue";

export default {
  setup() {
    const store = authStore();
    const fullName = computed(() => `${store.user.name} ${store.user.surname}`);

    const logout = () => {
      store.logout();
      router.push("/login");
    };
    return { logout, store, fullName};
  },
};
</script>
