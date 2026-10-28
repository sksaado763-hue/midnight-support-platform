const { Router } = require("express");
const { Message, Subscriber } = require("../models");

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/contact", async (req, res, next) => {
  try {
    const { name, email, phone, company, source, topic, timezone, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Name, email and message are required." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: "Please provide a valid email address." });
    }
    const saved = await Message.create({
      name,
      email,
      phone: phone || "",
      company: company || "",
      source: source || "",
      topic: topic || "",
      timezone: timezone || "",
      message,
    });
    res.status(201).json({ ok: true, id: saved._id.toString() });
  } catch (err) {
    next(err);
  }
});

router.post("/newsletter", async (req, res, next) => {
  try {
    const email = (req.body || {}).email;
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: "Please provide a valid email address." });
    }
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) return res.json({ ok: true, duplicate: true });
    await Subscriber.create({ email });
    res.status(201).json({ ok: true });
  } catch (err) {
    if (err && err.code === 11000) return res.json({ ok: true, duplicate: true });
    next(err);
  }
});

router.get("/messages", async (req, res, next) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 }).select("-__v").lean();
    res.json(messages.map(({ _id, ...m } ) => ({ id: _id.toString(), ...m })));
  } catch (err) {
    next(err);
  }
});

router.delete("/messages/:id", async (req, res, next) => {
  try {
    const removed = await Message.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ ok: false, error: "Message not found." });
    res.json({ ok: true });
  } catch (err) {
    if (err && err.name === "CastError") {
      return res.status(404).json({ ok: false, error: "Message not found." });
    }
    next(err);
  }
});

router.get("/subscribers", async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find({}).sort({ createdAt: -1 }).select("-__v").lean();
    res.json(subscribers.map(({ _id, ...s }) => ({ id: _id.toString(), ...s })));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
