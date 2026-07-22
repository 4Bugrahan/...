<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // ── Genel Bilgiler ──────────────────────────────────────
            ['key' => 'site_name',  'value' => '4B Grup Endüstriyel Ticaret'],
            ['key' => 'phone1',     'value' => '+90 346 218 00 00'],
            ['key' => 'phone2',     'value' => ''],
            ['key' => 'email',      'value' => 'info@4bgrup.com'],
            ['key' => 'whatsapp',   'value' => '+905001234567'],
            ['key' => 'address',    'value' => 'Sivas, Türkiye', 'value_en' => 'Sivas, Turkey'],
            ['key' => 'facebook',   'value' => ''],
            ['key' => 'instagram',  'value' => ''],
            ['key' => 'linkedin',   'value' => ''],

            // ── Ana Sayfa — Hakkında ───────────────────────────────
            ['key' => 'home_about_label',
             'value'    => 'Kurumsal Kimlik',
             'value_en' => 'Corporate Identity'],

            ['key' => 'home_about_title',
             'value'    => "Sektörde 15 Yıllık Deneyim,\nGüvenilir Proje Ortaklığı",
             'value_en' => "15 Years of Industry Experience,\nA Trusted Project Partnership"],

            ['key' => 'home_about_text1',
             'value'    => "4B Grup, 2009 yılından bu yana otel, restoran, hastane ve toplu yemek tesislerine endüstriyel mutfak ekipmanları tedariki ve anahtar teslim proje hizmeti sunmaktadır. Yalnızca ekipman tedariği değil; tasarım, kurulum ve satış sonrası süreçlerin bütüncül yönetimini kapsayan kurumsal bir çözüm ortaklığı.",
             'value_en' => "Since 2009, 4B Group has been providing industrial kitchen equipment supply and turnkey project services to hotels, restaurants, hospitals and mass catering facilities. Not merely an equipment supplier — a corporate solution partner managing design, installation and after-sales processes holistically."],

            ['key' => 'home_about_text2',
             'value'    => "CE belgeli ürün portföyü, deneyimli proje mühendisleri ve 50'den fazla küresel markayla kurulan yetkili satış ve servis ortaklığıyla projenin her aşamasında teknik uzmanlık ve kalite güvencesi sağlanır.",
             'value_en' => "Technical expertise and quality assurance are provided at every stage of the project through a CE-certified product portfolio, experienced project engineers and authorized sales and service partnerships with over 50 global brands."],

            ['key' => 'home_about_bullet1',
             'value'    => 'Küresel markaların yetkili satış ve servis noktası',
             'value_en' => 'Authorized sales and service point for global brands'],

            ['key' => 'home_about_bullet2',
             'value'    => 'Anahtar teslim proje yönetimi',
             'value_en' => 'Turnkey project management'],

            ['key' => 'home_about_bullet3',
             'value'    => 'Kendi imalat tesisi ve paslanmaz çelik üretim kapasitesi',
             'value_en' => 'In-house manufacturing facility and stainless steel production capacity'],

            ['key' => 'home_about_bullet4',
             'value'    => '7/24 teknik destek ve acil servis hattı',
             'value_en' => '24/7 technical support and emergency service line'],

            ['key' => 'home_about_btn',
             'value'    => 'Kurumsal Sayfa',
             'value_en' => 'Corporate Profile'],

            // ── Ana Sayfa — Kategoriler ──────────────────────────────
            ['key' => 'home_cats_label',
             'value'    => 'Ürün Kategorileri',
             'value_en' => 'Product Categories'],

            ['key' => 'home_cats_title',
             'value'    => 'Ürün Portföyü',
             'value_en' => 'Extensive Product Portfolio'],

            ['key' => 'home_cats_sub',
             'value'    => 'Pişirme, soğutma, bulaşıkhane ve hazırlık ekipmanlarından oluşan kapsamlı ürün yelpazesi.',
             'value_en' => 'A comprehensive product range comprising cooking, refrigeration, dishwashing and preparation equipment.'],

            ['key' => 'home_cats_btn',
             'value'    => 'Tüm Ürünleri Görüntüle',
             'value_en' => 'View All Products'],

            // ── Ana Sayfa — Projeler ─────────────────────────────────
            ['key' => 'home_projects_label',
             'value'    => 'Referans Projeler',
             'value_en' => 'Reference Projects'],

            ['key' => 'home_projects_title',
             'value'    => 'Tamamlanan Projeler',
             'value_en' => 'Completed Projects'],

            ['key' => 'home_projects_btn',
             'value'    => 'Tüm Referans Projeleri İnceleyin',
             'value_en' => 'View All Reference Projects'],

            // ── Ana Sayfa — Markalar ─────────────────────────────────
            ['key' => 'home_partners_label',
             'value'    => 'Markalar',
             'value_en' => 'Brands'],

            ['key' => 'home_partners_title',
             'value'    => 'Temsil Edilen Küresel Markalar',
             'value_en' => 'Represented Global Brands'],

            ['key' => 'home_partners_btn',
             'value'    => 'Tüm Markalar',
             'value_en' => 'All Brands'],

            // ── Ana Sayfa — CTA ──────────────────────────────────────
            ['key' => 'home_cta_label',
             'value'    => 'Proje Teklifi',
             'value_en' => 'Project Inquiry'],

            ['key' => 'home_cta_title',
             'value'    => 'Projeniz İçin Teklif Alın',
             'value_en' => 'Request a Quote for Your Project'],

            // ── Kurumsal Sayfa ──────────────────────────────────────
            ['key' => 'about_hero_title',
             'value'    => 'Kurumsal Kimlik',
             'value_en' => 'Corporate Identity'],

            ['key' => 'about_hero_desc',
             'value'    => '15 yılı aşkın sektör deneyimi ve uzman kadroyla endüstriyel mutfak ekipmanları alanında güvenilir proje ve tedarik çözümleri.',
             'value_en' => 'Reliable project and supply solutions in industrial kitchen equipment, backed by over 15 years of industry experience and a specialist team.'],

            ['key' => 'about_profile_label',
             'value'    => 'Kurumsal Profil',
             'value_en' => 'Corporate Profile'],

            ['key' => 'about_profile_title',
             'value'    => '15 Yıllık Sektör Deneyimi, Anahtar Teslim Mutfak Projeleri',
             'value_en' => '15 Years of Industry Experience, Turnkey Kitchen Projects'],

            ['key' => 'about_profile_text1',
             'value'    => '4B Grup Endüstriyel Ticaret, 2009 yılından bu yana Türkiye genelinde otel, restoran, hastane, eğitim kurumu ve toplu yemek tesislerine endüstriyel mutfak ekipmanları tedariki ve anahtar teslim proje hizmeti sunmaktadır.',
             'value_en' => '4B Group Industrial Trade has been providing industrial kitchen equipment supply and turnkey project services to hotels, restaurants, hospitals, educational institutions and mass catering facilities throughout Turkey since 2009.'],

            ['key' => 'about_profile_text2',
             'value'    => 'Deneyimli proje mühendisleri ve ürün portföyüyle; yerinde ihtiyaç analizinden mimari planlamaya, CE belgeli ekipman tedarikinden profesyonel montaj ve devreye almaya, satış sonrası teknik servise kadar tüm süreç yönetilmektedir.',
             'value_en' => 'With experienced project engineers and an extensive product portfolio, the entire process is managed — from on-site needs analysis and architectural planning to CE-certified equipment procurement, professional installation, commissioning and after-sales technical service.'],

            ['key' => 'about_profile_text3',
             'value'    => "50'yi aşkın küresel markanın yetkili satış ve servis noktası olarak orijinal ekipman, üretici garantisi ve öncelikli teknik servis güvencesiyle bireysel ve kurumsal projelere hizmet verilmektedir.",
             'value_en' => "As an authorized sales and service point for over 50 global brands, individual and corporate projects are served with original equipment, manufacturer warranty and priority technical service assurance."],

            ['key' => 'about_profile_btn',
             'value'    => 'Proje Teklifi Alın',
             'value_en' => 'Request a Project Quote'],

            // İstatistikler
            ['key' => 'about_stat1_num',   'value' => '15+'],
            ['key' => 'about_stat1_label',  'value' => 'Yıllık Deneyim',          'value_en' => 'Years of Experience'],
            ['key' => 'about_stat1_sub',    'value' => '2009\'dan bu yana',       'value_en' => 'Since 2009'],

            ['key' => 'about_stat2_num',   'value' => '500+'],
            ['key' => 'about_stat2_label',  'value' => 'Tamamlanan Proje',        'value_en' => 'Completed Projects'],
            ['key' => 'about_stat2_sub',    'value' => 'Türkiye genelinde',       'value_en' => 'Across Turkey'],

            ['key' => 'about_stat3_num',   'value' => '50+'],
            ['key' => 'about_stat3_label',  'value' => 'Küresel Marka',           'value_en' => 'Global Brands'],
            ['key' => 'about_stat3_sub',    'value' => 'Yetkili satış ortaklığı',    'value_en' => 'Authorized sales partnership'],

            ['key' => 'about_stat4_num',   'value' => '7/24'],
            ['key' => 'about_stat4_label',  'value' => 'Teknik Destek',           'value_en' => 'Technical Support'],
            ['key' => 'about_stat4_sub',    'value' => 'Acil servis hattı',       'value_en' => 'Emergency service line'],

            // Değerler
            ['key' => 'about_values_label',
             'value'    => 'Kurumsal Değerler',
             'value_en' => 'Corporate Values'],

            ['key' => 'about_values_title',
             'value'    => 'Temel Değerler ve İş Prensipleri',
             'value_en' => 'Core Values and Business Principles'],

            ['key' => 'about_val1_title',
             'value'    => 'CE Belgeli Kalite Güvencesi',
             'value_en' => 'CE-Certified Quality Assurance'],
            ['key' => 'about_val1_desc',
             'value'    => 'Sunulan tüm ekipmanlar CE belgeli olup uluslararası kalite ve hijyen standartlarına uygundur.',
             'value_en' => 'All equipment supplied is CE-certified and complies with international quality and hygiene standards.'],

            ['key' => 'about_val2_title',
             'value'    => 'Müşteri Odaklı Proje Yaklaşımı',
             'value_en' => 'Client-Centered Project Approach'],
            ['key' => 'about_val2_desc',
             'value'    => 'Her müşterinin işletme ihtiyacına özel çözüm tasarlanır, uzun vadeli iş ortaklığı anlayışıyla hizmet verilir.',
             'value_en' => 'Tailored solutions are designed for each client\'s operational requirements, with service delivered through a long-term partnership approach.'],

            ['key' => 'about_val3_title',
             'value'    => 'Proje Disiplini ve Zamanında Teslimat',
             'value_en' => 'Project Discipline and Timely Delivery'],
            ['key' => 'about_val3_desc',
             'value'    => 'Taahhüt edilen proje takvimlerine uyum ve zamanında teslimat temel kurumsal prensiptir.',
             'value_en' => 'Adherence to committed project schedules and on-time delivery is the fundamental corporate principle.'],

            ['key' => 'about_val4_title',
             'value'    => 'Güvenilirlik ve Şeffaflık',
             'value_en' => 'Reliability and Transparency'],
            ['key' => 'about_val4_desc',
             'value'    => '15 yılı aşkın sektör deneyimiyle verilen sözlerin tutulduğu, şeffaf iletişimin esas alındığı güvenilir bir iş ortaklığı.',
             'value_en' => 'A reliable business partnership built on over 15 years of industry experience, where commitments are honored and transparent communication is maintained.'],

            // Tarihçe
            ['key' => 'about_timeline_label',
             'value'    => 'Kurumsal Tarihçe',
             'value_en' => 'Corporate History'],

            ['key' => 'about_timeline_title',
             'value'    => 'Kurumsal Gelişim Süreci',
             'value_en' => 'Corporate Development Journey'],

            ['key' => 'about_t1_year',  'value' => '2009'],
            ['key' => 'about_t1_title', 'value' => 'Kuruluş',                    'value_en' => 'Founding'],
            ['key' => 'about_t1_desc',
             'value'    => "4B Grup Endüstriyel Ticaret, Sivas'ta kurularak endüstriyel mutfak ekipmanları sektöründe faaliyete başladı.",
             'value_en' => "4B Group Industrial Trade was established in Sivas, commencing operations in the industrial kitchen equipment sector."],

            ['key' => 'about_t2_year',  'value' => '2012'],
            ['key' => 'about_t2_title', 'value' => 'Büyüme ve İlk Büyük Proje', 'value_en' => 'Growth and First Major Project'],
            ['key' => 'about_t2_desc',
             'value'    => "Ürün portföyü genişletildi; bölgenin önde gelen 5 yıldızlı oteli için ilk anahtar teslim mutfak projesi tamamlandı.",
             'value_en' => "The product portfolio was expanded; the first turnkey kitchen project was completed for the region's leading five-star hotel."],

            ['key' => 'about_t3_year',  'value' => '2015'],
            ['key' => 'about_t3_title', 'value' => 'Küresel Marka Ortaklıkları', 'value_en' => 'Global Brand Partnerships'],
            ['key' => 'about_t3_desc',
             'value'    => "Avrupalı ve küresel lider üreticilerle yetkili satış ve servis ortaklıkları kurularak marka portföyü 100'ü aştı.",
             'value_en' => "Authorized sales and service partnerships were established with European and global leading manufacturers, expanding the brand portfolio beyond 100."],

            ['key' => 'about_t4_year',  'value' => '2018'],
            ['key' => 'about_t4_title', 'value' => 'Kendi İmalat Tesisi',        'value_en' => 'In-House Manufacturing Facility'],
            ['key' => 'about_t4_desc',
             'value'    => "Paslanmaz çelik mutfak ekipmanları imalatına başlandı; tasarım ve üretim kapasitesi projeye özel çözümler sunabilecek düzeye ulaştı.",
             'value_en' => "Stainless steel kitchen equipment manufacturing commenced; design and production capacity reached a level capable of delivering project-specific solutions."],

            ['key' => 'about_t5_year',  'value' => '2023'],
            ['key' => 'about_t5_title', 'value' => 'Kurumsal Dijital Altyapı',   'value_en' => 'Corporate Digital Infrastructure'],
            ['key' => 'about_t5_desc',
             'value'    => "Kurumsal web platformu ve dijital katalog altyapısı yenilenerek müşteri deneyimi ve proje yönetimi süreçleri modernize edildi.",
             'value_en' => "The corporate web platform and digital catalog infrastructure were renewed, modernizing client experience and project management processes."],

            // CTA
            ['key' => 'about_cta_title',
             'value'    => 'Projeniz İçin Teknik Destek Alın',
             'value_en' => 'Get Technical Support for Your Project'],
            ['key' => 'about_cta_desc',
             'value'    => 'İhtiyaç analizinden ekipman tedariğine, kurulumdan satış sonrası servise kadar tüm süreçlerde deneyimli kadro desteği sağlanır.',
             'value_en' => 'Experienced team support is provided throughout all processes — from needs analysis to equipment procurement, from installation to after-sales service.'],

            // ── KVKK ────────────────────────────────────────────────
            ['key' => 'kvkk_hero_badge',
             'value'    => 'Yasal Bilgilendirme',
             'value_en' => 'Legal Information'],
            ['key' => 'kvkk_hero_title',
             'value'    => 'KVKK ve Gizlilik Politikası',
             'value_en' => 'GDPR and Privacy Policy'],
            ['key' => 'kvkk_hero_desc',  'value' => ''],
            ['key' => 'kvkk_updated_at', 'value' => 'Son güncelleme: Ocak 2025', 'value_en' => 'Last updated: January 2025'],
        ];

        foreach ($settings as $data) {
            Setting::updateOrCreate(
                ['key' => $data['key']],
                ['value' => $data['value'], 'value_en' => $data['value_en'] ?? null]
            );
        }
    }
}
