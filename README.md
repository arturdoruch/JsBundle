# JsBundle

Collection of useful JavaScript scripts as Symfony Bundle.

## Installation

Via composer. Add the following lines to your main composer.json file, "scripts" and "repositories" block.
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
// app/AppKernel.php
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
