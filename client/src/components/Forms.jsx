import { useState } from "react";
import { postJson } from "../lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ withTopic = false, presetPackage = "" }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    topic: withTopic && presetPackage ? "support" : "support",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const idPrefix = withTopic ? "ct" : "ff";
  const update = (field) => (event) => setValues((v) => ({ ...v, [field]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    if (!values.name || !values.email || !values.message) {
      setStatus({ text: "Please fill in your name, email and message.", ok: false });
      return;
    }
    if (!EMAIL_RE.test(values.email)) {
      setStatus({ text: "That email address doesn't look right.", ok: false });
      return;
    }
    setSending(true);
    const { ok, body } = await postJson("/api/contact", values);
    if (ok && body && body.ok) {
      setStatus({ text: `Thanks ${values.name} — we'll be in touch within one working day.`, ok: true });
      setValues((v) => ({ ...v, name: "", email: "", company: "", message: "" }));
    } else {
      setStatus({ text: (body && body.error) || "Something went wrong — please try again.", ok: false });
    }
    setSending(false);
  }

  const messagePlaceholder = presetPackage
    ? `We're interested in the ${presetPackage} package for our platform. Tell us what you're running…`
    : "Tell us what you're running, what hurts, and when it hurts most.";

  return (
    <form className={withTopic ? "contact-form reveal" : "footer-form"} id={withTopic ? "contact-form" : "footer-form"} noValidate onSubmit={submit}>
      {withTopic && <h2>Send us a message</h2>}
      <div className="form-row form-row--split">
        <div>
          <label htmlFor={`${idPrefix}-name`}>Name<span className="req" aria-hidden="true"> *</span></label>
          <input type="text" id={`${idPrefix}-name`} name="name" required autoComplete="name" value={values.name} onChange={update("name")} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-company`}>Company<span className="opt"> (optional)</span></label>
          <input type="text" id={`${idPrefix}-company`} name="company" autoComplete="organization" value={values.company} onChange={update("company")} />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor={`${idPrefix}-email`}>Email<span className="req" aria-hidden="true"> *</span></label>
        <input type="email" id={`${idPrefix}-email`} name="email" required autoComplete="email" value={values.email} onChange={update("email")} />
      </div>
      {withTopic && (
        <div className="form-row">
          <label htmlFor="ct-topic">What's this about?</label>
          <select id="ct-topic" name="topic" value={values.topic} onChange={update("topic")}>
            <option value="support">24/7 Support packages</option>
            <option value="cloud">Managed Cloud &amp; DevOps</option>
            <option value="partnership">Partnerships</option>
            <option value="careers">Careers</option>
            <option value="other">Something else</option>
          </select>
        </div>
      )}
      <div className="form-row">
        <label htmlFor={`${idPrefix}-message`}>Message<span className="req" aria-hidden="true"> *</span></label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={withTopic ? 5 : 3}
          required
          placeholder={messagePlaceholder}
          value={values.message}
          onChange={update("message")}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
        {withTopic && <span aria-hidden="true"> ➔</span>}
      </button>
      <p className={`form-status${status ? (status.ok ? " is-ok" : " is-error") : ""}`} id={withTopic ? "contact-form-status" : "form-status"} role="status">
        {status ? status.text : ""}
      </p>
    </form>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  async function submit(event) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus({ text: "Please enter a valid email address.", ok: false });
      return;
    }
    const { ok, body } = await postJson("/api/newsletter", { email: trimmed });
    if (ok && body && body.ok) {
      setStatus({ text: body.duplicate ? "You're already on the list." : "Subscribed — welcome aboard.", ok: true });
      setEmail("");
    } else {
      setStatus({ text: (body && body.error) || "Something went wrong.", ok: false });
    }
  }

  return (
    <>
      <form className="newsletter-form" id="newsletter-form" noValidate onSubmit={submit}>
        <label htmlFor="nl-email" className="sr-only">Email address</label>
        <input
          type="email"
          id="nl-email"
          name="email"
          placeholder="Your email address"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className="btn btn-primary">Subscribe</button>
      </form>
      <p className={`form-status${status ? (status.ok ? " is-ok" : " is-error") : ""}`} id="newsletter-status" role="status">
        {status ? status.text : ""}
      </p>
    </>
  );
}
