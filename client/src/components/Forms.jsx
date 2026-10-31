import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { postJson } from "../lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* Loose on purpose: the field takes local and international formats, so the
   only hard rule is enough digits to actually be a number. */
const PHONE_RE = /^[+()\d][\d\s()+.-]{6,23}$/;

export const SOURCES = [
  ["", "Please Select"],
  ["search", "Found us on a search engine"],
  ["referral", "A client or partner recommended you"],
  ["linkedin", "LinkedIn"],
  ["existing", "We already work with you"],
  ["event", "An event or meetup"],
  ["other", "Somewhere else"],
];

export const TIME_ZONES = [
  ["", "Please Select"],
  ["pkt", "Pakistan / Gulf (UTC+4 to +5)"],
  ["gmt", "United Kingdom & Ireland (UTC+0 to +1)"],
  ["cet", "Continental Europe (UTC+1 to +2)"],
  ["est", "North America — East (UTC−5 to −4)"],
  ["pst", "North America — West (UTC−8 to −7)"],
  ["sgt", "South & East Asia (UTC+7 to +9)"],
  ["aest", "Australia & New Zealand (UTC+9.5 to +12)"],
  ["any", "Any region — whichever shift is awake"],
];

function Options({ rows }) {
  return rows.map(([value, label]) => <option value={value} key={value || "blank"}>{label}</option>);
}

/* The contact page form is short on purpose: name, company, email, message and
   a consent box, validated with Yup so every rule lives in one schema. */
const CONTACT_SCHEMA = Yup.object({
  name: Yup.string()
    .trim()
    .required("Please tell us your name.")
    .min(2, "That name looks a little short.")
    .max(80, "Please keep your name under 80 characters."),
  company: Yup.string()
    .trim()
    .max(120, "Please keep the company name under 120 characters."),
  email: Yup.string()
    .trim()
    .required("We need an email address to reply to.")
    .email("That email address doesn't look right.")
    .max(160, "That email address is too long."),
  message: Yup.string()
    .trim()
    .required("Let us know what you need help with.")
    .min(10, "A sentence or two helps us route this properly.")
    .max(2000, "Please keep this under 2,000 characters."),
  consent: Yup.bool().oneOf([true], "Please confirm we can contact you about this."),
});

function FieldError({ name, errors, touched }) {
  if (!touched[name] || !errors[name]) return null;
  return (
    <p className="field-error" id={`cf-${name}-error`}>
      {errors[name]}
    </p>
  );
}

export function ContactPageForm({ presetPackage = "" }) {
  const [status, setStatus] = useState(null);
  const messagePlaceholder = presetPackage
    ? `We're interested in the ${presetPackage} package for our platform. Tell us what you're running…`
    : "Tell us what you're running, what hurts, and when it hurts most.";

  return (
    <Formik
      initialValues={{ name: "", company: "", email: "", message: "", consent: false, marketing: false }}
      validationSchema={CONTACT_SCHEMA}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        setStatus(null);
        try {
          const { ok, body } = await postJson("/api/contact", {
            name: values.name.trim(),
            company: values.company.trim(),
            email: values.email.trim(),
            message: values.message.trim(),
          });
          if (ok && body && body.ok) {
            if (values.marketing) {
              postJson("/api/newsletter", { email: values.email.trim() }).catch(() => {});
            }
            const firstName = values.name.trim().split(/\s+/)[0];
            setStatus({ text: `Thanks ${firstName} — we'll be in touch within one working day.`, ok: true });
            resetForm();
          } else {
            setStatus({ text: (body && body.error) || "Something went wrong — please try again.", ok: false });
          }
        } catch {
          setStatus({ text: "We couldn't reach the server — please try again.", ok: false });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="contact-form enquiry-form reveal" id="contact-form" noValidate>
          <div className="enquiry-head">
            <h2>Send us a message</h2>
            <p>Tell us what you're running, what hurts, and when it hurts most. A cloud engineer will get back to you within one working day.</p>
          </div>

          <div className="form-row form-row--split">
            <div className="form-row">
              <label htmlFor="cf-name">Your name<span className="req" aria-hidden="true"> *</span></label>
              <Field
                id="cf-name"
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby={touched.name && errors.name ? "cf-name-error" : undefined}
              />
              <FieldError name="name" errors={errors} touched={touched} />
            </div>
            <div className="form-row">
              <label htmlFor="cf-company">Company name<span className="opt"> (optional)</span></label>
              <Field
                id="cf-company"
                name="company"
                type="text"
                autoComplete="organization"
                aria-invalid={Boolean(touched.company && errors.company)}
                aria-describedby={touched.company && errors.company ? "cf-company-error" : undefined}
              />
              <FieldError name="company" errors={errors} touched={touched} />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="cf-email">Your email address<span className="req" aria-hidden="true"> *</span></label>
            <Field
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={touched.email && errors.email ? "cf-email-error" : undefined}
            />
            <FieldError name="email" errors={errors} touched={touched} />
          </div>

          <div className="form-row form-row--grow">
            <label htmlFor="cf-message">Message<span className="req" aria-hidden="true"> *</span></label>
            <Field
              as="textarea"
              id="cf-message"
              name="message"
              rows={3}
              placeholder={messagePlaceholder}
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={touched.message && errors.message ? "cf-message-error" : undefined}
            />
            <FieldError name="message" errors={errors} touched={touched} />
          </div>

          <label className="consent-row" htmlFor="cf-consent">
            <Field
              id="cf-consent"
              name="consent"
              type="checkbox"
              aria-invalid={Boolean(touched.consent && errors.consent)}
              aria-describedby={touched.consent && errors.consent ? "cf-consent-error" : undefined}
            />
            <span>I agree to Just After Midnight using these details to reply to my enquiry.<span className="req" aria-hidden="true"> *</span></span>
          </label>
          <FieldError name="consent" errors={errors} touched={touched} />

          <label className="consent-row" htmlFor="cf-marketing">
            <Field id="cf-marketing" name="marketing" type="checkbox" />
            <span>Send me occasional updates and offers from Just After Midnight by email — one click unsubscribes me.</span>
          </label>

          <div className="enquiry-actions">
            <button type="submit" className="btn btn-primary enquiry-submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Submit now"}
            </button>
            <p className={`form-status${status ? (status.ok ? " is-ok" : " is-error") : ""}`} id="contact-form-status" role="status">
              {status ? status.text : ""}
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export function ContactForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    timezone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const update = (field) => (event) => setValues((v) => ({ ...v, [field]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    const fullName = `${values.firstName} ${values.lastName}`.trim();
    if (!values.firstName || !values.lastName || !values.email || !values.phone || !values.message || !values.timezone) {
      setStatus({ text: "The starred fields all need an answer before this can reach a shift.", ok: false });
      return;
    }
    if (!EMAIL_RE.test(values.email)) {
      setStatus({ text: "That email address doesn't look right.", ok: false });
      return;
    }
    if (!PHONE_RE.test(values.phone)) {
      setStatus({ text: "That phone number doesn't look right — include the country code if you can.", ok: false });
      return;
    }
    setSending(true);
    const { ok, body } = await postJson("/api/contact", { ...values, name: fullName });
    if (ok && body && body.ok) {
      setStatus({ text: `Thanks ${values.firstName} — we'll be in touch within one working day.`, ok: true });
      setValues((v) => ({ ...v, firstName: "", lastName: "", email: "", phone: "", company: "", source: "", timezone: "", message: "" }));
    } else {
      setStatus({ text: (body && body.error) || "Something went wrong — please try again.", ok: false });
    }
    setSending(false);
  }

  return (
    <form className="footer-form" id="footer-form" noValidate onSubmit={submit}>
      <div className="form-row form-row--split">
        <div className="form-row">
          <label htmlFor="ff-first">First name<span className="req" aria-hidden="true"> *</span></label>
          <input type="text" id="ff-first" name="firstName" required autoComplete="given-name" value={values.firstName} onChange={update("firstName")} />
        </div>
        <div className="form-row">
          <label htmlFor="ff-last">Last name<span className="req" aria-hidden="true"> *</span></label>
          <input type="text" id="ff-last" name="lastName" required autoComplete="family-name" value={values.lastName} onChange={update("lastName")} />
        </div>
      </div>
      <div className="form-row form-row--split">
        <div className="form-row">
          <label htmlFor="ff-email">Email<span className="req" aria-hidden="true"> *</span></label>
          <input type="email" id="ff-email" name="email" required autoComplete="email" value={values.email} onChange={update("email")} />
        </div>
        <div className="form-row">
          <label htmlFor="ff-phone">Phone number<span className="req" aria-hidden="true"> *</span></label>
          <input type="tel" id="ff-phone" name="phone" required inputMode="tel" autoComplete="tel" placeholder="+92 300 0000000" value={values.phone} onChange={update("phone")} />
        </div>
      </div>
      <div className="form-row form-row--split">
        <div className="form-row">
          <label htmlFor="ff-company">Company<span className="opt"> (optional)</span></label>
          <input type="text" id="ff-company" name="company" autoComplete="organization" value={values.company} onChange={update("company")} />
        </div>
        <div className="form-row">
          <label htmlFor="ff-source">How did you hear about us?<span className="opt"> (optional)</span></label>
          <select id="ff-source" name="source" value={values.source} onChange={update("source")}>
            <Options rows={SOURCES} />
          </select>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="ff-message">How can we help?<span className="req" aria-hidden="true"> *</span></label>
        <textarea
          id="ff-message"
          name="message"
          rows={4}
          required
          placeholder="Tell us what you're running, what hurts, and when it hurts most."
          value={values.message}
          onChange={update("message")}
        />
      </div>
      <div className="form-row">
        <p className="form-note">Our engineers are spread across the clock, so tell us where you are and the shift that is already awake picks this up.</p>
        <label htmlFor="ff-timezone">Your preferred time zone<span className="req" aria-hidden="true"> *</span></label>
        <select id="ff-timezone" name="timezone" required value={values.timezone} onChange={update("timezone")}>
          <Options rows={TIME_ZONES} />
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>
      <p className={`form-status${status ? (status.ok ? " is-ok" : " is-error") : ""}`} id="form-status" role="status">
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
