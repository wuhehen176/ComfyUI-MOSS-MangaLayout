import { app as Nn } from "../../scripts/app.js";
import { api as Tr } from "../../scripts/api.js";
// @__NO_SIDE_EFFECTS__
function Ys(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ue = {}, Vt = [], rt = () => {
}, oo = () => !1, Xn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Zn = (e) => e.startsWith("onUpdate:"), Se = Object.assign, Gs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Er = Object.prototype.hasOwnProperty, ee = (e, t) => Er.call(e, t), K = Array.isArray, It = (e) => wn(e) === "[object Map]", xt = (e) => wn(e) === "[object Set]", bi = (e) => wn(e) === "[object Date]", z = (e) => typeof e == "function", pe = (e) => typeof e == "string", Ye = (e) => typeof e == "symbol", ae = (e) => e !== null && typeof e == "object", ro = (e) => (ae(e) || z(e)) && z(e.then) && z(e.catch), lo = Object.prototype.toString, wn = (e) => lo.call(e), Ar = (e) => wn(e).slice(8, -1), ao = (e) => wn(e) === "[object Object]", Xs = (e) => pe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, rn = /* @__PURE__ */ Ys(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Qn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Rr = /-\w/g, Je = Qn(
  (e) => e.replace(Rr, (t) => t.slice(1).toUpperCase())
), Ir = /\B([A-Z])/g, Ft = Qn(
  (e) => e.replace(Ir, "-$1").toLowerCase()
), uo = Qn((e) => e.charAt(0).toUpperCase() + e.slice(1)), ms = Qn(
  (e) => e ? `on${uo(e)}` : ""
), it = (e, t) => !Object.is(e, t), $n = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, co = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, es = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let wi;
const ts = () => wi || (wi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Kt(e) {
  if (K(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = pe(s) ? jr(s) : Kt(s);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (pe(e) || ae(e))
    return e;
}
const Pr = /;(?![^(]*\))/g, kr = /:([^]+)/, Fr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function jr(e) {
  const t = {};
  return e.replace(Fr, (n) => n.startsWith("/*") ? "" : n).split(Pr).forEach((n) => {
    if (n) {
      const s = n.split(kr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function At(e) {
  let t = "";
  if (pe(e))
    t = e;
  else if (K(e))
    for (let n = 0; n < e.length; n++) {
      const s = At(e[n]);
      s && (t += s + " ");
    }
  else if (ae(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Nr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", $r = /* @__PURE__ */ Ys(Nr);
function fo(e) {
  return !!e || e === "";
}
function Lr(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let i = 0; s && i < e.length; i++)
    s = _t(e[i], t[i], n);
  return s;
}
function xi(e, t, n) {
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
function Dr(e, t, n) {
  let s = It(e), i = It(t);
  if (s || i || (s = xt(e), i = xt(t), s || i))
    return s && i ? xi(e, t, n) : !1;
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
function _i(e, t, n, s) {
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
  let s = bi(e), i = bi(t);
  return s || i ? s && i ? e.getTime() === t.getTime() : !1 : (s = Ye(e), i = Ye(t), s || i ? e === t : (s = K(e), i = K(t), s || i ? s && i ? _i(e, t, n, Lr) : !1 : (s = ae(e), i = ae(t), s || i ? !s || !i ? !1 : _i(e, t, n, Dr) : String(e) === String(t))));
}
function Zs(e, t) {
  return e.findIndex((n) => _t(n, t));
}
const ho = (e) => !!(e && e.__v_isRef === !0), ne = (e) => pe(e) ? e : e == null ? "" : K(e) || ae(e) && (e.toString === lo || !z(e.toString)) ? ho(e) ? ne(e.value) : JSON.stringify(e, po, 2) : String(e), po = (e, t) => ho(t) ? po(e, t.value) : It(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], o) => (n[vs(s, o) + " =>"] = i, n),
    {}
  )
} : xt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => vs(n))
} : Ye(t) ? vs(t) : ae(t) && !K(t) && !ao(t) ? String(t) : t, vs = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ye(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Ce;
class Vr {
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
function Kr() {
  return Ce;
}
let ce;
const ys = /* @__PURE__ */ new WeakSet();
class go {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && (Ce.active ? Ce.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ys.has(this) && (ys.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || vo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ci(this), yo(this);
    const t = ce, n = qe;
    ce = this, qe = !0;
    try {
      return this.fn();
    } finally {
      bo(this), ce = t, qe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ti(t);
      this.deps = this.depsTail = void 0, Ci(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ys.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Is(this) && this.run();
  }
  get dirty() {
    return Is(this);
  }
}
let mo = 0, ln, an;
function vo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = an, an = e;
    return;
  }
  e.next = ln, ln = e;
}
function Qs() {
  mo++;
}
function ei() {
  if (--mo > 0)
    return;
  if (an) {
    let t = an;
    for (an = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; ln; ) {
    let t = ln;
    for (ln = void 0; t; ) {
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
function yo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function bo(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), ti(s), Hr(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function Is(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (wo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function wo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === dn) || (e.globalVersion = dn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Is(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ce, s = qe;
  ce = e, qe = !0;
  try {
    yo(e);
    const i = e.fn(e._value);
    (t.version === 0 || it(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ce = n, qe = s, bo(e), e.flags &= -3;
  }
}
function ti(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      ti(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Hr(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let qe = !0;
const xo = [];
function at() {
  xo.push(qe), qe = !1;
}
function ut() {
  const e = xo.pop();
  qe = e === void 0 ? !0 : e;
}
function Ci(e) {
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
let dn = 0;
class Br {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ni {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ce || !qe || ce === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ce)
      n = this.activeLink = new Br(ce, this), ce.deps ? (n.prevDep = ce.depsTail, ce.depsTail.nextDep = n, ce.depsTail = n) : ce.deps = ce.depsTail = n, _o(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ce.depsTail, n.nextDep = void 0, ce.depsTail.nextDep = n, ce.depsTail = n, ce.deps === n && (ce.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, dn++, this.notify(t);
  }
  notify(t) {
    Qs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ei();
    }
  }
}
function _o(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        _o(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Ps = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ Symbol(
  ""
), ks = /* @__PURE__ */ Symbol(
  ""
), hn = /* @__PURE__ */ Symbol(
  ""
);
function Ee(e, t, n) {
  if (qe && ce) {
    let s = Ps.get(e);
    s || Ps.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new ni()), i.map = s, i.key = n), i.track();
  }
}
function yt(e, t, n, s, i, o) {
  const r = Ps.get(e);
  if (!r) {
    dn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Qs(), t === "clear")
    r.forEach(l);
  else {
    const a = K(e), d = a && Xs(n);
    if (a && n === "length") {
      const c = Number(s);
      r.forEach((m, b) => {
        (b === "length" || b === hn || !Ye(b) && b >= c) && l(m);
      });
    } else
      switch ((n !== void 0 || r.has(void 0)) && l(r.get(n)), d && l(r.get(hn)), t) {
        case "add":
          a ? d && l(r.get("length")) : (l(r.get(Ht)), It(e) && l(r.get(ks)));
          break;
        case "delete":
          a || (l(r.get(Ht)), It(e) && l(r.get(ks)));
          break;
        case "set":
          It(e) && l(r.get(Ht));
          break;
      }
  }
  ei();
}
function Wt(e) {
  const t = /* @__PURE__ */ se(e);
  return t === e || (Ee(t, "iterate", hn), /* @__PURE__ */ He(e)) ? t : /* @__PURE__ */ ct(e) ? /* @__PURE__ */ Pt(e) ? t.map((n) => kt(Be(n))) : t.map(kt) : t.map(Be);
}
function ns(e) {
  return Ee(e = /* @__PURE__ */ se(e), "iterate", hn), e;
}
function tt(e, t) {
  return /* @__PURE__ */ ct(e) ? kt(/* @__PURE__ */ Pt(e) ? Be(t) : t) : Be(t);
}
const Ur = {
  __proto__: null,
  [Symbol.iterator]() {
    return bs(this, Symbol.iterator, (e) => tt(this, e));
  },
  concat(...e) {
    return Wt(this).concat(
      ...e.map((t) => K(t) ? Wt(t) : t)
    );
  },
  entries() {
    return bs(this, "entries", (e) => (e[1] = tt(this, e[1]), e));
  },
  every(e, t) {
    return ht(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return ht(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => tt(this, s)),
      arguments
    );
  },
  find(e, t) {
    return ht(
      this,
      "find",
      e,
      t,
      (n) => tt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return ht(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return ht(
      this,
      "findLast",
      e,
      t,
      (n) => tt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return ht(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return ht(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ws(this, "includes", e);
  },
  indexOf(...e) {
    return ws(this, "indexOf", e);
  },
  join(e) {
    return Wt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ws(this, "lastIndexOf", e);
  },
  map(e, t) {
    return ht(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return en(this, "pop");
  },
  push(...e) {
    return en(this, "push", e);
  },
  reduce(e, ...t) {
    return Mi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Mi(this, "reduceRight", e, t);
  },
  shift() {
    return en(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return ht(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return en(this, "splice", e);
  },
  toReversed() {
    return Wt(this).toReversed();
  },
  toSorted(e) {
    return Wt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Wt(this).toSpliced(...e);
  },
  unshift(...e) {
    return en(this, "unshift", e);
  },
  values() {
    return bs(this, "values", (e) => tt(this, e));
  }
};
function bs(e, t, n) {
  const s = ns(e), i = s[t], o = i.call(s);
  if (s !== e && !/* @__PURE__ */ He(e)) {
    if (o[Symbol.toStringTag] === "Array Iterator") {
      const r = Object.create(Object.getPrototypeOf(o));
      return r.next = () => Si(o.next(), n), i !== Co[t] && Object.defineProperties(r, {
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
    o._next = o.next, o.next = () => Si(o._next(), n);
  }
  return o;
}
function Si(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const Co = Array.prototype;
function ht(e, t, n, s, i, o) {
  const r = ns(e), l = r !== e && !/* @__PURE__ */ He(e), a = r[t];
  if (a !== Co[t]) {
    const m = a.apply(e, o);
    return l ? Be(m) : m;
  }
  let d = n;
  r !== e && (l ? d = function(m, b) {
    return n.call(this, tt(e, m), b, e);
  } : n.length > 2 && (d = function(m, b) {
    return n.call(this, m, b, e);
  }));
  const c = a.call(r, d, s);
  return l && i ? i(c) : c;
}
function Mi(e, t, n, s) {
  const i = ns(e), o = i !== e && !/* @__PURE__ */ He(e);
  let r = n, l = !1;
  i !== e && (o ? (l = s.length === 0, r = function(d, c, m) {
    return l && (l = !1, d = tt(e, d)), n.call(this, d, tt(e, c), m, e);
  }) : n.length > 3 && (r = function(d, c, m) {
    return n.call(this, d, c, m, e);
  }));
  const a = i[t](r, ...s);
  return l ? tt(e, a) : a;
}
function ws(e, t, n) {
  const s = /* @__PURE__ */ se(e);
  Ee(s, "iterate", hn);
  const i = s[t](...n);
  return (i === -1 || i === !1) && /* @__PURE__ */ ri(n[0]) ? (n[0] = /* @__PURE__ */ se(n[0]), s[t](...n)) : i;
}
function en(e, t, n = []) {
  at(), Qs();
  const s = (/* @__PURE__ */ se(e))[t].apply(e, n);
  return ei(), ut(), s;
}
const Wr = /* @__PURE__ */ Ys("__proto__,__v_isRef,__isVue"), So = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ye)
);
function zr(e) {
  Ye(e) || (e = String(e));
  const t = /* @__PURE__ */ se(this);
  return Ee(t, "has", e), t.hasOwnProperty(e);
}
class Mo {
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
      return s === (i ? o ? nl : Ao : o ? Eo : To).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const r = K(t);
    if (!i) {
      let a;
      if (r && (a = Ur[n]))
        return a;
      if (n === "hasOwnProperty")
        return zr;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Re(t) ? t : s
    );
    if ((Ye(n) ? So.has(n) : Wr(n)) || (i || Ee(t, "get", n), o))
      return l;
    if (/* @__PURE__ */ Re(l)) {
      const a = r && Xs(n) ? l : l.value;
      return i && ae(a) ? /* @__PURE__ */ js(a) : a;
    }
    return ae(l) ? i ? /* @__PURE__ */ js(l) : /* @__PURE__ */ ii(l) : l;
  }
}
class Oo extends Mo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let o = t[n];
    const r = K(t) && Xs(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ ct(o);
      if (!/* @__PURE__ */ He(s) && !/* @__PURE__ */ ct(s) && (o = /* @__PURE__ */ se(o), s = /* @__PURE__ */ se(s)), !r && /* @__PURE__ */ Re(o) && !/* @__PURE__ */ Re(s))
        return d || (o.value = s), !0;
    }
    const l = r ? Number(n) < t.length : ee(t, n), a = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ Re(t) ? t : i
    );
    return t === /* @__PURE__ */ se(i) && a && (l ? it(s, o) && yt(t, "set", n, s) : yt(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = ee(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && s && yt(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ye(n) || !So.has(n)) && Ee(t, "has", n), s;
  }
  ownKeys(t) {
    return Ee(
      t,
      "iterate",
      K(t) ? "length" : Ht
    ), Reflect.ownKeys(t);
  }
}
class Jr extends Mo {
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
const qr = /* @__PURE__ */ new Oo(), Yr = /* @__PURE__ */ new Jr(), Gr = /* @__PURE__ */ new Oo(!0);
const Fs = (e) => e, En = (e) => Reflect.getPrototypeOf(e);
function Xr(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, o = /* @__PURE__ */ se(i), r = It(o), l = e === "entries" || e === Symbol.iterator && r, a = e === "keys" && r, d = i[e](...s), c = n ? Fs : t ? kt : Be;
    return !t && Ee(
      o,
      "iterate",
      a ? ks : Ht
    ), Se(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: m, done: b } = d.next();
          return b ? { value: m, done: b } : {
            value: l ? [c(m[0]), c(m[1])] : c(m),
            done: b
          };
        }
      }
    );
  };
}
function An(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Zr(e, t) {
  const n = {
    get(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ se(o), l = /* @__PURE__ */ se(i);
      e || (it(i, l) && Ee(r, "get", i), Ee(r, "get", l));
      const { has: a } = En(r), d = t ? Fs : e ? kt : Be;
      if (a.call(r, i))
        return d(o.get(i));
      if (a.call(r, l))
        return d(o.get(l));
      o !== r && o.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Ee(/* @__PURE__ */ se(i), "iterate", Ht), i.size;
    },
    has(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ se(o), l = /* @__PURE__ */ se(i);
      return e || (it(i, l) && Ee(r, "has", i), Ee(r, "has", l)), i === l ? o.has(i) : o.has(i) || o.has(l);
    },
    forEach(i, o) {
      const r = this, l = r.__v_raw, a = /* @__PURE__ */ se(l), d = t ? Fs : e ? kt : Be;
      return !e && Ee(a, "iterate", Ht), l.forEach((c, m) => i.call(o, d(c), d(m), r));
    }
  };
  return Se(
    n,
    e ? {
      add: An("add"),
      set: An("set"),
      delete: An("delete"),
      clear: An("clear")
    } : {
      add(i) {
        const o = /* @__PURE__ */ se(this), r = En(o), l = /* @__PURE__ */ se(i), a = !t && !/* @__PURE__ */ He(i) && !/* @__PURE__ */ ct(i) ? l : i;
        return r.has.call(o, a) || it(i, a) && r.has.call(o, i) || it(l, a) && r.has.call(o, l) || (o.add(a), yt(o, "add", a, a)), this;
      },
      set(i, o) {
        !t && !/* @__PURE__ */ He(o) && !/* @__PURE__ */ ct(o) && (o = /* @__PURE__ */ se(o));
        const r = /* @__PURE__ */ se(this), { has: l, get: a } = En(r);
        let d = l.call(r, i);
        d || (i = /* @__PURE__ */ se(i), d = l.call(r, i));
        const c = a.call(r, i);
        return r.set(i, o), d ? it(o, c) && yt(r, "set", i, o) : yt(r, "add", i, o), this;
      },
      delete(i) {
        const o = /* @__PURE__ */ se(this), { has: r, get: l } = En(o);
        let a = r.call(o, i);
        a || (i = /* @__PURE__ */ se(i), a = r.call(o, i)), l && l.call(o, i);
        const d = o.delete(i);
        return a && yt(o, "delete", i, void 0), d;
      },
      clear() {
        const i = /* @__PURE__ */ se(this), o = i.size !== 0, r = i.clear();
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
    n[i] = Xr(i, e, t);
  }), n;
}
function si(e, t) {
  const n = Zr(e, t);
  return (s, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? s : Reflect.get(
    ee(n, i) && i in s ? n : s,
    i,
    o
  );
}
const Qr = {
  get: /* @__PURE__ */ si(!1, !1)
}, el = {
  get: /* @__PURE__ */ si(!1, !0)
}, tl = {
  get: /* @__PURE__ */ si(!0, !1)
};
const To = /* @__PURE__ */ new WeakMap(), Eo = /* @__PURE__ */ new WeakMap(), Ao = /* @__PURE__ */ new WeakMap(), nl = /* @__PURE__ */ new WeakMap();
function sl(e) {
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
function ii(e) {
  return /* @__PURE__ */ ct(e) ? e : oi(
    e,
    !1,
    qr,
    Qr,
    To
  );
}
// @__NO_SIDE_EFFECTS__
function il(e) {
  return oi(
    e,
    !1,
    Gr,
    el,
    Eo
  );
}
// @__NO_SIDE_EFFECTS__
function js(e) {
  return oi(
    e,
    !0,
    Yr,
    tl,
    Ao
  );
}
function oi(e, t, n, s, i) {
  if (!ae(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const r = sl(Ar(e));
  if (r === 0)
    return e;
  const l = new Proxy(
    e,
    r === 2 ? s : n
  );
  return i.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Pt(e) {
  return /* @__PURE__ */ ct(e) ? /* @__PURE__ */ Pt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ct(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ri(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function se(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ se(t) : e;
}
function ol(e) {
  return !ee(e, "__v_skip") && Object.isExtensible(e) && co(e, "__v_skip", !0), e;
}
const Be = (e) => ae(e) ? /* @__PURE__ */ ii(e) : e, kt = (e) => ae(e) ? /* @__PURE__ */ js(e) : e;
// @__NO_SIDE_EFFECTS__
function Re(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ge(e) {
  return rl(e, !1);
}
function rl(e, t) {
  return /* @__PURE__ */ Re(e) ? e : new ll(e, t);
}
class ll {
  constructor(t, n) {
    this.dep = new ni(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ se(t), this._value = n ? t : Be(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ He(t) || /* @__PURE__ */ ct(t);
    t = s ? t : /* @__PURE__ */ se(t), it(t, n) && (this._rawValue = t, this._value = s ? t : Be(t), this.dep.trigger());
  }
}
function al(e) {
  return /* @__PURE__ */ Re(e) ? e.value : e;
}
const ul = {
  get: (e, t, n) => t === "__v_raw" ? e : al(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return /* @__PURE__ */ Re(i) && !/* @__PURE__ */ Re(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ro(e) {
  return /* @__PURE__ */ Pt(e) ? e : new Proxy(e, ul);
}
class cl {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ni(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = dn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ce !== this)
      return vo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return wo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function fl(e, t, n = !1) {
  let s, i;
  return z(e) ? s = e : (s = e.get, i = e.set), new cl(s, i, n);
}
const Rn = {}, Kn = /* @__PURE__ */ new WeakMap();
let Lt;
function dl(e, t = !1, n = Lt) {
  if (n) {
    let s = Kn.get(n);
    s || Kn.set(n, s = []), s.push(e);
  }
}
function hl(e, t, n = ue) {
  const { immediate: s, deep: i, once: o, scheduler: r, augmentJob: l, call: a } = n, d = (R) => i ? R : /* @__PURE__ */ He(R) || i === !1 || i === 0 ? bt(R, 1) : bt(R);
  let c, m, b, M, F = !1, P = !1;
  if (/* @__PURE__ */ Re(e) ? (m = () => e.value, F = /* @__PURE__ */ He(e)) : /* @__PURE__ */ Pt(e) ? (m = () => d(e), F = !0) : K(e) ? (P = !0, F = e.some((R) => /* @__PURE__ */ Pt(R) || /* @__PURE__ */ He(R)), m = () => e.map((R) => {
    if (/* @__PURE__ */ Re(R))
      return R.value;
    if (/* @__PURE__ */ Pt(R))
      return d(R);
    if (z(R))
      return a ? a(R, 2) : R();
  })) : z(e) ? t ? m = a ? () => a(e, 2) : e : m = () => {
    if (b) {
      at();
      try {
        b();
      } finally {
        ut();
      }
    }
    const R = Lt;
    Lt = c;
    try {
      return a ? a(e, 3, [M]) : e(M);
    } finally {
      Lt = R;
    }
  } : m = rt, t && i) {
    const R = m, J = i === !0 ? 1 / 0 : i;
    m = () => bt(R(), J);
  }
  const B = Kr(), N = () => {
    c.stop(), B && B.active && Gs(B.effects, c);
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
  let k = P ? new Array(e.length).fill(Rn) : Rn;
  const $ = (R) => {
    if (!(!(c.flags & 1) || !c.dirty && !R))
      if (t) {
        const J = c.run();
        if (R || i || F || (P ? J.some((j, U) => it(j, k[U])) : it(J, k))) {
          const j = Lt;
          at();
          try {
            b && b(), Lt = c;
            const U = [
              J,
              // pass undefined as the old value when it's changed for the first time
              k === Rn ? void 0 : P && k[0] === Rn ? [] : k,
              M
            ];
            k = J, a ? a(t, 3, U) : (
              // @ts-expect-error
              t(...U)
            );
          } finally {
            Lt = j, ut();
          }
        }
      } else
        c.run();
  };
  return l && l($), c = new go(m), c.scheduler = r ? () => r($, !1) : $, M = (R) => dl(R, !1, c), b = c.onStop = () => {
    const R = Kn.get(c);
    if (R) {
      if (a)
        a(R, 4);
      else
        for (const J of R) J();
      Kn.delete(c);
    }
  }, t ? s ? $(!0) : k = c.run() : r ? r($.bind(null, !0), !0) : c.run(), N.pause = c.pause.bind(c), N.resume = c.resume.bind(c), N.stop = N, N;
}
function bt(e, t = 1 / 0, n) {
  if (t <= 0 || !ae(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Re(e))
    bt(e.value, t, n);
  else if (K(e))
    for (let s = 0; s < e.length; s++)
      bt(e[s], t, n);
  else if (xt(e) || It(e))
    e.forEach((s) => {
      bt(s, t, n);
    });
  else if (ao(e)) {
    for (const s in e)
      bt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && bt(e[s], t, n);
  }
  return e;
}
function xn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (i) {
    ss(i, t, n);
  }
}
function Ge(e, t, n, s) {
  if (z(e)) {
    const i = xn(e, t, n, s);
    return i && ro(i) && i.catch((o) => {
      ss(o, t, n);
    }), i;
  }
  if (K(e)) {
    const i = [];
    for (let o = 0; o < e.length; o++)
      i.push(Ge(e[o], t, n, s));
    return i;
  }
}
function ss(e, t, n, s = !0) {
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
      at(), xn(o, null, 10, [
        e,
        a,
        d
      ]), ut();
      return;
    }
  }
  pl(e, n, i, s, r);
}
function pl(e, t, n, s = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Fe = [];
let ze = -1;
const nt = [];
let Et = null, Jt = 0;
const Io = /* @__PURE__ */ Promise.resolve();
let Hn = null;
function un(e) {
  const t = Hn || Io;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function gl(e) {
  let t = ze + 1, n = Fe.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = Fe[s], o = pn(i);
    o < e || o === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function li(e) {
  if (!(e.flags & 1)) {
    const t = pn(e), n = Fe[Fe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= pn(n) ? Fe.push(e) : Fe.splice(gl(t), 0, e), e.flags |= 1, Po();
  }
}
function Po() {
  Hn || (Hn = Io.then(jo));
}
function ml(e) {
  if (!K(e))
    Et && e.id === -1 ? Et.splice(Jt + 1, 0, e) : e.flags & 1 || (nt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      nt.push(e[t]);
  Po();
}
function ko(e, t, n, s = ze + 1) {
  for (; s < Fe.length; s++) {
    const i = Fe[s];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      Fe.splice(s, 1), s = e ? s - 1 : ze, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function Fo(e, t, n = 0) {
  if (nt.length) {
    let s = nt, i = 0;
    if (t) {
      s = [];
      for (let r = 0; r < nt.length; r++) {
        const l = nt[r];
        (l.i !== void 0 ? !l.i || l.i.uid < n : t.has(l)) ? nt[i++] = l : s.push(l);
      }
    }
    const o = [...new Set(s)].sort((r, l) => pn(r) - pn(l));
    if (nt.length = i, Et) {
      for (let r = 0; r < o.length; r++)
        Et.push(o[r]);
      return;
    }
    for (Et = o, Jt = 0; Jt < Et.length; Jt++) {
      const r = Et[Jt];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    Et = null, Jt = 0;
  }
}
let xs = !1;
function vl(e, t) {
  if (xs) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(nt);
  e(), xs = !0;
  try {
    ko(void 0, t), Fo(void 0, n, t);
  } finally {
    xs = !1;
  }
}
const pn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function jo(e) {
  try {
    for (ze = 0; ze < Fe.length; ze++) {
      const t = Fe[ze];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), xn(
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
    ze = -1, Fe.length = 0, Fo(), Hn = null, (Fe.length || nt.length) && jo();
  }
}
let Ae = null, No = null;
function Bn(e) {
  const t = Ae;
  return Ae = e, No = e && e.type.__scopeId || null, t;
}
function $o(e, t = Ae, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && Li(-1);
    const o = Bn(t), r = wt.length;
    let l;
    try {
      l = e(...i);
    } finally {
      for (let a = wt.length; a > r; a--) di();
      Bn(o), s._d && Li(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function zt(e, t) {
  if (Ae === null)
    return e;
  const n = us(Ae), s = e.dirs || (e.dirs = []);
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
function Nt(e, t, n, s) {
  const i = e.dirs, o = t && t.dirs;
  for (let r = 0; r < i.length; r++) {
    const l = i[r];
    o && (l.oldValue = o[r].value);
    let a = l.dir[s];
    a && (at(), Ge(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), ut());
  }
}
function yl(e, t) {
  if (je) {
    let n = je.provides;
    const s = je.parent && je.parent.provides;
    s === n && (n = je.provides = Object.create(s)), n[e] = t;
  }
}
function Ln(e, t, n = !1) {
  const s = ya();
  if (s || Yt) {
    let i = Yt ? Yt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && z(t) ? t.call(s && s.proxy) : t;
  }
}
const bl = /* @__PURE__ */ Symbol.for("v-scx"), wl = () => Ln(bl);
function _s(e, t, n) {
  return Lo(e, t, n);
}
function Lo(e, t, n = ue) {
  const { immediate: s, deep: i, flush: o, once: r } = n, l = Se({}, n), a = t && s || !t && o !== "post";
  let d;
  if (yn) {
    if (o === "sync") {
      const M = wl();
      d = M.__watcherHandles || (M.__watcherHandles = []);
    } else if (!a) {
      const M = () => {
      };
      return M.stop = rt, M.resume = rt, M.pause = rt, M;
    }
  }
  const c = je;
  l.call = (M, F, P) => Ge(M, c, F, P);
  let m = !1;
  o === "post" ? l.scheduler = (M) => {
    M.i = c, ke(M, c && c.suspense);
  } : o !== "sync" && (m = !0, l.scheduler = (M, F) => {
    F ? M() : li(M);
  }), l.augmentJob = (M) => {
    t && (M.flags |= 4), m && (M.flags |= 2, c && (M.id = c.uid, M.i = c));
  };
  const b = hl(e, t, l);
  return yn && (d ? d.push(b) : a && b()), b;
}
function xl(e, t, n) {
  const s = this.proxy, i = pe(e) ? e.includes(".") ? Do(s, e) : () => s[e] : e.bind(s, s);
  let o;
  z(t) ? o = t : (o = t.handler, n = t);
  const r = _n(this), l = Lo(i, o.bind(s), n);
  return r(), l;
}
function Do(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
const Tt = /* @__PURE__ */ new WeakMap(), Vo = /* @__PURE__ */ Symbol("_vte"), is = (e) => e.__isTeleport, Dt = (e) => e && (e.disabled || e.disabled === ""), _l = (e) => e && (e.defer || e.defer === ""), Oi = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Ti = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Ns = (e, t) => {
  const n = e && e.to;
  return pe(n) ? t ? t(n) : null : n;
}, Cl = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, s, i, o, r, l, a, d) {
    const {
      mc: c,
      pc: m,
      pbc: b,
      o: { insert: M, querySelector: F, createText: P, createComment: B, parentNode: N }
    } = d, k = Dt(t.props);
    let { dynamicChildren: $ } = t;
    const R = (U, Z, ie) => {
      U.shapeFlag & 16 && c(
        U.children,
        Z,
        ie,
        i,
        o,
        r,
        l,
        a
      );
    }, J = (U = t) => {
      const Z = Dt(U.props), ie = U.target = Ns(U.props, F), w = $s(ie, U, P, M);
      ie && (r !== "svg" && Oi(ie) ? r = "svg" : r !== "mathml" && Ti(ie) && (r = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(ie), Z || (R(U, ie, w), nn(U, !1)));
    }, j = (U) => {
      const Z = () => {
        if (Tt.get(U) === Z) {
          if (Tt.delete(U), Dt(U.props)) {
            const ie = N(U.el) || n;
            R(U, ie, U.anchor), nn(U, !0);
          }
          J(U);
        }
      };
      Tt.set(U, Z), ke(Z, o);
    };
    if (e == null) {
      const U = t.el = P(""), Z = t.anchor = P("");
      if (M(U, n, s), M(Z, n, s), _l(t.props) || o && o.pendingBranch) {
        j(t);
        return;
      }
      k && (R(t, n, Z), nn(t, !0)), J();
    } else {
      t.el = e.el;
      const U = t.anchor = e.anchor, Z = Tt.get(e);
      if (Z) {
        Z.flags |= 8, Tt.delete(e), j(t);
        return;
      }
      t.targetStart = e.targetStart;
      const ie = t.target = e.target, w = t.targetAnchor = e.targetAnchor, H = Dt(e.props), Y = H ? n : ie, he = H ? U : w;
      if (r === "svg" || Oi(ie) ? r = "svg" : (r === "mathml" || Ti(ie)) && (r = "mathml"), $ ? (b(
        e.dynamicChildren,
        $,
        Y,
        i,
        o,
        r,
        l
      ), fi(e, t, !0)) : a || m(
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
        H ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : In(
          t,
          n,
          U,
          d,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const we = Ns(t.props, F);
        we && (t.target = we, In(
          t,
          we,
          null,
          d,
          0
        ));
      } else H && In(
        t,
        ie,
        w,
        d,
        1
      );
      nn(t, k);
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
      props: b
    } = e, M = Dt(b), F = o || !M, P = Tt.get(e);
    if (P && (P.flags |= 8, Tt.delete(e)), m && (i(d), i(c)), o && i(a), !P && (M || m) && r & 16)
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
  move: In,
  hydrate: Sl
};
function In(e, t, n, { o: { insert: s }, m: i }, o = 2) {
  o === 0 && (e.targetStart && s(e.targetStart, t, n), s(e.targetAnchor, t, n), n = e.targetAnchor);
  const { el: r, anchor: l, shapeFlag: a, children: d, props: c } = e, m = o === 2;
  if (m && s(r, t, n), !Tt.has(e) && (!m || Dt(c)) && a & 16)
    for (let b = 0; b < d.length; b++)
      i(
        d[b],
        t,
        n,
        2
      );
  m && s(l, t, n);
}
function Sl(e, t, n, s, i, o, {
  o: { nextSibling: r, parentNode: l, querySelector: a, insert: d, createText: c }
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
  function M(B, N) {
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
  const F = t.target = Ns(
    t.props,
    a
  ), P = Dt(t.props);
  if (F) {
    const B = F._lpa || F.firstChild;
    t.shapeFlag & 16 && (P ? (M(e, t), b(F, B), t.targetAnchor || $s(
      F,
      t,
      c,
      d,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(e) === F ? e : null
    )) : (t.anchor = r(e), b(F, B), t.targetAnchor || $s(F, t, c, d), m(
      B && r(B),
      t,
      F,
      n,
      s,
      i,
      o
    ))), nn(t, P);
  } else P && t.shapeFlag & 16 && (M(e, t), t.targetStart = e, t.targetAnchor = r(e));
  return t.anchor && r(t.anchor);
}
const Ml = Cl;
function nn(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let s, i;
    for (t ? (s = e.el, i = e.anchor) : (s = e.targetStart, i = e.targetAnchor); s && s !== i; )
      s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid), s = s.nextSibling;
    n.ut();
  }
}
function $s(e, t, n, s, i = null) {
  const o = t.targetStart = n(""), r = t.targetAnchor = n("");
  return o[Vo] = r, e && (s(o, e, i), s(r, e, i)), r;
}
const Cs = /* @__PURE__ */ Symbol("_leaveCb");
function Ol(e) {
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
function Ko(e) {
  if (!ai(e))
    return is(e.type) && e.children ? Ol(e.children) : e;
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
function Un(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Un(
      is(n.type) && Ko(n) || n,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === de && K(e.children)) {
    const n = Zo(e.children, !1);
    n && Un(n, t);
  }
}
function Ls(e) {
  if (e.component)
    return Ls(e.component.subTree);
  if (e.type === de) {
    const t = K(e.children) && Zo(e.children, !1);
    return t ? Ls(t) : void 0;
  }
  if (e.type !== Ue)
    return e;
}
// @__NO_SIDE_EFFECTS__
function Ho(e, t) {
  return z(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Se({ name: e.name }, t, { setup: e })
  ) : e;
}
function Bo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ei(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Wn = /* @__PURE__ */ new WeakMap();
function cn(e, t, n, s, i = !1) {
  if (K(e)) {
    e.forEach(
      (P, B) => cn(
        P,
        t && (K(t) ? t[B] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (qt(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && cn(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? us(s.component) : s.el, r = i ? null : o, { i: l, r: a } = e, d = t && t.r, c = l.refs === ue ? l.refs = {} : l.refs, m = l.setupState, b = /* @__PURE__ */ se(m), M = m === ue ? oo : (P) => Ei(c, P) ? !1 : ee(b, P), F = (P, B) => !(B && Ei(c, B));
  if (d != null && d !== a) {
    if (Ai(t), pe(d))
      c[d] = null, M(d) && (m[d] = null);
    else if (/* @__PURE__ */ Re(d)) {
      const P = t;
      F(d, P.k) && (d.value = null), P.k && (c[P.k] = null);
    }
  }
  if (z(a))
    xn(a, l, 12, [r, c]);
  else {
    const P = pe(a), B = /* @__PURE__ */ Re(a);
    if (P || B) {
      const N = () => {
        if (e.f) {
          const k = P ? M(a) ? m[a] : c[a] : F() || !e.k ? a.value : c[e.k];
          if (i)
            K(k) && Gs(k, o);
          else if (K(k))
            k.includes(o) || k.push(o);
          else if (P)
            c[a] = [o], M(a) && (m[a] = c[a]);
          else {
            const $ = [o];
            F(a, e.k) && (a.value = $), e.k && (c[e.k] = $);
          }
        } else P ? (c[a] = r, M(a) && (m[a] = r)) : B && (F(a, e.k) && (a.value = r), e.k && (c[e.k] = r));
      };
      if (r) {
        const k = () => {
          N(), Wn.delete(e);
        };
        k.id = -1, Wn.set(e, k), ke(k, n);
      } else
        Ai(e), N();
    }
  }
}
function Ai(e) {
  const t = Wn.get(e);
  t && (t.flags |= 8, Wn.delete(e));
}
ts().requestIdleCallback;
ts().cancelIdleCallback;
const qt = (e) => !!e.type.__asyncLoader, ai = (e) => e.type.__isKeepAlive;
function Tl(e, t) {
  Uo(e, "a", t);
}
function El(e, t) {
  Uo(e, "da", t);
}
function Uo(e, t, n = je) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (os(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      ai(i.parent.vnode) && Al(s, t, n, i), i = i.parent;
  }
}
function Al(e, t, n, s) {
  const i = os(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  zo(() => {
    Gs(s[t], i);
  }, n);
}
function os(e, t, n = je, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...r) => {
      at();
      const l = _n(n), a = Ge(t, n, e, r);
      return l(), ut(), a;
    });
    return s ? i.unshift(o) : i.push(o), o;
  }
}
const Ct = (e) => (t, n = je) => {
  (!yn || e === "sp") && os(e, (...s) => t(...s), n);
}, Rl = Ct("bm"), Wo = Ct("m"), Il = Ct(
  "bu"
), Pl = Ct("u"), kl = Ct(
  "bum"
), zo = Ct("um"), Fl = Ct(
  "sp"
), jl = Ct("rtg"), Nl = Ct("rtc");
function $l(e, t = je) {
  os("ec", e, t);
}
const Ll = /* @__PURE__ */ Symbol.for("v-ndc");
function pt(e, t, n, s) {
  let i;
  const o = n, r = K(e);
  if (r || pe(e)) {
    const l = r && /* @__PURE__ */ Pt(e);
    let a = !1, d = !1;
    l && (a = !/* @__PURE__ */ He(e), d = /* @__PURE__ */ ct(e), e = ns(e)), i = new Array(e.length);
    for (let c = 0, m = e.length; c < m; c++)
      i[c] = t(
        a ? d ? kt(Be(e[c])) : Be(e[c]) : e[c],
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
function Dl(e, t, n, s, i, o) {
  if (n == null && (n = {}), Ae.ce || Ae.parent && qt(Ae.parent) && Ae.parent.ce) {
    const d = n, c = Object.keys(d).length > 0;
    return G(), mn(
      de,
      null,
      [lt("slot", d, s)],
      c ? -2 : 64
    );
  }
  let r = e[t];
  r && r._c && (r._d = !1);
  const l = wt.length;
  G();
  let a;
  try {
    const d = r && Jo(r(n)), c = n.key || o || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    d && d.key;
    a = mn(
      de,
      {
        key: (c && !Ye(c) ? c : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!d && s ? "_fb" : "")
      },
      d || (s ? s() : []),
      d && e._ === 1 ? 64 : -2
    );
  } catch (d) {
    for (let c = wt.length; c > l; c--) di();
    throw d;
  } finally {
    r && r._c && (r._d = !0);
  }
  return a;
}
function Jo(e) {
  return e.some((t) => as(t) ? !(t.type === Ue || t.type === de && !Jo(t.children)) : !0) ? e : null;
}
const Ds = (e) => e ? hr(e) ? us(e) : Ds(e.parent) : null, fn = (
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
    $parent: (e) => Ds(e.parent),
    $root: (e) => Ds(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Yo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      li(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = un.bind(e.proxy)),
    $watch: (e) => xl.bind(e)
  })
), Ss = (e, t) => e !== ue && !e.__isScriptSetup && ee(e, t), Vl = {
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
        if (Ss(s, t))
          return r[t] = 1, s[t];
        if (i !== ue && ee(i, t))
          return r[t] = 2, i[t];
        if (ee(o, t))
          return r[t] = 3, o[t];
        if (n !== ue && ee(n, t))
          return r[t] = 4, n[t];
        Vs && (r[t] = 0);
      }
    }
    const d = fn[t];
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
    return Ss(i, t) ? (i[t] = n, !0) : s !== ue && ee(s, t) ? (s[t] = n, !0) : ee(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, props: o, type: r }
  }, l) {
    let a;
    return !!(n[l] || e !== ue && l[0] !== "$" && ee(e, l) || Ss(t, l) || ee(o, l) || ee(s, l) || ee(fn, l) || ee(i.config.globalProperties, l) || (a = r.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ee(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Ri(e) {
  return K(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Vs = !0;
function Kl(e) {
  const t = Yo(e), n = e.proxy, s = e.ctx;
  Vs = !1, t.beforeCreate && Ii(t.beforeCreate, e, "bc");
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
    mounted: b,
    beforeUpdate: M,
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
    serverPrefetch: ie,
    // public API
    expose: w,
    inheritAttrs: H,
    // assets
    components: Y,
    directives: he,
    filters: we
  } = t;
  if (d && Hl(d, s, null), r)
    for (const Q in r) {
      const re = r[Q];
      z(re) && (s[Q] = re.bind(n));
    }
  if (i) {
    const Q = i.call(n, n);
    ae(Q) && (e.data = /* @__PURE__ */ ii(Q));
  }
  if (Vs = !0, o)
    for (const Q in o) {
      const re = o[Q], Ie = z(re) ? re.bind(n, n) : z(re.get) ? re.get.bind(n, n) : rt, Xe = !z(re) && z(re.set) ? re.set.bind(n) : rt, We = et({
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
      qo(l[Q], s, n, Q);
  if (a) {
    const Q = z(a) ? a.call(n) : a;
    Reflect.ownKeys(Q).forEach((re) => {
      yl(re, Q[re]);
    });
  }
  c && Ii(c, e, "c");
  function ve(Q, re) {
    K(re) ? re.forEach((Ie) => Q(Ie.bind(n))) : re && Q(re.bind(n));
  }
  if (ve(Rl, m), ve(Wo, b), ve(Il, M), ve(Pl, F), ve(Tl, P), ve(El, B), ve($l, Z), ve(Nl, j), ve(jl, U), ve(kl, k), ve(zo, R), ve(Fl, ie), K(w))
    if (w.length) {
      const Q = e.exposed || (e.exposed = {});
      w.forEach((re) => {
        Object.defineProperty(Q, re, {
          get: () => n[re],
          set: (Ie) => n[re] = Ie,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  J && e.render === rt && (e.render = J), H != null && (e.inheritAttrs = H), Y && (e.components = Y), he && (e.directives = he), ie && Bo(e);
}
function Hl(e, t, n = rt) {
  K(e) && (e = Ks(e));
  for (const s in e) {
    const i = e[s];
    let o;
    ae(i) ? "default" in i ? o = Ln(
      i.from || s,
      i.default,
      !0
    ) : o = Ln(i.from || s) : o = Ln(i), /* @__PURE__ */ Re(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (r) => o.value = r
    }) : t[s] = o;
  }
}
function Ii(e, t, n) {
  Ge(
    K(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function qo(e, t, n, s) {
  let i = s.includes(".") ? Do(n, s) : () => n[s];
  if (pe(e)) {
    const o = t[e];
    z(o) && _s(i, o);
  } else if (z(e))
    _s(i, e.bind(n));
  else if (ae(e))
    if (K(e))
      e.forEach((o) => qo(o, t, n, s));
    else {
      const o = z(e.handler) ? e.handler.bind(n) : t[e.handler];
      z(o) && _s(i, o, e);
    }
}
function Yo(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: o,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = o.get(t);
  let a;
  return l ? a = l : !i.length && !n && !s ? a = t : (a = {}, i.length && i.forEach(
    (d) => zn(a, d, r, !0)
  ), zn(a, t, r)), ae(t) && o.set(t, a), a;
}
function zn(e, t, n, s = !1) {
  const { mixins: i, extends: o } = t;
  o && zn(e, o, n, !0), i && i.forEach(
    (r) => zn(e, r, n, !0)
  );
  for (const r in t)
    if (!(s && r === "expose")) {
      const l = Bl[r] || n && n[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const Bl = {
  data: Pi,
  props: ki,
  emits: ki,
  // objects
  methods: sn,
  computed: sn,
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
  components: sn,
  directives: sn,
  // watch
  watch: Wl,
  // provide / inject
  provide: Pi,
  inject: Ul
};
function Pi(e, t) {
  return t ? e ? function() {
    return Se(
      z(e) ? e.call(this, this) : e,
      z(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ul(e, t) {
  return sn(Ks(e), Ks(t));
}
function Ks(e) {
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
function sn(e, t) {
  return e ? Se(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ki(e, t) {
  return e ? K(e) && K(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Se(
    /* @__PURE__ */ Object.create(null),
    Ri(e),
    Ri(t ?? {})
  ) : t;
}
function Wl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Se(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Pe(e[s], t[s]);
  return n;
}
function Go() {
  return {
    app: null,
    config: {
      isNativeTag: oo,
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
let zl = 0;
function Jl(e, t) {
  return function(s, i = null) {
    z(s) || (s = Se({}, s)), i != null && !ae(i) && (i = null);
    const o = Go(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const d = o.app = {
      _uid: zl++,
      _component: s,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: Sa,
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
      mount(c, m, b) {
        if (!a) {
          const M = d._ceVNode || lt(s, i);
          return M.appContext = o, b === !0 ? b = "svg" : b === !1 && (b = void 0), e(M, c, b), a = !0, d._container = c, c.__vue_app__ = d, us(M.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        a && (Ge(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(c, m) {
        return o.provides[c] = m, d;
      },
      runWithContext(c) {
        const m = Yt;
        Yt = d;
        try {
          return c();
        } finally {
          Yt = m;
        }
      }
    };
    return d;
  };
}
let Yt = null;
const ql = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Je(t)}Modifiers`] || e[`${Ft(t)}Modifiers`];
function Yl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ue;
  let i = n;
  const o = t.startsWith("update:"), r = o && ql(s, t.slice(7));
  r && (r.trim && (i = n.map((c) => pe(c) ? c.trim() : c)), r.number && (i = i.map(es)));
  let l, a = s[l = ms(t)] || // also try camelCase event handler (#2249)
  s[l = ms(Je(t))];
  !a && o && (a = s[l = ms(Ft(t))]), a && Ge(
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
const Gl = /* @__PURE__ */ new WeakMap();
function Xo(e, t, n = !1) {
  const s = n ? Gl : t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const o = e.emits;
  let r = {}, l = !1;
  if (!z(e)) {
    const a = (d) => {
      const c = Xo(d, t, !0);
      c && (l = !0, Se(r, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (ae(e) && s.set(e, null), null) : (K(o) ? o.forEach((a) => r[a] = null) : Se(r, o), ae(e) && s.set(e, r), r);
}
function rs(e, t) {
  return !e || !Xn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Ft(t)) || ee(e, t));
}
function Fi(e) {
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
    data: b,
    setupState: M,
    ctx: F,
    inheritAttrs: P
  } = e, B = Bn(e);
  let N, k;
  try {
    if (n.shapeFlag & 4) {
      const R = i || s, J = R;
      N = st(
        d.call(
          J,
          R,
          c,
          m,
          M,
          b,
          F
        )
      ), k = l;
    } else {
      const R = t;
      N = st(
        R.length > 1 ? R(
          m,
          { attrs: l, slots: r, emit: a }
        ) : R(
          m,
          null
        )
      ), k = t.props ? l : Xl(l);
    }
  } catch (R) {
    wt.length = 0, ss(R, e, 1), N = lt(Ue);
  }
  let $ = N;
  if (k && P !== !1) {
    const R = Object.keys(k), { shapeFlag: J } = $;
    R.length && J & 7 && (o && R.some(Zn) && (k = Zl(
      k,
      o
    )), $ = Xt($, k, !1, !0));
  }
  if (n.dirs && ($ = Xt($, null, !1, !0), $.dirs = $.dirs ? $.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const R = is($.type) && Ko($) || $;
    Un(R, n.transition);
  }
  return N = $, Bn(B), N;
}
function Zo(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (as(i)) {
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
const Xl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Xn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Zl = (e, t) => {
  const n = {};
  for (const s in e)
    (!Zn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Ql(e, t, n) {
  const { props: s, children: i, component: o } = e, { props: r, children: l, patchFlag: a } = t, d = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? ji(s, r, d) : !!r;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let m = 0; m < c.length; m++) {
        const b = c[m];
        if (Qo(r, s, b) && !rs(d, b))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === r ? !1 : s ? r ? ji(s, r, d) : !0 : !!r;
  return !1;
}
function ji(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const o = s[i];
    if (!ee(e, o) || Qo(t, e, o) && !rs(n, o))
      return !0;
  }
  return !1;
}
function Qo(e, t, n) {
  const s = e[n], i = t[n];
  return n === "style" && ae(s) && ae(i) ? !_t(s, i) : s !== i;
}
function ea({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = s, e = i), i === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const er = {}, tr = () => Object.create(er), nr = (e) => Object.getPrototypeOf(e) === er;
function ta(e, t, n, s = !1) {
  const i = {}, o = tr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), sr(e, t, i, o);
  for (const r in e.propsOptions[0])
    r in i || (i[r] = void 0);
  n ? e.props = s ? i : /* @__PURE__ */ il(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function na(e, t, n, s) {
  const {
    props: i,
    attrs: o,
    vnode: { patchFlag: r }
  } = e, l = /* @__PURE__ */ se(i), [a] = e.propsOptions;
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
        let b = c[m];
        if (rs(e.emitsOptions, b))
          continue;
        const M = t[b];
        if (a)
          if (ee(o, b))
            M !== o[b] && (o[b] = M, d = !0);
          else {
            const F = Je(b);
            i[F] = Hs(
              a,
              l,
              F,
              M,
              e,
              !1
            );
          }
        else
          M !== o[b] && (o[b] = M, d = !0);
      }
    }
  } else {
    sr(e, t, i, o) && (d = !0);
    let c;
    for (const m in l)
      (!t || // for camelCase
      !ee(t, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Ft(m)) === m || !ee(t, c))) && (a ? n && // for camelCase
      (n[m] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[m] = Hs(
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
function sr(e, t, n, s) {
  const [i, o] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let a in t) {
      if (rn(a))
        continue;
      const d = t[a];
      let c;
      i && ee(i, c = Je(a)) ? !o || !o.includes(c) ? n[c] = d : (l || (l = {}))[c] = d : rs(e.emitsOptions, a) || (!(a in s) || d !== s[a]) && (s[a] = d, r = !0);
    }
  if (o) {
    const a = /* @__PURE__ */ se(n), d = l || ue;
    for (let c = 0; c < o.length; c++) {
      const m = o[c];
      n[m] = Hs(
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
function Hs(e, t, n, s, i, o) {
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
          const c = _n(i);
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
    ] && (s === "" || s === Ft(n)) && (s = !0));
  }
  return s;
}
const sa = /* @__PURE__ */ new WeakMap();
function ir(e, t, n = !1) {
  const s = n ? sa : t.propsCache, i = s.get(e);
  if (i)
    return i;
  const o = e.props, r = {}, l = [];
  let a = !1;
  if (!z(e)) {
    const c = (m) => {
      a = !0;
      const [b, M] = ir(m, t, !0);
      Se(r, b), M && l.push(...M);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a)
    return ae(e) && s.set(e, Vt), Vt;
  if (K(o))
    for (let c = 0; c < o.length; c++) {
      const m = Je(o[c]);
      Ni(m) && (r[m] = ue);
    }
  else if (o)
    for (const c in o) {
      const m = Je(c);
      if (Ni(m)) {
        const b = o[c], M = r[m] = K(b) || z(b) ? { type: b } : Se({}, b), F = M.type;
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
        M[
          0
          /* shouldCast */
        ] = P, M[
          1
          /* shouldCastTrue */
        ] = B, (P || ee(M, "default")) && l.push(m);
      }
    }
  const d = [r, l];
  return ae(e) && s.set(e, d), d;
}
function Ni(e) {
  return e[0] !== "$" && !rn(e);
}
const ui = (e) => e === "_" || e === "_ctx" || e === "$stable", ci = (e) => K(e) ? e.map(st) : [st(e)], ia = (e, t, n) => {
  if (t._n)
    return t;
  const s = $o((...i) => ci(t(...i)), n);
  return s._c = !1, s;
}, or = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (ui(i)) continue;
    const o = e[i];
    if (z(o))
      t[i] = ia(i, o, s);
    else if (o != null) {
      const r = ci(o);
      t[i] = () => r;
    }
  }
}, rr = (e, t) => {
  const n = ci(t);
  e.slots.default = () => n;
}, lr = (e, t, n) => {
  for (const s in t)
    (n || !ui(s)) && (e[s] = t[s]);
}, oa = (e, t, n) => {
  const s = e.slots = tr();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (lr(s, t, n), n && co(s, "_", i, !0)) : or(t, s);
  } else t && rr(e, t);
}, ra = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let o = !0, r = ue;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : lr(i, t, n) : (o = !t.$stable, or(t, i)), r = t;
  } else t && (rr(e, t), r = { default: 1 });
  if (o)
    for (const l in i)
      !ui(l) && r[l] == null && delete i[l];
}, ke = fa;
function la(e) {
  return aa(e);
}
function aa(e, t) {
  const n = ts();
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
    nextSibling: b,
    setScopeId: M = rt,
    insertStaticContent: F
  } = e, P = (u, g, v, S = null, x = null, C = null, E = void 0, A = null, T = !!g.dynamicChildren) => {
    if (u === g)
      return;
    u && !tn(u, g) && (S = ft(u), Ne(u, x, C, !0), u = null), g.patchFlag === -2 && (T = !1, g.dynamicChildren = null), g.dynamicChildren && u && u.dynamicChildren && u.dynamicChildren.hasOnce && (g.dynamicChildren === Vt && (g.dynamicChildren = []), g.dynamicChildren.hasOnce = !0);
    const { type: _, ref: L, shapeFlag: I } = g;
    switch (_) {
      case ls:
        B(u, g, v, S);
        break;
      case Ue:
        N(u, g, v, S);
        break;
      case Os:
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
    L != null && x ? cn(L, u && u.ref, C, g || u, !g) : L == null && u && u.ref != null && cn(u.ref, null, C, u, !0);
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
        _ && _._beginPatch(), ie(
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
    const { props: L, shapeFlag: I, transition: D, dirs: W } = u;
    if (T = u.el = r(
      u.type,
      C,
      L && L.is,
      L
    ), I & 8 ? c(T, u.children) : I & 16 && Z(
      u.children,
      T,
      null,
      S,
      x,
      Ms(u, C),
      E,
      A
    ), W && Nt(u, null, S, "created"), U(T, u, u.scopeId, E, S), L) {
      for (const X in L)
        X !== "value" && !rn(X) && o(T, X, null, L[X], C, S);
      "value" in L && o(T, "value", null, L.value, C), (_ = L.onVnodeBeforeMount) && Ze(_, S, u);
    }
    W && Nt(u, null, S, "beforeMount");
    const q = ua(x, D);
    q && D.beforeEnter(T), s(T, g, v), ((_ = L && L.onVnodeMounted) || q || W) && ke(() => {
      _ && Ze(_, S, u), q && D.enter(T), W && Nt(u, null, S, "mounted");
    }, x);
  }, U = (u, g, v, S, x) => {
    if (v && M(u, v), S)
      for (let C = 0; C < S.length; C++)
        M(u, S[C]);
    if (x) {
      let C = x.subTree;
      if (g === C || ur(C.type) && (C.ssContent === g || C.ssFallback === g)) {
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
      const L = u[_] = A ? mt(u[_]) : st(u[_]);
      P(
        null,
        L,
        g,
        v,
        S,
        x,
        C,
        E,
        A
      );
    }
  }, ie = (u, g, v, S, x, C, E) => {
    const A = g.el = u.el;
    let { patchFlag: T, dynamicChildren: _, dirs: L } = g;
    T |= u.patchFlag & 16;
    const I = u.props || ue, D = g.props || ue;
    let W;
    if (v && $t(v, !1), (W = D.onVnodeBeforeUpdate) && Ze(W, v, g, u), L && Nt(g, u, v, "beforeUpdate"), v && $t(v, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!u.dynamicChildren || u.dynamicChildren.length !== _.length) && (T = 0, E = !1, _ = null), (I.innerHTML && D.innerHTML == null || I.textContent && D.textContent == null) && c(A, ""), _ ? w(
      u.dynamicChildren,
      _,
      A,
      v,
      S,
      Ms(g, x),
      C
    ) : E || re(
      u,
      g,
      A,
      null,
      v,
      S,
      Ms(g, x),
      C,
      !1
    ), T > 0) {
      if (T & 16)
        H(A, I, D, v, x);
      else if (T & 2 && I.class !== D.class && o(A, "class", null, D.class, x), T & 4 && o(A, "style", I.style, D.style, x), T & 8) {
        const q = g.dynamicProps;
        for (let X = 0; X < q.length; X++) {
          const te = q[X], fe = I[te], be = D[te];
          (be !== fe || te === "value") && o(A, te, fe, be, x, v);
        }
      }
      T & 1 && u.children !== g.children && c(A, g.children);
    } else !E && _ == null && H(A, I, D, v, x);
    ((W = D.onVnodeUpdated) || L) && ke(() => {
      W && Ze(W, v, g, u), L && Nt(g, u, v, "updated");
    }, S);
  }, w = (u, g, v, S, x, C, E) => {
    for (let A = 0; A < g.length; A++) {
      const T = u[A], _ = g[A], L = T.el || Bs(T), I = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        L && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (T.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !tn(T, _) || // - In the case of a component, it could contain anything.
        T.shapeFlag & 198) ? m(L) : (
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
          !rn(C) && !(C in v) && o(
            u,
            C,
            g[C],
            null,
            x,
            S
          );
      for (const C in v) {
        if (rn(C)) continue;
        const E = v[C], A = g[C];
        E !== A && C !== "value" && o(u, C, A, E, x, S);
      }
      "value" in v && o(u, "value", g.value, v.value, x);
    }
  }, Y = (u, g, v, S, x, C, E, A, T) => {
    const _ = g.el = u ? u.el : l(""), L = g.anchor = u ? u.anchor : l("");
    let { patchFlag: I, dynamicChildren: D, slotScopeIds: W } = g;
    W && (A = A ? A.concat(W) : W), u == null ? (s(_, v, S), s(L, v, S), Z(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      v,
      L,
      x,
      C,
      E,
      A,
      T
    )) : I > 0 && I & 64 && D && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === D.length ? (w(
      u.dynamicChildren,
      D,
      v,
      x,
      C,
      E,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || x && g === x.subTree) && fi(
      u,
      g,
      !0
      /* shallow */
    )) : re(
      u,
      g,
      v,
      L,
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
    ) : we(
      g,
      v,
      S,
      x,
      C,
      E,
      T
    ) : Qt(u, g, T);
  }, we = (u, g, v, S, x, C, E) => {
    const A = u.component = va(
      u,
      S,
      x
    );
    if (ai(u) && (A.ctx.renderer = Mt), ba(A, !1, E), A.asyncDep) {
      if (x && x.registerDep(
        A,
        ve,
        E,
        C
      ), !u.el) {
        const T = A.subTree = lt(Ue);
        N(null, T, g, v), u.placeholder = T.el;
      }
    } else
      ve(
        A,
        u,
        g,
        v,
        x,
        C,
        E
      );
  }, Qt = (u, g, v) => {
    const S = g.component = u.component;
    if (Ql(u, g, v))
      if (S.asyncDep && !S.asyncResolved) {
        g.el = u.el, g.placeholder = u.placeholder, Q(S, g, v);
        return;
      } else
        S.next = g, S.update();
    else
      g.el = u.el, g.placeholder = u.placeholder, S.vnode = g;
  }, ve = (u, g, v, S, x, C, E) => {
    const A = () => {
      if (u.isMounted) {
        let { next: I, bu: D, u: W, parent: q, vnode: X } = u;
        {
          const Me = ar(u);
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
        $t(u, !1), I ? (I.el = X.el, Q(u, I, E)) : I = X, D && $n(D), (fe = I.props && I.props.onVnodeBeforeUpdate) && Ze(fe, q, I, X), $t(u, !0);
        const be = Fi(u), $e = u.subTree;
        u.subTree = be, P(
          $e,
          be,
          // parent may have changed if it's in a teleport
          m($e.el),
          // anchor may have changed if it's in a fragment
          ft($e),
          u,
          x,
          C
        ), I.el = be.el, te === null && ea(u, be.el), W && ke(W, x), (fe = I.props && I.props.onVnodeUpdated) && ke(
          () => Ze(fe, q, I, X),
          x
        );
      } else {
        let I;
        const { el: D, props: W } = g, { bm: q, m: X, parent: te, root: fe, type: be } = u, $e = qt(g);
        $t(u, !1), q && $n(q), !$e && (I = W && W.onVnodeBeforeMount) && Ze(I, te, g), $t(u, !0);
        {
          fe.ce && fe.ce._hasShadowRoot() && fe.ce._injectChildStyle(
            be,
            u.parent ? u.parent.type : void 0
          );
          const Me = u.subTree = Fi(u);
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
        (g.shapeFlag & 256 || te && qt(te.vnode) && te.vnode.shapeFlag & 256) && u.a && ke(u.a, x), u.isMounted = !0, g = v = S = null;
      }
    };
    u.scope.on();
    const T = u.effect = new go(A);
    u.scope.off();
    const _ = u.update = T.run.bind(T), L = u.job = T.runIfDirty.bind(T);
    L.i = u, L.id = u.uid, T.scheduler = () => li(L), $t(u, !0), _();
  }, Q = (u, g, v) => {
    g.component = u;
    const S = u.vnode.props;
    u.vnode = g, u.next = null, na(u, g.props, S, v), ra(u, g.children, v), at(), ko(u), ut();
  }, re = (u, g, v, S, x, C, E, A, T = !1) => {
    const _ = u && u.children, L = u ? u.shapeFlag : 0, I = g.children, { patchFlag: D, shapeFlag: W } = g;
    if (D > 0) {
      if (D & 128) {
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
      } else if (D & 256) {
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
    W & 8 ? (L & 16 && ye(_, x, C), I !== _ && c(v, I)) : L & 16 ? W & 16 ? Xe(
      _,
      I,
      v,
      S,
      x,
      C,
      E,
      A,
      T
    ) : ye(_, x, C, !0) : (L & 8 && c(v, ""), W & 16 && Z(
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
    u = u || Vt, g = g || Vt;
    const _ = u.length, L = g.length, I = Math.min(_, L);
    let D;
    for (D = 0; D < I; D++) {
      const W = g[D] = T ? mt(g[D]) : st(g[D]);
      P(
        u[D],
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
    _ > L ? ye(
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
    const L = g.length;
    let I = u.length - 1, D = L - 1;
    for (; _ <= I && _ <= D; ) {
      const W = u[_], q = g[_] = T ? mt(g[_]) : st(g[_]);
      if (tn(W, q))
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
    for (; _ <= I && _ <= D; ) {
      const W = u[I], q = g[D] = T ? mt(g[D]) : st(g[D]);
      if (tn(W, q))
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
      I--, D--;
    }
    if (_ > I) {
      if (_ <= D) {
        const W = D + 1, q = W < L ? g[W].el : S;
        for (; _ <= D; )
          P(
            null,
            g[_] = T ? mt(g[_]) : st(g[_]),
            v,
            q,
            x,
            C,
            E,
            A,
            T
          ), _++;
      }
    } else if (_ > D)
      for (; _ <= I; )
        Ne(u[_], x, C, !0), _++;
    else {
      const W = _, q = _, X = /* @__PURE__ */ new Map();
      for (_ = q; _ <= D; _++) {
        const Oe = g[_] = T ? mt(g[_]) : st(g[_]);
        Oe.key != null && X.set(Oe.key, _);
      }
      let te, fe = 0;
      const be = D - q + 1;
      let $e = !1, Me = 0;
      const Ot = new Array(be);
      for (_ = 0; _ < be; _++) Ot[_] = 0;
      for (_ = W; _ <= I; _++) {
        const Oe = u[_];
        if (fe >= be) {
          Ne(Oe, x, C, !0);
          continue;
        }
        let Le;
        if (Oe.key != null)
          Le = X.get(Oe.key);
        else
          for (te = q; te <= D; te++)
            if (Ot[te - q] === 0 && tn(Oe, g[te])) {
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
      const Mn = $e ? ca(Ot) : Vt;
      for (te = Mn.length - 1, _ = be - 1; _ >= 0; _--) {
        const Oe = q + _, Le = g[Oe], jt = g[Oe + 1], De = Oe + 1 < L ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          jt.el || Bs(jt)
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
        ) : $e && (te < 0 || _ !== Mn[te] ? We(Le, v, De, 2) : te--);
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
    if (E === Os) {
      $(u, g, v);
      return;
    }
    if (S !== 2 && _ & 1 && A)
      if (S === 0)
        A.persisted && !C[Cs] ? s(C, g, v) : (A.beforeEnter(C), s(C, g, v), ke(() => A.enter(C), x));
      else {
        const { leave: I, delayLeave: D, afterLeave: W } = A, q = () => {
          u.ctx.isUnmounted ? i(C) : s(C, g, v);
        }, X = () => {
          const te = C._isLeaving || !!C[Cs];
          C._isLeaving && C[Cs](
            !0
            /* cancelled */
          ), A.persisted && !te ? q() : I(C, () => {
            q(), W && W();
          });
        };
        D ? D(C, q, X) : X();
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
      shapeFlag: L,
      patchFlag: I,
      dirs: D,
      cacheIndex: W,
      memo: q
    } = u;
    if ((I === -2 || _ && _.hasOnce) && (x = !1), A != null && (at(), cn(A, null, v, u, !0), ut()), W != null && (!u.ctx || u.ctx === g) && (g.renderCache[W] = void 0), L & 256) {
      g.ctx.deactivate(u);
      return;
    }
    const X = L & 1 && D, te = !qt(u);
    let fe;
    if (te && (fe = E && E.onVnodeBeforeUnmount) && Ze(fe, g, u), L & 6)
      fs(u.component, v, S);
    else {
      if (L & 128) {
        u.suspense.unmount(v, S);
        return;
      }
      X && Nt(u, null, g, "beforeUnmount"), L & 64 ? u.type.remove(
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
      (C !== de || I > 0 && I & 64) ? ye(
        _,
        g,
        v,
        !1,
        !0
      ) : (C === de && I & 384 || !x && L & 16) && ye(T, g, v), S && Cn(u);
    }
    const be = q != null && W == null;
    (te && (fe = E && E.onVnodeUnmounted) || X || be) && ke(() => {
      fe && Ze(fe, g, u), X && Nt(u, null, g, "unmounted"), be && (u.el = null);
    }, v);
  }, Cn = (u) => {
    const { type: g, el: v, anchor: S, transition: x } = u, C = g === de;
    if (C && !x) {
      Sn(v, S);
      return;
    }
    if (g === Os) {
      R(u), x && !x.persisted && x.afterLeave && x.afterLeave();
      return;
    }
    const E = C ? Ls(u) : u, A = () => {
      C ? m(v) && Sn(v, S) : i(v), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (E && E.shapeFlag & 1 && x && !x.persisted) {
      const { leave: T, delayLeave: _ } = x, L = E.el, I = () => T(L, A);
      _ ? _(L, A, I) : I();
    } else
      A();
  }, Sn = (u, g) => {
    let v;
    for (; u !== g; )
      v = b(u), i(u), u = v;
    i(g);
  }, fs = (u, g, v) => {
    const { bum: S, scope: x, job: C, subTree: E, um: A, m: T, a: _ } = u;
    $i(T), $i(_), S && $n(S), x.stop(), C ? (C.flags |= 8, Ne(E, u, g, v)) : u.vnode.el && E && (E.transition = u.vnode.transition, Ne(E, u, g, v)), A && ke(A, g), ke(() => {
      u.isUnmounted = !0;
    }, g);
  }, ye = (u, g, v, S = !1, x = !1, C = 0) => {
    for (let E = C; E < u.length; E++)
      Ne(u[E], g, v, S, x);
  }, ft = (u) => {
    if (u.shapeFlag & 6)
      return ft(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const g = b(u.anchor || u.el), v = g && g[Vo];
    return v ? b(v) : g;
  }, St = (u, g, v) => {
    const S = u && g._vnode ? void 0 : u && u.component ? u.component.uid : ma();
    vl(() => {
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
    r: Cn,
    mt: we,
    mc: Z,
    pc: re,
    pbc: w,
    n: ft,
    o: e
  };
  return {
    render: St,
    hydrate: void 0,
    createApp: Jl(St)
  };
}
function Ms({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function $t({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ua(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function fi(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (K(s) && K(i))
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
      let l = i[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = mt(i[o]), l.el = r.el), !n && l.patchFlag !== -2 && fi(r, l)), l.type === ls && (l.patchFlag === -1 && (l = i[o] = mt(l)), l.el = r.el), l.type === Ue && !l.el && (l.el = r.el);
    }
}
function ca(e) {
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
function ar(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ar(t);
}
function $i(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Bs(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Bs(t.subTree) : null;
}
const ur = (e) => e.__isSuspense;
function fa(e, t) {
  t && t.pendingBranch ? K(e) ? t.effects.push(...e) : t.effects.push(e) : ml(e);
}
const de = /* @__PURE__ */ Symbol.for("v-fgt"), ls = /* @__PURE__ */ Symbol.for("v-txt"), Ue = /* @__PURE__ */ Symbol.for("v-cmt"), Os = /* @__PURE__ */ Symbol.for("v-stc"), wt = [];
let Ve = null;
function G(e = !1) {
  wt.push(Ve = e ? null : []);
}
function di() {
  wt.pop(), Ve = wt[wt.length - 1] || null;
}
let gn = 1;
function Li(e, t = !1) {
  gn += e, e < 0 && Ve && t && (Ve.hasOnce = !0);
}
function cr(e) {
  return e.dynamicChildren = gn > 0 ? Ve || Vt : null, di(), gn > 0 && Ve && Ve.push(e), e;
}
function oe(e, t, n, s, i, o) {
  return cr(
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
function mn(e, t, n, s, i) {
  return cr(
    lt(
      e,
      t,
      n,
      s,
      i,
      !0
    )
  );
}
function as(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function tn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const fr = ({ key: e }) => e ?? null, Dn = ({
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
    key: t && fr(t),
    ref: t && Dn(t),
    scopeId: No,
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
  return l ? (Jn(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= pe(n) ? 8 : 16), gn > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Ve && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ve.push(a), a;
}
const lt = da;
function da(e, t = null, n = null, s = 0, i = null, o = !1) {
  if ((!e || e === Ll) && (e = Ue), as(e)) {
    const l = Xt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Jn(l, n), gn > 0 && !o && Ve && (l.shapeFlag & 6 ? Ve[Ve.indexOf(e)] = l : Ve.push(l)), l.patchFlag = -2, l;
  }
  if (Ca(e) && (e = e.__vccOpts), t) {
    t = ha(t);
    let { class: l, style: a } = t;
    l && !pe(l) && (t.class = At(l)), ae(a) && (/* @__PURE__ */ ri(a) && !K(a) && (a = Se({}, a)), t.style = Kt(a));
  }
  const r = pe(e) ? 1 : ur(e) ? 128 : is(e) ? 64 : ae(e) ? 4 : z(e) ? 2 : 0;
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
function ha(e) {
  return e ? /* @__PURE__ */ ri(e) || nr(e) ? Se({}, e) : e : null;
}
function Xt(e, t, n = !1, s = !1) {
  const { props: i, ref: o, patchFlag: r, children: l, transition: a } = e, d = t ? pa(i || {}, t) : i, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && fr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? K(o) ? o.concat(Dn(t)) : [o, Dn(t)] : Dn(t)
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
    ssContent: e.ssContent && Xt(e.ssContent),
    ssFallback: e.ssFallback && Xt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && s && Un(
    c,
    a.clone(c)
  ), c;
}
function Te(e = " ", t = 0) {
  return lt(ls, null, e, t);
}
function Qe(e = "", t = !1) {
  return t ? (G(), mn(Ue, null, e)) : lt(Ue, null, e);
}
function st(e) {
  return e == null || typeof e == "boolean" ? lt(Ue) : K(e) ? lt(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : as(e) ? mt(e) : lt(ls, null, String(e));
}
function mt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Xt(e);
}
function Jn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (K(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Jn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !nr(t) ? t._ctx = Ae : i === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (z(t)) {
    if (s & 65) {
      Jn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ae }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [Te(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function pa(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = At([t.class, s.class]));
      else if (i === "style")
        t.style = Kt([t.style, s.style]);
      else if (Xn(i)) {
        const o = t[i], r = s[i];
        r && o !== r && !(K(o) && o.includes(r)) ? t[i] = o ? [].concat(o, r) : r : r == null && o == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Zn(i) && (t[i] = r);
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
const ga = Go();
let dr = 0;
function ma() {
  return dr;
}
function va(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || ga, o = {
    uid: dr++,
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
    scope: new Vr(
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
    propsOptions: ir(s, i),
    emitsOptions: Xo(s, i),
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Yl.bind(null, o), e.ce && e.ce(o), o;
}
let je = null;
const ya = () => je || Ae;
let qn, vn;
{
  const e = ts(), t = (n, s) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(s), (o) => {
      i.length > 1 ? i.forEach((r) => r(o)) : i[0](o);
    };
  };
  qn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => je = n
  ), vn = t(
    "__VUE_SSR_SETTERS__",
    (n) => yn = n
  );
}
const _n = (e) => {
  const t = je;
  return qn(e), e.scope.on(), () => {
    e.scope.off(), qn(t);
  };
}, Di = () => {
  je && je.scope.off(), qn(null);
};
function hr(e) {
  return e.vnode.shapeFlag & 4;
}
let yn = !1;
function ba(e, t = !1, n = !1) {
  t && vn(t);
  const { props: s, children: i } = e.vnode, o = hr(e);
  ta(e, s, o, t), oa(e, i, n || t);
  const r = o ? wa(e, t) : void 0;
  return t && vn(!1), r;
}
function wa(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Vl);
  const { setup: s } = n;
  if (s) {
    at();
    const i = e.setupContext = s.length > 1 ? _a(e) : null, o = _n(e), r = xn(
      s,
      e,
      0,
      [
        e.props,
        i
      ]
    ), l = ro(r);
    if (ut(), o(), (l || e.sp) && !qt(e) && Bo(e), l) {
      if (r.then(Di, Di), t)
        return r.then((a) => {
          vn(!0);
          try {
            Vi(e, a, t);
          } finally {
            vn(!1);
          }
        }).catch((a) => {
          ss(a, e, 0);
        });
      e.asyncDep = r;
    } else
      Vi(e, r);
  } else
    pr(e);
}
function Vi(e, t, n) {
  z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ae(t) && (e.setupState = Ro(t)), pr(e);
}
function pr(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || rt);
  {
    const i = _n(e);
    at();
    try {
      Kl(e);
    } finally {
      ut(), i();
    }
  }
}
const xa = {
  get(e, t) {
    return Ee(e, "get", ""), e[t];
  }
};
function _a(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, xa),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function us(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ro(ol(e.exposed)), {
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
function Ca(e) {
  return z(e) && "__vccOpts" in e;
}
const et = (e, t) => /* @__PURE__ */ fl(e, t, yn), Sa = "3.5.44";
let Us;
const Ki = typeof window < "u" && window.trustedTypes;
if (Ki)
  try {
    Us = /* @__PURE__ */ Ki.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const gr = Us ? (e) => Us.createHTML(e) : (e) => e, Ma = "http://www.w3.org/2000/svg", Oa = "http://www.w3.org/1998/Math/MathML", gt = typeof document < "u" ? document : null, Hi = gt && /* @__PURE__ */ gt.createElement("template"), Ta = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? gt.createElementNS(Ma, e) : t === "mathml" ? gt.createElementNS(Oa, e) : n ? gt.createElement(e, { is: n }) : gt.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => gt.createTextNode(e),
  createComment: (e) => gt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => gt.querySelector(e),
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
      Hi.innerHTML = gr(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Hi.content;
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
}, Ea = /* @__PURE__ */ Symbol("_vtc");
function Aa(e, t, n) {
  const s = e[Ea];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Bi = /* @__PURE__ */ Symbol("_vod"), Ra = /* @__PURE__ */ Symbol("_vsh"), Ia = /* @__PURE__ */ Symbol(""), Pa = /(?:^|;)\s*display\s*:/;
function ka(e, t, n) {
  const s = e.style, i = pe(n);
  let o = !1;
  if (n && !i) {
    if (t)
      if (pe(t))
        for (const r of t.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          n[l] == null && on(s, l, "");
        }
      else
        for (const r in t)
          n[r] == null && on(s, r, "");
    for (const r in n) {
      r === "display" && (o = !0);
      const l = n[r];
      l != null ? ja(
        e,
        r,
        !pe(t) && t ? t[r] : void 0,
        l
      ) || on(s, r, l) : on(s, r, "");
    }
  } else if (i) {
    if (t !== n) {
      const r = s[Ia];
      r && (n += ";" + r), s.cssText = n, o = Pa.test(n);
    }
  } else t && e.removeAttribute("style");
  Bi in e && ((!i || t !== n) && (e[Bi] = o ? s.display : ""), e[Ra] && (s.display = "none"));
}
const Pn = /\s*!important$/;
function on(e, t, n) {
  if (K(n))
    n.forEach((s) => on(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    Pn.test(n) ? e.setProperty(t, n.replace(Pn, ""), "important") : e.setProperty(t, n);
  else {
    const s = Fa(e, t);
    Pn.test(n) ? e.setProperty(
      Ft(s),
      n.replace(Pn, ""),
      "important"
    ) : e[s] = n;
  }
}
const Ui = ["Webkit", "Moz", "ms"], Ts = {};
function Fa(e, t) {
  const n = Ts[t];
  if (n)
    return n;
  let s = Je(t);
  if (s !== "filter" && s in e)
    return Ts[t] = s;
  s = uo(s);
  for (let i = 0; i < Ui.length; i++) {
    const o = Ui[i] + s;
    if (o in e)
      return Ts[t] = o;
  }
  return t;
}
function ja(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && pe(s) && n === s;
}
const Wi = "http://www.w3.org/1999/xlink";
function zi(e, t, n, s, i, o = $r(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Wi, t.slice(6, t.length)) : e.setAttributeNS(Wi, t, n) : n == null || o && !fo(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : Ye(n) ? String(n) : n
  );
}
function Ji(e, t, n, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? gr(n) : n);
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
    l === "boolean" ? n = fo(n) : n == null && l === "string" ? (n = "", r = !0) : l === "number" && (n = 0, r = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  r && e.removeAttribute(i || t);
}
function Rt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Na(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const qi = /* @__PURE__ */ Symbol("_vei");
function $a(e, t, n, s, i = null) {
  const o = e[qi] || (e[qi] = {}), r = o[t];
  if (s && r)
    r.value = s;
  else {
    const [l, a] = Va(t);
    if (s) {
      const d = o[t] = Ba(
        s,
        i
      );
      Rt(e, l, d, a);
    } else r && (Na(e, l, r, a), o[t] = void 0);
  }
}
const La = /(Once|Passive|Capture)$/, Da = /^on:?(?:Once|Passive|Capture)$/;
function Va(e) {
  let t, n;
  for (; (n = e.match(La)) && !Da.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Ft(e.slice(2)), t];
}
let Es = 0;
const Ka = /* @__PURE__ */ Promise.resolve(), Ha = () => Es || (Ka.then(() => Es = 0), Es = Date.now());
function Ba(e, t) {
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
  return n.value = e, n.attached = Ha(), n;
}
const Yi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ua = (e, t, n, s, i, o) => {
  const r = i === "svg";
  t === "class" ? Aa(e, s, r) : t === "style" ? ka(e, n, s) : Xn(t) ? Zn(t) || $a(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Wa(e, t, s, r)) ? (Ji(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && zi(e, t, s, r, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (za(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !pe(s))) ? Ji(e, Je(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), zi(e, t, s, r));
};
function Wa(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Yi(t) && z(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Yi(t) && pe(n) ? !1 : t in e;
}
function za(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = Je(t);
  return Array.isArray(n) ? n.some((i) => Je(i) === s) : Object.keys(n).some((i) => Je(i) === s);
}
const Zt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return K(t) ? (n) => $n(t, n) : t;
};
function Ja(e) {
  e.target.composing = !0;
}
function Gi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const ot = /* @__PURE__ */ Symbol("_assign"), kn = /* @__PURE__ */ Symbol("_initialValue");
function As(e, t, n) {
  return t && (e = e.trim()), n && (e = es(e)), e;
}
const Rs = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
    e.parentNode && (e.type === "text" ? e[kn] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[kn] = e.defaultValue.replace(/\r\n?/g, `
`))), e[ot] = Zt(i);
    const o = s || i.props && i.props.type === "number";
    Rt(e, t ? "change" : "input", (r) => {
      r.target.composing || e[ot](As(e.value, n, o));
    }), (n || o) && Rt(e, "change", () => {
      e.value = As(e.value, n, o);
    }), t || (Rt(e, "compositionstart", Ja), Rt(e, "compositionend", Gi), Rt(e, "change", Gi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const i = t ?? "", o = e[kn];
    delete e[kn], o !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== o ? e[ot](As(e.value, n, s)) : e.value = i;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: i, number: o } }, r) {
    if (e[ot] = Zt(r), e.composing) return;
    const l = (o || e.type === "number") && !/^0\d/.test(e.value) ? es(e.value) : e.value, a = t ?? "";
    if (l === a)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (s && t === n || i && e.value.trim() === a) || (e.value = a);
  }
}, Xi = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[ot] = Zt(n), Rt(e, "change", () => {
      const s = e._modelValue, i = bn(e), o = e.checked, r = e[ot];
      if (K(s)) {
        const l = Zs(s, i), a = l !== -1;
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
        r(mr(e, o));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Zi,
  beforeUpdate(e, t, n) {
    e[ot] = Zt(n), Zi(e, t, n);
  }
};
function Zi(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let i;
  if (K(t))
    i = Zs(t, s.props.value) > -1;
  else if (xt(t))
    i = t.has(s.props.value);
  else {
    if (t === n) return;
    i = _t(t, mr(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const qa = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, Rt(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => n ? es(bn(a)) : bn(a)
      ), o = e.multiple, r = o ? xt(e._modelValue) ? new Set(i) : i : i[0], l = e._pendingValue = [
        o,
        o ? K(r) ? i.slice() : i : r
      ];
      try {
        e[ot](r);
      } finally {
        un(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[ot] = Zt(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Qi(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[ot] = Zt(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Ya(t, n[1], n[0])) && Qi(e, t);
  }
};
function Ya(e, t, n) {
  if (!n || K(e)) return _t(e, t);
  if (xt(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function Qi(e, t) {
  const n = e.multiple, s = K(t);
  if (!(n && !s && !xt(t))) {
    for (let i = 0, o = e.options.length; i < o; i++) {
      const r = e.options[i], l = bn(r);
      if (n)
        if (s) {
          const a = typeof l;
          a === "string" || a === "number" ? r.selected = t.some((d) => String(d) === String(l)) : r.selected = Zs(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (_t(bn(r), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function bn(e) {
  return "_value" in e ? e._value : e.value;
}
function mr(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Ga = ["ctrl", "shift", "alt", "meta"], Xa = {
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
  exact: (e, t) => Ga.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ke = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((i, ...o) => {
    for (let r = 0; r < t.length; r++) {
      const l = Xa[t[r]];
      if (l && l(i, t)) return;
    }
    return e(i, ...o);
  }));
}, Za = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Fn = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((i) => {
    if (!("key" in i))
      return;
    const o = Ft(i.key);
    if (t.some(
      (r) => r === o || Za[r] === o
    ))
      return e(i);
  }));
}, Qa = /* @__PURE__ */ Se({ patchProp: Ua }, Ta);
let eo;
function eu() {
  return eo || (eo = la(Qa));
}
const tu = ((...e) => {
  const t = eu().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const i = su(s);
    if (!i) return;
    const o = t._component;
    !z(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const r = n(i, !1, nu(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), r;
  }, t;
});
function nu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function su(e) {
  return pe(e) ? document.querySelector(e) : e;
}
const iu = /* @__PURE__ */ Ho({
  __name: "ModalMask",
  props: {
    open: { type: Boolean },
    topLayer: { type: Boolean }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t;
    return (s, i) => (G(), mn(Ml, { to: "body" }, [
      e.open ? (G(), oe(
        "div",
        {
          key: 0,
          class: "moss-modal",
          onMousedown: i[0] || (i[0] = Ke((o) => n("close"), ["self"]))
        },
        [
          Dl(s.$slots, "default", {}, void 0)
        ],
        32
        /* NEED_HYDRATION */
      )) : Qe("v-if", !0)
    ]));
  }
}), vr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, ou = /* @__PURE__ */ vr(iu, [["__scopeId", "data-v-32f7ef2b"]]), ru = { canvases: { portrait: { width: 1088, height: 1920 }, landscape: { width: 1920, height: 1088 } } };
function Ws(e, t) {
  return typeof e == "number" && typeof t == "number" && e > 0 && t > 0 && e > t ? "landscape" : "portrait";
}
function zs(e) {
  return ru.canvases[e];
}
function lu(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw new Error(`JSON 解析失败:${i instanceof Error ? i.message : String(i)}`);
  }
  const n = au(t);
  if (!n)
    throw new Error('需要形如 {"id":"my_layout","label":"…","portrait":[{"position":"…","slots":{"F":[y1,x1,y2,x2]}}]}');
  if (!n.portrait?.length && !n.landscape?.length)
    throw new Error("portrait 与 landscape 至少要有一个方向的面板");
  const s = t;
  if (s.canvas !== void 0 && !hi(s.canvas)) throw new Error("画布宽高必须是 64～8192 的偶数。");
  for (const i of ["portrait", "landscape"]) {
    if (s[i] === void 0) continue;
    const o = s[i], r = n.canvas ?? zs(i);
    if (n.canvas && Ws(r.width, r.height) !== i) throw new Error("面板方向与自定义画布宽高不符。");
    const l = /* @__PURE__ */ new Set();
    if (!Array.isArray(o) || !o.length) throw new Error(`${i}:需要非空面板数组。`);
    for (const a of o) {
      const d = a, c = typeof d?.position == "string" ? d.position.trim().toLowerCase() : "";
      if (!c || l.has(c)) throw new Error(`${i}:面板位置不能为空或重复。`);
      if (l.add(c), d?.layer !== void 0 && !Number.isSafeInteger(d.layer)) throw new Error(`${i}/${c}:层级必须为安全整数。`);
      if (!d?.slots || typeof d.slots != "object" || !Object.keys(d.slots).length)
        throw new Error(`${i}/${c}:需要槽位坐标。`);
      for (const [m, b] of Object.entries(d.slots)) {
        const M = yr(b);
        if (!m.trim() || !M || M[0] < -r.height / 2 || M[2] > r.height / 2 || M[1] < -r.width / 2 || M[3] > r.width / 2)
          throw new Error(`${i}/${c}/${m}:坐标无效或超出画布。`);
      }
      for (const [m, b] of Object.entries(d.shapes ?? {}))
        if (!d.slots[m] || !pi(b) || b.some(([M, F]) => Math.abs(M) > r.width / 2 || Math.abs(F) > r.height / 2))
          throw new Error(`${i}/${c}/${m}:四边形角点无效、交叉或超出画布。`);
    }
  }
  return n;
}
function yr(e) {
  if (!Array.isArray(e) || e.length !== 4) return null;
  const t = e.map((r) => typeof r == "number" && Number.isFinite(r) ? Math.round(r) : NaN);
  if (t.some((r) => !Number.isSafeInteger(r))) return null;
  const [n, s, i, o] = t;
  return n >= i || s >= o ? null : [n, s, i, o];
}
function to(e) {
  if (!Array.isArray(e)) return;
  const t = [];
  for (const n of e) {
    if (!n || typeof n != "object" || Array.isArray(n)) continue;
    const s = n, i = typeof s.position == "string" ? s.position.trim() : "", o = s.slots && typeof s.slots == "object" ? s.slots : null;
    if (!i || !o) continue;
    const r = {};
    for (const [c, m] of Object.entries(o)) {
      const b = yr(m);
      b && (r[c.trim().toUpperCase()] = b);
    }
    const l = {};
    if (s.shapes && typeof s.shapes == "object")
      for (const [c, m] of Object.entries(s.shapes)) {
        const b = c.trim().toUpperCase();
        r[b] && pi(m) && (l[b] = m.map((M) => M.map(Math.round)));
      }
    const a = {};
    if (s.slotNotes && typeof s.slotNotes == "object" && !Array.isArray(s.slotNotes))
      for (const [c, m] of Object.entries(s.slotNotes)) {
        const b = c.trim().toUpperCase();
        r[b] && typeof m == "string" && m.trim() && (a[b] = m.trim());
      }
    const d = {};
    if (s.slotContents && typeof s.slotContents == "object" && !Array.isArray(s.slotContents))
      for (const [c, m] of Object.entries(s.slotContents)) {
        const b = c.trim().toUpperCase();
        r[b] && Array.isArray(m) && (d[b] = JSON.parse(JSON.stringify(m)));
      }
    Object.keys(r).length && t.push({ position: i, slots: r, ...Number.isSafeInteger(s.layer) ? { layer: s.layer } : {}, ...Object.keys(l).length ? { shapes: l } : {}, ...Object.keys(a).length ? { slotNotes: a } : {}, ...Object.keys(d).length ? { slotContents: d } : {} });
  }
  return t.length ? t : void 0;
}
function au(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, n = typeof t.id == "string" ? t.id.trim() : "";
  if (!n) return null;
  const s = to(t.portrait), i = to(t.landscape), o = typeof t.label == "string" ? t.label.trim() : void 0, r = typeof t.usage == "string" ? t.usage.trim() : void 0, l = typeof t.readingOrder == "string" ? t.readingOrder.trim() : void 0;
  if (!s && !i && !o && !r && !l) return null;
  const a = hi(t.canvas);
  return { id: n, label: o, usage: r, readingOrder: l, portrait: s, landscape: i, ...a ? { canvas: a } : {}, ...t.promptMode ? { promptMode: t.promptMode } : {}, ...typeof t.promptCaption == "string" ? { promptCaption: t.promptCaption } : {}, ...typeof t.description == "string" ? { description: t.description } : {} };
}
function br(e) {
  return typeof e.description == "string" ? e.description : [...new Set([e.usage, e.promptCaption].filter((t) => typeof t == "string" && !!t.trim()).map((t) => t.trim()))].join(`

`);
}
function hi(e) {
  if (!e || typeof e != "object") return null;
  const { width: t, height: n } = e;
  return [t, n].every((s) => Number.isInteger(s) && s >= 64 && s <= 8192 && s % 2 === 0) ? { width: t, height: n } : null;
}
function pi(e) {
  return !Array.isArray(e) || e.length !== 4 || e.some((t) => !Array.isArray(t) || t.length !== 2 || t.some((n) => typeof n != "number" || !Number.isFinite(n))) ? !1 : e.every((t, n) => {
    const s = e[(n + 1) % 4], i = e[(n + 2) % 4];
    return (s[0] - t[0]) * (i[1] - s[1]) - (s[1] - t[1]) * (i[0] - s[0]) > 0.01;
  });
}
const Bt = 24, _e = (e, t, n) => Math.max(t, Math.min(n, e));
function vt(e, t, n = Bt) {
  const s = _e(Math.round(e.width), n, t.width), i = _e(Math.round(e.height), n, t.height);
  return { x: _e(Math.round(e.x), 0, t.width - s), y: _e(Math.round(e.y), 0, t.height - i), width: s, height: i };
}
function uu(e, t) {
  const [n, s, i, o] = e.slots.F ?? e.slots.C ?? Object.values(e.slots)[0];
  return vt({ x: s + t.width / 2, y: n + t.height / 2, width: o - s, height: i - n }, t);
}
function jn(e, t, n) {
  const s = { ...e, slots: {}, corners: {} };
  n?.layer !== void 0 && (s.layer = n.layer), n?.position && (s.position = n.position);
  for (const [i, [o, r, l, a]] of Object.entries((n ?? du(e, t, "")).slots))
    i !== "F" && gi(s, i, { x: r + t.width / 2, y: o + t.height / 2, width: a - r, height: l - o });
  for (const [i, o] of Object.entries(n?.shapes ?? {})) {
    if (i !== "F" && !s.slots[i]) continue;
    const r = i === "F" ? s : Gt(s, i);
    s.corners[i] = o.map(([l, a]) => [(l + t.width / 2 - r.x) / r.width, (a + t.height / 2 - r.y) / r.height]);
  }
  return n?.slotNotes && (s.slotNotes = { ...n.slotNotes }), n?.slotContents && (s.slotContents = JSON.parse(JSON.stringify(n.slotContents))), s;
}
function Vn(e, t) {
  const n = t === "F" ? e : Gt(e, t);
  return (e.corners[t] ?? [[0, 0], [1, 0], [1, 1], [0, 1]]).map(([s, i]) => [n.x + s * n.width, n.y + i * n.height]);
}
function cu(e, t, n, s) {
  const i = n.map(([a, d]) => [_e(Math.round(a), 0, s.width), _e(Math.round(d), 0, s.height)]);
  if (!pi(i)) return !1;
  const o = Math.min(...i.map((a) => a[0])), r = Math.min(...i.map((a) => a[1])), l = { x: o, y: r, width: Math.max(...i.map((a) => a[0])) - o, height: Math.max(...i.map((a) => a[1])) - r };
  return l.width < (t === "F" ? Bt : 1) || l.height < (t === "F" ? Bt : 1) ? !1 : (t === "F" ? Object.assign(e, l) : gi(e, t, l), e.corners[t] = i.map(([a, d]) => [(a - o) / l.width, (d - r) / l.height]), !0);
}
function Gt(e, t) {
  const n = e.slots[t];
  return { x: Math.round(e.x + n.x * e.width), y: Math.round(e.y + n.y * e.height), width: Math.max(1, Math.round(n.width * e.width)), height: Math.max(1, Math.round(n.height * e.height)) };
}
function gi(e, t, n) {
  e.slots[t] = { x: (n.x - e.x) / e.width, y: (n.y - e.y) / e.height, width: n.width / e.width, height: n.height / e.height };
}
function fu(e, t, n) {
  const s = (l) => {
    const a = _e(Math.round(l.x), 0, t.width - 1), d = _e(Math.round(l.y), 0, t.height - 1);
    return [d - t.height / 2, a - t.width / 2, _e(Math.round(l.y + l.height), d + 1, t.height) - t.height / 2, _e(Math.round(l.x + l.width), a + 1, t.width) - t.width / 2];
  }, i = Object.fromEntries(Object.keys(e.corners).filter((l) => l === "F" || e.slots[l]).map((l) => [l, Vn(e, l).map(([a, d]) => [_e(Math.round(a), 0, t.width) - t.width / 2, _e(Math.round(d), 0, t.height) - t.height / 2])])), o = Object.fromEntries(Object.entries(e.slotNotes ?? {}).filter(([l, a]) => (l === "F" || e.slots[l]) && a.trim()).map(([l, a]) => [l, a.trim()])), r = Object.fromEntries(Object.entries(e.slotContents ?? {}).filter(([l, a]) => (l === "F" || e.slots[l]) && a.length).map(([l, a]) => [l, JSON.parse(JSON.stringify(a))]));
  return { position: n, ...e.layer !== void 0 ? { layer: e.layer } : {}, slots: { F: s(e), ...Object.fromEntries(Object.keys(e.slots).map((l) => [l, s(Gt(e, l))])) }, ...Object.keys(i).length ? { shapes: i } : {}, ...Object.keys(o).length ? { slotNotes: o } : {}, ...Object.keys(r).length ? { slotContents: r } : {} };
}
function du(e, t, n) {
  const s = vt(e, t), i = (r, l, a, d) => [
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
function hu(e, t, n, s, i = !1, o = Bt) {
  const r = (m, b, M, F) => {
    if (i) {
      const N = m + b, $ = [...F, Math.round(N / 8) * 8].reduce((R, J) => Math.abs(J - N) < Math.abs(R - N) ? J : R, N + s + 1);
      return [m, Math.abs($ - N) <= s ? $ - m : b];
    }
    let P = 0, B = s + 1;
    for (const N of [m, m + b / 2, m + b])
      for (const k of [...F, Math.round(N / 8) * 8])
        Math.abs(k - N) < B && (B = Math.abs(k - N), P = k - N);
    return [_e(m + (B <= s ? P : 0), 0, M - b), b];
  }, [l, a] = r(e.x, e.width, t.width, [0, t.width / 2, t.width, ...n.flatMap((m) => [m.x, m.x + m.width / 2, m.x + m.width])]), [d, c] = r(e.y, e.height, t.height, [0, t.height / 2, t.height, ...n.flatMap((m) => [m.y, m.y + m.height / 2, m.y + m.height])]);
  return vt({ x: l, y: d, width: a, height: c }, t, o);
}
const pu = { class: "inline" }, gu = { class: "canvas-controls" }, mu = { class: "designer-body" }, vu = { class: "tools" }, yu = ["value"], bu = ["disabled"], wu = ["disabled"], xu = ["disabled"], _u = { class: "inline" }, Cu = ["disabled"], Su = ["disabled"], Mu = { class: "check" }, Ou = { class: "check" }, Tu = ["onClick"], Eu = { class: "inline" }, Au = ["disabled"], Ru = ["disabled"], Iu = { class: "inline" }, Pu = ["disabled"], ku = ["disabled"], Fu = { class: "hint" }, ju = { class: "canvas-area" }, Nu = ["viewBox"], $u = ["width", "height"], Lu = ["data-panel", "onPointerdown", "onDblclick"], Du = ["points", "fill", "stroke"], Vu = ["x", "y", "width", "height"], Ku = ["title"], Hu = ["data-slot", "onPointerdown", "onDblclick"], Bu = ["points", "fill", "stroke", "stroke-width"], Uu = ["x", "y", "font-size"], Wu = ["x", "y", "width", "height"], zu = ["title"], Ju = ["x", "y", "font-size"], qu = ["data-ctrl-deform", "data-handle", "rx", "x", "y", "width", "height", "fill", "aria-label", "onPointerdown"], Yu = { class: "hint" }, Gu = { class: "properties" }, Xu = ["aria-selected"], Zu = ["aria-selected"], Qu = ["value"], ec = ["value"], tc = ["value"], nc = {
  key: 0,
  class: "slot-actions"
}, sc = ["disabled"], ic = { class: "inline" }, oc = ["value", "disabled"], rc = ["value"], lc = ["disabled"], ac = ["value", "placeholder"], uc = {
  key: 1,
  class: "manual-content"
}, cc = { class: "inline" }, fc = ["value", "onChange"], dc = ["value", "onChange"], hc = ["value", "onInput"], pc = ["value", "placeholder", "onInput"], gc = { class: "inline" }, mc = ["disabled", "onClick"], vc = ["disabled", "onClick"], yc = ["onClick"], bc = { class: "slot-list" }, wc = ["onClick"], xc = ["value", "aria-label", "onChange"], _c = {
  key: 1,
  class: "hint"
}, Cc = {
  key: 0,
  role: "alert",
  class: "error"
}, Sc = { key: 1 }, Mc = ["onKeydown"], Oc = /* @__PURE__ */ Ho({
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
      let f = p, h = 2;
      for (; n.existingIds.includes(f); ) f = `${p}_${h++}`;
      return f;
    }
    const o = /* @__PURE__ */ ge({ id: i("my_layout"), label: "自定义版式", description: "", promptMode: n.initialMode ?? "llm", width: 1088, height: 1920, panels: [] }), r = /* @__PURE__ */ ge(-1), l = /* @__PURE__ */ ge(""), a = /* @__PURE__ */ ge(n.initialKey ?? ""), d = /* @__PURE__ */ ge(!0), c = /* @__PURE__ */ ge(!0), m = /* @__PURE__ */ ge(""), b = /* @__PURE__ */ ge(!1), M = /* @__PURE__ */ ge(), F = /* @__PURE__ */ ge(), P = /* @__PURE__ */ ge(), B = /* @__PURE__ */ ge(1), N = /* @__PURE__ */ ge(1088), k = /* @__PURE__ */ ge(1920), $ = /* @__PURE__ */ ge([]), R = /* @__PURE__ */ ge([]), J = /* @__PURE__ */ ge(""), j = et(() => o.value.panels[r.value]), U = et(() => j.value ? l.value && j.value.slots[l.value] ? Gt(j.value, l.value) : j.value : null), Z = { C: "内区", S: "主体", T: "顶部文字", B: "底部文字", TL: "左上文字", TR: "右上文字", BL: "左下文字", BR: "右下文字", L: "左人物", R: "右人物", O: "道具/音效", ML: "左侧文字", MR: "右侧文字", E: "有限越线", X: "出框区" }, ie = /* @__PURE__ */ ge("S"), w = et(() => ["C", "S", "T", "B", "TL", "TR", "BL", "BR", "ML", "MR", "L", "R", "O"].filter((p) => j.value && !j.value.slots[p])), H = et(() => w.value.includes(ie.value) ? ie.value : w.value[0] ?? ""), Y = et(() => j.value?.slotContents?.[l.value || "F"] ?? []), he = /* @__PURE__ */ ge(null), we = /* @__PURE__ */ ge(""), Qt = /* @__PURE__ */ ge();
    let ve = null;
    function Q() {
      ve = null, l.value = "";
    }
    function re() {
      if (ve) {
        const p = ve;
        S(p.before), $.value = p.undo, R.value = p.redo;
      }
      Q();
    }
    function Ie(p) {
      Q(), r.value = p;
    }
    function Xe(p, f) {
      r.value === p && l.value === f || (Ie(p), f && j.value?.slots[f] && (ve = { before: dt(), undo: [...$.value], redo: [...R.value] }, l.value = f, c.value = !0));
    }
    function We(p) {
      j.value && (l.value ? gi(j.value, l.value, p) : o.value.panels[r.value] = { ...j.value, ...p });
    }
    function Ne() {
      const p = l.value;
      j.value && p && v(() => {
        delete j.value.slots[p], delete j.value.corners[p], j.value.slotNotes && delete j.value.slotNotes[p], j.value.slotContents && delete j.value.slotContents[p];
      });
    }
    function Cn() {
      const p = H.value;
      !j.value || !p || (v(() => {
        j.value.slots[p] = { ...jn(j.value, ye.value).slots[p] };
      }), Xe(r.value, p));
    }
    function Sn() {
      j.value && v(() => {
        const p = j.value;
        p.slots = { ...jn(p, ye.value).slots, ...p.slots.X ? { X: p.slots.X } : {} }, p.corners = Object.fromEntries(Object.entries(p.corners).filter(([f]) => f === "F" || f === "X")), l.value = "";
      });
    }
    function fs(p, f) {
      return c.value ? Object.keys(p.slots).sort((h, O) => +(f === r.value && h === l.value) - +(f === r.value && O === l.value)).map((h) => ({ key: h, rect: Gt(p, h) })) : [];
    }
    const ye = et(() => ({ width: o.value.width, height: o.value.height })), ft = et(() => o.value.panels.map((p, f) => ({ rect: p, index: f })).sort((p, f) => (p.rect.layer ?? p.index) - (f.rect.layer ?? f.index) || p.index - f.index)), St = et(() => ft.value.findIndex((p) => p.index === r.value));
    function Mt(p) {
      const f = St.value, h = f + p;
      if (f < 0 || h < 0 || h >= ft.value.length) return;
      const O = [...ft.value];
      [O[f], O[h]] = [O[h], O[f]], v(() => {
        O.forEach(({ rect: V }, xe) => {
          V.layer = xe;
        });
      });
    }
    const dt = () => JSON.stringify(o.value), u = et(() => {
      const p = new Set(o.value.panels.map((f) => f.position).filter(Boolean));
      return o.value.panels.map((f, h) => {
        if (f.position) return f.position;
        let O = h + 1;
        for (; p.has(`panel-${O}`); ) O++;
        const V = `panel-${O}`;
        return p.add(V), V;
      });
    });
    function g(p) {
      p !== dt() && ($.value.push(p), $.value.length > 100 && $.value.shift(), R.value = [], m.value = "");
    }
    function v(p, f = !1) {
      f || Q();
      const h = dt();
      p(), g(h);
    }
    function S(p) {
      o.value = JSON.parse(p), N.value = o.value.width, k.value = o.value.height, r.value = Math.min(r.value, o.value.panels.length - 1), j.value?.slots[l.value] || (l.value = ""), m.value = "", b.value = !1;
    }
    function x() {
      Q();
      const p = $.value.pop();
      p && (R.value.push(dt()), S(p));
    }
    function C() {
      Q();
      const p = R.value.pop();
      p && ($.value.push(dt()), S(p));
    }
    function E() {
      const p = n.sources.find((f) => f.key === a.value);
      p && (v(() => {
        const f = p.id === n.editingId;
        o.value = { id: f ? p.id : i(`${p.id}_copy`), label: f ? p.label : `${p.label}（副本）`, description: br(p), promptMode: p.promptMode ?? "llm", ...p.canvas, panels: p.panels.map((h, O) => ({ ...jn(uu(h, p.canvas), p.canvas, h), layer: h.layer ?? O })) };
      }), N.value = o.value.width, k.value = o.value.height, Ie(o.value.panels.length ? 0 : -1));
    }
    function A() {
      T();
      const p = hi({ width: N.value, height: k.value });
      if (!p) {
        m.value = "画布宽高须为 64～8192 的数值，输入完成后自动对齐到最近的 16 倍数。";
        return;
      }
      v(() => {
        const f = ye.value;
        o.value.panels = o.value.panels.map((h) => ({ ...h, ...vt({ x: h.x * p.width / f.width, y: h.y * p.height / f.height, width: h.width * p.width / f.width, height: h.height * p.height / f.height }, p) })), Object.assign(o.value, p);
      });
    }
    function T() {
      const p = (f) => Number.isFinite(f) ? Math.max(64, Math.min(8192, Math.round(f / 16) * 16)) : f;
      N.value = p(N.value), k.value = p(k.value);
    }
    function _() {
      v(() => {
        const p = o.value.panels.length % 5 * 0.04, f = jn(vt({ x: o.value.width * (0.08 + p), y: o.value.height * (0.08 + p), width: o.value.width * 0.55, height: o.value.height * 0.3 }, ye.value), ye.value);
        f.slots = {}, o.value.panels.push({ ...f, layer: Math.max(-1, ...o.value.panels.map((h, O) => h.layer ?? O)) + 1 }), Ie(o.value.panels.length - 1);
      });
    }
    function L() {
      j.value && v(() => {
        o.value.panels.splice(r.value, 1), Ie(Math.min(r.value, o.value.panels.length - 1));
      });
    }
    function I() {
      j.value && v(() => {
        o.value.panels.push({ ...JSON.parse(JSON.stringify(j.value)), ...vt({ ...j.value, x: j.value.x + 24, y: j.value.y + 24 }, ye.value), position: void 0, layer: Math.max(-1, ...o.value.panels.map((p, f) => p.layer ?? f)) + 1 }), Ie(o.value.panels.length - 1);
      });
    }
    function D(p) {
      const f = r.value + p;
      !j.value || f < 0 || f >= o.value.panels.length || v(() => {
        const [h] = o.value.panels.splice(r.value, 1);
        o.value.panels.splice(f, 0, h), r.value = f;
      });
    }
    function W(p, f) {
      const h = Number(f.target.value);
      U.value && Number.isFinite(h) && v(() => {
        We(vt({ ...U.value, [p]: h }, ye.value, l.value ? 1 : Bt));
      }, !0);
    }
    function q(p, f) {
      v(() => {
        o.value[p] = f.target.value;
      });
    }
    function X(p) {
      const f = l.value;
      v(() => {
        o.value.promptMode = p;
      }), f && Xe(r.value, f);
    }
    function te() {
      if (!j.value) return;
      const p = l.value || "F", f = ["T", "B", "TL", "TR", "BL", "BR", "ML", "MR"].includes(p) ? "text" : ["S", "L", "R"].includes(p) ? "character" : "object";
      v(() => {
        ((j.value.slotContents ??= {})[p] ??= []).push({ label: f, caption: "", ...f === "text" ? { text: "", textType: "dialogue" } : {} });
      }, !0);
    }
    function fe(p, f, h) {
      const O = h.target.value;
      v(() => {
        Object.assign(Y.value[p], { [f]: O });
      }, !0);
    }
    function be(p) {
      v(() => {
        Y.value.splice(p, 1);
      }, !0);
    }
    function $e(p, f) {
      const h = p + f;
      h < 0 || h >= Y.value.length || v(() => {
        const [O] = Y.value.splice(p, 1);
        Y.value.splice(h, 0, O);
      }, !0);
    }
    function Me(p, f) {
      return p.slotNotes?.[f] ?? (p.slotContents?.[f] ?? []).filter((h) => h.label !== "text" && h.caption.trim()).map((h) => h.caption).join(`
`);
    }
    function Ot(p, f, h) {
      const O = o.value.panels[p];
      O && v(() => {
        const V = (O.slotContents?.[f] ?? []).filter((xe) => xe.label !== "text");
        V.length === 1 && (!O.slotNotes?.[f] || O.slotNotes[f] === V[0].caption) && (V[0].caption = h), h ? (O.slotNotes ??= {})[f] = h : O.slotNotes && delete O.slotNotes[f];
      }, !0);
    }
    function Mn(p) {
      Ot(r.value, l.value || "F", p.target.value);
    }
    function Oe(p, f) {
      Xe(p, f === "F" ? "" : f), he.value = { index: p, key: f }, we.value = Me(o.value.panels[p], f), un(() => Qt.value?.focus());
    }
    function Le() {
      he.value && (Ot(he.value.index, he.value.key, we.value), he.value = null);
    }
    function jt(p, f) {
      const h = Me(p, f).replace(/\s+/g, " ").trim();
      return h.length > 80 ? h.slice(0, 80) + "…" : h;
    }
    let De = null;
    function wr(p) {
      if (!p.ctrlKey || !p.deltaY || (p.preventDefault(), p.stopPropagation(), De || !F.value || !P.value)) return;
      const f = P.value, h = F.value.getBoundingClientRect(), O = (p.clientX - h.left) / h.width, V = (p.clientY - h.top) / h.height, xe = p.deltaY * (p.deltaMode === 1 ? 16 : p.deltaMode === 2 ? f.clientHeight : 1);
      B.value = _e(B.value * Math.exp(-xe * 2e-3), 0.25, 4), un(() => {
        const le = F.value?.getBoundingClientRect();
        le && (f.scrollLeft += le.left + O * le.width - p.clientX, f.scrollTop += le.top + V * le.height - p.clientY);
      });
    }
    function vi(p) {
      const f = F.value.getBoundingClientRect();
      return { x: (p.clientX - f.left) / f.width * o.value.width, y: (p.clientY - f.top) / f.height * o.value.height };
    }
    function ds(p, f, h = "", O = "") {
      p.button !== 0 || De || (Xe(f, O), De = { pointerId: p.pointerId, ...vi(p), clientX: p.clientX, clientY: p.clientY, dragging: !1, rect: { ...U.value }, before: dt(), handle: h, quad: Vn(j.value, O || "F"), deform: p.ctrlKey && h.length === 2 });
    }
    function xr(p) {
      if (!De || p.pointerId !== De.pointerId) return;
      const f = vi(p), h = De, O = f.x - h.x, V = f.y - h.y;
      if (!h.dragging) {
        if (Math.hypot(p.clientX - h.clientX, p.clientY - h.clientY) < 3) return;
        h.dragging = !0, F.value.setPointerCapture(p.pointerId);
      }
      const xe = l.value ? 1 : Bt;
      if (h.deform) {
        const Ut = ["nw", "ne", "se", "sw"].indexOf(h.handle), ps = h.quad.map((gs, Or) => Or === Ut ? [gs[0] + O, gs[1] + V] : gs);
        cu(j.value, l.value || "F", ps, ye.value);
        return;
      }
      let le = { ...h.rect };
      h.handle ? (h.handle.includes("w") && (le.x = _e(h.rect.x + O, 0, h.rect.x + h.rect.width - xe), le.width = h.rect.x + h.rect.width - le.x), h.handle.includes("n") && (le.y = _e(h.rect.y + V, 0, h.rect.y + h.rect.height - xe), le.height = h.rect.y + h.rect.height - le.y), h.handle.includes("e") && (le.width = _e(h.rect.width + O, xe, o.value.width - le.x)), h.handle.includes("s") && (le.height = _e(h.rect.height + V, xe, o.value.height - le.y))) : (le.x += O, le.y += V), le = vt(le, ye.value, xe);
      const Mr = l.value ? [j.value, ...Object.keys(j.value.slots).filter((Ut) => Ut !== l.value).map((Ut) => Gt(j.value, Ut))] : o.value.panels.filter((Ut, ps) => ps !== r.value), Tn = { ...le };
      d.value && !p.altKey && (le = hu(le, ye.value, Mr, 6 * o.value.width / F.value.getBoundingClientRect().width, !!h.handle, xe)), (h.handle === "e" || h.handle === "w") && (le.y = Tn.y, le.height = Tn.height), (h.handle === "n" || h.handle === "s") && (le.x = Tn.x, le.width = Tn.width), We(le);
    }
    function hs(p, f = !1) {
      if (!De || p.pointerId !== De.pointerId) return;
      const h = De.before;
      De = null, F.value?.hasPointerCapture(p.pointerId) && F.value.releasePointerCapture(p.pointerId), f ? S(h) : g(h);
    }
    function _r() {
      const p = Vn(j.value, l.value || "F");
      return ["nw", "ne", "se", "sw"].flatMap((f, h) => [{ name: f, x: p[h][0], y: p[h][1] }, { name: ["n", "e", "s", "w"][h], x: (p[h][0] + p[(h + 1) % 4][0]) / 2, y: (p[h][1] + p[(h + 1) % 4][1]) / 2 }]);
    }
    function yi(p, f) {
      return Vn(p, f).map((h) => h.join(",")).join(" ");
    }
    function On() {
      dt() !== J.value || N.value !== o.value.width || k.value !== o.value.height ? b.value = !0 : s("close");
    }
    function Cr(p) {
      if (p.key === "Tab" && M.value) {
        const f = [...M.value.querySelectorAll('button:not(:disabled),input,textarea,select,[tabindex="0"]')], O = M.value.getRootNode().activeElement;
        p.shiftKey && (O === f[0] || O === M.value) ? (p.preventDefault(), f.at(-1)?.focus()) : !p.shiftKey && O === f.at(-1) && (p.preventDefault(), f[0]?.focus());
      }
      if (p.key === "Escape") {
        p.stopPropagation(), On();
        return;
      }
      if (!p.target.matches("input,textarea,select,button")) {
        if ((p.ctrlKey || p.metaKey) && ["z", "y"].includes(p.key.toLowerCase()))
          p.preventDefault(), p.key.toLowerCase() === "y" || p.shiftKey ? C() : x();
        else if (p.key === "Delete")
          p.preventDefault(), l.value ? Ne() : L();
        else if (U.value && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(p.key)) {
          p.preventDefault();
          const f = p.shiftKey ? 10 : 1;
          v(() => {
            We(vt({ ...U.value, x: U.value.x + (p.key === "ArrowRight" ? f : p.key === "ArrowLeft" ? -f : 0), y: U.value.y + (p.key === "ArrowDown" ? f : p.key === "ArrowUp" ? -f : 0) }, ye.value, l.value ? 1 : Bt));
          }, !0);
        }
      }
    }
    function Sr() {
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
        const p = Ws(o.value.width, o.value.height), f = zs(p);
        if (o.value.id.trim() === n.editingId && n.sources.some((O) => {
          const V = Ws(O.canvas.width, O.canvas.height), xe = zs(V);
          return O.id === n.editingId && V !== p && (o.value.width !== f.width || o.value.height !== f.height || O.canvas.width !== xe.width || O.canvas.height !== xe.height);
        })) {
          m.value = "此版式含另一画布方向。使用非标准尺寸时请填写新的版式 ID，另存后可保留原版式的两个方向。";
          return;
        }
        const h = lu(JSON.stringify({ id: o.value.id.trim(), label: o.value.label.trim() || o.value.id.trim(), description: o.value.description.trim(), usage: o.value.description.trim(), promptMode: o.value.promptMode, promptCaption: o.value.description.trim(), canvas: ye.value, readingOrder: u.value.join(" → "), [p]: o.value.panels.map((O, V) => fu(O, ye.value, u.value[V])) }));
        s("save", h);
      } catch (p) {
        m.value = p instanceof Error ? p.message : String(p);
      }
    }
    return Wo(() => {
      n.initialKey && E(), $.value = [], R.value = [], J.value = dt(), un(() => M.value?.focus());
    }), (p, f) => (G(), mn(ou, {
      open: !0,
      "top-layer": "",
      onClose: On
    }, {
      default: $o(() => [
        y(
          "section",
          {
            ref_key: "dialog",
            ref: M,
            class: "manga-designer",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "快捷自定义版式",
            tabindex: "-1",
            onKeydown: Cr
          },
          [
            y("header", null, [
              y(
                "strong",
                null,
                ne(e.editingId ? "可视化编辑版式" : "快捷自定义版式"),
                1
                /* TEXT */
              ),
              y("div", pu, [
                y("button", {
                  type: "button",
                  onClick: On
                }, "取消"),
                y(
                  "button",
                  {
                    type: "button",
                    class: "primary",
                    onClick: Sr
                  },
                  ne(e.editingId && o.value.id.trim() === e.editingId ? "保存版式修改" : "保存新版式"),
                  1
                  /* TEXT */
                ),
                y("button", {
                  type: "button",
                  "aria-label": "关闭编辑器",
                  onClick: On
                }, "✕")
              ])
            ]),
            y("div", gu, [
              y("label", null, [
                f[29] || (f[29] = Te(
                  "画布宽 ",
                  -1
                  /* CACHED */
                )),
                zt(y(
                  "input",
                  {
                    "onUpdate:modelValue": f[0] || (f[0] = (h) => N.value = h),
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
                    Rs,
                    N.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              y("label", null, [
                f[30] || (f[30] = Te(
                  "画布高 ",
                  -1
                  /* CACHED */
                )),
                zt(y(
                  "input",
                  {
                    "onUpdate:modelValue": f[1] || (f[1] = (h) => k.value = h),
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
                    Rs,
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
            f[50] || (f[50] = y(
              "p",
              { class: "hint" },
              "改变画布尺寸会等比例换算各轴坐标。工作流与预设尺寸须与此画布一致；请连接节点的宽高输出到潜空间尺寸输入。",
              -1
              /* CACHED */
            )),
            y("div", mu, [
              y("aside", vu, [
                y("label", null, [
                  f[32] || (f[32] = Te(
                    "从现有版式复制",
                    -1
                    /* CACHED */
                  )),
                  zt(y(
                    "select",
                    {
                      "onUpdate:modelValue": f[2] || (f[2] = (h) => a.value = h),
                      "aria-label": "源版式"
                    },
                    [
                      f[31] || (f[31] = y(
                        "option",
                        { value: "" },
                        "请选择",
                        -1
                        /* CACHED */
                      )),
                      (G(!0), oe(
                        de,
                        null,
                        pt(e.sources, (h) => (G(), oe("option", {
                          key: h.key,
                          value: h.key
                        }, ne(h.label) + " · " + ne(h.canvas.width) + "×" + ne(h.canvas.height), 9, yu))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    512
                    /* NEED_PATCH */
                  ), [
                    [qa, a.value]
                  ])
                ]),
                y("button", {
                  type: "button",
                  disabled: !a.value,
                  onClick: E
                }, "载入副本", 8, bu),
                y("button", {
                  type: "button",
                  onClick: _
                }, "＋ 新增分格"),
                y("button", {
                  type: "button",
                  disabled: !j.value,
                  onClick: I
                }, "复制选中分格", 8, wu),
                y("button", {
                  type: "button",
                  disabled: !j.value,
                  onClick: L
                }, "删除选中分格", 8, xu),
                y("div", _u, [
                  y("button", {
                    type: "button",
                    disabled: !$.value.length,
                    onClick: x
                  }, "撤销", 8, Cu),
                  y("button", {
                    type: "button",
                    disabled: !R.value.length,
                    onClick: C
                  }, "重做", 8, Su)
                ]),
                y("label", Mu, [
                  zt(y(
                    "input",
                    {
                      "onUpdate:modelValue": f[3] || (f[3] = (h) => d.value = h),
                      type: "checkbox"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [Xi, d.value]
                  ]),
                  f[33] || (f[33] = Te(
                    "对齐吸附",
                    -1
                    /* CACHED */
                  ))
                ]),
                y("label", Ou, [
                  zt(y(
                    "input",
                    {
                      "onUpdate:modelValue": f[4] || (f[4] = (h) => c.value = h),
                      type: "checkbox"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [Xi, c.value]
                  ]),
                  f[34] || (f[34] = Te(
                    "显示可编辑槽位",
                    -1
                    /* CACHED */
                  ))
                ]),
                f[35] || (f[35] = y(
                  "p",
                  { class: "hint" },
                  "拖动外框移动整格；拖动黄色/绿色小框单独编辑槽位。直接拖动四角或边中点缩放；按住 Ctrl 再拖四角才形变。Alt 暂停吸附，方向键微调，Delete 删除选中项，Ctrl+Z 撤销。",
                  -1
                  /* CACHED */
                )),
                f[36] || (f[36] = y(
                  "strong",
                  null,
                  "读序（先读 1）",
                  -1
                  /* CACHED */
                )),
                (G(!0), oe(
                  de,
                  null,
                  pt(o.value.panels, (h, O) => (G(), oe("button", {
                    key: O,
                    type: "button",
                    class: At({ active: r.value === O }),
                    onClick: (V) => Ie(O)
                  }, "第 " + ne(O + 1) + " 格", 11, Tu))),
                  128
                  /* KEYED_FRAGMENT */
                )),
                y("div", Eu, [
                  y("button", {
                    type: "button",
                    disabled: r.value <= 0,
                    onClick: f[5] || (f[5] = (h) => D(-1))
                  }, "提前", 8, Au),
                  y("button", {
                    type: "button",
                    disabled: r.value < 0 || r.value >= o.value.panels.length - 1,
                    onClick: f[6] || (f[6] = (h) => D(1))
                  }, "延后", 8, Ru)
                ]),
                y("div", Iu, [
                  y("button", {
                    type: "button",
                    disabled: St.value < 0 || St.value >= o.value.panels.length - 1,
                    onClick: f[7] || (f[7] = (h) => Mt(1))
                  }, "上移一层", 8, Pu),
                  y("button", {
                    type: "button",
                    disabled: St.value <= 0,
                    onClick: f[8] || (f[8] = (h) => Mt(-1))
                  }, "下移一层", 8, ku)
                ]),
                y(
                  "p",
                  Fu,
                  ne(j.value ? `当前第 ${St.value + 1} / ${o.value.panels.length} 层（数字越大越靠前）。` : "") + "层级控制重叠遮挡，不改变读序；遮挡关系自动写入生图提示词。",
                  1
                  /* TEXT */
                )
              ]),
              y("div", ju, [
                y(
                  "div",
                  {
                    ref_key: "canvasViewport",
                    ref: P,
                    class: "canvas-viewport",
                    "aria-label": "画布缩放区域",
                    onWheelCapture: wr
                  },
                  [
                    (G(), oe("svg", {
                      ref_key: "svg",
                      ref: F,
                      class: "layout-canvas",
                      viewBox: `0 0 ${o.value.width} ${o.value.height}`,
                      style: Kt({ aspectRatio: `${o.value.width}/${o.value.height}`, width: `min(${100 * B.value}%, ${62 * o.value.width / o.value.height * B.value}vh)` }),
                      role: "img",
                      "aria-label": "版式画布",
                      tabindex: "0",
                      onPointermove: xr,
                      onPointerup: f[10] || (f[10] = (h) => hs(h)),
                      onPointercancel: f[11] || (f[11] = (h) => hs(h, !0)),
                      onLostpointercapture: f[12] || (f[12] = (h) => hs(h, !0))
                    }, [
                      y("rect", {
                        width: o.value.width,
                        height: o.value.height,
                        fill: "white",
                        onPointerdown: f[9] || (f[9] = (h) => Ie(-1))
                      }, null, 40, $u),
                      (G(!0), oe(
                        de,
                        null,
                        pt(ft.value, ({ rect: h, index: O }) => (G(), oe("g", {
                          key: O,
                          class: At(["panel", { selected: O === r.value }]),
                          "data-panel": O,
                          onPointerdown: Ke((V) => ds(V, O), ["stop"]),
                          onDblclick: Ke((V) => Oe(O, "F"), ["stop", "prevent"])
                        }, [
                          y("polygon", {
                            points: yi(h, "F"),
                            fill: O === r.value ? "#dcecff" : "#f1f2f4",
                            stroke: O === r.value ? "#2675cf" : "#333",
                            "stroke-width": "2",
                            "vector-effect": "non-scaling-stroke"
                          }, null, 8, Du),
                          jt(h, "F") ? (G(), oe("foreignObject", {
                            key: 0,
                            x: h.x + 6,
                            y: h.y + o.value.width * 0.04,
                            width: Math.max(1, h.width - 12),
                            height: Math.max(1, Math.min(h.height - o.value.width * 0.04, o.value.width * 0.055)),
                            class: "frame-description"
                          }, [
                            y("div", {
                              style: Kt({ fontSize: `${o.value.width * 0.018}px` }),
                              title: Me(h, "F")
                            }, ne(jt(h, "F")), 13, Ku)
                          ], 8, Vu)) : Qe("v-if", !0),
                          (G(!0), oe(
                            de,
                            null,
                            pt(fs(h, O), (V) => (G(), oe("g", {
                              key: V.key,
                              class: "slot",
                              "data-slot": V.key,
                              onPointerdown: Ke((xe) => ds(xe, O, "", V.key), ["stop"]),
                              onDblclick: Ke((xe) => Oe(O, V.key), ["stop", "prevent"])
                            }, [
                              y("polygon", {
                                points: yi(h, V.key),
                                fill: V.key === "T" ? "#e5ba6638" : "#50a18a18",
                                stroke: O === r.value && V.key === l.value ? "#df7827" : V.key === "T" ? "#b48733" : "#50a18a",
                                "stroke-width": O === r.value && V.key === l.value ? 2 : 1,
                                "stroke-dasharray": "5 4",
                                "vector-effect": "non-scaling-stroke"
                              }, null, 8, Bu),
                              y("text", {
                                x: V.rect.x + 5,
                                y: V.rect.y + o.value.width * 0.025,
                                "font-size": o.value.width * 0.021,
                                fill: "#575c62"
                              }, ne(V.key), 9, Uu),
                              jt(h, V.key) ? (G(), oe("foreignObject", {
                                key: 0,
                                x: V.rect.x + 6,
                                y: V.rect.y + o.value.width * 0.032,
                                width: Math.max(1, V.rect.width - 12),
                                height: Math.max(1, Math.min(V.rect.height - o.value.width * 0.032, o.value.width * 0.055)),
                                class: "frame-description"
                              }, [
                                y("div", {
                                  style: Kt({ fontSize: `${o.value.width * 0.018}px` }),
                                  title: Me(h, V.key)
                                }, ne(jt(h, V.key)), 13, zu)
                              ], 8, Wu)) : Qe("v-if", !0)
                            ], 40, Hu))),
                            128
                            /* KEYED_FRAGMENT */
                          )),
                          y("text", {
                            x: h.x + 8,
                            y: h.y + o.value.width * 0.032,
                            "font-size": o.value.width * 0.026,
                            fill: "#164b83"
                          }, ne(O + 1), 9, Ju)
                        ], 42, Lu))),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      j.value && U.value ? (G(!0), oe(
                        de,
                        { key: 0 },
                        pt(_r(), (h) => (G(), oe("rect", {
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
                          style: Kt({ cursor: `${h.name}-resize` }),
                          "aria-label": `${h.name} 控制点`,
                          onPointerdown: Ke((O) => ds(O, r.value, h.name, l.value), ["stop", "prevent"])
                        }, null, 44, qu))),
                        128
                        /* KEYED_FRAGMENT */
                      )) : Qe("v-if", !0)
                    ], 44, Nu))
                  ],
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ),
                y("p", Yu, [
                  Te(
                    ne(o.value.width) + "×" + ne(o.value.height) + " · " + ne(o.value.panels.length) + " 格 · 缩放 " + ne(Math.round(B.value * 100)) + "% · Ctrl＋滚轮缩放，双击框编辑描述",
                    1
                    /* TEXT */
                  ),
                  f[37] || (f[37] = y(
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
              y("aside", Gu, [
                y(
                  "div",
                  {
                    class: At(["mode-switch", { manual: o.value.promptMode === "manual" }]),
                    role: "tablist",
                    "aria-label": "内容编辑模式",
                    onKeydown: [
                      f[15] || (f[15] = Fn(Ke((h) => X("llm"), ["prevent"]), ["left"])),
                      f[16] || (f[16] = Fn(Ke((h) => X("manual"), ["prevent"]), ["right"]))
                    ]
                  },
                  [
                    f[39] || (f[39] = y(
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
                      onClick: f[13] || (f[13] = (h) => X("llm"))
                    }, "← LLM 说明", 8, Xu),
                    y("button", {
                      type: "button",
                      role: "tab",
                      "aria-selected": o.value.promptMode === "manual",
                      onClick: f[14] || (f[14] = (h) => X("manual"))
                    }, "直接提示词 →", 8, Zu)
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
                ),
                y("label", null, [
                  f[40] || (f[40] = Te(
                    "版式 ID",
                    -1
                    /* CACHED */
                  )),
                  y("input", {
                    value: o.value.id,
                    "aria-label": "版式 ID",
                    onChange: f[17] || (f[17] = (h) => q("id", h))
                  }, null, 40, Qu)
                ]),
                y("label", null, [
                  f[41] || (f[41] = Te(
                    "名称",
                    -1
                    /* CACHED */
                  )),
                  y("input", {
                    value: o.value.label,
                    "aria-label": "版式名称",
                    onChange: f[18] || (f[18] = (h) => q("label", h))
                  }, null, 40, ec)
                ]),
                y("label", null, [
                  f[42] || (f[42] = Te(
                    "画面描述",
                    -1
                    /* CACHED */
                  )),
                  y("textarea", {
                    value: o.value.description,
                    "aria-label": "整页画面描述",
                    rows: "3",
                    placeholder: "全页共用的画风、环境与光照；两种模式共用",
                    onInput: f[19] || (f[19] = (h) => q("description", h))
                  }, null, 40, tc)
                ]),
                j.value ? (G(), oe(
                  de,
                  { key: 0 },
                  [
                    y(
                      "strong",
                      null,
                      "第 " + ne(r.value + 1) + " 格 · " + ne(l.value ? `${l.value} ${Z[l.value] ?? "槽位"}` : "外框 F"),
                      1
                      /* TEXT */
                    ),
                    l.value ? (G(), oe("div", nc, [
                      y("div", { class: "inline" }, [
                        y("button", {
                          type: "button",
                          class: "primary",
                          onClick: Q
                        }, "确定内框"),
                        y("button", {
                          type: "button",
                          onClick: re
                        }, "取消内框修改")
                      ])
                    ])) : Qe("v-if", !0),
                    y("button", {
                      type: "button",
                      disabled: !l.value,
                      onClick: Ne
                    }, "删除选中槽位", 8, sc),
                    y("button", {
                      type: "button",
                      onClick: Sn
                    }, "恢复本格默认槽位"),
                    y("div", ic, [
                      y("select", {
                        value: H.value,
                        "aria-label": "新增内框类型",
                        disabled: !w.value.length,
                        onChange: f[20] || (f[20] = (h) => ie.value = h.target.value)
                      }, [
                        (G(!0), oe(
                          de,
                          null,
                          pt(w.value, (h) => (G(), oe("option", {
                            key: h,
                            value: h
                          }, ne(h) + " " + ne(Z[h]), 9, rc))),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ], 40, oc),
                      y("button", {
                        type: "button",
                        disabled: !H.value,
                        onClick: Cn
                      }, "添加内框", 8, lc)
                    ]),
                    y("label", null, [
                      Te(
                        ne(l.value ? `内框 ${l.value} 画面描述` : "外框 F 画面描述") + " ",
                        1
                        /* TEXT */
                      ),
                      y("textarea", {
                        value: Me(j.value, l.value || "F"),
                        "aria-label": "当前框画面描述",
                        rows: "3",
                        placeholder: l.value ? "描述本框的人物、动作、场景或取景" : "描述本格的场景与人物关系",
                        onInput: Mn
                      }, null, 40, ac)
                    ]),
                    o.value.promptMode === "manual" ? (G(), oe("div", uc, [
                      y(
                        "strong",
                        null,
                        ne(l.value ? `内框 ${l.value}` : "外框 F") + " 追加人物／台词",
                        1
                        /* TEXT */
                      ),
                      (G(!0), oe(
                        de,
                        null,
                        pt(Y.value, (h, O) => (G(), oe("div", {
                          key: O,
                          class: "content-card"
                        }, [
                          y("div", cc, [
                            y(
                              "span",
                              null,
                              ne(O + 1),
                              1
                              /* TEXT */
                            ),
                            y("select", {
                              value: h.label,
                              "aria-label": "内容类型",
                              onChange: (V) => fe(O, "label", V)
                            }, [...f[43] || (f[43] = [
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
                            ])], 40, fc)
                          ]),
                          h.label === "text" ? (G(), oe(
                            de,
                            { key: 0 },
                            [
                              y("label", null, [
                                f[45] || (f[45] = Te(
                                  "文字类型",
                                  -1
                                  /* CACHED */
                                )),
                                y("select", {
                                  value: h.textType ?? "dialogue",
                                  onChange: (V) => fe(O, "textType", V)
                                }, [...f[44] || (f[44] = [
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
                                ])], 40, dc)
                              ]),
                              y("label", null, [
                                f[46] || (f[46] = Te(
                                  "准确台词／文字",
                                  -1
                                  /* CACHED */
                                )),
                                y("textarea", {
                                  value: h.text ?? "",
                                  "aria-label": "准确台词",
                                  rows: "3",
                                  onInput: (V) => fe(O, "text", V)
                                }, null, 40, hc)
                              ])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : Qe("v-if", !0),
                          y("label", null, [
                            Te(
                              ne(h.label === "text" ? "文字表现说明（选填）" : "画面描述"),
                              1
                              /* TEXT */
                            ),
                            y("textarea", {
                              value: h.caption,
                              "aria-label": "当前内容描述",
                              rows: "3",
                              placeholder: h.label === "text" ? "英文描述说话人、气泡形状与位置；留空使用常规样式" : "英文描述本框可见的场景、人物、动作与取景",
                              onInput: (V) => fe(O, "caption", V)
                            }, null, 40, pc)
                          ]),
                          y("div", gc, [
                            y("button", {
                              type: "button",
                              disabled: O === 0,
                              onClick: (V) => $e(O, -1)
                            }, "上移", 8, mc),
                            y("button", {
                              type: "button",
                              disabled: O === Y.value.length - 1,
                              onClick: (V) => $e(O, 1)
                            }, "下移", 8, vc),
                            y("button", {
                              type: "button",
                              onClick: (V) => be(O)
                            }, "删除内容", 8, yc)
                          ])
                        ]))),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      y("button", {
                        type: "button",
                        onClick: te
                      }, "＋ 添加画面／台词"),
                      f[47] || (f[47] = y(
                        "p",
                        { class: "hint" },
                        "一个框可添加多个人物或多条文字，按列表顺序输出。空白条目留作草稿；每句台词单独一项，人物与气泡可用独立内框定位。",
                        -1
                        /* CACHED */
                      ))
                    ])) : Qe("v-if", !0),
                    y("div", bc, [
                      y(
                        "button",
                        {
                          type: "button",
                          class: At({ active: !l.value }),
                          onClick: Q
                        },
                        "外框 F",
                        2
                        /* CLASS */
                      ),
                      (G(!0), oe(
                        de,
                        null,
                        pt(j.value.slots, (h, O) => (G(), oe("button", {
                          key: O,
                          type: "button",
                          class: At({ active: l.value === O }),
                          onClick: (V) => Xe(r.value, String(O))
                        }, ne(O) + " " + ne(Z[O] ?? ""), 11, wc))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    (G(), oe(
                      de,
                      null,
                      pt(["x", "y", "width", "height"], (h) => y("label", { key: h }, [
                        Te(
                          ne({ x: "左边距", y: "上边距", width: "宽度", height: "高度" }[h]),
                          1
                          /* TEXT */
                        ),
                        y("input", {
                          value: U.value?.[h],
                          "aria-label": `${l.value ? "槽位" : "分格"}${h}`,
                          type: "number",
                          step: "1",
                          onChange: (O) => W(h, O)
                        }, null, 40, xc)
                      ])),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (G(), oe("p", _c, "添加或选择一格，编辑精确尺寸。")),
                f[48] || (f[48] = y(
                  "p",
                  { class: "hint" },
                  "右侧按钮可选重叠槽位，Delete 删除小框，撤销可恢复。普通拖动四角或边中点改大小，Ctrl+拖四角改形状。MOSS 以外接矩形与轮廓描述接收形状参考，不保证精确裁剪。",
                  -1
                  /* CACHED */
                ))
              ])
            ]),
            m.value ? (G(), oe(
              "p",
              Cc,
              ne(m.value),
              1
              /* TEXT */
            )) : Qe("v-if", !0),
            b.value ? (G(), oe("footer", Sc, [
              f[49] || (f[49] = y(
                "span",
                null,
                "放弃未保存的修改？",
                -1
                /* CACHED */
              )),
              y("button", {
                type: "button",
                onClick: f[21] || (f[21] = (h) => b.value = !1)
              }, "继续编辑"),
              y("button", {
                type: "button",
                onClick: f[22] || (f[22] = (h) => s("close"))
              }, "放弃修改")
            ])) : Qe("v-if", !0),
            he.value ? (G(), oe(
              "div",
              {
                key: 2,
                class: "quick-mask",
                onMousedown: f[28] || (f[28] = Ke((h) => he.value = null, ["self"]))
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
                      f[26] || (f[26] = Ke(() => {
                      }, ["stop"])),
                      f[27] || (f[27] = Fn(Ke((h) => he.value = null, ["prevent"]), ["esc"]))
                    ]
                  },
                  [
                    y("header", null, [
                      y(
                        "strong",
                        null,
                        "第 " + ne(he.value.index + 1) + " 格 · " + ne(he.value.key) + " 画面描述",
                        1
                        /* TEXT */
                      ),
                      y("button", {
                        type: "button",
                        "aria-label": "关闭快速编辑",
                        onClick: f[23] || (f[23] = (h) => he.value = null)
                      }, "✕")
                    ]),
                    zt(y("textarea", {
                      ref_key: "quickField",
                      ref: Qt,
                      "onUpdate:modelValue": f[24] || (f[24] = (h) => we.value = h),
                      "aria-label": "快速画面描述",
                      rows: "7",
                      onKeydown: Fn(Ke(Le, ["ctrl", "prevent"]), ["enter"])
                    }, null, 40, Mc), [
                      [Rs, we.value]
                    ]),
                    y("footer", null, [
                      y("button", {
                        type: "button",
                        onClick: f[25] || (f[25] = (h) => he.value = null)
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
}), Tc = /* @__PURE__ */ vr(Oc, [["__scopeId", "data-v-b7544b1b"]]);
function cs(e) {
  const { id: t, label: n, usage: s, readingOrder: i, canvas: o, promptMode: r, promptCaption: l } = e;
  if (!o || !t) throw new Error("版式缺少 id 或 canvas。");
  const a = e.panels ?? e.portrait ?? e.landscape;
  if (!Array.isArray(a) || !a.length) throw new Error("版式缺少分格。");
  return { id: t, label: n || t, description: br(e), usage: s || "", readingOrder: i || "", canvas: o, panels: a, ...r ? { promptMode: r } : {}, ...typeof l == "string" ? { promptCaption: l } : {} };
}
function Ec(e) {
  const t = Array.isArray(e) ? e : e.layouts ?? [e];
  if (!Array.isArray(t)) throw new Error("导入需要版式数组。");
  return t.map(cs);
}
function Ac(e) {
  const t = cs(e), n = t.panels.map((s, i) => ({ panel: i + 1, position: s.position, slots: [.../* @__PURE__ */ new Set([...Object.keys(s.slots), ..."F" in s.slots ? ["X"] : []])], slotNotes: { ...Object.fromEntries(Object.entries(s.slotContents ?? {}).map(([o, r]) => [o, r.filter((l) => l.label !== "text").map((l) => l.caption).filter(Boolean).join(`
`)]).filter(([, o]) => o)), ...s.slotNotes } }));
  return `以下为当前所选版式的画面描述，结合原文分配内容。F 描述整格，其余键只作用于对应内框；留空沿用槽位默认含义。画面描述本身不是台词、旁白或可见印字，不新增剧情事件、参与者、格子或槽位。
` + JSON.stringify({ layout: t.id, description: t.description, readingOrder: t.readingOrder, panels: n }, null, 2);
}
function Rc(e, t) {
  return e.trim() + `

` + Ac(t);
}
function Ic(e, t, n) {
  const s = e.getContext("2d"), i = e.width, o = e.height;
  if (s.clearRect(0, 0, i, o), !t) return;
  const r = Math.min((i - 20) / t.canvas.width, (o - 20) / t.canvas.height), l = (i - t.canvas.width * r) / 2, a = (o - t.canvas.height * r) / 2;
  s.save(), s.translate(l, a), s.scale(r, r), s.translate(t.canvas.width / 2, t.canvas.height / 2), s.fillStyle = "#fff", s.fillRect(-t.canvas.width / 2, -t.canvas.height / 2, t.canvas.width, t.canvas.height);
  const d = t.panels.map((c, m) => ({ panel: c, index: m })).sort((c, m) => (c.panel.layer ?? c.index) - (m.panel.layer ?? m.index) || c.index - m.index);
  for (const { panel: c, index: m } of d) {
    const b = c.slots.F ?? c.slots.C ?? Object.values(c.slots)[0], [M, F, P, B] = b, N = c.shapes?.F ?? [[F, M], [B, M], [B, P], [F, P]];
    if (s.beginPath(), N.forEach(([k, $], R) => R ? s.lineTo(k, $) : s.moveTo(k, $)), s.closePath(), s.fillStyle = "#eef4fd", s.fill(), s.strokeStyle = "#235c9e", s.lineWidth = 2 / r, s.stroke(), s.save(), s.clip(), n) for (const [k, [$, R, J, j]] of Object.entries(c.slots)) {
      if (!["T", "TL", "TR", "B", "BL", "BR", "ML", "MR"].includes(k)) continue;
      const U = c.shapes?.[k] ?? [[R, $], [j, $], [j, J], [R, J]];
      s.beginPath(), U.forEach(([Z, ie], w) => w ? s.lineTo(Z, ie) : s.moveTo(Z, ie)), s.closePath(), s.strokeStyle = "#dd8838", s.lineWidth = 1 / r, s.stroke(), s.fillStyle = "#a65313", s.font = `${10 / r}px sans-serif`, s.fillText(k, R + 2 / r, $ + 12 / r);
    }
    s.restore(), s.fillStyle = "#16375b", s.font = `bold ${13 / r}px sans-serif`, s.fillText(String(m + 1), F + 4 / r, M + 16 / r);
  }
  s.restore();
}
let me = { layouts: [], revision: "" };
const Yn = /* @__PURE__ */ new Set(), Js = new URL(import.meta.url);
Js.pathname = Js.pathname.replace(/[^/]+$/, "moss_layout.css");
const mi = document.createElement("link");
mi.rel = "stylesheet";
mi.href = Js.href;
document.head.append(mi);
async function Gn(e, t = {}) {
  const n = await Tr.fetchApi("/moss_manga_layout/" + e, t), s = await n.json();
  if (!n.ok) throw new Error(s.error || `请求失败：${n.status}`);
  return s;
}
async function no() {
  me = await Gn("library"), Yn.forEach((e) => e());
}
async function qs(e) {
  me = await Gn("library", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layouts: e, revision: me.revision }) }), Yn.forEach((t) => t());
}
function so(e, t, n) {
  const s = document.createElement("div");
  document.body.append(s);
  let i;
  const o = () => {
    i.unmount(), s.remove();
  };
  i = tu(Tc, {
    sources: [...e ? [e] : [], ...me.layouts.filter((r) => r.id !== e?.id)].map((r) => ({ ...r, key: r.id })),
    existingIds: me.layouts.map((r) => r.id),
    initialMode: n,
    initialKey: e?.id,
    editingId: e?.id,
    onClose: o,
    onSave: async (r) => {
      try {
        const l = cs(r), a = me.layouts.some((d) => d.id === l.id);
        if (a && l.id !== e?.id) throw new Error("版式库已有此 ID，请改名或打开该版式编辑。");
        await qs(a ? me.layouts.map((d) => d.id === l.id ? l : d) : [...me.layouts, l]), t(l), o();
      } catch (l) {
        window.alert(l.message);
      }
    }
  }), i.mount(s);
}
async function io(e) {
  try {
    await navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement("textarea");
    t.value = e, t.style.position = "fixed", t.style.top = "-10000px", document.body.append(t), t.select();
    const n = document.execCommand("copy");
    if (t.remove(), !n) throw new Error("浏览器无法访问剪贴板。");
  }
}
function Pc(e) {
  const t = e.widgets.find((w) => w.name === "layout_id"), n = e.widgets.find((w) => w.name === "layout_snapshot");
  if (!t || !n) return;
  n.type = "hidden", n.computeSize = () => [0, -4];
  const s = e.widgets.find((w) => w.name === "library_mode") ?? { value: "llm" };
  s.type = "hidden", s.computeSize = () => [0, -4], t.type = "combo", t.options = { ...t.options, values: () => [...new Set([...me.layouts.map((w) => w.id), t.value].filter(Boolean))] };
  let i = 400, o, r;
  const l = document.createElement("div");
  l.className = "moss-layout-node-panel", l.style.cssText = "width:100%;height:400px;display:flex;flex-direction:column;gap:6px;padding:6px;box-sizing:border-box;overflow:hidden;background:#202733;color:#ecf1f7;font:12px system-ui;";
  const a = document.createElement("label");
  a.style.cssText = "display:flex;align-items:center;gap:8px;flex:none;min-height:32px", a.append(document.createTextNode("版式库"));
  const d = document.createElement("select");
  d.setAttribute("aria-label", "选择库中版式"), d.style.cssText = "flex:1;min-width:0;height:32px;color:#fff;background:#344052;border:1px solid #7d8b9e;border-radius:4px;padding:3px 6px", a.append(d), l.append(a);
  const c = document.createElement("div");
  c.style.cssText = "display:flex;flex-wrap:wrap;gap:5px;flex:none", l.append(c);
  const m = document.createElement("div");
  m.setAttribute("role", "status"), m.style.cssText = "min-height:30px;white-space:normal;overflow-wrap:anywhere;flex:none", l.append(m);
  const b = document.createElement("canvas");
  b.width = 1e3, b.height = 540, b.style.cssText = "display:block;width:100%;height:240px;min-height:240px;flex:none;object-fit:contain;background:#e9edf3", l.append(b);
  const M = document.createElement("label"), F = document.createElement("input");
  F.type = "checkbox", F.checked = !0, M.append(F, document.createTextNode("显示字区")), c.append(M);
  function P() {
    return n.value ? JSON.parse(n.value) : null;
  }
  function B() {
    if (!o) return;
    i = 36 + a.offsetHeight + c.offsetHeight + m.offsetHeight + 240, l.style.height = i + "px";
    const w = e.computeSize();
    e.size[1] < w[1] && e.setSize([e.size[0], w[1]]), Nn.graph?.setDirtyCanvas(!0, !0);
  }
  function N() {
    cancelAnimationFrame(r), r = requestAnimationFrame(B);
  }
  function k() {
    d.replaceChildren();
    for (const w of me.layouts) {
      const H = document.createElement("option");
      H.value = w.id, H.textContent = `${w.id} · ${w.label || w.id}`, d.append(H);
    }
    if (!me.layouts.some((w) => w.id === t.value)) {
      const w = document.createElement("option");
      w.value = t.value || "", w.textContent = n.value ? `${t.value} · 当前工作流快照（库中已无此版式）` : "请选择版式，或新建／导入", w.disabled = !0, d.prepend(w);
    }
    d.value = t.value || "", d.disabled = !me.layouts.length;
  }
  function $() {
    k();
    try {
      const w = P();
      Ic(b, w, F.checked), m.textContent = w ? `${w.label || w.id} · ${w.canvas.width}×${w.canvas.height} · ${w.panels.length} 格 · ${w.promptMode === "manual" ? "直接提示词（读取手填内容）" : "LLM 输入"} · 工作流快照` : "没有选中版式：请新建或导入。";
    } catch (w) {
      m.textContent = w.message;
    }
    Nn.graph?.setDirtyCanvas(!0, !0), N();
  }
  function R(w) {
    s.value = w.promptMode ?? "llm", t.value = w.id, n.value = JSON.stringify(w), $(), Nn.graph?.change();
  }
  function J(w, H) {
    const Y = document.createElement("button");
    Y.textContent = w, Y.type = "button", Y.style.cssText = "padding:4px 7px;border:1px solid #7d8b9e;border-radius:4px;background:#344052;color:#fff;cursor:pointer", Y.onclick = async () => {
      try {
        await H();
      } catch (he) {
        m.textContent = he.message;
      }
    }, c.append(Y);
  }
  J("编辑版式", () => {
    const w = P();
    if (!w) throw new Error("先选择版式。");
    so(w, R, w.promptMode ?? "llm", e.widgets.find((H) => H.name === "bleed")?.value ?? 72);
  }), J("新建", () => so(null, R, "llm", e.widgets.find((w) => w.name === "bleed")?.value ?? 72)), J("删除", async () => {
    const w = P();
    if (!w) throw new Error("先选择版式。");
    await qs(me.layouts.filter((H) => H.id !== w.id)), $(), m.textContent = "已从公共库删除。当前节点保留工作流快照；不会自动恢复到库。";
  }), J("刷新版式库", () => no()), J("一键复制说明", async () => {
    const w = P();
    if (!w) throw new Error("先选择版式。");
    const H = await Gn("format", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(w) });
    await io(Rc(H.text, w)), m.textContent = "已复制格式转换＋当前快照的画面描述，可一起交给 LLM。";
  }), J("复制手填提示词", async () => {
    const w = P();
    if (!w) throw new Error("先选择版式。");
    const H = await Gn("manual", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layout: w, bleed: e.widgets.find((Y) => Y.name === "bleed")?.value ?? 72 }) });
    await io(H.text), m.textContent = "已复制 MOSS 提示词，可直接送入文本编码器。";
  }), J("导出版式库", () => {
    const w = URL.createObjectURL(new Blob([JSON.stringify({ layouts: me.layouts }, null, 2)], { type: "application/json" })), H = document.createElement("a");
    H.href = w, H.download = "moss-manga-layouts.json", H.click(), setTimeout(() => URL.revokeObjectURL(w), 1e3);
  }), J("导出当前版式", () => {
    const w = P();
    if (!w) throw new Error("先选择版式。");
    const H = URL.createObjectURL(new Blob([JSON.stringify(cs(w), null, 2)], { type: "application/json" })), Y = document.createElement("a");
    Y.href = H, Y.download = "moss-manga-current-layout.json", Y.click(), setTimeout(() => URL.revokeObjectURL(H), 1e3);
  }), J("导入", () => {
    const w = document.createElement("input");
    w.type = "file", w.accept = ".json,application/json", w.onchange = async () => {
      try {
        if (!w.files?.[0]) return;
        const H = JSON.parse(await w.files[0].text()), Y = Ec(H);
        for (const we of Y) we.promptMode ??= H.mode ?? "llm";
        const he = new Set(me.layouts.map((we) => we.id));
        if (Y.some((we) => he.has(we.id))) throw new Error("导入含同名 ID，请先改名；不会覆盖已有版式。");
        await qs([...me.layouts, ...Y]), Y.length ? R(Y[0]) : $();
      } catch (H) {
        m.textContent = H.message;
      }
    }, w.click();
  }), F.onchange = $, d.onchange = () => {
    const w = me.layouts.find((H) => H.id === d.value);
    w && R(w);
  }, t.callback = (w) => {
    const H = me.layouts.find((Y) => Y.id === w);
    H ? R(H) : $();
  }, o = e.addDOMWidget("版式预览", "moss_layout_preview", l, { serialize: !1, hideOnZoom: !1, getMinHeight: () => i, getMaxHeight: () => i, getHeight: () => i }), o.computeSize = (w) => [w, i], e.setSize([Math.max(e.size[0], 460), Math.max(e.size[1], 640)]);
  const j = new ResizeObserver(N);
  [a, c, m].forEach((w) => j.observe(w));
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
  }, Yn.add($);
  const ie = e.onRemoved;
  e.onRemoved = function(...w) {
    return Yn.delete($), j.disconnect(), cancelAnimationFrame(r), ie?.apply(this, w);
  }, no().then(() => {
    if (n.value && (s.value = P()?.promptMode ?? "llm"), !n.value && !t.value && me.layouts.length) R(me.layouts[0]);
    else if (!n.value && t.value) {
      const w = me.layouts.find((H) => H.id === t.value);
      w && R(w);
    }
    $();
  }).catch((w) => {
    m.textContent = w.message;
  });
}
Nn.registerExtension({ name: "MOSS.MangaLayout", beforeRegisterNodeDef(e, t) {
  if (t.name !== "MossMangaLayout") return;
  const n = e.prototype.onNodeCreated;
  e.prototype.onNodeCreated = function(...s) {
    const i = n?.apply(this, s);
    return Pc(this), i;
  };
} });
