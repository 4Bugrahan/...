import { ref, unref, withCtx, createVNode, toDisplayString, withModifiers, openBlock, createBlock, Fragment, renderList, createCommentVNode, withDirectives, vModelText, vModelCheckbox, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-DpQUlKjn.js";
const _sfc_main = {
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    partner: Object,
    defaultType: { type: String, default: "partner" }
  },
  setup(__props) {
    const props = __props;
    const isEdit = !!props.partner;
    const typeOptions = [
      { value: "partner", label: "Marka / Tedarikçi" },
      { value: "client", label: "Hizmet Verdiğimiz Kurum" }
    ];
    const form = useForm({
      name: props.partner?.name || "",
      type: props.partner?.type || props.defaultType,
      website: props.partner?.website || "",
      order: props.partner?.order || 0,
      is_active: props.partner?.is_active ?? true,
      logo: null,
      existing_logo: props.partner?.logo || ""
    });
    const preview = ref(null);
    function onFileSelected(e) {
      const file = e.target.files?.[0] || null;
      form.logo = file;
      preview.value = file ? URL.createObjectURL(file) : null;
    }
    function submit() {
      const url = isEdit ? `/admin/partners/${props.partner.id}` : "/admin/partners";
      form.transform((data) => isEdit ? { ...data, _method: "put" } : data).post(url, { forceFormData: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(isEdit ? "Kayıt Düzenle" : "Yeni Kayıt")} | Admin</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(isEdit ? "Kayıt Düzenle" : "Yeni Kayıt") + " | Admin", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-bold text-[#1B3163] mb-6"${_scopeId}>${ssrInterpolate(isEdit ? "Kayıt Düzenle" : "Yeni Kayıt")}</h1><form class="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-lg"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Tür</label><div class="flex gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(typeOptions, (opt) => {
              _push2(`<button type="button" class="${ssrRenderClass([unref(form).type === opt.value ? "bg-[#0E7A8C] text-white border-[#0E7A8C]" : "bg-white text-gray-500 border-gray-200 hover:border-[#0E7A8C]/50", "flex-1 px-3 py-2 rounded-lg text-sm font-semibold border transition-colors"])}"${_scopeId}>${ssrInterpolate(opt.label)}</button>`);
            });
            _push2(`<!--]--></div>`);
            if (unref(form).errors.type) {
              _push2(`<p class="text-red-600 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.type)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Ad</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="text-red-600 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Website (opsiyonel)</label><input${ssrRenderAttr("value", unref(form).website)} type="text" placeholder="https://..." class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}></div><div class="flex items-center gap-6"${_scopeId}><label class="flex items-center gap-2 text-sm text-gray-600"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="rounded border-gray-300"${_scopeId}> Aktif </label><div class="flex items-center gap-2"${_scopeId}><label class="text-sm text-gray-600"${_scopeId}>Sıra</label><input${ssrRenderAttr("value", unref(form).order)} type="number" class="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm"${_scopeId}></div></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-2"${_scopeId}>Logo</label><div class="flex items-center gap-3 mb-3"${_scopeId}>`);
            if (preview.value) {
              _push2(`<img${ssrRenderAttr("src", preview.value)} class="w-24 h-16 object-contain bg-gray-50 rounded-lg border-2 border-[#3DAFC4]"${_scopeId}>`);
            } else if (__props.partner?.logo_url) {
              _push2(`<img${ssrRenderAttr("src", __props.partner.logo_url)} class="w-24 h-16 object-contain bg-gray-50 rounded-lg border border-gray-200"${_scopeId}>`);
            } else {
              _push2(`<div class="w-24 h-16 bg-gray-100 rounded-lg"${_scopeId}></div>`);
            }
            _push2(`</div><input type="file" accept="image/*,.svg" class="text-sm"${_scopeId}></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></form>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-bold text-[#1B3163] mb-6" }, toDisplayString(isEdit ? "Kayıt Düzenle" : "Yeni Kayıt"), 1),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-lg"
              }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Tür"),
                  createVNode("div", { class: "flex gap-2" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(typeOptions, (opt) => {
                      return createVNode("button", {
                        key: opt.value,
                        type: "button",
                        onClick: ($event) => unref(form).type = opt.value,
                        class: ["flex-1 px-3 py-2 rounded-lg text-sm font-semibold border transition-colors", unref(form).type === opt.value ? "bg-[#0E7A8C] text-white border-[#0E7A8C]" : "bg-white text-gray-500 border-gray-200 hover:border-[#0E7A8C]/50"]
                      }, toDisplayString(opt.label), 11, ["onClick"]);
                    }), 64))
                  ]),
                  unref(form).errors.type ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-red-600 text-xs mt-1"
                  }, toDisplayString(unref(form).errors.type), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Ad"),
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
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Website (opsiyonel)"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).website = $event,
                    type: "text",
                    placeholder: "https://...",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).website]
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
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-2" }, "Logo"),
                  createVNode("div", { class: "flex items-center gap-3 mb-3" }, [
                    preview.value ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: preview.value,
                      class: "w-24 h-16 object-contain bg-gray-50 rounded-lg border-2 border-[#3DAFC4]"
                    }, null, 8, ["src"])) : __props.partner?.logo_url ? (openBlock(), createBlock("img", {
                      key: 1,
                      src: __props.partner.logo_url,
                      class: "w-24 h-16 object-contain bg-gray-50 rounded-lg border border-gray-200"
                    }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "w-24 h-16 bg-gray-100 rounded-lg"
                    }))
                  ]),
                  createVNode("input", {
                    type: "file",
                    accept: "image/*,.svg",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Partners/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
