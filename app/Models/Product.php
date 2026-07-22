<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasTranslations;

    protected $fillable = [
        'name',
        'name_en',
        'slug',
        'description',
        'description_en',
        'category_id',
        'images',
        'featured',
        'is_active',
        'order',
    ];

    protected $casts = [
        'images'    => 'array',
        'featured'  => 'boolean',
        'is_active' => 'boolean',
    ];

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
}
