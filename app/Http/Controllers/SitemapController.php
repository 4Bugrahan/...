<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $categories = Category::active()->get(['slug', 'updated_at']);
        $products   = Product::active()->with('category:id,slug')->get(['id', 'slug', 'category_id', 'updated_at']);
        $projects   = Project::orderBy('updated_at', 'desc')->get(['slug', 'updated_at']);

        $baseUrl = rtrim(config('app.url'), '/');

        $staticPages = [
            ['loc' => $baseUrl . '/',           'priority' => '1.0',  'changefreq' => 'weekly'],
            ['loc' => $baseUrl . '/urunler',     'priority' => '0.9',  'changefreq' => 'weekly'],
            ['loc' => $baseUrl . '/projeler',    'priority' => '0.8',  'changefreq' => 'weekly'],
            ['loc' => $baseUrl . '/kurumsal',    'priority' => '0.7',  'changefreq' => 'monthly'],
            ['loc' => $baseUrl . '/referanslar', 'priority' => '0.6',  'changefreq' => 'monthly'],
            ['loc' => $baseUrl . '/iletisim',    'priority' => '0.6',  'changefreq' => 'monthly'],
            ['loc' => $baseUrl . '/kvkk',        'priority' => '0.3',  'changefreq' => 'yearly'],
        ];

        $xml = view('sitemap', compact('staticPages', 'categories', 'products', 'projects', 'baseUrl'))->render();

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
