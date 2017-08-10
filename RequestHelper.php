<?php

namespace ArturDoruch\JsBundle;

use Symfony\Component\HttpFoundation\Request;

/**
 * @author Artur Doruch <arturdoruch@interia.pl>
 */
class RequestHelper
{
    /**
     * Gets request parameters (form parameters or json data).
     *
     * @param Request $request
     * @param array $defaults The default parameters.
     *
     * @return array
     */
    public static function getParameters(Request $request, array $defaults = [])
    {
        $parameters = $request->request->all();

        if (empty($parameters) && $content = $request->getContent()) {
            $parameters = json_decode($content, true);

            if (JSON_ERROR_NONE !== $error = json_last_error()) {
                throw new \InvalidArgumentException('Invalid request JSON data. ' . $error);
            }
        }

        return array_merge($parameters, $defaults);
    }
}
