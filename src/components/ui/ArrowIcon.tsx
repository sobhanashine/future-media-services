const paths = {
  "up-right": "M7 7h10v10M7 17 17 7",
  left: "M19 12H5m7 7-7-7 7-7",
  down: "M12 5v14m-7-7 7 7 7-7",
} as const;

export function ArrowIcon({ direction = "up-right" }: { direction?: keyof typeof paths } = {}) {
  return (
    <span className="arrow-icon" aria-hidden="true">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <path d={paths[direction]} />
      </svg>
    </span>
  );
}
