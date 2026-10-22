const { Schema, model } = require("mongoose");

const orderField = { type: Number, default: 0 };

const featureSchema = new Schema({ title: String, text: String }, { _id: false });
const faqSchema = new Schema({ q: String, a: String }, { _id: false });

const articleSchema = new Schema({
  slug: { type: String, unique: true, index: true },
  title: String,
  tag: String,
  tagClass: String,
  date: String,
  dateLabel: String,
  excerpt: String,
  theme: String,
  body: [String],
  newBadge: { type: Boolean, default: false },
  order: orderField,
});

const caseStudySchema = new Schema({
  slug: { type: String, unique: true, index: true },
  client: String,
  industry: String,
  headline: String,
  challenge: String,
  approach: [String],
  outcomes: [String],
  theme: String,
  order: orderField,
});

const platformSchema = new Schema({
  slug: { type: String, unique: true, index: true },
  name: String,
  short: String,
  tint: String,
  tagline: String,
  intro: String,
  problem: String,
  solution: String,
  features: [featureSchema],
  faqs: [faqSchema],
  order: orderField,
});

const supportPackageSchema = new Schema({
  name: String,
  price: String,
  period: String,
  tagline: String,
  features: [String],
  cta: String,
  featured: { type: Boolean, default: false },
  order: orderField,
});

const teamMemberSchema = new Schema({
  name: String,
  role: String,
  initials: String,
  tint: String,
  order: orderField,
});

const statSchema = new Schema({
  value: String,
  label: String,
  order: orderField,
});

const messageSchema = new Schema({
  name: { type: String, required: true, maxlength: 120 },
  email: { type: String, required: true, maxlength: 160 },
  company: { type: String, default: "", maxlength: 120 },
  topic: { type: String, default: "" },
  message: { type: String, required: true, maxlength: 3000 },
  createdAt: { type: Date, default: Date.now, index: true },
});

const subscriberSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 160 },
  createdAt: { type: Date, default: Date.now, index: true },
});

[
  articleSchema,
  caseStudySchema,
  platformSchema,
  supportPackageSchema,
  teamMemberSchema,
  statSchema,
  messageSchema,
  subscriberSchema,
].forEach((schema) => schema.set({ versionKey: false }));

module.exports = {
  Article: model("Article", articleSchema),
  CaseStudy: model("CaseStudy", caseStudySchema),
  Platform: model("Platform", platformSchema),
  SupportPackage: model("SupportPackage", supportPackageSchema),
  TeamMember: model("TeamMember", teamMemberSchema),
  Stat: model("Stat", statSchema),
  Message: model("Message", messageSchema),
  Subscriber: model("Subscriber", subscriberSchema),
};
