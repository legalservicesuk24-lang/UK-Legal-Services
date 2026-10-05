/* Shared line-icon set for services — used by both the Services grid
   on the homepage and the dedicated service detail pages, so the visual
   language stays identical across routes. */
export const ICONS = {
  fileCheck: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6 2.5H12L15.5 6V16.5C15.5 17.05 15.05 17.5 14.5 17.5H6C5.45 17.5 5 17.05 5 16.5V3.5C5 2.95 5.45 2.5 6 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 2.5V6H15.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M7.5 11.5L9 13L12.5 9.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  scale: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.5 17H14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 3L4.5 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 3L15.5 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M2.5 8.8C2.5 8.8 3.3 10.8 4.5 10.8C5.7 10.8 6.5 8.8 6.5 8.8L4.5 4.9L2.5 8.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 8.8C13.5 8.8 14.3 10.8 15.5 10.8C16.7 10.8 17.5 8.8 17.5 8.8L15.5 4.9L13.5 8.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  fileClock: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6 2.5H11L14.5 6V9.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 2.5C5.45 2.5 5 2.95 5 3.5V16.5C5 17.05 5.45 17.5 6 17.5H9.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M11 2.5V6H14.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="13.5" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.5 12.2V14L14.7 14.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  database: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <ellipse cx="10" cy="5" rx="6" ry="2.3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 5V15C4 16.27 6.69 17.3 10 17.3C13.31 17.3 16 16.27 16 15V5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 10C4 11.27 6.69 12.3 10 12.3C13.31 12.3 16 11.27 16 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  workflow: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="3" width="6" height="4.2" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="11.5" y="12.8" width="6" height="4.2" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.5 7.2V11C5.5 12.1 6.4 13 7.5 13H11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.8 7.2H17M14.9 5.1L17 7.2L14.9 9.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  code: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7 6.5L3.5 10L7 13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 6.5L16.5 10L13 13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 4L9 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};
