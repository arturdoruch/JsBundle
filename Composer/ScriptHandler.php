<?php

namespace ArturDoruch\JsBundle\Composer;

use Composer\Composer;
use Composer\Package\Package;
use Composer\Package\Version\VersionParser;
use Composer\Script\Event;
use Symfony\Component\Filesystem\Filesystem;

/**
 * @author Artur Doruch <arturdoruch@interia.pl>
 */
class ScriptHandler
{
    const JS_BUNDLE_VERSION = '1.0.0';

    /**
     * Downloads JavaScript scripts from JsBundle
     * @link https://github.com/arturdoruch/Js
     *
     * @param Event $event
     */
    public static function installJsAssets(Event $event)
    {
        $composer = $event->getComposer();

        //$version = self::getVersion($composer);
        $version = self::JS_BUNDLE_VERSION;
        $targetDir = __DIR__ . '/../Resources/public/js';

        $versionParser = new VersionParser();
        $normalizedVersion = $versionParser->normalize($version);

        $package = new Package('js-bundle', $normalizedVersion, $version);
        $package->setTargetDir($targetDir);
        $package->setInstallationSource('dist');
        $package->setSourceType('git');
        $package->setSourceReference($version);
        $package->setSourceUrl('https://github.com/arturdoruch/Js');

        // Download the JsBundle
        $downloader = $composer->getDownloadManager()->getDownloader('git');
        $downloader->download($package, $targetDir);

        // Remove unwanted files
        $fs = new Filesystem();
        $fs->remove(array(
                $targetDir . '/.git',
                $targetDir . '/.gitignore'
            ));
    }

    /**
     * Gets JsBundle version.
     *
     * @param Composer $composer
     * @return string
     */
    private static function getVersion(Composer $composer)
    {
        $packages = $composer->getRepositoryManager()->getLocalRepository()->findPackages('arturdoruch/js-bundle');

        if (!$package = array_shift($packages)) {
            throw new \RuntimeException('The "arturdoruch/js-bundle" package version could not be detected.');
        }

        $versionPaths = explode('.', $package->getPrettyVersion());
        $versionPaths[0] = $versionPaths[0] - 1;

        return implode('.', $versionPaths);
    }

}
