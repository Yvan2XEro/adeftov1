<?php

return [
    'manifest' =>  [
        "short_name"=> "Cotisation ADEFTO",
        'name' => env('APP_NAME', 'Cotisation ADEFTO'),
        "display"=> "standalone",
        "theme_color"=> "#269510",
        "orientation"=> "portrait",
        "background_color"=> "#ffffff",
        "description"=> "Yo",
        "scope"=> "/",
        "start_url"=> "/",
        "icons" => [
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
        ]
    ]
];
