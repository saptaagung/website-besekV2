/**
 * Shared admin UI classes — matches Besek mockups (ringkasan.md, pengaturan.md).
 */

/** Standard bordered field (gallery, login, product metadata). */
export const adminInput =
  "mt-1.5 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-body-md text-on-surface shadow-sm placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary-container";

export const adminInputMono = `${adminInput} font-mono text-xs md:text-sm`;

export const adminTextarea = `${adminInput} min-h-[80px] leading-relaxed`;

export const adminTextareaLg = `${adminInput} min-h-[120px] leading-relaxed`;

/** Pengaturan-style underline field */
export const adminFieldUnderline =
  "w-full border-0 border-b border-outline-variant bg-transparent py-2 text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-0";

export const adminTextareaUnderline = `${adminFieldUnderline} resize-none min-h-[72px]`;

export const adminSelect = adminInput;

export const adminLabel = "block text-label-sm font-medium text-on-surface-variant mb-1";

export const adminLabelStrong = "block text-label-md text-on-surface";

export const adminLabelMuted = "text-label-sm font-medium uppercase tracking-wide text-on-surface-variant";

export const adminHint = "mt-0.5 block text-label-sm text-on-surface-variant";

export const adminCard =
  "rounded-xl border border-surface-container-high bg-surface shadow-[0_4px_24px_rgba(85,107,47,0.03)]";

export const adminCardPadded = `${adminCard} p-5 md:p-6`;

export const adminBtnPrimary =
  "rounded-lg bg-primary px-5 py-2.5 text-label-md text-on-primary shadow-sm transition hover:opacity-90 disabled:opacity-60";

export const adminBtnPrimarySm =
  "rounded-lg bg-primary px-4 py-2 text-label-md text-on-primary shadow-sm transition hover:opacity-90 disabled:opacity-60";

export const adminBtnSecondary =
  "rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-label-md text-on-surface shadow-sm transition hover:bg-surface-container-low";

export const adminBtnDanger =
  "rounded-lg border border-error px-4 py-2.5 text-label-md text-error transition hover:bg-error-container hover:text-on-error-container";

export const adminErrorBanner =
  "rounded-lg border border-error-container bg-error-container/50 px-4 py-3 text-body-md text-on-error-container";
