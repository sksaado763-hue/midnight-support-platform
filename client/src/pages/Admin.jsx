import { useEffect, useState } from "react";
import { useTitle } from "../lib/useReveal";
import { deleteJson, getJson } from "../lib/api";
import { SOURCES, TIME_ZONES } from "../components/Forms";

/* The form stores slugs, so read them back through the same tables that built
   the dropdowns rather than duplicating the wording here. */
const labelFor = (rows, value) => (rows.find(([v]) => v === value) || [])[1] || "";

export default function Admin() {
  useTitle("Admin Inbox | Just After Midnight");
  const [messages, setMessages] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([getJson("/api/messages"), getJson("/api/subscribers")])
      .then(([m, s]) => {
        if (active) {
          setMessages(m);
          setSubscribers(s);
        }
      })
      .catch((err) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, []);

  async function remove(id) {
    const result = await deleteJson(`/api/messages/${id}`).catch(() => null);
    if (result && result.ok) setMessages((list) => list.filter((m) => m.id !== id));
  }

  if (error) return <p className="empty-note">{error}</p>;
  if (!messages || !subscribers) return <p className="empty-note">Loading inbox…</p>;

  return (
    <>
      <section className="page-hero page-hero--admin">
        <div className="container">
          <h1 className="page-hero-title reveal">Admin Inbox</h1>
          <p className="page-hero-sub reveal">Messages and newsletter signups submitted through the site land here. Demo tooling — no auth in front by design.</p>
        </div>
      </section>

      <section className="admin-section">
        <div className="container">
          <div className="admin-grid">
            <div className="admin-panel reveal">
              <div className="admin-panel-head">
                <h2>Messages <span className="admin-count">{messages.length}</span></h2>
              </div>
              {!messages.length ? (
                <p className="empty-note">No messages yet. Submit the contact form and it'll appear here.</p>
              ) : (
                <ul className="message-list" id="message-list">
                  {messages.map((m) => (
                    <li className="message-item" data-id={m.id} key={m.id}>
                      <div className="message-head">
                        <div>
                          <p className="message-name">
                            {m.name}
                            {m.company && <span className="message-company"> · {m.company}</span>}
                          </p>
                          <p className="message-meta">
                            <a href={`mailto:${m.email}`}>{m.email}</a>
                            {m.phone && <> · <a href={`tel:${m.phone}`}>{m.phone}</a></>}
                            {m.timezone && <> · {labelFor(TIME_ZONES, m.timezone)}</>}
                            {m.source && <> · via {labelFor(SOURCES, m.source)}</>} ·{" "}
                            <time dateTime={new Date(m.createdAt).toISOString()}>{new Date(m.createdAt).toLocaleString("en-GB")}</time>
                          </p>
                        </div>
                        <button className="message-delete" data-id={m.id} title="Delete message" aria-label={`Delete message from ${m.name}`} onClick={() => remove(m.id)}>
                          ✕
                        </button>
                      </div>
                      <p className="message-body">{m.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="admin-panel reveal">
              <div className="admin-panel-head">
                <h2>Newsletter subscribers <span className="admin-count">{subscribers.length}</span></h2>
              </div>
              {!subscribers.length ? (
                <p className="empty-note">No subscribers yet.</p>
              ) : (
                <ul className="subscriber-list">
                  {subscribers.map((s) => (
                    <li className="subscriber-item" key={s.id}>
                      <span>{s.email}</span>
                      <time dateTime={new Date(s.createdAt).toISOString()}>{new Date(s.createdAt).toLocaleDateString("en-GB")}</time>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
