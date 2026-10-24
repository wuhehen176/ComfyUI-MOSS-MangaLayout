import { app as nn } from "../../scripts/app.js";
import { api as gr } from "../../scripts/api.js";
// @__NO_SIDE_EFFECTS__
function Bs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ae = {}, Lt = [], it = () => {
}, Qi = () => !1, qn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Gn = (e) => e.startsWith("onUpdate:"), Me = Object.assign, Us = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, mr = Object.prototype.hasOwnProperty, Q = (e, t) => mr.call(e, t), D = Array.isArray, Tt = (e) => xn(e) === "[object Map]", yt = (e) => xn(e) === "[object Set]", di = (e) => xn(e) === "[object Date]", W = (e) => typeof e == "function", ge = (e) => typeof e == "string", ze = (e) => typeof e == "symbol", oe = (e) => e !== null && typeof e == "object", eo = (e) => (oe(e) || W(e)) && W(e.then) && W(e.catch), to = Object.prototype.toString, xn = (e) => to.call(e), vr = (e) => xn(e).slice(8, -1), no = (e) => xn(e) === "[object Object]", Ws = (e) => ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ln = /* @__PURE__ */ Bs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Yn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, yr = /-\w/g, Ue = Yn(
  (e) => e.replace(yr, (t) => t.slice(1).toUpperCase())
), br = /\B([A-Z])/g, Rt = Yn(
  (e) => e.replace(br, "-$1").toLowerCase()
), so = Yn((e) => e.charAt(0).toUpperCase() + e.slice(1)), fs = Yn(
  (e) => e ? `on${so(e)}` : ""
), tt = (e, t) => !Object.is(e, t), Fn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, io = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Xn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let hi;
const Zn = () => hi || (hi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function dn(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = ge(s) ? Cr(s) : dn(s);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (ge(e) || oe(e))
    return e;
}
const _r = /;(?![^(]*\))/g, xr = /:([^]+)/, wr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Cr(e) {
  const t = {};
  return e.replace(wr, (n) => n.startsWith("/*") ? "" : n).split(_r).forEach((n) => {
    if (n) {
      const s = n.split(xr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Mt(e) {
  let t = "";
  if (ge(e))
    t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const s = Mt(e[n]);
      s && (t += s + " ");
    }
  else if (oe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Sr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Mr = /* @__PURE__ */ Bs(Sr);
function oo(e) {
  return !!e || e === "";
}
function Or(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let i = 0; s && i < e.length; i++)
    s = bt(e[i], t[i], n);
  return s;
}
function pi(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), i = new Uint8Array(s.length);
  for (const o of e) {
    let r = -1;
    for (let l = 0; l < s.length; l++)
      if (!i[l] && bt(o, s[l], n)) {
        r = l;
        break;
      }
    if (r < 0) return !1;
    i[r] = 1;
  }
  return !0;
}
function Tr(e, t, n) {
  let s = Tt(e), i = Tt(t);
  if (s || i || (s = yt(e), i = yt(t), s || i))
    return s && i ? pi(e, t, n) : !1;
  const o = Object.keys(e).length, r = Object.keys(t).length;
  if (o !== r)
    return !1;
  for (const l in e) {
    const a = e.hasOwnProperty(l), f = t.hasOwnProperty(l);
    if (a && !f || !a && f || !bt(e[l], t[l], n))
      return !1;
  }
  return String(e) === String(t);
}
function gi(e, t, n, s) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, o] = n;
  if (i.has(e) || o.has(t))
    return i.get(e) === t && o.get(t) === e;
  i.set(e, t), o.set(t, e);
  const r = s(e, t, n);
  return i.delete(e), o.delete(t), r;
}
function bt(e, t, n) {
  if (e === t) return !0;
  let s = di(e), i = di(t);
  return s || i ? s && i ? e.getTime() === t.getTime() : !1 : (s = ze(e), i = ze(t), s || i ? e === t : (s = D(e), i = D(t), s || i ? s && i ? gi(e, t, n, Or) : !1 : (s = oe(e), i = oe(t), s || i ? !s || !i ? !1 : gi(e, t, n, Tr) : String(e) === String(t))));
}
function zs(e, t) {
  return e.findIndex((n) => bt(n, t));
}
const ro = (e) => !!(e && e.__v_isRef === !0), ce = (e) => ge(e) ? e : e == null ? "" : D(e) || oe(e) && (e.toString === to || !W(e.toString)) ? ro(e) ? ce(e.value) : JSON.stringify(e, lo, 2) : String(e), lo = (e, t) => ro(t) ? lo(e, t.value) : Tt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], o) => (n[ds(s, o) + " =>"] = i, n),
    {}
  )
} : yt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ds(n))
} : ze(t) ? ds(t) : oe(t) && !D(t) && !no(t) ? String(t) : t, ds = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ze(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Ce;
class Er {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Ce && (Ce.active ? (this.parent = Ce, this.index = (Ce.scopes || (Ce.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) {
        const s = this.scopes.slice();
        for (t = 0, n = s.length; t < n; t++)
          s[t].pause();
      }
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) {
        const i = this.scopes.slice();
        for (t = 0, n = i.length; t < n; t++)
          i[t].resume();
      }
      const s = this.effects.slice();
      for (t = 0, n = s.length; t < n; t++)
        s[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Ce;
      try {
        return Ce = this, t();
      } finally {
        Ce = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ce, Ce = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ce === this)
        Ce = this.prevScope;
      else {
        let t = Ce;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const i = this.scopes.slice();
        for (n = 0, s = i.length; n < s; n++)
          i[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Ar() {
  return Ce;
}
let ue;
const hs = /* @__PURE__ */ new WeakSet();
class ao {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && (Ce.active ? Ce.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, hs.has(this) && (hs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || co(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, mi(this), fo(this);
    const t = ue, n = We;
    ue = this, We = !0;
    try {
      return this.fn();
    } finally {
      ho(this), ue = t, We = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Gs(t);
      this.deps = this.depsTail = void 0, mi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? hs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ms(this) && this.run();
  }
  get dirty() {
    return Ms(this);
  }
}
let uo = 0, an, un;
function co(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = un, un = e;
    return;
  }
  e.next = an, an = e;
}
function Js() {
  uo++;
}
function qs() {
  if (--uo > 0)
    return;
  if (un) {
    let t = un;
    for (un = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; an; ) {
    let t = an;
    for (an = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function fo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ho(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), Gs(s), Rr(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function Ms(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (po(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function po(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === hn) || (e.globalVersion = hn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ms(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ue, s = We;
  ue = e, We = !0;
  try {
    fo(e);
    const i = e.fn(e._value);
    (t.version === 0 || tt(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ue = n, We = s, ho(e), e.flags &= -3;
  }
}
function Gs(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      Gs(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Rr(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let We = !0;
const go = [];
function rt() {
  go.push(We), We = !1;
}
function lt() {
  const e = go.pop();
  We = e === void 0 ? !0 : e;
}
function mi(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ue;
    ue = void 0;
    try {
      t();
    } finally {
      ue = n;
    }
  }
}
let hn = 0;
class Ir {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ys {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ue || !We || ue === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ue)
      n = this.activeLink = new Ir(ue, this), ue.deps ? (n.prevDep = ue.depsTail, ue.depsTail.nextDep = n, ue.depsTail = n) : ue.deps = ue.depsTail = n, mo(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ue.depsTail, n.nextDep = void 0, ue.depsTail.nextDep = n, ue.depsTail = n, ue.deps === n && (ue.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, hn++, this.notify(t);
  }
  notify(t) {
    Js();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      qs();
    }
  }
}
function mo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        mo(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Os = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ Symbol(
  ""
), Ts = /* @__PURE__ */ Symbol(
  ""
), pn = /* @__PURE__ */ Symbol(
  ""
);
function Ee(e, t, n) {
  if (We && ue) {
    let s = Os.get(e);
    s || Os.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new Ys()), i.map = s, i.key = n), i.track();
  }
}
function gt(e, t, n, s, i, o) {
  const r = Os.get(e);
  if (!r) {
    hn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Js(), t === "clear")
    r.forEach(l);
  else {
    const a = D(e), f = a && Ws(n);
    if (a && n === "length") {
      const c = Number(s);
      r.forEach((p, b) => {
        (b === "length" || b === pn || !ze(b) && b >= c) && l(p);
      });
    } else
      switch ((n !== void 0 || r.has(void 0)) && l(r.get(n)), f && l(r.get(pn)), t) {
        case "add":
          a ? f && l(r.get("length")) : (l(r.get(Dt)), Tt(e) && l(r.get(Ts)));
          break;
        case "delete":
          a || (l(r.get(Dt)), Tt(e) && l(r.get(Ts)));
          break;
        case "set":
          Tt(e) && l(r.get(Dt));
          break;
      }
  }
  qs();
}
function Bt(e) {
  const t = /* @__PURE__ */ te(e);
  return t === e || (Ee(t, "iterate", pn), /* @__PURE__ */ Ve(e)) ? t : /* @__PURE__ */ at(e) ? /* @__PURE__ */ Et(e) ? t.map((n) => At(He(n))) : t.map(At) : t.map(He);
}
function Qn(e) {
  return Ee(e = /* @__PURE__ */ te(e), "iterate", pn), e;
}
function Ze(e, t) {
  return /* @__PURE__ */ at(e) ? At(/* @__PURE__ */ Et(e) ? He(t) : t) : He(t);
}
const Pr = {
  __proto__: null,
  [Symbol.iterator]() {
    return ps(this, Symbol.iterator, (e) => Ze(this, e));
  },
  concat(...e) {
    return Bt(this).concat(
      ...e.map((t) => D(t) ? Bt(t) : t)
    );
  },
  entries() {
    return ps(this, "entries", (e) => (e[1] = Ze(this, e[1]), e));
  },
  every(e, t) {
    return ct(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return ct(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Ze(this, s)),
      arguments
    );
  },
  find(e, t) {
    return ct(
      this,
      "find",
      e,
      t,
      (n) => Ze(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return ct(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return ct(
      this,
      "findLast",
      e,
      t,
      (n) => Ze(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return ct(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return ct(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return gs(this, "includes", e);
  },
  indexOf(...e) {
    return gs(this, "indexOf", e);
  },
  join(e) {
    return Bt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return gs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return ct(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Qt(this, "pop");
  },
  push(...e) {
    return Qt(this, "push", e);
  },
  reduce(e, ...t) {
    return yi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return yi(this, "reduceRight", e, t);
  },
  shift() {
    return Qt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return ct(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Qt(this, "splice", e);
  },
  toReversed() {
    return Bt(this).toReversed();
  },
  toSorted(e) {
    return Bt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Bt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Qt(this, "unshift", e);
  },
  values() {
    return ps(this, "values", (e) => Ze(this, e));
  }
};
function ps(e, t, n) {
  const s = Qn(e), i = s[t], o = i.call(s);
  if (s !== e && !/* @__PURE__ */ Ve(e)) {
    if (o[Symbol.toStringTag] === "Array Iterator") {
      const r = Object.create(Object.getPrototypeOf(o));
      return r.next = () => vi(o.next(), n), i !== vo[t] && Object.defineProperties(r, {
        return: {
          get() {
            const l = o.return;
            return typeof l == "function" ? l.bind(o) : l;
          }
        },
        throw: {
          get() {
            const l = o.throw;
            return typeof l == "function" ? l.bind(o) : l;
          }
        }
      }), r;
    }
    o._next = o.next, o.next = () => vi(o._next(), n);
  }
  return o;
}
function vi(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const vo = Array.prototype;
function ct(e, t, n, s, i, o) {
  const r = Qn(e), l = r !== e && !/* @__PURE__ */ Ve(e), a = r[t];
  if (a !== vo[t]) {
    const p = a.apply(e, o);
    return l ? He(p) : p;
  }
  let f = n;
  r !== e && (l ? f = function(p, b) {
    return n.call(this, Ze(e, p), b, e);
  } : n.length > 2 && (f = function(p, b) {
    return n.call(this, p, b, e);
  }));
  const c = a.call(r, f, s);
  return l && i ? i(c) : c;
}
function yi(e, t, n, s) {
  const i = Qn(e), o = i !== e && !/* @__PURE__ */ Ve(e);
  let r = n, l = !1;
  i !== e && (o ? (l = s.length === 0, r = function(f, c, p) {
    return l && (l = !1, f = Ze(e, f)), n.call(this, f, Ze(e, c), p, e);
  }) : n.length > 3 && (r = function(f, c, p) {
    return n.call(this, f, c, p, e);
  }));
  const a = i[t](r, ...s);
  return l ? Ze(e, a) : a;
}
function gs(e, t, n) {
  const s = /* @__PURE__ */ te(e);
  Ee(s, "iterate", pn);
  const i = s[t](...n);
  return (i === -1 || i === !1) && /* @__PURE__ */ ei(n[0]) ? (n[0] = /* @__PURE__ */ te(n[0]), s[t](...n)) : i;
}
function Qt(e, t, n = []) {
  rt(), Js();
  const s = (/* @__PURE__ */ te(e))[t].apply(e, n);
  return qs(), lt(), s;
}
const kr = /* @__PURE__ */ Bs("__proto__,__v_isRef,__isVue"), yo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ze)
);
function Fr(e) {
  ze(e) || (e = String(e));
  const t = /* @__PURE__ */ te(this);
  return Ee(t, "has", e), t.hasOwnProperty(e);
}
class bo {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (i ? o ? Ur : Co : o ? wo : xo).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const r = D(t);
    if (!i) {
      let a;
      if (r && (a = Pr[n]))
        return a;
      if (n === "hasOwnProperty")
        return Fr;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Re(t) ? t : s
    );
    if ((ze(n) ? yo.has(n) : kr(n)) || (i || Ee(t, "get", n), o))
      return l;
    if (/* @__PURE__ */ Re(l)) {
      const a = r && Ws(n) ? l : l.value;
      return i && oe(a) ? /* @__PURE__ */ As(a) : a;
    }
    return oe(l) ? i ? /* @__PURE__ */ As(l) : /* @__PURE__ */ Zs(l) : l;
  }
}
class _o extends bo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let o = t[n];
    const r = D(t) && Ws(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ at(o);
      if (!/* @__PURE__ */ Ve(s) && !/* @__PURE__ */ at(s) && (o = /* @__PURE__ */ te(o), s = /* @__PURE__ */ te(s)), !r && /* @__PURE__ */ Re(o) && !/* @__PURE__ */ Re(s))
        return f || (o.value = s), !0;
    }
    const l = r ? Number(n) < t.length : Q(t, n), a = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ Re(t) ? t : i
    );
    return t === /* @__PURE__ */ te(i) && a && (l ? tt(s, o) && gt(t, "set", n, s) : gt(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = Q(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && s && gt(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!ze(n) || !yo.has(n)) && Ee(t, "has", n), s;
  }
  ownKeys(t) {
    return Ee(
      t,
      "iterate",
      D(t) ? "length" : Dt
    ), Reflect.ownKeys(t);
  }
}
class Nr extends bo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const jr = /* @__PURE__ */ new _o(), $r = /* @__PURE__ */ new Nr(), Lr = /* @__PURE__ */ new _o(!0);
const Es = (e) => e, Tn = (e) => Reflect.getPrototypeOf(e);
function Dr(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, o = /* @__PURE__ */ te(i), r = Tt(o), l = e === "entries" || e === Symbol.iterator && r, a = e === "keys" && r, f = i[e](...s), c = n ? Es : t ? At : He;
    return !t && Ee(
      o,
      "iterate",
      a ? Ts : Dt
    ), Me(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: p, done: b } = f.next();
          return b ? { value: p, done: b } : {
            value: l ? [c(p[0]), c(p[1])] : c(p),
            done: b
          };
        }
      }
    );
  };
}
function En(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Vr(e, t) {
  const n = {
    get(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ te(o), l = /* @__PURE__ */ te(i);
      e || (tt(i, l) && Ee(r, "get", i), Ee(r, "get", l));
      const { has: a } = Tn(r), f = t ? Es : e ? At : He;
      if (a.call(r, i))
        return f(o.get(i));
      if (a.call(r, l))
        return f(o.get(l));
      o !== r && o.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Ee(/* @__PURE__ */ te(i), "iterate", Dt), i.size;
    },
    has(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ te(o), l = /* @__PURE__ */ te(i);
      return e || (tt(i, l) && Ee(r, "has", i), Ee(r, "has", l)), i === l ? o.has(i) : o.has(i) || o.has(l);
    },
    forEach(i, o) {
      const r = this, l = r.__v_raw, a = /* @__PURE__ */ te(l), f = t ? Es : e ? At : He;
      return !e && Ee(a, "iterate", Dt), l.forEach((c, p) => i.call(o, f(c), f(p), r));
    }
  };
  return Me(
    n,
    e ? {
      add: En("add"),
      set: En("set"),
      delete: En("delete"),
      clear: En("clear")
    } : {
      add(i) {
        const o = /* @__PURE__ */ te(this), r = Tn(o), l = /* @__PURE__ */ te(i), a = !t && !/* @__PURE__ */ Ve(i) && !/* @__PURE__ */ at(i) ? l : i;
        return r.has.call(o, a) || tt(i, a) && r.has.call(o, i) || tt(l, a) && r.has.call(o, l) || (o.add(a), gt(o, "add", a, a)), this;
      },
      set(i, o) {
        !t && !/* @__PURE__ */ Ve(o) && !/* @__PURE__ */ at(o) && (o = /* @__PURE__ */ te(o));
        const r = /* @__PURE__ */ te(this), { has: l, get: a } = Tn(r);
        let f = l.call(r, i);
        f || (i = /* @__PURE__ */ te(i), f = l.call(r, i));
        const c = a.call(r, i);
        return r.set(i, o), f ? tt(o, c) && gt(r, "set", i, o) : gt(r, "add", i, o), this;
      },
      delete(i) {
        const o = /* @__PURE__ */ te(this), { has: r, get: l } = Tn(o);
        let a = r.call(o, i);
        a || (i = /* @__PURE__ */ te(i), a = r.call(o, i)), l && l.call(o, i);
        const f = o.delete(i);
        return a && gt(o, "delete", i, void 0), f;
      },
      clear() {
        const i = /* @__PURE__ */ te(this), o = i.size !== 0, r = i.clear();
        return o && gt(
          i,
          "clear",
          void 0,
          void 0
        ), r;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    n[i] = Dr(i, e, t);
  }), n;
}
function Xs(e, t) {
  const n = Vr(e, t);
  return (s, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? s : Reflect.get(
    Q(n, i) && i in s ? n : s,
    i,
    o
  );
}
const Hr = {
  get: /* @__PURE__ */ Xs(!1, !1)
}, Kr = {
  get: /* @__PURE__ */ Xs(!1, !0)
}, Br = {
  get: /* @__PURE__ */ Xs(!0, !1)
};
const xo = /* @__PURE__ */ new WeakMap(), wo = /* @__PURE__ */ new WeakMap(), Co = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap();
function Wr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function Zs(e) {
  return /* @__PURE__ */ at(e) ? e : Qs(
    e,
    !1,
    jr,
    Hr,
    xo
  );
}
// @__NO_SIDE_EFFECTS__
function zr(e) {
  return Qs(
    e,
    !1,
    Lr,
    Kr,
    wo
  );
}
// @__NO_SIDE_EFFECTS__
function As(e) {
  return Qs(
    e,
    !0,
    $r,
    Br,
    Co
  );
}
function Qs(e, t, n, s, i) {
  if (!oe(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const r = Wr(vr(e));
  if (r === 0)
    return e;
  const l = new Proxy(
    e,
    r === 2 ? s : n
  );
  return i.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Et(e) {
  return /* @__PURE__ */ at(e) ? /* @__PURE__ */ Et(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function at(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ve(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ei(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function te(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ te(t) : e;
}
function Jr(e) {
  return !Q(e, "__v_skip") && Object.isExtensible(e) && io(e, "__v_skip", !0), e;
}
const He = (e) => oe(e) ? /* @__PURE__ */ Zs(e) : e, At = (e) => oe(e) ? /* @__PURE__ */ As(e) : e;
// @__NO_SIDE_EFFECTS__
function Re(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Te(e) {
  return qr(e, !1);
}
function qr(e, t) {
  return /* @__PURE__ */ Re(e) ? e : new Gr(e, t);
}
class Gr {
  constructor(t, n) {
    this.dep = new Ys(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ te(t), this._value = n ? t : He(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Ve(t) || /* @__PURE__ */ at(t);
    t = s ? t : /* @__PURE__ */ te(t), tt(t, n) && (this._rawValue = t, this._value = s ? t : He(t), this.dep.trigger());
  }
}
function Yr(e) {
  return /* @__PURE__ */ Re(e) ? e.value : e;
}
const Xr = {
  get: (e, t, n) => t === "__v_raw" ? e : Yr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return /* @__PURE__ */ Re(i) && !/* @__PURE__ */ Re(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function So(e) {
  return /* @__PURE__ */ Et(e) ? e : new Proxy(e, Xr);
}
class Zr {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ys(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = hn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ue !== this)
      return co(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return po(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Qr(e, t, n = !1) {
  let s, i;
  return W(e) ? s = e : (s = e.get, i = e.set), new Zr(s, i, n);
}
const An = {}, Ln = /* @__PURE__ */ new WeakMap();
let Nt;
function el(e, t = !1, n = Nt) {
  if (n) {
    let s = Ln.get(n);
    s || Ln.set(n, s = []), s.push(e);
  }
}
function tl(e, t, n = ae) {
  const { immediate: s, deep: i, once: o, scheduler: r, augmentJob: l, call: a } = n, f = (y) => i ? y : /* @__PURE__ */ Ve(y) || i === !1 || i === 0 ? mt(y, 1) : mt(y);
  let c, p, b, M, N = !1, I = !1;
  if (/* @__PURE__ */ Re(e) ? (p = () => e.value, N = /* @__PURE__ */ Ve(e)) : /* @__PURE__ */ Et(e) ? (p = () => f(e), N = !0) : D(e) ? (I = !0, N = e.some((y) => /* @__PURE__ */ Et(y) || /* @__PURE__ */ Ve(y)), p = () => e.map((y) => {
    if (/* @__PURE__ */ Re(y))
      return y.value;
    if (/* @__PURE__ */ Et(y))
      return f(y);
    if (W(y))
      return a ? a(y, 2) : y();
  })) : W(e) ? t ? p = a ? () => a(e, 2) : e : p = () => {
    if (b) {
      rt();
      try {
        b();
      } finally {
        lt();
      }
    }
    const y = Nt;
    Nt = c;
    try {
      return a ? a(e, 3, [M]) : e(M);
    } finally {
      Nt = y;
    }
  } : p = it, t && i) {
    const y = p, H = i === !0 ? 1 / 0 : i;
    p = () => mt(y(), H);
  }
  const L = Ar(), F = () => {
    c.stop(), L && L.active && Us(L.effects, c);
  };
  if (o && t) {
    const y = t;
    t = (...H) => {
      try {
        return y(...H);
      } finally {
        F();
      }
    };
  }
  let k = I ? new Array(e.length).fill(An) : An;
  const K = (y) => {
    if (!(!(c.flags & 1) || !c.dirty && !y))
      if (t) {
        const H = c.run();
        if (y || i || N || (I ? H.some((re, V) => tt(re, k[V])) : tt(H, k))) {
          const re = Nt;
          rt();
          try {
            b && b(), Nt = c;
            const V = [
              H,
              // pass undefined as the old value when it's changed for the first time
              k === An ? void 0 : I && k[0] === An ? [] : k,
              M
            ];
            k = H, a ? a(t, 3, V) : (
              // @ts-expect-error
              t(...V)
            );
          } finally {
            Nt = re, lt();
          }
        }
      } else
        c.run();
  };
  return l && l(K), c = new ao(p), c.scheduler = r ? () => r(K, !1) : K, M = (y) => el(y, !1, c), b = c.onStop = () => {
    const y = Ln.get(c);
    if (y) {
      if (a)
        a(y, 4);
      else
        for (const H of y) H();
      Ln.delete(c);
    }
  }, t ? s ? K(!0) : k = c.run() : r ? r(K.bind(null, !0), !0) : c.run(), F.pause = c.pause.bind(c), F.resume = c.resume.bind(c), F.stop = F, F;
}
function mt(e, t = 1 / 0, n) {
  if (t <= 0 || !oe(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Re(e))
    mt(e.value, t, n);
  else if (D(e))
    for (let s = 0; s < e.length; s++)
      mt(e[s], t, n);
  else if (yt(e) || Tt(e))
    e.forEach((s) => {
      mt(s, t, n);
    });
  else if (no(e)) {
    for (const s in e)
      mt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && mt(e[s], t, n);
  }
  return e;
}
function wn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (i) {
    es(i, t, n);
  }
}
function Je(e, t, n, s) {
  if (W(e)) {
    const i = wn(e, t, n, s);
    return i && eo(i) && i.catch((o) => {
      es(o, t, n);
    }), i;
  }
  if (D(e)) {
    const i = [];
    for (let o = 0; o < e.length; o++)
      i.push(Je(e[o], t, n, s));
    return i;
  }
}
function es(e, t, n, s = !0) {
  const i = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: r } = t && t.appContext.config || ae;
  if (t) {
    let l = t.parent;
    const a = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let p = 0; p < c.length; p++)
          if (c[p](e, a, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      rt(), wn(o, null, 10, [
        e,
        a,
        f
      ]), lt();
      return;
    }
  }
  nl(e, n, i, s, r);
}
function nl(e, t, n, s = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const ke = [];
let Be = -1;
const Qe = [];
let St = null, Ut = 0;
const Mo = /* @__PURE__ */ Promise.resolve();
let Dn = null;
function ti(e) {
  const t = Dn || Mo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function sl(e) {
  let t = Be + 1, n = ke.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = ke[s], o = gn(i);
    o < e || o === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ni(e) {
  if (!(e.flags & 1)) {
    const t = gn(e), n = ke[ke.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= gn(n) ? ke.push(e) : ke.splice(sl(t), 0, e), e.flags |= 1, Oo();
  }
}
function Oo() {
  Dn || (Dn = Mo.then(Ao));
}
function il(e) {
  if (!D(e))
    St && e.id === -1 ? St.splice(Ut + 1, 0, e) : e.flags & 1 || (Qe.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Qe.push(e[t]);
  Oo();
}
function To(e, t, n, s = Be + 1) {
  for (; s < ke.length; s++) {
    const i = ke[s];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      ke.splice(s, 1), s = e ? s - 1 : Be, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function Eo(e, t, n = 0) {
  if (Qe.length) {
    let s = Qe, i = 0;
    if (t) {
      s = [];
      for (let r = 0; r < Qe.length; r++) {
        const l = Qe[r];
        (l.i !== void 0 ? !l.i || l.i.uid < n : t.has(l)) ? Qe[i++] = l : s.push(l);
      }
    }
    const o = [...new Set(s)].sort((r, l) => gn(r) - gn(l));
    if (Qe.length = i, St) {
      for (let r = 0; r < o.length; r++)
        St.push(o[r]);
      return;
    }
    for (St = o, Ut = 0; Ut < St.length; Ut++) {
      const r = St[Ut];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    St = null, Ut = 0;
  }
}
let ms = !1;
function ol(e, t) {
  if (ms) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(Qe);
  e(), ms = !0;
  try {
    To(void 0, t), Eo(void 0, n, t);
  } finally {
    ms = !1;
  }
}
const gn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ao(e) {
  try {
    for (Be = 0; Be < ke.length; Be++) {
      const t = ke[Be];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), wn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Be < ke.length; Be++) {
      const t = ke[Be];
      t && (t.flags &= -2);
    }
    Be = -1, ke.length = 0, Eo(), Dn = null, (ke.length || Qe.length) && Ao();
  }
}
let Ae = null, Ro = null;
function Vn(e) {
  const t = Ae;
  return Ae = e, Ro = e && e.type.__scopeId || null, t;
}
function Io(e, t = Ae, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && Ii(-1);
    const o = Vn(t), r = vt.length;
    let l;
    try {
      l = e(...i);
    } finally {
      for (let a = vt.length; a > r; a--) li();
      Vn(o), s._d && Ii(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function en(e, t) {
  if (Ae === null)
    return e;
  const n = rs(Ae), s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, r, l, a = ae] = t[i];
    o && (W(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && mt(r), s.push({
      dir: o,
      instance: n,
      value: r,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function kt(e, t, n, s) {
  const i = e.dirs, o = t && t.dirs;
  for (let r = 0; r < i.length; r++) {
    const l = i[r];
    o && (l.oldValue = o[r].value);
    let a = l.dir[s];
    a && (rt(), Je(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), lt());
  }
}
function rl(e, t) {
  if (Fe) {
    let n = Fe.provides;
    const s = Fe.parent && Fe.parent.provides;
    s === n && (n = Fe.provides = Object.create(s)), n[e] = t;
  }
}
function Nn(e, t, n = !1) {
  const s = ra();
  if (s || Jt) {
    let i = Jt ? Jt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && W(t) ? t.call(s && s.proxy) : t;
  }
}
const ll = /* @__PURE__ */ Symbol.for("v-scx"), al = () => Nn(ll);
function vs(e, t, n) {
  return Po(e, t, n);
}
function Po(e, t, n = ae) {
  const { immediate: s, deep: i, flush: o, once: r } = n, l = Me({}, n), a = t && s || !t && o !== "post";
  let f;
  if (bn) {
    if (o === "sync") {
      const M = al();
      f = M.__watcherHandles || (M.__watcherHandles = []);
    } else if (!a) {
      const M = () => {
      };
      return M.stop = it, M.resume = it, M.pause = it, M;
    }
  }
  const c = Fe;
  l.call = (M, N, I) => Je(M, c, N, I);
  let p = !1;
  o === "post" ? l.scheduler = (M) => {
    M.i = c, Pe(M, c && c.suspense);
  } : o !== "sync" && (p = !0, l.scheduler = (M, N) => {
    N ? M() : ni(M);
  }), l.augmentJob = (M) => {
    t && (M.flags |= 4), p && (M.flags |= 2, c && (M.id = c.uid, M.i = c));
  };
  const b = tl(e, t, l);
  return bn && (f ? f.push(b) : a && b()), b;
}
function ul(e, t, n) {
  const s = this.proxy, i = ge(e) ? e.includes(".") ? ko(s, e) : () => s[e] : e.bind(s, s);
  let o;
  W(t) ? o = t : (o = t.handler, n = t);
  const r = Cn(this), l = Po(i, o.bind(s), n);
  return r(), l;
}
function ko(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
const Ct = /* @__PURE__ */ new WeakMap(), Fo = /* @__PURE__ */ Symbol("_vte"), ts = (e) => e.__isTeleport, $t = (e) => e && (e.disabled || e.disabled === ""), cl = (e) => e && (e.defer || e.defer === ""), bi = (e) => typeof SVGElement < "u" && e instanceof SVGElement, _i = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Rs = (e, t) => {
  const n = e && e.to;
  return ge(n) ? t ? t(n) : null : n;
}, fl = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, s, i, o, r, l, a, f) {
    const {
      mc: c,
      pc: p,
      pbc: b,
      o: { insert: M, querySelector: N, createText: I, createComment: L, parentNode: F }
    } = f, k = $t(t.props);
    let { dynamicChildren: K } = t;
    const y = (V, Z, ne) => {
      V.shapeFlag & 16 && c(
        V.children,
        Z,
        ne,
        i,
        o,
        r,
        l,
        a
      );
    }, H = (V = t) => {
      const Z = $t(V.props), ne = V.target = Rs(V.props, N), de = Is(ne, V, I, M);
      ne && (r !== "svg" && bi(ne) ? r = "svg" : r !== "mathml" && _i(ne) && (r = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(ne), Z || (y(V, ne, de), sn(V, !1)));
    }, re = (V) => {
      const Z = () => {
        if (Ct.get(V) === Z) {
          if (Ct.delete(V), $t(V.props)) {
            const ne = F(V.el) || n;
            y(V, ne, V.anchor), sn(V, !0);
          }
          H(V);
        }
      };
      Ct.set(V, Z), Pe(Z, o);
    };
    if (e == null) {
      const V = t.el = I(""), Z = t.anchor = I("");
      if (M(V, n, s), M(Z, n, s), cl(t.props) || o && o.pendingBranch) {
        re(t);
        return;
      }
      k && (y(t, n, Z), sn(t, !0)), H();
    } else {
      t.el = e.el;
      const V = t.anchor = e.anchor, Z = Ct.get(e);
      if (Z) {
        Z.flags |= 8, Ct.delete(e), re(t);
        return;
      }
      t.targetStart = e.targetStart;
      const ne = t.target = e.target, de = t.targetAnchor = e.targetAnchor, xe = $t(e.props), x = xe ? n : ne, U = xe ? V : de;
      if (r === "svg" || bi(ne) ? r = "svg" : (r === "mathml" || _i(ne)) && (r = "mathml"), K ? (b(
        e.dynamicChildren,
        K,
        x,
        i,
        o,
        r,
        l
      ), ri(e, t, !0)) : a || p(
        e,
        t,
        x,
        U,
        i,
        o,
        r,
        l,
        !1
      ), k)
        xe ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Rn(
          t,
          n,
          V,
          f,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const z = Rs(t.props, N);
        z && (t.target = z, Rn(
          t,
          z,
          null,
          f,
          0
        ));
      } else xe && Rn(
        t,
        ne,
        de,
        f,
        1
      );
      sn(t, k);
    }
  },
  remove(e, t, n, { um: s, o: { remove: i } }, o) {
    const {
      shapeFlag: r,
      children: l,
      anchor: a,
      targetStart: f,
      targetAnchor: c,
      target: p,
      props: b
    } = e, M = $t(b), N = o || !M, I = Ct.get(e);
    if (I && (I.flags |= 8, Ct.delete(e)), p && (i(f), i(c)), o && i(a), !I && (M || p) && r & 16)
      for (let L = 0; L < l.length; L++) {
        const F = l[L];
        s(
          F,
          t,
          n,
          N,
          !!F.dynamicChildren
        );
      }
  },
  move: Rn,
  hydrate: dl
};
function Rn(e, t, n, { o: { insert: s }, m: i }, o = 2) {
  o === 0 && (e.targetStart && s(e.targetStart, t, n), s(e.targetAnchor, t, n), n = e.targetAnchor);
  const { el: r, anchor: l, shapeFlag: a, children: f, props: c } = e, p = o === 2;
  if (p && s(r, t, n), !Ct.has(e) && (!p || $t(c)) && a & 16)
    for (let b = 0; b < f.length; b++)
      i(
        f[b],
        t,
        n,
        2
      );
  p && s(l, t, n);
}
function dl(e, t, n, s, i, o, {
  o: { nextSibling: r, parentNode: l, querySelector: a, insert: f, createText: c }
}, p) {
  function b(L, F) {
    let k = F;
    for (; k; ) {
      if (k && k.nodeType === 8) {
        if (k.data === "teleport start anchor")
          t.targetStart = k;
        else if (k.data === "teleport anchor") {
          t.targetAnchor = k, L._lpa = t.targetAnchor && r(t.targetAnchor);
          break;
        }
      }
      k = r(k);
    }
  }
  function M(L, F) {
    F.anchor = p(
      r(L),
      F,
      l(L),
      n,
      s,
      i,
      o
    );
  }
  const N = t.target = Rs(
    t.props,
    a
  ), I = $t(t.props);
  if (N) {
    const L = N._lpa || N.firstChild;
    t.shapeFlag & 16 && (I ? (M(e, t), b(N, L), t.targetAnchor || Is(
      N,
      t,
      c,
      f,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(e) === N ? e : null
    )) : (t.anchor = r(e), b(N, L), t.targetAnchor || Is(N, t, c, f), p(
      L && r(L),
      t,
      N,
      n,
      s,
      i,
      o
    ))), sn(t, I);
  } else I && t.shapeFlag & 16 && (M(e, t), t.targetStart = e, t.targetAnchor = r(e));
  return t.anchor && r(t.anchor);
}
const hl = fl;
function sn(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let s, i;
    for (t ? (s = e.el, i = e.anchor) : (s = e.targetStart, i = e.targetAnchor); s && s !== i; )
      s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid), s = s.nextSibling;
    n.ut();
  }
}
function Is(e, t, n, s, i = null) {
  const o = t.targetStart = n(""), r = t.targetAnchor = n("");
  return o[Fo] = r, e && (s(o, e, i), s(r, e, i)), r;
}
const ys = /* @__PURE__ */ Symbol("_leaveCb");
function pl(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Ke) {
        t = n;
        break;
      }
  }
  return t;
}
function No(e) {
  if (!si(e))
    return ts(e.type) && e.children ? pl(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && W(n.default))
      return n.default();
  }
}
function Hn(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Hn(
      ts(n.type) && No(n) || n,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === fe && D(e.children)) {
    const n = zo(e.children, !1);
    n && Hn(n, t);
  }
}
function Ps(e) {
  if (e.component)
    return Ps(e.component.subTree);
  if (e.type === fe) {
    const t = D(e.children) && zo(e.children, !1);
    return t ? Ps(t) : void 0;
  }
  if (e.type !== Ke)
    return e;
}
// @__NO_SIDE_EFFECTS__
function jo(e, t) {
  return W(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Me({ name: e.name }, t, { setup: e })
  ) : e;
}
function $o(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function xi(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Kn = /* @__PURE__ */ new WeakMap();
function cn(e, t, n, s, i = !1) {
  if (D(e)) {
    e.forEach(
      (I, L) => cn(
        I,
        t && (D(t) ? t[L] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (zt(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && cn(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? rs(s.component) : s.el, r = i ? null : o, { i: l, r: a } = e, f = t && t.r, c = l.refs === ae ? l.refs = {} : l.refs, p = l.setupState, b = /* @__PURE__ */ te(p), M = p === ae ? Qi : (I) => xi(c, I) ? !1 : Q(b, I), N = (I, L) => !(L && xi(c, L));
  if (f != null && f !== a) {
    if (wi(t), ge(f))
      c[f] = null, M(f) && (p[f] = null);
    else if (/* @__PURE__ */ Re(f)) {
      const I = t;
      N(f, I.k) && (f.value = null), I.k && (c[I.k] = null);
    }
  }
  if (W(a))
    wn(a, l, 12, [r, c]);
  else {
    const I = ge(a), L = /* @__PURE__ */ Re(a);
    if (I || L) {
      const F = () => {
        if (e.f) {
          const k = I ? M(a) ? p[a] : c[a] : N() || !e.k ? a.value : c[e.k];
          if (i)
            D(k) && Us(k, o);
          else if (D(k))
            k.includes(o) || k.push(o);
          else if (I)
            c[a] = [o], M(a) && (p[a] = c[a]);
          else {
            const K = [o];
            N(a, e.k) && (a.value = K), e.k && (c[e.k] = K);
          }
        } else I ? (c[a] = r, M(a) && (p[a] = r)) : L && (N(a, e.k) && (a.value = r), e.k && (c[e.k] = r));
      };
      if (r) {
        const k = () => {
          F(), Kn.delete(e);
        };
        k.id = -1, Kn.set(e, k), Pe(k, n);
      } else
        wi(e), F();
    }
  }
}
function wi(e) {
  const t = Kn.get(e);
  t && (t.flags |= 8, Kn.delete(e));
}
Zn().requestIdleCallback;
Zn().cancelIdleCallback;
const zt = (e) => !!e.type.__asyncLoader, si = (e) => e.type.__isKeepAlive;
function gl(e, t) {
  Lo(e, "a", t);
}
function ml(e, t) {
  Lo(e, "da", t);
}
function Lo(e, t, n = Fe) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (ns(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      si(i.parent.vnode) && vl(s, t, n, i), i = i.parent;
  }
}
function vl(e, t, n, s) {
  const i = ns(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Vo(() => {
    Us(s[t], i);
  }, n);
}
function ns(e, t, n = Fe, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...r) => {
      rt();
      const l = Cn(n), a = Je(t, n, e, r);
      return l(), lt(), a;
    });
    return s ? i.unshift(o) : i.push(o), o;
  }
}
const _t = (e) => (t, n = Fe) => {
  (!bn || e === "sp") && ns(e, (...s) => t(...s), n);
}, yl = _t("bm"), Do = _t("m"), bl = _t(
  "bu"
), _l = _t("u"), xl = _t(
  "bum"
), Vo = _t("um"), wl = _t(
  "sp"
), Cl = _t("rtg"), Sl = _t("rtc");
function Ml(e, t = Fe) {
  ns("ec", e, t);
}
const Ol = /* @__PURE__ */ Symbol.for("v-ndc");
function ft(e, t, n, s) {
  let i;
  const o = n, r = D(e);
  if (r || ge(e)) {
    const l = r && /* @__PURE__ */ Et(e);
    let a = !1, f = !1;
    l && (a = !/* @__PURE__ */ Ve(e), f = /* @__PURE__ */ at(e), e = Qn(e)), i = new Array(e.length);
    for (let c = 0, p = e.length; c < p; c++)
      i[c] = t(
        a ? f ? At(He(e[c])) : He(e[c]) : e[c],
        c,
        void 0,
        o
      );
  } else if (typeof e == "number")
    if (!Number.isInteger(e) || e < 0)
      i = [];
    else {
      i = new Array(e);
      for (let l = 0; l < e; l++)
        i[l] = t(l + 1, l, void 0, o);
    }
  else if (oe(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (l, a) => t(l, a, void 0, o)
      );
    else {
      const l = Object.keys(e);
      i = new Array(l.length);
      for (let a = 0, f = l.length; a < f; a++) {
        const c = l[a];
        i[a] = t(e[c], c, a, o);
      }
    }
  else
    i = [];
  return i;
}
function Tl(e, t, n, s, i, o) {
  if (n == null && (n = {}), Ae.ce || Ae.parent && zt(Ae.parent) && Ae.parent.ce) {
    const f = n, c = Object.keys(f).length > 0;
    return X(), vn(
      fe,
      null,
      [ot("slot", f, s)],
      c ? -2 : 64
    );
  }
  let r = e[t];
  r && r._c && (r._d = !1);
  const l = vt.length;
  X();
  let a;
  try {
    const f = r && Ho(r(n)), c = n.key || o || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    f && f.key;
    a = vn(
      fe,
      {
        key: (c && !ze(c) ? c : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!f && s ? "_fb" : "")
      },
      f || (s ? s() : []),
      f && e._ === 1 ? 64 : -2
    );
  } catch (f) {
    for (let c = vt.length; c > l; c--) li();
    throw f;
  } finally {
    r && r._c && (r._d = !0);
  }
  return a;
}
function Ho(e) {
  return e.some((t) => os(t) ? !(t.type === Ke || t.type === fe && !Ho(t.children)) : !0) ? e : null;
}
const ks = (e) => e ? lr(e) ? rs(e) : ks(e.parent) : null, fn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Me(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ks(e.parent),
    $root: (e) => ks(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Bo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ni(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ti.bind(e.proxy)),
    $watch: (e) => ul.bind(e)
  })
), bs = (e, t) => e !== ae && !e.__isScriptSetup && Q(e, t), El = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: i, props: o, accessCache: r, type: l, appContext: a } = e;
    if (t[0] !== "$") {
      const b = r[t];
      if (b !== void 0)
        switch (b) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (bs(s, t))
          return r[t] = 1, s[t];
        if (i !== ae && Q(i, t))
          return r[t] = 2, i[t];
        if (Q(o, t))
          return r[t] = 3, o[t];
        if (n !== ae && Q(n, t))
          return r[t] = 4, n[t];
        Fs && (r[t] = 0);
      }
    }
    const f = fn[t];
    let c, p;
    if (f)
      return t === "$attrs" && Ee(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (c = l.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== ae && Q(n, t))
      return r[t] = 4, n[t];
    if (
      // global properties
      p = a.config.globalProperties, Q(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: o } = e;
    return bs(i, t) ? (i[t] = n, !0) : s !== ae && Q(s, t) ? (s[t] = n, !0) : Q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, props: o, type: r }
  }, l) {
    let a;
    return !!(n[l] || e !== ae && l[0] !== "$" && Q(e, l) || bs(t, l) || Q(o, l) || Q(s, l) || Q(fn, l) || Q(i.config.globalProperties, l) || (a = r.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Q(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ci(e) {
  return D(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Fs = !0;
function Al(e) {
  const t = Bo(e), n = e.proxy, s = e.ctx;
  Fs = !1, t.beforeCreate && Si(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: o,
    methods: r,
    watch: l,
    provide: a,
    inject: f,
    // lifecycle
    created: c,
    beforeMount: p,
    mounted: b,
    beforeUpdate: M,
    updated: N,
    activated: I,
    deactivated: L,
    beforeDestroy: F,
    beforeUnmount: k,
    destroyed: K,
    unmounted: y,
    render: H,
    renderTracked: re,
    renderTriggered: V,
    errorCaptured: Z,
    serverPrefetch: ne,
    // public API
    expose: de,
    inheritAttrs: xe,
    // assets
    components: x,
    directives: U,
    filters: z
  } = t;
  if (f && Rl(f, s, null), r)
    for (const ie in r) {
      const J = r[ie];
      W(J) && (s[ie] = J.bind(n));
    }
  if (i) {
    const ie = i.call(n, n);
    oe(ie) && (e.data = /* @__PURE__ */ Zs(ie));
  }
  if (Fs = !0, o)
    for (const ie in o) {
      const J = o[ie], ut = W(J) ? J.bind(n, n) : W(J.get) ? J.get.bind(n, n) : it, Ht = !W(J) && W(J.set) ? J.set.bind(n) : it, ve = Xe({
        get: ut,
        set: Ht
      });
      Object.defineProperty(s, ie, {
        enumerable: !0,
        configurable: !0,
        get: () => ve.value,
        set: (Oe) => ve.value = Oe
      });
    }
  if (l)
    for (const ie in l)
      Ko(l[ie], s, n, ie);
  if (a) {
    const ie = W(a) ? a.call(n) : a;
    Reflect.ownKeys(ie).forEach((J) => {
      rl(J, ie[J]);
    });
  }
  c && Si(c, e, "c");
  function he(ie, J) {
    D(J) ? J.forEach((ut) => ie(ut.bind(n))) : J && ie(J.bind(n));
  }
  if (he(yl, p), he(Do, b), he(bl, M), he(_l, N), he(gl, I), he(ml, L), he(Ml, Z), he(Sl, re), he(Cl, V), he(xl, k), he(Vo, y), he(wl, ne), D(de))
    if (de.length) {
      const ie = e.exposed || (e.exposed = {});
      de.forEach((J) => {
        Object.defineProperty(ie, J, {
          get: () => n[J],
          set: (ut) => n[J] = ut,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  H && e.render === it && (e.render = H), xe != null && (e.inheritAttrs = xe), x && (e.components = x), U && (e.directives = U), ne && $o(e);
}
function Rl(e, t, n = it) {
  D(e) && (e = Ns(e));
  for (const s in e) {
    const i = e[s];
    let o;
    oe(i) ? "default" in i ? o = Nn(
      i.from || s,
      i.default,
      !0
    ) : o = Nn(i.from || s) : o = Nn(i), /* @__PURE__ */ Re(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (r) => o.value = r
    }) : t[s] = o;
  }
}
function Si(e, t, n) {
  Je(
    D(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ko(e, t, n, s) {
  let i = s.includes(".") ? ko(n, s) : () => n[s];
  if (ge(e)) {
    const o = t[e];
    W(o) && vs(i, o);
  } else if (W(e))
    vs(i, e.bind(n));
  else if (oe(e))
    if (D(e))
      e.forEach((o) => Ko(o, t, n, s));
    else {
      const o = W(e.handler) ? e.handler.bind(n) : t[e.handler];
      W(o) && vs(i, o, e);
    }
}
function Bo(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: o,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = o.get(t);
  let a;
  return l ? a = l : !i.length && !n && !s ? a = t : (a = {}, i.length && i.forEach(
    (f) => Bn(a, f, r, !0)
  ), Bn(a, t, r)), oe(t) && o.set(t, a), a;
}
function Bn(e, t, n, s = !1) {
  const { mixins: i, extends: o } = t;
  o && Bn(e, o, n, !0), i && i.forEach(
    (r) => Bn(e, r, n, !0)
  );
  for (const r in t)
    if (!(s && r === "expose")) {
      const l = Il[r] || n && n[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const Il = {
  data: Mi,
  props: Oi,
  emits: Oi,
  // objects
  methods: on,
  computed: on,
  // lifecycle
  beforeCreate: Ie,
  created: Ie,
  beforeMount: Ie,
  mounted: Ie,
  beforeUpdate: Ie,
  updated: Ie,
  beforeDestroy: Ie,
  beforeUnmount: Ie,
  destroyed: Ie,
  unmounted: Ie,
  activated: Ie,
  deactivated: Ie,
  errorCaptured: Ie,
  serverPrefetch: Ie,
  // assets
  components: on,
  directives: on,
  // watch
  watch: kl,
  // provide / inject
  provide: Mi,
  inject: Pl
};
function Mi(e, t) {
  return t ? e ? function() {
    return Me(
      W(e) ? e.call(this, this) : e,
      W(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Pl(e, t) {
  return on(Ns(e), Ns(t));
}
function Ns(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ie(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function on(e, t) {
  return e ? Me(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Oi(e, t) {
  return e ? D(e) && D(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Me(
    /* @__PURE__ */ Object.create(null),
    Ci(e),
    Ci(t ?? {})
  ) : t;
}
function kl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Me(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Ie(e[s], t[s]);
  return n;
}
function Uo() {
  return {
    app: null,
    config: {
      isNativeTag: Qi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Fl = 0;
function Nl(e, t) {
  return function(s, i = null) {
    W(s) || (s = Me({}, s)), i != null && !oe(i) && (i = null);
    const o = Uo(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const f = o.app = {
      _uid: Fl++,
      _component: s,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: da,
      get config() {
        return o.config;
      },
      set config(c) {
      },
      use(c, ...p) {
        return r.has(c) || (c && W(c.install) ? (r.add(c), c.install(f, ...p)) : W(c) && (r.add(c), c(f, ...p))), f;
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), f;
      },
      component(c, p) {
        return p ? (o.components[c] = p, f) : o.components[c];
      },
      directive(c, p) {
        return p ? (o.directives[c] = p, f) : o.directives[c];
      },
      mount(c, p, b) {
        if (!a) {
          const M = f._ceVNode || ot(s, i);
          return M.appContext = o, b === !0 ? b = "svg" : b === !1 && (b = void 0), e(M, c, b), a = !0, f._container = c, c.__vue_app__ = f, rs(M.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        a && (Je(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(c, p) {
        return o.provides[c] = p, f;
      },
      runWithContext(c) {
        const p = Jt;
        Jt = f;
        try {
          return c();
        } finally {
          Jt = p;
        }
      }
    };
    return f;
  };
}
let Jt = null;
const jl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ue(t)}Modifiers`] || e[`${Rt(t)}Modifiers`];
function $l(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ae;
  let i = n;
  const o = t.startsWith("update:"), r = o && jl(s, t.slice(7));
  r && (r.trim && (i = n.map((c) => ge(c) ? c.trim() : c)), r.number && (i = i.map(Xn)));
  let l, a = s[l = fs(t)] || // also try camelCase event handler (#2249)
  s[l = fs(Ue(t))];
  !a && o && (a = s[l = fs(Rt(t))]), a && Je(
    a,
    e,
    6,
    i
  );
  const f = s[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Je(
      f,
      e,
      6,
      i
    );
  }
}
const Ll = /* @__PURE__ */ new WeakMap();
function Wo(e, t, n = !1) {
  const s = n ? Ll : t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const o = e.emits;
  let r = {}, l = !1;
  if (!W(e)) {
    const a = (f) => {
      const c = Wo(f, t, !0);
      c && (l = !0, Me(r, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (oe(e) && s.set(e, null), null) : (D(o) ? o.forEach((a) => r[a] = null) : Me(r, o), oe(e) && s.set(e, r), r);
}
function ss(e, t) {
  return !e || !qn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, Rt(t)) || Q(e, t));
}
function Ti(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    propsOptions: [o],
    slots: r,
    attrs: l,
    emit: a,
    render: f,
    renderCache: c,
    props: p,
    data: b,
    setupState: M,
    ctx: N,
    inheritAttrs: I
  } = e, L = Vn(e);
  let F, k;
  try {
    if (n.shapeFlag & 4) {
      const y = i || s, H = y;
      F = et(
        f.call(
          H,
          y,
          c,
          p,
          M,
          b,
          N
        )
      ), k = l;
    } else {
      const y = t;
      F = et(
        y.length > 1 ? y(
          p,
          { attrs: l, slots: r, emit: a }
        ) : y(
          p,
          null
        )
      ), k = t.props ? l : Dl(l);
    }
  } catch (y) {
    vt.length = 0, es(y, e, 1), F = ot(Ke);
  }
  let K = F;
  if (k && I !== !1) {
    const y = Object.keys(k), { shapeFlag: H } = K;
    y.length && H & 7 && (o && y.some(Gn) && (k = Vl(
      k,
      o
    )), K = Gt(K, k, !1, !0));
  }
  if (n.dirs && (K = Gt(K, null, !1, !0), K.dirs = K.dirs ? K.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const y = ts(K.type) && No(K) || K;
    Hn(y, n.transition);
  }
  return F = K, Vn(L), F;
}
function zo(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (os(i)) {
      if (i.type !== Ke || i.children === "v-if") {
        if (n)
          return;
        n = i;
      }
    } else
      return;
  }
  return n;
}
const Dl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || qn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Vl = (e, t) => {
  const n = {};
  for (const s in e)
    (!Gn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Hl(e, t, n) {
  const { props: s, children: i, component: o } = e, { props: r, children: l, patchFlag: a } = t, f = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? Ei(s, r, f) : !!r;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        const b = c[p];
        if (Jo(r, s, b) && !ss(f, b))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === r ? !1 : s ? r ? Ei(s, r, f) : !0 : !!r;
  return !1;
}
function Ei(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const o = s[i];
    if (!Q(e, o) || Jo(t, e, o) && !ss(n, o))
      return !0;
  }
  return !1;
}
function Jo(e, t, n) {
  const s = e[n], i = t[n];
  return n === "style" && oe(s) && oe(i) ? !bt(s, i) : s !== i;
}
function Kl({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = s, e = i), i === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const qo = {}, Go = () => Object.create(qo), Yo = (e) => Object.getPrototypeOf(e) === qo;
function Bl(e, t, n, s = !1) {
  const i = {}, o = Go();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Xo(e, t, i, o);
  for (const r in e.propsOptions[0])
    r in i || (i[r] = void 0);
  n ? e.props = s ? i : /* @__PURE__ */ zr(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function Ul(e, t, n, s) {
  const {
    props: i,
    attrs: o,
    vnode: { patchFlag: r }
  } = e, l = /* @__PURE__ */ te(i), [a] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const c = e.vnode.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        let b = c[p];
        if (ss(e.emitsOptions, b))
          continue;
        const M = t[b];
        if (a)
          if (Q(o, b))
            M !== o[b] && (o[b] = M, f = !0);
          else {
            const N = Ue(b);
            i[N] = js(
              a,
              l,
              N,
              M,
              e,
              !1
            );
          }
        else
          M !== o[b] && (o[b] = M, f = !0);
      }
    }
  } else {
    Xo(e, t, i, o) && (f = !0);
    let c;
    for (const p in l)
      (!t || // for camelCase
      !Q(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Rt(p)) === p || !Q(t, c))) && (a ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[p] = js(
        a,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete i[p]);
    if (o !== l)
      for (const p in o)
        (!t || !Q(t, p)) && (delete o[p], f = !0);
  }
  f && gt(e.attrs, "set", "");
}
function Xo(e, t, n, s) {
  const [i, o] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let a in t) {
      if (ln(a))
        continue;
      const f = t[a];
      let c;
      i && Q(i, c = Ue(a)) ? !o || !o.includes(c) ? n[c] = f : (l || (l = {}))[c] = f : ss(e.emitsOptions, a) || (!(a in s) || f !== s[a]) && (s[a] = f, r = !0);
    }
  if (o) {
    const a = /* @__PURE__ */ te(n), f = l || ae;
    for (let c = 0; c < o.length; c++) {
      const p = o[c];
      n[p] = js(
        i,
        a,
        p,
        f[p],
        e,
        !Q(f, p)
      );
    }
  }
  return r;
}
function js(e, t, n, s, i, o) {
  const r = e[n];
  if (r != null) {
    const l = Q(r, "default");
    if (l && s === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && W(a)) {
        const { propsDefaults: f } = i;
        if (n in f)
          s = f[n];
        else {
          const c = Cn(i);
          s = f[n] = a.call(
            null,
            t
          ), c();
        }
      } else
        s = a;
      i.ce && i.ce._setProp(n, s);
    }
    r[
      0
      /* shouldCast */
    ] && (o && !l ? s = !1 : r[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Rt(n)) && (s = !0));
  }
  return s;
}
const Wl = /* @__PURE__ */ new WeakMap();
function Zo(e, t, n = !1) {
  const s = n ? Wl : t.propsCache, i = s.get(e);
  if (i)
    return i;
  const o = e.props, r = {}, l = [];
  let a = !1;
  if (!W(e)) {
    const c = (p) => {
      a = !0;
      const [b, M] = Zo(p, t, !0);
      Me(r, b), M && l.push(...M);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return oe(e) && s.set(e, Lt), Lt;
  if (D(o))
    for (let c = 0; c < o.length; c++) {
      const p = Ue(o[c]);
      Ai(p) && (r[p] = ae);
    }
  else if (o)
    for (const c in o) {
      const p = Ue(c);
      if (Ai(p)) {
        const b = o[c], M = r[p] = D(b) || W(b) ? { type: b } : Me({}, b), N = M.type;
        let I = !1, L = !0;
        if (D(N))
          for (let F = 0; F < N.length; ++F) {
            const k = N[F], K = W(k) && k.name;
            if (K === "Boolean") {
              I = !0;
              break;
            } else K === "String" && (L = !1);
          }
        else
          I = W(N) && N.name === "Boolean";
        M[
          0
          /* shouldCast */
        ] = I, M[
          1
          /* shouldCastTrue */
        ] = L, (I || Q(M, "default")) && l.push(p);
      }
    }
  const f = [r, l];
  return oe(e) && s.set(e, f), f;
}
function Ai(e) {
  return e[0] !== "$" && !ln(e);
}
const ii = (e) => e === "_" || e === "_ctx" || e === "$stable", oi = (e) => D(e) ? e.map(et) : [et(e)], zl = (e, t, n) => {
  if (t._n)
    return t;
  const s = Io((...i) => oi(t(...i)), n);
  return s._c = !1, s;
}, Qo = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (ii(i)) continue;
    const o = e[i];
    if (W(o))
      t[i] = zl(i, o, s);
    else if (o != null) {
      const r = oi(o);
      t[i] = () => r;
    }
  }
}, er = (e, t) => {
  const n = oi(t);
  e.slots.default = () => n;
}, tr = (e, t, n) => {
  for (const s in t)
    (n || !ii(s)) && (e[s] = t[s]);
}, Jl = (e, t, n) => {
  const s = e.slots = Go();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (tr(s, t, n), n && io(s, "_", i, !0)) : Qo(t, s);
  } else t && er(e, t);
}, ql = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let o = !0, r = ae;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : tr(i, t, n) : (o = !t.$stable, Qo(t, i)), r = t;
  } else t && (er(e, t), r = { default: 1 });
  if (o)
    for (const l in i)
      !ii(l) && r[l] == null && delete i[l];
}, Pe = Ql;
function Gl(e) {
  return Yl(e);
}
function Yl(e, t) {
  const n = Zn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: o,
    createElement: r,
    createText: l,
    createComment: a,
    setText: f,
    setElementText: c,
    parentNode: p,
    nextSibling: b,
    setScopeId: M = it,
    insertStaticContent: N
  } = e, I = (u, h, v, O = null, w = null, C = null, A = void 0, T = null, E = !!h.dynamicChildren) => {
    if (u === h)
      return;
    u && !tn(u, h) && (O = It(u), Oe(u, w, C, !0), u = null), h.patchFlag === -2 && (E = !1, h.dynamicChildren = null), h.dynamicChildren && u && u.dynamicChildren && u.dynamicChildren.hasOnce && (h.dynamicChildren === Lt && (h.dynamicChildren = []), h.dynamicChildren.hasOnce = !0);
    const { type: _, ref: j, shapeFlag: R } = h;
    switch (_) {
      case is:
        L(u, h, v, O);
        break;
      case Ke:
        F(u, h, v, O);
        break;
      case xs:
        u == null && k(h, v, O, A);
        break;
      case fe:
        x(
          u,
          h,
          v,
          O,
          w,
          C,
          A,
          T,
          E
        );
        break;
      default:
        R & 1 ? H(
          u,
          h,
          v,
          O,
          w,
          C,
          A,
          T,
          E
        ) : R & 6 ? U(
          u,
          h,
          v,
          O,
          w,
          C,
          A,
          T,
          E
        ) : (R & 64 || R & 128) && _.process(
          u,
          h,
          v,
          O,
          w,
          C,
          A,
          T,
          E,
          Ge
        );
    }
    j != null && w ? cn(j, u && u.ref, C, h || u, !h) : j == null && u && u.ref != null && cn(u.ref, null, C, u, !0);
  }, L = (u, h, v, O) => {
    if (u == null)
      s(
        h.el = l(h.children),
        v,
        O
      );
    else {
      const w = h.el = u.el;
      h.children !== u.children && f(w, h.children);
    }
  }, F = (u, h, v, O) => {
    u == null ? s(
      h.el = a(h.children || ""),
      v,
      O
    ) : h.el = u.el;
  }, k = (u, h, v, O) => {
    [u.el, u.anchor] = N(
      u.children,
      h,
      v,
      O,
      u.el,
      u.anchor
    );
  }, K = ({ el: u, anchor: h }, v, O) => {
    let w;
    for (; u && u !== h; )
      w = b(u), s(u, v, O), u = w;
    s(h, v, O);
  }, y = ({ el: u, anchor: h }) => {
    let v;
    for (; u && u !== h; )
      v = b(u), i(u), u = v;
    i(h);
  }, H = (u, h, v, O, w, C, A, T, E) => {
    if (h.type === "svg" ? A = "svg" : h.type === "math" && (A = "mathml"), u == null)
      re(
        h,
        v,
        O,
        w,
        C,
        A,
        T,
        E
      );
    else {
      const _ = u.el && u.el._isVueCE ? u.el : null;
      try {
        _ && _._beginPatch(), ne(
          u,
          h,
          w,
          C,
          A,
          T,
          E
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, re = (u, h, v, O, w, C, A, T) => {
    let E, _;
    const { props: j, shapeFlag: R, transition: $, dirs: B } = u;
    if (E = u.el = r(
      u.type,
      C,
      j && j.is,
      j
    ), R & 8 ? c(E, u.children) : R & 16 && Z(
      u.children,
      E,
      null,
      O,
      w,
      _s(u, C),
      A,
      T
    ), B && kt(u, null, O, "created"), V(E, u, u.scopeId, A, O), j) {
      for (const se in j)
        se !== "value" && !ln(se) && o(E, se, null, j[se], C, O);
      "value" in j && o(E, "value", null, j.value, C), (_ = j.onVnodeBeforeMount) && Ye(_, O, u);
    }
    B && kt(u, null, O, "beforeMount");
    const Y = Xl(w, $);
    Y && $.beforeEnter(E), s(E, h, v), ((_ = j && j.onVnodeMounted) || Y || B) && Pe(() => {
      _ && Ye(_, O, u), Y && $.enter(E), B && kt(u, null, O, "mounted");
    }, w);
  }, V = (u, h, v, O, w) => {
    if (v && M(u, v), O)
      for (let C = 0; C < O.length; C++)
        M(u, O[C]);
    if (w) {
      let C = w.subTree;
      if (h === C || sr(C.type) && (C.ssContent === h || C.ssFallback === h)) {
        const A = w.vnode;
        V(
          u,
          A,
          A.scopeId,
          A.slotScopeIds,
          w.parent
        );
      }
    }
  }, Z = (u, h, v, O, w, C, A, T, E = 0) => {
    for (let _ = E; _ < u.length; _++) {
      const j = u[_] = T ? ht(u[_]) : et(u[_]);
      I(
        null,
        j,
        h,
        v,
        O,
        w,
        C,
        A,
        T
      );
    }
  }, ne = (u, h, v, O, w, C, A) => {
    const T = h.el = u.el;
    let { patchFlag: E, dynamicChildren: _, dirs: j } = h;
    E |= u.patchFlag & 16;
    const R = u.props || ae, $ = h.props || ae;
    let B;
    if (v && Ft(v, !1), (B = $.onVnodeBeforeUpdate) && Ye(B, v, h, u), j && kt(h, u, v, "beforeUpdate"), v && Ft(v, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!u.dynamicChildren || u.dynamicChildren.length !== _.length) && (E = 0, A = !1, _ = null), (R.innerHTML && $.innerHTML == null || R.textContent && $.textContent == null) && c(T, ""), _ ? de(
      u.dynamicChildren,
      _,
      T,
      v,
      O,
      _s(h, w),
      C
    ) : A || J(
      u,
      h,
      T,
      null,
      v,
      O,
      _s(h, w),
      C,
      !1
    ), E > 0) {
      if (E & 16)
        xe(T, R, $, v, w);
      else if (E & 2 && R.class !== $.class && o(T, "class", null, $.class, w), E & 4 && o(T, "style", R.style, $.style, w), E & 8) {
        const Y = h.dynamicProps;
        for (let se = 0; se < Y.length; se++) {
          const q = Y[se], pe = R[q], ye = $[q];
          (ye !== pe || q === "value") && o(T, q, pe, ye, w, v);
        }
      }
      E & 1 && u.children !== h.children && c(T, h.children);
    } else !A && _ == null && xe(T, R, $, v, w);
    ((B = $.onVnodeUpdated) || j) && Pe(() => {
      B && Ye(B, v, h, u), j && kt(h, u, v, "updated");
    }, O);
  }, de = (u, h, v, O, w, C, A) => {
    for (let T = 0; T < h.length; T++) {
      const E = u[T], _ = h[T], j = E.el || $s(E), R = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        j && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === fe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !tn(E, _) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 198) ? p(j) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      I(
        E,
        _,
        R,
        null,
        O,
        w,
        C,
        A,
        !0
      );
    }
  }, xe = (u, h, v, O, w) => {
    if (h !== v) {
      if (h !== ae)
        for (const C in h)
          !ln(C) && !(C in v) && o(
            u,
            C,
            h[C],
            null,
            w,
            O
          );
      for (const C in v) {
        if (ln(C)) continue;
        const A = v[C], T = h[C];
        A !== T && C !== "value" && o(u, C, T, A, w, O);
      }
      "value" in v && o(u, "value", h.value, v.value, w);
    }
  }, x = (u, h, v, O, w, C, A, T, E) => {
    const _ = h.el = u ? u.el : l(""), j = h.anchor = u ? u.anchor : l("");
    let { patchFlag: R, dynamicChildren: $, slotScopeIds: B } = h;
    B && (T = T ? T.concat(B) : B), u == null ? (s(_, v, O), s(j, v, O), Z(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      v,
      j,
      w,
      C,
      A,
      T,
      E
    )) : R > 0 && R & 64 && $ && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === $.length ? (de(
      u.dynamicChildren,
      $,
      v,
      w,
      C,
      A,
      T
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (h.key != null || w && h === w.subTree) && ri(
      u,
      h,
      !0
      /* shallow */
    )) : J(
      u,
      h,
      v,
      j,
      w,
      C,
      A,
      T,
      E
    );
  }, U = (u, h, v, O, w, C, A, T, E) => {
    h.slotScopeIds = T, u == null ? h.shapeFlag & 512 ? w.ctx.activate(
      h,
      v,
      O,
      A,
      E
    ) : z(
      h,
      v,
      O,
      w,
      C,
      A,
      E
    ) : je(u, h, E);
  }, z = (u, h, v, O, w, C, A) => {
    const T = u.component = oa(
      u,
      O,
      w
    );
    if (si(u) && (T.ctx.renderer = Ge), la(T, !1, A), T.asyncDep) {
      if (w && w.registerDep(
        T,
        he,
        A,
        C
      ), !u.el) {
        const E = T.subTree = ot(Ke);
        F(null, E, h, v), u.placeholder = E.el;
      }
    } else
      he(
        T,
        u,
        h,
        v,
        w,
        C,
        A
      );
  }, je = (u, h, v) => {
    const O = h.component = u.component;
    if (Hl(u, h, v))
      if (O.asyncDep && !O.asyncResolved) {
        h.el = u.el, h.placeholder = u.placeholder, ie(O, h, v);
        return;
      } else
        O.next = h, O.update();
    else
      h.el = u.el, h.placeholder = u.placeholder, O.vnode = h;
  }, he = (u, h, v, O, w, C, A) => {
    const T = () => {
      if (u.isMounted) {
        let { next: R, bu: $, u: B, parent: Y, vnode: se } = u;
        {
          const Ne = nr(u);
          if (Ne) {
            R && (R.el = se.el, ie(u, R, A)), Ne.asyncDep.then(() => {
              Pe(() => {
                u.isUnmounted || _();
              }, w);
            });
            return;
          }
        }
        let q = R, pe;
        Ft(u, !1), R ? (R.el = se.el, ie(u, R, A)) : R = se, $ && Fn($), (pe = R.props && R.props.onVnodeBeforeUpdate) && Ye(pe, Y, R, se), Ft(u, !0);
        const ye = Ti(u), Le = u.subTree;
        u.subTree = ye, I(
          Le,
          ye,
          // parent may have changed if it's in a teleport
          p(Le.el),
          // anchor may have changed if it's in a fragment
          It(Le),
          u,
          w,
          C
        ), R.el = ye.el, q === null && Kl(u, ye.el), B && Pe(B, w), (pe = R.props && R.props.onVnodeUpdated) && Pe(
          () => Ye(pe, Y, R, se),
          w
        );
      } else {
        let R;
        const { el: $, props: B } = h, { bm: Y, m: se, parent: q, root: pe, type: ye } = u, Le = zt(h);
        Ft(u, !1), Y && Fn(Y), !Le && (R = B && B.onVnodeBeforeMount) && Ye(R, q, h), Ft(u, !0);
        {
          pe.ce && pe.ce._hasShadowRoot() && pe.ce._injectChildStyle(
            ye,
            u.parent ? u.parent.type : void 0
          );
          const Ne = u.subTree = Ti(u);
          I(
            null,
            Ne,
            v,
            O,
            u,
            w,
            C
          ), h.el = Ne.el;
        }
        if (se && Pe(se, w), !Le && (R = B && B.onVnodeMounted)) {
          const Ne = h;
          Pe(
            () => Ye(R, q, Ne),
            w
          );
        }
        (h.shapeFlag & 256 || q && zt(q.vnode) && q.vnode.shapeFlag & 256) && u.a && Pe(u.a, w), u.isMounted = !0, h = v = O = null;
      }
    };
    u.scope.on();
    const E = u.effect = new ao(T);
    u.scope.off();
    const _ = u.update = E.run.bind(E), j = u.job = E.runIfDirty.bind(E);
    j.i = u, j.id = u.uid, E.scheduler = () => ni(j), Ft(u, !0), _();
  }, ie = (u, h, v) => {
    h.component = u;
    const O = u.vnode.props;
    u.vnode = h, u.next = null, Ul(u, h.props, O, v), ql(u, h.children, v), rt(), To(u), lt();
  }, J = (u, h, v, O, w, C, A, T, E = !1) => {
    const _ = u && u.children, j = u ? u.shapeFlag : 0, R = h.children, { patchFlag: $, shapeFlag: B } = h;
    if ($ > 0) {
      if ($ & 128) {
        Ht(
          _,
          R,
          v,
          O,
          w,
          C,
          A,
          T,
          E
        );
        return;
      } else if ($ & 256) {
        ut(
          _,
          R,
          v,
          O,
          w,
          C,
          A,
          T,
          E
        );
        return;
      }
    }
    B & 8 ? (j & 16 && wt(_, w, C), R !== _ && c(v, R)) : j & 16 ? B & 16 ? Ht(
      _,
      R,
      v,
      O,
      w,
      C,
      A,
      T,
      E
    ) : wt(_, w, C, !0) : (j & 8 && c(v, ""), B & 16 && Z(
      R,
      v,
      O,
      w,
      C,
      A,
      T,
      E
    ));
  }, ut = (u, h, v, O, w, C, A, T, E) => {
    u = u || Lt, h = h || Lt;
    const _ = u.length, j = h.length, R = Math.min(_, j);
    let $;
    for ($ = 0; $ < R; $++) {
      const B = h[$] = E ? ht(h[$]) : et(h[$]);
      I(
        u[$],
        B,
        v,
        null,
        w,
        C,
        A,
        T,
        E
      );
    }
    _ > j ? wt(
      u,
      w,
      C,
      !0,
      !1,
      R
    ) : Z(
      h,
      v,
      O,
      w,
      C,
      A,
      T,
      E,
      R
    );
  }, Ht = (u, h, v, O, w, C, A, T, E) => {
    let _ = 0;
    const j = h.length;
    let R = u.length - 1, $ = j - 1;
    for (; _ <= R && _ <= $; ) {
      const B = u[_], Y = h[_] = E ? ht(h[_]) : et(h[_]);
      if (tn(B, Y))
        I(
          B,
          Y,
          v,
          null,
          w,
          C,
          A,
          T,
          E
        );
      else
        break;
      _++;
    }
    for (; _ <= R && _ <= $; ) {
      const B = u[R], Y = h[$] = E ? ht(h[$]) : et(h[$]);
      if (tn(B, Y))
        I(
          B,
          Y,
          v,
          null,
          w,
          C,
          A,
          T,
          E
        );
      else
        break;
      R--, $--;
    }
    if (_ > R) {
      if (_ <= $) {
        const B = $ + 1, Y = B < j ? h[B].el : O;
        for (; _ <= $; )
          I(
            null,
            h[_] = E ? ht(h[_]) : et(h[_]),
            v,
            Y,
            w,
            C,
            A,
            T,
            E
          ), _++;
      }
    } else if (_ > $)
      for (; _ <= R; )
        Oe(u[_], w, C, !0), _++;
    else {
      const B = _, Y = _, se = /* @__PURE__ */ new Map();
      for (_ = Y; _ <= $; _++) {
        const be = h[_] = E ? ht(h[_]) : et(h[_]);
        be.key != null && se.set(be.key, _);
      }
      let q, pe = 0;
      const ye = $ - Y + 1;
      let Le = !1, Ne = 0;
      const Pt = new Array(ye);
      for (_ = 0; _ < ye; _++) Pt[_] = 0;
      for (_ = B; _ <= R; _++) {
        const be = u[_];
        if (pe >= ye) {
          Oe(be, w, C, !0);
          continue;
        }
        let De;
        if (be.key != null)
          De = se.get(be.key);
        else
          for (q = Y; q <= $; q++)
            if (Pt[q - Y] === 0 && tn(be, h[q])) {
              De = q;
              break;
            }
        De === void 0 ? Oe(be, w, C, !0) : (Pt[De - Y] = _ + 1, De >= Ne ? Ne = De : Le = !0, I(
          be,
          h[De],
          v,
          null,
          w,
          C,
          A,
          T,
          E
        ), pe++);
      }
      const Zt = Le ? Zl(Pt) : Lt;
      for (q = Zt.length - 1, _ = ye - 1; _ >= 0; _--) {
        const be = Y + _, De = h[be], Sn = h[be + 1], m = be + 1 < j ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Sn.el || $s(Sn)
        ) : O;
        Pt[_] === 0 ? I(
          null,
          De,
          v,
          m,
          w,
          C,
          A,
          T,
          E
        ) : Le && (q < 0 || _ !== Zt[q] ? ve(De, v, m, 2) : q--);
      }
    }
  }, ve = (u, h, v, O, w = null) => {
    const { el: C, type: A, transition: T, children: E, shapeFlag: _ } = u;
    if (_ & 6) {
      ve(u.component.subTree, h, v, O);
      return;
    }
    if (_ & 128) {
      u.suspense.move(h, v, O);
      return;
    }
    if (_ & 64) {
      A.move(u, h, v, Ge);
      return;
    }
    if (A === fe) {
      s(C, h, v);
      for (let R = 0; R < E.length; R++)
        ve(E[R], h, v, O);
      s(u.anchor, h, v);
      return;
    }
    if (A === xs) {
      K(u, h, v);
      return;
    }
    if (O !== 2 && _ & 1 && T)
      if (O === 0)
        T.persisted && !C[ys] ? s(C, h, v) : (T.beforeEnter(C), s(C, h, v), Pe(() => T.enter(C), w));
      else {
        const { leave: R, delayLeave: $, afterLeave: B } = T, Y = () => {
          u.ctx.isUnmounted ? i(C) : s(C, h, v);
        }, se = () => {
          const q = C._isLeaving || !!C[ys];
          C._isLeaving && C[ys](
            !0
            /* cancelled */
          ), T.persisted && !q ? Y() : R(C, () => {
            Y(), B && B();
          });
        };
        $ ? $(C, Y, se) : se();
      }
    else
      s(C, h, v);
  }, Oe = (u, h, v, O = !1, w = !1) => {
    const {
      type: C,
      props: A,
      ref: T,
      children: E,
      dynamicChildren: _,
      shapeFlag: j,
      patchFlag: R,
      dirs: $,
      cacheIndex: B,
      memo: Y
    } = u;
    if ((R === -2 || _ && _.hasOnce) && (w = !1), T != null && (rt(), cn(T, null, v, u, !0), lt()), B != null && (!u.ctx || u.ctx === h) && (h.renderCache[B] = void 0), j & 256) {
      h.ctx.deactivate(u);
      return;
    }
    const se = j & 1 && $, q = !zt(u);
    let pe;
    if (q && (pe = A && A.onVnodeBeforeUnmount) && Ye(pe, h, u), j & 6)
      qe(u.component, v, O);
    else {
      if (j & 128) {
        u.suspense.unmount(v, O);
        return;
      }
      se && kt(u, null, h, "beforeUnmount"), j & 64 ? u.type.remove(
        u,
        h,
        v,
        Ge,
        O
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== fe || R > 0 && R & 64) ? wt(
        _,
        h,
        v,
        !1,
        !0
      ) : (C === fe && R & 384 || !w && j & 16) && wt(E, h, v), O && xt(u);
    }
    const ye = Y != null && B == null;
    (q && (pe = A && A.onVnodeUnmounted) || se || ye) && Pe(() => {
      pe && Ye(pe, h, u), se && kt(u, null, h, "unmounted"), ye && (u.el = null);
    }, v);
  }, xt = (u) => {
    const { type: h, el: v, anchor: O, transition: w } = u, C = h === fe;
    if (C && !w) {
      Xt(v, O);
      return;
    }
    if (h === xs) {
      y(u), w && !w.persisted && w.afterLeave && w.afterLeave();
      return;
    }
    const A = C ? Ps(u) : u, T = () => {
      C ? p(v) && Xt(v, O) : i(v), w && !w.persisted && w.afterLeave && w.afterLeave();
    };
    if (A && A.shapeFlag & 1 && w && !w.persisted) {
      const { leave: E, delayLeave: _ } = w, j = A.el, R = () => E(j, T);
      _ ? _(j, T, R) : R();
    } else
      T();
  }, Xt = (u, h) => {
    let v;
    for (; u !== h; )
      v = b(u), i(u), u = v;
    i(h);
  }, qe = (u, h, v) => {
    const { bum: O, scope: w, job: C, subTree: A, um: T, m: E, a: _ } = u;
    Ri(E), Ri(_), O && Fn(O), w.stop(), C ? (C.flags |= 8, Oe(A, u, h, v)) : u.vnode.el && A && (A.transition = u.vnode.transition, Oe(A, u, h, v)), T && Pe(T, h), Pe(() => {
      u.isUnmounted = !0;
    }, h);
  }, wt = (u, h, v, O = !1, w = !1, C = 0) => {
    for (let A = C; A < u.length; A++)
      Oe(u[A], h, v, O, w);
  }, It = (u) => {
    if (u.shapeFlag & 6)
      return It(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const h = b(u.anchor || u.el), v = h && h[Fo];
    return v ? b(v) : h;
  }, me = (u, h, v) => {
    const O = u && h._vnode ? void 0 : u && u.component ? u.component.uid : ia();
    ol(() => {
      u == null ? h._vnode && Oe(h._vnode, null, null, !0) : I(
        h._vnode || null,
        u,
        h,
        null,
        null,
        null,
        v
      ), h._vnode = u;
    }, O);
  }, Ge = {
    p: I,
    um: Oe,
    m: ve,
    r: xt,
    mt: z,
    mc: Z,
    pc: J,
    pbc: de,
    n: It,
    o: e
  };
  return {
    render: me,
    hydrate: void 0,
    createApp: Nl(me)
  };
}
function _s({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ft({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Xl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ri(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (D(s) && D(i))
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
      let l = i[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = ht(i[o]), l.el = r.el), !n && l.patchFlag !== -2 && ri(r, l)), l.type === is && (l.patchFlag === -1 && (l = i[o] = ht(l)), l.el = r.el), l.type === Ke && !l.el && (l.el = r.el);
    }
}
function Zl(e) {
  const t = e.slice(), n = [0];
  let s, i, o, r, l;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const f = e[s];
    if (f !== 0) {
      if (i = n[n.length - 1], e[i] < f) {
        t[s] = i, n.push(s);
        continue;
      }
      for (o = 0, r = n.length - 1; o < r; )
        l = o + r >> 1, e[n[l]] < f ? o = l + 1 : r = l;
      f < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s);
    }
  }
  for (o = n.length, r = n[o - 1]; o-- > 0; )
    n[o] = r, r = t[r];
  return n;
}
function nr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : nr(t);
}
function Ri(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function $s(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? $s(t.subTree) : null;
}
const sr = (e) => e.__isSuspense;
function Ql(e, t) {
  t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : il(e);
}
const fe = /* @__PURE__ */ Symbol.for("v-fgt"), is = /* @__PURE__ */ Symbol.for("v-txt"), Ke = /* @__PURE__ */ Symbol.for("v-cmt"), xs = /* @__PURE__ */ Symbol.for("v-stc"), vt = [];
let $e = null;
function X(e = !1) {
  vt.push($e = e ? null : []);
}
function li() {
  vt.pop(), $e = vt[vt.length - 1] || null;
}
let mn = 1;
function Ii(e, t = !1) {
  mn += e, e < 0 && $e && t && ($e.hasOnce = !0);
}
function ir(e) {
  return e.dynamicChildren = mn > 0 ? $e || Lt : null, li(), mn > 0 && $e && $e.push(e), e;
}
function ee(e, t, n, s, i, o) {
  return ir(
    S(
      e,
      t,
      n,
      s,
      i,
      o,
      !0
    )
  );
}
function vn(e, t, n, s, i) {
  return ir(
    ot(
      e,
      t,
      n,
      s,
      i,
      !0
    )
  );
}
function os(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function tn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const or = ({ key: e }) => e ?? null, jn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ge(e) || /* @__PURE__ */ Re(e) || W(e) ? { i: Ae, r: e, k: t, f: !!n } : e : null);
function S(e, t = null, n = null, s = 0, i = null, o = e === fe ? 0 : 1, r = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && or(t),
    ref: t && jn(t),
    scopeId: Ro,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ae
  };
  return l ? (Un(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= ge(n) ? 8 : 16), mn > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  $e && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && $e.push(a), a;
}
const ot = ea;
function ea(e, t = null, n = null, s = 0, i = null, o = !1) {
  if ((!e || e === Ol) && (e = Ke), os(e)) {
    const l = Gt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Un(l, n), mn > 0 && !o && $e && (l.shapeFlag & 6 ? $e[$e.indexOf(e)] = l : $e.push(l)), l.patchFlag = -2, l;
  }
  if (fa(e) && (e = e.__vccOpts), t) {
    t = ta(t);
    let { class: l, style: a } = t;
    l && !ge(l) && (t.class = Mt(l)), oe(a) && (/* @__PURE__ */ ei(a) && !D(a) && (a = Me({}, a)), t.style = dn(a));
  }
  const r = ge(e) ? 1 : sr(e) ? 128 : ts(e) ? 64 : oe(e) ? 4 : W(e) ? 2 : 0;
  return S(
    e,
    t,
    n,
    s,
    i,
    r,
    o,
    !0
  );
}
function ta(e) {
  return e ? /* @__PURE__ */ ei(e) || Yo(e) ? Me({}, e) : e : null;
}
function Gt(e, t, n = !1, s = !1) {
  const { props: i, ref: o, patchFlag: r, children: l, transition: a } = e, f = t ? na(i || {}, t) : i, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && or(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? D(o) ? o.concat(jn(t)) : [o, jn(t)] : jn(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== fe ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Gt(e.ssContent),
    ssFallback: e.ssFallback && Gt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && s && Hn(
    c,
    a.clone(c)
  ), c;
}
function we(e = " ", t = 0) {
  return ot(is, null, e, t);
}
function jt(e = "", t = !1) {
  return t ? (X(), vn(Ke, null, e)) : ot(Ke, null, e);
}
function et(e) {
  return e == null || typeof e == "boolean" ? ot(Ke) : D(e) ? ot(
    fe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : os(e) ? ht(e) : ot(is, null, String(e));
}
function ht(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Gt(e);
}
function Un(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (D(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Un(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !Yo(t) ? t._ctx = Ae : i === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (W(t)) {
    if (s & 65) {
      Un(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ae }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [we(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function na(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Mt([t.class, s.class]));
      else if (i === "style")
        t.style = dn([t.style, s.style]);
      else if (qn(i)) {
        const o = t[i], r = s[i];
        r && o !== r && !(D(o) && o.includes(r)) ? t[i] = o ? [].concat(o, r) : r : r == null && o == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Gn(i) && (t[i] = r);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function Ye(e, t, n, s = null) {
  Je(e, t, 7, [
    n,
    s
  ]);
}
const sa = Uo();
let rr = 0;
function ia() {
  return rr;
}
function oa(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || sa, o = {
    uid: rr++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Er(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Zo(s, i),
    emitsOptions: Wo(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ae,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ae,
    data: ae,
    props: ae,
    attrs: ae,
    slots: ae,
    refs: ae,
    setupState: ae,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = $l.bind(null, o), e.ce && e.ce(o), o;
}
let Fe = null;
const ra = () => Fe || Ae;
let Wn, yn;
{
  const e = Zn(), t = (n, s) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(s), (o) => {
      i.length > 1 ? i.forEach((r) => r(o)) : i[0](o);
    };
  };
  Wn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Fe = n
  ), yn = t(
    "__VUE_SSR_SETTERS__",
    (n) => bn = n
  );
}
const Cn = (e) => {
  const t = Fe;
  return Wn(e), e.scope.on(), () => {
    e.scope.off(), Wn(t);
  };
}, Pi = () => {
  Fe && Fe.scope.off(), Wn(null);
};
function lr(e) {
  return e.vnode.shapeFlag & 4;
}
let bn = !1;
function la(e, t = !1, n = !1) {
  t && yn(t);
  const { props: s, children: i } = e.vnode, o = lr(e);
  Bl(e, s, o, t), Jl(e, i, n || t);
  const r = o ? aa(e, t) : void 0;
  return t && yn(!1), r;
}
function aa(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, El);
  const { setup: s } = n;
  if (s) {
    rt();
    const i = e.setupContext = s.length > 1 ? ca(e) : null, o = Cn(e), r = wn(
      s,
      e,
      0,
      [
        e.props,
        i
      ]
    ), l = eo(r);
    if (lt(), o(), (l || e.sp) && !zt(e) && $o(e), l) {
      if (r.then(Pi, Pi), t)
        return r.then((a) => {
          yn(!0);
          try {
            ki(e, a, t);
          } finally {
            yn(!1);
          }
        }).catch((a) => {
          es(a, e, 0);
        });
      e.asyncDep = r;
    } else
      ki(e, r);
  } else
    ar(e);
}
function ki(e, t, n) {
  W(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : oe(t) && (e.setupState = So(t)), ar(e);
}
function ar(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || it);
  {
    const i = Cn(e);
    rt();
    try {
      Al(e);
    } finally {
      lt(), i();
    }
  }
}
const ua = {
  get(e, t) {
    return Ee(e, "get", ""), e[t];
  }
};
function ca(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, ua),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function rs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(So(Jr(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in fn)
        return fn[n](e);
    },
    has(t, n) {
      return n in t || n in fn;
    }
  })) : e.proxy;
}
function fa(e) {
  return W(e) && "__vccOpts" in e;
}
const Xe = (e, t) => /* @__PURE__ */ Qr(e, t, bn), da = "3.5.44";
let Ls;
const Fi = typeof window < "u" && window.trustedTypes;
if (Fi)
  try {
    Ls = /* @__PURE__ */ Fi.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ur = Ls ? (e) => Ls.createHTML(e) : (e) => e, ha = "http://www.w3.org/2000/svg", pa = "http://www.w3.org/1998/Math/MathML", dt = typeof document < "u" ? document : null, Ni = dt && /* @__PURE__ */ dt.createElement("template"), ga = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? dt.createElementNS(ha, e) : t === "mathml" ? dt.createElementNS(pa, e) : n ? dt.createElement(e, { is: n }) : dt.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => dt.createTextNode(e),
  createComment: (e) => dt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => dt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, o) {
    const r = n ? n.previousSibling : t.lastChild;
    if (i && (i === o || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === o || !(i = i.nextSibling)); )
        ;
    else {
      Ni.innerHTML = ur(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ni.content;
      if (s === "svg" || s === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      r ? r.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, ma = /* @__PURE__ */ Symbol("_vtc");
function va(e, t, n) {
  const s = e[ma];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ji = /* @__PURE__ */ Symbol("_vod"), ya = /* @__PURE__ */ Symbol("_vsh"), ba = /* @__PURE__ */ Symbol(""), _a = /(?:^|;)\s*display\s*:/;
function xa(e, t, n) {
  const s = e.style, i = ge(n);
  let o = !1;
  if (n && !i) {
    if (t)
      if (ge(t))
        for (const r of t.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          n[l] == null && rn(s, l, "");
        }
      else
        for (const r in t)
          n[r] == null && rn(s, r, "");
    for (const r in n) {
      r === "display" && (o = !0);
      const l = n[r];
      l != null ? Ca(
        e,
        r,
        !ge(t) && t ? t[r] : void 0,
        l
      ) || rn(s, r, l) : rn(s, r, "");
    }
  } else if (i) {
    if (t !== n) {
      const r = s[ba];
      r && (n += ";" + r), s.cssText = n, o = _a.test(n);
    }
  } else t && e.removeAttribute("style");
  ji in e && ((!i || t !== n) && (e[ji] = o ? s.display : ""), e[ya] && (s.display = "none"));
}
const In = /\s*!important$/;
function rn(e, t, n) {
  if (D(n))
    n.forEach((s) => rn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    In.test(n) ? e.setProperty(t, n.replace(In, ""), "important") : e.setProperty(t, n);
  else {
    const s = wa(e, t);
    In.test(n) ? e.setProperty(
      Rt(s),
      n.replace(In, ""),
      "important"
    ) : e[s] = n;
  }
}
const $i = ["Webkit", "Moz", "ms"], ws = {};
function wa(e, t) {
  const n = ws[t];
  if (n)
    return n;
  let s = Ue(t);
  if (s !== "filter" && s in e)
    return ws[t] = s;
  s = so(s);
  for (let i = 0; i < $i.length; i++) {
    const o = $i[i] + s;
    if (o in e)
      return ws[t] = o;
  }
  return t;
}
function Ca(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ge(s) && n === s;
}
const Li = "http://www.w3.org/1999/xlink";
function Di(e, t, n, s, i, o = Mr(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Li, t.slice(6, t.length)) : e.setAttributeNS(Li, t, n) : n == null || o && !oo(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : ze(n) ? String(n) : n
  );
}
function Vi(e, t, n, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? ur(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let r = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = oo(n) : n == null && l === "string" ? (n = "", r = !0) : l === "number" && (n = 0, r = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  r && e.removeAttribute(i || t);
}
function Ot(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Sa(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Hi = /* @__PURE__ */ Symbol("_vei");
function Ma(e, t, n, s, i = null) {
  const o = e[Hi] || (e[Hi] = {}), r = o[t];
  if (s && r)
    r.value = s;
  else {
    const [l, a] = Ea(t);
    if (s) {
      const f = o[t] = Ia(
        s,
        i
      );
      Ot(e, l, f, a);
    } else r && (Sa(e, l, r, a), o[t] = void 0);
  }
}
const Oa = /(Once|Passive|Capture)$/, Ta = /^on:?(?:Once|Passive|Capture)$/;
function Ea(e) {
  let t, n;
  for (; (n = e.match(Oa)) && !Ta.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Rt(e.slice(2)), t];
}
let Cs = 0;
const Aa = /* @__PURE__ */ Promise.resolve(), Ra = () => Cs || (Aa.then(() => Cs = 0), Cs = Date.now());
function Ia(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const i = n.value;
    if (D(i)) {
      const o = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        o.call(s), s._stopped = !0;
      };
      const r = i.slice(), l = [s];
      for (let a = 0; a < r.length && !s._stopped; a++) {
        const f = r[a];
        f && Je(
          f,
          t,
          5,
          l
        );
      }
    } else
      Je(
        i,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = Ra(), n;
}
const Ki = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Pa = (e, t, n, s, i, o) => {
  const r = i === "svg";
  t === "class" ? va(e, s, r) : t === "style" ? xa(e, n, s) : qn(t) ? Gn(t) || Ma(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ka(e, t, s, r)) ? (Vi(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Di(e, t, s, r, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Fa(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ge(s))) ? Vi(e, Ue(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Di(e, t, s, r));
};
function ka(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ki(t) && W(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Ki(t) && ge(n) ? !1 : t in e;
}
function Fa(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = Ue(t);
  return Array.isArray(n) ? n.some((i) => Ue(i) === s) : Object.keys(n).some((i) => Ue(i) === s);
}
const Yt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return D(t) ? (n) => Fn(t, n) : t;
};
function Na(e) {
  e.target.composing = !0;
}
function Bi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const nt = /* @__PURE__ */ Symbol("_assign"), Pn = /* @__PURE__ */ Symbol("_initialValue");
function Ss(e, t, n) {
  return t && (e = e.trim()), n && (e = Xn(e)), e;
}
const Ui = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
    e.parentNode && (e.type === "text" ? e[Pn] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Pn] = e.defaultValue.replace(/\r\n?/g, `
`))), e[nt] = Yt(i);
    const o = s || i.props && i.props.type === "number";
    Ot(e, t ? "change" : "input", (r) => {
      r.target.composing || e[nt](Ss(e.value, n, o));
    }), (n || o) && Ot(e, "change", () => {
      e.value = Ss(e.value, n, o);
    }), t || (Ot(e, "compositionstart", Na), Ot(e, "compositionend", Bi), Ot(e, "change", Bi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const i = t ?? "", o = e[Pn];
    delete e[Pn], o !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== o ? e[nt](Ss(e.value, n, s)) : e.value = i;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: i, number: o } }, r) {
    if (e[nt] = Yt(r), e.composing) return;
    const l = (o || e.type === "number") && !/^0\d/.test(e.value) ? Xn(e.value) : e.value, a = t ?? "";
    if (l === a)
      return;
    const f = e.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === e && e.type !== "range" && (s && t === n || i && e.value.trim() === a) || (e.value = a);
  }
}, Wi = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[nt] = Yt(n), Ot(e, "change", () => {
      const s = e._modelValue, i = _n(e), o = e.checked, r = e[nt];
      if (D(s)) {
        const l = zs(s, i), a = l !== -1;
        if (o && !a)
          r(s.concat(i));
        else if (!o && a) {
          const f = [...s];
          f.splice(l, 1), r(f);
        }
      } else if (yt(s)) {
        const l = new Set(s);
        o ? l.add(i) : l.delete(i), r(l);
      } else
        r(cr(e, o));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: zi,
  beforeUpdate(e, t, n) {
    e[nt] = Yt(n), zi(e, t, n);
  }
};
function zi(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let i;
  if (D(t))
    i = zs(t, s.props.value) > -1;
  else if (yt(t))
    i = t.has(s.props.value);
  else {
    if (t === n) return;
    i = bt(t, cr(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const ja = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, Ot(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => n ? Xn(_n(a)) : _n(a)
      ), o = e.multiple, r = o ? yt(e._modelValue) ? new Set(i) : i : i[0], l = e._pendingValue = [
        o,
        o ? D(r) ? i.slice() : i : r
      ];
      try {
        e[nt](r);
      } finally {
        ti(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[nt] = Yt(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Ji(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[nt] = Yt(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !$a(t, n[1], n[0])) && Ji(e, t);
  }
};
function $a(e, t, n) {
  if (!n || D(e)) return bt(e, t);
  if (yt(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function Ji(e, t) {
  const n = e.multiple, s = D(t);
  if (!(n && !s && !yt(t))) {
    for (let i = 0, o = e.options.length; i < o; i++) {
      const r = e.options[i], l = _n(r);
      if (n)
        if (s) {
          const a = typeof l;
          a === "string" || a === "number" ? r.selected = t.some((f) => String(f) === String(l)) : r.selected = zs(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (bt(_n(r), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function _n(e) {
  return "_value" in e ? e._value : e.value;
}
function cr(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const La = ["ctrl", "shift", "alt", "meta"], Da = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => La.some((n) => e[`${n}Key`] && !t.includes(n))
}, Wt = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((i, ...o) => {
    for (let r = 0; r < t.length; r++) {
      const l = Da[t[r]];
      if (l && l(i, t)) return;
    }
    return e(i, ...o);
  }));
}, Va = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, qi = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((i) => {
    if (!("key" in i))
      return;
    const o = Rt(i.key);
    if (t.some(
      (r) => r === o || Va[r] === o
    ))
      return e(i);
  }));
}, Ha = /* @__PURE__ */ Me({ patchProp: Pa }, ga);
let Gi;
function Ka() {
  return Gi || (Gi = Gl(Ha));
}
const Ba = ((...e) => {
  const t = Ka().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const i = Wa(s);
    if (!i) return;
    const o = t._component;
    !W(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const r = n(i, !1, Ua(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), r;
  }, t;
});
function Ua(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Wa(e) {
  return ge(e) ? document.querySelector(e) : e;
}
const za = /* @__PURE__ */ jo({
  __name: "ModalMask",
  props: {
    open: { type: Boolean },
    topLayer: { type: Boolean }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t;
    return (s, i) => (X(), vn(hl, { to: "body" }, [
      e.open ? (X(), ee(
        "div",
        {
          key: 0,
          class: "moss-modal",
          onMousedown: i[0] || (i[0] = Wt((o) => n("close"), ["self"]))
        },
        [
          Tl(s.$slots, "default", {}, void 0)
        ],
        32
        /* NEED_HYDRATION */
      )) : jt("v-if", !0)
    ]));
  }
}), fr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, Ja = /* @__PURE__ */ fr(za, [["__scopeId", "data-v-32f7ef2b"]]), qa = { canvases: { portrait: { width: 1088, height: 1920 }, landscape: { width: 1920, height: 1088 } } };
function Ds(e, t) {
  return typeof e == "number" && typeof t == "number" && e > 0 && t > 0 && e > t ? "landscape" : "portrait";
}
function Vs(e) {
  return qa.canvases[e];
}
function Ga(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw new Error(`JSON 解析失败:${i instanceof Error ? i.message : String(i)}`);
  }
  const n = Ya(t);
  if (!n)
    throw new Error('需要形如 {"id":"my_layout","label":"…","portrait":[{"position":"…","slots":{"F":[y1,x1,y2,x2]}}]}');
  if (!n.portrait?.length && !n.landscape?.length)
    throw new Error("portrait 与 landscape 至少要有一个方向的面板");
  const s = t;
  if (s.canvas !== void 0 && !ai(s.canvas)) throw new Error("画布宽高必须是 64～8192 的偶数。");
  for (const i of ["portrait", "landscape"]) {
    if (s[i] === void 0) continue;
    const o = s[i], r = n.canvas ?? Vs(i);
    if (n.canvas && Ds(r.width, r.height) !== i) throw new Error("面板方向与自定义画布宽高不符。");
    const l = /* @__PURE__ */ new Set();
    if (!Array.isArray(o) || !o.length) throw new Error(`${i}:需要非空面板数组。`);
    for (const a of o) {
      const f = a, c = typeof f?.position == "string" ? f.position.trim().toLowerCase() : "";
      if (!c || l.has(c)) throw new Error(`${i}:面板位置不能为空或重复。`);
      if (l.add(c), f?.layer !== void 0 && !Number.isSafeInteger(f.layer)) throw new Error(`${i}/${c}:层级必须为安全整数。`);
      if (!f?.slots || typeof f.slots != "object" || !Object.keys(f.slots).length)
        throw new Error(`${i}/${c}:需要槽位坐标。`);
      for (const [p, b] of Object.entries(f.slots)) {
        const M = dr(b);
        if (!p.trim() || !M || M[0] < -r.height / 2 || M[2] > r.height / 2 || M[1] < -r.width / 2 || M[3] > r.width / 2)
          throw new Error(`${i}/${c}/${p}:坐标无效或超出画布。`);
      }
      for (const [p, b] of Object.entries(f.shapes ?? {}))
        if (!f.slots[p] || !ui(b) || b.some(([M, N]) => Math.abs(M) > r.width / 2 || Math.abs(N) > r.height / 2))
          throw new Error(`${i}/${c}/${p}:四边形角点无效、交叉或超出画布。`);
    }
  }
  return n;
}
function dr(e) {
  if (!Array.isArray(e) || e.length !== 4) return null;
  const t = e.map((r) => typeof r == "number" && Number.isFinite(r) ? Math.round(r) : NaN);
  if (t.some((r) => !Number.isSafeInteger(r))) return null;
  const [n, s, i, o] = t;
  return n >= i || s >= o ? null : [n, s, i, o];
}
function Yi(e) {
  if (!Array.isArray(e)) return;
  const t = [];
  for (const n of e) {
    if (!n || typeof n != "object" || Array.isArray(n)) continue;
    const s = n, i = typeof s.position == "string" ? s.position.trim() : "", o = s.slots && typeof s.slots == "object" ? s.slots : null;
    if (!i || !o) continue;
    const r = {};
    for (const [c, p] of Object.entries(o)) {
      const b = dr(p);
      b && (r[c.trim().toUpperCase()] = b);
    }
    const l = {};
    if (s.shapes && typeof s.shapes == "object")
      for (const [c, p] of Object.entries(s.shapes)) {
        const b = c.trim().toUpperCase();
        r[b] && ui(p) && (l[b] = p.map((M) => M.map(Math.round)));
      }
    const a = {};
    if (s.slotNotes && typeof s.slotNotes == "object" && !Array.isArray(s.slotNotes))
      for (const [c, p] of Object.entries(s.slotNotes)) {
        const b = c.trim().toUpperCase();
        r[b] && typeof p == "string" && p.trim() && (a[b] = p.trim());
      }
    const f = {};
    if (s.slotContents && typeof s.slotContents == "object" && !Array.isArray(s.slotContents))
      for (const [c, p] of Object.entries(s.slotContents)) {
        const b = c.trim().toUpperCase();
        r[b] && Array.isArray(p) && (f[b] = JSON.parse(JSON.stringify(p)));
      }
    Object.keys(r).length && t.push({ position: i, slots: r, ...Number.isSafeInteger(s.layer) ? { layer: s.layer } : {}, ...Object.keys(l).length ? { shapes: l } : {}, ...Object.keys(a).length ? { slotNotes: a } : {}, ...Object.keys(f).length ? { slotContents: f } : {} });
  }
  return t.length ? t : void 0;
}
function Ya(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, n = typeof t.id == "string" ? t.id.trim() : "";
  if (!n) return null;
  const s = Yi(t.portrait), i = Yi(t.landscape), o = typeof t.label == "string" ? t.label.trim() : void 0, r = typeof t.usage == "string" ? t.usage.trim() : void 0, l = typeof t.readingOrder == "string" ? t.readingOrder.trim() : void 0;
  if (!s && !i && !o && !r && !l) return null;
  const a = ai(t.canvas);
  return { id: n, label: o, usage: r, readingOrder: l, portrait: s, landscape: i, ...a ? { canvas: a } : {}, ...t.promptMode ? { promptMode: t.promptMode } : {}, ...typeof t.promptCaption == "string" ? { promptCaption: t.promptCaption } : {} };
}
function ai(e) {
  if (!e || typeof e != "object") return null;
  const { width: t, height: n } = e;
  return [t, n].every((s) => Number.isInteger(s) && s >= 64 && s <= 8192 && s % 2 === 0) ? { width: t, height: n } : null;
}
function ui(e) {
  return !Array.isArray(e) || e.length !== 4 || e.some((t) => !Array.isArray(t) || t.length !== 2 || t.some((n) => typeof n != "number" || !Number.isFinite(n))) ? !1 : e.every((t, n) => {
    const s = e[(n + 1) % 4], i = e[(n + 2) % 4];
    return (s[0] - t[0]) * (i[1] - s[1]) - (s[1] - t[1]) * (i[0] - s[0]) > 0.01;
  });
}
const Vt = 24, Se = (e, t, n) => Math.max(t, Math.min(n, e));
function pt(e, t, n = Vt) {
  const s = Se(Math.round(e.width), n, t.width), i = Se(Math.round(e.height), n, t.height);
  return { x: Se(Math.round(e.x), 0, t.width - s), y: Se(Math.round(e.y), 0, t.height - i), width: s, height: i };
}
function Xa(e, t) {
  const [n, s, i, o] = e.slots.F ?? e.slots.C ?? Object.values(e.slots)[0];
  return pt({ x: s + t.width / 2, y: n + t.height / 2, width: o - s, height: i - n }, t);
}
function kn(e, t, n) {
  const s = { ...e, slots: {}, corners: {} };
  n?.layer !== void 0 && (s.layer = n.layer), n?.position && (s.position = n.position);
  for (const [i, [o, r, l, a]] of Object.entries((n ?? eu(e, t, "")).slots))
    i === "F" || i === "X" || ci(s, i, { x: r + t.width / 2, y: o + t.height / 2, width: a - r, height: l - o });
  for (const [i, o] of Object.entries(n?.shapes ?? {})) {
    if (i !== "F" && !s.slots[i]) continue;
    const r = i === "F" ? s : qt(s, i);
    s.corners[i] = o.map(([l, a]) => [(l + t.width / 2 - r.x) / r.width, (a + t.height / 2 - r.y) / r.height]);
  }
  return n?.slotNotes && (s.slotNotes = { ...n.slotNotes }), n?.slotContents && (s.slotContents = JSON.parse(JSON.stringify(n.slotContents))), s;
}
function $n(e, t) {
  const n = t === "F" ? e : qt(e, t);
  return (e.corners[t] ?? [[0, 0], [1, 0], [1, 1], [0, 1]]).map(([s, i]) => [n.x + s * n.width, n.y + i * n.height]);
}
function Za(e, t, n, s) {
  const i = n.map(([a, f]) => [Se(Math.round(a), 0, s.width), Se(Math.round(f), 0, s.height)]);
  if (!ui(i)) return !1;
  const o = Math.min(...i.map((a) => a[0])), r = Math.min(...i.map((a) => a[1])), l = { x: o, y: r, width: Math.max(...i.map((a) => a[0])) - o, height: Math.max(...i.map((a) => a[1])) - r };
  return l.width < (t === "F" ? Vt : 1) || l.height < (t === "F" ? Vt : 1) ? !1 : (t === "F" ? Object.assign(e, l) : ci(e, t, l), e.corners[t] = i.map(([a, f]) => [(a - o) / l.width, (f - r) / l.height]), !0);
}
function qt(e, t) {
  const n = e.slots[t];
  return { x: Math.round(e.x + n.x * e.width), y: Math.round(e.y + n.y * e.height), width: Math.max(1, Math.round(n.width * e.width)), height: Math.max(1, Math.round(n.height * e.height)) };
}
function ci(e, t, n) {
  e.slots[t] = { x: (n.x - e.x) / e.width, y: (n.y - e.y) / e.height, width: n.width / e.width, height: n.height / e.height };
}
function Qa(e, t, n) {
  const s = (l) => {
    const a = Se(Math.round(l.x), 0, t.width - 1), f = Se(Math.round(l.y), 0, t.height - 1);
    return [f - t.height / 2, a - t.width / 2, Se(Math.round(l.y + l.height), f + 1, t.height) - t.height / 2, Se(Math.round(l.x + l.width), a + 1, t.width) - t.width / 2];
  }, i = Object.fromEntries(Object.keys(e.corners).filter((l) => l === "F" || e.slots[l]).map((l) => [l, $n(e, l).map(([a, f]) => [Se(Math.round(a), 0, t.width) - t.width / 2, Se(Math.round(f), 0, t.height) - t.height / 2])])), o = Object.fromEntries(Object.entries(e.slotNotes ?? {}).filter(([l, a]) => (l === "F" || e.slots[l]) && a.trim()).map(([l, a]) => [l, a.trim()])), r = Object.fromEntries(Object.entries(e.slotContents ?? {}).filter(([l, a]) => (l === "F" || e.slots[l]) && a.length).map(([l, a]) => [l, JSON.parse(JSON.stringify(a))]));
  return { position: n, ...e.layer !== void 0 ? { layer: e.layer } : {}, slots: { F: s(e), ...Object.fromEntries(Object.keys(e.slots).map((l) => [l, s(qt(e, l))])) }, ...Object.keys(i).length ? { shapes: i } : {}, ...Object.keys(o).length ? { slotNotes: o } : {}, ...Object.keys(r).length ? { slotContents: r } : {} };
}
function eu(e, t, n) {
  const s = pt(e, t), i = (r, l, a, f) => [
    Math.round(s.y + s.height * l - t.height / 2),
    Math.round(s.x + s.width * r - t.width / 2),
    Math.round(s.y + s.height * f - t.height / 2),
    Math.round(s.x + s.width * a - t.width / 2)
  ], o = {
    F: i(0, 0, 1, 1),
    C: i(0.04, 0.04, 0.96, 0.96),
    S: i(0.04, 0.28, 0.96, 0.96),
    T: i(0.06, 0.04, 0.94, 0.25),
    B: i(0.06, 0.75, 0.94, 0.96),
    TL: i(0.04, 0.04, 0.46, 0.3),
    TR: i(0.54, 0.04, 0.96, 0.3),
    BL: i(0.06, 0.75, 0.46, 0.96),
    BR: i(0.54, 0.75, 0.94, 0.96),
    ML: i(0.04, 0.34, 0.46, 0.68),
    MR: i(0.54, 0.34, 0.96, 0.68),
    L: i(0.04, 0.06, 0.48, 0.94),
    R: i(0.52, 0.06, 0.96, 0.94),
    O: i(0.3, 0.35, 0.7, 0.65)
  };
  return { position: n, slots: o };
}
function tu(e, t, n, s, i = !1, o = Vt) {
  const r = (p, b, M, N) => {
    if (i) {
      const F = p + b, K = [...N, Math.round(F / 8) * 8].reduce((y, H) => Math.abs(H - F) < Math.abs(y - F) ? H : y, F + s + 1);
      return [p, Math.abs(K - F) <= s ? K - p : b];
    }
    let I = 0, L = s + 1;
    for (const F of [p, p + b / 2, p + b])
      for (const k of [...N, Math.round(F / 8) * 8])
        Math.abs(k - F) < L && (L = Math.abs(k - F), I = k - F);
    return [Se(p + (L <= s ? I : 0), 0, M - b), b];
  }, [l, a] = r(e.x, e.width, t.width, [0, t.width / 2, t.width, ...n.flatMap((p) => [p.x, p.x + p.width / 2, p.x + p.width])]), [f, c] = r(e.y, e.height, t.height, [0, t.height / 2, t.height, ...n.flatMap((p) => [p.y, p.y + p.height / 2, p.y + p.height])]);
  return pt({ x: l, y: f, width: a, height: c }, t, o);
}
const nu = { class: "inline" }, su = { class: "canvas-controls" }, iu = { class: "designer-body" }, ou = { class: "tools" }, ru = ["value"], lu = ["disabled"], au = ["disabled"], uu = ["disabled"], cu = { class: "inline" }, fu = ["disabled"], du = ["disabled"], hu = { class: "check" }, pu = { class: "check" }, gu = ["onClick"], mu = { class: "inline" }, vu = ["disabled"], yu = ["disabled"], bu = { class: "inline" }, _u = ["disabled"], xu = ["disabled"], wu = { class: "hint" }, Cu = { class: "canvas-area" }, Su = ["viewBox"], Mu = ["width", "height"], Ou = ["onPointerdown"], Tu = ["points", "fill", "stroke"], Eu = ["data-slot", "onPointerdown"], Au = ["points", "fill", "stroke", "stroke-width"], Ru = ["x", "y", "font-size"], Iu = ["x", "y", "font-size"], Pu = ["data-ctrl-deform", "data-handle", "rx", "x", "y", "width", "height", "fill", "aria-label", "onPointerdown"], ku = { class: "hint" }, Fu = { class: "properties" }, Nu = ["aria-selected"], ju = ["aria-selected"], $u = ["value"], Lu = ["value"], Du = { key: 0 }, Vu = ["value"], Hu = { key: 1 }, Ku = ["value"], Bu = {
  key: 0,
  class: "slot-actions"
}, Uu = ["disabled"], Wu = { class: "inline" }, zu = ["value", "disabled"], Ju = ["value"], qu = ["disabled"], Gu = { key: 1 }, Yu = ["value", "placeholder"], Xu = {
  key: 2,
  class: "hint"
}, Zu = {
  key: 3,
  class: "manual-content"
}, Qu = { class: "inline" }, ec = ["value", "onChange"], tc = ["value", "onChange"], nc = ["value", "onInput"], sc = ["value", "placeholder", "onInput"], ic = { class: "inline" }, oc = ["disabled", "onClick"], rc = ["disabled", "onClick"], lc = ["onClick"], ac = { class: "slot-list" }, uc = ["onClick"], cc = ["value", "aria-label", "onChange"], fc = {
  key: 3,
  class: "hint"
}, dc = {
  key: 0,
  role: "alert",
  class: "error"
}, hc = { key: 1 }, pc = /* @__PURE__ */ jo({
  __name: "Editor",
  props: {
    sources: {},
    existingIds: {},
    initialKey: {},
    editingId: {},
    initialMode: {},
    libraryIds: {}
  },
  emits: ["close", "save"],
  setup(e, { emit: t }) {
    const n = e, s = t;
    function i(m) {
      let d = m, g = 2;
      for (; n.existingIds.includes(d); ) d = `${m}_${g++}`;
      return d;
    }
    const o = /* @__PURE__ */ Te({ id: i("my_layout"), label: "自定义版式", usage: "", promptMode: n.initialMode ?? "llm", promptCaption: "", width: 1088, height: 1920, panels: [] }), r = /* @__PURE__ */ Te(-1), l = /* @__PURE__ */ Te(""), a = /* @__PURE__ */ Te(n.initialKey ?? ""), f = /* @__PURE__ */ Te(!0), c = /* @__PURE__ */ Te(!0), p = /* @__PURE__ */ Te(""), b = /* @__PURE__ */ Te(!1), M = /* @__PURE__ */ Te(), N = /* @__PURE__ */ Te(), I = /* @__PURE__ */ Te(1088), L = /* @__PURE__ */ Te(1920), F = /* @__PURE__ */ Te([]), k = /* @__PURE__ */ Te([]), K = /* @__PURE__ */ Te(""), y = Xe(() => o.value.panels[r.value]), H = Xe(() => y.value ? l.value && y.value.slots[l.value] ? qt(y.value, l.value) : y.value : null), re = { C: "内区", S: "主体", T: "顶部文字", B: "底部文字", TL: "左上文字", TR: "右上文字", BL: "左下文字", BR: "右下文字", L: "左人物", R: "右人物", O: "道具/音效", ML: "左侧文字", MR: "右侧文字", E: "有限越线" }, V = /* @__PURE__ */ Te("S"), Z = Xe(() => ["C", "S", "T", "B", "TL", "TR", "BL", "BR", "ML", "MR", "L", "R", "O"].filter((m) => y.value && !y.value.slots[m])), ne = Xe(() => Z.value.includes(V.value) ? V.value : Z.value[0] ?? ""), de = Xe(() => y.value?.slotContents?.[l.value || "F"] ?? []);
    let xe = null;
    function x() {
      xe = null, l.value = "";
    }
    function U() {
      if (xe) {
        const m = xe;
        Ge(m.before), F.value = m.undo, k.value = m.redo;
      }
      x();
    }
    function z(m) {
      x(), r.value = m;
    }
    function je(m, d) {
      r.value === m && l.value === d || (z(m), d && y.value?.slots[d] && (xe = { before: qe(), undo: [...F.value], redo: [...k.value] }, l.value = d, c.value = !0));
    }
    function he(m) {
      y.value && (l.value ? ci(y.value, l.value, m) : o.value.panels[r.value] = { ...y.value, ...m });
    }
    function ie() {
      const m = l.value;
      y.value && m && me(() => {
        delete y.value.slots[m], delete y.value.corners[m], y.value.slotNotes && delete y.value.slotNotes[m], y.value.slotContents && delete y.value.slotContents[m];
      });
    }
    function J() {
      const m = ne.value;
      !y.value || !m || (me(() => {
        y.value.slots[m] = { ...kn(y.value, ve.value).slots[m] };
      }), je(r.value, m));
    }
    function ut() {
      y.value && me(() => {
        y.value.slots = kn(y.value, ve.value).slots, y.value.corners = y.value.corners.F ? { F: y.value.corners.F } : {}, l.value = "";
      });
    }
    function Ht(m, d) {
      return c.value ? Object.keys(m.slots).sort((g, P) => +(d === r.value && g === l.value) - +(d === r.value && P === l.value)).map((g) => ({ key: g, rect: qt(m, g) })) : [];
    }
    const ve = Xe(() => ({ width: o.value.width, height: o.value.height })), Oe = Xe(() => o.value.panels.map((m, d) => ({ rect: m, index: d })).sort((m, d) => (m.rect.layer ?? m.index) - (d.rect.layer ?? d.index) || m.index - d.index)), xt = Xe(() => Oe.value.findIndex((m) => m.index === r.value));
    function Xt(m) {
      const d = xt.value, g = d + m;
      if (d < 0 || g < 0 || g >= Oe.value.length) return;
      const P = [...Oe.value];
      [P[d], P[g]] = [P[g], P[d]], me(() => {
        P.forEach(({ rect: G }, _e) => {
          G.layer = _e;
        });
      });
    }
    const qe = () => JSON.stringify(o.value), wt = Xe(() => {
      const m = new Set(o.value.panels.map((d) => d.position).filter(Boolean));
      return o.value.panels.map((d, g) => {
        if (d.position) return d.position;
        let P = g + 1;
        for (; m.has(`panel-${P}`); ) P++;
        const G = `panel-${P}`;
        return m.add(G), G;
      });
    });
    function It(m) {
      m !== qe() && (F.value.push(m), F.value.length > 100 && F.value.shift(), k.value = [], p.value = "");
    }
    function me(m, d = !1) {
      d || x();
      const g = qe();
      m(), It(g);
    }
    function Ge(m) {
      o.value = JSON.parse(m), I.value = o.value.width, L.value = o.value.height, r.value = Math.min(r.value, o.value.panels.length - 1), y.value?.slots[l.value] || (l.value = ""), p.value = "", b.value = !1;
    }
    function as() {
      x();
      const m = F.value.pop();
      m && (k.value.push(qe()), Ge(m));
    }
    function u() {
      x();
      const m = k.value.pop();
      m && (F.value.push(qe()), Ge(m));
    }
    function h() {
      const m = n.sources.find((d) => d.key === a.value);
      m && (me(() => {
        const d = m.id === n.editingId;
        o.value = { id: d ? m.id : i(`${m.id}_copy`), label: d ? m.label : `${m.label}（副本）`, usage: m.usage ?? "", promptMode: m.promptMode ?? "llm", promptCaption: m.promptCaption ?? "", ...m.canvas, panels: m.panels.map((g, P) => ({ ...kn(Xa(g, m.canvas), m.canvas, g), layer: g.layer ?? P })) };
      }), I.value = o.value.width, L.value = o.value.height, z(o.value.panels.length ? 0 : -1));
    }
    function v() {
      const m = ai({ width: I.value, height: L.value });
      if (!m) {
        p.value = "画布宽高须为 64～8192 的偶数。";
        return;
      }
      me(() => {
        const d = ve.value;
        o.value.panels = o.value.panels.map((g) => ({ ...g, ...pt({ x: g.x * m.width / d.width, y: g.y * m.height / d.height, width: g.width * m.width / d.width, height: g.height * m.height / d.height }, m) })), Object.assign(o.value, m);
      });
    }
    function O(m, d) {
      I.value = m, L.value = d, v();
    }
    function w() {
      me(() => {
        const m = o.value.panels.length % 5 * 0.04, d = kn(pt({ x: o.value.width * (0.08 + m), y: o.value.height * (0.08 + m), width: o.value.width * 0.55, height: o.value.height * 0.3 }, ve.value), ve.value);
        d.slots = {}, o.value.panels.push({ ...d, layer: Math.max(-1, ...o.value.panels.map((g, P) => g.layer ?? P)) + 1 }), z(o.value.panels.length - 1);
      });
    }
    function C() {
      y.value && me(() => {
        o.value.panels.splice(r.value, 1), z(Math.min(r.value, o.value.panels.length - 1));
      });
    }
    function A() {
      y.value && me(() => {
        o.value.panels.push({ ...JSON.parse(JSON.stringify(y.value)), ...pt({ ...y.value, x: y.value.x + 24, y: y.value.y + 24 }, ve.value), position: void 0, layer: Math.max(-1, ...o.value.panels.map((m, d) => m.layer ?? d)) + 1 }), z(o.value.panels.length - 1);
      });
    }
    function T(m) {
      const d = r.value + m;
      !y.value || d < 0 || d >= o.value.panels.length || me(() => {
        const [g] = o.value.panels.splice(r.value, 1);
        o.value.panels.splice(d, 0, g), r.value = d;
      });
    }
    function E(m, d) {
      const g = Number(d.target.value);
      H.value && Number.isFinite(g) && me(() => {
        he(pt({ ...H.value, [m]: g }, ve.value, l.value ? 1 : Vt));
      }, !0);
    }
    function _(m, d) {
      me(() => {
        o.value[m] = d.target.value;
      });
    }
    function j(m) {
      const d = l.value;
      me(() => {
        o.value.promptMode = m;
      }), d && je(r.value, d);
    }
    function R() {
      if (!y.value) return;
      const m = l.value || "F", d = ["T", "B", "TL", "TR", "BL", "BR", "ML", "MR"].includes(m) ? "text" : ["S", "L", "R"].includes(m) ? "character" : "object";
      me(() => {
        ((y.value.slotContents ??= {})[m] ??= []).push({ label: d, caption: "", ...d === "text" ? { text: "", textType: "dialogue" } : {} });
      }, !0);
    }
    function $(m, d, g) {
      const P = g.target.value;
      me(() => {
        Object.assign(de.value[m], { [d]: P });
      }, !0);
    }
    function B(m) {
      me(() => {
        de.value.splice(m, 1);
      }, !0);
    }
    function Y(m, d) {
      const g = m + d;
      g < 0 || g >= de.value.length || me(() => {
        const [P] = de.value.splice(m, 1);
        de.value.splice(g, 0, P);
      }, !0);
    }
    function se(m) {
      if (!y.value) return;
      const d = l.value || "F", g = m.target.value;
      me(() => {
        g ? (y.value.slotNotes ??= {})[d] = g : y.value.slotNotes && delete y.value.slotNotes[d];
      }, !0);
    }
    let q = null;
    function pe(m) {
      const d = N.value.getBoundingClientRect();
      return { x: (m.clientX - d.left) / d.width * o.value.width, y: (m.clientY - d.top) / d.height * o.value.height };
    }
    function ye(m, d, g = "", P = "") {
      m.button !== 0 || q || (je(d, P), q = { pointerId: m.pointerId, ...pe(m), rect: { ...H.value }, before: qe(), handle: g, quad: $n(y.value, P || "F"), deform: m.ctrlKey && g.length === 2 }, N.value.setPointerCapture(m.pointerId));
    }
    function Le(m) {
      if (!q || m.pointerId !== q.pointerId) return;
      const d = pe(m), g = q, P = d.x - g.x, G = d.y - g.y, _e = l.value ? 1 : Vt;
      if (g.deform) {
        const Kt = ["nw", "ne", "se", "sw"].indexOf(g.handle), us = g.quad.map((cs, pr) => pr === Kt ? [cs[0] + P, cs[1] + G] : cs);
        Za(y.value, l.value || "F", us, ve.value);
        return;
      }
      let le = { ...g.rect };
      g.handle ? (g.handle.includes("w") && (le.x = Se(g.rect.x + P, 0, g.rect.x + g.rect.width - _e), le.width = g.rect.x + g.rect.width - le.x), g.handle.includes("n") && (le.y = Se(g.rect.y + G, 0, g.rect.y + g.rect.height - _e), le.height = g.rect.y + g.rect.height - le.y), g.handle.includes("e") && (le.width = Se(g.rect.width + P, _e, o.value.width - le.x)), g.handle.includes("s") && (le.height = Se(g.rect.height + G, _e, o.value.height - le.y))) : (le.x += P, le.y += G), le = pt(le, ve.value, _e);
      const Mn = l.value ? [y.value, ...Object.keys(y.value.slots).filter((Kt) => Kt !== l.value).map((Kt) => qt(y.value, Kt))] : o.value.panels.filter((Kt, us) => us !== r.value), On = { ...le };
      f.value && !m.altKey && (le = tu(le, ve.value, Mn, 6 * o.value.width / N.value.getBoundingClientRect().width, !!g.handle, _e)), (g.handle === "e" || g.handle === "w") && (le.y = On.y, le.height = On.height), (g.handle === "n" || g.handle === "s") && (le.x = On.x, le.width = On.width), he(le);
    }
    function Ne(m, d = !1) {
      if (!q || m.pointerId !== q.pointerId) return;
      const g = q.before;
      q = null, N.value?.hasPointerCapture(m.pointerId) && N.value.releasePointerCapture(m.pointerId), d ? Ge(g) : It(g);
    }
    function Pt() {
      const m = $n(y.value, l.value || "F");
      return ["nw", "ne", "se", "sw"].flatMap((d, g) => [{ name: d, x: m[g][0], y: m[g][1] }, { name: ["n", "e", "s", "w"][g], x: (m[g][0] + m[(g + 1) % 4][0]) / 2, y: (m[g][1] + m[(g + 1) % 4][1]) / 2 }]);
    }
    function Zt(m, d) {
      return $n(m, d).map((g) => g.join(",")).join(" ");
    }
    function be() {
      qe() !== K.value || I.value !== o.value.width || L.value !== o.value.height ? b.value = !0 : s("close");
    }
    function De(m) {
      if (m.key === "Tab" && M.value) {
        const d = [...M.value.querySelectorAll('button:not(:disabled),input,textarea,select,[tabindex="0"]')], P = M.value.getRootNode().activeElement;
        m.shiftKey && (P === d[0] || P === M.value) ? (m.preventDefault(), d.at(-1)?.focus()) : !m.shiftKey && P === d.at(-1) && (m.preventDefault(), d[0]?.focus());
      }
      if (m.key === "Escape") {
        m.stopPropagation(), be();
        return;
      }
      if (!m.target.matches("input,textarea,select,button")) {
        if ((m.ctrlKey || m.metaKey) && ["z", "y"].includes(m.key.toLowerCase()))
          m.preventDefault(), m.key.toLowerCase() === "y" || m.shiftKey ? u() : as();
        else if (m.key === "Delete")
          m.preventDefault(), l.value ? ie() : C();
        else if (H.value && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(m.key)) {
          m.preventDefault();
          const d = m.shiftKey ? 10 : 1;
          me(() => {
            he(pt({ ...H.value, x: H.value.x + (m.key === "ArrowRight" ? d : m.key === "ArrowLeft" ? -d : 0), y: H.value.y + (m.key === "ArrowDown" ? d : m.key === "ArrowUp" ? -d : 0) }, ve.value, l.value ? 1 : Vt));
          }, !0);
        }
      }
    }
    function Sn() {
      if (I.value !== o.value.width || L.value !== o.value.height) {
        p.value = "画布尺寸已修改，请先点击“应用尺寸”。";
        return;
      }
      const m = n.libraryIds?.[o.value.promptMode] ?? n.existingIds, d = !n.libraryIds || o.value.promptMode === (n.initialMode ?? "llm");
      if (!o.value.id.trim() || m.includes(o.value.id.trim()) && !(d && o.value.id.trim() === n.editingId)) {
        p.value = "目标版式库已有此 ID，请填写未使用的 ID，或从目标库打开该版式编辑。";
        return;
      }
      if (!o.value.panels.length) {
        p.value = "请至少添加一格。";
        return;
      }
      try {
        const g = Ds(o.value.width, o.value.height), P = Vs(g);
        if (o.value.id.trim() === n.editingId && n.sources.some((_e) => {
          const le = Ds(_e.canvas.width, _e.canvas.height), Mn = Vs(le);
          return _e.id === n.editingId && le !== g && (o.value.width !== P.width || o.value.height !== P.height || _e.canvas.width !== Mn.width || _e.canvas.height !== Mn.height);
        })) {
          p.value = "此版式含另一画布方向。使用非标准尺寸时请填写新的版式 ID，另存后可保留原版式的两个方向。";
          return;
        }
        const G = Ga(JSON.stringify({ id: o.value.id.trim(), label: o.value.label.trim() || o.value.id.trim(), usage: o.value.usage.trim(), promptMode: o.value.promptMode, promptCaption: o.value.promptCaption, canvas: ve.value, readingOrder: wt.value.join(" → "), [g]: o.value.panels.map((_e, le) => Qa(_e, ve.value, wt.value[le])) }));
        s("save", G);
      } catch (g) {
        p.value = g instanceof Error ? g.message : String(g);
      }
    }
    return Do(() => {
      n.initialKey && h(), F.value = [], k.value = [], K.value = qe(), ti(() => M.value?.focus());
    }), (m, d) => (X(), vn(Ja, {
      open: !0,
      "top-layer": "",
      onClose: be
    }, {
      default: Io(() => [
        S(
          "section",
          {
            ref_key: "dialog",
            ref: M,
            class: "manga-designer",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "快捷自定义版式",
            tabindex: "-1",
            onKeydown: De
          },
          [
            S("header", null, [
              S(
                "strong",
                null,
                ce(e.editingId ? "可视化编辑版式" : "快捷自定义版式"),
                1
                /* TEXT */
              ),
              S("div", nu, [
                S("button", {
                  type: "button",
                  onClick: be
                }, "取消"),
                S(
                  "button",
                  {
                    type: "button",
                    class: "primary",
                    onClick: Sn
                  },
                  ce(e.editingId && o.value.id.trim() === e.editingId ? "保存版式修改" : "保存新版式"),
                  1
                  /* TEXT */
                ),
                S("button", {
                  type: "button",
                  "aria-label": "关闭编辑器",
                  onClick: be
                }, "✕")
              ])
            ]),
            S("div", su, [
              S("label", null, [
                d[27] || (d[27] = we(
                  "画布宽 ",
                  -1
                  /* CACHED */
                )),
                en(S(
                  "input",
                  {
                    "onUpdate:modelValue": d[0] || (d[0] = (g) => I.value = g),
                    "aria-label": "画布宽",
                    type: "number",
                    min: "64",
                    max: "8192",
                    step: "2"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [
                    Ui,
                    I.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              S("label", null, [
                d[28] || (d[28] = we(
                  "画布高 ",
                  -1
                  /* CACHED */
                )),
                en(S(
                  "input",
                  {
                    "onUpdate:modelValue": d[1] || (d[1] = (g) => L.value = g),
                    "aria-label": "画布高",
                    type: "number",
                    min: "64",
                    max: "8192",
                    step: "2"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [
                    Ui,
                    L.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              S("button", {
                type: "button",
                onClick: v
              }, "应用尺寸"),
              S("button", {
                type: "button",
                onClick: d[2] || (d[2] = (g) => O(1088, 1920))
              }, "1088×1920"),
              S("button", {
                type: "button",
                onClick: d[3] || (d[3] = (g) => O(1920, 1088))
              }, "1920×1088"),
              S("button", {
                type: "button",
                onClick: d[4] || (d[4] = (g) => O(1024, 1024))
              }, "1024×1024")
            ]),
            d[49] || (d[49] = S(
              "p",
              { class: "hint" },
              "改变画布尺寸会等比例换算各轴坐标。工作流与预设尺寸须与此画布一致；请连接节点的宽高输出到潜空间尺寸输入。",
              -1
              /* CACHED */
            )),
            S("div", iu, [
              S("aside", ou, [
                S("label", null, [
                  d[30] || (d[30] = we(
                    "从现有版式复制",
                    -1
                    /* CACHED */
                  )),
                  en(S(
                    "select",
                    {
                      "onUpdate:modelValue": d[5] || (d[5] = (g) => a.value = g),
                      "aria-label": "源版式"
                    },
                    [
                      d[29] || (d[29] = S(
                        "option",
                        { value: "" },
                        "请选择",
                        -1
                        /* CACHED */
                      )),
                      (X(!0), ee(
                        fe,
                        null,
                        ft(e.sources, (g) => (X(), ee("option", {
                          key: g.key,
                          value: g.key
                        }, ce(g.label) + " · " + ce(g.canvas.width) + "×" + ce(g.canvas.height), 9, ru))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    512
                    /* NEED_PATCH */
                  ), [
                    [ja, a.value]
                  ])
                ]),
                S("button", {
                  type: "button",
                  disabled: !a.value,
                  onClick: h
                }, "载入副本", 8, lu),
                S("button", {
                  type: "button",
                  onClick: w
                }, "＋ 新增分格"),
                S("button", {
                  type: "button",
                  disabled: !y.value,
                  onClick: A
                }, "复制选中分格", 8, au),
                S("button", {
                  type: "button",
                  disabled: !y.value,
                  onClick: C
                }, "删除选中分格", 8, uu),
                S("div", cu, [
                  S("button", {
                    type: "button",
                    disabled: !F.value.length,
                    onClick: as
                  }, "撤销", 8, fu),
                  S("button", {
                    type: "button",
                    disabled: !k.value.length,
                    onClick: u
                  }, "重做", 8, du)
                ]),
                S("label", hu, [
                  en(S(
                    "input",
                    {
                      "onUpdate:modelValue": d[6] || (d[6] = (g) => f.value = g),
                      type: "checkbox"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [Wi, f.value]
                  ]),
                  d[31] || (d[31] = we(
                    "对齐吸附",
                    -1
                    /* CACHED */
                  ))
                ]),
                S("label", pu, [
                  en(S(
                    "input",
                    {
                      "onUpdate:modelValue": d[7] || (d[7] = (g) => c.value = g),
                      type: "checkbox"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [Wi, c.value]
                  ]),
                  d[32] || (d[32] = we(
                    "显示可编辑槽位",
                    -1
                    /* CACHED */
                  ))
                ]),
                d[33] || (d[33] = S(
                  "p",
                  { class: "hint" },
                  "拖动外框移动整格；拖动黄色/绿色小框单独编辑槽位。直接拖动四角或边中点缩放；按住 Ctrl 再拖四角才形变。Alt 暂停吸附，方向键微调，Delete 删除选中项，Ctrl+Z 撤销。",
                  -1
                  /* CACHED */
                )),
                d[34] || (d[34] = S(
                  "strong",
                  null,
                  "读序（先读 1）",
                  -1
                  /* CACHED */
                )),
                (X(!0), ee(
                  fe,
                  null,
                  ft(o.value.panels, (g, P) => (X(), ee("button", {
                    key: P,
                    type: "button",
                    class: Mt({ active: r.value === P }),
                    onClick: (G) => z(P)
                  }, "第 " + ce(P + 1) + " 格", 11, gu))),
                  128
                  /* KEYED_FRAGMENT */
                )),
                S("div", mu, [
                  S("button", {
                    type: "button",
                    disabled: r.value <= 0,
                    onClick: d[8] || (d[8] = (g) => T(-1))
                  }, "提前", 8, vu),
                  S("button", {
                    type: "button",
                    disabled: r.value < 0 || r.value >= o.value.panels.length - 1,
                    onClick: d[9] || (d[9] = (g) => T(1))
                  }, "延后", 8, yu)
                ]),
                S("div", bu, [
                  S("button", {
                    type: "button",
                    disabled: xt.value < 0 || xt.value >= o.value.panels.length - 1,
                    onClick: d[10] || (d[10] = (g) => Xt(1))
                  }, "上移一层", 8, _u),
                  S("button", {
                    type: "button",
                    disabled: xt.value <= 0,
                    onClick: d[11] || (d[11] = (g) => Xt(-1))
                  }, "下移一层", 8, xu)
                ]),
                S(
                  "p",
                  wu,
                  ce(y.value ? `当前第 ${xt.value + 1} / ${o.value.panels.length} 层（数字越大越靠前）。` : "") + "层级控制重叠遮挡，不改变读序；遮挡关系自动写入生图提示词。",
                  1
                  /* TEXT */
                )
              ]),
              S("div", Cu, [
                (X(), ee("svg", {
                  ref_key: "svg",
                  ref: N,
                  class: "layout-canvas",
                  viewBox: `0 0 ${o.value.width} ${o.value.height}`,
                  style: dn({ aspectRatio: `${o.value.width}/${o.value.height}`, width: `min(100%, ${62 * o.value.width / o.value.height}vh)` }),
                  role: "img",
                  "aria-label": "版式画布",
                  tabindex: "0",
                  onPointermove: Le,
                  onPointerup: d[13] || (d[13] = (g) => Ne(g)),
                  onPointercancel: d[14] || (d[14] = (g) => Ne(g, !0)),
                  onLostpointercapture: d[15] || (d[15] = (g) => Ne(g, !0))
                }, [
                  S("rect", {
                    width: o.value.width,
                    height: o.value.height,
                    fill: "white",
                    onPointerdown: d[12] || (d[12] = (g) => z(-1))
                  }, null, 40, Mu),
                  (X(!0), ee(
                    fe,
                    null,
                    ft(Oe.value, ({ rect: g, index: P }) => (X(), ee("g", {
                      key: P,
                      class: Mt(["panel", { selected: P === r.value }]),
                      onPointerdown: Wt((G) => ye(G, P), ["stop", "prevent"])
                    }, [
                      S("polygon", {
                        points: Zt(g, "F"),
                        fill: P === r.value ? "#dcecff" : "#f1f2f4",
                        stroke: P === r.value ? "#2675cf" : "#333",
                        "stroke-width": "2",
                        "vector-effect": "non-scaling-stroke"
                      }, null, 8, Tu),
                      (X(!0), ee(
                        fe,
                        null,
                        ft(Ht(g, P), (G) => (X(), ee("g", {
                          key: G.key,
                          class: "slot",
                          "data-slot": G.key,
                          onPointerdown: Wt((_e) => ye(_e, P, "", G.key), ["stop", "prevent"])
                        }, [
                          S("polygon", {
                            points: Zt(g, G.key),
                            fill: G.key === "T" ? "#e5ba6638" : "#50a18a18",
                            stroke: P === r.value && G.key === l.value ? "#df7827" : G.key === "T" ? "#b48733" : "#50a18a",
                            "stroke-width": P === r.value && G.key === l.value ? 2 : 1,
                            "stroke-dasharray": "5 4",
                            "vector-effect": "non-scaling-stroke"
                          }, null, 8, Au),
                          S("text", {
                            x: G.rect.x + 5,
                            y: G.rect.y + o.value.width * 0.025,
                            "font-size": o.value.width * 0.021,
                            fill: "#575c62"
                          }, ce(G.key), 9, Ru)
                        ], 40, Eu))),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      S("text", {
                        x: g.x + 8,
                        y: g.y + o.value.width * 0.032,
                        "font-size": o.value.width * 0.026,
                        fill: "#164b83"
                      }, ce(P + 1), 9, Iu)
                    ], 42, Ou))),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  y.value && H.value ? (X(!0), ee(
                    fe,
                    { key: 0 },
                    ft(Pt(), (g) => (X(), ee("rect", {
                      key: g.name,
                      class: "resize-handle",
                      "data-ctrl-deform": g.name.length === 2,
                      "data-handle": g.name,
                      rx: g.name.length === 2 ? o.value.width * 9e-3 : 0,
                      x: g.x - o.value.width * 9e-3,
                      y: g.y - o.value.width * 9e-3,
                      width: o.value.width * 0.018,
                      height: o.value.width * 0.018,
                      fill: l.value ? "#df7827" : "#2675cf",
                      stroke: "white",
                      "vector-effect": "non-scaling-stroke",
                      style: dn({ cursor: `${g.name}-resize` }),
                      "aria-label": `${g.name} 控制点`,
                      onPointerdown: Wt((P) => ye(P, r.value, g.name, l.value), ["stop", "prevent"])
                    }, null, 44, Pu))),
                    128
                    /* KEYED_FRAGMENT */
                  )) : jt("v-if", !0)
                ], 44, Su)),
                S("p", ku, [
                  we(
                    ce(o.value.width) + "×" + ce(o.value.height) + " · " + ce(o.value.panels.length) + " 格 · 黄色：顶部字区 T · 绿色：主体 S",
                    1
                    /* TEXT */
                  ),
                  d[35] || (d[35] = S(
                    "br",
                    null,
                    null,
                    -1
                    /* CACHED */
                  )),
                  d[36] || (d[36] = we(
                    "槽位可单独移动、缩放和删除；移动外框时槽位跟随，保存后保留编辑结果。",
                    -1
                    /* CACHED */
                  ))
                ])
              ]),
              S("aside", Fu, [
                S(
                  "div",
                  {
                    class: Mt(["mode-switch", { manual: o.value.promptMode === "manual" }]),
                    role: "tablist",
                    "aria-label": "内容编辑模式",
                    onKeydown: [
                      d[18] || (d[18] = qi(Wt((g) => j("llm"), ["prevent"]), ["left"])),
                      d[19] || (d[19] = qi(Wt((g) => j("manual"), ["prevent"]), ["right"]))
                    ]
                  },
                  [
                    d[37] || (d[37] = S(
                      "span",
                      {
                        class: "mode-thumb",
                        "aria-hidden": "true"
                      },
                      null,
                      -1
                      /* CACHED */
                    )),
                    S("button", {
                      type: "button",
                      role: "tab",
                      "aria-selected": o.value.promptMode === "llm",
                      onClick: d[16] || (d[16] = (g) => j("llm"))
                    }, "← LLM 用途", 8, Nu),
                    S("button", {
                      type: "button",
                      role: "tab",
                      "aria-selected": o.value.promptMode === "manual",
                      onClick: d[17] || (d[17] = (g) => j("manual"))
                    }, "直接提示词 →", 8, ju)
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
                ),
                S("label", null, [
                  d[38] || (d[38] = we(
                    "版式 ID",
                    -1
                    /* CACHED */
                  )),
                  S("input", {
                    value: o.value.id,
                    "aria-label": "版式 ID",
                    onChange: d[20] || (d[20] = (g) => _("id", g))
                  }, null, 40, $u)
                ]),
                S("label", null, [
                  d[39] || (d[39] = we(
                    "名称",
                    -1
                    /* CACHED */
                  )),
                  S("input", {
                    value: o.value.label,
                    "aria-label": "版式名称",
                    onChange: d[21] || (d[21] = (g) => _("label", g))
                  }, null, 40, Lu)
                ]),
                o.value.promptMode === "llm" ? (X(), ee("label", Du, [
                  d[40] || (d[40] = we(
                    "用途说明",
                    -1
                    /* CACHED */
                  )),
                  S("textarea", {
                    value: o.value.usage,
                    "aria-label": "版式用途",
                    rows: "3",
                    onChange: d[22] || (d[22] = (g) => _("usage", g))
                  }, null, 40, Vu)
                ])) : (X(), ee("label", Hu, [
                  d[41] || (d[41] = we(
                    "整页画面描述",
                    -1
                    /* CACHED */
                  )),
                  S("textarea", {
                    value: o.value.promptCaption,
                    "aria-label": "整页画面描述",
                    rows: "3",
                    placeholder: "全页共用的画风、环境和光照，建议用英文填写",
                    onInput: d[23] || (d[23] = (g) => _("promptCaption", g))
                  }, null, 40, Ku)
                ])),
                y.value ? (X(), ee(
                  fe,
                  { key: 2 },
                  [
                    S(
                      "strong",
                      null,
                      "第 " + ce(r.value + 1) + " 格 · " + ce(l.value ? `${l.value} ${re[l.value] ?? "槽位"}` : "外框 F"),
                      1
                      /* TEXT */
                    ),
                    l.value ? (X(), ee("div", Bu, [
                      S("div", { class: "inline" }, [
                        S("button", {
                          type: "button",
                          class: "primary",
                          onClick: x
                        }, "确定内框"),
                        S("button", {
                          type: "button",
                          onClick: U
                        }, "取消内框修改")
                      ])
                    ])) : jt("v-if", !0),
                    S("button", {
                      type: "button",
                      disabled: !l.value,
                      onClick: ie
                    }, "删除选中槽位", 8, Uu),
                    S("button", {
                      type: "button",
                      onClick: ut
                    }, "恢复本格默认槽位"),
                    S("div", Wu, [
                      S("select", {
                        value: ne.value,
                        "aria-label": "新增内框类型",
                        disabled: !Z.value.length,
                        onChange: d[24] || (d[24] = (g) => V.value = g.target.value)
                      }, [
                        (X(!0), ee(
                          fe,
                          null,
                          ft(Z.value, (g) => (X(), ee("option", {
                            key: g,
                            value: g
                          }, ce(g) + " " + ce(re[g]), 9, Ju))),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ], 40, zu),
                      S("button", {
                        type: "button",
                        disabled: !ne.value,
                        onClick: J
                      }, "添加内框", 8, qu)
                    ]),
                    o.value.promptMode === "llm" ? (X(), ee("label", Gu, [
                      we(
                        ce(l.value ? `内框 ${l.value} 用途说明` : "外框 F 用途说明") + " ",
                        1
                        /* TEXT */
                      ),
                      S("textarea", {
                        value: y.value.slotNotes?.[l.value || "F"] ?? "",
                        "aria-label": "当前框用途说明",
                        rows: "3",
                        placeholder: l.value ? "例如：半身主体，侧重人物动作与反应" : "例如：交代场景和人物关系的开场格",
                        onInput: se
                      }, null, 40, Yu)
                    ])) : jt("v-if", !0),
                    o.value.promptMode === "llm" ? (X(), ee("p", Xu, "随版式库与工作流快照保存；通过“一键复制说明”与格式要求一起交给 LLM，帮助分配本框内容。留空沿用默认用途，说明本身不作为画面文字。")) : (X(), ee("div", Zu, [
                      S(
                        "strong",
                        null,
                        ce(l.value ? `内框 ${l.value}` : "外框 F") + " 画面描述／台词",
                        1
                        /* TEXT */
                      ),
                      (X(!0), ee(
                        fe,
                        null,
                        ft(de.value, (g, P) => (X(), ee("div", {
                          key: P,
                          class: "content-card"
                        }, [
                          S("div", Qu, [
                            S(
                              "span",
                              null,
                              ce(P + 1),
                              1
                              /* TEXT */
                            ),
                            S("select", {
                              value: g.label,
                              "aria-label": "内容类型",
                              onChange: (G) => $(P, "label", G)
                            }, [...d[42] || (d[42] = [
                              S(
                                "option",
                                { value: "object" },
                                "场景／物件",
                                -1
                                /* CACHED */
                              ),
                              S(
                                "option",
                                { value: "character" },
                                "人物",
                                -1
                                /* CACHED */
                              ),
                              S(
                                "option",
                                { value: "text" },
                                "文字",
                                -1
                                /* CACHED */
                              )
                            ])], 40, ec)
                          ]),
                          g.label === "text" ? (X(), ee(
                            fe,
                            { key: 0 },
                            [
                              S("label", null, [
                                d[44] || (d[44] = we(
                                  "文字类型",
                                  -1
                                  /* CACHED */
                                )),
                                S("select", {
                                  value: g.textType ?? "dialogue",
                                  onChange: (G) => $(P, "textType", G)
                                }, [...d[43] || (d[43] = [
                                  S(
                                    "option",
                                    { value: "dialogue" },
                                    "对白",
                                    -1
                                    /* CACHED */
                                  ),
                                  S(
                                    "option",
                                    { value: "narration" },
                                    "旁白",
                                    -1
                                    /* CACHED */
                                  ),
                                  S(
                                    "option",
                                    { value: "sfx" },
                                    "日文拟声",
                                    -1
                                    /* CACHED */
                                  )
                                ])], 40, tc)
                              ]),
                              S("label", null, [
                                d[45] || (d[45] = we(
                                  "准确台词／文字",
                                  -1
                                  /* CACHED */
                                )),
                                S("textarea", {
                                  value: g.text ?? "",
                                  "aria-label": "准确台词",
                                  rows: "3",
                                  onInput: (G) => $(P, "text", G)
                                }, null, 40, nc)
                              ])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : jt("v-if", !0),
                          S("label", null, [
                            we(
                              ce(g.label === "text" ? "文字表现说明（选填）" : "画面描述"),
                              1
                              /* TEXT */
                            ),
                            S("textarea", {
                              value: g.caption,
                              "aria-label": "当前内容描述",
                              rows: "3",
                              placeholder: g.label === "text" ? "英文描述说话人、气泡形状与位置；留空使用常规样式" : "英文描述本框可见的场景、人物、动作与取景",
                              onInput: (G) => $(P, "caption", G)
                            }, null, 40, sc)
                          ]),
                          S("div", ic, [
                            S("button", {
                              type: "button",
                              disabled: P === 0,
                              onClick: (G) => Y(P, -1)
                            }, "上移", 8, oc),
                            S("button", {
                              type: "button",
                              disabled: P === de.value.length - 1,
                              onClick: (G) => Y(P, 1)
                            }, "下移", 8, rc),
                            S("button", {
                              type: "button",
                              onClick: (G) => B(P)
                            }, "删除内容", 8, lc)
                          ])
                        ]))),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      S("button", {
                        type: "button",
                        onClick: R
                      }, "＋ 添加画面／台词"),
                      d[46] || (d[46] = S(
                        "p",
                        { class: "hint" },
                        "一个框可添加多个人物或多条文字，按列表顺序输出。空白条目留作草稿；每句台词单独一项，人物与气泡可用独立内框定位。",
                        -1
                        /* CACHED */
                      ))
                    ])),
                    S("div", ac, [
                      S(
                        "button",
                        {
                          type: "button",
                          class: Mt({ active: !l.value }),
                          onClick: x
                        },
                        "外框 F",
                        2
                        /* CLASS */
                      ),
                      (X(!0), ee(
                        fe,
                        null,
                        ft(y.value.slots, (g, P) => (X(), ee("button", {
                          key: P,
                          type: "button",
                          class: Mt({ active: l.value === P }),
                          onClick: (G) => je(r.value, String(P))
                        }, ce(P) + " " + ce(re[P] ?? ""), 11, uc))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    (X(), ee(
                      fe,
                      null,
                      ft(["x", "y", "width", "height"], (g) => S("label", { key: g }, [
                        we(
                          ce({ x: "左边距", y: "上边距", width: "宽度", height: "高度" }[g]),
                          1
                          /* TEXT */
                        ),
                        S("input", {
                          value: H.value?.[g],
                          "aria-label": `${l.value ? "槽位" : "分格"}${g}`,
                          type: "number",
                          step: "1",
                          onChange: (P) => E(g, P)
                        }, null, 40, cc)
                      ])),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (X(), ee("p", fc, "添加或选择一格，编辑精确尺寸。")),
                d[47] || (d[47] = S(
                  "p",
                  { class: "hint" },
                  "右侧按钮可选重叠槽位，Delete 删除小框，撤销可恢复。普通拖动四角或边中点改大小，Ctrl+拖四角改形状。MOSS 以外接矩形与轮廓描述接收形状参考，不保证精确裁剪。",
                  -1
                  /* CACHED */
                ))
              ])
            ]),
            p.value ? (X(), ee(
              "p",
              dc,
              ce(p.value),
              1
              /* TEXT */
            )) : jt("v-if", !0),
            b.value ? (X(), ee("footer", hc, [
              d[48] || (d[48] = S(
                "span",
                null,
                "放弃未保存的修改？",
                -1
                /* CACHED */
              )),
              S("button", {
                type: "button",
                onClick: d[25] || (d[25] = (g) => b.value = !1)
              }, "继续编辑"),
              S("button", {
                type: "button",
                onClick: d[26] || (d[26] = (g) => s("close"))
              }, "放弃修改")
            ])) : jt("v-if", !0)
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        )
      ]),
      _: 1
      /* STABLE */
    }));
  }
}), gc = /* @__PURE__ */ fr(pc, [["__scopeId", "data-v-93b249e3"]]);
function ls(e) {
  const { id: t, label: n, usage: s, readingOrder: i, canvas: o, promptMode: r, promptCaption: l } = e;
  if (!o || !t) throw new Error("版式缺少 id 或 canvas。");
  const a = e.panels ?? e.portrait ?? e.landscape;
  if (!Array.isArray(a) || !a.length) throw new Error("版式缺少分格。");
  return { id: t, label: n || t, usage: s || "", readingOrder: i || "", canvas: o, panels: a, ...r ? { promptMode: r } : {}, ...typeof l == "string" ? { promptCaption: l } : {} };
}
function mc(e) {
  const t = Array.isArray(e) ? e : e.layouts ?? [e];
  if (!Array.isArray(t)) throw new Error("导入需要版式数组。");
  return t.map(ls);
}
function vc(e) {
  const t = ls(e), n = t.panels.map((s, i) => ({ panel: i + 1, position: s.position, slots: Object.keys(s.slots), slotNotes: s.slotNotes ?? {} }));
  return `以下为当前所选版式的框用途说明，结合原文分配内容。F 说明整格用途，其余键只作用于对应内框；留空沿用槽位默认用途。用途说明不是台词、旁白或可见印字，不新增剧情事件、参与者、格子或槽位。
` + JSON.stringify({ layout: t.id, usage: t.usage, readingOrder: t.readingOrder, panels: n }, null, 2);
}
function yc(e, t) {
  return e.trim() + `

` + vc(t);
}
function bc(e, t, n) {
  const s = e.getContext("2d"), i = e.width, o = e.height;
  if (s.clearRect(0, 0, i, o), !t) return;
  const r = Math.min((i - 20) / t.canvas.width, (o - 20) / t.canvas.height), l = (i - t.canvas.width * r) / 2, a = (o - t.canvas.height * r) / 2;
  s.save(), s.translate(l, a), s.scale(r, r), s.translate(t.canvas.width / 2, t.canvas.height / 2), s.fillStyle = "#fff", s.fillRect(-t.canvas.width / 2, -t.canvas.height / 2, t.canvas.width, t.canvas.height);
  const f = t.panels.map((c, p) => ({ panel: c, index: p })).sort((c, p) => (c.panel.layer ?? c.index) - (p.panel.layer ?? p.index) || c.index - p.index);
  for (const { panel: c, index: p } of f) {
    const b = c.slots.F ?? c.slots.C ?? Object.values(c.slots)[0], [M, N, I, L] = b, F = c.shapes?.F ?? [[N, M], [L, M], [L, I], [N, I]];
    if (s.beginPath(), F.forEach(([k, K], y) => y ? s.lineTo(k, K) : s.moveTo(k, K)), s.closePath(), s.fillStyle = "#eef4fd", s.fill(), s.strokeStyle = "#235c9e", s.lineWidth = 2 / r, s.stroke(), s.save(), s.clip(), n) for (const [k, [K, y, H, re]] of Object.entries(c.slots)) {
      if (!["T", "TL", "TR", "B", "BL", "BR", "ML", "MR"].includes(k)) continue;
      const V = c.shapes?.[k] ?? [[y, K], [re, K], [re, H], [y, H]];
      s.beginPath(), V.forEach(([Z, ne], de) => de ? s.lineTo(Z, ne) : s.moveTo(Z, ne)), s.closePath(), s.strokeStyle = "#dd8838", s.lineWidth = 1 / r, s.stroke(), s.fillStyle = "#a65313", s.font = `${10 / r}px sans-serif`, s.fillText(k, y + 2 / r, K + 12 / r);
    }
    s.restore(), s.fillStyle = "#16375b", s.font = `bold ${13 / r}px sans-serif`, s.fillText(String(p + 1), N + 4 / r, M + 16 / r);
  }
  s.restore();
}
const st = { llm: { layouts: [], revision: "" }, manual: { layouts: [], revision: "" } }, zn = /* @__PURE__ */ new Set(), Hs = new URL(import.meta.url);
Hs.pathname = Hs.pathname.replace(/[^/]+$/, "moss_layout.css");
const fi = document.createElement("link");
fi.rel = "stylesheet";
fi.href = Hs.href;
document.head.append(fi);
async function Jn(e, t = {}) {
  const n = await gr.fetchApi("/moss_manga_layout/" + e, t), s = await n.json();
  if (!n.ok) throw new Error(s.error || `请求失败：${n.status}`);
  return s;
}
async function hr(e) {
  st[e] = await Jn("library?mode=" + e), zn.forEach((t) => t());
}
async function _c() {
  await Promise.all(["llm", "manual"].map(hr));
}
async function Ks(e, t) {
  st[t] = await Jn("library?mode=" + t, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layouts: e, revision: st[t].revision }) }), zn.forEach((n) => n());
}
function Xi(e, t, n) {
  const s = document.createElement("div");
  document.body.append(s);
  let i;
  const o = () => {
    i.unmount(), s.remove();
  };
  i = Ba(gc, {
    sources: [...e ? [e] : [], ...st[n].layouts.filter((r) => r.id !== e?.id)].map((r) => ({ ...r, key: r.id })),
    existingIds: st[n].layouts.map((r) => r.id),
    initialMode: n,
    libraryIds: Object.fromEntries(["llm", "manual"].map((r) => [r, st[r].layouts.map((l) => l.id)])),
    initialKey: e?.id,
    editingId: e?.id,
    onClose: o,
    onSave: async (r) => {
      try {
        const l = ls(r), a = l.promptMode ?? "llm", f = st[a], c = f.layouts.some((p) => p.id === l.id);
        if (c && (l.id !== e?.id || a !== n)) throw new Error("目标版式库已有此 ID，请改名或从目标库打开编辑。");
        await Ks(c ? f.layouts.map((p) => p.id === l.id ? l : p) : [...f.layouts, l], a), t(l), o();
      } catch (l) {
        window.alert(l.message);
      }
    }
  }), i.mount(s);
}
async function Zi(e) {
  try {
    await navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement("textarea");
    t.value = e, t.style.position = "fixed", t.style.top = "-10000px", document.body.append(t), t.select();
    const n = document.execCommand("copy");
    if (t.remove(), !n) throw new Error("浏览器无法访问剪贴板。");
  }
}
function xc(e) {
  const t = e.widgets.find((x) => x.name === "layout_id"), n = e.widgets.find((x) => x.name === "layout_snapshot");
  if (!t || !n) return;
  n.type = "hidden", n.computeSize = () => [0, -4];
  const s = e.widgets.find((x) => x.name === "library_mode") ?? { value: "llm" };
  s.type = "hidden", s.computeSize = () => [0, -4];
  const i = () => st[s.value === "manual" ? "manual" : "llm"];
  t.type = "combo", t.options = { ...t.options, values: () => [...new Set([...i().layouts.map((x) => x.id), t.value].filter(Boolean))] };
  let o = 400, r, l;
  const a = document.createElement("div");
  a.className = "moss-layout-node-panel", a.style.cssText = "width:100%;height:400px;display:flex;flex-direction:column;gap:6px;padding:6px;box-sizing:border-box;overflow:hidden;background:#202733;color:#ecf1f7;font:12px system-ui;";
  const f = document.createElement("select");
  f.setAttribute("aria-label", "版式库类型"), f.style.cssText = "flex:none;height:32px;color:#fff;background:#344052;border:1px solid #7d8b9e;border-radius:4px;padding:3px 6px";
  for (const [x, U] of [["llm", "LLM 用途库"], ["manual", "直接提示词库"]]) {
    const z = document.createElement("option");
    z.value = x, z.textContent = U, f.append(z);
  }
  a.append(f);
  const c = document.createElement("label");
  c.style.cssText = "display:flex;align-items:center;gap:8px;flex:none;min-height:32px", c.append(document.createTextNode("版式库"));
  const p = document.createElement("select");
  p.setAttribute("aria-label", "选择库中版式"), p.style.cssText = "flex:1;min-width:0;height:32px;color:#fff;background:#344052;border:1px solid #7d8b9e;border-radius:4px;padding:3px 6px", c.append(p), a.append(c);
  const b = document.createElement("div");
  b.style.cssText = "display:flex;flex-wrap:wrap;gap:5px;flex:none", a.append(b);
  const M = document.createElement("div");
  M.setAttribute("role", "status"), M.style.cssText = "min-height:30px;white-space:normal;overflow-wrap:anywhere;flex:none", a.append(M);
  const N = document.createElement("canvas");
  N.width = 1e3, N.height = 540, N.style.cssText = "display:block;width:100%;height:240px;min-height:240px;flex:none;object-fit:contain;background:#e9edf3", a.append(N);
  const I = document.createElement("label"), L = document.createElement("input");
  L.type = "checkbox", L.checked = !0, I.append(L, document.createTextNode("显示字区")), b.append(I);
  function F() {
    return n.value ? JSON.parse(n.value) : null;
  }
  function k() {
    if (!r) return;
    o = 36 + f.offsetHeight + c.offsetHeight + b.offsetHeight + M.offsetHeight + 240, a.style.height = o + "px";
    const x = e.computeSize();
    e.size[1] < x[1] && e.setSize([e.size[0], x[1]]), nn.graph?.setDirtyCanvas(!0, !0);
  }
  function K() {
    cancelAnimationFrame(l), l = requestAnimationFrame(k);
  }
  function y() {
    f.value = s.value, p.replaceChildren();
    for (const x of i().layouts) {
      const U = document.createElement("option");
      U.value = x.id, U.textContent = `${x.id} · ${x.label || x.id}`, p.append(U);
    }
    if (!i().layouts.some((x) => x.id === t.value)) {
      const x = document.createElement("option");
      x.value = t.value || "", x.textContent = n.value ? `${t.value} · 当前工作流快照（库中已无此版式）` : "请选择版式，或新建／导入", x.disabled = !0, p.prepend(x);
    }
    p.value = t.value || "", p.disabled = !i().layouts.length;
  }
  function H() {
    y();
    try {
      const x = F();
      bc(N, x, L.checked), M.textContent = x ? `${x.label || x.id} · ${x.canvas.width}×${x.canvas.height} · ${x.panels.length} 格 · ${x.promptMode === "manual" ? "直接提示词（读取手填内容）" : "LLM 输入"} · 工作流快照` : "没有选中版式：请新建或导入。";
    } catch (x) {
      M.textContent = x.message;
    }
    nn.graph?.setDirtyCanvas(!0, !0), K();
  }
  function re(x) {
    s.value = x.promptMode ?? "llm", t.value = x.id, n.value = JSON.stringify(x), H(), nn.graph?.change();
  }
  function V(x, U) {
    const z = document.createElement("button");
    z.textContent = x, z.type = "button", z.style.cssText = "padding:4px 7px;border:1px solid #7d8b9e;border-radius:4px;background:#344052;color:#fff;cursor:pointer", z.onclick = async () => {
      try {
        await U();
      } catch (je) {
        M.textContent = je.message;
      }
    }, b.append(z);
  }
  V("编辑版式", () => {
    const x = F();
    if (!x) throw new Error("先选择版式。");
    Xi(x, re, s.value);
  }), V("新建", () => Xi(null, re, s.value)), V("删除", async () => {
    const x = F();
    if (!x) throw new Error("先选择版式。");
    await Ks(i().layouts.filter((U) => U.id !== x.id), s.value), H(), M.textContent = "已从公共库删除。当前节点保留工作流快照；不会自动恢复到库。";
  }), V("刷新版式库", () => hr(s.value)), V("一键复制说明", async () => {
    const x = F();
    if (!x) throw new Error("先选择版式。");
    const U = await Jn("format", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(x) });
    await Zi(yc(U.text, x)), M.textContent = "已复制格式转换＋当前快照的框用途说明，可一起交给 LLM。";
  }), V("复制手填提示词", async () => {
    const x = F();
    if (!x) throw new Error("先选择版式。");
    if (x.promptMode !== "manual") throw new Error("请先在编辑器第二页填写画面描述／台词，并保存为直接提示词模式。");
    const U = await Jn("manual", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layout: x, bleed: e.widgets.find((z) => z.name === "bleed")?.value ?? 72 }) });
    await Zi(U.text), M.textContent = "已复制包含坐标的 MOSS 提示词；运行节点时 layout_prompt 输出相同内容。";
  }), V("导出版式库", () => {
    const x = URL.createObjectURL(new Blob([JSON.stringify({ mode: s.value, layouts: i().layouts }, null, 2)], { type: "application/json" })), U = document.createElement("a");
    U.href = x, U.download = `moss-manga-${s.value}-layouts.json`, U.click(), setTimeout(() => URL.revokeObjectURL(x), 1e3);
  }), V("导出当前版式", () => {
    const x = F();
    if (!x) throw new Error("先选择版式。");
    const U = URL.createObjectURL(new Blob([JSON.stringify(ls(x), null, 2)], { type: "application/json" })), z = document.createElement("a");
    z.href = U, z.download = "moss-manga-current-layout.json", z.click(), setTimeout(() => URL.revokeObjectURL(U), 1e3);
  }), V("导入", () => {
    const x = document.createElement("input");
    x.type = "file", x.accept = ".json,application/json", x.onchange = async () => {
      try {
        if (!x.files?.[0]) return;
        const U = JSON.parse(await x.files[0].text()), z = mc(U), je = new Set(z.map((J) => J.promptMode ?? U.mode ?? s.value));
        if (je.size > 1 || [...je].some((J) => !["llm", "manual"].includes(J))) throw new Error("请分别导入 LLM 用途库和直接提示词库文件。");
        const he = [...je][0] ?? s.value;
        for (const J of z) J.promptMode = he;
        const ie = new Set(st[he].layouts.map((J) => J.id));
        if (z.some((J) => ie.has(J.id))) throw new Error("导入含同名 ID，请先改名；不会覆盖已有版式。");
        await Ks([...st[he].layouts, ...z], he), z.length ? re(z[0]) : H();
      } catch (U) {
        M.textContent = U.message;
      }
    }, x.click();
  }), L.onchange = H, f.onchange = () => {
    s.value = f.value;
    const x = i().layouts.find((U) => U.id === t.value) ?? i().layouts[0];
    x ? re(x) : (t.value = "", n.value = "", H(), nn.graph?.change());
  }, p.onchange = () => {
    const x = i().layouts.find((U) => U.id === p.value);
    x && re(x);
  }, t.callback = (x) => {
    const U = i().layouts.find((z) => z.id === x);
    U ? re(U) : H();
  }, r = e.addDOMWidget("版式预览", "moss_layout_preview", a, { serialize: !1, hideOnZoom: !1, getMinHeight: () => o, getMaxHeight: () => o, getHeight: () => o }), r.computeSize = (x) => [x, o], e.setSize([Math.max(e.size[0], 460), Math.max(e.size[1], 640)]);
  const Z = new ResizeObserver(K);
  [c, b, M].forEach((x) => Z.observe(x));
  const ne = e.onResize;
  e.onResize = function(...x) {
    const U = ne?.apply(this, x);
    return K(), U;
  };
  const de = e.onConfigure;
  e.onConfigure = function(...x) {
    const U = de?.apply(this, x);
    return setTimeout(() => {
      n.value && (s.value = F()?.promptMode ?? "llm"), H();
    }, 0), U;
  }, zn.add(H);
  const xe = e.onRemoved;
  e.onRemoved = function(...x) {
    return zn.delete(H), Z.disconnect(), cancelAnimationFrame(l), xe?.apply(this, x);
  }, _c().then(() => {
    if (n.value && (s.value = F()?.promptMode ?? "llm"), !n.value && !t.value && i().layouts.length) re(i().layouts[0]);
    else if (!n.value && t.value) {
      const x = i().layouts.find((U) => U.id === t.value);
      x && re(x);
    }
    H();
  }).catch((x) => {
    M.textContent = x.message;
  });
}
nn.registerExtension({ name: "MOSS.MangaLayout", beforeRegisterNodeDef(e, t) {
  if (t.name !== "MossMangaLayout") return;
  const n = e.prototype.onNodeCreated;
  e.prototype.onNodeCreated = function(...s) {
    const i = n?.apply(this, s);
    return xc(this), i;
  };
} });
