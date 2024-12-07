import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  staffId: { type: String, required: true, unique: true },
  position: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema);

