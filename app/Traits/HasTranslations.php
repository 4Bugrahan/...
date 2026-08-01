<?php

namespace App\Traits;

trait HasTranslations
{
    /**
     * Turkish ('tr') is the base locale and lives in the plain columns.
     * Every other locale is stored in the `translations` JSON column as
     * {"field": {"en": "...", "fr": "...", "de": "...", "nl": "..."}}.
     */
    public function getTranslated(string $field, ?string $locale = null): ?string
    {
        $locale = $locale ?? app()->getLocale();

        if ($locale === 'tr') {
            return $this->attributes[$field] ?? null;
        }

        $value = $this->getTranslationsArray()[$field][$locale] ?? null;

        return ($value !== null && $value !== '') ? $value : ($this->attributes[$field] ?? null);
    }

    public function setTranslation(string $field, string $locale, ?string $value): static
    {
        $translations = $this->getTranslationsArray();
        $translations[$field][$locale] = $value;
        $this->attributes['translations'] = json_encode($translations);

        return $this;
    }

    protected function getTranslationsArray(): array
    {
        $raw = $this->attributes['translations'] ?? null;

        if (is_string($raw)) {
            $decoded = json_decode($raw, true);
        } else {
            $decoded = $raw;
        }

        return is_array($decoded) ? $decoded : [];
    }
}
