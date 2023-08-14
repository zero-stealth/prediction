<template>
    <div>
      <head>
        <title>{{ currentPage.title }}</title>
        <meta name="description" :content="currentPage.description" />
      </head>
  
      <main>
        <h1>{{ currentPage.title }}</h1>
        <p>{{ currentPage.description }}</p>
        <!-- Other content -->
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const pages = ref([
    {
      title: "Passionpredict - Free Football Predictions",
      description:
        "Passionpredict offers accurate and free football predictions daily. Discover sure home win tips, banker bets, BTTS/GG predictions, and more. Start making informed bets with Passionpredict.",
    },
    // Add more pages as needed
  ]);
  
  const currentPageIndex = ref(0);
  const currentPage = ref(pages[currentPageIndex]);
  console.log(currentPage.value)
  </script>
  