# JsBundle

Collection of JavaScript scripts and components as Symfony Bundle.

## Installation

1. Add the following lines into application composer.json file at "scripts" and "repositories" blocks.
    ```json
    "scripts": {
        "post-install-cmd": [
            ...
            "ArturDoruch\\JsBundle\\Composer\\ScriptHandler::installJs"
        ],
        "post-update-cmd": [
            ...
            "ArturDoruch\\JsBundle\\Composer\\ScriptHandler::installJs"
        ]
    },
    "repositories": [
        ...
        {
            "type": "vcs",
            "url": "https://github.com/arturdoruch/JsBundle"
        }
    ]
    ```

2. Install bundle by running cli command `composer require "arturdoruch/js-bundle"`

3. Register bundle in application kernel class.
    ```php
    public function registerBundles()
    {
        $bundles = [
            // ...
            new ArturDoruch\JsBundle\ArturDoruchJsBundle()
        ];
    }
    ```

4. Install assets `php bin/console assets:install --symlink`
