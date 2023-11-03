<template>
  <div id="login-view">
    <form class="login-form" @submit.prevent="login">
      <div class="wrapper-logo">
        <img src="@/assets/logo.svg" />
        <div>KRAKEN.FM</div>
      </div>
      <input v-model="email" id="input-email" placeholder="E-mail" />
      <input v-model="password" id="input-password" placeholder="Password" type="password" />
      <button id="btn-submit" :disabled="!isValidInput" @click="login">LOGIN</button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { authStore } from '@/stores/auth';
import router from "@/router";

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const store = authStore(); // Use a different variable name to avoid conflict

    const isValidInput = computed(() => {
      return email.value && password.value.length >= 6;
    });

    const login = () => {
      if (isValidInput.value) {
        const success = store.login(email.value, password.value); // Use the 'store' variable to access authStore
        if (success) {
          console.log("SUCC SEGSS")
          router.push('/')
        } else {
          // Failed login logic
        }
      }
    };

    return { email, password, login, isValidInput };
  },
};
</script>
