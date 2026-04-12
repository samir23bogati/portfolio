# Project Rules

## Skill Loading
At the start of each session, analyze the current project to determine its type and load the appropriate skill:

- **Flutter/Dart project** (pubspec.yaml, lib/, .dart files): Load skill `senior-flutter-dev`
- **React/Node.js project** (package.json with react, src/components/, api/): Load skill `senior-fullstack-dev`

Use the skill tool to load: `skill({ name: "appropriate-skill-name" })`

## Available Skills
- `senior-fullstack-dev`: React 18, Node.js, Express, MongoDB, Firebase stack conventions
- `senior-flutter-dev`: Flutter/Dart mobile development conventions
