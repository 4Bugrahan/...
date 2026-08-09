import { ref, unref, withCtx, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, toDisplayString, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-DpQUlKjn.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    values: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      about_profile_title: props.values.about_profile_title || "",
      about_profile_text1: props.values.about_profile_text1 || "",
      about_profile_text2: props.values.about_profile_text2 || "",
      about_profile_text3: props.values.about_profile_text3 || "",
      about_profile_btn: props.values.about_profile_btn || "",
      image: null,
      remove_image: false
    });
    const preview = ref(null);
    const currentImageUrl = ref(props.values.about_profile_image_url);
    function onFileSelected(e) {
      const file = e.target.files?.[0] || null;
      form.image = file;
      form.remove_image = false;
      preview.value = file ? URL.createObjectURL(file) : null;
    }
    function removeImage() {
      form.image = null;
      form.remove_image = true;
      preview.value = null;
      currentImageUrl.value = null;
    }
    function submit() {
      form.transform((data) => ({ ...data, _method: "post" })).post("/admin/about", { forceFormData: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Hakkımızda | Admin</title>`);
          } else {
            return [
              createVNode("title", null, "Hakkımızda | Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-bold text-[#1B3163] mb-1"${_scopeId}>Hakkımızda — Kurumsal Profil</h1><p class="text-sm text-gray-500 mb-6"${_scopeId}> Bu içerik &quot;Kurumsal&quot; sayfasının profil bölümünde (görsel + metin) görünür. Türkçe metin girilir; diğer diller şu an bu metnin önceden yapılan çevirilerini kullanmaya devam eder — bunları değiştirmez, sadece Türkçe kaynağı günceller. </p><form class="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-2xl"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-2"${_scopeId}>Görsel</label><div class="flex items-center gap-4 mb-3"${_scopeId}>`);
            if (preview.value) {
              _push2(`<img${ssrRenderAttr("src", preview.value)} class="w-40 h-28 object-cover bg-gray-50 rounded-lg border-2 border-[#3DAFC4]"${_scopeId}>`);
            } else if (currentImageUrl.value) {
              _push2(`<img${ssrRenderAttr("src", currentImageUrl.value)} class="w-40 h-28 object-cover bg-gray-50 rounded-lg border border-gray-200"${_scopeId}>`);
            } else {
              _push2(`<div class="w-40 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400"${_scopeId}>Görsel yok</div>`);
            }
            if (preview.value || currentImageUrl.value) {
              _push2(`<button type="button" class="text-red-500 text-xs font-semibold hover:underline"${_scopeId}> Görseli Kaldır </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><input type="file" accept="image/*" class="text-sm"${_scopeId}>`);
            if (unref(form).errors.image) {
              _push2(`<p class="text-red-600 text-xs mt-1"${_scopeId}>${ssrInterpolate(unref(form).errors.image)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Başlık</label><input${ssrRenderAttr("value", unref(form).about_profile_title)} type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Paragraf 1</label><textarea rows="3" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}>${ssrInterpolate(unref(form).about_profile_text1)}</textarea></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Paragraf 2</label><textarea rows="3" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}>${ssrInterpolate(unref(form).about_profile_text2)}</textarea></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Paragraf 3</label><textarea rows="3" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}>${ssrInterpolate(unref(form).about_profile_text3)}</textarea></div><div${_scopeId}><label class="block text-sm font-semibold text-gray-700 mb-1"${_scopeId}>Buton Metni</label><input${ssrRenderAttr("value", unref(form).about_profile_btn)} type="text" placeholder="Proje Teklifi Alın" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(form).processing ? "Kaydediliyor..." : "Kaydet")}</button></form>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-bold text-[#1B3163] mb-1" }, "Hakkımızda — Kurumsal Profil"),
              createVNode("p", { class: "text-sm text-gray-500 mb-6" }, ' Bu içerik "Kurumsal" sayfasının profil bölümünde (görsel + metin) görünür. Türkçe metin girilir; diğer diller şu an bu metnin önceden yapılan çevirilerini kullanmaya devam eder — bunları değiştirmez, sadece Türkçe kaynağı günceller. '),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-2xl"
              }, [
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-2" }, "Görsel"),
                  createVNode("div", { class: "flex items-center gap-4 mb-3" }, [
                    preview.value ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: preview.value,
                      class: "w-40 h-28 object-cover bg-gray-50 rounded-lg border-2 border-[#3DAFC4]"
                    }, null, 8, ["src"])) : currentImageUrl.value ? (openBlock(), createBlock("img", {
                      key: 1,
                      src: currentImageUrl.value,
                      class: "w-40 h-28 object-cover bg-gray-50 rounded-lg border border-gray-200"
                    }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "w-40 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400"
                    }, "Görsel yok")),
                    preview.value || currentImageUrl.value ? (openBlock(), createBlock("button", {
                      key: 3,
                      type: "button",
                      onClick: removeImage,
                      class: "text-red-500 text-xs font-semibold hover:underline"
                    }, " Görseli Kaldır ")) : createCommentVNode("", true)
                  ]),
                  createVNode("input", {
                    type: "file",
                    accept: "image/*",
                    onChange: onFileSelected,
                    class: "text-sm"
                  }, null, 32),
                  unref(form).errors.image ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-red-600 text-xs mt-1"
                  }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Başlık"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).about_profile_title = $event,
                    type: "text",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).about_profile_title]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Paragraf 1"),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(form).about_profile_text1 = $event,
                    rows: "3",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).about_profile_text1]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Paragraf 2"),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(form).about_profile_text2 = $event,
                    rows: "3",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).about_profile_text2]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Paragraf 3"),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(form).about_profile_text3 = $event,
                    rows: "3",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).about_profile_text3]
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-semibold text-gray-700 mb-1" }, "Buton Metni"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).about_profile_btn = $event,
                    type: "text",
                    placeholder: "Proje Teklifi Alın",
                    class: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).about_profile_btn]
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/About/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
