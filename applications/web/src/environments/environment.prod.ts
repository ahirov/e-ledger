import { credentials } from "./credentials";

const webApiUrl = "https://identitytoolkit.googleapis.com/v1/accounts:";
const webApiParameter = `?key=${credentials.webApiKey}`;

export const environment = {
    production: true,
    webApiUpdateUrl: `${webApiUrl}update${webApiParameter}`,
    webApiSignupUrl: `${webApiUrl}signUp${webApiParameter}`,
    webApiLoginUrl:  `${webApiUrl}signInWithPassword${webApiParameter}`,

    pagePreviewItemsCount: 3,
    pageItemsCount: 6,

    sumMaxValue: 9999999.99,
    enumerationMaxLength: 22,
    descriptionMaxLength: 48,
    truncateLength: 20,
};
