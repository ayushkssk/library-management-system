import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, default: 1 },
  category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model('Book', BookSchema);

