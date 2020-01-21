import React from 'react';


const baseTheme = {
    blueberry: '#6B7A8F',
    apricot: '#F7882F',
    citrus: '#F7C331',
    apple: '#DCC7AA',
    white: '#FFFFFF',
    black: '#000000'
};


export interface Colors {
    headerBackground: string;
    headerBoxShadow: string;
    boxShadow: string;
    mainTextColor: string;
    blueberry: string;
    apricot: string;
    citrus: string;
    apple: string;
}

export interface ThemeExtended {
    colors: Colors;
}

export const appTheme: ThemeExtended = {
    colors: {
        headerBackground: baseTheme.blueberry,
        headerBoxShadow: baseTheme.apricot,
        boxShadow: baseTheme.blueberry,
        mainTextColor: baseTheme.citrus,
        blueberry: baseTheme.blueberry,
        apricot: baseTheme.apricot,
        citrus: baseTheme.citrus,
        apple: baseTheme.apple,
    }
};

export const ThemeContext = React.createContext<ThemeExtended>(appTheme as ThemeExtended);