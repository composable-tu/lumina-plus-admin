export interface DictionaryInterface {
    theme: Theme;
    login: Login;
}

export interface Login {
    welcome:           string;
    loginWith3rdParty: string;
    loginWithWeixin:   string;
    userId:            string;
    userIdPlaceholder: string;
    password:          string;
    forgotPassword:    string;
    login:             string;
    dontHaveAccount:   string;
    signUp:            string;
    agreeToTerms:      string;
    termsOfService:    string;
    and:               string;
    privacyPolicy:     string;
    userIdRequired:    string;
    passwordRequired:  string;
}

export interface Theme {
    toggle: string;
    light:  string;
    dark:   string;
    system: string;
}
