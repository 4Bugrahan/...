import { computed, withCtx, unref, createVNode, resolveDynamicComponent, openBlock, createBlock, createTextVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderVNode } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { u as useLocale } from "./useLocale-14nRWKiE.js";
import { _ as _sfc_main$1 } from "./AppLayout-BaP77qHm.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    projects: { type: Array, default: () => [] },
    partners: { type: Array, default: () => [] },
    pageContent: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const { trans, field } = useLocale();
    const props = __props;
    const defaultPartners = [
      { id: 1, name: "MKN", logo_url: null },
      { id: 2, name: "Rational", logo_url: null },
      { id: 3, name: "Welbilt", logo_url: null },
      { id: 4, name: "Hobart", logo_url: null },
      { id: 5, name: "Electrolux", logo_url: null },
      { id: 6, name: "Unox", logo_url: null },
      { id: 7, name: "True", logo_url: null },
      { id: 8, name: "Manitowoc", logo_url: null },
      { id: 9, name: "Meiko", logo_url: null },
      { id: 10, name: "Winterhalter", logo_url: null },
      { id: 11, name: "Lainox", logo_url: null },
      { id: 12, name: "Giorik", logo_url: null }
    ];
    computed(
      () => (props.partners.length ? props.partners : defaultPartners).map((p) => ({
        ...p,
        name: field(p, "name") || p.name,
        logo_url: p.logo_url || null
      }))
    );
    const c = (key, fallback = "") => props.pageContent[key] || fallback;
    const defaultProjects = [
      { id: 1, title: "5 Yıldızlı Otel — Merkez Mutfak Donanımı", description: "800 m² ana mutfak alanı için eksiksiz proje yönetimi. Pişirme grupları, endüstriyel soğutma, bulaşıkhane sistemleri ve paslanmaz mutfak ekipmanları anahtar teslim olarak kuruldu.", location: "Sivas", images: null },
      { id: 2, title: "Üniversite Hastanesi — Merkezi Mutfak Projesi", description: "Günlük 1.200 porsiyon kapasiteli merkezi mutfak kurulumu. Sıcak yemek hatları, soğuk depo sistemleri ve HACCP uyumlu hazırlık ekipmanları komple devreye alındı.", location: "Ankara", images: null },
      { id: 3, title: "Fine Dining Restoran — Mutfak Tasarımı ve Kurulum", description: "120 kişilik fine dining restoran için ergonomik mutfak planı, enerji verimli pişirme sistemleri ve profesyonel hazırlık ekipmanları ile anahtar teslim kurulum.", location: "İstanbul", images: null },
      { id: 4, title: "Üniversite Yemekhanesi — Toplu Yemek Altyapısı", description: "Günlük 2.500 öğrenci kapasitesinde hat ekipmanları, endüstriyel bulaşık sistemleri ve dağıtım üniteleri dahil komple yemekhane modernizasyonu.", location: "Kayseri", images: null },
      { id: 5, title: "Toplu Yemek Üretim Tesisi — Kapasite Artırımı", description: "Mevcut tesisin yeniden yapılandırılması; soğuk zincir sistemleri, paslanmaz mutfak hatları ve HACCP uyumlu üretim altyapısı ile günlük kapasite 3.000 porsiyona yükseltildi.", location: "Sivas", images: null },
      { id: 6, title: "AVM Food Court — Merkezi Hazırlık Mutfağı", description: "6 farklı mutfak konseptine hizmet veren merkezi hazırlık mutfağı planı ve ekipman kurulumu. Ortak pişirme grupları, soğutma ve depolama sistemleri tek proje kapsamında tamamlandı.", location: "Malatya", images: null }
    ];
    const displayProjects = computed(() => props.projects.length > 0 ? props.projects : defaultProjects);
    const sectors = computed(() => [
      { label: trans("home.sector_hotel"), icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
      { label: trans("home.sector_restaurant"), icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
      { label: trans("home.sector_hospital"), icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
      { label: trans("home.sector_education"), icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
      { label: trans("home.sector_catering"), icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
      { label: trans("home.sector_corporate"), icon: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="relative overflow-hidden bg-[#1B3163] py-20"${_scopeId}><div class="absolute inset-0 opacity-[0.03]" style="${ssrRenderStyle({ "background-image": "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", "background-size": "50px 50px" })}"${_scopeId}></div><div class="absolute right-0 top-0 w-1/2 h-full opacity-10" style="${ssrRenderStyle({ "background": "radial-gradient(circle at 70% 50%, #3DAFC4 0%, transparent 60%)" })}"${_scopeId}></div><div class="relative max-w-7xl mx-auto px-6"${_scopeId}><div class="max-w-3xl"${_scopeId}><h1 class="text-white font-extrabold leading-tight mb-5" style="${ssrRenderStyle({ "font-size": "clamp(2rem, 4.5vw, 3rem)" })}"${_scopeId}>${ssrInterpolate(c("proj_hero_title", "Anahtar Teslim Endüstriyel Mutfak Projeleri"))}</h1><p class="text-white/60 text-lg leading-relaxed max-w-2xl"${_scopeId}>${ssrInterpolate(c("proj_hero_desc", "Restoran, otel, hastane ve catering işletmelerine özel endüstriyel mutfak tasarımı ve kurulumu. İhtiyaç analizinden teslimata kadar anahtar teslim çözümler."))}</p></div></div></section><section class="bg-white border-b border-gray-100 py-12"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><p class="text-[10px] font-black text-gray-500 tracking-[3px] uppercase mb-6"${_scopeId}>${ssrInterpolate(unref(trans)("projects.sectors_label"))}</p><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(sectors.value, (s) => {
              _push2(`<div class="flex flex-col items-center text-center gap-3 bg-white rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(15,23,42,0.2)]" style="${ssrRenderStyle({ "border": "1px solid #ececec" })}"${_scopeId}><div class="w-12 h-12 rounded-xl bg-[#0E7A8C]/10 flex items-center justify-center flex-shrink-0"${_scopeId}><svg class="w-6 h-6 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75"${ssrRenderAttr("d", s.icon)}${_scopeId}></path></svg></div><span class="text-sm font-bold text-[#1B3163] leading-snug"${_scopeId}>${ssrInterpolate(s.label)}</span></div>`);
            });
            _push2(`<!--]--></div></div></section><section class="py-20 bg-[#f4f5f6]"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><div class="text-center mb-14"${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3"${_scopeId}>${ssrInterpolate(unref(trans)("projects.completed_label"))}</p><h2 class="text-4xl font-extrabold text-[#0e1e3d]"${_scopeId}>${ssrInterpolate(c("proj_grid_title", "Projeler"))}</h2>`);
            if (c("proj_grid_desc")) {
              _push2(`<p class="text-gray-500 mt-4 text-[15px]"${_scopeId}>${ssrInterpolate(c("proj_grid_desc"))}</p>`);
            } else {
              _push2(`<p class="text-gray-500 mt-4 text-[15px]"${_scopeId}>${ssrInterpolate(unref(trans)("projects.default_desc"))}</p>`);
            }
            _push2(`</div>`);
            if (displayProjects.value.length > 0) {
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(displayProjects.value, (project) => {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(project.slug ? unref(Link) : "div"), {
                  key: project.id,
                  href: project.slug ? `/projeler/${project.slug}` : void 0,
                  class: "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-transparent hover:border-[#3DAFC4]/20"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="relative h-60 overflow-hidden bg-[#1B3163]"${_scopeId2}>`);
                      if (project.image_urls && project.image_urls[0]) {
                        _push3(`<img${ssrRenderAttr("src", project.image_urls[0])}${ssrRenderAttr("alt", unref(field)(project, "title") || project.title)} loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"${_scopeId2}>`);
                      } else {
                        _push3(`<div class="absolute inset-0 flex flex-col items-center justify-center" style="${ssrRenderStyle({ "background": "linear-gradient(135deg,#0e1e3d 0%,#1B3163 60%,#1e3a72 100%)" })}"${_scopeId2}><svg class="w-14 h-14 text-[#3DAFC4]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId2}></path></svg></div>`);
                      }
                      _push3(`<div class="absolute inset-0 bg-gradient-to-t from-[#0e1e3d]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"${_scopeId2}></div><div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"${_scopeId2}><span class="bg-[#0E7A8C] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2"${_scopeId2}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId2}></path></svg> ${ssrInterpolate(unref(trans)("projects.inspect"))}</span></div>`);
                      if (project.location) {
                        _push3(`<div class="absolute top-4 left-4 flex items-center gap-1.5 bg-[#0e1e3d]/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold"${_scopeId2}><svg class="w-3 h-3 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId2}></path></svg> ${ssrInterpolate(unref(field)(project, "location") || project.location)}</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="p-6"${_scopeId2}><h3 class="font-extrabold text-[#0e1e3d] text-base leading-tight mb-2 group-hover:text-[#0E7A8C] transition-colors"${_scopeId2}>${ssrInterpolate(unref(field)(project, "title") || project.title)}</h3>`);
                      if (unref(field)(project, "description") || project.description) {
                        _push3(`<p class="text-gray-500 text-sm leading-relaxed line-clamp-2"${_scopeId2}>${ssrInterpolate(unref(field)(project, "description") || project.description)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex items-center gap-1 mt-4 text-[#0E7A8C] text-xs font-bold"${_scopeId2}>${ssrInterpolate(unref(trans)("products.view_details"))} <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"${_scopeId2}></path></svg></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "relative h-60 overflow-hidden bg-[#1B3163]" }, [
                          project.image_urls && project.image_urls[0] ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: project.image_urls[0],
                            alt: unref(field)(project, "title") || project.title,
                            loading: "lazy",
                            class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "absolute inset-0 flex flex-col items-center justify-center",
                            style: { "background": "linear-gradient(135deg,#0e1e3d 0%,#1B3163 60%,#1e3a72 100%)" }
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-14 h-14 text-[#3DAFC4]/30",
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
                          ])),
                          createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-[#0e1e3d]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
                          createVNode("div", { class: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" }, [
                            createVNode("span", { class: "bg-[#0E7A8C] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2" }, [
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
                                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                }),
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                })
                              ])),
                              createTextVNode(" " + toDisplayString(unref(trans)("projects.inspect")), 1)
                            ])
                          ]),
                          project.location ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "absolute top-4 left-4 flex items-center gap-1.5 bg-[#0e1e3d]/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-3 h-3 text-[#3DAFC4]",
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
                            createTextVNode(" " + toDisplayString(unref(field)(project, "location") || project.location), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "p-6" }, [
                          createVNode("h3", { class: "font-extrabold text-[#0e1e3d] text-base leading-tight mb-2 group-hover:text-[#0E7A8C] transition-colors" }, toDisplayString(unref(field)(project, "title") || project.title), 1),
                          unref(field)(project, "description") || project.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-gray-500 text-sm leading-relaxed line-clamp-2"
                          }, toDisplayString(unref(field)(project, "description") || project.description), 1)) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center gap-1 mt-4 text-[#0E7A8C] text-xs font-bold" }, [
                            createTextVNode(toDisplayString(unref(trans)("products.view_details")) + " ", 1),
                            (openBlock(), createBlock("svg", {
                              class: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform",
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
                            ]))
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }), _parent2, _scopeId);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-24"${_scopeId}><div class="w-20 h-20 bg-[#3DAFC4]/10 rounded-2xl flex items-center justify-center mx-auto mb-5"${_scopeId}><svg class="w-10 h-10 text-[#3DAFC4]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId}></path></svg></div><h3 class="text-[#0e1e3d] font-extrabold text-xl mb-2"${_scopeId}>${ssrInterpolate(unref(trans)("projects.no_project_h"))}</h3><p class="text-gray-500"${_scopeId}>${ssrInterpolate(unref(trans)("projects.no_project_p"))}</p></div>`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", { class: "relative overflow-hidden bg-[#1B3163] py-20" }, [
                createVNode("div", {
                  class: "absolute inset-0 opacity-[0.03]",
                  style: { "background-image": "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", "background-size": "50px 50px" }
                }),
                createVNode("div", {
                  class: "absolute right-0 top-0 w-1/2 h-full opacity-10",
                  style: { "background": "radial-gradient(circle at 70% 50%, #3DAFC4 0%, transparent 60%)" }
                }),
                createVNode("div", { class: "relative max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "max-w-3xl" }, [
                    createVNode("h1", {
                      class: "text-white font-extrabold leading-tight mb-5",
                      style: { "font-size": "clamp(2rem, 4.5vw, 3rem)" }
                    }, toDisplayString(c("proj_hero_title", "Anahtar Teslim Endüstriyel Mutfak Projeleri")), 1),
                    createVNode("p", { class: "text-white/60 text-lg leading-relaxed max-w-2xl" }, toDisplayString(c("proj_hero_desc", "Restoran, otel, hastane ve catering işletmelerine özel endüstriyel mutfak tasarımı ve kurulumu. İhtiyaç analizinden teslimata kadar anahtar teslim çözümler.")), 1)
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-white border-b border-gray-100 py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("p", { class: "text-[10px] font-black text-gray-500 tracking-[3px] uppercase mb-6" }, toDisplayString(unref(trans)("projects.sectors_label")), 1),
                  createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(sectors.value, (s) => {
                      return openBlock(), createBlock("div", {
                        key: s.label,
                        class: "flex flex-col items-center text-center gap-3 bg-white rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(15,23,42,0.2)]",
                        style: { "border": "1px solid #ececec" }
                      }, [
                        createVNode("div", { class: "w-12 h-12 rounded-xl bg-[#0E7A8C]/10 flex items-center justify-center flex-shrink-0" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-6 h-6 text-[#0E7A8C]",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "1.75",
                              d: s.icon
                            }, null, 8, ["d"])
                          ]))
                        ]),
                        createVNode("span", { class: "text-sm font-bold text-[#1B3163] leading-snug" }, toDisplayString(s.label), 1)
                      ]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 bg-[#f4f5f6]" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center mb-14" }, [
                    createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("projects.completed_label")), 1),
                    createVNode("h2", { class: "text-4xl font-extrabold text-[#0e1e3d]" }, toDisplayString(c("proj_grid_title", "Projeler")), 1),
                    c("proj_grid_desc") ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-gray-500 mt-4 text-[15px]"
                    }, toDisplayString(c("proj_grid_desc")), 1)) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-gray-500 mt-4 text-[15px]"
                    }, toDisplayString(unref(trans)("projects.default_desc")), 1))
                  ]),
                  displayProjects.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(displayProjects.value, (project) => {
                      return openBlock(), createBlock(resolveDynamicComponent(project.slug ? unref(Link) : "div"), {
                        key: project.id,
                        href: project.slug ? `/projeler/${project.slug}` : void 0,
                        class: "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-transparent hover:border-[#3DAFC4]/20"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "relative h-60 overflow-hidden bg-[#1B3163]" }, [
                            project.image_urls && project.image_urls[0] ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: project.image_urls[0],
                              alt: unref(field)(project, "title") || project.title,
                              loading: "lazy",
                              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "absolute inset-0 flex flex-col items-center justify-center",
                              style: { "background": "linear-gradient(135deg,#0e1e3d 0%,#1B3163 60%,#1e3a72 100%)" }
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-14 h-14 text-[#3DAFC4]/30",
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
                            ])),
                            createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-[#0e1e3d]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
                            createVNode("div", { class: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" }, [
                              createVNode("span", { class: "bg-[#0E7A8C] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2" }, [
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
                                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  }),
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  })
                                ])),
                                createTextVNode(" " + toDisplayString(unref(trans)("projects.inspect")), 1)
                              ])
                            ]),
                            project.location ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "absolute top-4 left-4 flex items-center gap-1.5 bg-[#0e1e3d]/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-3 h-3 text-[#3DAFC4]",
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
                              createTextVNode(" " + toDisplayString(unref(field)(project, "location") || project.location), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "p-6" }, [
                            createVNode("h3", { class: "font-extrabold text-[#0e1e3d] text-base leading-tight mb-2 group-hover:text-[#0E7A8C] transition-colors" }, toDisplayString(unref(field)(project, "title") || project.title), 1),
                            unref(field)(project, "description") || project.description ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-gray-500 text-sm leading-relaxed line-clamp-2"
                            }, toDisplayString(unref(field)(project, "description") || project.description), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "flex items-center gap-1 mt-4 text-[#0E7A8C] text-xs font-bold" }, [
                              createTextVNode(toDisplayString(unref(trans)("products.view_details")) + " ", 1),
                              (openBlock(), createBlock("svg", {
                                class: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform",
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
                              ]))
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-24"
                  }, [
                    createVNode("div", { class: "w-20 h-20 bg-[#3DAFC4]/10 rounded-2xl flex items-center justify-center mx-auto mb-5" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-10 h-10 text-[#3DAFC4]/50",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "1.5",
                          d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        })
                      ]))
                    ]),
                    createVNode("h3", { class: "text-[#0e1e3d] font-extrabold text-xl mb-2" }, toDisplayString(unref(trans)("projects.no_project_h")), 1),
                    createVNode("p", { class: "text-gray-500" }, toDisplayString(unref(trans)("projects.no_project_p")), 1)
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
