<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Partner extends Model
{
    use HasTranslations;

    /** Yetkili satış/servis ortağı olduğumuz markalar */
    public const TYPE_PARTNER = 'partner';
    /** Hizmet verdiğimiz kurum ve işletmeler (referans müşteriler) */
    public const TYPE_CLIENT = 'client';

    protected $fillable = [
        'name',
        'type',
        'logo',
        'website',
        'order',
        'is_active',
        'translations',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'translations' => 'array',
    ];

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute(): ?string
    {
        if (!$this->logo) return null;
        // http(s) tam URL veya /images/... gibi public/ altındaki statik bir
        // dosya ise (örn. eski hardcoded referans görselleri) olduğu gibi kullan.
        if (str_starts_with($this->logo, 'http') || str_starts_with($this->logo, '/')) {
            return $this->logo;
        }
        return Storage::disk('public')->url($this->logo);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('name');
    }

    public function scopeType($query, string $type)
    {
        return $query->where('type', $type);
    }
}
