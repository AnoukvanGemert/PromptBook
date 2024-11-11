<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit52e4245aae4436462e6e5d6ba4ebe8ec
{
    public static $prefixLengthsPsr4 = array (
        'D' => 
        array (
            'DeepDiveAPI\\' => 12,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'DeepDiveAPI\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit52e4245aae4436462e6e5d6ba4ebe8ec::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit52e4245aae4436462e6e5d6ba4ebe8ec::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit52e4245aae4436462e6e5d6ba4ebe8ec::$classMap;

        }, null, ClassLoader::class);
    }
}
