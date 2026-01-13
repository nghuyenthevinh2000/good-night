export type LanguageKey = 'en' | 'vi' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'zh' | 'pt' | 'it';

export interface Language {
    id: LanguageKey;
    name: string;
    nativeName: string;
}

export const LANGUAGES: Language[] = [
    { id: 'en', name: 'English', nativeName: 'English' },
    { id: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    { id: 'es', name: 'Spanish', nativeName: 'Español' },
    { id: 'fr', name: 'French', nativeName: 'Français' },
    { id: 'de', name: 'German', nativeName: 'Deutsch' },
    { id: 'ja', name: 'Japanese', nativeName: '日本語' },
    { id: 'ko', name: 'Korean', nativeName: '한국어' },
    { id: 'zh', name: 'Chinese', nativeName: '中文' },
    { id: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { id: 'it', name: 'Italian', nativeName: 'Italiano' },
];
