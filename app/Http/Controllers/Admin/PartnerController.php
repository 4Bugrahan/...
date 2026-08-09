<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function index(Request $request): Response
    {
        $type = $request->type === Partner::TYPE_CLIENT ? Partner::TYPE_CLIENT : Partner::TYPE_PARTNER;

        $partners = Partner::ordered()
            ->type($type)
            ->when($request->search, fn ($q, $s) => $q->where('name', 'ilike', "%{$s}%"))
            ->paginate(30)
            ->withQueryString();

        return Inertia::render('Admin/Partners/Index', [
            'partners' => $partners,
            'filters'  => $request->only(['search']),
            'type'     => $type,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Admin/Partners/Form', [
            'partner' => null,
            'defaultType' => $request->type === Partner::TYPE_CLIENT ? Partner::TYPE_CLIENT : Partner::TYPE_PARTNER,
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $data = $this->validated($request);
        $data['logo'] = $this->uploadLogo($request) ?? $request->input('existing_logo');

        Partner::create($data);

        $this->clearHomeCache();

        return redirect()->route('admin.partners.index', ['type' => $data['type']])->with('success', 'Kayıt eklendi.');
    }

    public function edit(Partner $partner): Response
    {
        return Inertia::render('Admin/Partners/Form', [
            'partner' => $partner,
            'defaultType' => $partner->type,
        ]);
    }

    public function update(Request $request, Partner $partner): \Illuminate\Http\RedirectResponse
    {
        $data = $this->validated($request);

        $newLogo = $this->uploadLogo($request);
        if ($newLogo) {
            ImageService::delete($partner->logo);
            $data['logo'] = $newLogo;
        } else {
            $data['logo'] = $request->input('existing_logo', $partner->logo);
        }

        $partner->update($data);

        $this->clearHomeCache();

        return redirect()->route('admin.partners.index', ['type' => $data['type']])->with('success', 'Kayıt güncellendi.');
    }

    public function destroy(Partner $partner): \Illuminate\Http\RedirectResponse
    {
        $type = $partner->type;
        ImageService::delete($partner->logo);
        $partner->delete();

        $this->clearHomeCache();

        return redirect()->route('admin.partners.index', ['type' => $type])->with('success', 'Kayıt silindi.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name'      => ['required', 'string', 'max:255'],
            'type'      => ['required', 'in:'.Partner::TYPE_PARTNER.','.Partner::TYPE_CLIENT],
            'website'   => ['nullable', 'string', 'max:255'],
            'order'     => ['integer'],
            'is_active' => ['boolean'],
            'logo'      => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,svg', 'max:2048'],
        ]);
    }

    private function uploadLogo(Request $request): ?string
    {
        $file = $request->file('logo');
        return $file ? ImageService::store($file, 'partners') : null;
    }

    private function clearHomeCache(): void
    {
        Cache::forget('home_partners_v2');
        Cache::forget('home_clients_v2');
    }
}
