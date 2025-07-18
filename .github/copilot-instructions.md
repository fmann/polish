# Polish Language Learning PWA - AI Assistant Instructions

## Project Overview
This is a Progressive Web App (PWA) built with Vite for Polish language learning, featuring vocabulary quizzes, verb tenses, and grammatical cases practice.

## Core Data Structure
The app is entirely data-driven with 4 main JSON datasets:

- **`1000-words.json`** - Polish vocabulary with translations and example sentences
  - Structure: `{id, word, translation, category, exampleSentence, exampleSentenceTranslate}`
- **`tenses.json`** - Polish verb conjugations across perfective/imperfective aspects
  - Structure: 6 Polish tenses + 6 English equivalents (perfectivePast, imperfectivePast, etc.)
- **`cases.json`** - Polish grammatical cases with declensions
  - Structure: `{id, base: {nominative, genitive, dative, accusative, instrumental, locative, vocative}, translation, examples}`
- **`case-descriptions.json`** - Case usage explanations with Polish questions (kto? co?, kogo? czego?, etc.)

## Critical Polish Language Patterns

### Aspect System (Perfective vs Imperfective)
- **Perfective**: Completed actions - often with prefixes (za-, na-, po-, przy-)
- **Imperfective**: Ongoing/repeated actions - base verb forms
- Both aspects have identical present tense forms in `tenses.json`
- Future differs: perfective uses simple form, imperfective uses "będę + infinitive"

### Case System Architecture
Polish has 7 grammatical cases. Each noun in `cases.json` shows all declensions:
- Questions help identify cases: "kto? co?" (nominative), "kogo? czego?" (genitive)
- Examples show practical usage in context

## Data Conventions

### JSON Format Inconsistencies
- Files use JavaScript object notation (unquoted keys) rather than strict JSON
- Unicode characters appear as escape sequences (\xf3 for ó, \u0119 for ę)
- Some entries have missing periods in Polish text (intentional data pattern)

### Content Patterns
- All Polish examples use first person singular ("Napisałem", "Jadę")
- English translations maintain consistent tense mapping
- Vocabulary categories include: conjunction, noun, verb, adjective, etc.

## Development Guidelines

### PWA Requirements (per GEMINI.md)
- Build with Vite for modern PWA capabilities
- 4 main navigation sections: Polish→English vocab, English→Polish vocab, Tenses, Cases
- Quiz interface: show word → reveal answer with translations and examples
- Local JSON file consumption (no external APIs)

### UI/UX Patterns
- Progressive disclosure: word → reveal translation + examples
- Navigation between quiz items
- Focus on vocabulary retention through spaced repetition
- Mobile-first design for language learning on-the-go
- Use Tailwind.css for responsive design and styling
- Ensure installable PWA with offline capabilities
- It should be intuitive for users to switch between Polish and English contexts
- Maintain a clean, minimalistic interface to reduce cognitive load

### Data Handling
- Preserve Polish diacritics (ą, ć, ę, ł, ń, ó, ś, ź, ż)
- Handle unicode escape sequences in existing data
- Maintain aspect distinctions in verb presentations
- Show case contexts with appropriate Polish question words

### Performance Considerations
- `1000-words.json` is large (8000+ lines) - consider pagination or lazy loading
- Implement efficient filtering for quiz modes
- Cache strategy for offline PWA functionality

## Key Files for Context
- `GEMINI.md` - Original project specification and requirements
- All `.json` files contain learning data with specific linguistic structures
- Focus on Polish grammar accuracy over strict JSON compliance
