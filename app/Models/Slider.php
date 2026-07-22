<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    use HasTranslations;

    protected $fillable = [
        'subtitle',
        'subtitle_en',
        'title',
        'title_en',
        'description',
        'description_en',
        'image',
        'btn1_text',
        'btn1_text_en',
        'btn1_url',
        'btn2_text',
        'btn2_text_en',
        'btn2_url',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
