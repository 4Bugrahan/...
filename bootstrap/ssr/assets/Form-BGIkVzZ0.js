import { ref, unref, withCtx, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, vModelSelect, vModelCheckbox, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-DpQUlKjn.js";
import { u as useTranslation } from "./useTranslation-C3vX6H3M.js";
const _sfc_main = {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    parentCategories: Array,
    category: Object
  },
  setup(__props) {
    const props = __props;
    const isEdit = !!props.category;
    const form = useForm({
      name: props.category?.name || "",
      description: props.category?.description || "",
      parent_id: props.category?.parent_id || "",
      is_active: props.category?.is_active ?? true,
      order: props.category?.order || 0,
      image: null,
      translations: {
        en: { name: props.category?.translations?.name?.en || "", description: props.category?.translations?.description?.en || "" },
        fr: { name: props.category?.translations?.name?.fr || "", description: props.category?.translations?.description?.fr || "" },
        de: { name: props.category?.translations?.name?.de || "", description: props.category?.translations?.description?.de || "" },
        nl: { name: props.category?.translations?.name?.nl || "", description: props.category?.translations?.description?.nl || "" }
      }
    });
    const { translating, translateError, translateAll } = useTranslation();
    const preview = ref(null);
    function onFileSelected(e) {
      const file = e.target.files?.[0];
      form.image = file || null;
      preview.value = file ? URL.createObjectURL(file) : null;
    }
    function submit() {
      const url = isEdit ? `/admin/categories/${props.category.id}` : "/admin/categories";
      form.transform((data) => isEdit ? { ...data, _method: "put" } : data).post(url, { forceFormData: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(isEdit ? "Kategori Düzenle" : "Yeni Kategori")} | Admin</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(isEdit ? "Kategori Düzenle" : "Yeni Kategori") + " | Admin", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-bold text-[#1B3163] mb-6"${_scopeId}>${ssrInterpolate(isEdit ? "Kategori Düzenle" : "Yeni Kategori")}</h1><form class="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-3xl"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Kategori Adı (TR)</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="text-red-600 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Açıklama (TR)</label><textarea rows="3" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div${_scopeId}><button type="button"${ssrIncludeBooleanAttr(unref(translating)) ? " disabled" : ""} class="text-xs font-bold text-[#0E7A8C] border border-[#0E7A8C] rounded-lg px-3 py-1.5 hover:bg-[#0E7A8C]/5 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(translating) ? "Çevriliyor..." : "EN / FR / DE / NL Otomatik Çevir (DeepL)")}</button>`);
            if (unref(translateError)) {
              _push2(`<p class="text-red-600 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(translateError))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(["en", "fr", "de", "nl"], (locale) => {
              _push2(`<div class="border border-gray-100 rounded-lg p-3"${_scopeId}><div class="text-xs font-bold text-gray-400 uppercase mb-2"${_scopeId}>${ssrInterpolate(locale)}</div><input${ssrRenderAttr("value", unref(form).translations[locale].name)} type="text" placeholder="Kategori adı" class="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2"${_scopeId}><textarea rows="2" placeholder="Açıklama" class="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm"${_scopeId}>${ssrInterpolate(unref(form).translations[locale].description)}</textarea></div>`);
            });
            _push2(`<!--]--></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Üst Kategori</label><select class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_id) ? ssrLooseContain(unref(form).parent_id, "") : ssrLooseEqual(unref(form).parent_id, "")) ? " selected" : ""}${_scopeId}>Yok (Ana Kategori)</option><!--[-->`);
            ssrRenderList(__props.parentCategories, (cat) => {
              _push2(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_id) ? ssrLooseContain(unref(form).parent_id, cat.id) : ssrLooseEqual(unref(form).parent_id, cat.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(cat.name)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="flex items-center gap-6"${_scopeId}><label class="flex items-center gap-2 text-sm text-gray-600"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="rounded border-gray-300"${_scopeId}> Aktif </label><div class="flex items-center gap-2"${_scopeId}><label class="text-sm text-gray-600"${_scopeId}>Sıra</label><input${ssrRenderAttr("value", unref(form).order)} type="number" class="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm"${_scopeId}></div></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-2"${_scopeId}>Görsel</label><div class="flex gap-3 mb-3"${_scopeId}>`);
            if (preview.value) {
              _push2(`<img${ssrRenderAttr("src", preview.value)} class="w-20 h-20 object-cover rounded-lg border-2 border-[#3DAFC4]"${_scopeId}>`);
            } else if (__props.category?.image_url) {
              _push2(`<img${ssrRenderAttr("src", __props.category.image_url)} class="w-20 h-20 object-cover rounded-lg"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><input type="file" accept="image/*" class="text-sm"${_scopeId}></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></form>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-bold text-[#1B3163] mb-6" }, toDisplayString(isEdit ? "Kategori Düzenle" : "Yeni Kategori"), 1),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-3xl"
              }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Kategori Adı (TR)"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    type: "text",
                    required: "",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).name]
                  ]),
                  unref(form).errors.name ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-red-600 text-xs mt-1"
                  }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Açıklama (TR)"),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(form).description = $event,
                    rows: "3",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).description]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("button", {
                    type: "button",
                    onClick: ($event) => unref(translateAll)(unref(form), ["name", "description"]),
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
                        "onUpdate:modelValue": ($event) => unref(form).translations[locale].name = $event,
                        type: "text",
                        placeholder: "Kategori adı",
                        class: "w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).translations[locale].name]
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
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Üst Kategori"),
                  withDirectives(createVNode("select", {
                    "onUpdate:modelValue": ($event) => unref(form).parent_id = $event,
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  }, [
                    createVNode("option", { value: "" }, "Yok (Ana Kategori)"),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.parentCategories, (cat) => {
                      return openBlock(), createBlock("option", {
                        key: cat.id,
                        value: cat.id
                      }, toDisplayString(cat.name), 9, ["value"]);
                    }), 128))
                  ], 8, ["onUpdate:modelValue"]), [
                    [vModelSelect, unref(form).parent_id]
                  ])
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
                  ]),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("label", { class: "text-sm text-gray-600" }, "Sıra"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).order = $event,
                      type: "number",
                      class: "w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [
                        vModelText,
                        unref(form).order,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-2" }, "Görsel"),
                  createVNode("div", { class: "flex gap-3 mb-3" }, [
                    preview.value ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: preview.value,
                      class: "w-20 h-20 object-cover rounded-lg border-2 border-[#3DAFC4]"
                    }, null, 8, ["src"])) : __props.category?.image_url ? (openBlock(), createBlock("img", {
                      key: 1,
                      src: __props.category.image_url,
                      class: "w-20 h-20 object-cover rounded-lg"
                    }, null, 8, ["src"])) : createCommentVNode("", true)
                  ]),
                  createVNode("input", {
                    type: "file",
                    accept: "image/*",
                    onChange: onFileSelected,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Categories/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
