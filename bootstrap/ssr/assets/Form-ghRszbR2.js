import { ref, unref, withCtx, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, vModelCheckbox, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-DpQUlKjn.js";
import { u as useTranslation } from "./useTranslation-C3vX6H3M.js";
const _sfc_main = {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    project: Object
  },
  setup(__props) {
    const props = __props;
    const isEdit = !!props.project;
    const form = useForm({
      title: props.project?.title || "",
      description: props.project?.description || "",
      location: props.project?.location || "",
      is_active: props.project?.is_active ?? true,
      images: [],
      existing_images: props.project?.images || [],
      translations: {
        en: { title: props.project?.translations?.title?.en || "", description: props.project?.translations?.description?.en || "", location: props.project?.translations?.location?.en || "" },
        fr: { title: props.project?.translations?.title?.fr || "", description: props.project?.translations?.description?.fr || "", location: props.project?.translations?.location?.fr || "" },
        de: { title: props.project?.translations?.title?.de || "", description: props.project?.translations?.description?.de || "", location: props.project?.translations?.location?.de || "" },
        nl: { title: props.project?.translations?.title?.nl || "", description: props.project?.translations?.description?.nl || "", location: props.project?.translations?.location?.nl || "" }
      }
    });
    const { translating, translateError, translateAll } = useTranslation();
    const previews = ref([]);
    function onFilesSelected(e) {
      const files = Array.from(e.target.files || []);
      form.images = files;
      previews.value = files.map((f) => URL.createObjectURL(f));
    }
    function removeExisting(path) {
      form.existing_images = form.existing_images.filter((p) => p !== path);
    }
    function submit() {
      const url = isEdit ? `/admin/projects/${props.project.id}` : "/admin/projects";
      form.transform((data) => isEdit ? { ...data, _method: "put" } : data).post(url, { forceFormData: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(isEdit ? "Proje Düzenle" : "Yeni Proje")} | Admin</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(isEdit ? "Proje Düzenle" : "Yeni Proje") + " | Admin", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-bold text-[#1B3163] mb-6"${_scopeId}>${ssrInterpolate(isEdit ? "Proje Düzenle" : "Yeni Proje")}</h1><form class="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-3xl"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Proje Başlığı (TR)</label><input${ssrRenderAttr("value", unref(form).title)} type="text" required class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}>`);
            if (unref(form).errors.title) {
              _push2(`<p class="text-red-600 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.title)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Konum (TR)</label><input${ssrRenderAttr("value", unref(form).location)} type="text" placeholder="Örn. Sivas" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Açıklama (TR)</label><textarea rows="4" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div${_scopeId}><button type="button"${ssrIncludeBooleanAttr(unref(translating)) ? " disabled" : ""} class="text-xs font-bold text-[#0E7A8C] border border-[#0E7A8C] rounded-lg px-3 py-1.5 hover:bg-[#0E7A8C]/5 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(translating) ? "Çevriliyor..." : "EN / FR / DE / NL Otomatik Çevir (DeepL)")}</button>`);
            if (unref(translateError)) {
              _push2(`<p class="text-red-600 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(translateError))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(["en", "fr", "de", "nl"], (locale) => {
              _push2(`<div class="border border-gray-100 rounded-lg p-3"${_scopeId}><div class="text-xs font-bold text-gray-400 uppercase mb-2"${_scopeId}>${ssrInterpolate(locale)}</div><input${ssrRenderAttr("value", unref(form).translations[locale].title)} type="text" placeholder="Proje başlığı" class="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2"${_scopeId}><input${ssrRenderAttr("value", unref(form).translations[locale].location)} type="text" placeholder="Konum" class="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2"${_scopeId}><textarea rows="2" placeholder="Açıklama" class="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm"${_scopeId}>${ssrInterpolate(unref(form).translations[locale].description)}</textarea></div>`);
            });
            _push2(`<!--]--></div><div class="flex items-center gap-6"${_scopeId}><label class="flex items-center gap-2 text-sm text-gray-600"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="rounded border-gray-300"${_scopeId}> Aktif </label></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-2"${_scopeId}>Görseller (birden fazla seçebilirsiniz)</label><div class="flex flex-wrap gap-3 mb-3"${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).existing_images, (path, i) => {
              _push2(`<div class="relative"${_scopeId}><img${ssrRenderAttr("src", __props.project?.image_urls?.[i] || path)} class="w-20 h-20 object-cover rounded-lg"${_scopeId}><button type="button" class="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs leading-none"${_scopeId}>×</button></div>`);
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(previews.value, (src, i) => {
              _push2(`<div${_scopeId}><img${ssrRenderAttr("src", src)} class="w-20 h-20 object-cover rounded-lg border-2 border-[#3DAFC4]"${_scopeId}></div>`);
            });
            _push2(`<!--]--></div><input type="file" multiple accept="image/*" class="text-sm"${_scopeId}></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></form>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-bold text-[#1B3163] mb-6" }, toDisplayString(isEdit ? "Proje Düzenle" : "Yeni Proje"), 1),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-3xl"
              }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Proje Başlığı (TR)"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).title = $event,
                    type: "text",
                    required: "",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).title]
                  ]),
                  unref(form).errors.title ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-red-600 text-xs mt-1"
                  }, toDisplayString(unref(form).errors.title), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Konum (TR)"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).location = $event,
                    type: "text",
                    placeholder: "Örn. Sivas",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).location]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Açıklama (TR)"),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(form).description = $event,
                    rows: "4",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).description]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("button", {
                    type: "button",
                    onClick: ($event) => unref(translateAll)(unref(form), ["title", "description", "location"]),
                    disabled: unref(translating),
                    class: "text-xs font-bold text-[#0E7A8C] border border-[#0E7A8C] rounded-lg px-3 py-1.5 hover:bg-[#0E7A8C]/5 disabled:opacity-50"
                  }, toDisplayString(unref(translating) ? "Çevriliyor..." : "EN / FR / DE / NL Otomatik Çevir (DeepL)"), 9, ["onClick", "disabled"]),
                  unref(translateError) ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-red-600 text-xs mt-1"
                  }, toDisplayString(unref(translateError)), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(["en", "fr", "de", "nl"], (locale) => {
                    return createVNode("div", {
                      key: locale,
                      class: "border border-gray-100 rounded-lg p-3"
                    }, [
                      createVNode("div", { class: "text-xs font-bold text-gray-400 uppercase mb-2" }, toDisplayString(locale), 1),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).translations[locale].title = $event,
                        type: "text",
                        placeholder: "Proje başlığı",
                        class: "w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).translations[locale].title]
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).translations[locale].location = $event,
                        type: "text",
                        placeholder: "Konum",
                        class: "w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).translations[locale].location]
                      ]),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).translations[locale].description = $event,
                        rows: "2",
                        placeholder: "Açıklama",
                        class: "w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).translations[locale].description]
                      ])
                    ]);
                  }), 64))
                ]),
                createVNode("div", { class: "flex items-center gap-6" }, [
                  createVNode("label", { class: "flex items-center gap-2 text-sm text-gray-600" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                      type: "checkbox",
                      class: "rounded border-gray-300"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, unref(form).is_active]
                    ]),
                    createTextVNode(" Aktif ")
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-2" }, "Görseller (birden fazla seçebilirsiniz)"),
                  createVNode("div", { class: "flex flex-wrap gap-3 mb-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(form).existing_images, (path, i) => {
                      return openBlock(), createBlock("div", {
                        key: path,
                        class: "relative"
                      }, [
                        createVNode("img", {
                          src: __props.project?.image_urls?.[i] || path,
                          class: "w-20 h-20 object-cover rounded-lg"
                        }, null, 8, ["src"]),
                        createVNode("button", {
                          type: "button",
                          onClick: ($event) => removeExisting(path),
                          class: "absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs leading-none"
                        }, "×", 8, ["onClick"])
                      ]);
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(previews.value, (src, i) => {
                      return openBlock(), createBlock("div", { key: i }, [
                        createVNode("img", {
                          src,
                          class: "w-20 h-20 object-cover rounded-lg border-2 border-[#3DAFC4]"
                        }, null, 8, ["src"])
                      ]);
                    }), 128))
                  ]),
                  createVNode("input", {
                    type: "file",
                    multiple: "",
                    accept: "image/*",
                    onChange: onFilesSelected,
                    class: "text-sm"
                  }, null, 32)
                ]),
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing,
                  class: "bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
                }, toDisplayString(unref(form).processing ? "Kaydediliyor..." : "Kaydet"), 9, ["disabled"])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Projects/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
