import { jsxs as B, jsx as v, Fragment as vs } from "react/jsx-runtime";
import * as b from "react";
import W, { forwardRef as ln, createContext as Ze, useContext as Ce, useState as ee, useEffect as ie, useLayoutEffect as ys, useRef as ne, useMemo as ve, Fragment as ke, isValidElement as bs, cloneElement as ws, createElement as xs, useReducer as _s, createRef as ks, useCallback as Et } from "react";
import { createPortal as Es } from "react-dom";
var Jt = (e) => e.type === "checkbox", ht = (e) => e instanceof Date, ye = (e) => e == null;
const ma = (e) => typeof e == "object";
var le = (e) => !ye(e) && !Array.isArray(e) && ma(e) && !ht(e), Cs = (e) => le(e) && e.target ? Jt(e.target) ? e.target.checked : e.target.value : e, Ns = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, Ss = (e, t) => e.has(Ns(t)), Ts = (e) => {
  const t = e.constructor && e.constructor.prototype;
  return le(t) && t.hasOwnProperty("isPrototypeOf");
}, on = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function pe(e) {
  let t;
  const r = Array.isArray(e), n = typeof FileList < "u" ? e instanceof FileList : !1;
  if (e instanceof Date)
    t = new Date(e);
  else if (e instanceof Set)
    t = new Set(e);
  else if (!(on && (e instanceof Blob || n)) && (r || le(e)))
    if (t = r ? [] : {}, !r && !Ts(e))
      t = e;
    else
      for (const a in e)
        e.hasOwnProperty(a) && (t[a] = pe(e[a]));
  else
    return e;
  return t;
}
var kr = (e) => Array.isArray(e) ? e.filter(Boolean) : [], ce = (e) => e === void 0, V = (e, t, r) => {
  if (!t || !le(e))
    return r;
  const n = kr(t.split(/[,[\].]+?/)).reduce((a, s) => ye(a) ? a : a[s], e);
  return ce(n) || n === e ? ce(e[t]) ? r : e[t] : n;
}, je = (e) => typeof e == "boolean", un = (e) => /^\w*$/.test(e), pa = (e) => kr(e.replace(/["|']|\]/g, "").split(/\.|\[/)), te = (e, t, r) => {
  let n = -1;
  const a = un(t) ? [t] : pa(t), s = a.length, i = s - 1;
  for (; ++n < s; ) {
    const l = a[n];
    let o = r;
    if (n !== i) {
      const u = e[l];
      o = le(u) || Array.isArray(u) ? u : isNaN(+a[n + 1]) ? {} : [];
    }
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return;
    e[l] = o, e = e[l];
  }
};
const Rn = {
  BLUR: "blur",
  FOCUS_OUT: "focusout"
}, Le = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, ze = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
};
W.createContext(null);
var As = (e, t, r, n = !0) => {
  const a = {
    defaultValues: t._defaultValues
  };
  for (const s in e)
    Object.defineProperty(a, s, {
      get: () => {
        const i = s;
        return t._proxyFormState[i] !== Le.all && (t._proxyFormState[i] = !n || Le.all), e[i];
      }
    });
  return a;
};
const Fs = typeof window < "u" ? b.useLayoutEffect : b.useEffect;
var Be = (e) => typeof e == "string", Rs = (e, t, r, n, a) => Be(e) ? (n && t.watch.add(e), V(r, e, a)) : Array.isArray(e) ? e.map((s) => (n && t.watch.add(s), V(r, s))) : (n && (t.watchAll = !0), r), ga = (e, t, r, n, a) => t ? {
  ...r[e],
  types: {
    ...r[e] && r[e].types ? r[e].types : {},
    [n]: a || !0
  }
} : {}, qt = (e) => Array.isArray(e) ? e : [e], On = () => {
  let e = [];
  return {
    get observers() {
      return e;
    },
    next: (a) => {
      for (const s of e)
        s.next && s.next(a);
    },
    subscribe: (a) => (e.push(a), {
      unsubscribe: () => {
        e = e.filter((s) => s !== a);
      }
    }),
    unsubscribe: () => {
      e = [];
    }
  };
}, Wr = (e) => ye(e) || !ma(e);
function nt(e, t) {
  if (Wr(e) || Wr(t))
    return e === t;
  if (ht(e) && ht(t))
    return e.getTime() === t.getTime();
  const r = Object.keys(e), n = Object.keys(t);
  if (r.length !== n.length)
    return !1;
  for (const a of r) {
    const s = e[a];
    if (!n.includes(a))
      return !1;
    if (a !== "ref") {
      const i = t[a];
      if (ht(s) && ht(i) || le(s) && le(i) || Array.isArray(s) && Array.isArray(i) ? !nt(s, i) : s !== i)
        return !1;
    }
  }
  return !0;
}
var we = (e) => le(e) && !Object.keys(e).length, cn = (e) => e.type === "file", Pe = (e) => typeof e == "function", cr = (e) => {
  if (!on)
    return !1;
  const t = e ? e.ownerDocument : 0;
  return e instanceof (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement);
}, va = (e) => e.type === "select-multiple", dn = (e) => e.type === "radio", Os = (e) => dn(e) || Jt(e), Pr = (e) => cr(e) && e.isConnected;
function $s(e, t) {
  const r = t.slice(0, -1).length;
  let n = 0;
  for (; n < r; )
    e = ce(e) ? n++ : e[t[n++]];
  return e;
}
function Ls(e) {
  for (const t in e)
    if (e.hasOwnProperty(t) && !ce(e[t]))
      return !1;
  return !0;
}
function de(e, t) {
  const r = Array.isArray(t) ? t : un(t) ? [t] : pa(t), n = r.length === 1 ? e : $s(e, r), a = r.length - 1, s = r[a];
  return n && delete n[s], a !== 0 && (le(n) && we(n) || Array.isArray(n) && Ls(n)) && de(e, r.slice(0, -1)), e;
}
var ya = (e) => {
  for (const t in e)
    if (Pe(e[t]))
      return !0;
  return !1;
};
function dr(e, t = {}) {
  const r = Array.isArray(e);
  if (le(e) || r)
    for (const n in e)
      Array.isArray(e[n]) || le(e[n]) && !ya(e[n]) ? (t[n] = Array.isArray(e[n]) ? [] : {}, dr(e[n], t[n])) : ye(e[n]) || (t[n] = !0);
  return t;
}
function ba(e, t, r) {
  const n = Array.isArray(e);
  if (le(e) || n)
    for (const a in e)
      Array.isArray(e[a]) || le(e[a]) && !ya(e[a]) ? ce(t) || Wr(r[a]) ? r[a] = Array.isArray(e[a]) ? dr(e[a], []) : { ...dr(e[a]) } : ba(e[a], ye(t) ? {} : t[a], r[a]) : r[a] = !nt(e[a], t[a]);
  return r;
}
var Mt = (e, t) => ba(e, t, dr(t));
const $n = {
  value: !1,
  isValid: !1
}, Ln = { value: !0, isValid: !0 };
var wa = (e) => {
  if (Array.isArray(e)) {
    if (e.length > 1) {
      const t = e.filter((r) => r && r.checked && !r.disabled).map((r) => r.value);
      return { value: t, isValid: !!t.length };
    }
    return e[0].checked && !e[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      e[0].attributes && !ce(e[0].attributes.value) ? ce(e[0].value) || e[0].value === "" ? Ln : { value: e[0].value, isValid: !0 } : Ln
    ) : $n;
  }
  return $n;
}, xa = (e, { valueAsNumber: t, valueAsDate: r, setValueAs: n }) => ce(e) ? e : t ? e === "" ? NaN : e && +e : r && Be(e) ? new Date(e) : n ? n(e) : e;
const Pn = {
  isValid: !1,
  value: null
};
var _a = (e) => Array.isArray(e) ? e.reduce((t, r) => r && r.checked && !r.disabled ? {
  isValid: !0,
  value: r.value
} : t, Pn) : Pn;
function Dn(e) {
  const t = e.ref;
  return cn(t) ? t.files : dn(t) ? _a(e.refs).value : va(t) ? [...t.selectedOptions].map(({ value: r }) => r) : Jt(t) ? wa(e.refs).value : xa(ce(t.value) ? e.ref.value : t.value, e);
}
var Ps = (e, t, r, n) => {
  const a = {};
  for (const s of e) {
    const i = V(t, s);
    i && te(a, s, i._f);
  }
  return {
    criteriaMode: r,
    names: [...e],
    fields: a,
    shouldUseNativeValidation: n
  };
}, fr = (e) => e instanceof RegExp, jt = (e) => ce(e) ? e : fr(e) ? e.source : le(e) ? fr(e.value) ? e.value.source : e.value : e, In = (e) => ({
  isOnSubmit: !e || e === Le.onSubmit,
  isOnBlur: e === Le.onBlur,
  isOnChange: e === Le.onChange,
  isOnAll: e === Le.all,
  isOnTouch: e === Le.onTouched
});
const Vn = "AsyncFunction";
var Ds = (e) => !!e && !!e.validate && !!(Pe(e.validate) && e.validate.constructor.name === Vn || le(e.validate) && Object.values(e.validate).find((t) => t.constructor.name === Vn)), Is = (e) => e.mount && (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate), Mn = (e, t, r) => !r && (t.watchAll || t.watch.has(e) || [...t.watch].some((n) => e.startsWith(n) && /^\.\w+/.test(e.slice(n.length))));
const Yt = (e, t, r, n) => {
  for (const a of r || Object.keys(e)) {
    const s = V(e, a);
    if (s) {
      const { _f: i, ...l } = s;
      if (i) {
        if (i.refs && i.refs[0] && t(i.refs[0], a) && !n)
          return !0;
        if (i.ref && t(i.ref, i.name) && !n)
          return !0;
        if (Yt(l, t))
          break;
      } else if (le(l) && Yt(l, t))
        break;
    }
  }
};
function jn(e, t, r) {
  const n = V(e, r);
  if (n || un(r))
    return {
      error: n,
      name: r
    };
  const a = r.split(".");
  for (; a.length; ) {
    const s = a.join("."), i = V(t, s), l = V(e, s);
    if (i && !Array.isArray(i) && r !== s)
      return { name: r };
    if (l && l.type)
      return {
        name: s,
        error: l
      };
    if (l && l.root && l.root.type)
      return {
        name: `${s}.root`,
        error: l.root
      };
    a.pop();
  }
  return {
    name: r
  };
}
var Vs = (e, t, r, n) => {
  r(e);
  const { name: a, ...s } = e;
  return we(s) || Object.keys(s).length >= Object.keys(t).length || Object.keys(s).find((i) => t[i] === (!n || Le.all));
}, Ms = (e, t, r) => !e || !t || e === t || qt(e).some((n) => n && (r ? n === t : n.startsWith(t) || t.startsWith(n))), js = (e, t, r, n, a) => a.isOnAll ? !1 : !r && a.isOnTouch ? !(t || e) : (r ? n.isOnBlur : a.isOnBlur) ? !e : (r ? n.isOnChange : a.isOnChange) ? e : !0, Bs = (e, t) => !kr(V(e, t)).length && de(e, t), Us = (e, t, r) => {
  const n = qt(V(e, r));
  return te(n, "root", t[r]), te(e, r, n), e;
}, ir = (e) => Be(e);
function Bn(e, t, r = "validate") {
  if (ir(e) || Array.isArray(e) && e.every(ir) || je(e) && !e)
    return {
      type: r,
      message: ir(e) ? e : "",
      ref: t
    };
}
var _t = (e) => le(e) && !fr(e) ? e : {
  value: e,
  message: ""
}, Un = async (e, t, r, n, a, s) => {
  const { ref: i, refs: l, required: o, maxLength: u, minLength: c, min: h, max: g, pattern: N, validate: k, name: x, valueAsNumber: C, mount: f } = e._f, m = V(r, x);
  if (!f || t.has(x))
    return {};
  const y = l ? l[0] : i, A = (D) => {
    a && y.reportValidity && (y.setCustomValidity(je(D) ? "" : D || ""), y.reportValidity());
  }, I = {}, _ = dn(i), F = Jt(i), E = _ || F, R = (C || cn(i)) && ce(i.value) && ce(m) || cr(i) && i.value === "" || m === "" || Array.isArray(m) && !m.length, O = ga.bind(null, x, n, I), U = (D, z, K, X = ze.maxLength, fe = ze.minLength) => {
    const he = D ? z : K;
    I[x] = {
      type: D ? X : fe,
      message: he,
      ref: i,
      ...O(D ? X : fe, he)
    };
  };
  if (s ? !Array.isArray(m) || !m.length : o && (!E && (R || ye(m)) || je(m) && !m || F && !wa(l).isValid || _ && !_a(l).isValid)) {
    const { value: D, message: z } = ir(o) ? { value: !!o, message: o } : _t(o);
    if (D && (I[x] = {
      type: ze.required,
      message: z,
      ref: y,
      ...O(ze.required, z)
    }, !n))
      return A(z), I;
  }
  if (!R && (!ye(h) || !ye(g))) {
    let D, z;
    const K = _t(g), X = _t(h);
    if (!ye(m) && !isNaN(m)) {
      const fe = i.valueAsNumber || m && +m;
      ye(K.value) || (D = fe > K.value), ye(X.value) || (z = fe < X.value);
    } else {
      const fe = i.valueAsDate || new Date(m), he = ($e) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + $e), Ie = i.type == "time", Ve = i.type == "week";
      Be(K.value) && m && (D = Ie ? he(m) > he(K.value) : Ve ? m > K.value : fe > new Date(K.value)), Be(X.value) && m && (z = Ie ? he(m) < he(X.value) : Ve ? m < X.value : fe < new Date(X.value));
    }
    if ((D || z) && (U(!!D, K.message, X.message, ze.max, ze.min), !n))
      return A(I[x].message), I;
  }
  if ((u || c) && !R && (Be(m) || s && Array.isArray(m))) {
    const D = _t(u), z = _t(c), K = !ye(D.value) && m.length > +D.value, X = !ye(z.value) && m.length < +z.value;
    if ((K || X) && (U(K, D.message, z.message), !n))
      return A(I[x].message), I;
  }
  if (N && !R && Be(m)) {
    const { value: D, message: z } = _t(N);
    if (fr(D) && !m.match(D) && (I[x] = {
      type: ze.pattern,
      message: z,
      ref: i,
      ...O(ze.pattern, z)
    }, !n))
      return A(z), I;
  }
  if (k) {
    if (Pe(k)) {
      const D = await k(m, r), z = Bn(D, y);
      if (z && (I[x] = {
        ...z,
        ...O(ze.validate, z.message)
      }, !n))
        return A(z.message), I;
    } else if (le(k)) {
      let D = {};
      for (const z in k) {
        if (!we(D) && !n)
          break;
        const K = Bn(await k[z](m, r), y, z);
        K && (D = {
          ...K,
          ...O(z, K.message)
        }, A(K.message), n && (I[x] = D));
      }
      if (!we(D) && (I[x] = {
        ref: y,
        ...D
      }, !n))
        return I;
    }
  }
  return A(!0), I;
};
const Zs = {
  mode: Le.onSubmit,
  reValidateMode: Le.onChange,
  shouldFocusError: !0
};
function zs(e = {}) {
  let t = {
    ...Zs,
    ...e
  }, r = {
    submitCount: 0,
    isDirty: !1,
    isReady: !1,
    isLoading: Pe(t.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: t.errors || {},
    disabled: t.disabled || !1
  };
  const n = {};
  let a = le(t.defaultValues) || le(t.values) ? pe(t.defaultValues || t.values) || {} : {}, s = t.shouldUnregister ? {} : pe(a), i = {
    action: !1,
    mount: !1,
    watch: !1
  }, l = {
    mount: /* @__PURE__ */ new Set(),
    disabled: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, o, u = 0;
  const c = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  };
  let h = {
    ...c
  };
  const g = {
    array: On(),
    state: On()
  }, N = t.criteriaMode === Le.all, k = (d) => (p) => {
    clearTimeout(u), u = setTimeout(d, p);
  }, x = async (d) => {
    if (!t.disabled && (c.isValid || h.isValid || d)) {
      const p = t.resolver ? we((await F()).errors) : await R(n, !0);
      p !== r.isValid && g.state.next({
        isValid: p
      });
    }
  }, C = (d, p) => {
    !t.disabled && (c.isValidating || c.validatingFields || h.isValidating || h.validatingFields) && ((d || Array.from(l.mount)).forEach((w) => {
      w && (p ? te(r.validatingFields, w, p) : de(r.validatingFields, w));
    }), g.state.next({
      validatingFields: r.validatingFields,
      isValidating: !we(r.validatingFields)
    }));
  }, f = (d, p = [], w, P, $ = !0, T = !0) => {
    if (P && w && !t.disabled) {
      if (i.action = !0, T && Array.isArray(V(n, d))) {
        const Z = w(V(n, d), P.argA, P.argB);
        $ && te(n, d, Z);
      }
      if (T && Array.isArray(V(r.errors, d))) {
        const Z = w(V(r.errors, d), P.argA, P.argB);
        $ && te(r.errors, d, Z), Bs(r.errors, d);
      }
      if ((c.touchedFields || h.touchedFields) && T && Array.isArray(V(r.touchedFields, d))) {
        const Z = w(V(r.touchedFields, d), P.argA, P.argB);
        $ && te(r.touchedFields, d, Z);
      }
      (c.dirtyFields || h.dirtyFields) && (r.dirtyFields = Mt(a, s)), g.state.next({
        name: d,
        isDirty: U(d, p),
        dirtyFields: r.dirtyFields,
        errors: r.errors,
        isValid: r.isValid
      });
    } else
      te(s, d, p);
  }, m = (d, p) => {
    te(r.errors, d, p), g.state.next({
      errors: r.errors
    });
  }, y = (d) => {
    r.errors = d, g.state.next({
      errors: r.errors,
      isValid: !1
    });
  }, A = (d, p, w, P) => {
    const $ = V(n, d);
    if ($) {
      const T = V(s, d, ce(w) ? V(a, d) : w);
      ce(T) || P && P.defaultChecked || p ? te(s, d, p ? T : Dn($._f)) : K(d, T), i.mount && x();
    }
  }, I = (d, p, w, P, $) => {
    let T = !1, Z = !1;
    const Q = {
      name: d
    };
    if (!t.disabled) {
      if (!w || P) {
        (c.isDirty || h.isDirty) && (Z = r.isDirty, r.isDirty = Q.isDirty = U(), T = Z !== Q.isDirty);
        const re = nt(V(a, d), p);
        Z = !!V(r.dirtyFields, d), re ? de(r.dirtyFields, d) : te(r.dirtyFields, d, !0), Q.dirtyFields = r.dirtyFields, T = T || (c.dirtyFields || h.dirtyFields) && Z !== !re;
      }
      if (w) {
        const re = V(r.touchedFields, d);
        re || (te(r.touchedFields, d, w), Q.touchedFields = r.touchedFields, T = T || (c.touchedFields || h.touchedFields) && re !== w);
      }
      T && $ && g.state.next(Q);
    }
    return T ? Q : {};
  }, _ = (d, p, w, P) => {
    const $ = V(r.errors, d), T = (c.isValid || h.isValid) && je(p) && r.isValid !== p;
    if (t.delayError && w ? (o = k(() => m(d, w)), o(t.delayError)) : (clearTimeout(u), o = null, w ? te(r.errors, d, w) : de(r.errors, d)), (w ? !nt($, w) : $) || !we(P) || T) {
      const Z = {
        ...P,
        ...T && je(p) ? { isValid: p } : {},
        errors: r.errors,
        name: d
      };
      r = {
        ...r,
        ...Z
      }, g.state.next(Z);
    }
  }, F = async (d) => {
    C(d, !0);
    const p = await t.resolver(s, t.context, Ps(d || l.mount, n, t.criteriaMode, t.shouldUseNativeValidation));
    return C(d), p;
  }, E = async (d) => {
    const { errors: p } = await F(d);
    if (d)
      for (const w of d) {
        const P = V(p, w);
        P ? te(r.errors, w, P) : de(r.errors, w);
      }
    else
      r.errors = p;
    return p;
  }, R = async (d, p, w = {
    valid: !0
  }) => {
    for (const P in d) {
      const $ = d[P];
      if ($) {
        const { _f: T, ...Z } = $;
        if (T) {
          const Q = l.array.has(T.name), re = $._f && Ds($._f);
          re && c.validatingFields && C([P], !0);
          const Ae = await Un($, l.disabled, s, N, t.shouldUseNativeValidation && !p, Q);
          if (re && c.validatingFields && C([P]), Ae[T.name] && (w.valid = !1, p))
            break;
          !p && (V(Ae, T.name) ? Q ? Us(r.errors, Ae, T.name) : te(r.errors, T.name, Ae[T.name]) : de(r.errors, T.name));
        }
        !we(Z) && await R(Z, p, w);
      }
    }
    return w.valid;
  }, O = () => {
    for (const d of l.unMount) {
      const p = V(n, d);
      p && (p._f.refs ? p._f.refs.every((w) => !Pr(w)) : !Pr(p._f.ref)) && It(d);
    }
    l.unMount = /* @__PURE__ */ new Set();
  }, U = (d, p) => !t.disabled && (d && p && te(s, d, p), !nt($e(), a)), D = (d, p, w) => Rs(d, l, {
    ...i.mount ? s : ce(p) ? a : Be(d) ? { [d]: p } : p
  }, w, p), z = (d) => kr(V(i.mount ? s : a, d, t.shouldUnregister ? V(a, d, []) : [])), K = (d, p, w = {}) => {
    const P = V(n, d);
    let $ = p;
    if (P) {
      const T = P._f;
      T && (!T.disabled && te(s, d, xa(p, T)), $ = cr(T.ref) && ye(p) ? "" : p, va(T.ref) ? [...T.ref.options].forEach((Z) => Z.selected = $.includes(Z.value)) : T.refs ? Jt(T.ref) ? T.refs.forEach((Z) => {
        (!Z.defaultChecked || !Z.disabled) && (Array.isArray($) ? Z.checked = !!$.find((Q) => Q === Z.value) : Z.checked = $ === Z.value || !!$);
      }) : T.refs.forEach((Z) => Z.checked = Z.value === $) : cn(T.ref) ? T.ref.value = "" : (T.ref.value = $, T.ref.type || g.state.next({
        name: d,
        values: pe(s)
      })));
    }
    (w.shouldDirty || w.shouldTouch) && I(d, $, w.shouldTouch, w.shouldDirty, !0), w.shouldValidate && Ve(d);
  }, X = (d, p, w) => {
    for (const P in p) {
      if (!p.hasOwnProperty(P))
        return;
      const $ = p[P], T = d + "." + P, Z = V(n, T);
      (l.array.has(d) || le($) || Z && !Z._f) && !ht($) ? X(T, $, w) : K(T, $, w);
    }
  }, fe = (d, p, w = {}) => {
    const P = V(n, d), $ = l.array.has(d), T = pe(p);
    te(s, d, T), $ ? (g.array.next({
      name: d,
      values: pe(s)
    }), (c.isDirty || c.dirtyFields || h.isDirty || h.dirtyFields) && w.shouldDirty && g.state.next({
      name: d,
      dirtyFields: Mt(a, s),
      isDirty: U(d, T)
    })) : P && !P._f && !ye(T) ? X(d, T, w) : K(d, T, w), Mn(d, l) && g.state.next({ ...r }), g.state.next({
      name: i.mount ? d : void 0,
      values: pe(s)
    });
  }, he = async (d) => {
    i.mount = !0;
    const p = d.target;
    let w = p.name, P = !0;
    const $ = V(n, w), T = (re) => {
      P = Number.isNaN(re) || ht(re) && isNaN(re.getTime()) || nt(re, V(s, w, re));
    }, Z = In(t.mode), Q = In(t.reValidateMode);
    if ($) {
      let re, Ae;
      const rr = p.type ? Dn($._f) : Cs(d), et = d.type === Rn.BLUR || d.type === Rn.FOCUS_OUT, ms = !Is($._f) && !t.resolver && !V(r.errors, w) && !$._f.deps || js(et, V(r.touchedFields, w), r.isSubmitted, Q, Z), $r = Mn(w, l, et);
      te(s, w, rr), et ? ($._f.onBlur && $._f.onBlur(d), o && o(0)) : $._f.onChange && $._f.onChange(d);
      const Lr = I(w, rr, et), ps = !we(Lr) || $r;
      if (!et && g.state.next({
        name: w,
        type: d.type,
        values: pe(s)
      }), ms)
        return (c.isValid || h.isValid) && (t.mode === "onBlur" ? et && x() : et || x()), ps && g.state.next({ name: w, ...$r ? {} : Lr });
      if (!et && $r && g.state.next({ ...r }), t.resolver) {
        const { errors: An } = await F([w]);
        if (T(rr), P) {
          const gs = jn(r.errors, n, w), Fn = jn(An, n, gs.name || w);
          re = Fn.error, w = Fn.name, Ae = we(An);
        }
      } else
        C([w], !0), re = (await Un($, l.disabled, s, N, t.shouldUseNativeValidation))[w], C([w]), T(rr), P && (re ? Ae = !1 : (c.isValid || h.isValid) && (Ae = await R(n, !0)));
      P && ($._f.deps && Ve($._f.deps), _(w, Ae, re, Lr));
    }
  }, Ie = (d, p) => {
    if (V(r.errors, p) && d.focus)
      return d.focus(), 1;
  }, Ve = async (d, p = {}) => {
    let w, P;
    const $ = qt(d);
    if (t.resolver) {
      const T = await E(ce(d) ? d : $);
      w = we(T), P = d ? !$.some((Z) => V(T, Z)) : w;
    } else d ? (P = (await Promise.all($.map(async (T) => {
      const Z = V(n, T);
      return await R(Z && Z._f ? { [T]: Z } : Z);
    }))).every(Boolean), !(!P && !r.isValid) && x()) : P = w = await R(n);
    return g.state.next({
      ...!Be(d) || (c.isValid || h.isValid) && w !== r.isValid ? {} : { name: d },
      ...t.resolver || !d ? { isValid: w } : {},
      errors: r.errors
    }), p.shouldFocus && !P && Yt(n, Ie, d ? $ : l.mount), P;
  }, $e = (d) => {
    const p = {
      ...i.mount ? s : a
    };
    return ce(d) ? p : Be(d) ? V(p, d) : d.map((w) => V(p, w));
  }, Qe = (d, p) => ({
    invalid: !!V((p || r).errors, d),
    isDirty: !!V((p || r).dirtyFields, d),
    error: V((p || r).errors, d),
    isValidating: !!V(r.validatingFields, d),
    isTouched: !!V((p || r).touchedFields, d)
  }), Me = (d) => {
    d && qt(d).forEach((p) => de(r.errors, p)), g.state.next({
      errors: d ? r.errors : {}
    });
  }, Dt = (d, p, w) => {
    const P = (V(n, d, { _f: {} })._f || {}).ref, $ = V(r.errors, d) || {}, { ref: T, message: Z, type: Q, ...re } = $;
    te(r.errors, d, {
      ...re,
      ...p,
      ref: P
    }), g.state.next({
      name: d,
      errors: r.errors,
      isValid: !1
    }), w && w.shouldFocus && P && P.focus && P.focus();
  }, Se = (d, p) => Pe(d) ? g.state.subscribe({
    next: (w) => d(D(void 0, p), w)
  }) : D(d, p, !0), Rr = (d) => g.state.subscribe({
    next: (p) => {
      Ms(d.name, p.name, d.exact) && Vs(p, d.formState || c, hs, d.reRenderRoot) && d.callback({
        values: { ...s },
        ...r,
        ...p
      });
    }
  }).unsubscribe, Or = (d) => (i.mount = !0, h = {
    ...h,
    ...d.formState
  }, Rr({
    ...d,
    formState: h
  })), It = (d, p = {}) => {
    for (const w of d ? qt(d) : l.mount)
      l.mount.delete(w), l.array.delete(w), p.keepValue || (de(n, w), de(s, w)), !p.keepError && de(r.errors, w), !p.keepDirty && de(r.dirtyFields, w), !p.keepTouched && de(r.touchedFields, w), !p.keepIsValidating && de(r.validatingFields, w), !t.shouldUnregister && !p.keepDefaultValue && de(a, w);
    g.state.next({
      values: pe(s)
    }), g.state.next({
      ...r,
      ...p.keepDirty ? { isDirty: U() } : {}
    }), !p.keepIsValid && x();
  }, tr = ({ disabled: d, name: p }) => {
    (je(d) && i.mount || d || l.disabled.has(p)) && (d ? l.disabled.add(p) : l.disabled.delete(p));
  }, xt = (d, p = {}) => {
    let w = V(n, d);
    const P = je(p.disabled) || je(t.disabled);
    return te(n, d, {
      ...w || {},
      _f: {
        ...w && w._f ? w._f : { ref: { name: d } },
        name: d,
        mount: !0,
        ...p
      }
    }), l.mount.add(d), w ? tr({
      disabled: je(p.disabled) ? p.disabled : t.disabled,
      name: d
    }) : A(d, !0, p.value), {
      ...P ? { disabled: p.disabled || t.disabled } : {},
      ...t.progressive ? {
        required: !!p.required,
        min: jt(p.min),
        max: jt(p.max),
        minLength: jt(p.minLength),
        maxLength: jt(p.maxLength),
        pattern: jt(p.pattern)
      } : {},
      name: d,
      onChange: he,
      onBlur: he,
      ref: ($) => {
        if ($) {
          xt(d, p), w = V(n, d);
          const T = ce($.value) && $.querySelectorAll && $.querySelectorAll("input,select,textarea")[0] || $, Z = Os(T), Q = w._f.refs || [];
          if (Z ? Q.find((re) => re === T) : T === w._f.ref)
            return;
          te(n, d, {
            _f: {
              ...w._f,
              ...Z ? {
                refs: [
                  ...Q.filter(Pr),
                  T,
                  ...Array.isArray(V(a, d)) ? [{}] : []
                ],
                ref: { type: T.type, name: d }
              } : { ref: T }
            }
          }), A(d, !1, void 0, T);
        } else
          w = V(n, d, {}), w._f && (w._f.mount = !1), (t.shouldUnregister || p.shouldUnregister) && !(Ss(l.array, d) && i.action) && l.unMount.add(d);
      }
    };
  }, Vt = () => t.shouldFocusError && Yt(n, Ie, l.mount), ae = (d) => {
    je(d) && (g.state.next({ disabled: d }), Yt(n, (p, w) => {
      const P = V(n, w);
      P && (p.disabled = P._f.disabled || d, Array.isArray(P._f.refs) && P._f.refs.forEach(($) => {
        $.disabled = P._f.disabled || d;
      }));
    }, 0, !1));
  }, Te = (d, p) => async (w) => {
    let P;
    w && (w.preventDefault && w.preventDefault(), w.persist && w.persist());
    let $ = pe(s);
    if (g.state.next({
      isSubmitting: !0
    }), t.resolver) {
      const { errors: T, values: Z } = await F();
      r.errors = T, $ = Z;
    } else
      await R(n);
    if (l.disabled.size)
      for (const T of l.disabled)
        te($, T, void 0);
    if (de(r.errors, "root"), we(r.errors)) {
      g.state.next({
        errors: {}
      });
      try {
        await d($, w);
      } catch (T) {
        P = T;
      }
    } else
      p && await p({ ...r.errors }, w), Vt(), setTimeout(Vt);
    if (g.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: we(r.errors) && !P,
      submitCount: r.submitCount + 1,
      errors: r.errors
    }), P)
      throw P;
  }, be = (d, p = {}) => {
    V(n, d) && (ce(p.defaultValue) ? fe(d, pe(V(a, d))) : (fe(d, p.defaultValue), te(a, d, pe(p.defaultValue))), p.keepTouched || de(r.touchedFields, d), p.keepDirty || (de(r.dirtyFields, d), r.isDirty = p.defaultValue ? U(d, pe(V(a, d))) : U()), p.keepError || (de(r.errors, d), c.isValid && x()), g.state.next({ ...r }));
  }, ct = (d, p = {}) => {
    const w = d ? pe(d) : a, P = pe(w), $ = we(d), T = $ ? a : P;
    if (p.keepDefaultValues || (a = w), !p.keepValues) {
      if (p.keepDirtyValues) {
        const Z = /* @__PURE__ */ new Set([
          ...l.mount,
          ...Object.keys(Mt(a, s))
        ]);
        for (const Q of Array.from(Z))
          V(r.dirtyFields, Q) ? te(T, Q, V(s, Q)) : fe(Q, V(T, Q));
      } else {
        if (on && ce(d))
          for (const Z of l.mount) {
            const Q = V(n, Z);
            if (Q && Q._f) {
              const re = Array.isArray(Q._f.refs) ? Q._f.refs[0] : Q._f.ref;
              if (cr(re)) {
                const Ae = re.closest("form");
                if (Ae) {
                  Ae.reset();
                  break;
                }
              }
            }
          }
        for (const Z of l.mount)
          fe(Z, V(T, Z));
      }
      s = pe(T), g.array.next({
        values: { ...T }
      }), g.state.next({
        values: { ...T }
      });
    }
    l = {
      mount: p.keepDirtyValues ? l.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      disabled: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, i.mount = !c.isValid || !!p.keepIsValid || !!p.keepDirtyValues, i.watch = !!t.shouldUnregister, g.state.next({
      submitCount: p.keepSubmitCount ? r.submitCount : 0,
      isDirty: $ ? !1 : p.keepDirty ? r.isDirty : !!(p.keepDefaultValues && !nt(d, a)),
      isSubmitted: p.keepIsSubmitted ? r.isSubmitted : !1,
      dirtyFields: $ ? {} : p.keepDirtyValues ? p.keepDefaultValues && s ? Mt(a, s) : r.dirtyFields : p.keepDefaultValues && d ? Mt(a, d) : p.keepDirty ? r.dirtyFields : {},
      touchedFields: p.keepTouched ? r.touchedFields : {},
      errors: p.keepErrors ? r.errors : {},
      isSubmitSuccessful: p.keepIsSubmitSuccessful ? r.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, Sn = (d, p) => ct(Pe(d) ? d(s) : d, p), fs = (d, p = {}) => {
    const w = V(n, d), P = w && w._f;
    if (P) {
      const $ = P.refs ? P.refs[0] : P.ref;
      $.focus && ($.focus(), p.shouldSelect && Pe($.select) && $.select());
    }
  }, hs = (d) => {
    r = {
      ...r,
      ...d
    };
  }, Tn = {
    control: {
      register: xt,
      unregister: It,
      getFieldState: Qe,
      handleSubmit: Te,
      setError: Dt,
      _subscribe: Rr,
      _runSchema: F,
      _focusError: Vt,
      _getWatch: D,
      _getDirty: U,
      _setValid: x,
      _setFieldArray: f,
      _setDisabledField: tr,
      _setErrors: y,
      _getFieldArray: z,
      _reset: ct,
      _resetDefaultValues: () => Pe(t.defaultValues) && t.defaultValues().then((d) => {
        Sn(d, t.resetOptions), g.state.next({
          isLoading: !1
        });
      }),
      _removeUnmounted: O,
      _disableForm: ae,
      _subjects: g,
      _proxyFormState: c,
      get _fields() {
        return n;
      },
      get _formValues() {
        return s;
      },
      get _state() {
        return i;
      },
      set _state(d) {
        i = d;
      },
      get _defaultValues() {
        return a;
      },
      get _names() {
        return l;
      },
      set _names(d) {
        l = d;
      },
      get _formState() {
        return r;
      },
      get _options() {
        return t;
      },
      set _options(d) {
        t = {
          ...t,
          ...d
        };
      }
    },
    subscribe: Or,
    trigger: Ve,
    register: xt,
    handleSubmit: Te,
    watch: Se,
    setValue: fe,
    getValues: $e,
    reset: Sn,
    resetField: be,
    clearErrors: Me,
    unregister: It,
    setError: Dt,
    setFocus: fs,
    getFieldState: Qe
  };
  return {
    ...Tn,
    formControl: Tn
  };
}
function Ws(e = {}) {
  const t = W.useRef(void 0), r = W.useRef(void 0), [n, a] = W.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: Pe(e.defaultValues),
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: e.errors || {},
    disabled: e.disabled || !1,
    isReady: !1,
    defaultValues: Pe(e.defaultValues) ? void 0 : e.defaultValues
  });
  t.current || (t.current = {
    ...e.formControl ? e.formControl : zs(e),
    formState: n
  }, e.formControl && e.defaultValues && !Pe(e.defaultValues) && e.formControl.reset(e.defaultValues, e.resetOptions));
  const s = t.current.control;
  return s._options = e, Fs(() => {
    const i = s._subscribe({
      formState: s._proxyFormState,
      callback: () => a({ ...s._formState }),
      reRenderRoot: !0
    });
    return a((l) => ({
      ...l,
      isReady: !0
    })), s._formState.isReady = !0, i;
  }, [s]), W.useEffect(() => s._disableForm(e.disabled), [s, e.disabled]), W.useEffect(() => {
    e.mode && (s._options.mode = e.mode), e.reValidateMode && (s._options.reValidateMode = e.reValidateMode);
  }, [s, e.mode, e.reValidateMode]), W.useEffect(() => {
    e.errors && (s._setErrors(e.errors), s._focusError());
  }, [s, e.errors]), W.useEffect(() => {
    e.shouldUnregister && s._subjects.state.next({
      values: s._getWatch()
    });
  }, [s, e.shouldUnregister]), W.useEffect(() => {
    if (s._proxyFormState.isDirty) {
      const i = s._getDirty();
      i !== n.isDirty && s._subjects.state.next({
        isDirty: i
      });
    }
  }, [s, n.isDirty]), W.useEffect(() => {
    e.values && !nt(e.values, r.current) ? (s._reset(e.values, s._options.resetOptions), r.current = e.values, a((i) => ({ ...i }))) : s._resetDefaultValues();
  }, [s, e.values]), W.useEffect(() => {
    s._state.mount || (s._setValid(), s._state.mount = !0), s._state.watch && (s._state.watch = !1, s._subjects.state.next({ ...s._formState })), s._removeUnmounted();
  }), t.current.formState = As(n, s), t.current;
}
const Zn = (e, t, r) => {
  if (e && "reportValidity" in e) {
    const n = V(r, t);
    e.setCustomValidity(n && n.message || ""), e.reportValidity();
  }
}, ka = (e, t) => {
  for (const r in t.fields) {
    const n = t.fields[r];
    n && n.ref && "reportValidity" in n.ref ? Zn(n.ref, r, e) : n.refs && n.refs.forEach((a) => Zn(a, r, e));
  }
}, Hs = (e, t) => {
  t.shouldUseNativeValidation && ka(e, t);
  const r = {};
  for (const n in e) {
    const a = V(t.fields, n), s = Object.assign(e[n] || {}, { ref: a && a.ref });
    if (qs(t.names || Object.keys(e), n)) {
      const i = Object.assign({}, V(r, n));
      te(i, "root", s), te(r, n, i);
    } else te(r, n, s);
  }
  return r;
}, qs = (e, t) => e.some((r) => r.startsWith(t + "."));
var Ys = function(e, t) {
  for (var r = {}; e.length; ) {
    var n = e[0], a = n.code, s = n.message, i = n.path.join(".");
    if (!r[i]) if ("unionErrors" in n) {
      var l = n.unionErrors[0].errors[0];
      r[i] = { message: l.message, type: l.code };
    } else r[i] = { message: s, type: a };
    if ("unionErrors" in n && n.unionErrors.forEach(function(c) {
      return c.errors.forEach(function(h) {
        return e.push(h);
      });
    }), t) {
      var o = r[i].types, u = o && o[n.code];
      r[i] = ga(i, t, r, a, u ? [].concat(u, n.message) : n.message);
    }
    e.shift();
  }
  return r;
}, Gs = function(e, t, r) {
  return r === void 0 && (r = {}), function(n, a, s) {
    try {
      return Promise.resolve(function(i, l) {
        try {
          var o = Promise.resolve(e[r.mode === "sync" ? "parse" : "parseAsync"](n, t)).then(function(u) {
            return s.shouldUseNativeValidation && ka({}, s), { errors: {}, values: r.raw ? n : u };
          });
        } catch (u) {
          return l(u);
        }
        return o && o.then ? o.then(void 0, l) : o;
      }(0, function(i) {
        if (function(l) {
          return Array.isArray(l == null ? void 0 : l.errors);
        }(i)) return { values: {}, errors: Hs(Ys(i.errors, !s.shouldUseNativeValidation && s.criteriaMode === "all"), s) };
        throw i;
      }));
    } catch (i) {
      return Promise.reject(i);
    }
  };
}, J;
(function(e) {
  e.assertEqual = (a) => {
  };
  function t(a) {
  }
  e.assertIs = t;
  function r(a) {
    throw new Error();
  }
  e.assertNever = r, e.arrayToEnum = (a) => {
    const s = {};
    for (const i of a)
      s[i] = i;
    return s;
  }, e.getValidEnumValues = (a) => {
    const s = e.objectKeys(a).filter((l) => typeof a[a[l]] != "number"), i = {};
    for (const l of s)
      i[l] = a[l];
    return e.objectValues(i);
  }, e.objectValues = (a) => e.objectKeys(a).map(function(s) {
    return a[s];
  }), e.objectKeys = typeof Object.keys == "function" ? (a) => Object.keys(a) : (a) => {
    const s = [];
    for (const i in a)
      Object.prototype.hasOwnProperty.call(a, i) && s.push(i);
    return s;
  }, e.find = (a, s) => {
    for (const i of a)
      if (s(i))
        return i;
  }, e.isInteger = typeof Number.isInteger == "function" ? (a) => Number.isInteger(a) : (a) => typeof a == "number" && Number.isFinite(a) && Math.floor(a) === a;
  function n(a, s = " | ") {
    return a.map((i) => typeof i == "string" ? `'${i}'` : i).join(s);
  }
  e.joinValues = n, e.jsonStringifyReplacer = (a, s) => typeof s == "bigint" ? s.toString() : s;
})(J || (J = {}));
var zn;
(function(e) {
  e.mergeShapes = (t, r) => ({
    ...t,
    ...r
    // second overwrites first
  });
})(zn || (zn = {}));
const M = J.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), rt = (e) => {
  switch (typeof e) {
    case "undefined":
      return M.undefined;
    case "string":
      return M.string;
    case "number":
      return Number.isNaN(e) ? M.nan : M.number;
    case "boolean":
      return M.boolean;
    case "function":
      return M.function;
    case "bigint":
      return M.bigint;
    case "symbol":
      return M.symbol;
    case "object":
      return Array.isArray(e) ? M.array : e === null ? M.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? M.promise : typeof Map < "u" && e instanceof Map ? M.map : typeof Set < "u" && e instanceof Set ? M.set : typeof Date < "u" && e instanceof Date ? M.date : M.object;
    default:
      return M.unknown;
  }
}, S = J.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class Ge extends Error {
  get errors() {
    return this.issues;
  }
  constructor(t) {
    super(), this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = t;
  }
  format(t) {
    const r = t || function(s) {
      return s.message;
    }, n = { _errors: [] }, a = (s) => {
      for (const i of s.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(a);
        else if (i.code === "invalid_return_type")
          a(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          a(i.argumentsError);
        else if (i.path.length === 0)
          n._errors.push(r(i));
        else {
          let l = n, o = 0;
          for (; o < i.path.length; ) {
            const u = i.path[o];
            o === i.path.length - 1 ? (l[u] = l[u] || { _errors: [] }, l[u]._errors.push(r(i))) : l[u] = l[u] || { _errors: [] }, l = l[u], o++;
          }
        }
    };
    return a(this), n;
  }
  static assert(t) {
    if (!(t instanceof Ge))
      throw new Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, J.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (r) => r.message) {
    const r = {}, n = [];
    for (const a of this.issues)
      a.path.length > 0 ? (r[a.path[0]] = r[a.path[0]] || [], r[a.path[0]].push(t(a))) : n.push(t(a));
    return { formErrors: n, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
Ge.create = (e) => new Ge(e);
const Hr = (e, t) => {
  let r;
  switch (e.code) {
    case S.invalid_type:
      e.received === M.undefined ? r = "Required" : r = `Expected ${e.expected}, received ${e.received}`;
      break;
    case S.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(e.expected, J.jsonStringifyReplacer)}`;
      break;
    case S.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${J.joinValues(e.keys, ", ")}`;
      break;
    case S.invalid_union:
      r = "Invalid input";
      break;
    case S.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${J.joinValues(e.options)}`;
      break;
    case S.invalid_enum_value:
      r = `Invalid enum value. Expected ${J.joinValues(e.options)}, received '${e.received}'`;
      break;
    case S.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case S.invalid_return_type:
      r = "Invalid function return type";
      break;
    case S.invalid_date:
      r = "Invalid date";
      break;
    case S.invalid_string:
      typeof e.validation == "object" ? "includes" in e.validation ? (r = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? r = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? r = `Invalid input: must end with "${e.validation.endsWith}"` : J.assertNever(e.validation) : e.validation !== "regex" ? r = `Invalid ${e.validation}` : r = "Invalid";
      break;
    case S.too_small:
      e.type === "array" ? r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" ? r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? r = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : r = "Invalid input";
      break;
    case S.too_big:
      e.type === "array" ? r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? r = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? r = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? r = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : r = "Invalid input";
      break;
    case S.custom:
      r = "Invalid input";
      break;
    case S.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case S.not_multiple_of:
      r = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case S.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = t.defaultError, J.assertNever(e);
  }
  return { message: r };
};
let Js = Hr;
function Ks() {
  return Js;
}
const Xs = (e) => {
  const { data: t, path: r, errorMaps: n, issueData: a } = e, s = [...r, ...a.path || []], i = {
    ...a,
    path: s
  };
  if (a.message !== void 0)
    return {
      ...a,
      path: s,
      message: a.message
    };
  let l = "";
  const o = n.filter((u) => !!u).slice().reverse();
  for (const u of o)
    l = u(i, { data: t, defaultError: l }).message;
  return {
    ...a,
    path: s,
    message: l
  };
};
function L(e, t) {
  const r = Ks(), n = Xs({
    issueData: t,
    data: e.data,
    path: e.path,
    errorMaps: [
      e.common.contextualErrorMap,
      // contextual error map is first priority
      e.schemaErrorMap,
      // then schema-bound map if available
      r,
      // then global override map
      r === Hr ? void 0 : Hr
      // then global default map
    ].filter((a) => !!a)
  });
  e.common.issues.push(n);
}
class Ee {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, r) {
    const n = [];
    for (const a of r) {
      if (a.status === "aborted")
        return H;
      a.status === "dirty" && t.dirty(), n.push(a.value);
    }
    return { status: t.value, value: n };
  }
  static async mergeObjectAsync(t, r) {
    const n = [];
    for (const a of r) {
      const s = await a.key, i = await a.value;
      n.push({
        key: s,
        value: i
      });
    }
    return Ee.mergeObjectSync(t, n);
  }
  static mergeObjectSync(t, r) {
    const n = {};
    for (const a of r) {
      const { key: s, value: i } = a;
      if (s.status === "aborted" || i.status === "aborted")
        return H;
      s.status === "dirty" && t.dirty(), i.status === "dirty" && t.dirty(), s.value !== "__proto__" && (typeof i.value < "u" || a.alwaysSet) && (n[s.value] = i.value);
    }
    return { status: t.value, value: n };
  }
}
const H = Object.freeze({
  status: "aborted"
}), Wt = (e) => ({ status: "dirty", value: e }), Re = (e) => ({ status: "valid", value: e }), Wn = (e) => e.status === "aborted", Hn = (e) => e.status === "dirty", Tt = (e) => e.status === "valid", hr = (e) => typeof Promise < "u" && e instanceof Promise;
var j;
(function(e) {
  e.errToObj = (t) => typeof t == "string" ? { message: t } : t || {}, e.toString = (t) => typeof t == "string" ? t : t == null ? void 0 : t.message;
})(j || (j = {}));
class lt {
  constructor(t, r, n, a) {
    this._cachedPath = [], this.parent = t, this.data = r, this._path = n, this._key = a;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const qn = (e, t) => {
  if (Tt(t))
    return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new Ge(e.common.issues);
      return this._error = r, this._error;
    }
  };
};
function Y(e) {
  if (!e)
    return {};
  const { errorMap: t, invalid_type_error: r, required_error: n, description: a } = e;
  if (t && (r || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? { errorMap: t, description: a } : { errorMap: (i, l) => {
    const { message: o } = e;
    return i.code === "invalid_enum_value" ? { message: o ?? l.defaultError } : typeof l.data > "u" ? { message: o ?? n ?? l.defaultError } : i.code !== "invalid_type" ? { message: l.defaultError } : { message: o ?? r ?? l.defaultError };
  }, description: a };
}
class G {
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return rt(t.data);
  }
  _getOrReturnCtx(t, r) {
    return r || {
      common: t.parent.common,
      data: t.data,
      parsedType: rt(t.data),
      schemaErrorMap: this._def.errorMap,
      path: t.path,
      parent: t.parent
    };
  }
  _processInputParams(t) {
    return {
      status: new Ee(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: rt(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      }
    };
  }
  _parseSync(t) {
    const r = this._parse(t);
    if (hr(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(t) {
    const r = this._parse(t);
    return Promise.resolve(r);
  }
  parse(t, r) {
    const n = this.safeParse(t, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  safeParse(t, r) {
    const n = {
      common: {
        issues: [],
        async: (r == null ? void 0 : r.async) ?? !1,
        contextualErrorMap: r == null ? void 0 : r.errorMap
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: rt(t)
    }, a = this._parseSync({ data: t, path: n.path, parent: n });
    return qn(n, a);
  }
  "~validate"(t) {
    var n, a;
    const r = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: rt(t)
    };
    if (!this["~standard"].async)
      try {
        const s = this._parseSync({ data: t, path: [], parent: r });
        return Tt(s) ? {
          value: s.value
        } : {
          issues: r.common.issues
        };
      } catch (s) {
        (a = (n = s == null ? void 0 : s.message) == null ? void 0 : n.toLowerCase()) != null && a.includes("encountered") && (this["~standard"].async = !0), r.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: t, path: [], parent: r }).then((s) => Tt(s) ? {
      value: s.value
    } : {
      issues: r.common.issues
    });
  }
  async parseAsync(t, r) {
    const n = await this.safeParseAsync(t, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  async safeParseAsync(t, r) {
    const n = {
      common: {
        issues: [],
        contextualErrorMap: r == null ? void 0 : r.errorMap,
        async: !0
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: rt(t)
    }, a = this._parse({ data: t, path: n.path, parent: n }), s = await (hr(a) ? a : Promise.resolve(a));
    return qn(n, s);
  }
  refine(t, r) {
    const n = (a) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(a) : r;
    return this._refinement((a, s) => {
      const i = t(a), l = () => s.addIssue({
        code: S.custom,
        ...n(a)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((o) => o ? !0 : (l(), !1)) : i ? !0 : (l(), !1);
    });
  }
  refinement(t, r) {
    return this._refinement((n, a) => t(n) ? !0 : (a.addIssue(typeof r == "function" ? r(n, a) : r), !1));
  }
  _refinement(t) {
    return new Rt({
      schema: this,
      typeName: q.ZodEffects,
      effect: { type: "refinement", refinement: t }
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  constructor(t) {
    this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (r) => this["~validate"](r)
    };
  }
  optional() {
    return it.create(this, this._def);
  }
  nullable() {
    return Ot.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Ue.create(this);
  }
  promise() {
    return vr.create(this, this._def);
  }
  or(t) {
    return pr.create([this, t], this._def);
  }
  and(t) {
    return gr.create(this, t, this._def);
  }
  transform(t) {
    return new Rt({
      ...Y(this._def),
      schema: this,
      typeName: q.ZodEffects,
      effect: { type: "transform", transform: t }
    });
  }
  default(t) {
    const r = typeof t == "function" ? t : () => t;
    return new Yr({
      ...Y(this._def),
      innerType: this,
      defaultValue: r,
      typeName: q.ZodDefault
    });
  }
  brand() {
    return new xi({
      typeName: q.ZodBranded,
      type: this,
      ...Y(this._def)
    });
  }
  catch(t) {
    const r = typeof t == "function" ? t : () => t;
    return new Gr({
      ...Y(this._def),
      innerType: this,
      catchValue: r,
      typeName: q.ZodCatch
    });
  }
  describe(t) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: t
    });
  }
  pipe(t) {
    return fn.create(this, t);
  }
  readonly() {
    return Jr.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Qs = /^c[^\s-]{8,}$/i, ei = /^[0-9a-z]+$/, ti = /^[0-9A-HJKMNP-TV-Z]{26}$/i, ri = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, ni = /^[a-z0-9_-]{21}$/i, ai = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, si = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, ii = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, li = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Dr;
const oi = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ui = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, ci = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, di = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, fi = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, hi = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Ea = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", mi = new RegExp(`^${Ea}$`);
function Ca(e) {
  let t = "[0-5]\\d";
  e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision == null && (t = `${t}(\\.\\d+)?`);
  const r = e.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${r}`;
}
function pi(e) {
  return new RegExp(`^${Ca(e)}$`);
}
function gi(e) {
  let t = `${Ea}T${Ca(e)}`;
  const r = [];
  return r.push(e.local ? "Z?" : "Z"), e.offset && r.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${r.join("|")})`, new RegExp(`^${t}$`);
}
function vi(e, t) {
  return !!((t === "v4" || !t) && oi.test(e) || (t === "v6" || !t) && ci.test(e));
}
function yi(e, t) {
  if (!ai.test(e))
    return !1;
  try {
    const [r] = e.split("."), n = r.replace(/-/g, "+").replace(/_/g, "/").padEnd(r.length + (4 - r.length % 4) % 4, "="), a = JSON.parse(atob(n));
    return !(typeof a != "object" || a === null || "typ" in a && (a == null ? void 0 : a.typ) !== "JWT" || !a.alg || t && a.alg !== t);
  } catch {
    return !1;
  }
}
function bi(e, t) {
  return !!((t === "v4" || !t) && ui.test(e) || (t === "v6" || !t) && di.test(e));
}
class We extends G {
  _parse(t) {
    if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== M.string) {
      const s = this._getOrReturnCtx(t);
      return L(s, {
        code: S.invalid_type,
        expected: M.string,
        received: s.parsedType
      }), H;
    }
    const n = new Ee();
    let a;
    for (const s of this._def.checks)
      if (s.kind === "min")
        t.data.length < s.value && (a = this._getOrReturnCtx(t, a), L(a, {
          code: S.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), n.dirty());
      else if (s.kind === "max")
        t.data.length > s.value && (a = this._getOrReturnCtx(t, a), L(a, {
          code: S.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), n.dirty());
      else if (s.kind === "length") {
        const i = t.data.length > s.value, l = t.data.length < s.value;
        (i || l) && (a = this._getOrReturnCtx(t, a), i ? L(a, {
          code: S.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : l && L(a, {
          code: S.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), n.dirty());
      } else if (s.kind === "email")
        ii.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
          validation: "email",
          code: S.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "emoji")
        Dr || (Dr = new RegExp(li, "u")), Dr.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
          validation: "emoji",
          code: S.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "uuid")
        ri.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
          validation: "uuid",
          code: S.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "nanoid")
        ni.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
          validation: "nanoid",
          code: S.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "cuid")
        Qs.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
          validation: "cuid",
          code: S.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "cuid2")
        ei.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
          validation: "cuid2",
          code: S.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "ulid")
        ti.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
          validation: "ulid",
          code: S.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "url")
        try {
          new URL(t.data);
        } catch {
          a = this._getOrReturnCtx(t, a), L(a, {
            validation: "url",
            code: S.invalid_string,
            message: s.message
          }), n.dirty();
        }
      else s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
        validation: "regex",
        code: S.invalid_string,
        message: s.message
      }), n.dirty())) : s.kind === "trim" ? t.data = t.data.trim() : s.kind === "includes" ? t.data.includes(s.value, s.position) || (a = this._getOrReturnCtx(t, a), L(a, {
        code: S.invalid_string,
        validation: { includes: s.value, position: s.position },
        message: s.message
      }), n.dirty()) : s.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : s.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : s.kind === "startsWith" ? t.data.startsWith(s.value) || (a = this._getOrReturnCtx(t, a), L(a, {
        code: S.invalid_string,
        validation: { startsWith: s.value },
        message: s.message
      }), n.dirty()) : s.kind === "endsWith" ? t.data.endsWith(s.value) || (a = this._getOrReturnCtx(t, a), L(a, {
        code: S.invalid_string,
        validation: { endsWith: s.value },
        message: s.message
      }), n.dirty()) : s.kind === "datetime" ? gi(s).test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
        code: S.invalid_string,
        validation: "datetime",
        message: s.message
      }), n.dirty()) : s.kind === "date" ? mi.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
        code: S.invalid_string,
        validation: "date",
        message: s.message
      }), n.dirty()) : s.kind === "time" ? pi(s).test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
        code: S.invalid_string,
        validation: "time",
        message: s.message
      }), n.dirty()) : s.kind === "duration" ? si.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
        validation: "duration",
        code: S.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "ip" ? vi(t.data, s.version) || (a = this._getOrReturnCtx(t, a), L(a, {
        validation: "ip",
        code: S.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "jwt" ? yi(t.data, s.alg) || (a = this._getOrReturnCtx(t, a), L(a, {
        validation: "jwt",
        code: S.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "cidr" ? bi(t.data, s.version) || (a = this._getOrReturnCtx(t, a), L(a, {
        validation: "cidr",
        code: S.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64" ? fi.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
        validation: "base64",
        code: S.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64url" ? hi.test(t.data) || (a = this._getOrReturnCtx(t, a), L(a, {
        validation: "base64url",
        code: S.invalid_string,
        message: s.message
      }), n.dirty()) : J.assertNever(s);
    return { status: n.value, value: t.data };
  }
  _regex(t, r, n) {
    return this.refinement((a) => t.test(a), {
      validation: r,
      code: S.invalid_string,
      ...j.errToObj(n)
    });
  }
  _addCheck(t) {
    return new We({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...j.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...j.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: "emoji", ...j.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...j.errToObj(t) });
  }
  nanoid(t) {
    return this._addCheck({ kind: "nanoid", ...j.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...j.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ...j.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: "ulid", ...j.errToObj(t) });
  }
  base64(t) {
    return this._addCheck({ kind: "base64", ...j.errToObj(t) });
  }
  base64url(t) {
    return this._addCheck({
      kind: "base64url",
      ...j.errToObj(t)
    });
  }
  jwt(t) {
    return this._addCheck({ kind: "jwt", ...j.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: "ip", ...j.errToObj(t) });
  }
  cidr(t) {
    return this._addCheck({ kind: "cidr", ...j.errToObj(t) });
  }
  datetime(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: t
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      offset: (t == null ? void 0 : t.offset) ?? !1,
      local: (t == null ? void 0 : t.local) ?? !1,
      ...j.errToObj(t == null ? void 0 : t.message)
    });
  }
  date(t) {
    return this._addCheck({ kind: "date", message: t });
  }
  time(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: t
    }) : this._addCheck({
      kind: "time",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      ...j.errToObj(t == null ? void 0 : t.message)
    });
  }
  duration(t) {
    return this._addCheck({ kind: "duration", ...j.errToObj(t) });
  }
  regex(t, r) {
    return this._addCheck({
      kind: "regex",
      regex: t,
      ...j.errToObj(r)
    });
  }
  includes(t, r) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: r == null ? void 0 : r.position,
      ...j.errToObj(r == null ? void 0 : r.message)
    });
  }
  startsWith(t, r) {
    return this._addCheck({
      kind: "startsWith",
      value: t,
      ...j.errToObj(r)
    });
  }
  endsWith(t, r) {
    return this._addCheck({
      kind: "endsWith",
      value: t,
      ...j.errToObj(r)
    });
  }
  min(t, r) {
    return this._addCheck({
      kind: "min",
      value: t,
      ...j.errToObj(r)
    });
  }
  max(t, r) {
    return this._addCheck({
      kind: "max",
      value: t,
      ...j.errToObj(r)
    });
  }
  length(t, r) {
    return this._addCheck({
      kind: "length",
      value: t,
      ...j.errToObj(r)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(t) {
    return this.min(1, j.errToObj(t));
  }
  trim() {
    return new We({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new We({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new We({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((t) => t.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((t) => t.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((t) => t.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((t) => t.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((t) => t.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((t) => t.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((t) => t.kind === "base64url");
  }
  get minLength() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
}
We.create = (e) => new We({
  checks: [],
  typeName: q.ZodString,
  coerce: (e == null ? void 0 : e.coerce) ?? !1,
  ...Y(e)
});
function wi(e, t) {
  const r = (e.toString().split(".")[1] || "").length, n = (t.toString().split(".")[1] || "").length, a = r > n ? r : n, s = Number.parseInt(e.toFixed(a).replace(".", "")), i = Number.parseInt(t.toFixed(a).replace(".", ""));
  return s % i / 10 ** a;
}
class gt extends G {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== M.number) {
      const s = this._getOrReturnCtx(t);
      return L(s, {
        code: S.invalid_type,
        expected: M.number,
        received: s.parsedType
      }), H;
    }
    let n;
    const a = new Ee();
    for (const s of this._def.checks)
      s.kind === "int" ? J.isInteger(t.data) || (n = this._getOrReturnCtx(t, n), L(n, {
        code: S.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), a.dirty()) : s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (n = this._getOrReturnCtx(t, n), L(n, {
        code: S.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), a.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (n = this._getOrReturnCtx(t, n), L(n, {
        code: S.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), a.dirty()) : s.kind === "multipleOf" ? wi(t.data, s.value) !== 0 && (n = this._getOrReturnCtx(t, n), L(n, {
        code: S.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), a.dirty()) : s.kind === "finite" ? Number.isFinite(t.data) || (n = this._getOrReturnCtx(t, n), L(n, {
        code: S.not_finite,
        message: s.message
      }), a.dirty()) : J.assertNever(s);
    return { status: a.value, value: t.data };
  }
  gte(t, r) {
    return this.setLimit("min", t, !0, j.toString(r));
  }
  gt(t, r) {
    return this.setLimit("min", t, !1, j.toString(r));
  }
  lte(t, r) {
    return this.setLimit("max", t, !0, j.toString(r));
  }
  lt(t, r) {
    return this.setLimit("max", t, !1, j.toString(r));
  }
  setLimit(t, r, n, a) {
    return new gt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: r,
          inclusive: n,
          message: j.toString(a)
        }
      ]
    });
  }
  _addCheck(t) {
    return new gt({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  int(t) {
    return this._addCheck({
      kind: "int",
      message: j.toString(t)
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: j.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: j.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: j.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: j.toString(t)
    });
  }
  multipleOf(t, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: j.toString(r)
    });
  }
  finite(t) {
    return this._addCheck({
      kind: "finite",
      message: j.toString(t)
    });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: j.toString(t)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: j.toString(t)
    });
  }
  get minValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && J.isInteger(t.value));
  }
  get isFinite() {
    let t = null, r = null;
    for (const n of this._def.checks) {
      if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
        return !0;
      n.kind === "min" ? (r === null || n.value > r) && (r = n.value) : n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    }
    return Number.isFinite(r) && Number.isFinite(t);
  }
}
gt.create = (e) => new gt({
  checks: [],
  typeName: q.ZodNumber,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...Y(e)
});
class vt extends G {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(t) {
    if (this._def.coerce)
      try {
        t.data = BigInt(t.data);
      } catch {
        return this._getInvalidInput(t);
      }
    if (this._getType(t) !== M.bigint)
      return this._getInvalidInput(t);
    let n;
    const a = new Ee();
    for (const s of this._def.checks)
      s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (n = this._getOrReturnCtx(t, n), L(n, {
        code: S.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), a.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (n = this._getOrReturnCtx(t, n), L(n, {
        code: S.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), a.dirty()) : s.kind === "multipleOf" ? t.data % s.value !== BigInt(0) && (n = this._getOrReturnCtx(t, n), L(n, {
        code: S.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), a.dirty()) : J.assertNever(s);
    return { status: a.value, value: t.data };
  }
  _getInvalidInput(t) {
    const r = this._getOrReturnCtx(t);
    return L(r, {
      code: S.invalid_type,
      expected: M.bigint,
      received: r.parsedType
    }), H;
  }
  gte(t, r) {
    return this.setLimit("min", t, !0, j.toString(r));
  }
  gt(t, r) {
    return this.setLimit("min", t, !1, j.toString(r));
  }
  lte(t, r) {
    return this.setLimit("max", t, !0, j.toString(r));
  }
  lt(t, r) {
    return this.setLimit("max", t, !1, j.toString(r));
  }
  setLimit(t, r, n, a) {
    return new vt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: r,
          inclusive: n,
          message: j.toString(a)
        }
      ]
    });
  }
  _addCheck(t) {
    return new vt({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: j.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: j.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: j.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: j.toString(t)
    });
  }
  multipleOf(t, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: j.toString(r)
    });
  }
  get minValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
}
vt.create = (e) => new vt({
  checks: [],
  typeName: q.ZodBigInt,
  coerce: (e == null ? void 0 : e.coerce) ?? !1,
  ...Y(e)
});
class mr extends G {
  _parse(t) {
    if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== M.boolean) {
      const n = this._getOrReturnCtx(t);
      return L(n, {
        code: S.invalid_type,
        expected: M.boolean,
        received: n.parsedType
      }), H;
    }
    return Re(t.data);
  }
}
mr.create = (e) => new mr({
  typeName: q.ZodBoolean,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...Y(e)
});
class At extends G {
  _parse(t) {
    if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== M.date) {
      const s = this._getOrReturnCtx(t);
      return L(s, {
        code: S.invalid_type,
        expected: M.date,
        received: s.parsedType
      }), H;
    }
    if (Number.isNaN(t.data.getTime())) {
      const s = this._getOrReturnCtx(t);
      return L(s, {
        code: S.invalid_date
      }), H;
    }
    const n = new Ee();
    let a;
    for (const s of this._def.checks)
      s.kind === "min" ? t.data.getTime() < s.value && (a = this._getOrReturnCtx(t, a), L(a, {
        code: S.too_small,
        message: s.message,
        inclusive: !0,
        exact: !1,
        minimum: s.value,
        type: "date"
      }), n.dirty()) : s.kind === "max" ? t.data.getTime() > s.value && (a = this._getOrReturnCtx(t, a), L(a, {
        code: S.too_big,
        message: s.message,
        inclusive: !0,
        exact: !1,
        maximum: s.value,
        type: "date"
      }), n.dirty()) : J.assertNever(s);
    return {
      status: n.value,
      value: new Date(t.data.getTime())
    };
  }
  _addCheck(t) {
    return new At({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  min(t, r) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: j.toString(r)
    });
  }
  max(t, r) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: j.toString(r)
    });
  }
  get minDate() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t != null ? new Date(t) : null;
  }
}
At.create = (e) => new At({
  checks: [],
  coerce: (e == null ? void 0 : e.coerce) || !1,
  typeName: q.ZodDate,
  ...Y(e)
});
class Yn extends G {
  _parse(t) {
    if (this._getType(t) !== M.symbol) {
      const n = this._getOrReturnCtx(t);
      return L(n, {
        code: S.invalid_type,
        expected: M.symbol,
        received: n.parsedType
      }), H;
    }
    return Re(t.data);
  }
}
Yn.create = (e) => new Yn({
  typeName: q.ZodSymbol,
  ...Y(e)
});
class Gn extends G {
  _parse(t) {
    if (this._getType(t) !== M.undefined) {
      const n = this._getOrReturnCtx(t);
      return L(n, {
        code: S.invalid_type,
        expected: M.undefined,
        received: n.parsedType
      }), H;
    }
    return Re(t.data);
  }
}
Gn.create = (e) => new Gn({
  typeName: q.ZodUndefined,
  ...Y(e)
});
class Jn extends G {
  _parse(t) {
    if (this._getType(t) !== M.null) {
      const n = this._getOrReturnCtx(t);
      return L(n, {
        code: S.invalid_type,
        expected: M.null,
        received: n.parsedType
      }), H;
    }
    return Re(t.data);
  }
}
Jn.create = (e) => new Jn({
  typeName: q.ZodNull,
  ...Y(e)
});
class Kn extends G {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(t) {
    return Re(t.data);
  }
}
Kn.create = (e) => new Kn({
  typeName: q.ZodAny,
  ...Y(e)
});
class Xn extends G {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(t) {
    return Re(t.data);
  }
}
Xn.create = (e) => new Xn({
  typeName: q.ZodUnknown,
  ...Y(e)
});
class ot extends G {
  _parse(t) {
    const r = this._getOrReturnCtx(t);
    return L(r, {
      code: S.invalid_type,
      expected: M.never,
      received: r.parsedType
    }), H;
  }
}
ot.create = (e) => new ot({
  typeName: q.ZodNever,
  ...Y(e)
});
class Qn extends G {
  _parse(t) {
    if (this._getType(t) !== M.undefined) {
      const n = this._getOrReturnCtx(t);
      return L(n, {
        code: S.invalid_type,
        expected: M.void,
        received: n.parsedType
      }), H;
    }
    return Re(t.data);
  }
}
Qn.create = (e) => new Qn({
  typeName: q.ZodVoid,
  ...Y(e)
});
class Ue extends G {
  _parse(t) {
    const { ctx: r, status: n } = this._processInputParams(t), a = this._def;
    if (r.parsedType !== M.array)
      return L(r, {
        code: S.invalid_type,
        expected: M.array,
        received: r.parsedType
      }), H;
    if (a.exactLength !== null) {
      const i = r.data.length > a.exactLength.value, l = r.data.length < a.exactLength.value;
      (i || l) && (L(r, {
        code: i ? S.too_big : S.too_small,
        minimum: l ? a.exactLength.value : void 0,
        maximum: i ? a.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: a.exactLength.message
      }), n.dirty());
    }
    if (a.minLength !== null && r.data.length < a.minLength.value && (L(r, {
      code: S.too_small,
      minimum: a.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: a.minLength.message
    }), n.dirty()), a.maxLength !== null && r.data.length > a.maxLength.value && (L(r, {
      code: S.too_big,
      maximum: a.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: a.maxLength.message
    }), n.dirty()), r.common.async)
      return Promise.all([...r.data].map((i, l) => a.type._parseAsync(new lt(r, i, r.path, l)))).then((i) => Ee.mergeArray(n, i));
    const s = [...r.data].map((i, l) => a.type._parseSync(new lt(r, i, r.path, l)));
    return Ee.mergeArray(n, s);
  }
  get element() {
    return this._def.type;
  }
  min(t, r) {
    return new Ue({
      ...this._def,
      minLength: { value: t, message: j.toString(r) }
    });
  }
  max(t, r) {
    return new Ue({
      ...this._def,
      maxLength: { value: t, message: j.toString(r) }
    });
  }
  length(t, r) {
    return new Ue({
      ...this._def,
      exactLength: { value: t, message: j.toString(r) }
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Ue.create = (e, t) => new Ue({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: q.ZodArray,
  ...Y(t)
});
function kt(e) {
  if (e instanceof oe) {
    const t = {};
    for (const r in e.shape) {
      const n = e.shape[r];
      t[r] = it.create(kt(n));
    }
    return new oe({
      ...e._def,
      shape: () => t
    });
  } else return e instanceof Ue ? new Ue({
    ...e._def,
    type: kt(e.element)
  }) : e instanceof it ? it.create(kt(e.unwrap())) : e instanceof Ot ? Ot.create(kt(e.unwrap())) : e instanceof yt ? yt.create(e.items.map((t) => kt(t))) : e;
}
class oe extends G {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const t = this._def.shape(), r = J.objectKeys(t);
    return this._cached = { shape: t, keys: r }, this._cached;
  }
  _parse(t) {
    if (this._getType(t) !== M.object) {
      const u = this._getOrReturnCtx(t);
      return L(u, {
        code: S.invalid_type,
        expected: M.object,
        received: u.parsedType
      }), H;
    }
    const { status: n, ctx: a } = this._processInputParams(t), { shape: s, keys: i } = this._getCached(), l = [];
    if (!(this._def.catchall instanceof ot && this._def.unknownKeys === "strip"))
      for (const u in a.data)
        i.includes(u) || l.push(u);
    const o = [];
    for (const u of i) {
      const c = s[u], h = a.data[u];
      o.push({
        key: { status: "valid", value: u },
        value: c._parse(new lt(a, h, a.path, u)),
        alwaysSet: u in a.data
      });
    }
    if (this._def.catchall instanceof ot) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const c of l)
          o.push({
            key: { status: "valid", value: c },
            value: { status: "valid", value: a.data[c] }
          });
      else if (u === "strict")
        l.length > 0 && (L(a, {
          code: S.unrecognized_keys,
          keys: l
        }), n.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const c of l) {
        const h = a.data[c];
        o.push({
          key: { status: "valid", value: c },
          value: u._parse(
            new lt(a, h, a.path, c)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: c in a.data
        });
      }
    }
    return a.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const c of o) {
        const h = await c.key, g = await c.value;
        u.push({
          key: h,
          value: g,
          alwaysSet: c.alwaysSet
        });
      }
      return u;
    }).then((u) => Ee.mergeObjectSync(n, u)) : Ee.mergeObjectSync(n, o);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return j.errToObj, new oe({
      ...this._def,
      unknownKeys: "strict",
      ...t !== void 0 ? {
        errorMap: (r, n) => {
          var s, i;
          const a = ((i = (s = this._def).errorMap) == null ? void 0 : i.call(s, r, n).message) ?? n.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: j.errToObj(t).message ?? a
          } : {
            message: a
          };
        }
      } : {}
    });
  }
  strip() {
    return new oe({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new oe({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(t) {
    return new oe({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...t
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(t) {
    return new oe({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...t._def.shape()
      }),
      typeName: q.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(t, r) {
    return this.augment({ [t]: r });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(t) {
    return new oe({
      ...this._def,
      catchall: t
    });
  }
  pick(t) {
    const r = {};
    for (const n of J.objectKeys(t))
      t[n] && this.shape[n] && (r[n] = this.shape[n]);
    return new oe({
      ...this._def,
      shape: () => r
    });
  }
  omit(t) {
    const r = {};
    for (const n of J.objectKeys(this.shape))
      t[n] || (r[n] = this.shape[n]);
    return new oe({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return kt(this);
  }
  partial(t) {
    const r = {};
    for (const n of J.objectKeys(this.shape)) {
      const a = this.shape[n];
      t && !t[n] ? r[n] = a : r[n] = a.optional();
    }
    return new oe({
      ...this._def,
      shape: () => r
    });
  }
  required(t) {
    const r = {};
    for (const n of J.objectKeys(this.shape))
      if (t && !t[n])
        r[n] = this.shape[n];
      else {
        let s = this.shape[n];
        for (; s instanceof it; )
          s = s._def.innerType;
        r[n] = s;
      }
    return new oe({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return Na(J.objectKeys(this.shape));
  }
}
oe.create = (e, t) => new oe({
  shape: () => e,
  unknownKeys: "strip",
  catchall: ot.create(),
  typeName: q.ZodObject,
  ...Y(t)
});
oe.strictCreate = (e, t) => new oe({
  shape: () => e,
  unknownKeys: "strict",
  catchall: ot.create(),
  typeName: q.ZodObject,
  ...Y(t)
});
oe.lazycreate = (e, t) => new oe({
  shape: e,
  unknownKeys: "strip",
  catchall: ot.create(),
  typeName: q.ZodObject,
  ...Y(t)
});
class pr extends G {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), n = this._def.options;
    function a(s) {
      for (const l of s)
        if (l.result.status === "valid")
          return l.result;
      for (const l of s)
        if (l.result.status === "dirty")
          return r.common.issues.push(...l.ctx.common.issues), l.result;
      const i = s.map((l) => new Ge(l.ctx.common.issues));
      return L(r, {
        code: S.invalid_union,
        unionErrors: i
      }), H;
    }
    if (r.common.async)
      return Promise.all(n.map(async (s) => {
        const i = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await s._parseAsync({
            data: r.data,
            path: r.path,
            parent: i
          }),
          ctx: i
        };
      })).then(a);
    {
      let s;
      const i = [];
      for (const o of n) {
        const u = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, c = o._parseSync({
          data: r.data,
          path: r.path,
          parent: u
        });
        if (c.status === "valid")
          return c;
        c.status === "dirty" && !s && (s = { result: c, ctx: u }), u.common.issues.length && i.push(u.common.issues);
      }
      if (s)
        return r.common.issues.push(...s.ctx.common.issues), s.result;
      const l = i.map((o) => new Ge(o));
      return L(r, {
        code: S.invalid_union,
        unionErrors: l
      }), H;
    }
  }
  get options() {
    return this._def.options;
  }
}
pr.create = (e, t) => new pr({
  options: e,
  typeName: q.ZodUnion,
  ...Y(t)
});
function qr(e, t) {
  const r = rt(e), n = rt(t);
  if (e === t)
    return { valid: !0, data: e };
  if (r === M.object && n === M.object) {
    const a = J.objectKeys(t), s = J.objectKeys(e).filter((l) => a.indexOf(l) !== -1), i = { ...e, ...t };
    for (const l of s) {
      const o = qr(e[l], t[l]);
      if (!o.valid)
        return { valid: !1 };
      i[l] = o.data;
    }
    return { valid: !0, data: i };
  } else if (r === M.array && n === M.array) {
    if (e.length !== t.length)
      return { valid: !1 };
    const a = [];
    for (let s = 0; s < e.length; s++) {
      const i = e[s], l = t[s], o = qr(i, l);
      if (!o.valid)
        return { valid: !1 };
      a.push(o.data);
    }
    return { valid: !0, data: a };
  } else return r === M.date && n === M.date && +e == +t ? { valid: !0, data: e } : { valid: !1 };
}
class gr extends G {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t), a = (s, i) => {
      if (Wn(s) || Wn(i))
        return H;
      const l = qr(s.value, i.value);
      return l.valid ? ((Hn(s) || Hn(i)) && r.dirty(), { status: r.value, value: l.data }) : (L(n, {
        code: S.invalid_intersection_types
      }), H);
    };
    return n.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }),
      this._def.right._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      })
    ]).then(([s, i]) => a(s, i)) : a(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
}
gr.create = (e, t, r) => new gr({
  left: e,
  right: t,
  typeName: q.ZodIntersection,
  ...Y(r)
});
class yt extends G {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== M.array)
      return L(n, {
        code: S.invalid_type,
        expected: M.array,
        received: n.parsedType
      }), H;
    if (n.data.length < this._def.items.length)
      return L(n, {
        code: S.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), H;
    !this._def.rest && n.data.length > this._def.items.length && (L(n, {
      code: S.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const s = [...n.data].map((i, l) => {
      const o = this._def.items[l] || this._def.rest;
      return o ? o._parse(new lt(n, i, n.path, l)) : null;
    }).filter((i) => !!i);
    return n.common.async ? Promise.all(s).then((i) => Ee.mergeArray(r, i)) : Ee.mergeArray(r, s);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new yt({
      ...this._def,
      rest: t
    });
  }
}
yt.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new yt({
    items: e,
    typeName: q.ZodTuple,
    rest: null,
    ...Y(t)
  });
};
class ea extends G {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== M.map)
      return L(n, {
        code: S.invalid_type,
        expected: M.map,
        received: n.parsedType
      }), H;
    const a = this._def.keyType, s = this._def.valueType, i = [...n.data.entries()].map(([l, o], u) => ({
      key: a._parse(new lt(n, l, n.path, [u, "key"])),
      value: s._parse(new lt(n, o, n.path, [u, "value"]))
    }));
    if (n.common.async) {
      const l = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const o of i) {
          const u = await o.key, c = await o.value;
          if (u.status === "aborted" || c.status === "aborted")
            return H;
          (u.status === "dirty" || c.status === "dirty") && r.dirty(), l.set(u.value, c.value);
        }
        return { status: r.value, value: l };
      });
    } else {
      const l = /* @__PURE__ */ new Map();
      for (const o of i) {
        const u = o.key, c = o.value;
        if (u.status === "aborted" || c.status === "aborted")
          return H;
        (u.status === "dirty" || c.status === "dirty") && r.dirty(), l.set(u.value, c.value);
      }
      return { status: r.value, value: l };
    }
  }
}
ea.create = (e, t, r) => new ea({
  valueType: t,
  keyType: e,
  typeName: q.ZodMap,
  ...Y(r)
});
class Gt extends G {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== M.set)
      return L(n, {
        code: S.invalid_type,
        expected: M.set,
        received: n.parsedType
      }), H;
    const a = this._def;
    a.minSize !== null && n.data.size < a.minSize.value && (L(n, {
      code: S.too_small,
      minimum: a.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: a.minSize.message
    }), r.dirty()), a.maxSize !== null && n.data.size > a.maxSize.value && (L(n, {
      code: S.too_big,
      maximum: a.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: a.maxSize.message
    }), r.dirty());
    const s = this._def.valueType;
    function i(o) {
      const u = /* @__PURE__ */ new Set();
      for (const c of o) {
        if (c.status === "aborted")
          return H;
        c.status === "dirty" && r.dirty(), u.add(c.value);
      }
      return { status: r.value, value: u };
    }
    const l = [...n.data.values()].map((o, u) => s._parse(new lt(n, o, n.path, u)));
    return n.common.async ? Promise.all(l).then((o) => i(o)) : i(l);
  }
  min(t, r) {
    return new Gt({
      ...this._def,
      minSize: { value: t, message: j.toString(r) }
    });
  }
  max(t, r) {
    return new Gt({
      ...this._def,
      maxSize: { value: t, message: j.toString(r) }
    });
  }
  size(t, r) {
    return this.min(t, r).max(t, r);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Gt.create = (e, t) => new Gt({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: q.ZodSet,
  ...Y(t)
});
class ta extends G {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
ta.create = (e, t) => new ta({
  getter: e,
  typeName: q.ZodLazy,
  ...Y(t)
});
class ra extends G {
  _parse(t) {
    if (t.data !== this._def.value) {
      const r = this._getOrReturnCtx(t);
      return L(r, {
        received: r.data,
        code: S.invalid_literal,
        expected: this._def.value
      }), H;
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
ra.create = (e, t) => new ra({
  value: e,
  typeName: q.ZodLiteral,
  ...Y(t)
});
function Na(e, t) {
  return new Ft({
    values: e,
    typeName: q.ZodEnum,
    ...Y(t)
  });
}
class Ft extends G {
  _parse(t) {
    if (typeof t.data != "string") {
      const r = this._getOrReturnCtx(t), n = this._def.values;
      return L(r, {
        expected: J.joinValues(n),
        received: r.parsedType,
        code: S.invalid_type
      }), H;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(t.data)) {
      const r = this._getOrReturnCtx(t), n = this._def.values;
      return L(r, {
        received: r.data,
        code: S.invalid_enum_value,
        options: n
      }), H;
    }
    return Re(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  get Values() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  get Enum() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  extract(t, r = this._def) {
    return Ft.create(t, {
      ...this._def,
      ...r
    });
  }
  exclude(t, r = this._def) {
    return Ft.create(this.options.filter((n) => !t.includes(n)), {
      ...this._def,
      ...r
    });
  }
}
Ft.create = Na;
class na extends G {
  _parse(t) {
    const r = J.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(t);
    if (n.parsedType !== M.string && n.parsedType !== M.number) {
      const a = J.objectValues(r);
      return L(n, {
        expected: J.joinValues(a),
        received: n.parsedType,
        code: S.invalid_type
      }), H;
    }
    if (this._cache || (this._cache = new Set(J.getValidEnumValues(this._def.values))), !this._cache.has(t.data)) {
      const a = J.objectValues(r);
      return L(n, {
        received: n.data,
        code: S.invalid_enum_value,
        options: a
      }), H;
    }
    return Re(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
na.create = (e, t) => new na({
  values: e,
  typeName: q.ZodNativeEnum,
  ...Y(t)
});
class vr extends G {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== M.promise && r.common.async === !1)
      return L(r, {
        code: S.invalid_type,
        expected: M.promise,
        received: r.parsedType
      }), H;
    const n = r.parsedType === M.promise ? r.data : Promise.resolve(r.data);
    return Re(n.then((a) => this._def.type.parseAsync(a, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
vr.create = (e, t) => new vr({
  type: e,
  typeName: q.ZodPromise,
  ...Y(t)
});
class Rt extends G {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === q.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t), a = this._def.effect || null, s = {
      addIssue: (i) => {
        L(n, i), i.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (s.addIssue = s.addIssue.bind(s), a.type === "preprocess") {
      const i = a.transform(n.data, s);
      if (n.common.async)
        return Promise.resolve(i).then(async (l) => {
          if (r.value === "aborted")
            return H;
          const o = await this._def.schema._parseAsync({
            data: l,
            path: n.path,
            parent: n
          });
          return o.status === "aborted" ? H : o.status === "dirty" || r.value === "dirty" ? Wt(o.value) : o;
        });
      {
        if (r.value === "aborted")
          return H;
        const l = this._def.schema._parseSync({
          data: i,
          path: n.path,
          parent: n
        });
        return l.status === "aborted" ? H : l.status === "dirty" || r.value === "dirty" ? Wt(l.value) : l;
      }
    }
    if (a.type === "refinement") {
      const i = (l) => {
        const o = a.refinement(l, s);
        if (n.common.async)
          return Promise.resolve(o);
        if (o instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return l;
      };
      if (n.common.async === !1) {
        const l = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return l.status === "aborted" ? H : (l.status === "dirty" && r.dirty(), i(l.value), { status: r.value, value: l.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((l) => l.status === "aborted" ? H : (l.status === "dirty" && r.dirty(), i(l.value).then(() => ({ status: r.value, value: l.value }))));
    }
    if (a.type === "transform")
      if (n.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!Tt(i))
          return H;
        const l = a.transform(i.value, s);
        if (l instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: l };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((i) => Tt(i) ? Promise.resolve(a.transform(i.value, s)).then((l) => ({
          status: r.value,
          value: l
        })) : H);
    J.assertNever(a);
  }
}
Rt.create = (e, t, r) => new Rt({
  schema: e,
  typeName: q.ZodEffects,
  effect: t,
  ...Y(r)
});
Rt.createWithPreprocess = (e, t, r) => new Rt({
  schema: t,
  effect: { type: "preprocess", transform: e },
  typeName: q.ZodEffects,
  ...Y(r)
});
class it extends G {
  _parse(t) {
    return this._getType(t) === M.undefined ? Re(void 0) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
it.create = (e, t) => new it({
  innerType: e,
  typeName: q.ZodOptional,
  ...Y(t)
});
class Ot extends G {
  _parse(t) {
    return this._getType(t) === M.null ? Re(null) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ot.create = (e, t) => new Ot({
  innerType: e,
  typeName: q.ZodNullable,
  ...Y(t)
});
class Yr extends G {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    let n = r.data;
    return r.parsedType === M.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Yr.create = (e, t) => new Yr({
  innerType: e,
  typeName: q.ZodDefault,
  defaultValue: typeof t.default == "function" ? t.default : () => t.default,
  ...Y(t)
});
class Gr extends G {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), n = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, a = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n
      }
    });
    return hr(a) ? a.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Ge(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new Ge(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Gr.create = (e, t) => new Gr({
  innerType: e,
  typeName: q.ZodCatch,
  catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
  ...Y(t)
});
class aa extends G {
  _parse(t) {
    if (this._getType(t) !== M.nan) {
      const n = this._getOrReturnCtx(t);
      return L(n, {
        code: S.invalid_type,
        expected: M.nan,
        received: n.parsedType
      }), H;
    }
    return { status: "valid", value: t.data };
  }
}
aa.create = (e) => new aa({
  typeName: q.ZodNaN,
  ...Y(e)
});
class xi extends G {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), n = r.data;
    return this._def.type._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class fn extends G {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return s.status === "aborted" ? H : s.status === "dirty" ? (r.dirty(), Wt(s.value)) : this._def.out._parseAsync({
          data: s.value,
          path: n.path,
          parent: n
        });
      })();
    {
      const a = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      return a.status === "aborted" ? H : a.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: a.value
      }) : this._def.out._parseSync({
        data: a.value,
        path: n.path,
        parent: n
      });
    }
  }
  static create(t, r) {
    return new fn({
      in: t,
      out: r,
      typeName: q.ZodPipeline
    });
  }
}
class Jr extends G {
  _parse(t) {
    const r = this._def.innerType._parse(t), n = (a) => (Tt(a) && (a.value = Object.freeze(a.value)), a);
    return hr(r) ? r.then((a) => n(a)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Jr.create = (e, t) => new Jr({
  innerType: e,
  typeName: q.ZodReadonly,
  ...Y(t)
});
var q;
(function(e) {
  e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(q || (q = {}));
const Bt = We.create;
gt.create;
vt.create;
const _i = mr.create;
At.create;
ot.create;
Ue.create;
const ki = oe.create;
pr.create;
gr.create;
yt.create;
Ft.create;
vr.create;
it.create;
Ot.create;
const Ei = {
  string: (e) => We.create({ ...e, coerce: !0 }),
  number: (e) => gt.create({ ...e, coerce: !0 }),
  boolean: (e) => mr.create({
    ...e,
    coerce: !0
  }),
  bigint: (e) => vt.create({ ...e, coerce: !0 }),
  date: (e) => At.create({ ...e, coerce: !0 })
}, xe = ln(
  ({ label: e, error: t, helperText: r, className: n = "", ...a }, s) => /* @__PURE__ */ B("div", { className: "w-full", children: [
    e && /* @__PURE__ */ v("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: e }),
    /* @__PURE__ */ v(
      "input",
      {
        ref: s,
        className: `
            w-full rounded-md border px-3 py-2 text-sm
            ${t ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
            shadow-sm focus:outline-none focus:ring-1
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${n}
          `,
        ...a
      }
    ),
    t && /* @__PURE__ */ v("p", { className: "mt-1 text-sm text-red-600", children: t }),
    r && !t && /* @__PURE__ */ v("p", { className: "mt-1 text-sm text-gray-500", children: r })
  ] })
);
xe.displayName = "Input";
const Ct = ln(
  ({ label: e, options: t, error: r, helperText: n, isLoading: a = !1, className: s = "", ...i }, l) => /* @__PURE__ */ B("div", { className: "w-full", children: [
    e && /* @__PURE__ */ v("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: e }),
    /* @__PURE__ */ B("div", { className: "relative", children: [
      /* @__PURE__ */ B(
        "select",
        {
          ref: l,
          className: `
              w-full rounded-md border px-3 py-2 text-sm appearance-none bg-white
              ${r ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
              shadow-sm focus:outline-none focus:ring-1
              disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
              ${s}
            `,
          disabled: i.disabled || a,
          ...i,
          children: [
            /* @__PURE__ */ v("option", { value: "", disabled: !0, children: i.placeholder || "Select an option" }),
            t.map((o) => /* @__PURE__ */ v("option", { value: o.value, children: o.label }, o.value))
          ]
        }
      ),
      a && /* @__PURE__ */ v("div", { className: "absolute right-2 top-1/2 transform -translate-y-1/2", children: /* @__PURE__ */ v("div", { className: "animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" }) })
    ] }),
    r && /* @__PURE__ */ v("p", { className: "mt-1 text-sm text-red-600", children: r }),
    n && !r && /* @__PURE__ */ v("p", { className: "mt-1 text-sm text-gray-500", children: n })
  ] })
);
Ct.displayName = "Select";
const Sa = Ze({
  hasPermission: () => !1,
  userPermissions: []
}), Ta = () => Ce(Sa), vc = ({
  children: e,
  permissions: t = []
}) => {
  const [r] = ee(t), n = (a) => a ? !r || r.length === 0 ? !1 : Array.isArray(a) ? a.some((s) => r.includes(s)) : r.includes(a) : !0;
  return /* @__PURE__ */ v(Sa.Provider, { value: { hasPermission: n, userPermissions: r }, children: e });
}, ue = ({
  variant: e = "primary",
  size: t = "md",
  fullWidth: r = !1,
  isLoading: n = !1,
  permission: a,
  className: s = "",
  children: i,
  ...l
}) => {
  const { hasPermission: o } = Ta();
  if (a && !o(a))
    return null;
  const u = "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2", c = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500"
  }, h = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }, g = r ? "w-full" : "", N = `
    ${u}
    ${c[e]}
    ${h[t]}
    ${g}
    ${n ? "opacity-75 cursor-not-allowed" : ""}
    ${s}
  `;
  return /* @__PURE__ */ B(
    "button",
    {
      className: N,
      disabled: n || l.disabled,
      ...l,
      children: [
        n && /* @__PURE__ */ B("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-current", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ v("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
          /* @__PURE__ */ v("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
        ] }),
        i
      ]
    }
  );
}, Kr = async (e, t) => {
  try {
    const r = new URL(e.url);
    e.params && Object.entries(e.params).forEach(([s, i]) => {
      r.searchParams.append(s, i);
    }), e.dependsOn && t && r.searchParams.append(e.dependsOn, t);
    const n = await fetch(r.toString(), {
      method: e.method || "GET",
      headers: e.headers || {
        "Content-Type": "application/json"
      },
      body: e.method !== "GET" && e.bodyData ? JSON.stringify(e.bodyData) : void 0
    });
    if (!n.ok)
      throw new Error(`API request failed with status ${n.status}`);
    const a = await n.json();
    return Ci(a, e.responseMapping);
  } catch (r) {
    return console.error("Error fetching options from API:", r), [];
  }
}, Ci = (e, t) => {
  if (Array.isArray(e))
    return e.map((n) => ({
      value: dt(n, t.value),
      label: dt(n, t.label)
    }));
  const r = dt(e, "items") || dt(e, "data") || dt(e, "results") || [];
  return Array.isArray(r) ? r.map((n) => ({
    value: dt(n, t.value),
    label: dt(n, t.label)
  })) : [];
}, dt = (e, t) => t.split(".").reduce((r, n) => r ? r[n] : null, e), Ni = ({
  schema: e,
  defaultValues: t = {},
  mode: r,
  onSubmit: n,
  onCancel: a,
  isSubmitting: s = !1,
  submitLabel: i,
  cancelLabel: l = "Cancel"
}) => {
  const [o, u] = ee({}), [c, h] = ee({}), N = (() => {
    const _ = {};
    return e.fields.forEach((F) => {
      var R, O, U, D, z;
      let E;
      switch (F.type) {
        case "text":
        case "textarea":
        case "password":
          E = Bt(), F.validation && (F.validation.required && (E = E.min(1, F.validation.required)), F.validation.minLength && (E = E.min(F.validation.minLength, `Minimum ${F.validation.minLength} characters required`)), F.validation.maxLength && (E = E.max(F.validation.maxLength, `Maximum ${F.validation.maxLength} characters allowed`)), F.validation.pattern && (E = E.regex(F.validation.pattern.value, F.validation.pattern.message)));
          break;
        case "email":
          E = Bt().email(((R = F.validation) == null ? void 0 : R.required) || "Invalid email address"), F.validation && F.validation.required && (E = E.min(1, F.validation.required));
          break;
        case "number":
          E = Ei.number(), F.validation && (F.validation.required && (E = E.min(F.validation.min || 0, F.validation.required)), F.validation.min !== void 0 && (E = E.min(F.validation.min, `Minimum value is ${F.validation.min}`)), F.validation.max !== void 0 && (E = E.max(F.validation.max, `Maximum value is ${F.validation.max}`)));
          break;
        case "checkbox":
          E = _i();
          break;
        case "date":
          E = Bt(), (O = F.validation) != null && O.required && (E = E.min(1, F.validation.required));
          break;
        case "select":
        case "radio":
          E = Bt(), (U = F.validation) != null && U.required && (E = E.min(1, F.validation.required));
          break;
        default:
          E = Bt(), (D = F.validation) != null && D.required && (E = E.min(1, F.validation.required));
      }
      (z = F.validation) != null && z.required || (E = E.optional()), _[F.name] = E;
    }), ki(_);
  })(), {
    register: k,
    handleSubmit: x,
    formState: { errors: C },
    watch: f,
    setValue: m
  } = Ws({
    resolver: Gs(N),
    defaultValues: t
  });
  ie(() => {
    e.fields.forEach(async (_) => {
      if (_.dataSource && _.dataSource.type === "api" && !_.dataSource.dependsOn) {
        h((F) => ({ ...F, [_.name]: !0 }));
        try {
          const F = await Kr(_.dataSource);
          u((E) => ({ ...E, [_.name]: F }));
        } finally {
          h((F) => ({ ...F, [_.name]: !1 }));
        }
      }
    });
  }, [e.fields]), ie(() => {
    const _ = f((F, { name: E, type: R }) => {
      !E || R !== "change" || e.fields.forEach(async (O) => {
        var U;
        if (((U = O.dataSource) == null ? void 0 : U.dependsOn) === E) {
          h((D) => ({ ...D, [O.name]: !0 })), m(O.name, "");
          try {
            const D = await Kr(O.dataSource, F[E]);
            u((z) => ({ ...z, [O.name]: D }));
          } finally {
            h((D) => ({ ...D, [O.name]: !1 }));
          }
        }
      });
    });
    return () => _.unsubscribe();
  }, [f, e.fields, m]);
  const y = r === "view", A = (_) => {
    var E, R, O, U, D;
    const F = {
      label: _.label,
      placeholder: _.placeholder,
      disabled: y || _.disabled,
      error: (E = C[_.name]) == null ? void 0 : E.message,
      helperText: _.helperText,
      ...k(_.name)
    };
    switch (_.type) {
      case "select":
        const z = o[_.name] || _.options || [], K = c[_.name] || !1;
        return /* @__PURE__ */ v(
          Ct,
          {
            options: z,
            isLoading: K,
            ...F
          },
          _.name
        );
      case "textarea":
        return /* @__PURE__ */ B("div", { className: "w-full", children: [
          _.label && /* @__PURE__ */ v("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: _.label }),
          /* @__PURE__ */ v(
            "textarea",
            {
              className: `
                w-full rounded-md border px-3 py-2 text-sm
                ${C[_.name] ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
                shadow-sm focus:outline-none focus:ring-1
                disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
              `,
              rows: 4,
              ...k(_.name),
              placeholder: _.placeholder,
              disabled: y || _.disabled
            }
          ),
          C[_.name] && /* @__PURE__ */ v("p", { className: "mt-1 text-sm text-red-600", children: (R = C[_.name]) == null ? void 0 : R.message }),
          _.helperText && !C[_.name] && /* @__PURE__ */ v("p", { className: "mt-1 text-sm text-gray-500", children: _.helperText })
        ] }, _.name);
      case "checkbox":
        return /* @__PURE__ */ B("div", { className: "flex items-center", children: [
          /* @__PURE__ */ v(
            "input",
            {
              type: "checkbox",
              className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
              ...k(_.name),
              disabled: y || _.disabled
            }
          ),
          /* @__PURE__ */ v("label", { className: "ml-2 block text-sm text-gray-900", children: _.label }),
          C[_.name] && /* @__PURE__ */ v("p", { className: "mt-1 text-sm text-red-600", children: (O = C[_.name]) == null ? void 0 : O.message })
        ] }, _.name);
      case "radio":
        return /* @__PURE__ */ B("div", { className: "space-y-2", children: [
          /* @__PURE__ */ v("label", { className: "block text-sm font-medium text-gray-700", children: _.label }),
          /* @__PURE__ */ v("div", { className: "space-y-2", children: (U = _.options) == null ? void 0 : U.map((X) => /* @__PURE__ */ B("div", { className: "flex items-center", children: [
            /* @__PURE__ */ v(
              "input",
              {
                type: "radio",
                id: `${_.name}-${X.value}`,
                value: X.value,
                className: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500",
                ...k(_.name),
                disabled: y || _.disabled
              }
            ),
            /* @__PURE__ */ v("label", { htmlFor: `${_.name}-${X.value}`, className: "ml-2 block text-sm text-gray-900", children: X.label })
          ] }, X.value)) }),
          C[_.name] && /* @__PURE__ */ v("p", { className: "mt-1 text-sm text-red-600", children: (D = C[_.name]) == null ? void 0 : D.message }),
          _.helperText && !C[_.name] && /* @__PURE__ */ v("p", { className: "mt-1 text-sm text-gray-500", children: _.helperText })
        ] }, _.name);
      default:
        return /* @__PURE__ */ v(
          xe,
          {
            type: _.type,
            ...F
          },
          _.name
        );
    }
  }, I = () => i || (r === "create" ? "Create" : "Update");
  return /* @__PURE__ */ B("form", { onSubmit: x(n), className: "space-y-4", children: [
    e.fields.map((_) => A(_)),
    /* @__PURE__ */ B("div", { className: "flex justify-end space-x-2 pt-4", children: [
      /* @__PURE__ */ v(
        ue,
        {
          type: "button",
          variant: "outline",
          onClick: a,
          children: l
        }
      ),
      !y && /* @__PURE__ */ v(
        ue,
        {
          type: "submit",
          isLoading: s,
          children: I()
        }
      )
    ] })
  ] });
};
var Si = Object.defineProperty, Ti = (e, t, r) => t in e ? Si(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ir = (e, t, r) => (Ti(e, typeof t != "symbol" ? t + "" : t, r), r);
let Ai = class {
  constructor() {
    Ir(this, "current", this.detect()), Ir(this, "handoffState", "pending"), Ir(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.handoffState = "pending", this.currentId = 0, this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, He = new Ai(), Fe = (e, t) => {
  He.isServer ? ie(e, t) : ys(e, t);
};
function qe(e) {
  let t = ne(e);
  return Fe(() => {
    t.current = e;
  }, [e]), t;
}
let se = function(e) {
  let t = qe(e);
  return W.useCallback((...r) => t.current(...r), [t]);
};
function Er(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function bt() {
  let e = [], t = { addEventListener(r, n, a, s) {
    return r.addEventListener(n, a, s), t.add(() => r.removeEventListener(n, a, s));
  }, requestAnimationFrame(...r) {
    let n = requestAnimationFrame(...r);
    return t.add(() => cancelAnimationFrame(n));
  }, nextFrame(...r) {
    return t.requestAnimationFrame(() => t.requestAnimationFrame(...r));
  }, setTimeout(...r) {
    let n = setTimeout(...r);
    return t.add(() => clearTimeout(n));
  }, microTask(...r) {
    let n = { current: !0 };
    return Er(() => {
      n.current && r[0]();
    }), t.add(() => {
      n.current = !1;
    });
  }, style(r, n, a) {
    let s = r.style.getPropertyValue(n);
    return Object.assign(r.style, { [n]: a }), this.add(() => {
      Object.assign(r.style, { [n]: s });
    });
  }, group(r) {
    let n = bt();
    return r(n), this.add(() => n.dispose());
  }, add(r) {
    return e.push(r), () => {
      let n = e.indexOf(r);
      if (n >= 0) for (let a of e.splice(n, 1)) a();
    };
  }, dispose() {
    for (let r of e.splice(0)) r();
  } };
  return t;
}
function hn() {
  let [e] = ee(bt);
  return ie(() => () => e.dispose(), [e]), e;
}
function Fi() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in b ? ((t) => t.useSyncExternalStore)(b)(() => () => {
  }, () => !1, () => !e) : !1;
}
function $t() {
  let e = Fi(), [t, r] = b.useState(He.isHandoffComplete);
  return t && He.isHandoffComplete === !1 && r(!1), b.useEffect(() => {
    t !== !0 && r(!0);
  }, [t]), b.useEffect(() => He.handoff(), []), e ? !1 : t;
}
var sa;
let Lt = (sa = W.useId) != null ? sa : function() {
  let e = $t(), [t, r] = W.useState(e ? () => He.nextId() : null);
  return Fe(() => {
    t === null && r(He.nextId());
  }, [t]), t != null ? "" + t : void 0;
};
function ge(e, t, ...r) {
  if (e in t) {
    let a = t[e];
    return typeof a == "function" ? a(...r) : a;
  }
  let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((a) => `"${a}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, ge), n;
}
function Aa(e) {
  return He.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
let Xr = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var ft = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(ft || {}), Fa = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Fa || {}), Ri = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Ri || {});
function Oi(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Xr)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var Ra = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Ra || {});
function $i(e, t = 0) {
  var r;
  return e === ((r = Aa(e)) == null ? void 0 : r.body) ? !1 : ge(t, { 0() {
    return e.matches(Xr);
  }, 1() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(Xr)) return !0;
      n = n.parentElement;
    }
    return !1;
  } });
}
var Li = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Li || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function pt(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Pi = ["textarea", "input"].join(",");
function Di(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Pi)) != null ? r : !1;
}
function Ii(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let a = t(r), s = t(n);
    if (a === null || s === null) return 0;
    let i = a.compareDocumentPosition(s);
    return i & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : i & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function lr(e, t, { sorted: r = !0, relativeTo: n = null, skipElements: a = [] } = {}) {
  let s = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, i = Array.isArray(e) ? r ? Ii(e) : e : Oi(e);
  a.length > 0 && i.length > 1 && (i = i.filter((N) => !a.includes(N))), n = n ?? s.activeElement;
  let l = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), o = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, i.indexOf(n)) - 1;
    if (t & 4) return Math.max(0, i.indexOf(n)) + 1;
    if (t & 8) return i.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = t & 32 ? { preventScroll: !0 } : {}, c = 0, h = i.length, g;
  do {
    if (c >= h || c + h <= 0) return 0;
    let N = o + c;
    if (t & 16) N = (N + h) % h;
    else {
      if (N < 0) return 3;
      if (N >= h) return 1;
    }
    g = i[N], g == null || g.focus(u), c += l;
  } while (g !== s.activeElement);
  return t & 6 && Di(g) && g.select(), 2;
}
function Oa() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Vi() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Mi() {
  return Oa() || Vi();
}
function nr(e, t, r) {
  let n = qe(t);
  ie(() => {
    function a(s) {
      n.current(s);
    }
    return document.addEventListener(e, a, r), () => document.removeEventListener(e, a, r);
  }, [e, r]);
}
function $a(e, t, r) {
  let n = qe(t);
  ie(() => {
    function a(s) {
      n.current(s);
    }
    return window.addEventListener(e, a, r), () => window.removeEventListener(e, a, r);
  }, [e, r]);
}
function ji(e, t, r = !0) {
  let n = ne(!1);
  ie(() => {
    requestAnimationFrame(() => {
      n.current = r;
    });
  }, [r]);
  function a(i, l) {
    if (!n.current || i.defaultPrevented) return;
    let o = l(i);
    if (o === null || !o.getRootNode().contains(o) || !o.isConnected) return;
    let u = function c(h) {
      return typeof h == "function" ? c(h()) : Array.isArray(h) || h instanceof Set ? h : [h];
    }(e);
    for (let c of u) {
      if (c === null) continue;
      let h = c instanceof HTMLElement ? c : c.current;
      if (h != null && h.contains(o) || i.composed && i.composedPath().includes(h)) return;
    }
    return !$i(o, Ra.Loose) && o.tabIndex !== -1 && i.preventDefault(), t(i, o);
  }
  let s = ne(null);
  nr("pointerdown", (i) => {
    var l, o;
    n.current && (s.current = ((o = (l = i.composedPath) == null ? void 0 : l.call(i)) == null ? void 0 : o[0]) || i.target);
  }, !0), nr("mousedown", (i) => {
    var l, o;
    n.current && (s.current = ((o = (l = i.composedPath) == null ? void 0 : l.call(i)) == null ? void 0 : o[0]) || i.target);
  }, !0), nr("click", (i) => {
    Mi() || s.current && (a(i, () => s.current), s.current = null);
  }, !0), nr("touchend", (i) => a(i, () => i.target instanceof HTMLElement ? i.target : null), !0), $a("blur", (i) => a(i, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Kt(...e) {
  return ve(() => Aa(...e), [...e]);
}
let La = Symbol();
function Bi(e, t = !0) {
  return Object.assign(e, { [La]: t });
}
function De(...e) {
  let t = ne(e);
  ie(() => {
    t.current = e;
  }, [e]);
  let r = se((n) => {
    for (let a of t.current) a != null && (typeof a == "function" ? a(n) : a.current = n);
  });
  return e.every((n) => n == null || (n == null ? void 0 : n[La])) ? void 0 : r;
}
function mn(e, t) {
  let r = ne([]), n = se(e);
  ie(() => {
    let a = [...r.current];
    for (let [s, i] of t.entries()) if (r.current[s] !== i) {
      let l = n(t, a);
      return r.current = t, l;
    }
  }, [n, ...t]);
}
function yr(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
var br = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(br || {}), st = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(st || {});
function Oe({ ourProps: e, theirProps: t, slot: r, defaultTag: n, features: a, visible: s = !0, name: i, mergeRefs: l }) {
  l = l ?? Ui;
  let o = Pa(t, e);
  if (s) return ar(o, r, n, i, l);
  let u = a ?? 0;
  if (u & 2) {
    let { static: c = !1, ...h } = o;
    if (c) return ar(h, r, n, i, l);
  }
  if (u & 1) {
    let { unmount: c = !0, ...h } = o;
    return ge(c ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return ar({ ...h, hidden: !0, style: { display: "none" } }, r, n, i, l);
    } });
  }
  return ar(o, r, n, i, l);
}
function ar(e, t = {}, r, n, a) {
  let { as: s = r, children: i, refName: l = "ref", ...o } = Vr(e, ["unmount", "static"]), u = e.ref !== void 0 ? { [l]: e.ref } : {}, c = typeof i == "function" ? i(t) : i;
  "className" in o && o.className && typeof o.className == "function" && (o.className = o.className(t));
  let h = {};
  if (t) {
    let g = !1, N = [];
    for (let [k, x] of Object.entries(t)) typeof x == "boolean" && (g = !0), x === !0 && N.push(k);
    g && (h["data-headlessui-state"] = N.join(" "));
  }
  if (s === ke && Object.keys(ia(o)).length > 0) {
    if (!bs(c) || Array.isArray(c) && c.length > 1) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(o).map((x) => `  - ${x}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((x) => `  - ${x}`).join(`
`)].join(`
`));
    let g = c.props, N = typeof (g == null ? void 0 : g.className) == "function" ? (...x) => yr(g == null ? void 0 : g.className(...x), o.className) : yr(g == null ? void 0 : g.className, o.className), k = N ? { className: N } : {};
    return ws(c, Object.assign({}, Pa(c.props, ia(Vr(o, ["ref"]))), h, u, { ref: a(c.ref, u.ref) }, k));
  }
  return xs(s, Object.assign({}, Vr(o, ["ref"]), s !== ke && u, s !== ke && h), c);
}
function Ui(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let r of e) r != null && (typeof r == "function" ? r(t) : r.current = t);
  };
}
function Pa(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, r = {};
  for (let n of e) for (let a in n) a.startsWith("on") && typeof n[a] == "function" ? (r[a] != null || (r[a] = []), r[a].push(n[a])) : t[a] = n[a];
  if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(r).map((n) => [n, void 0])));
  for (let n in r) Object.assign(t, { [n](a, ...s) {
    let i = r[n];
    for (let l of i) {
      if ((a instanceof Event || (a == null ? void 0 : a.nativeEvent) instanceof Event) && a.defaultPrevented) return;
      l(a, ...s);
    }
  } });
  return t;
}
function Ne(e) {
  var t;
  return Object.assign(ln(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function ia(e) {
  let t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
function Vr(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
let Zi = "div";
var wr = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(wr || {});
function zi(e, t) {
  var r;
  let { features: n = 1, ...a } = e, s = { ref: t, "aria-hidden": (n & 2) === 2 ? !0 : (r = a["aria-hidden"]) != null ? r : void 0, hidden: (n & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
  return Oe({ ourProps: s, theirProps: a, slot: {}, defaultTag: Zi, name: "Hidden" });
}
let Qr = Ne(zi), pn = Ze(null);
pn.displayName = "OpenClosedContext";
var _e = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(_e || {});
function gn() {
  return Ce(pn);
}
function Wi({ value: e, children: t }) {
  return W.createElement(pn.Provider, { value: e }, t);
}
function Hi(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let at = [];
Hi(() => {
  function e(t) {
    t.target instanceof HTMLElement && t.target !== document.body && at[0] !== t.target && (at.unshift(t.target), at = at.filter((r) => r != null && r.isConnected), at.splice(10));
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function qi(e) {
  let t = e.parentElement, r = null;
  for (; t && !(t instanceof HTMLFieldSetElement); ) t instanceof HTMLLegendElement && (r = t), t = t.parentElement;
  let n = (t == null ? void 0 : t.getAttribute("disabled")) === "";
  return n && Yi(r) ? !1 : n;
}
function Yi(e) {
  if (!e) return !1;
  let t = e.previousElementSibling;
  for (; t !== null; ) {
    if (t instanceof HTMLLegendElement) return !1;
    t = t.previousElementSibling;
  }
  return !0;
}
var Da = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Da || {});
function Ia(e, t, r, n) {
  let a = qe(r);
  ie(() => {
    e = e ?? window;
    function s(i) {
      a.current(i);
    }
    return e.addEventListener(t, s, n), () => e.removeEventListener(t, s, n);
  }, [e, t, n]);
}
function Xt() {
  let e = ne(!1);
  return Fe(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
function Va(e) {
  let t = se(e), r = ne(!1);
  ie(() => (r.current = !1, () => {
    r.current = !0, Er(() => {
      r.current && t();
    });
  }), [t]);
}
var Ht = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Ht || {});
function Gi() {
  let e = ne(0);
  return $a("keydown", (t) => {
    t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0);
  }, !0), e;
}
function Ma(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let r of e.current) r.current instanceof HTMLElement && t.add(r.current);
  return t;
}
let Ji = "div";
var ja = ((e) => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(ja || {});
function Ki(e, t) {
  let r = ne(null), n = De(r, t), { initialFocus: a, containers: s, features: i = 30, ...l } = e;
  $t() || (i = 1);
  let o = Kt(r);
  el({ ownerDocument: o }, !!(i & 16));
  let u = tl({ ownerDocument: o, container: r, initialFocus: a }, !!(i & 2));
  rl({ ownerDocument: o, container: r, containers: s, previousActiveElement: u }, !!(i & 8));
  let c = Gi(), h = se((x) => {
    let C = r.current;
    C && ((f) => f())(() => {
      ge(c.current, { [Ht.Forwards]: () => {
        lr(C, ft.First, { skipElements: [x.relatedTarget] });
      }, [Ht.Backwards]: () => {
        lr(C, ft.Last, { skipElements: [x.relatedTarget] });
      } });
    });
  }), g = hn(), N = ne(!1), k = { ref: n, onKeyDown(x) {
    x.key == "Tab" && (N.current = !0, g.requestAnimationFrame(() => {
      N.current = !1;
    }));
  }, onBlur(x) {
    let C = Ma(s);
    r.current instanceof HTMLElement && C.add(r.current);
    let f = x.relatedTarget;
    f instanceof HTMLElement && f.dataset.headlessuiFocusGuard !== "true" && (Ba(C, f) || (N.current ? lr(r.current, ge(c.current, { [Ht.Forwards]: () => ft.Next, [Ht.Backwards]: () => ft.Previous }) | ft.WrapAround, { relativeTo: x.target }) : x.target instanceof HTMLElement && pt(x.target)));
  } };
  return W.createElement(W.Fragment, null, !!(i & 4) && W.createElement(Qr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: h, features: wr.Focusable }), Oe({ ourProps: k, theirProps: l, defaultTag: Ji, name: "FocusTrap" }), !!(i & 4) && W.createElement(Qr, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: h, features: wr.Focusable }));
}
let Xi = Ne(Ki), Ut = Object.assign(Xi, { features: ja });
function Qi(e = !0) {
  let t = ne(at.slice());
  return mn(([r], [n]) => {
    n === !0 && r === !1 && Er(() => {
      t.current.splice(0);
    }), n === !1 && r === !0 && (t.current = at.slice());
  }, [e, at, t]), se(() => {
    var r;
    return (r = t.current.find((n) => n != null && n.isConnected)) != null ? r : null;
  });
}
function el({ ownerDocument: e }, t) {
  let r = Qi(t);
  mn(() => {
    t || (e == null ? void 0 : e.activeElement) === (e == null ? void 0 : e.body) && pt(r());
  }, [t]), Va(() => {
    t && pt(r());
  });
}
function tl({ ownerDocument: e, container: t, initialFocus: r }, n) {
  let a = ne(null), s = Xt();
  return mn(() => {
    if (!n) return;
    let i = t.current;
    i && Er(() => {
      if (!s.current) return;
      let l = e == null ? void 0 : e.activeElement;
      if (r != null && r.current) {
        if ((r == null ? void 0 : r.current) === l) {
          a.current = l;
          return;
        }
      } else if (i.contains(l)) {
        a.current = l;
        return;
      }
      r != null && r.current ? pt(r.current) : lr(i, ft.First) === Fa.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), a.current = e == null ? void 0 : e.activeElement;
    });
  }, [n]), a;
}
function rl({ ownerDocument: e, container: t, containers: r, previousActiveElement: n }, a) {
  let s = Xt();
  Ia(e == null ? void 0 : e.defaultView, "focus", (i) => {
    if (!a || !s.current) return;
    let l = Ma(r);
    t.current instanceof HTMLElement && l.add(t.current);
    let o = n.current;
    if (!o) return;
    let u = i.target;
    u && u instanceof HTMLElement ? Ba(l, u) ? (n.current = u, pt(u)) : (i.preventDefault(), i.stopPropagation(), pt(o)) : pt(n.current);
  }, !0);
}
function Ba(e, t) {
  for (let r of e) if (r.contains(t)) return !0;
  return !1;
}
let Ua = Ze(!1);
function nl() {
  return Ce(Ua);
}
function en(e) {
  return W.createElement(Ua.Provider, { value: e.force }, e.children);
}
function al(e) {
  let t = nl(), r = Ce(Za), n = Kt(e), [a, s] = ee(() => {
    if (!t && r !== null || He.isServer) return null;
    let i = n == null ? void 0 : n.getElementById("headlessui-portal-root");
    if (i) return i;
    if (n === null) return null;
    let l = n.createElement("div");
    return l.setAttribute("id", "headlessui-portal-root"), n.body.appendChild(l);
  });
  return ie(() => {
    a !== null && (n != null && n.body.contains(a) || n == null || n.body.appendChild(a));
  }, [a, n]), ie(() => {
    t || r !== null && s(r.current);
  }, [r, s, t]), a;
}
let sl = ke;
function il(e, t) {
  let r = e, n = ne(null), a = De(Bi((c) => {
    n.current = c;
  }), t), s = Kt(n), i = al(n), [l] = ee(() => {
    var c;
    return He.isServer ? null : (c = s == null ? void 0 : s.createElement("div")) != null ? c : null;
  }), o = Ce(tn), u = $t();
  return Fe(() => {
    !i || !l || i.contains(l) || (l.setAttribute("data-headlessui-portal", ""), i.appendChild(l));
  }, [i, l]), Fe(() => {
    if (l && o) return o.register(l);
  }, [o, l]), Va(() => {
    var c;
    !i || !l || (l instanceof Node && i.contains(l) && i.removeChild(l), i.childNodes.length <= 0 && ((c = i.parentElement) == null || c.removeChild(i)));
  }), u ? !i || !l ? null : Es(Oe({ ourProps: { ref: a }, theirProps: r, defaultTag: sl, name: "Portal" }), l) : null;
}
let ll = ke, Za = Ze(null);
function ol(e, t) {
  let { target: r, ...n } = e, a = { ref: De(t) };
  return W.createElement(Za.Provider, { value: r }, Oe({ ourProps: a, theirProps: n, defaultTag: ll, name: "Popover.Group" }));
}
let tn = Ze(null);
function ul() {
  let e = Ce(tn), t = ne([]), r = se((s) => (t.current.push(s), e && e.register(s), () => n(s))), n = se((s) => {
    let i = t.current.indexOf(s);
    i !== -1 && t.current.splice(i, 1), e && e.unregister(s);
  }), a = ve(() => ({ register: r, unregister: n, portals: t }), [r, n, t]);
  return [t, ve(() => function({ children: s }) {
    return W.createElement(tn.Provider, { value: a }, s);
  }, [a])];
}
let cl = Ne(il), dl = Ne(ol), rn = Object.assign(cl, { Group: dl });
function fl(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
const hl = typeof Object.is == "function" ? Object.is : fl, { useState: ml, useEffect: pl, useLayoutEffect: gl, useDebugValue: vl } = b;
function yl(e, t, r) {
  const n = t(), [{ inst: a }, s] = ml({ inst: { value: n, getSnapshot: t } });
  return gl(() => {
    a.value = n, a.getSnapshot = t, Mr(a) && s({ inst: a });
  }, [e, n, t]), pl(() => (Mr(a) && s({ inst: a }), e(() => {
    Mr(a) && s({ inst: a });
  })), [e]), vl(n), n;
}
function Mr(e) {
  const t = e.getSnapshot, r = e.value;
  try {
    const n = t();
    return !hl(r, n);
  } catch {
    return !0;
  }
}
function bl(e, t, r) {
  return t();
}
const wl = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", xl = !wl, _l = xl ? bl : yl, kl = "useSyncExternalStore" in b ? ((e) => e.useSyncExternalStore)(b) : _l;
function El(e) {
  return kl(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function Cl(e, t) {
  let r = e(), n = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return r;
  }, subscribe(a) {
    return n.add(a), () => n.delete(a);
  }, dispatch(a, ...s) {
    let i = t[a].call(r, ...s);
    i && (r = i, n.forEach((l) => l()));
  } };
}
function Nl() {
  let e;
  return { before({ doc: t }) {
    var r;
    let n = t.documentElement;
    e = ((r = t.defaultView) != null ? r : window).innerWidth - n.clientWidth;
  }, after({ doc: t, d: r }) {
    let n = t.documentElement, a = n.clientWidth - n.offsetWidth, s = e - a;
    r.style(n, "paddingRight", `${s}px`);
  } };
}
function Sl() {
  return Oa() ? { before({ doc: e, d: t, meta: r }) {
    function n(a) {
      return r.containers.flatMap((s) => s()).some((s) => s.contains(a));
    }
    t.microTask(() => {
      var a;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let l = bt();
        l.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => l.dispose()));
      }
      let s = (a = window.scrollY) != null ? a : window.pageYOffset, i = null;
      t.addEventListener(e, "click", (l) => {
        if (l.target instanceof HTMLElement) try {
          let o = l.target.closest("a");
          if (!o) return;
          let { hash: u } = new URL(o.href), c = e.querySelector(u);
          c && !n(c) && (i = c);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (l) => {
        if (l.target instanceof HTMLElement) if (n(l.target)) {
          let o = l.target;
          for (; o.parentElement && n(o.parentElement); ) o = o.parentElement;
          t.style(o, "overscrollBehavior", "contain");
        } else t.style(l.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (l) => {
        if (l.target instanceof HTMLElement) if (n(l.target)) {
          let o = l.target;
          for (; o.parentElement && o.dataset.headlessuiPortal !== "" && !(o.scrollHeight > o.clientHeight || o.scrollWidth > o.clientWidth); ) o = o.parentElement;
          o.dataset.headlessuiPortal === "" && l.preventDefault();
        } else l.preventDefault();
      }, { passive: !1 }), t.add(() => {
        var l;
        let o = (l = window.scrollY) != null ? l : window.pageYOffset;
        s !== o && window.scrollTo(0, s), i && i.isConnected && (i.scrollIntoView({ block: "nearest" }), i = null);
      });
    });
  } } : {};
}
function Tl() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function Al(e) {
  let t = {};
  for (let r of e) Object.assign(t, r(t));
  return t;
}
let mt = Cl(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var r;
  let n = (r = this.get(e)) != null ? r : { doc: e, count: 0, d: bt(), meta: /* @__PURE__ */ new Set() };
  return n.count++, n.meta.add(t), this.set(e, n), this;
}, POP(e, t) {
  let r = this.get(e);
  return r && (r.count--, r.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: r }) {
  let n = { doc: e, d: t, meta: Al(r) }, a = [Sl(), Nl(), Tl()];
  a.forEach(({ before: s }) => s == null ? void 0 : s(n)), a.forEach(({ after: s }) => s == null ? void 0 : s(n));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
mt.subscribe(() => {
  let e = mt.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [r] of e) t.set(r, r.documentElement.style.overflow);
  for (let r of e.values()) {
    let n = t.get(r.doc) === "hidden", a = r.count !== 0;
    (a && !n || !a && n) && mt.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && mt.dispatch("TEARDOWN", r);
  }
});
function Fl(e, t, r) {
  let n = El(mt), a = e ? n.get(e) : void 0, s = a ? a.count > 0 : !1;
  return Fe(() => {
    if (!(!e || !t)) return mt.dispatch("PUSH", e, r), () => mt.dispatch("POP", e, r);
  }, [t, e]), s;
}
let jr = /* @__PURE__ */ new Map(), Zt = /* @__PURE__ */ new Map();
function la(e, t = !0) {
  Fe(() => {
    var r;
    if (!t) return;
    let n = typeof e == "function" ? e() : e.current;
    if (!n) return;
    function a() {
      var i;
      if (!n) return;
      let l = (i = Zt.get(n)) != null ? i : 1;
      if (l === 1 ? Zt.delete(n) : Zt.set(n, l - 1), l !== 1) return;
      let o = jr.get(n);
      o && (o["aria-hidden"] === null ? n.removeAttribute("aria-hidden") : n.setAttribute("aria-hidden", o["aria-hidden"]), n.inert = o.inert, jr.delete(n));
    }
    let s = (r = Zt.get(n)) != null ? r : 0;
    return Zt.set(n, s + 1), s !== 0 || (jr.set(n, { "aria-hidden": n.getAttribute("aria-hidden"), inert: n.inert }), n.setAttribute("aria-hidden", "true"), n.inert = !0), a;
  }, [e, t]);
}
function Rl({ defaultContainers: e = [], portals: t, mainTreeNodeRef: r } = {}) {
  var n;
  let a = ne((n = r == null ? void 0 : r.current) != null ? n : null), s = Kt(a), i = se(() => {
    var l, o, u;
    let c = [];
    for (let h of e) h !== null && (h instanceof HTMLElement ? c.push(h) : "current" in h && h.current instanceof HTMLElement && c.push(h.current));
    if (t != null && t.current) for (let h of t.current) c.push(h);
    for (let h of (l = s == null ? void 0 : s.querySelectorAll("html > *, body > *")) != null ? l : []) h !== document.body && h !== document.head && h instanceof HTMLElement && h.id !== "headlessui-portal-root" && (h.contains(a.current) || h.contains((u = (o = a.current) == null ? void 0 : o.getRootNode()) == null ? void 0 : u.host) || c.some((g) => h.contains(g)) || c.push(h));
    return c;
  });
  return { resolveContainers: i, contains: se((l) => i().some((o) => o.contains(l))), mainTreeNodeRef: a, MainTreeNode: ve(() => function() {
    return r != null ? null : W.createElement(Qr, { features: wr.Hidden, ref: a });
  }, [a, r]) };
}
let vn = Ze(() => {
});
vn.displayName = "StackContext";
var nn = ((e) => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(nn || {});
function Ol() {
  return Ce(vn);
}
function $l({ children: e, onUpdate: t, type: r, element: n, enabled: a }) {
  let s = Ol(), i = se((...l) => {
    t == null || t(...l), s(...l);
  });
  return Fe(() => {
    let l = a === void 0 || a === !0;
    return l && i(0, r, n), () => {
      l && i(1, r, n);
    };
  }, [i, r, n, a]), W.createElement(vn.Provider, { value: i }, e);
}
let za = Ze(null);
function Wa() {
  let e = Ce(za);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Wa), t;
  }
  return e;
}
function Ll() {
  let [e, t] = ee([]);
  return [e.length > 0 ? e.join(" ") : void 0, ve(() => function(r) {
    let n = se((s) => (t((i) => [...i, s]), () => t((i) => {
      let l = i.slice(), o = l.indexOf(s);
      return o !== -1 && l.splice(o, 1), l;
    }))), a = ve(() => ({ register: n, slot: r.slot, name: r.name, props: r.props }), [n, r.slot, r.name, r.props]);
    return W.createElement(za.Provider, { value: a }, r.children);
  }, [t])];
}
let Pl = "p";
function Dl(e, t) {
  let r = Lt(), { id: n = `headlessui-description-${r}`, ...a } = e, s = Wa(), i = De(t);
  Fe(() => s.register(n), [n, s.register]);
  let l = { ref: i, ...s.props, id: n };
  return Oe({ ourProps: l, theirProps: a, slot: s.slot || {}, defaultTag: Pl, name: s.name || "Description" });
}
let Il = Ne(Dl), Vl = Object.assign(Il, {});
var Ml = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Ml || {}), jl = ((e) => (e[e.SetTitleId = 0] = "SetTitleId", e))(jl || {});
let Bl = { 0(e, t) {
  return e.titleId === t.id ? e : { ...e, titleId: t.id };
} }, xr = Ze(null);
xr.displayName = "DialogContext";
function Qt(e) {
  let t = Ce(xr);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, Qt), r;
  }
  return t;
}
function Ul(e, t, r = () => [document.body]) {
  Fl(e, t, (n) => {
    var a;
    return { containers: [...(a = n.containers) != null ? a : [], r] };
  });
}
function Zl(e, t) {
  return ge(t.type, Bl, e, t);
}
let zl = "div", Wl = br.RenderStrategy | br.Static;
function Hl(e, t) {
  let r = Lt(), { id: n = `headlessui-dialog-${r}`, open: a, onClose: s, initialFocus: i, role: l = "dialog", __demoMode: o = !1, ...u } = e, [c, h] = ee(0), g = ne(!1);
  l = function() {
    return l === "dialog" || l === "alertdialog" ? l : (g.current || (g.current = !0, console.warn(`Invalid role [${l}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let N = gn();
  a === void 0 && N !== null && (a = (N & _e.Open) === _e.Open);
  let k = ne(null), x = De(k, t), C = Kt(k), f = e.hasOwnProperty("open") || N !== null, m = e.hasOwnProperty("onClose");
  if (!f && !m) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!f) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!m) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (typeof a != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${a}`);
  if (typeof s != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${s}`);
  let y = a ? 0 : 1, [A, I] = _s(Zl, { titleId: null, descriptionId: null, panelRef: ks() }), _ = se(() => s(!1)), F = se((ae) => I({ type: 0, id: ae })), E = $t() ? o ? !1 : y === 0 : !1, R = c > 1, O = Ce(xr) !== null, [U, D] = ul(), z = { get current() {
    var ae;
    return (ae = A.panelRef.current) != null ? ae : k.current;
  } }, { resolveContainers: K, mainTreeNodeRef: X, MainTreeNode: fe } = Rl({ portals: U, defaultContainers: [z] }), he = R ? "parent" : "leaf", Ie = N !== null ? (N & _e.Closing) === _e.Closing : !1, Ve = O || Ie ? !1 : E, $e = Et(() => {
    var ae, Te;
    return (Te = Array.from((ae = C == null ? void 0 : C.querySelectorAll("body > *")) != null ? ae : []).find((be) => be.id === "headlessui-portal-root" ? !1 : be.contains(X.current) && be instanceof HTMLElement)) != null ? Te : null;
  }, [X]);
  la($e, Ve);
  let Qe = R ? !0 : E, Me = Et(() => {
    var ae, Te;
    return (Te = Array.from((ae = C == null ? void 0 : C.querySelectorAll("[data-headlessui-portal]")) != null ? ae : []).find((be) => be.contains(X.current) && be instanceof HTMLElement)) != null ? Te : null;
  }, [X]);
  la(Me, Qe), ji(K, (ae) => {
    ae.preventDefault(), _();
  }, !(!E || R));
  let Se = !(R || y !== 0);
  Ia(C == null ? void 0 : C.defaultView, "keydown", (ae) => {
    Se && (ae.defaultPrevented || ae.key === Da.Escape && (ae.preventDefault(), ae.stopPropagation(), _()));
  }), Ul(C, !(Ie || y !== 0 || O), K), ie(() => {
    if (y !== 0 || !k.current) return;
    let ae = new ResizeObserver((Te) => {
      for (let be of Te) {
        let ct = be.target.getBoundingClientRect();
        ct.x === 0 && ct.y === 0 && ct.width === 0 && ct.height === 0 && _();
      }
    });
    return ae.observe(k.current), () => ae.disconnect();
  }, [y, k, _]);
  let [Or, It] = Ll(), tr = ve(() => [{ dialogState: y, close: _, setTitleId: F }, A], [y, A, _, F]), xt = ve(() => ({ open: y === 0 }), [y]), Vt = { ref: x, id: n, role: l, "aria-modal": y === 0 ? !0 : void 0, "aria-labelledby": A.titleId, "aria-describedby": Or };
  return W.createElement($l, { type: "Dialog", enabled: y === 0, element: k, onUpdate: se((ae, Te) => {
    Te === "Dialog" && ge(ae, { [nn.Add]: () => h((be) => be + 1), [nn.Remove]: () => h((be) => be - 1) });
  }) }, W.createElement(en, { force: !0 }, W.createElement(rn, null, W.createElement(xr.Provider, { value: tr }, W.createElement(rn.Group, { target: k }, W.createElement(en, { force: !1 }, W.createElement(It, { slot: xt, name: "Dialog.Description" }, W.createElement(Ut, { initialFocus: i, containers: K, features: E ? ge(he, { parent: Ut.features.RestoreFocus, leaf: Ut.features.All & ~Ut.features.FocusLock }) : Ut.features.None }, W.createElement(D, null, Oe({ ourProps: Vt, theirProps: u, slot: xt, defaultTag: zl, features: Wl, visible: y === 0, name: "Dialog" }))))))))), W.createElement(fe, null));
}
let ql = "div";
function Yl(e, t) {
  let r = Lt(), { id: n = `headlessui-dialog-overlay-${r}`, ...a } = e, [{ dialogState: s, close: i }] = Qt("Dialog.Overlay"), l = De(t), o = se((c) => {
    if (c.target === c.currentTarget) {
      if (qi(c.currentTarget)) return c.preventDefault();
      c.preventDefault(), c.stopPropagation(), i();
    }
  }), u = ve(() => ({ open: s === 0 }), [s]);
  return Oe({ ourProps: { ref: l, id: n, "aria-hidden": !0, onClick: o }, theirProps: a, slot: u, defaultTag: ql, name: "Dialog.Overlay" });
}
let Gl = "div";
function Jl(e, t) {
  let r = Lt(), { id: n = `headlessui-dialog-backdrop-${r}`, ...a } = e, [{ dialogState: s }, i] = Qt("Dialog.Backdrop"), l = De(t);
  ie(() => {
    if (i.panelRef.current === null) throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.");
  }, [i.panelRef]);
  let o = ve(() => ({ open: s === 0 }), [s]);
  return W.createElement(en, { force: !0 }, W.createElement(rn, null, Oe({ ourProps: { ref: l, id: n, "aria-hidden": !0 }, theirProps: a, slot: o, defaultTag: Gl, name: "Dialog.Backdrop" })));
}
let Kl = "div";
function Xl(e, t) {
  let r = Lt(), { id: n = `headlessui-dialog-panel-${r}`, ...a } = e, [{ dialogState: s }, i] = Qt("Dialog.Panel"), l = De(t, i.panelRef), o = ve(() => ({ open: s === 0 }), [s]), u = se((c) => {
    c.stopPropagation();
  });
  return Oe({ ourProps: { ref: l, id: n, onClick: u }, theirProps: a, slot: o, defaultTag: Kl, name: "Dialog.Panel" });
}
let Ql = "h2";
function eo(e, t) {
  let r = Lt(), { id: n = `headlessui-dialog-title-${r}`, ...a } = e, [{ dialogState: s, setTitleId: i }] = Qt("Dialog.Title"), l = De(t);
  ie(() => (i(n), () => i(null)), [n, i]);
  let o = ve(() => ({ open: s === 0 }), [s]);
  return Oe({ ourProps: { ref: l, id: n }, theirProps: a, slot: o, defaultTag: Ql, name: "Dialog.Title" });
}
let to = Ne(Hl), ro = Ne(Jl), no = Ne(Xl), ao = Ne(Yl), so = Ne(eo), Nt = Object.assign(to, { Backdrop: ro, Panel: no, Overlay: ao, Title: so, Description: Vl });
function io(e = 0) {
  let [t, r] = ee(e), n = Xt(), a = Et((o) => {
    n.current && r((u) => u | o);
  }, [t, n]), s = Et((o) => !!(t & o), [t]), i = Et((o) => {
    n.current && r((u) => u & ~o);
  }, [r, n]), l = Et((o) => {
    n.current && r((u) => u ^ o);
  }, [r]);
  return { flags: t, addFlag: a, hasFlag: s, removeFlag: i, toggleFlag: l };
}
function lo(e) {
  let t = { called: !1 };
  return (...r) => {
    if (!t.called) return t.called = !0, e(...r);
  };
}
function Br(e, ...t) {
  e && t.length > 0 && e.classList.add(...t);
}
function Ur(e, ...t) {
  e && t.length > 0 && e.classList.remove(...t);
}
function oo(e, t) {
  let r = bt();
  if (!e) return r.dispose;
  let { transitionDuration: n, transitionDelay: a } = getComputedStyle(e), [s, i] = [n, a].map((o) => {
    let [u = 0] = o.split(",").filter(Boolean).map((c) => c.includes("ms") ? parseFloat(c) : parseFloat(c) * 1e3).sort((c, h) => h - c);
    return u;
  }), l = s + i;
  if (l !== 0) {
    r.group((u) => {
      u.setTimeout(() => {
        t(), u.dispose();
      }, l), u.addEventListener(e, "transitionrun", (c) => {
        c.target === c.currentTarget && u.dispose();
      });
    });
    let o = r.addEventListener(e, "transitionend", (u) => {
      u.target === u.currentTarget && (t(), o());
    });
  } else t();
  return r.add(() => t()), r.dispose;
}
function uo(e, t, r, n) {
  let a = r ? "enter" : "leave", s = bt(), i = n !== void 0 ? lo(n) : () => {
  };
  a === "enter" && (e.removeAttribute("hidden"), e.style.display = "");
  let l = ge(a, { enter: () => t.enter, leave: () => t.leave }), o = ge(a, { enter: () => t.enterTo, leave: () => t.leaveTo }), u = ge(a, { enter: () => t.enterFrom, leave: () => t.leaveFrom });
  return Ur(e, ...t.base, ...t.enter, ...t.enterTo, ...t.enterFrom, ...t.leave, ...t.leaveFrom, ...t.leaveTo, ...t.entered), Br(e, ...t.base, ...l, ...u), s.nextFrame(() => {
    Ur(e, ...t.base, ...l, ...u), Br(e, ...t.base, ...l, ...o), oo(e, () => (Ur(e, ...t.base, ...l), Br(e, ...t.base, ...t.entered), i()));
  }), s.dispose;
}
function co({ immediate: e, container: t, direction: r, classes: n, onStart: a, onStop: s }) {
  let i = Xt(), l = hn(), o = qe(r);
  Fe(() => {
    e && (o.current = "enter");
  }, [e]), Fe(() => {
    let u = bt();
    l.add(u.dispose);
    let c = t.current;
    if (c && o.current !== "idle" && i.current) return u.dispose(), a.current(o.current), u.add(uo(c, n.current, o.current === "enter", () => {
      u.dispose(), s.current(o.current);
    })), u.dispose;
  }, [r]);
}
function tt(e = "") {
  return e.split(/\s+/).filter((t) => t.length > 1);
}
let Cr = Ze(null);
Cr.displayName = "TransitionContext";
var fo = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(fo || {});
function ho() {
  let e = Ce(Cr);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function mo() {
  let e = Ce(Nr);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let Nr = Ze(null);
Nr.displayName = "NestingContext";
function Sr(e) {
  return "children" in e ? Sr(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function Ha(e, t) {
  let r = qe(e), n = ne([]), a = Xt(), s = hn(), i = se((N, k = st.Hidden) => {
    let x = n.current.findIndex(({ el: C }) => C === N);
    x !== -1 && (ge(k, { [st.Unmount]() {
      n.current.splice(x, 1);
    }, [st.Hidden]() {
      n.current[x].state = "hidden";
    } }), s.microTask(() => {
      var C;
      !Sr(n) && a.current && ((C = r.current) == null || C.call(r));
    }));
  }), l = se((N) => {
    let k = n.current.find(({ el: x }) => x === N);
    return k ? k.state !== "visible" && (k.state = "visible") : n.current.push({ el: N, state: "visible" }), () => i(N, st.Unmount);
  }), o = ne([]), u = ne(Promise.resolve()), c = ne({ enter: [], leave: [], idle: [] }), h = se((N, k, x) => {
    o.current.splice(0), t && (t.chains.current[k] = t.chains.current[k].filter(([C]) => C !== N)), t == null || t.chains.current[k].push([N, new Promise((C) => {
      o.current.push(C);
    })]), t == null || t.chains.current[k].push([N, new Promise((C) => {
      Promise.all(c.current[k].map(([f, m]) => m)).then(() => C());
    })]), k === "enter" ? u.current = u.current.then(() => t == null ? void 0 : t.wait.current).then(() => x(k)) : x(k);
  }), g = se((N, k, x) => {
    Promise.all(c.current[k].splice(0).map(([C, f]) => f)).then(() => {
      var C;
      (C = o.current.shift()) == null || C();
    }).then(() => x(k));
  });
  return ve(() => ({ children: n, register: l, unregister: i, onStart: h, onStop: g, wait: u, chains: c }), [l, i, n, h, g, c, u]);
}
function po() {
}
let go = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"];
function oa(e) {
  var t;
  let r = {};
  for (let n of go) r[n] = (t = e[n]) != null ? t : po;
  return r;
}
function vo(e) {
  let t = ne(oa(e));
  return ie(() => {
    t.current = oa(e);
  }, [e]), t;
}
let yo = "div", qa = br.RenderStrategy;
function bo(e, t) {
  var r, n;
  let { beforeEnter: a, afterEnter: s, beforeLeave: i, afterLeave: l, enter: o, enterFrom: u, enterTo: c, entered: h, leave: g, leaveFrom: N, leaveTo: k, ...x } = e, C = ne(null), f = De(C, t), m = (r = x.unmount) == null || r ? st.Unmount : st.Hidden, { show: y, appear: A, initial: I } = ho(), [_, F] = ee(y ? "visible" : "hidden"), E = mo(), { register: R, unregister: O } = E;
  ie(() => R(C), [R, C]), ie(() => {
    if (m === st.Hidden && C.current) {
      if (y && _ !== "visible") {
        F("visible");
        return;
      }
      return ge(_, { hidden: () => O(C), visible: () => R(C) });
    }
  }, [_, C, R, O, y, m]);
  let U = qe({ base: tt(x.className), enter: tt(o), enterFrom: tt(u), enterTo: tt(c), entered: tt(h), leave: tt(g), leaveFrom: tt(N), leaveTo: tt(k) }), D = vo({ beforeEnter: a, afterEnter: s, beforeLeave: i, afterLeave: l }), z = $t();
  ie(() => {
    if (z && _ === "visible" && C.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [C, _, z]);
  let K = I && !A, X = A && y && I, fe = !z || K ? "idle" : y ? "enter" : "leave", he = io(0), Ie = se((Se) => ge(Se, { enter: () => {
    he.addFlag(_e.Opening), D.current.beforeEnter();
  }, leave: () => {
    he.addFlag(_e.Closing), D.current.beforeLeave();
  }, idle: () => {
  } })), Ve = se((Se) => ge(Se, { enter: () => {
    he.removeFlag(_e.Opening), D.current.afterEnter();
  }, leave: () => {
    he.removeFlag(_e.Closing), D.current.afterLeave();
  }, idle: () => {
  } })), $e = Ha(() => {
    F("hidden"), O(C);
  }, E), Qe = ne(!1);
  co({ immediate: X, container: C, classes: U, direction: fe, onStart: qe((Se) => {
    Qe.current = !0, $e.onStart(C, Se, Ie);
  }), onStop: qe((Se) => {
    Qe.current = !1, $e.onStop(C, Se, Ve), Se === "leave" && !Sr($e) && (F("hidden"), O(C));
  }) });
  let Me = x, Dt = { ref: f };
  return X ? Me = { ...Me, className: yr(x.className, ...U.current.enter, ...U.current.enterFrom) } : Qe.current && (Me.className = yr(x.className, (n = C.current) == null ? void 0 : n.className), Me.className === "" && delete Me.className), W.createElement(Nr.Provider, { value: $e }, W.createElement(Wi, { value: ge(_, { visible: _e.Open, hidden: _e.Closed }) | he.flags }, Oe({ ourProps: Dt, theirProps: Me, defaultTag: yo, features: qa, visible: _ === "visible", name: "Transition.Child" })));
}
function wo(e, t) {
  let { show: r, appear: n = !1, unmount: a = !0, ...s } = e, i = ne(null), l = De(i, t);
  $t();
  let o = gn();
  if (r === void 0 && o !== null && (r = (o & _e.Open) === _e.Open), ![!0, !1].includes(r)) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [u, c] = ee(r ? "visible" : "hidden"), h = Ha(() => {
    c("hidden");
  }), [g, N] = ee(!0), k = ne([r]);
  Fe(() => {
    g !== !1 && k.current[k.current.length - 1] !== r && (k.current.push(r), N(!1));
  }, [k, r]);
  let x = ve(() => ({ show: r, appear: n, initial: g }), [r, n, g]);
  ie(() => {
    if (r) c("visible");
    else if (!Sr(h)) c("hidden");
    else {
      let y = i.current;
      if (!y) return;
      let A = y.getBoundingClientRect();
      A.x === 0 && A.y === 0 && A.width === 0 && A.height === 0 && c("hidden");
    }
  }, [r, h]);
  let C = { unmount: a }, f = se(() => {
    var y;
    g && N(!1), (y = e.beforeEnter) == null || y.call(e);
  }), m = se(() => {
    var y;
    g && N(!1), (y = e.beforeLeave) == null || y.call(e);
  });
  return W.createElement(Nr.Provider, { value: h }, W.createElement(Cr.Provider, { value: x }, Oe({ ourProps: { ...C, as: ke, children: W.createElement(Ya, { ref: l, ...C, ...s, beforeEnter: f, beforeLeave: m }) }, theirProps: {}, defaultTag: ke, features: qa, visible: u === "visible", name: "Transition" })));
}
function xo(e, t) {
  let r = Ce(Cr) !== null, n = gn() !== null;
  return W.createElement(W.Fragment, null, !r && n ? W.createElement(an, { ref: t, ...e }) : W.createElement(Ya, { ref: t, ...e }));
}
let an = Ne(wo), Ya = Ne(bo), _o = Ne(xo), St = Object.assign(an, { Child: _o, Root: an });
function ko({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ b.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ b.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ b.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
  }));
}
const Eo = /* @__PURE__ */ b.forwardRef(ko);
function Co({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ b.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ b.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ b.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 12.75 6 6 9-13.5"
  }));
}
const No = /* @__PURE__ */ b.forwardRef(Co);
function So({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ b.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ b.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ b.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m19.5 8.25-7.5 7.5-7.5-7.5"
  }));
}
const To = /* @__PURE__ */ b.forwardRef(So);
function Ao({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ b.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ b.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ b.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 15.75 7.5-7.5 7.5 7.5"
  }));
}
const Fo = /* @__PURE__ */ b.forwardRef(Ao);
function Ro({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ b.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ b.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ b.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const Oo = /* @__PURE__ */ b.forwardRef(Ro);
function $o({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ b.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ b.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ b.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4.5v15m7.5-7.5h-15"
  }));
}
const Lo = /* @__PURE__ */ b.forwardRef($o);
function Po({
  title: e,
  titleId: t,
  ...r
}, n) {
  return /* @__PURE__ */ b.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: n,
    "aria-labelledby": t
  }, r), e ? /* @__PURE__ */ b.createElement("title", {
    id: t
  }, e) : null, /* @__PURE__ */ b.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18 18 6M6 6l12 12"
  }));
}
const yn = /* @__PURE__ */ b.forwardRef(Po), Do = ({
  isOpen: e,
  onClose: t,
  title: r,
  children: n,
  size: a = "md"
}) => {
  const s = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl"
  };
  return /* @__PURE__ */ v(St, { appear: !0, show: e, as: ke, children: /* @__PURE__ */ B(Nt, { as: "div", className: "relative z-50", onClose: t, children: [
    /* @__PURE__ */ v(
      St.Child,
      {
        as: ke,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ v("div", { className: "fixed inset-0 bg-black bg-opacity-25" })
      }
    ),
    /* @__PURE__ */ v("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ v("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ v(
      St.Child,
      {
        as: ke,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 scale-95",
        enterTo: "opacity-100 scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 scale-100",
        leaveTo: "opacity-0 scale-95",
        children: /* @__PURE__ */ B(Nt.Panel, { className: `w-full ${s[a]} transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all`, children: [
          /* @__PURE__ */ B("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ v(
              Nt.Title,
              {
                as: "h3",
                className: "text-lg font-medium leading-6 text-gray-900",
                children: r
              }
            ),
            /* @__PURE__ */ B(
              "button",
              {
                type: "button",
                className: "rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                onClick: t,
                children: [
                  /* @__PURE__ */ v("span", { className: "sr-only", children: "Close" }),
                  /* @__PURE__ */ v(yn, { className: "h-6 w-6", "aria-hidden": "true" })
                ]
              }
            )
          ] }),
          n
        ] })
      }
    ) }) })
  ] }) });
}, Io = ({
  isOpen: e,
  onClose: t,
  title: r,
  children: n,
  width: a = "max-w-md"
}) => /* @__PURE__ */ v(St.Root, { show: e, as: ke, children: /* @__PURE__ */ B(Nt, { as: "div", className: "relative z-50", onClose: t, children: [
  /* @__PURE__ */ v(
    St.Child,
    {
      as: ke,
      enter: "ease-in-out duration-300",
      enterFrom: "opacity-0",
      enterTo: "opacity-100",
      leave: "ease-in-out duration-300",
      leaveFrom: "opacity-100",
      leaveTo: "opacity-0",
      children: /* @__PURE__ */ v("div", { className: "fixed inset-0 bg-black bg-opacity-25 transition-opacity" })
    }
  ),
  /* @__PURE__ */ v("div", { className: "fixed inset-0 overflow-hidden", children: /* @__PURE__ */ v("div", { className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ v("div", { className: "pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10", children: /* @__PURE__ */ v(
    St.Child,
    {
      as: ke,
      enter: "transform transition ease-in-out duration-300",
      enterFrom: "translate-x-full",
      enterTo: "translate-x-0",
      leave: "transform transition ease-in-out duration-300",
      leaveFrom: "translate-x-0",
      leaveTo: "translate-x-full",
      children: /* @__PURE__ */ v(Nt.Panel, { className: `pointer-events-auto w-screen ${a}`, children: /* @__PURE__ */ B("div", { className: "flex h-full flex-col overflow-y-auto bg-white shadow-xl", children: [
        /* @__PURE__ */ v("div", { className: "px-4 py-6 sm:px-6", children: /* @__PURE__ */ B("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ v(Nt.Title, { className: "text-lg font-medium text-gray-900", children: r }),
          /* @__PURE__ */ v("div", { className: "ml-3 flex h-7 items-center", children: /* @__PURE__ */ B(
            "button",
            {
              type: "button",
              className: "rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              onClick: t,
              children: [
                /* @__PURE__ */ v("span", { className: "sr-only", children: "Close panel" }),
                /* @__PURE__ */ v(yn, { className: "h-6 w-6", "aria-hidden": "true" })
              ]
            }
          ) })
        ] }) }),
        /* @__PURE__ */ v("div", { className: "relative flex-1 px-4 py-6 sm:px-6", children: n })
      ] }) })
    }
  ) }) }) })
] }) });
var bn = {};
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.parse = zo;
bn.serialize = Wo;
const Vo = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, Mo = /^[\u0021-\u003A\u003C-\u007E]*$/, jo = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, Bo = /^[\u0020-\u003A\u003D-\u007E]*$/, Uo = Object.prototype.toString, Zo = /* @__PURE__ */ (() => {
  const e = function() {
  };
  return e.prototype = /* @__PURE__ */ Object.create(null), e;
})();
function zo(e, t) {
  const r = new Zo(), n = e.length;
  if (n < 2)
    return r;
  const a = (t == null ? void 0 : t.decode) || Ho;
  let s = 0;
  do {
    const i = e.indexOf("=", s);
    if (i === -1)
      break;
    const l = e.indexOf(";", s), o = l === -1 ? n : l;
    if (i > o) {
      s = e.lastIndexOf(";", i - 1) + 1;
      continue;
    }
    const u = ua(e, s, i), c = ca(e, i, u), h = e.slice(u, c);
    if (r[h] === void 0) {
      let g = ua(e, i + 1, o), N = ca(e, o, g);
      const k = a(e.slice(g, N));
      r[h] = k;
    }
    s = o + 1;
  } while (s < n);
  return r;
}
function ua(e, t, r) {
  do {
    const n = e.charCodeAt(t);
    if (n !== 32 && n !== 9)
      return t;
  } while (++t < r);
  return r;
}
function ca(e, t, r) {
  for (; t > r; ) {
    const n = e.charCodeAt(--t);
    if (n !== 32 && n !== 9)
      return t + 1;
  }
  return r;
}
function Wo(e, t, r) {
  const n = (r == null ? void 0 : r.encode) || encodeURIComponent;
  if (!Vo.test(e))
    throw new TypeError(`argument name is invalid: ${e}`);
  const a = n(t);
  if (!Mo.test(a))
    throw new TypeError(`argument val is invalid: ${t}`);
  let s = e + "=" + a;
  if (!r)
    return s;
  if (r.maxAge !== void 0) {
    if (!Number.isInteger(r.maxAge))
      throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);
    s += "; Max-Age=" + r.maxAge;
  }
  if (r.domain) {
    if (!jo.test(r.domain))
      throw new TypeError(`option domain is invalid: ${r.domain}`);
    s += "; Domain=" + r.domain;
  }
  if (r.path) {
    if (!Bo.test(r.path))
      throw new TypeError(`option path is invalid: ${r.path}`);
    s += "; Path=" + r.path;
  }
  if (r.expires) {
    if (!qo(r.expires) || !Number.isFinite(r.expires.valueOf()))
      throw new TypeError(`option expires is invalid: ${r.expires}`);
    s += "; Expires=" + r.expires.toUTCString();
  }
  if (r.httpOnly && (s += "; HttpOnly"), r.secure && (s += "; Secure"), r.partitioned && (s += "; Partitioned"), r.priority)
    switch (typeof r.priority == "string" ? r.priority.toLowerCase() : void 0) {
      case "low":
        s += "; Priority=Low";
        break;
      case "medium":
        s += "; Priority=Medium";
        break;
      case "high":
        s += "; Priority=High";
        break;
      default:
        throw new TypeError(`option priority is invalid: ${r.priority}`);
    }
  if (r.sameSite)
    switch (typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite) {
      case !0:
      case "strict":
        s += "; SameSite=Strict";
        break;
      case "lax":
        s += "; SameSite=Lax";
        break;
      case "none":
        s += "; SameSite=None";
        break;
      default:
        throw new TypeError(`option sameSite is invalid: ${r.sameSite}`);
    }
  return s;
}
function Ho(e) {
  if (e.indexOf("%") === -1)
    return e;
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}
function qo(e) {
  return Uo.call(e) === "[object Date]";
}
/**
 * react-router v7.6.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function me(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function Je(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function sn({
  pathname: e = "/",
  search: t = "",
  hash: r = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function wn(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substring(r), e = e.substring(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substring(n), e = e.substring(0, n)), e && (t.pathname = e);
  }
  return t;
}
function Ga(e, t, r = "/") {
  return Yo(e, t, r, !1);
}
function Yo(e, t, r, n) {
  let a = typeof t == "string" ? wn(t) : t, s = ut(a.pathname || "/", r);
  if (s == null)
    return null;
  let i = Ja(e);
  Go(i);
  let l = null;
  for (let o = 0; l == null && o < i.length; ++o) {
    let u = iu(s);
    l = au(
      i[o],
      u,
      n
    );
  }
  return l;
}
function Ja(e, t = [], r = [], n = "") {
  let a = (s, i, l) => {
    let o = {
      relativePath: l === void 0 ? s.path || "" : l,
      caseSensitive: s.caseSensitive === !0,
      childrenIndex: i,
      route: s
    };
    o.relativePath.startsWith("/") && (me(
      o.relativePath.startsWith(n),
      `Absolute route path "${o.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
    ), o.relativePath = o.relativePath.slice(n.length));
    let u = Ye([n, o.relativePath]), c = r.concat(o);
    s.children && s.children.length > 0 && (me(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      s.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${u}".`
    ), Ja(s.children, t, c, u)), !(s.path == null && !s.index) && t.push({
      path: u,
      score: ru(u, s.index),
      routesMeta: c
    });
  };
  return e.forEach((s, i) => {
    var l;
    if (s.path === "" || !((l = s.path) != null && l.includes("?")))
      a(s, i);
    else
      for (let o of Ka(s.path))
        a(s, i, o);
  }), t;
}
function Ka(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t, a = r.endsWith("?"), s = r.replace(/\?$/, "");
  if (n.length === 0)
    return a ? [s, ""] : [s];
  let i = Ka(n.join("/")), l = [];
  return l.push(
    ...i.map(
      (o) => o === "" ? s : [s, o].join("/")
    )
  ), a && l.push(...i), l.map(
    (o) => e.startsWith("/") && o === "" ? "/" : o
  );
}
function Go(e) {
  e.sort(
    (t, r) => t.score !== r.score ? r.score - t.score : nu(
      t.routesMeta.map((n) => n.childrenIndex),
      r.routesMeta.map((n) => n.childrenIndex)
    )
  );
}
var Jo = /^:[\w-]+$/, Ko = 3, Xo = 2, Qo = 1, eu = 10, tu = -2, da = (e) => e === "*";
function ru(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(da) && (n += tu), t && (n += Xo), r.filter((a) => !da(a)).reduce(
    (a, s) => a + (Jo.test(s) ? Ko : s === "" ? Qo : eu),
    n
  );
}
function nu(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, a) => n === t[a]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function au(e, t, r = !1) {
  let { routesMeta: n } = e, a = {}, s = "/", i = [];
  for (let l = 0; l < n.length; ++l) {
    let o = n[l], u = l === n.length - 1, c = s === "/" ? t : t.slice(s.length) || "/", h = _r(
      { path: o.relativePath, caseSensitive: o.caseSensitive, end: u },
      c
    ), g = o.route;
    if (!h && u && r && !n[n.length - 1].route.index && (h = _r(
      {
        path: o.relativePath,
        caseSensitive: o.caseSensitive,
        end: !1
      },
      c
    )), !h)
      return null;
    Object.assign(a, h.params), i.push({
      // TODO: Can this as be avoided?
      params: a,
      pathname: Ye([s, h.pathname]),
      pathnameBase: cu(
        Ye([s, h.pathnameBase])
      ),
      route: g
    }), h.pathnameBase !== "/" && (s = Ye([s, h.pathnameBase]));
  }
  return i;
}
function _r(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, n] = su(
    e.path,
    e.caseSensitive,
    e.end
  ), a = t.match(r);
  if (!a) return null;
  let s = a[0], i = s.replace(/(.)\/+$/, "$1"), l = a.slice(1);
  return {
    params: n.reduce(
      (u, { paramName: c, isOptional: h }, g) => {
        if (c === "*") {
          let k = l[g] || "";
          i = s.slice(0, s.length - k.length).replace(/(.)\/+$/, "$1");
        }
        const N = l[g];
        return h && !N ? u[c] = void 0 : u[c] = (N || "").replace(/%2F/g, "/"), u;
      },
      {}
    ),
    pathname: s,
    pathnameBase: i,
    pattern: e
  };
}
function su(e, t = !1, r = !0) {
  Je(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let n = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (i, l, o) => (n.push({ paramName: l, isOptional: o != null }), o ? "/?([^\\/]+)?" : "/([^\\/]+)")
  );
  return e.endsWith("*") ? (n.push({ paramName: "*" }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), n];
}
function iu(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return Je(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function ut(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function lu(e, t = "/") {
  let {
    pathname: r,
    search: n = "",
    hash: a = ""
  } = typeof e == "string" ? wn(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : ou(r, t) : t,
    search: du(n),
    hash: fu(a)
  };
}
function ou(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a);
  }), r.length > 1 ? r.join("/") : "/";
}
function Zr(e, t, r, n) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    n
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function uu(e) {
  return e.filter(
    (t, r) => r === 0 || t.route.path && t.route.path.length > 0
  );
}
function Xa(e) {
  let t = uu(e);
  return t.map(
    (r, n) => n === t.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Qa(e, t, r, n = !1) {
  let a;
  typeof e == "string" ? a = wn(e) : (a = { ...e }, me(
    !a.pathname || !a.pathname.includes("?"),
    Zr("?", "pathname", "search", a)
  ), me(
    !a.pathname || !a.pathname.includes("#"),
    Zr("#", "pathname", "hash", a)
  ), me(
    !a.search || !a.search.includes("#"),
    Zr("#", "search", "hash", a)
  ));
  let s = e === "" || a.pathname === "", i = s ? "/" : a.pathname, l;
  if (i == null)
    l = r;
  else {
    let h = t.length - 1;
    if (!n && i.startsWith("..")) {
      let g = i.split("/");
      for (; g[0] === ".."; )
        g.shift(), h -= 1;
      a.pathname = g.join("/");
    }
    l = h >= 0 ? t[h] : "/";
  }
  let o = lu(a, l), u = i && i !== "/" && i.endsWith("/"), c = (s || i === ".") && r.endsWith("/");
  return !o.pathname.endsWith("/") && (u || c) && (o.pathname += "/"), o;
}
var Ye = (e) => e.join("/").replace(/\/\/+/g, "/"), cu = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), du = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, fu = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function hu(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
var es = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  es
);
var mu = [
  "GET",
  ...es
];
new Set(mu);
var Pt = b.createContext(null);
Pt.displayName = "DataRouter";
var Tr = b.createContext(null);
Tr.displayName = "DataRouterState";
var ts = b.createContext({
  isTransitioning: !1
});
ts.displayName = "ViewTransition";
var pu = b.createContext(
  /* @__PURE__ */ new Map()
);
pu.displayName = "Fetchers";
var gu = b.createContext(null);
gu.displayName = "Await";
var Ke = b.createContext(
  null
);
Ke.displayName = "Navigation";
var xn = b.createContext(
  null
);
xn.displayName = "Location";
var Xe = b.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Xe.displayName = "Route";
var _n = b.createContext(null);
_n.displayName = "RouteError";
function vu(e, { relative: t } = {}) {
  me(
    Ar(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: n } = b.useContext(Ke), { hash: a, pathname: s, search: i } = er(e, { relative: t }), l = s;
  return r !== "/" && (l = s === "/" ? r : Ye([r, s])), n.createHref({ pathname: l, search: i, hash: a });
}
function Ar() {
  return b.useContext(xn) != null;
}
function wt() {
  return me(
    Ar(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), b.useContext(xn).location;
}
var rs = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function ns(e) {
  b.useContext(Ke).static || b.useLayoutEffect(e);
}
function as() {
  let { isDataRoute: e } = b.useContext(Xe);
  return e ? Fu() : yu();
}
function yu() {
  me(
    Ar(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = b.useContext(Pt), { basename: t, navigator: r } = b.useContext(Ke), { matches: n } = b.useContext(Xe), { pathname: a } = wt(), s = JSON.stringify(Xa(n)), i = b.useRef(!1);
  return ns(() => {
    i.current = !0;
  }), b.useCallback(
    (o, u = {}) => {
      if (Je(i.current, rs), !i.current) return;
      if (typeof o == "number") {
        r.go(o);
        return;
      }
      let c = Qa(
        o,
        JSON.parse(s),
        a,
        u.relative === "path"
      );
      e == null && t !== "/" && (c.pathname = c.pathname === "/" ? t : Ye([t, c.pathname])), (u.replace ? r.replace : r.push)(
        c,
        u.state,
        u
      );
    },
    [
      t,
      r,
      s,
      a,
      e
    ]
  );
}
b.createContext(null);
function er(e, { relative: t } = {}) {
  let { matches: r } = b.useContext(Xe), { pathname: n } = wt(), a = JSON.stringify(Xa(r));
  return b.useMemo(
    () => Qa(
      e,
      JSON.parse(a),
      n,
      t === "path"
    ),
    [e, a, n, t]
  );
}
function bu(e, t, r, n) {
  me(
    Ar(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: a } = b.useContext(Ke), { matches: s } = b.useContext(Xe), i = s[s.length - 1], l = i ? i.params : {}, o = i ? i.pathname : "/", u = i ? i.pathnameBase : "/", c = i && i.route;
  {
    let f = c && c.path || "";
    ss(
      o,
      !c || f.endsWith("*") || f.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${o}" (under <Route path="${f}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${f}"> to <Route path="${f === "/" ? "*" : `${f}/*`}">.`
    );
  }
  let h = wt(), g;
  g = h;
  let N = g.pathname || "/", k = N;
  if (u !== "/") {
    let f = u.replace(/^\//, "").split("/");
    k = "/" + N.replace(/^\//, "").split("/").slice(f.length).join("/");
  }
  let x = Ga(e, { pathname: k });
  return Je(
    c || x != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), Je(
    x == null || x[x.length - 1].route.element !== void 0 || x[x.length - 1].route.Component !== void 0 || x[x.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), Eu(
    x && x.map(
      (f) => Object.assign({}, f, {
        params: Object.assign({}, l, f.params),
        pathname: Ye([
          u,
          // Re-encode pathnames that were decoded inside matchRoutes
          a.encodeLocation ? a.encodeLocation(f.pathname).pathname : f.pathname
        ]),
        pathnameBase: f.pathnameBase === "/" ? u : Ye([
          u,
          // Re-encode pathnames that were decoded inside matchRoutes
          a.encodeLocation ? a.encodeLocation(f.pathnameBase).pathname : f.pathnameBase
        ])
      })
    ),
    s,
    r,
    n
  );
}
function wu() {
  let e = Au(), t = hu(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", a = { padding: "0.5rem", backgroundColor: n }, s = { padding: "2px 4px", backgroundColor: n }, i = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), i = /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ b.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ b.createElement("code", { style: s }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ b.createElement("code", { style: s }, "errorElement"), " prop on your route.")), /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ b.createElement("h3", { style: { fontStyle: "italic" } }, t), r ? /* @__PURE__ */ b.createElement("pre", { style: a }, r) : null, i);
}
var xu = /* @__PURE__ */ b.createElement(wu, null), _u = class extends b.Component {
  constructor(e) {
    super(e), this.state = {
      location: e.location,
      revalidation: e.revalidation,
      error: e.error
    };
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, t) {
    return t.location !== e.location || t.revalidation !== "idle" && e.revalidation === "idle" ? {
      error: e.error,
      location: e.location,
      revalidation: e.revalidation
    } : {
      error: e.error !== void 0 ? e.error : t.error,
      location: t.location,
      revalidation: e.revalidation || t.revalidation
    };
  }
  componentDidCatch(e, t) {
    console.error(
      "React Router caught the following error during render",
      e,
      t
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ b.createElement(Xe.Provider, { value: this.props.routeContext }, /* @__PURE__ */ b.createElement(
      _n.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function ku({ routeContext: e, match: t, children: r }) {
  let n = b.useContext(Pt);
  return n && n.static && n.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (n.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ b.createElement(Xe.Provider, { value: e }, r);
}
function Eu(e, t = [], r = null, n = null) {
  if (e == null) {
    if (!r)
      return null;
    if (r.errors)
      e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else
      return null;
  }
  let a = e, s = r == null ? void 0 : r.errors;
  if (s != null) {
    let o = a.findIndex(
      (u) => u.route.id && (s == null ? void 0 : s[u.route.id]) !== void 0
    );
    me(
      o >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        s
      ).join(",")}`
    ), a = a.slice(
      0,
      Math.min(a.length, o + 1)
    );
  }
  let i = !1, l = -1;
  if (r)
    for (let o = 0; o < a.length; o++) {
      let u = a[o];
      if ((u.route.HydrateFallback || u.route.hydrateFallbackElement) && (l = o), u.route.id) {
        let { loaderData: c, errors: h } = r, g = u.route.loader && !c.hasOwnProperty(u.route.id) && (!h || h[u.route.id] === void 0);
        if (u.route.lazy || g) {
          i = !0, l >= 0 ? a = a.slice(0, l + 1) : a = [a[0]];
          break;
        }
      }
    }
  return a.reduceRight((o, u, c) => {
    let h, g = !1, N = null, k = null;
    r && (h = s && u.route.id ? s[u.route.id] : void 0, N = u.route.errorElement || xu, i && (l < 0 && c === 0 ? (ss(
      "route-fallback",
      !1,
      "No `HydrateFallback` element provided to render during initial hydration"
    ), g = !0, k = null) : l === c && (g = !0, k = u.route.hydrateFallbackElement || null)));
    let x = t.concat(a.slice(0, c + 1)), C = () => {
      let f;
      return h ? f = N : g ? f = k : u.route.Component ? f = /* @__PURE__ */ b.createElement(u.route.Component, null) : u.route.element ? f = u.route.element : f = o, /* @__PURE__ */ b.createElement(
        ku,
        {
          match: u,
          routeContext: {
            outlet: o,
            matches: x,
            isDataRoute: r != null
          },
          children: f
        }
      );
    };
    return r && (u.route.ErrorBoundary || u.route.errorElement || c === 0) ? /* @__PURE__ */ b.createElement(
      _u,
      {
        location: r.location,
        revalidation: r.revalidation,
        component: N,
        error: h,
        children: C(),
        routeContext: { outlet: null, matches: x, isDataRoute: !0 }
      }
    ) : C();
  }, null);
}
function kn(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Cu(e) {
  let t = b.useContext(Pt);
  return me(t, kn(e)), t;
}
function Nu(e) {
  let t = b.useContext(Tr);
  return me(t, kn(e)), t;
}
function Su(e) {
  let t = b.useContext(Xe);
  return me(t, kn(e)), t;
}
function En(e) {
  let t = Su(e), r = t.matches[t.matches.length - 1];
  return me(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function Tu() {
  return En(
    "useRouteId"
    /* UseRouteId */
  );
}
function Au() {
  var n;
  let e = b.useContext(_n), t = Nu(
    "useRouteError"
    /* UseRouteError */
  ), r = En(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : (n = t.errors) == null ? void 0 : n[r];
}
function Fu() {
  let { router: e } = Cu(
    "useNavigate"
    /* UseNavigateStable */
  ), t = En(
    "useNavigate"
    /* UseNavigateStable */
  ), r = b.useRef(!1);
  return ns(() => {
    r.current = !0;
  }), b.useCallback(
    async (a, s = {}) => {
      Je(r.current, rs), r.current && (typeof a == "number" ? e.navigate(a) : await e.navigate(a, { fromRouteId: t, ...s }));
    },
    [e, t]
  );
}
var fa = {};
function ss(e, t, r) {
  !t && !fa[e] && (fa[e] = !0, Je(!1, r));
}
b.memo(Ru);
function Ru({
  routes: e,
  future: t,
  state: r
}) {
  return bu(e, void 0, r, t);
}
var or = "get", ur = "application/x-www-form-urlencoded";
function Fr(e) {
  return e != null && typeof e.tagName == "string";
}
function Ou(e) {
  return Fr(e) && e.tagName.toLowerCase() === "button";
}
function $u(e) {
  return Fr(e) && e.tagName.toLowerCase() === "form";
}
function Lu(e) {
  return Fr(e) && e.tagName.toLowerCase() === "input";
}
function Pu(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Du(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !Pu(e);
}
var sr = null;
function Iu() {
  if (sr === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), sr = !1;
    } catch {
      sr = !0;
    }
  return sr;
}
var Vu = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function zr(e) {
  return e != null && !Vu.has(e) ? (Je(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ur}"`
  ), null) : e;
}
function Mu(e, t) {
  let r, n, a, s, i;
  if ($u(e)) {
    let l = e.getAttribute("action");
    n = l ? ut(l, t) : null, r = e.getAttribute("method") || or, a = zr(e.getAttribute("enctype")) || ur, s = new FormData(e);
  } else if (Ou(e) || Lu(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let o = e.getAttribute("formaction") || l.getAttribute("action");
    if (n = o ? ut(o, t) : null, r = e.getAttribute("formmethod") || l.getAttribute("method") || or, a = zr(e.getAttribute("formenctype")) || zr(l.getAttribute("enctype")) || ur, s = new FormData(l, e), !Iu()) {
      let { name: u, type: c, value: h } = e;
      if (c === "image") {
        let g = u ? `${u}.` : "";
        s.append(`${g}x`, "0"), s.append(`${g}y`, "0");
      } else u && s.append(u, h);
    }
  } else {
    if (Fr(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = or, n = null, a = ur, i = e;
  }
  return s && a === "text/plain" && (i = s, s = void 0), { action: n, method: r.toLowerCase(), encType: a, formData: s, body: i };
}
function Cn(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
async function ju(e, t) {
  if (e.id in t)
    return t[e.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return t[e.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function Bu(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function Uu(e, t, r) {
  let n = await Promise.all(
    e.map(async (a) => {
      let s = t.routes[a.route.id];
      if (s) {
        let i = await ju(s, r);
        return i.links ? i.links() : [];
      }
      return [];
    })
  );
  return Hu(
    n.flat(1).filter(Bu).filter((a) => a.rel === "stylesheet" || a.rel === "preload").map(
      (a) => a.rel === "stylesheet" ? { ...a, rel: "prefetch", as: "style" } : { ...a, rel: "prefetch" }
    )
  );
}
function ha(e, t, r, n, a, s) {
  let i = (o, u) => r[u] ? o.route.id !== r[u].route.id : !0, l = (o, u) => {
    var c;
    return (
      // param change, /users/123 -> /users/456
      r[u].pathname !== o.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((c = r[u].route.path) == null ? void 0 : c.endsWith("*")) && r[u].params["*"] !== o.params["*"]
    );
  };
  return s === "assets" ? t.filter(
    (o, u) => i(o, u) || l(o, u)
  ) : s === "data" ? t.filter((o, u) => {
    var h;
    let c = n.routes[o.route.id];
    if (!c || !c.hasLoader)
      return !1;
    if (i(o, u) || l(o, u))
      return !0;
    if (o.route.shouldRevalidate) {
      let g = o.route.shouldRevalidate({
        currentUrl: new URL(
          a.pathname + a.search + a.hash,
          window.origin
        ),
        currentParams: ((h = r[0]) == null ? void 0 : h.params) || {},
        nextUrl: new URL(e, window.origin),
        nextParams: o.params,
        defaultShouldRevalidate: !0
      });
      if (typeof g == "boolean")
        return g;
    }
    return !0;
  }) : [];
}
function Zu(e, t, { includeHydrateFallback: r } = {}) {
  return zu(
    e.map((n) => {
      let a = t.routes[n.route.id];
      if (!a) return [];
      let s = [a.module];
      return a.clientActionModule && (s = s.concat(a.clientActionModule)), a.clientLoaderModule && (s = s.concat(a.clientLoaderModule)), r && a.hydrateFallbackModule && (s = s.concat(a.hydrateFallbackModule)), a.imports && (s = s.concat(a.imports)), s;
    }).flat(1)
  );
}
function zu(e) {
  return [...new Set(e)];
}
function Wu(e) {
  let t = {}, r = Object.keys(e).sort();
  for (let n of r)
    t[n] = e[n];
  return t;
}
function Hu(e, t) {
  let r = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((n, a) => {
    let s = JSON.stringify(Wu(a));
    return r.has(s) || (r.add(s), n.push({ key: s, link: a })), n;
  }, []);
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var qu = /* @__PURE__ */ new Set([100, 101, 204, 205]);
function Yu(e, t) {
  let r = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r.pathname === "/" ? r.pathname = "_root.data" : t && ut(r.pathname, t) === "/" ? r.pathname = `${t.replace(/\/$/, "")}/_root.data` : r.pathname = `${r.pathname.replace(/\/$/, "")}.data`, r;
}
function is() {
  let e = b.useContext(Pt);
  return Cn(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function Gu() {
  let e = b.useContext(Tr);
  return Cn(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var Nn = b.createContext(void 0);
Nn.displayName = "FrameworkContext";
function ls() {
  let e = b.useContext(Nn);
  return Cn(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function Ju(e, t) {
  let r = b.useContext(Nn), [n, a] = b.useState(!1), [s, i] = b.useState(!1), { onFocus: l, onBlur: o, onMouseEnter: u, onMouseLeave: c, onTouchStart: h } = t, g = b.useRef(null);
  b.useEffect(() => {
    if (e === "render" && i(!0), e === "viewport") {
      let x = (f) => {
        f.forEach((m) => {
          i(m.isIntersecting);
        });
      }, C = new IntersectionObserver(x, { threshold: 0.5 });
      return g.current && C.observe(g.current), () => {
        C.disconnect();
      };
    }
  }, [e]), b.useEffect(() => {
    if (n) {
      let x = setTimeout(() => {
        i(!0);
      }, 100);
      return () => {
        clearTimeout(x);
      };
    }
  }, [n]);
  let N = () => {
    a(!0);
  }, k = () => {
    a(!1), i(!1);
  };
  return r ? e !== "intent" ? [s, g, {}] : [
    s,
    g,
    {
      onFocus: zt(l, N),
      onBlur: zt(o, k),
      onMouseEnter: zt(u, N),
      onMouseLeave: zt(c, k),
      onTouchStart: zt(h, N)
    }
  ] : [!1, g, {}];
}
function zt(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function Ku({
  page: e,
  ...t
}) {
  let { router: r } = is(), n = b.useMemo(
    () => Ga(r.routes, e, r.basename),
    [r.routes, e, r.basename]
  );
  return n ? /* @__PURE__ */ b.createElement(Qu, { page: e, matches: n, ...t }) : null;
}
function Xu(e) {
  let { manifest: t, routeModules: r } = ls(), [n, a] = b.useState([]);
  return b.useEffect(() => {
    let s = !1;
    return Uu(e, t, r).then(
      (i) => {
        s || a(i);
      }
    ), () => {
      s = !0;
    };
  }, [e, t, r]), n;
}
function Qu({
  page: e,
  matches: t,
  ...r
}) {
  let n = wt(), { manifest: a, routeModules: s } = ls(), { basename: i } = is(), { loaderData: l, matches: o } = Gu(), u = b.useMemo(
    () => ha(
      e,
      t,
      o,
      a,
      n,
      "data"
    ),
    [e, t, o, a, n]
  ), c = b.useMemo(
    () => ha(
      e,
      t,
      o,
      a,
      n,
      "assets"
    ),
    [e, t, o, a, n]
  ), h = b.useMemo(() => {
    if (e === n.pathname + n.search + n.hash)
      return [];
    let k = /* @__PURE__ */ new Set(), x = !1;
    if (t.forEach((f) => {
      var y;
      let m = a.routes[f.route.id];
      !m || !m.hasLoader || (!u.some((A) => A.route.id === f.route.id) && f.route.id in l && ((y = s[f.route.id]) != null && y.shouldRevalidate) || m.hasClientLoader ? x = !0 : k.add(f.route.id));
    }), k.size === 0)
      return [];
    let C = Yu(e, i);
    return x && k.size > 0 && C.searchParams.set(
      "_routes",
      t.filter((f) => k.has(f.route.id)).map((f) => f.route.id).join(",")
    ), [C.pathname + C.search];
  }, [
    i,
    l,
    n,
    a,
    u,
    t,
    e,
    s
  ]), g = b.useMemo(
    () => Zu(c, a),
    [c, a]
  ), N = Xu(c);
  return /* @__PURE__ */ b.createElement(b.Fragment, null, h.map((k) => /* @__PURE__ */ b.createElement("link", { key: k, rel: "prefetch", as: "fetch", href: k, ...r })), g.map((k) => /* @__PURE__ */ b.createElement("link", { key: k, rel: "modulepreload", href: k, ...r })), N.map(({ key: k, link: x }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ b.createElement("link", { key: k, ...x })
  )));
}
function ec(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var os = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  os && (window.__reactRouterVersion = "7.6.2");
} catch {
}
var us = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, cs = b.forwardRef(
  function({
    onClick: t,
    discover: r = "render",
    prefetch: n = "none",
    relative: a,
    reloadDocument: s,
    replace: i,
    state: l,
    target: o,
    to: u,
    preventScrollReset: c,
    viewTransition: h,
    ...g
  }, N) {
    let { basename: k } = b.useContext(Ke), x = typeof u == "string" && us.test(u), C, f = !1;
    if (typeof u == "string" && x && (C = u, os))
      try {
        let R = new URL(window.location.href), O = u.startsWith("//") ? new URL(R.protocol + u) : new URL(u), U = ut(O.pathname, k);
        O.origin === R.origin && U != null ? u = U + O.search + O.hash : f = !0;
      } catch {
        Je(
          !1,
          `<Link to="${u}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let m = vu(u, { relative: a }), [y, A, I] = Ju(
      n,
      g
    ), _ = ac(u, {
      replace: i,
      state: l,
      target: o,
      preventScrollReset: c,
      relative: a,
      viewTransition: h
    });
    function F(R) {
      t && t(R), R.defaultPrevented || _(R);
    }
    let E = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ b.createElement(
        "a",
        {
          ...g,
          ...I,
          href: C || m,
          onClick: f || s ? t : F,
          ref: ec(N, A),
          target: o,
          "data-discover": !x && r === "render" ? "true" : void 0
        }
      )
    );
    return y && !x ? /* @__PURE__ */ b.createElement(b.Fragment, null, E, /* @__PURE__ */ b.createElement(Ku, { page: m })) : E;
  }
);
cs.displayName = "Link";
var tc = b.forwardRef(
  function({
    "aria-current": t = "page",
    caseSensitive: r = !1,
    className: n = "",
    end: a = !1,
    style: s,
    to: i,
    viewTransition: l,
    children: o,
    ...u
  }, c) {
    let h = er(i, { relative: u.relative }), g = wt(), N = b.useContext(Tr), { navigator: k, basename: x } = b.useContext(Ke), C = N != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    uc(h) && l === !0, f = k.encodeLocation ? k.encodeLocation(h).pathname : h.pathname, m = g.pathname, y = N && N.navigation && N.navigation.location ? N.navigation.location.pathname : null;
    r || (m = m.toLowerCase(), y = y ? y.toLowerCase() : null, f = f.toLowerCase()), y && x && (y = ut(y, x) || y);
    const A = f !== "/" && f.endsWith("/") ? f.length - 1 : f.length;
    let I = m === f || !a && m.startsWith(f) && m.charAt(A) === "/", _ = y != null && (y === f || !a && y.startsWith(f) && y.charAt(f.length) === "/"), F = {
      isActive: I,
      isPending: _,
      isTransitioning: C
    }, E = I ? t : void 0, R;
    typeof n == "function" ? R = n(F) : R = [
      n,
      I ? "active" : null,
      _ ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let O = typeof s == "function" ? s(F) : s;
    return /* @__PURE__ */ b.createElement(
      cs,
      {
        ...u,
        "aria-current": E,
        className: R,
        ref: c,
        style: O,
        to: i,
        viewTransition: l
      },
      typeof o == "function" ? o(F) : o
    );
  }
);
tc.displayName = "NavLink";
var rc = b.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: r,
    reloadDocument: n,
    replace: a,
    state: s,
    method: i = or,
    action: l,
    onSubmit: o,
    relative: u,
    preventScrollReset: c,
    viewTransition: h,
    ...g
  }, N) => {
    let k = lc(), x = oc(l, { relative: u }), C = i.toLowerCase() === "get" ? "get" : "post", f = typeof l == "string" && us.test(l), m = (y) => {
      if (o && o(y), y.defaultPrevented) return;
      y.preventDefault();
      let A = y.nativeEvent.submitter, I = (A == null ? void 0 : A.getAttribute("formmethod")) || i;
      k(A || y.currentTarget, {
        fetcherKey: t,
        method: I,
        navigate: r,
        replace: a,
        state: s,
        relative: u,
        preventScrollReset: c,
        viewTransition: h
      });
    };
    return /* @__PURE__ */ b.createElement(
      "form",
      {
        ref: N,
        method: C,
        action: x,
        onSubmit: n ? o : m,
        ...g,
        "data-discover": !f && e === "render" ? "true" : void 0
      }
    );
  }
);
rc.displayName = "Form";
function nc(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ds(e) {
  let t = b.useContext(Pt);
  return me(t, nc(e)), t;
}
function ac(e, {
  target: t,
  replace: r,
  state: n,
  preventScrollReset: a,
  relative: s,
  viewTransition: i
} = {}) {
  let l = as(), o = wt(), u = er(e, { relative: s });
  return b.useCallback(
    (c) => {
      if (Du(c, t)) {
        c.preventDefault();
        let h = r !== void 0 ? r : sn(o) === sn(u);
        l(e, {
          replace: h,
          state: n,
          preventScrollReset: a,
          relative: s,
          viewTransition: i
        });
      }
    },
    [
      o,
      l,
      u,
      r,
      n,
      t,
      e,
      a,
      s,
      i
    ]
  );
}
var sc = 0, ic = () => `__${String(++sc)}__`;
function lc() {
  let { router: e } = ds(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = b.useContext(Ke), r = Tu();
  return b.useCallback(
    async (n, a = {}) => {
      let { action: s, method: i, encType: l, formData: o, body: u } = Mu(
        n,
        t
      );
      if (a.navigate === !1) {
        let c = a.fetcherKey || ic();
        await e.fetch(c, r, a.action || s, {
          preventScrollReset: a.preventScrollReset,
          formData: o,
          body: u,
          formMethod: a.method || i,
          formEncType: a.encType || l,
          flushSync: a.flushSync
        });
      } else
        await e.navigate(a.action || s, {
          preventScrollReset: a.preventScrollReset,
          formData: o,
          body: u,
          formMethod: a.method || i,
          formEncType: a.encType || l,
          replace: a.replace,
          state: a.state,
          fromRouteId: r,
          flushSync: a.flushSync,
          viewTransition: a.viewTransition
        });
    },
    [e, t, r]
  );
}
function oc(e, { relative: t } = {}) {
  let { basename: r } = b.useContext(Ke), n = b.useContext(Xe);
  me(n, "useFormAction must be used inside a RouteContext");
  let [a] = n.matches.slice(-1), s = { ...er(e || ".", { relative: t }) }, i = wt();
  if (e == null) {
    s.search = i.search;
    let l = new URLSearchParams(s.search), o = l.getAll("index");
    if (o.some((c) => c === "")) {
      l.delete("index"), o.filter((h) => h).forEach((h) => l.append("index", h));
      let c = l.toString();
      s.search = c ? `?${c}` : "";
    }
  }
  return (!e || e === ".") && a.route.index && (s.search = s.search ? s.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (s.pathname = s.pathname === "/" ? r : Ye([r, s.pathname])), sn(s);
}
function uc(e, t = {}) {
  let r = b.useContext(ts);
  me(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: n } = ds(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), a = er(e, { relative: t.relative });
  if (!r.isTransitioning)
    return !1;
  let s = ut(r.currentLocation.pathname, n) || r.currentLocation.pathname, i = ut(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return _r(a.pathname, i) != null || _r(a.pathname, s) != null;
}
[
  ...qu
];
const bc = ({
  schema: e,
  mode: t,
  isOpen: r,
  onClose: n,
  onSubmit: a,
  defaultValues: s,
  isSubmitting: i = !1
}) => {
  var N, k;
  const l = as(), o = ((N = e.displayConfig) == null ? void 0 : N.mode) || "dialog", u = ((k = e.displayConfig) == null ? void 0 : k.width) || (o === "dialog" ? "md" : "max-w-md"), c = () => {
    var x;
    return (x = e.displayConfig) != null && x.title ? e.displayConfig.title[t] || `${t.charAt(0).toUpperCase() + t.slice(1)} Form` : `${t.charAt(0).toUpperCase() + t.slice(1)} Form`;
  }, h = (x) => {
    var C;
    a(x), (C = e.displayConfig) != null && C.redirectAfterSubmit && e.displayConfig.redirectPath && l(e.displayConfig.redirectPath);
  }, g = () => {
    var x, C, f;
    return /* @__PURE__ */ v(
      Ni,
      {
        schema: e,
        mode: t,
        onSubmit: h,
        onCancel: n,
        defaultValues: s,
        isSubmitting: i,
        submitLabel: (C = (x = e.displayConfig) == null ? void 0 : x.submitLabel) == null ? void 0 : C[t],
        cancelLabel: (f = e.displayConfig) == null ? void 0 : f.cancelLabel
      }
    );
  };
  return o === "page" ? /* @__PURE__ */ B("div", { className: "container mx-auto px-4 py-8 max-w-3xl", children: [
    /* @__PURE__ */ v("h1", { className: "text-2xl font-bold mb-6", children: c() }),
    /* @__PURE__ */ v("div", { className: "bg-white shadow rounded-lg p-6", children: g() })
  ] }) : o === "sidepanel" ? /* @__PURE__ */ v(
    Io,
    {
      isOpen: r,
      onClose: n,
      title: c(),
      width: typeof u == "string" ? u : "max-w-md",
      children: g()
    }
  ) : /* @__PURE__ */ v(
    Do,
    {
      isOpen: r,
      onClose: n,
      title: c(),
      size: typeof u == "string" ? "lg" : u,
      children: g()
    }
  );
}, wc = ({ onSave: e, initialSchema: t }) => {
  const [r, n] = ee((t == null ? void 0 : t.fields) || []), [a, s] = ee(null), [i, l] = ee(!1), [o, u] = ee([]), [c, h] = ee(null), g = [
    { value: "text", label: "Text" },
    { value: "email", label: "Email" },
    { value: "password", label: "Password" },
    { value: "number", label: "Number" },
    { value: "select", label: "Select" },
    { value: "textarea", label: "Textarea" },
    { value: "checkbox", label: "Checkbox" },
    { value: "radio", label: "Radio" },
    { value: "date", label: "Date" }
  ], N = () => {
    s({
      name: "",
      label: "",
      type: "text",
      placeholder: "",
      required: !1
    }), u([]), l(!1), h(null);
  }, k = () => {
    N();
  }, x = (E) => {
    const R = r[E];
    s(R), u(R.options || []), l(!0), h(E);
  }, C = (E) => {
    n(r.filter((R, O) => O !== E));
  }, f = (E, R) => {
    if (R === "up" && E === 0 || R === "down" && E === r.length - 1)
      return;
    const O = [...r], U = R === "up" ? E - 1 : E + 1;
    [O[E], O[U]] = [O[U], O[E]], n(O);
  }, m = () => {
    if (!a || !a.name || !a.label) return;
    const E = {
      ...a
    };
    if (["select", "radio"].includes(a.type) && o.length > 0 && (E.options = [...o]), a.required && (E.validation = {
      ...E.validation,
      required: `${a.label} is required`
    }), i && c !== null) {
      const R = [...r];
      R[c] = E, n(R);
    } else
      n([...r, E]);
    N();
  }, y = () => {
    u([...o, { value: "", label: "" }]);
  }, A = (E, R, O) => {
    const U = [...o];
    U[E] = { ...U[E], [R]: O }, u(U);
  }, I = (E) => {
    u(o.filter((R, O) => O !== E));
  }, _ = () => {
    e({ fields: r });
  }, F = (E) => E ? E.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (R, O) => O.toUpperCase()).replace(/[^a-zA-Z0-9]/g, "").replace(/^[A-Z]/, (R) => R.toLowerCase()) : "";
  return /* @__PURE__ */ B("div", { className: "space-y-6", children: [
    /* @__PURE__ */ B("div", { className: "bg-white p-6 rounded-lg shadow", children: [
      /* @__PURE__ */ v("h2", { className: "text-lg font-medium mb-4", children: "Form Fields" }),
      r.length === 0 ? /* @__PURE__ */ v("div", { className: "text-center py-8 text-gray-500", children: 'No fields added yet. Click "Add Field" to start building your form.' }) : /* @__PURE__ */ v("div", { className: "space-y-2", children: r.map((E, R) => /* @__PURE__ */ B("div", { className: "flex items-center justify-between p-3 border rounded-md", children: [
        /* @__PURE__ */ B("div", { children: [
          /* @__PURE__ */ v("span", { className: "font-medium", children: E.label }),
          /* @__PURE__ */ B("span", { className: "ml-2 text-sm text-gray-500", children: [
            "(",
            E.type,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ B("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ v(
            ue,
            {
              size: "sm",
              variant: "outline",
              onClick: () => f(R, "up"),
              disabled: R === 0,
              children: "↑"
            }
          ),
          /* @__PURE__ */ v(
            ue,
            {
              size: "sm",
              variant: "outline",
              onClick: () => f(R, "down"),
              disabled: R === r.length - 1,
              children: "↓"
            }
          ),
          /* @__PURE__ */ v(ue, { size: "sm", variant: "outline", onClick: () => x(R), children: "Edit" }),
          /* @__PURE__ */ v(ue, { size: "sm", variant: "danger", onClick: () => C(R), children: "Delete" })
        ] })
      ] }, R)) }),
      /* @__PURE__ */ v("div", { className: "mt-4", children: /* @__PURE__ */ v(ue, { onClick: k, children: "Add Field" }) })
    ] }),
    a && /* @__PURE__ */ B("div", { className: "bg-white p-6 rounded-lg shadow", children: [
      /* @__PURE__ */ v("h2", { className: "text-lg font-medium mb-4", children: i ? "Edit Field" : "Add New Field" }),
      /* @__PURE__ */ B("div", { className: "space-y-4", children: [
        /* @__PURE__ */ v(
          xe,
          {
            label: "Field Label",
            value: a.label,
            onChange: (E) => {
              const R = E.target.value;
              s({
                ...a,
                label: R,
                name: i ? a.name : F(R)
              });
            },
            placeholder: "e.g. First Name"
          }
        ),
        /* @__PURE__ */ v(
          xe,
          {
            label: "Field Name (ID)",
            value: a.name,
            onChange: (E) => s({ ...a, name: E.target.value }),
            placeholder: "e.g. firstName",
            helperText: "Unique identifier for this field"
          }
        ),
        /* @__PURE__ */ v(
          Ct,
          {
            label: "Field Type",
            value: a.type,
            onChange: (E) => s({ ...a, type: E.target.value }),
            options: g
          }
        ),
        /* @__PURE__ */ v(
          xe,
          {
            label: "Placeholder",
            value: a.placeholder || "",
            onChange: (E) => s({ ...a, placeholder: E.target.value }),
            placeholder: "e.g. Enter your first name"
          }
        ),
        /* @__PURE__ */ v(
          xe,
          {
            label: "Helper Text",
            value: a.helperText || "",
            onChange: (E) => s({ ...a, helperText: E.target.value }),
            placeholder: "e.g. This will be displayed on your profile"
          }
        ),
        /* @__PURE__ */ B("div", { className: "flex items-center", children: [
          /* @__PURE__ */ v(
            "input",
            {
              type: "checkbox",
              id: "required",
              checked: a.required || !1,
              onChange: (E) => s({ ...a, required: E.target.checked }),
              className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ v("label", { htmlFor: "required", className: "ml-2 block text-sm text-gray-900", children: "Required Field" })
        ] }),
        ["select", "radio"].includes(a.type) && /* @__PURE__ */ B("div", { className: "space-y-3", children: [
          /* @__PURE__ */ B("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ v("h3", { className: "text-sm font-medium", children: "Options" }),
            /* @__PURE__ */ v(ue, { size: "sm", onClick: y, children: "Add Option" })
          ] }),
          o.map((E, R) => /* @__PURE__ */ B("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ v(
              xe,
              {
                value: E.value,
                onChange: (O) => A(R, "value", O.target.value),
                placeholder: "Value",
                className: "flex-1"
              }
            ),
            /* @__PURE__ */ v(
              xe,
              {
                value: E.label,
                onChange: (O) => A(R, "label", O.target.value),
                placeholder: "Label",
                className: "flex-1"
              }
            ),
            /* @__PURE__ */ v(ue, { size: "sm", variant: "danger", onClick: () => I(R), children: "Remove" })
          ] }, R))
        ] }),
        /* @__PURE__ */ B("div", { className: "flex justify-end space-x-2 pt-4", children: [
          /* @__PURE__ */ v(ue, { variant: "outline", onClick: N, children: "Cancel" }),
          /* @__PURE__ */ v(ue, { onClick: m, children: i ? "Update Field" : "Add Field" })
        ] })
      ] })
    ] }),
    r.length > 0 && /* @__PURE__ */ v("div", { className: "flex justify-end", children: /* @__PURE__ */ v(ue, { onClick: _, children: "Save Form" }) })
  ] });
}, cc = ({
  children: e,
  variant: t = "default",
  className: r = ""
}) => /* @__PURE__ */ v(
  "span",
  {
    className: `
        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        ${{
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      danger: "bg-red-100 text-red-800",
      info: "bg-blue-100 text-blue-800",
      default: "bg-gray-100 text-gray-800"
    }[t]}
        ${r}
      `,
    children: e
  }
), dc = ({ filters: e, onFilterChange: t }) => {
  const [r, n] = ee([]), [a, s] = ee(""), [i, l] = ee({}), [o, u] = ee({});
  ie(() => {
    const f = e.filter((m) => m.defaultValue !== void 0).map((m) => ({
      filterId: m.id,
      operator: m.defaultOperator || c(m.type),
      value: m.defaultValue
    }));
    f.length > 0 && (n(f), t(f)), e.forEach(async (m) => {
      if (m.dataSource && m.dataSource.type === "api") {
        u((y) => ({ ...y, [m.id]: !0 }));
        try {
          const y = await Kr(m.dataSource);
          l((A) => ({ ...A, [m.id]: y }));
        } finally {
          u((y) => ({ ...y, [m.id]: !1 }));
        }
      }
    });
  }, [e]);
  const c = (f) => {
    switch (f) {
      case "number":
      case "date":
        return "equals";
      case "select":
        return "equals";
      case "checkbox":
        return "equals";
      default:
        return "contains";
    }
  }, h = (f) => {
    const m = {
      equals: "Equals",
      contains: "Contains",
      startsWith: "Starts with",
      endsWith: "Ends with",
      greaterThan: "Greater than",
      lessThan: "Less than",
      between: "Between",
      in: "In list"
    };
    return f.map((y) => ({
      value: y,
      label: m[y]
    }));
  }, g = () => {
    if (!a) return;
    const f = e.find((A) => A.id === a);
    if (!f) return;
    const m = {
      filterId: a,
      operator: f.defaultOperator || c(f.type),
      value: f.type === "checkbox" ? !0 : ""
    }, y = [...r, m];
    n(y), t(y), s("");
  }, N = (f) => {
    const m = r.filter((y, A) => A !== f);
    n(m), t(m);
  }, k = (f, m, y) => {
    const A = [...r];
    A[f] = { ...A[f], [m]: y }, m === "operator" && A[f].operator !== "between" && (A[f].secondValue = void 0), n(A), t(A);
  }, x = (f, m) => {
    const y = e.find((A) => A.id === f.filterId);
    if (!y) return null;
    switch (y.type) {
      case "select":
        const A = i[y.id] || y.options || [], I = o[y.id] || !1;
        return /* @__PURE__ */ v(
          Ct,
          {
            options: A,
            value: f.value,
            onChange: (_) => k(m, "value", _.target.value),
            className: "w-full",
            isLoading: I
          }
        );
      case "checkbox":
        return /* @__PURE__ */ B("div", { className: "flex items-center", children: [
          /* @__PURE__ */ v(
            "input",
            {
              type: "checkbox",
              checked: f.value,
              onChange: (_) => k(m, "value", _.target.checked),
              className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ v("label", { className: "ml-2 block text-sm text-gray-900", children: f.value ? "Yes" : "No" })
        ] });
      case "date":
        return /* @__PURE__ */ B("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ v(
            xe,
            {
              type: "date",
              value: f.value,
              onChange: (_) => k(m, "value", _.target.value),
              className: "w-full"
            }
          ),
          f.operator === "between" && /* @__PURE__ */ v(
            xe,
            {
              type: "date",
              value: f.secondValue || "",
              onChange: (_) => k(m, "secondValue", _.target.value),
              className: "w-full",
              placeholder: "End date"
            }
          )
        ] });
      case "number":
        return /* @__PURE__ */ B("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ v(
            xe,
            {
              type: "number",
              value: f.value,
              onChange: (_) => k(m, "value", _.target.value),
              className: "w-full"
            }
          ),
          f.operator === "between" && /* @__PURE__ */ v(
            xe,
            {
              type: "number",
              value: f.secondValue || "",
              onChange: (_) => k(m, "secondValue", _.target.value),
              className: "w-full",
              placeholder: "Max value"
            }
          )
        ] });
      default:
        return /* @__PURE__ */ v(
          xe,
          {
            type: "text",
            value: f.value,
            onChange: (_) => k(m, "value", _.target.value),
            className: "w-full",
            placeholder: `Filter by ${y.label.toLowerCase()}`
          }
        );
    }
  }, C = e.filter(
    (f) => !r.some((m) => m.filterId === f.id)
  );
  return /* @__PURE__ */ v("div", { className: "bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4", children: /* @__PURE__ */ B("div", { className: "space-y-4", children: [
    r.map((f, m) => {
      const y = e.find((A) => A.id === f.filterId);
      return y ? /* @__PURE__ */ B("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ v("div", { className: "w-1/4", children: /* @__PURE__ */ v("span", { className: "text-sm font-medium text-gray-700", children: y.label }) }),
        /* @__PURE__ */ v("div", { className: "w-1/4", children: /* @__PURE__ */ v(
          Ct,
          {
            options: h(y.operators),
            value: f.operator,
            onChange: (A) => k(m, "operator", A.target.value),
            className: "w-full"
          }
        ) }),
        /* @__PURE__ */ v("div", { className: "flex-1", children: x(f, m) }),
        /* @__PURE__ */ v(
          ue,
          {
            variant: "outline",
            size: "sm",
            onClick: () => N(m),
            className: "flex-shrink-0",
            children: /* @__PURE__ */ v(yn, { className: "h-4 w-4" })
          }
        )
      ] }, m) : null;
    }),
    C.length > 0 && /* @__PURE__ */ B("div", { className: "flex items-center space-x-2 pt-2", children: [
      /* @__PURE__ */ v(
        Ct,
        {
          options: C.map((f) => ({
            value: f.id,
            label: f.label
          })),
          value: a,
          onChange: (f) => s(f.target.value),
          className: "w-full",
          placeholder: "Add filter"
        }
      ),
      /* @__PURE__ */ B(
        ue,
        {
          onClick: g,
          disabled: !a,
          size: "sm",
          children: [
            /* @__PURE__ */ v(Lo, { className: "h-4 w-4 mr-1" }),
            "Add Filter"
          ]
        }
      )
    ] })
  ] }) });
}, fc = ({
  schema: e,
  data: t,
  isLoading: r = !1,
  emptyMessage: n = "No data available",
  onRowClick: a
}) => {
  const [s, i] = ee([]), [l, o] = ee(
    e.defaultSortField ? {
      field: e.defaultSortField,
      direction: e.defaultSortDirection || "asc"
    } : null
  ), [u, c] = ee(!1), h = ve(() => l ? [...t].sort((f, m) => {
    const y = e.columns.find(
      (F) => typeof F.accessor == "string" && F.accessor === l.field
    );
    if (!y || typeof y.accessor != "string") return 0;
    const A = f[y.accessor], I = m[y.accessor];
    if (A === I) return 0;
    if (A == null && I != null) return l.direction === "asc" ? -1 : 1;
    if (A != null && I == null) return l.direction === "asc" ? 1 : -1;
    if (A == null && I == null) return 0;
    const _ = l.direction === "asc" ? 1 : -1;
    return y.type === "number" ? (Number(A) - Number(I)) * _ : y.type === "date" ? (new Date(A).getTime() - new Date(I).getTime()) * _ : String(A).localeCompare(String(I)) * _;
  }) : [...t], [t, l]), g = ve(() => s.length === 0 ? h : h.filter((f) => s.every((m) => {
    var _;
    const y = (_ = e.filters) == null ? void 0 : _.find((F) => F.id === m.filterId);
    if (!y) return !0;
    const A = y.accessor, I = f[A];
    if (I == null)
      return m.value === "" || m.value === null;
    switch (m.operator) {
      case "equals":
        return y.type === "checkbox" ? I === m.value : String(I).toLowerCase() === String(m.value).toLowerCase();
      case "contains":
        return String(I).toLowerCase().includes(String(m.value).toLowerCase());
      case "startsWith":
        return String(I).toLowerCase().startsWith(String(m.value).toLowerCase());
      case "endsWith":
        return String(I).toLowerCase().endsWith(String(m.value).toLowerCase());
      case "greaterThan":
        return y.type === "date" ? new Date(I) > new Date(m.value) : Number(I) > Number(m.value);
      case "lessThan":
        return y.type === "date" ? new Date(I) < new Date(m.value) : Number(I) < Number(m.value);
      case "between":
        if (y.type === "date") {
          const F = new Date(I).getTime();
          return F >= new Date(m.value).getTime() && F <= new Date(m.secondValue).getTime();
        }
        return Number(I) >= Number(m.value) && Number(I) <= Number(m.secondValue);
      case "in":
        return Array.isArray(m.value) ? m.value.includes(I) : !1;
      default:
        return !0;
    }
  })), [h, s, e.filters]), N = (f) => {
    typeof f.accessor != "string" || !f.sortable || o((m) => !m || m.field !== f.accessor ? { field: f.accessor, direction: "asc" } : m.direction === "asc" ? { field: f.accessor, direction: "desc" } : null);
  }, k = (f) => {
    i(f);
  }, x = (f, m) => {
    if (typeof m.accessor == "function")
      return m.accessor(f);
    const y = f[m.accessor];
    if (y == null)
      return m.format ? m.format(y) : "-";
    if (m.format)
      try {
        return m.format(y);
      } catch (A) {
        return console.error(`Error formatting value for column ${m.id}:`, A), "-";
      }
    switch (m.type) {
      case "date":
        try {
          return y ? new Date(y).toLocaleDateString() : "-";
        } catch {
          return "-";
        }
      case "boolean":
        return y ? "Yes" : "No";
      case "badge":
        if (m.badgeOptions && y) {
          const A = m.badgeOptions[y];
          if (A)
            return /* @__PURE__ */ v(cc, { variant: A.variant, children: A.label || y });
        }
        return y;
      default:
        return y;
    }
  }, C = (f) => {
    if (!e.actions || e.actions.length === 0) return null;
    const { hasPermission: m } = Ta();
    return /* @__PURE__ */ v("div", { className: "flex space-x-2", children: e.actions.map((y, A) => y.showCondition && !y.showCondition(f) || y.permission && !m(y.permission) ? null : /* @__PURE__ */ v(
      ue,
      {
        size: "sm",
        variant: y.variant || "primary",
        onClick: (I) => {
          I.stopPropagation(), y.onClick(f);
        },
        children: y.label
      },
      A
    )) });
  };
  return r ? /* @__PURE__ */ v("div", { className: "min-w-full overflow-hidden rounded-lg border border-gray-200", children: /* @__PURE__ */ v("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ v("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" }) }) }) : /* @__PURE__ */ B("div", { className: "space-y-4", children: [
    e.filters && e.filters.length > 0 && /* @__PURE__ */ B("div", { children: [
      /* @__PURE__ */ B("div", { className: "flex justify-between items-center mb-2", children: [
        /* @__PURE__ */ B("h3", { className: "text-lg font-medium", children: [
          g.length,
          " ",
          g.length === 1 ? "result" : "results"
        ] }),
        /* @__PURE__ */ v(
          ue,
          {
            variant: "outline",
            onClick: () => c(!u),
            children: u ? "Hide Filters" : "Show Filters"
          }
        )
      ] }),
      u && /* @__PURE__ */ v(
        dc,
        {
          filters: e.filters,
          onFilterChange: k
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "overflow-x-auto rounded-lg border border-gray-200", children: g.length === 0 ? /* @__PURE__ */ v("div", { className: "flex justify-center items-center h-64 text-gray-500", children: n }) : /* @__PURE__ */ B("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ v("thead", { className: "bg-gray-50", children: /* @__PURE__ */ B("tr", { children: [
        e.columns.map((f, m) => /* @__PURE__ */ v(
          "th",
          {
            scope: "col",
            className: `px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${f.className || ""}`,
            style: { width: f.width },
            onClick: () => f.sortable && N(f),
            children: /* @__PURE__ */ B("div", { className: "flex items-center space-x-1", children: [
              /* @__PURE__ */ v("span", { children: f.header }),
              f.sortable && typeof f.accessor == "string" && /* @__PURE__ */ B("span", { className: "inline-flex flex-col", children: [
                /* @__PURE__ */ v(
                  Fo,
                  {
                    className: `h-3 w-3 ${(l == null ? void 0 : l.field) === f.accessor && (l == null ? void 0 : l.direction) === "asc" ? "text-blue-600" : "text-gray-400"}`
                  }
                ),
                /* @__PURE__ */ v(
                  To,
                  {
                    className: `h-3 w-3 -mt-1 ${(l == null ? void 0 : l.field) === f.accessor && (l == null ? void 0 : l.direction) === "desc" ? "text-blue-600" : "text-gray-400"}`
                  }
                )
              ] })
            ] })
          },
          m
        )),
        e.actions && e.actions.length > 0 && /* @__PURE__ */ v("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ v("tbody", { className: "bg-white divide-y divide-gray-200", children: g.map((f) => /* @__PURE__ */ B(
        "tr",
        {
          className: a ? "hover:bg-gray-50 cursor-pointer" : "",
          onClick: () => a && a(f),
          children: [
            e.columns.map((m, y) => /* @__PURE__ */ v(
              "td",
              {
                className: `px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${m.className || ""}`,
                children: x(f, m)
              },
              y
            )),
            e.actions && e.actions.length > 0 && /* @__PURE__ */ v("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: C(f) })
          ]
        },
        f[e.keyField]
      )) })
    ] }) })
  ] });
}, xc = ({
  schema: e,
  data: t,
  isLoading: r = !1,
  emptyMessage: n = "No data available",
  onRowClick: a
}) => {
  var E, R;
  const [s, i] = ee(!1), [l, o] = ee([]), [u, c] = ee([...t]), [h, g] = ee(!1), [N, k] = ee(!1);
  ie(() => {
    s || c([...t]);
  }, [t, s]);
  const x = (O) => {
    const U = l.some((D) => D[e.keyField] === O[e.keyField]);
    o(U ? l.filter((D) => D[e.keyField] !== O[e.keyField]) : [...l, O]);
  }, C = () => {
    l.length === t.length ? o([]) : o([...t]);
  }, f = () => {
    i(!0);
  }, m = async () => {
    var O;
    if ((O = e.bulkEditConfig) != null && O.saveAction) {
      g(!0);
      try {
        await e.bulkEditConfig.saveAction(u), i(!1), k(!1), o([]);
      } catch (U) {
        console.error("Error saving bulk edit:", U);
      } finally {
        g(!1);
      }
    }
  }, y = () => {
    var O;
    i(!1), k(!1), c([...t]), o([]), (O = e.bulkEditConfig) != null && O.cancelAction && e.bulkEditConfig.cancelAction();
  }, A = (O, U, D) => {
    const z = [...u];
    z[O][U] = D, c(z);
  }, I = () => {
    k(!N);
  }, _ = (O, U) => {
    if (U === "up" && O === 0 || U === "down" && O === u.length - 1)
      return;
    const D = [...u], z = U === "up" ? O - 1 : O + 1;
    [D[O], D[z]] = [D[z], D[O]], c(D);
  }, F = {
    ...e,
    columns: [
      {
        id: "selection",
        header: /* @__PURE__ */ v(
          "input",
          {
            type: "checkbox",
            checked: l.length === t.length && t.length > 0,
            onChange: C,
            className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          }
        ),
        accessor: (O) => /* @__PURE__ */ v(
          "input",
          {
            type: "checkbox",
            checked: l.some((U) => U[e.keyField] === O[e.keyField]),
            onChange: (U) => {
              U.stopPropagation(), x(O);
            },
            className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          }
        ),
        type: "text",
        width: "40px"
      },
      ...e.columns,
      ...N ? [{
        id: "reorder",
        header: "",
        accessor: (O, U) => /* @__PURE__ */ B("div", { className: "flex space-x-1", children: [
          /* @__PURE__ */ v(
            "button",
            {
              onClick: (D) => {
                D.stopPropagation(), typeof U == "number" && _(U, "up");
              },
              className: "p-1 text-gray-500 hover:text-gray-700",
              disabled: typeof U == "number" && U === 0,
              children: "↑"
            }
          ),
          /* @__PURE__ */ v(
            "button",
            {
              onClick: (D) => {
                D.stopPropagation(), typeof U == "number" && _(U, "down");
              },
              className: "p-1 text-gray-500 hover:text-gray-700",
              disabled: typeof U == "number" && U === u.length - 1,
              children: "↓"
            }
          )
        ] }),
        type: "text",
        width: "80px"
      }] : []
    ]
  };
  return /* @__PURE__ */ B("div", { className: "space-y-4", children: [
    /* @__PURE__ */ B("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ v("div", { children: l.length > 0 && /* @__PURE__ */ B("span", { className: "text-sm text-gray-600", children: [
        l.length,
        " ",
        l.length === 1 ? "item" : "items",
        " selected"
      ] }) }),
      /* @__PURE__ */ B("div", { className: "flex space-x-2", children: [
        !s && ((E = e.features) == null ? void 0 : E.bulkEdit) && l.length > 0 && /* @__PURE__ */ B(ue, { onClick: f, children: [
          /* @__PURE__ */ v(Oo, { className: "h-4 w-4 mr-1" }),
          "Edit Selected"
        ] }),
        s && ((R = e.features) == null ? void 0 : R.reordering) && /* @__PURE__ */ B(
          ue,
          {
            variant: N ? "secondary" : "outline",
            onClick: I,
            children: [
              /* @__PURE__ */ v(Eo, { className: "h-4 w-4 mr-1" }),
              N ? "Exit Reorder" : "Reorder Rows"
            ]
          }
        ),
        s && /* @__PURE__ */ B(vs, { children: [
          /* @__PURE__ */ v(ue, { variant: "outline", onClick: y, children: "Cancel" }),
          /* @__PURE__ */ B(ue, { onClick: m, isLoading: h, children: [
            /* @__PURE__ */ v(No, { className: "h-4 w-4 mr-1" }),
            "Save Changes"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ v(
      fc,
      {
        schema: F,
        data: u,
        isLoading: r,
        emptyMessage: n,
        onRowClick: a,
        editMode: s,
        onFieldChange: A
      }
    )
  ] });
};
export {
  xc as BulkEditTable,
  Ni as DynamicForm,
  fc as DynamicTable,
  dc as FilterPanel,
  wc as FormBuilder,
  bc as FormContainer,
  vc as PermissionProvider,
  Io as SidePanel,
  Ta as usePermissions
};
//# sourceMappingURL=react-dynamic-forms-tables.es.js.map
