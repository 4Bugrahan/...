<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    use HasTranslations;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'images',
        'location',
        'is_active',
        'translations',
    ];

    protected $casts = [
        'images'    => 'array',
        'is_active' => 'boolean',
        'translations' => 'array',
    ];

    protected $appends = ['image_urls'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
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
        if (! is_array($this->images)) {
            return [];
        }

        return array_map(
            fn (string $path) => str_starts_with($path, 'http') ? $path : Storage::disk('public')->url($path),
            $this->images
        );
    }
}
