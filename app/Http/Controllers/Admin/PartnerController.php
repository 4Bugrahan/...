<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function index(Request $request): Response
    {
        $partners = Partner::ordered()
            ->when($request->search, fn ($q, $s) => $q->where('name', 'ilike', "%{$s}%"))
            ->paginate(30)
            ->withQueryString();

        return Inertia::render('Admin/Partners/Index', [
            'partners' => $partners,
            'filters'  => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Partners/Form', [
            'partner' => null,
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $data = $this->validated($request);
        $data['logo'] = $this->uploadLogo($request) ?? $request->input('existing_logo');

        Partner::create($data);

        return redirect()->route('admin.partners.index')->with('success', 'Marka eklendi.');
    }

    public function edit(Partner $partner): Response
    {
        return Inertia::render('Admin/Partners/Form', [
            'partner' => $partner,
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

        return redirect()->route('admin.partners.index')->with('success', 'Marka güncellendi.');
    }

    public function destroy(Partner $partner): \Illuminate\Http\RedirectResponse
    {
        ImageService::delete($partner->logo);
        $partner->delete();

        return redirect()->route('admin.partners.index')->with('success', 'Marka silindi.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name'      => ['required', 'string', 'max:255'],
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
}
