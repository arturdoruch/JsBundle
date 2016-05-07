<?php

namespace ArturDoruch\JsBundle;

use Symfony\Component\HttpFoundation\Request;

/**
 * @author Artur Doruch <arturdoruch@interia.pl>
 */
class ResponseUtils
{
    /**
     * Gets parameters from ajax request.
     *
     * @param Request      $request
     * @param array|string $defaultKeys Default keys (if is array with their values) that should be in returned array.
     *
     * @return array
     */
    public static function getParameters(Request $request, $defaultKeys = null)
    {
        $params = static::parseJson($request->getContent(), $defaultKeys);
        if (!isset($params['limit'])) {
            $params['limit'] = null;
        }

        return $params;
    }

    /**
     * Parse json object into array
     *
     * @param string $json JSON object
     * @param array|string $defaultKeys Default keys (if is array with their values) which should be in returned array.
     *
     * @return array
     */
    public static function parseJson($json, $defaultKeys = null)
    {
        $data = array();

        if (!empty($defaultKeys)) {
            if (is_array($defaultKeys)) {
                $data = $defaultKeys;
            } else {
                $data[$defaultKeys] = null;
            }
        }

        if (!empty($json)) {
            $dataDecode = json_decode($json, true);

            if (is_array($dataDecode)) {
                $data = $dataDecode + $data;
            }
        }

        return $data;
    }
}
 