<?php

namespace App\Notifications;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewContactNotification extends Notification
{
    use Queueable;

    public function __construct(
        public Contact $contact,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Yeni İletişim Mesajı — ' . $this->contact->name)
            ->greeting('Merhaba,')
            ->line('Web siteniz üzerinden yeni bir iletişim mesajı alındı.')
            ->line('**Gönderen:** ' . $this->contact->name)
            ->line('**E-posta:** ' . $this->contact->email)
            ->line('**Telefon:** ' . ($this->contact->phone ?: 'Belirtilmedi'))
            ->line('**Mesaj:** ' . $this->contact->message)
            ->action('Mesajları Görüntüle', url('/admin/contacts'))
            ->salutation('4B Grup Bildirim Sistemi');
    }
}
