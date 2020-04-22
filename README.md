# JsBundle

Collection of JavaScript scripts and components as Symfony Bundle.

## Installation

Add the following lines into application composer.json file at "scripts" and "repositories" blocks.
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

Install bundle by running cli command.

```composer require "arturdoruch/js-bundle"```

Add ArturDoruchJsBundle to your application kernel

```php
public function registerBundles()
{
    return array(
        // ...
        new ArturDoruch\JsBundle\ArturDoruchJsBundle()
    );
}
```

Install assets

```console assets:install --symlink```
