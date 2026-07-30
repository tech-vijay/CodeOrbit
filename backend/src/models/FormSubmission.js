import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema(
  {
    source: { type: String, default: 'general', trim: true },
    form_type: { type: String, default: 'form_submission' },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    service: { type: String, default: '' },
    company: { type: String, default: '' },
    project_type: { type: String, default: '' },
    budget: { type: String, default: '' },
    timeline: { type: String, default: '' },
    message: { type: String, default: '' },
    raw: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('FormSubmission', formSubmissionSchema);
