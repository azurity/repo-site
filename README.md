# repo-site

This is a tool to help you build a site showing your projects easily.

## use

-   first:

    ```sh
    npm install
    ```

-   second: Change the `template-config.json` to add your personal information that you want to show on your site.

-   third:

    ```sh
    npm run build
    ```

-   finally: Files in folder named `dist` are your site, write something to develop your site.

## How to use files in `dist` folder

-   `projects.json`: describe your projects. For example:
    ```json
    [
        {
            "name": "repo-site",
            "image": "",
            "description": "a tool to build repo site easily."
        }
    ]
    ```
-   folders named same as your project's names. This is used to save the detail of your project. For example:
    ```
    - dist
        |- repo-site
            |- detail.json
            |- index.md
            |- ...
        |- ...
    ```
-   `detail.json`: The information of your project. For example:

    ```json
    {
        "name": "repo-site",
        "type": "repo",
        "version": {
            "value": "1.0.0",
            "url": ""
        },
        "license": {
            "name": "MIT",
            "url": ""
        },
        "repository": {
            "repoName": "azurity/repo-site",
            "url": "https://github.com/azurity/repo-site"
        }
    }
    ```
    > if type is project, this means a project has not only one repo.

-   `index.md`: The cotent that will show on the project page. You can config the markdown syntax by changing the `src/md.ts`(I use [markdown-it](https://markdown-it.github.io/) parsing markdown files. To change the style of code, change `src/main.css`. I use [highlight.js](https://highlightjs.org/) in this porject.)
