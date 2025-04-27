# Giraffix: Resume Builder

Welcome to **Giraffix**, a lightweight, modular resume builder built primarily for web deployment. This document is for **developers** looking to understand the project structure, how to contribute, and how to extend/customize the builder.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Folder Structure](#folder-structure)
- [Key Components](#key-components)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Development Guidelines](#development-guidelines)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

**Giraffix** allows users to create, edit, and export professional resumes using real-time form inputs linked directly to the resume preview. It features multiple customizable templates and the ability to export/import a proprietary `.giraffe` file format for easy resume management.

**Important:** This project is aimed at developers who want to:
- Extend the functionality (e.g., add more templates)
- Integrate new export formats
- Improve UX/UI

This is **NOT** end-user documentation.

---

## Folder Structure

```bash
Giraffix/
|-- index.html
|-- /css
|   |-- styles.css
|-- /js
|   |-- main.js
|   |-- templateManager.js
|   |-- fileHandler.js
|-- /templates
|   |-- template1.html
|   |-- template2.html
|-- /assets
|   |-- /images
|   |-- /icons
|-- /faq
|   |-- faq.html
|-- /giraffe_files
|-- README.md
```

### Key Points:
- `/templates/` contains HTML templates for resumes.
- `/giraffe_files/` is where exported/imported `.giraffe` JSON-based files are stored.
- `/js/` has the main application logic (split for organization).
- `/faq/faq.html` provides answers to common questions.

---

## Key Components

### 1. `main.js`
- Handles dynamic form bindings.
- Manages live preview updates.

### 2. `templateManager.js`
- Loads different resume templates dynamically.
- Switches templates without reloading the page.

### 3. `fileHandler.js`
- Supports exporting resume data as a `.giraffe` file.
- Handles importing `.giraffe` files back into the editor.

### 4. `styles.css`
- Global styles for layout, typography, and responsiveness.
- Individual template styles are inside respective HTML or scoped CSS.

---

## Technologies Used

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6+)**
- **JSON** (for `.giraffe` file structure)

> Note: No frameworks (React, Vue, etc.) are used in the core project to keep it lightweight.

---

## Setup and Installation

1. **Clone the Repository:**
```bash
git clone https://github.com/yourusername/giraffix.git
```

2. **Open in VS Code:**
Simply open the folder in Visual Studio Code or any preferred IDE.

3. **Live Server:**
It is recommended to use a live server extension for real-time updates.

4. **Navigate to `index.html`**
Open it in the browser to start.

---

## Development Guidelines

- Keep functions modular and isolated.
- Avoid global variables; use IIFE or modules.
- Comment complex logic clearly.
- Maintain cross-browser compatibility.
- Follow the existing file naming conventions.

### Adding a New Resume Template:
1. Create a new HTML file in `/templates/`
2. Define a div with class `resume-template`
3. Link any template-specific styles inside that file.
4. Register the new template in `templateManager.js`.

### Updating `.giraffe` Format:
- `.giraffe` files are JSON objects mapping form field IDs to values.
- Maintain compatibility if updating field names or structures.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Project maintained by **Meidad Troper**.

For inquiries, please open an issue on the repository.

---

Happy Building! 🐱🌟
