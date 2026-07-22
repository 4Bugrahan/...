<?php

namespace App\Traits;

trait HasTranslations
{
    public function getTranslated(string $field, string $locale = null): ?string
    {
        $locale = $locale ?? app()->getLocale();
        $enField = $field . '_en';

        if ($locale === 'en'
            && array_key_exists($enField, $this->attributes)
            && !empty($this->attributes[$enField])) {
            return $this->attributes[$enField];
        }

        return $this->$field ?? null;
    }
}
