/* Simple */
export const mobile = '(max-width: 47.9em)'; // <= 767px
export const tablet = '(min-width: 48em)'; // >= 768px
export const smallDesktop = '(min-width: 64em)'; // >= 1024px
export const desktop = '(min-width: 90em)'; // >= 1440px

/* Prefixed with @media */
export const mobileMedia = `@media ${mobile}`; // <= 767px
export const tabletMedia = `@media ${tablet}`; // >= 768px
export const smallDesktopMedia = `@media ${smallDesktop}`; // >= 1024px
export const desktopMedia = `@media ${desktop}`; // >= 1440px
