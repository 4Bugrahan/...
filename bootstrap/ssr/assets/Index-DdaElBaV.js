import { ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives, withKeys, vModelText, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-DpQUlKjn.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    contacts: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters?.search || "");
    function applyFilters() {
      router.get("/admin/contacts", { search: search.value }, {
        preserveState: true,
        replace: true
      });
    }
    function destroy(contact) {
      if (confirm(`"${contact.name}" adlı kişinin mesajını silmek istediğine emin misin?`)) {
        router.delete(`/admin/contacts/${contact.id}`);
      }
    }
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>İletişim Mesajları | Admin</title>`);
          } else {
            return [
              createVNode("title", null, "İletişim Mesajları | Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-6"${_scopeId}><h1 class="text-xl font-bold text-[#1B3163]"${_scopeId}>İletişim Mesajları</h1></div><div class="flex gap-3 mb-4"${_scopeId}><input${ssrRenderAttr("value", search.value)} type="text" placeholder="İsim, e-posta veya mesajda ara..." class="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}><button class="text-sm font-semibold text-[#0E7A8C]"${_scopeId}>Filtrele</button></div><div class="bg-white rounded-xl shadow-sm overflow-hidden"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-[#F4F6F9] text-gray-500 text-xs uppercase"${_scopeId}><tr${_scopeId}><th class="text-left px-4 py-3"${_scopeId}>Durum</th><th class="text-left px-4 py-3"${_scopeId}>Ad Soyad</th><th class="text-left px-4 py-3"${_scopeId}>E-posta</th><th class="text-left px-4 py-3"${_scopeId}>Telefon</th><th class="text-left px-4 py-3"${_scopeId}>Mesaj (özet)</th><th class="text-left px-4 py-3"${_scopeId}>Tarih</th><th class="text-right px-4 py-3"${_scopeId}>İşlemler</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.contacts.data, (contact) => {
              _push2(`<tr class="${ssrRenderClass([!contact.read_at ? "bg-[#0E7A8C]/5" : "", "border-t border-gray-100"])}"${_scopeId}><td class="px-4 py-3"${_scopeId}>`);
              if (!contact.read_at) {
                _push2(`<span class="inline-block w-2.5 h-2.5 rounded-full bg-[#0E7A8C]" title="Okunmadı"${_scopeId}></span>`);
              } else {
                _push2(`<span class="inline-block w-2.5 h-2.5 rounded-full bg-gray-200" title="Okundu"${_scopeId}></span>`);
              }
              _push2(`</td><td class="px-4 py-3 font-semibold text-gray-800"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/admin/contacts/${contact.id}`,
                class: "hover:text-[#0E7A8C]"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(contact.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(contact.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td><td class="px-4 py-3 text-gray-600"${_scopeId}>${ssrInterpolate(contact.email)}</td><td class="px-4 py-3 text-gray-600"${_scopeId}>${ssrInterpolate(contact.phone || "—")}</td><td class="px-4 py-3 text-gray-500 max-w-xs truncate"${_scopeId}>${ssrInterpolate(contact.message)}</td><td class="px-4 py-3 text-gray-500 whitespace-nowrap"${_scopeId}>${ssrInterpolate(formatDate(contact.created_at))}</td><td class="px-4 py-3 text-right whitespace-nowrap"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/admin/contacts/${contact.id}`,
                class: "text-[#0E7A8C] font-semibold text-xs mr-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Görüntüle`);
                  } else {
                    return [
                      createTextVNode("Görüntüle")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-red-500 font-semibold text-xs"${_scopeId}>Sil</button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.contacts.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="7" class="px-4 py-10 text-center text-gray-400"${_scopeId}>Henüz mesaj yok.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.contacts.links?.length > 3) {
              _push2(`<div class="flex flex-wrap gap-1 mt-4 justify-center"${_scopeId}><!--[-->`);
              ssrRenderList(__props.contacts.links, (link, i) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: i,
                  href: link.url || "",
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
                createVNode("h1", { class: "text-xl font-bold text-[#1B3163]" }, "İletişim Mesajları")
              ]),
              createVNode("div", { class: "flex gap-3 mb-4" }, [
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => search.value = $event,
                  onKeyup: withKeys(applyFilters, ["enter"]),
                  type: "text",
                  placeholder: "İsim, e-posta veya mesajda ara...",
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
                      createVNode("th", { class: "text-left px-4 py-3" }, "Durum"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Ad Soyad"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "E-posta"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Telefon"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Mesaj (özet)"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Tarih"),
                      createVNode("th", { class: "text-right px-4 py-3" }, "İşlemler")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.contacts.data, (contact) => {
                      return openBlock(), createBlock("tr", {
                        key: contact.id,
                        class: ["border-t border-gray-100", !contact.read_at ? "bg-[#0E7A8C]/5" : ""]
                      }, [
                        createVNode("td", { class: "px-4 py-3" }, [
                          !contact.read_at ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "inline-block w-2.5 h-2.5 rounded-full bg-[#0E7A8C]",
                            title: "Okunmadı"
                          })) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "inline-block w-2.5 h-2.5 rounded-full bg-gray-200",
                            title: "Okundu"
                          }))
                        ]),
                        createVNode("td", { class: "px-4 py-3 font-semibold text-gray-800" }, [
                          createVNode(unref(Link), {
                            href: `/admin/contacts/${contact.id}`,
                            class: "hover:text-[#0E7A8C]"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(contact.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ]),
                        createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(contact.email), 1),
                        createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(contact.phone || "—"), 1),
                        createVNode("td", { class: "px-4 py-3 text-gray-500 max-w-xs truncate" }, toDisplayString(contact.message), 1),
                        createVNode("td", { class: "px-4 py-3 text-gray-500 whitespace-nowrap" }, toDisplayString(formatDate(contact.created_at)), 1),
                        createVNode("td", { class: "px-4 py-3 text-right whitespace-nowrap" }, [
                          createVNode(unref(Link), {
                            href: `/admin/contacts/${contact.id}`,
                            class: "text-[#0E7A8C] font-semibold text-xs mr-3"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Görüntüle")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            onClick: ($event) => destroy(contact),
                            class: "text-red-500 font-semibold text-xs"
                          }, "Sil", 8, ["onClick"])
                        ])
                      ], 2);
                    }), 128)),
                    __props.contacts.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "7",
                        class: "px-4 py-10 text-center text-gray-400"
                      }, "Henüz mesaj yok.")
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              __props.contacts.links?.length > 3 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-wrap gap-1 mt-4 justify-center"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.contacts.links, (link, i) => {
                  return openBlock(), createBlock(unref(Link), {
                    key: i,
                    href: link.url || "",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Contacts/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
