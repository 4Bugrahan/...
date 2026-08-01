<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasTranslations;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'category_id',
        'images',
        'featured',
        'is_active',
        'order',
        'translations',
    ];

    protected $casts = [
        'images'    => 'array',
        'featured'  => 'boolean',
        'is_active' => 'boolean',
        'translations' => 'array',
    ];

    protected $appends = ['image_urls'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('name');
    }

    public function getFirstImageAttribute(): ?string
    {
        if (is_array($this->images) && count($this->images) > 0) {
            return $this->images[0];
        }
        return null;
    }

    public function getImageUrlsAttribute(): array
    {
        if (!is_array($this->images)) {
            return [];
        }

        return array_map(
            fn (string $path) => str_starts_with($path, 'http') ? $path : Storage::disk('public')->url($path),
            $this->images
        );
    }
}
