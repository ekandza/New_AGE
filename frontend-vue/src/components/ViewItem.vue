<template>
  <div class="container mx-auto">
    <div class="my-60 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-30">
      <h1 class="text-2xl font-bold my-4">Liste des Articles</h1>
      <div class="overflow-x-auto">
        <table class="table-auto w-full" id="articles-table">
          <thead>
            <tr>
              <th class="px-4 py-2">Titre</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Éditer</th>
              <th class="px-4 py-2">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in articles" :key="index">
              <td class="border px-4 py-2">{{ article.title }}</td>
              <td class="border px-4 py-2">{{ article.description }}</td>
              <td class="border px-4 py-2">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="editArticle(article)">
                  Éditer <i class="fas fa-edit mr-2"></i>
                </button>
              </td>
              <td class="border px-4 py-2">
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="deleteArticle(article._id)">
                  Supprimer <i class="fas fa-trash-alt mr-2"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="copyArticles">
        Copier Articles
      </button>
  
      <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="generatePDF">
        Télécharger PDF
      </button>
    </div>

    <div v-if="copiedArticles.length > 0" class="my-60 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-30">
      <h1 class="text-2xl font-bold my-4">Articles Copiés</h1>
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Titre</th>
              <th class="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in copiedArticles" :key="index">
              <td class="border px-4 py-2">{{ article.title }}</td>
              <td class="border px-4 py-2">{{ article.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ky from 'ky';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  data() {
    return {
      articles: [],
      copiedArticles: [] // Nouveau tableau pour les articles copiés
    };
  },
  name: 'ViewItem',
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await ky.get('http://localhost:3000/api/items/articles').json();
        this.articles = response;
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
    async editArticle(article) {
      this.$router.push({ name: 'EditItem', params: { id: article._id } });
    },
    async deleteArticle(articleId) {
      try {
        // Envoyer une requête DELETE pour supprimer l'article
        const response = await ky.delete(`http://localhost:3000/api/items/articles/${articleId}`);
        if (response.ok) {
          // Supprimer l'article de la liste locale
          this.articles = this.articles.filter(article => article._id !== articleId);
          toastr.success('Votre article a été supprimé avec succès!');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'article:', error);
      }
    },
    copyArticles() {
      this.copiedArticles = [...this.articles];
      toastr.success('Les articles ont été copiés avec succès!');
    },
     
    generatePDF() {
  const doc = new jsPDF();

  // Charger l'image pour l'en-tête gauche
  const img = new Image();
  img.src = require('../images/plumes.jpeg'); // Utilisation de require pour charger l'image depuis le chemin relatif
  img.onload = () => {
    doc.addImage(img, 'JPEG', 10, 10, 50, 20); // Ajouter l'image au PDF

    // Ajouter un slogan en en-tête droite
    doc.setFontSize(16);
    doc.text('Votre Slogan Ici', 150, 20, { align: 'right' });

    // Ajouter le tableau des articles
    doc.autoTable({
      startY: 60, // Début du tableau après l'en-tête
      head: [['Titre', 'Description']],
      body: this.articles.map(article => [article.title, article.description]),
      margin: { top: 50 },
    });

    // Ajouter le footer avec la date d'aujourd'hui
    const date = new Date().toLocaleDateString('fr-FR'); // Format de date français
    const pageCount = doc.internal.getNumberOfPages(); // Nombre de pages dans le document

    for (let i = 1; i <= pageCount; i++) {
      // Go to page i
      doc.setPage(i);

      // Footer
      const footerText = `Page ${i} / ${pageCount} - Date: ${date}`;
      doc.setFontSize(10);
      doc.text(footerText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }

    // Sauvegarder le PDF avec un nom de fichier
    doc.save('articles.pdf');
  };
}


  }
};
</script>

<style scoped>
.mt-30 {
  margin-top: 30px;
}
</style>
