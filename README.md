# scss-partials

> offers simple and practical tools to manage a [`sass partials`](https://sass-guidelin.es/) structure

<br>

## install
```bash
npm i -g aa-sassp 
```

## usage
```sh
\\ create sass partials tree structre
sassp create

\\ add a file to a sass partial folder
sassp add -f components -n input
```

```
styles/
├── sass/
│   ├── abstracts/
│   │   ├── _colors.scss
│   │   ├── _types.scss
│   │   ├── _spacing.scss
│   │   └── _index.scss
│   ├── base/
│   │   ├── _base.scss
│   │   ├── _root.scss
│   │   ├── _reset.scss
│   │   └── _index.scss
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _lists.scss
│   │   └── _index.scss
│   ├── layouts
│   ├── pages
│   └── style.scss
└── style.css

```


## enjoy!