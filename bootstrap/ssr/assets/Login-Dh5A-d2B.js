import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Admin Girişi | 4B Grup</title>`);
          } else {
            return [
              createVNode("title", null, "Admin Girişi | 4B Grup")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-screen bg-[#1B3163] flex items-center justify-center px-4"><div class="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8"><h1 class="text-xl font-bold text-[#1B3163] mb-1">4B Grup Panel</h1><p class="text-sm text-gray-500 mb-6">Yönetim paneline giriş yapın.</p><form class="space-y-4"><div><label class="block text-sm font-semibold text-gray-700 mb-1">E-posta</label><input${ssrRenderAttr("value", unref(form).email)} type="email" required autofocus class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]">`);
      if (unref(form).errors.email) {
        _push(`<p class="text-red-600 text-xs mt-1">${ssrInterpolate(unref(form).errors.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-semibold text-gray-700 mb-1">Şifre</label><input${ssrRenderAttr("value", unref(form).password)} type="password" required class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DAFC4]"></div><label class="flex items-center gap-2 text-sm text-gray-600"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).remember) ? ssrLooseContain(unref(form).remember, null) : unref(form).remember) ? " checked" : ""} type="checkbox" class="rounded border-gray-300"> Beni hatırla </label><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full bg-[#0E7A8C] hover:bg-[#0c6a7a] text-white font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">${ssrInterpolate(unref(form).processing ? "Giriş yapılıyor..." : "Giriş Yap")}</button></form></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
