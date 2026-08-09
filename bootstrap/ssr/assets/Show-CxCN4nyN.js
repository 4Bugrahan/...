import { unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-DpQUlKjn.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    contact: Object
  },
  setup(__props) {
    const props = __props;
    function destroy() {
      if (confirm(`"${props.contact.name}" adlı kişinin mesajını silmek istediğine emin misin?`)) {
        router.delete(`/admin/contacts/${props.contact.id}`);
      }
    }
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(__props.contact.name)} | İletişim Mesajı | Admin</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.contact.name) + " | İletişim Mesajı | Admin", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/admin/contacts",
              class: "text-xs font-semibold text-gray-400 hover:text-[#0E7A8C]"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`← İletişim Mesajları`);
                } else {
                  return [
                    createTextVNode("← İletişim Mesajları")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-xl font-bold text-[#1B3163] mt-1"${_scopeId}>${ssrInterpolate(__props.contact.name)}</h1></div><button class="text-red-500 font-semibold text-sm border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50"${_scopeId}> Sil </button></div><div class="bg-white rounded-xl shadow-sm p-6 max-w-2xl"${_scopeId}><dl class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 pb-6 border-b border-gray-100"${_scopeId}><div${_scopeId}><dt class="text-xs font-semibold text-gray-400 uppercase mb-1"${_scopeId}>Ad Soyad</dt><dd class="text-sm text-gray-800 font-semibold"${_scopeId}>${ssrInterpolate(__props.contact.name)}</dd></div><div${_scopeId}><dt class="text-xs font-semibold text-gray-400 uppercase mb-1"${_scopeId}>Tarih</dt><dd class="text-sm text-gray-800"${_scopeId}>${ssrInterpolate(formatDate(__props.contact.created_at))}</dd></div><div${_scopeId}><dt class="text-xs font-semibold text-gray-400 uppercase mb-1"${_scopeId}>E-posta</dt><dd class="text-sm"${_scopeId}><a${ssrRenderAttr("href", `mailto:${__props.contact.email}`)} class="text-[#0E7A8C] font-semibold hover:underline"${_scopeId}>${ssrInterpolate(__props.contact.email)}</a></dd></div><div${_scopeId}><dt class="text-xs font-semibold text-gray-400 uppercase mb-1"${_scopeId}>Telefon</dt><dd class="text-sm"${_scopeId}>`);
            if (__props.contact.phone) {
              _push2(`<a${ssrRenderAttr("href", `tel:${__props.contact.phone}`)} class="text-[#0E7A8C] font-semibold hover:underline"${_scopeId}>${ssrInterpolate(__props.contact.phone)}</a>`);
            } else {
              _push2(`<span class="text-gray-400"${_scopeId}>—</span>`);
            }
            _push2(`</dd></div></dl><div${_scopeId}><dt class="text-xs font-semibold text-gray-400 uppercase mb-2"${_scopeId}>Mesaj</dt><dd class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(__props.contact.message)}</dd></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                createVNode("div", null, [
                  createVNode(unref(Link), {
                    href: "/admin/contacts",
                    class: "text-xs font-semibold text-gray-400 hover:text-[#0E7A8C]"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("← İletişim Mesajları")
                    ]),
                    _: 1
                  }),
                  createVNode("h1", { class: "text-xl font-bold text-[#1B3163] mt-1" }, toDisplayString(__props.contact.name), 1)
                ]),
                createVNode("button", {
                  onClick: destroy,
                  class: "text-red-500 font-semibold text-sm border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50"
                }, " Sil ")
              ]),
              createVNode("div", { class: "bg-white rounded-xl shadow-sm p-6 max-w-2xl" }, [
                createVNode("dl", { class: "grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 pb-6 border-b border-gray-100" }, [
                  createVNode("div", null, [
                    createVNode("dt", { class: "text-xs font-semibold text-gray-400 uppercase mb-1" }, "Ad Soyad"),
                    createVNode("dd", { class: "text-sm text-gray-800 font-semibold" }, toDisplayString(__props.contact.name), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("dt", { class: "text-xs font-semibold text-gray-400 uppercase mb-1" }, "Tarih"),
                    createVNode("dd", { class: "text-sm text-gray-800" }, toDisplayString(formatDate(__props.contact.created_at)), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("dt", { class: "text-xs font-semibold text-gray-400 uppercase mb-1" }, "E-posta"),
                    createVNode("dd", { class: "text-sm" }, [
                      createVNode("a", {
                        href: `mailto:${__props.contact.email}`,
                        class: "text-[#0E7A8C] font-semibold hover:underline"
                      }, toDisplayString(__props.contact.email), 9, ["href"])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("dt", { class: "text-xs font-semibold text-gray-400 uppercase mb-1" }, "Telefon"),
                    createVNode("dd", { class: "text-sm" }, [
                      __props.contact.phone ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: `tel:${__props.contact.phone}`,
                        class: "text-[#0E7A8C] font-semibold hover:underline"
                      }, toDisplayString(__props.contact.phone), 9, ["href"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-gray-400"
                      }, "—"))
                    ])
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("dt", { class: "text-xs font-semibold text-gray-400 uppercase mb-2" }, "Mesaj"),
                  createVNode("dd", { class: "text-sm text-gray-700 leading-relaxed whitespace-pre-wrap" }, toDisplayString(__props.contact.message), 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Contacts/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
