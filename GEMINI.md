# Project: Polish Vocabulary PWA

This project will be a Progressive Web App (PWA) built with Vite to help users learn and test their Polish vocabulary.

## Core Functionality

*   **Top Level Navigation**
    * There will need to be 4 top level Navigation options
        * Vocabulary: Polish to English - uses data from 10000-words.json
        * Vocabulary: English to Polish - uses data from 10000-words.json
        * Tenses - uses data from tenses.json
        * Cases - uses data from cases.json
*   **Vocabulary Quizzes:**
    *   Users can test their knowledge by translating words from Polish to English.
    *   Users can also practice translating from English to Polish.
    *   They will see a word, then have the option to reveal the anser. The answer should display the translation as well as the example sentences in Polish and English.
    *   The user will need a way to advance to the next word.
*   **Data Sources:** The app will load vocabulary from the following local JSON files:
    *   `1000-words.json`
    *   `cases.json`
    *   `tenses.json`
*   **PWA Features:**
    *   The application will be installable on user devices.
    *   It will be designed to work offline, allowing for learning on the go.

## Technology Stack

*   **Build Tool:** Vite
*   **Framework:** React
*   **Language:** TypeScript
*   **CSS Framework:** Tailwind.css
