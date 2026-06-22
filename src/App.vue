<script setup>
</script>
<template>
  <v-app theme="dark">
  <v-app-bar color="red-darken-3">
<v-img src="./img/pokedex-logo.png"/>
</v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation color="red-darken-3" grow>
      <v-btn to="/">
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>

      <v-btn to="/favorites">
        <v-icon>mdi-heart</v-icon>
        Favorieten
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>