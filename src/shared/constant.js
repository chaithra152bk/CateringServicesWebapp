import { baseUrl } from "../services/config/environment";

export default {
    role_url: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
    ACCESS_TOKEN: "access_token",
    ENGLISH_LANGUAGE_CODE: "en",
    NORWAY_LANGUAGE_CODE: "nb",
    API_ENGLISH_LANGUAGE_CODE: "en-US",
    API_NORWAY_LANGUAGE_CODE: "nb-NO",
    CANDIDATE_ROLE: "candidate",
    RECRUITER_ROLE: "recruiter",
    PHONE_NUMBER_REG_EXP: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
    LOGIN_SCREEN: "/login",
    SIGNUP_SCREEN: "/candidate-register",
    RECRUITER_SIGNUP_SCREEN: "/recruiter-register",
    SIGNUP_CONFIRMATION_SUCCESS_SCREEN: "/auth-verify",
    FORGOT_PASSWORD_SCREEN: "/forgot-password",
    CANDIDATE_PROFILE_EDIT_SCREEN: "/veg",
    RECRUITER_PROFILE_EDIT_SCREEN: "/recruiter-profile-edit",
    FORGOT_PASSWORD_RESET_SCREEN: "/reset-password",
    PASSWORD_RESET_SUCCESS_SCREEN: "/password-reset-success",
    PASSWORD_RESET_FAILURE_SCREEN: "/password-reset-fail",
    LINKEDIN_SIGNIN: "/linkedInSignIn",
    FORGOT_PASSWORD_SUCCESS: "/forgot-password-success",
    SIGNUP_SUCCESS: "/signup-success",
    LINKEDIN_URL: "https://www.linkedin.com/oauth/v2/authorization",
    LINKEDIN_KEY: "77c59049oufz00",
    LINKEDIN_REDIRECT_URI: `https://globallineupweb.azurewebsites.net/linkedInSignIn`,// `http://localhost:3000/linkedInSignIn`
    WEBSITE_URI: `https://globallineupweb.azurewebsites.net`,
    LINKEDIN_RESPONSE_TYPE: "code",
    LINKEDIN_SCOPE: "r_liteprofile,r_emailaddress",
    CHANGE_PASSWORD_SCREEN: "/change-password",
    RECRUITER_POST_JOB_SCREEN: "/recruiter-job-post",
    JOB_LIST_SCREEN: "/recruiter-jobs",
    USER_SETTINGS: "/settings",
    JOBS_SCREEN: "/jobs",
    CANDIDATE_DETAIL_SCREEN: "/candidate-detail",
    CANDIDATE_APPLIED_JOBS_SCREEN: "/applied-jobs",
    SEARCH_SCREEN: "/search",
    RECRUITER_CANDIDATE_SEARCH_SCREEN: "/recruiter/candidate/search",
    CANDIDATE_SEARCH_SCREEN: "/candidate/search",
    ERROR_PAGE: "/404",
    HOME_PAGE: "/",
    HOME_PAGE_MAIN_WEBSITE: "https://www.globallineup.com/",
    COOKIE_PAGE: "/cookie",
    CANDIDATE_APPLIED_JOBS_DETAIL_SCREEN: "/candidates-applied",
    RECRUITER_DASHBOARD: "/dashboard",
    success: "success",
    error: "error",
    FETCH_ROLE: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    MALE: 1,
    FEMALE: 2,
    OTHER: 3,
    DO_NOT_WISHTO_SPECIFY: 4,
    GENERAL_INTEREST: 1,
    ACTIVELY_SEARCHING: 2,
    NOT_SEARCHING: 3,
    DRAFT: 1,
    PENDING_APPROVAL: 2,
    APPROVED: 3,
    INACTIVE: 4,
    YEARS: "years",
    YEAR: "year",
    MONTHS: "months",
    MONTH: "month",
    LINKEDIN_EXPIRY_END_YEAR: 7,
    FROM_YEAR: 1960,
    DOB_BACK_YEAR: 100,
    MAX_LENGTH: 1000,
    DOB_TILL_YEAR: 20,
    DOB_BACK_MONTH: 0,
    DOB_TILL_MONTH: 11,
    EXPIRY_BACK_MONTH: 0,
    EXPIRY_TILL_MONTH: 11,
    EXPIRY_DATE_TILL_YEAR: 5,
    STATES: "states",
    INDUSTRY: "industry",
    JOB_FUNCTION: "jobFunction",
    INDUSTRY_CATEGORY: "industryCategory",
    LOCATION: "location",
    OPPORTUNITY: "opportunity",
    AVAILABILITY: "availability",
    CURRENT_PAGE: "currentPage",
    NATIONALITY: "nationality",
    SKILL: "skill",
    LANGUAGE: "language",
    COUNTRY: "country",
    SEARCH: "search",
    SEARCH_TEXT: "searchText",
    APPROVEDON: "approvedOn",
    EXPIRESON: "expiresOn",
    DEGREE: "degree",
    YES: true,
    NO: false,
    RECENT_JOB_TO_SHOW: 6,
    AVAILABILITY_QUERY: 'a',
    LOCATION_QUERY: 'l',
    INDUSTRY_QUERY: 'i',
    JOB_FUNCTION_QUERY: 'jf',
    INDUSTRY_CATEGORY_QUERY: 'ic',
    DUMMY_INDUSTRY_CATEGORY_QUERY: 'dic',
    SKILL_QUERY: 'sk',
    OPPORTUNITY_QUERY: 'o',
    CURRENT_PAGE_QUERY: "c",
    PAGE_SIZE_QUERY: "s",
    NATIONALITY_QUERY: 'n',
    SEARCH_QUERY: 'q',
    LANGUAGE_QUERY: 'la',
    COUNTRY_QUERY: 'ce',
    GENDER_QUERY: 'g',
    STATES_QUERY: 'st',
    DUMMY_STATES_QUERY: 'ds',
    SORTBY_QUERY: 'sortBy',
    DEGREE_QUERY: 'd',
    GENDER: 'gender',
    DEFAULT_CURRENT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 10,
    PAGINATION_SLIDER_LIMIT: 5,
    PAGINATION_SLIDER_START_PAGE: 1,
    BOTTOM: 'bottom',
    COOKIE_ACCEPTED: "CookieAccepted",
    FILE_SIZE: 2194304,
    CREATE_OPTION_POSITION: "first",
    DEFAULT_NO_OF_RANDOM_CANDIDATES: 6,
    NORWAY_COUNTRY_CODE: 123,
    INDUSTRY_LIST: "industryList",
    LANGUAGE_LIST: "languageList",
    LOCATION_LIST: "locationList",
    COUNTRY_LIST: "countryList",
    REASON_LIST: "Others",
    TRANS_LIST: "Annet",
    SKILL_LIST: "skillList",
    DRAFT: 1,
    PENDING_APPROVAL: 2,
    APPROVED: 3,
    IN_ACTIVE: 4,
    ALL_USERS: 0,
    RECRUITERS_ONLY: 1,
    INVISIBLE: 2,
    DOWNLOAD_ATTACHMENT: "downloadAttachment",
    DOC_SIZE: 2194304,
    SEND_MAIL: 'sendMail',
    LOGOUT: 'logout',
    OPPORTUNITY_TYPE_1: 1,
    OPPORTUNITY_TYPE_2: 2,
    OPPORTUNITY_TYPE_3: 3,
    OPPORTUNITY_TYPE_4: 4,
    OPPORTUNITY_TYPE_5: 5,
    OPPORTUNITY_TYPE_6: 6,
    OPPORTUNITY_TYPE_7: 7,
    OPPORTUNITY_TYPE_8: 8,
    HIGHSCHOOL_LEVEL: 1,
    ASSOCIATE_LEVEL: 2,
    BACHELOR_LEVEL: 3,
    MASTERS_LEVEL: 4,
    PHD_ABOVE_LEVEL: 5,
    LINKEDIN_PAGE: "https://www.linkedin.com/company/inter-nationals",
    INSTAGRAM_PAGE: "https://www.instagram.com/globallineup/",
    FACEBOOK_PAGE: "https://www.facebook.com/InterNationalsinNorway",
    TWITTER_PAGE: "https://twitter.com/global_lineup",
    ENGLISH_ONLY: 40,
    NORWEGIAN_ONLY: 115,
    ENGLISH_ONLY_AND_NORWEGIAN_ONLY: 185,
    REMOTE_WORKING_ID: 15850
};