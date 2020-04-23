<?php

namespace ArturDoruch\JsBundle\Composer;

use Composer\Package\Package;
use Composer\Package\Version\VersionParser;
use Composer\Script\Event;
use Composer\Util\Filesystem;

/**
 * @author Artur Doruch <arturdoruch@interia.pl>
 */
class ScriptHandler
{
    /**
     * Downloads js scripts from git repository https://github.com/arturdoruch/Js
     *
     * @param Event $event
     */
    public static function installJs(Event $event)
    {
        $version = '1.2.0';
        $targetDir = __DIR__ . '/../Resources/public/js';
        $downloadDir = __DIR__ . '/../Resources/public/_js';

        if ($version === $installedVersion = self::getInstalledVersion($targetDir)) {
            //$event->getIO()->write('The JavaScript files from package arturdoruch/js v' . $version . ' are already installed.');
            return;
        }

        $versionParser = new VersionParser();
        $normalizedVersion = $versionParser->normalize($version);

        $package = new Package('arturdoruch/js', $normalizedVersion, $version);
        $package->setTargetDir($downloadDir);
        $package->setInstallationSource('dist');
        $package->setSourceType('git');
        $package->setSourceReference($version);
        $package->setSourceUrl('https://github.com/arturdoruch/Js');

        // Download the arturdoruch/js package and write into downloading dir.
        $composer = $event->getComposer();
        $downloader = $composer->getDownloadManager()->getDownloader('git');
        $downloader->download($package, $downloadDir);

        $filesystem = new Filesystem();
        // Remove unwanted files
        $filesystem->remove($downloadDir . '/.git');
        $filesystem->remove($downloadDir . '/.gitignore');

        $filesystem->copyThenRemove($downloadDir, $targetDir);
        self::writePackageVersion($version, $targetDir);
    }

    /**
     * @param string $targetDir
     *
     * @return null|string
     */
    private static function getInstalledVersion($targetDir)
    {
        if (!file_exists($filename = $targetDir . '/version.txt')) {
            return null;
        }

        return trim(file_get_contents($filename));
    }

    /**
     * Writes version of downloaded arturdoruch/js package into txt file.
     *
     * @param string $targetDir
     * @param string $version
     */
    private static function writePackageVersion($version, $targetDir)
    {
        file_put_contents($targetDir . '/version.txt', $version);
    }
}
