import { ref, computed, onMounted, onUnmounted, withCtx, unref, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, resolveDynamicComponent, mergeProps, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-CAQypwC2.js";
import { u as useLocale } from "./useLocale-14nRWKiE.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const FRAME_IMAGE = "/images/category-frame.jpeg?v=2";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    sliders: { type: Array, default: () => [] },
    categories: { type: Array, default: () => [] },
    partners: { type: Array, default: () => [] },
    clients: { type: Array, default: () => [] },
    featuredProducts: { type: Array, default: () => [] },
    recentProjects: { type: Array, default: () => [] },
    pageContent: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const c = (key, fallback = "") => props.pageContent[key] ?? fallback;
    const { trans, field } = useLocale();
    const aboutImageError = ref(false);
    const aboutImageUrl = computed(() => {
      const url = c("about_image", "");
      return url && typeof url === "string" ? url : "";
    });
    let autoplay = null;
    const activePanel = ref(0);
    const defaultHeroPanels = computed(() => [
      {
        label: trans("home.hero1_label"),
        title: trans("home.hero1_title"),
        desc: trans("home.hero1_desc"),
        btn: trans("home.hero1_btn"),
        href: "/urunler",
        bg: "linear-gradient(160deg, #0a1628 0%, #17305a 100%)"
      },
      {
        label: trans("home.hero2_label"),
        title: trans("home.hero2_title"),
        desc: trans("home.hero2_desc"),
        btn: trans("home.hero2_btn"),
        href: "/projeler",
        bg: "linear-gradient(160deg, #071220 0%, #0d2540 100%)"
      }
    ]);
    const bgGradients = [
      "linear-gradient(160deg, #0a1628 0%, #17305a 100%)",
      "linear-gradient(160deg, #071220 0%, #0d2540 100%)"
    ];
    const heroVideos = { 0: "/videos/hero1.mp4", 1: "/videos/hero2.mp4" };
    const heroVideoPosters = { 0: "/videos/hero1-poster.jpg", 1: "/videos/hero2-poster.jpg" };
    const heroPanels = computed(() => {
      if (!props.sliders || props.sliders.length === 0) return defaultHeroPanels.value;
      return props.sliders.map((s, i) => ({
        label: field(s, "subtitle") || s.subtitle || defaultHeroPanels.value[i]?.label || "",
        title: field(s, "title") || s.title || defaultHeroPanels.value[i]?.title || "",
        desc: field(s, "description") || s.description || defaultHeroPanels.value[i]?.desc || "",
        btn: field(s, "btn1_text") || s.btn1_text || defaultHeroPanels.value[i]?.btn || "",
        href: s.btn1_url || defaultHeroPanels.value[i]?.href || "/",
        bg: bgGradients[i % bgGradients.length],
        image: s.image || null,
        video: heroVideos[i] || null,
        videoPoster: heroVideoPosters[i] || null
      }));
    });
    function nextPanel() {
      activePanel.value = (activePanel.value + 1) % heroPanels.value.length;
    }
    function startAutoplay() {
      autoplay = setInterval(nextPanel, 5500);
    }
    function stopAutoplay() {
      if (autoplay) clearInterval(autoplay);
    }
    onMounted(() => startAutoplay());
    onUnmounted(() => stopAutoplay());
    computed(() => [
      { title: trans("home.feat_quality"), text: trans("home.feat_quality_d") },
      { title: trans("home.feat_setup"), text: trans("home.feat_setup_d") },
      { title: trans("home.feat_warranty"), text: trans("home.feat_warranty_d") },
      { title: trans("home.feat_support"), text: trans("home.feat_support_d") },
      { title: trans("home.feat_project"), text: trans("home.feat_project_d") },
      { title: trans("home.feat_brands"), text: trans("home.feat_brands_d") }
    ]);
    computed(() => [
      {
        num: "01",
        title: trans("home.step1_title"),
        desc: trans("home.step1_desc"),
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      },
      {
        num: "02",
        title: trans("home.step2_title"),
        desc: trans("home.step2_desc"),
        icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
      },
      {
        num: "03",
        title: trans("home.step3_title"),
        desc: trans("home.step3_desc"),
        icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
      },
      {
        num: "04",
        title: trans("home.step4_title"),
        desc: trans("home.step4_desc"),
        icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
      },
      {
        num: "05",
        title: trans("home.step5_title"),
        desc: trans("home.step5_desc"),
        icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      }
    ]);
    computed(() => [
      {
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        title: trans("home.sector_restaurant")
      },
      {
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
        title: trans("home.sector_hotel")
      },
      {
        icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        title: trans("home.sector_hospital")
      },
      {
        icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
        title: trans("home.sector_education")
      },
      {
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
        title: trans("home.sector_catering")
      },
      {
        icon: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
        title: trans("home.sector_corporate")
      }
    ]);
    const defaultProjects = computed(() => [
      { id: 1, title: trans("home.def_proj1_title"), description: trans("home.def_proj1_desc"), location: "Sivas", images: null },
      { id: 2, title: trans("home.def_proj2_title"), description: trans("home.def_proj2_desc"), location: "Kayseri", images: null },
      { id: 3, title: trans("home.def_proj3_title"), description: trans("home.def_proj3_desc"), location: "Sivas", images: null }
    ]);
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
    const displayPartners = computed(
      () => (props.partners.length ? props.partners : defaultPartners).map((p) => ({
        ...p,
        name: field(p, "name") || p.name
      }))
    );
    const displayClients = computed(
      () => props.clients.map((c2) => ({ ...c2, name: field(c2, "name") || c2.name }))
    );
    const displayCategories = computed(
      () => props.categories.map((c2) => ({ ...c2, name: field(c2, "name") || c2.name }))
    );
    const getCoverImage = (slug) => `/images/categories-transparent/${slug}.png?v=2`;
    function getInitials(name) {
      return name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="relative h-[calc(100vh-70px)] md:h-[calc(100vh-108px)]" data-v-18adc7fd${_scopeId}><div class="hidden lg:flex h-full" data-v-18adc7fd${_scopeId}><!--[-->`);
            ssrRenderList(heroPanels.value, (panel, i) => {
              _push2(`<div class="relative overflow-hidden cursor-pointer transition-all duration-700 ease-in-out" style="${ssrRenderStyle(`flex: ${activePanel.value === i ? 1.7 : 1};`)}" data-v-18adc7fd${_scopeId}>`);
              if (panel.video) {
                _push2(`<video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline${ssrRenderAttr("poster", panel.videoPoster || void 0)} data-v-18adc7fd${_scopeId}><source${ssrRenderAttr("src", panel.video)} type="video/mp4" data-v-18adc7fd${_scopeId}></video>`);
              } else {
                _push2(`<div class="absolute inset-0 transition-all duration-700" style="${ssrRenderStyle(panel.image ? `background-image: url('${panel.image}'); background-size: cover; background-position: center;` : `background: ${panel.bg};`)}" data-v-18adc7fd${_scopeId}></div>`);
              }
              if (!panel.image && !panel.video) {
                _push2(`<div class="absolute inset-0 opacity-[0.04]" style="${ssrRenderStyle({ "background-image": "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", "background-size": "28px 28px" })}" data-v-18adc7fd${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!panel.image || panel.video) {
                _push2(`<div class="absolute inset-0" style="${ssrRenderStyle({ "background": "linear-gradient(to top, rgba(0,8,22,0.90) 0%, rgba(0,8,22,0.30) 55%, transparent 100%)" })}" data-v-18adc7fd${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (i > 0) {
                _push2(`<div class="absolute left-0 top-0 bottom-0 w-px bg-white/12 z-10" data-v-18adc7fd${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="${ssrRenderClass([activePanel.value === i ? "bg-[#3DAFC4]" : "bg-white/8", "absolute top-0 left-0 right-0 h-[3px] z-10 transition-colors duration-500"])}" data-v-18adc7fd${_scopeId}></div><div class="relative z-10 h-full flex flex-col justify-end px-14 pb-16" data-v-18adc7fd${_scopeId}><h2 class="${ssrRenderClass([activePanel.value === i ? "text-5xl" : "text-2xl", "text-white font-black leading-[1.05] mb-6 transition-all duration-700"])}" data-v-18adc7fd${_scopeId}>${panel.title.replace(/\n/g, "<br>") ?? ""}</h2><div class="overflow-hidden transition-all duration-700" style="${ssrRenderStyle(activePanel.value === i ? "max-height: 100px; opacity: 1; margin-bottom: 32px;" : "max-height: 0; opacity: 0; margin-bottom: 0;")}" data-v-18adc7fd${_scopeId}><p class="text-white/55 text-[15px] leading-relaxed max-w-md" data-v-18adc7fd${_scopeId}>${ssrInterpolate(panel.desc)}</p></div><div class="overflow-hidden transition-all duration-700" style="${ssrRenderStyle(activePanel.value === i ? "max-height: 60px; opacity: 1;" : "max-height: 0; opacity: 0;")}" data-v-18adc7fd${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: panel.href,
                class: "inline-flex items-center gap-3 px-8 py-3.5 bg-[#0E7A8C] hover:bg-white text-white hover:text-[#0e1e3d] font-bold text-sm uppercase tracking-widest rounded-lg transition-all duration-200"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(panel.btn)} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18adc7fd${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-18adc7fd${_scopeId2}></path></svg>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(panel.btn) + " ", 1),
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4",
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
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            });
            _push2(`<!--]--></div><div class="flex lg:hidden flex-col h-full" data-v-18adc7fd${_scopeId}><!--[-->`);
            ssrRenderList(heroPanels.value, (panel, i) => {
              _push2(`<div class="relative flex-1 overflow-hidden" style="${ssrRenderStyle(!panel.video && panel.image ? `background-image: url('${panel.image}'); background-size: cover; background-position: center;` : !panel.video ? `background: ${panel.bg};` : "")}" data-v-18adc7fd${_scopeId}>`);
              if (panel.video) {
                _push2(`<video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline${ssrRenderAttr("poster", panel.videoPoster || void 0)} data-v-18adc7fd${_scopeId}><source${ssrRenderAttr("src", panel.video)} type="video/mp4" data-v-18adc7fd${_scopeId}></video>`);
              } else {
                _push2(`<!---->`);
              }
              if (!panel.image && !panel.video) {
                _push2(`<div class="absolute inset-0 opacity-[0.04]" style="${ssrRenderStyle({ "background-image": "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", "background-size": "20px 20px" })}" data-v-18adc7fd${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!panel.image || panel.video) {
                _push2(`<div class="absolute inset-0" style="${ssrRenderStyle({ "background": "linear-gradient(to top, rgba(0,8,22,0.85) 0%, rgba(0,8,22,0.40) 100%)" })}" data-v-18adc7fd${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="relative z-10 h-full flex flex-col justify-end px-8 pb-10" data-v-18adc7fd${_scopeId}><h2 class="text-white font-black text-3xl leading-tight mb-5" data-v-18adc7fd${_scopeId}>${panel.title.replace(/\n/g, "<br>") ?? ""}</h2>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: panel.href,
                class: "inline-flex items-center gap-2 px-6 py-3 bg-[#0E7A8C] text-white font-bold text-xs uppercase tracking-widest rounded-lg w-fit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(panel.btn)} <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18adc7fd${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-18adc7fd${_scopeId2}></path></svg>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(panel.btn) + " ", 1),
                      (openBlock(), createBlock("svg", {
                        class: "w-3.5 h-3.5",
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
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div><div class="absolute bottom-0 left-0 right-0 z-20 pointer-events-none hidden lg:block" data-v-18adc7fd${_scopeId}><svg viewBox="0 0 1440 57" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="${ssrRenderStyle({ "display": "block", "width": "100%", "height": "57px" })}" data-v-18adc7fd${_scopeId}><path d="M0,57 L0,34 L693,34 C708,34 714,3 720,0 C726,3 732,34 747,34 L1440,34 L1440,57 Z" fill="#ffffff" data-v-18adc7fd${_scopeId}></path></svg></div></section><section class="bg-white py-24" data-v-18adc7fd${_scopeId}><div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" data-v-18adc7fd${_scopeId}><div class="flex justify-center items-center min-h-[300px]" data-v-18adc7fd${_scopeId}>`);
            if (aboutImageUrl.value && !aboutImageError.value) {
              _push2(`<img${ssrRenderAttr("src", aboutImageUrl.value)} alt="4B Grup Ürün Kataloğu" class="max-h-[500px] w-auto rounded-2xl shadow-2xl" data-v-18adc7fd${_scopeId}>`);
            } else {
              _push2(`<div class="max-h-[500px] w-[400px] rounded-2xl bg-[#f4f5f6] border border-gray-200 flex items-center justify-center text-[#1B3163] font-semibold text-center px-6 py-12" data-v-18adc7fd${_scopeId}>`);
              if (aboutImageError.value) {
                _push2(`<span data-v-18adc7fd${_scopeId}>${ssrInterpolate(unref(trans)("home.image_error"))}</span>`);
              } else {
                _push2(`<span data-v-18adc7fd${_scopeId}>${ssrInterpolate(unref(trans)("home.image_hint"))}</span>`);
              }
              _push2(`</div>`);
            }
            _push2(`</div><div data-v-18adc7fd${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" data-v-18adc7fd${_scopeId}>${ssrInterpolate(unref(trans)("home.about_label"))}</p><h2 class="text-4xl font-extrabold text-[#0e1e3d] leading-tight mb-5" data-v-18adc7fd${_scopeId}>${ssrInterpolate(c("about_title", "Hakkımızda"))}</h2><p class="text-gray-500 leading-relaxed mb-4 text-[15px]" data-v-18adc7fd${_scopeId}>${ssrInterpolate(c("about_text1", "4B Grup, 2009 yılından bu yana otel, restoran, hastane ve toplu yemek tesislerine endüstriyel mutfak ekipmanları tedariki ve anahtar teslim proje hizmeti sunmaktadır. Yalnızca ekipman tedariği değil; tasarım, kurulum ve satış sonrası süreçlerin bütüncül yönetimini kapsayan kurumsal bir çözüm ortaklığı."))}</p><p class="text-gray-500 leading-relaxed mb-8 text-[15px]" data-v-18adc7fd${_scopeId}>${ssrInterpolate(c("about_text2", "CE belgeli ürün portföyü, deneyimli proje mühendisleri ve 50'den fazla küresel markayla kurulan yetkili satış ve servis ortaklığıyla projenin her aşamasında teknik uzmanlık ve kalite güvencesi sağlanır."))}</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/kurumsal",
              class: "inline-flex items-center gap-2.5 bg-[#1B3163] hover:bg-[#0E7A8C] text-white px-8 py-3.5 font-bold text-sm uppercase tracking-wide rounded-lg transition-colors duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(c("about_btn", "Kurumsal Sayfamız"))} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18adc7fd${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-18adc7fd${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(c("about_btn", "Kurumsal Sayfamız")) + " ", 1),
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></section><section class="bg-[#f4f5f6] py-24" data-v-18adc7fd${_scopeId}><div class="max-w-7xl mx-auto px-6" data-v-18adc7fd${_scopeId}><div class="text-center mb-14" data-v-18adc7fd${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" data-v-18adc7fd${_scopeId}>${ssrInterpolate(unref(trans)("home.products_label"))}</p><h2 class="text-4xl font-extrabold text-[#0e1e3d]" data-v-18adc7fd${_scopeId}>${ssrInterpolate(c("cats_title", unref(trans)("home.cat_h")))}</h2><p class="text-gray-500 mt-4 text-[15px]" data-v-18adc7fd${_scopeId}>${ssrInterpolate(c("cats_sub", unref(trans)("home.cat_sub")))}</p></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-5" data-v-18adc7fd${_scopeId}><!--[-->`);
            ssrRenderList(displayCategories.value, (cat) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: cat.slug,
                href: `/urunler/${cat.slug}`,
                class: "group cursor-pointer block rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(27,49,99,0.25)]",
                style: { "border": "1px solid #ececec", "outline": "none", "-webkit-tap-highlight-color": "transparent" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="relative overflow-hidden aspect-square" data-v-18adc7fd${_scopeId2}><img${ssrRenderAttr("src", FRAME_IMAGE)} alt="" draggable="false" class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" data-v-18adc7fd${_scopeId2}><img${ssrRenderAttr("src", getCoverImage(cat.slug))}${ssrRenderAttr("alt", cat.name)} draggable="false" class="absolute inset-[7%] w-[86%] h-[86%] object-contain outline-none transition-transform duration-500 group-hover:scale-105" data-v-18adc7fd${_scopeId2}></div><div class="px-4 py-3" style="${ssrRenderStyle({ "border-top": "1px solid #f0f1f3" })}" data-v-18adc7fd${_scopeId2}><h3 class="font-bold text-sm leading-snug truncate" style="${ssrRenderStyle({ "color": "#1B3163" })}" data-v-18adc7fd${_scopeId2}>${ssrInterpolate(cat.name)}</h3><span class="text-xs font-medium" style="${ssrRenderStyle({ "color": "#8b93a3" })}" data-v-18adc7fd${_scopeId2}>${ssrInterpolate(cat.total_products_count ?? cat.products_count ?? 0)} ${ssrInterpolate(unref(trans)("common.product_unit"))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "relative overflow-hidden aspect-square" }, [
                        createVNode("img", {
                          src: FRAME_IMAGE,
                          alt: "",
                          draggable: "false",
                          class: "absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                        }),
                        createVNode("img", {
                          src: getCoverImage(cat.slug),
                          alt: cat.name,
                          draggable: "false",
                          onError: ($event) => $event.target.style.display = "none",
                          class: "absolute inset-[7%] w-[86%] h-[86%] object-contain outline-none transition-transform duration-500 group-hover:scale-105"
                        }, null, 40, ["src", "alt", "onError"])
                      ]),
                      createVNode("div", {
                        class: "px-4 py-3",
                        style: { "border-top": "1px solid #f0f1f3" }
                      }, [
                        createVNode("h3", {
                          class: "font-bold text-sm leading-snug truncate",
                          style: { "color": "#1B3163" }
                        }, toDisplayString(cat.name), 1),
                        createVNode("span", {
                          class: "text-xs font-medium",
                          style: { "color": "#8b93a3" }
                        }, toDisplayString(cat.total_products_count ?? cat.products_count ?? 0) + " " + toDisplayString(unref(trans)("common.product_unit")), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><div class="text-center mt-10" data-v-18adc7fd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/urunler",
              class: "inline-flex items-center gap-2.5 border-2 border-[#1B3163] text-[#1B3163] hover:bg-[#1B3163] hover:text-white px-8 py-3.5 font-bold text-sm uppercase tracking-wide rounded-lg transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(c("cats_btn", unref(trans)("home.all_cats")))} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18adc7fd${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-18adc7fd${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(c("cats_btn", unref(trans)("home.all_cats"))) + " ", 1),
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></section><section class="relative overflow-hidden py-0" data-v-18adc7fd${_scopeId}><div class="absolute inset-0 flex" data-v-18adc7fd${_scopeId}><div class="w-1/2 bg-[#0e1e3d]" data-v-18adc7fd${_scopeId}></div><div class="w-1/2 bg-[#1B3163]" data-v-18adc7fd${_scopeId}></div></div><div class="absolute inset-0 opacity-[0.03]" style="${ssrRenderStyle({ "background-image": "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", "background-size": "40px 40px" })}" data-v-18adc7fd${_scopeId}></div><div class="absolute inset-0 pointer-events-none" style="${ssrRenderStyle({ "background": "radial-gradient(ellipse at 50% 50%, rgba(61,175,196,0.12) 0%, transparent 65%)" })}" data-v-18adc7fd${_scopeId}></div><div class="relative max-w-7xl mx-auto px-6" data-v-18adc7fd${_scopeId}><div class="flex flex-col lg:flex-row items-center gap-0" data-v-18adc7fd${_scopeId}><div class="lg:w-5/12 flex justify-center lg:justify-end py-16 lg:py-12 lg:pr-12" data-v-18adc7fd${_scopeId}><div class="relative" data-v-18adc7fd${_scopeId}><div class="absolute -inset-6 rounded-3xl opacity-30" style="${ssrRenderStyle({ "background": "radial-gradient(circle, #3DAFC4 0%, transparent 70%)", "filter": "blur(24px)" })}" data-v-18adc7fd${_scopeId}></div><div class="absolute top-2 left-3 w-full h-full bg-[#3DAFC4]/20 rounded-xl blur-sm" data-v-18adc7fd${_scopeId}></div><div class="absolute top-1 left-1.5 w-full h-full bg-white/5 rounded-xl" data-v-18adc7fd${_scopeId}></div><img src="/images/katalog-kapak.png" alt="4B Grup Ürün Kataloğu" class="relative z-10 w-64 sm:w-80 lg:w-72 xl:w-80 rounded-xl shadow-2xl" style="${ssrRenderStyle({ "box-shadow": "0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)" })}" data-v-18adc7fd${_scopeId}><div class="absolute -top-4 -right-4 z-20 w-16 h-16 bg-[#0E7A8C] rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-[#0e1e3d]" data-v-18adc7fd${_scopeId}><svg class="w-5 h-5 text-white mb-0.5" fill="currentColor" viewBox="0 0 20 20" data-v-18adc7fd${_scopeId}><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" data-v-18adc7fd${_scopeId}></path></svg><span class="text-white text-[9px] font-black tracking-wide" data-v-18adc7fd${_scopeId}>PDF</span></div></div></div><div class="lg:w-7/12 py-16 lg:py-20 lg:pl-12 text-center lg:text-left" data-v-18adc7fd${_scopeId}><h2 class="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5" data-v-18adc7fd${_scopeId}>${ssrInterpolate(unref(trans)("home.catalog_title1"))}</h2><p class="text-white/55 text-[15px] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0" data-v-18adc7fd${_scopeId}>${ssrInterpolate(unref(trans)("home.catalog_desc"))}</p><div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" data-v-18adc7fd${_scopeId}><a href="/files/katalog.pdf" download class="group inline-flex items-center justify-center gap-3 bg-[#0E7A8C] hover:bg-white text-white hover:text-[#1B3163] font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#3DAFC4]/20" data-v-18adc7fd${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18adc7fd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-18adc7fd${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("home.catalog_download"))}</a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/urunler",
              class: "inline-flex items-center justify-center gap-2.5 border-2 border-white/20 hover:border-[#3DAFC4] text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-xl hover:bg-[#3DAFC4]/10 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(trans)("home.catalog_browse"))} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18adc7fd${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-18adc7fd${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(trans)("home.catalog_browse")) + " ", 1),
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></section><section class="bg-white py-24" data-v-18adc7fd${_scopeId}><div class="max-w-7xl mx-auto px-6" data-v-18adc7fd${_scopeId}><div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14" data-v-18adc7fd${_scopeId}><div data-v-18adc7fd${_scopeId}><p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" data-v-18adc7fd${_scopeId}>${ssrInterpolate(unref(trans)("home.projects_label"))}</p><h2 class="text-4xl font-extrabold text-[#0e1e3d]" data-v-18adc7fd${_scopeId}>${ssrInterpolate(unref(trans)("home.projects_h"))}</h2></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/projeler",
              class: "inline-flex items-center gap-2 text-[#0E7A8C] hover:text-[#1B3163] text-sm font-semibold transition-colors group flex-shrink-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(trans)("home.projects_all"))} <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18adc7fd${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-18adc7fd${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(trans)("home.projects_all")) + " ", 1),
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 group-hover:translate-x-1 transition-transform",
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-18adc7fd${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentProjects.length ? __props.recentProjects : defaultProjects.value, (project, i) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(project.slug ? unref(Link) : "div"), mergeProps({
                key: project.id
              }, { ref_for: true }, project.slug ? { href: `/projeler/${project.slug}` } : {}, { class: "group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-[#3DAFC4]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" }), {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="aspect-[4/3] relative overflow-hidden bg-[#f4f5f6]" data-v-18adc7fd${_scopeId2}>`);
                    if (project.image_urls && project.image_urls[0]) {
                      _push3(`<img${ssrRenderAttr("src", project.image_urls[0])}${ssrRenderAttr("alt", unref(field)(project, "title") || project.title)} loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-v-18adc7fd${_scopeId2}>`);
                    } else {
                      _push3(`<div class="w-full h-full flex items-center justify-center" style="${ssrRenderStyle(`background: linear-gradient(135deg, ${["#1B3163", "#0e2a5c", "#163060"][i % 3]} 0%, #1e3a72 100%)`)}" data-v-18adc7fd${_scopeId2}><svg class="w-20 h-20 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18adc7fd${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-18adc7fd${_scopeId2}></path></svg></div>`);
                    }
                    _push3(`<div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" data-v-18adc7fd${_scopeId2}></div>`);
                    if (project.location) {
                      _push3(`<div class="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0E7A8C] rounded-full px-3 py-1.5 shadow-sm" data-v-18adc7fd${_scopeId2}><svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24" data-v-18adc7fd${_scopeId2}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" data-v-18adc7fd${_scopeId2}></path></svg><span class="text-white text-[10px] font-bold tracking-wide" data-v-18adc7fd${_scopeId2}>${ssrInterpolate(unref(field)(project, "location") || project.location)}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div class="p-6" data-v-18adc7fd${_scopeId2}><h3 class="font-extrabold text-[#0e1e3d] text-lg leading-tight mb-2 group-hover:text-[#0E7A8C] transition-colors" data-v-18adc7fd${_scopeId2}>${ssrInterpolate(unref(field)(project, "title") || project.title)}</h3><p class="text-gray-500 text-sm leading-relaxed line-clamp-2" data-v-18adc7fd${_scopeId2}>${ssrInterpolate(unref(field)(project, "description") || project.description)}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "aspect-[4/3] relative overflow-hidden bg-[#f4f5f6]" }, [
                        project.image_urls && project.image_urls[0] ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: project.image_urls[0],
                          alt: unref(field)(project, "title") || project.title,
                          loading: "lazy",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "w-full h-full flex items-center justify-center",
                          style: `background: linear-gradient(135deg, ${["#1B3163", "#0e2a5c", "#163060"][i % 3]} 0%, #1e3a72 100%)`
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-20 h-20 text-white/10",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "0.75",
                              d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            })
                          ]))
                        ], 4)),
                        createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
                        project.location ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "absolute top-4 right-4 flex items-center gap-1.5 bg-[#0E7A8C] rounded-full px-3 py-1.5 shadow-sm"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-3 h-3 text-white",
                            fill: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" })
                          ])),
                          createVNode("span", { class: "text-white text-[10px] font-bold tracking-wide" }, toDisplayString(unref(field)(project, "location") || project.location), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", { class: "font-extrabold text-[#0e1e3d] text-lg leading-tight mb-2 group-hover:text-[#0E7A8C] transition-colors" }, toDisplayString(unref(field)(project, "title") || project.title), 1),
                        createVNode("p", { class: "text-gray-500 text-sm leading-relaxed line-clamp-2" }, toDisplayString(unref(field)(project, "description") || project.description), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
            });
            _push2(`<!--]--></div></div></section><section class="bg-[#f4f5f6] py-20 overflow-hidden relative" data-v-18adc7fd${_scopeId}><div class="max-w-7xl mx-auto px-6 mb-12" data-v-18adc7fd${_scopeId}><div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4" data-v-18adc7fd${_scopeId}><div data-v-18adc7fd${_scopeId}><h2 class="text-4xl font-extrabold text-[#0e1e3d]" data-v-18adc7fd${_scopeId}>${ssrInterpolate(unref(trans)("home.partners_section_h"))}</h2></div></div></div><div class="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10" style="${ssrRenderStyle({ "background": "linear-gradient(to right, #f4f5f6, transparent)" })}" data-v-18adc7fd${_scopeId}></div><div class="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10" style="${ssrRenderStyle({ "background": "linear-gradient(to left, #f4f5f6, transparent)" })}" data-v-18adc7fd${_scopeId}></div><div class="marquee-container group/marquee mb-4" data-v-18adc7fd${_scopeId}><div class="marquee-track flex gap-4" data-v-18adc7fd${_scopeId}><!--[-->`);
            ssrRenderList(2, (n) => {
              _push2(`<!--[--><!--[-->`);
              ssrRenderList(displayClients.value, (partner) => {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(partner.website ? "a" : "div"), {
                  key: `${n}-${partner.id}`,
                  href: partner.website || void 0,
                  target: partner.website ? "_blank" : void 0,
                  rel: partner.website ? "noopener noreferrer" : void 0,
                  class: "flex-shrink-0 w-52 h-36 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl px-6 hover:border-[#3DAFC4]/60 hover:shadow-md transition-all duration-300 cursor-default"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (partner.logo_url) {
                        _push3(`<img${ssrRenderAttr("src", partner.logo_url)}${ssrRenderAttr("alt", partner.name)} loading="lazy" class="w-full h-24 object-contain transition-all duration-300" data-v-18adc7fd${_scopeId2}>`);
                      } else {
                        _push3(`<div class="text-center" data-v-18adc7fd${_scopeId2}><div class="w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5" data-v-18adc7fd${_scopeId2}>${ssrInterpolate(getInitials(partner.name))}</div><span class="text-xs font-semibold text-[#1B3163]/60 leading-tight block" data-v-18adc7fd${_scopeId2}>${ssrInterpolate(partner.name)}</span></div>`);
                      }
                    } else {
                      return [
                        partner.logo_url ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: partner.logo_url,
                          alt: partner.name,
                          loading: "lazy",
                          class: "w-full h-24 object-contain transition-all duration-300"
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
              _push2(`<!--]--><!--]-->`);
            });
            _push2(`<!--]--></div></div><div class="marquee-container-reverse group/marquee2" data-v-18adc7fd${_scopeId}><div class="marquee-track-reverse flex gap-4" data-v-18adc7fd${_scopeId}><!--[-->`);
            ssrRenderList(2, (n) => {
              _push2(`<!--[--><!--[-->`);
              ssrRenderList(displayPartners.value, (partner) => {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(partner.website ? "a" : "div"), {
                  key: `r${n}-${partner.id}`,
                  href: partner.website || void 0,
                  target: partner.website ? "_blank" : void 0,
                  rel: partner.website ? "noopener noreferrer" : void 0,
                  class: "flex-shrink-0 w-52 h-32 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl px-6 hover:border-[#3DAFC4]/60 hover:shadow-md transition-all duration-300 cursor-default"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (partner.logo_url) {
                        _push3(`<img${ssrRenderAttr("src", partner.logo_url)}${ssrRenderAttr("alt", partner.name)} loading="lazy" class="w-full h-14 object-contain opacity-60 hover:opacity-100 transition-all duration-300" data-v-18adc7fd${_scopeId2}>`);
                      } else {
                        _push3(`<div class="text-center" data-v-18adc7fd${_scopeId2}><div class="w-12 h-12 bg-[#1B3163]/10 border border-[#1B3163]/20 rounded-lg flex items-center justify-center text-[#1B3163] font-extrabold text-sm mx-auto mb-1.5" data-v-18adc7fd${_scopeId2}>${ssrInterpolate(getInitials(partner.name))}</div><span class="text-xs font-semibold text-[#1B3163]/60 leading-tight block" data-v-18adc7fd${_scopeId2}>${ssrInterpolate(partner.name)}</span></div>`);
                      }
                    } else {
                      return [
                        partner.logo_url ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: partner.logo_url,
                          alt: partner.name,
                          loading: "lazy",
                          class: "w-full h-14 object-contain opacity-60 hover:opacity-100 transition-all duration-300"
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
              _push2(`<!--]--><!--]-->`);
            });
            _push2(`<!--]--></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "relative h-[calc(100vh-70px)] md:h-[calc(100vh-108px)]" }, [
                createVNode("div", { class: "hidden lg:flex h-full" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(heroPanels.value, (panel, i) => {
                    return openBlock(), createBlock("div", {
                      key: i,
                      class: "relative overflow-hidden cursor-pointer transition-all duration-700 ease-in-out",
                      style: `flex: ${activePanel.value === i ? 1.7 : 1};`,
                      onMouseenter: ($event) => activePanel.value = i
                    }, [
                      panel.video ? (openBlock(), createBlock("video", {
                        key: 0,
                        class: "absolute inset-0 w-full h-full object-cover",
                        autoplay: "",
                        muted: "",
                        loop: "",
                        playsinline: "",
                        poster: panel.videoPoster || void 0
                      }, [
                        createVNode("source", {
                          src: panel.video,
                          type: "video/mp4"
                        }, null, 8, ["src"])
                      ], 8, ["poster"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "absolute inset-0 transition-all duration-700",
                        style: panel.image ? `background-image: url('${panel.image}'); background-size: cover; background-position: center;` : `background: ${panel.bg};`
                      }, null, 4)),
                      !panel.image && !panel.video ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "absolute inset-0 opacity-[0.04]",
                        style: { "background-image": "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", "background-size": "28px 28px" }
                      })) : createCommentVNode("", true),
                      !panel.image || panel.video ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "absolute inset-0",
                        style: { "background": "linear-gradient(to top, rgba(0,8,22,0.90) 0%, rgba(0,8,22,0.30) 55%, transparent 100%)" }
                      })) : createCommentVNode("", true),
                      i > 0 ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "absolute left-0 top-0 bottom-0 w-px bg-white/12 z-10"
                      })) : createCommentVNode("", true),
                      createVNode("div", {
                        class: ["absolute top-0 left-0 right-0 h-[3px] z-10 transition-colors duration-500", activePanel.value === i ? "bg-[#3DAFC4]" : "bg-white/8"]
                      }, null, 2),
                      createVNode("div", { class: "relative z-10 h-full flex flex-col justify-end px-14 pb-16" }, [
                        createVNode("h2", {
                          class: ["text-white font-black leading-[1.05] mb-6 transition-all duration-700", activePanel.value === i ? "text-5xl" : "text-2xl"],
                          innerHTML: panel.title.replace(/\n/g, "<br>")
                        }, null, 10, ["innerHTML"]),
                        createVNode("div", {
                          class: "overflow-hidden transition-all duration-700",
                          style: activePanel.value === i ? "max-height: 100px; opacity: 1; margin-bottom: 32px;" : "max-height: 0; opacity: 0; margin-bottom: 0;"
                        }, [
                          createVNode("p", { class: "text-white/55 text-[15px] leading-relaxed max-w-md" }, toDisplayString(panel.desc), 1)
                        ], 4),
                        createVNode("div", {
                          class: "overflow-hidden transition-all duration-700",
                          style: activePanel.value === i ? "max-height: 60px; opacity: 1;" : "max-height: 0; opacity: 0;"
                        }, [
                          createVNode(unref(Link), {
                            href: panel.href,
                            class: "inline-flex items-center gap-3 px-8 py-3.5 bg-[#0E7A8C] hover:bg-white text-white hover:text-[#0e1e3d] font-bold text-sm uppercase tracking-widest rounded-lg transition-all duration-200"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(panel.btn) + " ", 1),
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4",
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
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ], 4)
                      ])
                    ], 44, ["onMouseenter"]);
                  }), 128))
                ]),
                createVNode("div", { class: "flex lg:hidden flex-col h-full" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(heroPanels.value, (panel, i) => {
                    return openBlock(), createBlock("div", {
                      key: i,
                      class: "relative flex-1 overflow-hidden",
                      style: !panel.video && panel.image ? `background-image: url('${panel.image}'); background-size: cover; background-position: center;` : !panel.video ? `background: ${panel.bg};` : ""
                    }, [
                      panel.video ? (openBlock(), createBlock("video", {
                        key: 0,
                        class: "absolute inset-0 w-full h-full object-cover",
                        autoplay: "",
                        muted: "",
                        loop: "",
                        playsinline: "",
                        poster: panel.videoPoster || void 0
                      }, [
                        createVNode("source", {
                          src: panel.video,
                          type: "video/mp4"
                        }, null, 8, ["src"])
                      ], 8, ["poster"])) : createCommentVNode("", true),
                      !panel.image && !panel.video ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "absolute inset-0 opacity-[0.04]",
                        style: { "background-image": "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", "background-size": "20px 20px" }
                      })) : createCommentVNode("", true),
                      !panel.image || panel.video ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "absolute inset-0",
                        style: { "background": "linear-gradient(to top, rgba(0,8,22,0.85) 0%, rgba(0,8,22,0.40) 100%)" }
                      })) : createCommentVNode("", true),
                      createVNode("div", { class: "relative z-10 h-full flex flex-col justify-end px-8 pb-10" }, [
                        createVNode("h2", {
                          class: "text-white font-black text-3xl leading-tight mb-5",
                          innerHTML: panel.title.replace(/\n/g, "<br>")
                        }, null, 8, ["innerHTML"]),
                        createVNode(unref(Link), {
                          href: panel.href,
                          class: "inline-flex items-center gap-2 px-6 py-3 bg-[#0E7A8C] text-white font-bold text-xs uppercase tracking-widest rounded-lg w-fit"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(panel.btn) + " ", 1),
                            (openBlock(), createBlock("svg", {
                              class: "w-3.5 h-3.5",
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
                          ]),
                          _: 2
                        }, 1032, ["href"])
                      ])
                    ], 4);
                  }), 128))
                ]),
                createVNode("div", { class: "absolute bottom-0 left-0 right-0 z-20 pointer-events-none hidden lg:block" }, [
                  (openBlock(), createBlock("svg", {
                    viewBox: "0 0 1440 57",
                    xmlns: "http://www.w3.org/2000/svg",
                    preserveAspectRatio: "none",
                    style: { "display": "block", "width": "100%", "height": "57px" }
                  }, [
                    createVNode("path", {
                      d: "M0,57 L0,34 L693,34 C708,34 714,3 720,0 C726,3 732,34 747,34 L1440,34 L1440,57 Z",
                      fill: "#ffffff"
                    })
                  ]))
                ])
              ]),
              createVNode("section", { class: "bg-white py-24" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" }, [
                  createVNode("div", { class: "flex justify-center items-center min-h-[300px]" }, [
                    aboutImageUrl.value && !aboutImageError.value ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: aboutImageUrl.value,
                      alt: "4B Grup Ürün Kataloğu",
                      class: "max-h-[500px] w-auto rounded-2xl shadow-2xl",
                      onError: ($event) => aboutImageError.value = true
                    }, null, 40, ["src", "onError"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "max-h-[500px] w-[400px] rounded-2xl bg-[#f4f5f6] border border-gray-200 flex items-center justify-center text-[#1B3163] font-semibold text-center px-6 py-12"
                    }, [
                      aboutImageError.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(trans)("home.image_error")), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(unref(trans)("home.image_hint")), 1))
                    ]))
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("home.about_label")), 1),
                    createVNode("h2", { class: "text-4xl font-extrabold text-[#0e1e3d] leading-tight mb-5" }, toDisplayString(c("about_title", "Hakkımızda")), 1),
                    createVNode("p", { class: "text-gray-500 leading-relaxed mb-4 text-[15px]" }, toDisplayString(c("about_text1", "4B Grup, 2009 yılından bu yana otel, restoran, hastane ve toplu yemek tesislerine endüstriyel mutfak ekipmanları tedariki ve anahtar teslim proje hizmeti sunmaktadır. Yalnızca ekipman tedariği değil; tasarım, kurulum ve satış sonrası süreçlerin bütüncül yönetimini kapsayan kurumsal bir çözüm ortaklığı.")), 1),
                    createVNode("p", { class: "text-gray-500 leading-relaxed mb-8 text-[15px]" }, toDisplayString(c("about_text2", "CE belgeli ürün portföyü, deneyimli proje mühendisleri ve 50'den fazla küresel markayla kurulan yetkili satış ve servis ortaklığıyla projenin her aşamasında teknik uzmanlık ve kalite güvencesi sağlanır.")), 1),
                    createVNode(unref(Link), {
                      href: "/kurumsal",
                      class: "inline-flex items-center gap-2.5 bg-[#1B3163] hover:bg-[#0E7A8C] text-white px-8 py-3.5 font-bold text-sm uppercase tracking-wide rounded-lg transition-colors duration-300"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(c("about_btn", "Kurumsal Sayfamız")) + " ", 1),
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4",
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
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-[#f4f5f6] py-24" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center mb-14" }, [
                    createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("home.products_label")), 1),
                    createVNode("h2", { class: "text-4xl font-extrabold text-[#0e1e3d]" }, toDisplayString(c("cats_title", unref(trans)("home.cat_h"))), 1),
                    createVNode("p", { class: "text-gray-500 mt-4 text-[15px]" }, toDisplayString(c("cats_sub", unref(trans)("home.cat_sub"))), 1)
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-5" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(displayCategories.value, (cat) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: cat.slug,
                        href: `/urunler/${cat.slug}`,
                        class: "group cursor-pointer block rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(27,49,99,0.25)]",
                        style: { "border": "1px solid #ececec", "outline": "none", "-webkit-tap-highlight-color": "transparent" }
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "relative overflow-hidden aspect-square" }, [
                            createVNode("img", {
                              src: FRAME_IMAGE,
                              alt: "",
                              draggable: "false",
                              class: "absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                            }),
                            createVNode("img", {
                              src: getCoverImage(cat.slug),
                              alt: cat.name,
                              draggable: "false",
                              onError: ($event) => $event.target.style.display = "none",
                              class: "absolute inset-[7%] w-[86%] h-[86%] object-contain outline-none transition-transform duration-500 group-hover:scale-105"
                            }, null, 40, ["src", "alt", "onError"])
                          ]),
                          createVNode("div", {
                            class: "px-4 py-3",
                            style: { "border-top": "1px solid #f0f1f3" }
                          }, [
                            createVNode("h3", {
                              class: "font-bold text-sm leading-snug truncate",
                              style: { "color": "#1B3163" }
                            }, toDisplayString(cat.name), 1),
                            createVNode("span", {
                              class: "text-xs font-medium",
                              style: { "color": "#8b93a3" }
                            }, toDisplayString(cat.total_products_count ?? cat.products_count ?? 0) + " " + toDisplayString(unref(trans)("common.product_unit")), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "text-center mt-10" }, [
                    createVNode(unref(Link), {
                      href: "/urunler",
                      class: "inline-flex items-center gap-2.5 border-2 border-[#1B3163] text-[#1B3163] hover:bg-[#1B3163] hover:text-white px-8 py-3.5 font-bold text-sm uppercase tracking-wide rounded-lg transition-all duration-300"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(c("cats_btn", unref(trans)("home.all_cats"))) + " ", 1),
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4",
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
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              createVNode("section", { class: "relative overflow-hidden py-0" }, [
                createVNode("div", { class: "absolute inset-0 flex" }, [
                  createVNode("div", { class: "w-1/2 bg-[#0e1e3d]" }),
                  createVNode("div", { class: "w-1/2 bg-[#1B3163]" })
                ]),
                createVNode("div", {
                  class: "absolute inset-0 opacity-[0.03]",
                  style: { "background-image": "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", "background-size": "40px 40px" }
                }),
                createVNode("div", {
                  class: "absolute inset-0 pointer-events-none",
                  style: { "background": "radial-gradient(ellipse at 50% 50%, rgba(61,175,196,0.12) 0%, transparent 65%)" }
                }),
                createVNode("div", { class: "relative max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "flex flex-col lg:flex-row items-center gap-0" }, [
                    createVNode("div", { class: "lg:w-5/12 flex justify-center lg:justify-end py-16 lg:py-12 lg:pr-12" }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode("div", {
                          class: "absolute -inset-6 rounded-3xl opacity-30",
                          style: { "background": "radial-gradient(circle, #3DAFC4 0%, transparent 70%)", "filter": "blur(24px)" }
                        }),
                        createVNode("div", { class: "absolute top-2 left-3 w-full h-full bg-[#3DAFC4]/20 rounded-xl blur-sm" }),
                        createVNode("div", { class: "absolute top-1 left-1.5 w-full h-full bg-white/5 rounded-xl" }),
                        createVNode("img", {
                          src: "/images/katalog-kapak.png",
                          alt: "4B Grup Ürün Kataloğu",
                          class: "relative z-10 w-64 sm:w-80 lg:w-72 xl:w-80 rounded-xl shadow-2xl",
                          style: { "box-shadow": "0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)" }
                        }),
                        createVNode("div", { class: "absolute -top-4 -right-4 z-20 w-16 h-16 bg-[#0E7A8C] rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-[#0e1e3d]" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5 text-white mb-0.5",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
                              "clip-rule": "evenodd"
                            })
                          ])),
                          createVNode("span", { class: "text-white text-[9px] font-black tracking-wide" }, "PDF")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "lg:w-7/12 py-16 lg:py-20 lg:pl-12 text-center lg:text-left" }, [
                      createVNode("h2", { class: "text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5" }, toDisplayString(unref(trans)("home.catalog_title1")), 1),
                      createVNode("p", { class: "text-white/55 text-[15px] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0" }, toDisplayString(unref(trans)("home.catalog_desc")), 1),
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" }, [
                        createVNode("a", {
                          href: "/files/katalog.pdf",
                          download: "",
                          class: "group inline-flex items-center justify-center gap-3 bg-[#0E7A8C] hover:bg-white text-white hover:text-[#1B3163] font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#3DAFC4]/20"
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
                              d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            })
                          ])),
                          createTextVNode(" " + toDisplayString(unref(trans)("home.catalog_download")), 1)
                        ]),
                        createVNode(unref(Link), {
                          href: "/urunler",
                          class: "inline-flex items-center justify-center gap-2.5 border-2 border-white/20 hover:border-[#3DAFC4] text-white font-bold text-sm uppercase tracking-wide px-8 py-4 rounded-xl hover:bg-[#3DAFC4]/10 transition-all duration-300"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(trans)("home.catalog_browse")) + " ", 1),
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4",
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
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-white py-24" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3" }, toDisplayString(unref(trans)("home.projects_label")), 1),
                      createVNode("h2", { class: "text-4xl font-extrabold text-[#0e1e3d]" }, toDisplayString(unref(trans)("home.projects_h")), 1)
                    ]),
                    createVNode(unref(Link), {
                      href: "/projeler",
                      class: "inline-flex items-center gap-2 text-[#0E7A8C] hover:text-[#1B3163] text-sm font-semibold transition-colors group flex-shrink-0"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(trans)("home.projects_all")) + " ", 1),
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 group-hover:translate-x-1 transition-transform",
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
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.recentProjects.length ? __props.recentProjects : defaultProjects.value, (project, i) => {
                      return openBlock(), createBlock(resolveDynamicComponent(project.slug ? unref(Link) : "div"), mergeProps({
                        key: project.id
                      }, { ref_for: true }, project.slug ? { href: `/projeler/${project.slug}` } : {}, { class: "group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-[#3DAFC4]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" }), {
                        default: withCtx(() => [
                          createVNode("div", { class: "aspect-[4/3] relative overflow-hidden bg-[#f4f5f6]" }, [
                            project.image_urls && project.image_urls[0] ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: project.image_urls[0],
                              alt: unref(field)(project, "title") || project.title,
                              loading: "lazy",
                              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "w-full h-full flex items-center justify-center",
                              style: `background: linear-gradient(135deg, ${["#1B3163", "#0e2a5c", "#163060"][i % 3]} 0%, #1e3a72 100%)`
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-20 h-20 text-white/10",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "0.75",
                                  d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                })
                              ]))
                            ], 4)),
                            createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
                            project.location ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "absolute top-4 right-4 flex items-center gap-1.5 bg-[#0E7A8C] rounded-full px-3 py-1.5 shadow-sm"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-3 h-3 text-white",
                                fill: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" })
                              ])),
                              createVNode("span", { class: "text-white text-[10px] font-bold tracking-wide" }, toDisplayString(unref(field)(project, "location") || project.location), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "p-6" }, [
                            createVNode("h3", { class: "font-extrabold text-[#0e1e3d] text-lg leading-tight mb-2 group-hover:text-[#0E7A8C] transition-colors" }, toDisplayString(unref(field)(project, "title") || project.title), 1),
                            createVNode("p", { class: "text-gray-500 text-sm leading-relaxed line-clamp-2" }, toDisplayString(unref(field)(project, "description") || project.description), 1)
                          ])
                        ]),
                        _: 2
                      }, 1040);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-[#f4f5f6] py-20 overflow-hidden relative" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 mb-12" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-end justify-between gap-4" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-4xl font-extrabold text-[#0e1e3d]" }, toDisplayString(unref(trans)("home.partners_section_h")), 1)
                    ])
                  ])
                ]),
                createVNode("div", {
                  class: "pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10",
                  style: { "background": "linear-gradient(to right, #f4f5f6, transparent)" }
                }),
                createVNode("div", {
                  class: "pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10",
                  style: { "background": "linear-gradient(to left, #f4f5f6, transparent)" }
                }),
                createVNode("div", { class: "marquee-container group/marquee mb-4" }, [
                  createVNode("div", { class: "marquee-track flex gap-4" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(2, (n) => {
                      return openBlock(), createBlock(Fragment, { key: n }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(displayClients.value, (partner) => {
                          return openBlock(), createBlock(resolveDynamicComponent(partner.website ? "a" : "div"), {
                            key: `${n}-${partner.id}`,
                            href: partner.website || void 0,
                            target: partner.website ? "_blank" : void 0,
                            rel: partner.website ? "noopener noreferrer" : void 0,
                            class: "flex-shrink-0 w-52 h-36 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl px-6 hover:border-[#3DAFC4]/60 hover:shadow-md transition-all duration-300 cursor-default"
                          }, {
                            default: withCtx(() => [
                              partner.logo_url ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: partner.logo_url,
                                alt: partner.name,
                                loading: "lazy",
                                class: "w-full h-24 object-contain transition-all duration-300"
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
                      ], 64);
                    }), 64))
                  ])
                ]),
                createVNode("div", { class: "marquee-container-reverse group/marquee2" }, [
                  createVNode("div", { class: "marquee-track-reverse flex gap-4" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(2, (n) => {
                      return openBlock(), createBlock(Fragment, { key: n }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(displayPartners.value, (partner) => {
                          return openBlock(), createBlock(resolveDynamicComponent(partner.website ? "a" : "div"), {
                            key: `r${n}-${partner.id}`,
                            href: partner.website || void 0,
                            target: partner.website ? "_blank" : void 0,
                            rel: partner.website ? "noopener noreferrer" : void 0,
                            class: "flex-shrink-0 w-52 h-32 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl px-6 hover:border-[#3DAFC4]/60 hover:shadow-md transition-all duration-300 cursor-default"
                          }, {
                            default: withCtx(() => [
                              partner.logo_url ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: partner.logo_url,
                                alt: partner.name,
                                loading: "lazy",
                                class: "w-full h-14 object-contain opacity-60 hover:opacity-100 transition-all duration-300"
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
                      ], 64);
                    }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-18adc7fd"]]);
export {
  Home as default
};
