<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  {{-- Statik sayfalar --}}
  @foreach($staticPages as $page)
  <url>
    <loc>{{ $page['loc'] }}</loc>
    <changefreq>{{ $page['changefreq'] }}</changefreq>
    <priority>{{ $page['priority'] }}</priority>
  </url>
  @endforeach

  {{-- Kategori sayfaları --}}
  @foreach($categories as $cat)
  <url>
    <loc>{{ $baseUrl }}/urunler/{{ $cat->slug }}</loc>
    @if($cat->updated_at)<lastmod>{{ $cat->updated_at->toAtomString() }}</lastmod>@endif
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  @endforeach

  {{-- Ürün sayfaları --}}
  @foreach($products as $product)
  @if($product->category)
  <url>
    <loc>{{ $baseUrl }}/urunler/{{ $product->category->slug }}/{{ $product->slug }}</loc>
    @if($product->updated_at)<lastmod>{{ $product->updated_at->toAtomString() }}</lastmod>@endif
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  @endif
  @endforeach

  {{-- Proje sayfaları --}}
  @foreach($projects as $project)
  <url>
    <loc>{{ $baseUrl }}/projeler/{{ $project->slug }}</loc>
    @if($project->updated_at)<lastmod>{{ $project->updated_at->toAtomString() }}</lastmod>@endif
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  @endforeach

</urlset>
