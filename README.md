# Documentation server based on hads

> **Hads** is a fast Node.js based web server allowing to browse, search and edit documentation written in
[Markdown](http://daringfireball.net/projects/markdown/).

**Features**:

- No configuration needed
- Github-like presentation
- GFM ([Github Flavoured Markdown](https://guides.github.com/features/mastering-markdown/))
- Automatic indexation and search
- In-browser editor
- Table of contents using Markdown extension `[[toc]]`
- Navigation index using Markdown extension `[[index]]`
- Diagrams and flowcharts using [Mermaid](http://knsv.github.io/mermaid/) syntax
- Drag'n drop images
- 100% offline
- Custom CSS style


## Usage

```bash
yarn dev | yarn start
```

Your browser will open `http://localhost:4040` and display your project documentation.

### Command-line options

```
Usage: hads [root dir] [options]

Options:
  -p, --port        Port number to listen on       [default: 4040]
  -h, --host        Host address to bind to        [default: "localhost"]
  -i, --images-dir  Directory to store images      [default: "images"]
  -o, --open        Open default browser on start
  -r, --readonly    Read-only mode (no add or edit feature)
  -e, --export      Export static HTML             [default: "./public"]
  --help            Show this help
```

If no root dir is specified, `./` will be used.

## Extras

### Home page

The server will automatically search for a file named `index.md`, `readme.md` or `README.md` on the specified
documentation root and will use it as your home page.

You can customize the CSS style in a file named `custom.css`.

### Table of contents

The special text `[[toc]]` will be replaced by the table of contents of the markdown document, based on headings.

### Navigation index

The special text `[[index]]` will be replaced by the full navigation index of all markdown files found under the
specified *root dir*. File and folder names will be *humanized* for better readability.

It is particularly useful on the home page to provide an overview of the available documentation for your project.

### Diagrams and flowcharts

You can use the [Mermaid](http://knsv.github.io/mermaid/) syntax to insert diagrams and flowcharts directly in your
markdown, but using code blocks with the `mermaid` language specified, like this:

    ```mermaid
    graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->D;
    ```

Mermaid [configuration](https://mermaidjs.github.io/mermaidAPI.html) can be overridden on a given page using the global variable `MERMAID_CONFIG` in a `<script>` tag, for example:

```html
<script>
MERMAID_CONFIG = { theme: 'forest' };
</script>
```

## Variants
- [hads-plantuml](https://www.npmjs.com/package/hads-plantuml): Adds PlantUML support for diagrams