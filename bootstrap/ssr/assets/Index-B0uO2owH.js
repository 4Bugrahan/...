import { ref, computed, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, withDirectives, withKeys, vModelText, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-DpQUlKjn.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    partners: Object,
    filters: Object,
    type: { type: String, default: "partner" }
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters?.search || "");
    const tabs = [
      { value: "partner", label: "Markalar / Tedarikçiler" },
      { value: "client", label: "Hizmet Verdiğimiz Kurumlar" }
    ];
    const createHref = computed(() => `/admin/partners/create?type=${props.type}`);
    function switchTab(t) {
      router.get("/admin/partners", { type: t }, { preserveState: true, replace: true });
    }
    function applyFilters() {
      router.get("/admin/partners", { type: props.type, search: search.value }, {
        preserveState: true,
        replace: true
      });
    }
    function destroy(partner) {
      if (confirm(`"${partner.name}" kaydını silmek istediğine emin misin?`)) {
        router.delete(`/admin/partners/${partner.id}`);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Markalar / Tedarikçiler | Admin</title>`);
          } else {
            return [
              createVNode("title", null, "Markalar / Tedarikçiler | Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-6"${_scopeId}><h1 class="text-xl font-bold text-[#1B3163]"${_scopeId}>Markalar / Tedarikçiler</h1>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: createHref.value,
              class: "bg-[#0E7A8C] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#0c6a7a] transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` + Yeni Ekle `);
                } else {
                  return [
                    createTextVNode(" + Yeni Ekle ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-2 mb-5 border-b border-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(tabs, (tab) => {
              _push2(`<button class="${ssrRenderClass([__props.type === tab.value ? "border-[#0E7A8C] text-[#0E7A8C]" : "border-transparent text-gray-400 hover:text-gray-600", "px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors"])}"${_scopeId}>${ssrInterpolate(tab.label)}</button>`);
            });
            _push2(`<!--]--></div><div class="flex gap-3 mb-4"${_scopeId}><input${ssrRenderAttr("value", search.value)} type="text" placeholder="İsimle ara..." class="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}><button class="text-sm font-semibold text-[#0E7A8C]"${_scopeId}>Filtrele</button></div><div class="bg-white rounded-xl shadow-sm overflow-hidden"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-[#F4F6F9] text-gray-500 text-xs uppercase"${_scopeId}><tr${_scopeId}><th class="text-left px-4 py-3"${_scopeId}>Logo</th><th class="text-left px-4 py-3"${_scopeId}>Ad</th><th class="text-left px-4 py-3"${_scopeId}>Sıra</th><th class="text-left px-4 py-3"${_scopeId}>Aktif</th><th class="text-right px-4 py-3"${_scopeId}>İşlemler</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.partners.data, (partner) => {
              _push2(`<tr class="border-t border-gray-100"${_scopeId}><td class="px-4 py-3"${_scopeId}>`);
              if (partner.logo_url) {
                _push2(`<img${ssrRenderAttr("src", partner.logo_url)} class="w-16 h-12 object-contain bg-gray-50 rounded-lg border border-gray-100"${_scopeId}>`);
              } else {
                _push2(`<div class="w-16 h-12 bg-gray-100 rounded-lg"${_scopeId}></div>`);
              }
              _push2(`</td><td class="px-4 py-3 font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(partner.name)}</td><td class="px-4 py-3 text-gray-500"${_scopeId}>${ssrInterpolate(partner.order)}</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass([partner.is_active ? "text-green-600" : "text-red-500", "text-xs font-bold"])}"${_scopeId}>${ssrInterpolate(partner.is_active ? "Aktif" : "Pasif")}</span></td><td class="px-4 py-3 text-right"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/admin/partners/${partner.id}/edit`,
                class: "text-[#0E7A8C] font-semibold text-xs mr-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Düzenle`);
                  } else {
                    return [
                      createTextVNode("Düzenle")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-red-500 font-semibold text-xs"${_scopeId}>Sil</button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.partners.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-4 py-10 text-center text-gray-400"${_scopeId}>Kayıt bulunamadı.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.partners.links?.length > 3) {
              _push2(`<div class="flex gap-1 mt-4 justify-center"${_scopeId}><!--[-->`);
              ssrRenderList(__props.partners.links, (link, i) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: i,
                  href: link.url ? `${link.url}&type=${__props.type}` : "",
                  class: ["px-3 py-1.5 rounded-lg text-xs font-semibold", link.active ? "bg-[#0E7A8C] text-white" : "bg-white text-gray-500 hover:bg-gray-100"]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                createVNode("h1", { class: "text-xl font-bold text-[#1B3163]" }, "Markalar / Tedarikçiler"),
                createVNode(unref(Link), {
                  href: createHref.value,
                  class: "bg-[#0E7A8C] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#0c6a7a] transition-colors"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" + Yeni Ekle ")
                  ]),
                  _: 1
                }, 8, ["href"])
              ]),
              createVNode("div", { class: "flex gap-2 mb-5 border-b border-gray-200" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
                  return createVNode("button", {
                    key: tab.value,
                    onClick: ($event) => switchTab(tab.value),
                    class: ["px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors", __props.type === tab.value ? "border-[#0E7A8C] text-[#0E7A8C]" : "border-transparent text-gray-400 hover:text-gray-600"]
                  }, toDisplayString(tab.label), 11, ["onClick"]);
                }), 64))
              ]),
              createVNode("div", { class: "flex gap-3 mb-4" }, [
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => search.value = $event,
                  onKeyup: withKeys(applyFilters, ["enter"]),
                  type: "text",
                  placeholder: "İsimle ara...",
                  class: "border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vModelText, search.value]
                ]),
                createVNode("button", {
                  onClick: applyFilters,
                  class: "text-sm font-semibold text-[#0E7A8C]"
                }, "Filtrele")
              ]),
              createVNode("div", { class: "bg-white rounded-xl shadow-sm overflow-hidden" }, [
                createVNode("table", { class: "w-full text-sm" }, [
                  createVNode("thead", { class: "bg-[#F4F6F9] text-gray-500 text-xs uppercase" }, [
                    createVNode("tr", null, [
                      createVNode("th", { class: "text-left px-4 py-3" }, "Logo"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Ad"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Sıra"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Aktif"),
                      createVNode("th", { class: "text-right px-4 py-3" }, "İşlemler")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.partners.data, (partner) => {
                      return openBlock(), createBlock("tr", {
                        key: partner.id,
                        class: "border-t border-gray-100"
                      }, [
                        createVNode("td", { class: "px-4 py-3" }, [
                          partner.logo_url ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: partner.logo_url,
                            class: "w-16 h-12 object-contain bg-gray-50 rounded-lg border border-gray-100"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "w-16 h-12 bg-gray-100 rounded-lg"
                          }))
                        ]),
                        createVNode("td", { class: "px-4 py-3 font-semibold text-gray-800" }, toDisplayString(partner.name), 1),
                        createVNode("td", { class: "px-4 py-3 text-gray-500" }, toDisplayString(partner.order), 1),
                        createVNode("td", { class: "px-4 py-3" }, [
                          createVNode("span", {
                            class: [partner.is_active ? "text-green-600" : "text-red-500", "text-xs font-bold"]
                          }, toDisplayString(partner.is_active ? "Aktif" : "Pasif"), 3)
                        ]),
                        createVNode("td", { class: "px-4 py-3 text-right" }, [
                          createVNode(unref(Link), {
                            href: `/admin/partners/${partner.id}/edit`,
                            class: "text-[#0E7A8C] font-semibold text-xs mr-3"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Düzenle")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            onClick: ($event) => destroy(partner),
                            class: "text-red-500 font-semibold text-xs"
                          }, "Sil", 8, ["onClick"])
                        ])
                      ]);
                    }), 128)),
                    __props.partners.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "5",
                        class: "px-4 py-10 text-center text-gray-400"
                      }, "Kayıt bulunamadı.")
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              __props.partners.links?.length > 3 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex gap-1 mt-4 justify-center"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.partners.links, (link, i) => {
                  return openBlock(), createBlock(unref(Link), {
                    key: i,
                    href: link.url ? `${link.url}&type=${__props.type}` : "",
                    innerHTML: link.label,
                    class: ["px-3 py-1.5 rounded-lg text-xs font-semibold", link.active ? "bg-[#0E7A8C] text-white" : "bg-white text-gray-500 hover:bg-gray-100"]
                  }, null, 8, ["href", "innerHTML", "class"]);
                }), 128))
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Partners/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
