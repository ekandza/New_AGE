<template>
    <div>
      <line-chart :data="chartData"></line-chart>
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  
  export default {
    extends: Line,
    props: ['articlesData'],
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [{
            label: 'Montant par article',
            borderColor: '#41B883',
            pointBackgroundColor: 'white',
            borderWidth: 2,
            pointBorderColor: 'rgba(255, 159, 64, 1)',
            data: []
          }]
        }
      };
    },
    mounted() {
      this.formatChartData();
    },
    methods: {
      formatChartData() {
        this.chartData.labels = this.articlesData.map(article => article.article);
        this.chartData.datasets[0].data = this.articlesData.map(article => article.montant);
  
        this.renderChart(this.chartData, { responsive: true, maintainAspectRatio: false });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Ajoutez vos styles CSS ici si nécessaire */
  </style>
  