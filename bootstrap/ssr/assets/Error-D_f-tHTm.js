import { computed, unref, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { u as useLocale } from "./useLocale-14nRWKiE.js";
const _sfc_main = {
  __name: "Error",
  __ssrInlineRender: true,
  props: {
    status: { type: Number, default: 404 }
  },
  setup(__props) {
    const props = __props;
    const { trans } = useLocale();
    const titleKeys = {
      403: "error.title_403",
      404: "error.title_404",
      500: "error.title_500",
      503: "error.title_503"
    };
    const descKeys = {
      403: "error.desc_403",
      404: "error.desc_404",
      500: "error.desc_500",
      503: "error.desc_503"
    };
    const title = computed(() => trans(titleKeys[props.status] || "error.title_generic"));
    const description = computed(() => trans(descKeys[props.status] || "error.desc_generic"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${__props.status} - ${title.value}`
      }, null, _parent));
      _push(`<div class="min-h-screen bg-gradient-to-br from-[#0B1A35] via-[#1B3163] to-[#0B1A35] flex items-center justify-center px-6"><div class="text-center max-w-lg">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "inline-block mb-10"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/images/logo-light.png" alt="4B Grup" class="h-14 mx-auto"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: "/images/logo-light.png",
                alt: "4B Grup",
                class: "h-14 mx-auto"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative mb-6"><span class="text-[140px] md:text-[180px] font-black text-white/5 leading-none select-none">${ssrInterpolate(__props.status)}</span><span class="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl font-black text-[#3DAFC4]">${ssrInterpolate(__props.status)}</span></div><h1 class="text-2xl md:text-3xl font-bold text-white mb-4">${ssrInterpolate(title.value)}</h1><p class="text-gray-400 text-lg mb-10 leading-relaxed">${ssrInterpolate(description.value)}</p><div class="flex flex-col sm:flex-row items-center justify-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "inline-flex items-center gap-2 bg-[#0E7A8C] hover:bg-[#0B6575] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#3DAFC4]/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("common.home"))}`);
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
                  d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
                })
              ])),
              createTextVNode(" " + toDisplayString(unref(trans)("common.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/iletisim",
        class: "inline-flex items-center gap-2 border-2 border-white/20 hover:border-[#3DAFC4] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.contact"))}`);
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
              createTextVNode(" " + toDisplayString(unref(trans)("nav.contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
