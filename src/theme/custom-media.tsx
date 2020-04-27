/* Simple */
export const extraSmall = '(max-width: 47.9em)'; // <= 767px
export const small = '(min-width: 48em)'; // >= 768px
export const medium = '(min-width: 64em)'; // >= 1024px
export const large = '(min-width: 90em)'; // >= 1440px

/* Prefixed with @media */
export const extraSmallMedia = `@media ${extraSmall}`; // <= 767px
export const smallMedia = `@media ${small}`; // >= 768px
export const mediumMedia = `@media ${medium}`; // >= 1024px
export const largeMedia = `@media ${large}`; // >= 1440px
