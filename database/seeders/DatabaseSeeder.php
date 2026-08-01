<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Partner;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Slider;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Settings
        $settings = [
            ['key' => 'site_name',    'value' => '4B Grup Endüstriyel Ticaret'],
            ['key' => 'phone1',       'value' => '+90 346 225 00 00'],
            ['key' => 'phone2',       'value' => '+90 535 660 00 60'],
            ['key' => 'email',        'value' => 'info@4bgrup.com'],
            ['key' => 'address',      'value' => 'Sivas, Türkiye'],
            ['key' => 'whatsapp',     'value' => '+905356600060'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], ['value' => $setting['value']]);
        }

        // Sliders
        Slider::truncate();
        $sliders = [
            [
                'subtitle'    => 'Endüstriyel Mutfak Çözümleri',
                'title'       => 'Profesyonel Mutfak Ekipmanları',
                'description' => 'Restoran, otel ve endüstriyel mutfak tesisleri için CE belgeli ekipman tedariği ve uzman proje danışmanlığı.',
                'image'       => 'sliders/hero1.jpg',
                'btn1_text'   => 'Ürünleri İncele',
                'btn1_url'    => '/urunler',
                'btn2_text'   => 'İletişime Geçin',
                'btn2_url'    => '/iletisim',
                'order'       => 1,
                'is_active'   => true,
            ],
            [
                'subtitle'    => 'Proje Danışmanlığı',
                'title'       => 'Anahtar Teslim Mutfak Projeleri',
                'description' => 'Tasarımdan kuruluma, teknik servis desteğine kadar kapsamlı endüstriyel mutfak proje yönetimi.',
                'image'       => 'sliders/hero2.jpg',
                'btn1_text'   => 'Projeleri İncele',
                'btn1_url'    => '/projeler',
                'btn2_text'   => 'Teklif Alın',
                'btn2_url'    => '/iletisim',
                'order'       => 2,
                'is_active'   => true,
            ],
        ];
        foreach ($sliders as $slider) {
            Slider::create($slider);
        }

        // Categories
        Category::truncate();

        // Ana kategoriler
        $parents = [
            ['name' => 'Pişiriciler',             'slug' => 'pisiriciler',             'description' => 'Endüstriyel ocaklar, ızgaralar, fritözler ve kuzineler.', 'order' => 1],
            ['name' => 'Fırınlar',                'slug' => 'firinlar',                'description' => 'Konveksiyonlu, kombi, pizza ve pastane fırınları.', 'order' => 2],
            ['name' => 'Bulaşıkhane Ekipmanları', 'slug' => 'bulasikhane-ekipmanlari', 'description' => 'Endüstriyel bulaşık, bardak ve kazan yıkama sistemleri.', 'order' => 3],
            ['name' => 'Buzdolapları',            'slug' => 'buzdolaplari',            'description' => 'Tezgah altı, dik tip buzdolapları ve dondurucular.', 'order' => 4],
            ['name' => 'Hazırlık Ekipmanları',    'slug' => 'hazirlik-ekipmanlari',    'description' => 'Sebze yıkama, bıçak sterilizatörü ve hazırlık üniteleri.', 'order' => 5],
            ['name' => 'Nötr Ekipmanlar',         'slug' => 'notr-ekipmanlar',         'description' => 'Çalışma tezgahları, raflar, evyeler ve nötr üniteler.', 'order' => 6],
        ];
        foreach ($parents as $cat) {
            Category::create(array_merge($cat, ['is_active' => true, 'parent_id' => null]));
        }

        // Alt kategoriler
        $pisiriciler = Category::where('slug', 'pisiriciler')->first();
        $firinlar    = Category::where('slug', 'firinlar')->first();

        $subPisiriciler = [
            ['name' => '600 Seri Pişiriciler',       'slug' => '600-seri-pisiriciler',       'description' => 'Kompakt 600mm derinlikli endüstriyel pişiriciler.', 'order' => 1],
            ['name' => '700 Seri Pişiriciler',       'slug' => '700-seri-pisiriciler',       'description' => 'Orta segment 700mm derinlikli pişiriciler.', 'order' => 2],
            ['name' => '700 Pro Seri Pişiriciler',   'slug' => '700-pro-seri-pisiriciler',   'description' => 'Pro serisi 700mm profesyonel pişiriciler.', 'order' => 3],
            ['name' => '900 Seri Pişiriciler',       'slug' => '900-seri-pisiriciler',       'description' => 'Ağır hizmet 900mm derinlikli pişiriciler.', 'order' => 4],
            ['name' => '900 Pro Seri Pişiriciler',   'slug' => '900-pro-seri-pisiriciler',   'description' => 'En yüksek performanslı 900mm Pro serisi.', 'order' => 5],
            ['name' => 'Drop-In Seri Pişiriciler',   'slug' => 'drop-in-seri-pisiriciler',   'description' => 'Tezgah üstüne gömme tip pişiriciler.', 'order' => 6],
            ['name' => 'Eko Seri Pişiriciler',       'slug' => 'eko-seri-pisiriciler',       'description' => 'Ekonomik seri endüstriyel pişiriciler.', 'order' => 7],
            ['name' => 'Diğer Pişiriciler',          'slug' => 'diger-pisiriciler',          'description' => 'Özel amaçlı endüstriyel pişirme ekipmanları.', 'order' => 8],
        ];
        foreach ($subPisiriciler as $cat) {
            Category::create(array_merge($cat, ['is_active' => true, 'parent_id' => $pisiriciler->id]));
        }

        $subFirinlar = [
            ['name' => 'Prime Konveksiyonlu Fırınlar', 'slug' => 'prime-konveksiyonlu-firinlar', 'description' => 'Gazlı ve elektrikli Prime serisi konveksiyonlu fırınlar.', 'order' => 1],
            ['name' => 'Maestro Kombi Fırınlar',       'slug' => 'maestro-kombi-firinlar',       'description' => 'Dokunmatik ekranlı Maestro serisi kombi fırınlar.', 'order' => 2],
            ['name' => 'Patisserie Fırınları',         'slug' => 'patisserie-firinlari',         'description' => 'Nevo serisi pastane ve patisserie fırınları.', 'order' => 3],
            ['name' => 'Pizza ve Pasta Fırınları',     'slug' => 'pizza-pasta-firinlari',        'description' => 'Taş tabanlı pizza ve klasik pasta börek fırınları.', 'order' => 4],
        ];
        foreach ($subFirinlar as $cat) {
            Category::create(array_merge($cat, ['is_active' => true, 'parent_id' => $firinlar->id]));
        }

        // Projects
        Project::truncate();
        $projects = [
            ['title' => 'Grand Otel Merkez Mutfağı', 'slug' => 'grand-otel-merkez-mutfagi', 'description' => '5 yıldızlı otel için 800 m² merkez mutfak donanımı projesi. 150 kişilik kapasitede günde 3 öğün servis altyapısı.', 'location' => 'Sivas'],
            ['title' => 'Devlet Hastanesi Yemekhane Projesi', 'slug' => 'devlet-hastanesi-yemekhane', 'description' => '500 yataklı devlet hastanesi merkezi mutfak ve yemekhane ekipman kurulumu. HACCP uyumlu proje tasarımı.', 'location' => 'Ankara'],
            ['title' => 'Üniversite Yemekhane Projesi', 'slug' => 'universite-yemekhanesi', 'description' => '5.000 kişilik kapasitede üniversite yemekhane mutfak ekipmanı tedariği ve anahtar teslim kurulum.', 'location' => 'Kayseri'],
            ['title' => 'Zincir Restoran Mutfak Projesi', 'slug' => 'endustriyel-restoran', 'description' => 'Yüksek kapasiteli zincir restoran için standart mutfak ekipmanı tedariği ve yerleşim projesi.', 'location' => 'İstanbul'],
            ['title' => 'Catering Üretim Tesisi', 'slug' => 'catering-uretim-tesisi', 'description' => 'Günlük 3.000 porsiyon kapasiteli endüstriyel catering mutfak tesisi kurulumu ve devreye alma.', 'location' => 'Sivas'],
            ['title' => 'AVM Food Court Projesi', 'slug' => 'avm-food-court', 'description' => 'Alışveriş merkezi food court alanı 12 birimlik mutfak ekipman tedariği ve montaj projesi.', 'location' => 'Malatya'],
        ];
        foreach ($projects as $proj) {
            Project::create(array_merge($proj, ['is_active' => true]));
        }

        // Partners
        Partner::truncate();
        $partners = [
            ['name' => 'MKN', 'logo' => '', 'website' => 'https://www.mkn.com', 'order' => 1],
            ['name' => 'Rational', 'logo' => '', 'website' => 'https://www.rational-online.com', 'order' => 2],
            ['name' => 'Electrolux Professional', 'logo' => '', 'website' => 'https://www.electroluxprofessional.com', 'order' => 3],
            ['name' => 'Unox', 'logo' => '', 'website' => 'https://www.unox.com', 'order' => 4],
            ['name' => 'Hobart', 'logo' => '', 'website' => 'https://www.hobartcorp.com', 'order' => 5],
            ['name' => 'Winterhalter', 'logo' => '', 'website' => 'https://www.winterhalter.com', 'order' => 6],
            ['name' => 'Meiko', 'logo' => '', 'website' => 'https://www.meiko.de', 'order' => 7],
            ['name' => 'True Refrigeration', 'logo' => '', 'website' => 'https://www.truemfg.com', 'order' => 8],
            ['name' => 'Manitowoc', 'logo' => '', 'website' => 'https://www.manitowocice.com', 'order' => 9],
            ['name' => 'Welbilt', 'logo' => '', 'website' => 'https://www.welbilt.com', 'order' => 10],
            ['name' => 'Lainox', 'logo' => '', 'website' => 'https://www.lainox.com', 'order' => 11],
            ['name' => 'Giorik', 'logo' => '', 'website' => 'https://www.giorik.com', 'order' => 12],
        ];
        foreach ($partners as $partner) {
            Partner::create(array_merge($partner, ['is_active' => true]));
        }
    }
}
