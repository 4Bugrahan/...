import { computed, withCtx, unref, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { u as useLocale } from "./useLocale-14nRWKiE.js";
import { _ as _sfc_main$1 } from "./AppLayout-CAQypwC2.js";
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  props: {
    pageContent: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const { trans } = useLocale();
    const props = __props;
    const c = (key, fallback = "") => props.pageContent[key] || fallback;
    const valIcons = [
      "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      "M13 10V3L4 14h7v7l9-11h-7z",
      "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    ];
    const values = computed(() => [
      { icon: valIcons[0], title: c("about_val1_title", "CE Belgeli Kalite Güvencesi"), description: c("about_val1_desc", "Sunduğumuz tüm ekipmanlar CE belgeli ve uluslararası kalite ile hijyen standartlarını karşılamaktadır.") },
      { icon: valIcons[1], title: c("about_val2_title", "Müşteri Odaklı Proje Yaklaşımı"), description: c("about_val2_desc", "Her müşterimizin işletme ihtiyacına özel çözüm tasarlıyor, uzun vadeli iş ortaklığı anlayışıyla hizmet veriyoruz.") },
      { icon: valIcons[2], title: c("about_val3_title", "Proje Disiplini ve Zamanındalık"), description: c("about_val3_desc", "Taahhüt edilen proje takvimlerine uyum ve zamanında teslimat en temel kurumsal prensibimizdir.") },
      { icon: valIcons[3], title: c("about_val4_title", "Güvenilirlik ve Şeffaflık"), description: c("about_val4_desc", "15 yılı aşkın sektör deneyimimizle verdiğimiz sözü tutan, şeffaf iletişim kuran güvenilir bir iş ortağıyız.") }
    ]);
    const steps = computed(() => [
      { title: trans("home.step1_title"), desc: trans("home.step1_desc") },
      { title: trans("home.step2_title"), desc: trans("home.step2_desc") },
      { title: trans("home.step3_title"), desc: trans("home.step3_desc") },
      { title: trans("home.step4_title"), desc: trans("home.step4_desc") },
      { title: trans("home.step5_title"), desc: trans("home.step5_desc") }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-gradient-to-br from-[#1B3163] to-[#1B3163] py-20"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="max-w-3xl"${_scopeId}><h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"${_scopeId}>${ssrInterpolate(c("about_hero_title", "Hakkımızda"))}</h1><p class="text-white/70 text-lg leading-relaxed"${_scopeId}>${ssrInterpolate(c("about_hero_desc", "15 yılı aşkın sektör deneyimi ve uzman kadromuzla endüstriyel mutfak ekipmanları alanında güvenilir proje ve tedarik çözümleri sunuyoruz."))}</p></div></div></section><section class="py-20 bg-white"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="grid lg:grid-cols-2 gap-16 items-center"${_scopeId}><div${_scopeId}>`);
            if (c("about_profile_image")) {
              _push2(`<img${ssrRenderAttr("src", c("about_profile_image"))} alt="4B Grup" class="w-full h-auto rounded-2xl mb-8 shadow-sm"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3"${_scopeId}>${ssrInterpolate(unref(trans)("about.profile_label"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#1B3163] mb-6 leading-tight"${_scopeId}>${ssrInterpolate(c("about_profile_title", "15 Yıllık Sektör Deneyimi, Anahtar Teslim Mutfak Projeleri"))}</h2><div class="space-y-4 text-[#666] leading-relaxed"${_scopeId}>`);
            if (c("about_profile_text1")) {
              _push2(`<p${_scopeId}>${ssrInterpolate(c("about_profile_text1"))}</p>`);
            } else {
              _push2(`<p${_scopeId}>${ssrInterpolate(unref(trans)("about.default_text1"))}</p>`);
            }
            if (c("about_profile_text2")) {
              _push2(`<p${_scopeId}>${ssrInterpolate(c("about_profile_text2"))}</p>`);
            } else {
              _push2(`<p${_scopeId}>${ssrInterpolate(unref(trans)("about.default_text2"))}</p>`);
            }
            if (c("about_profile_text3")) {
              _push2(`<p${_scopeId}>${ssrInterpolate(c("about_profile_text3"))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/iletisim",
              class: "inline-flex items-center gap-2 mt-8 bg-[#0E7A8C] hover:bg-[#0B6575] text-white font-bold px-6 py-3 rounded-lg transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(c("about_profile_btn", "Proje Teklifi Alın"))} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(c("about_profile_btn", "Proje Teklifi Alın")) + " ", 1),
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
                        d: "M9 5l7 7-7 7"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-[#1B3163] rounded-2xl p-7 text-white flex flex-col gap-4"${_scopeId}><div class="w-12 h-12 bg-[#0E7A8C]/15 rounded-xl flex items-center justify-center flex-shrink-0"${_scopeId}><svg class="w-6 h-6 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-bold text-base leading-snug mb-1"${_scopeId}>${ssrInterpolate(unref(trans)("about.svc1_title"))}</h3><p class="text-white/55 text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(unref(trans)("about.svc1_desc"))}</p></div></div><div class="bg-gray-50 rounded-2xl p-7 mt-6 flex flex-col gap-4"${_scopeId}><div class="w-12 h-12 bg-[#1B3163]/10 rounded-xl flex items-center justify-center flex-shrink-0"${_scopeId}><svg class="w-6 h-6 text-[#1B3163]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-bold text-[#1B3163] text-base leading-snug mb-1"${_scopeId}>${ssrInterpolate(unref(trans)("about.svc2_title"))}</h3><p class="text-[#666] text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(unref(trans)("about.svc2_desc"))}</p></div></div><div class="bg-gray-50 rounded-2xl p-7 flex flex-col gap-4"${_scopeId}><div class="w-12 h-12 bg-[#0E7A8C]/15 rounded-xl flex items-center justify-center flex-shrink-0"${_scopeId}><svg class="w-6 h-6 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-bold text-[#1B3163] text-base leading-snug mb-1"${_scopeId}>${ssrInterpolate(unref(trans)("about.svc3_title"))}</h3><p class="text-[#666] text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(unref(trans)("about.svc3_desc"))}</p></div></div><div class="bg-[#0E7A8C] rounded-2xl p-7 mt-6 text-white flex flex-col gap-4"${_scopeId}><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-bold text-base leading-snug mb-1"${_scopeId}>${ssrInterpolate(unref(trans)("about.svc4_title"))}</h3><p class="text-white/70 text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(unref(trans)("about.svc4_desc"))}</p></div></div></div></div></div></section><section class="py-20 bg-white"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-14"${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3"${_scopeId}>${ssrInterpolate(c("about_values_label", "Kurumsal Değerler"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#1B3163]"${_scopeId}>${ssrInterpolate(c("about_values_title", "İlkelerimiz"))}</h2></div><div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"${_scopeId}><!--[-->`);
            ssrRenderList(values.value, (value) => {
              _push2(`<div class="group text-center p-7 rounded-2xl border border-gray-100 hover:border-[#3DAFC4]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"${_scopeId}><div class="w-16 h-16 bg-[#0E7A8C]/10 group-hover:bg-[#0E7A8C] rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300"${_scopeId}><svg class="w-8 h-8 text-[#0E7A8C] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", value.icon)}${_scopeId}></path></svg></div><h3 class="font-bold text-[#1B3163] text-lg mb-3"${_scopeId}>${ssrInterpolate(value.title)}</h3><p class="text-[#666] text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(value.description)}</p></div>`);
            });
            _push2(`<!--]--></div></div></section><section class="py-20 bg-gray-50"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-14"${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3"${_scopeId}>${ssrInterpolate(unref(trans)("about.process_label"))}</p><h2 class="text-3xl sm:text-4xl font-black text-[#1B3163]"${_scopeId}>${ssrInterpolate(unref(trans)("about.process_h"))}</h2></div><div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"${_scopeId}><!--[-->`);
            ssrRenderList(steps.value, (step, idx) => {
              _push2(`<div class="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"${_scopeId}><div class="text-5xl font-black text-[#3DAFC4]/10 group-hover:text-[#3DAFC4]/20 transition-colors duration-300 mb-2"${_scopeId}>0${ssrInterpolate(idx + 1)}</div><h3 class="font-bold text-[#1B3163] text-base mb-2 leading-snug"${_scopeId}>${ssrInterpolate(step.title)}</h3><p class="text-[#666] text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(step.desc)}</p></div>`);
            });
            _push2(`<!--]--></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "bg-gradient-to-br from-[#1B3163] to-[#1B3163] py-20" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "max-w-3xl" }, [
                    createVNode("h1", { class: "text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight" }, toDisplayString(c("about_hero_title", "Hakkımızda")), 1),
                    createVNode("p", { class: "text-white/70 text-lg leading-relaxed" }, toDisplayString(c("about_hero_desc", "15 yılı aşkın sektör deneyimi ve uzman kadromuzla endüstriyel mutfak ekipmanları alanında güvenilir proje ve tedarik çözümleri sunuyoruz.")), 1)
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 bg-white" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-16 items-center" }, [
                    createVNode("div", null, [
                      c("about_profile_image") ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: c("about_profile_image"),
                        alt: "4B Grup",
                        class: "w-full h-auto rounded-2xl mb-8 shadow-sm"
                      }, null, 8, ["src"])) : createCommentVNode("", true),
                      createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("about.profile_label")), 1),
                      createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#1B3163] mb-6 leading-tight" }, toDisplayString(c("about_profile_title", "15 Yıllık Sektör Deneyimi, Anahtar Teslim Mutfak Projeleri")), 1),
                      createVNode("div", { class: "space-y-4 text-[#666] leading-relaxed" }, [
                        c("about_profile_text1") ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(c("about_profile_text1")), 1)) : (openBlock(), createBlock("p", { key: 1 }, toDisplayString(unref(trans)("about.default_text1")), 1)),
                        c("about_profile_text2") ? (openBlock(), createBlock("p", { key: 2 }, toDisplayString(c("about_profile_text2")), 1)) : (openBlock(), createBlock("p", { key: 3 }, toDisplayString(unref(trans)("about.default_text2")), 1)),
                        c("about_profile_text3") ? (openBlock(), createBlock("p", { key: 4 }, toDisplayString(c("about_profile_text3")), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode(unref(Link), {
                        href: "/iletisim",
                        class: "inline-flex items-center gap-2 mt-8 bg-[#0E7A8C] hover:bg-[#0B6575] text-white font-bold px-6 py-3 rounded-lg transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(c("about_profile_btn", "Proje Teklifi Alın")) + " ", 1),
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
                              d: "M9 5l7 7-7 7"
                            })
                          ]))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "bg-[#1B3163] rounded-2xl p-7 text-white flex flex-col gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 bg-[#0E7A8C]/15 rounded-xl flex items-center justify-center flex-shrink-0" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-6 h-6 text-[#0E7A8C]",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.8",
                              d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "font-bold text-base leading-snug mb-1" }, toDisplayString(unref(trans)("about.svc1_title")), 1),
                          createVNode("p", { class: "text-white/55 text-sm leading-relaxed" }, toDisplayString(unref(trans)("about.svc1_desc")), 1)
                        ])
                      ]),
                      createVNode("div", { class: "bg-gray-50 rounded-2xl p-7 mt-6 flex flex-col gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 bg-[#1B3163]/10 rounded-xl flex items-center justify-center flex-shrink-0" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-6 h-6 text-[#1B3163]",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.8",
                              d: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "font-bold text-[#1B3163] text-base leading-snug mb-1" }, toDisplayString(unref(trans)("about.svc2_title")), 1),
                          createVNode("p", { class: "text-[#666] text-sm leading-relaxed" }, toDisplayString(unref(trans)("about.svc2_desc")), 1)
                        ])
                      ]),
                      createVNode("div", { class: "bg-gray-50 rounded-2xl p-7 flex flex-col gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 bg-[#0E7A8C]/15 rounded-xl flex items-center justify-center flex-shrink-0" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-6 h-6 text-[#0E7A8C]",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.8",
                              d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.8",
                              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "font-bold text-[#1B3163] text-base leading-snug mb-1" }, toDisplayString(unref(trans)("about.svc3_title")), 1),
                          createVNode("p", { class: "text-[#666] text-sm leading-relaxed" }, toDisplayString(unref(trans)("about.svc3_desc")), 1)
                        ])
                      ]),
                      createVNode("div", { class: "bg-[#0E7A8C] rounded-2xl p-7 mt-6 text-white flex flex-col gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-6 h-6 text-white",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.8",
                              d: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                            })
                          ]))
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "font-bold text-base leading-snug mb-1" }, toDisplayString(unref(trans)("about.svc4_title")), 1),
                          createVNode("p", { class: "text-white/70 text-sm leading-relaxed" }, toDisplayString(unref(trans)("about.svc4_desc")), 1)
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 bg-white" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center mb-14" }, [
                    createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(c("about_values_label", "Kurumsal Değerler")), 1),
                    createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#1B3163]" }, toDisplayString(c("about_values_title", "İlkelerimiz")), 1)
                  ]),
                  createVNode("div", { class: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(values.value, (value) => {
                      return openBlock(), createBlock("div", {
                        key: value.title,
                        class: "group text-center p-7 rounded-2xl border border-gray-100 hover:border-[#3DAFC4]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      }, [
                        createVNode("div", { class: "w-16 h-16 bg-[#0E7A8C]/10 group-hover:bg-[#0E7A8C] rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-8 h-8 text-[#0E7A8C] group-hover:text-white transition-colors duration-300",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.5",
                              d: value.icon
                            }, null, 8, ["d"])
                          ]))
                        ]),
                        createVNode("h3", { class: "font-bold text-[#1B3163] text-lg mb-3" }, toDisplayString(value.title), 1),
                        createVNode("p", { class: "text-[#666] text-sm leading-relaxed" }, toDisplayString(value.description), 1)
                      ]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 bg-gray-50" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center mb-14" }, [
                    createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("about.process_label")), 1),
                    createVNode("h2", { class: "text-3xl sm:text-4xl font-black text-[#1B3163]" }, toDisplayString(unref(trans)("about.process_h")), 1)
                  ]),
                  createVNode("div", { class: "grid sm:grid-cols-2 lg:grid-cols-5 gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(steps.value, (step, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      }, [
                        createVNode("div", { class: "text-5xl font-black text-[#3DAFC4]/10 group-hover:text-[#3DAFC4]/20 transition-colors duration-300 mb-2" }, "0" + toDisplayString(idx + 1), 1),
                        createVNode("h3", { class: "font-bold text-[#1B3163] text-base mb-2 leading-snug" }, toDisplayString(step.title), 1),
                        createVNode("p", { class: "text-[#666] text-sm leading-relaxed" }, toDisplayString(step.desc), 1)
                      ]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Pages/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
