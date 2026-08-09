<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $projects = Project::latest()
            ->when($request->search, fn ($q, $s) => $q->where('title', 'ilike', "%{$s}%"))
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => null,
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $data = $this->validated($request);

        $data['slug'] = $this->uniqueSlug(Project::class, $data['title']);
        $data['images'] = $this->uploadImages($request);
        $data['translations'] = $this->translationsPayload($request, ['title', 'description', 'location']);

        Project::create($data);

        Cache::forget('home_recent_projects');

        return redirect()->route('admin.projects.index')->with('success', 'Proje eklendi.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project): \Illuminate\Http\RedirectResponse
    {
        $data = $this->validated($request);

        if ($data['title'] !== $project->title) {
            $data['slug'] = $this->uniqueSlug(Project::class, $data['title'], $project->id);
        }

        $existingImages = $request->input('existing_images', []);
        $newImages = $this->uploadImages($request);
        $finalImages = array_merge($existingImages, $newImages);

        foreach (array_diff($project->images ?? [], $finalImages) as $removed) {
            ImageService::delete($removed);
        }

        $data['images'] = $finalImages;
        $data['translations'] = $this->translationsPayload($request, ['title', 'description', 'location'], $project->translations);

        $project->update($data);

        Cache::forget('home_recent_projects');

        return redirect()->route('admin.projects.index')->with('success', 'Proje güncellendi.');
    }

    public function destroy(Project $project): \Illuminate\Http\RedirectResponse
    {
        foreach ($project->images ?? [] as $image) {
            ImageService::delete($image);
        }

        $project->delete();

        Cache::forget('home_recent_projects');

        return redirect()->route('admin.projects.index')->with('success', 'Proje silindi.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'images.*' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'existing_images.*' => ['nullable', 'string'],
            'translations.*.*' => ['nullable', 'string'],
        ]);
    }

    private function uploadImages(Request $request): array
    {
        $paths = [];
        foreach ($request->file('images', []) as $file) {
            if ($file) {
                $paths[] = ImageService::store($file, 'projects');
            }
        }

        return $paths;
    }

}
