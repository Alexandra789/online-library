export const CHECK_LETTER_AND_NUMBER = /^[a-zA-Z0-9]+$/;
export const CHECK_NUMBER = /\d/;
export const CHECK_ENG_LETTER = /[A-z]/;
export const CHECK_RUS_LETTER = /[А-яЁё]/;
export const CHECK_UPPER_LETTER = /[A-Z-А-ЯЁ]/;
export const CHECK_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
export const CHECK_PASSWORD = /^(?=(?:[^A-Z]*[A-Z]){1,}[^A-Z]*$)(?=(?:[^a-z]*[a-z]){1,}[^a-z]*$)(?=(?:\D*\d){1,}\D*$)[A-Za-z\d]{8,}$/
