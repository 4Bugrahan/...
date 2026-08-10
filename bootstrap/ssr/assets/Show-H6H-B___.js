import { computed, ref, withCtx, unref, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { u as useLocale } from "./useLocale-14nRWKiE.js";
import { _ as _sfc_main$1 } from "./AppLayout-XWfXFB7r.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    project: { type: Object, required: true },
    otherProjects: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const { trans, field } = useLocale();
    const st = computed(() => usePage().props.siteSettings || {});
    const phone1Tel = computed(() => st.value.phone1 ? st.value.phone1.replace(/\s/g, "") : "+903462250000");
    const whatsappLink = computed(() => `https://wa.me/${st.value.whatsapp || "905356600060"}`);
    const images = props.project.image_urls && props.project.image_urls.length > 0 ? props.project.image_urls : [];
    const activeImage = ref(0);
    const localizedProject = computed(() => ({
      ...props.project,
      title: field(props.project, "title") || props.project.title,
      description: field(props.project, "description") || props.project.description,
      location: field(props.project, "location") || props.project.location
    }));
    const localizedOthers = computed(
      () => props.otherProjects.map((p) => ({ ...p, title: field(p, "title") || p.title }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-white py-6 border-b border-gray-100"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/projeler",
              class: "flex items-center gap-1.5 w-fit text-[#666] hover:text-[#0E7A8C] text-sm font-semibold transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId2}></path></svg> ${ssrInterpolate(unref(trans)("common.back"))}`);
                } else {
                  return [
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
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" " + toDisplayString(unref(trans)("common.back")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section><section class="py-12 bg-white"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="grid lg:grid-cols-2 gap-12"${_scopeId}><div${_scopeId}><div class="relative bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3] mb-4 border border-gray-100"${_scopeId}>`);
            if (unref(images).length > 0) {
              _push2(`<img${ssrRenderAttr("src", unref(images)[activeImage.value])}${ssrRenderAttr("alt", `${localizedProject.value.title} - ${activeImage.value + 1}`)} class="w-full h-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<div class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"${_scopeId}><svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId}></path></svg><p class="text-gray-500 text-sm mt-3"${_scopeId}>${ssrInterpolate(unref(trans)("projects.no_image"))}</p></div>`);
            }
            _push2(`</div>`);
            if (unref(images).length > 1) {
              _push2(`<div class="flex gap-3 flex-wrap"${_scopeId}><!--[-->`);
              ssrRenderList(unref(images), (img, idx) => {
                _push2(`<button class="${ssrRenderClass(["w-20 h-20 rounded-xl overflow-hidden border-2 transition-all", activeImage.value === idx ? "border-[#0E7A8C] shadow-md" : "border-gray-200 hover:border-[#0E7A8C]/50"])}"${_scopeId}><img${ssrRenderAttr("src", img)}${ssrRenderAttr("alt", `${localizedProject.value.title} - ${idx + 1}`)} loading="lazy" class="w-full h-full object-cover"${_scopeId}></button>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}>`);
            if (localizedProject.value.location) {
              _push2(`<span class="inline-flex items-center gap-1.5 w-fit text-xs sm:text-sm font-bold text-white bg-[#0E7A8C] px-4 py-2 rounded-full shadow-sm mb-4"${_scopeId}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg> ${ssrInterpolate(localizedProject.value.location)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B3163] mb-6 leading-tight"${_scopeId}>${ssrInterpolate(localizedProject.value.title)}</h1>`);
            if (localizedProject.value.description) {
              _push2(`<div class="prose prose-gray max-w-none mb-8"${_scopeId}><p class="text-[#666] leading-relaxed text-base whitespace-pre-line"${_scopeId}>${ssrInterpolate(localizedProject.value.description)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-gray-50 rounded-2xl p-6 space-y-4"${_scopeId}><h3 class="font-bold text-[#1B3163] text-lg"${_scopeId}>${ssrInterpolate(unref(trans)("projects.cta_h"))}</h3><p class="text-[#666] text-sm"${_scopeId}>${ssrInterpolate(unref(trans)("projects.cta_p"))}</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"${_scopeId}><a${ssrRenderAttr("href", `tel:${phone1Tel.value}`)} class="flex items-center justify-center gap-2 bg-[#1B3163] hover:bg-[#0E7A8C] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("products.call"))}</a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/iletisim",
              class: "flex items-center justify-center gap-2 bg-[#0E7A8C] hover:bg-[#0B6575] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId2}></path></svg> ${ssrInterpolate(unref(trans)("products.send_msg"))}`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      })
                    ])),
                    createTextVNode(" " + toDisplayString(unref(trans)("products.send_msg")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><a${ssrRenderAttr("href", whatsappLink.value)} target="_blank" class="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm w-full"${_scopeId}><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("products.whatsapp"))}</a></div></div></div></div></section>`);
            if (localizedOthers.value.length > 0) {
              _push2(`<section class="py-16 bg-gray-50"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><h2 class="text-2xl sm:text-3xl font-black text-[#1B3163] mb-8"${_scopeId}>${ssrInterpolate(unref(trans)("projects.other_projects"))}</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(localizedOthers.value, (other) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: other.id,
                  href: `/projeler/${other.slug}`,
                  class: "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="relative h-52 bg-[#1B3163] overflow-hidden"${_scopeId2}>`);
                      if (other.image_urls && other.image_urls[0]) {
                        _push3(`<img${ssrRenderAttr("src", other.image_urls[0])}${ssrRenderAttr("alt", other.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"${_scopeId2}>`);
                      } else {
                        _push3(`<div class="absolute inset-0 flex items-center justify-center" style="${ssrRenderStyle({ "background": "linear-gradient(135deg,#0e1e3d 0%,#1B3163 60%,#1e3a72 100%)" })}"${_scopeId2}><svg class="w-12 h-12 text-[#3DAFC4]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId2}></path></svg></div>`);
                      }
                      _push3(`</div><div class="p-5"${_scopeId2}><h3 class="font-extrabold text-[#0e1e3d] text-base group-hover:text-[#0E7A8C] transition-colors"${_scopeId2}>${ssrInterpolate(other.title)}</h3></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "relative h-52 bg-[#1B3163] overflow-hidden" }, [
                          other.image_urls && other.image_urls[0] ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: other.image_urls[0],
                            alt: other.title,
                            class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "absolute inset-0 flex items-center justify-center",
                            style: { "background": "linear-gradient(135deg,#0e1e3d 0%,#1B3163 60%,#1e3a72 100%)" }
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-12 h-12 text-[#3DAFC4]/30",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1",
                                d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              })
                            ]))
                          ]))
                        ]),
                        createVNode("div", { class: "p-5" }, [
                          createVNode("h3", { class: "font-extrabold text-[#0e1e3d] text-base group-hover:text-[#0E7A8C] transition-colors" }, toDisplayString(other.title), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("section", { class: "bg-white py-6 border-b border-gray-100" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode(unref(Link), {
                    href: "/projeler",
                    class: "flex items-center gap-1.5 w-fit text-[#666] hover:text-[#0E7A8C] text-sm font-semibold transition-colors"
                  }, {
                    default: withCtx(() => [
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
                          d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                        })
                      ])),
                      createTextVNode(" " + toDisplayString(unref(trans)("common.back")), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("section", { class: "py-12 bg-white" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-12" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "relative bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3] mb-4 border border-gray-100" }, [
                        unref(images).length > 0 ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: unref(images)[activeImage.value],
                          alt: `${localizedProject.value.title} - ${activeImage.value + 1}`,
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
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
                              d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            })
                          ])),
                          createVNode("p", { class: "text-gray-500 text-sm mt-3" }, toDisplayString(unref(trans)("projects.no_image")), 1)
                        ]))
                      ]),
                      unref(images).length > 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex gap-3 flex-wrap"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(images), (img, idx) => {
                          return openBlock(), createBlock("button", {
                            key: idx,
                            onClick: ($event) => activeImage.value = idx,
                            class: ["w-20 h-20 rounded-xl overflow-hidden border-2 transition-all", activeImage.value === idx ? "border-[#0E7A8C] shadow-md" : "border-gray-200 hover:border-[#0E7A8C]/50"]
                          }, [
                            createVNode("img", {
                              src: img,
                              alt: `${localizedProject.value.title} - ${idx + 1}`,
                              loading: "lazy",
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src", "alt"])
                          ], 10, ["onClick"]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      localizedProject.value.location ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "inline-flex items-center gap-1.5 w-fit text-xs sm:text-sm font-bold text-white bg-[#0E7A8C] px-4 py-2 rounded-full shadow-sm mb-4"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-3.5 h-3.5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          }),
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          })
                        ])),
                        createTextVNode(" " + toDisplayString(localizedProject.value.location), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("h1", { class: "text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B3163] mb-6 leading-tight" }, toDisplayString(localizedProject.value.title), 1),
                      localizedProject.value.description ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "prose prose-gray max-w-none mb-8"
                      }, [
                        createVNode("p", { class: "text-[#666] leading-relaxed text-base whitespace-pre-line" }, toDisplayString(localizedProject.value.description), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "bg-gray-50 rounded-2xl p-6 space-y-4" }, [
                        createVNode("h3", { class: "font-bold text-[#1B3163] text-lg" }, toDisplayString(unref(trans)("projects.cta_h")), 1),
                        createVNode("p", { class: "text-[#666] text-sm" }, toDisplayString(unref(trans)("projects.cta_p")), 1),
                        createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, [
                          createVNode("a", {
                            href: `tel:${phone1Tel.value}`,
                            class: "flex items-center justify-center gap-2 bg-[#1B3163] hover:bg-[#0E7A8C] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              })
                            ])),
                            createTextVNode(" " + toDisplayString(unref(trans)("products.call")), 1)
                          ], 8, ["href"]),
                          createVNode(unref(Link), {
                            href: "/iletisim",
                            class: "flex items-center justify-center gap-2 bg-[#0E7A8C] hover:bg-[#0B6575] text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                })
                              ])),
                              createTextVNode(" " + toDisplayString(unref(trans)("products.send_msg")), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("a", {
                          href: whatsappLink.value,
                          target: "_blank",
                          class: "flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-sm w-full"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5",
                            fill: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" })
                          ])),
                          createTextVNode(" " + toDisplayString(unref(trans)("products.whatsapp")), 1)
                        ], 8, ["href"])
                      ])
                    ])
                  ])
                ])
              ]),
              localizedOthers.value.length > 0 ? (openBlock(), createBlock("section", {
                key: 0,
                class: "py-16 bg-gray-50"
              }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("h2", { class: "text-2xl sm:text-3xl font-black text-[#1B3163] mb-8" }, toDisplayString(unref(trans)("projects.other_projects")), 1),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(localizedOthers.value, (other) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: other.id,
                        href: `/projeler/${other.slug}`,
                        class: "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "relative h-52 bg-[#1B3163] overflow-hidden" }, [
                            other.image_urls && other.image_urls[0] ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: other.image_urls[0],
                              alt: other.title,
                              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "absolute inset-0 flex items-center justify-center",
                              style: { "background": "linear-gradient(135deg,#0e1e3d 0%,#1B3163 60%,#1e3a72 100%)" }
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-12 h-12 text-[#3DAFC4]/30",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "1",
                                  d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                })
                              ]))
                            ]))
                          ]),
                          createVNode("div", { class: "p-5" }, [
                            createVNode("h3", { class: "font-extrabold text-[#0e1e3d] text-base group-hover:text-[#0E7A8C] transition-colors" }, toDisplayString(other.title), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
