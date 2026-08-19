import { loadPublicProjection } from "./wdw-public-runtime";

const shell = document.querySelector<HTMLElement>("[data-systems-shell]");

if (shell) {
  const notice = shell.querySelector<HTMLElement>(".projection-notice");
  const label = shell.querySelector<HTMLElement>("[data-projection-status]");
  const detail = shell.querySelector<HTMLElement>("[data-projection-detail]");
  const generated = shell.querySelector<HTMLElement>("[data-generated]");
  const evaluation = shell.querySelector<HTMLElement>("[data-evaluation]");

  const setText = (selector: string, value: string): void => {
    const element = shell.querySelector<HTMLElement>(
      `[data-metric="${selector}"]`,
    );
    if (element) element.textContent = value;
  };

  const formatNumber = (value: number | null, digits = 0): string =>
    value === null
      ? "Unavailable"
      : value.toLocaleString(undefined, { maximumFractionDigits: digits });

  const formatDate = (value: string): string => {
    const date = new Date(value);
    return Number.isFinite(date.getTime())
      ? date.toLocaleString()
      : "Unavailable";
  };

  const manifestUrl = shell.dataset.manifestUrl;
  if (!manifestUrl) {
    if (label) label.textContent = "Unavailable";
    if (detail)
      detail.textContent = "No public release manifest was configured.";
    notice?.classList.replace("loading", "unavailable");
  } else {
    void loadPublicProjection({ manifestUrl }).then((result) => {
      if (result.availability === "unavailable") {
        if (label) label.textContent = "Unavailable";
        if (detail)
          detail.textContent = "No verified public release is available.";
        notice?.classList.replace("loading", "unavailable");
        return;
      }

      const { systems } = result;
      const statusClass =
        result.freshness === "fresh" ? "ready" : result.freshness;
      notice?.classList.remove(
        "loading",
        "ready",
        "partial",
        "stale",
        "unavailable",
      );
      notice?.classList.add(statusClass);
      if (label)
        label.textContent =
          result.freshness === "fresh"
            ? "Verified"
            : result.freshness[0]!.toUpperCase() + result.freshness.slice(1);
      if (detail)
        detail.textContent =
          result.source === "last-known-good"
            ? "Showing the last locally verified release."
            : "Showing a verified, sanitized release delayed by 24 hours.";
      if (generated) generated.textContent = formatDate(systems.generatedAt);

      setText("residents.total", formatNumber(systems.residents.total));
      setText("residents.active", formatNumber(systems.residents.active));
      setText(
        "residents.needsAttention",
        formatNumber(systems.residents.needsAttention),
      );
      setText(
        "intelligence.thoughts",
        formatNumber(systems.intelligence.thoughts),
      );
      setText(
        "intelligence.candidates",
        formatNumber(systems.intelligence.candidates),
      );
      setText(
        "intelligence.reviewed",
        formatNumber(systems.intelligence.reviewed),
      );
      setText(
        "intelligence.meanSimilarity",
        formatNumber(systems.intelligence.meanSimilarity, 3),
      );
      setText(
        "intelligence.precisionAtK",
        formatNumber(systems.intelligence.precisionAtK, 3),
      );
      const quality = systems.intelligence.precisionAtKState.replaceAll(
        "-",
        " ",
      );
      setText("intelligence.modelQuality", quality);
      if (evaluation) evaluation.textContent = `Evaluation: ${quality}`;
    });
  }
}
