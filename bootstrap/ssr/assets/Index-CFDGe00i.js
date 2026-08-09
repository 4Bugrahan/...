import { ref, computed, unref, withCtx, createVNode, createTextVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-DpQUlKjn.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    products: Object,
    categories: Array,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const search = ref(props.filters?.search || "");
    const categoryId = ref(props.filters?.category_id || "");
    const groupedCategories = computed(() => {
      const parents = props.categories.filter((c) => !c.parent_id);
      return parents.map((parent) => ({
        ...parent,
        children: props.categories.filter((c) => c.parent_id === parent.id)
      }));
    });
    function categoryPath(category) {
      if (!category) return "—";
      return category.parent ? `${category.parent.name} / ${category.name}` : category.name;
    }
    function applyFilters() {
      router.get("/admin/products", { search: search.value, category_id: categoryId.value }, {
        preserveState: true,
        replace: true
      });
    }
    function destroy(product) {
      if (confirm(`"${product.name}" ürününü silmek istediğine emin misin?`)) {
        router.delete(`/admin/products/${product.id}`);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Ürünler | Admin</title>`);
          } else {
            return [
              createVNode("title", null, "Ürünler | Admin")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-6"${_scopeId}><h1 class="text-xl font-bold text-[#1B3163]"${_scopeId}>Ürünler</h1>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/admin/products/create",
              class: "bg-[#0E7A8C] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#0c6a7a] transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` + Yeni Ürün `);
                } else {
                  return [
                    createTextVNode(" + Yeni Ürün ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex gap-3 mb-4"${_scopeId}><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Ürün ara..." class="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"${_scopeId}><select class="border border-gray-200 rounded-lg px-3 py-2 text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(categoryId.value) ? ssrLooseContain(categoryId.value, "") : ssrLooseEqual(categoryId.value, "")) ? " selected" : ""}${_scopeId}>Tüm Kategoriler</option><!--[-->`);
            ssrRenderList(groupedCategories.value, (parent) => {
              _push2(`<optgroup${ssrRenderAttr("label", parent.name)}${_scopeId}><option${ssrRenderAttr("value", parent.id)}${ssrIncludeBooleanAttr(Array.isArray(categoryId.value) ? ssrLooseContain(categoryId.value, parent.id) : ssrLooseEqual(categoryId.value, parent.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(parent.name)} (genel)</option><!--[-->`);
              ssrRenderList(parent.children, (child) => {
                _push2(`<option${ssrRenderAttr("value", child.id)}${ssrIncludeBooleanAttr(Array.isArray(categoryId.value) ? ssrLooseContain(categoryId.value, child.id) : ssrLooseEqual(categoryId.value, child.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(child.name)}</option>`);
              });
              _push2(`<!--]--></optgroup>`);
            });
            _push2(`<!--]--></select><button class="text-sm font-semibold text-[#0E7A8C]"${_scopeId}>Filtrele</button></div><div class="bg-white rounded-xl shadow-sm overflow-hidden"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead class="bg-[#F4F6F9] text-gray-500 text-xs uppercase"${_scopeId}><tr${_scopeId}><th class="text-left px-4 py-3"${_scopeId}>Görsel</th><th class="text-left px-4 py-3"${_scopeId}>Ad</th><th class="text-left px-4 py-3"${_scopeId}>Kategori</th><th class="text-left px-4 py-3"${_scopeId}>Öne Çıkan</th><th class="text-left px-4 py-3"${_scopeId}>Aktif</th><th class="text-right px-4 py-3"${_scopeId}>İşlemler</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.products.data, (product) => {
              _push2(`<tr class="border-t border-gray-100"${_scopeId}><td class="px-4 py-3"${_scopeId}>`);
              if (product.image_urls?.[0]) {
                _push2(`<img${ssrRenderAttr("src", product.image_urls[0])} class="w-12 h-12 object-cover rounded-lg"${_scopeId}>`);
              } else {
                _push2(`<div class="w-12 h-12 bg-gray-100 rounded-lg"${_scopeId}></div>`);
              }
              _push2(`</td><td class="px-4 py-3 font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(product.name)}</td><td class="px-4 py-3 text-gray-500"${_scopeId}>${ssrInterpolate(categoryPath(product.category))}</td><td class="px-4 py-3"${_scopeId}>`);
              if (product.featured) {
                _push2(`<span class="text-xs font-bold text-[#0E7A8C]"${_scopeId}>Evet</span>`);
              } else {
                _push2(`<span class="text-xs text-gray-400"${_scopeId}>—</span>`);
              }
              _push2(`</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass([product.is_active ? "text-green-600" : "text-red-500", "text-xs font-bold"])}"${_scopeId}>${ssrInterpolate(product.is_active ? "Aktif" : "Pasif")}</span></td><td class="px-4 py-3 text-right"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/admin/products/${product.id}/edit`,
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
            if (__props.products.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-4 py-10 text-center text-gray-400"${_scopeId}>Ürün bulunamadı.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.products.links?.length > 3) {
              _push2(`<div class="flex gap-1 mt-4 justify-center"${_scopeId}><!--[-->`);
              ssrRenderList(__props.products.links, (link, i) => {
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
                createVNode("h1", { class: "text-xl font-bold text-[#1B3163]" }, "Ürünler"),
                createVNode(unref(Link), {
                  href: "/admin/products/create",
                  class: "bg-[#0E7A8C] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#0c6a7a] transition-colors"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" + Yeni Ürün ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "flex gap-3 mb-4" }, [
                withDirectives(createVNode("input", {
                  "onUpdate:modelValue": ($event) => search.value = $event,
                  onKeyup: withKeys(applyFilters, ["enter"]),
                  type: "text",
                  placeholder: "Ürün ara...",
                  class: "border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"
                }, null, 40, ["onUpdate:modelValue"]), [
                  [vModelText, search.value]
                ]),
                withDirectives(createVNode("select", {
                  "onUpdate:modelValue": ($event) => categoryId.value = $event,
                  onChange: applyFilters,
                  class: "border border-gray-200 rounded-lg px-3 py-2 text-sm"
                }, [
                  createVNode("option", { value: "" }, "Tüm Kategoriler"),
                  (openBlock(true), createBlock(Fragment, null, renderList(groupedCategories.value, (parent) => {
                    return openBlock(), createBlock("optgroup", {
                      key: parent.id,
                      label: parent.name
                    }, [
                      createVNode("option", {
                        value: parent.id
                      }, toDisplayString(parent.name) + " (genel)", 9, ["value"]),
                      (openBlock(true), createBlock(Fragment, null, renderList(parent.children, (child) => {
                        return openBlock(), createBlock("option", {
                          key: child.id,
                          value: child.id
                        }, toDisplayString(child.name), 9, ["value"]);
                      }), 128))
                    ], 8, ["label"]);
                  }), 128))
                ], 40, ["onUpdate:modelValue"]), [
                  [vModelSelect, categoryId.value]
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
                      createVNode("th", { class: "text-left px-4 py-3" }, "Görsel"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Ad"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Kategori"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Öne Çıkan"),
                      createVNode("th", { class: "text-left px-4 py-3" }, "Aktif"),
                      createVNode("th", { class: "text-right px-4 py-3" }, "İşlemler")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.products.data, (product) => {
                      return openBlock(), createBlock("tr", {
                        key: product.id,
                        class: "border-t border-gray-100"
                      }, [
                        createVNode("td", { class: "px-4 py-3" }, [
                          product.image_urls?.[0] ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: product.image_urls[0],
                            class: "w-12 h-12 object-cover rounded-lg"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "w-12 h-12 bg-gray-100 rounded-lg"
                          }))
                        ]),
                        createVNode("td", { class: "px-4 py-3 font-semibold text-gray-800" }, toDisplayString(product.name), 1),
                        createVNode("td", { class: "px-4 py-3 text-gray-500" }, toDisplayString(categoryPath(product.category)), 1),
                        createVNode("td", { class: "px-4 py-3" }, [
                          product.featured ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-xs font-bold text-[#0E7A8C]"
                          }, "Evet")) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-xs text-gray-400"
                          }, "—"))
                        ]),
                        createVNode("td", { class: "px-4 py-3" }, [
                          createVNode("span", {
                            class: [product.is_active ? "text-green-600" : "text-red-500", "text-xs font-bold"]
                          }, toDisplayString(product.is_active ? "Aktif" : "Pasif"), 3)
                        ]),
                        createVNode("td", { class: "px-4 py-3 text-right" }, [
                          createVNode(unref(Link), {
                            href: `/admin/products/${product.id}/edit`,
                            class: "text-[#0E7A8C] font-semibold text-xs mr-3"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Düzenle")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            onClick: ($event) => destroy(product),
                            class: "text-red-500 font-semibold text-xs"
                          }, "Sil", 8, ["onClick"])
                        ])
                      ]);
                    }), 128)),
                    __props.products.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "6",
                        class: "px-4 py-10 text-center text-gray-400"
                      }, "Ürün bulunamadı.")
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              __props.products.links?.length > 3 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex gap-1 mt-4 justify-center"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.products.links, (link, i) => {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Products/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
