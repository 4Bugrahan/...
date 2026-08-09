import { ref, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-CAQypwC2.js";
import { u as useLocale } from "./useLocale-14nRWKiE.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Production",
  __ssrInlineRender: true,
  setup(__props) {
    const { trans } = useLocale();
    const laserMedia = ref({ image: null, video: "/videos/production/laser-cutting.mp4" });
    const bendMedia = ref({ image: null, video: "/videos/production/bending-machine.mp4" });
    const productionCards = [
      { key: 1, titleKey: "production.card1_title", descKey: "production.card1_desc", image: "/images/production/card1-design.jpg", icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" },
      { key: 2, titleKey: "production.card2_title", descKey: "production.card2_desc", image: "/images/production/card2-manufacturing.jpg", icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" },
      { key: 3, titleKey: "production.card3_title", descKey: "production.card3_desc", image: "/images/production/card3-final.jpg", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" }
    ];
    const gallerySlides = ref([
      { image: "/images/production/gallery-1.jpg" },
      { image: "/images/production/gallery-2.jpg" },
      { image: "/images/production/gallery-3.jpg" },
      { image: "/images/production/gallery-4.jpg" },
      { image: "/images/production/gallery-5.jpg" },
      { image: "/images/production/gallery-6.jpg" },
      { image: "/images/production/gallery-7.jpg" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-white py-20" data-v-49f14da3${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-49f14da3${_scopeId}><div class="max-w-3xl mb-12" data-v-49f14da3${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.hero_eyebrow"))}</p><h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B3163] mb-6 leading-tight" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.hero_title"))}</h1><p class="text-[#666] text-lg leading-relaxed" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.hero_desc"))}</p></div><div class="relative w-full aspect-[16/8] rounded-2xl overflow-hidden border border-gray-100" data-v-49f14da3${_scopeId}>`);
            if (laserMedia.value.video) {
              _push2(`<video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline data-v-49f14da3${_scopeId}><source${ssrRenderAttr("src", laserMedia.value.video)} type="video/mp4" data-v-49f14da3${_scopeId}></video>`);
            } else if (laserMedia.value.image) {
              _push2(`<img${ssrRenderAttr("src", laserMedia.value.image)}${ssrRenderAttr("alt", unref(trans)("production.laser_title"))} class="absolute inset-0 w-full h-full object-cover" data-v-49f14da3${_scopeId}>`);
            } else {
              _push2(`<div class="absolute inset-0 bg-gradient-to-br from-[#1B3163]/5 to-[#0E7A8C]/10" data-v-49f14da3${_scopeId}><div class="absolute inset-0 flex flex-col items-center justify-center gap-4" data-v-49f14da3${_scopeId}><div class="w-20 h-20 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm" data-v-49f14da3${_scopeId}><svg class="w-10 h-10 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-49f14da3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" data-v-49f14da3${_scopeId}></path></svg></div><p class="text-[#1B3163]/60 font-semibold text-sm tracking-wide" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.laser_label"))}</p></div></div>`);
            }
            _push2(`</div></div></section><section class="bg-white py-20 border-t border-gray-100" data-v-49f14da3${_scopeId}><div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-v-49f14da3${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.section1_label"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#1B3163] mb-6" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.section1_title"))}</h2><p class="text-[#666] text-lg leading-relaxed" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.section1_text"))}</p></div></section><section class="bg-white py-20 border-t border-gray-100" data-v-49f14da3${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-49f14da3${_scopeId}><div class="mb-12 text-center" data-v-49f14da3${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.cards_label"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#1B3163]" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.cards_title"))}</h2></div><div class="grid sm:grid-cols-3 gap-6" data-v-49f14da3${_scopeId}><!--[-->`);
            ssrRenderList(productionCards, (card) => {
              _push2(`<div class="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#3DAFC4]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-v-49f14da3${_scopeId}><div class="relative aspect-[4/3]" data-v-49f14da3${_scopeId}>`);
              if (card.image) {
                _push2(`<img${ssrRenderAttr("src", card.image)}${ssrRenderAttr("alt", unref(trans)(card.titleKey))} class="absolute inset-0 w-full h-full object-cover" data-v-49f14da3${_scopeId}>`);
              } else {
                _push2(`<div class="absolute inset-0 bg-gradient-to-br from-[#1B3163]/5 to-[#0E7A8C]/10 flex items-center justify-center" data-v-49f14da3${_scopeId}><div class="w-14 h-14 bg-[#0E7A8C]/10 group-hover:bg-[#0E7A8C] rounded-2xl flex items-center justify-center transition-colors duration-300" data-v-49f14da3${_scopeId}><svg class="w-7 h-7 text-[#0E7A8C] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-49f14da3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", card.icon)} data-v-49f14da3${_scopeId}></path></svg></div></div>`);
              }
              _push2(`<span class="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#1B3163] text-white text-sm font-bold flex items-center justify-center" data-v-49f14da3${_scopeId}>${ssrInterpolate(card.key)}</span></div><div class="p-6" data-v-49f14da3${_scopeId}><h3 class="text-lg font-black text-[#1B3163] mb-2" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)(card.titleKey))}</h3><p class="text-sm text-[#666] leading-relaxed" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)(card.descKey))}</p></div></div>`);
            });
            _push2(`<!--]--></div></div></section><section class="bg-white py-20 border-t border-gray-100" data-v-49f14da3${_scopeId}><div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-v-49f14da3${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.section2_label"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#1B3163] mb-6" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.section2_title"))}</h2><p class="text-[#666] text-lg leading-relaxed" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.section2_text"))}</p></div></section><section class="bg-white py-20 border-t border-gray-100" data-v-49f14da3${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-49f14da3${_scopeId}><div class="mb-10" data-v-49f14da3${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.bend_label"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#1B3163]" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.bend_title"))}</h2></div><div class="relative w-full aspect-[16/8] rounded-2xl overflow-hidden border border-gray-100" data-v-49f14da3${_scopeId}>`);
            if (bendMedia.value.video) {
              _push2(`<video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline data-v-49f14da3${_scopeId}><source${ssrRenderAttr("src", bendMedia.value.video)} type="video/mp4" data-v-49f14da3${_scopeId}></video>`);
            } else if (bendMedia.value.image) {
              _push2(`<img${ssrRenderAttr("src", bendMedia.value.image)}${ssrRenderAttr("alt", unref(trans)("production.bend_title"))} class="absolute inset-0 w-full h-full object-cover" data-v-49f14da3${_scopeId}>`);
            } else {
              _push2(`<div class="absolute inset-0 bg-gradient-to-br from-[#1B3163]/5 to-[#0E7A8C]/10" data-v-49f14da3${_scopeId}><div class="absolute inset-0 flex flex-col items-center justify-center gap-4" data-v-49f14da3${_scopeId}><div class="w-20 h-20 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm" data-v-49f14da3${_scopeId}><svg class="w-10 h-10 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-49f14da3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" data-v-49f14da3${_scopeId}></path></svg></div><p class="text-[#1B3163]/60 font-semibold text-sm tracking-wide" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.bend_label"))}</p></div></div>`);
            }
            _push2(`</div></div></section><section class="bg-white py-20 border-t border-gray-100" data-v-49f14da3${_scopeId}><div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-v-49f14da3${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.section3_label"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#1B3163] mb-6" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.section3_title"))}</h2><p class="text-[#666] text-lg leading-relaxed" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.section3_text"))}</p></div></section><section class="bg-white py-20 border-t border-gray-100 overflow-hidden" data-v-49f14da3${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10" data-v-49f14da3${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.gallery_label"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#1B3163]" data-v-49f14da3${_scopeId}>${ssrInterpolate(unref(trans)("production.gallery_title"))}</h2></div><div class="relative" data-v-49f14da3${_scopeId}><div class="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10" style="${ssrRenderStyle({ "background": "linear-gradient(to right, #ffffff, transparent)" })}" data-v-49f14da3${_scopeId}></div><div class="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10" style="${ssrRenderStyle({ "background": "linear-gradient(to left, #ffffff, transparent)" })}" data-v-49f14da3${_scopeId}></div><div class="marquee-container group/marquee" data-v-49f14da3${_scopeId}><div class="marquee-track flex gap-4" data-v-49f14da3${_scopeId}><!--[-->`);
            ssrRenderList(2, (n) => {
              _push2(`<!--[--><!--[-->`);
              ssrRenderList(gallerySlides.value, (slide, i) => {
                _push2(`<div class="flex-shrink-0 w-72 sm:w-80 aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 relative" data-v-49f14da3${_scopeId}>`);
                if (slide.image) {
                  _push2(`<img${ssrRenderAttr("src", slide.image)}${ssrRenderAttr("alt", `${unref(trans)("production.gallery_title")} ${i + 1}`)} class="absolute inset-0 w-full h-full object-cover" data-v-49f14da3${_scopeId}>`);
                } else {
                  _push2(`<div class="absolute inset-0 bg-gradient-to-br from-[#f4f5f6] to-gray-100 flex items-center justify-center" data-v-49f14da3${_scopeId}><svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-49f14da3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" data-v-49f14da3${_scopeId}></path></svg></div>`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--><!--]-->`);
            });
            _push2(`<!--]--></div></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "bg-white py-20" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "max-w-3xl mb-12" }, [
                    createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("production.hero_eyebrow")), 1),
                    createVNode("h1", { class: "text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B3163] mb-6 leading-tight" }, toDisplayString(unref(trans)("production.hero_title")), 1),
                    createVNode("p", { class: "text-[#666] text-lg leading-relaxed" }, toDisplayString(unref(trans)("production.hero_desc")), 1)
                  ]),
                  createVNode("div", { class: "relative w-full aspect-[16/8] rounded-2xl overflow-hidden border border-gray-100" }, [
                    laserMedia.value.video ? (openBlock(), createBlock("video", {
                      key: 0,
                      class: "absolute inset-0 w-full h-full object-cover",
                      autoplay: "",
                      muted: "",
                      loop: "",
                      playsinline: ""
                    }, [
                      createVNode("source", {
                        src: laserMedia.value.video,
                        type: "video/mp4"
                      }, null, 8, ["src"])
                    ])) : laserMedia.value.image ? (openBlock(), createBlock("img", {
                      key: 1,
                      src: laserMedia.value.image,
                      alt: unref(trans)("production.laser_title"),
                      class: "absolute inset-0 w-full h-full object-cover"
                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "absolute inset-0 bg-gradient-to-br from-[#1B3163]/5 to-[#0E7A8C]/10"
                    }, [
                      createVNode("div", { class: "absolute inset-0 flex flex-col items-center justify-center gap-4" }, [
                        createVNode("div", { class: "w-20 h-20 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-10 h-10 text-[#0E7A8C]",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.5",
                              d: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                            })
                          ]))
                        ]),
                        createVNode("p", { class: "text-[#1B3163]/60 font-semibold text-sm tracking-wide" }, toDisplayString(unref(trans)("production.laser_label")), 1)
                      ])
                    ]))
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-white py-20 border-t border-gray-100" }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [
                  createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("production.section1_label")), 1),
                  createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#1B3163] mb-6" }, toDisplayString(unref(trans)("production.section1_title")), 1),
                  createVNode("p", { class: "text-[#666] text-lg leading-relaxed" }, toDisplayString(unref(trans)("production.section1_text")), 1)
                ])
              ]),
              createVNode("section", { class: "bg-white py-20 border-t border-gray-100" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-12 text-center" }, [
                    createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("production.cards_label")), 1),
                    createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#1B3163]" }, toDisplayString(unref(trans)("production.cards_title")), 1)
                  ]),
                  createVNode("div", { class: "grid sm:grid-cols-3 gap-6" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(productionCards, (card) => {
                      return createVNode("div", {
                        key: card.key,
                        class: "group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#3DAFC4]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      }, [
                        createVNode("div", { class: "relative aspect-[4/3]" }, [
                          card.image ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: card.image,
                            alt: unref(trans)(card.titleKey),
                            class: "absolute inset-0 w-full h-full object-cover"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "absolute inset-0 bg-gradient-to-br from-[#1B3163]/5 to-[#0E7A8C]/10 flex items-center justify-center"
                          }, [
                            createVNode("div", { class: "w-14 h-14 bg-[#0E7A8C]/10 group-hover:bg-[#0E7A8C] rounded-2xl flex items-center justify-center transition-colors duration-300" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-7 h-7 text-[#0E7A8C] group-hover:text-white transition-colors duration-300",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "1.5",
                                  d: card.icon
                                }, null, 8, ["d"])
                              ]))
                            ])
                          ])),
                          createVNode("span", { class: "absolute top-4 left-4 w-8 h-8 rounded-full bg-[#1B3163] text-white text-sm font-bold flex items-center justify-center" }, toDisplayString(card.key), 1)
                        ]),
                        createVNode("div", { class: "p-6" }, [
                          createVNode("h3", { class: "text-lg font-black text-[#1B3163] mb-2" }, toDisplayString(unref(trans)(card.titleKey)), 1),
                          createVNode("p", { class: "text-sm text-[#666] leading-relaxed" }, toDisplayString(unref(trans)(card.descKey)), 1)
                        ])
                      ]);
                    }), 64))
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-white py-20 border-t border-gray-100" }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [
                  createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("production.section2_label")), 1),
                  createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#1B3163] mb-6" }, toDisplayString(unref(trans)("production.section2_title")), 1),
                  createVNode("p", { class: "text-[#666] text-lg leading-relaxed" }, toDisplayString(unref(trans)("production.section2_text")), 1)
                ])
              ]),
              createVNode("section", { class: "bg-white py-20 border-t border-gray-100" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-10" }, [
                    createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("production.bend_label")), 1),
                    createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#1B3163]" }, toDisplayString(unref(trans)("production.bend_title")), 1)
                  ]),
                  createVNode("div", { class: "relative w-full aspect-[16/8] rounded-2xl overflow-hidden border border-gray-100" }, [
                    bendMedia.value.video ? (openBlock(), createBlock("video", {
                      key: 0,
                      class: "absolute inset-0 w-full h-full object-cover",
                      autoplay: "",
                      muted: "",
                      loop: "",
                      playsinline: ""
                    }, [
                      createVNode("source", {
                        src: bendMedia.value.video,
                        type: "video/mp4"
                      }, null, 8, ["src"])
                    ])) : bendMedia.value.image ? (openBlock(), createBlock("img", {
                      key: 1,
                      src: bendMedia.value.image,
                      alt: unref(trans)("production.bend_title"),
                      class: "absolute inset-0 w-full h-full object-cover"
                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "absolute inset-0 bg-gradient-to-br from-[#1B3163]/5 to-[#0E7A8C]/10"
                    }, [
                      createVNode("div", { class: "absolute inset-0 flex flex-col items-center justify-center gap-4" }, [
                        createVNode("div", { class: "w-20 h-20 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-10 h-10 text-[#0E7A8C]",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.5",
                              d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            })
                          ]))
                        ]),
                        createVNode("p", { class: "text-[#1B3163]/60 font-semibold text-sm tracking-wide" }, toDisplayString(unref(trans)("production.bend_label")), 1)
                      ])
                    ]))
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-white py-20 border-t border-gray-100" }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [
                  createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("production.section3_label")), 1),
                  createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#1B3163] mb-6" }, toDisplayString(unref(trans)("production.section3_title")), 1),
                  createVNode("p", { class: "text-[#666] text-lg leading-relaxed" }, toDisplayString(unref(trans)("production.section3_text")), 1)
                ])
              ]),
              createVNode("section", { class: "bg-white py-20 border-t border-gray-100 overflow-hidden" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10" }, [
                  createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("production.gallery_label")), 1),
                  createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#1B3163]" }, toDisplayString(unref(trans)("production.gallery_title")), 1)
                ]),
                createVNode("div", { class: "relative" }, [
                  createVNode("div", {
                    class: "pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10",
                    style: { "background": "linear-gradient(to right, #ffffff, transparent)" }
                  }),
                  createVNode("div", {
                    class: "pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10",
                    style: { "background": "linear-gradient(to left, #ffffff, transparent)" }
                  }),
                  createVNode("div", { class: "marquee-container group/marquee" }, [
                    createVNode("div", { class: "marquee-track flex gap-4" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(2, (n) => {
                        return openBlock(), createBlock(Fragment, { key: n }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(gallerySlides.value, (slide, i) => {
                            return openBlock(), createBlock("div", {
                              key: `${n}-${i}`,
                              class: "flex-shrink-0 w-72 sm:w-80 aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 relative"
                            }, [
                              slide.image ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: slide.image,
                                alt: `${unref(trans)("production.gallery_title")} ${i + 1}`,
                                class: "absolute inset-0 w-full h-full object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "absolute inset-0 bg-gradient-to-br from-[#f4f5f6] to-gray-100 flex items-center justify-center"
                              }, [
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
                                    d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                  })
                                ]))
                              ]))
                            ]);
                          }), 128))
                        ], 64);
                      }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Pages/Production.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Production = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-49f14da3"]]);
export {
  Production as default
};
