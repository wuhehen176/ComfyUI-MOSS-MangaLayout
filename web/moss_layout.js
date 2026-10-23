import { app as _n } from "../../scripts/app.js";
import { api as no } from "../../scripts/api.js";
// @__NO_SIDE_EFFECTS__
function Ps(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ne = {}, At = [], Ge = () => {
}, Ki = () => !1, kn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Dn = (e) => e.startsWith("onUpdate:"), ye = Object.assign, Is = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, so = Object.prototype.hasOwnProperty, Y = (e, t) => so.call(e, t), H = Array.isArray, vt = (e) => an(e) === "[object Map]", ft = (e) => an(e) === "[object Set]", ni = (e) => an(e) === "[object Date]", U = (e) => typeof e == "function", le = (e) => typeof e == "string", Le = (e) => typeof e == "symbol", te = (e) => e !== null && typeof e == "object", Bi = (e) => (te(e) || U(e)) && U(e.then) && U(e.catch), Ui = Object.prototype.toString, an = (e) => Ui.call(e), io = (e) => an(e).slice(8, -1), Wi = (e) => an(e) === "[object Object]", Rs = (e) => le(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Gt = /* @__PURE__ */ Ps(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ln = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, ro = /-\w/g, ke = Ln(
  (e) => e.replace(ro, (t) => t.slice(1).toUpperCase())
), oo = /\B([A-Z])/g, Nt = Ln(
  (e) => e.replace(oo, "-$1").toLowerCase()
), zi = Ln((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xn = Ln(
  (e) => e ? `on${zi(e)}` : ""
), Je = (e, t) => !Object.is(e, t), wn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ji = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Vn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let si;
const Hn = () => si || (si = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function en(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = le(s) ? ao(s) : en(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (le(e) || te(e))
    return e;
}
const lo = /;(?![^(]*\))/g, co = /:([^]+)/, uo = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function ao(e) {
  const t = {};
  return e.replace(uo, (n) => n.startsWith("/*") ? "" : n).split(lo).forEach((n) => {
    if (n) {
      const s = n.split(co);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Pt(e) {
  let t = "";
  if (le(e))
    t = e;
  else if (H(e))
    for (let n = 0; n < e.length; n++) {
      const s = Pt(e[n]);
      s && (t += s + " ");
    }
  else if (te(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const fo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", ho = /* @__PURE__ */ Ps(fo);
function qi(e) {
  return !!e || e === "";
}
function po(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let i = 0; s && i < e.length; i++)
    s = dt(e[i], t[i], n);
  return s;
}
function ii(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t), i = new Uint8Array(s.length);
  for (const r of e) {
    let o = -1;
    for (let l = 0; l < s.length; l++)
      if (!i[l] && dt(r, s[l], n)) {
        o = l;
        break;
      }
    if (o < 0) return !1;
    i[o] = 1;
  }
  return !0;
}
function go(e, t, n) {
  let s = vt(e), i = vt(t);
  if (s || i || (s = ft(e), i = ft(t), s || i))
    return s && i ? ii(e, t, n) : !1;
  const r = Object.keys(e).length, o = Object.keys(t).length;
  if (r !== o)
    return !1;
  for (const l in e) {
    const c = e.hasOwnProperty(l), f = t.hasOwnProperty(l);
    if (c && !f || !c && f || !dt(e[l], t[l], n))
      return !1;
  }
  return String(e) === String(t);
}
function ri(e, t, n, s) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, r] = n;
  if (i.has(e) || r.has(t))
    return i.get(e) === t && r.get(t) === e;
  i.set(e, t), r.set(t, e);
  const o = s(e, t, n);
  return i.delete(e), r.delete(t), o;
}
function dt(e, t, n) {
  if (e === t) return !0;
  let s = ni(e), i = ni(t);
  return s || i ? s && i ? e.getTime() === t.getTime() : !1 : (s = Le(e), i = Le(t), s || i ? e === t : (s = H(e), i = H(t), s || i ? s && i ? ri(e, t, n, po) : !1 : (s = te(e), i = te(t), s || i ? !s || !i ? !1 : ri(e, t, n, go) : String(e) === String(t))));
}
function Ns(e, t) {
  return e.findIndex((n) => dt(n, t));
}
const Gi = (e) => !!(e && e.__v_isRef === !0), fe = (e) => le(e) ? e : e == null ? "" : H(e) || te(e) && (e.toString === Ui || !U(e.toString)) ? Gi(e) ? fe(e.value) : JSON.stringify(e, Yi, 2) : String(e), Yi = (e, t) => Gi(t) ? Yi(e, t.value) : vt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], r) => (n[Zn(s, r) + " =>"] = i, n),
    {}
  )
} : ft(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Zn(n))
} : Le(t) ? Zn(t) : te(t) && !H(t) && !Wi(t) ? String(t) : t, Zn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Le(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let ge;
class mo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && ge && (ge.active ? (this.parent = ge, this.index = (ge.scopes || (ge.scopes = [])).push(
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
      const n = ge;
      try {
        return ge = this, t();
      } finally {
        ge = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ge, ge = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ge === this)
        ge = this.prevScope;
      else {
        let t = ge;
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
function yo() {
  return ge;
}
let ie;
const Qn = /* @__PURE__ */ new WeakSet();
class Xi {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ge && (ge.active ? ge.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Qn.has(this) && (Qn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Qi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, oi(this), er(this);
    const t = ie, n = De;
    ie = this, De = !0;
    try {
      return this.fn();
    } finally {
      tr(this), ie = t, De = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        js(t);
      this.deps = this.depsTail = void 0, oi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Qn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ds(this) && this.run();
  }
  get dirty() {
    return ds(this);
  }
}
let Zi = 0, Yt, Xt;
function Qi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Xt, Xt = e;
    return;
  }
  e.next = Yt, Yt = e;
}
function Fs() {
  Zi++;
}
function $s() {
  if (--Zi > 0)
    return;
  if (Xt) {
    let t = Xt;
    for (Xt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Yt; ) {
    let t = Yt;
    for (Yt = void 0; t; ) {
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
function er(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function tr(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), js(s), vo(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function ds(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (nr(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function nr(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === tn) || (e.globalVersion = tn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ds(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ie, s = De;
  ie = e, De = !0;
  try {
    er(e);
    const i = e.fn(e._value);
    (t.version === 0 || Je(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ie = n, De = s, tr(e), e.flags &= -3;
  }
}
function js(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      js(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function vo(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let De = !0;
const sr = [];
function Xe() {
  sr.push(De), De = !1;
}
function Ze() {
  const e = sr.pop();
  De = e === void 0 ? !0 : e;
}
function oi(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ie;
    ie = void 0;
    try {
      t();
    } finally {
      ie = n;
    }
  }
}
let tn = 0;
class bo {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ks {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ie || !De || ie === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ie)
      n = this.activeLink = new bo(ie, this), ie.deps ? (n.prevDep = ie.depsTail, ie.depsTail.nextDep = n, ie.depsTail = n) : ie.deps = ie.depsTail = n, ir(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ie.depsTail, n.nextDep = void 0, ie.depsTail.nextDep = n, ie.depsTail = n, ie.deps === n && (ie.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, tn++, this.notify(t);
  }
  notify(t) {
    Fs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      $s();
    }
  }
}
function ir(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        ir(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const hs = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ Symbol(
  ""
), ps = /* @__PURE__ */ Symbol(
  ""
), nn = /* @__PURE__ */ Symbol(
  ""
);
function be(e, t, n) {
  if (De && ie) {
    let s = hs.get(e);
    s || hs.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new ks()), i.map = s, i.key = n), i.track();
  }
}
function ct(e, t, n, s, i, r) {
  const o = hs.get(e);
  if (!o) {
    tn++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Fs(), t === "clear")
    o.forEach(l);
  else {
    const c = H(e), f = c && Rs(n);
    if (c && n === "length") {
      const a = Number(s);
      o.forEach((p, S) => {
        (S === "length" || S === nn || !Le(S) && S >= a) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(nn)), t) {
        case "add":
          c ? f && l(o.get("length")) : (l(o.get(It)), vt(e) && l(o.get(ps)));
          break;
        case "delete":
          c || (l(o.get(It)), vt(e) && l(o.get(ps)));
          break;
        case "set":
          vt(e) && l(o.get(It));
          break;
      }
  }
  $s();
}
function $t(e) {
  const t = /* @__PURE__ */ X(e);
  return t === e || (be(t, "iterate", nn), /* @__PURE__ */ Ne(e)) ? t : /* @__PURE__ */ Qe(e) ? /* @__PURE__ */ bt(e) ? t.map((n) => xt(Fe(n))) : t.map(xt) : t.map(Fe);
}
function Kn(e) {
  return be(e = /* @__PURE__ */ X(e), "iterate", nn), e;
}
function Ue(e, t) {
  return /* @__PURE__ */ Qe(e) ? xt(/* @__PURE__ */ bt(e) ? Fe(t) : t) : Fe(t);
}
const xo = {
  __proto__: null,
  [Symbol.iterator]() {
    return es(this, Symbol.iterator, (e) => Ue(this, e));
  },
  concat(...e) {
    return $t(this).concat(
      ...e.map((t) => H(t) ? $t(t) : t)
    );
  },
  entries() {
    return es(this, "entries", (e) => (e[1] = Ue(this, e[1]), e));
  },
  every(e, t) {
    return it(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return it(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Ue(this, s)),
      arguments
    );
  },
  find(e, t) {
    return it(
      this,
      "find",
      e,
      t,
      (n) => Ue(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return it(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return it(
      this,
      "findLast",
      e,
      t,
      (n) => Ue(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return it(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return it(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ts(this, "includes", e);
  },
  indexOf(...e) {
    return ts(this, "indexOf", e);
  },
  join(e) {
    return $t(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ts(this, "lastIndexOf", e);
  },
  map(e, t) {
    return it(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Bt(this, "pop");
  },
  push(...e) {
    return Bt(this, "push", e);
  },
  reduce(e, ...t) {
    return ci(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ci(this, "reduceRight", e, t);
  },
  shift() {
    return Bt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return it(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Bt(this, "splice", e);
  },
  toReversed() {
    return $t(this).toReversed();
  },
  toSorted(e) {
    return $t(this).toSorted(e);
  },
  toSpliced(...e) {
    return $t(this).toSpliced(...e);
  },
  unshift(...e) {
    return Bt(this, "unshift", e);
  },
  values() {
    return es(this, "values", (e) => Ue(this, e));
  }
};
function es(e, t, n) {
  const s = Kn(e), i = s[t], r = i.call(s);
  if (s !== e && !/* @__PURE__ */ Ne(e)) {
    if (r[Symbol.toStringTag] === "Array Iterator") {
      const o = Object.create(Object.getPrototypeOf(r));
      return o.next = () => li(r.next(), n), i !== rr[t] && Object.defineProperties(o, {
        return: {
          get() {
            const l = r.return;
            return typeof l == "function" ? l.bind(r) : l;
          }
        },
        throw: {
          get() {
            const l = r.throw;
            return typeof l == "function" ? l.bind(r) : l;
          }
        }
      }), o;
    }
    r._next = r.next, r.next = () => li(r._next(), n);
  }
  return r;
}
function li(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const rr = Array.prototype;
function it(e, t, n, s, i, r) {
  const o = Kn(e), l = o !== e && !/* @__PURE__ */ Ne(e), c = o[t];
  if (c !== rr[t]) {
    const p = c.apply(e, r);
    return l ? Fe(p) : p;
  }
  let f = n;
  o !== e && (l ? f = function(p, S) {
    return n.call(this, Ue(e, p), S, e);
  } : n.length > 2 && (f = function(p, S) {
    return n.call(this, p, S, e);
  }));
  const a = c.call(o, f, s);
  return l && i ? i(a) : a;
}
function ci(e, t, n, s) {
  const i = Kn(e), r = i !== e && !/* @__PURE__ */ Ne(e);
  let o = n, l = !1;
  i !== e && (r ? (l = s.length === 0, o = function(f, a, p) {
    return l && (l = !1, f = Ue(e, f)), n.call(this, f, Ue(e, a), p, e);
  }) : n.length > 3 && (o = function(f, a, p) {
    return n.call(this, f, a, p, e);
  }));
  const c = i[t](o, ...s);
  return l ? Ue(e, c) : c;
}
function ts(e, t, n) {
  const s = /* @__PURE__ */ X(e);
  be(s, "iterate", nn);
  const i = s[t](...n);
  return (i === -1 || i === !1) && /* @__PURE__ */ Hs(n[0]) ? (n[0] = /* @__PURE__ */ X(n[0]), s[t](...n)) : i;
}
function Bt(e, t, n = []) {
  Xe(), Fs();
  const s = (/* @__PURE__ */ X(e))[t].apply(e, n);
  return $s(), Ze(), s;
}
const _o = /* @__PURE__ */ Ps("__proto__,__v_isRef,__isVue"), or = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Le)
);
function wo(e) {
  Le(e) || (e = String(e));
  const t = /* @__PURE__ */ X(this);
  return be(t, "has", e), t.hasOwnProperty(e);
}
class lr {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return s === (i ? r ? Ro : fr : r ? ar : ur).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = H(t);
    if (!i) {
      let c;
      if (o && (c = xo[n]))
        return c;
      if (n === "hasOwnProperty")
        return wo;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ _e(t) ? t : s
    );
    if ((Le(n) ? or.has(n) : _o(n)) || (i || be(t, "get", n), r))
      return l;
    if (/* @__PURE__ */ _e(l)) {
      const c = o && Rs(n) ? l : l.value;
      return i && te(c) ? /* @__PURE__ */ ms(c) : c;
    }
    return te(l) ? i ? /* @__PURE__ */ ms(l) : /* @__PURE__ */ Ls(l) : l;
  }
}
class cr extends lr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let r = t[n];
    const o = H(t) && Rs(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ Qe(r);
      if (!/* @__PURE__ */ Ne(s) && !/* @__PURE__ */ Qe(s) && (r = /* @__PURE__ */ X(r), s = /* @__PURE__ */ X(s)), !o && /* @__PURE__ */ _e(r) && !/* @__PURE__ */ _e(s))
        return f || (r.value = s), !0;
    }
    const l = o ? Number(n) < t.length : Y(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ _e(t) ? t : i
    );
    return t === /* @__PURE__ */ X(i) && c && (l ? Je(s, r) && ct(t, "set", n, s) : ct(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = Y(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && s && ct(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Le(n) || !or.has(n)) && be(t, "has", n), s;
  }
  ownKeys(t) {
    return be(
      t,
      "iterate",
      H(t) ? "length" : It
    ), Reflect.ownKeys(t);
  }
}
class So extends lr {
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
const Co = /* @__PURE__ */ new cr(), To = /* @__PURE__ */ new So(), Oo = /* @__PURE__ */ new cr(!0);
const gs = (e) => e, gn = (e) => Reflect.getPrototypeOf(e);
function Eo(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = /* @__PURE__ */ X(i), o = vt(r), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, f = i[e](...s), a = n ? gs : t ? xt : Fe;
    return !t && be(
      r,
      "iterate",
      c ? ps : It
    ), ye(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: p, done: S } = f.next();
          return S ? { value: p, done: S } : {
            value: l ? [a(p[0]), a(p[1])] : a(p),
            done: S
          };
        }
      }
    );
  };
}
function mn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Mo(e, t) {
  const n = {
    get(i) {
      const r = this.__v_raw, o = /* @__PURE__ */ X(r), l = /* @__PURE__ */ X(i);
      e || (Je(i, l) && be(o, "get", i), be(o, "get", l));
      const { has: c } = gn(o), f = t ? gs : e ? xt : Fe;
      if (c.call(o, i))
        return f(r.get(i));
      if (c.call(o, l))
        return f(r.get(l));
      r !== o && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && be(/* @__PURE__ */ X(i), "iterate", It), i.size;
    },
    has(i) {
      const r = this.__v_raw, o = /* @__PURE__ */ X(r), l = /* @__PURE__ */ X(i);
      return e || (Je(i, l) && be(o, "has", i), be(o, "has", l)), i === l ? r.has(i) : r.has(i) || r.has(l);
    },
    forEach(i, r) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ X(l), f = t ? gs : e ? xt : Fe;
      return !e && be(c, "iterate", It), l.forEach((a, p) => i.call(r, f(a), f(p), o));
    }
  };
  return ye(
    n,
    e ? {
      add: mn("add"),
      set: mn("set"),
      delete: mn("delete"),
      clear: mn("clear")
    } : {
      add(i) {
        const r = /* @__PURE__ */ X(this), o = gn(r), l = /* @__PURE__ */ X(i), c = !t && !/* @__PURE__ */ Ne(i) && !/* @__PURE__ */ Qe(i) ? l : i;
        return o.has.call(r, c) || Je(i, c) && o.has.call(r, i) || Je(l, c) && o.has.call(r, l) || (r.add(c), ct(r, "add", c, c)), this;
      },
      set(i, r) {
        !t && !/* @__PURE__ */ Ne(r) && !/* @__PURE__ */ Qe(r) && (r = /* @__PURE__ */ X(r));
        const o = /* @__PURE__ */ X(this), { has: l, get: c } = gn(o);
        let f = l.call(o, i);
        f || (i = /* @__PURE__ */ X(i), f = l.call(o, i));
        const a = c.call(o, i);
        return o.set(i, r), f ? Je(r, a) && ct(o, "set", i, r) : ct(o, "add", i, r), this;
      },
      delete(i) {
        const r = /* @__PURE__ */ X(this), { has: o, get: l } = gn(r);
        let c = o.call(r, i);
        c || (i = /* @__PURE__ */ X(i), c = o.call(r, i)), l && l.call(r, i);
        const f = r.delete(i);
        return c && ct(r, "delete", i, void 0), f;
      },
      clear() {
        const i = /* @__PURE__ */ X(this), r = i.size !== 0, o = i.clear();
        return r && ct(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    n[i] = Eo(i, e, t);
  }), n;
}
function Ds(e, t) {
  const n = Mo(e, t);
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? s : Reflect.get(
    Y(n, i) && i in s ? n : s,
    i,
    r
  );
}
const Ao = {
  get: /* @__PURE__ */ Ds(!1, !1)
}, Po = {
  get: /* @__PURE__ */ Ds(!1, !0)
}, Io = {
  get: /* @__PURE__ */ Ds(!0, !1)
};
const ur = /* @__PURE__ */ new WeakMap(), ar = /* @__PURE__ */ new WeakMap(), fr = /* @__PURE__ */ new WeakMap(), Ro = /* @__PURE__ */ new WeakMap();
function No(e) {
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
function Ls(e) {
  return /* @__PURE__ */ Qe(e) ? e : Vs(
    e,
    !1,
    Co,
    Ao,
    ur
  );
}
// @__NO_SIDE_EFFECTS__
function Fo(e) {
  return Vs(
    e,
    !1,
    Oo,
    Po,
    ar
  );
}
// @__NO_SIDE_EFFECTS__
function ms(e) {
  return Vs(
    e,
    !0,
    To,
    Io,
    fr
  );
}
function Vs(e, t, n, s, i) {
  if (!te(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const o = No(io(e));
  if (o === 0)
    return e;
  const l = new Proxy(
    e,
    o === 2 ? s : n
  );
  return i.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function bt(e) {
  return /* @__PURE__ */ Qe(e) ? /* @__PURE__ */ bt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Qe(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ne(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Hs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function X(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ X(t) : e;
}
function $o(e) {
  return !Y(e, "__v_skip") && Object.isExtensible(e) && Ji(e, "__v_skip", !0), e;
}
const Fe = (e) => te(e) ? /* @__PURE__ */ Ls(e) : e, xt = (e) => te(e) ? /* @__PURE__ */ ms(e) : e;
// @__NO_SIDE_EFFECTS__
function _e(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  return jo(e, !1);
}
function jo(e, t) {
  return /* @__PURE__ */ _e(e) ? e : new ko(e, t);
}
class ko {
  constructor(t, n) {
    this.dep = new ks(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ X(t), this._value = n ? t : Fe(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Ne(t) || /* @__PURE__ */ Qe(t);
    t = s ? t : /* @__PURE__ */ X(t), Je(t, n) && (this._rawValue = t, this._value = s ? t : Fe(t), this.dep.trigger());
  }
}
function Do(e) {
  return /* @__PURE__ */ _e(e) ? e.value : e;
}
const Lo = {
  get: (e, t, n) => t === "__v_raw" ? e : Do(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return /* @__PURE__ */ _e(i) && !/* @__PURE__ */ _e(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function dr(e) {
  return /* @__PURE__ */ bt(e) ? e : new Proxy(e, Lo);
}
class Vo {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ks(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = tn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ie !== this)
      return Qi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return nr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Ho(e, t, n = !1) {
  let s, i;
  return U(e) ? s = e : (s = e.get, i = e.set), new Vo(s, i, n);
}
const yn = {}, Mn = /* @__PURE__ */ new WeakMap();
let Ot;
function Ko(e, t = !1, n = Ot) {
  if (n) {
    let s = Mn.get(n);
    s || Mn.set(n, s = []), s.push(e);
  }
}
function Bo(e, t, n = ne) {
  const { immediate: s, deep: i, once: r, scheduler: o, augmentJob: l, call: c } = n, f = (v) => i ? v : /* @__PURE__ */ Ne(v) || i === !1 || i === 0 ? ut(v, 1) : ut(v);
  let a, p, S, T, F = !1, R = !1;
  if (/* @__PURE__ */ _e(e) ? (p = () => e.value, F = /* @__PURE__ */ Ne(e)) : /* @__PURE__ */ bt(e) ? (p = () => f(e), F = !0) : H(e) ? (R = !0, F = e.some((v) => /* @__PURE__ */ bt(v) || /* @__PURE__ */ Ne(v)), p = () => e.map((v) => {
    if (/* @__PURE__ */ _e(v))
      return v.value;
    if (/* @__PURE__ */ bt(v))
      return f(v);
    if (U(v))
      return c ? c(v, 2) : v();
  })) : U(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (S) {
      Xe();
      try {
        S();
      } finally {
        Ze();
      }
    }
    const v = Ot;
    Ot = a;
    try {
      return c ? c(e, 3, [T]) : e(T);
    } finally {
      Ot = v;
    }
  } : p = Ge, t && i) {
    const v = p, W = i === !0 ? 1 / 0 : i;
    p = () => ut(v(), W);
  }
  const L = yo(), $ = () => {
    a.stop(), L && L.active && Is(L.effects, a);
  };
  if (r && t) {
    const v = t;
    t = (...W) => {
      try {
        return v(...W);
      } finally {
        $();
      }
    };
  }
  let A = R ? new Array(e.length).fill(yn) : yn;
  const V = (v) => {
    if (!(!(a.flags & 1) || !a.dirty && !v))
      if (t) {
        const W = a.run();
        if (v || i || F || (R ? W.some((de, B) => Je(de, A[B])) : Je(W, A))) {
          const de = Ot;
          Xe();
          try {
            S && S(), Ot = a;
            const B = [
              W,
              // pass undefined as the old value when it's changed for the first time
              A === yn ? void 0 : R && A[0] === yn ? [] : A,
              T
            ];
            A = W, c ? c(t, 3, B) : (
              // @ts-expect-error
              t(...B)
            );
          } finally {
            Ot = de, Ze();
          }
        }
      } else
        a.run();
  };
  return l && l(V), a = new Xi(p), a.scheduler = o ? () => o(V, !1) : V, T = (v) => Ko(v, !1, a), S = a.onStop = () => {
    const v = Mn.get(a);
    if (v) {
      if (c)
        c(v, 4);
      else
        for (const W of v) W();
      Mn.delete(a);
    }
  }, t ? s ? V(!0) : A = a.run() : o ? o(V.bind(null, !0), !0) : a.run(), $.pause = a.pause.bind(a), $.resume = a.resume.bind(a), $.stop = $, $;
}
function ut(e, t = 1 / 0, n) {
  if (t <= 0 || !te(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ _e(e))
    ut(e.value, t, n);
  else if (H(e))
    for (let s = 0; s < e.length; s++)
      ut(e[s], t, n);
  else if (ft(e) || vt(e))
    e.forEach((s) => {
      ut(s, t, n);
    });
  else if (Wi(e)) {
    for (const s in e)
      ut(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && ut(e[s], t, n);
  }
  return e;
}
function fn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (i) {
    Bn(i, t, n);
  }
}
function Ve(e, t, n, s) {
  if (U(e)) {
    const i = fn(e, t, n, s);
    return i && Bi(i) && i.catch((r) => {
      Bn(r, t, n);
    }), i;
  }
  if (H(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(Ve(e[r], t, n, s));
    return i;
  }
}
function Bn(e, t, n, s = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = t && t.appContext.config || ne;
  if (t) {
    let l = t.parent;
    const c = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, c, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      Xe(), fn(r, null, 10, [
        e,
        c,
        f
      ]), Ze();
      return;
    }
  }
  Uo(e, n, i, s, o);
}
function Uo(e, t, n, s = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Ee = [];
let je = -1;
const We = [];
let mt = null, jt = 0;
const hr = /* @__PURE__ */ Promise.resolve();
let An = null;
function Ks(e) {
  const t = An || hr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Wo(e) {
  let t = je + 1, n = Ee.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = Ee[s], r = sn(i);
    r < e || r === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Bs(e) {
  if (!(e.flags & 1)) {
    const t = sn(e), n = Ee[Ee.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= sn(n) ? Ee.push(e) : Ee.splice(Wo(t), 0, e), e.flags |= 1, pr();
  }
}
function pr() {
  An || (An = hr.then(yr));
}
function zo(e) {
  if (!H(e))
    mt && e.id === -1 ? mt.splice(jt + 1, 0, e) : e.flags & 1 || (We.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      We.push(e[t]);
  pr();
}
function gr(e, t, n, s = je + 1) {
  for (; s < Ee.length; s++) {
    const i = Ee[s];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      Ee.splice(s, 1), s = e ? s - 1 : je, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function mr(e, t, n = 0) {
  if (We.length) {
    let s = We, i = 0;
    if (t) {
      s = [];
      for (let o = 0; o < We.length; o++) {
        const l = We[o];
        (l.i !== void 0 ? !l.i || l.i.uid < n : t.has(l)) ? We[i++] = l : s.push(l);
      }
    }
    const r = [...new Set(s)].sort((o, l) => sn(o) - sn(l));
    if (We.length = i, mt) {
      for (let o = 0; o < r.length; o++)
        mt.push(r[o]);
      return;
    }
    for (mt = r, jt = 0; jt < mt.length; jt++) {
      const o = mt[jt];
      o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
    }
    mt = null, jt = 0;
  }
}
let ns = !1;
function Jo(e, t) {
  if (ns) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(We);
  e(), ns = !0;
  try {
    gr(void 0, t), mr(void 0, n, t);
  } finally {
    ns = !1;
  }
}
const sn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function yr(e) {
  try {
    for (je = 0; je < Ee.length; je++) {
      const t = Ee[je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), fn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; je < Ee.length; je++) {
      const t = Ee[je];
      t && (t.flags &= -2);
    }
    je = -1, Ee.length = 0, mr(), An = null, (Ee.length || We.length) && yr();
  }
}
let xe = null, vr = null;
function Pn(e) {
  const t = xe;
  return xe = e, vr = e && e.type.__scopeId || null, t;
}
function br(e, t = xe, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && _i(-1);
    const r = Pn(t), o = at.length;
    let l;
    try {
      l = e(...i);
    } finally {
      for (let c = at.length; c > o; c--) qs();
      Pn(r), s._d && _i(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Ut(e, t) {
  if (xe === null)
    return e;
  const n = Gn(xe), s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, o, l, c = ne] = t[i];
    r && (U(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && ut(o), s.push({
      dir: r,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function St(e, t, n, s) {
  const i = e.dirs, r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    r && (l.oldValue = r[o].value);
    let c = l.dir[s];
    c && (Xe(), Ve(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Ze());
  }
}
function qo(e, t) {
  if (Me) {
    let n = Me.provides;
    const s = Me.parent && Me.parent.provides;
    s === n && (n = Me.provides = Object.create(s)), n[e] = t;
  }
}
function Sn(e, t, n = !1) {
  const s = ql();
  if (s || Dt) {
    let i = Dt ? Dt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && U(t) ? t.call(s && s.proxy) : t;
  }
}
const Go = /* @__PURE__ */ Symbol.for("v-scx"), Yo = () => Sn(Go);
function ss(e, t, n) {
  return xr(e, t, n);
}
function xr(e, t, n = ne) {
  const { immediate: s, deep: i, flush: r, once: o } = n, l = ye({}, n), c = t && s || !t && r !== "post";
  let f;
  if (cn) {
    if (r === "sync") {
      const T = Yo();
      f = T.__watcherHandles || (T.__watcherHandles = []);
    } else if (!c) {
      const T = () => {
      };
      return T.stop = Ge, T.resume = Ge, T.pause = Ge, T;
    }
  }
  const a = Me;
  l.call = (T, F, R) => Ve(T, a, F, R);
  let p = !1;
  r === "post" ? l.scheduler = (T) => {
    T.i = a, Oe(T, a && a.suspense);
  } : r !== "sync" && (p = !0, l.scheduler = (T, F) => {
    F ? T() : Bs(T);
  }), l.augmentJob = (T) => {
    t && (T.flags |= 4), p && (T.flags |= 2, a && (T.id = a.uid, T.i = a));
  };
  const S = Bo(e, t, l);
  return cn && (f ? f.push(S) : c && S()), S;
}
function Xo(e, t, n) {
  const s = this.proxy, i = le(e) ? e.includes(".") ? _r(s, e) : () => s[e] : e.bind(s, s);
  let r;
  U(t) ? r = t : (r = t.handler, n = t);
  const o = dn(this), l = xr(i, r.bind(s), n);
  return o(), l;
}
function _r(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
const gt = /* @__PURE__ */ new WeakMap(), wr = /* @__PURE__ */ Symbol("_vte"), Un = (e) => e.__isTeleport, Mt = (e) => e && (e.disabled || e.disabled === ""), Zo = (e) => e && (e.defer || e.defer === ""), ui = (e) => typeof SVGElement < "u" && e instanceof SVGElement, ai = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, ys = (e, t) => {
  const n = e && e.to;
  return le(n) ? t ? t(n) : null : n;
}, Qo = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, s, i, r, o, l, c, f) {
    const {
      mc: a,
      pc: p,
      pbc: S,
      o: { insert: T, querySelector: F, createText: R, createComment: L, parentNode: $ }
    } = f, A = Mt(t.props);
    let { dynamicChildren: V } = t;
    const v = (B, J, w) => {
      B.shapeFlag & 16 && a(
        B.children,
        J,
        w,
        i,
        r,
        o,
        l,
        c
      );
    }, W = (B = t) => {
      const J = Mt(B.props), w = B.target = ys(B.props, F), k = vs(w, B, R, T);
      w && (o !== "svg" && ui(w) ? o = "svg" : o !== "mathml" && ai(w) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(w), J || (v(B, w, k), zt(B, !1)));
    }, de = (B) => {
      const J = () => {
        if (gt.get(B) === J) {
          if (gt.delete(B), Mt(B.props)) {
            const w = $(B.el) || n;
            v(B, w, B.anchor), zt(B, !0);
          }
          W(B);
        }
      };
      gt.set(B, J), Oe(J, r);
    };
    if (e == null) {
      const B = t.el = R(""), J = t.anchor = R("");
      if (T(B, n, s), T(J, n, s), Zo(t.props) || r && r.pendingBranch) {
        de(t);
        return;
      }
      A && (v(t, n, J), zt(t, !0)), W();
    } else {
      t.el = e.el;
      const B = t.anchor = e.anchor, J = gt.get(e);
      if (J) {
        J.flags |= 8, gt.delete(e), de(t);
        return;
      }
      t.targetStart = e.targetStart;
      const w = t.target = e.target, k = t.targetAnchor = e.targetAnchor, oe = Mt(e.props), pe = oe ? n : w, et = oe ? B : k;
      if (o === "svg" || ui(w) ? o = "svg" : (o === "mathml" || ai(w)) && (o = "mathml"), V ? (S(
        e.dynamicChildren,
        V,
        pe,
        i,
        r,
        o,
        l
      ), Js(e, t, !0)) : c || p(
        e,
        t,
        pe,
        et,
        i,
        r,
        o,
        l,
        !1
      ), A)
        oe ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : vn(
          t,
          n,
          B,
          f,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const tt = ys(t.props, F);
        tt && (t.target = tt, vn(
          t,
          tt,
          null,
          f,
          0
        ));
      } else oe && vn(
        t,
        w,
        k,
        f,
        1
      );
      zt(t, A);
    }
  },
  remove(e, t, n, { um: s, o: { remove: i } }, r) {
    const {
      shapeFlag: o,
      children: l,
      anchor: c,
      targetStart: f,
      targetAnchor: a,
      target: p,
      props: S
    } = e, T = Mt(S), F = r || !T, R = gt.get(e);
    if (R && (R.flags |= 8, gt.delete(e)), p && (i(f), i(a)), r && i(c), !R && (T || p) && o & 16)
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
  move: vn,
  hydrate: el
};
function vn(e, t, n, { o: { insert: s }, m: i }, r = 2) {
  r === 0 && (e.targetStart && s(e.targetStart, t, n), s(e.targetAnchor, t, n), n = e.targetAnchor);
  const { el: o, anchor: l, shapeFlag: c, children: f, props: a } = e, p = r === 2;
  if (p && s(o, t, n), !gt.has(e) && (!p || Mt(a)) && c & 16)
    for (let S = 0; S < f.length; S++)
      i(
        f[S],
        t,
        n,
        2
      );
  p && s(l, t, n);
}
function el(e, t, n, s, i, r, {
  o: { nextSibling: o, parentNode: l, querySelector: c, insert: f, createText: a }
}, p) {
  function S(L, $) {
    let A = $;
    for (; A; ) {
      if (A && A.nodeType === 8) {
        if (A.data === "teleport start anchor")
          t.targetStart = A;
        else if (A.data === "teleport anchor") {
          t.targetAnchor = A, L._lpa = t.targetAnchor && o(t.targetAnchor);
          break;
        }
      }
      A = o(A);
    }
  }
  function T(L, $) {
    $.anchor = p(
      o(L),
      $,
      l(L),
      n,
      s,
      i,
      r
    );
  }
  const F = t.target = ys(
    t.props,
    c
  ), R = Mt(t.props);
  if (F) {
    const L = F._lpa || F.firstChild;
    t.shapeFlag & 16 && (R ? (T(e, t), S(F, L), t.targetAnchor || vs(
      F,
      t,
      a,
      f,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(e) === F ? e : null
    )) : (t.anchor = o(e), S(F, L), t.targetAnchor || vs(F, t, a, f), p(
      L && o(L),
      t,
      F,
      n,
      s,
      i,
      r
    ))), zt(t, R);
  } else R && t.shapeFlag & 16 && (T(e, t), t.targetStart = e, t.targetAnchor = o(e));
  return t.anchor && o(t.anchor);
}
const tl = Qo;
function zt(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let s, i;
    for (t ? (s = e.el, i = e.anchor) : (s = e.targetStart, i = e.targetAnchor); s && s !== i; )
      s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid), s = s.nextSibling;
    n.ut();
  }
}
function vs(e, t, n, s, i = null) {
  const r = t.targetStart = n(""), o = t.targetAnchor = n("");
  return r[wr] = o, e && (s(r, e, i), s(o, e, i)), o;
}
const is = /* @__PURE__ */ Symbol("_leaveCb");
function nl(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== $e) {
        t = n;
        break;
      }
  }
  return t;
}
function Sr(e) {
  if (!Us(e))
    return Un(e.type) && e.children ? nl(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && U(n.default))
      return n.default();
  }
}
function In(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    In(
      Un(n.type) && Sr(n) || n,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === ue && H(e.children)) {
    const n = Fr(e.children, !1);
    n && In(n, t);
  }
}
function bs(e) {
  if (e.component)
    return bs(e.component.subTree);
  if (e.type === ue) {
    const t = H(e.children) && Fr(e.children, !1);
    return t ? bs(t) : void 0;
  }
  if (e.type !== $e)
    return e;
}
// @__NO_SIDE_EFFECTS__
function Cr(e, t) {
  return U(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ye({ name: e.name }, t, { setup: e })
  ) : e;
}
function Tr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function fi(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Rn = /* @__PURE__ */ new WeakMap();
function Zt(e, t, n, s, i = !1) {
  if (H(e)) {
    e.forEach(
      (R, L) => Zt(
        R,
        t && (H(t) ? t[L] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (kt(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Zt(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? Gn(s.component) : s.el, o = i ? null : r, { i: l, r: c } = e, f = t && t.r, a = l.refs === ne ? l.refs = {} : l.refs, p = l.setupState, S = /* @__PURE__ */ X(p), T = p === ne ? Ki : (R) => fi(a, R) ? !1 : Y(S, R), F = (R, L) => !(L && fi(a, L));
  if (f != null && f !== c) {
    if (di(t), le(f))
      a[f] = null, T(f) && (p[f] = null);
    else if (/* @__PURE__ */ _e(f)) {
      const R = t;
      F(f, R.k) && (f.value = null), R.k && (a[R.k] = null);
    }
  }
  if (U(c))
    fn(c, l, 12, [o, a]);
  else {
    const R = le(c), L = /* @__PURE__ */ _e(c);
    if (R || L) {
      const $ = () => {
        if (e.f) {
          const A = R ? T(c) ? p[c] : a[c] : F() || !e.k ? c.value : a[e.k];
          if (i)
            H(A) && Is(A, r);
          else if (H(A))
            A.includes(r) || A.push(r);
          else if (R)
            a[c] = [r], T(c) && (p[c] = a[c]);
          else {
            const V = [r];
            F(c, e.k) && (c.value = V), e.k && (a[e.k] = V);
          }
        } else R ? (a[c] = o, T(c) && (p[c] = o)) : L && (F(c, e.k) && (c.value = o), e.k && (a[e.k] = o));
      };
      if (o) {
        const A = () => {
          $(), Rn.delete(e);
        };
        A.id = -1, Rn.set(e, A), Oe(A, n);
      } else
        di(e), $();
    }
  }
}
function di(e) {
  const t = Rn.get(e);
  t && (t.flags |= 8, Rn.delete(e));
}
Hn().requestIdleCallback;
Hn().cancelIdleCallback;
const kt = (e) => !!e.type.__asyncLoader, Us = (e) => e.type.__isKeepAlive;
function sl(e, t) {
  Or(e, "a", t);
}
function il(e, t) {
  Or(e, "da", t);
}
function Or(e, t, n = Me) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Wn(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Us(i.parent.vnode) && rl(s, t, n, i), i = i.parent;
  }
}
function rl(e, t, n, s) {
  const i = Wn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Mr(() => {
    Is(s[t], i);
  }, n);
}
function Wn(e, t, n = Me, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      Xe();
      const l = dn(n), c = Ve(t, n, e, o);
      return l(), Ze(), c;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const ht = (e) => (t, n = Me) => {
  (!cn || e === "sp") && Wn(e, (...s) => t(...s), n);
}, ol = ht("bm"), Er = ht("m"), ll = ht(
  "bu"
), cl = ht("u"), ul = ht(
  "bum"
), Mr = ht("um"), al = ht(
  "sp"
), fl = ht("rtg"), dl = ht("rtc");
function hl(e, t = Me) {
  Wn("ec", e, t);
}
const pl = /* @__PURE__ */ Symbol.for("v-ndc");
function Ct(e, t, n, s) {
  let i;
  const r = n, o = H(e);
  if (o || le(e)) {
    const l = o && /* @__PURE__ */ bt(e);
    let c = !1, f = !1;
    l && (c = !/* @__PURE__ */ Ne(e), f = /* @__PURE__ */ Qe(e), e = Kn(e)), i = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      i[a] = t(
        c ? f ? xt(Fe(e[a])) : Fe(e[a]) : e[a],
        a,
        void 0,
        r
      );
  } else if (typeof e == "number")
    if (!Number.isInteger(e) || e < 0)
      i = [];
    else {
      i = new Array(e);
      for (let l = 0; l < e; l++)
        i[l] = t(l + 1, l, void 0, r);
    }
  else if (te(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (l, c) => t(l, c, void 0, r)
      );
    else {
      const l = Object.keys(e);
      i = new Array(l.length);
      for (let c = 0, f = l.length; c < f; c++) {
        const a = l[c];
        i[c] = t(e[a], a, c, r);
      }
    }
  else
    i = [];
  return i;
}
function gl(e, t, n, s, i, r) {
  if (n == null && (n = {}), xe.ce || xe.parent && kt(xe.parent) && xe.parent.ce) {
    const f = n, a = Object.keys(f).length > 0;
    return se(), on(
      ue,
      null,
      [Ye("slot", f, s)],
      a ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1);
  const l = at.length;
  se();
  let c;
  try {
    const f = o && Ar(o(n)), a = n.key || r || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    f && f.key;
    c = on(
      ue,
      {
        key: (a && !Le(a) ? a : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!f && s ? "_fb" : "")
      },
      f || (s ? s() : []),
      f && e._ === 1 ? 64 : -2
    );
  } catch (f) {
    for (let a = at.length; a > l; a--) qs();
    throw f;
  } finally {
    o && o._c && (o._d = !0);
  }
  return c;
}
function Ar(e) {
  return e.some((t) => qn(t) ? !(t.type === $e || t.type === ue && !Ar(t.children)) : !0) ? e : null;
}
const xs = (e) => e ? Gr(e) ? Gn(e) : xs(e.parent) : null, Qt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ye(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => xs(e.parent),
    $root: (e) => xs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ir(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Bs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ks.bind(e.proxy)),
    $watch: (e) => Xo.bind(e)
  })
), rs = (e, t) => e !== ne && !e.__isScriptSetup && Y(e, t), ml = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const S = o[t];
      if (S !== void 0)
        switch (S) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (rs(s, t))
          return o[t] = 1, s[t];
        if (i !== ne && Y(i, t))
          return o[t] = 2, i[t];
        if (Y(r, t))
          return o[t] = 3, r[t];
        if (n !== ne && Y(n, t))
          return o[t] = 4, n[t];
        _s && (o[t] = 0);
      }
    }
    const f = Qt[t];
    let a, p;
    if (f)
      return t === "$attrs" && be(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== ne && Y(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, Y(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return rs(i, t) ? (i[t] = n, !0) : s !== ne && Y(s, t) ? (s[t] = n, !0) : Y(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, props: r, type: o }
  }, l) {
    let c;
    return !!(n[l] || e !== ne && l[0] !== "$" && Y(e, l) || rs(t, l) || Y(r, l) || Y(s, l) || Y(Qt, l) || Y(i.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Y(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function hi(e) {
  return H(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let _s = !0;
function yl(e) {
  const t = Ir(e), n = e.proxy, s = e.ctx;
  _s = !1, t.beforeCreate && pi(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: o,
    watch: l,
    provide: c,
    inject: f,
    // lifecycle
    created: a,
    beforeMount: p,
    mounted: S,
    beforeUpdate: T,
    updated: F,
    activated: R,
    deactivated: L,
    beforeDestroy: $,
    beforeUnmount: A,
    destroyed: V,
    unmounted: v,
    render: W,
    renderTracked: de,
    renderTriggered: B,
    errorCaptured: J,
    serverPrefetch: w,
    // public API
    expose: k,
    inheritAttrs: oe,
    // assets
    components: pe,
    directives: et,
    filters: tt
  } = t;
  if (f && vl(f, s, null), o)
    for (const ee in o) {
      const G = o[ee];
      U(G) && (s[ee] = G.bind(n));
    }
  if (i) {
    const ee = i.call(n, n);
    te(ee) && (e.data = /* @__PURE__ */ Ls(ee));
  }
  if (_s = !0, r)
    for (const ee in r) {
      const G = r[ee], He = U(G) ? G.bind(n, n) : U(G.get) ? G.get.bind(n, n) : Ge, Pe = !U(G) && U(G.set) ? G.set.bind(n) : Ge, Ke = Et({
        get: He,
        set: Pe
      });
      Object.defineProperty(s, ee, {
        enumerable: !0,
        configurable: !0,
        get: () => Ke.value,
        set: (Ae) => Ke.value = Ae
      });
    }
  if (l)
    for (const ee in l)
      Pr(l[ee], s, n, ee);
  if (c) {
    const ee = U(c) ? c.call(n) : c;
    Reflect.ownKeys(ee).forEach((G) => {
      qo(G, ee[G]);
    });
  }
  a && pi(a, e, "c");
  function Q(ee, G) {
    H(G) ? G.forEach((He) => ee(He.bind(n))) : G && ee(G.bind(n));
  }
  if (Q(ol, p), Q(Er, S), Q(ll, T), Q(cl, F), Q(sl, R), Q(il, L), Q(hl, J), Q(dl, de), Q(fl, B), Q(ul, A), Q(Mr, v), Q(al, w), H(k))
    if (k.length) {
      const ee = e.exposed || (e.exposed = {});
      k.forEach((G) => {
        Object.defineProperty(ee, G, {
          get: () => n[G],
          set: (He) => n[G] = He,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  W && e.render === Ge && (e.render = W), oe != null && (e.inheritAttrs = oe), pe && (e.components = pe), et && (e.directives = et), w && Tr(e);
}
function vl(e, t, n = Ge) {
  H(e) && (e = ws(e));
  for (const s in e) {
    const i = e[s];
    let r;
    te(i) ? "default" in i ? r = Sn(
      i.from || s,
      i.default,
      !0
    ) : r = Sn(i.from || s) : r = Sn(i), /* @__PURE__ */ _e(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : t[s] = r;
  }
}
function pi(e, t, n) {
  Ve(
    H(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Pr(e, t, n, s) {
  let i = s.includes(".") ? _r(n, s) : () => n[s];
  if (le(e)) {
    const r = t[e];
    U(r) && ss(i, r);
  } else if (U(e))
    ss(i, e.bind(n));
  else if (te(e))
    if (H(e))
      e.forEach((r) => Pr(r, t, n, s));
    else {
      const r = U(e.handler) ? e.handler.bind(n) : t[e.handler];
      U(r) && ss(i, r, e);
    }
}
function Ir(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = r.get(t);
  let c;
  return l ? c = l : !i.length && !n && !s ? c = t : (c = {}, i.length && i.forEach(
    (f) => Nn(c, f, o, !0)
  ), Nn(c, t, o)), te(t) && r.set(t, c), c;
}
function Nn(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && Nn(e, r, n, !0), i && i.forEach(
    (o) => Nn(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = bl[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const bl = {
  data: gi,
  props: mi,
  emits: mi,
  // objects
  methods: Jt,
  computed: Jt,
  // lifecycle
  beforeCreate: Te,
  created: Te,
  beforeMount: Te,
  mounted: Te,
  beforeUpdate: Te,
  updated: Te,
  beforeDestroy: Te,
  beforeUnmount: Te,
  destroyed: Te,
  unmounted: Te,
  activated: Te,
  deactivated: Te,
  errorCaptured: Te,
  serverPrefetch: Te,
  // assets
  components: Jt,
  directives: Jt,
  // watch
  watch: _l,
  // provide / inject
  provide: gi,
  inject: xl
};
function gi(e, t) {
  return t ? e ? function() {
    return ye(
      U(e) ? e.call(this, this) : e,
      U(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function xl(e, t) {
  return Jt(ws(e), ws(t));
}
function ws(e) {
  if (H(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Te(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Jt(e, t) {
  return e ? ye(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function mi(e, t) {
  return e ? H(e) && H(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ye(
    /* @__PURE__ */ Object.create(null),
    hi(e),
    hi(t ?? {})
  ) : t;
}
function _l(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ye(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Te(e[s], t[s]);
  return n;
}
function Rr() {
  return {
    app: null,
    config: {
      isNativeTag: Ki,
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
let wl = 0;
function Sl(e, t) {
  return function(s, i = null) {
    U(s) || (s = ye({}, s)), i != null && !te(i) && (i = null);
    const r = Rr(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const f = r.app = {
      _uid: wl++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: ec,
      get config() {
        return r.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return o.has(a) || (a && U(a.install) ? (o.add(a), a.install(f, ...p)) : U(a) && (o.add(a), a(f, ...p))), f;
      },
      mixin(a) {
        return r.mixins.includes(a) || r.mixins.push(a), f;
      },
      component(a, p) {
        return p ? (r.components[a] = p, f) : r.components[a];
      },
      directive(a, p) {
        return p ? (r.directives[a] = p, f) : r.directives[a];
      },
      mount(a, p, S) {
        if (!c) {
          const T = f._ceVNode || Ye(s, i);
          return T.appContext = r, S === !0 ? S = "svg" : S === !1 && (S = void 0), e(T, a, S), c = !0, f._container = a, a.__vue_app__ = f, Gn(T.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (Ve(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, p) {
        return r.provides[a] = p, f;
      },
      runWithContext(a) {
        const p = Dt;
        Dt = f;
        try {
          return a();
        } finally {
          Dt = p;
        }
      }
    };
    return f;
  };
}
let Dt = null;
const Cl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ke(t)}Modifiers`] || e[`${Nt(t)}Modifiers`];
function Tl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ne;
  let i = n;
  const r = t.startsWith("update:"), o = r && Cl(s, t.slice(7));
  o && (o.trim && (i = n.map((a) => le(a) ? a.trim() : a)), o.number && (i = i.map(Vn)));
  let l, c = s[l = Xn(t)] || // also try camelCase event handler (#2249)
  s[l = Xn(ke(t))];
  !c && r && (c = s[l = Xn(Nt(t))]), c && Ve(
    c,
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
    e.emitted[l] = !0, Ve(
      f,
      e,
      6,
      i
    );
  }
}
const Ol = /* @__PURE__ */ new WeakMap();
function Nr(e, t, n = !1) {
  const s = n ? Ol : t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let o = {}, l = !1;
  if (!U(e)) {
    const c = (f) => {
      const a = Nr(f, t, !0);
      a && (l = !0, ye(o, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !l ? (te(e) && s.set(e, null), null) : (H(r) ? r.forEach((c) => o[c] = null) : ye(o, r), te(e) && s.set(e, o), o);
}
function zn(e, t) {
  return !e || !kn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, Nt(t)) || Y(e, t));
}
function yi(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    propsOptions: [r],
    slots: o,
    attrs: l,
    emit: c,
    render: f,
    renderCache: a,
    props: p,
    data: S,
    setupState: T,
    ctx: F,
    inheritAttrs: R
  } = e, L = Pn(e);
  let $, A;
  try {
    if (n.shapeFlag & 4) {
      const v = i || s, W = v;
      $ = ze(
        f.call(
          W,
          v,
          a,
          p,
          T,
          S,
          F
        )
      ), A = l;
    } else {
      const v = t;
      $ = ze(
        v.length > 1 ? v(
          p,
          { attrs: l, slots: o, emit: c }
        ) : v(
          p,
          null
        )
      ), A = t.props ? l : El(l);
    }
  } catch (v) {
    at.length = 0, Bn(v, e, 1), $ = Ye($e);
  }
  let V = $;
  if (A && R !== !1) {
    const v = Object.keys(A), { shapeFlag: W } = V;
    v.length && W & 7 && (r && v.some(Dn) && (A = Ml(
      A,
      r
    )), V = Vt(V, A, !1, !0));
  }
  if (n.dirs && (V = Vt(V, null, !1, !0), V.dirs = V.dirs ? V.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const v = Un(V.type) && Sr(V) || V;
    In(v, n.transition);
  }
  return $ = V, Pn(L), $;
}
function Fr(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (qn(i)) {
      if (i.type !== $e || i.children === "v-if") {
        if (n)
          return;
        n = i;
      }
    } else
      return;
  }
  return n;
}
const El = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || kn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ml = (e, t) => {
  const n = {};
  for (const s in e)
    (!Dn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Al(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: o, children: l, patchFlag: c } = t, f = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? vi(s, o, f) : !!o;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const S = a[p];
        if ($r(o, s, S) && !zn(f, S))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? vi(s, o, f) : !0 : !!o;
  return !1;
}
function vi(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (!Y(e, r) || $r(t, e, r) && !zn(n, r))
      return !0;
  }
  return !1;
}
function $r(e, t, n) {
  const s = e[n], i = t[n];
  return n === "style" && te(s) && te(i) ? !dt(s, i) : s !== i;
}
function Pl({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = s, e = i), i === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const jr = {}, kr = () => Object.create(jr), Dr = (e) => Object.getPrototypeOf(e) === jr;
function Il(e, t, n, s = !1) {
  const i = {}, r = kr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Lr(e, t, i, r);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? e.props = s ? i : /* @__PURE__ */ Fo(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Rl(e, t, n, s) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ X(i), [c] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let S = a[p];
        if (zn(e.emitsOptions, S))
          continue;
        const T = t[S];
        if (c)
          if (Y(r, S))
            T !== r[S] && (r[S] = T, f = !0);
          else {
            const F = ke(S);
            i[F] = Ss(
              c,
              l,
              F,
              T,
              e,
              !1
            );
          }
        else
          T !== r[S] && (r[S] = T, f = !0);
      }
    }
  } else {
    Lr(e, t, i, r) && (f = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !Y(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Nt(p)) === p || !Y(t, a))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[a] !== void 0) && (i[p] = Ss(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete i[p]);
    if (r !== l)
      for (const p in r)
        (!t || !Y(t, p)) && (delete r[p], f = !0);
  }
  f && ct(e.attrs, "set", "");
}
function Lr(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (Gt(c))
        continue;
      const f = t[c];
      let a;
      i && Y(i, a = ke(c)) ? !r || !r.includes(a) ? n[a] = f : (l || (l = {}))[a] = f : zn(e.emitsOptions, c) || (!(c in s) || f !== s[c]) && (s[c] = f, o = !0);
    }
  if (r) {
    const c = /* @__PURE__ */ X(n), f = l || ne;
    for (let a = 0; a < r.length; a++) {
      const p = r[a];
      n[p] = Ss(
        i,
        c,
        p,
        f[p],
        e,
        !Y(f, p)
      );
    }
  }
  return o;
}
function Ss(e, t, n, s, i, r) {
  const o = e[n];
  if (o != null) {
    const l = Y(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && U(c)) {
        const { propsDefaults: f } = i;
        if (n in f)
          s = f[n];
        else {
          const a = dn(i);
          s = f[n] = c.call(
            null,
            t
          ), a();
        }
      } else
        s = c;
      i.ce && i.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (r && !l ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Nt(n)) && (s = !0));
  }
  return s;
}
const Nl = /* @__PURE__ */ new WeakMap();
function Vr(e, t, n = !1) {
  const s = n ? Nl : t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, o = {}, l = [];
  let c = !1;
  if (!U(e)) {
    const a = (p) => {
      c = !0;
      const [S, T] = Vr(p, t, !0);
      ye(o, S), T && l.push(...T);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!r && !c)
    return te(e) && s.set(e, At), At;
  if (H(r))
    for (let a = 0; a < r.length; a++) {
      const p = ke(r[a]);
      bi(p) && (o[p] = ne);
    }
  else if (r)
    for (const a in r) {
      const p = ke(a);
      if (bi(p)) {
        const S = r[a], T = o[p] = H(S) || U(S) ? { type: S } : ye({}, S), F = T.type;
        let R = !1, L = !0;
        if (H(F))
          for (let $ = 0; $ < F.length; ++$) {
            const A = F[$], V = U(A) && A.name;
            if (V === "Boolean") {
              R = !0;
              break;
            } else V === "String" && (L = !1);
          }
        else
          R = U(F) && F.name === "Boolean";
        T[
          0
          /* shouldCast */
        ] = R, T[
          1
          /* shouldCastTrue */
        ] = L, (R || Y(T, "default")) && l.push(p);
      }
    }
  const f = [o, l];
  return te(e) && s.set(e, f), f;
}
function bi(e) {
  return e[0] !== "$" && !Gt(e);
}
const Ws = (e) => e === "_" || e === "_ctx" || e === "$stable", zs = (e) => H(e) ? e.map(ze) : [ze(e)], Fl = (e, t, n) => {
  if (t._n)
    return t;
  const s = br((...i) => zs(t(...i)), n);
  return s._c = !1, s;
}, Hr = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (Ws(i)) continue;
    const r = e[i];
    if (U(r))
      t[i] = Fl(i, r, s);
    else if (r != null) {
      const o = zs(r);
      t[i] = () => o;
    }
  }
}, Kr = (e, t) => {
  const n = zs(t);
  e.slots.default = () => n;
}, Br = (e, t, n) => {
  for (const s in t)
    (n || !Ws(s)) && (e[s] = t[s]);
}, $l = (e, t, n) => {
  const s = e.slots = kr();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (Br(s, t, n), n && Ji(s, "_", i, !0)) : Hr(t, s);
  } else t && Kr(e, t);
}, jl = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, o = ne;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? r = !1 : Br(i, t, n) : (r = !t.$stable, Hr(t, i)), o = t;
  } else t && (Kr(e, t), o = { default: 1 });
  if (r)
    for (const l in i)
      !Ws(l) && o[l] == null && delete i[l];
}, Oe = Hl;
function kl(e) {
  return Dl(e);
}
function Dl(e, t) {
  const n = Hn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: r,
    createElement: o,
    createText: l,
    createComment: c,
    setText: f,
    setElementText: a,
    parentNode: p,
    nextSibling: S,
    setScopeId: T = Ge,
    insertStaticContent: F
  } = e, R = (u, d, y, C = null, b = null, _ = null, O = void 0, M = null, E = !!d.dynamicChildren) => {
    if (u === d)
      return;
    u && !Wt(u, d) && (C = wt(u), Ae(u, b, _, !0), u = null), d.patchFlag === -2 && (E = !1, d.dynamicChildren = null), d.dynamicChildren && u && u.dynamicChildren && u.dynamicChildren.hasOnce && (d.dynamicChildren === At && (d.dynamicChildren = []), d.dynamicChildren.hasOnce = !0);
    const { type: x, ref: j, shapeFlag: P } = d;
    switch (x) {
      case Jn:
        L(u, d, y, C);
        break;
      case $e:
        $(u, d, y, C);
        break;
      case ls:
        u == null && A(d, y, C, O);
        break;
      case ue:
        pe(
          u,
          d,
          y,
          C,
          b,
          _,
          O,
          M,
          E
        );
        break;
      default:
        P & 1 ? W(
          u,
          d,
          y,
          C,
          b,
          _,
          O,
          M,
          E
        ) : P & 6 ? et(
          u,
          d,
          y,
          C,
          b,
          _,
          O,
          M,
          E
        ) : (P & 64 || P & 128) && x.process(
          u,
          d,
          y,
          C,
          b,
          _,
          O,
          M,
          E,
          nt
        );
    }
    j != null && b ? Zt(j, u && u.ref, _, d || u, !d) : j == null && u && u.ref != null && Zt(u.ref, null, _, u, !0);
  }, L = (u, d, y, C) => {
    if (u == null)
      s(
        d.el = l(d.children),
        y,
        C
      );
    else {
      const b = d.el = u.el;
      d.children !== u.children && f(b, d.children);
    }
  }, $ = (u, d, y, C) => {
    u == null ? s(
      d.el = c(d.children || ""),
      y,
      C
    ) : d.el = u.el;
  }, A = (u, d, y, C) => {
    [u.el, u.anchor] = F(
      u.children,
      d,
      y,
      C,
      u.el,
      u.anchor
    );
  }, V = ({ el: u, anchor: d }, y, C) => {
    let b;
    for (; u && u !== d; )
      b = S(u), s(u, y, C), u = b;
    s(d, y, C);
  }, v = ({ el: u, anchor: d }) => {
    let y;
    for (; u && u !== d; )
      y = S(u), i(u), u = y;
    i(d);
  }, W = (u, d, y, C, b, _, O, M, E) => {
    if (d.type === "svg" ? O = "svg" : d.type === "math" && (O = "mathml"), u == null)
      de(
        d,
        y,
        C,
        b,
        _,
        O,
        M,
        E
      );
    else {
      const x = u.el && u.el._isVueCE ? u.el : null;
      try {
        x && x._beginPatch(), w(
          u,
          d,
          b,
          _,
          O,
          M,
          E
        );
      } finally {
        x && x._endPatch();
      }
    }
  }, de = (u, d, y, C, b, _, O, M) => {
    let E, x;
    const { props: j, shapeFlag: P, transition: D, dirs: K } = u;
    if (E = u.el = o(
      u.type,
      _,
      j && j.is,
      j
    ), P & 8 ? a(E, u.children) : P & 16 && J(
      u.children,
      E,
      null,
      C,
      b,
      os(u, _),
      O,
      M
    ), K && St(u, null, C, "created"), B(E, u, u.scopeId, O, C), j) {
      for (const Z in j)
        Z !== "value" && !Gt(Z) && r(E, Z, null, j[Z], _, C);
      "value" in j && r(E, "value", null, j.value, _), (x = j.onVnodeBeforeMount) && Be(x, C, u);
    }
    K && St(u, null, C, "beforeMount");
    const q = Ll(b, D);
    q && D.beforeEnter(E), s(E, d, y), ((x = j && j.onVnodeMounted) || q || K) && Oe(() => {
      x && Be(x, C, u), q && D.enter(E), K && St(u, null, C, "mounted");
    }, b);
  }, B = (u, d, y, C, b) => {
    if (y && T(u, y), C)
      for (let _ = 0; _ < C.length; _++)
        T(u, C[_]);
    if (b) {
      let _ = b.subTree;
      if (d === _ || Wr(_.type) && (_.ssContent === d || _.ssFallback === d)) {
        const O = b.vnode;
        B(
          u,
          O,
          O.scopeId,
          O.slotScopeIds,
          b.parent
        );
      }
    }
  }, J = (u, d, y, C, b, _, O, M, E = 0) => {
    for (let x = E; x < u.length; x++) {
      const j = u[x] = M ? ot(u[x]) : ze(u[x]);
      R(
        null,
        j,
        d,
        y,
        C,
        b,
        _,
        O,
        M
      );
    }
  }, w = (u, d, y, C, b, _, O) => {
    const M = d.el = u.el;
    let { patchFlag: E, dynamicChildren: x, dirs: j } = d;
    E |= u.patchFlag & 16;
    const P = u.props || ne, D = d.props || ne;
    let K;
    if (y && Tt(y, !1), (K = D.onVnodeBeforeUpdate) && Be(K, y, d, u), j && St(d, u, y, "beforeUpdate"), y && Tt(y, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!u.dynamicChildren || u.dynamicChildren.length !== x.length) && (E = 0, O = !1, x = null), (P.innerHTML && D.innerHTML == null || P.textContent && D.textContent == null) && a(M, ""), x ? k(
      u.dynamicChildren,
      x,
      M,
      y,
      C,
      os(d, b),
      _
    ) : O || G(
      u,
      d,
      M,
      null,
      y,
      C,
      os(d, b),
      _,
      !1
    ), E > 0) {
      if (E & 16)
        oe(M, P, D, y, b);
      else if (E & 2 && P.class !== D.class && r(M, "class", null, D.class, b), E & 4 && r(M, "style", P.style, D.style, b), E & 8) {
        const q = d.dynamicProps;
        for (let Z = 0; Z < q.length; Z++) {
          const g = q[Z], h = P[g], m = D[g];
          (m !== h || g === "value") && r(M, g, h, m, b, y);
        }
      }
      E & 1 && u.children !== d.children && a(M, d.children);
    } else !O && x == null && oe(M, P, D, y, b);
    ((K = D.onVnodeUpdated) || j) && Oe(() => {
      K && Be(K, y, d, u), j && St(d, u, y, "updated");
    }, C);
  }, k = (u, d, y, C, b, _, O) => {
    for (let M = 0; M < d.length; M++) {
      const E = u[M], x = d[M], j = E.el || Cs(E), P = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        j && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === ue || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wt(E, x) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 198) ? p(j) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      R(
        E,
        x,
        P,
        null,
        C,
        b,
        _,
        O,
        !0
      );
    }
  }, oe = (u, d, y, C, b) => {
    if (d !== y) {
      if (d !== ne)
        for (const _ in d)
          !Gt(_) && !(_ in y) && r(
            u,
            _,
            d[_],
            null,
            b,
            C
          );
      for (const _ in y) {
        if (Gt(_)) continue;
        const O = y[_], M = d[_];
        O !== M && _ !== "value" && r(u, _, M, O, b, C);
      }
      "value" in y && r(u, "value", d.value, y.value, b);
    }
  }, pe = (u, d, y, C, b, _, O, M, E) => {
    const x = d.el = u ? u.el : l(""), j = d.anchor = u ? u.anchor : l("");
    let { patchFlag: P, dynamicChildren: D, slotScopeIds: K } = d;
    K && (M = M ? M.concat(K) : K), u == null ? (s(x, y, C), s(j, y, C), J(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      y,
      j,
      b,
      _,
      O,
      M,
      E
    )) : P > 0 && P & 64 && D && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === D.length ? (k(
      u.dynamicChildren,
      D,
      y,
      b,
      _,
      O,
      M
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || b && d === b.subTree) && Js(
      u,
      d,
      !0
      /* shallow */
    )) : G(
      u,
      d,
      y,
      j,
      b,
      _,
      O,
      M,
      E
    );
  }, et = (u, d, y, C, b, _, O, M, E) => {
    d.slotScopeIds = M, u == null ? d.shapeFlag & 512 ? b.ctx.activate(
      d,
      y,
      C,
      O,
      E
    ) : tt(
      d,
      y,
      C,
      b,
      _,
      O,
      E
    ) : hn(u, d, E);
  }, tt = (u, d, y, C, b, _, O) => {
    const M = u.component = Jl(
      u,
      C,
      b
    );
    if (Us(u) && (M.ctx.renderer = nt), Gl(M, !1, O), M.asyncDep) {
      if (b && b.registerDep(
        M,
        Q,
        O,
        _
      ), !u.el) {
        const E = M.subTree = Ye($e);
        $(null, E, d, y), u.placeholder = E.el;
      }
    } else
      Q(
        M,
        u,
        d,
        y,
        b,
        _,
        O
      );
  }, hn = (u, d, y) => {
    const C = d.component = u.component;
    if (Al(u, d, y))
      if (C.asyncDep && !C.asyncResolved) {
        d.el = u.el, d.placeholder = u.placeholder, ee(C, d, y);
        return;
      } else
        C.next = d, C.update();
    else
      d.el = u.el, d.placeholder = u.placeholder, C.vnode = d;
  }, Q = (u, d, y, C, b, _, O) => {
    const M = () => {
      if (u.isMounted) {
        let { next: P, bu: D, u: K, parent: q, vnode: Z } = u;
        {
          const z = Ur(u);
          if (z) {
            P && (P.el = Z.el, ee(u, P, O)), z.asyncDep.then(() => {
              Oe(() => {
                u.isUnmounted || x();
              }, b);
            });
            return;
          }
        }
        let g = P, h;
        Tt(u, !1), P ? (P.el = Z.el, ee(u, P, O)) : P = Z, D && wn(D), (h = P.props && P.props.onVnodeBeforeUpdate) && Be(h, q, P, Z), Tt(u, !0);
        const m = yi(u), N = u.subTree;
        u.subTree = m, R(
          N,
          m,
          // parent may have changed if it's in a teleport
          p(N.el),
          // anchor may have changed if it's in a fragment
          wt(N),
          u,
          b,
          _
        ), P.el = m.el, g === null && Pl(u, m.el), K && Oe(K, b), (h = P.props && P.props.onVnodeUpdated) && Oe(
          () => Be(h, q, P, Z),
          b
        );
      } else {
        let P;
        const { el: D, props: K } = d, { bm: q, m: Z, parent: g, root: h, type: m } = u, N = kt(d);
        Tt(u, !1), q && wn(q), !N && (P = K && K.onVnodeBeforeMount) && Be(P, g, d), Tt(u, !0);
        {
          h.ce && h.ce._hasShadowRoot() && h.ce._injectChildStyle(
            m,
            u.parent ? u.parent.type : void 0
          );
          const z = u.subTree = yi(u);
          R(
            null,
            z,
            y,
            C,
            u,
            b,
            _
          ), d.el = z.el;
        }
        if (Z && Oe(Z, b), !N && (P = K && K.onVnodeMounted)) {
          const z = d;
          Oe(
            () => Be(P, g, z),
            b
          );
        }
        (d.shapeFlag & 256 || g && kt(g.vnode) && g.vnode.shapeFlag & 256) && u.a && Oe(u.a, b), u.isMounted = !0, d = y = C = null;
      }
    };
    u.scope.on();
    const E = u.effect = new Xi(M);
    u.scope.off();
    const x = u.update = E.run.bind(E), j = u.job = E.runIfDirty.bind(E);
    j.i = u, j.id = u.uid, E.scheduler = () => Bs(j), Tt(u, !0), x();
  }, ee = (u, d, y) => {
    d.component = u;
    const C = u.vnode.props;
    u.vnode = d, u.next = null, Rl(u, d.props, C, y), jl(u, d.children, y), Xe(), gr(u), Ze();
  }, G = (u, d, y, C, b, _, O, M, E = !1) => {
    const x = u && u.children, j = u ? u.shapeFlag : 0, P = d.children, { patchFlag: D, shapeFlag: K } = d;
    if (D > 0) {
      if (D & 128) {
        Pe(
          x,
          P,
          y,
          C,
          b,
          _,
          O,
          M,
          E
        );
        return;
      } else if (D & 256) {
        He(
          x,
          P,
          y,
          C,
          b,
          _,
          O,
          M,
          E
        );
        return;
      }
    }
    K & 8 ? (j & 16 && pt(x, b, _), P !== x && a(y, P)) : j & 16 ? K & 16 ? Pe(
      x,
      P,
      y,
      C,
      b,
      _,
      O,
      M,
      E
    ) : pt(x, b, _, !0) : (j & 8 && a(y, ""), K & 16 && J(
      P,
      y,
      C,
      b,
      _,
      O,
      M,
      E
    ));
  }, He = (u, d, y, C, b, _, O, M, E) => {
    u = u || At, d = d || At;
    const x = u.length, j = d.length, P = Math.min(x, j);
    let D;
    for (D = 0; D < P; D++) {
      const K = d[D] = E ? ot(d[D]) : ze(d[D]);
      R(
        u[D],
        K,
        y,
        null,
        b,
        _,
        O,
        M,
        E
      );
    }
    x > j ? pt(
      u,
      b,
      _,
      !0,
      !1,
      P
    ) : J(
      d,
      y,
      C,
      b,
      _,
      O,
      M,
      E,
      P
    );
  }, Pe = (u, d, y, C, b, _, O, M, E) => {
    let x = 0;
    const j = d.length;
    let P = u.length - 1, D = j - 1;
    for (; x <= P && x <= D; ) {
      const K = u[x], q = d[x] = E ? ot(d[x]) : ze(d[x]);
      if (Wt(K, q))
        R(
          K,
          q,
          y,
          null,
          b,
          _,
          O,
          M,
          E
        );
      else
        break;
      x++;
    }
    for (; x <= P && x <= D; ) {
      const K = u[P], q = d[D] = E ? ot(d[D]) : ze(d[D]);
      if (Wt(K, q))
        R(
          K,
          q,
          y,
          null,
          b,
          _,
          O,
          M,
          E
        );
      else
        break;
      P--, D--;
    }
    if (x > P) {
      if (x <= D) {
        const K = D + 1, q = K < j ? d[K].el : C;
        for (; x <= D; )
          R(
            null,
            d[x] = E ? ot(d[x]) : ze(d[x]),
            y,
            q,
            b,
            _,
            O,
            M,
            E
          ), x++;
      }
    } else if (x > D)
      for (; x <= P; )
        Ae(u[x], b, _, !0), x++;
    else {
      const K = x, q = x, Z = /* @__PURE__ */ new Map();
      for (x = q; x <= D; x++) {
        const we = d[x] = E ? ot(d[x]) : ze(d[x]);
        we.key != null && Z.set(we.key, x);
      }
      let g, h = 0;
      const m = D - q + 1;
      let N = !1, z = 0;
      const he = new Array(m);
      for (x = 0; x < m; x++) he[x] = 0;
      for (x = K; x <= P; x++) {
        const we = u[x];
        if (h >= m) {
          Ae(we, b, _, !0);
          continue;
        }
        let Se;
        if (we.key != null)
          Se = Z.get(we.key);
        else
          for (g = q; g <= D; g++)
            if (he[g - q] === 0 && Wt(we, d[g])) {
              Se = g;
              break;
            }
        Se === void 0 ? Ae(we, b, _, !0) : (he[Se - q] = x + 1, Se >= z ? z = Se : N = !0, R(
          we,
          d[Se],
          y,
          null,
          b,
          _,
          O,
          M,
          E
        ), h++);
      }
      const re = N ? Vl(he) : At;
      for (g = re.length - 1, x = m - 1; x >= 0; x--) {
        const we = q + x, Se = d[we], st = d[we + 1], Ft = we + 1 < j ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          st.el || Cs(st)
        ) : C;
        he[x] === 0 ? R(
          null,
          Se,
          y,
          Ft,
          b,
          _,
          O,
          M,
          E
        ) : N && (g < 0 || x !== re[g] ? Ke(Se, y, Ft, 2) : g--);
      }
    }
  }, Ke = (u, d, y, C, b = null) => {
    const { el: _, type: O, transition: M, children: E, shapeFlag: x } = u;
    if (x & 6) {
      Ke(u.component.subTree, d, y, C);
      return;
    }
    if (x & 128) {
      u.suspense.move(d, y, C);
      return;
    }
    if (x & 64) {
      O.move(u, d, y, nt);
      return;
    }
    if (O === ue) {
      s(_, d, y);
      for (let P = 0; P < E.length; P++)
        Ke(E[P], d, y, C);
      s(u.anchor, d, y);
      return;
    }
    if (O === ls) {
      V(u, d, y);
      return;
    }
    if (C !== 2 && x & 1 && M)
      if (C === 0)
        M.persisted && !_[is] ? s(_, d, y) : (M.beforeEnter(_), s(_, d, y), Oe(() => M.enter(_), b));
      else {
        const { leave: P, delayLeave: D, afterLeave: K } = M, q = () => {
          u.ctx.isUnmounted ? i(_) : s(_, d, y);
        }, Z = () => {
          const g = _._isLeaving || !!_[is];
          _._isLeaving && _[is](
            !0
            /* cancelled */
          ), M.persisted && !g ? q() : P(_, () => {
            q(), K && K();
          });
        };
        D ? D(_, q, Z) : Z();
      }
    else
      s(_, d, y);
  }, Ae = (u, d, y, C = !1, b = !1) => {
    const {
      type: _,
      props: O,
      ref: M,
      children: E,
      dynamicChildren: x,
      shapeFlag: j,
      patchFlag: P,
      dirs: D,
      cacheIndex: K,
      memo: q
    } = u;
    if ((P === -2 || x && x.hasOnce) && (b = !1), M != null && (Xe(), Zt(M, null, y, u, !0), Ze()), K != null && (!u.ctx || u.ctx === d) && (d.renderCache[K] = void 0), j & 256) {
      d.ctx.deactivate(u);
      return;
    }
    const Z = j & 1 && D, g = !kt(u);
    let h;
    if (g && (h = O && O.onVnodeBeforeUnmount) && Be(h, d, u), j & 6)
      pn(u.component, y, C);
    else {
      if (j & 128) {
        u.suspense.unmount(y, C);
        return;
      }
      Z && St(u, null, d, "beforeUnmount"), j & 64 ? u.type.remove(
        u,
        d,
        y,
        nt,
        C
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== ue || P > 0 && P & 64) ? pt(
        x,
        d,
        y,
        !1,
        !0
      ) : (_ === ue && P & 384 || !b && j & 16) && pt(E, d, y), C && ve(u);
    }
    const m = q != null && K == null;
    (g && (h = O && O.onVnodeUnmounted) || Z || m) && Oe(() => {
      h && Be(h, d, u), Z && St(u, null, d, "unmounted"), m && (u.el = null);
    }, y);
  }, ve = (u) => {
    const { type: d, el: y, anchor: C, transition: b } = u, _ = d === ue;
    if (_ && !b) {
      _t(y, C);
      return;
    }
    if (d === ls) {
      v(u), b && !b.persisted && b.afterLeave && b.afterLeave();
      return;
    }
    const O = _ ? bs(u) : u, M = () => {
      _ ? p(y) && _t(y, C) : i(y), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (O && O.shapeFlag & 1 && b && !b.persisted) {
      const { leave: E, delayLeave: x } = b, j = O.el, P = () => E(j, M);
      x ? x(j, M, P) : P();
    } else
      M();
  }, _t = (u, d) => {
    let y;
    for (; u !== d; )
      y = S(u), i(u), u = y;
    i(d);
  }, pn = (u, d, y) => {
    const { bum: C, scope: b, job: _, subTree: O, um: M, m: E, a: x } = u;
    xi(E), xi(x), C && wn(C), b.stop(), _ ? (_.flags |= 8, Ae(O, u, d, y)) : u.vnode.el && O && (O.transition = u.vnode.transition, Ae(O, u, d, y)), M && Oe(M, d), Oe(() => {
      u.isUnmounted = !0;
    }, d);
  }, pt = (u, d, y, C = !1, b = !1, _ = 0) => {
    for (let O = _; O < u.length; O++)
      Ae(u[O], d, y, C, b);
  }, wt = (u) => {
    if (u.shapeFlag & 6)
      return wt(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const d = S(u.anchor || u.el), y = d && d[wr];
    return y ? S(y) : d;
  }, Kt = (u, d, y) => {
    const C = u && d._vnode ? void 0 : u && u.component ? u.component.uid : zl();
    Jo(() => {
      u == null ? d._vnode && Ae(d._vnode, null, null, !0) : R(
        d._vnode || null,
        u,
        d,
        null,
        null,
        null,
        y
      ), d._vnode = u;
    }, C);
  }, nt = {
    p: R,
    um: Ae,
    m: Ke,
    r: ve,
    mt: tt,
    mc: J,
    pc: G,
    pbc: k,
    n: wt,
    o: e
  };
  return {
    render: Kt,
    hydrate: void 0,
    createApp: Sl(Kt)
  };
}
function os({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Tt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ll(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Js(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (H(s) && H(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = ot(i[r]), l.el = o.el), !n && l.patchFlag !== -2 && Js(o, l)), l.type === Jn && (l.patchFlag === -1 && (l = i[r] = ot(l)), l.el = o.el), l.type === $e && !l.el && (l.el = o.el);
    }
}
function Vl(e) {
  const t = e.slice(), n = [0];
  let s, i, r, o, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const f = e[s];
    if (f !== 0) {
      if (i = n[n.length - 1], e[i] < f) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        l = r + o >> 1, e[n[l]] < f ? r = l + 1 : o = l;
      f < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
function Ur(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ur(t);
}
function xi(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Cs(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Cs(t.subTree) : null;
}
const Wr = (e) => e.__isSuspense;
function Hl(e, t) {
  t && t.pendingBranch ? H(e) ? t.effects.push(...e) : t.effects.push(e) : zo(e);
}
const ue = /* @__PURE__ */ Symbol.for("v-fgt"), Jn = /* @__PURE__ */ Symbol.for("v-txt"), $e = /* @__PURE__ */ Symbol.for("v-cmt"), ls = /* @__PURE__ */ Symbol.for("v-stc"), at = [];
let Re = null;
function se(e = !1) {
  at.push(Re = e ? null : []);
}
function qs() {
  at.pop(), Re = at[at.length - 1] || null;
}
let rn = 1;
function _i(e, t = !1) {
  rn += e, e < 0 && Re && t && (Re.hasOnce = !0);
}
function zr(e) {
  return e.dynamicChildren = rn > 0 ? Re || At : null, qs(), rn > 0 && Re && Re.push(e), e;
}
function ae(e, t, n, s, i, r) {
  return zr(
    I(
      e,
      t,
      n,
      s,
      i,
      r,
      !0
    )
  );
}
function on(e, t, n, s, i) {
  return zr(
    Ye(
      e,
      t,
      n,
      s,
      i,
      !0
    )
  );
}
function qn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Wt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Jr = ({ key: e }) => e ?? null, Cn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? le(e) || /* @__PURE__ */ _e(e) || U(e) ? { i: xe, r: e, k: t, f: !!n } : e : null);
function I(e, t = null, n = null, s = 0, i = null, r = e === ue ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Jr(t),
    ref: t && Cn(t),
    scopeId: vr,
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
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: xe
  };
  return l ? (Fn(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= le(n) ? 8 : 16), rn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Re && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Re.push(c), c;
}
const Ye = Kl;
function Kl(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === pl) && (e = $e), qn(e)) {
    const l = Vt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Fn(l, n), rn > 0 && !r && Re && (l.shapeFlag & 6 ? Re[Re.indexOf(e)] = l : Re.push(l)), l.patchFlag = -2, l;
  }
  if (Ql(e) && (e = e.__vccOpts), t) {
    t = Bl(t);
    let { class: l, style: c } = t;
    l && !le(l) && (t.class = Pt(l)), te(c) && (/* @__PURE__ */ Hs(c) && !H(c) && (c = ye({}, c)), t.style = en(c));
  }
  const o = le(e) ? 1 : Wr(e) ? 128 : Un(e) ? 64 : te(e) ? 4 : U(e) ? 2 : 0;
  return I(
    e,
    t,
    n,
    s,
    i,
    o,
    r,
    !0
  );
}
function Bl(e) {
  return e ? /* @__PURE__ */ Hs(e) || Dr(e) ? ye({}, e) : e : null;
}
function Vt(e, t, n = !1, s = !1) {
  const { props: i, ref: r, patchFlag: o, children: l, transition: c } = e, f = t ? Ul(i || {}, t) : i, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Jr(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? H(r) ? r.concat(Cn(t)) : [r, Cn(t)] : Cn(t)
    ) : r,
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
    patchFlag: t && e.type !== ue ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Vt(e.ssContent),
    ssFallback: e.ssFallback && Vt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return c && s && In(
    a,
    c.clone(a)
  ), a;
}
function Ie(e = " ", t = 0) {
  return Ye(Jn, null, e, t);
}
function Tn(e = "", t = !1) {
  return t ? (se(), on($e, null, e)) : Ye($e, null, e);
}
function ze(e) {
  return e == null || typeof e == "boolean" ? Ye($e) : H(e) ? Ye(
    ue,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : qn(e) ? ot(e) : Ye(Jn, null, String(e));
}
function ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Vt(e);
}
function Fn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (H(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Fn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !Dr(t) ? t._ctx = xe : i === 3 && xe && (xe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (U(t)) {
    if (s & 65) {
      Fn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: xe }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [Ie(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Ul(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Pt([t.class, s.class]));
      else if (i === "style")
        t.style = en([t.style, s.style]);
      else if (kn(i)) {
        const r = t[i], o = s[i];
        o && r !== o && !(H(r) && r.includes(o)) ? t[i] = r ? [].concat(r, o) : o : o == null && r == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Dn(i) && (t[i] = o);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function Be(e, t, n, s = null) {
  Ve(e, t, 7, [
    n,
    s
  ]);
}
const Wl = Rr();
let qr = 0;
function zl() {
  return qr;
}
function Jl(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || Wl, r = {
    uid: qr++,
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
    scope: new mo(
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
    propsOptions: Vr(s, i),
    emitsOptions: Nr(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ne,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ne,
    data: ne,
    props: ne,
    attrs: ne,
    slots: ne,
    refs: ne,
    setupState: ne,
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
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Tl.bind(null, r), e.ce && e.ce(r), r;
}
let Me = null;
const ql = () => Me || xe;
let $n, ln;
{
  const e = Hn(), t = (n, s) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(s), (r) => {
      i.length > 1 ? i.forEach((o) => o(r)) : i[0](r);
    };
  };
  $n = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Me = n
  ), ln = t(
    "__VUE_SSR_SETTERS__",
    (n) => cn = n
  );
}
const dn = (e) => {
  const t = Me;
  return $n(e), e.scope.on(), () => {
    e.scope.off(), $n(t);
  };
}, wi = () => {
  Me && Me.scope.off(), $n(null);
};
function Gr(e) {
  return e.vnode.shapeFlag & 4;
}
let cn = !1;
function Gl(e, t = !1, n = !1) {
  t && ln(t);
  const { props: s, children: i } = e.vnode, r = Gr(e);
  Il(e, s, r, t), $l(e, i, n || t);
  const o = r ? Yl(e, t) : void 0;
  return t && ln(!1), o;
}
function Yl(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ml);
  const { setup: s } = n;
  if (s) {
    Xe();
    const i = e.setupContext = s.length > 1 ? Zl(e) : null, r = dn(e), o = fn(
      s,
      e,
      0,
      [
        e.props,
        i
      ]
    ), l = Bi(o);
    if (Ze(), r(), (l || e.sp) && !kt(e) && Tr(e), l) {
      if (o.then(wi, wi), t)
        return o.then((c) => {
          ln(!0);
          try {
            Si(e, c, t);
          } finally {
            ln(!1);
          }
        }).catch((c) => {
          Bn(c, e, 0);
        });
      e.asyncDep = o;
    } else
      Si(e, o);
  } else
    Yr(e);
}
function Si(e, t, n) {
  U(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : te(t) && (e.setupState = dr(t)), Yr(e);
}
function Yr(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Ge);
  {
    const i = dn(e);
    Xe();
    try {
      yl(e);
    } finally {
      Ze(), i();
    }
  }
}
const Xl = {
  get(e, t) {
    return be(e, "get", ""), e[t];
  }
};
function Zl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Xl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Gn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(dr($o(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Qt)
        return Qt[n](e);
    },
    has(t, n) {
      return n in t || n in Qt;
    }
  })) : e.proxy;
}
function Ql(e) {
  return U(e) && "__vccOpts" in e;
}
const Et = (e, t) => /* @__PURE__ */ Ho(e, t, cn), ec = "3.5.44";
let Ts;
const Ci = typeof window < "u" && window.trustedTypes;
if (Ci)
  try {
    Ts = /* @__PURE__ */ Ci.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Xr = Ts ? (e) => Ts.createHTML(e) : (e) => e, tc = "http://www.w3.org/2000/svg", nc = "http://www.w3.org/1998/Math/MathML", rt = typeof document < "u" ? document : null, Ti = rt && /* @__PURE__ */ rt.createElement("template"), sc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? rt.createElementNS(tc, e) : t === "mathml" ? rt.createElementNS(nc, e) : n ? rt.createElement(e, { is: n }) : rt.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => rt.createTextNode(e),
  createComment: (e) => rt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => rt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, r) {
    const o = n ? n.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      Ti.innerHTML = Xr(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ti.content;
      if (s === "svg" || s === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, ic = /* @__PURE__ */ Symbol("_vtc");
function rc(e, t, n) {
  const s = e[ic];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Oi = /* @__PURE__ */ Symbol("_vod"), oc = /* @__PURE__ */ Symbol("_vsh"), lc = /* @__PURE__ */ Symbol(""), cc = /(?:^|;)\s*display\s*:/;
function uc(e, t, n) {
  const s = e.style, i = le(n);
  let r = !1;
  if (n && !i) {
    if (t)
      if (le(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && qt(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && qt(s, o, "");
    for (const o in n) {
      o === "display" && (r = !0);
      const l = n[o];
      l != null ? fc(
        e,
        o,
        !le(t) && t ? t[o] : void 0,
        l
      ) || qt(s, o, l) : qt(s, o, "");
    }
  } else if (i) {
    if (t !== n) {
      const o = s[lc];
      o && (n += ";" + o), s.cssText = n, r = cc.test(n);
    }
  } else t && e.removeAttribute("style");
  Oi in e && ((!i || t !== n) && (e[Oi] = r ? s.display : ""), e[oc] && (s.display = "none"));
}
const bn = /\s*!important$/;
function qt(e, t, n) {
  if (H(n))
    n.forEach((s) => qt(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    bn.test(n) ? e.setProperty(t, n.replace(bn, ""), "important") : e.setProperty(t, n);
  else {
    const s = ac(e, t);
    bn.test(n) ? e.setProperty(
      Nt(s),
      n.replace(bn, ""),
      "important"
    ) : e[s] = n;
  }
}
const Ei = ["Webkit", "Moz", "ms"], cs = {};
function ac(e, t) {
  const n = cs[t];
  if (n)
    return n;
  let s = ke(t);
  if (s !== "filter" && s in e)
    return cs[t] = s;
  s = zi(s);
  for (let i = 0; i < Ei.length; i++) {
    const r = Ei[i] + s;
    if (r in e)
      return cs[t] = r;
  }
  return t;
}
function fc(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && le(s) && n === s;
}
const Mi = "http://www.w3.org/1999/xlink";
function Ai(e, t, n, s, i, r = ho(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Mi, t.slice(6, t.length)) : e.setAttributeNS(Mi, t, n) : n == null || r && !qi(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Le(n) ? String(n) : n
  );
}
function Pi(e, t, n, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Xr(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = qi(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(i || t);
}
function yt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function dc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Ii = /* @__PURE__ */ Symbol("_vei");
function hc(e, t, n, s, i = null) {
  const r = e[Ii] || (e[Ii] = {}), o = r[t];
  if (s && o)
    o.value = s;
  else {
    const [l, c] = mc(t);
    if (s) {
      const f = r[t] = bc(
        s,
        i
      );
      yt(e, l, f, c);
    } else o && (dc(e, l, o, c), r[t] = void 0);
  }
}
const pc = /(Once|Passive|Capture)$/, gc = /^on:?(?:Once|Passive|Capture)$/;
function mc(e) {
  let t, n;
  for (; (n = e.match(pc)) && !gc.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Nt(e.slice(2)), t];
}
let us = 0;
const yc = /* @__PURE__ */ Promise.resolve(), vc = () => us || (yc.then(() => us = 0), us = Date.now());
function bc(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const i = n.value;
    if (H(i)) {
      const r = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        r.call(s), s._stopped = !0;
      };
      const o = i.slice(), l = [s];
      for (let c = 0; c < o.length && !s._stopped; c++) {
        const f = o[c];
        f && Ve(
          f,
          t,
          5,
          l
        );
      }
    } else
      Ve(
        i,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = vc(), n;
}
const Ri = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, xc = (e, t, n, s, i, r) => {
  const o = i === "svg";
  t === "class" ? rc(e, s, o) : t === "style" ? uc(e, n, s) : kn(t) ? Dn(t) || hc(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : _c(e, t, s, o)) ? (Pi(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ai(e, t, s, o, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (wc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !le(s))) ? Pi(e, ke(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Ai(e, t, s, o));
};
function _c(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ri(t) && U(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Ri(t) && le(n) ? !1 : t in e;
}
function wc(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = ke(t);
  return Array.isArray(n) ? n.some((i) => ke(i) === s) : Object.keys(n).some((i) => ke(i) === s);
}
const Ht = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return H(t) ? (n) => wn(t, n) : t;
};
function Sc(e) {
  e.target.composing = !0;
}
function Ni(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const qe = /* @__PURE__ */ Symbol("_assign"), xn = /* @__PURE__ */ Symbol("_initialValue");
function as(e, t, n) {
  return t && (e = e.trim()), n && (e = Vn(e)), e;
}
const Fi = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
    e.parentNode && (e.type === "text" ? e[xn] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[xn] = e.defaultValue.replace(/\r\n?/g, `
`))), e[qe] = Ht(i);
    const r = s || i.props && i.props.type === "number";
    yt(e, t ? "change" : "input", (o) => {
      o.target.composing || e[qe](as(e.value, n, r));
    }), (n || r) && yt(e, "change", () => {
      e.value = as(e.value, n, r);
    }), t || (yt(e, "compositionstart", Sc), yt(e, "compositionend", Ni), yt(e, "change", Ni));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const i = t ?? "", r = e[xn];
    delete e[xn], r !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== r ? e[qe](as(e.value, n, s)) : e.value = i;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: i, number: r } }, o) {
    if (e[qe] = Ht(o), e.composing) return;
    const l = (r || e.type === "number") && !/^0\d/.test(e.value) ? Vn(e.value) : e.value, c = t ?? "";
    if (l === c)
      return;
    const f = e.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === e && e.type !== "range" && (s && t === n || i && e.value.trim() === c) || (e.value = c);
  }
}, $i = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[qe] = Ht(n), yt(e, "change", () => {
      const s = e._modelValue, i = un(e), r = e.checked, o = e[qe];
      if (H(s)) {
        const l = Ns(s, i), c = l !== -1;
        if (r && !c)
          o(s.concat(i));
        else if (!r && c) {
          const f = [...s];
          f.splice(l, 1), o(f);
        }
      } else if (ft(s)) {
        const l = new Set(s);
        r ? l.add(i) : l.delete(i), o(l);
      } else
        o(Zr(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: ji,
  beforeUpdate(e, t, n) {
    e[qe] = Ht(n), ji(e, t, n);
  }
};
function ji(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let i;
  if (H(t))
    i = Ns(t, s.props.value) > -1;
  else if (ft(t))
    i = t.has(s.props.value);
  else {
    if (t === n) return;
    i = dt(t, Zr(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const Cc = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    e._modelValue = t, yt(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (c) => c.selected).map(
        (c) => n ? Vn(un(c)) : un(c)
      ), r = e.multiple, o = r ? ft(e._modelValue) ? new Set(i) : i : i[0], l = e._pendingValue = [
        r,
        r ? H(o) ? i.slice() : i : o
      ];
      try {
        e[qe](o);
      } finally {
        Ks(() => {
          e._pendingValue === l && (e._pendingValue = void 0);
        });
      }
    }), e[qe] = Ht(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    ki(e, t);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[qe] = Ht(n);
  },
  updated(e, { value: t }) {
    const n = e._pendingValue;
    e._pendingValue = void 0, (!n || n[0] !== e.multiple || !Tc(t, n[1], n[0])) && ki(e, t);
  }
};
function Tc(e, t, n) {
  if (!n || H(e)) return dt(e, t);
  if (ft(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t)
      if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function ki(e, t) {
  const n = e.multiple, s = H(t);
  if (!(n && !s && !ft(t))) {
    for (let i = 0, r = e.options.length; i < r; i++) {
      const o = e.options[i], l = un(o);
      if (n)
        if (s) {
          const c = typeof l;
          c === "string" || c === "number" ? o.selected = t.some((f) => String(f) === String(l)) : o.selected = Ns(t, l) > -1;
        } else
          o.selected = t.has(l);
      else if (dt(un(o), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function un(e) {
  return "_value" in e ? e._value : e.value;
}
function Zr(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Oc = ["ctrl", "shift", "alt", "meta"], Ec = {
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
  exact: (e, t) => Oc.some((n) => e[`${n}Key`] && !t.includes(n))
}, On = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((i, ...r) => {
    for (let o = 0; o < t.length; o++) {
      const l = Ec[t[o]];
      if (l && l(i, t)) return;
    }
    return e(i, ...r);
  }));
}, Mc = /* @__PURE__ */ ye({ patchProp: xc }, sc);
let Di;
function Ac() {
  return Di || (Di = kl(Mc));
}
const Pc = ((...e) => {
  const t = Ac().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const i = Rc(s);
    if (!i) return;
    const r = t._component;
    !U(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, !1, Ic(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
});
function Ic(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Rc(e) {
  return le(e) ? document.querySelector(e) : e;
}
const Nc = /* @__PURE__ */ Cr({
  __name: "ModalMask",
  props: {
    open: { type: Boolean },
    topLayer: { type: Boolean }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t;
    return (s, i) => (se(), on(tl, { to: "body" }, [
      e.open ? (se(), ae(
        "div",
        {
          key: 0,
          class: "moss-modal",
          onMousedown: i[0] || (i[0] = On((r) => n("close"), ["self"]))
        },
        [
          gl(s.$slots, "default", {}, void 0)
        ],
        32
        /* NEED_HYDRATION */
      )) : Tn("v-if", !0)
    ]));
  }
}), Qr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, Fc = /* @__PURE__ */ Qr(Nc, [["__scopeId", "data-v-32f7ef2b"]]), $c = { canvases: { portrait: { width: 1088, height: 1920 }, landscape: { width: 1920, height: 1088 } } };
function Os(e, t) {
  return typeof e == "number" && typeof t == "number" && e > 0 && t > 0 && e > t ? "landscape" : "portrait";
}
function Es(e) {
  return $c.canvases[e];
}
function jc(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch (i) {
    throw new Error(`JSON 解析失败:${i instanceof Error ? i.message : String(i)}`);
  }
  const n = kc(t);
  if (!n)
    throw new Error('需要形如 {"id":"my_layout","label":"…","portrait":[{"position":"…","slots":{"F":[y1,x1,y2,x2]}}]}');
  if (!n.portrait?.length && !n.landscape?.length)
    throw new Error("portrait 与 landscape 至少要有一个方向的面板");
  const s = t;
  if (s.canvas !== void 0 && !Gs(s.canvas)) throw new Error("画布宽高必须是 64～8192 的偶数。");
  for (const i of ["portrait", "landscape"]) {
    if (s[i] === void 0) continue;
    const r = s[i], o = n.canvas ?? Es(i);
    if (n.canvas && Os(o.width, o.height) !== i) throw new Error("面板方向与自定义画布宽高不符。");
    const l = /* @__PURE__ */ new Set();
    if (!Array.isArray(r) || !r.length) throw new Error(`${i}:需要非空面板数组。`);
    for (const c of r) {
      const f = c, a = typeof f?.position == "string" ? f.position.trim().toLowerCase() : "";
      if (!a || l.has(a)) throw new Error(`${i}:面板位置不能为空或重复。`);
      if (l.add(a), f?.layer !== void 0 && !Number.isSafeInteger(f.layer)) throw new Error(`${i}/${a}:层级必须为安全整数。`);
      if (!f?.slots || typeof f.slots != "object" || !Object.keys(f.slots).length)
        throw new Error(`${i}/${a}:需要槽位坐标。`);
      for (const [p, S] of Object.entries(f.slots)) {
        const T = eo(S);
        if (!p.trim() || !T || T[0] < -o.height / 2 || T[2] > o.height / 2 || T[1] < -o.width / 2 || T[3] > o.width / 2)
          throw new Error(`${i}/${a}/${p}:坐标无效或超出画布。`);
      }
      for (const [p, S] of Object.entries(f.shapes ?? {}))
        if (!f.slots[p] || !Ys(S) || S.some(([T, F]) => Math.abs(T) > o.width / 2 || Math.abs(F) > o.height / 2))
          throw new Error(`${i}/${a}/${p}:四边形角点无效、交叉或超出画布。`);
    }
  }
  return n;
}
function eo(e) {
  if (!Array.isArray(e) || e.length !== 4) return null;
  const t = e.map((o) => typeof o == "number" && Number.isFinite(o) ? Math.round(o) : NaN);
  if (t.some((o) => !Number.isSafeInteger(o))) return null;
  const [n, s, i, r] = t;
  return n >= i || s >= r ? null : [n, s, i, r];
}
function Li(e) {
  if (!Array.isArray(e)) return;
  const t = [];
  for (const n of e) {
    if (!n || typeof n != "object" || Array.isArray(n)) continue;
    const s = n, i = typeof s.position == "string" ? s.position.trim() : "", r = s.slots && typeof s.slots == "object" ? s.slots : null;
    if (!i || !r) continue;
    const o = {};
    for (const [f, a] of Object.entries(r)) {
      const p = eo(a);
      p && (o[f.trim().toUpperCase()] = p);
    }
    const l = {};
    if (s.shapes && typeof s.shapes == "object")
      for (const [f, a] of Object.entries(s.shapes)) {
        const p = f.trim().toUpperCase();
        o[p] && Ys(a) && (l[p] = a.map((S) => S.map(Math.round)));
      }
    const c = {};
    if (s.slotNotes && typeof s.slotNotes == "object" && !Array.isArray(s.slotNotes))
      for (const [f, a] of Object.entries(s.slotNotes)) {
        const p = f.trim().toUpperCase();
        o[p] && typeof a == "string" && a.trim() && (c[p] = a.trim());
      }
    Object.keys(o).length && t.push({ position: i, slots: o, ...Number.isSafeInteger(s.layer) ? { layer: s.layer } : {}, ...Object.keys(l).length ? { shapes: l } : {}, ...Object.keys(c).length ? { slotNotes: c } : {} });
  }
  return t.length ? t : void 0;
}
function kc(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, n = typeof t.id == "string" ? t.id.trim() : "";
  if (!n) return null;
  const s = Li(t.portrait), i = Li(t.landscape), r = typeof t.label == "string" ? t.label.trim() : void 0, o = typeof t.usage == "string" ? t.usage.trim() : void 0, l = typeof t.readingOrder == "string" ? t.readingOrder.trim() : void 0;
  if (!s && !i && !r && !o && !l) return null;
  const c = Gs(t.canvas);
  return { id: n, label: r, usage: o, readingOrder: l, portrait: s, landscape: i, ...c ? { canvas: c } : {} };
}
function Gs(e) {
  if (!e || typeof e != "object") return null;
  const { width: t, height: n } = e;
  return [t, n].every((s) => Number.isInteger(s) && s >= 64 && s <= 8192 && s % 2 === 0) ? { width: t, height: n } : null;
}
function Ys(e) {
  return !Array.isArray(e) || e.length !== 4 || e.some((t) => !Array.isArray(t) || t.length !== 2 || t.some((n) => typeof n != "number" || !Number.isFinite(n))) ? !1 : e.every((t, n) => {
    const s = e[(n + 1) % 4], i = e[(n + 2) % 4];
    return (s[0] - t[0]) * (i[1] - s[1]) - (s[1] - t[1]) * (i[0] - s[0]) > 0.01;
  });
}
const Rt = 24, me = (e, t, n) => Math.max(t, Math.min(n, e));
function lt(e, t, n = Rt) {
  const s = me(Math.round(e.width), n, t.width), i = me(Math.round(e.height), n, t.height);
  return { x: me(Math.round(e.x), 0, t.width - s), y: me(Math.round(e.y), 0, t.height - i), width: s, height: i };
}
function Dc(e, t) {
  const [n, s, i, r] = e.slots.F ?? e.slots.C ?? Object.values(e.slots)[0];
  return lt({ x: s + t.width / 2, y: n + t.height / 2, width: r - s, height: i - n }, t);
}
function fs(e, t, n) {
  const s = { ...e, slots: {}, corners: {} };
  n?.layer !== void 0 && (s.layer = n.layer), n?.position && (s.position = n.position);
  for (const [i, [r, o, l, c]] of Object.entries((n ?? Hc(e, t, "")).slots))
    i === "F" || i === "X" || Xs(s, i, { x: o + t.width / 2, y: r + t.height / 2, width: c - o, height: l - r });
  for (const [i, r] of Object.entries(n?.shapes ?? {})) {
    if (i !== "F" && !s.slots[i]) continue;
    const o = i === "F" ? s : Lt(s, i);
    s.corners[i] = r.map(([l, c]) => [(l + t.width / 2 - o.x) / o.width, (c + t.height / 2 - o.y) / o.height]);
  }
  return n?.slotNotes && (s.slotNotes = { ...n.slotNotes }), s;
}
function En(e, t) {
  const n = t === "F" ? e : Lt(e, t);
  return (e.corners[t] ?? [[0, 0], [1, 0], [1, 1], [0, 1]]).map(([s, i]) => [n.x + s * n.width, n.y + i * n.height]);
}
function Lc(e, t, n, s) {
  const i = n.map(([c, f]) => [me(Math.round(c), 0, s.width), me(Math.round(f), 0, s.height)]);
  if (!Ys(i)) return !1;
  const r = Math.min(...i.map((c) => c[0])), o = Math.min(...i.map((c) => c[1])), l = { x: r, y: o, width: Math.max(...i.map((c) => c[0])) - r, height: Math.max(...i.map((c) => c[1])) - o };
  return l.width < (t === "F" ? Rt : 1) || l.height < (t === "F" ? Rt : 1) ? !1 : (t === "F" ? Object.assign(e, l) : Xs(e, t, l), e.corners[t] = i.map(([c, f]) => [(c - r) / l.width, (f - o) / l.height]), !0);
}
function Lt(e, t) {
  const n = e.slots[t];
  return { x: Math.round(e.x + n.x * e.width), y: Math.round(e.y + n.y * e.height), width: Math.max(1, Math.round(n.width * e.width)), height: Math.max(1, Math.round(n.height * e.height)) };
}
function Xs(e, t, n) {
  e.slots[t] = { x: (n.x - e.x) / e.width, y: (n.y - e.y) / e.height, width: n.width / e.width, height: n.height / e.height };
}
function Vc(e, t, n) {
  const s = (o) => {
    const l = me(Math.round(o.x), 0, t.width - 1), c = me(Math.round(o.y), 0, t.height - 1);
    return [c - t.height / 2, l - t.width / 2, me(Math.round(o.y + o.height), c + 1, t.height) - t.height / 2, me(Math.round(o.x + o.width), l + 1, t.width) - t.width / 2];
  }, i = Object.fromEntries(Object.keys(e.corners).filter((o) => o === "F" || e.slots[o]).map((o) => [o, En(e, o).map(([l, c]) => [me(Math.round(l), 0, t.width) - t.width / 2, me(Math.round(c), 0, t.height) - t.height / 2])])), r = Object.fromEntries(Object.entries(e.slotNotes ?? {}).filter(([o, l]) => (o === "F" || e.slots[o]) && l.trim()).map(([o, l]) => [o, l.trim()]));
  return { position: n, ...e.layer !== void 0 ? { layer: e.layer } : {}, slots: { F: s(e), ...Object.fromEntries(Object.keys(e.slots).map((o) => [o, s(Lt(e, o))])) }, ...Object.keys(i).length ? { shapes: i } : {}, ...Object.keys(r).length ? { slotNotes: r } : {} };
}
function Hc(e, t, n) {
  const s = lt(e, t), i = (o, l, c, f) => [
    Math.round(s.y + s.height * l - t.height / 2),
    Math.round(s.x + s.width * o - t.width / 2),
    Math.round(s.y + s.height * f - t.height / 2),
    Math.round(s.x + s.width * c - t.width / 2)
  ], r = {
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
  return { position: n, slots: r };
}
function Kc(e, t, n, s, i = !1, r = Rt) {
  const o = (p, S, T, F) => {
    if (i) {
      const $ = p + S, V = [...F, Math.round($ / 8) * 8].reduce((v, W) => Math.abs(W - $) < Math.abs(v - $) ? W : v, $ + s + 1);
      return [p, Math.abs(V - $) <= s ? V - p : S];
    }
    let R = 0, L = s + 1;
    for (const $ of [p, p + S / 2, p + S])
      for (const A of [...F, Math.round($ / 8) * 8])
        Math.abs(A - $) < L && (L = Math.abs(A - $), R = A - $);
    return [me(p + (L <= s ? R : 0), 0, T - S), S];
  }, [l, c] = o(e.x, e.width, t.width, [0, t.width / 2, t.width, ...n.flatMap((p) => [p.x, p.x + p.width / 2, p.x + p.width])]), [f, a] = o(e.y, e.height, t.height, [0, t.height / 2, t.height, ...n.flatMap((p) => [p.y, p.y + p.height / 2, p.y + p.height])]);
  return lt({ x: l, y: f, width: c, height: a }, t, r);
}
const Bc = { class: "canvas-controls" }, Uc = { class: "designer-body" }, Wc = { class: "tools" }, zc = ["value"], Jc = ["disabled"], qc = ["disabled"], Gc = ["disabled"], Yc = { class: "inline" }, Xc = ["disabled"], Zc = ["disabled"], Qc = { class: "check" }, eu = { class: "check" }, tu = ["onClick"], nu = { class: "inline" }, su = ["disabled"], iu = ["disabled"], ru = { class: "inline" }, ou = ["disabled"], lu = ["disabled"], cu = { class: "hint" }, uu = { class: "canvas-area" }, au = ["viewBox"], fu = ["width", "height"], du = ["onPointerdown"], hu = ["points", "fill", "stroke"], pu = ["data-slot", "onPointerdown"], gu = ["points", "fill", "stroke", "stroke-width"], mu = ["x", "y", "font-size"], yu = ["x", "y", "font-size"], vu = ["data-ctrl-deform", "data-handle", "rx", "x", "y", "width", "height", "fill", "aria-label", "onPointerdown"], bu = { class: "hint" }, xu = { class: "properties" }, _u = ["value"], wu = ["value"], Su = ["value"], Cu = {
  key: 0,
  class: "slot-actions"
}, Tu = ["disabled"], Ou = ["value", "placeholder"], Eu = { class: "slot-list" }, Mu = ["onClick"], Au = ["value", "aria-label", "onChange"], Pu = {
  key: 1,
  class: "hint"
}, Iu = {
  key: 0,
  role: "alert",
  class: "error"
}, Ru = { key: 1 }, Nu = { key: 2 }, Fu = /* @__PURE__ */ Cr({
  __name: "Editor",
  props: {
    sources: {},
    existingIds: {},
    initialKey: {},
    editingId: {}
  },
  emits: ["close", "save"],
  setup(e, { emit: t }) {
    const n = e, s = t;
    function i(g) {
      let h = g, m = 2;
      for (; n.existingIds.includes(h); ) h = `${g}_${m++}`;
      return h;
    }
    const r = /* @__PURE__ */ Ce({ id: i("my_layout"), label: "自定义版式", usage: "", width: 1088, height: 1920, panels: [] }), o = /* @__PURE__ */ Ce(-1), l = /* @__PURE__ */ Ce(""), c = /* @__PURE__ */ Ce(n.initialKey ?? ""), f = /* @__PURE__ */ Ce(!0), a = /* @__PURE__ */ Ce(!0), p = /* @__PURE__ */ Ce(""), S = /* @__PURE__ */ Ce(!1), T = /* @__PURE__ */ Ce(), F = /* @__PURE__ */ Ce(), R = /* @__PURE__ */ Ce(1088), L = /* @__PURE__ */ Ce(1920), $ = /* @__PURE__ */ Ce([]), A = /* @__PURE__ */ Ce([]), V = /* @__PURE__ */ Ce(""), v = Et(() => r.value.panels[o.value]), W = Et(() => v.value ? l.value && v.value.slots[l.value] ? Lt(v.value, l.value) : v.value : null), de = { C: "内区", S: "主体", T: "顶部文字", B: "底部文字", TL: "左上文字", TR: "右上文字", BL: "左下文字", BR: "右下文字", L: "左人物", R: "右人物", O: "道具/音效", ML: "左侧文字", MR: "右侧文字", E: "有限越线" };
    let B = null;
    function J() {
      B = null, l.value = "";
    }
    function w() {
      if (B) {
        const g = B;
        _t(g.before), $.value = g.undo, A.value = g.redo;
      }
      J();
    }
    function k(g) {
      J(), o.value = g;
    }
    function oe(g, h) {
      o.value === g && l.value === h || (k(g), h && v.value?.slots[h] && (B = { before: Pe(), undo: [...$.value], redo: [...A.value] }, l.value = h, a.value = !0));
    }
    function pe(g) {
      v.value && (l.value ? Xs(v.value, l.value, g) : r.value.panels[o.value] = { ...v.value, ...g });
    }
    function et() {
      const g = l.value;
      v.value && g && ve(() => {
        delete v.value.slots[g], delete v.value.corners[g], v.value.slotNotes && delete v.value.slotNotes[g];
      });
    }
    function tt() {
      v.value && ve(() => {
        v.value.slots = fs(v.value, Q.value).slots, v.value.corners = v.value.corners.F ? { F: v.value.corners.F } : {}, l.value = "";
      });
    }
    function hn(g, h) {
      return a.value ? Object.keys(g.slots).sort((m, N) => +(h === o.value && m === l.value) - +(h === o.value && N === l.value)).map((m) => ({ key: m, rect: Lt(g, m) })) : [];
    }
    const Q = Et(() => ({ width: r.value.width, height: r.value.height })), ee = Et(() => r.value.panels.map((g, h) => ({ rect: g, index: h })).sort((g, h) => (g.rect.layer ?? g.index) - (h.rect.layer ?? h.index) || g.index - h.index)), G = Et(() => ee.value.findIndex((g) => g.index === o.value));
    function He(g) {
      const h = G.value, m = h + g;
      if (h < 0 || m < 0 || m >= ee.value.length) return;
      const N = [...ee.value];
      [N[h], N[m]] = [N[m], N[h]], ve(() => {
        N.forEach(({ rect: z }, he) => {
          z.layer = he;
        });
      });
    }
    const Pe = () => JSON.stringify(r.value), Ke = Et(() => {
      const g = new Set(r.value.panels.map((h) => h.position).filter(Boolean));
      return r.value.panels.map((h, m) => {
        if (h.position) return h.position;
        let N = m + 1;
        for (; g.has(`panel-${N}`); ) N++;
        const z = `panel-${N}`;
        return g.add(z), z;
      });
    });
    function Ae(g) {
      g !== Pe() && ($.value.push(g), $.value.length > 100 && $.value.shift(), A.value = [], p.value = "");
    }
    function ve(g, h = !1) {
      h || J();
      const m = Pe();
      g(), Ae(m);
    }
    function _t(g) {
      r.value = JSON.parse(g), R.value = r.value.width, L.value = r.value.height, o.value = Math.min(o.value, r.value.panels.length - 1), v.value?.slots[l.value] || (l.value = ""), p.value = "", S.value = !1;
    }
    function pn() {
      J();
      const g = $.value.pop();
      g && (A.value.push(Pe()), _t(g));
    }
    function pt() {
      J();
      const g = A.value.pop();
      g && ($.value.push(Pe()), _t(g));
    }
    function wt() {
      const g = n.sources.find((h) => h.key === c.value);
      g && (ve(() => {
        const h = g.id === n.editingId;
        r.value = { id: h ? g.id : i(`${g.id}_copy`), label: h ? g.label : `${g.label}（副本）`, usage: g.usage ?? "", ...g.canvas, panels: g.panels.map((m, N) => ({ ...fs(Dc(m, g.canvas), g.canvas, m), layer: m.layer ?? N })) };
      }), R.value = r.value.width, L.value = r.value.height, k(r.value.panels.length ? 0 : -1));
    }
    function Kt() {
      const g = Gs({ width: R.value, height: L.value });
      if (!g) {
        p.value = "画布宽高须为 64～8192 的偶数。";
        return;
      }
      ve(() => {
        const h = Q.value;
        r.value.panels = r.value.panels.map((m) => ({ ...lt({ x: m.x * g.width / h.width, y: m.y * g.height / h.height, width: m.width * g.width / h.width, height: m.height * g.height / h.height }, g), slots: m.slots, corners: m.corners, layer: m.layer, position: m.position, ...m.slotNotes ? { slotNotes: m.slotNotes } : {} })), Object.assign(r.value, g);
      });
    }
    function nt(g, h) {
      R.value = g, L.value = h, Kt();
    }
    function ti() {
      ve(() => {
        const g = r.value.panels.length % 5 * 0.04;
        r.value.panels.push({ ...fs(lt({ x: r.value.width * (0.08 + g), y: r.value.height * (0.08 + g), width: r.value.width * 0.55, height: r.value.height * 0.3 }, Q.value), Q.value), layer: Math.max(-1, ...r.value.panels.map((h, m) => h.layer ?? m)) + 1 }), k(r.value.panels.length - 1);
      });
    }
    function u() {
      v.value && ve(() => {
        r.value.panels.splice(o.value, 1), k(Math.min(o.value, r.value.panels.length - 1));
      });
    }
    function d() {
      v.value && ve(() => {
        r.value.panels.push({ ...lt({ ...v.value, x: v.value.x + 24, y: v.value.y + 24 }, Q.value), slots: JSON.parse(JSON.stringify(v.value.slots)), corners: JSON.parse(JSON.stringify(v.value.corners)), ...v.value.slotNotes ? { slotNotes: { ...v.value.slotNotes } } : {}, layer: Math.max(-1, ...r.value.panels.map((g, h) => g.layer ?? h)) + 1 }), k(r.value.panels.length - 1);
      });
    }
    function y(g) {
      const h = o.value + g;
      !v.value || h < 0 || h >= r.value.panels.length || ve(() => {
        const [m] = r.value.panels.splice(o.value, 1);
        r.value.panels.splice(h, 0, m), o.value = h;
      });
    }
    function C(g, h) {
      const m = Number(h.target.value);
      W.value && Number.isFinite(m) && ve(() => {
        pe(lt({ ...W.value, [g]: m }, Q.value, l.value ? 1 : Rt));
      }, !0);
    }
    function b(g, h) {
      ve(() => {
        r.value[g] = h.target.value;
      });
    }
    function _(g) {
      if (!v.value) return;
      const h = l.value || "F", m = g.target.value;
      ve(() => {
        m ? (v.value.slotNotes ??= {})[h] = m : v.value.slotNotes && delete v.value.slotNotes[h];
      }, !0);
    }
    let O = null;
    function M(g) {
      const h = F.value.getBoundingClientRect();
      return { x: (g.clientX - h.left) / h.width * r.value.width, y: (g.clientY - h.top) / h.height * r.value.height };
    }
    function E(g, h, m = "", N = "") {
      g.button !== 0 || O || (oe(h, N), O = { pointerId: g.pointerId, ...M(g), rect: { ...W.value }, before: Pe(), handle: m, quad: En(v.value, N || "F"), deform: g.ctrlKey && m.length === 2 }, F.value.setPointerCapture(g.pointerId));
    }
    function x(g) {
      if (!O || g.pointerId !== O.pointerId) return;
      const h = M(g), m = O, N = h.x - m.x, z = h.y - m.y, he = l.value ? 1 : Rt;
      if (m.deform) {
        const st = ["nw", "ne", "se", "sw"].indexOf(m.handle), Ft = m.quad.map((Yn, to) => to === st ? [Yn[0] + N, Yn[1] + z] : Yn);
        Lc(v.value, l.value || "F", Ft, Q.value);
        return;
      }
      let re = { ...m.rect };
      m.handle ? (m.handle.includes("w") && (re.x = me(m.rect.x + N, 0, m.rect.x + m.rect.width - he), re.width = m.rect.x + m.rect.width - re.x), m.handle.includes("n") && (re.y = me(m.rect.y + z, 0, m.rect.y + m.rect.height - he), re.height = m.rect.y + m.rect.height - re.y), m.handle.includes("e") && (re.width = me(m.rect.width + N, he, r.value.width - re.x)), m.handle.includes("s") && (re.height = me(m.rect.height + z, he, r.value.height - re.y))) : (re.x += N, re.y += z), re = lt(re, Q.value, he);
      const we = l.value ? [v.value, ...Object.keys(v.value.slots).filter((st) => st !== l.value).map((st) => Lt(v.value, st))] : r.value.panels.filter((st, Ft) => Ft !== o.value), Se = { ...re };
      f.value && !g.altKey && (re = Kc(re, Q.value, we, 6 * r.value.width / F.value.getBoundingClientRect().width, !!m.handle, he)), (m.handle === "e" || m.handle === "w") && (re.y = Se.y, re.height = Se.height), (m.handle === "n" || m.handle === "s") && (re.x = Se.x, re.width = Se.width), pe(re);
    }
    function j(g, h = !1) {
      if (!O || g.pointerId !== O.pointerId) return;
      const m = O.before;
      O = null, F.value?.hasPointerCapture(g.pointerId) && F.value.releasePointerCapture(g.pointerId), h ? _t(m) : Ae(m);
    }
    function P() {
      const g = En(v.value, l.value || "F");
      return ["nw", "ne", "se", "sw"].flatMap((h, m) => [{ name: h, x: g[m][0], y: g[m][1] }, { name: ["n", "e", "s", "w"][m], x: (g[m][0] + g[(m + 1) % 4][0]) / 2, y: (g[m][1] + g[(m + 1) % 4][1]) / 2 }]);
    }
    function D(g, h) {
      return En(g, h).map((m) => m.join(",")).join(" ");
    }
    function K() {
      Pe() !== V.value || R.value !== r.value.width || L.value !== r.value.height ? S.value = !0 : s("close");
    }
    function q(g) {
      if (g.key === "Tab" && T.value) {
        const h = [...T.value.querySelectorAll('button:not(:disabled),input,textarea,select,[tabindex="0"]')], N = T.value.getRootNode().activeElement;
        g.shiftKey && (N === h[0] || N === T.value) ? (g.preventDefault(), h.at(-1)?.focus()) : !g.shiftKey && N === h.at(-1) && (g.preventDefault(), h[0]?.focus());
      }
      if (g.key === "Escape") {
        g.stopPropagation(), K();
        return;
      }
      if (!g.target.matches("input,textarea,select,button")) {
        if ((g.ctrlKey || g.metaKey) && ["z", "y"].includes(g.key.toLowerCase()))
          g.preventDefault(), g.key.toLowerCase() === "y" || g.shiftKey ? pt() : pn();
        else if (g.key === "Delete")
          g.preventDefault(), l.value ? et() : u();
        else if (W.value && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(g.key)) {
          g.preventDefault();
          const h = g.shiftKey ? 10 : 1;
          ve(() => {
            pe(lt({ ...W.value, x: W.value.x + (g.key === "ArrowRight" ? h : g.key === "ArrowLeft" ? -h : 0), y: W.value.y + (g.key === "ArrowDown" ? h : g.key === "ArrowUp" ? -h : 0) }, Q.value, l.value ? 1 : Rt));
          }, !0);
        }
      }
    }
    function Z() {
      if (R.value !== r.value.width || L.value !== r.value.height) {
        p.value = "画布尺寸已修改，请先点击“应用尺寸”。";
        return;
      }
      if (!r.value.id.trim() || n.existingIds.includes(r.value.id.trim()) && r.value.id.trim() !== n.editingId) {
        p.value = "请填写未使用的版式 ID，或保留正在编辑的版式 ID。";
        return;
      }
      if (!r.value.panels.length) {
        p.value = "请至少添加一格。";
        return;
      }
      try {
        const g = Os(r.value.width, r.value.height), h = Es(g);
        if (r.value.id.trim() === n.editingId && n.sources.some((N) => {
          const z = Os(N.canvas.width, N.canvas.height), he = Es(z);
          return N.id === n.editingId && z !== g && (r.value.width !== h.width || r.value.height !== h.height || N.canvas.width !== he.width || N.canvas.height !== he.height);
        })) {
          p.value = "此版式含另一画布方向。使用非标准尺寸时请填写新的版式 ID，另存后可保留原版式的两个方向。";
          return;
        }
        const m = jc(JSON.stringify({ id: r.value.id.trim(), label: r.value.label.trim() || r.value.id.trim(), usage: r.value.usage.trim(), canvas: Q.value, readingOrder: Ke.value.join(" → "), [g]: r.value.panels.map((N, z) => Vc(N, Q.value, Ke.value[z])) }));
        s("save", m);
      } catch (g) {
        p.value = g instanceof Error ? g.message : String(g);
      }
    }
    return Er(() => {
      n.initialKey && wt(), $.value = [], A.value = [], V.value = Pe(), Ks(() => T.value?.focus());
    }), (g, h) => (se(), on(Fc, {
      open: !0,
      "top-layer": "",
      onClose: K
    }, {
      default: br(() => [
        I(
          "section",
          {
            ref_key: "dialog",
            ref: T,
            class: "manga-designer",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "快捷自定义版式",
            tabindex: "-1",
            onKeydown: q
          },
          [
            I("header", null, [
              I(
                "strong",
                null,
                fe(e.editingId ? "可视化编辑版式" : "快捷自定义版式"),
                1
                /* TEXT */
              ),
              I("button", {
                type: "button",
                "aria-label": "关闭编辑器",
                onClick: K
              }, "✕")
            ]),
            I("div", Bc, [
              I("label", null, [
                h[21] || (h[21] = Ie(
                  "画布宽 ",
                  -1
                  /* CACHED */
                )),
                Ut(I(
                  "input",
                  {
                    "onUpdate:modelValue": h[0] || (h[0] = (m) => R.value = m),
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
                    Fi,
                    R.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              I("label", null, [
                h[22] || (h[22] = Ie(
                  "画布高 ",
                  -1
                  /* CACHED */
                )),
                Ut(I(
                  "input",
                  {
                    "onUpdate:modelValue": h[1] || (h[1] = (m) => L.value = m),
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
                    Fi,
                    L.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              I("button", {
                type: "button",
                onClick: Kt
              }, "应用尺寸"),
              I("button", {
                type: "button",
                onClick: h[2] || (h[2] = (m) => nt(1088, 1920))
              }, "1088×1920"),
              I("button", {
                type: "button",
                onClick: h[3] || (h[3] = (m) => nt(1920, 1088))
              }, "1920×1088"),
              I("button", {
                type: "button",
                onClick: h[4] || (h[4] = (m) => nt(1024, 1024))
              }, "1024×1024")
            ]),
            h[38] || (h[38] = I(
              "p",
              { class: "hint" },
              "改变画布尺寸会等比例换算各轴坐标。工作流与预设尺寸须与此画布一致；请连接节点的宽高输出到潜空间尺寸输入。",
              -1
              /* CACHED */
            )),
            I("div", Uc, [
              I("aside", Wc, [
                I("label", null, [
                  h[24] || (h[24] = Ie(
                    "从现有版式复制",
                    -1
                    /* CACHED */
                  )),
                  Ut(I(
                    "select",
                    {
                      "onUpdate:modelValue": h[5] || (h[5] = (m) => c.value = m),
                      "aria-label": "源版式"
                    },
                    [
                      h[23] || (h[23] = I(
                        "option",
                        { value: "" },
                        "请选择",
                        -1
                        /* CACHED */
                      )),
                      (se(!0), ae(
                        ue,
                        null,
                        Ct(e.sources, (m) => (se(), ae("option", {
                          key: m.key,
                          value: m.key
                        }, fe(m.label) + " · " + fe(m.canvas.width) + "×" + fe(m.canvas.height), 9, zc))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    512
                    /* NEED_PATCH */
                  ), [
                    [Cc, c.value]
                  ])
                ]),
                I("button", {
                  type: "button",
                  disabled: !c.value,
                  onClick: wt
                }, "载入副本", 8, Jc),
                I("button", {
                  type: "button",
                  onClick: ti
                }, "＋ 新增分格"),
                I("button", {
                  type: "button",
                  disabled: !v.value,
                  onClick: d
                }, "复制选中分格", 8, qc),
                I("button", {
                  type: "button",
                  disabled: !v.value,
                  onClick: u
                }, "删除选中分格", 8, Gc),
                I("div", Yc, [
                  I("button", {
                    type: "button",
                    disabled: !$.value.length,
                    onClick: pn
                  }, "撤销", 8, Xc),
                  I("button", {
                    type: "button",
                    disabled: !A.value.length,
                    onClick: pt
                  }, "重做", 8, Zc)
                ]),
                I("label", Qc, [
                  Ut(I(
                    "input",
                    {
                      "onUpdate:modelValue": h[6] || (h[6] = (m) => f.value = m),
                      type: "checkbox"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [$i, f.value]
                  ]),
                  h[25] || (h[25] = Ie(
                    "对齐吸附",
                    -1
                    /* CACHED */
                  ))
                ]),
                I("label", eu, [
                  Ut(I(
                    "input",
                    {
                      "onUpdate:modelValue": h[7] || (h[7] = (m) => a.value = m),
                      type: "checkbox"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [$i, a.value]
                  ]),
                  h[26] || (h[26] = Ie(
                    "显示可编辑槽位",
                    -1
                    /* CACHED */
                  ))
                ]),
                h[27] || (h[27] = I(
                  "p",
                  { class: "hint" },
                  "拖动外框移动整格；拖动黄色/绿色小框单独编辑槽位。直接拖动四角或边中点缩放；按住 Ctrl 再拖四角才形变。Alt 暂停吸附，方向键微调，Delete 删除选中项，Ctrl+Z 撤销。",
                  -1
                  /* CACHED */
                )),
                h[28] || (h[28] = I(
                  "strong",
                  null,
                  "读序（先读 1）",
                  -1
                  /* CACHED */
                )),
                (se(!0), ae(
                  ue,
                  null,
                  Ct(r.value.panels, (m, N) => (se(), ae("button", {
                    key: N,
                    type: "button",
                    class: Pt({ active: o.value === N }),
                    onClick: (z) => k(N)
                  }, "第 " + fe(N + 1) + " 格", 11, tu))),
                  128
                  /* KEYED_FRAGMENT */
                )),
                I("div", nu, [
                  I("button", {
                    type: "button",
                    disabled: o.value <= 0,
                    onClick: h[8] || (h[8] = (m) => y(-1))
                  }, "提前", 8, su),
                  I("button", {
                    type: "button",
                    disabled: o.value < 0 || o.value >= r.value.panels.length - 1,
                    onClick: h[9] || (h[9] = (m) => y(1))
                  }, "延后", 8, iu)
                ]),
                I("div", ru, [
                  I("button", {
                    type: "button",
                    disabled: G.value < 0 || G.value >= r.value.panels.length - 1,
                    onClick: h[10] || (h[10] = (m) => He(1))
                  }, "上移一层", 8, ou),
                  I("button", {
                    type: "button",
                    disabled: G.value <= 0,
                    onClick: h[11] || (h[11] = (m) => He(-1))
                  }, "下移一层", 8, lu)
                ]),
                I(
                  "p",
                  cu,
                  fe(v.value ? `当前第 ${G.value + 1} / ${r.value.panels.length} 层（数字越大越靠前）。` : "") + "层级控制重叠遮挡，不改变读序；遮挡关系自动写入生图提示词。",
                  1
                  /* TEXT */
                )
              ]),
              I("div", uu, [
                (se(), ae("svg", {
                  ref_key: "svg",
                  ref: F,
                  class: "layout-canvas",
                  viewBox: `0 0 ${r.value.width} ${r.value.height}`,
                  style: en({ aspectRatio: `${r.value.width}/${r.value.height}`, width: `min(100%, ${62 * r.value.width / r.value.height}vh)` }),
                  role: "img",
                  "aria-label": "版式画布",
                  tabindex: "0",
                  onPointermove: x,
                  onPointerup: h[13] || (h[13] = (m) => j(m)),
                  onPointercancel: h[14] || (h[14] = (m) => j(m, !0)),
                  onLostpointercapture: h[15] || (h[15] = (m) => j(m, !0))
                }, [
                  I("rect", {
                    width: r.value.width,
                    height: r.value.height,
                    fill: "white",
                    onPointerdown: h[12] || (h[12] = (m) => k(-1))
                  }, null, 40, fu),
                  (se(!0), ae(
                    ue,
                    null,
                    Ct(ee.value, ({ rect: m, index: N }) => (se(), ae("g", {
                      key: N,
                      class: Pt(["panel", { selected: N === o.value }]),
                      onPointerdown: On((z) => E(z, N), ["stop", "prevent"])
                    }, [
                      I("polygon", {
                        points: D(m, "F"),
                        fill: N === o.value ? "#dcecff" : "#f1f2f4",
                        stroke: N === o.value ? "#2675cf" : "#333",
                        "stroke-width": "2",
                        "vector-effect": "non-scaling-stroke"
                      }, null, 8, hu),
                      (se(!0), ae(
                        ue,
                        null,
                        Ct(hn(m, N), (z) => (se(), ae("g", {
                          key: z.key,
                          class: "slot",
                          "data-slot": z.key,
                          onPointerdown: On((he) => E(he, N, "", z.key), ["stop", "prevent"])
                        }, [
                          I("polygon", {
                            points: D(m, z.key),
                            fill: z.key === "T" ? "#e5ba6638" : "#50a18a18",
                            stroke: N === o.value && z.key === l.value ? "#df7827" : z.key === "T" ? "#b48733" : "#50a18a",
                            "stroke-width": N === o.value && z.key === l.value ? 2 : 1,
                            "stroke-dasharray": "5 4",
                            "vector-effect": "non-scaling-stroke"
                          }, null, 8, gu),
                          I("text", {
                            x: z.rect.x + 5,
                            y: z.rect.y + r.value.width * 0.025,
                            "font-size": r.value.width * 0.021,
                            fill: "#575c62"
                          }, fe(z.key), 9, mu)
                        ], 40, pu))),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      I("text", {
                        x: m.x + 8,
                        y: m.y + r.value.width * 0.032,
                        "font-size": r.value.width * 0.026,
                        fill: "#164b83"
                      }, fe(N + 1), 9, yu)
                    ], 42, du))),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  v.value && W.value ? (se(!0), ae(
                    ue,
                    { key: 0 },
                    Ct(P(), (m) => (se(), ae("rect", {
                      key: m.name,
                      class: "resize-handle",
                      "data-ctrl-deform": m.name.length === 2,
                      "data-handle": m.name,
                      rx: m.name.length === 2 ? r.value.width * 9e-3 : 0,
                      x: m.x - r.value.width * 9e-3,
                      y: m.y - r.value.width * 9e-3,
                      width: r.value.width * 0.018,
                      height: r.value.width * 0.018,
                      fill: l.value ? "#df7827" : "#2675cf",
                      stroke: "white",
                      "vector-effect": "non-scaling-stroke",
                      style: en({ cursor: `${m.name}-resize` }),
                      "aria-label": `${m.name} 控制点`,
                      onPointerdown: On((N) => E(N, o.value, m.name, l.value), ["stop", "prevent"])
                    }, null, 44, vu))),
                    128
                    /* KEYED_FRAGMENT */
                  )) : Tn("v-if", !0)
                ], 44, au)),
                I("p", bu, [
                  Ie(
                    fe(r.value.width) + "×" + fe(r.value.height) + " · " + fe(r.value.panels.length) + " 格 · 黄色：顶部字区 T · 绿色：主体 S",
                    1
                    /* TEXT */
                  ),
                  h[29] || (h[29] = I(
                    "br",
                    null,
                    null,
                    -1
                    /* CACHED */
                  )),
                  h[30] || (h[30] = Ie(
                    "槽位可单独移动、缩放和删除；移动外框时槽位跟随，保存后保留编辑结果。",
                    -1
                    /* CACHED */
                  ))
                ])
              ]),
              I("aside", xu, [
                I("label", null, [
                  h[31] || (h[31] = Ie(
                    "版式 ID",
                    -1
                    /* CACHED */
                  )),
                  I("input", {
                    value: r.value.id,
                    "aria-label": "版式 ID",
                    onChange: h[16] || (h[16] = (m) => b("id", m))
                  }, null, 40, _u)
                ]),
                I("label", null, [
                  h[32] || (h[32] = Ie(
                    "名称",
                    -1
                    /* CACHED */
                  )),
                  I("input", {
                    value: r.value.label,
                    "aria-label": "版式名称",
                    onChange: h[17] || (h[17] = (m) => b("label", m))
                  }, null, 40, wu)
                ]),
                I("label", null, [
                  h[33] || (h[33] = Ie(
                    "用途说明",
                    -1
                    /* CACHED */
                  )),
                  I("textarea", {
                    value: r.value.usage,
                    "aria-label": "版式用途",
                    rows: "3",
                    onChange: h[18] || (h[18] = (m) => b("usage", m))
                  }, null, 40, Su)
                ]),
                v.value ? (se(), ae(
                  ue,
                  { key: 0 },
                  [
                    I(
                      "strong",
                      null,
                      "第 " + fe(o.value + 1) + " 格 · " + fe(l.value ? `${l.value} ${de[l.value] ?? "槽位"}` : "外框 F"),
                      1
                      /* TEXT */
                    ),
                    l.value ? (se(), ae("div", Cu, [
                      I("div", { class: "inline" }, [
                        I("button", {
                          type: "button",
                          class: "primary",
                          onClick: J
                        }, "确定内框"),
                        I("button", {
                          type: "button",
                          onClick: w
                        }, "取消内框修改")
                      ]),
                      h[34] || (h[34] = I(
                        "p",
                        { class: "hint" },
                        "确定后保留内框并返回外框编辑；取消恢复本次内框修改。完成整页后请点击底部保存按钮。切换选中项会保留当前修改。",
                        -1
                        /* CACHED */
                      ))
                    ])) : Tn("v-if", !0),
                    I("button", {
                      type: "button",
                      disabled: !l.value,
                      onClick: et
                    }, "删除选中槽位", 8, Tu),
                    I("button", {
                      type: "button",
                      onClick: tt
                    }, "恢复本格默认槽位"),
                    I("label", null, [
                      Ie(
                        fe(l.value ? `内框 ${l.value} 用途说明` : "外框 F 用途说明") + " ",
                        1
                        /* TEXT */
                      ),
                      I("textarea", {
                        value: v.value.slotNotes?.[l.value || "F"] ?? "",
                        "aria-label": "当前框用途说明",
                        rows: "3",
                        placeholder: l.value ? "例如：半身主体，侧重人物动作与反应" : "例如：交代场景和人物关系的开场格",
                        onInput: _
                      }, null, 40, Ou)
                    ]),
                    h[35] || (h[35] = I(
                      "p",
                      { class: "hint" },
                      "随版式库与工作流快照保存；通过“一键复制说明”与格式要求一起交给 LLM，帮助分配本框内容。留空沿用默认用途，说明本身不作为画面文字。",
                      -1
                      /* CACHED */
                    )),
                    I("div", Eu, [
                      I(
                        "button",
                        {
                          type: "button",
                          class: Pt({ active: !l.value }),
                          onClick: J
                        },
                        "外框 F",
                        2
                        /* CLASS */
                      ),
                      (se(!0), ae(
                        ue,
                        null,
                        Ct(v.value.slots, (m, N) => (se(), ae("button", {
                          key: N,
                          type: "button",
                          class: Pt({ active: l.value === N }),
                          onClick: (z) => oe(o.value, String(N))
                        }, fe(N) + " " + fe(de[N] ?? ""), 11, Mu))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    (se(), ae(
                      ue,
                      null,
                      Ct(["x", "y", "width", "height"], (m) => I("label", { key: m }, [
                        Ie(
                          fe({ x: "左边距", y: "上边距", width: "宽度", height: "高度" }[m]),
                          1
                          /* TEXT */
                        ),
                        I("input", {
                          value: W.value?.[m],
                          "aria-label": `${l.value ? "槽位" : "分格"}${m}`,
                          type: "number",
                          step: "1",
                          onChange: (N) => C(m, N)
                        }, null, 40, Au)
                      ])),
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (se(), ae("p", Pu, "添加或选择一格，编辑精确尺寸。")),
                h[36] || (h[36] = I(
                  "p",
                  { class: "hint" },
                  "右侧按钮可选重叠槽位，Delete 删除小框，撤销可恢复。普通拖动四角或边中点改大小，Ctrl+拖四角改形状。MOSS 以外接矩形与轮廓描述接收形状参考，不保证精确裁剪。",
                  -1
                  /* CACHED */
                ))
              ])
            ]),
            p.value ? (se(), ae(
              "p",
              Iu,
              fe(p.value),
              1
              /* TEXT */
            )) : Tn("v-if", !0),
            S.value ? (se(), ae("footer", Ru, [
              h[37] || (h[37] = I(
                "span",
                null,
                "放弃未保存的修改？",
                -1
                /* CACHED */
              )),
              I("button", {
                type: "button",
                onClick: h[19] || (h[19] = (m) => S.value = !1)
              }, "继续编辑"),
              I("button", {
                type: "button",
                onClick: h[20] || (h[20] = (m) => s("close"))
              }, "放弃修改")
            ])) : (se(), ae("footer", Nu, [
              I("button", {
                type: "button",
                onClick: K
              }, "取消"),
              I(
                "button",
                {
                  type: "button",
                  class: "primary",
                  onClick: Z
                },
                fe(e.editingId && r.value.id.trim() === e.editingId ? "保存版式修改" : "保存新版式"),
                1
                /* TEXT */
              )
            ]))
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        )
      ]),
      _: 1
      /* STABLE */
    }));
  }
}), $u = /* @__PURE__ */ Qr(Fu, [["__scopeId", "data-v-76788f5a"]]);
function Zs(e) {
  const { id: t, label: n, usage: s, readingOrder: i, canvas: r } = e;
  if (!r || !t) throw new Error("版式缺少 id 或 canvas。");
  const o = e.panels ?? e.portrait ?? e.landscape;
  if (!Array.isArray(o) || !o.length) throw new Error("版式缺少分格。");
  return { id: t, label: n || t, usage: s || "", readingOrder: i || "", canvas: r, panels: o };
}
function ju(e) {
  const t = Array.isArray(e) ? e : e.layouts ?? [e];
  if (!Array.isArray(t)) throw new Error("导入需要版式数组。");
  return t.map(Zs);
}
function ku(e) {
  const t = Zs(e), n = t.panels.map((s, i) => ({ panel: i + 1, position: s.position, slots: Object.keys(s.slots), slotNotes: s.slotNotes ?? {} }));
  return `以下为当前所选版式的框用途说明，结合原文分配内容。F 说明整格用途，其余键只作用于对应内框；留空沿用槽位默认用途。用途说明不是台词、旁白或可见印字，不新增剧情事件、参与者、格子或槽位。
` + JSON.stringify({ layout: t.id, usage: t.usage, readingOrder: t.readingOrder, panels: n }, null, 2);
}
function Du(e, t) {
  return e.trim() + `

` + ku(t);
}
function Lu(e, t, n) {
  const s = e.getContext("2d"), i = e.width, r = e.height;
  if (s.clearRect(0, 0, i, r), !t) return;
  const o = Math.min((i - 20) / t.canvas.width, (r - 20) / t.canvas.height), l = (i - t.canvas.width * o) / 2, c = (r - t.canvas.height * o) / 2;
  s.save(), s.translate(l, c), s.scale(o, o), s.translate(t.canvas.width / 2, t.canvas.height / 2), s.fillStyle = "#fff", s.fillRect(-t.canvas.width / 2, -t.canvas.height / 2, t.canvas.width, t.canvas.height);
  const f = t.panels.map((a, p) => ({ panel: a, index: p })).sort((a, p) => (a.panel.layer ?? a.index) - (p.panel.layer ?? p.index) || a.index - p.index);
  for (const { panel: a, index: p } of f) {
    const S = a.slots.F ?? a.slots.C ?? Object.values(a.slots)[0], [T, F, R, L] = S, $ = a.shapes?.F ?? [[F, T], [L, T], [L, R], [F, R]];
    if (s.beginPath(), $.forEach(([A, V], v) => v ? s.lineTo(A, V) : s.moveTo(A, V)), s.closePath(), s.fillStyle = "#eef4fd", s.fill(), s.strokeStyle = "#235c9e", s.lineWidth = 2 / o, s.stroke(), s.save(), s.clip(), n) for (const [A, [V, v, W, de]] of Object.entries(a.slots)) {
      if (!["T", "TL", "TR", "B", "BL", "BR", "ML", "MR"].includes(A)) continue;
      const B = a.shapes?.[A] ?? [[v, V], [de, V], [de, W], [v, W]];
      s.beginPath(), B.forEach(([J, w], k) => k ? s.lineTo(J, w) : s.moveTo(J, w)), s.closePath(), s.strokeStyle = "#dd8838", s.lineWidth = 1 / o, s.stroke(), s.fillStyle = "#a65313", s.font = `${10 / o}px sans-serif`, s.fillText(A, v + 2 / o, V + 12 / o);
    }
    s.restore(), s.fillStyle = "#16375b", s.font = `bold ${13 / o}px sans-serif`, s.fillText(String(p + 1), F + 4 / o, T + 16 / o);
  }
  s.restore();
}
let ce = { layouts: [], revision: "" };
const jn = /* @__PURE__ */ new Set(), Ms = new URL(import.meta.url);
Ms.pathname = Ms.pathname.replace(/[^/]+$/, "moss_layout.css");
const Qs = document.createElement("link");
Qs.rel = "stylesheet";
Qs.href = Ms.href;
document.head.append(Qs);
async function ei(e, t = {}) {
  const n = await no.fetchApi("/moss_manga_layout/" + e, t), s = await n.json();
  if (!n.ok) throw new Error(s.error || `请求失败：${n.status}`);
  return s;
}
async function Vi() {
  ce = await ei("library"), jn.forEach((e) => e());
}
async function As(e) {
  ce = await ei("library", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layouts: e, revision: ce.revision }) }), jn.forEach((t) => t());
}
function Hi(e, t) {
  const n = document.createElement("div");
  document.body.append(n);
  let s;
  const i = () => {
    s.unmount(), n.remove();
  };
  s = Pc($u, {
    sources: [...e ? [e] : [], ...ce.layouts.filter((r) => r.id !== e?.id)].map((r) => ({ ...r, key: r.id })),
    existingIds: ce.layouts.map((r) => r.id),
    initialKey: e?.id,
    editingId: e?.id,
    onClose: i,
    onSave: async (r) => {
      try {
        const o = Zs(r), l = ce.layouts.some((c) => c.id === o.id);
        if (l && o.id !== e?.id) throw new Error("版式 ID 已存在，请换一个 ID。");
        await As(l ? ce.layouts.map((c) => c.id === o.id ? o : c) : [...ce.layouts, o]), t(o), i();
      } catch (o) {
        window.alert(o.message);
      }
    }
  }), s.mount(n);
}
async function Vu(e) {
  try {
    await navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement("textarea");
    t.value = e, t.style.position = "fixed", t.style.top = "-10000px", document.body.append(t), t.select();
    const n = document.execCommand("copy");
    if (t.remove(), !n) throw new Error("浏览器无法访问剪贴板。");
  }
}
function Hu(e) {
  const t = e.widgets.find((w) => w.name === "layout_id"), n = e.widgets.find((w) => w.name === "layout_snapshot");
  if (!t || !n) return;
  n.type = "hidden", n.computeSize = () => [0, -4], t.type = "combo", t.options = { ...t.options, values: () => [...new Set([...ce.layouts.map((w) => w.id), t.value].filter(Boolean))] };
  let s = 400, i, r;
  const o = document.createElement("div");
  o.className = "moss-layout-node-panel", o.style.cssText = "width:100%;height:400px;display:flex;flex-direction:column;gap:6px;padding:6px;box-sizing:border-box;overflow:hidden;background:#202733;color:#ecf1f7;font:12px system-ui;";
  const l = document.createElement("label");
  l.style.cssText = "display:flex;align-items:center;gap:8px;flex:none;min-height:32px", l.append(document.createTextNode("版式库"));
  const c = document.createElement("select");
  c.setAttribute("aria-label", "选择库中版式"), c.style.cssText = "flex:1;min-width:0;height:32px;color:#fff;background:#344052;border:1px solid #7d8b9e;border-radius:4px;padding:3px 6px", l.append(c), o.append(l);
  const f = document.createElement("div");
  f.style.cssText = "display:flex;flex-wrap:wrap;gap:5px;flex:none", o.append(f);
  const a = document.createElement("div");
  a.setAttribute("role", "status"), a.style.cssText = "min-height:30px;white-space:normal;overflow-wrap:anywhere;flex:none", o.append(a);
  const p = document.createElement("canvas");
  p.width = 1e3, p.height = 540, p.style.cssText = "display:block;width:100%;height:240px;min-height:240px;flex:none;object-fit:contain;background:#e9edf3", o.append(p);
  const S = document.createElement("label"), T = document.createElement("input");
  T.type = "checkbox", T.checked = !0, S.append(T, document.createTextNode("显示字区")), f.append(S);
  function F() {
    return n.value ? JSON.parse(n.value) : null;
  }
  function R() {
    if (!i) return;
    s = 30 + l.offsetHeight + f.offsetHeight + a.offsetHeight + 240, o.style.height = s + "px";
    const w = e.computeSize();
    e.size[1] < w[1] && e.setSize([e.size[0], w[1]]), _n.graph?.setDirtyCanvas(!0, !0);
  }
  function L() {
    cancelAnimationFrame(r), r = requestAnimationFrame(R);
  }
  function $() {
    c.replaceChildren();
    for (const w of ce.layouts) {
      const k = document.createElement("option");
      k.value = w.id, k.textContent = `${w.id} · ${w.label || w.id}`, c.append(k);
    }
    if (!ce.layouts.some((w) => w.id === t.value)) {
      const w = document.createElement("option");
      w.value = t.value || "", w.textContent = n.value ? `${t.value} · 当前工作流快照（库中已无此版式）` : "请选择版式，或新建／导入", w.disabled = !0, c.prepend(w);
    }
    c.value = t.value || "", c.disabled = !ce.layouts.length;
  }
  function A() {
    $();
    try {
      const w = F();
      Lu(p, w, T.checked), a.textContent = w ? `${w.label || w.id} · ${w.canvas.width}×${w.canvas.height} · ${w.panels.length} 格 · 工作流快照` : "没有选中版式：请新建或导入。";
    } catch (w) {
      a.textContent = w.message;
    }
    _n.graph?.setDirtyCanvas(!0, !0), L();
  }
  function V(w) {
    t.value = w.id, n.value = JSON.stringify(w), A(), _n.graph?.change();
  }
  function v(w, k) {
    const oe = document.createElement("button");
    oe.textContent = w, oe.type = "button", oe.style.cssText = "padding:4px 7px;border:1px solid #7d8b9e;border-radius:4px;background:#344052;color:#fff;cursor:pointer", oe.onclick = async () => {
      try {
        await k();
      } catch (pe) {
        a.textContent = pe.message;
      }
    }, f.append(oe);
  }
  v("编辑版式", () => {
    const w = F();
    if (!w) throw new Error("先选择版式。");
    Hi(w, V);
  }), v("新建", () => Hi(null, V)), v("删除", async () => {
    const w = F();
    if (!w) throw new Error("先选择版式。");
    await As(ce.layouts.filter((k) => k.id !== w.id)), A(), a.textContent = "已从公共库删除。当前节点保留工作流快照；不会自动恢复到库。";
  }), v("刷新版式库", Vi), v("采用库中新版", () => {
    const w = ce.layouts.find((k) => k.id === t.value);
    if (!w) throw new Error("库中已无此版式，当前快照仍可使用。");
    V(w);
  }), v("一键复制说明", async () => {
    const w = F();
    if (!w) throw new Error("先选择版式。");
    const k = await ei("format", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(w) });
    await Vu(Du(k.text, w)), a.textContent = "已复制格式转换＋当前快照的框用途说明，可一起交给 LLM。";
  }), v("导出版式库", () => {
    const w = URL.createObjectURL(new Blob([JSON.stringify(ce.layouts, null, 2)], { type: "application/json" })), k = document.createElement("a");
    k.href = w, k.download = "moss-manga-layouts.json", k.click(), setTimeout(() => URL.revokeObjectURL(w), 1e3);
  }), v("导入", () => {
    const w = document.createElement("input");
    w.type = "file", w.accept = ".json,application/json", w.onchange = async () => {
      try {
        if (!w.files?.[0]) return;
        const k = ju(JSON.parse(await w.files[0].text())), oe = new Set(ce.layouts.map((pe) => pe.id));
        if (k.some((pe) => oe.has(pe.id))) throw new Error("导入含同名 ID，请先改名；不会覆盖已有版式。");
        await As([...ce.layouts, ...k]), !F() && k.length ? V(k[0]) : A();
      } catch (k) {
        a.textContent = k.message;
      }
    }, w.click();
  }), T.onchange = A, c.onchange = () => {
    const w = ce.layouts.find((k) => k.id === c.value);
    w && V(w);
  }, t.callback = (w) => {
    const k = ce.layouts.find((oe) => oe.id === w);
    k ? V(k) : A();
  }, i = e.addDOMWidget("版式预览", "moss_layout_preview", o, { serialize: !1, hideOnZoom: !1, getMinHeight: () => s, getMaxHeight: () => s, getHeight: () => s }), i.computeSize = (w) => [w, s], e.setSize([Math.max(e.size[0], 460), Math.max(e.size[1], 640)]);
  const W = new ResizeObserver(L);
  [l, f, a].forEach((w) => W.observe(w));
  const de = e.onResize;
  e.onResize = function(...w) {
    const k = de?.apply(this, w);
    return L(), k;
  };
  const B = e.onConfigure;
  e.onConfigure = function(...w) {
    const k = B?.apply(this, w);
    return setTimeout(A, 0), k;
  }, jn.add(A);
  const J = e.onRemoved;
  e.onRemoved = function(...w) {
    return jn.delete(A), W.disconnect(), cancelAnimationFrame(r), J?.apply(this, w);
  }, Vi().then(() => {
    if (!n.value && !t.value && ce.layouts.length) V(ce.layouts[0]);
    else if (!n.value && t.value) {
      const w = ce.layouts.find((k) => k.id === t.value);
      w && V(w);
    }
    A();
  }).catch((w) => {
    a.textContent = w.message;
  });
}
_n.registerExtension({ name: "MOSS.MangaLayout", beforeRegisterNodeDef(e, t) {
  if (t.name !== "MossMangaLayout") return;
  const n = e.prototype.onNodeCreated;
  e.prototype.onNodeCreated = function(...s) {
    const i = n?.apply(this, s);
    return Hu(this), i;
  };
} });
