const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
} as const;

export type BreakpointKey = keyof typeof breakpoints;
export default breakpoints;
