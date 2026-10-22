import { useEffect } from "react";

/* Scroll-reveal for whatever is in the DOM now, plus anything React adds later. */
export function useReveal() {
  useEffect(() => {
    const seen = new WeakSet();
    let observer = null;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
    }

    function mark(el) {
      if (seen.has(el)) return;
      seen.add(el);
      if (observer) observer.observe(el);
      else el.classList.add("is-visible");
    }

    function scan(root) {
      root.querySelectorAll(".reveal").forEach(mark);
    }

    scan(document);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.classList && node.classList.contains("reveal")) mark(node);
        scan(node);
      }));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const fallback = setTimeout(() => {
      if (!document.querySelector(".reveal.is-visible")) {
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      }
    }, 1200);

    return () => {
      clearTimeout(fallback);
      mutations.disconnect();
      if (observer) observer.disconnect();
    };
  }, []);
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
