const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  fecha: {
    type: Date,
    required: true,
  },
  organizador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Evento', eventoSchema);