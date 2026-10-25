import { app as Ln } from "../../scripts/app.js";
import { api as Ar } from "../../scripts/api.js";
// @__NO_SIDE_EFFECTS__
function Zs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ue = {}, Ht = [], at = () => {
}, lo = () => !1, es = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ts = (e) => e.startsWith("onUpdate:"), Ce = Object.assign, Qs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Rr = Object.prototype.hasOwnProperty, ee = (e, t) => Rr.call(e, t), H = Array.isArray, kt = (e) => _n(e) === "[object Map]", _t = (e) => _n(e) === "[object Set]", wi = (e) => _n(e) === "[object Date]", z = (e) => typeof e == "function", he = (e) => typeof e == "string", Ge = (e) => typeof e == "symbol", ae = (e) => e !== null && typeof e == "object", ao = (e) => (ae(e) || z(e)) && z(e.then) && z(e.catch), uo = Object.prototype.toString, _n = (e) => uo.call(e), Ir = (e) => _n(e).slice(8, -1), co = (e) => _n(e) === "[object Object]", ei = (e) => he(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, an = /* @__PURE__ */ Zs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ns = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Pr = /-\w/g, qe = ns(
  (e) => e.replace(Pr, (t) => t.slice(1).toUpperCase())
), kr = /\B([A-Z])/g, Nt = ns(
  (e) => e.replace(kr, "-$1").toLowerCase()
), fo = ns((e) => e.charAt(0).toUpperCase() + e.slice(1)), bs = ns(
  (e) => e ? `on${fo(e)}` : ""
), rt = (e, t) => !Object.is(e, t), Dn = (e, ...t) => {
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
function Bt(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = he(s) ? $r(s) : Bt(s);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (he(e) || ae(e))
    return e;
}
const jr = /;(?![^(]*\))/g, Fr = /:([^]+)/, Nr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function $r(e) {
  const t = {};
  return e.replace(Nr, (n) => n.startsWith("/*") ? "" : n).split(jr).forEach((n) => {
    if (n) {
      const s = n.split(Fr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function It(e) {
  let t = "";
  if (he(e))
    t = e;
  else if (H(e))
    for (let n = 0; n < e.length; n++) {
      const s = It(e[n]);
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
    s = Ct(e[i], t[i], n);
  return s;
}
function Ci(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), i = new Uint8Array(s.length);
  for (const o of e) {
    let r = -1;
    for (let l = 0; l < s.length; l++)
      if (!i[l] && Ct(o, s[l], n)) {
        r = l;
        break;
      }
    if (r < 0) return !1;
    i[r] = 1;
  }
  return !0;
}
function Kr(e, t, n) {
  let s = kt(e), i = kt(t);
  if (s || i || (s = _t(e), i = _t(t), s || i))
    return s && i ? Ci(e, t, n) : !1;
  const o = Object.keys(e).length, r = Object.keys(t).length;
  if (o !== r)
    return !1;
  for (const l in e) {
    const a = e.hasOwnProperty(l), d = t.hasOwnProperty(l);
    if (a && !d || !a && d || !Ct(e[l], t[l], n))
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
function Ct(e, t, n) {
  if (e === t) return !0;
  let s = wi(e), i = wi(t);
  return s || i ? s && i ? e.getTime() === t.getTime() : !1 : (s = Ge(e), i = Ge(t), s || i ? e === t : (s = H(e), i = H(t), s || i ? s && i ? Si(e, t, n, Vr) : !1 : (s = ae(e), i = ae(t), s || i ? !s || !i ? !1 : Si(e, t, n, Kr) : String(e) === String(t))));
}
function ti(e, t) {
  return e.findIndex((n) => Ct(n, t));
}
const go = (e) => !!(e && e.__v_isRef === !0), se = (e) => he(e) ? e : e == null ? "" : H(e) || ae(e) && (e.toString === uo || !z(e.toString)) ? go(e) ? se(e.value) : JSON.stringify(e, mo, 2) : String(e), mo = (e, t) => go(t) ? mo(e, t.value) : kt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], o) => (n[xs(s, o) + " =>"] = i, n),
    {}
  )
} : _t(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => xs(n))
} : Ge(t) ? xs(t) : ae(t) && !H(t) && !co(t) ? String(t) : t, xs = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ge(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let _e;
class Hr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && _e && (_e.active ? (this.parent = _e, this.index = (_e.scopes || (_e.scopes = [])).push(
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
      const n = _e;
      try {
        return _e = this, t();
      } finally {
        _e = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = _e, _e = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (_e === this)
        _e = this.prevScope;
      else {
        let t = _e;
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
  return _e;
}
let ce;
const ws = /* @__PURE__ */ new WeakSet();
class vo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _e && (_e.active ? _e.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ws.has(this) && (ws.delete(this), this.trigger()));
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
    this.flags |= 2, Mi(this), xo(this);
    const t = ce, n = Ye;
    ce = this, Ye = !0;
    try {
      return this.fn();
    } finally {
      wo(this), ce = t, Ye = n, this.flags &= -3;
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
    this.flags & 64 ? ws.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    js(this) && this.run();
  }
  get dirty() {
    return js(this);
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
function xo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function wo(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), ii(s), Ur(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function js(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (_o(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function _o(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === pn) || (e.globalVersion = pn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !js(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ce, s = Ye;
  ce = e, Ye = !0;
  try {
    xo(e);
    const i = e.fn(e._value);
    (t.version === 0 || rt(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ce = n, Ye = s, wo(e), e.flags &= -3;
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
let Ye = !0;
const Co = [];
function ct() {
  Co.push(Ye), Ye = !1;
}
function ft() {
  const e = Co.pop();
  Ye = e === void 0 ? !0 : e;
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
    if (!ce || !Ye || ce === this.computed)
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
const Fs = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ Symbol(
  ""
), Ns = /* @__PURE__ */ Symbol(
  ""
), gn = /* @__PURE__ */ Symbol(
  ""
);
function Ee(e, t, n) {
  if (Ye && ce) {
    let s = Fs.get(e);
    s || Fs.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new oi()), i.map = s, i.key = n), i.track();
  }
}
function bt(e, t, n, s, i, o) {
  const r = Fs.get(e);
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
    const a = H(e), d = a && ei(n);
    if (a && n === "length") {
      const c = Number(s);
      r.forEach((m, y) => {
        (y === "length" || y === gn || !Ge(y) && y >= c) && l(m);
      });
    } else
      switch ((n !== void 0 || r.has(void 0)) && l(r.get(n)), d && l(r.get(gn)), t) {
        case "add":
          a ? d && l(r.get("length")) : (l(r.get(Wt)), kt(e) && l(r.get(Ns)));
          break;
        case "delete":
          a || (l(r.get(Wt)), kt(e) && l(r.get(Ns)));
          break;
        case "set":
          kt(e) && l(r.get(Wt));
          break;
      }
  }
  si();
}
function qt(e) {
  const t = /* @__PURE__ */ ie(e);
  return t === e || (Ee(t, "iterate", gn), /* @__PURE__ */ He(e)) ? t : /* @__PURE__ */ dt(e) ? /* @__PURE__ */ jt(e) ? t.map((n) => Ft(Be(n))) : t.map(Ft) : t.map(Be);
}
function os(e) {
  return Ee(e = /* @__PURE__ */ ie(e), "iterate", gn), e;
}
function st(e, t) {
  return /* @__PURE__ */ dt(e) ? Ft(/* @__PURE__ */ jt(e) ? Be(t) : t) : Be(t);
}
const zr = {
  __proto__: null,
  [Symbol.iterator]() {
    return _s(this, Symbol.iterator, (e) => st(this, e));
  },
  concat(...e) {
    return qt(this).concat(
      ...e.map((t) => H(t) ? qt(t) : t)
    );
  },
  entries() {
    return _s(this, "entries", (e) => (e[1] = st(this, e[1]), e));
  },
  every(e, t) {
    return gt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return gt(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => st(this, s)),
      arguments
    );
  },
  find(e, t) {
    return gt(
      this,
      "find",
      e,
      t,
      (n) => st(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return gt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return gt(
      this,
      "findLast",
      e,
      t,
      (n) => st(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return gt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return gt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Cs(this, "includes", e);
  },
  indexOf(...e) {
    return Cs(this, "indexOf", e);
  },
  join(e) {
    return qt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Cs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return gt(this, "map", e, t, void 0, arguments);
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
    return gt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return tn(this, "splice", e);
  },
  toReversed() {
    return qt(this).toReversed();
  },
  toSorted(e) {
    return qt(this).toSorted(e);
  },
  toSpliced(...e) {
    return qt(this).toSpliced(...e);
  },
  unshift(...e) {
    return tn(this, "unshift", e);
  },
  values() {
    return _s(this, "values", (e) => st(this, e));
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
function gt(e, t, n, s, i, o) {
  const r = os(e), l = r !== e && !/* @__PURE__ */ He(e), a = r[t];
  if (a !== Mo[t]) {
    const m = a.apply(e, o);
    return l ? Be(m) : m;
  }
  let d = n;
  r !== e && (l ? d = function(m, y) {
    return n.call(this, st(e, m), y, e);
  } : n.length > 2 && (d = function(m, y) {
    return n.call(this, m, y, e);
  }));
  const c = a.call(r, d, s);
  return l && i ? i(c) : c;
}
function Ti(e, t, n, s) {
  const i = os(e), o = i !== e && !/* @__PURE__ */ He(e);
  let r = n, l = !1;
  i !== e && (o ? (l = s.length === 0, r = function(d, c, m) {
    return l && (l = !1, d = st(e, d)), n.call(this, d, st(e, c), m, e);
  }) : n.length > 3 && (r = function(d, c, m) {
    return n.call(this, d, c, m, e);
  }));
  const a = i[t](r, ...s);
  return l ? st(e, a) : a;
}
function Cs(e, t, n) {
  const s = /* @__PURE__ */ ie(e);
  Ee(s, "iterate", gn);
  const i = s[t](...n);
  return (i === -1 || i === !1) && /* @__PURE__ */ ui(n[0]) ? (n[0] = /* @__PURE__ */ ie(n[0]), s[t](...n)) : i;
}
function tn(e, t, n = []) {
  ct(), ni();
  const s = (/* @__PURE__ */ ie(e))[t].apply(e, n);
  return si(), ft(), s;
}
const Jr = /* @__PURE__ */ Zs("__proto__,__v_isRef,__isVue"), Oo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ge)
);
function qr(e) {
  Ge(e) || (e = String(e));
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
    const r = H(t);
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
    if ((Ge(n) ? Oo.has(n) : Jr(n)) || (i || Ee(t, "get", n), o))
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
    const r = H(t) && ei(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ dt(o);
      if (!/* @__PURE__ */ He(s) && !/* @__PURE__ */ dt(s) && (o = /* @__PURE__ */ ie(o), s = /* @__PURE__ */ ie(s)), !r && /* @__PURE__ */ Re(o) && !/* @__PURE__ */ Re(s))
        return d || (o.value = s), !0;
    }
    const l = r ? Number(n) < t.length : ee(t, n), a = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ Re(t) ? t : i
    );
    return t === /* @__PURE__ */ ie(i) && a && (l ? rt(s, o) && bt(t, "set", n, s) : bt(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = ee(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && s && bt(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ge(n) || !Oo.has(n)) && Ee(t, "has", n), s;
  }
  ownKeys(t) {
    return Ee(
      t,
      "iterate",
      H(t) ? "length" : Wt
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
    const i = this.__v_raw, o = /* @__PURE__ */ ie(i), r = kt(o), l = e === "entries" || e === Symbol.iterator && r, a = e === "keys" && r, d = i[e](...s), c = n ? $s : t ? Ft : Be;
    return !t && Ee(
      o,
      "iterate",
      a ? Ns : Wt
    ), Ce(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: m, done: y } = d.next();
          return y ? { value: m, done: y } : {
            value: l ? [c(m[0]), c(m[1])] : c(m),
            done: y
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
      e || (rt(i, l) && Ee(r, "get", i), Ee(r, "get", l));
      const { has: a } = Rn(r), d = t ? $s : e ? Ft : Be;
      if (a.call(r, i))
        return d(o.get(i));
      if (a.call(r, l))
        return d(o.get(l));
      o !== r && o.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Ee(/* @__PURE__ */ ie(i), "iterate", Wt), i.size;
    },
    has(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ ie(o), l = /* @__PURE__ */ ie(i);
      return e || (rt(i, l) && Ee(r, "has", i), Ee(r, "has", l)), i === l ? o.has(i) : o.has(i) || o.has(l);
    },
    forEach(i, o) {
      const r = this, l = r.__v_raw, a = /* @__PURE__ */ ie(l), d = t ? $s : e ? Ft : Be;
      return !e && Ee(a, "iterate", Wt), l.forEach((c, m) => i.call(o, d(c), d(m), r));
    }
  };
  return Ce(
    n,
    e ? {
      add: In("add"),
      set: In("set"),
      delete: In("delete"),
      clear: In("clear")
    } : {
      add(i) {
        const o = /* @__PURE__ */ ie(this), r = Rn(o), l = /* @__PURE__ */ ie(i), a = !t && !/* @__PURE__ */ He(i) && !/* @__PURE__ */ dt(i) ? l : i;
        return r.has.call(o, a) || rt(i, a) && r.has.call(o, i) || rt(l, a) && r.has.call(o, l) || (o.add(a), bt(o, "add", a, a)), this;
      },
      set(i, o) {
        !t && !/* @__PURE__ */ He(o) && !/* @__PURE__ */ dt(o) && (o = /* @__PURE__ */ ie(o));
        const r = /* @__PURE__ */ ie(this), { has: l, get: a } = Rn(r);
        let d = l.call(r, i);
        d || (i = /* @__PURE__ */ ie(i), d = l.call(r, i));
        const c = a.call(r, i);
        return r.set(i, o), d ? rt(o, c) && bt(r, "set", i, o) : bt(r, "add", i, o), this;
      },
      delete(i) {
        const o = /* @__PURE__ */ ie(this), { has: r, get: l } = Rn(o);
        let a = r.call(o, i);
        a || (i = /* @__PURE__ */ ie(i), a = r.call(o, i)), l && l.call(o, i);
        const d = o.delete(i);
        return a && bt(o, "delete", i, void 0), d;
      },
      clear() {
        const i = /* @__PURE__ */ ie(this), o = i.size !== 0, r = i.clear();
        return o && bt(
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
  return /* @__PURE__ */ dt(e) ? e : ai(
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
function jt(e) {
  return /* @__PURE__ */ dt(e) ? /* @__PURE__ */ jt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function dt(e) {
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
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ He(t) || /* @__PURE__ */ dt(t);
    t = s ? t : /* @__PURE__ */ ie(t), rt(t, n) && (this._rawValue = t, this._value = s ? t : Be(t), this.dep.trigger());
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
  return /* @__PURE__ */ jt(e) ? e : new Proxy(e, cl);
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
let Vt;
function hl(e, t = !1, n = Vt) {
  if (n) {
    let s = Bn.get(n);
    s || Bn.set(n, s = []), s.push(e);
  }
}
function pl(e, t, n = ue) {
  const { immediate: s, deep: i, once: o, scheduler: r, augmentJob: l, call: a } = n, d = (R) => i ? R : /* @__PURE__ */ He(R) || i === !1 || i === 0 ? xt(R, 1) : xt(R);
  let c, m, y, M, F = !1, k = !1;
  if (/* @__PURE__ */ Re(e) ? (m = () => e.value, F = /* @__PURE__ */ He(e)) : /* @__PURE__ */ jt(e) ? (m = () => d(e), F = !0) : H(e) ? (k = !0, F = e.some((R) => /* @__PURE__ */ jt(R) || /* @__PURE__ */ He(R)), m = () => e.map((R) => {
    if (/* @__PURE__ */ Re(R))
      return R.value;
    if (/* @__PURE__ */ jt(R))
      return d(R);
    if (z(R))
      return a ? a(R, 2) : R();
  })) : z(e) ? t ? m = a ? () => a(e, 2) : e : m = () => {
    if (y) {
      ct();
      try {
        y();
      } finally {
        ft();
      }
    }
    const R = Vt;
    Vt = c;
    try {
      return a ? a(e, 3, [M]) : e(M);
    } finally {
      Vt = R;
    }
  } : m = at, t && i) {
    const R = m, J = i === !0 ? 1 / 0 : i;
    m = () => xt(R(), J);
  }
  const L = Br(), $ = () => {
    c.stop(), L && L.active && Qs(L.effects, c);
  };
  if (o && t) {
    const R = t;
    t = (...J) => {
      try {
        return R(...J);
      } finally {
        $();
      }
    };
  }
  let P = k ? new Array(e.length).fill(Pn) : Pn;
  const K = (R) => {
    if (!(!(c.flags & 1) || !c.dirty && !R))
      if (t) {
        const J = c.run();
        if (R || i || F || (k ? J.some((j, B) => rt(j, P[B])) : rt(J, P))) {
          const j = Vt;
          ct();
          try {
            y && y(), Vt = c;
            const B = [
              J,
              // pass undefined as the old value when it's changed for the first time
              P === Pn ? void 0 : k && P[0] === Pn ? [] : P,
              M
            ];
            P = J, a ? a(t, 3, B) : (
              // @ts-expect-error
              t(...B)
            );
          } finally {
            Vt = j, ft();
          }
        }
      } else
        c.run();
  };
  return l && l(K), c = new vo(m), c.scheduler = r ? () => r(K, !1) : K, M = (R) => hl(R, !1, c), y = c.onStop = () => {
    const R = Bn.get(c);
    if (R) {
      if (a)
        a(R, 4);
      else
        for (const J of R) J();
      Bn.delete(c);
    }
  }, t ? s ? K(!0) : P = c.run() : r ? r(K.bind(null, !0), !0) : c.run(), $.pause = c.pause.bind(c), $.resume = c.resume.bind(c), $.stop = $, $;
}
function xt(e, t = 1 / 0, n) {
  if (t <= 0 || !ae(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Re(e))
    xt(e.value, t, n);
  else if (H(e))
    for (let s = 0; s < e.length; s++)
      xt(e[s], t, n);
  else if (_t(e) || kt(e))
    e.forEach((s) => {
      xt(s, t, n);
    });
  else if (co(e)) {
    for (const s in e)
      xt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && xt(e[s], t, n);
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
function Xe(e, t, n, s) {
  if (z(e)) {
    const i = Cn(e, t, n, s);
    return i && ao(i) && i.catch((o) => {
      rs(o, t, n);
    }), i;
  }
  if (H(e)) {
    const i = [];
    for (let o = 0; o < e.length; o++)
      i.push(Xe(e[o], t, n, s));
    return i;
  }
}
function rs(e, t, n, s = !0) {
  const i = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: r } = t && t.appContext.config || ue;
  if (t) {
    let l = t.parent;
    const a = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let m = 0; m < c.length; m++)
          if (c[m](e, a, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      ct(), Cn(o, null, 10, [
        e,
        a,
        d
      ]), ft();
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
const je = [];
let Je = -1;
const it = [];
let Rt = null, Gt = 0;
const ko = /* @__PURE__ */ Promise.resolve();
let Un = null;
function fn(e) {
  const t = Un || ko;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ml(e) {
  let t = Je + 1, n = je.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = je[s], o = mn(i);
    o < e || o === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ci(e) {
  if (!(e.flags & 1)) {
    const t = mn(e), n = je[je.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= mn(n) ? je.push(e) : je.splice(ml(t), 0, e), e.flags |= 1, jo();
  }
}
function jo() {
  Un || (Un = ko.then($o));
}
function vl(e) {
  if (!H(e))
    Rt && e.id === -1 ? Rt.splice(Gt + 1, 0, e) : e.flags & 1 || (it.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      it.push(e[t]);
  jo();
}
function Fo(e, t, n, s = Je + 1) {
  for (; s < je.length; s++) {
    const i = je[s];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      je.splice(s, 1), s = e ? s - 1 : Je, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function No(e, t, n = 0) {
  if (it.length) {
    let s = it, i = 0;
    if (t) {
      s = [];
      for (let r = 0; r < it.length; r++) {
        const l = it[r];
        (l.i !== void 0 ? !l.i || l.i.uid < n : t.has(l)) ? it[i++] = l : s.push(l);
      }
    }
    const o = [...new Set(s)].sort((r, l) => mn(r) - mn(l));
    if (it.length = i, Rt) {
      for (let r = 0; r < o.length; r++)
        Rt.push(o[r]);
      return;
    }
    for (Rt = o, Gt = 0; Gt < Rt.length; Gt++) {
      const r = Rt[Gt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    Rt = null, Gt = 0;
  }
}
let Ss = !1;
function yl(e, t) {
  if (Ss) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(it);
  e(), Ss = !0;
  try {
    Fo(void 0, t), No(void 0, n, t);
  } finally {
    Ss = !1;
  }
}
const mn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function $o(e) {
  try {
    for (Je = 0; Je < je.length; Je++) {
      const t = je[Je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Cn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Je < je.length; Je++) {
      const t = je[Je];
      t && (t.flags &= -2);
    }
    Je = -1, je.length = 0, No(), Un = null, (je.length || it.length) && $o();
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
function Yt(e, t) {
  if (Ae === null)
    return e;
  const n = ds(Ae), s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, r, l, a = ue] = t[i];
    o && (z(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && xt(r), s.push({
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
function Lt(e, t, n, s) {
  const i = e.dirs, o = t && t.dirs;
  for (let r = 0; r < i.length; r++) {
    const l = i[r];
    o && (l.oldValue = o[r].value);
    let a = l.dir[s];
    a && (ct(), Xe(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ft());
  }
}
function bl(e, t) {
  if (Fe) {
    let n = Fe.provides;
    const s = Fe.parent && Fe.parent.provides;
    s === n && (n = Fe.provides = Object.create(s)), n[e] = t;
  }
}
function Vn(e, t, n = !1) {
  const s = ba();
  if (s || Zt) {
    let i = Zt ? Zt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && z(t) ? t.call(s && s.proxy) : t;
  }
}
const xl = /* @__PURE__ */ Symbol.for("v-scx"), wl = () => Vn(xl);
function Ms(e, t, n) {
  return Vo(e, t, n);
}
function Vo(e, t, n = ue) {
  const { immediate: s, deep: i, flush: o, once: r } = n, l = Ce({}, n), a = t && s || !t && o !== "post";
  let d;
  if (xn) {
    if (o === "sync") {
      const M = wl();
      d = M.__watcherHandles || (M.__watcherHandles = []);
    } else if (!a) {
      const M = () => {
      };
      return M.stop = at, M.resume = at, M.pause = at, M;
    }
  }
  const c = Fe;
  l.call = (M, F, k) => Xe(M, c, F, k);
  let m = !1;
  o === "post" ? l.scheduler = (M) => {
    M.i = c, ke(M, c && c.suspense);
  } : o !== "sync" && (m = !0, l.scheduler = (M, F) => {
    F ? M() : ci(M);
  }), l.augmentJob = (M) => {
    t && (M.flags |= 4), m && (M.flags |= 2, c && (M.id = c.uid, M.i = c));
  };
  const y = pl(e, t, l);
  return xn && (d ? d.push(y) : a && y()), y;
}
function _l(e, t, n) {
  const s = this.proxy, i = he(e) ? e.includes(".") ? Ko(s, e) : () => s[e] : e.bind(s, s);
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
const Et = /* @__PURE__ */ new WeakMap(), Ho = /* @__PURE__ */ Symbol("_vte"), ls = (e) => e.__isTeleport, Kt = (e) => e && (e.disabled || e.disabled === ""), Cl = (e) => e && (e.defer || e.defer === ""), Ei = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Ai = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Ds = (e, t) => {
  const n = e && e.to;
  return he(n) ? t ? t(n) : null : n;
}, Sl = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, s, i, o, r, l, a, d) {
    const {
      mc: c,
      pc: m,
      pbc: y,
      o: { insert: M, querySelector: F, createText: k, createComment: L, parentNode: $ }
    } = d, P = Kt(t.props);
    let { dynamicChildren: K } = t;
    const R = (B, Z, oe) => {
      B.shapeFlag & 16 && c(
        B.children,
        Z,
        oe,
        i,
        o,
        r,
        l,
        a
      );
    }, J = (B = t) => {
      const Z = Kt(B.props), oe = B.target = Ds(B.props, F), pe = Vs(oe, B, k, M);
      oe && (r !== "svg" && Ei(oe) ? r = "svg" : r !== "mathml" && Ai(oe) && (r = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(oe), Z || (R(B, oe, pe), on(B, !1)));
    }, j = (B) => {
      const Z = () => {
        if (Et.get(B) === Z) {
          if (Et.delete(B), Kt(B.props)) {
            const oe = $(B.el) || n;
            R(B, oe, B.anchor), on(B, !0);
          }
          J(B);
        }
      };
      Et.set(B, Z), ke(Z, o);
    };
    if (e == null) {
      const B = t.el = k(""), Z = t.anchor = k("");
      if (M(B, n, s), M(Z, n, s), Cl(t.props) || o && o.pendingBranch) {
        j(t);
        return;
      }
      P && (R(t, n, Z), on(t, !0)), J();
    } else {
      t.el = e.el;
      const B = t.anchor = e.anchor, Z = Et.get(e);
      if (Z) {
        Z.flags |= 8, Et.delete(e), j(t);
        return;
      }
      t.targetStart = e.targetStart;
      const oe = t.target = e.target, pe = t.targetAnchor = e.targetAnchor, C = Kt(e.props), U = C ? n : oe, q = C ? B : pe;
      if (r === "svg" || Ei(oe) ? r = "svg" : (r === "mathml" || Ai(oe)) && (r = "mathml"), K ? (y(
        e.dynamicChildren,
        K,
        U,
        i,
        o,
        r,
        l
      ), pi(e, t, !0)) : a || m(
        e,
        t,
        U,
        q,
        i,
        o,
        r,
        l,
        !1
      ), P)
        C ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : kn(
          t,
          n,
          B,
          d,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const Se = Ds(t.props, F);
        Se && (t.target = Se, kn(
          t,
          Se,
          null,
          d,
          0
        ));
      } else C && kn(
        t,
        oe,
        pe,
        d,
        1
      );
      on(t, P);
    }
  },
  remove(e, t, n, { um: s, o: { remove: i } }, o) {
    const {
      shapeFlag: r,
      children: l,
      anchor: a,
      targetStart: d,
      targetAnchor: c,
      target: m,
      props: y
    } = e, M = Kt(y), F = o || !M, k = Et.get(e);
    if (k && (k.flags |= 8, Et.delete(e)), m && (i(d), i(c)), o && i(a), !k && (M || m) && r & 16)
      for (let L = 0; L < l.length; L++) {
        const $ = l[L];
        s(
          $,
          t,
          n,
          F,
          !!$.dynamicChildren
        );
      }
  },
  move: kn,
  hydrate: Ml
};
function kn(e, t, n, { o: { insert: s }, m: i }, o = 2) {
  o === 0 && (e.targetStart && s(e.targetStart, t, n), s(e.targetAnchor, t, n), n = e.targetAnchor);
  const { el: r, anchor: l, shapeFlag: a, children: d, props: c } = e, m = o === 2;
  if (m && s(r, t, n), !Et.has(e) && (!m || Kt(c)) && a & 16)
    for (let y = 0; y < d.length; y++)
      i(
        d[y],
        t,
        n,
        2
      );
  m && s(l, t, n);
}
function Ml(e, t, n, s, i, o, {
  o: { nextSibling: r, parentNode: l, querySelector: a, insert: d, createText: c }
}, m) {
  function y(L, $) {
    let P = $;
    for (; P; ) {
      if (P && P.nodeType === 8) {
        if (P.data === "teleport start anchor")
          t.targetStart = P;
        else if (P.data === "teleport anchor") {
          t.targetAnchor = P, L._lpa = t.targetAnchor && r(t.targetAnchor);
          break;
        }
      }
      P = r(P);
    }
  }
  function M(L, $) {
    $.anchor = m(
      r(L),
      $,
      l(L),
      n,
      s,
      i,
      o
    );
  }
  const F = t.target = Ds(
    t.props,
    a
  ), k = Kt(t.props);
  if (F) {
    const L = F._lpa || F.firstChild;
    t.shapeFlag & 16 && (k ? (M(e, t), y(F, L), t.targetAnchor || Vs(
      F,
      t,
      c,
      d,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(e) === F ? e : null
    )) : (t.anchor = r(e), y(F, L), t.targetAnchor || Vs(F, t, c, d), m(
      L && r(L),
      t,
      F,
      n,
      s,
      i,
      o
    ))), on(t, k);
  } else k && t.shapeFlag & 16 && (M(e, t), t.targetStart = e, t.targetAnchor = r(e));
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
  else if (e.transition = t, e.type === de && H(e.children)) {
    const n = er(e.children, !1);
    n && zn(n, t);
  }
}
function Ks(e) {
  if (e.component)
    return Ks(e.component.subTree);
  if (e.type === de) {
    const t = H(e.children) && er(e.children, !1);
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
    Ce({ name: e.name }, t, { setup: e })
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
  if (H(e)) {
    e.forEach(
      (k, L) => dn(
        k,
        t && (H(t) ? t[L] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (Xt(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && dn(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? ds(s.component) : s.el, r = i ? null : o, { i: l, r: a } = e, d = t && t.r, c = l.refs === ue ? l.refs = {} : l.refs, m = l.setupState, y = /* @__PURE__ */ ie(m), M = m === ue ? lo : (k) => Ri(c, k) ? !1 : ee(y, k), F = (k, L) => !(L && Ri(c, L));
  if (d != null && d !== a) {
    if (Ii(t), he(d))
      c[d] = null, M(d) && (m[d] = null);
    else if (/* @__PURE__ */ Re(d)) {
      const k = t;
      F(d, k.k) && (d.value = null), k.k && (c[k.k] = null);
    }
  }
  if (z(a))
    Cn(a, l, 12, [r, c]);
  else {
    const k = he(a), L = /* @__PURE__ */ Re(a);
    if (k || L) {
      const $ = () => {
        if (e.f) {
          const P = k ? M(a) ? m[a] : c[a] : F() || !e.k ? a.value : c[e.k];
          if (i)
            H(P) && Qs(P, o);
          else if (H(P))
            P.includes(o) || P.push(o);
          else if (k)
            c[a] = [o], M(a) && (m[a] = c[a]);
          else {
            const K = [o];
            F(a, e.k) && (a.value = K), e.k && (c[e.k] = K);
          }
        } else k ? (c[a] = r, M(a) && (m[a] = r)) : L && (F(a, e.k) && (a.value = r), e.k && (c[e.k] = r));
      };
      if (r) {
        const P = () => {
          $(), Jn.delete(e);
        };
        P.id = -1, Jn.set(e, P), ke(P, n);
      } else
        Ii(e), $();
    }
  }
}
function Ii(e) {
  const t = Jn.get(e);
  t && (t.flags |= 8, Jn.delete(e));
}
is().requestIdleCallback;
is().cancelIdleCallback;
const Xt = (e) => !!e.type.__asyncLoader, fi = (e) => e.type.__isKeepAlive;
function El(e, t) {
  zo(e, "a", t);
}
function Al(e, t) {
  zo(e, "da", t);
}
function zo(e, t, n = Fe) {
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
function as(e, t, n = Fe, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...r) => {
      ct();
      const l = Sn(n), a = Xe(t, n, e, r);
      return l(), ft(), a;
    });
    return s ? i.unshift(o) : i.push(o), o;
  }
}
const St = (e) => (t, n = Fe) => {
  (!xn || e === "sp") && as(e, (...s) => t(...s), n);
}, Il = St("bm"), Jo = St("m"), Pl = St(
  "bu"
), kl = St("u"), jl = St(
  "bum"
), qo = St("um"), Fl = St(
  "sp"
), Nl = St("rtg"), $l = St("rtc");
function Ll(e, t = Fe) {
  as("ec", e, t);
}
const Dl = /* @__PURE__ */ Symbol.for("v-ndc");
function mt(e, t, n, s) {
  let i;
  const o = n, r = H(e);
  if (r || he(e)) {
    const l = r && /* @__PURE__ */ jt(e);
    let a = !1, d = !1;
    l && (a = !/* @__PURE__ */ He(e), d = /* @__PURE__ */ dt(e), e = os(e)), i = new Array(e.length);
    for (let c = 0, m = e.length; c < m; c++)
      i[c] = t(
        a ? d ? Ft(Be(e[c])) : Be(e[c]) : e[c],
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
        const c = l[a];
        i[a] = t(e[c], c, a, o);
      }
    }
  else
    i = [];
  return i;
}
function Vl(e, t, n, s, i, o) {
  if (n == null && (n = {}), Ae.ce || Ae.parent && Xt(Ae.parent) && Ae.parent.ce) {
    const d = n, c = Object.keys(d).length > 0;
    return G(), yn(
      de,
      null,
      [ut("slot", d, s)],
      c ? -2 : 64
    );
  }
  let r = e[t];
  r && r._c && (r._d = !1);
  const l = wt.length;
  G();
  let a;
  try {
    const d = r && Yo(r(n)), c = n.key || o || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    d && d.key;
    a = yn(
      de,
      {
        key: (c && !Ge(c) ? c : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!d && s ? "_fb" : "")
      },
      d || (s ? s() : []),
      d && e._ === 1 ? 64 : -2
    );
  } catch (d) {
    for (let c = wt.length; c > l; c--) gi();
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
  /* @__PURE__ */ Ce(/* @__PURE__ */ Object.create(null), {
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
      const y = r[t];
      if (y !== void 0)
        switch (y) {
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
    let c, m;
    if (d)
      return t === "$attrs" && Ee(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (c = l.__cssModules) && (c = c[t])
    )
      return c;
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
  return H(e) ? e.reduce(
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
    created: c,
    beforeMount: m,
    mounted: y,
    beforeUpdate: M,
    updated: F,
    activated: k,
    deactivated: L,
    beforeDestroy: $,
    beforeUnmount: P,
    destroyed: K,
    unmounted: R,
    render: J,
    renderTracked: j,
    renderTriggered: B,
    errorCaptured: Z,
    serverPrefetch: oe,
    // public API
    expose: pe,
    inheritAttrs: C,
    // assets
    components: U,
    directives: q,
    filters: Se
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
      const le = o[Q], Ie = z(le) ? le.bind(n, n) : z(le.get) ? le.get.bind(n, n) : at, Ze = !z(le) && z(le.set) ? le.set.bind(n) : at, ze = tt({
        get: Ie,
        set: Ze
      });
      Object.defineProperty(s, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => ze.value,
        set: (Ne) => ze.value = Ne
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
  c && ki(c, e, "c");
  function ye(Q, le) {
    H(le) ? le.forEach((Ie) => Q(Ie.bind(n))) : le && Q(le.bind(n));
  }
  if (ye(Il, m), ye(Jo, y), ye(Pl, M), ye(kl, F), ye(El, k), ye(Al, L), ye(Ll, Z), ye($l, j), ye(Nl, B), ye(jl, P), ye(qo, R), ye(Fl, oe), H(pe))
    if (pe.length) {
      const Q = e.exposed || (e.exposed = {});
      pe.forEach((le) => {
        Object.defineProperty(Q, le, {
          get: () => n[le],
          set: (Ie) => n[le] = Ie,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  J && e.render === at && (e.render = J), C != null && (e.inheritAttrs = C), U && (e.components = U), q && (e.directives = q), oe && Wo(e);
}
function Bl(e, t, n = at) {
  H(e) && (e = Us(e));
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
  Xe(
    H(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Go(e, t, n, s) {
  let i = s.includes(".") ? Ko(n, s) : () => n[s];
  if (he(e)) {
    const o = t[e];
    z(o) && Ms(i, o);
  } else if (z(e))
    Ms(i, e.bind(n));
  else if (ae(e))
    if (H(e))
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
  data: ji,
  props: Fi,
  emits: Fi,
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
  provide: ji,
  inject: Wl
};
function ji(e, t) {
  return t ? e ? function() {
    return Ce(
      z(e) ? e.call(this, this) : e,
      z(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Wl(e, t) {
  return rn(Us(e), Us(t));
}
function Us(e) {
  if (H(e)) {
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
  return e ? Ce(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Fi(e, t) {
  return e ? H(e) && H(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ce(
    /* @__PURE__ */ Object.create(null),
    Pi(e),
    Pi(t ?? {})
  ) : t;
}
function zl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ce(/* @__PURE__ */ Object.create(null), e);
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
    z(s) || (s = Ce({}, s)), i != null && !ae(i) && (i = null);
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
      set config(c) {
      },
      use(c, ...m) {
        return r.has(c) || (c && z(c.install) ? (r.add(c), c.install(d, ...m)) : z(c) && (r.add(c), c(d, ...m))), d;
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), d;
      },
      component(c, m) {
        return m ? (o.components[c] = m, d) : o.components[c];
      },
      directive(c, m) {
        return m ? (o.directives[c] = m, d) : o.directives[c];
      },
      mount(c, m, y) {
        if (!a) {
          const M = d._ceVNode || ut(s, i);
          return M.appContext = o, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(M, c, y), a = !0, d._container = c, c.__vue_app__ = d, ds(M.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        a && (Xe(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(c, m) {
        return o.provides[c] = m, d;
      },
      runWithContext(c) {
        const m = Zt;
        Zt = d;
        try {
          return c();
        } finally {
          Zt = m;
        }
      }
    };
    return d;
  };
}
let Zt = null;
const Yl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${qe(t)}Modifiers`] || e[`${Nt(t)}Modifiers`];
function Gl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ue;
  let i = n;
  const o = t.startsWith("update:"), r = o && Yl(s, t.slice(7));
  r && (r.trim && (i = n.map((c) => he(c) ? c.trim() : c)), r.number && (i = i.map(ss)));
  let l, a = s[l = bs(t)] || // also try camelCase event handler (#2249)
  s[l = bs(qe(t))];
  !a && o && (a = s[l = bs(Nt(t))]), a && Xe(
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
    e.emitted[l] = !0, Xe(
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
      const c = Qo(d, t, !0);
      c && (l = !0, Ce(r, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (ae(e) && s.set(e, null), null) : (H(o) ? o.forEach((a) => r[a] = null) : Ce(r, o), ae(e) && s.set(e, r), r);
}
function us(e, t) {
  return !e || !es(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Nt(t)) || ee(e, t));
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
    renderCache: c,
    props: m,
    data: y,
    setupState: M,
    ctx: F,
    inheritAttrs: k
  } = e, L = Wn(e);
  let $, P;
  try {
    if (n.shapeFlag & 4) {
      const R = i || s, J = R;
      $ = ot(
        d.call(
          J,
          R,
          c,
          m,
          M,
          y,
          F
        )
      ), P = l;
    } else {
      const R = t;
      $ = ot(
        R.length > 1 ? R(
          m,
          { attrs: l, slots: r, emit: a }
        ) : R(
          m,
          null
        )
      ), P = t.props ? l : Zl(l);
    }
  } catch (R) {
    wt.length = 0, rs(R, e, 1), $ = ut(Ue);
  }
  let K = $;
  if (P && k !== !1) {
    const R = Object.keys(P), { shapeFlag: J } = K;
    R.length && J & 7 && (o && R.some(ts) && (P = Ql(
      P,
      o
    )), K = Qt(K, P, !1, !0));
  }
  if (n.dirs && (K = Qt(K, null, !1, !0), K.dirs = K.dirs ? K.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const R = ls(K.type) && Bo(K) || K;
    zn(R, n.transition);
  }
  return $ = K, Wn(L), $;
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
      const c = t.dynamicProps;
      for (let m = 0; m < c.length; m++) {
        const y = c[m];
        if (tr(r, s, y) && !us(d, y))
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
  return n === "style" && ae(s) && ae(i) ? !Ct(s, i) : s !== i;
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
      const c = e.vnode.dynamicProps;
      for (let m = 0; m < c.length; m++) {
        let y = c[m];
        if (us(e.emitsOptions, y))
          continue;
        const M = t[y];
        if (a)
          if (ee(o, y))
            M !== o[y] && (o[y] = M, d = !0);
          else {
            const F = qe(y);
            i[F] = Ws(
              a,
              l,
              F,
              M,
              e,
              !1
            );
          }
        else
          M !== o[y] && (o[y] = M, d = !0);
      }
    }
  } else {
    or(e, t, i, o) && (d = !0);
    let c;
    for (const m in l)
      (!t || // for camelCase
      !ee(t, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Nt(m)) === m || !ee(t, c))) && (a ? n && // for camelCase
      (n[m] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[m] = Ws(
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
  d && bt(e.attrs, "set", "");
}
function or(e, t, n, s) {
  const [i, o] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let a in t) {
      if (an(a))
        continue;
      const d = t[a];
      let c;
      i && ee(i, c = qe(a)) ? !o || !o.includes(c) ? n[c] = d : (l || (l = {}))[c] = d : us(e.emitsOptions, a) || (!(a in s) || d !== s[a]) && (s[a] = d, r = !0);
    }
  if (o) {
    const a = /* @__PURE__ */ ie(n), d = l || ue;
    for (let c = 0; c < o.length; c++) {
      const m = o[c];
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
          const c = Sn(i);
          s = d[n] = a.call(
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
    ] && (s === "" || s === Nt(n)) && (s = !0));
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
    const c = (m) => {
      a = !0;
      const [y, M] = rr(m, t, !0);
      Ce(r, y), M && l.push(...M);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return ae(e) && s.set(e, Ht), Ht;
  if (H(o))
    for (let c = 0; c < o.length; c++) {
      const m = qe(o[c]);
      Li(m) && (r[m] = ue);
    }
  else if (o)
    for (const c in o) {
      const m = qe(c);
      if (Li(m)) {
        const y = o[c], M = r[m] = H(y) || z(y) ? { type: y } : Ce({}, y), F = M.type;
        let k = !1, L = !0;
        if (H(F))
          for (let $ = 0; $ < F.length; ++$) {
            const P = F[$], K = z(P) && P.name;
            if (K === "Boolean") {
              k = !0;
              break;
            } else K === "String" && (L = !1);
          }
        else
          k = z(F) && F.name === "Boolean";
        M[
          0
          /* shouldCast */
        ] = k, M[
          1
          /* shouldCastTrue */
        ] = L, (k || ee(M, "default")) && l.push(m);
      }
    }
  const d = [r, l];
  return ae(e) && s.set(e, d), d;
}
function Li(e) {
  return e[0] !== "$" && !an(e);
}
const di = (e) => e === "_" || e === "_ctx" || e === "$stable", hi = (e) => H(e) ? e.map(ot) : [ot(e)], oa = (e, t, n) => {
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
    setElementText: c,
    parentNode: m,
    nextSibling: y,
    setScopeId: M = at,
    insertStaticContent: F
  } = e, k = (u, p, v, S = null, x = null, _ = null, E = void 0, A = null, T = !!p.dynamicChildren) => {
    if (u === p)
      return;
    u && !nn(u, p) && (S = ht(u), Ne(u, x, _, !0), u = null), p.patchFlag === -2 && (T = !1, p.dynamicChildren = null), p.dynamicChildren && u && u.dynamicChildren && u.dynamicChildren.hasOnce && (p.dynamicChildren === Ht && (p.dynamicChildren = []), p.dynamicChildren.hasOnce = !0);
    const { type: w, ref: D, shapeFlag: I } = p;
    switch (w) {
      case cs:
        L(u, p, v, S);
        break;
      case Ue:
        $(u, p, v, S);
        break;
      case As:
        u == null && P(p, v, S, E);
        break;
      case de:
        U(
          u,
          p,
          v,
          S,
          x,
          _,
          E,
          A,
          T
        );
        break;
      default:
        I & 1 ? J(
          u,
          p,
          v,
          S,
          x,
          _,
          E,
          A,
          T
        ) : I & 6 ? q(
          u,
          p,
          v,
          S,
          x,
          _,
          E,
          A,
          T
        ) : (I & 64 || I & 128) && w.process(
          u,
          p,
          v,
          S,
          x,
          _,
          E,
          A,
          T,
          Ot
        );
    }
    D != null && x ? dn(D, u && u.ref, _, p || u, !p) : D == null && u && u.ref != null && dn(u.ref, null, _, u, !0);
  }, L = (u, p, v, S) => {
    if (u == null)
      s(
        p.el = l(p.children),
        v,
        S
      );
    else {
      const x = p.el = u.el;
      p.children !== u.children && d(x, p.children);
    }
  }, $ = (u, p, v, S) => {
    u == null ? s(
      p.el = a(p.children || ""),
      v,
      S
    ) : p.el = u.el;
  }, P = (u, p, v, S) => {
    [u.el, u.anchor] = F(
      u.children,
      p,
      v,
      S,
      u.el,
      u.anchor
    );
  }, K = ({ el: u, anchor: p }, v, S) => {
    let x;
    for (; u && u !== p; )
      x = y(u), s(u, v, S), u = x;
    s(p, v, S);
  }, R = ({ el: u, anchor: p }) => {
    let v;
    for (; u && u !== p; )
      v = y(u), i(u), u = v;
    i(p);
  }, J = (u, p, v, S, x, _, E, A, T) => {
    if (p.type === "svg" ? E = "svg" : p.type === "math" && (E = "mathml"), u == null)
      j(
        p,
        v,
        S,
        x,
        _,
        E,
        A,
        T
      );
    else {
      const w = u.el && u.el._isVueCE ? u.el : null;
      try {
        w && w._beginPatch(), oe(
          u,
          p,
          x,
          _,
          E,
          A,
          T
        );
      } finally {
        w && w._endPatch();
      }
    }
  }, j = (u, p, v, S, x, _, E, A) => {
    let T, w;
    const { props: D, shapeFlag: I, transition: V, dirs: W } = u;
    if (T = u.el = r(
      u.type,
      _,
      D && D.is,
      D
    ), I & 8 ? c(T, u.children) : I & 16 && Z(
      u.children,
      T,
      null,
      S,
      x,
      Es(u, _),
      E,
      A
    ), W && Lt(u, null, S, "created"), B(T, u, u.scopeId, E, S), D) {
      for (const X in D)
        X !== "value" && !an(X) && o(T, X, null, D[X], _, S);
      "value" in D && o(T, "value", null, D.value, _), (w = D.onVnodeBeforeMount) && Qe(w, S, u);
    }
    W && Lt(u, null, S, "beforeMount");
    const Y = ca(x, V);
    Y && V.beforeEnter(T), s(T, p, v), ((w = D && D.onVnodeMounted) || Y || W) && ke(() => {
      w && Qe(w, S, u), Y && V.enter(T), W && Lt(u, null, S, "mounted");
    }, x);
  }, B = (u, p, v, S, x) => {
    if (v && M(u, v), S)
      for (let _ = 0; _ < S.length; _++)
        M(u, S[_]);
    if (x) {
      let _ = x.subTree;
      if (p === _ || fr(_.type) && (_.ssContent === p || _.ssFallback === p)) {
        const E = x.vnode;
        B(
          u,
          E,
          E.scopeId,
          E.slotScopeIds,
          x.parent
        );
      }
    }
  }, Z = (u, p, v, S, x, _, E, A, T = 0) => {
    for (let w = T; w < u.length; w++) {
      const D = u[w] = A ? yt(u[w]) : ot(u[w]);
      k(
        null,
        D,
        p,
        v,
        S,
        x,
        _,
        E,
        A
      );
    }
  }, oe = (u, p, v, S, x, _, E) => {
    const A = p.el = u.el;
    let { patchFlag: T, dynamicChildren: w, dirs: D } = p;
    T |= u.patchFlag & 16;
    const I = u.props || ue, V = p.props || ue;
    let W;
    if (v && Dt(v, !1), (W = V.onVnodeBeforeUpdate) && Qe(W, v, p, u), D && Lt(p, u, v, "beforeUpdate"), v && Dt(v, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    w && (!u.dynamicChildren || u.dynamicChildren.length !== w.length) && (T = 0, E = !1, w = null), (I.innerHTML && V.innerHTML == null || I.textContent && V.textContent == null) && c(A, ""), w ? pe(
      u.dynamicChildren,
      w,
      A,
      v,
      S,
      Es(p, x),
      _
    ) : E || le(
      u,
      p,
      A,
      null,
      v,
      S,
      Es(p, x),
      _,
      !1
    ), T > 0) {
      if (T & 16)
        C(A, I, V, v, x);
      else if (T & 2 && I.class !== V.class && o(A, "class", null, V.class, x), T & 4 && o(A, "style", I.style, V.style, x), T & 8) {
        const Y = p.dynamicProps;
        for (let X = 0; X < Y.length; X++) {
          const te = Y[X], fe = I[te], xe = V[te];
          (xe !== fe || te === "value") && o(A, te, fe, xe, x, v);
        }
      }
      T & 1 && u.children !== p.children && c(A, p.children);
    } else !E && w == null && C(A, I, V, v, x);
    ((W = V.onVnodeUpdated) || D) && ke(() => {
      W && Qe(W, v, p, u), D && Lt(p, u, v, "updated");
    }, S);
  }, pe = (u, p, v, S, x, _, E) => {
    for (let A = 0; A < p.length; A++) {
      const T = u[A], w = p[A], D = T.el || zs(T), I = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        D && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (T.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !nn(T, w) || // - In the case of a component, it could contain anything.
        T.shapeFlag & 198) ? m(D) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      k(
        T,
        w,
        I,
        null,
        S,
        x,
        _,
        E,
        !0
      );
    }
  }, C = (u, p, v, S, x) => {
    if (p !== v) {
      if (p !== ue)
        for (const _ in p)
          !an(_) && !(_ in v) && o(
            u,
            _,
            p[_],
            null,
            x,
            S
          );
      for (const _ in v) {
        if (an(_)) continue;
        const E = v[_], A = p[_];
        E !== A && _ !== "value" && o(u, _, A, E, x, S);
      }
      "value" in v && o(u, "value", p.value, v.value, x);
    }
  }, U = (u, p, v, S, x, _, E, A, T) => {
    const w = p.el = u ? u.el : l(""), D = p.anchor = u ? u.anchor : l("");
    let { patchFlag: I, dynamicChildren: V, slotScopeIds: W } = p;
    W && (A = A ? A.concat(W) : W), u == null ? (s(w, v, S), s(D, v, S), Z(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      v,
      D,
      x,
      _,
      E,
      A,
      T
    )) : I > 0 && I & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === V.length ? (pe(
      u.dynamicChildren,
      V,
      v,
      x,
      _,
      E,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || x && p === x.subTree) && pi(
      u,
      p,
      !0
      /* shallow */
    )) : le(
      u,
      p,
      v,
      D,
      x,
      _,
      E,
      A,
      T
    );
  }, q = (u, p, v, S, x, _, E, A, T) => {
    p.slotScopeIds = A, u == null ? p.shapeFlag & 512 ? x.ctx.activate(
      p,
      v,
      S,
      E,
      T
    ) : Se(
      p,
      v,
      S,
      x,
      _,
      E,
      T
    ) : We(u, p, T);
  }, Se = (u, p, v, S, x, _, E) => {
    const A = u.component = ya(
      u,
      S,
      x
    );
    if (fi(u) && (A.ctx.renderer = Ot), xa(A, !1, E), A.asyncDep) {
      if (x && x.registerDep(
        A,
        ye,
        E,
        _
      ), !u.el) {
        const T = A.subTree = ut(Ue);
        $(null, T, p, v), u.placeholder = T.el;
      }
    } else
      ye(
        A,
        u,
        p,
        v,
        x,
        _,
        E
      );
  }, We = (u, p, v) => {
    const S = p.component = u.component;
    if (ea(u, p, v))
      if (S.asyncDep && !S.asyncResolved) {
        p.el = u.el, p.placeholder = u.placeholder, Q(S, p, v);
        return;
      } else
        S.next = p, S.update();
    else
      p.el = u.el, p.placeholder = u.placeholder, S.vnode = p;
  }, ye = (u, p, v, S, x, _, E) => {
    const A = () => {
      if (u.isMounted) {
        let { next: I, bu: V, u: W, parent: Y, vnode: X } = u;
        {
          const Me = cr(u);
          if (Me) {
            I && (I.el = X.el, Q(u, I, E)), Me.asyncDep.then(() => {
              ke(() => {
                u.isUnmounted || w();
              }, x);
            });
            return;
          }
        }
        let te = I, fe;
        Dt(u, !1), I ? (I.el = X.el, Q(u, I, E)) : I = X, V && Dn(V), (fe = I.props && I.props.onVnodeBeforeUpdate) && Qe(fe, Y, I, X), Dt(u, !0);
        const xe = Ni(u), $e = u.subTree;
        u.subTree = xe, k(
          $e,
          xe,
          // parent may have changed if it's in a teleport
          m($e.el),
          // anchor may have changed if it's in a fragment
          ht($e),
          u,
          x,
          _
        ), I.el = xe.el, te === null && ta(u, xe.el), W && ke(W, x), (fe = I.props && I.props.onVnodeUpdated) && ke(
          () => Qe(fe, Y, I, X),
          x
        );
      } else {
        let I;
        const { el: V, props: W } = p, { bm: Y, m: X, parent: te, root: fe, type: xe } = u, $e = Xt(p);
        Dt(u, !1), Y && Dn(Y), !$e && (I = W && W.onVnodeBeforeMount) && Qe(I, te, p), Dt(u, !0);
        {
          fe.ce && fe.ce._hasShadowRoot() && fe.ce._injectChildStyle(
            xe,
            u.parent ? u.parent.type : void 0
          );
          const Me = u.subTree = Ni(u);
          k(
            null,
            Me,
            v,
            S,
            u,
            x,
            _
          ), p.el = Me.el;
        }
        if (X && ke(X, x), !$e && (I = W && W.onVnodeMounted)) {
          const Me = p;
          ke(
            () => Qe(I, te, Me),
            x
          );
        }
        (p.shapeFlag & 256 || te && Xt(te.vnode) && te.vnode.shapeFlag & 256) && u.a && ke(u.a, x), u.isMounted = !0, p = v = S = null;
      }
    };
    u.scope.on();
    const T = u.effect = new vo(A);
    u.scope.off();
    const w = u.update = T.run.bind(T), D = u.job = T.runIfDirty.bind(T);
    D.i = u, D.id = u.uid, T.scheduler = () => ci(D), Dt(u, !0), w();
  }, Q = (u, p, v) => {
    p.component = u;
    const S = u.vnode.props;
    u.vnode = p, u.next = null, sa(u, p.props, S, v), la(u, p.children, v), ct(), Fo(u), ft();
  }, le = (u, p, v, S, x, _, E, A, T = !1) => {
    const w = u && u.children, D = u ? u.shapeFlag : 0, I = p.children, { patchFlag: V, shapeFlag: W } = p;
    if (V > 0) {
      if (V & 128) {
        Ze(
          w,
          I,
          v,
          S,
          x,
          _,
          E,
          A,
          T
        );
        return;
      } else if (V & 256) {
        Ie(
          w,
          I,
          v,
          S,
          x,
          _,
          E,
          A,
          T
        );
        return;
      }
    }
    W & 8 ? (D & 16 && be(w, x, _), I !== w && c(v, I)) : D & 16 ? W & 16 ? Ze(
      w,
      I,
      v,
      S,
      x,
      _,
      E,
      A,
      T
    ) : be(w, x, _, !0) : (D & 8 && c(v, ""), W & 16 && Z(
      I,
      v,
      S,
      x,
      _,
      E,
      A,
      T
    ));
  }, Ie = (u, p, v, S, x, _, E, A, T) => {
    u = u || Ht, p = p || Ht;
    const w = u.length, D = p.length, I = Math.min(w, D);
    let V;
    for (V = 0; V < I; V++) {
      const W = p[V] = T ? yt(p[V]) : ot(p[V]);
      k(
        u[V],
        W,
        v,
        null,
        x,
        _,
        E,
        A,
        T
      );
    }
    w > D ? be(
      u,
      x,
      _,
      !0,
      !1,
      I
    ) : Z(
      p,
      v,
      S,
      x,
      _,
      E,
      A,
      T,
      I
    );
  }, Ze = (u, p, v, S, x, _, E, A, T) => {
    let w = 0;
    const D = p.length;
    let I = u.length - 1, V = D - 1;
    for (; w <= I && w <= V; ) {
      const W = u[w], Y = p[w] = T ? yt(p[w]) : ot(p[w]);
      if (nn(W, Y))
        k(
          W,
          Y,
          v,
          null,
          x,
          _,
          E,
          A,
          T
        );
      else
        break;
      w++;
    }
    for (; w <= I && w <= V; ) {
      const W = u[I], Y = p[V] = T ? yt(p[V]) : ot(p[V]);
      if (nn(W, Y))
        k(
          W,
          Y,
          v,
          null,
          x,
          _,
          E,
          A,
          T
        );
      else
        break;
      I--, V--;
    }
    if (w > I) {
      if (w <= V) {
        const W = V + 1, Y = W < D ? p[W].el : S;
        for (; w <= V; )
          k(
            null,
            p[w] = T ? yt(p[w]) : ot(p[w]),
            v,
            Y,
            x,
            _,
            E,
            A,
            T
          ), w++;
      }
    } else if (w > V)
      for (; w <= I; )
        Ne(u[w], x, _, !0), w++;
    else {
      const W = w, Y = w, X = /* @__PURE__ */ new Map();
      for (w = Y; w <= V; w++) {
        const Oe = p[w] = T ? yt(p[w]) : ot(p[w]);
        Oe.key != null && X.set(Oe.key, w);
      }
      let te, fe = 0;
      const xe = V - Y + 1;
      let $e = !1, Me = 0;
      const Tt = new Array(xe);
      for (w = 0; w < xe; w++) Tt[w] = 0;
      for (w = W; w <= I; w++) {
        const Oe = u[w];
        if (fe >= xe) {
          Ne(Oe, x, _, !0);
          continue;
        }
        let Le;
        if (Oe.key != null)
          Le = X.get(Oe.key);
        else
          for (te = Y; te <= V; te++)
            if (Tt[te - Y] === 0 && nn(Oe, p[te])) {
              Le = te;
              break;
            }
        Le === void 0 ? Ne(Oe, x, _, !0) : (Tt[Le - Y] = w + 1, Le >= Me ? Me = Le : $e = !0, k(
          Oe,
          p[Le],
          v,
          null,
          x,
          _,
          E,
          A,
          T
        ), fe++);
      }
      const Tn = $e ? fa(Tt) : Ht;
      for (te = Tn.length - 1, w = xe - 1; w >= 0; w--) {
        const Oe = Y + w, Le = p[Oe], $t = p[Oe + 1], De = Oe + 1 < D ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          $t.el || zs($t)
        ) : S;
        Tt[w] === 0 ? k(
          null,
          Le,
          v,
          De,
          x,
          _,
          E,
          A,
          T
        ) : $e && (te < 0 || w !== Tn[te] ? ze(Le, v, De, 2) : te--);
      }
    }
  }, ze = (u, p, v, S, x = null) => {
    const { el: _, type: E, transition: A, children: T, shapeFlag: w } = u;
    if (w & 6) {
      ze(u.component.subTree, p, v, S);
      return;
    }
    if (w & 128) {
      u.suspense.move(p, v, S);
      return;
    }
    if (w & 64) {
      E.move(u, p, v, Ot);
      return;
    }
    if (E === de) {
      s(_, p, v);
      for (let I = 0; I < T.length; I++)
        ze(T[I], p, v, S);
      s(u.anchor, p, v);
      return;
    }
    if (E === As) {
      K(u, p, v);
      return;
    }
    if (S !== 2 && w & 1 && A)
      if (S === 0)
        A.persisted && !_[Os] ? s(_, p, v) : (A.beforeEnter(_), s(_, p, v), ke(() => A.enter(_), x));
      else {
        const { leave: I, delayLeave: V, afterLeave: W } = A, Y = () => {
          u.ctx.isUnmounted ? i(_) : s(_, p, v);
        }, X = () => {
          const te = _._isLeaving || !!_[Os];
          _._isLeaving && _[Os](
            !0
            /* cancelled */
          ), A.persisted && !te ? Y() : I(_, () => {
            Y(), W && W();
          });
        };
        V ? V(_, Y, X) : X();
      }
    else
      s(_, p, v);
  }, Ne = (u, p, v, S = !1, x = !1) => {
    const {
      type: _,
      props: E,
      ref: A,
      children: T,
      dynamicChildren: w,
      shapeFlag: D,
      patchFlag: I,
      dirs: V,
      cacheIndex: W,
      memo: Y
    } = u;
    if ((I === -2 || w && w.hasOnce) && (x = !1), A != null && (ct(), dn(A, null, v, u, !0), ft()), W != null && (!u.ctx || u.ctx === p) && (p.renderCache[W] = void 0), D & 256) {
      p.ctx.deactivate(u);
      return;
    }
    const X = D & 1 && V, te = !Xt(u);
    let fe;
    if (te && (fe = E && E.onVnodeBeforeUnmount) && Qe(fe, p, u), D & 6)
      ps(u.component, v, S);
    else {
      if (D & 128) {
        u.suspense.unmount(v, S);
        return;
      }
      X && Lt(u, null, p, "beforeUnmount"), D & 64 ? u.type.remove(
        u,
        p,
        v,
        Ot,
        S
      ) : w && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !w.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== de || I > 0 && I & 64) ? be(
        w,
        p,
        v,
        !1,
        !0
      ) : (_ === de && I & 384 || !x && D & 16) && be(T, p, v), S && Mn(u);
    }
    const xe = Y != null && W == null;
    (te && (fe = E && E.onVnodeUnmounted) || X || xe) && ke(() => {
      fe && Qe(fe, p, u), X && Lt(u, null, p, "unmounted"), xe && (u.el = null);
    }, v);
  }, Mn = (u) => {
    const { type: p, el: v, anchor: S, transition: x } = u, _ = p === de;
    if (_ && !x) {
      On(v, S);
      return;
    }
    if (p === As) {
      R(u), x && !x.persisted && x.afterLeave && x.afterLeave();
      return;
    }
    const E = _ ? Ks(u) : u, A = () => {
      _ ? m(v) && On(v, S) : i(v), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (E && E.shapeFlag & 1 && x && !x.persisted) {
      const { leave: T, delayLeave: w } = x, D = E.el, I = () => T(D, A);
      w ? w(D, A, I) : I();
    } else
      A();
  }, On = (u, p) => {
    let v;
    for (; u !== p; )
      v = y(u), i(u), u = v;
    i(p);
  }, ps = (u, p, v) => {
    const { bum: S, scope: x, job: _, subTree: E, um: A, m: T, a: w } = u;
    Di(T), Di(w), S && Dn(S), x.stop(), _ ? (_.flags |= 8, Ne(E, u, p, v)) : u.vnode.el && E && (E.transition = u.vnode.transition, Ne(E, u, p, v)), A && ke(A, p), ke(() => {
      u.isUnmounted = !0;
    }, p);
  }, be = (u, p, v, S = !1, x = !1, _ = 0) => {
    for (let E = _; E < u.length; E++)
      Ne(u[E], p, v, S, x);
  }, ht = (u) => {
    if (u.shapeFlag & 6)
      return ht(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const p = y(u.anchor || u.el), v = p && p[Ho];
    return v ? y(v) : p;
  }, Mt = (u, p, v) => {
    const S = u && p._vnode ? void 0 : u && u.component ? u.component.uid : va();
    yl(() => {
      u == null ? p._vnode && Ne(p._vnode, null, null, !0) : k(
        p._vnode || null,
        u,
        p,
        null,
        null,
        null,
        v
      ), p._vnode = u;
    }, S);
  }, Ot = {
    p: k,
    um: Ne,
    m: ze,
    r: Mn,
    mt: Se,
    mc: Z,
    pc: le,
    pbc: pe,
    n: ht,
    o: e
  };
  return {
    render: Mt,
    hydrate: void 0,
    createApp: ql(Mt)
  };
}
function Es({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Dt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ca(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function pi(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (H(s) && H(i))
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
      let l = i[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = yt(i[o]), l.el = r.el), !n && l.patchFlag !== -2 && pi(r, l)), l.type === cs && (l.patchFlag === -1 && (l = i[o] = yt(l)), l.el = r.el), l.type === Ue && !l.el && (l.el = r.el);
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
  t && t.pendingBranch ? H(e) ? t.effects.push(...e) : t.effects.push(e) : vl(e);
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
  return e.dynamicChildren = vn > 0 ? Ve || Ht : null, gi(), vn > 0 && Ve && Ve.push(e), e;
}
function re(e, t, n, s, i, o) {
  return dr(
    b(
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
    ut(
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
}) => (typeof e == "number" && (e = "" + e), e != null ? he(e) || /* @__PURE__ */ Re(e) || z(e) ? { i: Ae, r: e, k: t, f: !!n } : e : null);
function b(e, t = null, n = null, s = 0, i = null, o = e === de ? 0 : 1, r = !1, l = !1) {
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
  return l ? (Yn(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= he(n) ? 8 : 16), vn > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Ve && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ve.push(a), a;
}
const ut = ha;
function ha(e, t = null, n = null, s = 0, i = null, o = !1) {
  if ((!e || e === Dl) && (e = Ue), fs(e)) {
    const l = Qt(
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
    l && !he(l) && (t.class = It(l)), ae(a) && (/* @__PURE__ */ ui(a) && !H(a) && (a = Ce({}, a)), t.style = Bt(a));
  }
  const r = he(e) ? 1 : fr(e) ? 128 : ls(e) ? 64 : ae(e) ? 4 : z(e) ? 2 : 0;
  return b(
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
  return e ? /* @__PURE__ */ ui(e) || ir(e) ? Ce({}, e) : e : null;
}
function Qt(e, t, n = !1, s = !1) {
  const { props: i, ref: o, patchFlag: r, children: l, transition: a } = e, d = t ? ga(i || {}, t) : i, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && hr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? H(o) ? o.concat(Kn(t)) : [o, Kn(t)] : Kn(t)
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
    ssContent: e.ssContent && Qt(e.ssContent),
    ssFallback: e.ssFallback && Qt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && s && zn(
    c,
    a.clone(c)
  ), c;
}
function Te(e = " ", t = 0) {
  return ut(cs, null, e, t);
}
function et(e = "", t = !1) {
  return t ? (G(), yn(Ue, null, e)) : ut(Ue, null, e);
}
function ot(e) {
  return e == null || typeof e == "boolean" ? ut(Ue) : H(e) ? ut(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : fs(e) ? yt(e) : ut(cs, null, String(e));
}
function yt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Qt(e);
}
function Yn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (H(t))
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
        t.class !== s.class && (t.class = It([t.class, s.class]));
      else if (i === "style")
        t.style = Bt([t.style, s.style]);
      else if (es(i)) {
        const o = t[i], r = s[i];
        r && o !== r && !(H(o) && o.includes(r)) ? t[i] = o ? [].concat(o, r) : r : r == null && o == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !ts(i) && (t[i] = r);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function Qe(e, t, n, s = null) {
  Xe(e, t, 7, [
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
let Fe = null;
const ba = () => Fe || Ae;
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
    (n) => Fe = n
  ), bn = t(
    "__VUE_SSR_SETTERS__",
    (n) => xn = n
  );
}
const Sn = (e) => {
  const t = Fe;
  return Gn(e), e.scope.on(), () => {
    e.scope.off(), Gn(t);
  };
}, Ki = () => {
  Fe && Fe.scope.off(), Gn(null);
};
function gr(e) {
  return e.vnode.shapeFlag & 4;
}
let xn = !1;
function xa(e, t = !1, n = !1) {
  t && bn(t);
  const { props: s, children: i } = e.vnode, o = gr(e);
  na(e, s, o, t), ra(e, i, n || t);
  const r = o ? wa(e, t) : void 0;
  return t && bn(!1), r;
}
function wa(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Kl);
  const { setup: s } = n;
  if (s) {
    ct();
    const i = e.setupContext = s.length > 1 ? Ca(e) : null, o = Sn(e), r = Cn(
      s,
      e,
      0,
      [
        e.props,
        i
      ]
    ), l = ao(r);
    if (ft(), o(), (l || e.sp) && !Xt(e) && Wo(e), l) {
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
  e.render || (e.render = s.render || at);
  {
    const i = Sn(e);
    ct();
    try {
      Hl(e);
    } finally {
      ft(), i();
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
const tt = (e, t) => /* @__PURE__ */ dl(e, t, xn), Ma = "3.5.44";
let Js;
const Bi = typeof window < "u" && window.trustedTypes;
if (Bi)
  try {
    Js = /* @__PURE__ */ Bi.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const vr = Js ? (e) => Js.createHTML(e) : (e) => e, Oa = "http://www.w3.org/2000/svg", Ta = "http://www.w3.org/1998/Math/MathML", vt = typeof document < "u" ? document : null, Ui = vt && /* @__PURE__ */ vt.createElement("template"), Ea = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? vt.createElementNS(Oa, e) : t === "mathml" ? vt.createElementNS(Ta, e) : n ? vt.createElement(e, { is: n }) : vt.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => vt.createTextNode(e),
  createComment: (e) => vt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => vt.querySelector(e),
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
function ja(e, t, n) {
  const s = e.style, i = he(n);
  let o = !1;
  if (n && !i) {
    if (t)
      if (he(t))
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
        !he(t) && t ? t[r] : void 0,
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
const jn = /\s*!important$/;
function ln(e, t, n) {
  if (H(n))
    n.forEach((s) => ln(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    jn.test(n) ? e.setProperty(t, n.replace(jn, ""), "important") : e.setProperty(t, n);
  else {
    const s = Fa(e, t);
    jn.test(n) ? e.setProperty(
      Nt(s),
      n.replace(jn, ""),
      "important"
    ) : e[s] = n;
  }
}
const zi = ["Webkit", "Moz", "ms"], Rs = {};
function Fa(e, t) {
  const n = Rs[t];
  if (n)
    return n;
  let s = qe(t);
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
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && he(s) && n === s;
}
const Ji = "http://www.w3.org/1999/xlink";
function qi(e, t, n, s, i, o = Dr(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ji, t.slice(6, t.length)) : e.setAttributeNS(Ji, t, n) : n == null || o && !po(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : Ge(n) ? String(n) : n
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
function Pt(e, t, n, s) {
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
      Pt(e, l, d, a);
    } else r && ($a(e, l, r, a), o[t] = void 0);
  }
}
const Da = /(Once|Passive|Capture)$/, Va = /^on:?(?:Once|Passive|Capture)$/;
function Ka(e) {
  let t, n;
  for (; (n = e.match(Da)) && !Va.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Nt(e.slice(2)), t];
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
    if (H(i)) {
      const o = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        o.call(s), s._stopped = !0;
      };
      const r = i.slice(), l = [s];
      for (let a = 0; a < r.length && !s._stopped; a++) {
        const d = r[a];
        d && Xe(
          d,
          t,
          5,
          l
        );
      }
    } else
      Xe(
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
  t === "class" ? Ra(e, s, r) : t === "style" ? ja(e, n, s) : es(t) ? ts(t) || La(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : za(e, t, s, r)) ? (Yi(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && qi(e, t, s, r, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Ja(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !he(s))) ? Yi(e, qe(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), qi(e, t, s, r));
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
  return Xi(t) && he(n) ? !1 : t in e;
}
function Ja(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = qe(t);
  return Array.isArray(n) ? n.some((i) => qe(i) === s) : Object.keys(n).some((i) => qe(i) === s);
}
const en = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return H(t) ? (n) => Dn(t, n) : t;
};
function qa(e) {
  e.target.composing = !0;
}
function Zi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const lt = /* @__PURE__ */ Symbol("_assign"), Fn = /* @__PURE__ */ Symbol("_initialValue");
function Ps(e, t, n) {
  return t && (e = e.trim()), n && (e = ss(e)), e;
}
const ks = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
    e.parentNode && (e.type === "text" ? e[Fn] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Fn] = e.defaultValue.replace(/\r\n?/g, `
`))), e[lt] = en(i);
    const o = s || i.props && i.props.type === "number";
    Pt(e, t ? "change" : "input", (r) => {
      r.target.composing || e[lt](Ps(e.value, n, o));
    }), (n || o) && Pt(e, "change", () => {
      e.value = Ps(e.value, n, o);
    }), t || (Pt(e, "compositionstart", qa), Pt(e, "compositionend", Zi), Pt(e, "change", Zi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const i = t ?? "", o = e[Fn];
    delete e[Fn], o !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== o ? e[lt](Ps(e.value, n, s)) : e.value = i;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: i, number: o } }, r) {
    if (e[lt] = en(r), e.composing) return;
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
    e[lt] = en(n), Pt(e, "change", () => {
      const s = e._modelValue, i = wn(e), o = e.checked, r = e[lt];
      if (H(s)) {
        const l = ti(s, i), a = l !== -1;
        if (o && !a)
          r(s.concat(i));
        else if (!o && a) {
          const d = [...s];
          d.splice(l, 1), r(d);
        }
      } else if (_t(s)) {
        const l = new Set(s);
        o ? l.add(i) : l.delete(i), r(l);
      } else
        r(yr(e, o));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: eo,
  beforeUpdate(e, t, n) {
    e[lt] = en(n), eo(e, t, n);
  }
};
function eo(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let i;
  if (H(t))
    i = ti(t, s.props.value) > -1;
  else if (_t(t))
    i = t.has(s.props.value);
  else {
    if (t === n) return;
    i = Ct(t, yr(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const Ya = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, Pt(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => n ? ss(wn(a)) : wn(a)
      ), o = e.multiple, r = o ? _t(e._modelValue) ? new Set(i) : i : i[0], l = e._pendingValue = [
        o,
        o ? H(r) ? i.slice() : i : r
      ];
      try {
        e[lt](r);
      } finally {
        fn(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[lt] = en(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    to(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[lt] = en(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Ga(t, n[1], n[0])) && to(e, t);
  }
};
function Ga(e, t, n) {
  if (!n || H(e)) return Ct(e, t);
  if (_t(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function to(e, t) {
  const n = e.multiple, s = H(t);
  if (!(n && !s && !_t(t))) {
    for (let i = 0, o = e.options.length; i < o; i++) {
      const r = e.options[i], l = wn(r);
      if (n)
        if (s) {
          const a = typeof l;
          a === "string" || a === "number" ? r.selected = t.some((d) => String(d) === String(l)) : r.selected = ti(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (Ct(wn(r), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function wn(e) {
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
    const o = Nt(i.key);
    if (t.some(
      (r) => r === o || Qa[r] === o
    ))
      return e(i);
  }));
}, eu = /* @__PURE__ */ Ce({ patchProp: Wa }, Ea);
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
  return he(e) ? document.querySelector(e) : e;
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
      )) : et("v-if", !0)
    ]));
  }
}), br = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, ru = /* @__PURE__ */ br(ou, [["__scopeId", "data-v-32f7ef2b"]]), lu = { canvases: { portrait: { width: 1088, height: 1920 }, landscape: { width: 1920, height: 1088 } } };
function At(e) {
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
      const d = a, c = typeof d?.position == "string" ? d.position.trim().toLowerCase() : "";
      if (!c || l.has(c)) throw new Error(`${i}:面板位置不能为空或重复。`);
      if (l.add(c), d?.layer !== void 0 && !Number.isSafeInteger(d.layer)) throw new Error(`${i}/${c}:层级必须为安全整数。`);
      if (!d?.slots || typeof d.slots != "object" || !Object.keys(d.slots).length)
        throw new Error(`${i}/${c}:需要槽位坐标。`);
      for (const [m, y] of Object.entries(d.slots)) {
        const M = xr(y);
        if (!m.trim() || !M || M[0] < -r.height / 2 || M[2] > r.height / 2 || M[1] < -r.width / 2 || M[3] > r.width / 2)
          throw new Error(`${i}/${c}/${m}:坐标无效或超出画布。`);
      }
      for (const [m, y] of Object.entries(d.shapes ?? {}))
        if (!d.slots[m] || !vi(y) || y.some(([M, F]) => Math.abs(M) > r.width / 2 || Math.abs(F) > r.height / 2))
          throw new Error(`${i}/${c}/${m}:四边形角点无效、交叉或超出画布。`);
    }
  }
  return n;
}
function xr(e) {
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
    for (const [c, m] of Object.entries(o)) {
      const y = xr(m);
      y && (r[c.trim().toUpperCase()] = y);
    }
    const l = {};
    if (s.shapes && typeof s.shapes == "object")
      for (const [c, m] of Object.entries(s.shapes)) {
        const y = c.trim().toUpperCase();
        r[y] && vi(m) && (l[y] = m.map((M) => M.map(Math.round)));
      }
    const a = {};
    if (s.slotNotes && typeof s.slotNotes == "object" && !Array.isArray(s.slotNotes))
      for (const [c, m] of Object.entries(s.slotNotes)) {
        const y = c.trim().toUpperCase();
        r[y] && typeof m == "string" && m.trim() && (a[y] = m.trim());
      }
    const d = {};
    if (s.slotContents && typeof s.slotContents == "object" && !Array.isArray(s.slotContents))
      for (const [c, m] of Object.entries(s.slotContents)) {
        const y = c.trim().toUpperCase();
        r[y] && Array.isArray(m) && (d[y] = JSON.parse(JSON.stringify(m)));
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
function wr(e) {
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
const zt = 24, we = (e, t, n) => Math.max(t, Math.min(n, e));
function nt(e, t, n = zt) {
  const s = we(Math.round(e.width), n, t.width), i = we(Math.round(e.height), n, t.height);
  return { x: we(Math.round(e.x), 0, t.width - s), y: we(Math.round(e.y), 0, t.height - i), width: s, height: i };
}
function cu(e, t) {
  const [n, s, i, o] = e.slots.F ?? e.slots.C ?? Object.values(e.slots)[0];
  return nt({ x: s + t.width / 2, y: n + t.height / 2, width: o - s, height: i - n }, t);
}
function $n(e, t, n) {
  const s = { ...e, slots: {}, corners: {} };
  n?.layer !== void 0 && (s.layer = n.layer), n?.position && (s.position = n.position);
  for (const [i, [o, r, l, a]] of Object.entries((n ?? hu(e, t, "")).slots))
    i !== "F" && Xn(s, i, { x: r + t.width / 2, y: o + t.height / 2, width: a - r, height: l - o });
  for (const [i, o] of Object.entries(n?.shapes ?? {})) {
    if (i !== "F" && !s.slots[i]) continue;
    const r = i === "F" ? s : Ut(s, i);
    s.corners[i] = o.map(([l, a]) => [(l + t.width / 2 - r.x) / r.width, (a + t.height / 2 - r.y) / r.height]);
  }
  return n?.slotNotes && (s.slotNotes = { ...n.slotNotes }), n?.slotContents && (s.slotContents = JSON.parse(JSON.stringify(n.slotContents))), s;
}
function Hn(e, t) {
  const n = t === "F" ? e : Ut(e, t);
  return (e.corners[t] ?? [[0, 0], [1, 0], [1, 1], [0, 1]]).map(([s, i]) => [n.x + s * n.width, n.y + i * n.height]);
}
function fu(e, t, n, s) {
  const i = n.map(([a, d]) => [we(Math.round(a), 0, s.width), we(Math.round(d), 0, s.height)]);
  if (!vi(i)) return !1;
  const o = Math.min(...i.map((a) => a[0])), r = Math.min(...i.map((a) => a[1])), l = { x: o, y: r, width: Math.max(...i.map((a) => a[0])) - o, height: Math.max(...i.map((a) => a[1])) - r };
  return l.width < (t === "F" ? zt : 1) || l.height < (t === "F" ? zt : 1) ? !1 : (t === "F" ? Object.assign(e, l) : Xn(e, t, l), e.corners[t] = i.map(([a, d]) => [(a - o) / l.width, (d - r) / l.height]), !0);
}
function Ut(e, t) {
  const n = e.slots[t];
  return { x: Math.round(e.x + n.x * e.width), y: Math.round(e.y + n.y * e.height), width: Math.max(1, Math.round(n.width * e.width)), height: Math.max(1, Math.round(n.height * e.height)) };
}
function Xn(e, t, n) {
  e.slots[t] = { x: (n.x - e.x) / e.width, y: (n.y - e.y) / e.height, width: n.width / e.width, height: n.height / e.height };
}
function du(e, t, n) {
  const s = (l) => {
    const a = we(Math.round(l.x), 0, t.width - 1), d = we(Math.round(l.y), 0, t.height - 1);
    return [d - t.height / 2, a - t.width / 2, we(Math.round(l.y + l.height), d + 1, t.height) - t.height / 2, we(Math.round(l.x + l.width), a + 1, t.width) - t.width / 2];
  }, i = Object.fromEntries(Object.keys(e.corners).filter((l) => l === "F" || e.slots[l]).map((l) => [l, Hn(e, l).map(([a, d]) => [we(Math.round(a), 0, t.width) - t.width / 2, we(Math.round(d), 0, t.height) - t.height / 2])])), o = Object.fromEntries(Object.entries(e.slotNotes ?? {}).filter(([l, a]) => (l === "F" || e.slots[l]) && a.trim()).map(([l, a]) => [l, a.trim()])), r = Object.fromEntries(Object.entries(e.slotContents ?? {}).filter(([l, a]) => (l === "F" || e.slots[l]) && a.length).map(([l, a]) => [l, JSON.parse(JSON.stringify(a))]));
  return { position: n, ...e.layer !== void 0 ? { layer: e.layer } : {}, slots: { F: s(e), ...Object.fromEntries(Object.keys(e.slots).map((l) => [l, s(Ut(e, l))])) }, ...Object.keys(i).length ? { shapes: i } : {}, ...Object.keys(o).length ? { slotNotes: o } : {}, ...Object.keys(r).length ? { slotContents: r } : {} };
}
function hu(e, t, n) {
  const s = nt(e, t), i = (r, l, a, d) => [
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
function pu(e, t, n, s, i = !1, o = zt) {
  const r = (m, y, M, F) => {
    if (i) {
      const $ = m + y, K = [...F, Math.round($ / 8) * 8].reduce((R, J) => Math.abs(J - $) < Math.abs(R - $) ? J : R, $ + s + 1);
      return [m, Math.abs(K - $) <= s ? K - m : y];
    }
    let k = 0, L = s + 1;
    for (const $ of [m, m + y / 2, m + y])
      for (const P of [...F, Math.round($ / 8) * 8])
        Math.abs(P - $) < L && (L = Math.abs(P - $), k = P - $);
    return [we(m + (L <= s ? k : 0), 0, M - y), y];
  }, [l, a] = r(e.x, e.width, t.width, [0, t.width / 2, t.width, ...n.flatMap((m) => [m.x, m.x + m.width / 2, m.x + m.width])]), [d, c] = r(e.y, e.height, t.height, [0, t.height / 2, t.height, ...n.flatMap((m) => [m.y, m.y + m.height / 2, m.y + m.height])]);
  return nt({ x: l, y: d, width: a, height: c }, t, o);
}
const gu = { class: "inline" }, mu = { class: "canvas-controls" }, vu = { class: "designer-body" }, yu = { class: "tools" }, bu = ["value"], xu = ["disabled"], wu = ["disabled"], _u = ["disabled"], Cu = { class: "inline" }, Su = ["disabled"], Mu = ["disabled"], Ou = { class: "check" }, Tu = { class: "check" }, Eu = ["onClick"], Au = { class: "inline" }, Ru = ["disabled"], Iu = ["disabled"], Pu = { class: "inline" }, ku = ["disabled"], ju = ["disabled"], Fu = { class: "hint" }, Nu = { class: "canvas-area" }, $u = ["viewBox"], Lu = ["width", "height"], Du = ["data-panel", "onPointerdown", "onDblclick"], Vu = ["points", "fill", "stroke"], Ku = ["x", "y", "width", "height"], Hu = ["title"], Bu = ["data-slot", "onPointerdown", "onDblclick"], Uu = ["points", "fill", "stroke", "stroke-width"], Wu = ["x", "y", "font-size"], zu = ["x", "y", "width", "height"], Ju = ["title"], qu = ["x", "y", "font-size"], Yu = ["data-ctrl-deform", "data-handle", "rx", "x", "y", "width", "height", "fill", "aria-label", "onPointerdown"], Gu = { class: "hint" }, Xu = { class: "properties" }, Zu = ["aria-selected"], Qu = ["aria-selected"], ec = ["value"], tc = ["value"], nc = ["value"], sc = {
  key: 0,
  class: "slot-actions"
}, ic = ["disabled"], oc = { class: "inline" }, rc = ["value", "disabled"], lc = ["value"], ac = ["disabled"], uc = ["value", "placeholder"], cc = {
  key: 1,
  class: "manual-content"
}, fc = { class: "inline" }, dc = ["value", "onChange"], hc = ["value", "onChange"], pc = ["value", "onInput"], gc = ["value", "placeholder", "onInput"], mc = { class: "inline" }, vc = ["disabled", "onClick"], yc = ["disabled", "onClick"], bc = ["onClick"], xc = { class: "slot-list" }, wc = ["onClick"], _c = ["value", "aria-label", "onChange"], Cc = {
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
    function i(g) {
      let f = g, h = 2;
      for (; n.existingIds.includes(f); ) f = `${g}_${h++}`;
      return f;
    }
    const o = /* @__PURE__ */ me({ id: i("my_layout"), label: "自定义版式", description: "", promptMode: n.initialMode ?? "llm", width: 1088, height: 1920, panels: [] }), r = /* @__PURE__ */ me(-1), l = /* @__PURE__ */ me(""), a = /* @__PURE__ */ me(n.initialKey ?? ""), d = /* @__PURE__ */ me(!0), c = /* @__PURE__ */ me(!0), m = /* @__PURE__ */ me(""), y = /* @__PURE__ */ me(!1), M = /* @__PURE__ */ me(), F = /* @__PURE__ */ me(), k = /* @__PURE__ */ me(), L = /* @__PURE__ */ me(1), $ = /* @__PURE__ */ me(1088), P = /* @__PURE__ */ me(1920), K = /* @__PURE__ */ me([]), R = /* @__PURE__ */ me([]), J = /* @__PURE__ */ me(""), j = tt(() => o.value.panels[r.value]), B = tt(() => j.value ? l.value && j.value.slots[l.value] ? Ut(j.value, l.value) : j.value : null), Z = { C: "内区", S: "主体", T: "顶部文字", B: "底部文字", TL: "左上文字", TR: "右上文字", BL: "左下文字", BR: "右下文字", L: "左人物", R: "右人物", O: "道具/音效", ML: "左侧文字", MR: "右侧文字", E: "有限越线" }, oe = /* @__PURE__ */ me("S"), pe = tt(() => j.value ? ["C", "S", "T", "B", "TL", "TR", "BL", "BR", "ML", "MR", "L", "R", "O"] : []), C = tt(() => pe.value.includes(oe.value) ? oe.value : pe.value[0] ?? ""), U = tt(() => j.value?.slotContents?.[l.value || "F"] ?? []), q = /* @__PURE__ */ me(null), Se = /* @__PURE__ */ me(""), We = /* @__PURE__ */ me();
    let ye = null;
    function Q() {
      ye = null, l.value = "";
    }
    function le() {
      if (ye) {
        const g = ye;
        S(g.before), K.value = g.undo, R.value = g.redo;
      }
      Q();
    }
    function Ie(g) {
      Q(), r.value = g;
    }
    function Ze(g, f) {
      r.value === g && l.value === f || (Ie(g), f && j.value?.slots[f] && (ye = { before: pt(), undo: [...K.value], redo: [...R.value] }, l.value = f, c.value = !0));
    }
    function ze(g) {
      j.value && (l.value ? Xn(j.value, l.value, g) : o.value.panels[r.value] = { ...j.value, ...g });
    }
    function Ne() {
      const g = l.value;
      j.value && g && v(() => {
        delete j.value.slots[g], delete j.value.corners[g], j.value.slotNotes && delete j.value.slotNotes[g], j.value.slotContents && delete j.value.slotContents[g];
      });
    }
    function Mn() {
      const g = C.value;
      if (!j.value || !g) return;
      let f = g, h = 2;
      for (; j.value.slots[f]; ) f = `${g}_${h++}`;
      v(() => {
        const O = j.value, N = Ut($n(O, be.value), g), ge = 24 * Object.keys(O.slots).filter((ne) => At(ne) === g).length;
        Xn(O, f, nt({ ...N, x: N.x + ge, y: N.y + ge }, be.value, 1));
      }), Ze(r.value, f);
    }
    function On() {
      j.value && v(() => {
        const g = j.value;
        g.slots = { ...$n(g, be.value).slots }, g.corners = Object.fromEntries(Object.entries(g.corners).filter(([f]) => f === "F")), l.value = "";
      });
    }
    function ps(g, f) {
      return c.value ? Object.keys(g.slots).sort((h, O) => +(f === r.value && h === l.value) - +(f === r.value && O === l.value)).map((h) => ({ key: h, rect: Ut(g, h) })) : [];
    }
    const be = tt(() => ({ width: o.value.width, height: o.value.height })), ht = tt(() => o.value.panels.map((g, f) => ({ rect: g, index: f })).sort((g, f) => (g.rect.layer ?? g.index) - (f.rect.layer ?? f.index) || g.index - f.index)), Mt = tt(() => ht.value.findIndex((g) => g.index === r.value));
    function Ot(g) {
      const f = Mt.value, h = f + g;
      if (f < 0 || h < 0 || h >= ht.value.length) return;
      const O = [...ht.value];
      [O[f], O[h]] = [O[h], O[f]], v(() => {
        O.forEach(({ rect: N }, ge) => {
          N.layer = ge;
        });
      });
    }
    const pt = () => JSON.stringify(o.value), u = tt(() => {
      const g = new Set(o.value.panels.map((f) => f.position).filter(Boolean));
      return o.value.panels.map((f, h) => {
        if (f.position) return f.position;
        let O = h + 1;
        for (; g.has(`panel-${O}`); ) O++;
        const N = `panel-${O}`;
        return g.add(N), N;
      });
    });
    function p(g) {
      g !== pt() && (K.value.push(g), K.value.length > 100 && K.value.shift(), R.value = [], m.value = "");
    }
    function v(g, f = !1) {
      f || Q();
      const h = pt();
      g(), p(h);
    }
    function S(g) {
      o.value = JSON.parse(g), $.value = o.value.width, P.value = o.value.height, r.value = Math.min(r.value, o.value.panels.length - 1), j.value?.slots[l.value] || (l.value = ""), m.value = "", y.value = !1;
    }
    function x() {
      Q();
      const g = K.value.pop();
      g && (R.value.push(pt()), S(g));
    }
    function _() {
      Q();
      const g = R.value.pop();
      g && (K.value.push(pt()), S(g));
    }
    function E() {
      const g = n.sources.find((f) => f.key === a.value);
      g && (v(() => {
        const f = g.id === n.editingId;
        o.value = { id: f ? g.id : i(`${g.id}_copy`), label: f ? g.label : `${g.label}（副本）`, description: wr(g), promptMode: g.promptMode ?? "llm", ...g.canvas, panels: g.panels.map((h, O) => ({ ...$n(cu(h, g.canvas), g.canvas, h), layer: h.layer ?? O })) };
      }), $.value = o.value.width, P.value = o.value.height, Ie(o.value.panels.length ? 0 : -1));
    }
    function A() {
      T();
      const g = mi({ width: $.value, height: P.value });
      if (!g) {
        m.value = "画布宽高须为 64～8192 的数值，输入完成后自动对齐到最近的 16 倍数。";
        return;
      }
      v(() => {
        const f = be.value;
        o.value.panels = o.value.panels.map((h) => ({ ...h, ...nt({ x: h.x * g.width / f.width, y: h.y * g.height / f.height, width: h.width * g.width / f.width, height: h.height * g.height / f.height }, g) })), Object.assign(o.value, g);
      });
    }
    function T() {
      const g = (f) => Number.isFinite(f) ? Math.max(64, Math.min(8192, Math.round(f / 16) * 16)) : f;
      $.value = g($.value), P.value = g(P.value);
    }
    function w() {
      v(() => {
        const g = o.value.panels.length % 5 * 0.04, f = $n(nt({ x: o.value.width * (0.08 + g), y: o.value.height * (0.08 + g), width: o.value.width * 0.55, height: o.value.height * 0.3 }, be.value), be.value);
        f.slots = {}, o.value.panels.push({ ...f, layer: Math.max(-1, ...o.value.panels.map((h, O) => h.layer ?? O)) + 1 }), Ie(o.value.panels.length - 1);
      });
    }
    function D() {
      j.value && v(() => {
        o.value.panels.splice(r.value, 1), Ie(Math.min(r.value, o.value.panels.length - 1));
      });
    }
    function I() {
      j.value && v(() => {
        o.value.panels.push({ ...JSON.parse(JSON.stringify(j.value)), ...nt({ ...j.value, x: j.value.x + 24, y: j.value.y + 24 }, be.value), position: void 0, layer: Math.max(-1, ...o.value.panels.map((g, f) => g.layer ?? f)) + 1 }), Ie(o.value.panels.length - 1);
      });
    }
    function V(g) {
      const f = r.value + g;
      !j.value || f < 0 || f >= o.value.panels.length || v(() => {
        const [h] = o.value.panels.splice(r.value, 1);
        o.value.panels.splice(f, 0, h), r.value = f;
      });
    }
    function W(g, f) {
      const h = Number(f.target.value);
      B.value && Number.isFinite(h) && v(() => {
        ze(nt({ ...B.value, [g]: h }, be.value, l.value ? 1 : zt));
      }, !0);
    }
    function Y(g, f) {
      v(() => {
        o.value[g] = f.target.value;
      });
    }
    function X(g) {
      const f = l.value;
      v(() => {
        o.value.promptMode = g;
      }), f && Ze(r.value, f);
    }
    function te() {
      if (!j.value) return;
      const g = l.value || "F", f = ["T", "B", "TL", "TR", "BL", "BR", "ML", "MR"].includes(At(g)) ? "text" : ["S", "L", "R"].includes(At(g)) ? "character" : "object";
      v(() => {
        ((j.value.slotContents ??= {})[g] ??= []).push({ label: f, caption: "", ...f === "text" ? { text: "", textType: "dialogue" } : {} });
      }, !0);
    }
    function fe(g, f, h) {
      const O = h.target.value;
      v(() => {
        Object.assign(U.value[g], { [f]: O });
      }, !0);
    }
    function xe(g) {
      v(() => {
        U.value.splice(g, 1);
      }, !0);
    }
    function $e(g, f) {
      const h = g + f;
      h < 0 || h >= U.value.length || v(() => {
        const [O] = U.value.splice(g, 1);
        U.value.splice(h, 0, O);
      }, !0);
    }
    function Me(g, f) {
      return g.slotNotes?.[f] ?? (g.slotContents?.[f] ?? []).filter((h) => h.label !== "text" && h.caption.trim()).map((h) => h.caption).join(`
`);
    }
    function Tt(g, f, h) {
      const O = o.value.panels[g];
      O && v(() => {
        const N = (O.slotContents?.[f] ?? []).filter((ge) => ge.label !== "text");
        N.length === 1 && (!O.slotNotes?.[f] || O.slotNotes[f] === N[0].caption) && (N[0].caption = h), h ? (O.slotNotes ??= {})[f] = h : O.slotNotes && delete O.slotNotes[f];
      }, !0);
    }
    function Tn(g) {
      Tt(r.value, l.value || "F", g.target.value);
    }
    function Oe(g, f) {
      Ze(g, f === "F" ? "" : f), q.value = { index: g, key: f }, Se.value = Me(o.value.panels[g], f), fn(() => We.value?.focus());
    }
    function Le() {
      q.value && (Tt(q.value.index, q.value.key, Se.value), q.value = null);
    }
    function $t(g, f) {
      const h = Me(g, f).replace(/\s+/g, " ").trim();
      return h.length > 80 ? h.slice(0, 80) + "…" : h;
    }
    let De = null;
    function _r(g) {
      if (!g.ctrlKey || !g.deltaY || (g.preventDefault(), g.stopPropagation(), De || !F.value || !k.value)) return;
      const f = k.value, h = F.value.getBoundingClientRect(), O = (g.clientX - h.left) / h.width, N = (g.clientY - h.top) / h.height, ge = g.deltaY * (g.deltaMode === 1 ? 16 : g.deltaMode === 2 ? f.clientHeight : 1);
      L.value = we(L.value * Math.exp(-ge * 2e-3), 0.25, 4), fn(() => {
        const ne = F.value?.getBoundingClientRect();
        ne && (f.scrollLeft += ne.left + O * ne.width - g.clientX, f.scrollTop += ne.top + N * ne.height - g.clientY);
      });
    }
    function bi(g) {
      const f = F.value.getBoundingClientRect();
      return { x: (g.clientX - f.left) / f.width * o.value.width, y: (g.clientY - f.top) / f.height * o.value.height };
    }
    function gs(g, f, h = "", O = "") {
      g.button !== 0 || De || (Ze(f, O), De = { pointerId: g.pointerId, ...bi(g), clientX: g.clientX, clientY: g.clientY, dragging: !1, rect: { ...B.value }, before: pt(), handle: h, quad: Hn(j.value, O || "F"), deform: g.ctrlKey && h.length === 2 });
    }
    function Cr(g) {
      if (!De || g.pointerId !== De.pointerId) return;
      const f = bi(g), h = De, O = f.x - h.x, N = f.y - h.y;
      if (!h.dragging) {
        if (Math.hypot(g.clientX - h.clientX, g.clientY - h.clientY) < 3) return;
        h.dragging = !0, F.value.setPointerCapture(g.pointerId);
      }
      const ge = l.value ? 1 : zt;
      if (h.deform) {
        const Jt = ["nw", "ne", "se", "sw"].indexOf(h.handle), vs = h.quad.map((ys, Er) => Er === Jt ? [ys[0] + O, ys[1] + N] : ys);
        fu(j.value, l.value || "F", vs, be.value);
        return;
      }
      let ne = { ...h.rect };
      h.handle ? (h.handle.includes("w") && (ne.x = we(h.rect.x + O, 0, h.rect.x + h.rect.width - ge), ne.width = h.rect.x + h.rect.width - ne.x), h.handle.includes("n") && (ne.y = we(h.rect.y + N, 0, h.rect.y + h.rect.height - ge), ne.height = h.rect.y + h.rect.height - ne.y), h.handle.includes("e") && (ne.width = we(h.rect.width + O, ge, o.value.width - ne.x)), h.handle.includes("s") && (ne.height = we(h.rect.height + N, ge, o.value.height - ne.y))) : (ne.x += O, ne.y += N), ne = nt(ne, be.value, ge);
      const Tr = l.value ? [j.value, ...Object.keys(j.value.slots).filter((Jt) => Jt !== l.value).map((Jt) => Ut(j.value, Jt))] : o.value.panels.filter((Jt, vs) => vs !== r.value), An = { ...ne };
      d.value && !g.altKey && (ne = pu(ne, be.value, Tr, 6 * o.value.width / F.value.getBoundingClientRect().width, !!h.handle, ge)), (h.handle === "e" || h.handle === "w") && (ne.y = An.y, ne.height = An.height), (h.handle === "n" || h.handle === "s") && (ne.x = An.x, ne.width = An.width), ze(ne);
    }
    function ms(g, f = !1) {
      if (!De || g.pointerId !== De.pointerId) return;
      const h = De.before;
      De = null, F.value?.hasPointerCapture(g.pointerId) && F.value.releasePointerCapture(g.pointerId), f ? S(h) : p(h);
    }
    function Sr() {
      const g = Hn(j.value, l.value || "F");
      return ["nw", "ne", "se", "sw"].flatMap((f, h) => [{ name: f, x: g[h][0], y: g[h][1] }, { name: ["n", "e", "s", "w"][h], x: (g[h][0] + g[(h + 1) % 4][0]) / 2, y: (g[h][1] + g[(h + 1) % 4][1]) / 2 }]);
    }
    function xi(g, f) {
      return Hn(g, f).map((h) => h.join(",")).join(" ");
    }
    function En() {
      pt() !== J.value || $.value !== o.value.width || P.value !== o.value.height ? y.value = !0 : s("close");
    }
    function Mr(g) {
      if (g.key === "Tab" && M.value) {
        const f = [...M.value.querySelectorAll('button:not(:disabled),input,textarea,select,[tabindex="0"]')], O = M.value.getRootNode().activeElement;
        g.shiftKey && (O === f[0] || O === M.value) ? (g.preventDefault(), f.at(-1)?.focus()) : !g.shiftKey && O === f.at(-1) && (g.preventDefault(), f[0]?.focus());
      }
      if (g.key === "Escape") {
        g.stopPropagation(), En();
        return;
      }
      if (!g.target.matches("input,textarea,select,button")) {
        if ((g.ctrlKey || g.metaKey) && ["z", "y"].includes(g.key.toLowerCase()))
          g.preventDefault(), g.key.toLowerCase() === "y" || g.shiftKey ? _() : x();
        else if (g.key === "Delete")
          g.preventDefault(), l.value ? Ne() : D();
        else if (B.value && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(g.key)) {
          g.preventDefault();
          const f = g.shiftKey ? 10 : 1;
          v(() => {
            ze(nt({ ...B.value, x: B.value.x + (g.key === "ArrowRight" ? f : g.key === "ArrowLeft" ? -f : 0), y: B.value.y + (g.key === "ArrowDown" ? f : g.key === "ArrowUp" ? -f : 0) }, be.value, l.value ? 1 : zt));
          }, !0);
        }
      }
    }
    function Or() {
      if ($.value !== o.value.width || P.value !== o.value.height) {
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
        const g = qs(o.value.width, o.value.height), f = Ys(g);
        if (o.value.id.trim() === n.editingId && n.sources.some((O) => {
          const N = qs(O.canvas.width, O.canvas.height), ge = Ys(N);
          return O.id === n.editingId && N !== g && (o.value.width !== f.width || o.value.height !== f.height || O.canvas.width !== ge.width || O.canvas.height !== ge.height);
        })) {
          m.value = "此版式含另一画布方向。使用非标准尺寸时请填写新的版式 ID，另存后可保留原版式的两个方向。";
          return;
        }
        const h = au(JSON.stringify({ id: o.value.id.trim(), label: o.value.label.trim() || o.value.id.trim(), description: o.value.description.trim(), usage: o.value.description.trim(), promptMode: o.value.promptMode, promptCaption: o.value.description.trim(), canvas: be.value, readingOrder: u.value.join(" → "), [g]: o.value.panels.map((O, N) => du(O, be.value, u.value[N])) }));
        s("save", h);
      } catch (g) {
        m.value = g instanceof Error ? g.message : String(g);
      }
    }
    return Jo(() => {
      n.initialKey && E(), K.value = [], R.value = [], J.value = pt(), fn(() => M.value?.focus());
    }), (g, f) => (G(), yn(ru, {
      open: !0,
      "top-layer": "",
      onClose: En
    }, {
      default: Do(() => [
        b(
          "section",
          {
            ref_key: "dialog",
            ref: M,
            class: "manga-designer",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "快捷自定义版式",
            tabindex: "-1",
            onKeydown: Mr
          },
          [
            b("header", null, [
              b(
                "strong",
                null,
                se(e.editingId ? "可视化编辑版式" : "快捷自定义版式"),
                1
                /* TEXT */
              ),
              b("div", gu, [
                b("button", {
                  type: "button",
                  onClick: En
                }, "取消"),
                b(
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
                b("button", {
                  type: "button",
                  "aria-label": "关闭编辑器",
                  onClick: En
                }, "✕")
              ])
            ]),
            b("div", mu, [
              b("label", null, [
                f[29] || (f[29] = Te(
                  "画布宽 ",
                  -1
                  /* CACHED */
                )),
                Yt(b(
                  "input",
                  {
                    "onUpdate:modelValue": f[0] || (f[0] = (h) => $.value = h),
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
                    $.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              b("label", null, [
                f[30] || (f[30] = Te(
                  "画布高 ",
                  -1
                  /* CACHED */
                )),
                Yt(b(
                  "input",
                  {
                    "onUpdate:modelValue": f[1] || (f[1] = (h) => P.value = h),
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
                    P.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              b("button", {
                type: "button",
                onClick: A
              }, "应用尺寸")
            ]),
            f[50] || (f[50] = b(
              "p",
              { class: "hint" },
              "改变画布尺寸会等比例换算各轴坐标。工作流与预设尺寸须与此画布一致；请连接节点的宽高输出到潜空间尺寸输入。",
              -1
              /* CACHED */
            )),
            b("div", vu, [
              b("aside", yu, [
                b("label", null, [
                  f[32] || (f[32] = Te(
                    "从现有版式复制",
                    -1
                    /* CACHED */
                  )),
                  Yt(b(
                    "select",
                    {
                      "onUpdate:modelValue": f[2] || (f[2] = (h) => a.value = h),
                      "aria-label": "源版式"
                    },
                    [
                      f[31] || (f[31] = b(
                        "option",
                        { value: "" },
                        "请选择",
                        -1
                        /* CACHED */
                      )),
                      (G(!0), re(
                        de,
                        null,
                        mt(e.sources, (h) => (G(), re("option", {
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
                b("button", {
                  type: "button",
                  disabled: !a.value,
                  onClick: E
                }, "载入副本", 8, xu),
                b("button", {
                  type: "button",
                  onClick: w
                }, "＋ 新增分格"),
                b("button", {
                  type: "button",
                  disabled: !j.value,
                  onClick: I
                }, "复制选中分格", 8, wu),
                b("button", {
                  type: "button",
                  disabled: !j.value,
                  onClick: D
                }, "删除选中分格", 8, _u),
                b("div", Cu, [
                  b("button", {
                    type: "button",
                    disabled: !K.value.length,
                    onClick: x
                  }, "撤销", 8, Su),
                  b("button", {
                    type: "button",
                    disabled: !R.value.length,
                    onClick: _
                  }, "重做", 8, Mu)
                ]),
                b("label", Ou, [
                  Yt(b(
                    "input",
                    {
                      "onUpdate:modelValue": f[3] || (f[3] = (h) => d.value = h),
                      type: "checkbox"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [Qi, d.value]
                  ]),
                  f[33] || (f[33] = Te(
                    "对齐吸附",
                    -1
                    /* CACHED */
                  ))
                ]),
                b("label", Tu, [
                  Yt(b(
                    "input",
                    {
                      "onUpdate:modelValue": f[4] || (f[4] = (h) => c.value = h),
                      type: "checkbox"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [Qi, c.value]
                  ]),
                  f[34] || (f[34] = Te(
                    "显示可编辑槽位",
                    -1
                    /* CACHED */
                  ))
                ]),
                f[35] || (f[35] = b(
                  "p",
                  { class: "hint" },
                  "拖动外框移动整格；拖动黄色/绿色小框单独编辑槽位。直接拖动四角或边中点缩放；按住 Ctrl 再拖四角才形变。Alt 暂停吸附，方向键微调，Delete 删除选中项，Ctrl+Z 撤销。",
                  -1
                  /* CACHED */
                )),
                f[36] || (f[36] = b(
                  "strong",
                  null,
                  "读序（先读 1）",
                  -1
                  /* CACHED */
                )),
                (G(!0), re(
                  de,
                  null,
                  mt(o.value.panels, (h, O) => (G(), re("button", {
                    key: O,
                    type: "button",
                    class: It({ active: r.value === O }),
                    onClick: (N) => Ie(O)
                  }, "第 " + se(O + 1) + " 格", 11, Eu))),
                  128
                  /* KEYED_FRAGMENT */
                )),
                b("div", Au, [
                  b("button", {
                    type: "button",
                    disabled: r.value <= 0,
                    onClick: f[5] || (f[5] = (h) => V(-1))
                  }, "提前", 8, Ru),
                  b("button", {
                    type: "button",
                    disabled: r.value < 0 || r.value >= o.value.panels.length - 1,
                    onClick: f[6] || (f[6] = (h) => V(1))
                  }, "延后", 8, Iu)
                ]),
                b("div", Pu, [
                  b("button", {
                    type: "button",
                    disabled: Mt.value < 0 || Mt.value >= o.value.panels.length - 1,
                    onClick: f[7] || (f[7] = (h) => Ot(1))
                  }, "上移一层", 8, ku),
                  b("button", {
                    type: "button",
                    disabled: Mt.value <= 0,
                    onClick: f[8] || (f[8] = (h) => Ot(-1))
                  }, "下移一层", 8, ju)
                ]),
                b(
                  "p",
                  Fu,
                  se(j.value ? `当前第 ${Mt.value + 1} / ${o.value.panels.length} 层（数字越大越靠前）。` : "") + "层级控制重叠遮挡，不改变读序；遮挡关系自动写入生图提示词。",
                  1
                  /* TEXT */
                )
              ]),
              b("div", Nu, [
                b(
                  "div",
                  {
                    ref_key: "canvasViewport",
                    ref: k,
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
                      style: Bt({ aspectRatio: `${o.value.width}/${o.value.height}`, width: `min(${100 * L.value}%, ${62 * o.value.width / o.value.height * L.value}vh)` }),
                      role: "img",
                      "aria-label": "版式画布",
                      tabindex: "0",
                      onPointermove: Cr,
                      onPointerup: f[10] || (f[10] = (h) => ms(h)),
                      onPointercancel: f[11] || (f[11] = (h) => ms(h, !0)),
                      onLostpointercapture: f[12] || (f[12] = (h) => ms(h, !0))
                    }, [
                      b("rect", {
                        width: o.value.width,
                        height: o.value.height,
                        fill: "white",
                        onPointerdown: f[9] || (f[9] = (h) => Ie(-1))
                      }, null, 40, Lu),
                      (G(!0), re(
                        de,
                        null,
                        mt(ht.value, ({ rect: h, index: O }) => (G(), re("g", {
                          key: O,
                          class: It(["panel", { selected: O === r.value }]),
                          "data-panel": O,
                          onPointerdown: Ke((N) => gs(N, O), ["stop"]),
                          onDblclick: Ke((N) => Oe(O, "F"), ["stop", "prevent"])
                        }, [
                          b("polygon", {
                            points: xi(h, "F"),
                            fill: O === r.value ? "#dcecff" : "#f1f2f4",
                            stroke: O === r.value ? "#2675cf" : "#333",
                            "stroke-width": "2",
                            "vector-effect": "non-scaling-stroke"
                          }, null, 8, Vu),
                          $t(h, "F") ? (G(), re("foreignObject", {
                            key: 0,
                            x: h.x + 6,
                            y: h.y + o.value.width * 0.04,
                            width: Math.max(1, h.width - 12),
                            height: Math.max(1, Math.min(h.height - o.value.width * 0.04, o.value.width * 0.055)),
                            class: "frame-description"
                          }, [
                            b("div", {
                              style: Bt({ fontSize: `${o.value.width * 0.018}px` }),
                              title: Me(h, "F")
                            }, se($t(h, "F")), 13, Hu)
                          ], 8, Ku)) : et("v-if", !0),
                          (G(!0), re(
                            de,
                            null,
                            mt(ps(h, O), (N) => (G(), re("g", {
                              key: N.key,
                              class: "slot",
                              "data-slot": N.key,
                              onPointerdown: Ke((ge) => gs(ge, O, "", N.key), ["stop"]),
                              onDblclick: Ke((ge) => Oe(O, N.key), ["stop", "prevent"])
                            }, [
                              b("polygon", {
                                points: xi(h, N.key),
                                fill: sn(At)(N.key) === "T" ? "#e5ba6638" : "#50a18a18",
                                stroke: O === r.value && N.key === l.value ? "#df7827" : sn(At)(N.key) === "T" ? "#b48733" : "#50a18a",
                                "stroke-width": O === r.value && N.key === l.value ? 2 : 1,
                                "stroke-dasharray": "5 4",
                                "vector-effect": "non-scaling-stroke"
                              }, null, 8, Uu),
                              b("text", {
                                x: N.rect.x + 5,
                                y: N.rect.y + o.value.width * 0.025,
                                "font-size": o.value.width * 0.021,
                                fill: "#575c62"
                              }, se(N.key), 9, Wu),
                              $t(h, N.key) ? (G(), re("foreignObject", {
                                key: 0,
                                x: N.rect.x + 6,
                                y: N.rect.y + o.value.width * 0.032,
                                width: Math.max(1, N.rect.width - 12),
                                height: Math.max(1, Math.min(N.rect.height - o.value.width * 0.032, o.value.width * 0.055)),
                                class: "frame-description"
                              }, [
                                b("div", {
                                  style: Bt({ fontSize: `${o.value.width * 0.018}px` }),
                                  title: Me(h, N.key)
                                }, se($t(h, N.key)), 13, Ju)
                              ], 8, zu)) : et("v-if", !0)
                            ], 40, Bu))),
                            128
                            /* KEYED_FRAGMENT */
                          )),
                          b("text", {
                            x: h.x + 8,
                            y: h.y + o.value.width * 0.032,
                            "font-size": o.value.width * 0.026,
                            fill: "#164b83"
                          }, se(O + 1), 9, qu)
                        ], 42, Du))),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      j.value && B.value ? (G(!0), re(
                        de,
                        { key: 0 },
                        mt(Sr(), (h) => (G(), re("rect", {
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
                          style: Bt({ cursor: `${h.name}-resize` }),
                          "aria-label": `${h.name} 控制点`,
                          onPointerdown: Ke((O) => gs(O, r.value, h.name, l.value), ["stop", "prevent"])
                        }, null, 44, Yu))),
                        128
                        /* KEYED_FRAGMENT */
                      )) : et("v-if", !0)
                    ], 44, $u))
                  ],
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ),
                b("p", Gu, [
                  Te(
                    se(o.value.width) + "×" + se(o.value.height) + " · " + se(o.value.panels.length) + " 格 · 缩放 " + se(Math.round(L.value * 100)) + "% · Ctrl＋滚轮缩放，双击框编辑描述",
                    1
                    /* TEXT */
                  ),
                  f[37] || (f[37] = b(
                    "br",
                    null,
                    null,
                    -1
                    /* CACHED */
                  )),
                  f[38] || (f[38] = Te(
                    "槽位可单独移动、缩放和删除；移动外框时槽位跟随，保存后保留编辑结果。",
                    -1
                    /* CACHED */
                  ))
                ])
              ]),
              b("aside", Xu, [
                b(
                  "div",
                  {
                    class: It(["mode-switch", { manual: o.value.promptMode === "manual" }]),
                    role: "tablist",
                    "aria-label": "内容编辑模式",
                    onKeydown: [
                      f[15] || (f[15] = Nn(Ke((h) => X("llm"), ["prevent"]), ["left"])),
                      f[16] || (f[16] = Nn(Ke((h) => X("manual"), ["prevent"]), ["right"]))
                    ]
                  },
                  [
                    f[39] || (f[39] = b(
                      "span",
                      {
                        class: "mode-thumb",
                        "aria-hidden": "true"
                      },
                      null,
                      -1
                      /* CACHED */
                    )),
                    b("button", {
                      type: "button",
                      role: "tab",
                      "aria-selected": o.value.promptMode === "llm",
                      onClick: f[13] || (f[13] = (h) => X("llm"))
                    }, "← LLM 说明", 8, Zu),
                    b("button", {
                      type: "button",
                      role: "tab",
                      "aria-selected": o.value.promptMode === "manual",
                      onClick: f[14] || (f[14] = (h) => X("manual"))
                    }, "直接提示词 →", 8, Qu)
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
                ),
                b("label", null, [
                  f[40] || (f[40] = Te(
                    "版式 ID",
                    -1
                    /* CACHED */
                  )),
                  b("input", {
                    value: o.value.id,
                    "aria-label": "版式 ID",
                    onChange: f[17] || (f[17] = (h) => Y("id", h))
                  }, null, 40, ec)
                ]),
                b("label", null, [
                  f[41] || (f[41] = Te(
                    "名称",
                    -1
                    /* CACHED */
                  )),
                  b("input", {
                    value: o.value.label,
                    "aria-label": "版式名称",
                    onChange: f[18] || (f[18] = (h) => Y("label", h))
                  }, null, 40, tc)
                ]),
                b("label", null, [
                  f[42] || (f[42] = Te(
                    "画面描述",
                    -1
                    /* CACHED */
                  )),
                  b("textarea", {
                    value: o.value.description,
                    "aria-label": "整页画面描述",
                    rows: "3",
                    placeholder: "全页共用的画风、环境与光照；两种模式共用",
                    onInput: f[19] || (f[19] = (h) => Y("description", h))
                  }, null, 40, nc)
                ]),
                j.value ? (G(), re(
                  de,
                  { key: 0 },
                  [
                    b(
                      "strong",
                      null,
                      "第 " + se(r.value + 1) + " 格 · " + se(l.value ? `${l.value} ${Z[sn(At)(l.value)] ?? "槽位"}` : "外框 F"),
                      1
                      /* TEXT */
                    ),
                    l.value ? (G(), re("div", sc, [
                      b("div", { class: "inline" }, [
                        b("button", {
                          type: "button",
                          class: "primary",
                          onClick: Q
                        }, "确定内框"),
                        b("button", {
                          type: "button",
                          onClick: le
                        }, "取消内框修改")
                      ])
                    ])) : et("v-if", !0),
                    b("button", {
                      type: "button",
                      disabled: !l.value,
                      onClick: Ne
                    }, "删除选中槽位", 8, ic),
                    b("button", {
                      type: "button",
                      onClick: On
                    }, "恢复本格默认槽位"),
                    b("div", oc, [
                      b("select", {
                        value: C.value,
                        "aria-label": "新增内框类型",
                        disabled: !pe.value.length,
                        onChange: f[20] || (f[20] = (h) => oe.value = h.target.value)
                      }, [
                        (G(!0), re(
                          de,
                          null,
                          mt(pe.value, (h) => (G(), re("option", {
                            key: h,
                            value: h
                          }, se(h) + " " + se(Z[h]), 9, lc))),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ], 40, rc),
                      b("button", {
                        type: "button",
                        disabled: !C.value,
                        onClick: Mn
                      }, "添加内框", 8, ac)
                    ]),
                    b("label", null, [
                      Te(
                        se(l.value ? `内框 ${l.value} 画面描述` : "外框 F 画面描述") + " ",
                        1
                        /* TEXT */
                      ),
                      b("textarea", {
                        value: Me(j.value, l.value || "F"),
                        "aria-label": "当前框画面描述",
                        rows: "3",
                        placeholder: l.value ? "描述本框的人物、动作、场景或取景" : "描述本格的场景与人物关系",
                        onInput: Tn
                      }, null, 40, uc)
                    ]),
                    o.value.promptMode === "manual" ? (G(), re("div", cc, [
                      b(
                        "strong",
                        null,
                        se(l.value ? `内框 ${l.value}` : "外框 F") + " 追加人物／台词",
                        1
                        /* TEXT */
                      ),
                      (G(!0), re(
                        de,
                        null,
                        mt(U.value, (h, O) => (G(), re("div", {
                          key: O,
                          class: "content-card"
                        }, [
                          b("div", fc, [
                            b(
                              "span",
                              null,
                              se(O + 1),
                              1
                              /* TEXT */
                            ),
                            b("select", {
                              value: h.label,
                              "aria-label": "内容类型",
                              onChange: (N) => fe(O, "label", N)
                            }, [...f[43] || (f[43] = [
                              b(
                                "option",
                                { value: "object" },
                                "场景／物件",
                                -1
                                /* CACHED */
                              ),
                              b(
                                "option",
                                { value: "character" },
                                "人物",
                                -1
                                /* CACHED */
                              ),
                              b(
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
                              b("label", null, [
                                f[45] || (f[45] = Te(
                                  "文字类型",
                                  -1
                                  /* CACHED */
                                )),
                                b("select", {
                                  value: h.textType ?? "dialogue",
                                  onChange: (N) => fe(O, "textType", N)
                                }, [...f[44] || (f[44] = [
                                  b(
                                    "option",
                                    { value: "dialogue" },
                                    "对白",
                                    -1
                                    /* CACHED */
                                  ),
                                  b(
                                    "option",
                                    { value: "narration" },
                                    "旁白",
                                    -1
                                    /* CACHED */
                                  ),
                                  b(
                                    "option",
                                    { value: "sfx" },
                                    "日文拟声",
                                    -1
                                    /* CACHED */
                                  )
                                ])], 40, hc)
                              ]),
                              b("label", null, [
                                f[46] || (f[46] = Te(
                                  "准确台词／文字",
                                  -1
                                  /* CACHED */
                                )),
                                b("textarea", {
                                  value: h.text ?? "",
                                  "aria-label": "准确台词",
                                  rows: "3",
                                  onInput: (N) => fe(O, "text", N)
                                }, null, 40, pc)
                              ])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : et("v-if", !0),
                          b("label", null, [
                            Te(
                              se(h.label === "text" ? "文字表现说明（选填）" : "画面描述"),
                              1
                              /* TEXT */
                            ),
                            b("textarea", {
                              value: h.caption,
                              "aria-label": "当前内容描述",
                              rows: "3",
                              placeholder: h.label === "text" ? "英文描述说话人、气泡形状与位置；留空使用常规样式" : "英文描述本框可见的场景、人物、动作与取景",
                              onInput: (N) => fe(O, "caption", N)
                            }, null, 40, gc)
                          ]),
                          b("div", mc, [
                            b("button", {
                              type: "button",
                              disabled: O === 0,
                              onClick: (N) => $e(O, -1)
                            }, "上移", 8, vc),
                            b("button", {
                              type: "button",
                              disabled: O === U.value.length - 1,
                              onClick: (N) => $e(O, 1)
                            }, "下移", 8, yc),
                            b("button", {
                              type: "button",
                              onClick: (N) => xe(O)
                            }, "删除内容", 8, bc)
                          ])
                        ]))),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      b("button", {
                        type: "button",
                        onClick: te
                      }, "＋ 添加画面／台词"),
                      f[47] || (f[47] = b(
                        "p",
                        { class: "hint" },
                        "一个框可添加多个人物或多条文字，按列表顺序输出。空白条目留作草稿；每句台词单独一项，人物与气泡可用独立内框定位。",
                        -1
                        /* CACHED */
                      ))
                    ])) : et("v-if", !0),
                    b("div", xc, [
                      b(
                        "button",
                        {
                          type: "button",
                          class: It({ active: !l.value }),
                          onClick: Q
                        },
                        "外框 F",
                        2
                        /* CLASS */
                      ),
                      (G(!0), re(
                        de,
                        null,
                        mt(j.value.slots, (h, O) => (G(), re("button", {
                          key: O,
                          type: "button",
                          class: It({ active: l.value === O }),
                          onClick: (N) => Ze(r.value, String(O))
                        }, se(O) + " " + se(Z[sn(At)(String(O))] ?? ""), 11, wc))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    (G(), re(
                      de,
                      null,
                      mt(["x", "y", "width", "height"], (h) => b("label", { key: h }, [
                        Te(
                          se({ x: "左边距", y: "上边距", width: "宽度", height: "高度" }[h]),
                          1
                          /* TEXT */
                        ),
                        b("input", {
                          value: B.value?.[h],
                          "aria-label": `${l.value ? "槽位" : "分格"}${h}`,
                          type: "number",
                          step: "1",
                          onChange: (O) => W(h, O)
                        }, null, 40, _c)
                      ])),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (G(), re("p", Cc, "添加或选择一格，编辑精确尺寸。")),
                f[48] || (f[48] = b(
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
            )) : et("v-if", !0),
            y.value ? (G(), re("footer", Mc, [
              f[49] || (f[49] = b(
                "span",
                null,
                "放弃未保存的修改？",
                -1
                /* CACHED */
              )),
              b("button", {
                type: "button",
                onClick: f[21] || (f[21] = (h) => y.value = !1)
              }, "继续编辑"),
              b("button", {
                type: "button",
                onClick: f[22] || (f[22] = (h) => s("close"))
              }, "放弃修改")
            ])) : et("v-if", !0),
            q.value ? (G(), re(
              "div",
              {
                key: 2,
                class: "quick-mask",
                onMousedown: f[28] || (f[28] = Ke((h) => q.value = null, ["self"]))
              },
              [
                b(
                  "section",
                  {
                    class: "quick-dialog",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "快速编辑画面描述",
                    onKeydown: [
                      f[26] || (f[26] = Ke(() => {
                      }, ["stop"])),
                      f[27] || (f[27] = Nn(Ke((h) => q.value = null, ["prevent"]), ["esc"]))
                    ]
                  },
                  [
                    b("header", null, [
                      b(
                        "strong",
                        null,
                        "第 " + se(q.value.index + 1) + " 格 · " + se(q.value.key) + " 画面描述",
                        1
                        /* TEXT */
                      ),
                      b("button", {
                        type: "button",
                        "aria-label": "关闭快速编辑",
                        onClick: f[23] || (f[23] = (h) => q.value = null)
                      }, "✕")
                    ]),
                    Yt(b("textarea", {
                      ref_key: "quickField",
                      ref: We,
                      "onUpdate:modelValue": f[24] || (f[24] = (h) => Se.value = h),
                      "aria-label": "快速画面描述",
                      rows: "7",
                      onKeydown: Nn(Ke(Le, ["ctrl", "prevent"]), ["enter"])
                    }, null, 40, Oc), [
                      [ks, Se.value]
                    ]),
                    b("footer", null, [
                      b("button", {
                        type: "button",
                        onClick: f[25] || (f[25] = (h) => q.value = null)
                      }, "取消"),
                      b("button", {
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
            )) : et("v-if", !0)
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        )
      ]),
      _: 1
      /* STABLE */
    }));
  }
}), Ec = /* @__PURE__ */ br(Tc, [["__scopeId", "data-v-9d8e322f"]]);
function hs(e) {
  const { id: t, label: n, usage: s, readingOrder: i, canvas: o, promptMode: r, promptCaption: l } = e;
  if (!o || !t) throw new Error("版式缺少 id 或 canvas。");
  const a = e.panels ?? e.portrait ?? e.landscape;
  if (!Array.isArray(a) || !a.length) throw new Error("版式缺少分格。");
  return { id: t, label: n || t, description: wr(e), usage: s || "", readingOrder: i || "", canvas: o, panels: a, ...r ? { promptMode: r } : {}, ...typeof l == "string" ? { promptCaption: l } : {} };
}
function Ac(e) {
  const t = Array.isArray(e) ? e : e.layouts ?? [e];
  if (!Array.isArray(t)) throw new Error("导入需要版式数组。");
  return t.map(hs);
}
function Rc(e) {
  const t = hs(e), n = t.panels.map((s, i) => ({ panel: i + 1, position: s.position, slots: Object.keys(s.slots), slotNotes: { ...Object.fromEntries(Object.entries(s.slotContents ?? {}).map(([o, r]) => [o, r.filter((l) => l.label !== "text").map((l) => l.caption).filter(Boolean).join(`
`)]).filter(([, o]) => o)), ...s.slotNotes } }));
  return `以下为当前所选版式的画面描述，请结合用户最新要求和原文分配内容。F 描述整格，其余键是内容定位参考。槽位按需要选用，未使用区域省略，不补占位项；槽位类型名称不等于人物数量或强制内容类型，以实际描述和坐标为准。画面描述本身不是台词、旁白或可见印字；明确提供的准确字样另填 text。可整合同一人物的局部描述，并补充镜头、姿态、表情、支撑和遮挡关系；保留既定事件、身份、人数与准确台词。
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
  const d = t.panels.map((c, m) => ({ panel: c, index: m })).sort((c, m) => (c.panel.layer ?? c.index) - (m.panel.layer ?? m.index) || c.index - m.index);
  for (const { panel: c, index: m } of d) {
    const y = c.slots.F ?? c.slots.C ?? Object.values(c.slots)[0], [M, F, k, L] = y, $ = c.shapes?.F ?? [[F, M], [L, M], [L, k], [F, k]];
    if (s.beginPath(), $.forEach(([P, K], R) => R ? s.lineTo(P, K) : s.moveTo(P, K)), s.closePath(), s.fillStyle = "#eef4fd", s.fill(), s.strokeStyle = "#235c9e", s.lineWidth = 2 / r, s.stroke(), s.save(), s.clip(), n) for (const [P, [K, R, J, j]] of Object.entries(c.slots)) {
      if (!["T", "TL", "TR", "B", "BL", "BR", "ML", "MR"].includes(At(P))) continue;
      const B = c.shapes?.[P] ?? [[R, K], [j, K], [j, J], [R, J]];
      s.beginPath(), B.forEach(([Z, oe], pe) => pe ? s.lineTo(Z, oe) : s.moveTo(Z, oe)), s.closePath(), s.strokeStyle = "#dd8838", s.lineWidth = 1 / r, s.stroke(), s.fillStyle = "#a65313", s.font = `${10 / r}px sans-serif`, s.fillText(P, R + 2 / r, K + 12 / r);
    }
    s.restore(), s.fillStyle = "#16375b", s.font = `bold ${13 / r}px sans-serif`, s.fillText(String(m + 1), F + 4 / r, M + 16 / r);
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
  const t = e.widgets.find((C) => C.name === "layout_id"), n = e.widgets.find((C) => C.name === "layout_snapshot");
  if (!t || !n) return;
  n.type = "hidden", n.computeSize = () => [0, -4];
  const s = e.widgets.find((C) => C.name === "bleed");
  s && (s.type = "hidden", s.computeSize = () => [0, -4]);
  const i = e.widgets.find((C) => C.name === "library_mode") ?? { value: "llm" };
  i.type = "hidden", i.computeSize = () => [0, -4], t.type = "combo", t.options = { ...t.options, values: () => [...new Set([...ve.layouts.map((C) => C.id), t.value].filter(Boolean))] };
  let o = 400, r, l;
  const a = document.createElement("div");
  a.className = "moss-layout-node-panel", a.style.cssText = "width:100%;height:400px;display:flex;flex-direction:column;gap:6px;padding:6px;box-sizing:border-box;overflow:hidden;background:#202733;color:#ecf1f7;font:12px system-ui;";
  const d = document.createElement("label");
  d.style.cssText = "display:flex;align-items:center;gap:8px;flex:none;min-height:32px", d.append(document.createTextNode("版式库"));
  const c = document.createElement("select");
  c.setAttribute("aria-label", "选择库中版式"), c.style.cssText = "flex:1;min-width:0;height:32px;color:#fff;background:#344052;border:1px solid #7d8b9e;border-radius:4px;padding:3px 6px", d.append(c), a.append(d);
  const m = document.createElement("div");
  m.style.cssText = "display:flex;flex-wrap:wrap;gap:5px;flex:none", a.append(m);
  const y = document.createElement("div");
  y.setAttribute("role", "status"), y.style.cssText = "min-height:30px;white-space:normal;overflow-wrap:anywhere;flex:none", a.append(y);
  const M = document.createElement("canvas");
  M.width = 1e3, M.height = 540, M.style.cssText = "display:block;width:100%;height:240px;min-height:240px;flex:none;object-fit:contain;background:#e9edf3", a.append(M);
  const F = document.createElement("label"), k = document.createElement("input");
  k.type = "checkbox", k.checked = !0, F.append(k, document.createTextNode("显示字区")), m.append(F);
  function L() {
    return n.value ? JSON.parse(n.value) : null;
  }
  function $() {
    if (!r) return;
    o = 36 + d.offsetHeight + m.offsetHeight + y.offsetHeight + 240, a.style.height = o + "px";
    const C = e.computeSize();
    e.size[1] < C[1] && e.setSize([e.size[0], C[1]]), Ln.graph?.setDirtyCanvas(!0, !0);
  }
  function P() {
    cancelAnimationFrame(l), l = requestAnimationFrame($);
  }
  function K() {
    c.replaceChildren();
    for (const C of ve.layouts) {
      const U = document.createElement("option");
      U.value = C.id, U.textContent = `${C.id} · ${C.label || C.id}`, c.append(U);
    }
    if (!ve.layouts.some((C) => C.id === t.value)) {
      const C = document.createElement("option");
      C.value = t.value || "", C.textContent = n.value ? `${t.value} · 当前工作流快照（库中已无此版式）` : "请选择版式，或新建／导入", C.disabled = !0, c.prepend(C);
    }
    c.value = t.value || "", c.disabled = !ve.layouts.length;
  }
  function R() {
    K();
    try {
      const C = L();
      Pc(M, C, k.checked), y.textContent = C ? `${C.label || C.id} · ${C.canvas.width}×${C.canvas.height} · ${C.panels.length} 格 · ${C.promptMode === "manual" ? "直接提示词（读取手填内容）" : "LLM 输入"} · 工作流快照` : "没有选中版式：请新建或导入。";
    } catch (C) {
      y.textContent = C.message;
    }
    Ln.graph?.setDirtyCanvas(!0, !0), P();
  }
  function J(C) {
    i.value = C.promptMode ?? "llm", t.value = C.id, n.value = JSON.stringify(C), R(), Ln.graph?.change();
  }
  function j(C, U) {
    const q = document.createElement("button");
    q.textContent = C, q.type = "button", q.style.cssText = "padding:4px 7px;border:1px solid #7d8b9e;border-radius:4px;background:#344052;color:#fff;cursor:pointer", q.onclick = async () => {
      try {
        await U();
      } catch (Se) {
        y.textContent = Se.message;
      }
    }, m.append(q);
  }
  j("编辑版式", () => {
    const C = L();
    if (!C) throw new Error("先选择版式。");
    oo(C, J, C.promptMode ?? "llm");
  }), j("新建", () => oo(null, J, "llm")), j("删除", async () => {
    const C = L();
    if (!C) throw new Error("先选择版式。");
    await Xs(ve.layouts.filter((U) => U.id !== C.id)), R(), y.textContent = "已从公共库删除。当前节点保留工作流快照；不会自动恢复到库。";
  }), j("刷新版式库", () => io()), j("一键复制说明", async () => {
    const C = L();
    if (!C) throw new Error("先选择版式。");
    const U = await Qn("format", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(C) });
    await ro(Ic(U.text, C)), y.textContent = "已复制内容整理要求和当前版式；交给 LLM 后可粘贴其 JSON 代码块，或含一个代码块的完整回复。";
  }), j("复制手填提示词", async () => {
    const C = L();
    if (!C) throw new Error("先选择版式。");
    const U = await Qn("manual", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layout: C }) });
    await ro(U.text), y.textContent = "已复制 MOSS 提示词，可直接送入文本编码器。";
  }), j("导出版式库", () => {
    const C = URL.createObjectURL(new Blob([JSON.stringify({ layouts: ve.layouts }, null, 2)], { type: "application/json" })), U = document.createElement("a");
    U.href = C, U.download = "moss-manga-layouts.json", U.click(), setTimeout(() => URL.revokeObjectURL(C), 1e3);
  }), j("导出当前版式", () => {
    const C = L();
    if (!C) throw new Error("先选择版式。");
    const U = URL.createObjectURL(new Blob([JSON.stringify(hs(C), null, 2)], { type: "application/json" })), q = document.createElement("a");
    q.href = U, q.download = "moss-manga-current-layout.json", q.click(), setTimeout(() => URL.revokeObjectURL(U), 1e3);
  }), j("导入", () => {
    const C = document.createElement("input");
    C.type = "file", C.accept = ".json,application/json", C.onchange = async () => {
      try {
        if (!C.files?.[0]) return;
        const U = JSON.parse(await C.files[0].text()), q = Ac(U);
        for (const We of q) We.promptMode ??= U.mode ?? "llm";
        const Se = new Set(ve.layouts.map((We) => We.id));
        if (q.some((We) => Se.has(We.id))) throw new Error("导入含同名 ID，请先改名；不会覆盖已有版式。");
        await Xs([...ve.layouts, ...q]), q.length ? J(q[0]) : R();
      } catch (U) {
        y.textContent = U.message;
      }
    }, C.click();
  }), k.onchange = R, c.onchange = () => {
    const C = ve.layouts.find((U) => U.id === c.value);
    C && J(C);
  }, t.callback = (C) => {
    const U = ve.layouts.find((q) => q.id === C);
    U ? J(U) : R();
  }, r = e.addDOMWidget("版式预览", "moss_layout_preview", a, { serialize: !1, hideOnZoom: !1, getMinHeight: () => o, getMaxHeight: () => o, getHeight: () => o }), r.computeSize = (C) => [C, o], e.setSize([Math.max(e.size[0], 460), Math.max(e.size[1], 640)]);
  const B = new ResizeObserver(P);
  [d, m, y].forEach((C) => B.observe(C));
  const Z = e.onResize;
  e.onResize = function(...C) {
    const U = Z?.apply(this, C);
    return P(), U;
  };
  const oe = e.onConfigure;
  e.onConfigure = function(...C) {
    const U = oe?.apply(this, C);
    return setTimeout(() => {
      n.value && (i.value = L()?.promptMode ?? "llm"), R();
    }, 0), U;
  }, Zn.add(R);
  const pe = e.onRemoved;
  e.onRemoved = function(...C) {
    return Zn.delete(R), B.disconnect(), cancelAnimationFrame(l), pe?.apply(this, C);
  }, io().then(() => {
    if (n.value && (i.value = L()?.promptMode ?? "llm"), !n.value && !t.value && ve.layouts.length) J(ve.layouts[0]);
    else if (!n.value && t.value) {
      const C = ve.layouts.find((U) => U.id === t.value);
      C && J(C);
    }
    R();
  }).catch((C) => {
    y.textContent = C.message;
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
