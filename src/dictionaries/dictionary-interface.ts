export interface DictionaryInterface {
    theme: Theme;
    main:  Main;
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

export interface Main {
    function: Function;
}

export interface Function {
    home:        string;
    activity:    string;
    todo:        string;
    institution: string;
}

export interface Theme {
    toggle:    string;
    light:     string;
    dark:      string;
    lightMode: string;
    darkMode:  string;
    system:    string;
}
