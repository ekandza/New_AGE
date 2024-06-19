const mongoose = require('mongoose');



const statsSchema = new mongoose.Schema({
    article: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    montant: {
        type: String,
        required: true
      }

  });
  

const Stat = mongoose.model('Stats', statsSchema);

module.exports = Stat;
