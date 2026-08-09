import { computed, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => page.props.auth?.user);
    const unreadContacts = computed(() => page.props.unreadContacts || 0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#F4F6F9] flex" }, _attrs))}><aside class="w-60 bg-[#1B3163] text-white flex flex-col"><div class="px-5 py-5 border-b border-white/10"><div class="bg-white rounded-lg px-3 py-2.5 inline-block"><img src="/images/logo.png" alt="4B Grup" class="h-8 w-auto"></div></div><nav class="flex-1 py-4 flex flex-col gap-1 px-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/products",
        class: "px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ürünler `);
          } else {
            return [
              createTextVNode(" Ürünler ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/categories",
        class: "px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kategoriler `);
          } else {
            return [
              createTextVNode(" Kategoriler ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/projects",
        class: "px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Projeler `);
          } else {
            return [
              createTextVNode(" Projeler ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/partners",
        class: "px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Markalar / Tedarikçiler `);
          } else {
            return [
              createTextVNode(" Markalar / Tedarikçiler ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/about",
        class: "px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hakkımızda `);
          } else {
            return [
              createTextVNode(" Hakkımızda ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/contacts",
        class: "px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors flex items-center justify-between"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>İletişim Mesajları</span>`);
            if (unreadContacts.value > 0) {
              _push2(`<span class="bg-[#0E7A8C] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center"${_scopeId}>${ssrInterpolate(unreadContacts.value)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("span", null, "İletişim Mesajları"),
              unreadContacts.value > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "bg-[#0E7A8C] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center"
              }, toDisplayString(unreadContacts.value), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="px-5 py-4 border-t border-white/10 text-xs text-white/60"><div class="mb-2">${ssrInterpolate(user.value?.name)}</div><button class="text-[#3DAFC4] font-semibold hover:underline">Çıkış Yap</button></div></aside><main class="flex-1 min-w-0"><div class="max-w-6xl mx-auto px-6 py-8">`);
      if (_ctx.$page.props.flash?.success) {
        _push(`<div class="mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-700 text-sm font-semibold">${ssrInterpolate(_ctx.$page.props.flash.success)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.flash?.error) {
        _push(`<div class="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm font-semibold">${ssrInterpolate(_ctx.$page.props.flash.error)}</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
