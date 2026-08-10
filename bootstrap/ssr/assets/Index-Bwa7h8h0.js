import { computed, ref, withCtx, unref, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { u as useLocale } from "./useLocale-14nRWKiE.js";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./AppLayout-BaP77qHm.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    categories: { type: Array, default: () => [] },
    products: { type: Object, default: () => ({ data: [], links: [], total: 0 }) },
    categoryTree: { type: Array, default: () => [] },
    pageContent: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const c = (key, fallback = "") => props.pageContent[key] || fallback;
    const { trans, field } = useLocale();
    const defaultCategories = [
      { id: 1, name: "Pişiriciler", slug: "pisiriciler", description: "Endüstriyel ocaklar, ızgaralar ve fritözler." },
      { id: 2, name: "Fırınlar", slug: "firinlar", description: "Konveksiyonlu, kombi ve pizza fırınları." },
      { id: 3, name: "Bulaşıkhane Ekipmanları", slug: "bulasikhane-ekipmanlari", description: "Endüstriyel bulaşık makineleri." },
      { id: 4, name: "Buzdolapları", slug: "buzdolaplari", description: "Tezgah altı ve dik tip buzdolapları." },
      { id: 5, name: "Hazırlık Ekipmanları", slug: "hazirlik-ekipmanlari", description: "Sebze yıkama ve hazırlık üniteleri." },
      { id: 6, name: "Nötr Ekipmanlar", slug: "notr-ekipmanlar", description: "Tezgahlar, raflar ve evyeler." }
    ];
    const displayCategories = computed(
      () => (props.categories.length > 0 ? props.categories : defaultCategories).map((cat) => ({
        ...cat,
        name: field(cat, "name") || cat.name,
        description: field(cat, "description") || cat.description
      }))
    );
    const getCoverImage = (slug) => `/images/categories-transparent/${slug}.png?v=2`;
    const localizedProducts = computed(
      () => props.products.data.map((p) => ({
        ...p,
        name: field(p, "name") || p.name
      }))
    );
    const localizedTree = computed(
      () => props.categoryTree.map((cat) => ({
        ...cat,
        name: field(cat, "name") || cat.name,
        children: (cat.children || []).map((sub) => ({
          ...sub,
          name: field(sub, "name") || sub.name
        }))
      }))
    );
    const mobileFiltersOpen = ref(false);
    const expandedId = ref(null);
    function toggleExpand(id) {
      expandedId.value = expandedId.value === id ? null : id;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="flex items-center" style="${ssrRenderStyle({ "background": "#1B3163", "min-height": "160px" })}"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10"${_scopeId}><h1 class="text-3xl sm:text-4xl font-black text-white mb-3"${_scopeId}>${ssrInterpolate(c("prod_page_title", "ÜRÜNLER"))}</h1></div></section><section class="hidden lg:block" style="${ssrRenderStyle({ "background": "#f0f2f5", "padding": "60px 0" })}"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"${_scopeId}><p class="text-sm" style="${ssrRenderStyle({ "color": "#666" })}"${_scopeId}>${ssrInterpolate(c("prod_subtitle", "Endüstriyel mutfak ekipmanlarını kategorilere göre inceleyin."))}</p><div class="w-full sm:w-80 flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-5"${_scopeId}><!--[-->`);
            ssrRenderList(displayCategories.value, (category) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: category.id,
                href: `/urunler/${category.slug}`,
                class: "group cursor-pointer block rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(27,49,99,0.25)]",
                style: { "border": "1px solid #ececec", "outline": "none", "-webkit-tap-highlight-color": "transparent" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="relative overflow-hidden aspect-square"${_scopeId2}><img${ssrRenderAttr("src", getCoverImage(category.slug))}${ssrRenderAttr("alt", category.name)} draggable="false" class="absolute inset-[5%] w-[90%] h-[90%] object-contain outline-none transition-transform duration-500 group-hover:scale-105"${_scopeId2}></div><div class="px-4 py-3" style="${ssrRenderStyle({ "border-top": "1px solid #f0f1f3" })}"${_scopeId2}><h3 class="font-bold text-sm leading-snug truncate" style="${ssrRenderStyle({ "color": "#1B3163" })}"${_scopeId2}>${ssrInterpolate(category.name)}</h3><span class="text-xs font-medium" style="${ssrRenderStyle({ "color": "#8b93a3" })}"${_scopeId2}>${ssrInterpolate(category.total_products_count ?? category.products_count ?? 0)} ${ssrInterpolate(unref(trans)("common.product_unit"))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "relative overflow-hidden aspect-square" }, [
                        createVNode("img", {
                          src: getCoverImage(category.slug),
                          alt: category.name,
                          draggable: "false",
                          onError: ($event) => $event.target.style.display = "none",
                          class: "absolute inset-[5%] w-[90%] h-[90%] object-contain outline-none transition-transform duration-500 group-hover:scale-105"
                        }, null, 40, ["src", "alt", "onError"])
                      ]),
                      createVNode("div", {
                        class: "px-4 py-3",
                        style: { "border-top": "1px solid #f0f1f3" }
                      }, [
                        createVNode("h3", {
                          class: "font-bold text-sm leading-snug truncate",
                          style: { "color": "#1B3163" }
                        }, toDisplayString(category.name), 1),
                        createVNode("span", {
                          class: "text-xs font-medium",
                          style: { "color": "#8b93a3" }
                        }, toDisplayString(category.total_products_count ?? category.products_count ?? 0) + " " + toDisplayString(unref(trans)("common.product_unit")), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div></section><section class="lg:hidden" style="${ssrRenderStyle({ "background": "#f0f2f5", "padding": "60px 0" })}"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8"${_scopeId}><p class="text-sm" style="${ssrRenderStyle({ "color": "#666" })}"${_scopeId}>${ssrInterpolate(c("prod_subtitle", "Endüstriyel mutfak ekipmanlarını kategorilere göre inceleyin."))}</p></div><div class="flex items-center gap-3 mb-6"${_scopeId}><div class="flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`</div><button type="button" class="flex items-center gap-2 bg-[#0E7A8C] hover:bg-[#0B6575] text-white text-sm font-bold px-4 py-2.5 rounded-full transition-colors flex-shrink-0"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M6 12h12M10 20h4"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("products.categories"))}</button></div><div class="bg-white rounded-2xl shadow-sm overflow-hidden mb-6" style="${ssrRenderStyle(mobileFiltersOpen.value ? null : { display: "none" })}"${_scopeId}><div class="bg-[#1B3163] px-5 py-4"${_scopeId}><h3 class="font-bold text-white text-sm tracking-widest uppercase"${_scopeId}>${ssrInterpolate(unref(trans)("products.categories"))}</h3></div><nav class="p-2"${_scopeId}><!--[-->`);
            ssrRenderList(localizedTree.value, (cat) => {
              _push2(`<!--[-->`);
              if (!cat.children.length) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/urunler/${cat.slug}`,
                  class: "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-[#1B3163] hover:bg-gray-50 hover:text-[#0E7A8C] transition-colors"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span${_scopeId2}>${ssrInterpolate(cat.name)}</span>`);
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(cat.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<button type="button" class="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-[#1B3163] hover:bg-gray-50 hover:text-[#0E7A8C] transition-colors"${_scopeId}><span${_scopeId}>${ssrInterpolate(cat.name)}</span><svg class="${ssrRenderClass([expandedId.value === cat.id ? "rotate-90" : "", "w-4 h-4 opacity-60 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg></button>`);
              }
              if (cat.children.length && expandedId.value === cat.id) {
                _push2(`<div class="ml-3 mb-1"${_scopeId}><!--[-->`);
                ssrRenderList(cat.children, (sub) => {
                  _push2(ssrRenderComponent(unref(Link), {
                    key: sub.id,
                    href: `/urunler/${sub.slug}`,
                    class: "flex items-center gap-2 pl-4 pr-3 py-2 rounded-lg text-sm text-[#555] hover:bg-gray-50 hover:text-[#0E7A8C] transition-colors"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(sub.name)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(sub.name), 1)
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
            _push2(`<!--]--></nav></div><p class="text-[#666] text-sm mb-6"${_scopeId}><span class="font-bold text-[#1B3163]"${_scopeId}>${ssrInterpolate(__props.products.total ?? localizedProducts.value.length)}</span> ${ssrInterpolate(unref(trans)("products.product_count"))}</p>`);
            if (localizedProducts.value.length > 0) {
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(localizedProducts.value, (product) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: product.id,
                  href: `/urunler/${product.category_slug}/${product.slug}`,
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
            } else if (localizedProducts.value.length === 0) {
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
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", {
                class: "flex items-center",
                style: { "background": "#1B3163", "min-height": "160px" }
              }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10" }, [
                  createVNode("h1", { class: "text-3xl sm:text-4xl font-black text-white mb-3" }, toDisplayString(c("prod_page_title", "ÜRÜNLER")), 1)
                ])
              ]),
              createVNode("section", {
                class: "hidden lg:block",
                style: { "background": "#f0f2f5", "padding": "60px 0" }
              }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10" }, [
                    createVNode("p", {
                      class: "text-sm",
                      style: { "color": "#666" }
                    }, toDisplayString(c("prod_subtitle", "Endüstriyel mutfak ekipmanlarını kategorilere göre inceleyin.")), 1),
                    createVNode("div", { class: "w-full sm:w-80 flex-shrink-0" }, [
                      createVNode(_sfc_main$2)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-5" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(displayCategories.value, (category) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: category.id,
                        href: `/urunler/${category.slug}`,
                        class: "group cursor-pointer block rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(27,49,99,0.25)]",
                        style: { "border": "1px solid #ececec", "outline": "none", "-webkit-tap-highlight-color": "transparent" }
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "relative overflow-hidden aspect-square" }, [
                            createVNode("img", {
                              src: getCoverImage(category.slug),
                              alt: category.name,
                              draggable: "false",
                              onError: ($event) => $event.target.style.display = "none",
                              class: "absolute inset-[5%] w-[90%] h-[90%] object-contain outline-none transition-transform duration-500 group-hover:scale-105"
                            }, null, 40, ["src", "alt", "onError"])
                          ]),
                          createVNode("div", {
                            class: "px-4 py-3",
                            style: { "border-top": "1px solid #f0f1f3" }
                          }, [
                            createVNode("h3", {
                              class: "font-bold text-sm leading-snug truncate",
                              style: { "color": "#1B3163" }
                            }, toDisplayString(category.name), 1),
                            createVNode("span", {
                              class: "text-xs font-medium",
                              style: { "color": "#8b93a3" }
                            }, toDisplayString(category.total_products_count ?? category.products_count ?? 0) + " " + toDisplayString(unref(trans)("common.product_unit")), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", {
                class: "lg:hidden",
                style: { "background": "#f0f2f5", "padding": "60px 0" }
              }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-8" }, [
                    createVNode("p", {
                      class: "text-sm",
                      style: { "color": "#666" }
                    }, toDisplayString(c("prod_subtitle", "Endüstriyel mutfak ekipmanlarını kategorilere göre inceleyin.")), 1)
                  ]),
                  createVNode("div", { class: "flex items-center gap-3 mb-6" }, [
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
                  withDirectives(createVNode("div", { class: "bg-white rounded-2xl shadow-sm overflow-hidden mb-6" }, [
                    createVNode("div", { class: "bg-[#1B3163] px-5 py-4" }, [
                      createVNode("h3", { class: "font-bold text-white text-sm tracking-widest uppercase" }, toDisplayString(unref(trans)("products.categories")), 1)
                    ]),
                    createVNode("nav", { class: "p-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(localizedTree.value, (cat) => {
                        return openBlock(), createBlock(Fragment, {
                          key: cat.id
                        }, [
                          !cat.children.length ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            href: `/urunler/${cat.slug}`,
                            class: "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-[#1B3163] hover:bg-gray-50 hover:text-[#0E7A8C] transition-colors"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, toDisplayString(cat.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])) : (openBlock(), createBlock("button", {
                            key: 1,
                            type: "button",
                            onClick: ($event) => toggleExpand(cat.id),
                            class: "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-[#1B3163] hover:bg-gray-50 hover:text-[#0E7A8C] transition-colors"
                          }, [
                            createVNode("span", null, toDisplayString(cat.name), 1),
                            (openBlock(), createBlock("svg", {
                              class: ["w-4 h-4 opacity-60 transition-transform duration-200", expandedId.value === cat.id ? "rotate-90" : ""],
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
                          ], 8, ["onClick"])),
                          cat.children.length && expandedId.value === cat.id ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "ml-3 mb-1"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(cat.children, (sub) => {
                              return openBlock(), createBlock(unref(Link), {
                                key: sub.id,
                                href: `/urunler/${sub.slug}`,
                                class: "flex items-center gap-2 pl-4 pr-3 py-2 rounded-lg text-sm text-[#555] hover:bg-gray-50 hover:text-[#0E7A8C] transition-colors"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(sub.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ])
                  ], 512), [
                    [vShow, mobileFiltersOpen.value]
                  ]),
                  createVNode("p", { class: "text-[#666] text-sm mb-6" }, [
                    createVNode("span", { class: "font-bold text-[#1B3163]" }, toDisplayString(__props.products.total ?? localizedProducts.value.length), 1),
                    createTextVNode(" " + toDisplayString(unref(trans)("products.product_count")), 1)
                  ]),
                  localizedProducts.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-1 sm:grid-cols-2 gap-6"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(localizedProducts.value, (product) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: product.id,
                        href: `/urunler/${product.category_slug}/${product.slug}`,
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
                  ])) : localizedProducts.value.length === 0 ? (openBlock(), createBlock("div", {
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
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
