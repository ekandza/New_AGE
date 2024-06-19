<template>
    <div>
      <p>Graphique des articles</p>
      <bar-chart :data="chartData"></bar-chart>
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  import ky from 'ky';
  
  export default {
    extends: Bar,
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [{
            label: 'Montant par article',
            backgroundColor: '#41B883',
            data: []
          }]
        }
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        const apiUrl = 'https://localhost:3000/apis/stats/stats';
  
        try {
          const response = await ky.get(apiUrl).json();
          
          // Assuming response is an array of objects with 'article' and 'montant' properties
          const articlesData = response;
  
          // Extract labels and data for the chart
          this.chartData.labels = articlesData.map(article => article.article);
          this.chartData.datasets[0].data = articlesData.map(article => article.montant);
  
          // Render the chart after data is populated
          this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
          // Handle error gracefully, e.g., show error message to the user
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your scoped CSS styles here if necessary */
  </style>
  