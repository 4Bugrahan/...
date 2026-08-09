import { ref, unref, withCtx, createVNode, createTextVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-DpQUlKjn.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tree: { type: Array, default: null },
    flat: { type: Array, default: null },
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters?.search || "");
    const collapsed = ref(/* @__PURE__ */ new Set());
    function toggle(id) {
      const next = new Set(collapsed.value);
      next.has(id) ? next.delete(id) : next.add(id);
      collapsed.value = next;
    }
    function applyFilters() {
      router.get("/admin/categories", { search: search.value }, { preserveState: true, replace: true });
    }
    function destroy(category) {
      if (confirm(`"${category.name}" kategorisini silmek istediğine emin misin?`)) {
        router.delete(`/admin/categories/${category.id}`);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Kategoriler | Admin</title>`);
          } else {
            return [
              createVNode("title", null, "Kategoriler | Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-6"${_scopeId}><h1 class="text-xl font-bold text-[#1B3163]"${_scopeId}>Kategoriler</h1>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/admin/categories/create",
              class: "bg-[#0E7A8C] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#0c6a7a] transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` + Yeni Kategori `);
                } else {
                  return [
                    createTextVNode(" + Yeni Kategori ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3 mb-4"${_scopeId}><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Kategori ara..." class="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}><button class="text-sm font-semibold text-[#0E7A8C]"${_scopeId}>Filtrele</button></div>`);
            if (__props.tree) {
              _push2(`<div class="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tree, (parent) => {
                _push2(`<div${_scopeId}><div class="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"${_scopeId}><button class="text-gray-400 hover:text-[#0E7A8C] flex-shrink-0"${ssrRenderAttr("aria-label", collapsed.value.has(parent.id) ? "Genişlet" : "Daralt")}${_scopeId}><svg class="${ssrRenderClass([collapsed.value.has(parent.id) ? "-rotate-90" : "", "w-4 h-4 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"${_scopeId}></path></svg></button>`);
                if (parent.image_url) {
                  _push2(`<img${ssrRenderAttr("src", parent.image_url)} class="w-10 h-10 object-cover rounded-lg flex-shrink-0"${_scopeId}>`);
                } else {
                  _push2(`<div class="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0"${_scopeId}></div>`);
                }
                _push2(`<div class="flex-1 min-w-0"${_scopeId}><div class="font-bold text-gray-800 text-sm truncate"${_scopeId}>${ssrInterpolate(parent.name)}</div><div class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(parent.children.length)} alt kategori · ${ssrInterpolate(parent.products_count)} ürün </div></div><span class="${ssrRenderClass([parent.is_active ? "text-green-600" : "text-red-500", "text-xs font-bold flex-shrink-0"])}"${_scopeId}>${ssrInterpolate(parent.is_active ? "Aktif" : "Pasif")}</span>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/admin/categories/${parent.id}/edit`,
                  class: "text-[#0E7A8C] font-semibold text-xs flex-shrink-0"
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
                _push2(`<button class="text-red-500 font-semibold text-xs flex-shrink-0"${_scopeId}>Sil</button></div><div class="bg-gray-50/60" style="${ssrRenderStyle(!collapsed.value.has(parent.id) ? null : { display: "none" })}"${_scopeId}><!--[-->`);
                ssrRenderList(parent.children, (child) => {
                  _push2(`<div class="flex items-center gap-3 pl-14 pr-4 py-2.5 border-t border-gray-100 hover:bg-gray-50 transition-colors"${_scopeId}>`);
                  if (child.image_url) {
                    _push2(`<img${ssrRenderAttr("src", child.image_url)} class="w-8 h-8 object-cover rounded-md flex-shrink-0"${_scopeId}>`);
                  } else {
                    _push2(`<div class="w-8 h-8 bg-gray-200 rounded-md flex-shrink-0"${_scopeId}></div>`);
                  }
                  _push2(`<div class="flex-1 min-w-0"${_scopeId}><div class="font-semibold text-gray-700 text-sm truncate"${_scopeId}>${ssrInterpolate(child.name)}</div><div class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(child.products_count)} ürün</div></div><span class="${ssrRenderClass([child.is_active ? "text-green-600" : "text-red-500", "text-xs font-bold flex-shrink-0"])}"${_scopeId}>${ssrInterpolate(child.is_active ? "Aktif" : "Pasif")}</span>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: `/admin/categories/${child.id}/edit`,
                    class: "text-[#0E7A8C] font-semibold text-xs flex-shrink-0"
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
                  _push2(`<button class="text-red-500 font-semibold text-xs flex-shrink-0"${_scopeId}>Sil</button></div>`);
                });
                _push2(`<!--]-->`);
                if (parent.children.length === 0) {
                  _push2(`<div class="pl-14 pr-4 py-2.5 border-t border-gray-100 text-xs text-gray-400 italic"${_scopeId}> Alt kategori yok </div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]-->`);
              if (__props.tree.length === 0) {
                _push2(`<div class="px-4 py-10 text-center text-gray-400 text-sm"${_scopeId}>Kategori bulunamadı.</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="bg-white rounded-xl shadow-sm overflow-hidden"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-[#F4F6F9] text-gray-500 text-xs uppercase"${_scopeId}><tr${_scopeId}><th class="text-left px-4 py-3"${_scopeId}>Görsel</th><th class="text-left px-4 py-3"${_scopeId}>Ad</th><th class="text-left px-4 py-3"${_scopeId}>Üst Kategori</th><th class="text-left px-4 py-3"${_scopeId}>Ürün Sayısı</th><th class="text-left px-4 py-3"${_scopeId}>Aktif</th><th class="text-right px-4 py-3"${_scopeId}>İşlemler</th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.flat, (category) => {
                _push2(`<tr class="border-t border-gray-100"${_scopeId}><td class="px-4 py-3"${_scopeId}>`);
                if (category.image_url) {
                  _push2(`<img${ssrRenderAttr("src", category.image_url)} class="w-12 h-12 object-cover rounded-lg"${_scopeId}>`);
                } else {
                  _push2(`<div class="w-12 h-12 bg-gray-100 rounded-lg"${_scopeId}></div>`);
                }
                _push2(`</td><td class="px-4 py-3 font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(category.name)}</td><td class="px-4 py-3 text-gray-500"${_scopeId}>${ssrInterpolate(category.parent?.name || "—")}</td><td class="px-4 py-3 text-gray-500"${_scopeId}>${ssrInterpolate(category.products_count)}</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass([category.is_active ? "text-green-600" : "text-red-500", "text-xs font-bold"])}"${_scopeId}>${ssrInterpolate(category.is_active ? "Aktif" : "Pasif")}</span></td><td class="px-4 py-3 text-right"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/admin/categories/${category.id}/edit`,
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
              if (__props.flat.length === 0) {
                _push2(`<tr${_scopeId}><td colspan="6" class="px-4 py-10 text-center text-gray-400"${_scopeId}>Kategori bulunamadı.</td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tbody></table></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                createVNode("h1", { class: "text-xl font-bold text-[#1B3163]" }, "Kategoriler"),
                createVNode(unref(Link), {
                  href: "/admin/categories/create",
                  class: "bg-[#0E7A8C] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#0c6a7a] transition-colors"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" + Yeni Kategori ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "flex gap-3 mb-4" }, [
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => search.value = $event,
                  onKeyup: withKeys(applyFilters, ["enter"]),
                  type: "text",
                  placeholder: "Kategori ara...",
                  class: "border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vModelText, search.value]
                ]),
                createVNode("button", {
                  onClick: applyFilters,
                  class: "text-sm font-semibold text-[#0E7A8C]"
                }, "Filtrele")
              ]),
              __props.tree ? (openBlock(), createBlock("div", {
                key: 0,
                class: "bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.tree, (parent) => {
                  return openBlock(), createBlock("div", {
                    key: parent.id
                  }, [
                    createVNode("div", { class: "flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors" }, [
                      createVNode("button", {
                        onClick: ($event) => toggle(parent.id),
                        class: "text-gray-400 hover:text-[#0E7A8C] flex-shrink-0",
                        "aria-label": collapsed.value.has(parent.id) ? "Genişlet" : "Daralt"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: ["w-4 h-4 transition-transform duration-200", collapsed.value.has(parent.id) ? "-rotate-90" : ""],
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2.5",
                            d: "M19 9l-7 7-7-7"
                          })
                        ], 2))
                      ], 8, ["onClick", "aria-label"]),
                      parent.image_url ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: parent.image_url,
                        class: "w-10 h-10 object-cover rounded-lg flex-shrink-0"
                      }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0"
                      })),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode("div", { class: "font-bold text-gray-800 text-sm truncate" }, toDisplayString(parent.name), 1),
                        createVNode("div", { class: "text-xs text-gray-400" }, toDisplayString(parent.children.length) + " alt kategori · " + toDisplayString(parent.products_count) + " ürün ", 1)
                      ]),
                      createVNode("span", {
                        class: [parent.is_active ? "text-green-600" : "text-red-500", "text-xs font-bold flex-shrink-0"]
                      }, toDisplayString(parent.is_active ? "Aktif" : "Pasif"), 3),
                      createVNode(unref(Link), {
                        href: `/admin/categories/${parent.id}/edit`,
                        class: "text-[#0E7A8C] font-semibold text-xs flex-shrink-0"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Düzenle")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        onClick: ($event) => destroy(parent),
                        class: "text-red-500 font-semibold text-xs flex-shrink-0"
                      }, "Sil", 8, ["onClick"])
                    ]),
                    withDirectives(createVNode("div", { class: "bg-gray-50/60" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(parent.children, (child) => {
                        return openBlock(), createBlock("div", {
                          key: child.id,
                          class: "flex items-center gap-3 pl-14 pr-4 py-2.5 border-t border-gray-100 hover:bg-gray-50 transition-colors"
                        }, [
                          child.image_url ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: child.image_url,
                            class: "w-8 h-8 object-cover rounded-md flex-shrink-0"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "w-8 h-8 bg-gray-200 rounded-md flex-shrink-0"
                          })),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("div", { class: "font-semibold text-gray-700 text-sm truncate" }, toDisplayString(child.name), 1),
                            createVNode("div", { class: "text-xs text-gray-400" }, toDisplayString(child.products_count) + " ürün", 1)
                          ]),
                          createVNode("span", {
                            class: [child.is_active ? "text-green-600" : "text-red-500", "text-xs font-bold flex-shrink-0"]
                          }, toDisplayString(child.is_active ? "Aktif" : "Pasif"), 3),
                          createVNode(unref(Link), {
                            href: `/admin/categories/${child.id}/edit`,
                            class: "text-[#0E7A8C] font-semibold text-xs flex-shrink-0"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Düzenle")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            onClick: ($event) => destroy(child),
                            class: "text-red-500 font-semibold text-xs flex-shrink-0"
                          }, "Sil", 8, ["onClick"])
                        ]);
                      }), 128)),
                      parent.children.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "pl-14 pr-4 py-2.5 border-t border-gray-100 text-xs text-gray-400 italic"
                      }, " Alt kategori yok ")) : createCommentVNode("", true)
                    ], 512), [
                      [vShow, !collapsed.value.has(parent.id)]
                    ])
                  ]);
                }), 128)),
                __props.tree.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "px-4 py-10 text-center text-gray-400 text-sm"
                }, "Kategori bulunamadı.")) : createCommentVNode("", true)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "bg-white rounded-xl shadow-sm overflow-hidden"
              }, [
                createVNode("table", { class: "w-full text-sm" }, [
                  createVNode("thead", { class: "bg-[#F4F6F9] text-gray-500 text-xs uppercase" }, [
                    createVNode("tr", null, [
                      createVNode("th", { class: "text-left px-4 py-3" }, "Görsel"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Ad"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Üst Kategori"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Ürün Sayısı"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Aktif"),
                      createVNode("th", { class: "text-right px-4 py-3" }, "İşlemler")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.flat, (category) => {
                      return openBlock(), createBlock("tr", {
                        key: category.id,
                        class: "border-t border-gray-100"
                      }, [
                        createVNode("td", { class: "px-4 py-3" }, [
                          category.image_url ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: category.image_url,
                            class: "w-12 h-12 object-cover rounded-lg"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "w-12 h-12 bg-gray-100 rounded-lg"
                          }))
                        ]),
                        createVNode("td", { class: "px-4 py-3 font-semibold text-gray-800" }, toDisplayString(category.name), 1),
                        createVNode("td", { class: "px-4 py-3 text-gray-500" }, toDisplayString(category.parent?.name || "—"), 1),
                        createVNode("td", { class: "px-4 py-3 text-gray-500" }, toDisplayString(category.products_count), 1),
                        createVNode("td", { class: "px-4 py-3" }, [
                          createVNode("span", {
                            class: [category.is_active ? "text-green-600" : "text-red-500", "text-xs font-bold"]
                          }, toDisplayString(category.is_active ? "Aktif" : "Pasif"), 3)
                        ]),
                        createVNode("td", { class: "px-4 py-3 text-right" }, [
                          createVNode(unref(Link), {
                            href: `/admin/categories/${category.id}/edit`,
                            class: "text-[#0E7A8C] font-semibold text-xs mr-3"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Düzenle")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            onClick: ($event) => destroy(category),
                            class: "text-red-500 font-semibold text-xs"
                          }, "Sil", 8, ["onClick"])
                        ])
                      ]);
                    }), 128)),
                    __props.flat.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "6",
                        class: "px-4 py-10 text-center text-gray-400"
                      }, "Kategori bulunamadı.")
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Categories/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
