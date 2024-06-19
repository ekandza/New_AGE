// Dans votre fichier de configuration de build (vue.config.js par exemple)
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@fortawesome/fontawesome-free/css/all.min.css";`
      }
    }
  }
};
