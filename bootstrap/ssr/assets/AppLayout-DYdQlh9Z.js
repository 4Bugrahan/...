import { ref, onBeforeUnmount, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, useSSRContext, computed, onMounted, onUnmounted, createCommentVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { Link, usePage, Head } from "@inertiajs/vue3";
import { u as useLocale } from "./useLocale-14nRWKiE.js";
const _sfc_main$1 = {
  __name: "ProductSearch",
  __ssrInlineRender: true,
  setup(__props) {
    const { trans } = useLocale();
    const query = ref("");
    const results = ref([]);
    const loading = ref(false);
    const open = ref(false);
    const searched = ref(false);
    let debounceTimer = null;
    onBeforeUnmount(() => clearTimeout(debounceTimer));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full" }, _attrs))}><div class="relative"><svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"></path></svg><input${ssrRenderAttr("value", query.value)} type="text"${ssrRenderAttr("placeholder", unref(trans)("products.search_placeholder"))} class="w-full border border-gray-200 rounded-lg pl-10 pr-9 py-2.5 text-sm text-[#1B3163] bg-white focus:outline-none focus:ring-2 focus:ring-[#3DAFC4] focus:border-transparent transition-shadow">`);
      if (query.value) {
        _push(`<button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B3163]"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (open.value && query.value.trim().length > 0) {
        _push(`<div class="absolute z-30 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-96 overflow-y-auto">`);
        if (query.value.trim().length < 2) {
          _push(`<div class="px-4 py-4 text-sm text-gray-400 text-center">${ssrInterpolate(unref(trans)("products.search_hint"))}</div>`);
        } else if (loading.value) {
          _push(`<div class="px-4 py-4 text-sm text-gray-400 text-center"><svg class="w-4 h-4 animate-spin inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V2.5"></path></svg></div>`);
        } else if (results.value.length === 0 && searched.value) {
          _push(`<div class="px-4 py-4 text-sm text-gray-400 text-center">${ssrInterpolate(unref(trans)("products.search_no_results"))}</div>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(results.value, (product) => {
            _push(ssrRenderComponent(unref(Link), {
              key: product.id,
              href: `/urunler/${product.category_slug}/${product.slug}`,
              class: "flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden"${_scopeId}>`);
                  if (product.image) {
                    _push2(`<img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-contain"${_scopeId}>`);
                  } else {
                    _push2(`<svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId}></path></svg>`);
                  }
                  _push2(`</div><span class="text-sm font-medium text-[#1B3163] leading-snug"${_scopeId}>${ssrInterpolate(product.name)}</span>`);
                } else {
                  return [
                    createVNode("div", { class: "w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden" }, [
                      product.image ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: product.image,
                        alt: product.name,
                        class: "w-full h-full object-contain"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("svg", {
                        key: 1,
                        class: "w-5 h-5 text-gray-300",
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
                    createVNode("span", { class: "text-sm font-medium text-[#1B3163] leading-snug" }, toDisplayString(product.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ProductSearch.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AppLayout",
  __ssrInlineRender: true,
  props: {
    hideFloatingCta: { type: Boolean, default: false }
  },
  setup(__props) {
    const mobileOpen = ref(false);
    const kurumOpen = ref(false);
    const urunOpen = ref(false);
    const mobileUrunOpen = ref(false);
    const langOpen = ref(false);
    const headerSearchOpen = ref(false);
    const { locale, trans } = useLocale();
    const languages = [
      { code: "tr", label: "TR", name: "Türkçe", flag: "🇹🇷" },
      { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
      { code: "fr", label: "FR", name: "Français", flag: "🇫🇷" },
      { code: "de", label: "DE", name: "Deutsch", flag: "🇩🇪" },
      { code: "nl", label: "NL", name: "Nederlands", flag: "🇳🇱" }
    ];
    const currentLang = computed(() => languages.find((l) => l.code === locale.value) || languages[0]);
    const page = usePage();
    const categories = computed(() => page.props.navCategories || []);
    const seo = computed(() => page.props.seo || {});
    const ss = computed(() => page.props.siteSettings || {});
    const phone1 = computed(() => ss.value.phone1 || "+90 346 225 00 00");
    const phone2 = computed(() => ss.value.phone2 || "+90 535 660 00 60");
    const email = computed(() => ss.value.email || "info@4bgrup.com");
    const whatsapp = computed(() => ss.value.whatsapp || "905356600060");
    const address = computed(() => ss.value.address || "Sivas, Türkiye");
    const footerText = computed(() => ss.value.footer_text || "");
    const facebook = computed(() => ss.value.facebook || "");
    const instagram = computed(() => ss.value.instagram || "");
    const linkedin = computed(() => ss.value.linkedin || "");
    const phone1Tel = computed(() => "tel:" + phone1.value.replace(/\s/g, ""));
    const phone2Tel = computed(() => "tel:" + phone2.value.replace(/\s/g, ""));
    const emailHref = computed(() => "mailto:" + email.value);
    const whatsappUrl = computed(() => "https://wa.me/" + whatsapp.value.replace(/\D/g, ""));
    const showBackToTop = ref(false);
    function handleScroll() {
      showBackToTop.value = window.scrollY > 400;
    }
    function handleClickOutsideLang(e) {
      if (langOpen.value && !e.target.closest("[data-lang-switcher]")) {
        langOpen.value = false;
      }
      if (headerSearchOpen.value && !e.target.closest("[data-header-search]")) {
        headerSearchOpen.value = false;
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") headerSearchOpen.value = false;
    }
    onMounted(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("click", handleClickOutsideLang);
      document.addEventListener("keydown", handleEscape);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutsideLang);
      document.removeEventListener("keydown", handleEscape);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(seo.value.title || "4B Grup Endüstriyel Ticaret")}</title>`);
            if (seo.value.desc) {
              _push2(`<meta name="description"${ssrRenderAttr("content", seo.value.desc)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (seo.value.keywords) {
              _push2(`<meta name="keywords"${ssrRenderAttr("content", seo.value.keywords)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (seo.value.title) {
              _push2(`<meta property="og:title"${ssrRenderAttr("content", seo.value.title)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (seo.value.desc) {
              _push2(`<meta property="og:description"${ssrRenderAttr("content", seo.value.desc)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (seo.value.og_image) {
              _push2(`<meta property="og:image"${ssrRenderAttr("content", seo.value.og_image)}${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(seo.value.title || "4B Grup Endüstriyel Ticaret"), 1),
              seo.value.desc ? (openBlock(), createBlock("meta", {
                key: 0,
                name: "description",
                content: seo.value.desc
              }, null, 8, ["content"])) : createCommentVNode("", true),
              seo.value.keywords ? (openBlock(), createBlock("meta", {
                key: 1,
                name: "keywords",
                content: seo.value.keywords
              }, null, 8, ["content"])) : createCommentVNode("", true),
              seo.value.title ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:title",
                content: seo.value.title
              }, null, 8, ["content"])) : createCommentVNode("", true),
              seo.value.desc ? (openBlock(), createBlock("meta", {
                key: 3,
                property: "og:description",
                content: seo.value.desc
              }, null, 8, ["content"])) : createCommentVNode("", true),
              seo.value.og_image ? (openBlock(), createBlock("meta", {
                key: 4,
                property: "og:image",
                content: seo.value.og_image
              }, null, 8, ["content"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-screen flex flex-col"><div class="bg-[#1B3163] text-white text-xs py-2.5 hidden md:block"><div class="max-w-7xl mx-auto px-6 flex justify-between items-center"><div class="flex items-center gap-4 text-white/55"><a${ssrRenderAttr("href", phone1Tel.value)} class="flex items-center gap-2"><span class="w-6 h-6 rounded-md bg-[#3DAFC4]/15 border border-[#3DAFC4]/25 flex items-center justify-center"><svg class="w-3 h-3 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></span> ${ssrInterpolate(phone1.value)}</a><span class="w-px h-3.5 bg-white/15"></span><a${ssrRenderAttr("href", whatsappUrl.value)} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2"><span class="w-6 h-6 rounded-md bg-[#25D366]/15 border border-[#25D366]/25 flex items-center justify-center"><svg class="w-3 h-3 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg></span> ${ssrInterpolate(phone2.value)}</a><span class="w-px h-3.5 bg-white/15"></span><a${ssrRenderAttr("href", emailHref.value)} class="flex items-center gap-2"><span class="w-6 h-6 rounded-md bg-[#3DAFC4]/15 border border-[#3DAFC4]/25 flex items-center justify-center"><svg class="w-3 h-3 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></span> ${ssrInterpolate(email.value)}</a></div><div class="relative" data-lang-switcher><button aria-haspopup="listbox"${ssrRenderAttr("aria-expanded", langOpen.value)}${ssrRenderAttr("aria-label", unref(trans)("common.lang_switcher_aria"))} class="flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white px-2.5 py-1 rounded-md hover:bg-white/10 transition-all duration-200"><span class="text-base leading-none">${ssrInterpolate(currentLang.value.flag)}</span><span>${ssrInterpolate(currentLang.value.label)}</span><svg class="${ssrRenderClass([langOpen.value ? "rotate-180" : "", "w-3 h-3 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg></button><ul role="listbox" class="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-[60]" style="${ssrRenderStyle(langOpen.value ? null : { display: "none" })}"><!--[-->`);
      ssrRenderList(languages, (lang) => {
        _push(`<li role="option"${ssrRenderAttr("aria-selected", unref(locale) === lang.code)}><button class="${ssrRenderClass([unref(locale) === lang.code ? "bg-[#F4F6F9] text-[#0E7A8C] font-bold" : "text-gray-600 hover:bg-[#F4F6F9]", "w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors"])}"><span class="text-base leading-none">${ssrInterpolate(lang.flag)}</span><span>${ssrInterpolate(lang.name)}</span></button></li>`);
      });
      _push(`<!--]--></ul></div></div></div><header class="bg-white sticky top-0 z-50 shadow-md"><div class="max-w-7xl mx-auto px-6"><div class="flex items-center justify-between h-[70px]">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex-shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/images/logo.png" alt="4B Grup Endüstriyel Ticaret" class="h-12 w-auto"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: "/images/logo.png",
                alt: "4B Grup Endüstriyel Ticaret",
                class: "h-12 w-auto"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden lg:flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("nav.home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("nav.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative"><button class="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors">${ssrInterpolate(unref(trans)("nav.corporate"))} <svg class="${ssrRenderClass([kurumOpen.value ? "rotate-180" : "", "w-3.5 h-3.5 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg></button><div class="absolute top-full left-0 w-52 bg-white shadow-xl border-t-2 border-[#0E7A8C] z-50 py-2 rounded-b-xl" style="${ssrRenderStyle(kurumOpen.value ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/kurumsal",
        class: "flex items-center gap-2 px-5 py-2.5 text-sm text-gray-600 hover:bg-[#F4F6F9] hover:text-[#0E7A8C] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-3.5 h-3.5 text-[#0E7A8C]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.about"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-3.5 h-3.5 text-[#0E7A8C]/50",
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
              ])),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.about")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/referanslar",
        class: "flex items-center gap-2 px-5 py-2.5 text-sm text-gray-600 hover:bg-[#F4F6F9] hover:text-[#0E7A8C] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-3.5 h-3.5 text-[#0E7A8C]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.references"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-3.5 h-3.5 text-[#0E7A8C]/50",
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
              ])),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.references")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/kvkk",
        class: "flex items-center gap-2 px-5 py-2.5 text-sm text-gray-600 hover:bg-[#F4F6F9] hover:text-[#0E7A8C] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-3.5 h-3.5 text-[#0E7A8C]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.kvkk"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-3.5 h-3.5 text-[#0E7A8C]/50",
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
              ])),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.kvkk")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="relative">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/urunler",
        class: "flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("nav.products"))} <svg class="${ssrRenderClass([urunOpen.value ? "rotate-180" : "", "w-3.5 h-3.5 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("nav.products")) + " ", 1),
              (openBlock(), createBlock("svg", {
                class: ["w-3.5 h-3.5 transition-transform duration-200", urunOpen.value ? "rotate-180" : ""],
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2.5",
                  d: "M19 9l-7 7-7-7"
                })
              ], 2))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="absolute top-full left-0 w-80 bg-white shadow-xl border-t-2 border-[#0E7A8C] z-50 p-4 rounded-b-xl" style="${ssrRenderStyle(urunOpen.value ? null : { display: "none" })}"><p class="text-[10px] font-bold tracking-widest text-[#0E7A8C] uppercase mb-3 px-1">${ssrInterpolate(unref(trans)("nav.product_cats"))}</p><div class="grid grid-cols-2 gap-0.5"><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(ssrRenderComponent(unref(Link), {
          key: cat.slug,
          href: `/urunler/${cat.slug}`,
          class: "group flex items-center justify-between gap-2 pl-3 pr-2 py-2 text-xs text-gray-600 hover:bg-[#F4F6F9] hover:text-[#0E7A8C] rounded-lg transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(cat.name)}</span><svg class="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(cat.name), 1),
                (openBlock(), createBlock("svg", {
                  class: "w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0",
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
        }, _parent));
      });
      _push(`<!--]--></div><div class="mt-3 pt-3 border-t border-gray-100">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/urunler",
        class: "flex items-center gap-2 text-sm font-semibold text-[#0E7A8C] hover:text-[#1B3163] transition-colors px-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("nav.all_products"))} <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("nav.all_products")) + " ", 1),
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
                  d: "M9 5l7 7-7 7"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/projeler",
        class: "px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("nav.projects"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("nav.projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/uretim",
        class: "px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("nav.production"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("nav.production")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/iletisim",
        class: "px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(trans)("nav.contact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(trans)("nav.contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex items-center gap-3"><a${ssrRenderAttr("href", phone1Tel.value)} class="hidden lg:flex items-center gap-3 bg-[#1B3163] hover:bg-[#0E7A8C] text-white pl-3 pr-5 py-2 rounded-xl transition-all duration-300 group border border-[#0E7A8C]/25 hover:border-[#0E7A8C]"><div class="relative flex-shrink-0"><div class="w-9 h-9 rounded-lg bg-[#0E7A8C] group-hover:bg-white/25 flex items-center justify-center transition-colors duration-300"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div><span class="absolute inset-0 rounded-lg border-2 border-[#0E7A8C] animate-ping opacity-30 group-hover:opacity-0 transition-opacity"></span></div><div class="leading-tight"><div class="text-[10px] text-white/50 group-hover:text-white/80 font-semibold tracking-[2px] uppercase transition-colors">${ssrInterpolate(unref(trans)("nav.call_now"))}</div><div class="text-sm font-bold tracking-tight">${ssrInterpolate(phone1.value)}</div></div></a><div class="relative" data-header-search><button${ssrRenderAttr("aria-label", unref(trans)("common.search_aria"))} aria-haspopup="true"${ssrRenderAttr("aria-expanded", headerSearchOpen.value)} class="p-2 text-gray-500 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"></path></svg></button><div id="header-search-input" class="absolute right-0 top-full mt-2 w-72 sm:w-80 z-[60]" style="${ssrRenderStyle(headerSearchOpen.value ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></div><button${ssrRenderAttr("aria-label", mobileOpen.value ? unref(trans)("common.menu_close") : unref(trans)("common.menu_open"))}${ssrRenderAttr("aria-expanded", mobileOpen.value)} aria-controls="mobile-menu" class="lg:hidden p-2 text-gray-600 hover:text-[#1B3163] transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">`);
      if (!mobileOpen.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`);
      }
      _push(`</svg></button></div></div></div><div id="mobile-menu" role="navigation"${ssrRenderAttr("aria-label", unref(trans)("common.mobile_nav_aria"))} class="lg:hidden border-t border-gray-100 bg-white shadow-xl" style="${ssrRenderStyle(mobileOpen.value ? null : { display: "none" })}"><div class="px-4 py-3 space-y-0.5">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all",
        onClick: ($event) => mobileOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.home"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 text-[#0E7A8C]",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                })
              ])),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/kurumsal",
        class: "flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all",
        onClick: ($event) => mobileOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.corporate"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 text-[#0E7A8C]",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                })
              ])),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.corporate")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/referanslar",
        class: "flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all",
        onClick: ($event) => mobileOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.references"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 text-[#0E7A8C]",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                })
              ])),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.references")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div><div class="flex items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/urunler",
        class: "flex-1 flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all",
        onClick: ($event) => mobileOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.products"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 text-[#0E7A8C]",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M4 6h16M4 10h16M4 14h16M4 18h16"
                })
              ])),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.products")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button${ssrRenderAttr("aria-label", unref(trans)("nav.product_cats"))}${ssrRenderAttr("aria-expanded", mobileUrunOpen.value)} class="p-3 text-gray-400 hover:text-[#0E7A8C] flex-shrink-0"><svg class="${ssrRenderClass([mobileUrunOpen.value ? "rotate-180" : "", "w-4 h-4 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button></div><div class="pl-10 mt-1 space-y-0.5" style="${ssrRenderStyle(mobileUrunOpen.value ? null : { display: "none" })}"><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(ssrRenderComponent(unref(Link), {
          key: cat.slug,
          href: `/urunler/${cat.slug}`,
          class: "flex items-center py-2 pl-3 pr-3 text-sm text-gray-500 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all",
          onClick: ($event) => mobileOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(cat.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(cat.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/projeler",
        class: "flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all",
        onClick: ($event) => mobileOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.projects"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 text-[#0E7A8C]",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                })
              ])),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/uretim",
        class: "flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all",
        onClick: ($event) => mobileOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25m0-9v9l-9-5.25m0 0v-9l9 5.25M3 7.5l9 5.25"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.production"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 text-[#0E7A8C]",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25m0-9v9l-9-5.25m0 0v-9l9 5.25M3 7.5l9 5.25"
                })
              ])),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.production")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/iletisim",
        class: "flex items-center gap-3 py-3 px-3 text-sm font-semibold text-gray-700 hover:text-[#0E7A8C] hover:bg-[#F4F6F9] rounded-lg transition-all",
        onClick: ($event) => mobileOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 text-[#0E7A8C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg> ${ssrInterpolate(unref(trans)("nav.contact"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 text-[#0E7A8C]",
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
      _push(`<div class="flex items-center gap-2 px-3 py-2 border-t border-gray-100 mt-1 flex-wrap"><span class="text-xs text-gray-500 font-semibold w-full">${ssrInterpolate(unref(trans)("common.lang_label"))}</span><!--[-->`);
      ssrRenderList(languages, (lang) => {
        _push(`<button class="${ssrRenderClass([unref(locale) === lang.code ? "bg-[#1B3163] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200", "flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg transition-all"])}"><span class="text-sm leading-none">${ssrInterpolate(lang.flag)}</span>${ssrInterpolate(lang.label)}</button>`);
      });
      _push(`<!--]--></div><div class="pt-2 pb-1"><a${ssrRenderAttr("href", phone1Tel.value)} class="flex items-center justify-center gap-2 w-full bg-[#0E7A8C] text-white py-3 rounded-xl text-sm font-bold"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> ${ssrInterpolate(phone1.value)}</a></div></div></div></header><main class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><div class="${ssrRenderClass([__props.hideFloatingCta ? "max-lg:hidden flex" : "flex", "fixed left-0 bottom-6 z-50 flex-col items-start gap-2.5"])}" style="${ssrRenderStyle(showBackToTop.value ? null : { display: "none" })}"><a${ssrRenderAttr("href", whatsappUrl.value)} target="_blank" rel="noopener noreferrer"${ssrRenderAttr("aria-label", unref(trans)("common.whatsapp_aria"))} class="flex items-center gap-2.5 bg-[#1B3163] hover:bg-[#0E7A8C] hover:pl-5 hover:translate-x-1 text-white pl-4 pr-1.5 py-1.5 rounded-r-full shadow-lg shadow-black/10 transition-all duration-300"><span class="text-sm font-bold whitespace-nowrap">WhatsApp</span><span class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0"><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg></span></a><a${ssrRenderAttr("href", phone1Tel.value)}${ssrRenderAttr("aria-label", unref(trans)("common.call_us_aria"))} class="flex items-center gap-2.5 bg-[#1B3163] hover:bg-[#0E7A8C] hover:pl-5 hover:translate-x-1 text-white pl-4 pr-1.5 py-1.5 rounded-r-full shadow-lg shadow-black/10 transition-all duration-300"><span class="text-sm font-bold whitespace-nowrap">${ssrInterpolate(unref(trans)("common.call_us"))}</span><span class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></span></a></div><button${ssrRenderAttr("aria-label", unref(trans)("common.back_to_top_aria"))} class="${ssrRenderClass([__props.hideFloatingCta ? "bottom-24 lg:bottom-6" : "bottom-6", "fixed right-6 z-50 w-12 h-12 rounded-full bg-[#1B3163] hover:bg-[#0E7A8C] text-white shadow-lg shadow-[#1B3163]/30 flex items-center justify-center transition-all duration-300 hover:scale-110"])}" style="${ssrRenderStyle(showBackToTop.value ? null : { display: "none" })}"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg></button><footer class="bg-[#0e1e3d] text-white"><div class="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-4 gap-10"><div class="md:col-span-1"><img src="/images/logo-dark.png" alt="4B Grup" class="h-10 w-auto mb-5 opacity-90"><p class="text-white/45 text-sm leading-relaxed mb-6">${ssrInterpolate(footerText.value || unref(trans)("footer.about_text"))}</p><div class="flex items-center gap-2">`);
      if (facebook.value) {
        _push(`<a${ssrRenderAttr("href", facebook.value)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200 group"><svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg></a>`);
      } else {
        _push(`<!---->`);
      }
      if (instagram.value) {
        _push(`<a${ssrRenderAttr("href", instagram.value)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:border-transparent transition-all duration-200 group"><svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg></a>`);
      } else {
        _push(`<!---->`);
      }
      if (linkedin.value) {
        _push(`<a${ssrRenderAttr("href", linkedin.value)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-200 group"><svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><h3 class="text-xs font-bold tracking-[3px] text-[#3DAFC4] uppercase mb-6">${ssrInterpolate(unref(trans)("footer.quick_links"))}</h3><ul class="space-y-3"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"${_scopeId}></span> ${ssrInterpolate(unref(trans)("nav.home"))}`);
          } else {
            return [
              createVNode("span", { class: "w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300" }),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/kurumsal",
        class: "flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"${_scopeId}></span> ${ssrInterpolate(unref(trans)("nav.corporate"))}`);
          } else {
            return [
              createVNode("span", { class: "w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300" }),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.corporate")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/urunler",
        class: "flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"${_scopeId}></span> ${ssrInterpolate(unref(trans)("nav.products"))}`);
          } else {
            return [
              createVNode("span", { class: "w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300" }),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.products")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/projeler",
        class: "flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"${_scopeId}></span> ${ssrInterpolate(unref(trans)("nav.projects"))}`);
          } else {
            return [
              createVNode("span", { class: "w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300" }),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/uretim",
        class: "flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"${_scopeId}></span> ${ssrInterpolate(unref(trans)("nav.production"))}`);
          } else {
            return [
              createVNode("span", { class: "w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300" }),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.production")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/iletisim",
        class: "flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"${_scopeId}></span> ${ssrInterpolate(unref(trans)("nav.contact"))}`);
          } else {
            return [
              createVNode("span", { class: "w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300" }),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/referanslar",
        class: "flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"${_scopeId}></span> ${ssrInterpolate(unref(trans)("nav.references"))}`);
          } else {
            return [
              createVNode("span", { class: "w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300" }),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.references")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/kvkk",
        class: "flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"${_scopeId}></span> ${ssrInterpolate(unref(trans)("nav.kvkk"))}`);
          } else {
            return [
              createVNode("span", { class: "w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300" }),
              createTextVNode(" " + toDisplayString(unref(trans)("nav.kvkk")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h3 class="text-xs font-bold tracking-[3px] text-[#3DAFC4] uppercase mb-6">${ssrInterpolate(unref(trans)("footer.product_cats"))}</h3><ul class="space-y-3"><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/urunler/${cat.slug}`,
          class: "flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-all group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300"${_scopeId}></span> ${ssrInterpolate(cat.name)}`);
            } else {
              return [
                createVNode("span", { class: "w-0 h-px bg-[#3DAFC4] group-hover:w-3 transition-all duration-300" }),
                createTextVNode(" " + toDisplayString(cat.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div><h3 class="text-xs font-bold tracking-[3px] text-[#3DAFC4] uppercase mb-6">${ssrInterpolate(unref(trans)("footer.contact"))}</h3><ul class="space-y-5"><li class="flex items-start gap-3"><div class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0"><svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div><div><a${ssrRenderAttr("href", phone1Tel.value)} class="block text-sm text-white/55 hover:text-white transition-colors">${ssrInterpolate(phone1.value)}</a><a${ssrRenderAttr("href", phone2Tel.value)} class="block text-sm text-white/55 hover:text-white transition-colors mt-1">${ssrInterpolate(phone2.value)}</a></div></li><li class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0"><svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><a${ssrRenderAttr("href", emailHref.value)} class="text-sm text-white/55 hover:text-white transition-colors">${ssrInterpolate(email.value)}</a></li><li class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0"><svg class="w-4 h-4 text-[#3DAFC4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div><span class="text-sm text-white/55">${ssrInterpolate(address.value)}</span></li></ul></div></div><div class="border-t border-white/8 py-5"><div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2"><p class="text-white/25 text-xs">© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} 4B Grup Endüstriyel Ticaret. ${ssrInterpolate(unref(trans)("footer.rights"))}</p><p class="text-white/20 text-xs">${ssrInterpolate(unref(trans)("footer.tagline"))}</p></div></div></footer></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AppLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
