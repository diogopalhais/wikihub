# Wikihub

 > Node.js based web server allowing to organize, search, create, edit and delete documentation written in [Markdown](http://daringfireball.net/projects/markdown/).

This project is based in the project [Hads](https://github.com/sinedied/hads).

![screenshot](https://cloud.githubusercontent.com/assets/593151/24351859/afb0b958-12e7-11e7-8ad4-8655e6b3c1c1.png)

**Added features**:

- Local Auth with passport.js
- Delete files

**Hads Core Features**:

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

### [Demo](https://wikihub.herokuapp.com)
```
username: user 
password: secret
```

## Usage

### Localhost

Copy and configure .env with desired user credentials

```bash
cp .env.example .env
```

Then

```bash
yarn start 
```

Your browser will open `http://localhost:4040` and display your project documentation.

Or using `nodemon`

```bash
yarn dev 
```

### Docker

```bash
docker build -t wikihub .
docker run -d -p 4040:4040 --name wikihub wikihub
```

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

### More Info

For more info you can view the [Hads](https://github.com/sinedied/hads) project.