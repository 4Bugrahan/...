import { computed, ref, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { u as useLocale } from "./useLocale-14nRWKiE.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./AppLayout-DYdQlh9Z.js";
const _sfc_main = {
  __name: "Category",
  __ssrInlineRender: true,
  props: {
    category: { type: Object, required: true },
    products: { type: Object, default: () => ({ data: [], links: [], total: 0 }) },
    sidebarChildren: { type: Array, default: () => [] },
    categories: { type: Array, default: () => [] }
  },
  setup(__props) {
    const { trans, field } = useLocale();
    const props = __props;
    const localizedProducts = computed(
      () => props.products.data.map((p) => ({
        ...p,
        name: field(p, "name") || p.name
      }))
    );
    const localizedCategories = computed(
      () => props.categories.map((c) => ({ ...c, name: field(c, "name") || c.name }))
    );
    const activeParentId = computed(() => props.category.parent_id ?? props.category.id);
    const localizedSidebarChildren = computed(
      () => props.sidebarChildren.map((c) => ({ ...c, name: field(c, "name") || c.name }))
    );
    const mobileFiltersOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-gradient-to-br from-[#1B3163] to-[#1B3163] py-16"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><h1 class="text-3xl sm:text-4xl font-black text-white"${_scopeId}>${ssrInterpolate(unref(trans)("products.page_h1"))}</h1></div></section><div class="py-12 bg-gray-50"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex lg:hidden items-center gap-3 mb-6"${_scopeId}><div class="flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`</div><button type="button" class="flex items-center gap-2 bg-[#0E7A8C] hover:bg-[#0B6575] text-white text-sm font-bold px-4 py-2.5 rounded-full transition-colors flex-shrink-0"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M6 12h12M10 20h4"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("products.categories"))}</button></div><div class="flex flex-col lg:flex-row gap-8"${_scopeId}><aside class="${ssrRenderClass([mobileFiltersOpen.value ? "block" : "hidden", "lg:block lg:w-64 flex-shrink-0"])}"${_scopeId}><div class="bg-white rounded-2xl shadow-sm overflow-hidden lg:sticky lg:top-28"${_scopeId}><div class="bg-[#1B3163] px-5 py-4"${_scopeId}><h3 class="font-bold text-white text-sm tracking-widest uppercase"${_scopeId}>${ssrInterpolate(unref(trans)("products.categories"))}</h3></div><nav class="p-2"${_scopeId}><!--[-->`);
            ssrRenderList(localizedCategories.value, (cat) => {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/urunler/${cat.slug}`,
                class: [
                  "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  cat.id === activeParentId.value ? "bg-[#1B3163] text-white" : "text-[#1B3163] hover:bg-gray-50 hover:text-[#0E7A8C]"
                ]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>${ssrInterpolate(cat.name)}</span><svg class="${ssrRenderClass([cat.id === activeParentId.value && localizedSidebarChildren.value.length ? "rotate-90" : "", "w-4 h-4 opacity-60 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId2}></path></svg>`);
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(cat.name), 1),
                      (openBlock(), createBlock("svg", {
                        class: ["w-4 h-4 opacity-60 transition-transform duration-200", cat.id === activeParentId.value && localizedSidebarChildren.value.length ? "rotate-90" : ""],
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 5l7 7-7 7"
                        })
                      ], 2))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (cat.id === activeParentId.value && localizedSidebarChildren.value.length) {
                _push2(`<div class="ml-3 mb-1"${_scopeId}><!--[-->`);
                ssrRenderList(localizedSidebarChildren.value, (sub) => {
                  _push2(ssrRenderComponent(unref(Link), {
                    key: sub.id,
                    href: `/urunler/${sub.slug}`,
                    class: [
                      "flex items-center justify-between gap-2 pl-4 pr-3 py-2 rounded-lg text-sm transition-colors",
                      sub.id === __props.category.id ? "bg-[#0E7A8C] text-white font-semibold" : "text-[#555] hover:bg-gray-50 hover:text-[#0E7A8C]"
                    ]
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<span${_scopeId2}>${ssrInterpolate(sub.name)}</span>`);
                        if (sub.id === __props.category.id) {
                          _push3(`<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"${_scopeId2}></path></svg>`);
                        } else {
                          _push3(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("span", null, toDisplayString(sub.name), 1),
                          sub.id === __props.category.id ? (openBlock(), createBlock("svg", {
                            key: 0,
                            class: "w-3.5 h-3.5 flex-shrink-0",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2.5",
                              d: "M9 5l7 7-7 7"
                            })
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></nav></div></aside><div class="flex-1"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6"${_scopeId}><p class="text-[#666] text-sm"${_scopeId}><span class="font-bold text-[#1B3163]"${_scopeId}>${ssrInterpolate(__props.products.total ?? localizedProducts.value.length)}</span> ${ssrInterpolate(unref(trans)("products.product_count"))}</p><div class="hidden lg:block w-72"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (localizedProducts.value.length > 0) {
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(localizedProducts.value, (product) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: product.id,
                  href: `/urunler/${product.category_slug || __props.category.slug}/${product.slug}`,
                  class: "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="relative h-52 overflow-hidden bg-white border-b border-gray-100"${_scopeId2}>`);
                      if (product.image_urls && product.image_urls[0]) {
                        _push3(`<img${ssrRenderAttr("src", product.image_urls[0])}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"${_scopeId2}>`);
                      } else {
                        _push3(`<div class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"${_scopeId2}><svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId2}></path></svg></div>`);
                      }
                      if (product.featured) {
                        _push3(`<div class="absolute top-3 left-3"${_scopeId2}><span class="bg-[#0E7A8C] text-white text-xs font-bold px-3 py-1 rounded-full"${_scopeId2}>${ssrInterpolate(unref(trans)("products.featured_badge"))}</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="p-5"${_scopeId2}><h3 class="font-bold text-[#1B3163] text-base mb-2 group-hover:text-[#0E7A8C] transition-colors leading-snug"${_scopeId2}>${ssrInterpolate(product.name)}</h3><div class="flex items-center gap-2 text-[#0E7A8C] text-sm font-semibold"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(unref(trans)("products.view_details"))}</span><svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId2}></path></svg></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "relative h-52 overflow-hidden bg-white border-b border-gray-100" }, [
                          product.image_urls && product.image_urls[0] ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: product.image_urls[0],
                            alt: product.name,
                            class: "w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-16 h-16 text-gray-300",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1",
                                d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              })
                            ]))
                          ])),
                          product.featured ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "absolute top-3 left-3"
                          }, [
                            createVNode("span", { class: "bg-[#0E7A8C] text-white text-xs font-bold px-3 py-1 rounded-full" }, toDisplayString(unref(trans)("products.featured_badge")), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "p-5" }, [
                          createVNode("h3", { class: "font-bold text-[#1B3163] text-base mb-2 group-hover:text-[#0E7A8C] transition-colors leading-snug" }, toDisplayString(product.name), 1),
                          createVNode("div", { class: "flex items-center gap-2 text-[#0E7A8C] text-sm font-semibold" }, [
                            createVNode("span", null, toDisplayString(unref(trans)("products.view_details")), 1),
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 group-hover:translate-x-1 transition-transform",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 5l7 7-7 7"
                              })
                            ]))
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.products.links && __props.products.links.length > 3) {
              _push2(`<div class="flex flex-wrap gap-1.5 mt-10 justify-center"${_scopeId}><!--[-->`);
              ssrRenderList(__props.products.links, (link, i) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: i,
                  href: link.url || "",
                  "preserve-scroll": "",
                  class: ["px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors", link.active ? "bg-[#1B3163] text-white" : link.url ? "bg-white text-[#1B3163] border border-gray-200 hover:border-[#0E7A8C]/50 hover:text-[#0E7A8C]" : "text-gray-300 cursor-default pointer-events-none"]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-20"${_scopeId}><div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5"${_scopeId}><svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId}></path></svg></div><h3 class="text-[#1B3163] font-bold text-xl mb-2"${_scopeId}>${ssrInterpolate(unref(trans)("products.no_product_h"))}</h3><p class="text-[#666] mb-6"${_scopeId}>${ssrInterpolate(unref(trans)("products.no_product_p"))}</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/iletisim",
                class: "inline-flex items-center gap-2 bg-[#0E7A8C] text-white font-bold px-6 py-3 rounded-lg transition-colors hover:bg-[#0B6575]"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(trans)("common.contact_us"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(trans)("common.contact_us")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("section", { class: "bg-gradient-to-br from-[#1B3163] to-[#1B3163] py-16" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("h1", { class: "text-3xl sm:text-4xl font-black text-white" }, toDisplayString(unref(trans)("products.page_h1")), 1)
                ])
              ]),
              createVNode("div", { class: "py-12 bg-gray-50" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex lg:hidden items-center gap-3 mb-6" }, [
                    createVNode("div", { class: "flex-1" }, [
                      createVNode(_sfc_main$2)
                    ]),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => mobileFiltersOpen.value = !mobileFiltersOpen.value,
                      class: "flex items-center gap-2 bg-[#0E7A8C] hover:bg-[#0B6575] text-white text-sm font-bold px-4 py-2.5 rounded-full transition-colors flex-shrink-0"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M3 4h18M6 12h12M10 20h4"
                        })
                      ])),
                      createTextVNode(" " + toDisplayString(unref(trans)("products.categories")), 1)
                    ], 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "flex flex-col lg:flex-row gap-8" }, [
                    createVNode("aside", {
                      class: [mobileFiltersOpen.value ? "block" : "hidden", "lg:block lg:w-64 flex-shrink-0"]
                    }, [
                      createVNode("div", { class: "bg-white rounded-2xl shadow-sm overflow-hidden lg:sticky lg:top-28" }, [
                        createVNode("div", { class: "bg-[#1B3163] px-5 py-4" }, [
                          createVNode("h3", { class: "font-bold text-white text-sm tracking-widest uppercase" }, toDisplayString(unref(trans)("products.categories")), 1)
                        ]),
                        createVNode("nav", { class: "p-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(localizedCategories.value, (cat) => {
                            return openBlock(), createBlock(Fragment, {
                              key: cat.id
                            }, [
                              createVNode(unref(Link), {
                                href: `/urunler/${cat.slug}`,
                                class: [
                                  "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                  cat.id === activeParentId.value ? "bg-[#1B3163] text-white" : "text-[#1B3163] hover:bg-gray-50 hover:text-[#0E7A8C]"
                                ]
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, toDisplayString(cat.name), 1),
                                  (openBlock(), createBlock("svg", {
                                    class: ["w-4 h-4 opacity-60 transition-transform duration-200", cat.id === activeParentId.value && localizedSidebarChildren.value.length ? "rotate-90" : ""],
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M9 5l7 7-7 7"
                                    })
                                  ], 2))
                                ]),
                                _: 2
                              }, 1032, ["href", "class"]),
                              cat.id === activeParentId.value && localizedSidebarChildren.value.length ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "ml-3 mb-1"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(localizedSidebarChildren.value, (sub) => {
                                  return openBlock(), createBlock(unref(Link), {
                                    key: sub.id,
                                    href: `/urunler/${sub.slug}`,
                                    class: [
                                      "flex items-center justify-between gap-2 pl-4 pr-3 py-2 rounded-lg text-sm transition-colors",
                                      sub.id === __props.category.id ? "bg-[#0E7A8C] text-white font-semibold" : "text-[#555] hover:bg-gray-50 hover:text-[#0E7A8C]"
                                    ]
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", null, toDisplayString(sub.name), 1),
                                      sub.id === __props.category.id ? (openBlock(), createBlock("svg", {
                                        key: 0,
                                        class: "w-3.5 h-3.5 flex-shrink-0",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2.5",
                                          d: "M9 5l7 7-7 7"
                                        })
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["href", "class"]);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ], 64);
                          }), 128))
                        ])
                      ])
                    ], 2),
                    createVNode("div", { class: "flex-1" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6" }, [
                        createVNode("p", { class: "text-[#666] text-sm" }, [
                          createVNode("span", { class: "font-bold text-[#1B3163]" }, toDisplayString(__props.products.total ?? localizedProducts.value.length), 1),
                          createTextVNode(" " + toDisplayString(unref(trans)("products.product_count")), 1)
                        ]),
                        createVNode("div", { class: "hidden lg:block w-72" }, [
                          createVNode(_sfc_main$2)
                        ])
                      ]),
                      localizedProducts.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(localizedProducts.value, (product) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: product.id,
                            href: `/urunler/${product.category_slug || __props.category.slug}/${product.slug}`,
                            class: "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "relative h-52 overflow-hidden bg-white border-b border-gray-100" }, [
                                product.image_urls && product.image_urls[0] ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: product.image_urls[0],
                                  alt: product.name,
                                  class: "w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-16 h-16 text-gray-300",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "1",
                                      d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    })
                                  ]))
                                ])),
                                product.featured ? (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "absolute top-3 left-3"
                                }, [
                                  createVNode("span", { class: "bg-[#0E7A8C] text-white text-xs font-bold px-3 py-1 rounded-full" }, toDisplayString(unref(trans)("products.featured_badge")), 1)
                                ])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "p-5" }, [
                                createVNode("h3", { class: "font-bold text-[#1B3163] text-base mb-2 group-hover:text-[#0E7A8C] transition-colors leading-snug" }, toDisplayString(product.name), 1),
                                createVNode("div", { class: "flex items-center gap-2 text-[#0E7A8C] text-sm font-semibold" }, [
                                  createVNode("span", null, toDisplayString(unref(trans)("products.view_details")), 1),
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 group-hover:translate-x-1 transition-transform",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M9 5l7 7-7 7"
                                    })
                                  ]))
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"]);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      __props.products.links && __props.products.links.length > 3 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-wrap gap-1.5 mt-10 justify-center"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.products.links, (link, i) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: i,
                            href: link.url || "",
                            innerHTML: link.label,
                            "preserve-scroll": "",
                            class: ["px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors", link.active ? "bg-[#1B3163] text-white" : link.url ? "bg-white text-[#1B3163] border border-gray-200 hover:border-[#0E7A8C]/50 hover:text-[#0E7A8C]" : "text-gray-300 cursor-default pointer-events-none"]
                          }, null, 8, ["href", "innerHTML", "class"]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 2,
                        class: "text-center py-20"
                      }, [
                        createVNode("div", { class: "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-10 h-10 text-gray-300",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.5",
                              d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            })
                          ]))
                        ]),
                        createVNode("h3", { class: "text-[#1B3163] font-bold text-xl mb-2" }, toDisplayString(unref(trans)("products.no_product_h")), 1),
                        createVNode("p", { class: "text-[#666] mb-6" }, toDisplayString(unref(trans)("products.no_product_p")), 1),
                        createVNode(unref(Link), {
                          href: "/iletisim",
                          class: "inline-flex items-center gap-2 bg-[#0E7A8C] text-white font-bold px-6 py-3 rounded-lg transition-colors hover:bg-[#0B6575]"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(trans)("common.contact_us")), 1)
                          ]),
                          _: 1
                        })
                      ]))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Category.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
