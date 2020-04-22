
# Symfony form collection type manager

## Install

Add the following js and css files into twig template:

 * `/bundles/arturdoruchjs/js/SymfonyFormCollection/formCollectionManager.js`
 * `/bundles/arturdoruchjs/js/SymfonyFormCollection/styles.css`
 * `/vendor/arturdoruch/css-styles/module.css` - For styling add/remove collection item buttons.

## Usage

Render the form collection

 * In template rendering the form:

    ```twig
    {% import '@ArturDoruchJs/SymfonyFormCollection/renderer.html.twig' as collectionRenderer %}
    
    {{ collectionRenderer.render(collectionForm) }}
    ```
    
 * In custom form template by overriding `collection_widget ` block:     
    ```
    {%- block collection_widget -%}
        {% import '@ArturDoruchJs/SymfonyFormCollection/renderer.html.twig' as renderer %}
        {{ renderer.render(form) }}
        {{- block('form_widget') -}}
    {%- endblock collection_widget -%}
    ```   