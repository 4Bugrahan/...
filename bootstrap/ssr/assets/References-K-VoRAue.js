import { computed, withCtx, unref, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-CAQypwC2.js";
import { u as useLocale } from "./useLocale-14nRWKiE.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "References",
  __ssrInlineRender: true,
  props: {
    partners: { type: Array, default: () => [] },
    clients: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const { field, trans } = useLocale();
    const displayPartners = computed(
      () => props.partners.map((p) => ({ ...p, name: field(p, "name") || p.name }))
    );
    const displayClients = computed(
      () => props.clients.map((c) => ({ ...c, name: field(c, "name") || c.name }))
    );
    function getInitials(name) {
      return name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-gradient-to-br from-[#1B3163] to-[#1B3163] py-20"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="max-w-3xl"${_scopeId}><h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"${_scopeId}>${ssrInterpolate(unref(trans)("references.title"))}</h1><p class="text-white/70 text-lg leading-relaxed"${_scopeId}>${ssrInterpolate(unref(trans)("references.hero_desc"))}</p></div></div></section><section class="bg-white py-20"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-12"${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3"${_scopeId}>${ssrInterpolate(unref(trans)("references.partners_label"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#0e1e3d]"${_scopeId}>${ssrInterpolate(unref(trans)("references.partners_heading"))}</h2></div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(displayPartners.value, (partner) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(partner.website ? "a" : "div"), {
                key: partner.id,
                href: partner.website || void 0,
                target: partner.website ? "_blank" : void 0,
                rel: partner.website ? "noopener noreferrer" : void 0,
                class: "flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-6 h-32 hover:border-[#0E7A8C]/60 hover:shadow-md transition-all duration-300 cursor-default"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (partner.logo_url) {
                      _push3(`<img${ssrRenderAttr("src", partner.logo_url)}${ssrRenderAttr("alt", partner.name)} loading="lazy" class="w-full h-14 object-contain opacity-70 hover:opacity-100 transition-all duration-300"${_scopeId2}>`);
                    } else {
                      _push3(`<div class="text-center"${_scopeId2}><div class="w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5"${_scopeId2}>${ssrInterpolate(getInitials(partner.name))}</div><span class="text-xs font-semibold text-[#1B3163]/60 leading-tight block"${_scopeId2}>${ssrInterpolate(partner.name)}</span></div>`);
                    }
                  } else {
                    return [
                      partner.logo_url ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: partner.logo_url,
                        alt: partner.name,
                        loading: "lazy",
                        class: "w-full h-14 object-contain opacity-70 hover:opacity-100 transition-all duration-300"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center"
                      }, [
                        createVNode("div", { class: "w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5" }, toDisplayString(getInitials(partner.name)), 1),
                        createVNode("span", { class: "text-xs font-semibold text-[#1B3163]/60 leading-tight block" }, toDisplayString(partner.name), 1)
                      ]))
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
            });
            _push2(`<!--]--></div></div></section><section class="bg-[#f4f5f6] py-20"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-12"${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3"${_scopeId}>${ssrInterpolate(unref(trans)("references.clients_label"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#0e1e3d]"${_scopeId}>${ssrInterpolate(unref(trans)("references.clients_heading"))}</h2></div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(displayClients.value, (client) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(client.website ? "a" : "div"), {
                key: client.id,
                href: client.website || void 0,
                target: client.website ? "_blank" : void 0,
                rel: client.website ? "noopener noreferrer" : void 0,
                class: "flex items-center justify-center bg-white border border-gray-200 rounded-xl p-6 h-44 hover:border-[#0E7A8C]/60 hover:shadow-md transition-all duration-300 cursor-default"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (client.logo_url) {
                      _push3(`<img${ssrRenderAttr("src", client.logo_url)}${ssrRenderAttr("alt", client.name)} loading="lazy" class="w-full h-32 object-contain transition-all duration-300"${_scopeId2}>`);
                    } else {
                      _push3(`<div class="text-center"${_scopeId2}><div class="w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5"${_scopeId2}>${ssrInterpolate(getInitials(client.name))}</div><span class="text-xs font-semibold text-[#1B3163]/60 leading-tight block"${_scopeId2}>${ssrInterpolate(client.name)}</span></div>`);
                    }
                  } else {
                    return [
                      client.logo_url ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: client.logo_url,
                        alt: client.name,
                        loading: "lazy",
                        class: "w-full h-32 object-contain transition-all duration-300"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center"
                      }, [
                        createVNode("div", { class: "w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5" }, toDisplayString(getInitials(client.name)), 1),
                        createVNode("span", { class: "text-xs font-semibold text-[#1B3163]/60 leading-tight block" }, toDisplayString(client.name), 1)
                      ]))
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
            });
            _push2(`<!--]--></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "bg-gradient-to-br from-[#1B3163] to-[#1B3163] py-20" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "max-w-3xl" }, [
                    createVNode("h1", { class: "text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" }, toDisplayString(unref(trans)("references.title")), 1),
                    createVNode("p", { class: "text-white/70 text-lg leading-relaxed" }, toDisplayString(unref(trans)("references.hero_desc")), 1)
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-white py-20" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-12" }, [
                    createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("references.partners_label")), 1),
                    createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#0e1e3d]" }, toDisplayString(unref(trans)("references.partners_heading")), 1)
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(displayPartners.value, (partner) => {
                      return openBlock(), createBlock(resolveDynamicComponent(partner.website ? "a" : "div"), {
                        key: partner.id,
                        href: partner.website || void 0,
                        target: partner.website ? "_blank" : void 0,
                        rel: partner.website ? "noopener noreferrer" : void 0,
                        class: "flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl p-6 h-32 hover:border-[#0E7A8C]/60 hover:shadow-md transition-all duration-300 cursor-default"
                      }, {
                        default: withCtx(() => [
                          partner.logo_url ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: partner.logo_url,
                            alt: partner.name,
                            loading: "lazy",
                            class: "w-full h-14 object-contain opacity-70 hover:opacity-100 transition-all duration-300"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center"
                          }, [
                            createVNode("div", { class: "w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5" }, toDisplayString(getInitials(partner.name)), 1),
                            createVNode("span", { class: "text-xs font-semibold text-[#1B3163]/60 leading-tight block" }, toDisplayString(partner.name), 1)
                          ]))
                        ]),
                        _: 2
                      }, 1032, ["href", "target", "rel"]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-[#f4f5f6] py-20" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-12" }, [
                    createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("references.clients_label")), 1),
                    createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#0e1e3d]" }, toDisplayString(unref(trans)("references.clients_heading")), 1)
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(displayClients.value, (client) => {
                      return openBlock(), createBlock(resolveDynamicComponent(client.website ? "a" : "div"), {
                        key: client.id,
                        href: client.website || void 0,
                        target: client.website ? "_blank" : void 0,
                        rel: client.website ? "noopener noreferrer" : void 0,
                        class: "flex items-center justify-center bg-white border border-gray-200 rounded-xl p-6 h-44 hover:border-[#0E7A8C]/60 hover:shadow-md transition-all duration-300 cursor-default"
                      }, {
                        default: withCtx(() => [
                          client.logo_url ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: client.logo_url,
                            alt: client.name,
                            loading: "lazy",
                            class: "w-full h-32 object-contain transition-all duration-300"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center"
                          }, [
                            createVNode("div", { class: "w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5" }, toDisplayString(getInitials(client.name)), 1),
                            createVNode("span", { class: "text-xs font-semibold text-[#1B3163]/60 leading-tight block" }, toDisplayString(client.name), 1)
                          ]))
                        ]),
                        _: 2
                      }, 1032, ["href", "target", "rel"]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Pages/References.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
