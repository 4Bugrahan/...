<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasTranslations;

    protected $fillable = [
        'title',
        'title_en',
        'slug',
        'description',
        'description_en',
        'images',
        'location',
        'location_en',
        'is_active',
    ];

    protected $casts = [
        'images'    => 'array',
        'is_active' => 'boolean',
    ];

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
}
