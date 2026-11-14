import { useEffect, useRef, useState } from "react";
import { postJson } from "../lib/api";

const HOST = "Matt Hill";
const HOST_EMAIL = "matthew.hill@justaftermidnight.com";
const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const DAY_START = 9 * 60;
const DAY_END = 17 * 60;
const WEEKS_AHEAD = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const monthLabel = (y, m) => new Date(y, m, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
const longDate = (d) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
const fullDate = (d) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function timeLabel(minutes) {
  const h = Math.floor(minutes / 60);
  const m = String(minutes % 60).padStart(2, "0");
  return `${h % 12 || 12}:${m} ${h < 12 ? "am" : "pm"}`;
}

function bookingWindow() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const last = new Date(now.getFullYear(), now.getMonth(), now.getDate() + WEEKS_AHEAD * 7);
  return { first, last };
}

const isBookable = (date, { first, last }) => date >= first && date <= last && date.getDay() !== 0 && date.getDay() !== 6;

export default function BookingWidget({ context = "" }) {
  const [range] = useState(bookingWindow);
  const [view, setView] = useState(() => ({ y: range.first.getFullYear(), m: range.first.getMonth() }));
  const [duration, setDuration] = useState(30);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [step, setStep] = useState("pick");
  const [fields, setFields] = useState({ firstName: "", lastName: "", email: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const firstInput = useRef(null);

  useEffect(() => {
    if (step === "details") firstInput.current?.focus();
  }, [step]);

  const viewIndex = view.y * 12 + view.m;
  const canPrev = viewIndex > range.first.getFullYear() * 12 + range.first.getMonth();
  const canNext = viewIndex < range.last.getFullYear() * 12 + range.last.getMonth();
  const shiftMonth = (delta) => setView(({ y, m }) => ({ y: Math.floor((y * 12 + m + delta) / 12), m: (((m + delta) % 12) + 12) % 12 }));

  const lead = new Date(view.y, view.m, 1).getDay();
  const days = Array.from({ length: new Date(view.y, view.m + 1, 0).getDate() }, (_, i) => new Date(view.y, view.m, i + 1));
  const monthHasSlots = days.some((d) => isBookable(d, range));

  const slots = [];
  for (let t = DAY_START; t + duration <= DAY_END; t += duration) slots.push(t);

  const locked = step !== "pick";
  const summary = date && time !== null ? `${duration} mins · ${fullDate(date)} · ${timeLabel(time)} PKT · Teams` : "";

  function pickDate(d) {
    setDate(d);
    setTime(null);
  }

  function pickDuration(mins) {
    setDuration(mins);
    setTime(null);
  }

  function pickTime(t) {
    setTime(t);
    setStatus(null);
    setStep("details");
  }

  const update = (name) => (event) => {
    const { value } = event.target;
    setFields((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  async function confirm(event) {
    event.preventDefault();
    const firstName = fields.firstName.trim();
    const lastName = fields.lastName.trim();
    const email = fields.email.trim();
    const found = {};
    if (!firstName) found.firstName = "Please enter your first name.";
    if (!lastName) found.lastName = "Please enter your last name.";
    if (!EMAIL_RE.test(email)) found.email = "Please enter a valid email address.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    setStatus(null);
    try {
      const { ok, body } = await postJson("/api/contact", {
        name: `${firstName} ${lastName}`,
        email,
        timezone: "pkt",
        topic: "meeting",
        message: `Meeting request with ${HOST}: ${summary}.${context ? ` Booked from the ${context}.` : ""}`,
      });
      if (ok && body && body.ok) {
        setStep("done");
      } else {
        setStatus((body && body.error) || "Something went wrong — please try again.");
      }
    } catch {
      setStatus("We couldn't reach the server — please try again.");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setDate(null);
    setTime(null);
    setFields({ firstName: "", lastName: "", email: "" });
    setErrors({});
    setStatus(null);
    setStep("pick");
  }

  return (
    <div className="book-widget">
      <div className="book-cal">
        <span className="book-avatar" aria-hidden="true">
          <svg viewBox="0 0 56 56" width="56" height="56">
            <circle cx="28" cy="28" r="28" fill="#dfe3e8" />
            <circle cx="28" cy="21" r="10" fill="#b9c1cb" />
            <path d="M7 52c2.5-12 10.5-18 21-18s18.5 6 21 18z" fill="#b9c1cb" />
          </svg>
        </span>
        <p className="book-name">Meet with {HOST}</p>
        <div className="book-month">
          <button type="button" className="book-nav" onClick={() => shiftMonth(-1)} disabled={!canPrev || locked} aria-label="Previous month">‹</button>
          <span aria-live="polite">{monthLabel(view.y, view.m)}</span>
          <button type="button" className="book-nav" onClick={() => shiftMonth(1)} disabled={!canNext || locked} aria-label="Next month">›</button>
        </div>
        <div className="book-dow" aria-hidden="true">
          {DOW.map((d) => <span key={d}>{d}</span>)}
        </div>
        <div className="book-days">
          {Array.from({ length: lead }, (_, i) => <span key={`lead-${i}`} aria-hidden="true" />)}
          {days.map((d) => {
            const open = isBookable(d, range);
            const selected = sameDay(d, date);
            return (
              <button
                type="button"
                key={d.getDate()}
                className={`book-day${open ? " is-open" : ""}${selected ? " is-selected" : ""}`}
                disabled={!open || locked}
                aria-pressed={selected}
                aria-label={`${longDate(d)}${open ? "" : ", unavailable"}`}
                onClick={() => pickDate(d)}
              >
                {d.getDate()}
              </button>
            );
          })}
          {!monthHasSlots && <p className="book-none">No available dates in {new Date(view.y, view.m, 1).toLocaleDateString("en-GB", { month: "long" })}</p>}
        </div>
      </div>

      <div className="book-side">
        {step === "pick" && (
          <>
            <div className="book-field">
              <p className="book-label">Meeting location</p>
              <p className="book-loc">
                <svg viewBox="0 0 12 14" width="10" height="12" fill="none" aria-hidden="true">
                  <path d="M6 0C2.7 0 0 2.6 0 5.9 0 10.3 6 14 6 14s6-3.7 6-8.1C12 2.6 9.3 0 6 0Zm0 8.2a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Z" fill="#536475" />
                </svg>
                Teams
              </p>
            </div>
            <div className="book-field book-field--gap">
              <p className="book-label" id="book-dur-label">How long do you need?</p>
              <div className="book-durs" role="group" aria-labelledby="book-dur-label">
                {[30, 15].map((mins) => (
                  <button
                    type="button"
                    key={mins}
                    className={`book-dur${duration === mins ? " book-dur--on" : ""}`}
                    aria-pressed={duration === mins}
                    onClick={() => pickDuration(mins)}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>
            <hr className="book-rule" />
            {date ? (
              <div className="book-times">
                <p className="book-day-title">{longDate(date)}</p>
                <p className="book-tz">Times shown in Pakistan time (PKT, UTC+5)</p>
                <div className="book-slots" role="group" aria-label={`Available times on ${longDate(date)}`}>
                  {slots.map((t) => (
                    <button type="button" key={t} className="book-slot" onClick={() => pickTime(t)}>
                      {timeLabel(t)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <p className="book-gone">Pick a highlighted date to see<br />{HOST}'s open times.</p>
                <p className="book-mail-note">Prefer email? You can request a meeting at</p>
                <a className="book-mail" href={`mailto:${HOST_EMAIL}`}>
                  {HOST_EMAIL}
                  <svg viewBox="0 0 12 12" width="10" height="10" fill="none" aria-hidden="true">
                    <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </>
            )}
          </>
        )}

        {step === "details" && (
          <form className="book-form" noValidate onSubmit={confirm}>
            <button type="button" className="book-back" onClick={() => setStep("pick")} disabled={sending}>
              <span aria-hidden="true">‹</span> Back
            </button>
            <p className="book-label">Your information</p>
            <p className="book-summary">{summary}</p>
            {[
              ["firstName", "First name", "given-name", "text", 60],
              ["lastName", "Last name", "family-name", "text", 60],
              ["email", "Email", "email", "email", 160],
            ].map(([name, label, autoComplete, type, maxLength]) => (
              <div className="book-input" key={name}>
                <label htmlFor={`book-${name}`}>{label}<span aria-hidden="true"> *</span></label>
                <input
                  ref={name === "firstName" ? firstInput : undefined}
                  id={`book-${name}`}
                  name={name}
                  type={type}
                  autoComplete={autoComplete}
                  maxLength={maxLength}
                  value={fields[name]}
                  onChange={update(name)}
                  aria-invalid={Boolean(errors[name])}
                  aria-describedby={errors[name] ? `book-${name}-error` : undefined}
                />
                {errors[name] && <p className="book-error" id={`book-${name}-error`}>{errors[name]}</p>}
              </div>
            ))}
            <button type="submit" className="book-submit" disabled={sending}>
              {sending ? "Sending…" : "Confirm"}
            </button>
            <p className="book-status" role="status">{status || ""}</p>
          </form>
        )}

        {step === "done" && (
          <div className="book-done" role="status">
            <span className="book-done-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="book-gone">Request sent</p>
            <p className="book-summary">{summary}</p>
            <p className="book-mail-note">{HOST} will confirm by email with a Teams link, usually within one working day.</p>
            <button type="button" className="book-back book-again" onClick={reset}>Book another time</button>
          </div>
        )}
      </div>
    </div>
  );
}
