<?php

return [
    'manifest' =>  [
        // "short_name"=> "Cotisation ADEFTO",
        // 'name' => env('APP_NAME', 'Cotisation ADEFTO'),
        // "display"=> "standalone",
        // "theme_color"=> "#269510",
        // "orientation"=> "portrait",
        // "background_color"=> "#ffffff",
        // "description"=> "Yo",
        // "scope"=> "/",
        // "start_url"=> "/",
        // "icons" => [
        //     "192x192"=>[
        //         "path"=> "/icons/icon-192.png",
        //         "purpose"=> "any",
        //         'sizes' => '192x192',
        //     ],
        //     "256x256"=>[
        //         "path"=> "/icons/icon-256.png",
        //         "purpose"=> "any",
        //         'sizes' => '256x256',
        //     ],
        //     "384x384"=>[
        //         "path"=> "/icons/icon-384.png",
        //         "purpose"=> "any",
        //     ],
        //     "512x512"=>[
        //         "path"=> "/icons/icon-512.png",
        //         "purpose"=> "any",
        //         'sizes' => '512x512',
        //     ]
        // ]
        'name' => env('APP_NAME', 'My PWA App'),
        'short_name' => 'PWA',
        'start_url' => '/',
        'background_color' => '#ffffff',
        'theme_color' => '#000000',
        'display' => 'standalone',
        'orientation' => 'any',
        'status_bar' => 'black',
        'icons' => [
            '72x72' => [
                'path' => '/icons/icon-72x72.png',
                'purpose' => 'any'
            ],
            '96x96' => [
                'path' => '/icons/icon-96x96.png',
                'purpose' => 'any'
            ],
            '128x128' => [
                'path' => '/icons/icon-128x128.png',
                'purpose' => 'any'
            ],
            '144x144' => [
                'path' => '/icons/icon-144x144.png',
                'purpose' => 'any'
            ],
            '152x152' => [
                'path' => '/icons/icon-152x152.png',
                'purpose' => 'any'
            ],
            "192x192"=>[
                "path"=> "/icons/icon-192.png",
                "purpose"=> "any",
                'sizes' => '192x192',
            ],
            "256x256"=>[
                "path"=> "/icons/icon-256.png",
                "purpose"=> "any",
                'sizes' => '256x256',
            ],
            "384x384"=>[
                "path"=> "/icons/icon-384.png",
                "purpose"=> "any",
            ],
            "512x512"=>[
                "path"=> "/icons/icon-512.png",
                "purpose"=> "any",
                'sizes' => '512x512',
            ]
        ],
        'splash' => [
            '640x1136' => '/images/icons/splash-640x1136.png',
            '750x1334' => '/images/icons/splash-750x1334.png',
            '828x1792' => '/images/icons/splash-828x1792.png',
            '1125x2436' => '/images/icons/splash-1125x2436.png',
            '1242x2208' => '/images/icons/splash-1242x2208.png',
            '1242x2688' => '/images/icons/splash-1242x2688.png',
            '1536x2048' => '/images/icons/splash-1536x2048.png',
            '1668x2224' => '/images/icons/splash-1668x2224.png',
            '1668x2388' => '/images/icons/splash-1668x2388.png',
            '2048x2732' => '/images/icons/splash-2048x2732.png',
        ],
        'shortcuts' => [
            [
                'name' => 'Shortcut Link 1',
                'description' => 'Shortcut Link 1 Description',
                'url' => '/shortcutlink1',
                'icons' => [
                    "src" => "/images/icons/icon-72x72.png",
                    "purpose" => "any"
                ]
            ],
            [
                'name' => 'Shortcut Link 2',
                'description' => 'Shortcut Link 2 Description',
                'url' => '/shortcutlink2'
            ]
        ],
        'custom' => []
    ]
];
