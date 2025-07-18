# Polish Language Learning PWA

A Progressive Web App built with Vite and React for learning Polish vocabulary, verb tenses, and grammatical cases.

## Features

- **4 Learning Modes:**
  - Polish → English vocabulary
  - English → Polish vocabulary
  - Verb tenses (perfective vs imperfective aspects)
  - Grammatical cases (7 Polish cases)

- **Interactive Quiz Interface:**
  - Progressive disclosure (show word → reveal answer)
  - Example sentences with context
  - Aspect comparisons for verbs
  - Complete case declensions

- **PWA Capabilities:**
  - Installable on mobile devices
  - Offline support with cached data
  - Responsive design for all screen sizes

## Data Structure

The app uses 4 main JSON datasets:

- `1000-words.json` - Polish vocabulary with translations and examples
- `tenses.json` - Verb conjugations across 6 tenses (perfective/imperfective)
- `cases.json` - Noun declensions across 7 grammatical cases
- `case-descriptions.json` - Explanations of case usage with Polish questions

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Polish Language Features

### Aspect System
- **Perfective**: Completed actions (often with prefixes: za-, na-, po-, przy-)
- **Imperfective**: Ongoing/repeated actions (base verb forms)

### Case System
Polish has 7 grammatical cases, each answering specific questions:
- Nominative (kto? co?) - Subject
- Genitive (kogo? czego?) - Possession/negation
- Dative (komu? czemu?) - Indirect object
- Accusative (kogo? co?) - Direct object
- Instrumental (kim? czym?) - Tool/means
- Locative (o kim? o czym?) - Location
- Vocative - Direct address

## Technical Notes

- Uses JavaScript object notation in JSON files (unquoted keys)
- Handles Unicode escape sequences for Polish diacritics
- Implements efficient data loading and caching strategies
- Mobile-first responsive design with Tailwind CSS

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. It is based on the [Polinguin](https://github.com/omersanik/polinguin) data.
