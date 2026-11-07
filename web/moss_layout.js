import { app as co } from "../../scripts/app.js";
import { api as Pr } from "../../scripts/api.js";
// @__NO_SIDE_EFFECTS__
function Ss(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const fe = {}, ln = [], mt = () => {
}, Zi = () => !1, Oo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ko = (e) => e.startsWith("onUpdate:"), Fe = Object.assign, Ms = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, $r = Object.prototype.hasOwnProperty, ie = (e, t) => $r.call(e, t), U = Array.isArray, rn = (e) => zn(e) === "[object Map]", pn = (e) => zn(e) === "[object Set]", ci = (e) => zn(e) === "[object Date]", q = (e) => typeof e == "function", ye = (e) => typeof e == "string", st = (e) => typeof e == "symbol", ue = (e) => e !== null && typeof e == "object", Qi = (e) => (ue(e) || q(e)) && q(e.then) && q(e.catch), el = Object.prototype.toString, zn = (e) => el.call(e), Rr = (e) => zn(e).slice(8, -1), tl = (e) => zn(e) === "[object Object]", Os = (e) => ye(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pn = /* @__PURE__ */ Ss(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Eo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Ir = /-\w/g, nt = Eo(
  (e) => e.replace(Ir, (t) => t.slice(1).toUpperCase())
), jr = /\B([A-Z])/g, Ut = Eo(
  (e) => e.replace(jr, "-$1").toLowerCase()
), nl = Eo((e) => e.charAt(0).toUpperCase() + e.slice(1)), Wo = Eo(
  (e) => e ? `on${nl(e)}` : ""
), pt = (e, t) => !Object.is(e, t), fo = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, ol = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, To = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let fi;
const Ao = () => fi || (fi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Kt(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = ye(o) ? Br(o) : Kt(o);
      if (s)
        for (const i in s)
          t[i] = s[i];
    }
    return t;
  } else if (ye(e) || ue(e))
    return e;
}
const Nr = /;(?![^(]*\))/g, Dr = /:([^]+)/, Lr = /\/\*[^]*?\*\//g;
function Br(e) {
  const t = {};
  return e.replace(Lr, "").split(Nr).forEach((n) => {
    if (n) {
      const o = n.split(Dr);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function et(e) {
  let t = "";
  if (ye(e))
    t = e;
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const o = et(e[n]);
      o && (t += o + " ");
    }
  else if (ue(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Kr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Vr = /* @__PURE__ */ Ss(Kr);
function sl(e) {
  return !!e || e === "";
}
function Hr(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = gn(e[o], t[o]);
  return n;
}
function gn(e, t) {
  if (e === t) return !0;
  let n = ci(e), o = ci(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = st(e), o = st(t), n || o)
    return e === t;
  if (n = U(e), o = U(t), n || o)
    return n && o ? Hr(e, t) : !1;
  if (n = ue(e), o = ue(t), n || o) {
    if (!n || !o)
      return !1;
    const s = Object.keys(e).length, i = Object.keys(t).length;
    if (s !== i)
      return !1;
    for (const l in e) {
      const r = e.hasOwnProperty(l), u = t.hasOwnProperty(l);
      if (r && !u || !r && u || !gn(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function ks(e, t) {
  return e.findIndex((n) => gn(n, t));
}
const il = (e) => !!(e && e.__v_isRef === !0), X = (e) => ye(e) ? e : e == null ? "" : U(e) || ue(e) && (e.toString === el || !q(e.toString)) ? il(e) ? X(e.value) : JSON.stringify(e, ll, 2) : String(e), ll = (e, t) => il(t) ? ll(e, t.value) : rn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], i) => (n[Jo(o, i) + " =>"] = s, n),
    {}
  )
} : pn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Jo(n))
} : st(t) ? Jo(t) : ue(t) && !U(t) && !tl(t) ? String(t) : t, Jo = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    st(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Ae;
class Ur {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Ae && (Ae.active ? (this.parent = Ae, this.index = (Ae.scopes || (Ae.scopes = [])).push(
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
        const o = this.scopes.slice();
        for (t = 0, n = o.length; t < n; t++)
          o[t].pause();
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
        const s = this.scopes.slice();
        for (t = 0, n = s.length; t < n; t++)
          s[t].resume();
      }
      const o = this.effects.slice();
      for (t = 0, n = o.length; t < n; t++)
        o[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Ae;
      try {
        return Ae = this, t();
      } finally {
        Ae = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ae, Ae = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ae === this)
        Ae = this.prevScope;
      else {
        let t = Ae;
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
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const s = this.scopes.slice();
        for (n = 0, o = s.length; n < o; n++)
          s[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Wr() {
  return Ae;
}
let de;
const zo = /* @__PURE__ */ new WeakSet();
class rl {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ae && (Ae.active ? Ae.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, zo.has(this) && (zo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ul(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, di(this), cl(this);
    const t = de, n = ot;
    de = this, ot = !0;
    try {
      return this.fn();
    } finally {
      fl(this), de = t, ot = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        As(t);
      this.deps = this.depsTail = void 0, di(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? zo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    rs(this) && this.run();
  }
  get dirty() {
    return rs(this);
  }
}
let al = 0, $n, Rn;
function ul(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Rn, Rn = e;
    return;
  }
  e.next = $n, $n = e;
}
function Es() {
  al++;
}
function Ts() {
  if (--al > 0)
    return;
  if (Rn) {
    let t = Rn;
    for (Rn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; $n; ) {
    let t = $n;
    for ($n = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (o) {
          e || (e = o);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function cl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function fl(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), As(o), Jr(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function rs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (dl(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function dl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ln) || (e.globalVersion = Ln, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !rs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = de, o = ot;
  de = e, ot = !0;
  try {
    cl(e);
    const s = e.fn(e._value);
    (t.version === 0 || pt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    de = n, ot = o, fl(e), e.flags &= -3;
  }
}
function As(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      As(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Jr(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let ot = !0;
const hl = [];
function Et() {
  hl.push(ot), ot = !1;
}
function Tt() {
  const e = hl.pop();
  ot = e === void 0 ? !0 : e;
}
function di(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = de;
    de = void 0;
    try {
      t();
    } finally {
      de = n;
    }
  }
}
let Ln = 0;
class zr {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Fs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!de || !ot || de === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== de)
      n = this.activeLink = new zr(de, this), de.deps ? (n.prevDep = de.depsTail, de.depsTail.nextDep = n, de.depsTail = n) : de.deps = de.depsTail = n, pl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = de.depsTail, n.nextDep = void 0, de.depsTail.nextDep = n, de.depsTail = n, de.deps === n && (de.deps = o);
    }
    return n;
  }
  trigger(t) {
    this.version++, Ln++, this.notify(t);
  }
  notify(t) {
    Es();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ts();
    }
  }
}
function pl(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        pl(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const as = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ Symbol(
  ""
), us = /* @__PURE__ */ Symbol(
  ""
), Bn = /* @__PURE__ */ Symbol(
  ""
);
function Ie(e, t, n) {
  if (ot && de) {
    let o = as.get(e);
    o || as.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new Fs()), s.map = o, s.key = n), s.track();
  }
}
function Mt(e, t, n, o, s, i) {
  const l = as.get(e);
  if (!l) {
    Ln++;
    return;
  }
  const r = (u) => {
    u && u.trigger();
  };
  if (Es(), t === "clear")
    l.forEach(r);
  else {
    const u = U(e), h = u && Os(n);
    if (u && n === "length") {
      const d = Number(o);
      l.forEach((v, y) => {
        (y === "length" || y === Bn || !st(y) && y >= d) && r(v);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && r(l.get(n)), h && r(l.get(Bn)), t) {
        case "add":
          u ? h && r(l.get("length")) : (r(l.get(Zt)), rn(e) && r(l.get(us)));
          break;
        case "delete":
          u || (r(l.get(Zt)), rn(e) && r(l.get(us)));
          break;
        case "set":
          rn(e) && r(l.get(Zt));
          break;
      }
  }
  Ts();
}
function on(e) {
  const t = /* @__PURE__ */ se(e);
  return t === e ? t : (Ie(t, "iterate", Bn), /* @__PURE__ */ Xe(e) ? t : t.map(it));
}
function Fo(e) {
  return Ie(e = /* @__PURE__ */ se(e), "iterate", Bn), e;
}
function dt(e, t) {
  return /* @__PURE__ */ At(e) ? fn(/* @__PURE__ */ Qt(e) ? it(t) : t) : it(t);
}
const qr = {
  __proto__: null,
  [Symbol.iterator]() {
    return qo(this, Symbol.iterator, (e) => dt(this, e));
  },
  concat(...e) {
    return on(this).concat(
      ...e.map((t) => U(t) ? on(t) : t)
    );
  },
  entries() {
    return qo(this, "entries", (e) => (e[1] = dt(this, e[1]), e));
  },
  every(e, t) {
    return _t(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return _t(
      this,
      "filter",
      e,
      t,
      (n) => n.map((o) => dt(this, o)),
      arguments
    );
  },
  find(e, t) {
    return _t(
      this,
      "find",
      e,
      t,
      (n) => dt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return _t(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return _t(
      this,
      "findLast",
      e,
      t,
      (n) => dt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return _t(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return _t(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Yo(this, "includes", e);
  },
  indexOf(...e) {
    return Yo(this, "indexOf", e);
  },
  join(e) {
    return on(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Yo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return _t(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Sn(this, "pop");
  },
  push(...e) {
    return Sn(this, "push", e);
  },
  reduce(e, ...t) {
    return hi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return hi(this, "reduceRight", e, t);
  },
  shift() {
    return Sn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return _t(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Sn(this, "splice", e);
  },
  toReversed() {
    return on(this).toReversed();
  },
  toSorted(e) {
    return on(this).toSorted(e);
  },
  toSpliced(...e) {
    return on(this).toSpliced(...e);
  },
  unshift(...e) {
    return Sn(this, "unshift", e);
  },
  values() {
    return qo(this, "values", (e) => dt(this, e));
  }
};
function qo(e, t, n) {
  const o = Fo(e), s = o[t]();
  return o !== e && !/* @__PURE__ */ Xe(e) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.done || (i.value = n(i.value)), i;
  }), s;
}
const Yr = Array.prototype;
function _t(e, t, n, o, s, i) {
  const l = Fo(e), r = l !== e && !/* @__PURE__ */ Xe(e), u = l[t];
  if (u !== Yr[t]) {
    const v = u.apply(e, i);
    return r ? it(v) : v;
  }
  let h = n;
  l !== e && (r ? h = function(v, y) {
    return n.call(this, dt(e, v), y, e);
  } : n.length > 2 && (h = function(v, y) {
    return n.call(this, v, y, e);
  }));
  const d = u.call(l, h, o);
  return r && s ? s(d) : d;
}
function hi(e, t, n, o) {
  const s = Fo(e), i = s !== e && !/* @__PURE__ */ Xe(e);
  let l = n, r = !1;
  s !== e && (i ? (r = o.length === 0, l = function(h, d, v) {
    return r && (r = !1, h = dt(e, h)), n.call(this, h, dt(e, d), v, e);
  }) : n.length > 3 && (l = function(h, d, v) {
    return n.call(this, h, d, v, e);
  }));
  const u = s[t](l, ...o);
  return r ? dt(e, u) : u;
}
function Yo(e, t, n) {
  const o = /* @__PURE__ */ se(e);
  Ie(o, "iterate", Bn);
  const s = o[t](...n);
  return (s === -1 || s === !1) && /* @__PURE__ */ Is(n[0]) ? (n[0] = /* @__PURE__ */ se(n[0]), o[t](...n)) : s;
}
function Sn(e, t, n = []) {
  Et(), Es();
  const o = (/* @__PURE__ */ se(e))[t].apply(e, n);
  return Ts(), Tt(), o;
}
const Gr = /* @__PURE__ */ Ss("__proto__,__v_isRef,__isVue"), gl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(st)
);
function Xr(e) {
  st(e) || (e = String(e));
  const t = /* @__PURE__ */ se(this);
  return Ie(t, "has", e), t.hasOwnProperty(e);
}
class vl {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    if (n === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return o === (s ? i ? ra : wl : i ? bl : yl).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const l = U(t);
    if (!s) {
      let u;
      if (l && (u = qr[n]))
        return u;
      if (n === "hasOwnProperty")
        return Xr;
    }
    const r = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ke(t) ? t : o
    );
    if ((st(n) ? gl.has(n) : Gr(n)) || (s || Ie(t, "get", n), i))
      return r;
    if (/* @__PURE__ */ ke(r)) {
      const u = l && Os(n) ? r : r.value;
      return s && ue(u) ? /* @__PURE__ */ fs(u) : u;
    }
    return ue(r) ? s ? /* @__PURE__ */ fs(r) : /* @__PURE__ */ $s(r) : r;
  }
}
class ml extends vl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let i = t[n];
    const l = U(t) && Os(n);
    if (!this._isShallow) {
      const h = /* @__PURE__ */ At(i);
      if (!/* @__PURE__ */ Xe(o) && !/* @__PURE__ */ At(o) && (i = /* @__PURE__ */ se(i), o = /* @__PURE__ */ se(o)), !l && /* @__PURE__ */ ke(i) && !/* @__PURE__ */ ke(o))
        return h || (i.value = o), !0;
    }
    const r = l ? Number(n) < t.length : ie(t, n), u = Reflect.set(
      t,
      n,
      o,
      /* @__PURE__ */ ke(t) ? t : s
    );
    return t === /* @__PURE__ */ se(s) && u && (r ? pt(o, i) && Mt(t, "set", n, o) : Mt(t, "add", n, o)), u;
  }
  deleteProperty(t, n) {
    const o = ie(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && o && Mt(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!st(n) || !gl.has(n)) && Ie(t, "has", n), o;
  }
  ownKeys(t) {
    return Ie(
      t,
      "iterate",
      U(t) ? "length" : Zt
    ), Reflect.ownKeys(t);
  }
}
class Zr extends vl {
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
const Qr = /* @__PURE__ */ new ml(), ea = /* @__PURE__ */ new Zr(), ta = /* @__PURE__ */ new ml(!0);
const cs = (e) => e, oo = (e) => Reflect.getPrototypeOf(e);
function na(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, i = /* @__PURE__ */ se(s), l = rn(i), r = e === "entries" || e === Symbol.iterator && l, u = e === "keys" && l, h = s[e](...o), d = n ? cs : t ? fn : it;
    return !t && Ie(
      i,
      "iterate",
      u ? us : Zt
    ), Fe(
      // inheriting all iterator properties
      Object.create(h),
      {
        // iterator protocol
        next() {
          const { value: v, done: y } = h.next();
          return y ? { value: v, done: y } : {
            value: r ? [d(v[0]), d(v[1])] : d(v),
            done: y
          };
        }
      }
    );
  };
}
function so(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function oa(e, t) {
  const n = {
    get(s) {
      const i = this.__v_raw, l = /* @__PURE__ */ se(i), r = /* @__PURE__ */ se(s);
      e || (pt(s, r) && Ie(l, "get", s), Ie(l, "get", r));
      const { has: u } = oo(l), h = t ? cs : e ? fn : it;
      if (u.call(l, s))
        return h(i.get(s));
      if (u.call(l, r))
        return h(i.get(r));
      i !== l && i.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && Ie(/* @__PURE__ */ se(s), "iterate", Zt), s.size;
    },
    has(s) {
      const i = this.__v_raw, l = /* @__PURE__ */ se(i), r = /* @__PURE__ */ se(s);
      return e || (pt(s, r) && Ie(l, "has", s), Ie(l, "has", r)), s === r ? i.has(s) : i.has(s) || i.has(r);
    },
    forEach(s, i) {
      const l = this, r = l.__v_raw, u = /* @__PURE__ */ se(r), h = t ? cs : e ? fn : it;
      return !e && Ie(u, "iterate", Zt), r.forEach((d, v) => s.call(i, h(d), h(v), l));
    }
  };
  return Fe(
    n,
    e ? {
      add: so("add"),
      set: so("set"),
      delete: so("delete"),
      clear: so("clear")
    } : {
      add(s) {
        const i = /* @__PURE__ */ se(this), l = oo(i), r = /* @__PURE__ */ se(s), u = !t && !/* @__PURE__ */ Xe(s) && !/* @__PURE__ */ At(s) ? r : s;
        return l.has.call(i, u) || pt(s, u) && l.has.call(i, s) || pt(r, u) && l.has.call(i, r) || (i.add(u), Mt(i, "add", u, u)), this;
      },
      set(s, i) {
        !t && !/* @__PURE__ */ Xe(i) && !/* @__PURE__ */ At(i) && (i = /* @__PURE__ */ se(i));
        const l = /* @__PURE__ */ se(this), { has: r, get: u } = oo(l);
        let h = r.call(l, s);
        h || (s = /* @__PURE__ */ se(s), h = r.call(l, s));
        const d = u.call(l, s);
        return l.set(s, i), h ? pt(i, d) && Mt(l, "set", s, i) : Mt(l, "add", s, i), this;
      },
      delete(s) {
        const i = /* @__PURE__ */ se(this), { has: l, get: r } = oo(i);
        let u = l.call(i, s);
        u || (s = /* @__PURE__ */ se(s), u = l.call(i, s)), r && r.call(i, s);
        const h = i.delete(s);
        return u && Mt(i, "delete", s, void 0), h;
      },
      clear() {
        const s = /* @__PURE__ */ se(this), i = s.size !== 0, l = s.clear();
        return i && Mt(
          s,
          "clear",
          void 0,
          void 0
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = na(s, e, t);
  }), n;
}
function Ps(e, t) {
  const n = oa(e, t);
  return (o, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    ie(n, s) && s in o ? n : o,
    s,
    i
  );
}
const sa = {
  get: /* @__PURE__ */ Ps(!1, !1)
}, ia = {
  get: /* @__PURE__ */ Ps(!1, !0)
}, la = {
  get: /* @__PURE__ */ Ps(!0, !1)
};
const yl = /* @__PURE__ */ new WeakMap(), bl = /* @__PURE__ */ new WeakMap(), wl = /* @__PURE__ */ new WeakMap(), ra = /* @__PURE__ */ new WeakMap();
function aa(e) {
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
function $s(e) {
  return /* @__PURE__ */ At(e) ? e : Rs(
    e,
    !1,
    Qr,
    sa,
    yl
  );
}
// @__NO_SIDE_EFFECTS__
function ua(e) {
  return Rs(
    e,
    !1,
    ta,
    ia,
    bl
  );
}
// @__NO_SIDE_EFFECTS__
function fs(e) {
  return Rs(
    e,
    !0,
    ea,
    la,
    wl
  );
}
function Rs(e, t, n, o, s) {
  if (!ue(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const l = aa(Rr(e));
  if (l === 0)
    return e;
  const r = new Proxy(
    e,
    l === 2 ? o : n
  );
  return s.set(e, r), r;
}
// @__NO_SIDE_EFFECTS__
function Qt(e) {
  return /* @__PURE__ */ At(e) ? /* @__PURE__ */ Qt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function At(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Is(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function se(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ se(t) : e;
}
function ca(e) {
  return !ie(e, "__v_skip") && Object.isExtensible(e) && ol(e, "__v_skip", !0), e;
}
const it = (e) => ue(e) ? /* @__PURE__ */ $s(e) : e, fn = (e) => ue(e) ? /* @__PURE__ */ fs(e) : e;
// @__NO_SIDE_EFFECTS__
function ke(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ae(e) {
  return xl(e, !1);
}
// @__NO_SIDE_EFFECTS__
function fa(e) {
  return xl(e, !0);
}
function xl(e, t) {
  return /* @__PURE__ */ ke(e) ? e : new da(e, t);
}
class da {
  constructor(t, n) {
    this.dep = new Fs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ se(t), this._value = n ? t : it(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || /* @__PURE__ */ Xe(t) || /* @__PURE__ */ At(t);
    t = o ? t : /* @__PURE__ */ se(t), pt(t, n) && (this._rawValue = t, this._value = o ? t : it(t), this.dep.trigger());
  }
}
function En(e) {
  return /* @__PURE__ */ ke(e) ? e.value : e;
}
const ha = {
  get: (e, t, n) => t === "__v_raw" ? e : En(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return /* @__PURE__ */ ke(s) && !/* @__PURE__ */ ke(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function _l(e) {
  return /* @__PURE__ */ Qt(e) ? e : new Proxy(e, ha);
}
class pa {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Fs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ln - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    de !== this)
      return ul(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return dl(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function ga(e, t, n = !1) {
  let o, s;
  return q(e) ? o = e : (o = e.get, s = e.set), new pa(o, s, n);
}
const io = {}, go = /* @__PURE__ */ new WeakMap();
let Gt;
function va(e, t = !1, n = Gt) {
  if (n) {
    let o = go.get(n);
    o || go.set(n, o = []), o.push(e);
  }
}
function ma(e, t, n = fe) {
  const { immediate: o, deep: s, once: i, scheduler: l, augmentJob: r, call: u } = n, h = (I) => s ? I : /* @__PURE__ */ Xe(I) || s === !1 || s === 0 ? Ot(I, 1) : Ot(I);
  let d, v, y, M, $ = !1, P = !1;
  if (/* @__PURE__ */ ke(e) ? (v = () => e.value, $ = /* @__PURE__ */ Xe(e)) : /* @__PURE__ */ Qt(e) ? (v = () => h(e), $ = !0) : U(e) ? (P = !0, $ = e.some((I) => /* @__PURE__ */ Qt(I) || /* @__PURE__ */ Xe(I)), v = () => e.map((I) => {
    if (/* @__PURE__ */ ke(I))
      return I.value;
    if (/* @__PURE__ */ Qt(I))
      return h(I);
    if (q(I))
      return u ? u(I, 2) : I();
  })) : q(e) ? t ? v = u ? () => u(e, 2) : e : v = () => {
    if (y) {
      Et();
      try {
        y();
      } finally {
        Tt();
      }
    }
    const I = Gt;
    Gt = d;
    try {
      return u ? u(e, 3, [M]) : e(M);
    } finally {
      Gt = I;
    }
  } : v = mt, t && s) {
    const I = v, W = s === !0 ? 1 / 0 : s;
    v = () => Ot(I(), W);
  }
  const j = Wr(), V = () => {
    d.stop(), j && j.active && Ms(j.effects, d);
  };
  if (i && t) {
    const I = t;
    t = (...W) => {
      const le = I(...W);
      return V(), le;
    };
  }
  let N = P ? new Array(e.length).fill(io) : io;
  const H = (I) => {
    if (!(!(d.flags & 1) || !d.dirty && !I))
      if (t) {
        const W = d.run();
        if (I || s || $ || (P ? W.some((le, z) => pt(le, N[z])) : pt(W, N))) {
          y && y();
          const le = Gt;
          Gt = d;
          try {
            const z = [
              W,
              // pass undefined as the old value when it's changed for the first time
              N === io ? void 0 : P && N[0] === io ? [] : N,
              M
            ];
            N = W, u ? u(t, 3, z) : (
              // @ts-expect-error
              t(...z)
            );
          } finally {
            Gt = le;
          }
        }
      } else
        d.run();
  };
  return r && r(H), d = new rl(v), d.scheduler = l ? () => l(H, !1) : H, M = (I) => va(I, !1, d), y = d.onStop = () => {
    const I = go.get(d);
    if (I) {
      if (u)
        u(I, 4);
      else
        for (const W of I) W();
      go.delete(d);
    }
  }, t ? o ? H(!0) : N = d.run() : l ? l(H.bind(null, !0), !0) : d.run(), V.pause = d.pause.bind(d), V.resume = d.resume.bind(d), V.stop = V, V;
}
function Ot(e, t = 1 / 0, n) {
  if (t <= 0 || !ue(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ ke(e))
    Ot(e.value, t, n);
  else if (U(e))
    for (let o = 0; o < e.length; o++)
      Ot(e[o], t, n);
  else if (pn(e) || rn(e))
    e.forEach((o) => {
      Ot(o, t, n);
    });
  else if (tl(e)) {
    for (const o in e)
      Ot(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && Ot(e[o], t, n);
  }
  return e;
}
function qn(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    Po(s, t, n);
  }
}
function lt(e, t, n, o) {
  if (q(e)) {
    const s = qn(e, t, n, o);
    return s && Qi(s) && s.catch((i) => {
      Po(i, t, n);
    }), s;
  }
  if (U(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++)
      s.push(lt(e[i], t, n, o));
    return s;
  }
}
function Po(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || fe;
  if (t) {
    let r = t.parent;
    const u = t.proxy, h = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; r; ) {
      const d = r.ec;
      if (d) {
        for (let v = 0; v < d.length; v++)
          if (d[v](e, u, h) === !1)
            return;
      }
      r = r.parent;
    }
    if (i) {
      Et(), qn(i, null, 10, [
        e,
        u,
        h
      ]), Tt();
      return;
    }
  }
  ya(e, n, s, o, l);
}
function ya(e, t, n, o = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const Be = [];
let ft = -1;
const an = [];
let Lt = null, sn = 0;
const Cl = /* @__PURE__ */ Promise.resolve();
let vo = null;
function Bt(e) {
  const t = vo || Cl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ba(e) {
  let t = ft + 1, n = Be.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = Be[o], i = Kn(s);
    i < e || i === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function js(e) {
  if (!(e.flags & 1)) {
    const t = Kn(e), n = Be[Be.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Kn(n) ? Be.push(e) : Be.splice(ba(t), 0, e), e.flags |= 1, Sl();
  }
}
function Sl() {
  vo || (vo = Cl.then(Ol));
}
function wa(e) {
  if (!U(e))
    Lt && e.id === -1 ? Lt.splice(sn + 1, 0, e) : e.flags & 1 || (an.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      an.push(e[t]);
  Sl();
}
function pi(e, t, n = ft + 1) {
  for (; n < Be.length; n++) {
    const o = Be[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      Be.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function Ml(e) {
  if (an.length) {
    const t = [...new Set(an)].sort(
      (n, o) => Kn(n) - Kn(o)
    );
    if (an.length = 0, Lt) {
      for (let n = 0; n < t.length; n++)
        Lt.push(t[n]);
      return;
    }
    for (Lt = t, sn = 0; sn < Lt.length; sn++) {
      const n = Lt[sn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Lt = null, sn = 0;
  }
}
const Kn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ol(e) {
  try {
    for (ft = 0; ft < Be.length; ft++) {
      const t = Be[ft];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), qn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ft < Be.length; ft++) {
      const t = Be[ft];
      t && (t.flags &= -2);
    }
    ft = -1, Be.length = 0, Ml(), vo = null, (Be.length || an.length) && Ol();
  }
}
let je = null, kl = null;
function mo(e) {
  const t = je;
  return je = e, kl = e && e.type.__scopeId || null, t;
}
function El(e, t = je, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && ki(-1);
    const i = mo(t), l = kt.length;
    let r;
    try {
      r = e(...s);
    } finally {
      for (let u = kt.length; u > l; u--) Hs();
      mo(i), o._d && ki(1);
    }
    return r;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function ut(e, t) {
  if (je === null)
    return e;
  const n = No(je), o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, l, r, u = fe] = t[s];
    i && (q(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Ot(l), o.push({
      dir: i,
      instance: n,
      value: l,
      oldValue: void 0,
      arg: r,
      modifiers: u
    }));
  }
  return e;
}
function qt(e, t, n, o) {
  const s = e.dirs, i = t && t.dirs;
  for (let l = 0; l < s.length; l++) {
    const r = s[l];
    i && (r.oldValue = i[l].value);
    let u = r.dir[o];
    u && (Et(), lt(u, n, 8, [
      e.el,
      r,
      e,
      t
    ]), Tt());
  }
}
function xa(e, t) {
  if (Ke) {
    let n = Ke.provides;
    const o = Ke.parent && Ke.parent.provides;
    o === n && (n = Ke.provides = Object.create(o)), n[e] = t;
  }
}
function ho(e, t, n = !1) {
  const o = wu();
  if (o || cn) {
    let s = cn ? cn._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && q(t) ? t.call(o && o.proxy) : t;
  }
}
const _a = /* @__PURE__ */ Symbol.for("v-scx"), Ca = () => ho(_a);
function Go(e, t, n) {
  return Tl(e, t, n);
}
function Tl(e, t, n = fe) {
  const { immediate: o, deep: s, flush: i, once: l } = n, r = Fe({}, n), u = t && o || !t && i !== "post";
  let h;
  if (Wn) {
    if (i === "sync") {
      const M = Ca();
      h = M.__watcherHandles || (M.__watcherHandles = []);
    } else if (!u) {
      const M = () => {
      };
      return M.stop = mt, M.resume = mt, M.pause = mt, M;
    }
  }
  const d = Ke;
  r.call = (M, $, P) => lt(M, d, $, P);
  let v = !1;
  i === "post" ? r.scheduler = (M) => {
    Le(M, d && d.suspense);
  } : i !== "sync" && (v = !0, r.scheduler = (M, $) => {
    $ ? M() : js(M);
  }), r.augmentJob = (M) => {
    t && (M.flags |= 4), v && (M.flags |= 2, d && (M.id = d.uid, M.i = d));
  };
  const y = ma(e, t, r);
  return Wn && (h ? h.push(y) : u && y()), y;
}
function Sa(e, t, n) {
  const o = this.proxy, s = ye(e) ? e.includes(".") ? Al(o, e) : () => o[e] : e.bind(o, o);
  let i;
  q(t) ? i = t : (i = t.handler, n = t);
  const l = Yn(this), r = Tl(s, i.bind(o), n);
  return l(), r;
}
function Al(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const Nt = /* @__PURE__ */ new WeakMap(), Fl = /* @__PURE__ */ Symbol("_vte"), $o = (e) => e.__isTeleport, Xt = (e) => e && (e.disabled || e.disabled === ""), Ma = (e) => e && (e.defer || e.defer === ""), gi = (e) => typeof SVGElement < "u" && e instanceof SVGElement, vi = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, ds = (e, t) => {
  const n = e && e.to;
  return ye(n) ? t ? t(n) : null : n;
}, Oa = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, o, s, i, l, r, u, h) {
    const {
      mc: d,
      pc: v,
      pbc: y,
      o: { insert: M, querySelector: $, createText: P, createComment: j, parentNode: V }
    } = h, N = Xt(t.props);
    let { dynamicChildren: H } = t;
    const I = (z, re, ce) => {
      z.shapeFlag & 16 && d(
        z.children,
        re,
        ce,
        s,
        i,
        l,
        r,
        u
      );
    }, W = (z = t) => {
      const re = Xt(z.props), ce = z.target = ds(z.props, $), Me = hs(ce, z, P, M);
      ce && (l !== "svg" && gi(ce) ? l = "svg" : l !== "mathml" && vi(ce) && (l = "mathml"), s && s.isCE && (s.ce._teleportTargets || (s.ce._teleportTargets = /* @__PURE__ */ new Set())).add(ce), re || (I(z, ce, Me), Tn(z, !1)));
    }, le = (z) => {
      const re = () => {
        if (Nt.get(z) === re) {
          if (Nt.delete(z), Xt(z.props)) {
            const ce = V(z.el) || n;
            I(z, ce, z.anchor), Tn(z, !0);
          }
          W(z);
        }
      };
      Nt.set(z, re), Le(re, i);
    };
    if (e == null) {
      const z = t.el = P(""), re = t.anchor = P("");
      if (M(z, n, o), M(re, n, o), Ma(t.props) || i && i.pendingBranch) {
        le(t);
        return;
      }
      N && (I(t, n, re), Tn(t, !0)), W();
    } else {
      t.el = e.el;
      const z = t.anchor = e.anchor, re = Nt.get(e);
      if (re) {
        re.flags |= 8, Nt.delete(e), le(t);
        return;
      }
      t.targetStart = e.targetStart;
      const ce = t.target = e.target, Me = t.targetAnchor = e.targetAnchor, S = Xt(e.props), L = S ? n : ce, ee = S ? z : Me;
      if (l === "svg" || gi(ce) ? l = "svg" : (l === "mathml" || vi(ce)) && (l = "mathml"), H ? (y(
        e.dynamicChildren,
        H,
        L,
        s,
        i,
        l,
        r
      ), Vs(e, t, !0)) : u || v(
        e,
        t,
        L,
        ee,
        s,
        i,
        l,
        r,
        !1
      ), N)
        S ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : lo(
          t,
          n,
          z,
          h,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const Oe = ds(t.props, $);
        Oe && (t.target = Oe, lo(
          t,
          Oe,
          null,
          h,
          0
        ));
      } else S && lo(
        t,
        ce,
        Me,
        h,
        1
      );
      Tn(t, N);
    }
  },
  remove(e, t, n, { um: o, o: { remove: s } }, i) {
    const {
      shapeFlag: l,
      children: r,
      anchor: u,
      targetStart: h,
      targetAnchor: d,
      target: v,
      props: y
    } = e, M = Xt(y), $ = i || !M, P = Nt.get(e);
    if (P && (P.flags |= 8, Nt.delete(e)), v && (s(h), s(d)), i && s(u), !P && (M || v) && l & 16)
      for (let j = 0; j < r.length; j++) {
        const V = r[j];
        o(
          V,
          t,
          n,
          $,
          !!V.dynamicChildren
        );
      }
  },
  move: lo,
  hydrate: ka
};
function lo(e, t, n, { o: { insert: o }, m: s }, i = 2) {
  i === 0 && o(e.targetAnchor, t, n);
  const { el: l, anchor: r, shapeFlag: u, children: h, props: d } = e, v = i === 2;
  if (v && o(l, t, n), !Nt.has(e) && (!v || Xt(d)) && u & 16)
    for (let y = 0; y < h.length; y++)
      s(
        h[y],
        t,
        n,
        2
      );
  v && o(r, t, n);
}
function ka(e, t, n, o, s, i, {
  o: { nextSibling: l, parentNode: r, querySelector: u, insert: h, createText: d }
}, v) {
  function y(j, V) {
    let N = V;
    for (; N; ) {
      if (N && N.nodeType === 8) {
        if (N.data === "teleport start anchor")
          t.targetStart = N;
        else if (N.data === "teleport anchor") {
          t.targetAnchor = N, j._lpa = t.targetAnchor && l(t.targetAnchor);
          break;
        }
      }
      N = l(N);
    }
  }
  function M(j, V) {
    V.anchor = v(
      l(j),
      V,
      r(j),
      n,
      o,
      s,
      i
    );
  }
  const $ = t.target = ds(
    t.props,
    u
  ), P = Xt(t.props);
  if ($) {
    const j = $._lpa || $.firstChild;
    t.shapeFlag & 16 && (P ? (M(e, t), y($, j), t.targetAnchor || hs(
      $,
      t,
      d,
      h,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      r(e) === $ ? e : null
    )) : (t.anchor = l(e), y($, j), t.targetAnchor || hs($, t, d, h), v(
      j && l(j),
      t,
      $,
      n,
      o,
      s,
      i
    ))), Tn(t, P);
  } else P && t.shapeFlag & 16 && (M(e, t), t.targetStart = e, t.targetAnchor = l(e));
  return t.anchor && l(t.anchor);
}
const Ea = Oa;
function Tn(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let o, s;
    for (t ? (o = e.el, s = e.anchor) : (o = e.targetStart, s = e.targetAnchor); o && o !== s; )
      o.nodeType === 1 && o.setAttribute("data-v-owner", n.uid), o = o.nextSibling;
    n.ut();
  }
}
function hs(e, t, n, o, s = null) {
  const i = t.targetStart = n(""), l = t.targetAnchor = n("");
  return i[Fl] = l, e && (o(i, e, s), o(l, e, s)), l;
}
const Xo = /* @__PURE__ */ Symbol("_leaveCb");
function Ta(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== bt) {
        t = n;
        break;
      }
  }
  return t;
}
function Pl(e) {
  if (!Ds(e))
    return $o(e.type) && e.children ? Ta(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && q(n.default))
      return n.default();
  }
}
function Ns(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Ns(
      $o(n.type) && Pl(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function $l(e, t) {
  return q(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Fe({ name: e.name }, t, { setup: e })
  ) : e;
}
function Rl(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function mi(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const yo = /* @__PURE__ */ new WeakMap();
function In(e, t, n, o, s = !1) {
  if (U(e)) {
    e.forEach(
      (P, j) => In(
        P,
        t && (U(t) ? t[j] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (un(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && In(e, t, n, o.component.subTree);
    return;
  }
  const i = o.shapeFlag & 4 ? No(o.component) : o.el, l = s ? null : i, { i: r, r: u } = e, h = t && t.r, d = r.refs === fe ? r.refs = {} : r.refs, v = r.setupState, y = /* @__PURE__ */ se(v), M = v === fe ? Zi : (P) => mi(d, P) ? !1 : ie(y, P), $ = (P, j) => !(j && mi(d, j));
  if (h != null && h !== u) {
    if (yi(t), ye(h))
      d[h] = null, M(h) && (v[h] = null);
    else if (/* @__PURE__ */ ke(h)) {
      const P = t;
      $(h, P.k) && (h.value = null), P.k && (d[P.k] = null);
    }
  }
  if (q(u))
    qn(u, r, 12, [l, d]);
  else {
    const P = ye(u), j = /* @__PURE__ */ ke(u);
    if (P || j) {
      const V = () => {
        if (e.f) {
          const N = P ? M(u) ? v[u] : d[u] : $() || !e.k ? u.value : d[e.k];
          if (s)
            U(N) && Ms(N, i);
          else if (U(N))
            N.includes(i) || N.push(i);
          else if (P)
            d[u] = [i], M(u) && (v[u] = d[u]);
          else {
            const H = [i];
            $(u, e.k) && (u.value = H), e.k && (d[e.k] = H);
          }
        } else P ? (d[u] = l, M(u) && (v[u] = l)) : j && ($(u, e.k) && (u.value = l), e.k && (d[e.k] = l));
      };
      if (l) {
        const N = () => {
          V(), yo.delete(e);
        };
        N.id = -1, yo.set(e, N), Le(N, n);
      } else
        yi(e), V();
    }
  }
}
function yi(e) {
  const t = yo.get(e);
  t && (t.flags |= 8, yo.delete(e));
}
Ao().requestIdleCallback;
Ao().cancelIdleCallback;
const un = (e) => !!e.type.__asyncLoader, Ds = (e) => e.type.__isKeepAlive;
function Aa(e, t) {
  Il(e, "a", t);
}
function Fa(e, t) {
  Il(e, "da", t);
}
function Il(e, t, n = Ke) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Ro(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Ds(s.parent.vnode) && Pa(o, t, n, s), s = s.parent;
  }
}
function Pa(e, t, n, o) {
  const s = Ro(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Ls(() => {
    Ms(o[t], s);
  }, n);
}
function Ro(e, t, n = Ke, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...l) => {
      Et();
      const r = Yn(n), u = lt(t, n, e, l);
      return r(), Tt(), u;
    });
    return o ? s.unshift(i) : s.push(i), i;
  }
}
const Ft = (e) => (t, n = Ke) => {
  (!Wn || e === "sp") && Ro(e, (...o) => t(...o), n);
}, $a = Ft("bm"), jl = Ft("m"), Ra = Ft(
  "bu"
), Ia = Ft("u"), ja = Ft(
  "bum"
), Ls = Ft("um"), Na = Ft(
  "sp"
), Da = Ft("rtg"), La = Ft("rtc");
function Ba(e, t = Ke) {
  Ro("ec", e, t);
}
const Ka = /* @__PURE__ */ Symbol.for("v-ndc");
function Qe(e, t, n, o) {
  let s;
  const i = n, l = U(e);
  if (l || ye(e)) {
    const r = l && /* @__PURE__ */ Qt(e);
    let u = !1, h = !1;
    r && (u = !/* @__PURE__ */ Xe(e), h = /* @__PURE__ */ At(e), e = Fo(e)), s = new Array(e.length);
    for (let d = 0, v = e.length; d < v; d++)
      s[d] = t(
        u ? h ? fn(it(e[d])) : it(e[d]) : e[d],
        d,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let r = 0; r < e; r++)
      s[r] = t(r + 1, r, void 0, i);
  } else if (ue(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (r, u) => t(r, u, void 0, i)
      );
    else {
      const r = Object.keys(e);
      s = new Array(r.length);
      for (let u = 0, h = r.length; u < h; u++) {
        const d = r[u];
        s[u] = t(e[d], d, u, i);
      }
    }
  else
    s = [];
  return s;
}
function Va(e, t, n, o, s, i) {
  if (n == null && (n = {}), je.ce || je.parent && un(je.parent) && je.parent.ce) {
    const h = n, d = Object.keys(h).length > 0;
    return J(), Hn(
      he,
      null,
      [yt("slot", h, o)],
      d ? -2 : 64
    );
  }
  let l = e[t];
  l && l._c && (l._d = !1);
  const r = kt.length;
  J();
  let u;
  try {
    const h = l && Nl(l(n)), d = n.key || i || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    h && h.key;
    u = Hn(
      he,
      {
        key: (d && !st(d) ? d : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!h && o ? "_fb" : "")
      },
      h || (o ? o() : []),
      h && e._ === 1 ? 64 : -2
    );
  } catch (h) {
    for (let d = kt.length; d > r; d--) Hs();
    throw h;
  } finally {
    l && l._c && (l._d = !0);
  }
  return u;
}
function Nl(e) {
  return e.some((t) => Us(t) ? !(t.type === bt || t.type === he && !Nl(t.children)) : !0) ? e : null;
}
const ps = (e) => e ? nr(e) ? No(e) : ps(e.parent) : null, jn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Fe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ps(e.parent),
    $root: (e) => ps(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ll(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      js(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Bt.bind(e.proxy)),
    $watch: (e) => Sa.bind(e)
  })
), Zo = (e, t) => e !== fe && !e.__isScriptSetup && ie(e, t), Ha = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: i, accessCache: l, type: r, appContext: u } = e;
    if (t[0] !== "$") {
      const y = l[t];
      if (y !== void 0)
        switch (y) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (Zo(o, t))
          return l[t] = 1, o[t];
        if (s !== fe && ie(s, t))
          return l[t] = 2, s[t];
        if (ie(i, t))
          return l[t] = 3, i[t];
        if (n !== fe && ie(n, t))
          return l[t] = 4, n[t];
        gs && (l[t] = 0);
      }
    }
    const h = jn[t];
    let d, v;
    if (h)
      return t === "$attrs" && Ie(e.attrs, "get", ""), h(e);
    if (
      // css module (injected by vue-loader)
      (d = r.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== fe && ie(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      v = u.config.globalProperties, ie(v, t)
    )
      return v[t];
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: i } = e;
    return Zo(s, t) ? (s[t] = n, !0) : o !== fe && ie(o, t) ? (o[t] = n, !0) : ie(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, props: i, type: l }
  }, r) {
    let u;
    return !!(n[r] || e !== fe && r[0] !== "$" && ie(e, r) || Zo(t, r) || ie(i, r) || ie(o, r) || ie(jn, r) || ie(s.config.globalProperties, r) || (u = l.__cssModules) && u[r]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ie(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function bi(e) {
  return U(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let gs = !0;
function Ua(e) {
  const t = Ll(e), n = e.proxy, o = e.ctx;
  gs = !1, t.beforeCreate && wi(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: i,
    methods: l,
    watch: r,
    provide: u,
    inject: h,
    // lifecycle
    created: d,
    beforeMount: v,
    mounted: y,
    beforeUpdate: M,
    updated: $,
    activated: P,
    deactivated: j,
    beforeDestroy: V,
    beforeUnmount: N,
    destroyed: H,
    unmounted: I,
    render: W,
    renderTracked: le,
    renderTriggered: z,
    errorCaptured: re,
    serverPrefetch: ce,
    // public API
    expose: Me,
    inheritAttrs: S,
    // assets
    components: L,
    directives: ee,
    filters: Oe
  } = t;
  if (h && Wa(h, o, null), l)
    for (const Q in l) {
      const ne = l[Q];
      q(ne) && (o[Q] = ne.bind(n));
    }
  if (s) {
    const Q = s.call(n, n);
    ue(Q) && (e.data = /* @__PURE__ */ $s(Q));
  }
  if (gs = !0, i)
    for (const Q in i) {
      const ne = i[Q], Ze = q(ne) ? ne.bind(n, n) : q(ne.get) ? ne.get.bind(n, n) : mt, Pt = !q(ne) && q(ne.set) ? ne.set.bind(n) : mt, wt = Ve({
        get: Ze,
        set: Pt
      });
      Object.defineProperty(o, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => wt.value,
        set: (He) => wt.value = He
      });
    }
  if (r)
    for (const Q in r)
      Dl(r[Q], o, n, Q);
  if (u) {
    const Q = q(u) ? u.call(n) : u;
    Reflect.ownKeys(Q).forEach((ne) => {
      xa(ne, Q[ne]);
    });
  }
  d && wi(d, e, "c");
  function Se(Q, ne) {
    U(ne) ? ne.forEach((Ze) => Q(Ze.bind(n))) : ne && Q(ne.bind(n));
  }
  if (Se($a, v), Se(jl, y), Se(Ra, M), Se(Ia, $), Se(Aa, P), Se(Fa, j), Se(Ba, re), Se(La, le), Se(Da, z), Se(ja, N), Se(Ls, I), Se(Na, ce), U(Me))
    if (Me.length) {
      const Q = e.exposed || (e.exposed = {});
      Me.forEach((ne) => {
        Object.defineProperty(Q, ne, {
          get: () => n[ne],
          set: (Ze) => n[ne] = Ze,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  W && e.render === mt && (e.render = W), S != null && (e.inheritAttrs = S), L && (e.components = L), ee && (e.directives = ee), ce && Rl(e);
}
function Wa(e, t, n = mt) {
  U(e) && (e = vs(e));
  for (const o in e) {
    const s = e[o];
    let i;
    ue(s) ? "default" in s ? i = ho(
      s.from || o,
      s.default,
      !0
    ) : i = ho(s.from || o) : i = ho(s), /* @__PURE__ */ ke(i) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[o] = i;
  }
}
function wi(e, t, n) {
  lt(
    U(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Dl(e, t, n, o) {
  let s = o.includes(".") ? Al(n, o) : () => n[o];
  if (ye(e)) {
    const i = t[e];
    q(i) && Go(s, i);
  } else if (q(e))
    Go(s, e.bind(n));
  else if (ue(e))
    if (U(e))
      e.forEach((i) => Dl(i, t, n, o));
    else {
      const i = q(e.handler) ? e.handler.bind(n) : t[e.handler];
      q(i) && Go(s, i, e);
    }
}
function Ll(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: i,
    config: { optionMergeStrategies: l }
  } = e.appContext, r = i.get(t);
  let u;
  return r ? u = r : !s.length && !n && !o ? u = t : (u = {}, s.length && s.forEach(
    (h) => bo(u, h, l, !0)
  ), bo(u, t, l)), ue(t) && i.set(t, u), u;
}
function bo(e, t, n, o = !1) {
  const { mixins: s, extends: i } = t;
  i && bo(e, i, n, !0), s && s.forEach(
    (l) => bo(e, l, n, !0)
  );
  for (const l in t)
    if (!(o && l === "expose")) {
      const r = Ja[l] || n && n[l];
      e[l] = r ? r(e[l], t[l]) : t[l];
    }
  return e;
}
const Ja = {
  data: xi,
  props: _i,
  emits: _i,
  // objects
  methods: An,
  computed: An,
  // lifecycle
  beforeCreate: De,
  created: De,
  beforeMount: De,
  mounted: De,
  beforeUpdate: De,
  updated: De,
  beforeDestroy: De,
  beforeUnmount: De,
  destroyed: De,
  unmounted: De,
  activated: De,
  deactivated: De,
  errorCaptured: De,
  serverPrefetch: De,
  // assets
  components: An,
  directives: An,
  // watch
  watch: qa,
  // provide / inject
  provide: xi,
  inject: za
};
function xi(e, t) {
  return t ? e ? function() {
    return Fe(
      q(e) ? e.call(this, this) : e,
      q(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function za(e, t) {
  return An(vs(e), vs(t));
}
function vs(e) {
  if (U(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function De(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function An(e, t) {
  return e ? Fe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function _i(e, t) {
  return e ? U(e) && U(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Fe(
    /* @__PURE__ */ Object.create(null),
    bi(e),
    bi(t ?? {})
  ) : t;
}
function qa(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Fe(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = De(e[o], t[o]);
  return n;
}
function Bl() {
  return {
    app: null,
    config: {
      isNativeTag: Zi,
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
let Ya = 0;
function Ga(e, t) {
  return function(o, s = null) {
    q(o) || (o = Fe({}, o)), s != null && !ue(s) && (s = null);
    const i = Bl(), l = /* @__PURE__ */ new WeakSet(), r = [];
    let u = !1;
    const h = i.app = {
      _uid: Ya++,
      _component: o,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Ou,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...v) {
        return l.has(d) || (d && q(d.install) ? (l.add(d), d.install(h, ...v)) : q(d) && (l.add(d), d(h, ...v))), h;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), h;
      },
      component(d, v) {
        return v ? (i.components[d] = v, h) : i.components[d];
      },
      directive(d, v) {
        return v ? (i.directives[d] = v, h) : i.directives[d];
      },
      mount(d, v, y) {
        if (!u) {
          const M = h._ceVNode || yt(o, s);
          return M.appContext = i, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(M, d, y), u = !0, h._container = d, d.__vue_app__ = h, No(M.component);
        }
      },
      onUnmount(d) {
        r.push(d);
      },
      unmount() {
        u && (lt(
          r,
          h._instance,
          16
        ), e(null, h._container), delete h._container.__vue_app__);
      },
      provide(d, v) {
        return i.provides[d] = v, h;
      },
      runWithContext(d) {
        const v = cn;
        cn = h;
        try {
          return d();
        } finally {
          cn = v;
        }
      }
    };
    return h;
  };
}
let cn = null;
const Xa = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${nt(t)}Modifiers`] || e[`${Ut(t)}Modifiers`];
function Za(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || fe;
  let s = n;
  const i = t.startsWith("update:"), l = i && Xa(o, t.slice(7));
  l && (l.trim && (s = n.map((d) => ye(d) ? d.trim() : d)), l.number && (s = n.map(To)));
  let r, u = o[r = Wo(t)] || // also try camelCase event handler (#2249)
  o[r = Wo(nt(t))];
  !u && i && (u = o[r = Wo(Ut(t))]), u && lt(
    u,
    e,
    6,
    s
  );
  const h = o[r + "Once"];
  if (h) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[r])
      return;
    e.emitted[r] = !0, lt(
      h,
      e,
      6,
      s
    );
  }
}
const Qa = /* @__PURE__ */ new WeakMap();
function Kl(e, t, n = !1) {
  const o = n ? Qa : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const i = e.emits;
  let l = {}, r = !1;
  if (!q(e)) {
    const u = (h) => {
      const d = Kl(h, t, !0);
      d && (r = !0, Fe(l, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !r ? (ue(e) && o.set(e, null), null) : (U(i) ? i.forEach((u) => l[u] = null) : Fe(l, i), ue(e) && o.set(e, l), l);
}
function Io(e, t) {
  return !e || !Oo(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ie(e, t[0].toLowerCase() + t.slice(1)) || ie(e, Ut(t)) || ie(e, t));
}
function Ci(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    propsOptions: [i],
    slots: l,
    attrs: r,
    emit: u,
    render: h,
    renderCache: d,
    props: v,
    data: y,
    setupState: M,
    ctx: $,
    inheritAttrs: P
  } = e, j = mo(e);
  let V, N;
  try {
    if (n.shapeFlag & 4) {
      const I = s || o, W = I;
      V = ht(
        h.call(
          W,
          I,
          d,
          v,
          M,
          y,
          $
        )
      ), N = r;
    } else {
      const I = t;
      V = ht(
        I.length > 1 ? I(
          v,
          { attrs: r, slots: l, emit: u }
        ) : I(
          v,
          null
        )
      ), N = t.props ? r : eu(r);
    }
  } catch (I) {
    kt.length = 0, Po(I, e, 1), V = yt(bt);
  }
  let H = V;
  if (N && P !== !1) {
    const I = Object.keys(N), { shapeFlag: W } = H;
    I.length && W & 7 && (i && I.some(ko) && (N = tu(
      N,
      i
    )), H = dn(H, N, !1, !0));
  }
  if (n.dirs && (H = dn(H, null, !1, !0), H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const I = $o(H.type) && Pl(H) || H;
    Ns(I, n.transition);
  }
  return V = H, mo(j), V;
}
const eu = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Oo(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, tu = (e, t) => {
  const n = {};
  for (const o in e)
    (!ko(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
};
function nu(e, t, n) {
  const { props: o, children: s, component: i } = e, { props: l, children: r, patchFlag: u } = t, h = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? Si(o, l, h) : !!l;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let v = 0; v < d.length; v++) {
        const y = d[v];
        if (Vl(l, o, y) && !Io(h, y))
          return !0;
      }
    }
  } else
    return (s || r) && (!r || !r.$stable) ? !0 : o === l ? !1 : o ? l ? Si(o, l, h) : !0 : !!l;
  return !1;
}
function Si(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    if (Vl(t, e, i) && !Io(n, i))
      return !0;
  }
  return !1;
}
function Vl(e, t, n) {
  const o = e[n], s = t[n];
  return n === "style" && ue(o) && ue(s) ? !gn(o, s) : o !== s;
}
function ou({ vnode: e, parent: t, suspense: n }, o) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.suspense.vnode.el = s.el = o, e = s), s === e)
      (e = t.vnode).el = o, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = o);
}
const Hl = {}, Ul = () => Object.create(Hl), Wl = (e) => Object.getPrototypeOf(e) === Hl;
function su(e, t, n, o = !1) {
  const s = {}, i = Ul();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Jl(e, t, s, i);
  for (const l in e.propsOptions[0])
    l in s || (s[l] = void 0);
  n ? e.props = o ? s : /* @__PURE__ */ ua(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function iu(e, t, n, o) {
  const {
    props: s,
    attrs: i,
    vnode: { patchFlag: l }
  } = e, r = /* @__PURE__ */ se(s), [u] = e.propsOptions;
  let h = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const d = e.vnode.dynamicProps;
      for (let v = 0; v < d.length; v++) {
        let y = d[v];
        if (Io(e.emitsOptions, y))
          continue;
        const M = t[y];
        if (u)
          if (ie(i, y))
            M !== i[y] && (i[y] = M, h = !0);
          else {
            const $ = nt(y);
            s[$] = ms(
              u,
              r,
              $,
              M,
              e,
              !1
            );
          }
        else
          M !== i[y] && (i[y] = M, h = !0);
      }
    }
  } else {
    Jl(e, t, s, i) && (h = !0);
    let d;
    for (const v in r)
      (!t || // for camelCase
      !ie(t, v) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Ut(v)) === v || !ie(t, d))) && (u ? n && // for camelCase
      (n[v] !== void 0 || // for kebab-case
      n[d] !== void 0) && (s[v] = ms(
        u,
        r,
        v,
        void 0,
        e,
        !0
      )) : delete s[v]);
    if (i !== r)
      for (const v in i)
        (!t || !ie(t, v)) && (delete i[v], h = !0);
  }
  h && Mt(e.attrs, "set", "");
}
function Jl(e, t, n, o) {
  const [s, i] = e.propsOptions;
  let l = !1, r;
  if (t)
    for (let u in t) {
      if (Pn(u))
        continue;
      const h = t[u];
      let d;
      s && ie(s, d = nt(u)) ? !i || !i.includes(d) ? n[d] = h : (r || (r = {}))[d] = h : Io(e.emitsOptions, u) || (!(u in o) || h !== o[u]) && (o[u] = h, l = !0);
    }
  if (i) {
    const u = /* @__PURE__ */ se(n), h = r || fe;
    for (let d = 0; d < i.length; d++) {
      const v = i[d];
      n[v] = ms(
        s,
        u,
        v,
        h[v],
        e,
        !ie(h, v)
      );
    }
  }
  return l;
}
function ms(e, t, n, o, s, i) {
  const l = e[n];
  if (l != null) {
    const r = ie(l, "default");
    if (r && o === void 0) {
      const u = l.default;
      if (l.type !== Function && !l.skipFactory && q(u)) {
        const { propsDefaults: h } = s;
        if (n in h)
          o = h[n];
        else {
          const d = Yn(s);
          o = h[n] = u.call(
            null,
            t
          ), d();
        }
      } else
        o = u;
      s.ce && s.ce._setProp(n, o);
    }
    l[
      0
      /* shouldCast */
    ] && (i && !r ? o = !1 : l[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Ut(n)) && (o = !0));
  }
  return o;
}
const lu = /* @__PURE__ */ new WeakMap();
function zl(e, t, n = !1) {
  const o = n ? lu : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const i = e.props, l = {}, r = [];
  let u = !1;
  if (!q(e)) {
    const d = (v) => {
      u = !0;
      const [y, M] = zl(v, t, !0);
      Fe(l, y), M && r.push(...M);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !u)
    return ue(e) && o.set(e, ln), ln;
  if (U(i))
    for (let d = 0; d < i.length; d++) {
      const v = nt(i[d]);
      Mi(v) && (l[v] = fe);
    }
  else if (i)
    for (const d in i) {
      const v = nt(d);
      if (Mi(v)) {
        const y = i[d], M = l[v] = U(y) || q(y) ? { type: y } : Fe({}, y), $ = M.type;
        let P = !1, j = !0;
        if (U($))
          for (let V = 0; V < $.length; ++V) {
            const N = $[V], H = q(N) && N.name;
            if (H === "Boolean") {
              P = !0;
              break;
            } else H === "String" && (j = !1);
          }
        else
          P = q($) && $.name === "Boolean";
        M[
          0
          /* shouldCast */
        ] = P, M[
          1
          /* shouldCastTrue */
        ] = j, (P || ie(M, "default")) && r.push(v);
      }
    }
  const h = [l, r];
  return ue(e) && o.set(e, h), h;
}
function Mi(e) {
  return e[0] !== "$" && !Pn(e);
}
const Bs = (e) => e === "_" || e === "_ctx" || e === "$stable", Ks = (e) => U(e) ? e.map(ht) : [ht(e)], ru = (e, t, n) => {
  if (t._n)
    return t;
  const o = El((...s) => Ks(t(...s)), n);
  return o._c = !1, o;
}, ql = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Bs(s)) continue;
    const i = e[s];
    if (q(i))
      t[s] = ru(s, i, o);
    else if (i != null) {
      const l = Ks(i);
      t[s] = () => l;
    }
  }
}, Yl = (e, t) => {
  const n = Ks(t);
  e.slots.default = () => n;
}, Gl = (e, t, n) => {
  for (const o in t)
    (n || !Bs(o)) && (e[o] = t[o]);
}, au = (e, t, n) => {
  const o = e.slots = Ul();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Gl(o, t, n), n && ol(o, "_", s, !0)) : ql(t, o);
  } else t && Yl(e, t);
}, uu = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let i = !0, l = fe;
  if (o.shapeFlag & 32) {
    const r = t._;
    r ? n && r === 1 ? i = !1 : Gl(s, t, n) : (i = !t.$stable, ql(t, s)), l = t;
  } else t && (Yl(e, t), l = { default: 1 });
  if (i)
    for (const r in s)
      !Bs(r) && l[r] == null && delete s[r];
}, Le = pu;
function cu(e) {
  return fu(e);
}
function fu(e, t) {
  const n = Ao();
  n.__VUE__ = !0;
  const {
    insert: o,
    remove: s,
    patchProp: i,
    createElement: l,
    createText: r,
    createComment: u,
    setText: h,
    setElementText: d,
    parentNode: v,
    nextSibling: y,
    setScopeId: M = mt,
    insertStaticContent: $
  } = e, P = (p, g, b, O = null, x = null, C = null, F = void 0, A = null, E = !!g.dynamicChildren) => {
    if (p === g)
      return;
    p && !Mn(p, g) && (O = Jt(p), He(p, x, C, !0), p = null), g.patchFlag === -2 && (E = !1, g.dynamicChildren = null);
    const { type: _, ref: D, shapeFlag: R } = g;
    switch (_) {
      case jo:
        j(p, g, b, O);
        break;
      case bt:
        V(p, g, b, O);
        break;
      case es:
        p == null && N(g, b, O, F);
        break;
      case he:
        L(
          p,
          g,
          b,
          O,
          x,
          C,
          F,
          A,
          E
        );
        break;
      default:
        R & 1 ? W(
          p,
          g,
          b,
          O,
          x,
          C,
          F,
          A,
          E
        ) : R & 6 ? ee(
          p,
          g,
          b,
          O,
          x,
          C,
          F,
          A,
          E
        ) : (R & 64 || R & 128) && _.process(
          p,
          g,
          b,
          O,
          x,
          C,
          F,
          A,
          E,
          rt
        );
    }
    D != null && x ? In(D, p && p.ref, C, g || p, !g) : D == null && p && p.ref != null && In(p.ref, null, C, p, !0);
  }, j = (p, g, b, O) => {
    if (p == null)
      o(
        g.el = r(g.children),
        b,
        O
      );
    else {
      const x = g.el = p.el;
      g.children !== p.children && h(x, g.children);
    }
  }, V = (p, g, b, O) => {
    p == null ? o(
      g.el = u(g.children || ""),
      b,
      O
    ) : g.el = p.el;
  }, N = (p, g, b, O) => {
    [p.el, p.anchor] = $(
      p.children,
      g,
      b,
      O,
      p.el,
      p.anchor
    );
  }, H = ({ el: p, anchor: g }, b, O) => {
    let x;
    for (; p && p !== g; )
      x = y(p), o(p, b, O), p = x;
    o(g, b, O);
  }, I = ({ el: p, anchor: g }) => {
    let b;
    for (; p && p !== g; )
      b = y(p), s(p), p = b;
    s(g);
  }, W = (p, g, b, O, x, C, F, A, E) => {
    if (g.type === "svg" ? F = "svg" : g.type === "math" && (F = "mathml"), p == null)
      le(
        g,
        b,
        O,
        x,
        C,
        F,
        A,
        E
      );
    else {
      const _ = p.el && p.el._isVueCE ? p.el : null;
      try {
        _ && _._beginPatch(), ce(
          p,
          g,
          x,
          C,
          F,
          A,
          E
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, le = (p, g, b, O, x, C, F, A) => {
    let E, _;
    const { props: D, shapeFlag: R, transition: k, dirs: K } = p;
    if (E = p.el = l(
      p.type,
      C,
      D && D.is,
      D
    ), R & 8 ? d(E, p.children) : R & 16 && re(
      p.children,
      E,
      null,
      O,
      x,
      Qo(p, C),
      F,
      A
    ), K && qt(p, null, O, "created"), z(E, p, p.scopeId, F, O), D) {
      for (const oe in D)
        oe !== "value" && !Pn(oe) && i(E, oe, null, D[oe], C, O);
      "value" in D && i(E, "value", null, D.value, C), (_ = D.onVnodeBeforeMount) && ct(_, O, p);
    }
    K && qt(p, null, O, "beforeMount");
    const Z = du(x, k);
    Z && k.beforeEnter(E), o(E, g, b), ((_ = D && D.onVnodeMounted) || Z || K) && Le(() => {
      _ && ct(_, O, p), Z && k.enter(E), K && qt(p, null, O, "mounted");
    }, x);
  }, z = (p, g, b, O, x) => {
    if (b && M(p, b), O)
      for (let C = 0; C < O.length; C++)
        M(p, O[C]);
    if (x) {
      let C = x.subTree;
      if (g === C || Ql(C.type) && (C.ssContent === g || C.ssFallback === g)) {
        const F = x.vnode;
        z(
          p,
          F,
          F.scopeId,
          F.slotScopeIds,
          x.parent
        );
      }
    }
  }, re = (p, g, b, O, x, C, F, A, E = 0) => {
    for (let _ = E; _ < p.length; _++) {
      const D = p[_] = A ? St(p[_]) : ht(p[_]);
      P(
        null,
        D,
        g,
        b,
        O,
        x,
        C,
        F,
        A
      );
    }
  }, ce = (p, g, b, O, x, C, F) => {
    const A = g.el = p.el;
    let { patchFlag: E, dynamicChildren: _, dirs: D } = g;
    E |= p.patchFlag & 16;
    const R = p.props || fe, k = g.props || fe;
    let K;
    if (b && Yt(b, !1), (K = k.onVnodeBeforeUpdate) && ct(K, b, g, p), D && qt(g, p, b, "beforeUpdate"), b && Yt(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!p.dynamicChildren || p.dynamicChildren.length !== _.length) && (E = 0, F = !1, _ = null), (R.innerHTML && k.innerHTML == null || R.textContent && k.textContent == null) && d(A, ""), _ ? Me(
      p.dynamicChildren,
      _,
      A,
      b,
      O,
      Qo(g, x),
      C
    ) : F || ne(
      p,
      g,
      A,
      null,
      b,
      O,
      Qo(g, x),
      C,
      !1
    ), E > 0) {
      if (E & 16)
        S(A, R, k, b, x);
      else if (E & 2 && R.class !== k.class && i(A, "class", null, k.class, x), E & 4 && i(A, "style", R.style, k.style, x), E & 8) {
        const Z = g.dynamicProps;
        for (let oe = 0; oe < Z.length; oe++) {
          const te = Z[oe], ve = R[te], pe = k[te];
          (pe !== ve || te === "value") && i(A, te, ve, pe, x, b);
        }
      }
      E & 1 && p.children !== g.children && d(A, g.children);
    } else !F && _ == null && S(A, R, k, b, x);
    ((K = k.onVnodeUpdated) || D) && Le(() => {
      K && ct(K, b, g, p), D && qt(g, p, b, "updated");
    }, O);
  }, Me = (p, g, b, O, x, C, F) => {
    for (let A = 0; A < g.length; A++) {
      const E = p[A], _ = g[A], D = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === he || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Mn(E, _) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 198) ? v(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      P(
        E,
        _,
        D,
        null,
        O,
        x,
        C,
        F,
        !0
      );
    }
  }, S = (p, g, b, O, x) => {
    if (g !== b) {
      if (g !== fe)
        for (const C in g)
          !Pn(C) && !(C in b) && i(
            p,
            C,
            g[C],
            null,
            x,
            O
          );
      for (const C in b) {
        if (Pn(C)) continue;
        const F = b[C], A = g[C];
        F !== A && C !== "value" && i(p, C, A, F, x, O);
      }
      "value" in b && i(p, "value", g.value, b.value, x);
    }
  }, L = (p, g, b, O, x, C, F, A, E) => {
    const _ = g.el = p ? p.el : r(""), D = g.anchor = p ? p.anchor : r("");
    let { patchFlag: R, dynamicChildren: k, slotScopeIds: K } = g;
    K && (A = A ? A.concat(K) : K), p == null ? (o(_, b, O), o(D, b, O), re(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      b,
      D,
      x,
      C,
      F,
      A,
      E
    )) : R > 0 && R & 64 && k && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === k.length ? (Me(
      p.dynamicChildren,
      k,
      b,
      x,
      C,
      F,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || x && g === x.subTree) && Vs(
      p,
      g,
      !0
      /* shallow */
    )) : ne(
      p,
      g,
      b,
      D,
      x,
      C,
      F,
      A,
      E
    );
  }, ee = (p, g, b, O, x, C, F, A, E) => {
    g.slotScopeIds = A, p == null ? g.shapeFlag & 512 ? x.ctx.activate(
      g,
      b,
      O,
      F,
      E
    ) : Oe(
      g,
      b,
      O,
      x,
      C,
      F,
      E
    ) : Pe(p, g, E);
  }, Oe = (p, g, b, O, x, C, F) => {
    const A = p.component = bu(
      p,
      O,
      x
    );
    if (Ds(p) && (A.ctx.renderer = rt), xu(A, !1, F), A.asyncDep) {
      if (x && x.registerDep(A, Se, F), !p.el) {
        const E = A.subTree = yt(bt);
        V(null, E, g, b), p.placeholder = E.el;
      }
    } else
      Se(
        A,
        p,
        g,
        b,
        x,
        C,
        F
      );
  }, Pe = (p, g, b) => {
    const O = g.component = p.component;
    if (nu(p, g, b))
      if (O.asyncDep && !O.asyncResolved) {
        Q(O, g, b);
        return;
      } else
        O.next = g, O.update();
    else
      g.el = p.el, O.vnode = g;
  }, Se = (p, g, b, O, x, C, F) => {
    const A = () => {
      if (p.isMounted) {
        let { next: R, bu: k, u: K, parent: Z, vnode: oe } = p;
        {
          const Ne = Xl(p);
          if (Ne) {
            R && (R.el = oe.el, Q(p, R, F)), Ne.asyncDep.then(() => {
              Le(() => {
                p.isUnmounted || _();
              }, x);
            });
            return;
          }
        }
        let te = R, ve;
        Yt(p, !1), R ? (R.el = oe.el, Q(p, R, F)) : R = oe, k && fo(k), (ve = R.props && R.props.onVnodeBeforeUpdate) && ct(ve, Z, R, oe), Yt(p, !0);
        const pe = Ci(p), ge = p.subTree;
        p.subTree = pe, P(
          ge,
          pe,
          // parent may have changed if it's in a teleport
          v(ge.el),
          // anchor may have changed if it's in a fragment
          Jt(ge),
          p,
          x,
          C
        ), R.el = pe.el, te === null && ou(p, pe.el), K && Le(K, x), (ve = R.props && R.props.onVnodeUpdated) && Le(
          () => ct(ve, Z, R, oe),
          x
        );
      } else {
        let R;
        const { el: k, props: K } = g, { bm: Z, m: oe, parent: te, root: ve, type: pe } = p, ge = un(g);
        Yt(p, !1), Z && fo(Z), !ge && (R = K && K.onVnodeBeforeMount) && ct(R, te, g), Yt(p, !0);
        {
          ve.ce && ve.ce._hasShadowRoot() && ve.ce._injectChildStyle(
            pe,
            p.parent ? p.parent.type : void 0
          );
          const Ne = p.subTree = Ci(p);
          P(
            null,
            Ne,
            b,
            O,
            p,
            x,
            C
          ), g.el = Ne.el;
        }
        if (oe && Le(oe, x), !ge && (R = K && K.onVnodeMounted)) {
          const Ne = g;
          Le(
            () => ct(R, te, Ne),
            x
          );
        }
        (g.shapeFlag & 256 || te && un(te.vnode) && te.vnode.shapeFlag & 256) && p.a && Le(p.a, x), p.isMounted = !0, g = b = O = null;
      }
    };
    p.scope.on();
    const E = p.effect = new rl(A);
    p.scope.off();
    const _ = p.update = E.run.bind(E), D = p.job = E.runIfDirty.bind(E);
    D.i = p, D.id = p.uid, E.scheduler = () => js(D), Yt(p, !0), _();
  }, Q = (p, g, b) => {
    g.component = p;
    const O = p.vnode.props;
    p.vnode = g, p.next = null, iu(p, g.props, O, b), uu(p, g.children, b), Et(), pi(p), Tt();
  }, ne = (p, g, b, O, x, C, F, A, E = !1) => {
    const _ = p && p.children, D = p ? p.shapeFlag : 0, R = g.children, { patchFlag: k, shapeFlag: K } = g;
    if (k > 0) {
      if (k & 128) {
        Pt(
          _,
          R,
          b,
          O,
          x,
          C,
          F,
          A,
          E
        );
        return;
      } else if (k & 256) {
        Ze(
          _,
          R,
          b,
          O,
          x,
          C,
          F,
          A,
          E
        );
        return;
      }
    }
    K & 8 ? (D & 16 && Wt(_, x, C), R !== _ && d(b, R)) : D & 16 ? K & 16 ? Pt(
      _,
      R,
      b,
      O,
      x,
      C,
      F,
      A,
      E
    ) : Wt(_, x, C, !0) : (D & 8 && d(b, ""), K & 16 && re(
      R,
      b,
      O,
      x,
      C,
      F,
      A,
      E
    ));
  }, Ze = (p, g, b, O, x, C, F, A, E) => {
    p = p || ln, g = g || ln;
    const _ = p.length, D = g.length, R = Math.min(_, D);
    let k;
    for (k = 0; k < R; k++) {
      const K = g[k] = E ? St(g[k]) : ht(g[k]);
      P(
        p[k],
        K,
        b,
        null,
        x,
        C,
        F,
        A,
        E
      );
    }
    _ > D ? Wt(
      p,
      x,
      C,
      !0,
      !1,
      R
    ) : re(
      g,
      b,
      O,
      x,
      C,
      F,
      A,
      E,
      R
    );
  }, Pt = (p, g, b, O, x, C, F, A, E) => {
    let _ = 0;
    const D = g.length;
    let R = p.length - 1, k = D - 1;
    for (; _ <= R && _ <= k; ) {
      const K = p[_], Z = g[_] = E ? St(g[_]) : ht(g[_]);
      if (Mn(K, Z))
        P(
          K,
          Z,
          b,
          null,
          x,
          C,
          F,
          A,
          E
        );
      else
        break;
      _++;
    }
    for (; _ <= R && _ <= k; ) {
      const K = p[R], Z = g[k] = E ? St(g[k]) : ht(g[k]);
      if (Mn(K, Z))
        P(
          K,
          Z,
          b,
          null,
          x,
          C,
          F,
          A,
          E
        );
      else
        break;
      R--, k--;
    }
    if (_ > R) {
      if (_ <= k) {
        const K = k + 1, Z = K < D ? g[K].el : O;
        for (; _ <= k; )
          P(
            null,
            g[_] = E ? St(g[_]) : ht(g[_]),
            b,
            Z,
            x,
            C,
            F,
            A,
            E
          ), _++;
      }
    } else if (_ > k)
      for (; _ <= R; )
        He(p[_], x, C, !0), _++;
    else {
      const K = _, Z = _, oe = /* @__PURE__ */ new Map();
      for (_ = Z; _ <= k; _++) {
        const be = g[_] = E ? St(g[_]) : ht(g[_]);
        be.key != null && oe.set(be.key, _);
      }
      let te, ve = 0;
      const pe = k - Z + 1;
      let ge = !1, Ne = 0;
      const $t = new Array(pe);
      for (_ = 0; _ < pe; _++) $t[_] = 0;
      for (_ = K; _ <= R; _++) {
        const be = p[_];
        if (ve >= pe) {
          He(be, x, C, !0);
          continue;
        }
        let qe;
        if (be.key != null)
          qe = oe.get(be.key);
        else
          for (te = Z; te <= k; te++)
            if ($t[te - Z] === 0 && Mn(be, g[te])) {
              qe = te;
              break;
            }
        qe === void 0 ? He(be, x, C, !0) : ($t[qe - Z] = _ + 1, qe >= Ne ? Ne = qe : ge = !0, P(
          be,
          g[qe],
          b,
          null,
          x,
          C,
          F,
          A,
          E
        ), ve++);
      }
      const zt = ge ? hu($t) : ln;
      for (te = zt.length - 1, _ = pe - 1; _ >= 0; _--) {
        const be = Z + _, qe = g[be], xt = g[be + 1], Ue = be + 1 < D ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          xt.el || Zl(xt)
        ) : O;
        $t[_] === 0 ? P(
          null,
          qe,
          b,
          Ue,
          x,
          C,
          F,
          A,
          E
        ) : ge && (te < 0 || _ !== zt[te] ? wt(qe, b, Ue, 2) : te--);
      }
    }
  }, wt = (p, g, b, O, x = null) => {
    const { el: C, type: F, transition: A, children: E, shapeFlag: _ } = p;
    if (_ & 6) {
      wt(p.component.subTree, g, b, O);
      return;
    }
    if (_ & 128) {
      p.suspense.move(g, b, O);
      return;
    }
    if (_ & 64) {
      F.move(p, g, b, rt);
      return;
    }
    if (F === he) {
      o(C, g, b);
      for (let R = 0; R < E.length; R++)
        wt(E[R], g, b, O);
      o(p.anchor, g, b);
      return;
    }
    if (F === es) {
      H(p, g, b);
      return;
    }
    if (O !== 2 && _ & 1 && A)
      if (O === 0)
        A.persisted && !C[Xo] ? o(C, g, b) : (A.beforeEnter(C), o(C, g, b), Le(() => A.enter(C), x));
      else {
        const { leave: R, delayLeave: k, afterLeave: K } = A, Z = () => {
          p.ctx.isUnmounted ? s(C) : o(C, g, b);
        }, oe = () => {
          const te = C._isLeaving || !!C[Xo];
          C._isLeaving && C[Xo](
            !0
            /* cancelled */
          ), A.persisted && !te ? Z() : R(C, () => {
            Z(), K && K();
          });
        };
        k ? k(C, Z, oe) : oe();
      }
    else
      o(C, g, b);
  }, He = (p, g, b, O = !1, x = !1) => {
    const {
      type: C,
      props: F,
      ref: A,
      children: E,
      dynamicChildren: _,
      shapeFlag: D,
      patchFlag: R,
      dirs: k,
      cacheIndex: K,
      memo: Z
    } = p;
    if (R === -2 && (x = !1), A != null && (Et(), In(A, null, b, p, !0), Tt()), K != null && (g.renderCache[K] = void 0), D & 256) {
      g.ctx.deactivate(p);
      return;
    }
    const oe = D & 1 && k, te = !un(p);
    let ve;
    if (te && (ve = F && F.onVnodeBeforeUnmount) && ct(ve, g, p), D & 6)
      Lo(p.component, b, O);
    else {
      if (D & 128) {
        p.suspense.unmount(b, O);
        return;
      }
      oe && qt(p, null, g, "beforeUnmount"), D & 64 ? p.type.remove(
        p,
        g,
        b,
        rt,
        O
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== he || R > 0 && R & 64) ? Wt(
        _,
        g,
        b,
        !1,
        !0
      ) : (C === he && R & 384 || !x && D & 16) && Wt(E, g, b), O && vn(p);
    }
    const pe = Z != null && K == null;
    (te && (ve = F && F.onVnodeUnmounted) || oe || pe) && Le(() => {
      ve && ct(ve, g, p), oe && qt(p, null, g, "unmounted"), pe && (p.el = null);
    }, b);
  }, vn = (p) => {
    const { type: g, el: b, anchor: O, transition: x } = p;
    if (g === he) {
      tn(b, O);
      return;
    }
    if (g === es) {
      I(p);
      return;
    }
    const C = () => {
      s(b), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (p.shapeFlag & 1 && x && !x.persisted) {
      const { leave: F, delayLeave: A } = x, E = () => F(b, C);
      A ? A(p.el, C, E) : E();
    } else
      C();
  }, tn = (p, g) => {
    let b;
    for (; p !== g; )
      b = y(p), s(p), p = b;
    s(g);
  }, Lo = (p, g, b) => {
    const { bum: O, scope: x, job: C, subTree: F, um: A, m: E, a: _ } = p;
    Oi(E), Oi(_), O && fo(O), x.stop(), C && (C.flags |= 8, He(F, p, g, b)), A && Le(A, g), Le(() => {
      p.isUnmounted = !0;
    }, g);
  }, Wt = (p, g, b, O = !1, x = !1, C = 0) => {
    for (let F = C; F < p.length; F++)
      He(p[F], g, b, O, x);
  }, Jt = (p) => {
    if (p.shapeFlag & 6)
      return Jt(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const g = y(p.anchor || p.el), b = g && g[Fl];
    return b ? y(b) : g;
  };
  let mn = !1;
  const nn = (p, g, b) => {
    let O;
    p == null ? g._vnode && (He(g._vnode, null, null, !0), O = g._vnode.component) : P(
      g._vnode || null,
      p,
      g,
      null,
      null,
      null,
      b
    ), g._vnode = p, mn || (mn = !0, pi(O), Ml(), mn = !1);
  }, rt = {
    p: P,
    um: He,
    m: wt,
    r: vn,
    mt: Oe,
    mc: re,
    pc: ne,
    pbc: Me,
    n: Jt,
    o: e
  };
  return {
    render: nn,
    hydrate: void 0,
    createApp: Ga(nn)
  };
}
function Qo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Yt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function du(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Vs(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (U(o) && U(s))
    for (let i = 0; i < o.length; i++) {
      const l = o[i];
      let r = s[i];
      r.shapeFlag & 1 && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && (r = s[i] = St(s[i]), r.el = l.el), !n && r.patchFlag !== -2 && Vs(l, r)), r.type === jo && (r.patchFlag === -1 && (r = s[i] = St(r)), r.el = l.el), r.type === bt && !r.el && (r.el = l.el);
    }
}
function hu(e) {
  const t = e.slice(), n = [0];
  let o, s, i, l, r;
  const u = e.length;
  for (o = 0; o < u; o++) {
    const h = e[o];
    if (h !== 0) {
      if (s = n[n.length - 1], e[s] < h) {
        t[o] = s, n.push(o);
        continue;
      }
      for (i = 0, l = n.length - 1; i < l; )
        r = i + l >> 1, e[n[r]] < h ? i = r + 1 : l = r;
      h < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), n[i] = o);
    }
  }
  for (i = n.length, l = n[i - 1]; i-- > 0; )
    n[i] = l, l = t[l];
  return n;
}
function Xl(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Xl(t);
}
function Oi(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Zl(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Zl(t.subTree) : null;
}
const Ql = (e) => e.__isSuspense;
function pu(e, t) {
  t && t.pendingBranch ? U(e) ? t.effects.push(...e) : t.effects.push(e) : wa(e);
}
const he = /* @__PURE__ */ Symbol.for("v-fgt"), jo = /* @__PURE__ */ Symbol.for("v-txt"), bt = /* @__PURE__ */ Symbol.for("v-cmt"), es = /* @__PURE__ */ Symbol.for("v-stc"), kt = [];
let ze = null;
function J(e = !1) {
  kt.push(ze = e ? null : []);
}
function Hs() {
  kt.pop(), ze = kt[kt.length - 1] || null;
}
let Vn = 1;
function ki(e, t = !1) {
  Vn += e, e < 0 && ze && t && (ze.hasOnce = !0);
}
function er(e) {
  return e.dynamicChildren = Vn > 0 ? ze || ln : null, Hs(), Vn > 0 && ze && ze.push(e), e;
}
function G(e, t, n, o, s, i) {
  return er(
    m(
      e,
      t,
      n,
      o,
      s,
      i,
      !0
    )
  );
}
function Hn(e, t, n, o, s) {
  return er(
    yt(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function Us(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Mn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const tr = ({ key: e }) => e ?? null, po = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ye(e) || /* @__PURE__ */ ke(e) || q(e) ? { i: je, r: e, k: t, f: !!n } : e : null);
function m(e, t = null, n = null, o = 0, s = null, i = e === he ? 0 : 1, l = !1, r = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && tr(t),
    ref: t && po(t),
    scopeId: kl,
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
    shapeFlag: i,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: je
  };
  return r ? (wo(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= ye(n) ? 8 : 16), Vn > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ze.push(u), u;
}
const yt = gu;
function gu(e, t = null, n = null, o = 0, s = null, i = !1) {
  if ((!e || e === Ka) && (e = bt), Us(e)) {
    const r = dn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && wo(r, n), Vn > 0 && !i && ze && (r.shapeFlag & 6 ? ze[ze.indexOf(e)] = r : ze.push(r)), r.patchFlag = -2, r;
  }
  if (Mu(e) && (e = e.__vccOpts), t) {
    t = vu(t);
    let { class: r, style: u } = t;
    r && !ye(r) && (t.class = et(r)), ue(u) && (/* @__PURE__ */ Is(u) && !U(u) && (u = Fe({}, u)), t.style = Kt(u));
  }
  const l = ye(e) ? 1 : Ql(e) ? 128 : $o(e) ? 64 : ue(e) ? 4 : q(e) ? 2 : 0;
  return m(
    e,
    t,
    n,
    o,
    s,
    l,
    i,
    !0
  );
}
function vu(e) {
  return e ? /* @__PURE__ */ Is(e) || Wl(e) ? Fe({}, e) : e : null;
}
function dn(e, t, n = !1, o = !1) {
  const { props: s, ref: i, patchFlag: l, children: r, transition: u } = e, h = t ? ys(s || {}, t) : s, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: h,
    key: h && tr(h),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? U(i) ? i.concat(po(t)) : [i, po(t)] : po(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== he ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && dn(e.ssContent),
    ssFallback: e.ssFallback && dn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && o && Ns(
    d,
    u.clone(d)
  ), d;
}
function Ce(e = " ", t = 0) {
  return yt(jo, null, e, t);
}
function Te(e = "", t = !1) {
  return t ? (J(), Hn(bt, null, e)) : yt(bt, null, e);
}
function ht(e) {
  return e == null || typeof e == "boolean" ? yt(bt) : U(e) ? yt(
    he,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Us(e) ? St(e) : yt(jo, null, String(e));
}
function St(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : dn(e);
}
function wo(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (U(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), wo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Wl(t) ? t._ctx = je : s === 3 && je && (je.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (q(t)) {
    if (o & 65) {
      wo(e, { default: t });
      return;
    }
    t = { default: t, _ctx: je }, n = 32;
  } else
    t = String(t), o & 64 ? (n = 16, t = [Ce(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function ys(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = et([t.class, o.class]));
      else if (s === "style")
        t.style = Kt([t.style, o.style]);
      else if (Oo(s)) {
        const i = t[s], l = o[s];
        l && i !== l && !(U(i) && i.includes(l)) ? t[s] = i ? [].concat(i, l) : l : l == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !ko(s) && (t[s] = l);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function ct(e, t, n, o = null) {
  lt(e, t, 7, [
    n,
    o
  ]);
}
const mu = Bl();
let yu = 0;
function bu(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || mu, i = {
    uid: yu++,
    vnode: e,
    type: o,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ur(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: zl(o, s),
    emitsOptions: Kl(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: fe,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: fe,
    data: fe,
    props: fe,
    attrs: fe,
    slots: fe,
    refs: fe,
    setupState: fe,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Za.bind(null, i), e.ce && e.ce(i), i;
}
let Ke = null;
const wu = () => Ke || je;
let xo, Un;
{
  const e = Ao(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (i) => {
      s.length > 1 ? s.forEach((l) => l(i)) : s[0](i);
    };
  };
  xo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ke = n
  ), Un = t(
    "__VUE_SSR_SETTERS__",
    (n) => Wn = n
  );
}
const Yn = (e) => {
  const t = Ke;
  return xo(e), e.scope.on(), () => {
    e.scope.off(), xo(t);
  };
}, Ei = () => {
  Ke && Ke.scope.off(), xo(null);
};
function nr(e) {
  return e.vnode.shapeFlag & 4;
}
let Wn = !1;
function xu(e, t = !1, n = !1) {
  t && Un(t);
  const { props: o, children: s } = e.vnode, i = nr(e);
  su(e, o, i, t), au(e, s, n || t);
  const l = i ? _u(e, t) : void 0;
  return t && Un(!1), l;
}
function _u(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ha);
  const { setup: o } = n;
  if (o) {
    Et();
    const s = e.setupContext = o.length > 1 ? Su(e) : null, i = Yn(e), l = qn(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), r = Qi(l);
    if (Tt(), i(), (r || e.sp) && !un(e) && Rl(e), r) {
      if (l.then(Ei, Ei), t)
        return l.then((u) => {
          Un(!0);
          try {
            Ti(e, u, t);
          } finally {
            Un(!1);
          }
        }).catch((u) => {
          Po(u, e, 0);
        });
      e.asyncDep = l;
    } else
      Ti(e, l);
  } else
    or(e);
}
function Ti(e, t, n) {
  q(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ue(t) && (e.setupState = _l(t)), or(e);
}
function or(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || mt);
  {
    const s = Yn(e);
    Et();
    try {
      Ua(e);
    } finally {
      Tt(), s();
    }
  }
}
const Cu = {
  get(e, t) {
    return Ie(e, "get", ""), e[t];
  }
};
function Su(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Cu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function No(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(_l(ca(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in jn)
        return jn[n](e);
    },
    has(t, n) {
      return n in t || n in jn;
    }
  })) : e.proxy;
}
function Mu(e) {
  return q(e) && "__vccOpts" in e;
}
const Ve = (e, t) => /* @__PURE__ */ ga(e, t, Wn), Ou = "3.5.41";
let bs;
const Ai = typeof window < "u" && window.trustedTypes;
if (Ai)
  try {
    bs = /* @__PURE__ */ Ai.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const sr = bs ? (e) => bs.createHTML(e) : (e) => e, ku = "http://www.w3.org/2000/svg", Eu = "http://www.w3.org/1998/Math/MathML", Ct = typeof document < "u" ? document : null, Fi = Ct && /* @__PURE__ */ Ct.createElement("template"), Tu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Ct.createElementNS(ku, e) : t === "mathml" ? Ct.createElementNS(Eu, e) : n ? Ct.createElement(e, { is: n }) : Ct.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => Ct.createTextNode(e),
  createComment: (e) => Ct.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ct.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, s, i) {
    const l = n ? n.previousSibling : t.lastChild;
    if (s && (s === i || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); )
        ;
    else {
      Fi.innerHTML = sr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const r = Fi.content;
      if (o === "svg" || o === "mathml") {
        const u = r.firstChild;
        for (; u.firstChild; )
          r.appendChild(u.firstChild);
        r.removeChild(u);
      }
      t.insertBefore(r, n);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Au = /* @__PURE__ */ Symbol("_vtc");
function Fu(e, t, n) {
  const o = e[Au];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const _o = /* @__PURE__ */ Symbol("_vod"), ir = /* @__PURE__ */ Symbol("_vsh"), Pi = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[_o] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : On(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: o }) {
    !t != !n && (o ? t ? (o.beforeEnter(e), On(e, !0), o.enter(e)) : o.leave(e, () => {
      On(e, !1);
    }) : On(e, t));
  },
  beforeUnmount(e, { value: t }) {
    On(e, t);
  }
};
function On(e, t) {
  e.style.display = t ? e[_o] : "none", e[ir] = !t;
}
const Pu = /* @__PURE__ */ Symbol(""), $u = /(?:^|;)\s*display\s*:/;
function Ru(e, t, n) {
  const o = e.style, s = ye(n);
  let i = !1;
  if (n && !s) {
    if (t)
      if (ye(t))
        for (const l of t.split(";")) {
          const r = l.slice(0, l.indexOf(":")).trim();
          n[r] == null && Fn(o, r, "");
        }
      else
        for (const l in t)
          n[l] == null && Fn(o, l, "");
    for (const l in n) {
      l === "display" && (i = !0);
      const r = n[l];
      r != null ? ju(
        e,
        l,
        !ye(t) && t ? t[l] : void 0,
        r
      ) || Fn(o, l, r) : Fn(o, l, "");
    }
  } else if (s) {
    if (t !== n) {
      const l = o[Pu];
      l && (n += ";" + l), o.cssText = n, i = $u.test(n);
    }
  } else t && e.removeAttribute("style");
  _o in e && (e[_o] = i ? o.display : "", e[ir] && (o.display = "none"));
}
const $i = /\s*!important$/;
function Fn(e, t, n) {
  if (U(n))
    n.forEach((o) => Fn(e, t, o));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Iu(e, t);
    $i.test(n) ? e.setProperty(
      Ut(o),
      n.replace($i, ""),
      "important"
    ) : e[o] = n;
  }
}
const Ri = ["Webkit", "Moz", "ms"], ts = {};
function Iu(e, t) {
  const n = ts[t];
  if (n)
    return n;
  let o = nt(t);
  if (o !== "filter" && o in e)
    return ts[t] = o;
  o = nl(o);
  for (let s = 0; s < Ri.length; s++) {
    const i = Ri[s] + o;
    if (i in e)
      return ts[t] = i;
  }
  return t;
}
function ju(e, t, n, o) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ye(o) && n === o;
}
const Ii = "http://www.w3.org/1999/xlink";
function ji(e, t, n, o, s, i = Vr(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ii, t.slice(6, t.length)) : e.setAttributeNS(Ii, t, n) : n == null || i && !sl(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : st(n) ? String(n) : n
  );
}
function Ni(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? sr(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const r = i === "OPTION" ? e.getAttribute("value") || "" : e.value, u = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (r !== u || !("_value" in e)) && (e.value = u), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const r = typeof e[t];
    r === "boolean" ? n = sl(n) : n == null && r === "string" ? (n = "", l = !0) : r === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(s || t);
}
function Vt(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Nu(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Di = /* @__PURE__ */ Symbol("_vei");
function Du(e, t, n, o, s = null) {
  const i = e[Di] || (e[Di] = {}), l = i[t];
  if (o && l)
    l.value = o;
  else {
    const [r, u] = Ku(t);
    if (o) {
      const h = i[t] = Uu(
        o,
        s
      );
      Vt(e, r, h, u);
    } else l && (Nu(e, r, l, u), i[t] = void 0);
  }
}
const Lu = /(Once|Passive|Capture)$/, Bu = /^on:?(?:Once|Passive|Capture)$/;
function Ku(e) {
  let t, n;
  for (; (n = e.match(Lu)) && !Bu.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Ut(e.slice(2)), t];
}
let ns = 0;
const Vu = /* @__PURE__ */ Promise.resolve(), Hu = () => ns || (Vu.then(() => ns = 0), ns = Date.now());
function Uu(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    const s = n.value;
    if (U(s)) {
      const i = o.stopImmediatePropagation;
      o.stopImmediatePropagation = () => {
        i.call(o), o._stopped = !0;
      };
      const l = s.slice(), r = [o];
      for (let u = 0; u < l.length && !o._stopped; u++) {
        const h = l[u];
        h && lt(
          h,
          t,
          5,
          r
        );
      }
    } else
      lt(
        s,
        t,
        5,
        [o]
      );
  };
  return n.value = e, n.attached = Hu(), n;
}
const Li = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Wu = (e, t, n, o, s, i) => {
  const l = s === "svg";
  t === "class" ? Fu(e, o, l) : t === "style" ? Ru(e, n, o) : Oo(t) ? ko(t) || Du(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ju(e, t, o, l)) ? (Ni(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ji(e, t, o, l, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (zu(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ye(o))) ? Ni(e, nt(t), o, i, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), ji(e, t, o, l));
};
function Ju(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Li(t) && q(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return Li(t) && ye(n) ? !1 : t in e;
}
function zu(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const o = nt(t);
  return Array.isArray(n) ? n.some((s) => nt(s) === o) : Object.keys(n).some((s) => nt(s) === o);
}
const hn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return U(t) ? (n) => fo(t, n) : t;
};
function qu(e) {
  e.target.composing = !0;
}
function Bi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const gt = /* @__PURE__ */ Symbol("_assign"), ro = /* @__PURE__ */ Symbol("_initialValue");
function os(e, t, n) {
  return t && (e = e.trim()), n && (e = To(e)), e;
}
const ss = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, s) {
    e.parentNode && (e.type === "text" ? e[ro] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[ro] = e.defaultValue.replace(/\r\n?/g, `
`))), e[gt] = hn(s);
    const i = o || s.props && s.props.type === "number";
    Vt(e, t ? "change" : "input", (l) => {
      l.target.composing || e[gt](os(e.value, n, i));
    }), (n || i) && Vt(e, "change", () => {
      e.value = os(e.value, n, i);
    }), t || (Vt(e, "compositionstart", qu), Vt(e, "compositionend", Bi), Vt(e, "change", Bi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: o } }) {
    const s = t ?? "", i = e[ro];
    delete e[ro], i !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== i ? e[gt](os(e.value, n, o)) : e.value = s;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: o, trim: s, number: i } }, l) {
    if (e[gt] = hn(l), e.composing) return;
    const r = (i || e.type === "number") && !/^0\d/.test(e.value) ? To(e.value) : e.value, u = t ?? "";
    if (r === u)
      return;
    const h = e.getRootNode();
    (h instanceof Document || h instanceof ShadowRoot) && h.activeElement === e && e.type !== "range" && (o && t === n || s && e.value.trim() === u) || (e.value = u);
  }
}, ao = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[gt] = hn(n), Vt(e, "change", () => {
      const o = e._modelValue, s = Jn(e), i = e.checked, l = e[gt];
      if (U(o)) {
        const r = ks(o, s), u = r !== -1;
        if (i && !u)
          l(o.concat(s));
        else if (!i && u) {
          const h = [...o];
          h.splice(r, 1), l(h);
        }
      } else if (pn(o)) {
        const r = new Set(o);
        i ? r.add(s) : r.delete(s), l(r);
      } else
        l(lr(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Ki,
  beforeUpdate(e, t, n) {
    e[gt] = hn(n), Ki(e, t, n);
  }
};
function Ki(e, { value: t, oldValue: n }, o) {
  e._modelValue = t;
  let s;
  if (U(t))
    s = ks(t, o.props.value) > -1;
  else if (pn(t))
    s = t.has(o.props.value);
  else {
    if (t === n) return;
    s = gn(t, lr(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
const Yu = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, o) {
    e._modelValue = t, Vt(e, "change", () => {
      const s = Array.prototype.filter.call(e.options, (i) => i.selected).map(
        (i) => n ? To(Jn(i)) : Jn(i)
      );
      e[gt](
        e.multiple ? pn(e._modelValue) ? new Set(s) : s : s[0]
      ), e._assigning = !0, Bt(() => {
        e._assigning = !1;
      });
    }), e[gt] = hn(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Vi(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[gt] = hn(n);
  },
  updated(e, { value: t }) {
    e._assigning || Vi(e, t);
  }
};
function Vi(e, t) {
  const n = e.multiple, o = U(t);
  if (!(n && !o && !pn(t))) {
    for (let s = 0, i = e.options.length; s < i; s++) {
      const l = e.options[s], r = Jn(l);
      if (n)
        if (o) {
          const u = typeof r;
          u === "string" || u === "number" ? l.selected = t.some((h) => String(h) === String(r)) : l.selected = ks(t, r) > -1;
        } else
          l.selected = t.has(r);
      else if (gn(Jn(l), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Jn(e) {
  return "_value" in e ? e._value : e.value;
}
function lr(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Gu = ["ctrl", "shift", "alt", "meta"], Xu = {
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
  exact: (e, t) => Gu.some((n) => e[`${n}Key`] && !t.includes(n))
}, Re = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = ((s, ...i) => {
    for (let l = 0; l < t.length; l++) {
      const r = Xu[t[l]];
      if (r && r(s, t)) return;
    }
    return e(s, ...i);
  }));
}, Zu = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, uo = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = ((s) => {
    if (!("key" in s))
      return;
    const i = Ut(s.key);
    if (t.some(
      (l) => l === i || Zu[l] === i
    ))
      return e(s);
  }));
}, Qu = /* @__PURE__ */ Fe({ patchProp: Wu }, Tu);
let Hi;
function ec() {
  return Hi || (Hi = cu(Qu));
}
const tc = ((...e) => {
  const t = ec().createApp(...e), { mount: n } = t;
  return t.mount = (o) => {
    const s = oc(o);
    if (!s) return;
    const i = t._component;
    !q(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const l = n(s, !1, nc(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), l;
  }, t;
});
function nc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function oc(e) {
  return ye(e) ? document.querySelector(e) : e;
}
const sc = /* @__PURE__ */ $l({
  __name: "ModalMask",
  props: {
    open: { type: Boolean },
    topLayer: { type: Boolean }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t;
    return (o, s) => (J(), Hn(Ea, { to: "body" }, [
      e.open ? (J(), G(
        "div",
        {
          key: 0,
          class: "moss-modal",
          onMousedown: s[0] || (s[0] = Re((i) => n("close"), ["self"]))
        },
        [
          Va(o.$slots, "default", {}, void 0)
        ],
        32
        /* NEED_HYDRATION */
      )) : Te("v-if", !0)
    ]));
  }
}), rr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, ic = /* @__PURE__ */ rr(sc, [["__scopeId", "data-v-32f7ef2b"]]), ar = "moss-manga-layouts", ur = "bbi-manga-layouts", cr = 1;
function lc(e) {
  const t = e && typeof e == "object" && !Array.isArray(e) ? e : void 0;
  if (t?.format !== void 0 && ![ar, ur].includes(t.format)) throw new Error("不支持的版式文件格式。");
  if (t?.format !== void 0 && t.version !== cr) throw new Error("不支持的版式文件版本，请更新插件。");
  const n = Array.isArray(e) ? e : t?.layouts !== void 0 ? t.layouts : [e];
  if (!Array.isArray(n)) throw new Error("需要版式对象或版式数组。");
  if (n.some((s) => !s || typeof s != "object" || Array.isArray(s))) throw new Error("版式必须是对象。");
  const o = (s) => {
    const i = t?.[s] === void 0 ? [] : t[s];
    if (!Array.isArray(i) || i.some((l) => typeof l != "string" || !l.trim())) throw new Error(`${s === "order" ? "版式顺序" : s} 需要非空 ID 字符串数组。`);
    return [...new Set(i.map((l) => l.trim()))];
  };
  return { layouts: n, deleted: o("deleted"), order: o("order") };
}
function Co(e) {
  return Array.isArray(e) ? e.map(Co) : e && typeof e == "object" ? Object.fromEntries(Object.keys(e).sort().map((t) => [t, Co(e[t])])) : e;
}
function Ws(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) throw new Error("版式必须是对象。");
  const t = { ...e }, n = t.canvas, o = n ? n.width > n.height ? "landscape" : "portrait" : t.portrait ? "portrait" : "landscape", s = n ?? (o === "portrait" ? { width: 1088, height: 1920 } : { width: 1920, height: 1088 }), i = t.panels ?? t[o];
  if (!s || !Number.isInteger(s.width) || !Number.isInteger(s.height)) throw new Error("版式需要有效画布。");
  if (!Array.isArray(i) || !i.length) throw new Error("版式缺少分格。");
  if (t.panels && t[o] && JSON.stringify(Co(t.panels)) !== JSON.stringify(Co(t[o]))) throw new Error("panels 与同方向分格不一致，请明确保留哪一份。");
  return { ...t, canvas: { ...s }, panels: i };
}
function fr(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) throw new Error("版式必须是对象。");
  if (e.panels === void 0) return { ...e };
  if (!e.canvas) throw new Error("panels 格式需要 canvas.width 与 canvas.height。");
  const t = Ws(e), n = t.canvas.width > t.canvas.height ? "landscape" : "portrait";
  return t[n] = t.panels, delete t.panels, t;
}
function Ui(e, t = {}) {
  return JSON.stringify({
    format: t.legacy ? ur : ar,
    version: cr,
    layouts: t.legacy ? e.map(fr) : e.map(Ws),
    deleted: t.deleted ?? [],
    order: t.order ?? e.map((n) => n.id)
  }, null, 2);
}
const rc = { canvases: { portrait: { width: 1088, height: 1920 }, landscape: { width: 1920, height: 1088 } } };
function Dt(e) {
  return e.replace(/_[1-9]\d*$/, "");
}
function Nn(e, t) {
  return typeof e == "number" && typeof t == "number" && e > 0 && t > 0 && e > t ? "landscape" : "portrait";
}
function ws(e) {
  return rc.canvases[e];
}
function ac(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch (s) {
    throw new Error(`JSON 解析失败:${s instanceof Error ? s.message : String(s)}`);
  }
  t = fr(t);
  const n = uc(t);
  if (!n)
    throw new Error('需要形如 {"id":"my_layout","label":"…","portrait":[{"position":"…","slots":{"F":[y1,x1,y2,x2]}}]}');
  if (!n.portrait?.length && !n.landscape?.length)
    throw new Error("portrait 与 landscape 至少要有一个方向的面板");
  const o = t;
  for (const s of ["omitFullPageFrame", "omitSmallFrames", "useBboxCorners"]) if (o[s] !== void 0 && typeof o[s] != "boolean") throw new Error(`${s} 需要布尔值。`);
  if (o.useBboxCorners !== void 0 && typeof o.useBboxCorners != "boolean") throw new Error("使用 BBOX 角点需要布尔值 true 或 false。");
  if (o.canvas !== void 0 && !Js(o.canvas)) throw new Error("画布宽高必须是 64～8192 的偶数。");
  for (const s of ["portrait", "landscape"]) {
    if (o[s] === void 0) continue;
    const i = o[s], l = n.canvas ? Nn(n.canvas.width, n.canvas.height) === s ? n.canvas : { width: n.canvas.height, height: n.canvas.width } : ws(s);
    if (n.canvas && l.width !== l.height && Nn(l.width, l.height) !== s) throw new Error("面板方向与自定义画布宽高不符。");
    const r = /* @__PURE__ */ new Set();
    if (!Array.isArray(i) || !i.length) throw new Error(`${s}:需要非空面板数组。`);
    for (const u of i) {
      const h = u, d = typeof h?.position == "string" ? h.position.trim().toLowerCase() : "";
      if (!d || r.has(d)) throw new Error(`${s}:面板位置不能为空或重复。`);
      if (r.add(d), h?.layer !== void 0 && !Number.isSafeInteger(h.layer)) throw new Error(`${s}/${d}:层级必须为安全整数。`);
      if (!h?.slots || typeof h.slots != "object" || !Object.keys(h.slots).length)
        throw new Error(`${s}/${d}:需要槽位坐标。`);
      if (h?.locked !== void 0 && typeof h.locked != "boolean") throw new Error(`${s}/${d}:锁定状态需要布尔值。`);
      if (h?.slotContents !== void 0) {
        if (!h.slotContents || typeof h.slotContents != "object" || Array.isArray(h.slotContents)) throw new Error(`${s}/${d}:手填内容格式错误。`);
        for (const [v, y] of Object.entries(h.slotContents))
          if (!h.slots[v] || !Array.isArray(y) || y.some((M) => !M || !["object", "character", "text"].includes(M.label) || typeof M.caption != "string" || M.text !== void 0 && typeof M.text != "string" || M.textType !== void 0 && !["dialogue", "narration", "sfx"].includes(M.textType))) throw new Error(`${s}/${d}/${v}:手填内容或文字类型无效。`);
      }
      for (const [v, y] of Object.entries(h.slots)) {
        const M = dr(y);
        if (!v.trim() || !M || M[0] < -l.height / 2 || M[2] > l.height / 2 || M[1] < -l.width / 2 || M[3] > l.width / 2)
          throw new Error(`${s}/${d}/${v}:坐标无效或超出画布。`);
      }
      for (const [v, y] of Object.entries(h.shapes ?? {}))
        if (!h.slots[v] || !zs(y) || y.some(([M, $]) => Math.abs(M) > l.width / 2 || Math.abs($) > l.height / 2))
          throw new Error(`${s}/${d}/${v}:四边形角点无效、交叉或超出画布。`);
    }
  }
  return n;
}
function dr(e) {
  if (!Array.isArray(e) || e.length !== 4) return null;
  const t = e.map((l) => typeof l == "number" && Number.isFinite(l) ? Math.round(l) : NaN);
  if (t.some((l) => !Number.isSafeInteger(l))) return null;
  const [n, o, s, i] = t;
  return n >= s || o >= i ? null : [n, o, s, i];
}
function Wi(e) {
  if (!Array.isArray(e)) return;
  const t = [];
  for (const n of e) {
    if (!n || typeof n != "object" || Array.isArray(n)) continue;
    const o = n, s = typeof o.position == "string" ? o.position.trim() : "", i = o.slots && typeof o.slots == "object" ? o.slots : null;
    if (!s || !i) continue;
    const l = {};
    for (const [d, v] of Object.entries(i)) {
      const y = dr(v);
      y && (l[d.trim().toUpperCase()] = y);
    }
    const r = {};
    if (o.shapes && typeof o.shapes == "object")
      for (const [d, v] of Object.entries(o.shapes)) {
        const y = d.trim().toUpperCase();
        l[y] && zs(v) && (r[y] = v.map((M) => M.map(Math.round)));
      }
    const u = {};
    if (o.slotNotes && typeof o.slotNotes == "object" && !Array.isArray(o.slotNotes))
      for (const [d, v] of Object.entries(o.slotNotes)) {
        const y = d.trim().toUpperCase();
        l[y] && typeof v == "string" && v.trim() && (u[y] = v.trim());
      }
    const h = {};
    if (o.slotContents && typeof o.slotContents == "object" && !Array.isArray(o.slotContents))
      for (const [d, v] of Object.entries(o.slotContents)) {
        const y = d.trim().toUpperCase();
        l[y] && Array.isArray(v) && (h[y] = JSON.parse(JSON.stringify(v)));
      }
    Object.keys(l).length && t.push({ position: s, slots: l, ...o.locked === !0 ? { locked: !0 } : {}, ...Number.isSafeInteger(o.layer) ? { layer: o.layer } : {}, ...Object.keys(r).length ? { shapes: r } : {}, ...Object.keys(u).length ? { slotNotes: u } : {}, ...Object.keys(h).length ? { slotContents: h } : {} });
  }
  return t.length ? t : void 0;
}
function uc(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, n = typeof t.id == "string" ? t.id.trim() : "";
  if (!n) return null;
  const o = Wi(t.portrait), s = Wi(t.landscape), i = typeof t.label == "string" ? t.label.trim() : void 0, l = typeof t.usage == "string" ? t.usage.trim() : void 0, r = typeof t.readingOrder == "string" ? t.readingOrder.trim() : void 0;
  if (!o && !s && !i && !l && !r) return null;
  const u = Js(t.canvas);
  return { id: n, label: i, usage: l, readingOrder: r, portrait: o, landscape: s, ...typeof t.omitFullPageFrame == "boolean" ? { omitFullPageFrame: t.omitFullPageFrame } : {}, ...typeof t.omitSmallFrames == "boolean" ? { omitSmallFrames: t.omitSmallFrames } : {}, ...u ? { canvas: u } : {}, ...t.promptMode ? { promptMode: t.promptMode } : {}, ...typeof t.useBboxCorners == "boolean" ? { useBboxCorners: t.useBboxCorners } : {}, ...typeof t.promptCaption == "string" ? { promptCaption: t.promptCaption } : {}, ...typeof t.description == "string" ? { description: t.description } : {} };
}
function hr(e) {
  return typeof e.description == "string" ? e.description : [...new Set([e.usage, e.promptCaption].filter((t) => typeof t == "string" && !!t.trim()).map((t) => t.trim()))].join(`

`);
}
function Js(e) {
  if (!e || typeof e != "object") return null;
  const { width: t, height: n } = e;
  return [t, n].every((o) => Number.isInteger(o) && o >= 64 && o <= 8192 && o % 2 === 0) ? { width: t, height: n } : null;
}
function zs(e) {
  return !Array.isArray(e) || e.length !== 4 || e.some((t) => !Array.isArray(t) || t.length !== 2 || t.some((n) => typeof n != "number" || !Number.isFinite(n))) ? !1 : e.every((t, n) => {
    const o = e[(n + 1) % 4], s = e[(n + 2) % 4];
    return (o[0] - t[0]) * (s[1] - o[1]) - (o[1] - t[1]) * (s[0] - o[0]) > 0.01;
  });
}
const vt = 24, me = (e, t, n) => Math.max(t, Math.min(n, e));
function is(e, t, n) {
  const o = me(Math.round(e.x), 0, n.width), s = me(Math.round(e.y), 0, n.height), i = me(Math.round(t.x), 0, n.width), l = me(Math.round(t.y), 0, n.height);
  return { x: Math.min(o, i), y: Math.min(s, l), width: Math.abs(i - o), height: Math.abs(l - s) };
}
function Ji(e, t) {
  let n = t, o = 2;
  for (; e.slots[n]; ) n = `${t}_${o++}`;
  return n;
}
function cc(e, t) {
  const n = (t.y + t.height / 2 - e.y) / e.height, o = t.x + t.width / 2 > e.x + e.width / 2;
  return t.width >= e.width * 0.7 && (n < 1 / 3 || n > 2 / 3) ? n < 1 / 3 ? "T" : "B" : (n < 1 / 3 ? "T" : n > 2 / 3 ? "B" : "M") + (o ? "R" : "L");
}
function zi(e, t, n) {
  const o = Dn(e, t);
  return o.every(([s, i], l) => {
    const [r, u] = o[(l + 1) % o.length];
    return (r - s) * (n.y - i) - (u - i) * (n.x - s) >= -0.01;
  });
}
function tt(e, t, n = vt) {
  const o = me(Math.round(e.width), n, t.width), s = me(Math.round(e.height), n, t.height);
  return { x: me(Math.round(e.x), 0, t.width - o), y: me(Math.round(e.y), 0, t.height - s), width: o, height: s };
}
function fc(e, t) {
  const [n, o, s, i] = e.slots.F ?? e.slots.C ?? Object.values(e.slots)[0];
  return tt({ x: o + t.width / 2, y: n + t.height / 2, width: i - o, height: s - n }, t);
}
function kn(e, t, n) {
  const o = { ...e, slots: {}, corners: {} };
  n?.layer !== void 0 && (o.layer = n.layer), n?.position && (o.position = n.position), n?.locked && (o.locked = !0);
  for (const [s, [i, l, r, u]] of Object.entries((n ?? pc(e, t, "")).slots))
    s !== "F" && en(o, s, { x: l + t.width / 2, y: i + t.height / 2, width: u - l, height: r - i });
  for (const [s, i] of Object.entries(n?.shapes ?? {})) {
    if (s !== "F" && !o.slots[s]) continue;
    const l = s === "F" ? o : Ge(o, s);
    o.corners[s] = i.map(([r, u]) => [(r + t.width / 2 - l.x) / l.width, (u + t.height / 2 - l.y) / l.height]);
  }
  return n?.slotNotes && (o.slotNotes = { ...n.slotNotes }), n?.slotContents && (o.slotContents = JSON.parse(JSON.stringify(n.slotContents))), o;
}
function Dn(e, t) {
  const n = t === "F" ? e : Ge(e, t);
  return (e.corners[t] ?? [[0, 0], [1, 0], [1, 1], [0, 1]]).map(([o, s]) => [n.x + o * n.width, n.y + s * n.height]);
}
function dc(e, t, n, o) {
  const s = n.map(([u, h]) => [me(Math.round(u), 0, o.width), me(Math.round(h), 0, o.height)]);
  if (!zs(s)) return !1;
  const i = Math.min(...s.map((u) => u[0])), l = Math.min(...s.map((u) => u[1])), r = { x: i, y: l, width: Math.max(...s.map((u) => u[0])) - i, height: Math.max(...s.map((u) => u[1])) - l };
  return r.width < (t === "F" ? vt : 1) || r.height < (t === "F" ? vt : 1) ? !1 : (t === "F" ? Object.assign(e, r) : en(e, t, r), e.corners[t] = s.map(([u, h]) => [(u - i) / r.width, (h - l) / r.height]), !0);
}
function Ge(e, t) {
  const n = e.slots[t];
  return { x: Math.round(e.x + n.x * e.width), y: Math.round(e.y + n.y * e.height), width: Math.max(1, Math.round(n.width * e.width)), height: Math.max(1, Math.round(n.height * e.height)) };
}
function en(e, t, n) {
  e.slots[t] = { x: (n.x - e.x) / e.width, y: (n.y - e.y) / e.height, width: n.width / e.width, height: n.height / e.height };
}
function hc(e, t, n) {
  const o = (r) => {
    const u = me(Math.round(r.x), 0, t.width - 1), h = me(Math.round(r.y), 0, t.height - 1);
    return [h - t.height / 2, u - t.width / 2, me(Math.round(r.y + r.height), h + 1, t.height) - t.height / 2, me(Math.round(r.x + r.width), u + 1, t.width) - t.width / 2];
  }, s = Object.fromEntries(Object.keys(e.corners).filter((r) => r === "F" || e.slots[r]).map((r) => [r, Dn(e, r).map(([u, h]) => [me(Math.round(u), 0, t.width) - t.width / 2, me(Math.round(h), 0, t.height) - t.height / 2])])), i = Object.fromEntries(Object.entries(e.slotNotes ?? {}).filter(([r, u]) => (r === "F" || e.slots[r]) && u.trim()).map(([r, u]) => [r, u.trim()])), l = Object.fromEntries(Object.entries(e.slotContents ?? {}).filter(([r, u]) => (r === "F" || e.slots[r]) && u.length).map(([r, u]) => [r, JSON.parse(JSON.stringify(u))]));
  return { position: n, ...e.locked ? { locked: !0 } : {}, ...e.layer !== void 0 ? { layer: e.layer } : {}, slots: { F: o(e), ...Object.fromEntries(Object.keys(e.slots).map((r) => [r, o(Ge(e, r))])) }, ...Object.keys(s).length ? { shapes: s } : {}, ...Object.keys(i).length ? { slotNotes: i } : {}, ...Object.keys(l).length ? { slotContents: l } : {} };
}
function pc(e, t, n) {
  const o = tt(e, t), s = (l, r, u, h) => [
    Math.round(o.y + o.height * r - t.height / 2),
    Math.round(o.x + o.width * l - t.width / 2),
    Math.round(o.y + o.height * h - t.height / 2),
    Math.round(o.x + o.width * u - t.width / 2)
  ], i = {
    F: s(0, 0, 1, 1),
    C: s(0.04, 0.04, 0.96, 0.96),
    S: s(0.04, 0.28, 0.96, 0.96),
    T: s(0.06, 0.04, 0.94, 0.25),
    B: s(0.06, 0.75, 0.94, 0.96),
    TL: s(0.04, 0.04, 0.46, 0.3),
    TR: s(0.54, 0.04, 0.96, 0.3),
    BL: s(0.06, 0.75, 0.46, 0.96),
    BR: s(0.54, 0.75, 0.94, 0.96),
    ML: s(0.04, 0.34, 0.46, 0.68),
    MR: s(0.54, 0.34, 0.96, 0.68),
    L: s(0.04, 0.06, 0.48, 0.94),
    R: s(0.52, 0.06, 0.96, 0.94),
    O: s(0.3, 0.35, 0.7, 0.65)
  };
  return { position: n, slots: i };
}
function ls(e, t, n, o, s = !1, i = vt) {
  const l = (v, y, M, $) => {
    if (s) {
      const V = v + y, H = [...$, Math.round(V / 8) * 8].reduce((I, W) => Math.abs(W - V) < Math.abs(I - V) ? W : I, V + o + 1);
      return [v, Math.abs(H - V) <= o ? H - v : y];
    }
    let P = 0, j = o + 1;
    for (const V of [v, v + y / 2, v + y])
      for (const N of [...$, Math.round(V / 8) * 8])
        Math.abs(N - V) < j && (j = Math.abs(N - V), P = N - V);
    return [me(v + (j <= o ? P : 0), 0, M - y), y];
  }, [r, u] = l(e.x, e.width, t.width, [0, t.width / 2, t.width, ...n.flatMap((v) => [v.x, v.x + v.width / 2, v.x + v.width])]), [h, d] = l(e.y, e.height, t.height, [0, t.height / 2, t.height, ...n.flatMap((v) => [v.y, v.y + v.height / 2, v.y + v.height])]);
  return tt({ x: r, y: h, width: u, height: d }, t, i);
}
function Ht(e, t) {
  const n = /* @__PURE__ */ new Set();
  return t.filter((o) => e[o.panel] && (!o.slot || e[o.panel].slots[o.slot])).filter((o) => {
    const s = `${o.panel}:${o.slot}`;
    return n.has(s) || o.slot && t.some((i) => i.panel === o.panel && !i.slot) ? !1 : (n.add(s), !0);
  });
}
function qs(e, t) {
  const n = Ht(e, t).map((i) => i.slot ? Ge(e[i.panel], i.slot) : e[i.panel]);
  if (!n.length) return null;
  const o = Math.min(...n.map((i) => i.x)), s = Math.min(...n.map((i) => i.y));
  return { x: o, y: s, width: Math.max(...n.map((i) => i.x + i.width)) - o, height: Math.max(...n.map((i) => i.y + i.height)) - s };
}
function xs(e, t, n, o) {
  if (e[t.panel].locked) return;
  const s = tt(n, o, t.slot ? 1 : vt);
  t.slot ? en(e[t.panel], t.slot, s) : Object.assign(e[t.panel], s);
}
function qi(e, t, n, o, s) {
  const i = Ht(e, t).filter((r) => !e[r.panel].locked), l = qs(e, i);
  if (l) {
    n = Math.max(-l.x, Math.min(s.width - l.x - l.width, n)), o = Math.max(-l.y, Math.min(s.height - l.y - l.height, o));
    for (const r of i) {
      const u = r.slot ? Ge(e[r.panel], r.slot) : e[r.panel];
      xs(e, r, { ...u, x: u.x + n, y: u.y + o }, s);
    }
  }
}
function gc(e, t, n, o) {
  const s = Ht(e, t).filter((r) => !e[r.panel].locked), i = qs(e, s);
  if (!i || s.length < 2) return;
  const l = (r) => r.slot ? Ge(e[r.panel], r.slot) : e[r.panel];
  if (n === "gap-x" || n === "gap-y") {
    if (s.length < 3) return;
    const r = n === "gap-x", u = r ? "x" : "y", h = r ? "width" : "height";
    s.sort(($, P) => l($)[u] - l(P)[u]);
    const d = l(s[0]), v = l(s.at(-1)), y = (v[u] + v[h] - d[u] - s.reduce(($, P) => $ + l(P)[h], 0)) / (s.length - 1);
    let M = d[u];
    for (const $ of s) {
      const P = { ...l($), [u]: M };
      M += P[h] + y, xs(e, $, P, o);
    }
    return;
  }
  for (const r of s) {
    const u = { ...l(r) };
    n === "left" && (u.x = i.x), n === "right" && (u.x = i.x + i.width - u.width), n === "top" && (u.y = i.y), n === "bottom" && (u.y = i.y + i.height - u.height), n === "center-x" && (u.x = i.x + (i.width - u.width) / 2), n === "center-y" && (u.y = i.y + (i.height - u.height) / 2), xs(e, r, u, o);
  }
}
function vc(e, t, n) {
  const o = [];
  for (const s of Ht(e, t)) {
    const i = e[s.panel];
    if (!i.locked)
      if (s.slot) {
        const l = s.slot.replace(/_[1-9]\d*$/, ""), r = Ge(i, s.slot);
        let u = l, h = 2;
        for (; i.slots[u]; ) u = `${l}_${h++}`;
        en(i, u, tt({ ...r, x: r.x + 24, y: r.y + 24 }, n, 1)), i.corners[s.slot] && (i.corners[u] = JSON.parse(JSON.stringify(i.corners[s.slot]))), i.slotNotes?.[s.slot] && (i.slotNotes[u] = i.slotNotes[s.slot]), i.slotContents?.[s.slot] && (i.slotContents[u] = JSON.parse(JSON.stringify(i.slotContents[s.slot]))), o.push({ panel: s.panel, slot: u });
      } else {
        const l = JSON.parse(JSON.stringify(i));
        delete l.position, l.layer = Math.max(-1, ...e.map((r, u) => r.layer ?? u)) + 1, Object.assign(l, tt({ ...l, x: l.x + 24, y: l.y + 24 }, n)), e.push(l), o.push({ panel: e.length - 1, slot: "" });
      }
  }
  return o;
}
function mc(e, t) {
  for (const n of Ht(e, t).sort((o, s) => s.panel - o.panel)) {
    const o = e[n.panel];
    o.locked || (n.slot ? (delete o.slots[n.slot], delete o.corners[n.slot], delete o.slotNotes?.[n.slot], delete o.slotContents?.[n.slot]) : e.splice(n.panel, 1));
  }
}
function yc(e, t, n) {
  const o = e[t];
  if (!o || o.locked) return;
  if (o.corners.F) throw new Error("请先将外框恢复为矩形，再使用等分。");
  const s = n === "x" ? "width" : "height", i = 8, l = Math.floor((o[s] - i) / 2);
  if (l < vt) throw new Error("分格太小，无法继续等分。");
  const r = { x: o.x, y: o.y, width: o.width, height: o.height, slots: {}, corners: {}, layer: Math.max(-1, ...e.map((u, h) => u.layer ?? h)) + 1 };
  r[n] = o[n] + l + i, r[s] = o[s] - l - i, o[s] = l, e.splice(t + 1, 0, r);
}
const bc = ["aria-expanded"], wc = {
  key: 0,
  class: "create-options",
  role: "group",
  "aria-label": "新框类型"
}, xc = ["disabled"], _c = ["disabled"], Cc = ["disabled"], Sc = {
  key: 1,
  class: "hit-list"
}, Mc = ["onClick"], Oc = ["disabled"], kc = ["disabled"], Ec = { class: "inline" }, Tc = { class: "canvas-controls" }, Ac = { class: "hint" }, Fc = { class: "tools" }, Pc = ["value"], $c = ["disabled"], Rc = ["disabled"], Ic = ["disabled"], jc = { class: "inline" }, Nc = ["disabled"], Dc = ["disabled"], Lc = { class: "check" }, Bc = { class: "check" }, Kc = { class: "check" }, Vc = { class: "check" }, Hc = {
  class: "check",
  title: "实验功能：为斜切外框的四个顶点追加小 bbox；保存版式后用于提示词编译。"
}, Uc = ["checked"], Wc = {
  open: "",
  class: "object-tree"
}, Jc = ["onClick"], zc = { class: "tree-slots" }, qc = ["onClick", "onDblclick"], Yc = { class: "inline" }, Gc = ["disabled"], Xc = ["disabled"], Zc = ["disabled"], Qc = { class: "inline" }, ef = ["disabled"], tf = ["disabled"], nf = { class: "inline" }, of = ["disabled"], sf = ["disabled"], lf = { class: "hint" }, rf = { class: "canvas-area" }, af = ["viewBox"], uf = ["width", "height"], cf = ["data-panel", "onContextmenu", "onPointerdown", "onDblclick"], ff = ["points", "fill", "stroke"], df = ["x", "y", "width", "height"], hf = ["title"], pf = ["data-slot", "onPointerdown", "onDblclick", "onContextmenu"], gf = ["points", "fill", "stroke", "stroke-width"], vf = ["x", "y", "font-size"], mf = ["x", "y", "width", "height"], yf = ["title"], bf = ["x", "y", "font-size"], wf = ["data-ctrl-deform", "data-handle", "rx", "x", "y", "width", "height", "fill", "aria-label", "onPointerdown"], xf = {
  key: 0,
  class: "draw-status",
  role: "status"
}, _f = { class: "canvas-toolbar" }, Cf = ["disabled"], Sf = ["disabled"], Mf = { class: "hint" }, Of = { class: "properties" }, kf = ["aria-selected"], Ef = ["aria-selected"], Tf = ["value"], Af = ["value"], Ff = ["value"], Pf = {
  key: 0,
  class: "slot-actions"
}, $f = ["disabled"], Rf = { class: "inline" }, If = ["value", "disabled"], jf = ["value"], Nf = ["disabled"], Df = ["value", "placeholder"], Lf = {
  key: 1,
  class: "manual-content"
}, Bf = { class: "inline" }, Kf = ["value", "onChange"], Vf = ["value", "onChange"], Hf = ["value", "onInput"], Uf = ["value", "placeholder", "onInput"], Wf = { class: "inline" }, Jf = ["disabled", "onClick"], zf = ["disabled", "onClick"], qf = ["onClick"], Yf = { class: "slot-list" }, Gf = ["onClick"], Xf = ["value", "aria-label", "onChange"], Zf = {
  key: 1,
  class: "hint"
}, Qf = {
  key: 1,
  role: "alert",
  class: "error"
}, ed = { key: 2 }, td = ["onKeydown"], nd = /* @__PURE__ */ $l({
  __name: "Editor",
  props: {
    sources: {},
    existingIds: {},
    initialKey: {},
    editingId: {},
    initialMode: {}
  },
  emits: ["close", "save"],
  setup(e, { emit: t }) {
    const n = e, o = t;
    function s(c) {
      let a = c, f = 2;
      for (; n.existingIds.includes(a); ) a = `${c}_${f++}`;
      return a;
    }
    const i = /* @__PURE__ */ ae({ id: s("my_layout"), label: "自定义版式", description: "", promptMode: n.initialMode ?? "llm", useBboxCorners: !1, width: 1088, height: 1920, panels: [] }), l = /* @__PURE__ */ ae(-1), r = /* @__PURE__ */ ae(""), u = /* @__PURE__ */ ae([]), h = Ve(() => Ht(i.value.panels, u.value)), d = /* @__PURE__ */ ae(!0), v = /* @__PURE__ */ ae(!0), y = /* @__PURE__ */ ae(null), M = /* @__PURE__ */ ae(!1), $ = /* @__PURE__ */ fa(null), P = /* @__PURE__ */ ae(null);
    let j = null;
    const V = Ve(() => $.value?.parent ? i.value.panels.indexOf($.value.parent) : -1), N = Ve(() => !!y.value && !!i.value.panels[y.value.parent] && !i.value.panels[y.value.parent].locked);
    function H(c) {
      const a = c === "F" ? null : i.value.panels[y.value?.parent ?? l.value];
      if (c !== "F" && (!a || a.locked)) {
        g.value = "请先选择一个未锁定的 F 分格。";
        return;
      }
      W(), be(), $.value = { kind: c, parent: a }, y.value = null, g.value = "", x.value?.focus?.();
    }
    function I(c) {
      x.value?.hasPointerCapture(c) && x.value.releasePointerCapture(c);
    }
    function W() {
      const c = j?.id;
      j = null, P.value = null, $.value = null, c !== void 0 && I(c), Rt = null;
    }
    function le(c) {
      !$.value || c.button !== 0 || L || (c.preventDefault(), c.stopPropagation(), x.value?.focus?.(), Rt = x.value.getBoundingClientRect(), j = { id: c.pointerId, start: jt(c) }, P.value = is(j.start, j.start, we.value), x.value.setPointerCapture(c.pointerId));
    }
    function z(c) {
      if (!j || c.pointerId !== j.id) return;
      let a = is(j.start, jt(c), we.value);
      if (a.width > 0 && a.height > 0 && yn.value && !c.altKey) {
        const f = $.value?.parent, w = f ? [f, ...Object.keys(f.slots).map((Y) => Ge(f, Y))] : i.value.panels, T = 6 * i.value.width / Rt.width;
        a = ls(a, we.value, w, T, !1, 1), a = ls(a, we.value, w, T, !0, 1);
      }
      P.value = a;
    }
    function re(c, a) {
      if (!j || c.pointerId !== j.id) return;
      a || z(c);
      const f = $.value, w = j, T = P.value, Y = is(w.start, jt(c), we.value), B = Rt, Je = !a && Y.width * B.width / i.value.width >= 4 && Y.height * B.height / i.value.height >= 4 && T.width >= (f.kind === "F" ? vt : 1) && T.height >= (f.kind === "F" ? vt : 1);
      if (W(), !!Je)
        if (f.kind === "F")
          _e(() => {
            const Ee = kn(T, we.value);
            Ee.slots = {}, Ee.layer = Math.max(-1, ...i.value.panels.map(($e, at) => $e.layer ?? at)) + 1, i.value.panels.push(Ee);
          }), xt(i.value.panels.length - 1);
        else {
          const Ee = i.value.panels.indexOf(f.parent);
          if (Ee < 0 || f.parent.locked) {
            g.value = "所属分格已变化，请重新选择后绘制。";
            return;
          }
          const $e = Ji(f.parent, f.kind === "text" ? cc(f.parent, T) : f.kind);
          _e(() => en(f.parent, $e, T)), Ue(Ee, $e);
        }
    }
    function ce(c) {
      Ue(c.panel, c.slot), y.value = null;
    }
    function Me(c) {
      return `第 ${c.panel + 1} 格 · ${c.slot || "F"}${i.value.panels[c.panel].locked ? " · 已锁定" : ""}`;
    }
    const S = /* @__PURE__ */ ae(n.editingId ?? "");
    let L = !1, ee = null;
    const Oe = /* @__PURE__ */ ae(null);
    let Pe = null;
    function Se(c, a = "", f = !1) {
      if (f) {
        const w = [...h.value], T = w.findIndex((B) => B.panel === c && B.slot === a);
        T >= 0 ? w.splice(T, 1) : w.push({ panel: c, slot: a });
        const Y = w.at(-1);
        Y ? Ue(Y.panel, Y.slot) : xt(-1), u.value = w;
      } else Ue(c, a);
    }
    function Q(c, a = "") {
      return h.value.some((f) => f.panel === c && f.slot === a);
    }
    function ne(c) {
      const a = r.value;
      _e(c), u.value = Ht(i.value.panels, u.value), a && k.value?.slots[a] && (r.value = a);
    }
    function Ze() {
      ne(() => {
        u.value = vc(i.value.panels, h.value, we.value);
      });
      const c = u.value.at(-1);
      c && (l.value = c.panel, r.value = c.slot);
    }
    function Pt() {
      ne(() => mc(i.value.panels, h.value)), u.value = [], xt(-1);
    }
    function wt(c) {
      ne(() => gc(i.value.panels, h.value, c, we.value));
    }
    function He(c) {
      try {
        ne(() => yc(i.value.panels, l.value, c)), u.value = [{ panel: l.value, slot: "" }];
      } catch (a) {
        g.value = String(a instanceof Error ? a.message : a);
      }
    }
    function vn() {
      const c = [...new Set(h.value.map((f) => f.panel))], a = c.every((f) => i.value.panels[f].locked);
      _e(() => c.forEach((f) => i.value.panels[f].locked = !a));
    }
    function tn(c = !1) {
      F.value = 1, Bt(() => {
        const a = C.value;
        if (!a || !x.value) return;
        if (!c) {
          a.scrollLeft = 0, a.scrollTop = 0;
          return;
        }
        const f = qs(i.value.panels, h.value);
        if (!f) return;
        const w = x.value.getBoundingClientRect();
        F.value = me(Math.min(a.clientWidth / (f.width / i.value.width * w.width), a.clientHeight / (f.height / i.value.height * w.height)) * 0.85, 0.25, 4), Bt(() => {
          const T = x.value.getBoundingClientRect(), Y = a.getBoundingClientRect();
          a.scrollLeft += T.left - Y.left + (f.x + f.width / 2) / i.value.width * T.width - a.clientWidth / 2, a.scrollTop += T.top - Y.top + (f.y + f.height / 2) / i.value.height * T.height - a.clientHeight / 2;
        });
      });
    }
    function Lo(c) {
      if (!L && c.button !== 1) return;
      c.preventDefault(), c.stopPropagation();
      const a = C.value;
      ee = { id: c.pointerId, x: c.clientX, y: c.clientY, left: a.scrollLeft, top: a.scrollTop }, a.setPointerCapture(c.pointerId);
    }
    function Wt(c) {
      if (ee?.id === c.pointerId) {
        const a = C.value;
        a.scrollLeft = ee.left + ee.x - c.clientX, a.scrollTop = ee.top + ee.y - c.clientY;
      }
    }
    function Jt(c) {
      if (ee?.id === c.pointerId) {
        ee = null;
        const a = C.value;
        a.hasPointerCapture(c.pointerId) && a.releasePointerCapture(c.pointerId);
      }
    }
    function mn(c) {
      if (c.button !== 0 || L) return;
      const a = jt(c);
      Pe = { ...a, selection: c.shiftKey ? [...u.value] : [] }, Oe.value = { ...a, width: 0, height: 0 }, x.value.setPointerCapture(c.pointerId);
    }
    function nn(c, a = -1, f = "") {
      if (c.preventDefault(), c.stopPropagation(), j || Ye) return;
      W(), a >= 0 && !Q(a, f) && Ue(a, f);
      const w = jt(c), T = [];
      for (const { rect: B, index: Je } of [...bn.value].reverse()) {
        for (const Ee of Object.keys(B.slots).reverse()) zi(B, Ee, w) && T.push({ panel: Je, slot: Ee });
        zi(B, "F", w) && T.push({ panel: Je, slot: "" });
      }
      M.value = !1;
      const Y = Math.max(8, Math.min(c.clientY, window.innerHeight - 360));
      y.value = { x: Math.max(8, Math.min(c.clientX, window.innerWidth - 238)), y: Y, height: window.innerHeight - Y - 8, parent: a >= 0 ? a : l.value, hits: T };
    }
    const rt = /* @__PURE__ */ ae(n.initialKey ?? ""), yn = /* @__PURE__ */ ae(!0), p = /* @__PURE__ */ ae(!0), g = /* @__PURE__ */ ae(""), b = /* @__PURE__ */ ae(!1), O = /* @__PURE__ */ ae(), x = /* @__PURE__ */ ae(), C = /* @__PURE__ */ ae(), F = /* @__PURE__ */ ae(1), A = /* @__PURE__ */ ae(1088), E = /* @__PURE__ */ ae(1920), _ = /* @__PURE__ */ ae([]), D = /* @__PURE__ */ ae([]), R = /* @__PURE__ */ ae(""), k = Ve(() => i.value.panels[l.value]), K = Ve(() => k.value ? r.value && k.value.slots[r.value] ? Ge(k.value, r.value) : k.value : null), Z = { C: "内区", S: "主体", T: "顶部文字", B: "底部文字", TL: "左上文字", TR: "右上文字", BL: "左下文字", BR: "右下文字", L: "左人物", R: "右人物", O: "道具/音效", ML: "左侧文字", MR: "右侧文字", E: "有限越线" }, oe = /* @__PURE__ */ ae("S"), te = Ve(() => k.value ? ["C", "S", "T", "B", "TL", "TR", "BL", "BR", "ML", "MR", "L", "R", "O"] : []), ve = Ve(() => te.value.includes(oe.value) ? oe.value : te.value[0] ?? ""), pe = Ve(() => k.value?.slotContents?.[r.value || "F"] ?? []), ge = /* @__PURE__ */ ae(null), Ne = /* @__PURE__ */ ae(""), $t = /* @__PURE__ */ ae();
    let zt = null;
    function be() {
      _n = null, zt = null, r.value = "";
    }
    function qe() {
      if (zt) {
        const c = zt;
        Xn(c.before), _.value = c.undo, D.value = c.redo;
      }
      be();
    }
    function xt(c) {
      be(), l.value = c, u.value = c < 0 ? [] : [{ panel: c, slot: "" }];
    }
    function Ue(c, a) {
      l.value === c && r.value === a || (xt(c), a && k.value?.slots[a] && (zt = { before: We(), undo: [..._.value], redo: [...D.value] }, r.value = a, u.value = [{ panel: c, slot: a }], p.value = !0));
    }
    function Gs(c) {
      !k.value || k.value.locked || (r.value ? en(k.value, r.value, c) : i.value.panels[l.value] = { ...k.value, ...c });
    }
    function pr() {
      const c = r.value;
      k.value && c && _e(() => {
        delete k.value.slots[c], delete k.value.corners[c], k.value.slotNotes && delete k.value.slotNotes[c], k.value.slotContents && delete k.value.slotContents[c];
      });
    }
    function gr() {
      const c = ve.value;
      if (!k.value || !c) return;
      const a = Ji(k.value, c);
      _e(() => {
        const f = k.value, w = Ge(kn(f, we.value), c), T = 24 * Object.keys(f.slots).filter((Y) => Dt(Y) === c).length;
        en(f, a, tt({ ...w, x: w.x + T, y: w.y + T }, we.value, 1));
      }), Ue(l.value, a);
    }
    function vr() {
      k.value && _e(() => {
        const c = k.value;
        c.slots = { ...kn(c, we.value).slots }, c.corners = Object.fromEntries(Object.entries(c.corners).filter(([a]) => a === "F")), r.value = "";
      });
    }
    function mr(c, a) {
      return p.value ? Object.keys(c.slots).sort((f, w) => Number(Q(a, f)) - Number(Q(a, w)) || +(a === l.value && f === r.value) - +(a === l.value && w === r.value)).map((f) => ({ key: f, rect: Ge(c, f) })) : [];
    }
    const we = Ve(() => ({ width: i.value.width, height: i.value.height })), bn = Ve(() => i.value.panels.map((c, a) => ({ rect: c, index: a })).sort((c, a) => (c.rect.layer ?? c.index) - (a.rect.layer ?? a.index) || c.index - a.index)), yr = Ve(() => {
      const c = new Set(h.value.map((a) => a.panel));
      return [...bn.value].sort((a, f) => Number(c.has(a.index)) - Number(c.has(f.index)) || +(a.index === l.value) - +(f.index === l.value));
    }), wn = Ve(() => bn.value.findIndex((c) => c.index === l.value));
    function Gn(c) {
      const a = wn.value, f = a + c;
      if (a < 0 || f < 0 || f >= bn.value.length) return;
      const w = [...bn.value];
      [w[a], w[f]] = [w[f], w[a]], _e(() => {
        w.forEach(({ rect: T }, Y) => {
          T.layer = Y;
        });
      });
    }
    const We = () => JSON.stringify(i.value), Xs = Ve(() => {
      const c = new Set(i.value.panels.map((a) => a.position).filter(Boolean));
      return i.value.panels.map((a, f) => {
        if (a.position) return a.position;
        let w = f + 1;
        for (; c.has(`panel-${w}`); ) w++;
        const T = `panel-${w}`;
        return c.add(T), T;
      });
    });
    function Zs(c) {
      c !== We() && (_.value.push(c), _.value.length > 100 && _.value.shift(), D.value = [], g.value = "");
    }
    function _e(c, a = !1) {
      a || be();
      const f = We();
      c(), Zs(f);
    }
    function Xn(c) {
      i.value = JSON.parse(c), A.value = i.value.width, E.value = i.value.height, l.value = Math.min(l.value, i.value.panels.length - 1), k.value?.slots[r.value] || (r.value = ""), u.value = Ht(i.value.panels, u.value), g.value = "", b.value = !1;
    }
    function Qs() {
      be();
      const c = _.value.pop();
      c && (D.value.push(We()), Xn(c));
    }
    function ei() {
      be();
      const c = D.value.pop();
      c && (_.value.push(We()), Xn(c));
    }
    function ti() {
      const c = n.sources.find((a) => a.key === rt.value);
      c && (_e(() => {
        const a = c.id === n.editingId;
        i.value = { metadata: JSON.parse(JSON.stringify(c)), id: a ? c.id : s(`${c.id}_copy`), label: a ? c.label : `${c.label}（副本）`, description: hr(c), promptMode: c.promptMode ?? "llm", useBboxCorners: c.useBboxCorners === !0, omitFullPageFrame: c.omitFullPageFrame, omitSmallFrames: c.omitSmallFrames, ...c.canvas, panels: c.panels.map((f, w) => ({ ...kn(fc(f, c.canvas), c.canvas, f), layer: f.layer ?? w })) };
      }), A.value = i.value.width, E.value = i.value.height, xt(i.value.panels.length ? 0 : -1));
    }
    function br() {
      Bo();
      const c = Js({ width: A.value, height: E.value });
      if (!c) {
        g.value = "画布宽高须为 64～8192 的数值，输入完成后自动对齐到最近的 16 倍数。";
        return;
      }
      _e(() => {
        const a = we.value;
        i.value.panels = i.value.panels.map((f) => ({ ...f, ...tt({ x: f.x * c.width / a.width, y: f.y * c.height / a.height, width: f.width * c.width / a.width, height: f.height * c.height / a.height }, c) })), Object.assign(i.value, c);
      });
    }
    function Bo() {
      const c = (a) => Number.isFinite(a) ? Math.max(64, Math.min(8192, Math.round(a / 16) * 16)) : a;
      A.value = c(A.value), E.value = c(E.value);
    }
    function wr() {
      _e(() => {
        const c = i.value.panels.length % 5 * 0.04, a = kn(tt({ x: i.value.width * (0.08 + c), y: i.value.height * (0.08 + c), width: i.value.width * 0.55, height: i.value.height * 0.3 }, we.value), we.value);
        a.slots = {}, i.value.panels.push({ ...a, layer: Math.max(-1, ...i.value.panels.map((f, w) => f.layer ?? w)) + 1 }), xt(i.value.panels.length - 1);
      });
    }
    function ni(c) {
      const a = l.value + c;
      !k.value || a < 0 || a >= i.value.panels.length || _e(() => {
        const [f] = i.value.panels.splice(l.value, 1);
        i.value.panels.splice(a, 0, f), l.value = a;
      });
    }
    function xr(c, a) {
      const f = Number(a.target.value);
      K.value && Number.isFinite(f) && _e(() => {
        Gs(tt({ ...K.value, [c]: f }, we.value, r.value ? 1 : vt));
      }, !0);
    }
    function Ko(c, a) {
      si(`document:${c}`, () => {
        i.value[c] = a.target.value;
      });
    }
    function Zn(c) {
      const a = r.value;
      _e(() => {
        i.value.promptMode = c;
      }), a && Ue(l.value, a);
    }
    function _r(c) {
      _e(() => {
        i.value.useBboxCorners = c.target.checked;
      });
    }
    function Cr() {
      if (!k.value) return;
      const c = r.value || "F", a = ["T", "B", "TL", "TR", "BL", "BR", "ML", "MR"].includes(Dt(c)) ? "text" : ["S", "L", "R"].includes(Dt(c)) ? "character" : "object";
      _e(() => {
        ((k.value.slotContents ??= {})[c] ??= []).push({ label: a, caption: "", ...a === "text" ? { text: "", textType: "dialogue" } : {} });
      }, !0);
    }
    function Qn(c, a, f) {
      const w = f.target.value;
      _e(() => {
        Object.assign(pe.value[c], { [a]: w });
      }, !0);
    }
    function Sr(c) {
      _e(() => {
        pe.value.splice(c, 1);
      }, !0);
    }
    function oi(c, a) {
      const f = c + a;
      f < 0 || f >= pe.value.length || _e(() => {
        const [w] = pe.value.splice(c, 1);
        pe.value.splice(f, 0, w);
      }, !0);
    }
    function xn(c, a) {
      return c.slotNotes?.[a] ?? (c.slotContents?.[a] ?? []).filter((f) => f.label !== "text" && f.caption.trim()).map((f) => f.caption).join(`
`);
    }
    let _n = null;
    function si(c, a) {
      const f = We(), w = _n?.key === c && f === _n.after && Date.now() - _n.time < 750;
      _e(a, !0), w && f !== We() && _.value.pop(), _n = { key: c, time: Date.now(), after: We() };
    }
    function ii(c, a, f) {
      const w = i.value.panels[c];
      w && si(`note:${c}:${a}`, () => {
        const T = (w.slotContents?.[a] ?? []).filter((Y) => Y.label !== "text");
        T.length === 1 && (!w.slotNotes?.[a] || w.slotNotes[a] === T[0].caption) && (T[0].caption = f), f ? (w.slotNotes ??= {})[a] = f : w.slotNotes && delete w.slotNotes[a];
      });
    }
    function Mr(c) {
      ii(l.value, r.value || "F", c.target.value);
    }
    function eo(c, a) {
      Ue(c, a === "F" ? "" : a), ge.value = { index: c, key: a }, Ne.value = xn(i.value.panels[c], a), Bt(() => $t.value?.focus());
    }
    function li() {
      ge.value && (ii(ge.value.index, ge.value.key, Ne.value), ge.value = null);
    }
    function to(c, a) {
      const f = xn(c, a).replace(/\s+/g, " ").trim();
      return f.length > 80 ? f.slice(0, 80) + "…" : f;
    }
    let Rt = null, Cn = null, It = 0;
    function Or(c) {
      !Ye && !Pe && !j || (Cn = c, It || (It = requestAnimationFrame(() => {
        It = 0;
        const a = Cn;
        Cn = null, a && ri(a);
      })));
    }
    function Vo(c, a = !1) {
      It && cancelAnimationFrame(It), It = 0;
      const f = Cn;
      Cn = null, f && !a && ri(f), Er(c, a), Rt = null;
    }
    let Ye = null;
    function kr(c) {
      if (!c.ctrlKey || !c.deltaY || (c.preventDefault(), c.stopPropagation(), Ye || j || !x.value || !C.value)) return;
      const a = C.value, f = x.value.getBoundingClientRect(), w = (c.clientX - f.left) / f.width, T = (c.clientY - f.top) / f.height, Y = c.deltaY * (c.deltaMode === 1 ? 16 : c.deltaMode === 2 ? a.clientHeight : 1);
      F.value = me(F.value * Math.exp(-Y * 2e-3), 0.25, 4), Bt(() => {
        const B = x.value?.getBoundingClientRect();
        B && (a.scrollLeft += B.left + w * B.width - c.clientX, a.scrollTop += B.top + T * B.height - c.clientY);
      });
    }
    function jt(c) {
      const a = Rt ?? x.value.getBoundingClientRect();
      return { x: (c.clientX - a.left) / a.width * i.value.width, y: (c.clientY - a.top) / a.height * i.value.height };
    }
    function Ho(c, a, f = "", w = "") {
      if (!(c.button !== 0 || Ye)) {
        if (x.value?.focus?.(), c.shiftKey) {
          Se(a, w, !0);
          return;
        }
        (!Q(a, w) || f) && Ue(a, w), !k.value?.locked && (Rt = x.value.getBoundingClientRect(), Ye = { pointerId: c.pointerId, ...jt(c), clientX: c.clientX, clientY: c.clientY, dragging: !1, rect: { ...K.value }, before: We(), handle: f, quad: Dn(k.value, w || "F"), deform: c.ctrlKey && f.length === 2 });
      }
    }
    function ri(c) {
      if (j) {
        z(c);
        return;
      }
      if (Pe) {
        const $e = jt(c), at = Pe;
        Oe.value = { x: Math.min(at.x, $e.x), y: Math.min(at.y, $e.y), width: Math.abs($e.x - at.x), height: Math.abs($e.y - at.y) };
        return;
      }
      if (!Ye || c.pointerId !== Ye.pointerId) return;
      const a = jt(c), f = Ye, w = a.x - f.x, T = a.y - f.y;
      if (!f.dragging) {
        if (Math.hypot(c.clientX - f.clientX, c.clientY - f.clientY) < 3) return;
        f.dragging = !0, x.value.setPointerCapture(c.pointerId);
      }
      if (!f.handle && h.value.length > 1) {
        i.value.panels = JSON.parse(f.before).panels, qi(i.value.panels, h.value, w, T, we.value);
        return;
      }
      const Y = r.value ? 1 : vt;
      if (f.deform) {
        const $e = ["nw", "ne", "se", "sw"].indexOf(f.handle), at = f.quad.map((Uo, Fr) => Fr === $e ? [Uo[0] + w, Uo[1] + T] : Uo);
        dc(k.value, r.value || "F", at, we.value);
        return;
      }
      let B = { ...f.rect };
      f.handle ? (f.handle.includes("w") && (B.x = me(f.rect.x + w, 0, f.rect.x + f.rect.width - Y), B.width = f.rect.x + f.rect.width - B.x), f.handle.includes("n") && (B.y = me(f.rect.y + T, 0, f.rect.y + f.rect.height - Y), B.height = f.rect.y + f.rect.height - B.y), f.handle.includes("e") && (B.width = me(f.rect.width + w, Y, i.value.width - B.x)), f.handle.includes("s") && (B.height = me(f.rect.height + T, Y, i.value.height - B.y))) : (B.x += w, B.y += T), B = tt(B, we.value, Y);
      const Je = r.value ? [k.value, ...Object.keys(k.value.slots).filter(($e) => $e !== r.value).map(($e) => Ge(k.value, $e))] : i.value.panels.filter(($e, at) => at !== l.value), Ee = { ...B };
      yn.value && !c.altKey && (B = ls(B, we.value, Je, 6 * i.value.width / (Rt ?? x.value.getBoundingClientRect()).width, !!f.handle, Y)), (f.handle === "e" || f.handle === "w") && (B.y = Ee.y, B.height = Ee.height), (f.handle === "n" || f.handle === "s") && (B.x = Ee.x, B.width = Ee.width), Gs(B);
    }
    function Er(c, a = !1) {
      if (j) {
        re(c, a);
        return;
      }
      if (Pe) {
        const w = Oe.value, T = Pe.selection;
        if (Pe = null, Oe.value = null, !a) {
          u.value = [...T, ...i.value.panels.flatMap((B, Je) => B.x >= w.x && B.y >= w.y && B.x + B.width <= w.x + w.width && B.y + B.height <= w.y + w.height ? [{ panel: Je, slot: "" }] : [])];
          const Y = u.value.at(-1);
          l.value = Y?.panel ?? -1, r.value = "";
        }
        x.value?.hasPointerCapture(c.pointerId) && x.value.releasePointerCapture(c.pointerId);
        return;
      }
      if (!Ye || c.pointerId !== Ye.pointerId) return;
      const f = Ye.before;
      Ye = null, x.value?.hasPointerCapture(c.pointerId) && x.value.releasePointerCapture(c.pointerId), a ? Xn(f) : Zs(f);
    }
    function Tr() {
      const c = Dn(k.value, r.value || "F");
      return ["nw", "ne", "se", "sw"].flatMap((a, f) => [{ name: a, x: c[f][0], y: c[f][1] }, { name: ["n", "e", "s", "w"][f], x: (c[f][0] + c[(f + 1) % 4][0]) / 2, y: (c[f][1] + c[(f + 1) % 4][1]) / 2 }]);
    }
    function ai(c, a) {
      return Dn(c, a).map((f) => f.join(",")).join(" ");
    }
    function no() {
      W(), We() !== R.value || A.value !== i.value.width || E.value !== i.value.height ? b.value = !0 : o("close");
    }
    function Ar(c) {
      if (c.key === "Tab" && O.value) {
        const a = [...O.value.querySelectorAll('button:not(:disabled),input,textarea,select,[tabindex="0"]')], w = O.value.getRootNode().activeElement;
        c.shiftKey && (w === a[0] || w === O.value) ? (c.preventDefault(), a.at(-1)?.focus()) : !c.shiftKey && w === a.at(-1) && (c.preventDefault(), a[0]?.focus());
      }
      if ($.value && (c.key === "Escape" || (c.ctrlKey || c.metaKey) && c.key.toLowerCase() === "z")) {
        c.preventDefault(), c.stopPropagation(), W();
        return;
      }
      if (c.key === "Escape") {
        if (c.stopPropagation(), ge.value) {
          ge.value = null;
          return;
        }
        if (y.value) {
          y.value = null;
          return;
        }
        no();
        return;
      }
      if ((c.ctrlKey || c.metaKey) && c.key.toLowerCase() === "s") {
        c.preventDefault(), c.stopPropagation(), c.target?.blur?.(), Bt(() => ui(!0));
        return;
      }
      if (!c.target.matches("input,textarea,select,[contenteditable=true]")) {
        if (c.code === "Space") {
          c.preventDefault(), L = !0;
          return;
        }
        if ((c.ctrlKey || c.metaKey) && c.key.toLowerCase() === "d") {
          c.preventDefault(), Ze();
          return;
        }
        if ((c.ctrlKey || c.metaKey) && c.key === "0") {
          c.preventDefault(), F.value = 1;
          return;
        }
        if (c.key === "Home") {
          c.preventDefault(), tn();
          return;
        }
        if (c.key.toLowerCase() === "f" && !c.ctrlKey && !c.metaKey) {
          c.preventDefault(), tn(!0);
          return;
        }
        if ((c.ctrlKey || c.metaKey) && ["z", "y"].includes(c.key.toLowerCase()))
          c.preventDefault(), c.key.toLowerCase() === "y" || c.shiftKey ? ei() : Qs();
        else if (c.key === "Delete")
          c.preventDefault(), Pt();
        else if (K.value && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(c.key)) {
          c.preventDefault();
          const a = c.shiftKey ? 10 : 1;
          ne(() => qi(i.value.panels, h.value, c.key === "ArrowRight" ? a : c.key === "ArrowLeft" ? -a : 0, c.key === "ArrowDown" ? a : c.key === "ArrowUp" ? -a : 0, we.value));
        }
      }
    }
    function ui(c = !1) {
      if (W(), A.value !== i.value.width || E.value !== i.value.height) {
        g.value = "画布尺寸已修改，请先点击“应用尺寸”。";
        return;
      }
      if (!i.value.id.trim() || n.existingIds.includes(i.value.id.trim()) && i.value.id.trim() !== S.value) {
        g.value = "版式库已有此 ID，请填写未使用的 ID，或打开该版式编辑。";
        return;
      }
      if (!i.value.panels.length) {
        g.value = "请至少添加一格。";
        return;
      }
      try {
        const a = Nn(i.value.width, i.value.height), f = ws(a);
        if (i.value.id.trim() === n.editingId && n.sources.some((B) => {
          const Je = Nn(B.canvas.width, B.canvas.height), Ee = ws(Je);
          return B.id === n.editingId && Je !== a && (i.value.width !== f.width || i.value.height !== f.height || B.canvas.width !== Ee.width || B.canvas.height !== Ee.height);
        })) {
          g.value = "此版式含另一画布方向。使用非标准尺寸时请填写新的版式 ID，另存后可保留原版式的两个方向。";
          return;
        }
        const w = { ...i.value.metadata };
        delete w.panels, delete w.key;
        const T = n.sources.find((B) => B.id === i.value.metadata?.id && Nn(B.canvas.width, B.canvas.height) !== a);
        T && (w[a === "portrait" ? "landscape" : "portrait"] = T.panels);
        const Y = ac(JSON.stringify({ ...w, id: i.value.id.trim(), label: i.value.label.trim() || i.value.id.trim(), description: i.value.description.trim(), usage: w.usage ?? i.value.description.trim(), promptCaption: w.promptCaption ?? i.value.description.trim(), promptMode: i.value.promptMode, useBboxCorners: i.value.useBboxCorners, omitFullPageFrame: i.value.omitFullPageFrame, omitSmallFrames: i.value.omitSmallFrames, canvas: we.value, readingOrder: Xs.value.join(" → "), [a]: i.value.panels.map((B, Je) => hc(B, we.value, Xs.value[Je])) }));
        o("save", Y, c, () => {
          S.value = Y.id, R.value = We();
        });
      } catch (a) {
        g.value = a instanceof Error ? a.message : String(a);
      }
    }
    return Ls(() => {
      It && cancelAnimationFrame(It), W();
    }), jl(() => {
      n.initialKey && ti(), _.value = [], D.value = [], R.value = We(), Bt(() => O.value?.focus());
    }), (c, a) => (J(), Hn(ic, {
      open: !0,
      "top-layer": "",
      onClose: no
    }, {
      default: El(() => [
        m(
          "section",
          {
            ref_key: "dialog",
            ref: O,
            class: "manga-designer",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "快捷自定义版式",
            tabindex: "-1",
            onKeydown: Re(Ar, ["stop"]),
            onKeyup: a[53] || (a[53] = (f) => /* @__PURE__ */ ke(L) ? L.value = !1 : L = !1),
            onFocusout: a[54] || (a[54] = (f) => /* @__PURE__ */ ke(L) ? L.value = !1 : L = !1),
            onPointerdown: a[55] || (a[55] = (f) => y.value = null)
          },
          [
            y.value ? (J(), G(
              "div",
              {
                key: 0,
                class: "context-menu",
                role: "menu",
                "aria-label": "画布右键菜单",
                style: Kt({ left: y.value.x + "px", top: y.value.y + "px", maxHeight: y.value.height + "px" }),
                onPointerdown: a[11] || (a[11] = Re(() => {
                }, ["stop"])),
                onContextmenu: a[12] || (a[12] = Re(() => {
                }, ["prevent"]))
              },
              [
                m("button", {
                  type: "button",
                  role: "menuitem",
                  "aria-expanded": M.value,
                  onClick: a[0] || (a[0] = (f) => M.value = !M.value)
                }, "＋ 绘制新框 " + X(M.value ? "▾" : "▸"), 9, bc),
                M.value ? (J(), G("div", wc, [
                  m("button", {
                    type: "button",
                    role: "menuitem",
                    onClick: a[1] || (a[1] = (f) => H("F"))
                  }, "外框 F"),
                  m("button", {
                    type: "button",
                    role: "menuitem",
                    disabled: !N.value,
                    onClick: a[2] || (a[2] = (f) => H("S"))
                  }, "人物 S", 8, xc),
                  m("button", {
                    type: "button",
                    role: "menuitem",
                    disabled: !N.value,
                    onClick: a[3] || (a[3] = (f) => H("O"))
                  }, "物品 O", 8, _c),
                  m("button", {
                    type: "button",
                    role: "menuitem",
                    disabled: !N.value,
                    onClick: a[4] || (a[4] = (f) => H("text"))
                  }, "文字", 8, Cc),
                  m(
                    "small",
                    null,
                    X(N.value ? `内框归第 ${y.value.parent + 1} 格` : "选择未锁定的 F 后可添加内框"),
                    1
                    /* TEXT */
                  )
                ])) : Te("v-if", !0),
                y.value.hits.length ? (J(), G("details", Sc, [
                  m(
                    "summary",
                    null,
                    "选择此处的框（" + X(y.value.hits.length) + "）",
                    1
                    /* TEXT */
                  ),
                  m("div", null, [
                    (J(!0), G(
                      he,
                      null,
                      Qe(y.value.hits, (f) => (J(), G("button", {
                        key: `${f.panel}:${f.slot}`,
                        type: "button",
                        role: "menuitem",
                        onClick: (w) => ce(f)
                      }, X(Me(f)), 9, Mc))),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])) : Te("v-if", !0),
                k.value ? (J(), G(
                  he,
                  { key: 2 },
                  [
                    m("button", {
                      type: "button",
                      role: "menuitem",
                      onClick: a[5] || (a[5] = (f) => {
                        eo(l.value, r.value || "F"), y.value = null;
                      })
                    }, "编辑画面描述"),
                    m("button", {
                      type: "button",
                      role: "menuitem",
                      disabled: k.value.locked,
                      onClick: a[6] || (a[6] = (f) => {
                        Ze(), y.value = null;
                      })
                    }, "复制 Ctrl+D", 8, Oc),
                    m("button", {
                      type: "button",
                      role: "menuitem",
                      disabled: k.value.locked,
                      onClick: a[7] || (a[7] = (f) => {
                        Pt(), y.value = null;
                      })
                    }, "删除 Delete", 8, kc),
                    m("button", {
                      type: "button",
                      role: "menuitem",
                      onClick: a[8] || (a[8] = (f) => {
                        vn(), y.value = null;
                      })
                    }, "锁定 / 解锁"),
                    m("button", {
                      type: "button",
                      role: "menuitem",
                      onClick: a[9] || (a[9] = (f) => {
                        Gn(1), y.value = null;
                      })
                    }, "上移一层"),
                    m("button", {
                      type: "button",
                      role: "menuitem",
                      onClick: a[10] || (a[10] = (f) => {
                        Gn(-1), y.value = null;
                      })
                    }, "下移一层")
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : Te("v-if", !0)
              ],
              36
              /* STYLE, NEED_HYDRATION */
            )) : Te("v-if", !0),
            m("header", null, [
              m(
                "strong",
                null,
                X(e.editingId ? "可视化编辑版式" : "快捷自定义版式"),
                1
                /* TEXT */
              ),
              m("div", Ec, [
                m("button", {
                  type: "button",
                  onClick: no
                }, "取消"),
                m(
                  "button",
                  {
                    type: "button",
                    class: "primary",
                    onClick: a[13] || (a[13] = (f) => ui(!1))
                  },
                  X(e.editingId && i.value.id.trim() === e.editingId ? "保存版式修改" : "保存新版式"),
                  1
                  /* TEXT */
                ),
                m("button", {
                  type: "button",
                  "aria-label": "关闭编辑器",
                  onClick: no
                }, "✕")
              ])
            ]),
            m("div", Tc, [
              m("button", {
                type: "button",
                onClick: a[14] || (a[14] = (f) => d.value = !d.value)
              }, "对象栏"),
              m("button", {
                type: "button",
                onClick: a[15] || (a[15] = (f) => v.value = !v.value)
              }, "属性栏"),
              m(
                "span",
                Ac,
                X(We() === R.value ? "已保存" : "有未保存修改") + " · Ctrl+S 保存并继续编辑",
                1
                /* TEXT */
              ),
              m("label", null, [
                a[56] || (a[56] = Ce(
                  "画布宽 ",
                  -1
                  /* CACHED */
                )),
                ut(m(
                  "input",
                  {
                    "onUpdate:modelValue": a[16] || (a[16] = (f) => A.value = f),
                    "aria-label": "画布宽",
                    type: "number",
                    min: "64",
                    max: "8192",
                    step: "16",
                    onChange: Bo
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [
                    ss,
                    A.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              m("label", null, [
                a[57] || (a[57] = Ce(
                  "画布高 ",
                  -1
                  /* CACHED */
                )),
                ut(m(
                  "input",
                  {
                    "onUpdate:modelValue": a[17] || (a[17] = (f) => E.value = f),
                    "aria-label": "画布高",
                    type: "number",
                    min: "64",
                    max: "8192",
                    step: "16",
                    onChange: Bo
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [
                    ss,
                    E.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              m("button", {
                type: "button",
                onClick: br
              }, "应用尺寸")
            ]),
            a[84] || (a[84] = m(
              "p",
              { class: "hint" },
              "改变画布尺寸会等比例换算各轴坐标。工作流与预设尺寸须与此画布一致；请连接节点的宽高输出到潜空间尺寸输入。",
              -1
              /* CACHED */
            )),
            m(
              "div",
              {
                class: et(["designer-body", { "hide-objects": !d.value, "hide-properties": !v.value }])
              },
              [
                ut(m(
                  "aside",
                  Fc,
                  [
                    m("details", null, [
                      a[60] || (a[60] = m(
                        "summary",
                        null,
                        "载入其他版式",
                        -1
                        /* CACHED */
                      )),
                      m("label", null, [
                        a[59] || (a[59] = Ce(
                          "从现有版式复制",
                          -1
                          /* CACHED */
                        )),
                        ut(m(
                          "select",
                          {
                            "onUpdate:modelValue": a[18] || (a[18] = (f) => rt.value = f),
                            "aria-label": "源版式"
                          },
                          [
                            a[58] || (a[58] = m(
                              "option",
                              { value: "" },
                              "请选择",
                              -1
                              /* CACHED */
                            )),
                            (J(!0), G(
                              he,
                              null,
                              Qe(e.sources, (f) => (J(), G("option", {
                                key: f.key,
                                value: f.key
                              }, X(f.label) + " · " + X(f.canvas.width) + "×" + X(f.canvas.height), 9, Pc))),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ],
                          512
                          /* NEED_PATCH */
                        ), [
                          [Yu, rt.value]
                        ])
                      ]),
                      m("button", {
                        type: "button",
                        disabled: !rt.value,
                        onClick: ti
                      }, "载入副本", 8, $c)
                    ]),
                    m("button", {
                      type: "button",
                      onClick: wr
                    }, "＋ 新增分格"),
                    m("button", {
                      type: "button",
                      disabled: !k.value,
                      onClick: Ze
                    }, "复制选中项", 8, Rc),
                    m("button", {
                      type: "button",
                      disabled: !k.value,
                      onClick: Pt
                    }, "删除选中项", 8, Ic),
                    m("div", jc, [
                      m("button", {
                        type: "button",
                        disabled: !_.value.length,
                        onClick: Qs
                      }, "撤销", 8, Nc),
                      m("button", {
                        type: "button",
                        disabled: !D.value.length,
                        onClick: ei
                      }, "重做", 8, Dc)
                    ]),
                    m("label", Lc, [
                      ut(m(
                        "input",
                        {
                          "onUpdate:modelValue": a[19] || (a[19] = (f) => yn.value = f),
                          type: "checkbox"
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [ao, yn.value]
                      ]),
                      a[61] || (a[61] = Ce(
                        "对齐吸附",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    m("label", Bc, [
                      ut(m(
                        "input",
                        {
                          "onUpdate:modelValue": a[20] || (a[20] = (f) => p.value = f),
                          type: "checkbox"
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [ao, p.value]
                      ]),
                      a[62] || (a[62] = Ce(
                        "显示可编辑槽位",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    m("label", Kc, [
                      ut(m(
                        "input",
                        {
                          "onUpdate:modelValue": a[21] || (a[21] = (f) => i.value.omitFullPageFrame = f),
                          type: "checkbox"
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [ao, i.value.omitFullPageFrame]
                      ]),
                      a[63] || (a[63] = Ce(
                        "省略全画布 F 框说明",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    m("label", Vc, [
                      ut(m(
                        "input",
                        {
                          "onUpdate:modelValue": a[22] || (a[22] = (f) => i.value.omitSmallFrames = f),
                          type: "checkbox"
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [ao, i.value.omitSmallFrames]
                      ]),
                      a[64] || (a[64] = Ce(
                        "省略小格 F 框说明",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    m("label", Hc, [
                      m("input", {
                        checked: i.value.useBboxCorners,
                        type: "checkbox",
                        onChange: _r
                      }, null, 40, Uc),
                      a[65] || (a[65] = Ce(
                        "使用 BBOX 角点",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    a[67] || (a[67] = m(
                      "p",
                      { class: "hint" },
                      "拖动外框移动整格；拖动黄色/绿色小框单独编辑槽位。直接拖动四角或边中点缩放；按住 Ctrl 再拖四角才形变。Alt 暂停吸附，方向键微调，Delete 删除选中项，Ctrl+Z 撤销。",
                      -1
                      /* CACHED */
                    )),
                    m("details", Wc, [
                      a[66] || (a[66] = m(
                        "summary",
                        null,
                        "对象 · 读序（先读 1）",
                        -1
                        /* CACHED */
                      )),
                      (J(!0), G(
                        he,
                        null,
                        Qe(i.value.panels, (f, w) => (J(), G("div", {
                          key: w,
                          class: "tree-panel"
                        }, [
                          m("button", {
                            type: "button",
                            class: et({ active: Q(w) }),
                            onClick: (T) => Se(w, "", T.shiftKey)
                          }, "第 " + X(w + 1) + " 格 · F " + X(f.locked ? "🔒" : ""), 11, Jc),
                          m("div", zc, [
                            (J(!0), G(
                              he,
                              null,
                              Qe(Object.keys(f.slots), (T) => (J(), G("button", {
                                key: T,
                                type: "button",
                                class: et({ active: Q(w, T) }),
                                onClick: (Y) => Se(w, T, Y.shiftKey),
                                onDblclick: (Y) => eo(w, T)
                              }, X(T), 43, qc))),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])
                        ]))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    m("div", Yc, [
                      m("button", {
                        type: "button",
                        disabled: !h.value.length,
                        onClick: vn
                      }, "锁定 / 解锁", 8, Gc),
                      m("button", {
                        type: "button",
                        disabled: !k.value || !!r.value,
                        onClick: a[23] || (a[23] = (f) => He("x"))
                      }, "左右等分", 8, Xc),
                      m("button", {
                        type: "button",
                        disabled: !k.value || !!r.value,
                        onClick: a[24] || (a[24] = (f) => He("y"))
                      }, "上下等分", 8, Zc)
                    ]),
                    a[68] || (a[68] = m(
                      "strong",
                      null,
                      "调整读序",
                      -1
                      /* CACHED */
                    )),
                    m("div", Qc, [
                      m("button", {
                        type: "button",
                        disabled: l.value <= 0,
                        onClick: a[25] || (a[25] = (f) => ni(-1))
                      }, "提前", 8, ef),
                      m("button", {
                        type: "button",
                        disabled: l.value < 0 || l.value >= i.value.panels.length - 1,
                        onClick: a[26] || (a[26] = (f) => ni(1))
                      }, "延后", 8, tf)
                    ]),
                    m("div", nf, [
                      m("button", {
                        type: "button",
                        disabled: wn.value < 0 || wn.value >= i.value.panels.length - 1,
                        onClick: a[27] || (a[27] = (f) => Gn(1))
                      }, "上移一层", 8, of),
                      m("button", {
                        type: "button",
                        disabled: wn.value <= 0,
                        onClick: a[28] || (a[28] = (f) => Gn(-1))
                      }, "下移一层", 8, sf)
                    ]),
                    m(
                      "p",
                      lf,
                      X(k.value ? `当前第 ${wn.value + 1} / ${i.value.panels.length} 层（数字越大越靠前）。` : "") + "层级控制重叠遮挡，不改变读序；遮挡关系自动写入生图提示词。",
                      1
                      /* TEXT */
                    )
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [Pi, d.value]
                ]),
                m("div", rf, [
                  m(
                    "div",
                    {
                      ref_key: "canvasViewport",
                      ref: C,
                      class: "canvas-viewport",
                      "aria-label": "画布缩放区域",
                      onWheelCapture: kr,
                      onPointerdownCapture: Lo,
                      onPointermove: Wt,
                      onPointerup: Jt,
                      onPointercancel: Jt
                    },
                    [
                      (J(), G("svg", {
                        ref_key: "svg",
                        ref: x,
                        class: et(["layout-canvas", { drawing: !!$.value }]),
                        onPointerdownCapture: le,
                        onContextmenu: a[29] || (a[29] = Re((f) => nn(f), ["prevent"])),
                        viewBox: `0 0 ${i.value.width} ${i.value.height}`,
                        style: Kt({ aspectRatio: `${i.value.width}/${i.value.height}`, width: `min(${100 * F.value}%, ${62 * i.value.width / i.value.height * F.value}vh)` }),
                        role: "img",
                        "aria-label": "版式画布",
                        tabindex: "0",
                        onPointermove: Or,
                        onPointerup: a[30] || (a[30] = (f) => Vo(f)),
                        onPointercancel: a[31] || (a[31] = (f) => Vo(f, !0)),
                        onLostpointercapture: a[32] || (a[32] = (f) => Vo(f, !0))
                      }, [
                        m("rect", {
                          width: i.value.width,
                          height: i.value.height,
                          fill: "white",
                          onPointerdown: mn
                        }, null, 40, uf),
                        (J(!0), G(
                          he,
                          null,
                          Qe(yr.value, ({ rect: f, index: w }) => (J(), G("g", {
                            key: w,
                            class: et(["panel", { selected: Q(w) }]),
                            "data-panel": w,
                            onContextmenu: (T) => nn(T, w),
                            onPointerdown: Re((T) => Ho(T, w), ["stop"]),
                            onDblclick: Re((T) => eo(w, "F"), ["stop", "prevent"])
                          }, [
                            m("polygon", {
                              points: ai(f, "F"),
                              fill: Q(w) ? "#dcecff" : "#f1f2f4",
                              stroke: Q(w) ? "#2675cf" : "#333",
                              "stroke-width": "2",
                              "vector-effect": "non-scaling-stroke"
                            }, null, 8, ff),
                            to(f, "F") ? (J(), G("foreignObject", {
                              key: 0,
                              x: f.x + 6,
                              y: f.y + i.value.width * 0.04,
                              width: Math.max(1, f.width - 12),
                              height: Math.max(1, Math.min(f.height - i.value.width * 0.04, i.value.width * 0.055)),
                              class: "frame-description"
                            }, [
                              m("div", {
                                style: Kt({ fontSize: `${i.value.width * 0.018}px` }),
                                title: xn(f, "F")
                              }, X(to(f, "F")), 13, hf)
                            ], 8, df)) : Te("v-if", !0),
                            (J(!0), G(
                              he,
                              null,
                              Qe(mr(f, w), (T) => (J(), G("g", {
                                key: T.key,
                                class: "slot",
                                "data-slot": T.key,
                                onPointerdown: Re((Y) => Ho(Y, w, "", T.key), ["stop"]),
                                onDblclick: Re((Y) => eo(w, T.key), ["stop", "prevent"]),
                                onContextmenu: (Y) => nn(Y, w, T.key)
                              }, [
                                m("polygon", {
                                  points: ai(f, T.key),
                                  fill: En(Dt)(T.key) === "T" ? "#e5ba6638" : "#50a18a18",
                                  stroke: Q(w, T.key) ? "#df7827" : En(Dt)(T.key) === "T" ? "#b48733" : "#50a18a",
                                  "stroke-width": Q(w, T.key) ? 2 : 1,
                                  "stroke-dasharray": "5 4",
                                  "vector-effect": "non-scaling-stroke"
                                }, null, 8, gf),
                                m("text", {
                                  x: T.rect.x + 5,
                                  y: T.rect.y + i.value.width * 0.025,
                                  "font-size": i.value.width * 0.021,
                                  fill: "#575c62"
                                }, X(T.key), 9, vf),
                                to(f, T.key) ? (J(), G("foreignObject", {
                                  key: 0,
                                  x: T.rect.x + 6,
                                  y: T.rect.y + i.value.width * 0.032,
                                  width: Math.max(1, T.rect.width - 12),
                                  height: Math.max(1, Math.min(T.rect.height - i.value.width * 0.032, i.value.width * 0.055)),
                                  class: "frame-description"
                                }, [
                                  m("div", {
                                    style: Kt({ fontSize: `${i.value.width * 0.018}px` }),
                                    title: xn(f, T.key)
                                  }, X(to(f, T.key)), 13, yf)
                                ], 8, mf)) : Te("v-if", !0)
                              ], 40, pf))),
                              128
                              /* KEYED_FRAGMENT */
                            )),
                            m("text", {
                              x: f.x + 8,
                              y: f.y + i.value.width * 0.032,
                              "font-size": i.value.width * 0.026,
                              fill: "#164b83"
                            }, X(w + 1), 9, bf)
                          ], 42, cf))),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        P.value ? (J(), G(
                          "rect",
                          ys({
                            key: 0,
                            class: "draw-preview"
                          }, P.value, {
                            fill: "#2675cf22",
                            stroke: "#2675cf",
                            "stroke-dasharray": "6 4",
                            "vector-effect": "non-scaling-stroke",
                            "pointer-events": "none"
                          }),
                          null,
                          16
                          /* FULL_PROPS */
                        )) : Te("v-if", !0),
                        Oe.value ? (J(), G(
                          "rect",
                          ys({ key: 1 }, Oe.value, {
                            fill: "#2675cf22",
                            stroke: "#2675cf",
                            "stroke-dasharray": "5 4",
                            "vector-effect": "non-scaling-stroke"
                          }),
                          null,
                          16
                          /* FULL_PROPS */
                        )) : Te("v-if", !0),
                        !$.value && k.value && K.value && h.value.length === 1 && !k.value.locked ? (J(!0), G(
                          he,
                          { key: 2 },
                          Qe(Tr(), (f) => (J(), G("rect", {
                            key: f.name,
                            class: "resize-handle",
                            "data-ctrl-deform": f.name.length === 2,
                            "data-handle": f.name,
                            rx: f.name.length === 2 ? i.value.width * 9e-3 : 0,
                            x: f.x - i.value.width * 9e-3,
                            y: f.y - i.value.width * 9e-3,
                            width: i.value.width * 0.018,
                            height: i.value.width * 0.018,
                            fill: r.value ? "#df7827" : "#2675cf",
                            stroke: "white",
                            "vector-effect": "non-scaling-stroke",
                            style: Kt({ cursor: `${f.name}-resize` }),
                            "aria-label": `${f.name} 控制点`,
                            onPointerdown: Re((w) => Ho(w, l.value, f.name, r.value), ["stop", "prevent"])
                          }, null, 44, wf))),
                          128
                          /* KEYED_FRAGMENT */
                        )) : Te("v-if", !0)
                      ], 46, af))
                    ],
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ),
                  $.value ? (J(), G("div", xf, [
                    Ce(
                      X($.value.kind === "F" ? "绘制外框 F" : `绘制${$.value.kind === "S" ? "人物" : $.value.kind === "O" ? "物品" : "文字"}内框 · 归第 ${V.value + 1} 格`) + "：按住左键拖动，Esc 取消",
                      1
                      /* TEXT */
                    ),
                    m("button", {
                      type: "button",
                      onClick: W
                    }, "取消绘制")
                  ])) : Te("v-if", !0),
                  m("div", _f, [
                    m("button", {
                      type: "button",
                      onClick: a[33] || (a[33] = (f) => tn())
                    }, "适应画布"),
                    m("button", {
                      type: "button",
                      disabled: !h.value.length,
                      onClick: a[34] || (a[34] = (f) => tn(!0))
                    }, "聚焦选中 F", 8, Cf),
                    m("button", {
                      type: "button",
                      onClick: a[35] || (a[35] = (f) => F.value = 1)
                    }, "100%"),
                    m(
                      "span",
                      null,
                      "已选 " + X(h.value.length) + " 项",
                      1
                      /* TEXT */
                    ),
                    m("select", {
                      "aria-label": "批量对齐",
                      disabled: h.value.length < 2,
                      value: "",
                      onChange: a[36] || (a[36] = (f) => {
                        wt(f.target.value), f.target.value = "";
                      })
                    }, [...a[69] || (a[69] = [
                      m(
                        "option",
                        { value: "" },
                        "对齐 / 分布",
                        -1
                        /* CACHED */
                      ),
                      m(
                        "option",
                        { value: "left" },
                        "左对齐",
                        -1
                        /* CACHED */
                      ),
                      m(
                        "option",
                        { value: "right" },
                        "右对齐",
                        -1
                        /* CACHED */
                      ),
                      m(
                        "option",
                        { value: "top" },
                        "顶对齐",
                        -1
                        /* CACHED */
                      ),
                      m(
                        "option",
                        { value: "bottom" },
                        "底对齐",
                        -1
                        /* CACHED */
                      ),
                      m(
                        "option",
                        { value: "center-x" },
                        "水平居中",
                        -1
                        /* CACHED */
                      ),
                      m(
                        "option",
                        { value: "center-y" },
                        "垂直居中",
                        -1
                        /* CACHED */
                      ),
                      m(
                        "option",
                        { value: "gap-x" },
                        "水平等间距（3项）",
                        -1
                        /* CACHED */
                      ),
                      m(
                        "option",
                        { value: "gap-y" },
                        "垂直等间距（3项）",
                        -1
                        /* CACHED */
                      )
                    ])], 40, Sf)
                  ]),
                  m("p", Mf, [
                    Ce(
                      X(i.value.width) + "×" + X(i.value.height) + " · " + X(i.value.panels.length) + " 格 · 缩放 " + X(Math.round(F.value * 100)) + "% · Ctrl＋滚轮缩放 · 空格拖动画布 · Shift 多选 · 空白处框选 · 双击编辑描述",
                      1
                      /* TEXT */
                    ),
                    a[70] || (a[70] = m(
                      "br",
                      null,
                      null,
                      -1
                      /* CACHED */
                    )),
                    a[71] || (a[71] = Ce(
                      "右键绘制新框；选中框仅在编辑时临时置前，保存层级不变。槽位可单独移动，随外框缩放。",
                      -1
                      /* CACHED */
                    ))
                  ])
                ]),
                ut(m(
                  "aside",
                  Of,
                  [
                    m(
                      "div",
                      {
                        class: et(["mode-switch", { manual: i.value.promptMode === "manual" }]),
                        role: "tablist",
                        "aria-label": "内容编辑模式",
                        onKeydown: [
                          a[39] || (a[39] = uo(Re((f) => Zn("llm"), ["prevent"]), ["left"])),
                          a[40] || (a[40] = uo(Re((f) => Zn("manual"), ["prevent"]), ["right"]))
                        ]
                      },
                      [
                        a[72] || (a[72] = m(
                          "span",
                          {
                            class: "mode-thumb",
                            "aria-hidden": "true"
                          },
                          null,
                          -1
                          /* CACHED */
                        )),
                        m("button", {
                          type: "button",
                          role: "tab",
                          "aria-selected": i.value.promptMode === "llm",
                          onClick: a[37] || (a[37] = (f) => Zn("llm"))
                        }, "← LLM 说明", 8, kf),
                        m("button", {
                          type: "button",
                          role: "tab",
                          "aria-selected": i.value.promptMode === "manual",
                          onClick: a[38] || (a[38] = (f) => Zn("manual"))
                        }, "直接提示词 →", 8, Ef)
                      ],
                      34
                      /* CLASS, NEED_HYDRATION */
                    ),
                    m("details", null, [
                      a[75] || (a[75] = m(
                        "summary",
                        null,
                        "版式信息",
                        -1
                        /* CACHED */
                      )),
                      m("label", null, [
                        a[73] || (a[73] = Ce(
                          "版式 ID",
                          -1
                          /* CACHED */
                        )),
                        m("input", {
                          value: i.value.id,
                          "aria-label": "版式 ID",
                          onChange: a[41] || (a[41] = (f) => Ko("id", f))
                        }, null, 40, Tf)
                      ]),
                      m("label", null, [
                        a[74] || (a[74] = Ce(
                          "名称",
                          -1
                          /* CACHED */
                        )),
                        m("input", {
                          value: i.value.label,
                          "aria-label": "版式名称",
                          onChange: a[42] || (a[42] = (f) => Ko("label", f))
                        }, null, 40, Af)
                      ])
                    ]),
                    m("label", null, [
                      a[76] || (a[76] = Ce(
                        "画面描述",
                        -1
                        /* CACHED */
                      )),
                      m("textarea", {
                        value: i.value.description,
                        "aria-label": "整页画面描述",
                        rows: "3",
                        placeholder: "全页共用的画风、环境与光照；两种模式共用",
                        onInput: a[43] || (a[43] = (f) => Ko("description", f))
                      }, null, 40, Ff)
                    ]),
                    k.value ? (J(), G(
                      he,
                      { key: 0 },
                      [
                        m(
                          "strong",
                          null,
                          "第 " + X(l.value + 1) + " 格 · " + X(r.value ? `${r.value} ${Z[En(Dt)(r.value)] ?? "槽位"}` : "外框 F"),
                          1
                          /* TEXT */
                        ),
                        r.value ? (J(), G("div", Pf, [
                          m("div", { class: "inline" }, [
                            m("button", {
                              type: "button",
                              class: "primary",
                              onClick: be
                            }, "确定内框"),
                            m("button", {
                              type: "button",
                              onClick: qe
                            }, "取消内框修改")
                          ])
                        ])) : Te("v-if", !0),
                        m("button", {
                          type: "button",
                          disabled: !r.value,
                          onClick: pr
                        }, "删除选中槽位", 8, $f),
                        m("button", {
                          type: "button",
                          onClick: vr
                        }, "恢复本格默认槽位"),
                        m("div", Rf, [
                          m("select", {
                            value: ve.value,
                            "aria-label": "新增内框类型",
                            disabled: !te.value.length,
                            onChange: a[44] || (a[44] = (f) => oe.value = f.target.value)
                          }, [
                            (J(!0), G(
                              he,
                              null,
                              Qe(te.value, (f) => (J(), G("option", {
                                key: f,
                                value: f
                              }, X(f) + " " + X(Z[f]), 9, jf))),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ], 40, If),
                          m("button", {
                            type: "button",
                            disabled: !ve.value,
                            onClick: gr
                          }, "添加内框", 8, Nf)
                        ]),
                        m("label", null, [
                          Ce(
                            X(r.value ? `内框 ${r.value} 画面描述` : "外框 F 画面描述") + " ",
                            1
                            /* TEXT */
                          ),
                          m("textarea", {
                            value: xn(k.value, r.value || "F"),
                            "aria-label": "当前框画面描述",
                            rows: "3",
                            placeholder: r.value ? "描述本框的人物、动作、场景或取景" : "描述本格的场景与人物关系",
                            onInput: Mr
                          }, null, 40, Df)
                        ]),
                        i.value.promptMode === "manual" ? (J(), G("div", Lf, [
                          m(
                            "strong",
                            null,
                            X(r.value ? `内框 ${r.value}` : "外框 F") + " 追加人物／台词",
                            1
                            /* TEXT */
                          ),
                          (J(!0), G(
                            he,
                            null,
                            Qe(pe.value, (f, w) => (J(), G("div", {
                              key: w,
                              class: "content-card"
                            }, [
                              m("div", Bf, [
                                m(
                                  "span",
                                  null,
                                  X(w + 1),
                                  1
                                  /* TEXT */
                                ),
                                m("select", {
                                  value: f.label,
                                  "aria-label": "内容类型",
                                  onChange: (T) => Qn(w, "label", T)
                                }, [...a[77] || (a[77] = [
                                  m(
                                    "option",
                                    { value: "object" },
                                    "场景／物件",
                                    -1
                                    /* CACHED */
                                  ),
                                  m(
                                    "option",
                                    { value: "character" },
                                    "人物",
                                    -1
                                    /* CACHED */
                                  ),
                                  m(
                                    "option",
                                    { value: "text" },
                                    "文字",
                                    -1
                                    /* CACHED */
                                  )
                                ])], 40, Kf)
                              ]),
                              f.label === "text" ? (J(), G(
                                he,
                                { key: 0 },
                                [
                                  m("label", null, [
                                    a[79] || (a[79] = Ce(
                                      "文字类型",
                                      -1
                                      /* CACHED */
                                    )),
                                    m("select", {
                                      value: f.textType ?? "dialogue",
                                      onChange: (T) => Qn(w, "textType", T)
                                    }, [...a[78] || (a[78] = [
                                      m(
                                        "option",
                                        { value: "dialogue" },
                                        "对白",
                                        -1
                                        /* CACHED */
                                      ),
                                      m(
                                        "option",
                                        { value: "narration" },
                                        "旁白",
                                        -1
                                        /* CACHED */
                                      ),
                                      m(
                                        "option",
                                        { value: "sfx" },
                                        "日文拟声",
                                        -1
                                        /* CACHED */
                                      )
                                    ])], 40, Vf)
                                  ]),
                                  m("label", null, [
                                    a[80] || (a[80] = Ce(
                                      "准确台词／文字",
                                      -1
                                      /* CACHED */
                                    )),
                                    m("textarea", {
                                      value: f.text ?? "",
                                      "aria-label": "准确台词",
                                      rows: "3",
                                      onInput: (T) => Qn(w, "text", T)
                                    }, null, 40, Hf)
                                  ])
                                ],
                                64
                                /* STABLE_FRAGMENT */
                              )) : Te("v-if", !0),
                              m("label", null, [
                                Ce(
                                  X(f.label === "text" ? "文字表现说明（选填）" : "画面描述"),
                                  1
                                  /* TEXT */
                                ),
                                m("textarea", {
                                  value: f.caption,
                                  "aria-label": "当前内容描述",
                                  rows: "3",
                                  placeholder: f.label === "text" ? "英文描述说话人、气泡形状与位置；留空使用常规样式" : "英文描述本框可见的场景、人物、动作与取景",
                                  onInput: (T) => Qn(w, "caption", T)
                                }, null, 40, Uf)
                              ]),
                              m("div", Wf, [
                                m("button", {
                                  type: "button",
                                  disabled: w === 0,
                                  onClick: (T) => oi(w, -1)
                                }, "上移", 8, Jf),
                                m("button", {
                                  type: "button",
                                  disabled: w === pe.value.length - 1,
                                  onClick: (T) => oi(w, 1)
                                }, "下移", 8, zf),
                                m("button", {
                                  type: "button",
                                  onClick: (T) => Sr(w)
                                }, "删除内容", 8, qf)
                              ])
                            ]))),
                            128
                            /* KEYED_FRAGMENT */
                          )),
                          m("button", {
                            type: "button",
                            onClick: Cr
                          }, "＋ 添加画面／台词"),
                          a[81] || (a[81] = m(
                            "p",
                            { class: "hint" },
                            "一个框可添加多个人物或多条文字，按列表顺序输出。空白条目留作草稿；每句台词单独一项，人物与气泡可用独立内框定位。",
                            -1
                            /* CACHED */
                          ))
                        ])) : Te("v-if", !0),
                        m("div", Yf, [
                          m(
                            "button",
                            {
                              type: "button",
                              class: et({ active: !r.value }),
                              onClick: be
                            },
                            "外框 F",
                            2
                            /* CLASS */
                          ),
                          (J(!0), G(
                            he,
                            null,
                            Qe(k.value.slots, (f, w) => (J(), G("button", {
                              key: w,
                              type: "button",
                              class: et({ active: r.value === w }),
                              onClick: (T) => Ue(l.value, String(w))
                            }, X(w) + " " + X(Z[En(Dt)(String(w))] ?? ""), 11, Gf))),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        (J(), G(
                          he,
                          null,
                          Qe(["x", "y", "width", "height"], (f) => m("label", { key: f }, [
                            Ce(
                              X({ x: "左边距", y: "上边距", width: "宽度", height: "高度" }[f]),
                              1
                              /* TEXT */
                            ),
                            m("input", {
                              value: K.value?.[f],
                              "aria-label": `${r.value ? "槽位" : "分格"}${f}`,
                              type: "number",
                              step: "1",
                              onChange: (w) => xr(f, w)
                            }, null, 40, Xf)
                          ])),
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : (J(), G("p", Zf, "添加或选择一格，编辑精确尺寸。")),
                    a[82] || (a[82] = m(
                      "p",
                      { class: "hint" },
                      "右侧按钮可选重叠槽位，Delete 删除小框，撤销可恢复。普通拖动四角或边中点改大小，Ctrl+拖四角改形状。MOSS 以外接矩形与轮廓描述接收形状参考，不保证精确裁剪。",
                      -1
                      /* CACHED */
                    ))
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [Pi, v.value]
                ])
              ],
              2
              /* CLASS */
            ),
            g.value ? (J(), G(
              "p",
              Qf,
              X(g.value),
              1
              /* TEXT */
            )) : Te("v-if", !0),
            b.value ? (J(), G("footer", ed, [
              a[83] || (a[83] = m(
                "span",
                null,
                "放弃未保存的修改？",
                -1
                /* CACHED */
              )),
              m("button", {
                type: "button",
                onClick: a[45] || (a[45] = (f) => b.value = !1)
              }, "继续编辑"),
              m("button", {
                type: "button",
                onClick: a[46] || (a[46] = (f) => o("close"))
              }, "放弃修改")
            ])) : Te("v-if", !0),
            ge.value ? (J(), G(
              "div",
              {
                key: 3,
                class: "quick-mask",
                onMousedown: a[52] || (a[52] = Re((f) => ge.value = null, ["self"]))
              },
              [
                m(
                  "section",
                  {
                    class: "quick-dialog",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "快速编辑画面描述",
                    onKeydown: [
                      a[50] || (a[50] = Re(() => {
                      }, ["stop"])),
                      a[51] || (a[51] = uo(Re((f) => ge.value = null, ["prevent"]), ["esc"]))
                    ]
                  },
                  [
                    m("header", null, [
                      m(
                        "strong",
                        null,
                        "第 " + X(ge.value.index + 1) + " 格 · " + X(ge.value.key) + " 画面描述",
                        1
                        /* TEXT */
                      ),
                      m("button", {
                        type: "button",
                        "aria-label": "关闭快速编辑",
                        onClick: a[47] || (a[47] = (f) => ge.value = null)
                      }, "✕")
                    ]),
                    ut(m("textarea", {
                      ref_key: "quickField",
                      ref: $t,
                      "onUpdate:modelValue": a[48] || (a[48] = (f) => Ne.value = f),
                      "aria-label": "快速画面描述",
                      rows: "7",
                      onKeydown: uo(Re(li, ["ctrl", "prevent"]), ["enter"])
                    }, null, 40, td), [
                      [ss, Ne.value]
                    ]),
                    m("footer", null, [
                      m("button", {
                        type: "button",
                        onClick: a[49] || (a[49] = (f) => ge.value = null)
                      }, "取消"),
                      m("button", {
                        type: "button",
                        class: "primary",
                        onClick: li
                      }, "确定画面描述")
                    ])
                  ],
                  32
                  /* NEED_HYDRATION */
                )
              ],
              32
              /* NEED_HYDRATION */
            )) : Te("v-if", !0)
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        )
      ]),
      _: 1
      /* STABLE */
    }));
  }
}), od = /* @__PURE__ */ rr(nd, [["__scopeId", "data-v-231856bb"]]);
function Do(e) {
  e = Ws(e);
  const { id: t, label: n, usage: o, readingOrder: s, canvas: i, promptMode: l, promptCaption: r, useBboxCorners: u } = e;
  if (u !== void 0 && typeof u != "boolean") throw new Error("使用 BBOX 角点需要布尔值 true 或 false。");
  if (!i || !t) throw new Error("版式缺少 id 或 canvas。");
  const h = e.panels ?? e.portrait ?? e.landscape;
  if (!Array.isArray(h) || !h.length) throw new Error("版式缺少分格。");
  return { ...e, id: t, label: n || t, description: hr(e), usage: o || "", readingOrder: s || "", canvas: i, panels: h, ...l ? { promptMode: l } : {}, ...typeof u == "boolean" ? { useBboxCorners: u } : {}, ...typeof r == "string" ? { promptCaption: r } : {} };
}
function sd(e) {
  const t = lc(e).layouts;
  if (!Array.isArray(t)) throw new Error("导入需要版式数组。");
  return t.map(Do);
}
function id(e) {
  const t = Do(e), n = t.panels.map((o, s) => ({ panel: s + 1, position: o.position, slots: Object.keys(o.slots), slotNotes: { ...Object.fromEntries(Object.entries(o.slotContents ?? {}).map(([i, l]) => [i, l.filter((r) => r.label !== "text").map((r) => r.caption).filter(Boolean).join(`
`)]).filter(([, i]) => i)), ...o.slotNotes } }));
  return `以下为当前所选版式的画面描述，请结合用户最新要求和原文分配内容。F 描述整格，其余键是内容定位参考。槽位按需要选用，未使用区域省略，不补占位项；明确承担抓握、衣袖、饰品、局部出框或接触定位的辅助槽位，分别保留引用对应完整 slot 的局部 item，不能仅并入主体 caption 后省略。主体项写整体姿态，局部项写角色归属、部位、连接、接触与遮挡，描述保持一致；多个 item 不等于多个人物。槽位名称不强制规定内容类型。画面描述本身不是台词、旁白或可见印字；明确提供的准确字样另填 text。保留既定事件、身份、人数与准确台词。下方只含槽位清单和画面描述，不含完整画布坐标与 shapes；仅凭这段信息不能确认几何没有冲突，需要结合额外提供的实际几何或回编辑器核对。
` + JSON.stringify({ layout: t.id, description: t.description, readingOrder: t.readingOrder, panels: n }, null, 2);
}
function ld(e, t) {
  return e.trim() + `

` + id(t);
}
function rd(e, t, n) {
  const o = e.getContext("2d"), s = e.width, i = e.height;
  if (o.clearRect(0, 0, s, i), !t) return;
  const l = Math.min((s - 20) / t.canvas.width, (i - 20) / t.canvas.height), r = (s - t.canvas.width * l) / 2, u = (i - t.canvas.height * l) / 2;
  o.save(), o.translate(r, u), o.scale(l, l), o.translate(t.canvas.width / 2, t.canvas.height / 2), o.fillStyle = "#fff", o.fillRect(-t.canvas.width / 2, -t.canvas.height / 2, t.canvas.width, t.canvas.height);
  const h = t.panels.map((d, v) => ({ panel: d, index: v })).sort((d, v) => (d.panel.layer ?? d.index) - (v.panel.layer ?? v.index) || d.index - v.index);
  for (const { panel: d, index: v } of h) {
    const y = d.slots.F ?? d.slots.C ?? Object.values(d.slots)[0], [M, $, P, j] = y, V = d.shapes?.F ?? [[$, M], [j, M], [j, P], [$, P]];
    if (o.beginPath(), V.forEach(([N, H], I) => I ? o.lineTo(N, H) : o.moveTo(N, H)), o.closePath(), o.fillStyle = "#eef4fd", o.fill(), o.strokeStyle = "#235c9e", o.lineWidth = 2 / l, o.stroke(), o.save(), o.clip(), n) for (const [N, [H, I, W, le]] of Object.entries(d.slots)) {
      if (!["T", "TL", "TR", "B", "BL", "BR", "ML", "MR"].includes(Dt(N))) continue;
      const z = d.shapes?.[N] ?? [[I, H], [le, H], [le, W], [I, W]];
      o.beginPath(), z.forEach(([re, ce], Me) => Me ? o.lineTo(re, ce) : o.moveTo(re, ce)), o.closePath(), o.strokeStyle = "#dd8838", o.lineWidth = 1 / l, o.stroke(), o.fillStyle = "#a65313", o.font = `${10 / l}px sans-serif`, o.fillText(N, I + 2 / l, H + 12 / l);
    }
    o.restore(), o.fillStyle = "#16375b", o.font = `bold ${13 / l}px sans-serif`, o.fillText(String(v + 1), $ + 4 / l, M + 16 / l);
  }
  o.restore();
}
let xe = { layouts: [], revision: "" };
const So = /* @__PURE__ */ new Set(), _s = new URL(import.meta.url);
_s.pathname = _s.pathname.replace(/[^/]+$/, "moss_layout.css");
const Ys = document.createElement("link");
Ys.rel = "stylesheet";
Ys.href = _s.href;
document.head.append(Ys);
async function Mo(e, t = {}) {
  const n = await Pr.fetchApi("/moss_manga_layout/" + e, t), o = await n.json();
  if (!n.ok) throw new Error(o.error || `请求失败：${n.status}`);
  return o;
}
async function Yi() {
  xe = await Mo("library"), So.forEach((e) => e());
}
async function Cs(e) {
  xe = await Mo("library", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layouts: e, revision: xe.revision }) }), So.forEach((t) => t());
}
function Gi(e, t, n) {
  const o = document.createElement("div");
  document.body.append(o);
  let s, i = e?.id;
  const l = () => {
    s.unmount(), o.remove();
  };
  s = tc(od, {
    sources: [...e ? [e] : [], ...xe.layouts.filter((r) => r.id !== e?.id)].map((r) => ({ ...r, key: r.id })),
    existingIds: xe.layouts.map((r) => r.id),
    initialMode: n,
    initialKey: e?.id,
    editingId: e?.id,
    onClose: l,
    onSave: async (r, u = !1, h) => {
      try {
        const d = Do(r), v = xe.layouts.some((y) => y.id === d.id);
        if (v && d.id !== i) throw new Error("版式库已有此 ID，请改名或打开该版式编辑。");
        await Cs(v ? xe.layouts.map((y) => y.id === d.id ? d : y) : [...xe.layouts, d]), i = d.id, t(d), h?.(), u || l();
      } catch (d) {
        window.alert(d.message);
      }
    }
  }), s.mount(o);
}
async function Xi(e) {
  try {
    await navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement("textarea");
    t.value = e, t.style.position = "fixed", t.style.top = "-10000px", document.body.append(t), t.select();
    const n = document.execCommand("copy");
    if (t.remove(), !n) throw new Error("浏览器无法访问剪贴板。");
  }
}
function ad(e) {
  const t = e.widgets.find((S) => S.name === "layout_id"), n = e.widgets.find((S) => S.name === "layout_snapshot");
  if (!t || !n) return;
  n.type = "hidden", n.computeSize = () => [0, -4];
  const o = e.widgets.find((S) => S.name === "bleed");
  o && (o.type = "hidden", o.computeSize = () => [0, -4]);
  const s = e.widgets.find((S) => S.name === "library_mode") ?? { value: "llm" };
  s.type = "hidden", s.computeSize = () => [0, -4], t.type = "combo", t.options = { ...t.options, values: () => [...new Set([...xe.layouts.map((S) => S.id), t.value].filter(Boolean))] };
  let i = 400, l, r;
  const u = document.createElement("div");
  u.className = "moss-layout-node-panel", u.style.cssText = "width:100%;height:400px;display:flex;flex-direction:column;gap:6px;padding:6px;box-sizing:border-box;overflow:hidden;background:#202733;color:#ecf1f7;font:12px system-ui;";
  const h = document.createElement("label");
  h.style.cssText = "display:flex;align-items:center;gap:8px;flex:none;min-height:32px", h.append(document.createTextNode("版式库"));
  const d = document.createElement("select");
  d.setAttribute("aria-label", "选择库中版式"), d.style.cssText = "flex:1;min-width:0;height:32px;color:#fff;background:#344052;border:1px solid #7d8b9e;border-radius:4px;padding:3px 6px", h.append(d), u.append(h);
  const v = document.createElement("div");
  v.style.cssText = "display:flex;flex-wrap:wrap;gap:5px;flex:none", u.append(v);
  const y = document.createElement("div");
  y.setAttribute("role", "status"), y.style.cssText = "min-height:30px;white-space:normal;overflow-wrap:anywhere;flex:none", u.append(y);
  const M = document.createElement("canvas");
  M.width = 1e3, M.height = 540, M.style.cssText = "display:block;width:100%;height:240px;min-height:240px;flex:none;object-fit:contain;background:#e9edf3", u.append(M);
  const $ = document.createElement("label"), P = document.createElement("input");
  P.type = "checkbox", P.checked = !0, $.append(P, document.createTextNode("显示字区")), v.append($);
  function j() {
    return n.value ? JSON.parse(n.value) : null;
  }
  function V() {
    if (!l) return;
    i = 36 + h.offsetHeight + v.offsetHeight + y.offsetHeight + 240, u.style.height = i + "px";
    const S = e.computeSize();
    e.size[1] < S[1] && e.setSize([e.size[0], S[1]]), co.graph?.setDirtyCanvas(!0, !0);
  }
  function N() {
    cancelAnimationFrame(r), r = requestAnimationFrame(V);
  }
  function H() {
    d.replaceChildren();
    for (const S of xe.layouts) {
      const L = document.createElement("option");
      L.value = S.id, L.textContent = `${S.id} · ${S.label || S.id}`, d.append(L);
    }
    if (!xe.layouts.some((S) => S.id === t.value)) {
      const S = document.createElement("option");
      S.value = t.value || "", S.textContent = n.value ? `${t.value} · 当前工作流快照（库中已无此版式）` : "请选择版式，或新建／导入", S.disabled = !0, d.prepend(S);
    }
    d.value = t.value || "", d.disabled = !xe.layouts.length;
  }
  function I() {
    H();
    try {
      const S = j();
      rd(M, S, P.checked), y.textContent = S ? `${S.label || S.id} · ${S.canvas.width}×${S.canvas.height} · ${S.panels.length} 格 · ${S.promptMode === "manual" ? "直接提示词（读取手填内容）" : "LLM 输入"} · 工作流快照` : "没有选中版式：请新建或导入。";
    } catch (S) {
      y.textContent = S.message;
    }
    co.graph?.setDirtyCanvas(!0, !0), N();
  }
  function W(S) {
    s.value = S.promptMode ?? "llm", t.value = S.id, n.value = JSON.stringify(S), I(), co.graph?.change();
  }
  function le(S, L) {
    const ee = document.createElement("button");
    ee.textContent = S, ee.type = "button", ee.style.cssText = "padding:4px 7px;border:1px solid #7d8b9e;border-radius:4px;background:#344052;color:#fff;cursor:pointer", ee.onclick = async () => {
      try {
        await L();
      } catch (Oe) {
        y.textContent = Oe.message;
      }
    }, v.append(ee);
  }
  le("编辑版式", () => {
    const S = j();
    if (!S) throw new Error("先选择版式。");
    Gi(S, W, S.promptMode ?? "llm");
  }), le("新建", () => Gi(null, W, "llm")), le("删除", async () => {
    const S = j();
    if (!S) throw new Error("先选择版式。");
    await Cs(xe.layouts.filter((L) => L.id !== S.id)), I(), y.textContent = "已从公共库删除。当前节点保留工作流快照；不会自动恢复到库。";
  }), le("刷新版式库", () => Yi()), le("一键复制说明", async () => {
    const S = j();
    if (!S) throw new Error("先选择版式。");
    const L = await Mo("format", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(S) });
    await Xi(ld(L.text, S)), y.textContent = "已复制内容整理要求和当前版式；交给 LLM 后可粘贴其 JSON 代码块，或含一个代码块的完整回复。";
  }), le("复制手填提示词", async () => {
    const S = j();
    if (!S) throw new Error("先选择版式。");
    const L = await Mo("manual", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layout: S }) });
    await Xi(L.text), y.textContent = "已复制 MOSS 提示词，可直接送入文本编码器。";
  }), le("导出版式库", () => {
    const S = URL.createObjectURL(new Blob([Ui(xe.layouts)], { type: "application/json" })), L = document.createElement("a");
    L.href = S, L.download = "moss-manga-layouts.json", L.click(), setTimeout(() => URL.revokeObjectURL(S), 1e3);
  }), le("导出旧版兼容文件", () => {
    const S = URL.createObjectURL(new Blob([Ui(xe.layouts, { legacy: !0 })], { type: "application/json" })), L = document.createElement("a");
    L.href = S, L.download = "moss-manga-legacy.json", L.click(), setTimeout(() => URL.revokeObjectURL(S), 1e3);
  }), le("导出当前版式", () => {
    const S = j();
    if (!S) throw new Error("先选择版式。");
    const L = URL.createObjectURL(new Blob([JSON.stringify(Do(S), null, 2)], { type: "application/json" })), ee = document.createElement("a");
    ee.href = L, ee.download = "moss-manga-current-layout.json", ee.click(), setTimeout(() => URL.revokeObjectURL(L), 1e3);
  }), le("导入", () => {
    const S = document.createElement("input");
    S.type = "file", S.accept = ".json,application/json", S.onchange = async () => {
      try {
        if (!S.files?.[0]) return;
        const L = JSON.parse(await S.files[0].text()), ee = sd(L);
        for (const Pe of ee) Pe.promptMode ??= L.mode ?? "llm";
        const Oe = new Set(xe.layouts.map((Pe) => Pe.id));
        if (ee.some((Pe) => Oe.has(Pe.id))) throw new Error("导入含同名 ID，请先改名；不会覆盖已有版式。");
        await Cs([...xe.layouts, ...ee]), ee.length ? W(ee[0]) : I();
      } catch (L) {
        y.textContent = L.message;
      }
    }, S.click();
  }), P.onchange = I, d.onchange = () => {
    const S = xe.layouts.find((L) => L.id === d.value);
    S && W(S);
  }, t.callback = (S) => {
    const L = xe.layouts.find((ee) => ee.id === S);
    L ? W(L) : I();
  }, l = e.addDOMWidget("版式预览", "moss_layout_preview", u, { serialize: !1, hideOnZoom: !1, getMinHeight: () => i, getMaxHeight: () => i, getHeight: () => i }), l.computeSize = (S) => [S, i], e.setSize([Math.max(e.size[0], 460), Math.max(e.size[1], 640)]);
  const z = new ResizeObserver(N);
  [h, v, y].forEach((S) => z.observe(S));
  const re = e.onResize;
  e.onResize = function(...S) {
    const L = re?.apply(this, S);
    return N(), L;
  };
  const ce = e.onConfigure;
  e.onConfigure = function(...S) {
    const L = ce?.apply(this, S);
    return setTimeout(() => {
      n.value && (s.value = j()?.promptMode ?? "llm"), I();
    }, 0), L;
  }, So.add(I);
  const Me = e.onRemoved;
  e.onRemoved = function(...S) {
    return So.delete(I), z.disconnect(), cancelAnimationFrame(r), Me?.apply(this, S);
  }, Yi().then(() => {
    if (n.value && (s.value = j()?.promptMode ?? "llm"), !n.value && !t.value && xe.layouts.length) W(xe.layouts[0]);
    else if (!n.value && t.value) {
      const S = xe.layouts.find((L) => L.id === t.value);
      S && W(S);
    }
    I();
  }).catch((S) => {
    y.textContent = S.message;
  });
}
co.registerExtension({ name: "MOSS.MangaLayout", beforeRegisterNodeDef(e, t) {
  if (t.name !== "MossMangaLayout") return;
  const n = e.prototype.onNodeCreated;
  e.prototype.onNodeCreated = function(...o) {
    const s = n?.apply(this, o);
    return ad(this), s;
  };
} });
