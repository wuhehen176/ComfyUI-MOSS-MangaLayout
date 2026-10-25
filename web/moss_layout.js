import { app as Ln } from "../../scripts/app.js";
import { api as Ar } from "../../scripts/api.js";
// @__NO_SIDE_EFFECTS__
function Zs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ue = {}, Kt = [], lt = () => {
}, lo = () => !1, es = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ts = (e) => e.startsWith("onUpdate:"), Se = Object.assign, Qs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Rr = Object.prototype.hasOwnProperty, ee = (e, t) => Rr.call(e, t), K = Array.isArray, Pt = (e) => _n(e) === "[object Map]", xt = (e) => _n(e) === "[object Set]", xi = (e) => _n(e) === "[object Date]", z = (e) => typeof e == "function", pe = (e) => typeof e == "string", Ye = (e) => typeof e == "symbol", ae = (e) => e !== null && typeof e == "object", ao = (e) => (ae(e) || z(e)) && z(e.then) && z(e.catch), uo = Object.prototype.toString, _n = (e) => uo.call(e), Ir = (e) => _n(e).slice(8, -1), co = (e) => _n(e) === "[object Object]", ei = (e) => pe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, an = /* @__PURE__ */ Zs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ns = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Pr = /-\w/g, Je = ns(
  (e) => e.replace(Pr, (t) => t.slice(1).toUpperCase())
), kr = /\B([A-Z])/g, jt = ns(
  (e) => e.replace(kr, "-$1").toLowerCase()
), fo = ns((e) => e.charAt(0).toUpperCase() + e.slice(1)), bs = ns(
  (e) => e ? `on${fo(e)}` : ""
), ot = (e, t) => !Object.is(e, t), Dn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, ho = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, ss = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let _i;
const is = () => _i || (_i = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ht(e) {
  if (K(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = pe(s) ? $r(s) : Ht(s);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (pe(e) || ae(e))
    return e;
}
const Fr = /;(?![^(]*\))/g, jr = /:([^]+)/, Nr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function $r(e) {
  const t = {};
  return e.replace(Nr, (n) => n.startsWith("/*") ? "" : n).split(Fr).forEach((n) => {
    if (n) {
      const s = n.split(jr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Rt(e) {
  let t = "";
  if (pe(e))
    t = e;
  else if (K(e))
    for (let n = 0; n < e.length; n++) {
      const s = Rt(e[n]);
      s && (t += s + " ");
    }
  else if (ae(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Lr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Dr = /* @__PURE__ */ Zs(Lr);
function po(e) {
  return !!e || e === "";
}
function Vr(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let i = 0; s && i < e.length; i++)
    s = _t(e[i], t[i], n);
  return s;
}
function Ci(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), i = new Uint8Array(s.length);
  for (const o of e) {
    let r = -1;
    for (let l = 0; l < s.length; l++)
      if (!i[l] && _t(o, s[l], n)) {
        r = l;
        break;
      }
    if (r < 0) return !1;
    i[r] = 1;
  }
  return !0;
}
function Kr(e, t, n) {
  let s = Pt(e), i = Pt(t);
  if (s || i || (s = xt(e), i = xt(t), s || i))
    return s && i ? Ci(e, t, n) : !1;
  const o = Object.keys(e).length, r = Object.keys(t).length;
  if (o !== r)
    return !1;
  for (const l in e) {
    const a = e.hasOwnProperty(l), d = t.hasOwnProperty(l);
    if (a && !d || !a && d || !_t(e[l], t[l], n))
      return !1;
  }
  return String(e) === String(t);
}
function Si(e, t, n, s) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, o] = n;
  if (i.has(e) || o.has(t))
    return i.get(e) === t && o.get(t) === e;
  i.set(e, t), o.set(t, e);
  const r = s(e, t, n);
  return i.delete(e), o.delete(t), r;
}
function _t(e, t, n) {
  if (e === t) return !0;
  let s = xi(e), i = xi(t);
  return s || i ? s && i ? e.getTime() === t.getTime() : !1 : (s = Ye(e), i = Ye(t), s || i ? e === t : (s = K(e), i = K(t), s || i ? s && i ? Si(e, t, n, Vr) : !1 : (s = ae(e), i = ae(t), s || i ? !s || !i ? !1 : Si(e, t, n, Kr) : String(e) === String(t))));
}
function ti(e, t) {
  return e.findIndex((n) => _t(n, t));
}
const go = (e) => !!(e && e.__v_isRef === !0), se = (e) => pe(e) ? e : e == null ? "" : K(e) || ae(e) && (e.toString === uo || !z(e.toString)) ? go(e) ? se(e.value) : JSON.stringify(e, mo, 2) : String(e), mo = (e, t) => go(t) ? mo(e, t.value) : Pt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], o) => (n[ws(s, o) + " =>"] = i, n),
    {}
  )
} : xt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ws(n))
} : Ye(t) ? ws(t) : ae(t) && !K(t) && !co(t) ? String(t) : t, ws = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ye(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Ce;
class Hr {
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
function Br() {
  return Ce;
}
let ce;
const xs = /* @__PURE__ */ new WeakSet();
class vo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && (Ce.active ? Ce.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, xs.has(this) && (xs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || bo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Mi(this), wo(this);
    const t = ce, n = qe;
    ce = this, qe = !0;
    try {
      return this.fn();
    } finally {
      xo(this), ce = t, qe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ii(t);
      this.deps = this.depsTail = void 0, Mi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? xs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Fs(this) && this.run();
  }
  get dirty() {
    return Fs(this);
  }
}
let yo = 0, un, cn;
function bo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = cn, cn = e;
    return;
  }
  e.next = un, un = e;
}
function ni() {
  yo++;
}
function si() {
  if (--yo > 0)
    return;
  if (cn) {
    let t = cn;
    for (cn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; un; ) {
    let t = un;
    for (un = void 0; t; ) {
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
function wo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function xo(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), ii(s), Ur(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function Fs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (_o(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function _o(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === pn) || (e.globalVersion = pn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Fs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ce, s = qe;
  ce = e, qe = !0;
  try {
    wo(e);
    const i = e.fn(e._value);
    (t.version === 0 || ot(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ce = n, qe = s, xo(e), e.flags &= -3;
  }
}
function ii(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      ii(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ur(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let qe = !0;
const Co = [];
function ut() {
  Co.push(qe), qe = !1;
}
function ct() {
  const e = Co.pop();
  qe = e === void 0 ? !0 : e;
}
function Mi(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ce;
    ce = void 0;
    try {
      t();
    } finally {
      ce = n;
    }
  }
}
let pn = 0;
class Wr {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class oi {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ce || !qe || ce === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ce)
      n = this.activeLink = new Wr(ce, this), ce.deps ? (n.prevDep = ce.depsTail, ce.depsTail.nextDep = n, ce.depsTail = n) : ce.deps = ce.depsTail = n, So(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ce.depsTail, n.nextDep = void 0, ce.depsTail.nextDep = n, ce.depsTail = n, ce.deps === n && (ce.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, pn++, this.notify(t);
  }
  notify(t) {
    ni();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      si();
    }
  }
}
function So(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        So(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const js = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ Symbol(
  ""
), Ns = /* @__PURE__ */ Symbol(
  ""
), gn = /* @__PURE__ */ Symbol(
  ""
);
function Ee(e, t, n) {
  if (qe && ce) {
    let s = js.get(e);
    s || js.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new oi()), i.map = s, i.key = n), i.track();
  }
}
function yt(e, t, n, s, i, o) {
  const r = js.get(e);
  if (!r) {
    pn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (ni(), t === "clear")
    r.forEach(l);
  else {
    const a = K(e), d = a && ei(n);
    if (a && n === "length") {
      const f = Number(s);
      r.forEach((m, b) => {
        (b === "length" || b === gn || !Ye(b) && b >= f) && l(m);
      });
    } else
      switch ((n !== void 0 || r.has(void 0)) && l(r.get(n)), d && l(r.get(gn)), t) {
        case "add":
          a ? d && l(r.get("length")) : (l(r.get(Ut)), Pt(e) && l(r.get(Ns)));
          break;
        case "delete":
          a || (l(r.get(Ut)), Pt(e) && l(r.get(Ns)));
          break;
        case "set":
          Pt(e) && l(r.get(Ut));
          break;
      }
  }
  si();
}
function Jt(e) {
  const t = /* @__PURE__ */ ie(e);
  return t === e || (Ee(t, "iterate", gn), /* @__PURE__ */ He(e)) ? t : /* @__PURE__ */ ft(e) ? /* @__PURE__ */ kt(e) ? t.map((n) => Ft(Be(n))) : t.map(Ft) : t.map(Be);
}
function os(e) {
  return Ee(e = /* @__PURE__ */ ie(e), "iterate", gn), e;
}
function nt(e, t) {
  return /* @__PURE__ */ ft(e) ? Ft(/* @__PURE__ */ kt(e) ? Be(t) : t) : Be(t);
}
const zr = {
  __proto__: null,
  [Symbol.iterator]() {
    return _s(this, Symbol.iterator, (e) => nt(this, e));
  },
  concat(...e) {
    return Jt(this).concat(
      ...e.map((t) => K(t) ? Jt(t) : t)
    );
  },
  entries() {
    return _s(this, "entries", (e) => (e[1] = nt(this, e[1]), e));
  },
  every(e, t) {
    return pt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return pt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => nt(this, s)),
      arguments
    );
  },
  find(e, t) {
    return pt(
      this,
      "find",
      e,
      t,
      (n) => nt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return pt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return pt(
      this,
      "findLast",
      e,
      t,
      (n) => nt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return pt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return pt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Cs(this, "includes", e);
  },
  indexOf(...e) {
    return Cs(this, "indexOf", e);
  },
  join(e) {
    return Jt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Cs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return pt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return tn(this, "pop");
  },
  push(...e) {
    return tn(this, "push", e);
  },
  reduce(e, ...t) {
    return Ti(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ti(this, "reduceRight", e, t);
  },
  shift() {
    return tn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return pt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return tn(this, "splice", e);
  },
  toReversed() {
    return Jt(this).toReversed();
  },
  toSorted(e) {
    return Jt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Jt(this).toSpliced(...e);
  },
  unshift(...e) {
    return tn(this, "unshift", e);
  },
  values() {
    return _s(this, "values", (e) => nt(this, e));
  }
};
function _s(e, t, n) {
  const s = os(e), i = s[t], o = i.call(s);
  if (s !== e && !/* @__PURE__ */ He(e)) {
    if (o[Symbol.toStringTag] === "Array Iterator") {
      const r = Object.create(Object.getPrototypeOf(o));
      return r.next = () => Oi(o.next(), n), i !== Mo[t] && Object.defineProperties(r, {
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
    o._next = o.next, o.next = () => Oi(o._next(), n);
  }
  return o;
}
function Oi(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const Mo = Array.prototype;
function pt(e, t, n, s, i, o) {
  const r = os(e), l = r !== e && !/* @__PURE__ */ He(e), a = r[t];
  if (a !== Mo[t]) {
    const m = a.apply(e, o);
    return l ? Be(m) : m;
  }
  let d = n;
  r !== e && (l ? d = function(m, b) {
    return n.call(this, nt(e, m), b, e);
  } : n.length > 2 && (d = function(m, b) {
    return n.call(this, m, b, e);
  }));
  const f = a.call(r, d, s);
  return l && i ? i(f) : f;
}
function Ti(e, t, n, s) {
  const i = os(e), o = i !== e && !/* @__PURE__ */ He(e);
  let r = n, l = !1;
  i !== e && (o ? (l = s.length === 0, r = function(d, f, m) {
    return l && (l = !1, d = nt(e, d)), n.call(this, d, nt(e, f), m, e);
  }) : n.length > 3 && (r = function(d, f, m) {
    return n.call(this, d, f, m, e);
  }));
  const a = i[t](r, ...s);
  return l ? nt(e, a) : a;
}
function Cs(e, t, n) {
  const s = /* @__PURE__ */ ie(e);
  Ee(s, "iterate", gn);
  const i = s[t](...n);
  return (i === -1 || i === !1) && /* @__PURE__ */ ui(n[0]) ? (n[0] = /* @__PURE__ */ ie(n[0]), s[t](...n)) : i;
}
function tn(e, t, n = []) {
  ut(), ni();
  const s = (/* @__PURE__ */ ie(e))[t].apply(e, n);
  return si(), ct(), s;
}
const Jr = /* @__PURE__ */ Zs("__proto__,__v_isRef,__isVue"), Oo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ye)
);
function qr(e) {
  Ye(e) || (e = String(e));
  const t = /* @__PURE__ */ ie(this);
  return Ee(t, "has", e), t.hasOwnProperty(e);
}
class To {
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
      return s === (i ? o ? il : Io : o ? Ro : Ao).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const r = K(t);
    if (!i) {
      let a;
      if (r && (a = zr[n]))
        return a;
      if (n === "hasOwnProperty")
        return qr;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Re(t) ? t : s
    );
    if ((Ye(n) ? Oo.has(n) : Jr(n)) || (i || Ee(t, "get", n), o))
      return l;
    if (/* @__PURE__ */ Re(l)) {
      const a = r && ei(n) ? l : l.value;
      return i && ae(a) ? /* @__PURE__ */ Ls(a) : a;
    }
    return ae(l) ? i ? /* @__PURE__ */ Ls(l) : /* @__PURE__ */ li(l) : l;
  }
}
class Eo extends To {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let o = t[n];
    const r = K(t) && ei(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ ft(o);
      if (!/* @__PURE__ */ He(s) && !/* @__PURE__ */ ft(s) && (o = /* @__PURE__ */ ie(o), s = /* @__PURE__ */ ie(s)), !r && /* @__PURE__ */ Re(o) && !/* @__PURE__ */ Re(s))
        return d || (o.value = s), !0;
    }
    const l = r ? Number(n) < t.length : ee(t, n), a = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ Re(t) ? t : i
    );
    return t === /* @__PURE__ */ ie(i) && a && (l ? ot(s, o) && yt(t, "set", n, s) : yt(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = ee(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && s && yt(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ye(n) || !Oo.has(n)) && Ee(t, "has", n), s;
  }
  ownKeys(t) {
    return Ee(
      t,
      "iterate",
      K(t) ? "length" : Ut
    ), Reflect.ownKeys(t);
  }
}
class Yr extends To {
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
const Gr = /* @__PURE__ */ new Eo(), Xr = /* @__PURE__ */ new Yr(), Zr = /* @__PURE__ */ new Eo(!0);
const $s = (e) => e, Rn = (e) => Reflect.getPrototypeOf(e);
function Qr(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, o = /* @__PURE__ */ ie(i), r = Pt(o), l = e === "entries" || e === Symbol.iterator && r, a = e === "keys" && r, d = i[e](...s), f = n ? $s : t ? Ft : Be;
    return !t && Ee(
      o,
      "iterate",
      a ? Ns : Ut
    ), Se(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: m, done: b } = d.next();
          return b ? { value: m, done: b } : {
            value: l ? [f(m[0]), f(m[1])] : f(m),
            done: b
          };
        }
      }
    );
  };
}
function In(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function el(e, t) {
  const n = {
    get(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ ie(o), l = /* @__PURE__ */ ie(i);
      e || (ot(i, l) && Ee(r, "get", i), Ee(r, "get", l));
      const { has: a } = Rn(r), d = t ? $s : e ? Ft : Be;
      if (a.call(r, i))
        return d(o.get(i));
      if (a.call(r, l))
        return d(o.get(l));
      o !== r && o.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Ee(/* @__PURE__ */ ie(i), "iterate", Ut), i.size;
    },
    has(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ ie(o), l = /* @__PURE__ */ ie(i);
      return e || (ot(i, l) && Ee(r, "has", i), Ee(r, "has", l)), i === l ? o.has(i) : o.has(i) || o.has(l);
    },
    forEach(i, o) {
      const r = this, l = r.__v_raw, a = /* @__PURE__ */ ie(l), d = t ? $s : e ? Ft : Be;
      return !e && Ee(a, "iterate", Ut), l.forEach((f, m) => i.call(o, d(f), d(m), r));
    }
  };
  return Se(
    n,
    e ? {
      add: In("add"),
      set: In("set"),
      delete: In("delete"),
      clear: In("clear")
    } : {
      add(i) {
        const o = /* @__PURE__ */ ie(this), r = Rn(o), l = /* @__PURE__ */ ie(i), a = !t && !/* @__PURE__ */ He(i) && !/* @__PURE__ */ ft(i) ? l : i;
        return r.has.call(o, a) || ot(i, a) && r.has.call(o, i) || ot(l, a) && r.has.call(o, l) || (o.add(a), yt(o, "add", a, a)), this;
      },
      set(i, o) {
        !t && !/* @__PURE__ */ He(o) && !/* @__PURE__ */ ft(o) && (o = /* @__PURE__ */ ie(o));
        const r = /* @__PURE__ */ ie(this), { has: l, get: a } = Rn(r);
        let d = l.call(r, i);
        d || (i = /* @__PURE__ */ ie(i), d = l.call(r, i));
        const f = a.call(r, i);
        return r.set(i, o), d ? ot(o, f) && yt(r, "set", i, o) : yt(r, "add", i, o), this;
      },
      delete(i) {
        const o = /* @__PURE__ */ ie(this), { has: r, get: l } = Rn(o);
        let a = r.call(o, i);
        a || (i = /* @__PURE__ */ ie(i), a = r.call(o, i)), l && l.call(o, i);
        const d = o.delete(i);
        return a && yt(o, "delete", i, void 0), d;
      },
      clear() {
        const i = /* @__PURE__ */ ie(this), o = i.size !== 0, r = i.clear();
        return o && yt(
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
    n[i] = Qr(i, e, t);
  }), n;
}
function ri(e, t) {
  const n = el(e, t);
  return (s, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? s : Reflect.get(
    ee(n, i) && i in s ? n : s,
    i,
    o
  );
}
const tl = {
  get: /* @__PURE__ */ ri(!1, !1)
}, nl = {
  get: /* @__PURE__ */ ri(!1, !0)
}, sl = {
  get: /* @__PURE__ */ ri(!0, !1)
};
const Ao = /* @__PURE__ */ new WeakMap(), Ro = /* @__PURE__ */ new WeakMap(), Io = /* @__PURE__ */ new WeakMap(), il = /* @__PURE__ */ new WeakMap();
function ol(e) {
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
function li(e) {
  return /* @__PURE__ */ ft(e) ? e : ai(
    e,
    !1,
    Gr,
    tl,
    Ao
  );
}
// @__NO_SIDE_EFFECTS__
function rl(e) {
  return ai(
    e,
    !1,
    Zr,
    nl,
    Ro
  );
}
// @__NO_SIDE_EFFECTS__
function Ls(e) {
  return ai(
    e,
    !0,
    Xr,
    sl,
    Io
  );
}
function ai(e, t, n, s, i) {
  if (!ae(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const r = ol(Ir(e));
  if (r === 0)
    return e;
  const l = new Proxy(
    e,
    r === 2 ? s : n
  );
  return i.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function kt(e) {
  return /* @__PURE__ */ ft(e) ? /* @__PURE__ */ kt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ui(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ie(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ie(t) : e;
}
function ll(e) {
  return !ee(e, "__v_skip") && Object.isExtensible(e) && ho(e, "__v_skip", !0), e;
}
const Be = (e) => ae(e) ? /* @__PURE__ */ li(e) : e, Ft = (e) => ae(e) ? /* @__PURE__ */ Ls(e) : e;
// @__NO_SIDE_EFFECTS__
function Re(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function me(e) {
  return al(e, !1);
}
function al(e, t) {
  return /* @__PURE__ */ Re(e) ? e : new ul(e, t);
}
class ul {
  constructor(t, n) {
    this.dep = new oi(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ie(t), this._value = n ? t : Be(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ He(t) || /* @__PURE__ */ ft(t);
    t = s ? t : /* @__PURE__ */ ie(t), ot(t, n) && (this._rawValue = t, this._value = s ? t : Be(t), this.dep.trigger());
  }
}
function sn(e) {
  return /* @__PURE__ */ Re(e) ? e.value : e;
}
const cl = {
  get: (e, t, n) => t === "__v_raw" ? e : sn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return /* @__PURE__ */ Re(i) && !/* @__PURE__ */ Re(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Po(e) {
  return /* @__PURE__ */ kt(e) ? e : new Proxy(e, cl);
}
class fl {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new oi(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = pn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ce !== this)
      return bo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return _o(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function dl(e, t, n = !1) {
  let s, i;
  return z(e) ? s = e : (s = e.get, i = e.set), new fl(s, i, n);
}
const Pn = {}, Bn = /* @__PURE__ */ new WeakMap();
let Dt;
function hl(e, t = !1, n = Dt) {
  if (n) {
    let s = Bn.get(n);
    s || Bn.set(n, s = []), s.push(e);
  }
}
function pl(e, t, n = ue) {
  const { immediate: s, deep: i, once: o, scheduler: r, augmentJob: l, call: a } = n, d = (R) => i ? R : /* @__PURE__ */ He(R) || i === !1 || i === 0 ? bt(R, 1) : bt(R);
  let f, m, b, O, F = !1, P = !1;
  if (/* @__PURE__ */ Re(e) ? (m = () => e.value, F = /* @__PURE__ */ He(e)) : /* @__PURE__ */ kt(e) ? (m = () => d(e), F = !0) : K(e) ? (P = !0, F = e.some((R) => /* @__PURE__ */ kt(R) || /* @__PURE__ */ He(R)), m = () => e.map((R) => {
    if (/* @__PURE__ */ Re(R))
      return R.value;
    if (/* @__PURE__ */ kt(R))
      return d(R);
    if (z(R))
      return a ? a(R, 2) : R();
  })) : z(e) ? t ? m = a ? () => a(e, 2) : e : m = () => {
    if (b) {
      ut();
      try {
        b();
      } finally {
        ct();
      }
    }
    const R = Dt;
    Dt = f;
    try {
      return a ? a(e, 3, [O]) : e(O);
    } finally {
      Dt = R;
    }
  } : m = lt, t && i) {
    const R = m, J = i === !0 ? 1 / 0 : i;
    m = () => bt(R(), J);
  }
  const B = Br(), N = () => {
    f.stop(), B && B.active && Qs(B.effects, f);
  };
  if (o && t) {
    const R = t;
    t = (...J) => {
      try {
        return R(...J);
      } finally {
        N();
      }
    };
  }
  let k = P ? new Array(e.length).fill(Pn) : Pn;
  const $ = (R) => {
    if (!(!(f.flags & 1) || !f.dirty && !R))
      if (t) {
        const J = f.run();
        if (R || i || F || (P ? J.some((j, U) => ot(j, k[U])) : ot(J, k))) {
          const j = Dt;
          ut();
          try {
            b && b(), Dt = f;
            const U = [
              J,
              // pass undefined as the old value when it's changed for the first time
              k === Pn ? void 0 : P && k[0] === Pn ? [] : k,
              O
            ];
            k = J, a ? a(t, 3, U) : (
              // @ts-expect-error
              t(...U)
            );
          } finally {
            Dt = j, ct();
          }
        }
      } else
        f.run();
  };
  return l && l($), f = new vo(m), f.scheduler = r ? () => r($, !1) : $, O = (R) => hl(R, !1, f), b = f.onStop = () => {
    const R = Bn.get(f);
    if (R) {
      if (a)
        a(R, 4);
      else
        for (const J of R) J();
      Bn.delete(f);
    }
  }, t ? s ? $(!0) : k = f.run() : r ? r($.bind(null, !0), !0) : f.run(), N.pause = f.pause.bind(f), N.resume = f.resume.bind(f), N.stop = N, N;
}
function bt(e, t = 1 / 0, n) {
  if (t <= 0 || !ae(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Re(e))
    bt(e.value, t, n);
  else if (K(e))
    for (let s = 0; s < e.length; s++)
      bt(e[s], t, n);
  else if (xt(e) || Pt(e))
    e.forEach((s) => {
      bt(s, t, n);
    });
  else if (co(e)) {
    for (const s in e)
      bt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && bt(e[s], t, n);
  }
  return e;
}
function Cn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (i) {
    rs(i, t, n);
  }
}
function Ge(e, t, n, s) {
  if (z(e)) {
    const i = Cn(e, t, n, s);
    return i && ao(i) && i.catch((o) => {
      rs(o, t, n);
    }), i;
  }
  if (K(e)) {
    const i = [];
    for (let o = 0; o < e.length; o++)
      i.push(Ge(e[o], t, n, s));
    return i;
  }
}
function rs(e, t, n, s = !0) {
  const i = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: r } = t && t.appContext.config || ue;
  if (t) {
    let l = t.parent;
    const a = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let m = 0; m < f.length; m++)
          if (f[m](e, a, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      ut(), Cn(o, null, 10, [
        e,
        a,
        d
      ]), ct();
      return;
    }
  }
  gl(e, n, i, s, r);
}
function gl(e, t, n, s = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Fe = [];
let ze = -1;
const st = [];
let At = null, Yt = 0;
const ko = /* @__PURE__ */ Promise.resolve();
let Un = null;
function fn(e) {
  const t = Un || ko;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ml(e) {
  let t = ze + 1, n = Fe.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = Fe[s], o = mn(i);
    o < e || o === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ci(e) {
  if (!(e.flags & 1)) {
    const t = mn(e), n = Fe[Fe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= mn(n) ? Fe.push(e) : Fe.splice(ml(t), 0, e), e.flags |= 1, Fo();
  }
}
function Fo() {
  Un || (Un = ko.then($o));
}
function vl(e) {
  if (!K(e))
    At && e.id === -1 ? At.splice(Yt + 1, 0, e) : e.flags & 1 || (st.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      st.push(e[t]);
  Fo();
}
function jo(e, t, n, s = ze + 1) {
  for (; s < Fe.length; s++) {
    const i = Fe[s];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      Fe.splice(s, 1), s = e ? s - 1 : ze, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function No(e, t, n = 0) {
  if (st.length) {
    let s = st, i = 0;
    if (t) {
      s = [];
      for (let r = 0; r < st.length; r++) {
        const l = st[r];
        (l.i !== void 0 ? !l.i || l.i.uid < n : t.has(l)) ? st[i++] = l : s.push(l);
      }
    }
    const o = [...new Set(s)].sort((r, l) => mn(r) - mn(l));
    if (st.length = i, At) {
      for (let r = 0; r < o.length; r++)
        At.push(o[r]);
      return;
    }
    for (At = o, Yt = 0; Yt < At.length; Yt++) {
      const r = At[Yt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    At = null, Yt = 0;
  }
}
let Ss = !1;
function yl(e, t) {
  if (Ss) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(st);
  e(), Ss = !0;
  try {
    jo(void 0, t), No(void 0, n, t);
  } finally {
    Ss = !1;
  }
}
const mn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function $o(e) {
  try {
    for (ze = 0; ze < Fe.length; ze++) {
      const t = Fe[ze];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Cn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ze < Fe.length; ze++) {
      const t = Fe[ze];
      t && (t.flags &= -2);
    }
    ze = -1, Fe.length = 0, No(), Un = null, (Fe.length || st.length) && $o();
  }
}
let Ae = null, Lo = null;
function Wn(e) {
  const t = Ae;
  return Ae = e, Lo = e && e.type.__scopeId || null, t;
}
function Do(e, t = Ae, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && Vi(-1);
    const o = Wn(t), r = wt.length;
    let l;
    try {
      l = e(...i);
    } finally {
      for (let a = wt.length; a > r; a--) gi();
      Wn(o), s._d && Vi(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function qt(e, t) {
  if (Ae === null)
    return e;
  const n = ds(Ae), s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, r, l, a = ue] = t[i];
    o && (z(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && bt(r), s.push({
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
function $t(e, t, n, s) {
  const i = e.dirs, o = t && t.dirs;
  for (let r = 0; r < i.length; r++) {
    const l = i[r];
    o && (l.oldValue = o[r].value);
    let a = l.dir[s];
    a && (ut(), Ge(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ct());
  }
}
function bl(e, t) {
  if (je) {
    let n = je.provides;
    const s = je.parent && je.parent.provides;
    s === n && (n = je.provides = Object.create(s)), n[e] = t;
  }
}
function Vn(e, t, n = !1) {
  const s = ba();
  if (s || Xt) {
    let i = Xt ? Xt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && z(t) ? t.call(s && s.proxy) : t;
  }
}
const wl = /* @__PURE__ */ Symbol.for("v-scx"), xl = () => Vn(wl);
function Ms(e, t, n) {
  return Vo(e, t, n);
}
function Vo(e, t, n = ue) {
  const { immediate: s, deep: i, flush: o, once: r } = n, l = Se({}, n), a = t && s || !t && o !== "post";
  let d;
  if (wn) {
    if (o === "sync") {
      const O = xl();
      d = O.__watcherHandles || (O.__watcherHandles = []);
    } else if (!a) {
      const O = () => {
      };
      return O.stop = lt, O.resume = lt, O.pause = lt, O;
    }
  }
  const f = je;
  l.call = (O, F, P) => Ge(O, f, F, P);
  let m = !1;
  o === "post" ? l.scheduler = (O) => {
    O.i = f, ke(O, f && f.suspense);
  } : o !== "sync" && (m = !0, l.scheduler = (O, F) => {
    F ? O() : ci(O);
  }), l.augmentJob = (O) => {
    t && (O.flags |= 4), m && (O.flags |= 2, f && (O.id = f.uid, O.i = f));
  };
  const b = pl(e, t, l);
  return wn && (d ? d.push(b) : a && b()), b;
}
function _l(e, t, n) {
  const s = this.proxy, i = pe(e) ? e.includes(".") ? Ko(s, e) : () => s[e] : e.bind(s, s);
  let o;
  z(t) ? o = t : (o = t.handler, n = t);
  const r = Sn(this), l = Vo(i, o.bind(s), n);
  return r(), l;
}
function Ko(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
const Tt = /* @__PURE__ */ new WeakMap(), Ho = /* @__PURE__ */ Symbol("_vte"), ls = (e) => e.__isTeleport, Vt = (e) => e && (e.disabled || e.disabled === ""), Cl = (e) => e && (e.defer || e.defer === ""), Ei = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Ai = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Ds = (e, t) => {
  const n = e && e.to;
  return pe(n) ? t ? t(n) : null : n;
}, Sl = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, s, i, o, r, l, a, d) {
    const {
      mc: f,
      pc: m,
      pbc: b,
      o: { insert: O, querySelector: F, createText: P, createComment: B, parentNode: N }
    } = d, k = Vt(t.props);
    let { dynamicChildren: $ } = t;
    const R = (U, Z, oe) => {
      U.shapeFlag & 16 && f(
        U.children,
        Z,
        oe,
        i,
        o,
        r,
        l,
        a
      );
    }, J = (U = t) => {
      const Z = Vt(U.props), oe = U.target = Ds(U.props, F), w = Vs(oe, U, P, O);
      oe && (r !== "svg" && Ei(oe) ? r = "svg" : r !== "mathml" && Ai(oe) && (r = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(oe), Z || (R(U, oe, w), on(U, !1)));
    }, j = (U) => {
      const Z = () => {
        if (Tt.get(U) === Z) {
          if (Tt.delete(U), Vt(U.props)) {
            const oe = N(U.el) || n;
            R(U, oe, U.anchor), on(U, !0);
          }
          J(U);
        }
      };
      Tt.set(U, Z), ke(Z, o);
    };
    if (e == null) {
      const U = t.el = P(""), Z = t.anchor = P("");
      if (O(U, n, s), O(Z, n, s), Cl(t.props) || o && o.pendingBranch) {
        j(t);
        return;
      }
      k && (R(t, n, Z), on(t, !0)), J();
    } else {
      t.el = e.el;
      const U = t.anchor = e.anchor, Z = Tt.get(e);
      if (Z) {
        Z.flags |= 8, Tt.delete(e), j(t);
        return;
      }
      t.targetStart = e.targetStart;
      const oe = t.target = e.target, w = t.targetAnchor = e.targetAnchor, H = Vt(e.props), Y = H ? n : oe, he = H ? U : w;
      if (r === "svg" || Ei(oe) ? r = "svg" : (r === "mathml" || Ai(oe)) && (r = "mathml"), $ ? (b(
        e.dynamicChildren,
        $,
        Y,
        i,
        o,
        r,
        l
      ), pi(e, t, !0)) : a || m(
        e,
        t,
        Y,
        he,
        i,
        o,
        r,
        l,
        !1
      ), k)
        H ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : kn(
          t,
          n,
          U,
          d,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const xe = Ds(t.props, F);
        xe && (t.target = xe, kn(
          t,
          xe,
          null,
          d,
          0
        ));
      } else H && kn(
        t,
        oe,
        w,
        d,
        1
      );
      on(t, k);
    }
  },
  remove(e, t, n, { um: s, o: { remove: i } }, o) {
    const {
      shapeFlag: r,
      children: l,
      anchor: a,
      targetStart: d,
      targetAnchor: f,
      target: m,
      props: b
    } = e, O = Vt(b), F = o || !O, P = Tt.get(e);
    if (P && (P.flags |= 8, Tt.delete(e)), m && (i(d), i(f)), o && i(a), !P && (O || m) && r & 16)
      for (let B = 0; B < l.length; B++) {
        const N = l[B];
        s(
          N,
          t,
          n,
          F,
          !!N.dynamicChildren
        );
      }
  },
  move: kn,
  hydrate: Ml
};
function kn(e, t, n, { o: { insert: s }, m: i }, o = 2) {
  o === 0 && (e.targetStart && s(e.targetStart, t, n), s(e.targetAnchor, t, n), n = e.targetAnchor);
  const { el: r, anchor: l, shapeFlag: a, children: d, props: f } = e, m = o === 2;
  if (m && s(r, t, n), !Tt.has(e) && (!m || Vt(f)) && a & 16)
    for (let b = 0; b < d.length; b++)
      i(
        d[b],
        t,
        n,
        2
      );
  m && s(l, t, n);
}
function Ml(e, t, n, s, i, o, {
  o: { nextSibling: r, parentNode: l, querySelector: a, insert: d, createText: f }
}, m) {
  function b(B, N) {
    let k = N;
    for (; k; ) {
      if (k && k.nodeType === 8) {
        if (k.data === "teleport start anchor")
          t.targetStart = k;
        else if (k.data === "teleport anchor") {
          t.targetAnchor = k, B._lpa = t.targetAnchor && r(t.targetAnchor);
          break;
        }
      }
      k = r(k);
    }
  }
  function O(B, N) {
    N.anchor = m(
      r(B),
      N,
      l(B),
      n,
      s,
      i,
      o
    );
  }
  const F = t.target = Ds(
    t.props,
    a
  ), P = Vt(t.props);
  if (F) {
    const B = F._lpa || F.firstChild;
    t.shapeFlag & 16 && (P ? (O(e, t), b(F, B), t.targetAnchor || Vs(
      F,
      t,
      f,
      d,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(e) === F ? e : null
    )) : (t.anchor = r(e), b(F, B), t.targetAnchor || Vs(F, t, f, d), m(
      B && r(B),
      t,
      F,
      n,
      s,
      i,
      o
    ))), on(t, P);
  } else P && t.shapeFlag & 16 && (O(e, t), t.targetStart = e, t.targetAnchor = r(e));
  return t.anchor && r(t.anchor);
}
const Ol = Sl;
function on(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let s, i;
    for (t ? (s = e.el, i = e.anchor) : (s = e.targetStart, i = e.targetAnchor); s && s !== i; )
      s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid), s = s.nextSibling;
    n.ut();
  }
}
function Vs(e, t, n, s, i = null) {
  const o = t.targetStart = n(""), r = t.targetAnchor = n("");
  return o[Ho] = r, e && (s(o, e, i), s(r, e, i)), r;
}
const Os = /* @__PURE__ */ Symbol("_leaveCb");
function Tl(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Ue) {
        t = n;
        break;
      }
  }
  return t;
}
function Bo(e) {
  if (!fi(e))
    return ls(e.type) && e.children ? Tl(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && z(n.default))
      return n.default();
  }
}
function zn(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    zn(
      ls(n.type) && Bo(n) || n,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === de && K(e.children)) {
    const n = er(e.children, !1);
    n && zn(n, t);
  }
}
function Ks(e) {
  if (e.component)
    return Ks(e.component.subTree);
  if (e.type === de) {
    const t = K(e.children) && er(e.children, !1);
    return t ? Ks(t) : void 0;
  }
  if (e.type !== Ue)
    return e;
}
// @__NO_SIDE_EFFECTS__
function Uo(e, t) {
  return z(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Se({ name: e.name }, t, { setup: e })
  ) : e;
}
function Wo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ri(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Jn = /* @__PURE__ */ new WeakMap();
function dn(e, t, n, s, i = !1) {
  if (K(e)) {
    e.forEach(
      (P, B) => dn(
        P,
        t && (K(t) ? t[B] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (Gt(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && dn(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? ds(s.component) : s.el, r = i ? null : o, { i: l, r: a } = e, d = t && t.r, f = l.refs === ue ? l.refs = {} : l.refs, m = l.setupState, b = /* @__PURE__ */ ie(m), O = m === ue ? lo : (P) => Ri(f, P) ? !1 : ee(b, P), F = (P, B) => !(B && Ri(f, B));
  if (d != null && d !== a) {
    if (Ii(t), pe(d))
      f[d] = null, O(d) && (m[d] = null);
    else if (/* @__PURE__ */ Re(d)) {
      const P = t;
      F(d, P.k) && (d.value = null), P.k && (f[P.k] = null);
    }
  }
  if (z(a))
    Cn(a, l, 12, [r, f]);
  else {
    const P = pe(a), B = /* @__PURE__ */ Re(a);
    if (P || B) {
      const N = () => {
        if (e.f) {
          const k = P ? O(a) ? m[a] : f[a] : F() || !e.k ? a.value : f[e.k];
          if (i)
            K(k) && Qs(k, o);
          else if (K(k))
            k.includes(o) || k.push(o);
          else if (P)
            f[a] = [o], O(a) && (m[a] = f[a]);
          else {
            const $ = [o];
            F(a, e.k) && (a.value = $), e.k && (f[e.k] = $);
          }
        } else P ? (f[a] = r, O(a) && (m[a] = r)) : B && (F(a, e.k) && (a.value = r), e.k && (f[e.k] = r));
      };
      if (r) {
        const k = () => {
          N(), Jn.delete(e);
        };
        k.id = -1, Jn.set(e, k), ke(k, n);
      } else
        Ii(e), N();
    }
  }
}
function Ii(e) {
  const t = Jn.get(e);
  t && (t.flags |= 8, Jn.delete(e));
}
is().requestIdleCallback;
is().cancelIdleCallback;
const Gt = (e) => !!e.type.__asyncLoader, fi = (e) => e.type.__isKeepAlive;
function El(e, t) {
  zo(e, "a", t);
}
function Al(e, t) {
  zo(e, "da", t);
}
function zo(e, t, n = je) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (as(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      fi(i.parent.vnode) && Rl(s, t, n, i), i = i.parent;
  }
}
function Rl(e, t, n, s) {
  const i = as(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  qo(() => {
    Qs(s[t], i);
  }, n);
}
function as(e, t, n = je, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...r) => {
      ut();
      const l = Sn(n), a = Ge(t, n, e, r);
      return l(), ct(), a;
    });
    return s ? i.unshift(o) : i.push(o), o;
  }
}
const Ct = (e) => (t, n = je) => {
  (!wn || e === "sp") && as(e, (...s) => t(...s), n);
}, Il = Ct("bm"), Jo = Ct("m"), Pl = Ct(
  "bu"
), kl = Ct("u"), Fl = Ct(
  "bum"
), qo = Ct("um"), jl = Ct(
  "sp"
), Nl = Ct("rtg"), $l = Ct("rtc");
function Ll(e, t = je) {
  as("ec", e, t);
}
const Dl = /* @__PURE__ */ Symbol.for("v-ndc");
function gt(e, t, n, s) {
  let i;
  const o = n, r = K(e);
  if (r || pe(e)) {
    const l = r && /* @__PURE__ */ kt(e);
    let a = !1, d = !1;
    l && (a = !/* @__PURE__ */ He(e), d = /* @__PURE__ */ ft(e), e = os(e)), i = new Array(e.length);
    for (let f = 0, m = e.length; f < m; f++)
      i[f] = t(
        a ? d ? Ft(Be(e[f])) : Be(e[f]) : e[f],
        f,
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
  else if (ae(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (l, a) => t(l, a, void 0, o)
      );
    else {
      const l = Object.keys(e);
      i = new Array(l.length);
      for (let a = 0, d = l.length; a < d; a++) {
        const f = l[a];
        i[a] = t(e[f], f, a, o);
      }
    }
  else
    i = [];
  return i;
}
function Vl(e, t, n, s, i, o) {
  if (n == null && (n = {}), Ae.ce || Ae.parent && Gt(Ae.parent) && Ae.parent.ce) {
    const d = n, f = Object.keys(d).length > 0;
    return G(), yn(
      de,
      null,
      [at("slot", d, s)],
      f ? -2 : 64
    );
  }
  let r = e[t];
  r && r._c && (r._d = !1);
  const l = wt.length;
  G();
  let a;
  try {
    const d = r && Yo(r(n)), f = n.key || o || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    d && d.key;
    a = yn(
      de,
      {
        key: (f && !Ye(f) ? f : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!d && s ? "_fb" : "")
      },
      d || (s ? s() : []),
      d && e._ === 1 ? 64 : -2
    );
  } catch (d) {
    for (let f = wt.length; f > l; f--) gi();
    throw d;
  } finally {
    r && r._c && (r._d = !0);
  }
  return a;
}
function Yo(e) {
  return e.some((t) => fs(t) ? !(t.type === Ue || t.type === de && !Yo(t.children)) : !0) ? e : null;
}
const Hs = (e) => e ? gr(e) ? ds(e) : Hs(e.parent) : null, hn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Se(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Hs(e.parent),
    $root: (e) => Hs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Xo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ci(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = fn.bind(e.proxy)),
    $watch: (e) => _l.bind(e)
  })
), Ts = (e, t) => e !== ue && !e.__isScriptSetup && ee(e, t), Kl = {
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
        if (Ts(s, t))
          return r[t] = 1, s[t];
        if (i !== ue && ee(i, t))
          return r[t] = 2, i[t];
        if (ee(o, t))
          return r[t] = 3, o[t];
        if (n !== ue && ee(n, t))
          return r[t] = 4, n[t];
        Bs && (r[t] = 0);
      }
    }
    const d = hn[t];
    let f, m;
    if (d)
      return t === "$attrs" && Ee(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== ue && ee(n, t))
      return r[t] = 4, n[t];
    if (
      // global properties
      m = a.config.globalProperties, ee(m, t)
    )
      return m[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: o } = e;
    return Ts(i, t) ? (i[t] = n, !0) : s !== ue && ee(s, t) ? (s[t] = n, !0) : ee(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, props: o, type: r }
  }, l) {
    let a;
    return !!(n[l] || e !== ue && l[0] !== "$" && ee(e, l) || Ts(t, l) || ee(o, l) || ee(s, l) || ee(hn, l) || ee(i.config.globalProperties, l) || (a = r.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ee(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Pi(e) {
  return K(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Bs = !0;
function Hl(e) {
  const t = Xo(e), n = e.proxy, s = e.ctx;
  Bs = !1, t.beforeCreate && ki(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: o,
    methods: r,
    watch: l,
    provide: a,
    inject: d,
    // lifecycle
    created: f,
    beforeMount: m,
    mounted: b,
    beforeUpdate: O,
    updated: F,
    activated: P,
    deactivated: B,
    beforeDestroy: N,
    beforeUnmount: k,
    destroyed: $,
    unmounted: R,
    render: J,
    renderTracked: j,
    renderTriggered: U,
    errorCaptured: Z,
    serverPrefetch: oe,
    // public API
    expose: w,
    inheritAttrs: H,
    // assets
    components: Y,
    directives: he,
    filters: xe
  } = t;
  if (d && Bl(d, s, null), r)
    for (const Q in r) {
      const le = r[Q];
      z(le) && (s[Q] = le.bind(n));
    }
  if (i) {
    const Q = i.call(n, n);
    ae(Q) && (e.data = /* @__PURE__ */ li(Q));
  }
  if (Bs = !0, o)
    for (const Q in o) {
      const le = o[Q], Ie = z(le) ? le.bind(n, n) : z(le.get) ? le.get.bind(n, n) : lt, Xe = !z(le) && z(le.set) ? le.set.bind(n) : lt, We = et({
        get: Ie,
        set: Xe
      });
      Object.defineProperty(s, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => We.value,
        set: (Ne) => We.value = Ne
      });
    }
  if (l)
    for (const Q in l)
      Go(l[Q], s, n, Q);
  if (a) {
    const Q = z(a) ? a.call(n) : a;
    Reflect.ownKeys(Q).forEach((le) => {
      bl(le, Q[le]);
    });
  }
  f && ki(f, e, "c");
  function ye(Q, le) {
    K(le) ? le.forEach((Ie) => Q(Ie.bind(n))) : le && Q(le.bind(n));
  }
  if (ye(Il, m), ye(Jo, b), ye(Pl, O), ye(kl, F), ye(El, P), ye(Al, B), ye(Ll, Z), ye($l, j), ye(Nl, U), ye(Fl, k), ye(qo, R), ye(jl, oe), K(w))
    if (w.length) {
      const Q = e.exposed || (e.exposed = {});
      w.forEach((le) => {
        Object.defineProperty(Q, le, {
          get: () => n[le],
          set: (Ie) => n[le] = Ie,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  J && e.render === lt && (e.render = J), H != null && (e.inheritAttrs = H), Y && (e.components = Y), he && (e.directives = he), oe && Wo(e);
}
function Bl(e, t, n = lt) {
  K(e) && (e = Us(e));
  for (const s in e) {
    const i = e[s];
    let o;
    ae(i) ? "default" in i ? o = Vn(
      i.from || s,
      i.default,
      !0
    ) : o = Vn(i.from || s) : o = Vn(i), /* @__PURE__ */ Re(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (r) => o.value = r
    }) : t[s] = o;
  }
}
function ki(e, t, n) {
  Ge(
    K(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Go(e, t, n, s) {
  let i = s.includes(".") ? Ko(n, s) : () => n[s];
  if (pe(e)) {
    const o = t[e];
    z(o) && Ms(i, o);
  } else if (z(e))
    Ms(i, e.bind(n));
  else if (ae(e))
    if (K(e))
      e.forEach((o) => Go(o, t, n, s));
    else {
      const o = z(e.handler) ? e.handler.bind(n) : t[e.handler];
      z(o) && Ms(i, o, e);
    }
}
function Xo(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: o,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = o.get(t);
  let a;
  return l ? a = l : !i.length && !n && !s ? a = t : (a = {}, i.length && i.forEach(
    (d) => qn(a, d, r, !0)
  ), qn(a, t, r)), ae(t) && o.set(t, a), a;
}
function qn(e, t, n, s = !1) {
  const { mixins: i, extends: o } = t;
  o && qn(e, o, n, !0), i && i.forEach(
    (r) => qn(e, r, n, !0)
  );
  for (const r in t)
    if (!(s && r === "expose")) {
      const l = Ul[r] || n && n[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const Ul = {
  data: Fi,
  props: ji,
  emits: ji,
  // objects
  methods: rn,
  computed: rn,
  // lifecycle
  beforeCreate: Pe,
  created: Pe,
  beforeMount: Pe,
  mounted: Pe,
  beforeUpdate: Pe,
  updated: Pe,
  beforeDestroy: Pe,
  beforeUnmount: Pe,
  destroyed: Pe,
  unmounted: Pe,
  activated: Pe,
  deactivated: Pe,
  errorCaptured: Pe,
  serverPrefetch: Pe,
  // assets
  components: rn,
  directives: rn,
  // watch
  watch: zl,
  // provide / inject
  provide: Fi,
  inject: Wl
};
function Fi(e, t) {
  return t ? e ? function() {
    return Se(
      z(e) ? e.call(this, this) : e,
      z(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Wl(e, t) {
  return rn(Us(e), Us(t));
}
function Us(e) {
  if (K(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function rn(e, t) {
  return e ? Se(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ji(e, t) {
  return e ? K(e) && K(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Se(
    /* @__PURE__ */ Object.create(null),
    Pi(e),
    Pi(t ?? {})
  ) : t;
}
function zl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Se(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Pe(e[s], t[s]);
  return n;
}
function Zo() {
  return {
    app: null,
    config: {
      isNativeTag: lo,
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
let Jl = 0;
function ql(e, t) {
  return function(s, i = null) {
    z(s) || (s = Se({}, s)), i != null && !ae(i) && (i = null);
    const o = Zo(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const d = o.app = {
      _uid: Jl++,
      _component: s,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: Ma,
      get config() {
        return o.config;
      },
      set config(f) {
      },
      use(f, ...m) {
        return r.has(f) || (f && z(f.install) ? (r.add(f), f.install(d, ...m)) : z(f) && (r.add(f), f(d, ...m))), d;
      },
      mixin(f) {
        return o.mixins.includes(f) || o.mixins.push(f), d;
      },
      component(f, m) {
        return m ? (o.components[f] = m, d) : o.components[f];
      },
      directive(f, m) {
        return m ? (o.directives[f] = m, d) : o.directives[f];
      },
      mount(f, m, b) {
        if (!a) {
          const O = d._ceVNode || at(s, i);
          return O.appContext = o, b === !0 ? b = "svg" : b === !1 && (b = void 0), e(O, f, b), a = !0, d._container = f, f.__vue_app__ = d, ds(O.component);
        }
      },
      onUnmount(f) {
        l.push(f);
      },
      unmount() {
        a && (Ge(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(f, m) {
        return o.provides[f] = m, d;
      },
      runWithContext(f) {
        const m = Xt;
        Xt = d;
        try {
          return f();
        } finally {
          Xt = m;
        }
      }
    };
    return d;
  };
}
let Xt = null;
const Yl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Je(t)}Modifiers`] || e[`${jt(t)}Modifiers`];
function Gl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ue;
  let i = n;
  const o = t.startsWith("update:"), r = o && Yl(s, t.slice(7));
  r && (r.trim && (i = n.map((f) => pe(f) ? f.trim() : f)), r.number && (i = i.map(ss)));
  let l, a = s[l = bs(t)] || // also try camelCase event handler (#2249)
  s[l = bs(Je(t))];
  !a && o && (a = s[l = bs(jt(t))]), a && Ge(
    a,
    e,
    6,
    i
  );
  const d = s[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ge(
      d,
      e,
      6,
      i
    );
  }
}
const Xl = /* @__PURE__ */ new WeakMap();
function Qo(e, t, n = !1) {
  const s = n ? Xl : t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const o = e.emits;
  let r = {}, l = !1;
  if (!z(e)) {
    const a = (d) => {
      const f = Qo(d, t, !0);
      f && (l = !0, Se(r, f));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (ae(e) && s.set(e, null), null) : (K(o) ? o.forEach((a) => r[a] = null) : Se(r, o), ae(e) && s.set(e, r), r);
}
function us(e, t) {
  return !e || !es(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, jt(t)) || ee(e, t));
}
function Ni(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    propsOptions: [o],
    slots: r,
    attrs: l,
    emit: a,
    render: d,
    renderCache: f,
    props: m,
    data: b,
    setupState: O,
    ctx: F,
    inheritAttrs: P
  } = e, B = Wn(e);
  let N, k;
  try {
    if (n.shapeFlag & 4) {
      const R = i || s, J = R;
      N = it(
        d.call(
          J,
          R,
          f,
          m,
          O,
          b,
          F
        )
      ), k = l;
    } else {
      const R = t;
      N = it(
        R.length > 1 ? R(
          m,
          { attrs: l, slots: r, emit: a }
        ) : R(
          m,
          null
        )
      ), k = t.props ? l : Zl(l);
    }
  } catch (R) {
    wt.length = 0, rs(R, e, 1), N = at(Ue);
  }
  let $ = N;
  if (k && P !== !1) {
    const R = Object.keys(k), { shapeFlag: J } = $;
    R.length && J & 7 && (o && R.some(ts) && (k = Ql(
      k,
      o
    )), $ = Zt($, k, !1, !0));
  }
  if (n.dirs && ($ = Zt($, null, !1, !0), $.dirs = $.dirs ? $.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const R = ls($.type) && Bo($) || $;
    zn(R, n.transition);
  }
  return N = $, Wn(B), N;
}
function er(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (fs(i)) {
      if (i.type !== Ue || i.children === "v-if") {
        if (n)
          return;
        n = i;
      }
    } else
      return;
  }
  return n;
}
const Zl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || es(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ql = (e, t) => {
  const n = {};
  for (const s in e)
    (!ts(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function ea(e, t, n) {
  const { props: s, children: i, component: o } = e, { props: r, children: l, patchFlag: a } = t, d = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? $i(s, r, d) : !!r;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let m = 0; m < f.length; m++) {
        const b = f[m];
        if (tr(r, s, b) && !us(d, b))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === r ? !1 : s ? r ? $i(s, r, d) : !0 : !!r;
  return !1;
}
function $i(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const o = s[i];
    if (!ee(e, o) || tr(t, e, o) && !us(n, o))
      return !0;
  }
  return !1;
}
function tr(e, t, n) {
  const s = e[n], i = t[n];
  return n === "style" && ae(s) && ae(i) ? !_t(s, i) : s !== i;
}
function ta({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = s, e = i), i === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const nr = {}, sr = () => Object.create(nr), ir = (e) => Object.getPrototypeOf(e) === nr;
function na(e, t, n, s = !1) {
  const i = {}, o = sr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), or(e, t, i, o);
  for (const r in e.propsOptions[0])
    r in i || (i[r] = void 0);
  n ? e.props = s ? i : /* @__PURE__ */ rl(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function sa(e, t, n, s) {
  const {
    props: i,
    attrs: o,
    vnode: { patchFlag: r }
  } = e, l = /* @__PURE__ */ ie(i), [a] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const f = e.vnode.dynamicProps;
      for (let m = 0; m < f.length; m++) {
        let b = f[m];
        if (us(e.emitsOptions, b))
          continue;
        const O = t[b];
        if (a)
          if (ee(o, b))
            O !== o[b] && (o[b] = O, d = !0);
          else {
            const F = Je(b);
            i[F] = Ws(
              a,
              l,
              F,
              O,
              e,
              !1
            );
          }
        else
          O !== o[b] && (o[b] = O, d = !0);
      }
    }
  } else {
    or(e, t, i, o) && (d = !0);
    let f;
    for (const m in l)
      (!t || // for camelCase
      !ee(t, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = jt(m)) === m || !ee(t, f))) && (a ? n && // for camelCase
      (n[m] !== void 0 || // for kebab-case
      n[f] !== void 0) && (i[m] = Ws(
        a,
        l,
        m,
        void 0,
        e,
        !0
      )) : delete i[m]);
    if (o !== l)
      for (const m in o)
        (!t || !ee(t, m)) && (delete o[m], d = !0);
  }
  d && yt(e.attrs, "set", "");
}
function or(e, t, n, s) {
  const [i, o] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let a in t) {
      if (an(a))
        continue;
      const d = t[a];
      let f;
      i && ee(i, f = Je(a)) ? !o || !o.includes(f) ? n[f] = d : (l || (l = {}))[f] = d : us(e.emitsOptions, a) || (!(a in s) || d !== s[a]) && (s[a] = d, r = !0);
    }
  if (o) {
    const a = /* @__PURE__ */ ie(n), d = l || ue;
    for (let f = 0; f < o.length; f++) {
      const m = o[f];
      n[m] = Ws(
        i,
        a,
        m,
        d[m],
        e,
        !ee(d, m)
      );
    }
  }
  return r;
}
function Ws(e, t, n, s, i, o) {
  const r = e[n];
  if (r != null) {
    const l = ee(r, "default");
    if (l && s === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && z(a)) {
        const { propsDefaults: d } = i;
        if (n in d)
          s = d[n];
        else {
          const f = Sn(i);
          s = d[n] = a.call(
            null,
            t
          ), f();
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
    ] && (s === "" || s === jt(n)) && (s = !0));
  }
  return s;
}
const ia = /* @__PURE__ */ new WeakMap();
function rr(e, t, n = !1) {
  const s = n ? ia : t.propsCache, i = s.get(e);
  if (i)
    return i;
  const o = e.props, r = {}, l = [];
  let a = !1;
  if (!z(e)) {
    const f = (m) => {
      a = !0;
      const [b, O] = rr(m, t, !0);
      Se(r, b), O && l.push(...O);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!o && !a)
    return ae(e) && s.set(e, Kt), Kt;
  if (K(o))
    for (let f = 0; f < o.length; f++) {
      const m = Je(o[f]);
      Li(m) && (r[m] = ue);
    }
  else if (o)
    for (const f in o) {
      const m = Je(f);
      if (Li(m)) {
        const b = o[f], O = r[m] = K(b) || z(b) ? { type: b } : Se({}, b), F = O.type;
        let P = !1, B = !0;
        if (K(F))
          for (let N = 0; N < F.length; ++N) {
            const k = F[N], $ = z(k) && k.name;
            if ($ === "Boolean") {
              P = !0;
              break;
            } else $ === "String" && (B = !1);
          }
        else
          P = z(F) && F.name === "Boolean";
        O[
          0
          /* shouldCast */
        ] = P, O[
          1
          /* shouldCastTrue */
        ] = B, (P || ee(O, "default")) && l.push(m);
      }
    }
  const d = [r, l];
  return ae(e) && s.set(e, d), d;
}
function Li(e) {
  return e[0] !== "$" && !an(e);
}
const di = (e) => e === "_" || e === "_ctx" || e === "$stable", hi = (e) => K(e) ? e.map(it) : [it(e)], oa = (e, t, n) => {
  if (t._n)
    return t;
  const s = Do((...i) => hi(t(...i)), n);
  return s._c = !1, s;
}, lr = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (di(i)) continue;
    const o = e[i];
    if (z(o))
      t[i] = oa(i, o, s);
    else if (o != null) {
      const r = hi(o);
      t[i] = () => r;
    }
  }
}, ar = (e, t) => {
  const n = hi(t);
  e.slots.default = () => n;
}, ur = (e, t, n) => {
  for (const s in t)
    (n || !di(s)) && (e[s] = t[s]);
}, ra = (e, t, n) => {
  const s = e.slots = sr();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (ur(s, t, n), n && ho(s, "_", i, !0)) : lr(t, s);
  } else t && ar(e, t);
}, la = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let o = !0, r = ue;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : ur(i, t, n) : (o = !t.$stable, lr(t, i)), r = t;
  } else t && (ar(e, t), r = { default: 1 });
  if (o)
    for (const l in i)
      !di(l) && r[l] == null && delete i[l];
}, ke = da;
function aa(e) {
  return ua(e);
}
function ua(e, t) {
  const n = is();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: o,
    createElement: r,
    createText: l,
    createComment: a,
    setText: d,
    setElementText: f,
    parentNode: m,
    nextSibling: b,
    setScopeId: O = lt,
    insertStaticContent: F
  } = e, P = (u, g, v, S = null, x = null, C = null, E = void 0, A = null, T = !!g.dynamicChildren) => {
    if (u === g)
      return;
    u && !nn(u, g) && (S = dt(u), Ne(u, x, C, !0), u = null), g.patchFlag === -2 && (T = !1, g.dynamicChildren = null), g.dynamicChildren && u && u.dynamicChildren && u.dynamicChildren.hasOnce && (g.dynamicChildren === Kt && (g.dynamicChildren = []), g.dynamicChildren.hasOnce = !0);
    const { type: _, ref: D, shapeFlag: I } = g;
    switch (_) {
      case cs:
        B(u, g, v, S);
        break;
      case Ue:
        N(u, g, v, S);
        break;
      case As:
        u == null && k(g, v, S, E);
        break;
      case de:
        Y(
          u,
          g,
          v,
          S,
          x,
          C,
          E,
          A,
          T
        );
        break;
      default:
        I & 1 ? J(
          u,
          g,
          v,
          S,
          x,
          C,
          E,
          A,
          T
        ) : I & 6 ? he(
          u,
          g,
          v,
          S,
          x,
          C,
          E,
          A,
          T
        ) : (I & 64 || I & 128) && _.process(
          u,
          g,
          v,
          S,
          x,
          C,
          E,
          A,
          T,
          Mt
        );
    }
    D != null && x ? dn(D, u && u.ref, C, g || u, !g) : D == null && u && u.ref != null && dn(u.ref, null, C, u, !0);
  }, B = (u, g, v, S) => {
    if (u == null)
      s(
        g.el = l(g.children),
        v,
        S
      );
    else {
      const x = g.el = u.el;
      g.children !== u.children && d(x, g.children);
    }
  }, N = (u, g, v, S) => {
    u == null ? s(
      g.el = a(g.children || ""),
      v,
      S
    ) : g.el = u.el;
  }, k = (u, g, v, S) => {
    [u.el, u.anchor] = F(
      u.children,
      g,
      v,
      S,
      u.el,
      u.anchor
    );
  }, $ = ({ el: u, anchor: g }, v, S) => {
    let x;
    for (; u && u !== g; )
      x = b(u), s(u, v, S), u = x;
    s(g, v, S);
  }, R = ({ el: u, anchor: g }) => {
    let v;
    for (; u && u !== g; )
      v = b(u), i(u), u = v;
    i(g);
  }, J = (u, g, v, S, x, C, E, A, T) => {
    if (g.type === "svg" ? E = "svg" : g.type === "math" && (E = "mathml"), u == null)
      j(
        g,
        v,
        S,
        x,
        C,
        E,
        A,
        T
      );
    else {
      const _ = u.el && u.el._isVueCE ? u.el : null;
      try {
        _ && _._beginPatch(), oe(
          u,
          g,
          x,
          C,
          E,
          A,
          T
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, j = (u, g, v, S, x, C, E, A) => {
    let T, _;
    const { props: D, shapeFlag: I, transition: V, dirs: W } = u;
    if (T = u.el = r(
      u.type,
      C,
      D && D.is,
      D
    ), I & 8 ? f(T, u.children) : I & 16 && Z(
      u.children,
      T,
      null,
      S,
      x,
      Es(u, C),
      E,
      A
    ), W && $t(u, null, S, "created"), U(T, u, u.scopeId, E, S), D) {
      for (const X in D)
        X !== "value" && !an(X) && o(T, X, null, D[X], C, S);
      "value" in D && o(T, "value", null, D.value, C), (_ = D.onVnodeBeforeMount) && Ze(_, S, u);
    }
    W && $t(u, null, S, "beforeMount");
    const q = ca(x, V);
    q && V.beforeEnter(T), s(T, g, v), ((_ = D && D.onVnodeMounted) || q || W) && ke(() => {
      _ && Ze(_, S, u), q && V.enter(T), W && $t(u, null, S, "mounted");
    }, x);
  }, U = (u, g, v, S, x) => {
    if (v && O(u, v), S)
      for (let C = 0; C < S.length; C++)
        O(u, S[C]);
    if (x) {
      let C = x.subTree;
      if (g === C || fr(C.type) && (C.ssContent === g || C.ssFallback === g)) {
        const E = x.vnode;
        U(
          u,
          E,
          E.scopeId,
          E.slotScopeIds,
          x.parent
        );
      }
    }
  }, Z = (u, g, v, S, x, C, E, A, T = 0) => {
    for (let _ = T; _ < u.length; _++) {
      const D = u[_] = A ? vt(u[_]) : it(u[_]);
      P(
        null,
        D,
        g,
        v,
        S,
        x,
        C,
        E,
        A
      );
    }
  }, oe = (u, g, v, S, x, C, E) => {
    const A = g.el = u.el;
    let { patchFlag: T, dynamicChildren: _, dirs: D } = g;
    T |= u.patchFlag & 16;
    const I = u.props || ue, V = g.props || ue;
    let W;
    if (v && Lt(v, !1), (W = V.onVnodeBeforeUpdate) && Ze(W, v, g, u), D && $t(g, u, v, "beforeUpdate"), v && Lt(v, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!u.dynamicChildren || u.dynamicChildren.length !== _.length) && (T = 0, E = !1, _ = null), (I.innerHTML && V.innerHTML == null || I.textContent && V.textContent == null) && f(A, ""), _ ? w(
      u.dynamicChildren,
      _,
      A,
      v,
      S,
      Es(g, x),
      C
    ) : E || le(
      u,
      g,
      A,
      null,
      v,
      S,
      Es(g, x),
      C,
      !1
    ), T > 0) {
      if (T & 16)
        H(A, I, V, v, x);
      else if (T & 2 && I.class !== V.class && o(A, "class", null, V.class, x), T & 4 && o(A, "style", I.style, V.style, x), T & 8) {
        const q = g.dynamicProps;
        for (let X = 0; X < q.length; X++) {
          const te = q[X], fe = I[te], we = V[te];
          (we !== fe || te === "value") && o(A, te, fe, we, x, v);
        }
      }
      T & 1 && u.children !== g.children && f(A, g.children);
    } else !E && _ == null && H(A, I, V, v, x);
    ((W = V.onVnodeUpdated) || D) && ke(() => {
      W && Ze(W, v, g, u), D && $t(g, u, v, "updated");
    }, S);
  }, w = (u, g, v, S, x, C, E) => {
    for (let A = 0; A < g.length; A++) {
      const T = u[A], _ = g[A], D = T.el || zs(T), I = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        D && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (T.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !nn(T, _) || // - In the case of a component, it could contain anything.
        T.shapeFlag & 198) ? m(D) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      P(
        T,
        _,
        I,
        null,
        S,
        x,
        C,
        E,
        !0
      );
    }
  }, H = (u, g, v, S, x) => {
    if (g !== v) {
      if (g !== ue)
        for (const C in g)
          !an(C) && !(C in v) && o(
            u,
            C,
            g[C],
            null,
            x,
            S
          );
      for (const C in v) {
        if (an(C)) continue;
        const E = v[C], A = g[C];
        E !== A && C !== "value" && o(u, C, A, E, x, S);
      }
      "value" in v && o(u, "value", g.value, v.value, x);
    }
  }, Y = (u, g, v, S, x, C, E, A, T) => {
    const _ = g.el = u ? u.el : l(""), D = g.anchor = u ? u.anchor : l("");
    let { patchFlag: I, dynamicChildren: V, slotScopeIds: W } = g;
    W && (A = A ? A.concat(W) : W), u == null ? (s(_, v, S), s(D, v, S), Z(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      v,
      D,
      x,
      C,
      E,
      A,
      T
    )) : I > 0 && I & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === V.length ? (w(
      u.dynamicChildren,
      V,
      v,
      x,
      C,
      E,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || x && g === x.subTree) && pi(
      u,
      g,
      !0
      /* shallow */
    )) : le(
      u,
      g,
      v,
      D,
      x,
      C,
      E,
      A,
      T
    );
  }, he = (u, g, v, S, x, C, E, A, T) => {
    g.slotScopeIds = A, u == null ? g.shapeFlag & 512 ? x.ctx.activate(
      g,
      v,
      S,
      E,
      T
    ) : xe(
      g,
      v,
      S,
      x,
      C,
      E,
      T
    ) : en(u, g, T);
  }, xe = (u, g, v, S, x, C, E) => {
    const A = u.component = ya(
      u,
      S,
      x
    );
    if (fi(u) && (A.ctx.renderer = Mt), wa(A, !1, E), A.asyncDep) {
      if (x && x.registerDep(
        A,
        ye,
        E,
        C
      ), !u.el) {
        const T = A.subTree = at(Ue);
        N(null, T, g, v), u.placeholder = T.el;
      }
    } else
      ye(
        A,
        u,
        g,
        v,
        x,
        C,
        E
      );
  }, en = (u, g, v) => {
    const S = g.component = u.component;
    if (ea(u, g, v))
      if (S.asyncDep && !S.asyncResolved) {
        g.el = u.el, g.placeholder = u.placeholder, Q(S, g, v);
        return;
      } else
        S.next = g, S.update();
    else
      g.el = u.el, g.placeholder = u.placeholder, S.vnode = g;
  }, ye = (u, g, v, S, x, C, E) => {
    const A = () => {
      if (u.isMounted) {
        let { next: I, bu: V, u: W, parent: q, vnode: X } = u;
        {
          const Me = cr(u);
          if (Me) {
            I && (I.el = X.el, Q(u, I, E)), Me.asyncDep.then(() => {
              ke(() => {
                u.isUnmounted || _();
              }, x);
            });
            return;
          }
        }
        let te = I, fe;
        Lt(u, !1), I ? (I.el = X.el, Q(u, I, E)) : I = X, V && Dn(V), (fe = I.props && I.props.onVnodeBeforeUpdate) && Ze(fe, q, I, X), Lt(u, !0);
        const we = Ni(u), $e = u.subTree;
        u.subTree = we, P(
          $e,
          we,
          // parent may have changed if it's in a teleport
          m($e.el),
          // anchor may have changed if it's in a fragment
          dt($e),
          u,
          x,
          C
        ), I.el = we.el, te === null && ta(u, we.el), W && ke(W, x), (fe = I.props && I.props.onVnodeUpdated) && ke(
          () => Ze(fe, q, I, X),
          x
        );
      } else {
        let I;
        const { el: V, props: W } = g, { bm: q, m: X, parent: te, root: fe, type: we } = u, $e = Gt(g);
        Lt(u, !1), q && Dn(q), !$e && (I = W && W.onVnodeBeforeMount) && Ze(I, te, g), Lt(u, !0);
        {
          fe.ce && fe.ce._hasShadowRoot() && fe.ce._injectChildStyle(
            we,
            u.parent ? u.parent.type : void 0
          );
          const Me = u.subTree = Ni(u);
          P(
            null,
            Me,
            v,
            S,
            u,
            x,
            C
          ), g.el = Me.el;
        }
        if (X && ke(X, x), !$e && (I = W && W.onVnodeMounted)) {
          const Me = g;
          ke(
            () => Ze(I, te, Me),
            x
          );
        }
        (g.shapeFlag & 256 || te && Gt(te.vnode) && te.vnode.shapeFlag & 256) && u.a && ke(u.a, x), u.isMounted = !0, g = v = S = null;
      }
    };
    u.scope.on();
    const T = u.effect = new vo(A);
    u.scope.off();
    const _ = u.update = T.run.bind(T), D = u.job = T.runIfDirty.bind(T);
    D.i = u, D.id = u.uid, T.scheduler = () => ci(D), Lt(u, !0), _();
  }, Q = (u, g, v) => {
    g.component = u;
    const S = u.vnode.props;
    u.vnode = g, u.next = null, sa(u, g.props, S, v), la(u, g.children, v), ut(), jo(u), ct();
  }, le = (u, g, v, S, x, C, E, A, T = !1) => {
    const _ = u && u.children, D = u ? u.shapeFlag : 0, I = g.children, { patchFlag: V, shapeFlag: W } = g;
    if (V > 0) {
      if (V & 128) {
        Xe(
          _,
          I,
          v,
          S,
          x,
          C,
          E,
          A,
          T
        );
        return;
      } else if (V & 256) {
        Ie(
          _,
          I,
          v,
          S,
          x,
          C,
          E,
          A,
          T
        );
        return;
      }
    }
    W & 8 ? (D & 16 && be(_, x, C), I !== _ && f(v, I)) : D & 16 ? W & 16 ? Xe(
      _,
      I,
      v,
      S,
      x,
      C,
      E,
      A,
      T
    ) : be(_, x, C, !0) : (D & 8 && f(v, ""), W & 16 && Z(
      I,
      v,
      S,
      x,
      C,
      E,
      A,
      T
    ));
  }, Ie = (u, g, v, S, x, C, E, A, T) => {
    u = u || Kt, g = g || Kt;
    const _ = u.length, D = g.length, I = Math.min(_, D);
    let V;
    for (V = 0; V < I; V++) {
      const W = g[V] = T ? vt(g[V]) : it(g[V]);
      P(
        u[V],
        W,
        v,
        null,
        x,
        C,
        E,
        A,
        T
      );
    }
    _ > D ? be(
      u,
      x,
      C,
      !0,
      !1,
      I
    ) : Z(
      g,
      v,
      S,
      x,
      C,
      E,
      A,
      T,
      I
    );
  }, Xe = (u, g, v, S, x, C, E, A, T) => {
    let _ = 0;
    const D = g.length;
    let I = u.length - 1, V = D - 1;
    for (; _ <= I && _ <= V; ) {
      const W = u[_], q = g[_] = T ? vt(g[_]) : it(g[_]);
      if (nn(W, q))
        P(
          W,
          q,
          v,
          null,
          x,
          C,
          E,
          A,
          T
        );
      else
        break;
      _++;
    }
    for (; _ <= I && _ <= V; ) {
      const W = u[I], q = g[V] = T ? vt(g[V]) : it(g[V]);
      if (nn(W, q))
        P(
          W,
          q,
          v,
          null,
          x,
          C,
          E,
          A,
          T
        );
      else
        break;
      I--, V--;
    }
    if (_ > I) {
      if (_ <= V) {
        const W = V + 1, q = W < D ? g[W].el : S;
        for (; _ <= V; )
          P(
            null,
            g[_] = T ? vt(g[_]) : it(g[_]),
            v,
            q,
            x,
            C,
            E,
            A,
            T
          ), _++;
      }
    } else if (_ > V)
      for (; _ <= I; )
        Ne(u[_], x, C, !0), _++;
    else {
      const W = _, q = _, X = /* @__PURE__ */ new Map();
      for (_ = q; _ <= V; _++) {
        const Oe = g[_] = T ? vt(g[_]) : it(g[_]);
        Oe.key != null && X.set(Oe.key, _);
      }
      let te, fe = 0;
      const we = V - q + 1;
      let $e = !1, Me = 0;
      const Ot = new Array(we);
      for (_ = 0; _ < we; _++) Ot[_] = 0;
      for (_ = W; _ <= I; _++) {
        const Oe = u[_];
        if (fe >= we) {
          Ne(Oe, x, C, !0);
          continue;
        }
        let Le;
        if (Oe.key != null)
          Le = X.get(Oe.key);
        else
          for (te = q; te <= V; te++)
            if (Ot[te - q] === 0 && nn(Oe, g[te])) {
              Le = te;
              break;
            }
        Le === void 0 ? Ne(Oe, x, C, !0) : (Ot[Le - q] = _ + 1, Le >= Me ? Me = Le : $e = !0, P(
          Oe,
          g[Le],
          v,
          null,
          x,
          C,
          E,
          A,
          T
        ), fe++);
      }
      const Tn = $e ? fa(Ot) : Kt;
      for (te = Tn.length - 1, _ = we - 1; _ >= 0; _--) {
        const Oe = q + _, Le = g[Oe], Nt = g[Oe + 1], De = Oe + 1 < D ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Nt.el || zs(Nt)
        ) : S;
        Ot[_] === 0 ? P(
          null,
          Le,
          v,
          De,
          x,
          C,
          E,
          A,
          T
        ) : $e && (te < 0 || _ !== Tn[te] ? We(Le, v, De, 2) : te--);
      }
    }
  }, We = (u, g, v, S, x = null) => {
    const { el: C, type: E, transition: A, children: T, shapeFlag: _ } = u;
    if (_ & 6) {
      We(u.component.subTree, g, v, S);
      return;
    }
    if (_ & 128) {
      u.suspense.move(g, v, S);
      return;
    }
    if (_ & 64) {
      E.move(u, g, v, Mt);
      return;
    }
    if (E === de) {
      s(C, g, v);
      for (let I = 0; I < T.length; I++)
        We(T[I], g, v, S);
      s(u.anchor, g, v);
      return;
    }
    if (E === As) {
      $(u, g, v);
      return;
    }
    if (S !== 2 && _ & 1 && A)
      if (S === 0)
        A.persisted && !C[Os] ? s(C, g, v) : (A.beforeEnter(C), s(C, g, v), ke(() => A.enter(C), x));
      else {
        const { leave: I, delayLeave: V, afterLeave: W } = A, q = () => {
          u.ctx.isUnmounted ? i(C) : s(C, g, v);
        }, X = () => {
          const te = C._isLeaving || !!C[Os];
          C._isLeaving && C[Os](
            !0
            /* cancelled */
          ), A.persisted && !te ? q() : I(C, () => {
            q(), W && W();
          });
        };
        V ? V(C, q, X) : X();
      }
    else
      s(C, g, v);
  }, Ne = (u, g, v, S = !1, x = !1) => {
    const {
      type: C,
      props: E,
      ref: A,
      children: T,
      dynamicChildren: _,
      shapeFlag: D,
      patchFlag: I,
      dirs: V,
      cacheIndex: W,
      memo: q
    } = u;
    if ((I === -2 || _ && _.hasOnce) && (x = !1), A != null && (ut(), dn(A, null, v, u, !0), ct()), W != null && (!u.ctx || u.ctx === g) && (g.renderCache[W] = void 0), D & 256) {
      g.ctx.deactivate(u);
      return;
    }
    const X = D & 1 && V, te = !Gt(u);
    let fe;
    if (te && (fe = E && E.onVnodeBeforeUnmount) && Ze(fe, g, u), D & 6)
      ps(u.component, v, S);
    else {
      if (D & 128) {
        u.suspense.unmount(v, S);
        return;
      }
      X && $t(u, null, g, "beforeUnmount"), D & 64 ? u.type.remove(
        u,
        g,
        v,
        Mt,
        S
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== de || I > 0 && I & 64) ? be(
        _,
        g,
        v,
        !1,
        !0
      ) : (C === de && I & 384 || !x && D & 16) && be(T, g, v), S && Mn(u);
    }
    const we = q != null && W == null;
    (te && (fe = E && E.onVnodeUnmounted) || X || we) && ke(() => {
      fe && Ze(fe, g, u), X && $t(u, null, g, "unmounted"), we && (u.el = null);
    }, v);
  }, Mn = (u) => {
    const { type: g, el: v, anchor: S, transition: x } = u, C = g === de;
    if (C && !x) {
      On(v, S);
      return;
    }
    if (g === As) {
      R(u), x && !x.persisted && x.afterLeave && x.afterLeave();
      return;
    }
    const E = C ? Ks(u) : u, A = () => {
      C ? m(v) && On(v, S) : i(v), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (E && E.shapeFlag & 1 && x && !x.persisted) {
      const { leave: T, delayLeave: _ } = x, D = E.el, I = () => T(D, A);
      _ ? _(D, A, I) : I();
    } else
      A();
  }, On = (u, g) => {
    let v;
    for (; u !== g; )
      v = b(u), i(u), u = v;
    i(g);
  }, ps = (u, g, v) => {
    const { bum: S, scope: x, job: C, subTree: E, um: A, m: T, a: _ } = u;
    Di(T), Di(_), S && Dn(S), x.stop(), C ? (C.flags |= 8, Ne(E, u, g, v)) : u.vnode.el && E && (E.transition = u.vnode.transition, Ne(E, u, g, v)), A && ke(A, g), ke(() => {
      u.isUnmounted = !0;
    }, g);
  }, be = (u, g, v, S = !1, x = !1, C = 0) => {
    for (let E = C; E < u.length; E++)
      Ne(u[E], g, v, S, x);
  }, dt = (u) => {
    if (u.shapeFlag & 6)
      return dt(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const g = b(u.anchor || u.el), v = g && g[Ho];
    return v ? b(v) : g;
  }, St = (u, g, v) => {
    const S = u && g._vnode ? void 0 : u && u.component ? u.component.uid : va();
    yl(() => {
      u == null ? g._vnode && Ne(g._vnode, null, null, !0) : P(
        g._vnode || null,
        u,
        g,
        null,
        null,
        null,
        v
      ), g._vnode = u;
    }, S);
  }, Mt = {
    p: P,
    um: Ne,
    m: We,
    r: Mn,
    mt: xe,
    mc: Z,
    pc: le,
    pbc: w,
    n: dt,
    o: e
  };
  return {
    render: St,
    hydrate: void 0,
    createApp: ql(St)
  };
}
function Es({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Lt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ca(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function pi(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (K(s) && K(i))
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
      let l = i[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = vt(i[o]), l.el = r.el), !n && l.patchFlag !== -2 && pi(r, l)), l.type === cs && (l.patchFlag === -1 && (l = i[o] = vt(l)), l.el = r.el), l.type === Ue && !l.el && (l.el = r.el);
    }
}
function fa(e) {
  const t = e.slice(), n = [0];
  let s, i, o, r, l;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const d = e[s];
    if (d !== 0) {
      if (i = n[n.length - 1], e[i] < d) {
        t[s] = i, n.push(s);
        continue;
      }
      for (o = 0, r = n.length - 1; o < r; )
        l = o + r >> 1, e[n[l]] < d ? o = l + 1 : r = l;
      d < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s);
    }
  }
  for (o = n.length, r = n[o - 1]; o-- > 0; )
    n[o] = r, r = t[r];
  return n;
}
function cr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : cr(t);
}
function Di(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function zs(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? zs(t.subTree) : null;
}
const fr = (e) => e.__isSuspense;
function da(e, t) {
  t && t.pendingBranch ? K(e) ? t.effects.push(...e) : t.effects.push(e) : vl(e);
}
const de = /* @__PURE__ */ Symbol.for("v-fgt"), cs = /* @__PURE__ */ Symbol.for("v-txt"), Ue = /* @__PURE__ */ Symbol.for("v-cmt"), As = /* @__PURE__ */ Symbol.for("v-stc"), wt = [];
let Ve = null;
function G(e = !1) {
  wt.push(Ve = e ? null : []);
}
function gi() {
  wt.pop(), Ve = wt[wt.length - 1] || null;
}
let vn = 1;
function Vi(e, t = !1) {
  vn += e, e < 0 && Ve && t && (Ve.hasOnce = !0);
}
function dr(e) {
  return e.dynamicChildren = vn > 0 ? Ve || Kt : null, gi(), vn > 0 && Ve && Ve.push(e), e;
}
function re(e, t, n, s, i, o) {
  return dr(
    y(
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
function yn(e, t, n, s, i) {
  return dr(
    at(
      e,
      t,
      n,
      s,
      i,
      !0
    )
  );
}
function fs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const hr = ({ key: e }) => e ?? null, Kn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? pe(e) || /* @__PURE__ */ Re(e) || z(e) ? { i: Ae, r: e, k: t, f: !!n } : e : null);
function y(e, t = null, n = null, s = 0, i = null, o = e === de ? 0 : 1, r = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && hr(t),
    ref: t && Kn(t),
    scopeId: Lo,
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
  return l ? (Yn(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= pe(n) ? 8 : 16), vn > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Ve && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ve.push(a), a;
}
const at = ha;
function ha(e, t = null, n = null, s = 0, i = null, o = !1) {
  if ((!e || e === Dl) && (e = Ue), fs(e)) {
    const l = Zt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Yn(l, n), vn > 0 && !o && Ve && (l.shapeFlag & 6 ? Ve[Ve.indexOf(e)] = l : Ve.push(l)), l.patchFlag = -2, l;
  }
  if (Sa(e) && (e = e.__vccOpts), t) {
    t = pa(t);
    let { class: l, style: a } = t;
    l && !pe(l) && (t.class = Rt(l)), ae(a) && (/* @__PURE__ */ ui(a) && !K(a) && (a = Se({}, a)), t.style = Ht(a));
  }
  const r = pe(e) ? 1 : fr(e) ? 128 : ls(e) ? 64 : ae(e) ? 4 : z(e) ? 2 : 0;
  return y(
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
function pa(e) {
  return e ? /* @__PURE__ */ ui(e) || ir(e) ? Se({}, e) : e : null;
}
function Zt(e, t, n = !1, s = !1) {
  const { props: i, ref: o, patchFlag: r, children: l, transition: a } = e, d = t ? ga(i || {}, t) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && hr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? K(o) ? o.concat(Kn(t)) : [o, Kn(t)] : Kn(t)
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
    patchFlag: t && e.type !== de ? r === -1 ? 16 : r | 16 : r,
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
    ssContent: e.ssContent && Zt(e.ssContent),
    ssFallback: e.ssFallback && Zt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && s && zn(
    f,
    a.clone(f)
  ), f;
}
function Te(e = " ", t = 0) {
  return at(cs, null, e, t);
}
function Qe(e = "", t = !1) {
  return t ? (G(), yn(Ue, null, e)) : at(Ue, null, e);
}
function it(e) {
  return e == null || typeof e == "boolean" ? at(Ue) : K(e) ? at(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : fs(e) ? vt(e) : at(cs, null, String(e));
}
function vt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Zt(e);
}
function Yn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (K(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Yn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !ir(t) ? t._ctx = Ae : i === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (z(t)) {
    if (s & 65) {
      Yn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ae }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [Te(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function ga(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Rt([t.class, s.class]));
      else if (i === "style")
        t.style = Ht([t.style, s.style]);
      else if (es(i)) {
        const o = t[i], r = s[i];
        r && o !== r && !(K(o) && o.includes(r)) ? t[i] = o ? [].concat(o, r) : r : r == null && o == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !ts(i) && (t[i] = r);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function Ze(e, t, n, s = null) {
  Ge(e, t, 7, [
    n,
    s
  ]);
}
const ma = Zo();
let pr = 0;
function va() {
  return pr;
}
function ya(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || ma, o = {
    uid: pr++,
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
    scope: new Hr(
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
    propsOptions: rr(s, i),
    emitsOptions: Qo(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ue,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ue,
    data: ue,
    props: ue,
    attrs: ue,
    slots: ue,
    refs: ue,
    setupState: ue,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Gl.bind(null, o), e.ce && e.ce(o), o;
}
let je = null;
const ba = () => je || Ae;
let Gn, bn;
{
  const e = is(), t = (n, s) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(s), (o) => {
      i.length > 1 ? i.forEach((r) => r(o)) : i[0](o);
    };
  };
  Gn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => je = n
  ), bn = t(
    "__VUE_SSR_SETTERS__",
    (n) => wn = n
  );
}
const Sn = (e) => {
  const t = je;
  return Gn(e), e.scope.on(), () => {
    e.scope.off(), Gn(t);
  };
}, Ki = () => {
  je && je.scope.off(), Gn(null);
};
function gr(e) {
  return e.vnode.shapeFlag & 4;
}
let wn = !1;
function wa(e, t = !1, n = !1) {
  t && bn(t);
  const { props: s, children: i } = e.vnode, o = gr(e);
  na(e, s, o, t), ra(e, i, n || t);
  const r = o ? xa(e, t) : void 0;
  return t && bn(!1), r;
}
function xa(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Kl);
  const { setup: s } = n;
  if (s) {
    ut();
    const i = e.setupContext = s.length > 1 ? Ca(e) : null, o = Sn(e), r = Cn(
      s,
      e,
      0,
      [
        e.props,
        i
      ]
    ), l = ao(r);
    if (ct(), o(), (l || e.sp) && !Gt(e) && Wo(e), l) {
      if (r.then(Ki, Ki), t)
        return r.then((a) => {
          bn(!0);
          try {
            Hi(e, a, t);
          } finally {
            bn(!1);
          }
        }).catch((a) => {
          rs(a, e, 0);
        });
      e.asyncDep = r;
    } else
      Hi(e, r);
  } else
    mr(e);
}
function Hi(e, t, n) {
  z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ae(t) && (e.setupState = Po(t)), mr(e);
}
function mr(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || lt);
  {
    const i = Sn(e);
    ut();
    try {
      Hl(e);
    } finally {
      ct(), i();
    }
  }
}
const _a = {
  get(e, t) {
    return Ee(e, "get", ""), e[t];
  }
};
function Ca(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, _a),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ds(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Po(ll(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in hn)
        return hn[n](e);
    },
    has(t, n) {
      return n in t || n in hn;
    }
  })) : e.proxy;
}
function Sa(e) {
  return z(e) && "__vccOpts" in e;
}
const et = (e, t) => /* @__PURE__ */ dl(e, t, wn), Ma = "3.5.44";
let Js;
const Bi = typeof window < "u" && window.trustedTypes;
if (Bi)
  try {
    Js = /* @__PURE__ */ Bi.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const vr = Js ? (e) => Js.createHTML(e) : (e) => e, Oa = "http://www.w3.org/2000/svg", Ta = "http://www.w3.org/1998/Math/MathML", mt = typeof document < "u" ? document : null, Ui = mt && /* @__PURE__ */ mt.createElement("template"), Ea = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? mt.createElementNS(Oa, e) : t === "mathml" ? mt.createElementNS(Ta, e) : n ? mt.createElement(e, { is: n }) : mt.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => mt.createTextNode(e),
  createComment: (e) => mt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => mt.querySelector(e),
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
      Ui.innerHTML = vr(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ui.content;
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
}, Aa = /* @__PURE__ */ Symbol("_vtc");
function Ra(e, t, n) {
  const s = e[Aa];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Wi = /* @__PURE__ */ Symbol("_vod"), Ia = /* @__PURE__ */ Symbol("_vsh"), Pa = /* @__PURE__ */ Symbol(""), ka = /(?:^|;)\s*display\s*:/;
function Fa(e, t, n) {
  const s = e.style, i = pe(n);
  let o = !1;
  if (n && !i) {
    if (t)
      if (pe(t))
        for (const r of t.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          n[l] == null && ln(s, l, "");
        }
      else
        for (const r in t)
          n[r] == null && ln(s, r, "");
    for (const r in n) {
      r === "display" && (o = !0);
      const l = n[r];
      l != null ? Na(
        e,
        r,
        !pe(t) && t ? t[r] : void 0,
        l
      ) || ln(s, r, l) : ln(s, r, "");
    }
  } else if (i) {
    if (t !== n) {
      const r = s[Pa];
      r && (n += ";" + r), s.cssText = n, o = ka.test(n);
    }
  } else t && e.removeAttribute("style");
  Wi in e && ((!i || t !== n) && (e[Wi] = o ? s.display : ""), e[Ia] && (s.display = "none"));
}
const Fn = /\s*!important$/;
function ln(e, t, n) {
  if (K(n))
    n.forEach((s) => ln(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    Fn.test(n) ? e.setProperty(t, n.replace(Fn, ""), "important") : e.setProperty(t, n);
  else {
    const s = ja(e, t);
    Fn.test(n) ? e.setProperty(
      jt(s),
      n.replace(Fn, ""),
      "important"
    ) : e[s] = n;
  }
}
const zi = ["Webkit", "Moz", "ms"], Rs = {};
function ja(e, t) {
  const n = Rs[t];
  if (n)
    return n;
  let s = Je(t);
  if (s !== "filter" && s in e)
    return Rs[t] = s;
  s = fo(s);
  for (let i = 0; i < zi.length; i++) {
    const o = zi[i] + s;
    if (o in e)
      return Rs[t] = o;
  }
  return t;
}
function Na(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && pe(s) && n === s;
}
const Ji = "http://www.w3.org/1999/xlink";
function qi(e, t, n, s, i, o = Dr(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ji, t.slice(6, t.length)) : e.setAttributeNS(Ji, t, n) : n == null || o && !po(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : Ye(n) ? String(n) : n
  );
}
function Yi(e, t, n, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? vr(n) : n);
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
    l === "boolean" ? n = po(n) : n == null && l === "string" ? (n = "", r = !0) : l === "number" && (n = 0, r = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  r && e.removeAttribute(i || t);
}
function It(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function $a(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Gi = /* @__PURE__ */ Symbol("_vei");
function La(e, t, n, s, i = null) {
  const o = e[Gi] || (e[Gi] = {}), r = o[t];
  if (s && r)
    r.value = s;
  else {
    const [l, a] = Ka(t);
    if (s) {
      const d = o[t] = Ua(
        s,
        i
      );
      It(e, l, d, a);
    } else r && ($a(e, l, r, a), o[t] = void 0);
  }
}
const Da = /(Once|Passive|Capture)$/, Va = /^on:?(?:Once|Passive|Capture)$/;
function Ka(e) {
  let t, n;
  for (; (n = e.match(Da)) && !Va.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : jt(e.slice(2)), t];
}
let Is = 0;
const Ha = /* @__PURE__ */ Promise.resolve(), Ba = () => Is || (Ha.then(() => Is = 0), Is = Date.now());
function Ua(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const i = n.value;
    if (K(i)) {
      const o = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        o.call(s), s._stopped = !0;
      };
      const r = i.slice(), l = [s];
      for (let a = 0; a < r.length && !s._stopped; a++) {
        const d = r[a];
        d && Ge(
          d,
          t,
          5,
          l
        );
      }
    } else
      Ge(
        i,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = Ba(), n;
}
const Xi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Wa = (e, t, n, s, i, o) => {
  const r = i === "svg";
  t === "class" ? Ra(e, s, r) : t === "style" ? Fa(e, n, s) : es(t) ? ts(t) || La(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : za(e, t, s, r)) ? (Yi(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && qi(e, t, s, r, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Ja(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !pe(s))) ? Yi(e, Je(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), qi(e, t, s, r));
};
function za(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Xi(t) && z(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Xi(t) && pe(n) ? !1 : t in e;
}
function Ja(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = Je(t);
  return Array.isArray(n) ? n.some((i) => Je(i) === s) : Object.keys(n).some((i) => Je(i) === s);
}
const Qt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return K(t) ? (n) => Dn(t, n) : t;
};
function qa(e) {
  e.target.composing = !0;
}
function Zi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const rt = /* @__PURE__ */ Symbol("_assign"), jn = /* @__PURE__ */ Symbol("_initialValue");
function Ps(e, t, n) {
  return t && (e = e.trim()), n && (e = ss(e)), e;
}
const ks = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
    e.parentNode && (e.type === "text" ? e[jn] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[jn] = e.defaultValue.replace(/\r\n?/g, `
`))), e[rt] = Qt(i);
    const o = s || i.props && i.props.type === "number";
    It(e, t ? "change" : "input", (r) => {
      r.target.composing || e[rt](Ps(e.value, n, o));
    }), (n || o) && It(e, "change", () => {
      e.value = Ps(e.value, n, o);
    }), t || (It(e, "compositionstart", qa), It(e, "compositionend", Zi), It(e, "change", Zi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const i = t ?? "", o = e[jn];
    delete e[jn], o !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== o ? e[rt](Ps(e.value, n, s)) : e.value = i;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: i, number: o } }, r) {
    if (e[rt] = Qt(r), e.composing) return;
    const l = (o || e.type === "number") && !/^0\d/.test(e.value) ? ss(e.value) : e.value, a = t ?? "";
    if (l === a)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (s && t === n || i && e.value.trim() === a) || (e.value = a);
  }
}, Qi = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[rt] = Qt(n), It(e, "change", () => {
      const s = e._modelValue, i = xn(e), o = e.checked, r = e[rt];
      if (K(s)) {
        const l = ti(s, i), a = l !== -1;
        if (o && !a)
          r(s.concat(i));
        else if (!o && a) {
          const d = [...s];
          d.splice(l, 1), r(d);
        }
      } else if (xt(s)) {
        const l = new Set(s);
        o ? l.add(i) : l.delete(i), r(l);
      } else
        r(yr(e, o));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: eo,
  beforeUpdate(e, t, n) {
    e[rt] = Qt(n), eo(e, t, n);
  }
};
function eo(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let i;
  if (K(t))
    i = ti(t, s.props.value) > -1;
  else if (xt(t))
    i = t.has(s.props.value);
  else {
    if (t === n) return;
    i = _t(t, yr(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const Ya = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, It(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => n ? ss(xn(a)) : xn(a)
      ), o = e.multiple, r = o ? xt(e._modelValue) ? new Set(i) : i : i[0], l = e._pendingValue = [
        o,
        o ? K(r) ? i.slice() : i : r
      ];
      try {
        e[rt](r);
      } finally {
        fn(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[rt] = Qt(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    to(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[rt] = Qt(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Ga(t, n[1], n[0])) && to(e, t);
  }
};
function Ga(e, t, n) {
  if (!n || K(e)) return _t(e, t);
  if (xt(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function to(e, t) {
  const n = e.multiple, s = K(t);
  if (!(n && !s && !xt(t))) {
    for (let i = 0, o = e.options.length; i < o; i++) {
      const r = e.options[i], l = xn(r);
      if (n)
        if (s) {
          const a = typeof l;
          a === "string" || a === "number" ? r.selected = t.some((d) => String(d) === String(l)) : r.selected = ti(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (_t(xn(r), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function xn(e) {
  return "_value" in e ? e._value : e.value;
}
function yr(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Xa = ["ctrl", "shift", "alt", "meta"], Za = {
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
  exact: (e, t) => Xa.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ke = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((i, ...o) => {
    for (let r = 0; r < t.length; r++) {
      const l = Za[t[r]];
      if (l && l(i, t)) return;
    }
    return e(i, ...o);
  }));
}, Qa = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Nn = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((i) => {
    if (!("key" in i))
      return;
    const o = jt(i.key);
    if (t.some(
      (r) => r === o || Qa[r] === o
    ))
      return e(i);
  }));
}, eu = /* @__PURE__ */ Se({ patchProp: Wa }, Ea);
let no;
function tu() {
  return no || (no = aa(eu));
}
const nu = ((...e) => {
  const t = tu().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const i = iu(s);
    if (!i) return;
    const o = t._component;
    !z(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const r = n(i, !1, su(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), r;
  }, t;
});
function su(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function iu(e) {
  return pe(e) ? document.querySelector(e) : e;
}
const ou = /* @__PURE__ */ Uo({
  __name: "ModalMask",
  props: {
    open: { type: Boolean },
    topLayer: { type: Boolean }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t;
    return (s, i) => (G(), yn(Ol, { to: "body" }, [
      e.open ? (G(), re(
        "div",
        {
          key: 0,
          class: "moss-modal",
          onMousedown: i[0] || (i[0] = Ke((o) => n("close"), ["self"]))
        },
        [
          Vl(s.$slots, "default", {}, void 0)
        ],
        32
        /* NEED_HYDRATION */
      )) : Qe("v-if", !0)
    ]));
  }
}), br = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, ru = /* @__PURE__ */ br(ou, [["__scopeId", "data-v-32f7ef2b"]]), lu = { canvases: { portrait: { width: 1088, height: 1920 }, landscape: { width: 1920, height: 1088 } } };
function Et(e) {
  return e.replace(/_[1-9]\d*$/, "");
}
function qs(e, t) {
  return typeof e == "number" && typeof t == "number" && e > 0 && t > 0 && e > t ? "landscape" : "portrait";
}
function Ys(e) {
  return lu.canvases[e];
}
function au(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw new Error(`JSON 解析失败:${i instanceof Error ? i.message : String(i)}`);
  }
  const n = uu(t);
  if (!n)
    throw new Error('需要形如 {"id":"my_layout","label":"…","portrait":[{"position":"…","slots":{"F":[y1,x1,y2,x2]}}]}');
  if (!n.portrait?.length && !n.landscape?.length)
    throw new Error("portrait 与 landscape 至少要有一个方向的面板");
  const s = t;
  if (s.canvas !== void 0 && !mi(s.canvas)) throw new Error("画布宽高必须是 64～8192 的偶数。");
  for (const i of ["portrait", "landscape"]) {
    if (s[i] === void 0) continue;
    const o = s[i], r = n.canvas ?? Ys(i);
    if (n.canvas && qs(r.width, r.height) !== i) throw new Error("面板方向与自定义画布宽高不符。");
    const l = /* @__PURE__ */ new Set();
    if (!Array.isArray(o) || !o.length) throw new Error(`${i}:需要非空面板数组。`);
    for (const a of o) {
      const d = a, f = typeof d?.position == "string" ? d.position.trim().toLowerCase() : "";
      if (!f || l.has(f)) throw new Error(`${i}:面板位置不能为空或重复。`);
      if (l.add(f), d?.layer !== void 0 && !Number.isSafeInteger(d.layer)) throw new Error(`${i}/${f}:层级必须为安全整数。`);
      if (!d?.slots || typeof d.slots != "object" || !Object.keys(d.slots).length)
        throw new Error(`${i}/${f}:需要槽位坐标。`);
      for (const [m, b] of Object.entries(d.slots)) {
        const O = wr(b);
        if (!m.trim() || !O || O[0] < -r.height / 2 || O[2] > r.height / 2 || O[1] < -r.width / 2 || O[3] > r.width / 2)
          throw new Error(`${i}/${f}/${m}:坐标无效或超出画布。`);
      }
      for (const [m, b] of Object.entries(d.shapes ?? {}))
        if (!d.slots[m] || !vi(b) || b.some(([O, F]) => Math.abs(O) > r.width / 2 || Math.abs(F) > r.height / 2))
          throw new Error(`${i}/${f}/${m}:四边形角点无效、交叉或超出画布。`);
    }
  }
  return n;
}
function wr(e) {
  if (!Array.isArray(e) || e.length !== 4) return null;
  const t = e.map((r) => typeof r == "number" && Number.isFinite(r) ? Math.round(r) : NaN);
  if (t.some((r) => !Number.isSafeInteger(r))) return null;
  const [n, s, i, o] = t;
  return n >= i || s >= o ? null : [n, s, i, o];
}
function so(e) {
  if (!Array.isArray(e)) return;
  const t = [];
  for (const n of e) {
    if (!n || typeof n != "object" || Array.isArray(n)) continue;
    const s = n, i = typeof s.position == "string" ? s.position.trim() : "", o = s.slots && typeof s.slots == "object" ? s.slots : null;
    if (!i || !o) continue;
    const r = {};
    for (const [f, m] of Object.entries(o)) {
      const b = wr(m);
      b && (r[f.trim().toUpperCase()] = b);
    }
    const l = {};
    if (s.shapes && typeof s.shapes == "object")
      for (const [f, m] of Object.entries(s.shapes)) {
        const b = f.trim().toUpperCase();
        r[b] && vi(m) && (l[b] = m.map((O) => O.map(Math.round)));
      }
    const a = {};
    if (s.slotNotes && typeof s.slotNotes == "object" && !Array.isArray(s.slotNotes))
      for (const [f, m] of Object.entries(s.slotNotes)) {
        const b = f.trim().toUpperCase();
        r[b] && typeof m == "string" && m.trim() && (a[b] = m.trim());
      }
    const d = {};
    if (s.slotContents && typeof s.slotContents == "object" && !Array.isArray(s.slotContents))
      for (const [f, m] of Object.entries(s.slotContents)) {
        const b = f.trim().toUpperCase();
        r[b] && Array.isArray(m) && (d[b] = JSON.parse(JSON.stringify(m)));
      }
    Object.keys(r).length && t.push({ position: i, slots: r, ...Number.isSafeInteger(s.layer) ? { layer: s.layer } : {}, ...Object.keys(l).length ? { shapes: l } : {}, ...Object.keys(a).length ? { slotNotes: a } : {}, ...Object.keys(d).length ? { slotContents: d } : {} });
  }
  return t.length ? t : void 0;
}
function uu(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, n = typeof t.id == "string" ? t.id.trim() : "";
  if (!n) return null;
  const s = so(t.portrait), i = so(t.landscape), o = typeof t.label == "string" ? t.label.trim() : void 0, r = typeof t.usage == "string" ? t.usage.trim() : void 0, l = typeof t.readingOrder == "string" ? t.readingOrder.trim() : void 0;
  if (!s && !i && !o && !r && !l) return null;
  const a = mi(t.canvas);
  return { id: n, label: o, usage: r, readingOrder: l, portrait: s, landscape: i, ...a ? { canvas: a } : {}, ...t.promptMode ? { promptMode: t.promptMode } : {}, ...typeof t.promptCaption == "string" ? { promptCaption: t.promptCaption } : {}, ...typeof t.description == "string" ? { description: t.description } : {} };
}
function xr(e) {
  return typeof e.description == "string" ? e.description : [...new Set([e.usage, e.promptCaption].filter((t) => typeof t == "string" && !!t.trim()).map((t) => t.trim()))].join(`

`);
}
function mi(e) {
  if (!e || typeof e != "object") return null;
  const { width: t, height: n } = e;
  return [t, n].every((s) => Number.isInteger(s) && s >= 64 && s <= 8192 && s % 2 === 0) ? { width: t, height: n } : null;
}
function vi(e) {
  return !Array.isArray(e) || e.length !== 4 || e.some((t) => !Array.isArray(t) || t.length !== 2 || t.some((n) => typeof n != "number" || !Number.isFinite(n))) ? !1 : e.every((t, n) => {
    const s = e[(n + 1) % 4], i = e[(n + 2) % 4];
    return (s[0] - t[0]) * (i[1] - s[1]) - (s[1] - t[1]) * (i[0] - s[0]) > 0.01;
  });
}
const Wt = 24, _e = (e, t, n) => Math.max(t, Math.min(n, e));
function tt(e, t, n = Wt) {
  const s = _e(Math.round(e.width), n, t.width), i = _e(Math.round(e.height), n, t.height);
  return { x: _e(Math.round(e.x), 0, t.width - s), y: _e(Math.round(e.y), 0, t.height - i), width: s, height: i };
}
function cu(e, t) {
  const [n, s, i, o] = e.slots.F ?? e.slots.C ?? Object.values(e.slots)[0];
  return tt({ x: s + t.width / 2, y: n + t.height / 2, width: o - s, height: i - n }, t);
}
function $n(e, t, n) {
  const s = { ...e, slots: {}, corners: {} };
  n?.layer !== void 0 && (s.layer = n.layer), n?.position && (s.position = n.position);
  for (const [i, [o, r, l, a]] of Object.entries((n ?? hu(e, t, "")).slots))
    i !== "F" && Xn(s, i, { x: r + t.width / 2, y: o + t.height / 2, width: a - r, height: l - o });
  for (const [i, o] of Object.entries(n?.shapes ?? {})) {
    if (i !== "F" && !s.slots[i]) continue;
    const r = i === "F" ? s : Bt(s, i);
    s.corners[i] = o.map(([l, a]) => [(l + t.width / 2 - r.x) / r.width, (a + t.height / 2 - r.y) / r.height]);
  }
  return n?.slotNotes && (s.slotNotes = { ...n.slotNotes }), n?.slotContents && (s.slotContents = JSON.parse(JSON.stringify(n.slotContents))), s;
}
function Hn(e, t) {
  const n = t === "F" ? e : Bt(e, t);
  return (e.corners[t] ?? [[0, 0], [1, 0], [1, 1], [0, 1]]).map(([s, i]) => [n.x + s * n.width, n.y + i * n.height]);
}
function fu(e, t, n, s) {
  const i = n.map(([a, d]) => [_e(Math.round(a), 0, s.width), _e(Math.round(d), 0, s.height)]);
  if (!vi(i)) return !1;
  const o = Math.min(...i.map((a) => a[0])), r = Math.min(...i.map((a) => a[1])), l = { x: o, y: r, width: Math.max(...i.map((a) => a[0])) - o, height: Math.max(...i.map((a) => a[1])) - r };
  return l.width < (t === "F" ? Wt : 1) || l.height < (t === "F" ? Wt : 1) ? !1 : (t === "F" ? Object.assign(e, l) : Xn(e, t, l), e.corners[t] = i.map(([a, d]) => [(a - o) / l.width, (d - r) / l.height]), !0);
}
function Bt(e, t) {
  const n = e.slots[t];
  return { x: Math.round(e.x + n.x * e.width), y: Math.round(e.y + n.y * e.height), width: Math.max(1, Math.round(n.width * e.width)), height: Math.max(1, Math.round(n.height * e.height)) };
}
function Xn(e, t, n) {
  e.slots[t] = { x: (n.x - e.x) / e.width, y: (n.y - e.y) / e.height, width: n.width / e.width, height: n.height / e.height };
}
function du(e, t, n) {
  const s = (l) => {
    const a = _e(Math.round(l.x), 0, t.width - 1), d = _e(Math.round(l.y), 0, t.height - 1);
    return [d - t.height / 2, a - t.width / 2, _e(Math.round(l.y + l.height), d + 1, t.height) - t.height / 2, _e(Math.round(l.x + l.width), a + 1, t.width) - t.width / 2];
  }, i = Object.fromEntries(Object.keys(e.corners).filter((l) => l === "F" || e.slots[l]).map((l) => [l, Hn(e, l).map(([a, d]) => [_e(Math.round(a), 0, t.width) - t.width / 2, _e(Math.round(d), 0, t.height) - t.height / 2])])), o = Object.fromEntries(Object.entries(e.slotNotes ?? {}).filter(([l, a]) => (l === "F" || e.slots[l]) && a.trim()).map(([l, a]) => [l, a.trim()])), r = Object.fromEntries(Object.entries(e.slotContents ?? {}).filter(([l, a]) => (l === "F" || e.slots[l]) && a.length).map(([l, a]) => [l, JSON.parse(JSON.stringify(a))]));
  return { position: n, ...e.layer !== void 0 ? { layer: e.layer } : {}, slots: { F: s(e), ...Object.fromEntries(Object.keys(e.slots).map((l) => [l, s(Bt(e, l))])) }, ...Object.keys(i).length ? { shapes: i } : {}, ...Object.keys(o).length ? { slotNotes: o } : {}, ...Object.keys(r).length ? { slotContents: r } : {} };
}
function hu(e, t, n) {
  const s = tt(e, t), i = (r, l, a, d) => [
    Math.round(s.y + s.height * l - t.height / 2),
    Math.round(s.x + s.width * r - t.width / 2),
    Math.round(s.y + s.height * d - t.height / 2),
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
function pu(e, t, n, s, i = !1, o = Wt) {
  const r = (m, b, O, F) => {
    if (i) {
      const N = m + b, $ = [...F, Math.round(N / 8) * 8].reduce((R, J) => Math.abs(J - N) < Math.abs(R - N) ? J : R, N + s + 1);
      return [m, Math.abs($ - N) <= s ? $ - m : b];
    }
    let P = 0, B = s + 1;
    for (const N of [m, m + b / 2, m + b])
      for (const k of [...F, Math.round(N / 8) * 8])
        Math.abs(k - N) < B && (B = Math.abs(k - N), P = k - N);
    return [_e(m + (B <= s ? P : 0), 0, O - b), b];
  }, [l, a] = r(e.x, e.width, t.width, [0, t.width / 2, t.width, ...n.flatMap((m) => [m.x, m.x + m.width / 2, m.x + m.width])]), [d, f] = r(e.y, e.height, t.height, [0, t.height / 2, t.height, ...n.flatMap((m) => [m.y, m.y + m.height / 2, m.y + m.height])]);
  return tt({ x: l, y: d, width: a, height: f }, t, o);
}
const gu = { class: "inline" }, mu = { class: "canvas-controls" }, vu = { class: "designer-body" }, yu = { class: "tools" }, bu = ["value"], wu = ["disabled"], xu = ["disabled"], _u = ["disabled"], Cu = { class: "inline" }, Su = ["disabled"], Mu = ["disabled"], Ou = { class: "check" }, Tu = { class: "check" }, Eu = ["onClick"], Au = { class: "inline" }, Ru = ["disabled"], Iu = ["disabled"], Pu = { class: "inline" }, ku = ["disabled"], Fu = ["disabled"], ju = { class: "hint" }, Nu = { class: "canvas-area" }, $u = ["viewBox"], Lu = ["width", "height"], Du = ["data-panel", "onPointerdown", "onDblclick"], Vu = ["points", "fill", "stroke"], Ku = ["x", "y", "width", "height"], Hu = ["title"], Bu = ["data-slot", "onPointerdown", "onDblclick"], Uu = ["points", "fill", "stroke", "stroke-width"], Wu = ["x", "y", "font-size"], zu = ["x", "y", "width", "height"], Ju = ["title"], qu = ["x", "y", "font-size"], Yu = ["data-ctrl-deform", "data-handle", "rx", "x", "y", "width", "height", "fill", "aria-label", "onPointerdown"], Gu = { class: "hint" }, Xu = { class: "properties" }, Zu = ["aria-selected"], Qu = ["aria-selected"], ec = ["value"], tc = ["value"], nc = ["value"], sc = {
  key: 0,
  class: "slot-actions"
}, ic = ["disabled"], oc = { class: "inline" }, rc = ["value", "disabled"], lc = ["value"], ac = ["disabled"], uc = ["value", "placeholder"], cc = {
  key: 1,
  class: "manual-content"
}, fc = { class: "inline" }, dc = ["value", "onChange"], hc = ["value", "onChange"], pc = ["value", "onInput"], gc = ["value", "placeholder", "onInput"], mc = { class: "inline" }, vc = ["disabled", "onClick"], yc = ["disabled", "onClick"], bc = ["onClick"], wc = { class: "slot-list" }, xc = ["onClick"], _c = ["value", "aria-label", "onChange"], Cc = {
  key: 1,
  class: "hint"
}, Sc = {
  key: 0,
  role: "alert",
  class: "error"
}, Mc = { key: 1 }, Oc = ["onKeydown"], Tc = /* @__PURE__ */ Uo({
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
    const n = e, s = t;
    function i(p) {
      let c = p, h = 2;
      for (; n.existingIds.includes(c); ) c = `${p}_${h++}`;
      return c;
    }
    const o = /* @__PURE__ */ me({ id: i("my_layout"), label: "自定义版式", description: "", promptMode: n.initialMode ?? "llm", width: 1088, height: 1920, panels: [] }), r = /* @__PURE__ */ me(-1), l = /* @__PURE__ */ me(""), a = /* @__PURE__ */ me(n.initialKey ?? ""), d = /* @__PURE__ */ me(!0), f = /* @__PURE__ */ me(!0), m = /* @__PURE__ */ me(""), b = /* @__PURE__ */ me(!1), O = /* @__PURE__ */ me(), F = /* @__PURE__ */ me(), P = /* @__PURE__ */ me(), B = /* @__PURE__ */ me(1), N = /* @__PURE__ */ me(1088), k = /* @__PURE__ */ me(1920), $ = /* @__PURE__ */ me([]), R = /* @__PURE__ */ me([]), J = /* @__PURE__ */ me(""), j = et(() => o.value.panels[r.value]), U = et(() => j.value ? l.value && j.value.slots[l.value] ? Bt(j.value, l.value) : j.value : null), Z = { C: "内区", S: "主体", T: "顶部文字", B: "底部文字", TL: "左上文字", TR: "右上文字", BL: "左下文字", BR: "右下文字", L: "左人物", R: "右人物", O: "道具/音效", ML: "左侧文字", MR: "右侧文字", E: "有限越线", X: "出框区" }, oe = /* @__PURE__ */ me("S"), w = et(() => j.value ? ["C", "S", "T", "B", "TL", "TR", "BL", "BR", "ML", "MR", "L", "R", "O"] : []), H = et(() => w.value.includes(oe.value) ? oe.value : w.value[0] ?? ""), Y = et(() => j.value?.slotContents?.[l.value || "F"] ?? []), he = /* @__PURE__ */ me(null), xe = /* @__PURE__ */ me(""), en = /* @__PURE__ */ me();
    let ye = null;
    function Q() {
      ye = null, l.value = "";
    }
    function le() {
      if (ye) {
        const p = ye;
        S(p.before), $.value = p.undo, R.value = p.redo;
      }
      Q();
    }
    function Ie(p) {
      Q(), r.value = p;
    }
    function Xe(p, c) {
      r.value === p && l.value === c || (Ie(p), c && j.value?.slots[c] && (ye = { before: ht(), undo: [...$.value], redo: [...R.value] }, l.value = c, f.value = !0));
    }
    function We(p) {
      j.value && (l.value ? Xn(j.value, l.value, p) : o.value.panels[r.value] = { ...j.value, ...p });
    }
    function Ne() {
      const p = l.value;
      j.value && p && v(() => {
        delete j.value.slots[p], delete j.value.corners[p], j.value.slotNotes && delete j.value.slotNotes[p], j.value.slotContents && delete j.value.slotContents[p];
      });
    }
    function Mn() {
      const p = H.value;
      if (!j.value || !p) return;
      let c = p, h = 2;
      for (; j.value.slots[c]; ) c = `${p}_${h++}`;
      v(() => {
        const M = j.value, L = Bt($n(M, be.value), p), ge = 24 * Object.keys(M.slots).filter((ne) => Et(ne) === p).length;
        Xn(M, c, tt({ ...L, x: L.x + ge, y: L.y + ge }, be.value, 1));
      }), Xe(r.value, c);
    }
    function On() {
      j.value && v(() => {
        const p = j.value;
        p.slots = { ...$n(p, be.value).slots, ...p.slots.X ? { X: p.slots.X } : {} }, p.corners = Object.fromEntries(Object.entries(p.corners).filter(([c]) => c === "F" || c === "X")), l.value = "";
      });
    }
    function ps(p, c) {
      return f.value ? Object.keys(p.slots).sort((h, M) => +(c === r.value && h === l.value) - +(c === r.value && M === l.value)).map((h) => ({ key: h, rect: Bt(p, h) })) : [];
    }
    const be = et(() => ({ width: o.value.width, height: o.value.height })), dt = et(() => o.value.panels.map((p, c) => ({ rect: p, index: c })).sort((p, c) => (p.rect.layer ?? p.index) - (c.rect.layer ?? c.index) || p.index - c.index)), St = et(() => dt.value.findIndex((p) => p.index === r.value));
    function Mt(p) {
      const c = St.value, h = c + p;
      if (c < 0 || h < 0 || h >= dt.value.length) return;
      const M = [...dt.value];
      [M[c], M[h]] = [M[h], M[c]], v(() => {
        M.forEach(({ rect: L }, ge) => {
          L.layer = ge;
        });
      });
    }
    const ht = () => JSON.stringify(o.value), u = et(() => {
      const p = new Set(o.value.panels.map((c) => c.position).filter(Boolean));
      return o.value.panels.map((c, h) => {
        if (c.position) return c.position;
        let M = h + 1;
        for (; p.has(`panel-${M}`); ) M++;
        const L = `panel-${M}`;
        return p.add(L), L;
      });
    });
    function g(p) {
      p !== ht() && ($.value.push(p), $.value.length > 100 && $.value.shift(), R.value = [], m.value = "");
    }
    function v(p, c = !1) {
      c || Q();
      const h = ht();
      p(), g(h);
    }
    function S(p) {
      o.value = JSON.parse(p), N.value = o.value.width, k.value = o.value.height, r.value = Math.min(r.value, o.value.panels.length - 1), j.value?.slots[l.value] || (l.value = ""), m.value = "", b.value = !1;
    }
    function x() {
      Q();
      const p = $.value.pop();
      p && (R.value.push(ht()), S(p));
    }
    function C() {
      Q();
      const p = R.value.pop();
      p && ($.value.push(ht()), S(p));
    }
    function E() {
      const p = n.sources.find((c) => c.key === a.value);
      p && (v(() => {
        const c = p.id === n.editingId;
        o.value = { id: c ? p.id : i(`${p.id}_copy`), label: c ? p.label : `${p.label}（副本）`, description: xr(p), promptMode: p.promptMode ?? "llm", ...p.canvas, panels: p.panels.map((h, M) => ({ ...$n(cu(h, p.canvas), p.canvas, h), layer: h.layer ?? M })) };
      }), N.value = o.value.width, k.value = o.value.height, Ie(o.value.panels.length ? 0 : -1));
    }
    function A() {
      T();
      const p = mi({ width: N.value, height: k.value });
      if (!p) {
        m.value = "画布宽高须为 64～8192 的数值，输入完成后自动对齐到最近的 16 倍数。";
        return;
      }
      v(() => {
        const c = be.value;
        o.value.panels = o.value.panels.map((h) => ({ ...h, ...tt({ x: h.x * p.width / c.width, y: h.y * p.height / c.height, width: h.width * p.width / c.width, height: h.height * p.height / c.height }, p) })), Object.assign(o.value, p);
      });
    }
    function T() {
      const p = (c) => Number.isFinite(c) ? Math.max(64, Math.min(8192, Math.round(c / 16) * 16)) : c;
      N.value = p(N.value), k.value = p(k.value);
    }
    function _() {
      v(() => {
        const p = o.value.panels.length % 5 * 0.04, c = $n(tt({ x: o.value.width * (0.08 + p), y: o.value.height * (0.08 + p), width: o.value.width * 0.55, height: o.value.height * 0.3 }, be.value), be.value);
        c.slots = {}, o.value.panels.push({ ...c, layer: Math.max(-1, ...o.value.panels.map((h, M) => h.layer ?? M)) + 1 }), Ie(o.value.panels.length - 1);
      });
    }
    function D() {
      j.value && v(() => {
        o.value.panels.splice(r.value, 1), Ie(Math.min(r.value, o.value.panels.length - 1));
      });
    }
    function I() {
      j.value && v(() => {
        o.value.panels.push({ ...JSON.parse(JSON.stringify(j.value)), ...tt({ ...j.value, x: j.value.x + 24, y: j.value.y + 24 }, be.value), position: void 0, layer: Math.max(-1, ...o.value.panels.map((p, c) => p.layer ?? c)) + 1 }), Ie(o.value.panels.length - 1);
      });
    }
    function V(p) {
      const c = r.value + p;
      !j.value || c < 0 || c >= o.value.panels.length || v(() => {
        const [h] = o.value.panels.splice(r.value, 1);
        o.value.panels.splice(c, 0, h), r.value = c;
      });
    }
    function W(p, c) {
      const h = Number(c.target.value);
      U.value && Number.isFinite(h) && v(() => {
        We(tt({ ...U.value, [p]: h }, be.value, l.value ? 1 : Wt));
      }, !0);
    }
    function q(p, c) {
      v(() => {
        o.value[p] = c.target.value;
      });
    }
    function X(p) {
      const c = l.value;
      v(() => {
        o.value.promptMode = p;
      }), c && Xe(r.value, c);
    }
    function te() {
      if (!j.value) return;
      const p = l.value || "F", c = ["T", "B", "TL", "TR", "BL", "BR", "ML", "MR"].includes(Et(p)) ? "text" : ["S", "L", "R"].includes(Et(p)) ? "character" : "object";
      v(() => {
        ((j.value.slotContents ??= {})[p] ??= []).push({ label: c, caption: "", ...c === "text" ? { text: "", textType: "dialogue" } : {} });
      }, !0);
    }
    function fe(p, c, h) {
      const M = h.target.value;
      v(() => {
        Object.assign(Y.value[p], { [c]: M });
      }, !0);
    }
    function we(p) {
      v(() => {
        Y.value.splice(p, 1);
      }, !0);
    }
    function $e(p, c) {
      const h = p + c;
      h < 0 || h >= Y.value.length || v(() => {
        const [M] = Y.value.splice(p, 1);
        Y.value.splice(h, 0, M);
      }, !0);
    }
    function Me(p, c) {
      return p.slotNotes?.[c] ?? (p.slotContents?.[c] ?? []).filter((h) => h.label !== "text" && h.caption.trim()).map((h) => h.caption).join(`
`);
    }
    function Ot(p, c, h) {
      const M = o.value.panels[p];
      M && v(() => {
        const L = (M.slotContents?.[c] ?? []).filter((ge) => ge.label !== "text");
        L.length === 1 && (!M.slotNotes?.[c] || M.slotNotes[c] === L[0].caption) && (L[0].caption = h), h ? (M.slotNotes ??= {})[c] = h : M.slotNotes && delete M.slotNotes[c];
      }, !0);
    }
    function Tn(p) {
      Ot(r.value, l.value || "F", p.target.value);
    }
    function Oe(p, c) {
      Xe(p, c === "F" ? "" : c), he.value = { index: p, key: c }, xe.value = Me(o.value.panels[p], c), fn(() => en.value?.focus());
    }
    function Le() {
      he.value && (Ot(he.value.index, he.value.key, xe.value), he.value = null);
    }
    function Nt(p, c) {
      const h = Me(p, c).replace(/\s+/g, " ").trim();
      return h.length > 80 ? h.slice(0, 80) + "…" : h;
    }
    let De = null;
    function _r(p) {
      if (!p.ctrlKey || !p.deltaY || (p.preventDefault(), p.stopPropagation(), De || !F.value || !P.value)) return;
      const c = P.value, h = F.value.getBoundingClientRect(), M = (p.clientX - h.left) / h.width, L = (p.clientY - h.top) / h.height, ge = p.deltaY * (p.deltaMode === 1 ? 16 : p.deltaMode === 2 ? c.clientHeight : 1);
      B.value = _e(B.value * Math.exp(-ge * 2e-3), 0.25, 4), fn(() => {
        const ne = F.value?.getBoundingClientRect();
        ne && (c.scrollLeft += ne.left + M * ne.width - p.clientX, c.scrollTop += ne.top + L * ne.height - p.clientY);
      });
    }
    function bi(p) {
      const c = F.value.getBoundingClientRect();
      return { x: (p.clientX - c.left) / c.width * o.value.width, y: (p.clientY - c.top) / c.height * o.value.height };
    }
    function gs(p, c, h = "", M = "") {
      p.button !== 0 || De || (Xe(c, M), De = { pointerId: p.pointerId, ...bi(p), clientX: p.clientX, clientY: p.clientY, dragging: !1, rect: { ...U.value }, before: ht(), handle: h, quad: Hn(j.value, M || "F"), deform: p.ctrlKey && h.length === 2 });
    }
    function Cr(p) {
      if (!De || p.pointerId !== De.pointerId) return;
      const c = bi(p), h = De, M = c.x - h.x, L = c.y - h.y;
      if (!h.dragging) {
        if (Math.hypot(p.clientX - h.clientX, p.clientY - h.clientY) < 3) return;
        h.dragging = !0, F.value.setPointerCapture(p.pointerId);
      }
      const ge = l.value ? 1 : Wt;
      if (h.deform) {
        const zt = ["nw", "ne", "se", "sw"].indexOf(h.handle), vs = h.quad.map((ys, Er) => Er === zt ? [ys[0] + M, ys[1] + L] : ys);
        fu(j.value, l.value || "F", vs, be.value);
        return;
      }
      let ne = { ...h.rect };
      h.handle ? (h.handle.includes("w") && (ne.x = _e(h.rect.x + M, 0, h.rect.x + h.rect.width - ge), ne.width = h.rect.x + h.rect.width - ne.x), h.handle.includes("n") && (ne.y = _e(h.rect.y + L, 0, h.rect.y + h.rect.height - ge), ne.height = h.rect.y + h.rect.height - ne.y), h.handle.includes("e") && (ne.width = _e(h.rect.width + M, ge, o.value.width - ne.x)), h.handle.includes("s") && (ne.height = _e(h.rect.height + L, ge, o.value.height - ne.y))) : (ne.x += M, ne.y += L), ne = tt(ne, be.value, ge);
      const Tr = l.value ? [j.value, ...Object.keys(j.value.slots).filter((zt) => zt !== l.value).map((zt) => Bt(j.value, zt))] : o.value.panels.filter((zt, vs) => vs !== r.value), An = { ...ne };
      d.value && !p.altKey && (ne = pu(ne, be.value, Tr, 6 * o.value.width / F.value.getBoundingClientRect().width, !!h.handle, ge)), (h.handle === "e" || h.handle === "w") && (ne.y = An.y, ne.height = An.height), (h.handle === "n" || h.handle === "s") && (ne.x = An.x, ne.width = An.width), We(ne);
    }
    function ms(p, c = !1) {
      if (!De || p.pointerId !== De.pointerId) return;
      const h = De.before;
      De = null, F.value?.hasPointerCapture(p.pointerId) && F.value.releasePointerCapture(p.pointerId), c ? S(h) : g(h);
    }
    function Sr() {
      const p = Hn(j.value, l.value || "F");
      return ["nw", "ne", "se", "sw"].flatMap((c, h) => [{ name: c, x: p[h][0], y: p[h][1] }, { name: ["n", "e", "s", "w"][h], x: (p[h][0] + p[(h + 1) % 4][0]) / 2, y: (p[h][1] + p[(h + 1) % 4][1]) / 2 }]);
    }
    function wi(p, c) {
      return Hn(p, c).map((h) => h.join(",")).join(" ");
    }
    function En() {
      ht() !== J.value || N.value !== o.value.width || k.value !== o.value.height ? b.value = !0 : s("close");
    }
    function Mr(p) {
      if (p.key === "Tab" && O.value) {
        const c = [...O.value.querySelectorAll('button:not(:disabled),input,textarea,select,[tabindex="0"]')], M = O.value.getRootNode().activeElement;
        p.shiftKey && (M === c[0] || M === O.value) ? (p.preventDefault(), c.at(-1)?.focus()) : !p.shiftKey && M === c.at(-1) && (p.preventDefault(), c[0]?.focus());
      }
      if (p.key === "Escape") {
        p.stopPropagation(), En();
        return;
      }
      if (!p.target.matches("input,textarea,select,button")) {
        if ((p.ctrlKey || p.metaKey) && ["z", "y"].includes(p.key.toLowerCase()))
          p.preventDefault(), p.key.toLowerCase() === "y" || p.shiftKey ? C() : x();
        else if (p.key === "Delete")
          p.preventDefault(), l.value ? Ne() : D();
        else if (U.value && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(p.key)) {
          p.preventDefault();
          const c = p.shiftKey ? 10 : 1;
          v(() => {
            We(tt({ ...U.value, x: U.value.x + (p.key === "ArrowRight" ? c : p.key === "ArrowLeft" ? -c : 0), y: U.value.y + (p.key === "ArrowDown" ? c : p.key === "ArrowUp" ? -c : 0) }, be.value, l.value ? 1 : Wt));
          }, !0);
        }
      }
    }
    function Or() {
      if (N.value !== o.value.width || k.value !== o.value.height) {
        m.value = "画布尺寸已修改，请先点击“应用尺寸”。";
        return;
      }
      if (!o.value.id.trim() || n.existingIds.includes(o.value.id.trim()) && o.value.id.trim() !== n.editingId) {
        m.value = "版式库已有此 ID，请填写未使用的 ID，或打开该版式编辑。";
        return;
      }
      if (!o.value.panels.length) {
        m.value = "请至少添加一格。";
        return;
      }
      try {
        const p = qs(o.value.width, o.value.height), c = Ys(p);
        if (o.value.id.trim() === n.editingId && n.sources.some((M) => {
          const L = qs(M.canvas.width, M.canvas.height), ge = Ys(L);
          return M.id === n.editingId && L !== p && (o.value.width !== c.width || o.value.height !== c.height || M.canvas.width !== ge.width || M.canvas.height !== ge.height);
        })) {
          m.value = "此版式含另一画布方向。使用非标准尺寸时请填写新的版式 ID，另存后可保留原版式的两个方向。";
          return;
        }
        const h = au(JSON.stringify({ id: o.value.id.trim(), label: o.value.label.trim() || o.value.id.trim(), description: o.value.description.trim(), usage: o.value.description.trim(), promptMode: o.value.promptMode, promptCaption: o.value.description.trim(), canvas: be.value, readingOrder: u.value.join(" → "), [p]: o.value.panels.map((M, L) => du(M, be.value, u.value[L])) }));
        s("save", h);
      } catch (p) {
        m.value = p instanceof Error ? p.message : String(p);
      }
    }
    return Jo(() => {
      n.initialKey && E(), $.value = [], R.value = [], J.value = ht(), fn(() => O.value?.focus());
    }), (p, c) => (G(), yn(ru, {
      open: !0,
      "top-layer": "",
      onClose: En
    }, {
      default: Do(() => [
        y(
          "section",
          {
            ref_key: "dialog",
            ref: O,
            class: "manga-designer",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "快捷自定义版式",
            tabindex: "-1",
            onKeydown: Mr
          },
          [
            y("header", null, [
              y(
                "strong",
                null,
                se(e.editingId ? "可视化编辑版式" : "快捷自定义版式"),
                1
                /* TEXT */
              ),
              y("div", gu, [
                y("button", {
                  type: "button",
                  onClick: En
                }, "取消"),
                y(
                  "button",
                  {
                    type: "button",
                    class: "primary",
                    onClick: Or
                  },
                  se(e.editingId && o.value.id.trim() === e.editingId ? "保存版式修改" : "保存新版式"),
                  1
                  /* TEXT */
                ),
                y("button", {
                  type: "button",
                  "aria-label": "关闭编辑器",
                  onClick: En
                }, "✕")
              ])
            ]),
            y("div", mu, [
              y("label", null, [
                c[29] || (c[29] = Te(
                  "画布宽 ",
                  -1
                  /* CACHED */
                )),
                qt(y(
                  "input",
                  {
                    "onUpdate:modelValue": c[0] || (c[0] = (h) => N.value = h),
                    "aria-label": "画布宽",
                    type: "number",
                    min: "64",
                    max: "8192",
                    step: "16",
                    onChange: T
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [
                    ks,
                    N.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              y("label", null, [
                c[30] || (c[30] = Te(
                  "画布高 ",
                  -1
                  /* CACHED */
                )),
                qt(y(
                  "input",
                  {
                    "onUpdate:modelValue": c[1] || (c[1] = (h) => k.value = h),
                    "aria-label": "画布高",
                    type: "number",
                    min: "64",
                    max: "8192",
                    step: "16",
                    onChange: T
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [
                    ks,
                    k.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              y("button", {
                type: "button",
                onClick: A
              }, "应用尺寸")
            ]),
            c[50] || (c[50] = y(
              "p",
              { class: "hint" },
              "改变画布尺寸会等比例换算各轴坐标。工作流与预设尺寸须与此画布一致；请连接节点的宽高输出到潜空间尺寸输入。",
              -1
              /* CACHED */
            )),
            y("div", vu, [
              y("aside", yu, [
                y("label", null, [
                  c[32] || (c[32] = Te(
                    "从现有版式复制",
                    -1
                    /* CACHED */
                  )),
                  qt(y(
                    "select",
                    {
                      "onUpdate:modelValue": c[2] || (c[2] = (h) => a.value = h),
                      "aria-label": "源版式"
                    },
                    [
                      c[31] || (c[31] = y(
                        "option",
                        { value: "" },
                        "请选择",
                        -1
                        /* CACHED */
                      )),
                      (G(!0), re(
                        de,
                        null,
                        gt(e.sources, (h) => (G(), re("option", {
                          key: h.key,
                          value: h.key
                        }, se(h.label) + " · " + se(h.canvas.width) + "×" + se(h.canvas.height), 9, bu))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    512
                    /* NEED_PATCH */
                  ), [
                    [Ya, a.value]
                  ])
                ]),
                y("button", {
                  type: "button",
                  disabled: !a.value,
                  onClick: E
                }, "载入副本", 8, wu),
                y("button", {
                  type: "button",
                  onClick: _
                }, "＋ 新增分格"),
                y("button", {
                  type: "button",
                  disabled: !j.value,
                  onClick: I
                }, "复制选中分格", 8, xu),
                y("button", {
                  type: "button",
                  disabled: !j.value,
                  onClick: D
                }, "删除选中分格", 8, _u),
                y("div", Cu, [
                  y("button", {
                    type: "button",
                    disabled: !$.value.length,
                    onClick: x
                  }, "撤销", 8, Su),
                  y("button", {
                    type: "button",
                    disabled: !R.value.length,
                    onClick: C
                  }, "重做", 8, Mu)
                ]),
                y("label", Ou, [
                  qt(y(
                    "input",
                    {
                      "onUpdate:modelValue": c[3] || (c[3] = (h) => d.value = h),
                      type: "checkbox"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [Qi, d.value]
                  ]),
                  c[33] || (c[33] = Te(
                    "对齐吸附",
                    -1
                    /* CACHED */
                  ))
                ]),
                y("label", Tu, [
                  qt(y(
                    "input",
                    {
                      "onUpdate:modelValue": c[4] || (c[4] = (h) => f.value = h),
                      type: "checkbox"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [Qi, f.value]
                  ]),
                  c[34] || (c[34] = Te(
                    "显示可编辑槽位",
                    -1
                    /* CACHED */
                  ))
                ]),
                c[35] || (c[35] = y(
                  "p",
                  { class: "hint" },
                  "拖动外框移动整格；拖动黄色/绿色小框单独编辑槽位。直接拖动四角或边中点缩放；按住 Ctrl 再拖四角才形变。Alt 暂停吸附，方向键微调，Delete 删除选中项，Ctrl+Z 撤销。",
                  -1
                  /* CACHED */
                )),
                c[36] || (c[36] = y(
                  "strong",
                  null,
                  "读序（先读 1）",
                  -1
                  /* CACHED */
                )),
                (G(!0), re(
                  de,
                  null,
                  gt(o.value.panels, (h, M) => (G(), re("button", {
                    key: M,
                    type: "button",
                    class: Rt({ active: r.value === M }),
                    onClick: (L) => Ie(M)
                  }, "第 " + se(M + 1) + " 格", 11, Eu))),
                  128
                  /* KEYED_FRAGMENT */
                )),
                y("div", Au, [
                  y("button", {
                    type: "button",
                    disabled: r.value <= 0,
                    onClick: c[5] || (c[5] = (h) => V(-1))
                  }, "提前", 8, Ru),
                  y("button", {
                    type: "button",
                    disabled: r.value < 0 || r.value >= o.value.panels.length - 1,
                    onClick: c[6] || (c[6] = (h) => V(1))
                  }, "延后", 8, Iu)
                ]),
                y("div", Pu, [
                  y("button", {
                    type: "button",
                    disabled: St.value < 0 || St.value >= o.value.panels.length - 1,
                    onClick: c[7] || (c[7] = (h) => Mt(1))
                  }, "上移一层", 8, ku),
                  y("button", {
                    type: "button",
                    disabled: St.value <= 0,
                    onClick: c[8] || (c[8] = (h) => Mt(-1))
                  }, "下移一层", 8, Fu)
                ]),
                y(
                  "p",
                  ju,
                  se(j.value ? `当前第 ${St.value + 1} / ${o.value.panels.length} 层（数字越大越靠前）。` : "") + "层级控制重叠遮挡，不改变读序；遮挡关系自动写入生图提示词。",
                  1
                  /* TEXT */
                )
              ]),
              y("div", Nu, [
                y(
                  "div",
                  {
                    ref_key: "canvasViewport",
                    ref: P,
                    class: "canvas-viewport",
                    "aria-label": "画布缩放区域",
                    onWheelCapture: _r
                  },
                  [
                    (G(), re("svg", {
                      ref_key: "svg",
                      ref: F,
                      class: "layout-canvas",
                      viewBox: `0 0 ${o.value.width} ${o.value.height}`,
                      style: Ht({ aspectRatio: `${o.value.width}/${o.value.height}`, width: `min(${100 * B.value}%, ${62 * o.value.width / o.value.height * B.value}vh)` }),
                      role: "img",
                      "aria-label": "版式画布",
                      tabindex: "0",
                      onPointermove: Cr,
                      onPointerup: c[10] || (c[10] = (h) => ms(h)),
                      onPointercancel: c[11] || (c[11] = (h) => ms(h, !0)),
                      onLostpointercapture: c[12] || (c[12] = (h) => ms(h, !0))
                    }, [
                      y("rect", {
                        width: o.value.width,
                        height: o.value.height,
                        fill: "white",
                        onPointerdown: c[9] || (c[9] = (h) => Ie(-1))
                      }, null, 40, Lu),
                      (G(!0), re(
                        de,
                        null,
                        gt(dt.value, ({ rect: h, index: M }) => (G(), re("g", {
                          key: M,
                          class: Rt(["panel", { selected: M === r.value }]),
                          "data-panel": M,
                          onPointerdown: Ke((L) => gs(L, M), ["stop"]),
                          onDblclick: Ke((L) => Oe(M, "F"), ["stop", "prevent"])
                        }, [
                          y("polygon", {
                            points: wi(h, "F"),
                            fill: M === r.value ? "#dcecff" : "#f1f2f4",
                            stroke: M === r.value ? "#2675cf" : "#333",
                            "stroke-width": "2",
                            "vector-effect": "non-scaling-stroke"
                          }, null, 8, Vu),
                          Nt(h, "F") ? (G(), re("foreignObject", {
                            key: 0,
                            x: h.x + 6,
                            y: h.y + o.value.width * 0.04,
                            width: Math.max(1, h.width - 12),
                            height: Math.max(1, Math.min(h.height - o.value.width * 0.04, o.value.width * 0.055)),
                            class: "frame-description"
                          }, [
                            y("div", {
                              style: Ht({ fontSize: `${o.value.width * 0.018}px` }),
                              title: Me(h, "F")
                            }, se(Nt(h, "F")), 13, Hu)
                          ], 8, Ku)) : Qe("v-if", !0),
                          (G(!0), re(
                            de,
                            null,
                            gt(ps(h, M), (L) => (G(), re("g", {
                              key: L.key,
                              class: "slot",
                              "data-slot": L.key,
                              onPointerdown: Ke((ge) => gs(ge, M, "", L.key), ["stop"]),
                              onDblclick: Ke((ge) => Oe(M, L.key), ["stop", "prevent"])
                            }, [
                              y("polygon", {
                                points: wi(h, L.key),
                                fill: sn(Et)(L.key) === "T" ? "#e5ba6638" : "#50a18a18",
                                stroke: M === r.value && L.key === l.value ? "#df7827" : sn(Et)(L.key) === "T" ? "#b48733" : "#50a18a",
                                "stroke-width": M === r.value && L.key === l.value ? 2 : 1,
                                "stroke-dasharray": "5 4",
                                "vector-effect": "non-scaling-stroke"
                              }, null, 8, Uu),
                              y("text", {
                                x: L.rect.x + 5,
                                y: L.rect.y + o.value.width * 0.025,
                                "font-size": o.value.width * 0.021,
                                fill: "#575c62"
                              }, se(L.key), 9, Wu),
                              Nt(h, L.key) ? (G(), re("foreignObject", {
                                key: 0,
                                x: L.rect.x + 6,
                                y: L.rect.y + o.value.width * 0.032,
                                width: Math.max(1, L.rect.width - 12),
                                height: Math.max(1, Math.min(L.rect.height - o.value.width * 0.032, o.value.width * 0.055)),
                                class: "frame-description"
                              }, [
                                y("div", {
                                  style: Ht({ fontSize: `${o.value.width * 0.018}px` }),
                                  title: Me(h, L.key)
                                }, se(Nt(h, L.key)), 13, Ju)
                              ], 8, zu)) : Qe("v-if", !0)
                            ], 40, Bu))),
                            128
                            /* KEYED_FRAGMENT */
                          )),
                          y("text", {
                            x: h.x + 8,
                            y: h.y + o.value.width * 0.032,
                            "font-size": o.value.width * 0.026,
                            fill: "#164b83"
                          }, se(M + 1), 9, qu)
                        ], 42, Du))),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      j.value && U.value ? (G(!0), re(
                        de,
                        { key: 0 },
                        gt(Sr(), (h) => (G(), re("rect", {
                          key: h.name,
                          class: "resize-handle",
                          "data-ctrl-deform": h.name.length === 2,
                          "data-handle": h.name,
                          rx: h.name.length === 2 ? o.value.width * 9e-3 : 0,
                          x: h.x - o.value.width * 9e-3,
                          y: h.y - o.value.width * 9e-3,
                          width: o.value.width * 0.018,
                          height: o.value.width * 0.018,
                          fill: l.value ? "#df7827" : "#2675cf",
                          stroke: "white",
                          "vector-effect": "non-scaling-stroke",
                          style: Ht({ cursor: `${h.name}-resize` }),
                          "aria-label": `${h.name} 控制点`,
                          onPointerdown: Ke((M) => gs(M, r.value, h.name, l.value), ["stop", "prevent"])
                        }, null, 44, Yu))),
                        128
                        /* KEYED_FRAGMENT */
                      )) : Qe("v-if", !0)
                    ], 44, $u))
                  ],
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ),
                y("p", Gu, [
                  Te(
                    se(o.value.width) + "×" + se(o.value.height) + " · " + se(o.value.panels.length) + " 格 · 缩放 " + se(Math.round(B.value * 100)) + "% · Ctrl＋滚轮缩放，双击框编辑描述",
                    1
                    /* TEXT */
                  ),
                  c[37] || (c[37] = y(
                    "br",
                    null,
                    null,
                    -1
                    /* CACHED */
                  )),
                  c[38] || (c[38] = Te(
                    "槽位可单独移动、缩放和删除；移动外框时槽位跟随，保存后保留编辑结果。",
                    -1
                    /* CACHED */
                  ))
                ])
              ]),
              y("aside", Xu, [
                y(
                  "div",
                  {
                    class: Rt(["mode-switch", { manual: o.value.promptMode === "manual" }]),
                    role: "tablist",
                    "aria-label": "内容编辑模式",
                    onKeydown: [
                      c[15] || (c[15] = Nn(Ke((h) => X("llm"), ["prevent"]), ["left"])),
                      c[16] || (c[16] = Nn(Ke((h) => X("manual"), ["prevent"]), ["right"]))
                    ]
                  },
                  [
                    c[39] || (c[39] = y(
                      "span",
                      {
                        class: "mode-thumb",
                        "aria-hidden": "true"
                      },
                      null,
                      -1
                      /* CACHED */
                    )),
                    y("button", {
                      type: "button",
                      role: "tab",
                      "aria-selected": o.value.promptMode === "llm",
                      onClick: c[13] || (c[13] = (h) => X("llm"))
                    }, "← LLM 说明", 8, Zu),
                    y("button", {
                      type: "button",
                      role: "tab",
                      "aria-selected": o.value.promptMode === "manual",
                      onClick: c[14] || (c[14] = (h) => X("manual"))
                    }, "直接提示词 →", 8, Qu)
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
                ),
                y("label", null, [
                  c[40] || (c[40] = Te(
                    "版式 ID",
                    -1
                    /* CACHED */
                  )),
                  y("input", {
                    value: o.value.id,
                    "aria-label": "版式 ID",
                    onChange: c[17] || (c[17] = (h) => q("id", h))
                  }, null, 40, ec)
                ]),
                y("label", null, [
                  c[41] || (c[41] = Te(
                    "名称",
                    -1
                    /* CACHED */
                  )),
                  y("input", {
                    value: o.value.label,
                    "aria-label": "版式名称",
                    onChange: c[18] || (c[18] = (h) => q("label", h))
                  }, null, 40, tc)
                ]),
                y("label", null, [
                  c[42] || (c[42] = Te(
                    "画面描述",
                    -1
                    /* CACHED */
                  )),
                  y("textarea", {
                    value: o.value.description,
                    "aria-label": "整页画面描述",
                    rows: "3",
                    placeholder: "全页共用的画风、环境与光照；两种模式共用",
                    onInput: c[19] || (c[19] = (h) => q("description", h))
                  }, null, 40, nc)
                ]),
                j.value ? (G(), re(
                  de,
                  { key: 0 },
                  [
                    y(
                      "strong",
                      null,
                      "第 " + se(r.value + 1) + " 格 · " + se(l.value ? `${l.value} ${Z[sn(Et)(l.value)] ?? "槽位"}` : "外框 F"),
                      1
                      /* TEXT */
                    ),
                    l.value ? (G(), re("div", sc, [
                      y("div", { class: "inline" }, [
                        y("button", {
                          type: "button",
                          class: "primary",
                          onClick: Q
                        }, "确定内框"),
                        y("button", {
                          type: "button",
                          onClick: le
                        }, "取消内框修改")
                      ])
                    ])) : Qe("v-if", !0),
                    y("button", {
                      type: "button",
                      disabled: !l.value,
                      onClick: Ne
                    }, "删除选中槽位", 8, ic),
                    y("button", {
                      type: "button",
                      onClick: On
                    }, "恢复本格默认槽位"),
                    y("div", oc, [
                      y("select", {
                        value: H.value,
                        "aria-label": "新增内框类型",
                        disabled: !w.value.length,
                        onChange: c[20] || (c[20] = (h) => oe.value = h.target.value)
                      }, [
                        (G(!0), re(
                          de,
                          null,
                          gt(w.value, (h) => (G(), re("option", {
                            key: h,
                            value: h
                          }, se(h) + " " + se(Z[h]), 9, lc))),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ], 40, rc),
                      y("button", {
                        type: "button",
                        disabled: !H.value,
                        onClick: Mn
                      }, "添加内框", 8, ac)
                    ]),
                    y("label", null, [
                      Te(
                        se(l.value ? `内框 ${l.value} 画面描述` : "外框 F 画面描述") + " ",
                        1
                        /* TEXT */
                      ),
                      y("textarea", {
                        value: Me(j.value, l.value || "F"),
                        "aria-label": "当前框画面描述",
                        rows: "3",
                        placeholder: l.value ? "描述本框的人物、动作、场景或取景" : "描述本格的场景与人物关系",
                        onInput: Tn
                      }, null, 40, uc)
                    ]),
                    o.value.promptMode === "manual" ? (G(), re("div", cc, [
                      y(
                        "strong",
                        null,
                        se(l.value ? `内框 ${l.value}` : "外框 F") + " 追加人物／台词",
                        1
                        /* TEXT */
                      ),
                      (G(!0), re(
                        de,
                        null,
                        gt(Y.value, (h, M) => (G(), re("div", {
                          key: M,
                          class: "content-card"
                        }, [
                          y("div", fc, [
                            y(
                              "span",
                              null,
                              se(M + 1),
                              1
                              /* TEXT */
                            ),
                            y("select", {
                              value: h.label,
                              "aria-label": "内容类型",
                              onChange: (L) => fe(M, "label", L)
                            }, [...c[43] || (c[43] = [
                              y(
                                "option",
                                { value: "object" },
                                "场景／物件",
                                -1
                                /* CACHED */
                              ),
                              y(
                                "option",
                                { value: "character" },
                                "人物",
                                -1
                                /* CACHED */
                              ),
                              y(
                                "option",
                                { value: "text" },
                                "文字",
                                -1
                                /* CACHED */
                              )
                            ])], 40, dc)
                          ]),
                          h.label === "text" ? (G(), re(
                            de,
                            { key: 0 },
                            [
                              y("label", null, [
                                c[45] || (c[45] = Te(
                                  "文字类型",
                                  -1
                                  /* CACHED */
                                )),
                                y("select", {
                                  value: h.textType ?? "dialogue",
                                  onChange: (L) => fe(M, "textType", L)
                                }, [...c[44] || (c[44] = [
                                  y(
                                    "option",
                                    { value: "dialogue" },
                                    "对白",
                                    -1
                                    /* CACHED */
                                  ),
                                  y(
                                    "option",
                                    { value: "narration" },
                                    "旁白",
                                    -1
                                    /* CACHED */
                                  ),
                                  y(
                                    "option",
                                    { value: "sfx" },
                                    "日文拟声",
                                    -1
                                    /* CACHED */
                                  )
                                ])], 40, hc)
                              ]),
                              y("label", null, [
                                c[46] || (c[46] = Te(
                                  "准确台词／文字",
                                  -1
                                  /* CACHED */
                                )),
                                y("textarea", {
                                  value: h.text ?? "",
                                  "aria-label": "准确台词",
                                  rows: "3",
                                  onInput: (L) => fe(M, "text", L)
                                }, null, 40, pc)
                              ])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : Qe("v-if", !0),
                          y("label", null, [
                            Te(
                              se(h.label === "text" ? "文字表现说明（选填）" : "画面描述"),
                              1
                              /* TEXT */
                            ),
                            y("textarea", {
                              value: h.caption,
                              "aria-label": "当前内容描述",
                              rows: "3",
                              placeholder: h.label === "text" ? "英文描述说话人、气泡形状与位置；留空使用常规样式" : "英文描述本框可见的场景、人物、动作与取景",
                              onInput: (L) => fe(M, "caption", L)
                            }, null, 40, gc)
                          ]),
                          y("div", mc, [
                            y("button", {
                              type: "button",
                              disabled: M === 0,
                              onClick: (L) => $e(M, -1)
                            }, "上移", 8, vc),
                            y("button", {
                              type: "button",
                              disabled: M === Y.value.length - 1,
                              onClick: (L) => $e(M, 1)
                            }, "下移", 8, yc),
                            y("button", {
                              type: "button",
                              onClick: (L) => we(M)
                            }, "删除内容", 8, bc)
                          ])
                        ]))),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      y("button", {
                        type: "button",
                        onClick: te
                      }, "＋ 添加画面／台词"),
                      c[47] || (c[47] = y(
                        "p",
                        { class: "hint" },
                        "一个框可添加多个人物或多条文字，按列表顺序输出。空白条目留作草稿；每句台词单独一项，人物与气泡可用独立内框定位。",
                        -1
                        /* CACHED */
                      ))
                    ])) : Qe("v-if", !0),
                    y("div", wc, [
                      y(
                        "button",
                        {
                          type: "button",
                          class: Rt({ active: !l.value }),
                          onClick: Q
                        },
                        "外框 F",
                        2
                        /* CLASS */
                      ),
                      (G(!0), re(
                        de,
                        null,
                        gt(j.value.slots, (h, M) => (G(), re("button", {
                          key: M,
                          type: "button",
                          class: Rt({ active: l.value === M }),
                          onClick: (L) => Xe(r.value, String(M))
                        }, se(M) + " " + se(Z[sn(Et)(String(M))] ?? ""), 11, xc))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    (G(), re(
                      de,
                      null,
                      gt(["x", "y", "width", "height"], (h) => y("label", { key: h }, [
                        Te(
                          se({ x: "左边距", y: "上边距", width: "宽度", height: "高度" }[h]),
                          1
                          /* TEXT */
                        ),
                        y("input", {
                          value: U.value?.[h],
                          "aria-label": `${l.value ? "槽位" : "分格"}${h}`,
                          type: "number",
                          step: "1",
                          onChange: (M) => W(h, M)
                        }, null, 40, _c)
                      ])),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (G(), re("p", Cc, "添加或选择一格，编辑精确尺寸。")),
                c[48] || (c[48] = y(
                  "p",
                  { class: "hint" },
                  "右侧按钮可选重叠槽位，Delete 删除小框，撤销可恢复。普通拖动四角或边中点改大小，Ctrl+拖四角改形状。MOSS 以外接矩形与轮廓描述接收形状参考，不保证精确裁剪。",
                  -1
                  /* CACHED */
                ))
              ])
            ]),
            m.value ? (G(), re(
              "p",
              Sc,
              se(m.value),
              1
              /* TEXT */
            )) : Qe("v-if", !0),
            b.value ? (G(), re("footer", Mc, [
              c[49] || (c[49] = y(
                "span",
                null,
                "放弃未保存的修改？",
                -1
                /* CACHED */
              )),
              y("button", {
                type: "button",
                onClick: c[21] || (c[21] = (h) => b.value = !1)
              }, "继续编辑"),
              y("button", {
                type: "button",
                onClick: c[22] || (c[22] = (h) => s("close"))
              }, "放弃修改")
            ])) : Qe("v-if", !0),
            he.value ? (G(), re(
              "div",
              {
                key: 2,
                class: "quick-mask",
                onMousedown: c[28] || (c[28] = Ke((h) => he.value = null, ["self"]))
              },
              [
                y(
                  "section",
                  {
                    class: "quick-dialog",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "快速编辑画面描述",
                    onKeydown: [
                      c[26] || (c[26] = Ke(() => {
                      }, ["stop"])),
                      c[27] || (c[27] = Nn(Ke((h) => he.value = null, ["prevent"]), ["esc"]))
                    ]
                  },
                  [
                    y("header", null, [
                      y(
                        "strong",
                        null,
                        "第 " + se(he.value.index + 1) + " 格 · " + se(he.value.key) + " 画面描述",
                        1
                        /* TEXT */
                      ),
                      y("button", {
                        type: "button",
                        "aria-label": "关闭快速编辑",
                        onClick: c[23] || (c[23] = (h) => he.value = null)
                      }, "✕")
                    ]),
                    qt(y("textarea", {
                      ref_key: "quickField",
                      ref: en,
                      "onUpdate:modelValue": c[24] || (c[24] = (h) => xe.value = h),
                      "aria-label": "快速画面描述",
                      rows: "7",
                      onKeydown: Nn(Ke(Le, ["ctrl", "prevent"]), ["enter"])
                    }, null, 40, Oc), [
                      [ks, xe.value]
                    ]),
                    y("footer", null, [
                      y("button", {
                        type: "button",
                        onClick: c[25] || (c[25] = (h) => he.value = null)
                      }, "取消"),
                      y("button", {
                        type: "button",
                        class: "primary",
                        onClick: Le
                      }, "确定画面描述")
                    ])
                  ],
                  32
                  /* NEED_HYDRATION */
                )
              ],
              32
              /* NEED_HYDRATION */
            )) : Qe("v-if", !0)
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        )
      ]),
      _: 1
      /* STABLE */
    }));
  }
}), Ec = /* @__PURE__ */ br(Tc, [["__scopeId", "data-v-b7f415a2"]]);
function hs(e) {
  const { id: t, label: n, usage: s, readingOrder: i, canvas: o, promptMode: r, promptCaption: l } = e;
  if (!o || !t) throw new Error("版式缺少 id 或 canvas。");
  const a = e.panels ?? e.portrait ?? e.landscape;
  if (!Array.isArray(a) || !a.length) throw new Error("版式缺少分格。");
  return { id: t, label: n || t, description: xr(e), usage: s || "", readingOrder: i || "", canvas: o, panels: a, ...r ? { promptMode: r } : {}, ...typeof l == "string" ? { promptCaption: l } : {} };
}
function Ac(e) {
  const t = Array.isArray(e) ? e : e.layouts ?? [e];
  if (!Array.isArray(t)) throw new Error("导入需要版式数组。");
  return t.map(hs);
}
function Rc(e) {
  const t = hs(e), n = t.panels.map((s, i) => ({ panel: i + 1, position: s.position, slots: [.../* @__PURE__ */ new Set([...Object.keys(s.slots), ..."F" in s.slots ? ["X"] : []])], slotNotes: { ...Object.fromEntries(Object.entries(s.slotContents ?? {}).map(([o, r]) => [o, r.filter((l) => l.label !== "text").map((l) => l.caption).filter(Boolean).join(`
`)]).filter(([, o]) => o)), ...s.slotNotes } }));
  return `以下为当前所选版式的画面描述，结合原文分配内容。F 描述整格，其余键只作用于对应内框；留空沿用槽位默认含义。画面描述本身不是台词、旁白或可见印字，不新增剧情事件、参与者、格子或槽位。
` + JSON.stringify({ layout: t.id, description: t.description, readingOrder: t.readingOrder, panels: n }, null, 2);
}
function Ic(e, t) {
  return e.trim() + `

` + Rc(t);
}
function Pc(e, t, n) {
  const s = e.getContext("2d"), i = e.width, o = e.height;
  if (s.clearRect(0, 0, i, o), !t) return;
  const r = Math.min((i - 20) / t.canvas.width, (o - 20) / t.canvas.height), l = (i - t.canvas.width * r) / 2, a = (o - t.canvas.height * r) / 2;
  s.save(), s.translate(l, a), s.scale(r, r), s.translate(t.canvas.width / 2, t.canvas.height / 2), s.fillStyle = "#fff", s.fillRect(-t.canvas.width / 2, -t.canvas.height / 2, t.canvas.width, t.canvas.height);
  const d = t.panels.map((f, m) => ({ panel: f, index: m })).sort((f, m) => (f.panel.layer ?? f.index) - (m.panel.layer ?? m.index) || f.index - m.index);
  for (const { panel: f, index: m } of d) {
    const b = f.slots.F ?? f.slots.C ?? Object.values(f.slots)[0], [O, F, P, B] = b, N = f.shapes?.F ?? [[F, O], [B, O], [B, P], [F, P]];
    if (s.beginPath(), N.forEach(([k, $], R) => R ? s.lineTo(k, $) : s.moveTo(k, $)), s.closePath(), s.fillStyle = "#eef4fd", s.fill(), s.strokeStyle = "#235c9e", s.lineWidth = 2 / r, s.stroke(), s.save(), s.clip(), n) for (const [k, [$, R, J, j]] of Object.entries(f.slots)) {
      if (!["T", "TL", "TR", "B", "BL", "BR", "ML", "MR"].includes(Et(k))) continue;
      const U = f.shapes?.[k] ?? [[R, $], [j, $], [j, J], [R, J]];
      s.beginPath(), U.forEach(([Z, oe], w) => w ? s.lineTo(Z, oe) : s.moveTo(Z, oe)), s.closePath(), s.strokeStyle = "#dd8838", s.lineWidth = 1 / r, s.stroke(), s.fillStyle = "#a65313", s.font = `${10 / r}px sans-serif`, s.fillText(k, R + 2 / r, $ + 12 / r);
    }
    s.restore(), s.fillStyle = "#16375b", s.font = `bold ${13 / r}px sans-serif`, s.fillText(String(m + 1), F + 4 / r, O + 16 / r);
  }
  s.restore();
}
let ve = { layouts: [], revision: "" };
const Zn = /* @__PURE__ */ new Set(), Gs = new URL(import.meta.url);
Gs.pathname = Gs.pathname.replace(/[^/]+$/, "moss_layout.css");
const yi = document.createElement("link");
yi.rel = "stylesheet";
yi.href = Gs.href;
document.head.append(yi);
async function Qn(e, t = {}) {
  const n = await Ar.fetchApi("/moss_manga_layout/" + e, t), s = await n.json();
  if (!n.ok) throw new Error(s.error || `请求失败：${n.status}`);
  return s;
}
async function io() {
  ve = await Qn("library"), Zn.forEach((e) => e());
}
async function Xs(e) {
  ve = await Qn("library", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layouts: e, revision: ve.revision }) }), Zn.forEach((t) => t());
}
function oo(e, t, n) {
  const s = document.createElement("div");
  document.body.append(s);
  let i;
  const o = () => {
    i.unmount(), s.remove();
  };
  i = nu(Ec, {
    sources: [...e ? [e] : [], ...ve.layouts.filter((r) => r.id !== e?.id)].map((r) => ({ ...r, key: r.id })),
    existingIds: ve.layouts.map((r) => r.id),
    initialMode: n,
    initialKey: e?.id,
    editingId: e?.id,
    onClose: o,
    onSave: async (r) => {
      try {
        const l = hs(r), a = ve.layouts.some((d) => d.id === l.id);
        if (a && l.id !== e?.id) throw new Error("版式库已有此 ID，请改名或打开该版式编辑。");
        await Xs(a ? ve.layouts.map((d) => d.id === l.id ? l : d) : [...ve.layouts, l]), t(l), o();
      } catch (l) {
        window.alert(l.message);
      }
    }
  }), i.mount(s);
}
async function ro(e) {
  try {
    await navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement("textarea");
    t.value = e, t.style.position = "fixed", t.style.top = "-10000px", document.body.append(t), t.select();
    const n = document.execCommand("copy");
    if (t.remove(), !n) throw new Error("浏览器无法访问剪贴板。");
  }
}
function kc(e) {
  const t = e.widgets.find((w) => w.name === "layout_id"), n = e.widgets.find((w) => w.name === "layout_snapshot");
  if (!t || !n) return;
  n.type = "hidden", n.computeSize = () => [0, -4];
  const s = e.widgets.find((w) => w.name === "library_mode") ?? { value: "llm" };
  s.type = "hidden", s.computeSize = () => [0, -4], t.type = "combo", t.options = { ...t.options, values: () => [...new Set([...ve.layouts.map((w) => w.id), t.value].filter(Boolean))] };
  let i = 400, o, r;
  const l = document.createElement("div");
  l.className = "moss-layout-node-panel", l.style.cssText = "width:100%;height:400px;display:flex;flex-direction:column;gap:6px;padding:6px;box-sizing:border-box;overflow:hidden;background:#202733;color:#ecf1f7;font:12px system-ui;";
  const a = document.createElement("label");
  a.style.cssText = "display:flex;align-items:center;gap:8px;flex:none;min-height:32px", a.append(document.createTextNode("版式库"));
  const d = document.createElement("select");
  d.setAttribute("aria-label", "选择库中版式"), d.style.cssText = "flex:1;min-width:0;height:32px;color:#fff;background:#344052;border:1px solid #7d8b9e;border-radius:4px;padding:3px 6px", a.append(d), l.append(a);
  const f = document.createElement("div");
  f.style.cssText = "display:flex;flex-wrap:wrap;gap:5px;flex:none", l.append(f);
  const m = document.createElement("div");
  m.setAttribute("role", "status"), m.style.cssText = "min-height:30px;white-space:normal;overflow-wrap:anywhere;flex:none", l.append(m);
  const b = document.createElement("canvas");
  b.width = 1e3, b.height = 540, b.style.cssText = "display:block;width:100%;height:240px;min-height:240px;flex:none;object-fit:contain;background:#e9edf3", l.append(b);
  const O = document.createElement("label"), F = document.createElement("input");
  F.type = "checkbox", F.checked = !0, O.append(F, document.createTextNode("显示字区")), f.append(O);
  function P() {
    return n.value ? JSON.parse(n.value) : null;
  }
  function B() {
    if (!o) return;
    i = 36 + a.offsetHeight + f.offsetHeight + m.offsetHeight + 240, l.style.height = i + "px";
    const w = e.computeSize();
    e.size[1] < w[1] && e.setSize([e.size[0], w[1]]), Ln.graph?.setDirtyCanvas(!0, !0);
  }
  function N() {
    cancelAnimationFrame(r), r = requestAnimationFrame(B);
  }
  function k() {
    d.replaceChildren();
    for (const w of ve.layouts) {
      const H = document.createElement("option");
      H.value = w.id, H.textContent = `${w.id} · ${w.label || w.id}`, d.append(H);
    }
    if (!ve.layouts.some((w) => w.id === t.value)) {
      const w = document.createElement("option");
      w.value = t.value || "", w.textContent = n.value ? `${t.value} · 当前工作流快照（库中已无此版式）` : "请选择版式，或新建／导入", w.disabled = !0, d.prepend(w);
    }
    d.value = t.value || "", d.disabled = !ve.layouts.length;
  }
  function $() {
    k();
    try {
      const w = P();
      Pc(b, w, F.checked), m.textContent = w ? `${w.label || w.id} · ${w.canvas.width}×${w.canvas.height} · ${w.panels.length} 格 · ${w.promptMode === "manual" ? "直接提示词（读取手填内容）" : "LLM 输入"} · 工作流快照` : "没有选中版式：请新建或导入。";
    } catch (w) {
      m.textContent = w.message;
    }
    Ln.graph?.setDirtyCanvas(!0, !0), N();
  }
  function R(w) {
    s.value = w.promptMode ?? "llm", t.value = w.id, n.value = JSON.stringify(w), $(), Ln.graph?.change();
  }
  function J(w, H) {
    const Y = document.createElement("button");
    Y.textContent = w, Y.type = "button", Y.style.cssText = "padding:4px 7px;border:1px solid #7d8b9e;border-radius:4px;background:#344052;color:#fff;cursor:pointer", Y.onclick = async () => {
      try {
        await H();
      } catch (he) {
        m.textContent = he.message;
      }
    }, f.append(Y);
  }
  J("编辑版式", () => {
    const w = P();
    if (!w) throw new Error("先选择版式。");
    oo(w, R, w.promptMode ?? "llm", e.widgets.find((H) => H.name === "bleed")?.value ?? 72);
  }), J("新建", () => oo(null, R, "llm", e.widgets.find((w) => w.name === "bleed")?.value ?? 72)), J("删除", async () => {
    const w = P();
    if (!w) throw new Error("先选择版式。");
    await Xs(ve.layouts.filter((H) => H.id !== w.id)), $(), m.textContent = "已从公共库删除。当前节点保留工作流快照；不会自动恢复到库。";
  }), J("刷新版式库", () => io()), J("一键复制说明", async () => {
    const w = P();
    if (!w) throw new Error("先选择版式。");
    const H = await Qn("format", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(w) });
    await ro(Ic(H.text, w)), m.textContent = "已复制格式转换＋当前快照的画面描述，可一起交给 LLM。";
  }), J("复制手填提示词", async () => {
    const w = P();
    if (!w) throw new Error("先选择版式。");
    const H = await Qn("manual", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layout: w, bleed: e.widgets.find((Y) => Y.name === "bleed")?.value ?? 72 }) });
    await ro(H.text), m.textContent = "已复制 MOSS 提示词，可直接送入文本编码器。";
  }), J("导出版式库", () => {
    const w = URL.createObjectURL(new Blob([JSON.stringify({ layouts: ve.layouts }, null, 2)], { type: "application/json" })), H = document.createElement("a");
    H.href = w, H.download = "moss-manga-layouts.json", H.click(), setTimeout(() => URL.revokeObjectURL(w), 1e3);
  }), J("导出当前版式", () => {
    const w = P();
    if (!w) throw new Error("先选择版式。");
    const H = URL.createObjectURL(new Blob([JSON.stringify(hs(w), null, 2)], { type: "application/json" })), Y = document.createElement("a");
    Y.href = H, Y.download = "moss-manga-current-layout.json", Y.click(), setTimeout(() => URL.revokeObjectURL(H), 1e3);
  }), J("导入", () => {
    const w = document.createElement("input");
    w.type = "file", w.accept = ".json,application/json", w.onchange = async () => {
      try {
        if (!w.files?.[0]) return;
        const H = JSON.parse(await w.files[0].text()), Y = Ac(H);
        for (const xe of Y) xe.promptMode ??= H.mode ?? "llm";
        const he = new Set(ve.layouts.map((xe) => xe.id));
        if (Y.some((xe) => he.has(xe.id))) throw new Error("导入含同名 ID，请先改名；不会覆盖已有版式。");
        await Xs([...ve.layouts, ...Y]), Y.length ? R(Y[0]) : $();
      } catch (H) {
        m.textContent = H.message;
      }
    }, w.click();
  }), F.onchange = $, d.onchange = () => {
    const w = ve.layouts.find((H) => H.id === d.value);
    w && R(w);
  }, t.callback = (w) => {
    const H = ve.layouts.find((Y) => Y.id === w);
    H ? R(H) : $();
  }, o = e.addDOMWidget("版式预览", "moss_layout_preview", l, { serialize: !1, hideOnZoom: !1, getMinHeight: () => i, getMaxHeight: () => i, getHeight: () => i }), o.computeSize = (w) => [w, i], e.setSize([Math.max(e.size[0], 460), Math.max(e.size[1], 640)]);
  const j = new ResizeObserver(N);
  [a, f, m].forEach((w) => j.observe(w));
  const U = e.onResize;
  e.onResize = function(...w) {
    const H = U?.apply(this, w);
    return N(), H;
  };
  const Z = e.onConfigure;
  e.onConfigure = function(...w) {
    const H = Z?.apply(this, w);
    return setTimeout(() => {
      n.value && (s.value = P()?.promptMode ?? "llm"), $();
    }, 0), H;
  }, Zn.add($);
  const oe = e.onRemoved;
  e.onRemoved = function(...w) {
    return Zn.delete($), j.disconnect(), cancelAnimationFrame(r), oe?.apply(this, w);
  }, io().then(() => {
    if (n.value && (s.value = P()?.promptMode ?? "llm"), !n.value && !t.value && ve.layouts.length) R(ve.layouts[0]);
    else if (!n.value && t.value) {
      const w = ve.layouts.find((H) => H.id === t.value);
      w && R(w);
    }
    $();
  }).catch((w) => {
    m.textContent = w.message;
  });
}
Ln.registerExtension({ name: "MOSS.MangaLayout", beforeRegisterNodeDef(e, t) {
  if (t.name !== "MossMangaLayout") return;
  const n = e.prototype.onNodeCreated;
  e.prototype.onNodeCreated = function(...s) {
    const i = n?.apply(this, s);
    return kc(this), i;
  };
} });
