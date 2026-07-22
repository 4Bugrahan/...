<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\User;
use App\Notifications\NewContactNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact/Index', [
            'seo' => $this->pageSeo(
                'contact',
                'İletişim | 4B Grup Endüstriyel Ticaret - Sivas',
                '4B Grup ile iletişime geçin. Endüstriyel mutfak ekipmanları, proje teklifi ve teknik destek için bize ulaşın.',
                '4b grup iletişim, sivas endüstriyel mutfak ekipmanları, teklif al'
            ),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        // Honeypot spam koruması - bot bu alanı doldurursa reject et
        if ($request->filled('website_url')) {
            return redirect()->route('contact.index')
                ->with('success', 'Mesajınız başarıyla gönderildi.');
        }

        $locale = app()->getLocale();
        $messages = $locale === 'en' ? [
            'name.required'    => 'Name field is required.',
            'name.max'         => 'Name must be at most 255 characters.',
            'email.required'   => 'Email field is required.',
            'email.email'      => 'Please enter a valid email address.',
            'message.required' => 'Message field is required.',
        ] : [
            'name.required'    => 'Ad Soyad alanı zorunludur.',
            'name.max'         => 'Ad Soyad en fazla 255 karakter olabilir.',
            'email.required'   => 'E-posta alanı zorunludur.',
            'email.email'      => 'Geçerli bir e-posta adresi giriniz.',
            'message.required' => 'Mesaj alanı zorunludur.',
        ];

        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:50',
            'message' => 'required|string|max:5000',
        ], $messages);

        $contact = Contact::create($validated);

        // Admin'e e-posta bildirimi gönder
        try {
            $admins = User::all();
            foreach ($admins as $admin) {
                $admin->notify(new NewContactNotification($contact));
            }
        } catch (\Throwable $e) {
            // E-posta gönderilemese bile form başarılı olsun
            \Illuminate\Support\Facades\Log::warning('Contact notification failed: ' . $e->getMessage());
        }

        $successMsg = $locale === 'en'
            ? 'Your message has been sent successfully. We will get back to you soon.'
            : 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';

        return redirect()->route('contact.index')->with('success', $successMsg);
    }
}
