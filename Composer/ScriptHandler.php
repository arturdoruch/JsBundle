<?php

namespace ArturDoruch\JsBundle\Composer;

use Composer\Package\Package;
use Composer\Package\Version\VersionParser;
use Composer\Script\Event;
use Symfony\Component\Filesystem\Filesystem;

/**
 * @author Artur Doruch <arturdoruch@interia.pl>
 */
class ScriptHandler
{
    const JS_VERSION = '1.0.0';

    /**
     * Downloads js scripts from git repository
     * @link https://github.com/arturdoruch/Js
     *
     * @param Event $event
     */
    public static function installJs(Event $event)
    {
        $composer = $event->getComposer();

        $version = self::JS_VERSION;
        $targetDir = __DIR__ . '/../Resources/public/js';

        $versionParser = new VersionParser();
        $normalizedVersion = $versionParser->normalize($version);

        $package = new Package('arturdoruch/js', $normalizedVersion, $version);
        $package->setTargetDir($targetDir);
        $package->setInstallationSource('dist');
        $package->setSourceType('git');
        $package->setSourceReference($version);
        $package->setSourceUrl('https://github.com/arturdoruch/Js');

        // Download the JsBundle
        $downloader = $composer->getDownloadManager()->getDownloader('git');
        $downloader->download($package, $targetDir);

        // Remove unwanted files
        $files = array(
            $targetDir . '/.git',
            $targetDir . '/.gitignore'
        );

        $fs = new Filesystem();
        $fs->chmod($files, 0777, 0000, true);
        $fs->remove($files);
    }

}
