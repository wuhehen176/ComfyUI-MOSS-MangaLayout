import { app as mo } from "../../scripts/app.js";
import { api as Kr } from "../../scripts/api.js";
// @__NO_SIDE_EFFECTS__
function Rs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const pe = {}, on = [], yt = () => {
}, sl = () => !1, Fo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Po = (e) => e.startsWith("onUpdate:"), Oe = Object.assign, Is = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Vr = Object.prototype.hasOwnProperty, ae = (e, t) => Vr.call(e, t), W = Array.isArray, Wt = (e) => Un(e) === "[object Map]", $t = (e) => Un(e) === "[object Set]", gi = (e) => Un(e) === "[object Date]", G = (e) => typeof e == "function", ye = (e) => typeof e == "string", rt = (e) => typeof e == "symbol", de = (e) => e !== null && typeof e == "object", il = (e) => (de(e) || G(e)) && G(e.then) && G(e.catch), ll = Object.prototype.toString, Un = (e) => ll.call(e), Hr = (e) => Un(e).slice(8, -1), rl = (e) => Un(e) === "[object Object]", js = (e) => ye(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, On = /* @__PURE__ */ Rs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), $o = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Ur = /-\w/g, it = /* @__PURE__ */ $o((e) => e.replace(Ur, (t) => t.slice(1).toUpperCase())), Wr = /\B([A-Z])/g, Yt = /* @__PURE__ */ $o(
  (e) => e.replace(Wr, "-$1").toLowerCase()
), al = /* @__PURE__ */ $o((e) => e.charAt(0).toUpperCase() + e.slice(1)), Qo = /* @__PURE__ */ $o((e) => e ? `on${al(e)}` : ""), gt = (e, t) => !Object.is(e, t), vo = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, ul = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, Wn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let mi;
const Ro = () => mi || (mi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Vt(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = ye(o) ? Yr(o) : Vt(o);
      if (s)
        for (const i in s)
          t[i] = s[i];
    }
    return t;
  } else if (ye(e) || de(e))
    return e;
}
const zr = /;(?![^(]*\))/g, Jr = /:([^]+)/, qr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function Yr(e) {
  const t = {};
  return e.replace(qr, (n) => n.startsWith("/*") ? "" : n).split(zr).forEach((n) => {
    if (n) {
      const o = n.split(Jr);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function nt(e) {
  let t = "";
  if (ye(e))
    t = e;
  else if (W(e))
    for (let n = 0; n < e.length; n++) {
      const o = nt(e[n]);
      o && (t += o + " ");
    }
  else if (de(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Gr = "itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", Xr = /* @__PURE__ */ Rs(Gr);
function cl(e) {
  return !!e || e === "";
}
function Zr(e, t, n) {
  if (e.length !== t.length) return !1;
  let o = !0;
  for (let s = 0; o && s < e.length; s++)
    o = Rt(e[s], t[s], n);
  return o;
}
function vi(e, t, n) {
  if (e.size !== t.size) return !1;
  const o = Array.from(t), s = new Uint8Array(o.length);
  for (const i of e) {
    let l = -1;
    for (let r = 0; r < o.length; r++)
      if (!s[r] && Rt(i, o[r], n)) {
        l = r;
        break;
      }
    if (l < 0) return !1;
    s[l] = 1;
  }
  return !0;
}
function Qr(e, t, n) {
  let o = Wt(e), s = Wt(t);
  if (o || s || (o = $t(e), s = $t(t), o || s))
    return o && s ? vi(e, t, n) : !1;
  const i = Object.keys(e).length, l = Object.keys(t).length;
  if (i !== l)
    return !1;
  for (const r in e) {
    const a = e.hasOwnProperty(r), d = t.hasOwnProperty(r);
    if (a && !d || !a && d || !Rt(e[r], t[r], n))
      return !1;
  }
  return String(e) === String(t);
}
function yi(e, t, n, o) {
  n || (n = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [s, i] = n;
  if (s.has(e) || i.has(t))
    return s.get(e) === t && i.get(t) === e;
  s.set(e, t), i.set(t, e);
  const l = o(e, t, n);
  return s.delete(e), i.delete(t), l;
}
function Rt(e, t, n) {
  if (e === t) return !0;
  let o = gi(e), s = gi(t);
  return o || s ? o && s ? e.getTime() === t.getTime() : !1 : (o = rt(e), s = rt(t), o || s ? e === t : (o = W(e), s = W(t), o || s ? o && s ? yi(e, t, n, Zr) : !1 : (o = de(e), s = de(t), o || s ? !o || !s ? !1 : yi(e, t, n, Qr) : String(e) === String(t))));
}
function Ns(e, t) {
  return e.findIndex((n) => Rt(n, t));
}
const fl = (e) => !!(e && e.__v_isRef === !0), ee = (e) => ye(e) ? e : e == null ? "" : W(e) || de(e) && (e.toString === ll || !G(e.toString)) ? fl(e) ? ee(e.value) : JSON.stringify(e, dl, 2) : String(e), dl = (e, t) => fl(t) ? dl(e, t.value) : Wt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], i) => (n[es(o, i) + " =>"] = s, n),
    {}
  )
} : $t(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => es(n))
} : rt(t) ? es(t) : de(t) && !W(t) && !rl(t) ? String(t) : t, es = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    rt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let Fe;
class ea {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Fe && (Fe.active ? (this.parent = Fe, this.index = (Fe.scopes || (Fe.scopes = [])).push(
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
      const n = Fe;
      try {
        return Fe = this, t();
      } finally {
        Fe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Fe, Fe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Fe === this)
        Fe = this.prevScope;
      else {
        let t = Fe;
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
function ta() {
  return Fe;
}
let ge;
const ts = /* @__PURE__ */ new WeakSet();
class hl {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Fe && (Fe.active ? Fe.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ts.has(this) && (ts.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || gl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, bi(this), ml(this);
    const t = ge, n = lt;
    ge = this, lt = !0;
    try {
      return this.fn();
    } finally {
      vl(this), ge = t, lt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Bs(t);
      this.deps = this.depsTail = void 0, bi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ts.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ms(this) && this.run();
  }
  get dirty() {
    return ms(this);
  }
}
let pl = 0, kn, En;
function gl(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = En, En = e;
    return;
  }
  e.next = kn, kn = e;
}
function Ds() {
  pl++;
}
function Ls() {
  if (--pl > 0)
    return;
  if (En) {
    let t = En;
    for (En = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; kn; ) {
    let t = kn;
    for (kn = void 0; t; ) {
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
function ml(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function vl(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), Bs(o), na(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function ms(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (yl(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function yl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === In) || (e.globalVersion = In, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ms(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ge, o = lt;
  ge = e, lt = !0;
  try {
    ml(e);
    const s = e.fn(e._value);
    (t.version === 0 || gt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    ge = n, lt = o, vl(e), e.flags &= -3;
  }
}
function Bs(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      Bs(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function na(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let lt = !0;
const bl = [];
function wt() {
  bl.push(lt), lt = !1;
}
function xt() {
  const e = bl.pop();
  lt = e === void 0 ? !0 : e;
}
function bi(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ge;
    ge = void 0;
    try {
      t();
    } finally {
      ge = n;
    }
  }
}
let In = 0;
class oa {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ks {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ge || !lt || ge === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ge)
      n = this.activeLink = new oa(ge, this), ge.deps ? (n.prevDep = ge.depsTail, ge.depsTail.nextDep = n, ge.depsTail = n) : ge.deps = ge.depsTail = n, wl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = ge.depsTail, n.nextDep = void 0, ge.depsTail.nextDep = n, ge.depsTail = n, ge.deps === n && (ge.deps = o);
    }
    return n;
  }
  trigger(t) {
    this.version++, In++, this.notify(t);
  }
  notify(t) {
    Ds();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ls();
    }
  }
}
function wl(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        wl(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const vs = /* @__PURE__ */ new WeakMap(), sn = /* @__PURE__ */ Symbol(
  ""
), ys = /* @__PURE__ */ Symbol(
  ""
), jn = /* @__PURE__ */ Symbol(
  ""
);
function Ne(e, t, n) {
  if (lt && ge) {
    let o = vs.get(e);
    o || vs.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new Ks()), s.map = o, s.key = n), s.track();
  }
}
function Tt(e, t, n, o, s, i) {
  const l = vs.get(e);
  if (!l) {
    In++;
    return;
  }
  const r = (a) => {
    a && a.trigger();
  };
  if (Ds(), t === "clear")
    l.forEach(r);
  else {
    const a = W(e), d = a && js(n);
    if (a && n === "length") {
      const h = Number(o);
      l.forEach((m, y) => {
        (y === "length" || y === jn || !rt(y) && y >= h) && r(m);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && r(l.get(n)), d && r(l.get(jn)), t) {
        case "add":
          a ? d && r(l.get("length")) : (r(l.get(sn)), Wt(e) && r(l.get(ys)));
          break;
        case "delete":
          a || (r(l.get(sn)), Wt(e) && r(l.get(ys)));
          break;
        case "set":
          Wt(e) && r(l.get(sn));
          break;
      }
  }
  Ls();
}
function an(e) {
  const t = /* @__PURE__ */ ue(e);
  return t === e || (Ne(t, "iterate", jn), /* @__PURE__ */ Xe(e)) ? t : /* @__PURE__ */ _t(e) ? /* @__PURE__ */ zt(e) ? t.map((n) => qt(Ze(n))) : t.map(qt) : t.map(Ze);
}
function Io(e) {
  return Ne(e = /* @__PURE__ */ ue(e), "iterate", jn), e;
}
function dt(e, t) {
  return /* @__PURE__ */ _t(e) ? qt(/* @__PURE__ */ zt(e) ? Ze(t) : t) : Ze(t);
}
const sa = {
  __proto__: null,
  [Symbol.iterator]() {
    return ns(this, Symbol.iterator, (e) => dt(this, e));
  },
  concat(...e) {
    return an(this).concat(
      ...e.map((t) => W(t) ? an(t) : t)
    );
  },
  entries() {
    return ns(this, "entries", (e) => (e[1] = dt(this, e[1]), e));
  },
  every(e, t) {
    return Ot(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ot(
      this,
      "filter",
      e,
      t,
      (n) => n.map((o) => dt(this, o)),
      arguments
    );
  },
  find(e, t) {
    return Ot(
      this,
      "find",
      e,
      t,
      (n) => dt(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Ot(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ot(
      this,
      "findLast",
      e,
      t,
      (n) => dt(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ot(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ot(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return os(this, "includes", e);
  },
  indexOf(...e) {
    return os(this, "indexOf", e);
  },
  join(e) {
    return an(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return os(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ot(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return bn(this, "pop");
  },
  push(...e) {
    return bn(this, "push", e);
  },
  reduce(e, ...t) {
    return xi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return xi(this, "reduceRight", e, t);
  },
  shift() {
    return bn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ot(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return bn(this, "splice", e);
  },
  toReversed() {
    return an(this).toReversed();
  },
  toSorted(e) {
    return an(this).toSorted(e);
  },
  toSpliced(...e) {
    return an(this).toSpliced(...e);
  },
  unshift(...e) {
    return bn(this, "unshift", e);
  },
  values() {
    return ns(this, "values", (e) => dt(this, e));
  }
};
function ns(e, t, n) {
  const o = Io(e), s = o[t], i = s.call(o);
  if (o !== e && !/* @__PURE__ */ Xe(e)) {
    if (i[Symbol.toStringTag] === "Array Iterator") {
      const l = Object.create(Object.getPrototypeOf(i));
      return l.next = () => wi(i.next(), n), s !== xl[t] && Object.defineProperties(l, {
        return: {
          get() {
            const r = i.return;
            return typeof r == "function" ? r.bind(i) : r;
          }
        },
        throw: {
          get() {
            const r = i.throw;
            return typeof r == "function" ? r.bind(i) : r;
          }
        }
      }), l;
    }
    i._next = i.next, i.next = () => wi(i._next(), n);
  }
  return i;
}
function wi(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const xl = Array.prototype;
function Ot(e, t, n, o, s, i) {
  const l = Io(e), r = l !== e && !/* @__PURE__ */ Xe(e), a = l[t];
  if (a !== xl[t]) {
    const m = a.apply(e, i);
    return r ? Ze(m) : m;
  }
  let d = n;
  l !== e && (r ? d = function(m, y) {
    return n.call(this, dt(e, m), y, e);
  } : n.length > 2 && (d = function(m, y) {
    return n.call(this, m, y, e);
  }));
  const h = a.call(l, d, o);
  return r && s ? s(h) : h;
}
function xi(e, t, n, o) {
  const s = Io(e), i = s !== e && !/* @__PURE__ */ Xe(e);
  let l = n, r = !1;
  s !== e && (i ? (r = o.length === 0, l = function(d, h, m) {
    return r && (r = !1, d = dt(e, d)), n.call(this, d, dt(e, h), m, e);
  }) : n.length > 3 && (l = function(d, h, m) {
    return n.call(this, d, h, m, e);
  }));
  const a = s[t](l, ...o);
  return r ? dt(e, a) : a;
}
function os(e, t, n) {
  const o = /* @__PURE__ */ ue(e);
  Ne(o, "iterate", jn);
  const s = o[t](...n);
  return (s === -1 || s === !1) && /* @__PURE__ */ Ws(n[0]) ? (n[0] = /* @__PURE__ */ ue(n[0]), o[t](...n)) : s;
}
function bn(e, t, n = []) {
  wt(), Ds();
  const o = (/* @__PURE__ */ ue(e))[t].apply(e, n);
  return Ls(), xt(), o;
}
const ia = /* @__PURE__ */ Rs("__proto__,__v_isRef,__isVue"), _l = /* @__PURE__ */ new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(rt)
);
function la(e) {
  rt(e) || (e = String(e));
  const t = /* @__PURE__ */ ue(this);
  return Ne(t, "has", e), t.hasOwnProperty(e);
}
class Cl {
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
      return o === (s ? i ? ma : kl : i ? Ol : Ml).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const l = W(t);
    if (!s) {
      let a;
      if (l && (a = sa[n]))
        return a;
      if (n === "hasOwnProperty")
        return la;
    }
    const r = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Me(t) ? t : o
    );
    if ((rt(n) ? _l.has(n) : ia(n)) || (s || Ne(t, "get", n), i))
      return r;
    if (/* @__PURE__ */ Me(r)) {
      const a = l && js(n) ? r : r.value;
      return s && de(a) ? /* @__PURE__ */ ws(a) : a;
    }
    return de(r) ? s ? /* @__PURE__ */ ws(r) : /* @__PURE__ */ Hs(r) : r;
  }
}
class Sl extends Cl {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let i = t[n];
    const l = W(t) && js(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ _t(i);
      if (!/* @__PURE__ */ Xe(o) && !/* @__PURE__ */ _t(o) && (i = /* @__PURE__ */ ue(i), o = /* @__PURE__ */ ue(o)), !l && /* @__PURE__ */ Me(i) && !/* @__PURE__ */ Me(o))
        return d || (i.value = o), !0;
    }
    const r = l ? Number(n) < t.length : ae(t, n), a = Reflect.set(
      t,
      n,
      o,
      /* @__PURE__ */ Me(t) ? t : s
    );
    return t === /* @__PURE__ */ ue(s) && a && (r ? gt(o, i) && Tt(t, "set", n, o) : Tt(t, "add", n, o)), a;
  }
  deleteProperty(t, n) {
    const o = ae(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && o && Tt(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!rt(n) || !_l.has(n)) && Ne(t, "has", n), o;
  }
  ownKeys(t) {
    return Ne(
      t,
      "iterate",
      W(t) ? "length" : sn
    ), Reflect.ownKeys(t);
  }
}
class ra extends Cl {
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
const aa = /* @__PURE__ */ new Sl(), ua = /* @__PURE__ */ new ra(), ca = /* @__PURE__ */ new Sl(!0);
const bs = (e) => e, ro = (e) => Reflect.getPrototypeOf(e);
function fa(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, i = /* @__PURE__ */ ue(s), l = Wt(i), r = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, d = s[e](...o), h = n ? bs : t ? qt : Ze;
    return !t && Ne(
      i,
      "iterate",
      a ? ys : sn
    ), Oe(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: m, done: y } = d.next();
          return y ? { value: m, done: y } : {
            value: r ? [h(m[0]), h(m[1])] : h(m),
            done: y
          };
        }
      }
    );
  };
}
function ao(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function da(e, t) {
  const n = {
    get(s) {
      const i = this.__v_raw, l = /* @__PURE__ */ ue(i), r = /* @__PURE__ */ ue(s);
      e || (gt(s, r) && Ne(l, "get", s), Ne(l, "get", r));
      const { has: a } = ro(l), d = t ? bs : e ? qt : Ze;
      if (a.call(l, s))
        return d(i.get(s));
      if (a.call(l, r))
        return d(i.get(r));
      i !== l && i.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && Ne(/* @__PURE__ */ ue(s), "iterate", sn), s.size;
    },
    has(s) {
      const i = this.__v_raw, l = /* @__PURE__ */ ue(i), r = /* @__PURE__ */ ue(s);
      return e || (gt(s, r) && Ne(l, "has", s), Ne(l, "has", r)), s === r ? i.has(s) : i.has(s) || i.has(r);
    },
    forEach(s, i) {
      const l = this, r = l.__v_raw, a = /* @__PURE__ */ ue(r), d = t ? bs : e ? qt : Ze;
      return !e && Ne(a, "iterate", sn), r.forEach((h, m) => s.call(i, d(h), d(m), l));
    }
  };
  return Oe(
    n,
    e ? {
      add: ao("add"),
      set: ao("set"),
      delete: ao("delete"),
      clear: ao("clear")
    } : {
      add(s) {
        const i = /* @__PURE__ */ ue(this), l = ro(i), r = /* @__PURE__ */ ue(s), a = !t && !/* @__PURE__ */ Xe(s) && !/* @__PURE__ */ _t(s) ? r : s;
        return l.has.call(i, a) || gt(s, a) && l.has.call(i, s) || gt(r, a) && l.has.call(i, r) || (i.add(a), Tt(i, "add", a, a)), this;
      },
      set(s, i) {
        !t && !/* @__PURE__ */ Xe(i) && !/* @__PURE__ */ _t(i) && (i = /* @__PURE__ */ ue(i));
        const l = /* @__PURE__ */ ue(this), { has: r, get: a } = ro(l);
        let d = r.call(l, s);
        d || (s = /* @__PURE__ */ ue(s), d = r.call(l, s));
        const h = a.call(l, s);
        return l.set(s, i), d ? gt(i, h) && Tt(l, "set", s, i) : Tt(l, "add", s, i), this;
      },
      delete(s) {
        const i = /* @__PURE__ */ ue(this), { has: l, get: r } = ro(i);
        let a = l.call(i, s);
        a || (s = /* @__PURE__ */ ue(s), a = l.call(i, s)), r && r.call(i, s);
        const d = i.delete(s);
        return a && Tt(i, "delete", s, void 0), d;
      },
      clear() {
        const s = /* @__PURE__ */ ue(this), i = s.size !== 0, l = s.clear();
        return i && Tt(
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
    n[s] = fa(s, e, t);
  }), n;
}
function Vs(e, t) {
  const n = da(e, t);
  return (o, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_isShallow" ? t : s === "__v_raw" ? o : Reflect.get(
    ae(n, s) && s in o ? n : o,
    s,
    i
  );
}
const ha = {
  get: /* @__PURE__ */ Vs(!1, !1)
}, pa = {
  get: /* @__PURE__ */ Vs(!1, !0)
}, ga = {
  get: /* @__PURE__ */ Vs(!0, !1)
};
const Ml = /* @__PURE__ */ new WeakMap(), Ol = /* @__PURE__ */ new WeakMap(), kl = /* @__PURE__ */ new WeakMap(), ma = /* @__PURE__ */ new WeakMap();
function va(e) {
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
function Hs(e) {
  return /* @__PURE__ */ _t(e) ? e : Us(
    e,
    !1,
    aa,
    ha,
    Ml
  );
}
// @__NO_SIDE_EFFECTS__
function ya(e) {
  return Us(
    e,
    !1,
    ca,
    pa,
    Ol
  );
}
// @__NO_SIDE_EFFECTS__
function ws(e) {
  return Us(
    e,
    !0,
    ua,
    ga,
    kl
  );
}
function Us(e, t, n, o, s) {
  if (!de(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const l = va(Hr(e));
  if (l === 0)
    return e;
  const r = new Proxy(
    e,
    l === 2 ? o : n
  );
  return s.set(e, r), r;
}
// @__NO_SIDE_EFFECTS__
function zt(e) {
  return /* @__PURE__ */ _t(e) ? /* @__PURE__ */ zt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function _t(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ws(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ue(t) : e;
}
function ba(e) {
  return !ae(e, "__v_skip") && Object.isExtensible(e) && ul(e, "__v_skip", !0), e;
}
const Ze = (e) => de(e) ? /* @__PURE__ */ Hs(e) : e, qt = (e) => de(e) ? /* @__PURE__ */ ws(e) : e;
// @__NO_SIDE_EFFECTS__
function Me(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ce(e) {
  return El(e, !1);
}
// @__NO_SIDE_EFFECTS__
function wa(e) {
  return El(e, !0);
}
function El(e, t) {
  return /* @__PURE__ */ Me(e) ? e : new xa(e, t);
}
class xa {
  constructor(t, n) {
    this.dep = new Ks(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ue(t), this._value = n ? t : Ze(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || /* @__PURE__ */ Xe(t) || /* @__PURE__ */ _t(t);
    t = o ? t : /* @__PURE__ */ ue(t), gt(t, n) && (this._rawValue = t, this._value = o ? t : Ze(t), this.dep.trigger());
  }
}
function q(e) {
  return /* @__PURE__ */ Me(e) ? e.value : e;
}
const _a = {
  get: (e, t, n) => t === "__v_raw" ? e : q(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return /* @__PURE__ */ Me(s) && !/* @__PURE__ */ Me(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Tl(e) {
  return /* @__PURE__ */ zt(e) ? e : new Proxy(e, _a);
}
class Ca {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ks(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = In - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ge !== this)
      return gl(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return yl(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Sa(e, t, n = !1) {
  let o, s;
  return G(e) ? o = e : (o = e.get, s = e.set), new Ca(o, s, n);
}
const uo = {}, wo = /* @__PURE__ */ new WeakMap();
let tn;
function Ma(e, t = !1, n = tn) {
  if (n) {
    let o = wo.get(n);
    o || wo.set(n, o = []), o.push(e);
  }
}
function Oa(e, t, n = pe) {
  const { immediate: o, deep: s, once: i, scheduler: l, augmentJob: r, call: a } = n, d = (j) => s ? j : /* @__PURE__ */ Xe(j) || s === !1 || s === 0 ? At(j, 1) : At(j);
  let h, m, y, S, R = !1, E = !1;
  if (/* @__PURE__ */ Me(e) ? (m = () => e.value, R = /* @__PURE__ */ Xe(e)) : /* @__PURE__ */ zt(e) ? (m = () => d(e), R = !0) : W(e) ? (E = !0, R = e.some((j) => /* @__PURE__ */ zt(j) || /* @__PURE__ */ Xe(j)), m = () => e.map((j) => {
    if (/* @__PURE__ */ Me(j))
      return j.value;
    if (/* @__PURE__ */ zt(j))
      return d(j);
    if (G(j))
      return a ? a(j, 2) : j();
  })) : G(e) ? t ? m = a ? () => a(e, 2) : e : m = () => {
    if (y) {
      wt();
      try {
        y();
      } finally {
        xt();
      }
    }
    const j = tn;
    tn = h;
    try {
      return a ? a(e, 3, [S]) : e(S);
    } finally {
      tn = j;
    }
  } : m = yt, t && s) {
    const j = m, D = s === !0 ? 1 / 0 : s;
    m = () => At(j(), D);
  }
  const F = ta(), K = () => {
    h.stop(), F && F.active && Is(F.effects, h);
  };
  if (i && t) {
    const j = t;
    t = (...D) => {
      try {
        return j(...D);
      } finally {
        K();
      }
    };
  }
  let N = E ? new Array(e.length).fill(uo) : uo;
  const U = (j) => {
    if (!(!(h.flags & 1) || !h.dirty && !j))
      if (t) {
        const D = h.run();
        if (j || s || R || (E ? D.some((z, L) => gt(z, N[L])) : gt(D, N))) {
          const z = tn;
          wt();
          try {
            y && y(), tn = h;
            const L = [
              D,
              // pass undefined as the old value when it's changed for the first time
              N === uo ? void 0 : E && N[0] === uo ? [] : N,
              S
            ];
            N = D, a ? a(t, 3, L) : (
              // @ts-expect-error
              t(...L)
            );
          } finally {
            tn = z, xt();
          }
        }
      } else
        h.run();
  };
  return r && r(U), h = new hl(m), h.scheduler = l ? () => l(U, !1) : U, S = (j) => Ma(j, !1, h), y = h.onStop = () => {
    const j = wo.get(h);
    if (j) {
      if (a)
        a(j, 4);
      else
        for (const D of j) D();
      wo.delete(h);
    }
  }, t ? o ? U(!0) : N = h.run() : l ? l(U.bind(null, !0), !0) : h.run(), K.pause = h.pause.bind(h), K.resume = h.resume.bind(h), K.stop = K, K;
}
function At(e, t = 1 / 0, n) {
  if (t <= 0 || !de(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Me(e))
    At(e.value, t, n);
  else if (W(e))
    for (let o = 0; o < e.length; o++)
      At(e[o], t, n);
  else if ($t(e) || Wt(e))
    e.forEach((o) => {
      At(o, t, n);
    });
  else if (rl(e)) {
    for (const o in e)
      At(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && At(e[o], t, n);
  }
  return e;
}
function zn(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    jo(s, t, n);
  }
}
function at(e, t, n, o) {
  if (G(e)) {
    const s = zn(e, t, n, o);
    return s && il(s) && s.catch((i) => {
      jo(i, t, n, void 0, !0);
    }), s;
  }
  if (W(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++)
      s.push(at(e[i], t, n, o));
    return s;
  }
}
function jo(e, t, n, o = !0, s = !1) {
  const i = t ? t.vnode : null, { errorHandler: l, throwUnhandledErrorInProduction: r } = t && t.appContext.config || pe;
  if (t) {
    let a = t.parent;
    const d = t.proxy, h = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const m = a.ec;
      if (m && !a.isUnmounted && // Async failures may outlive stopped scopes whose unmount effects
      // are deferred or discarded by Suspense.
      (!s || a.scope.active)) {
        for (let y = 0; y < m.length; y++)
          if (m[y](e, d, h) === !1)
            return;
      }
      a = a.parent;
    }
    if (l) {
      wt(), zn(l, null, 10, [
        e,
        d,
        h
      ]), xt();
      return;
    }
  }
  ka(e, n, i, o, r);
}
function ka(e, t, n, o = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const Ke = [];
let ot = -1;
const ht = [];
let Kt = null, un = 0;
const Al = /* @__PURE__ */ Promise.resolve();
let xo = null;
function Ht(e) {
  const t = xo || Al;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ea(e) {
  let t = ot + 1, n = Ke.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = Ke[o], i = Nn(s);
    i < e || i === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function zs(e) {
  if (!(e.flags & 1)) {
    const t = Nn(e), n = Ke[Ke.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Nn(n) ? Ke.push(e) : Ke.splice(Ea(t), 0, e), e.flags |= 1, Fl();
  }
}
function Fl() {
  xo || (xo = Al.then(Rl));
}
function Ta(e) {
  if (!W(e))
    Kt && e.id === -1 ? Kt.splice(un + 1, 0, e) : e.flags & 1 || (ht.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      ht.push(e[t]);
  Fl();
}
function Pl(e, t, n, o = ot + 1) {
  for (; o < Ke.length; o++) {
    const s = Ke[o];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid || t !== void 0 && !(s.id >= t))
        continue;
      Ke.splice(o, 1), o = e ? o - 1 : ot, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function $l(e, t, n = 0) {
  if (ht.length) {
    let o = ht, s = 0;
    if (t) {
      o = [];
      for (let l = 0; l < ht.length; l++) {
        const r = ht[l];
        (r.i !== void 0 ? !r.i || r.i.uid < n : t.has(r)) ? ht[s++] = r : o.push(r);
      }
    }
    const i = [...new Set(o)].sort((l, r) => Nn(l) - Nn(r));
    if (ht.length = s, Kt) {
      for (let l = 0; l < i.length; l++)
        Kt.push(i[l]);
      return;
    }
    for (Kt = i, un = 0; un < Kt.length; un++) {
      const l = Kt[un];
      l.flags & 4 && (l.flags &= -2), l.flags & 8 || l(), l.flags &= -2;
    }
    Kt = null, un = 0;
  }
}
let ss = !1;
function Aa(e, t) {
  if (ss) {
    e();
    return;
  }
  const n = t === void 0 ? void 0 : new Set(ht);
  e(), ss = !0;
  try {
    Pl(void 0, t), $l(void 0, n, t);
  } finally {
    ss = !1;
  }
}
const Nn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Rl(e) {
  try {
    for (ot = 0; ot < Ke.length; ot++) {
      const t = Ke[ot];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), zn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ot < Ke.length; ot++) {
      const t = Ke[ot];
      t && (t.flags &= -2);
    }
    ot = -1, Ke.length = 0, $l(), xo = null, (Ke.length || ht.length) && Rl();
  }
}
let De = null, Il = null;
function _o(e) {
  const t = De;
  return De = e, Il = e && e.type.__scopeId || null, t;
}
function jl(e, t = De, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && Ri(-1);
    const i = _o(t), l = Pt.length;
    let r;
    try {
      r = e(...s);
    } finally {
      for (let a = Pt.length; a > l; a--) Xs();
      _o(i), o._d && Ri(1);
    }
    return r;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function ct(e, t) {
  if (De === null)
    return e;
  const n = Ko(De), o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, l, r, a = pe] = t[s];
    i && (G(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && At(l), o.push({
      dir: i,
      instance: n,
      value: l,
      oldValue: void 0,
      arg: r,
      modifiers: a
    }));
  }
  return e;
}
function Qt(e, t, n, o) {
  let s = e;
  if (o === "beforeMount")
    e._mount = e;
  else if (o === "beforeUpdate") {
    const r = t && t._mount;
    r && (r._latest = e, e._mount = r);
  } else if (o === "mounted") {
    const r = e._latest;
    e._mount = e._latest = void 0, r && (s = r, r._mount = void 0);
  }
  const i = s.dirs, l = t && t.dirs;
  for (let r = 0; r < i.length; r++) {
    let a = i[r];
    l ? a.oldValue = l[r].value : o === "mounted" && a.oldValue !== void 0 && (a = Oe({}, a, { oldValue: void 0 }));
    let d = a.dir[o];
    d && (wt(), at(d, n, 8, [
      e.el,
      a,
      s,
      t
    ]), xt());
  }
}
function Fa(e, t) {
  if (Ve) {
    let n = Ve.provides;
    const o = Ve.parent && Ve.parent.provides;
    o === n && (n = Ve.provides = Object.create(o)), n[e] = t;
  }
}
function yo(e, t, n = !1) {
  const o = Fu();
  if (o || fn) {
    let s = fn ? fn._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && G(t) ? t.call(o && o.proxy) : t;
  }
}
const Pa = /* @__PURE__ */ Symbol.for("v-scx"), $a = () => yo(Pa);
function is(e, t, n) {
  return Nl(e, t, n);
}
function Nl(e, t, n = pe) {
  const { immediate: o, deep: s, flush: i, once: l } = n, r = Oe({}, n), a = t && o || !t && i !== "post";
  let d;
  if (Vn) {
    if (i === "sync") {
      const S = $a();
      d = S.__watcherHandles || (S.__watcherHandles = []);
    } else if (!a) {
      const S = () => {
      };
      return S.stop = yt, S.resume = yt, S.pause = yt, S;
    }
  }
  const h = Ve;
  r.call = (S, R, E) => at(S, h, R, E);
  let m = !1;
  i === "post" ? r.scheduler = (S) => {
    S.i = h, je(S, h && h.suspense);
  } : i !== "sync" && (m = !0, r.scheduler = (S, R) => {
    R ? S() : zs(S);
  }), r.augmentJob = (S) => {
    t && (S.flags |= 4), m && (S.flags |= 2, h && (S.id = h.uid, S.i = h));
  };
  const y = Oa(e, t, r);
  return Vn && (d ? d.push(y) : a && y()), y;
}
function Ra(e, t, n) {
  const o = this.proxy, s = ye(e) ? e.includes(".") ? Dl(o, e) : () => o[e] : e.bind(o, o);
  let i;
  G(t) ? i = t : (i = t.handler, n = t);
  const l = Jn(this), r = Nl(s, i.bind(o), n);
  return l(), r;
}
function Dl(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const Bt = /* @__PURE__ */ new WeakMap(), Ll = /* @__PURE__ */ Symbol("_vte"), No = (e) => e.__isTeleport, nn = (e) => e && (e.disabled || e.disabled === ""), Ia = (e) => e && (e.defer || e.defer === ""), _i = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Ci = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, xs = (e, t) => {
  const n = e && e.to;
  return ye(n) ? t ? t(n) : null : n;
}, ja = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, o, s, i, l, r, a, d) {
    const {
      mc: h,
      pc: m,
      pbc: y,
      o: { insert: S, querySelector: R, createText: E, createComment: F, parentNode: K }
    } = d, N = nn(t.props);
    let { dynamicChildren: U } = t;
    const j = (L, X, le) => {
      L.shapeFlag & 16 && h(
        L.children,
        X,
        le,
        s,
        i,
        l,
        r,
        a
      );
    }, D = (L = t) => {
      const X = nn(L.props), le = L.target = xs(L.props, R), xe = _s(le, L, E, S);
      le && (l !== "svg" && _i(le) ? l = "svg" : l !== "mathml" && Ci(le) && (l = "mathml"), s && s.isCE && (s.ce._teleportTargets || (s.ce._teleportTargets = /* @__PURE__ */ new Set())).add(le), X || (j(L, le, xe), Cn(L, !1)));
    }, z = (L) => {
      const X = () => {
        if (Bt.get(L) === X) {
          if (Bt.delete(L), nn(L.props)) {
            const le = K(L.el) || n;
            j(L, le, L.anchor), Cn(L, !0);
          }
          D(L);
        }
      };
      Bt.set(L, X), je(X, i);
    };
    if (e == null) {
      const L = t.el = E(""), X = t.anchor = E("");
      if (S(L, n, o), S(X, n, o), Ia(t.props) || i && i.pendingBranch) {
        z(t);
        return;
      }
      N && (j(t, n, X), Cn(t, !0)), D();
    } else {
      t.el = e.el;
      const L = t.anchor = e.anchor, X = Bt.get(e);
      if (X) {
        X.flags |= 8, Bt.delete(e), z(t);
        return;
      }
      t.targetStart = e.targetStart;
      const le = t.target = e.target, xe = t.targetAnchor = e.targetAnchor, M = nn(e.props), V = M ? n : le, oe = M ? L : xe;
      if (l === "svg" || _i(le) ? l = "svg" : (l === "mathml" || Ci(le)) && (l = "mathml"), U ? (y(
        e.dynamicChildren,
        U,
        V,
        s,
        i,
        l,
        r
      ), Gs(e, t, !0)) : a || m(
        e,
        t,
        V,
        oe,
        s,
        i,
        l,
        r,
        !1
      ), N)
        M ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : co(
          t,
          n,
          L,
          d,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const ke = xs(t.props, R);
        ke && (t.target = ke, co(
          t,
          ke,
          null,
          d,
          0
        ));
      } else M && co(
        t,
        le,
        xe,
        d,
        1
      );
      Cn(t, N);
    }
  },
  remove(e, t, n, { um: o, o: { remove: s } }, i) {
    const {
      shapeFlag: l,
      children: r,
      anchor: a,
      targetStart: d,
      targetAnchor: h,
      target: m,
      props: y
    } = e, S = nn(y), R = i || !S, E = Bt.get(e);
    if (E && (E.flags |= 8, Bt.delete(e)), m && (s(d), s(h)), i && s(a), !E && (S || m) && l & 16)
      for (let F = 0; F < r.length; F++) {
        const K = r[F];
        o(
          K,
          t,
          n,
          R,
          !!K.dynamicChildren
        );
      }
  },
  move: co,
  hydrate: Na
};
function co(e, t, n, { o: { insert: o }, m: s }, i = 2) {
  i === 0 && (e.targetStart && o(e.targetStart, t, n), o(e.targetAnchor, t, n), n = e.targetAnchor);
  const { el: l, anchor: r, shapeFlag: a, children: d, props: h } = e, m = i === 2;
  if (m && o(l, t, n), !Bt.has(e) && (!m || nn(h)) && a & 16)
    for (let y = 0; y < d.length; y++)
      s(
        d[y],
        t,
        n,
        2
      );
  m && o(r, t, n);
}
function Na(e, t, n, o, s, i, {
  o: { nextSibling: l, parentNode: r, querySelector: a, insert: d, createText: h }
}, m) {
  function y(F, K) {
    let N = K;
    for (; N; ) {
      if (N && N.nodeType === 8) {
        if (N.data === "teleport start anchor")
          t.targetStart = N;
        else if (N.data === "teleport anchor") {
          t.targetAnchor = N, F._lpa = t.targetAnchor && l(t.targetAnchor);
          break;
        }
      }
      N = l(N);
    }
  }
  function S(F, K) {
    K.anchor = m(
      l(F),
      K,
      r(F),
      n,
      o,
      s,
      i
    );
  }
  const R = t.target = xs(
    t.props,
    a
  ), E = nn(t.props);
  if (R) {
    const F = R._lpa || R.firstChild;
    t.shapeFlag & 16 && (E ? (S(e, t), y(R, F), t.targetAnchor || _s(
      R,
      t,
      h,
      d,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      r(e) === R ? e : null
    )) : (t.anchor = l(e), y(R, F), t.targetAnchor || _s(R, t, h, d), m(
      F && l(F),
      t,
      R,
      n,
      o,
      s,
      i
    ))), Cn(t, E);
  } else E && t.shapeFlag & 16 && (S(e, t), t.targetStart = e, t.targetAnchor = l(e));
  return t.anchor && l(t.anchor);
}
const Da = ja;
function Cn(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let o, s;
    for (t ? (o = e.el, s = e.anchor) : (o = e.targetStart, s = e.targetAnchor); o && o !== s; )
      o.nodeType === 1 && o.setAttribute("data-v-owner", n.uid), o = o.nextSibling;
    n.ut();
  }
}
function _s(e, t, n, o, s = null) {
  const i = t.targetStart = n(""), l = t.targetAnchor = n("");
  return i[Ll] = l, e && (o(i, e, s), o(l, e, s)), l;
}
const ls = /* @__PURE__ */ Symbol("_leaveCb");
function La(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Qe) {
        t = n;
        break;
      }
  }
  return t;
}
function Bl(e) {
  if (!Js(e))
    return No(e.type) && e.children ? La(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && G(n.default))
      return n.default();
  }
}
function Tn(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    Tn(
      No(n.type) && Bl(n) || n,
      t
    );
  } else if (e.shapeFlag & 128) {
    const n = e.suspense;
    if (n) {
      const o = n.isHydrating ? n.pendingBranch : n.activeBranch;
      o && Tn(o, t.clone(o));
    } else
      e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  } else if (e.transition = t, e.type === fe && W(e.children)) {
    const n = Xl(e.children, !1);
    n && Tn(n, t);
  }
}
function Cs(e) {
  if (e.component)
    return Cs(e.component.subTree);
  if (e.type === fe) {
    const t = W(e.children) && Xl(e.children, !1);
    return t ? Cs(t) : void 0;
  }
  if (e.type !== Qe)
    return e;
}
// @__NO_SIDE_EFFECTS__
function Kl(e, t) {
  return G(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Oe({ name: e.name }, t, { setup: e })
  ) : e;
}
function Vl(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Si(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const Co = /* @__PURE__ */ new WeakMap();
function An(e, t, n, o, s = !1) {
  if (W(e)) {
    e.forEach(
      (E, F) => An(
        E,
        t && (W(t) ? t[F] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (cn(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && An(e, t, n, o.component.subTree);
    return;
  }
  const i = o.shapeFlag & 4 ? Ko(o.component) : o.el, l = s ? null : i, { i: r, r: a } = e, d = t && t.r, h = r.refs === pe ? r.refs = {} : r.refs, m = r.setupState, y = /* @__PURE__ */ ue(m), S = m === pe ? sl : (E) => Si(h, E) ? !1 : ae(y, E), R = (E, F) => !(F && Si(h, F));
  if (d != null && d !== a) {
    if (Mi(t), ye(d))
      h[d] = null, S(d) && (m[d] = null);
    else if (/* @__PURE__ */ Me(d)) {
      const E = t;
      R(d, E.k) && (d.value = null), E.k && (h[E.k] = null);
    }
  }
  if (G(a))
    zn(a, r, 12, [l, h]);
  else {
    const E = ye(a), F = /* @__PURE__ */ Me(a);
    if (E || F) {
      const K = () => {
        if (e.f) {
          const N = E ? S(a) ? m[a] : h[a] : R() || !e.k ? a.value : h[e.k];
          if (s)
            W(N) && Is(N, i);
          else if (W(N))
            N.includes(i) || N.push(i);
          else if (E)
            h[a] = [i], S(a) && (m[a] = h[a]);
          else {
            const U = [i];
            R(a, e.k) && (a.value = U), e.k && (h[e.k] = U);
          }
        } else E ? (h[a] = l, S(a) && (m[a] = l)) : F && (R(a, e.k) && (a.value = l), e.k && (h[e.k] = l));
      };
      if (l) {
        const N = () => {
          K(), Co.delete(e);
        };
        N.id = -1, Co.set(e, N), je(N, n);
      } else
        Mi(e), K();
    }
  }
}
function Mi(e) {
  const t = Co.get(e);
  t && (t.flags |= 8, Co.delete(e));
}
Ro().requestIdleCallback;
Ro().cancelIdleCallback;
const cn = (e) => !!e.type.__asyncLoader, Js = (e) => e.type.__isKeepAlive;
function Ba(e, t) {
  Hl(e, "a", t);
}
function Ka(e, t) {
  Hl(e, "da", t);
}
function Hl(e, t, n = Ve) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Dn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Js(s.parent.vnode) && Va(o, t, n, s), s = s.parent;
  }
}
function Va(e, t, n, o) {
  const s = Dn(
    t,
    e,
    o,
    !0
    /* prepend */
  ), i = Dn(
    "um",
    () => Is(o[t], s),
    n
  );
  i.flags = 16;
}
function Dn(e, t, n = Ve, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...l) => {
      wt();
      const r = Jn(n), a = at(t, n, e, l);
      return r(), xt(), a;
    });
    return o ? s.unshift(i) : s.push(i), i;
  }
}
const It = (e) => (t, n = Ve) => {
  (!Vn || e === "sp") && Dn(e, (...o) => t(...o), n);
}, Ha = It("bm"), Ul = It("m"), Ua = It(
  "bu"
), Wa = It("u"), za = It(
  "bum"
), Wl = It("um"), Ja = It(
  "sp"
), qa = It("rtg"), Ya = It("rtc");
function Ga(e, t = Ve) {
  Dn("ec", e, t);
}
const Xa = /* @__PURE__ */ Symbol.for("v-ndc");
function tt(e, t, n, o) {
  let s;
  const i = n, l = W(e);
  if (l || ye(e)) {
    const r = l && /* @__PURE__ */ zt(e);
    let a = !1, d = !1;
    r && (a = !/* @__PURE__ */ Xe(e), d = /* @__PURE__ */ _t(e), e = Io(e)), s = new Array(e.length);
    for (let h = 0, m = e.length; h < m; h++)
      s[h] = t(
        a ? d ? qt(Ze(e[h])) : Ze(e[h]) : e[h],
        h,
        void 0,
        i
      );
  } else if (typeof e == "number")
    if (!Number.isInteger(e) || e < 0)
      s = [];
    else {
      s = new Array(e);
      for (let r = 0; r < e; r++)
        s[r] = t(r + 1, r, void 0, i);
    }
  else if (de(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (r, a) => t(r, a, void 0, i)
      );
    else {
      const r = Object.keys(e);
      s = new Array(r.length);
      for (let a = 0, d = r.length; a < d; a++) {
        const h = r[a];
        s[a] = t(e[h], h, a, i);
      }
    }
  else
    s = [];
  return s;
}
function Za(e, t, n, o, s, i) {
  if (n == null && (n = {}), De.ce || De.parent && cn(De.parent) && De.parent.ce) {
    const d = n, h = Object.keys(d).length > 0;
    return Y(), Bn(
      fe,
      null,
      [bt("slot", d, o)],
      h ? -2 : 64
    );
  }
  let l = e[t];
  l && l._c && (l._d = !1);
  const r = Pt.length;
  Y();
  let a;
  try {
    const d = l && zl(l(n)), h = n.key || i || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    d && d.key;
    a = Bn(
      fe,
      {
        key: (h && !rt(h) ? h : `_${t}`) + // #7256 force differentiate fallback content from actual content
        (!d && o ? "_fb" : "")
      },
      d || (o ? o() : []),
      d && e._ === 1 ? 64 : -2
    );
  } catch (d) {
    for (let h = Pt.length; h > r; h--) Xs();
    throw d;
  } finally {
    l && l._c && (l._d = !0);
  }
  return a;
}
function zl(e) {
  return e.some((t) => Bo(t) ? !(t.type === Qe || t.type === fe && !zl(t.children)) : !0) ? e : null;
}
const Ss = (e) => e ? dr(e) ? Ko(e) : Ss(e.parent) : null, Fn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Oe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ss(e.parent),
    $root: (e) => Ss(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ql(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      zs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ht.bind(e.proxy)),
    $watch: (e) => Ra.bind(e)
  })
), rs = (e, t) => e !== pe && !e.__isScriptSetup && ae(e, t), Qa = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: i, accessCache: l, type: r, appContext: a } = e;
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
        if (rs(o, t))
          return l[t] = 1, o[t];
        if (s !== pe && ae(s, t))
          return l[t] = 2, s[t];
        if (ae(i, t))
          return l[t] = 3, i[t];
        if (n !== pe && ae(n, t))
          return l[t] = 4, n[t];
        Ms && (l[t] = 0);
      }
    }
    const d = Fn[t];
    let h, m;
    if (d)
      return t === "$attrs" && Ne(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (h = r.__cssModules) && (h = h[t])
    )
      return h;
    if (n !== pe && ae(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      m = a.config.globalProperties, ae(m, t)
    )
      return m[t];
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: i } = e;
    return rs(s, t) ? (s[t] = n, !0) : o !== pe && ae(o, t) ? (o[t] = n, !0) : ae(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, props: i, type: l }
  }, r) {
    let a;
    return !!(n[r] || e !== pe && r[0] !== "$" && ae(e, r) || rs(t, r) || ae(i, r) || ae(o, r) || ae(Fn, r) || ae(s.config.globalProperties, r) || (a = l.__cssModules) && a[r]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ae(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Oi(e) {
  return W(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Ms = !0;
function eu(e) {
  const t = ql(e), n = e.proxy, o = e.ctx;
  Ms = !1, t.beforeCreate && ki(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: i,
    methods: l,
    watch: r,
    provide: a,
    inject: d,
    // lifecycle
    created: h,
    beforeMount: m,
    mounted: y,
    beforeUpdate: S,
    updated: R,
    activated: E,
    deactivated: F,
    beforeDestroy: K,
    beforeUnmount: N,
    destroyed: U,
    unmounted: j,
    render: D,
    renderTracked: z,
    renderTriggered: L,
    errorCaptured: X,
    serverPrefetch: le,
    // public API
    expose: xe,
    inheritAttrs: M,
    // assets
    components: V,
    directives: oe,
    filters: ke
  } = t;
  if (d && tu(d, o, null), l)
    for (const ne in l) {
      const ie = l[ne];
      G(ie) && (o[ne] = ie.bind(n));
    }
  if (s) {
    const ne = s.call(n, n);
    de(ne) && (e.data = /* @__PURE__ */ Hs(ne));
  }
  if (Ms = !0, i)
    for (const ne in i) {
      const ie = i[ne], et = G(ie) ? ie.bind(n, n) : G(ie.get) ? ie.get.bind(n, n) : yt, jt = !G(ie) && G(ie.set) ? ie.set.bind(n) : yt, Ct = Ue({
        get: et,
        set: jt
      });
      Object.defineProperty(o, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Ct.value,
        set: (He) => Ct.value = He
      });
    }
  if (r)
    for (const ne in r)
      Jl(r[ne], o, n, ne);
  if (a) {
    const ne = G(a) ? a.call(n) : a;
    Reflect.ownKeys(ne).forEach((ie) => {
      Fa(ie, ne[ie]);
    });
  }
  h && ki(h, e, "c");
  function Ce(ne, ie) {
    W(ie) ? ie.forEach((et) => ne(et.bind(n))) : ie && ne(ie.bind(n));
  }
  if (Ce(Ha, m), Ce(Ul, y), Ce(Ua, S), Ce(Wa, R), Ce(Ba, E), Ce(Ka, F), Ce(Ga, X), Ce(Ya, z), Ce(qa, L), Ce(za, N), Ce(Wl, j), Ce(Ja, le), W(xe))
    if (xe.length) {
      const ne = e.exposed || (e.exposed = {});
      xe.forEach((ie) => {
        Object.defineProperty(ne, ie, {
          get: () => n[ie],
          set: (et) => n[ie] = et,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  D && e.render === yt && (e.render = D), M != null && (e.inheritAttrs = M), V && (e.components = V), oe && (e.directives = oe), le && Vl(e);
}
function tu(e, t, n = yt) {
  W(e) && (e = Os(e));
  for (const o in e) {
    const s = e[o];
    let i;
    de(s) ? "default" in s ? i = yo(
      s.from || o,
      s.default,
      !0
    ) : i = yo(s.from || o) : i = yo(s), /* @__PURE__ */ Me(i) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[o] = i;
  }
}
function ki(e, t, n) {
  at(
    W(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Jl(e, t, n, o) {
  let s = o.includes(".") ? Dl(n, o) : () => n[o];
  if (ye(e)) {
    const i = t[e];
    G(i) && is(s, i);
  } else if (G(e))
    is(s, e.bind(n));
  else if (de(e))
    if (W(e))
      e.forEach((i) => Jl(i, t, n, o));
    else {
      const i = G(e.handler) ? e.handler.bind(n) : t[e.handler];
      G(i) && is(s, i, e);
    }
}
function ql(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: i,
    config: { optionMergeStrategies: l }
  } = e.appContext, r = i.get(t);
  let a;
  return r ? a = r : !s.length && !n && !o ? a = t : (a = {}, s.length && s.forEach(
    (d) => So(a, d, l, !0)
  ), So(a, t, l)), de(t) && i.set(t, a), a;
}
function So(e, t, n, o = !1) {
  const { mixins: s, extends: i } = t;
  i && So(e, i, n, !0), s && s.forEach(
    (l) => So(e, l, n, !0)
  );
  for (const l in t)
    if (!(o && l === "expose")) {
      const r = nu[l] || n && n[l];
      e[l] = r ? r(e[l], t[l]) : t[l];
    }
  return e;
}
const nu = {
  data: Ei,
  props: Ti,
  emits: Ti,
  // objects
  methods: Sn,
  computed: Sn,
  // lifecycle
  beforeCreate: Be,
  created: Be,
  beforeMount: Be,
  mounted: Be,
  beforeUpdate: Be,
  updated: Be,
  beforeDestroy: Be,
  beforeUnmount: Be,
  destroyed: Be,
  unmounted: Be,
  activated: Be,
  deactivated: Be,
  errorCaptured: Be,
  serverPrefetch: Be,
  // assets
  components: Sn,
  directives: Sn,
  // watch
  watch: su,
  // provide / inject
  provide: Ei,
  inject: ou
};
function Ei(e, t) {
  return t ? e ? function() {
    return Oe(
      G(e) ? e.call(this, this) : e,
      G(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ou(e, t) {
  return Sn(Os(e), Os(t));
}
function Os(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Be(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Sn(e, t) {
  return e ? Oe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ti(e, t) {
  return e ? W(e) && W(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Oe(
    /* @__PURE__ */ Object.create(null),
    Oi(e),
    Oi(t ?? {})
  ) : t;
}
function su(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Oe(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = Be(e[o], t[o]);
  return n;
}
function Yl() {
  return {
    app: null,
    config: {
      isNativeTag: sl,
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
let iu = 0;
function lu(e, t) {
  return function(o, s = null) {
    G(o) || (o = Oe({}, o)), s != null && !de(s) && (s = null);
    const i = Yl(), l = /* @__PURE__ */ new WeakSet(), r = [];
    let a = !1;
    const d = i.app = {
      _uid: iu++,
      _component: o,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Nu,
      get config() {
        return i.config;
      },
      set config(h) {
      },
      use(h, ...m) {
        return l.has(h) || (h && G(h.install) ? (l.add(h), h.install(d, ...m)) : G(h) && (l.add(h), h(d, ...m))), d;
      },
      mixin(h) {
        return i.mixins.includes(h) || i.mixins.push(h), d;
      },
      component(h, m) {
        return m ? (i.components[h] = m, d) : i.components[h];
      },
      directive(h, m) {
        return m ? (i.directives[h] = m, d) : i.directives[h];
      },
      mount(h, m, y) {
        if (!a) {
          const S = d._ceVNode || bt(o, s);
          return S.appContext = i, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(S, h, y), a = !0, d._container = h, h.__vue_app__ = d, Ko(S.component);
        }
      },
      onUnmount(h) {
        r.push(h);
      },
      unmount() {
        a && (at(
          r,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(h, m) {
        return i.provides[h] = m, d;
      },
      runWithContext(h) {
        const m = fn;
        fn = d;
        try {
          return h();
        } finally {
          fn = m;
        }
      }
    };
    return d;
  };
}
let fn = null;
const ru = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${it(t)}Modifiers`] || e[`${Yt(t)}Modifiers`];
function au(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || pe;
  let s = n;
  const i = t.startsWith("update:"), l = i && ru(o, t.slice(7));
  l && (l.trim && (s = n.map((h) => ye(h) ? h.trim() : h)), l.number && (s = s.map(Wn)));
  let r, a = o[r = Qo(t)] || // also try camelCase event handler (#2249)
  o[r = Qo(it(t))];
  !a && i && (a = o[r = Qo(Yt(t))]), a && at(
    a,
    e,
    6,
    s
  );
  const d = o[r + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[r])
      return;
    e.emitted[r] = !0, at(
      d,
      e,
      6,
      s
    );
  }
}
const uu = /* @__PURE__ */ new WeakMap();
function Gl(e, t, n = !1) {
  const o = n ? uu : t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const i = e.emits;
  let l = {}, r = !1;
  if (!G(e)) {
    const a = (d) => {
      const h = Gl(d, t, !0);
      h && (r = !0, Oe(l, h));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !r ? (de(e) && o.set(e, null), null) : (W(i) ? i.forEach((a) => l[a] = null) : Oe(l, i), de(e) && o.set(e, l), l);
}
function Do(e, t) {
  return !e || !Fo(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ae(e, t[0].toLowerCase() + t.slice(1)) || ae(e, Yt(t)) || ae(e, t));
}
function Ai(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    propsOptions: [i],
    slots: l,
    attrs: r,
    emit: a,
    render: d,
    renderCache: h,
    props: m,
    data: y,
    setupState: S,
    ctx: R,
    inheritAttrs: E
  } = e, F = _o(e);
  let K, N;
  try {
    if (n.shapeFlag & 4) {
      const j = s || o, D = j;
      K = pt(
        d.call(
          D,
          j,
          h,
          m,
          S,
          y,
          R
        )
      ), N = r;
    } else {
      const j = t;
      K = pt(
        j.length > 1 ? j(
          m,
          { attrs: r, slots: l, emit: a }
        ) : j(
          m,
          null
        )
      ), N = t.props ? r : cu(r);
    }
  } catch (j) {
    Pt.length = 0, jo(j, e, 1), K = bt(Qe);
  }
  let U = K;
  if (N && E !== !1) {
    const j = Object.keys(N), { shapeFlag: D } = U;
    j.length && D & 7 && (i && j.some(Po) && (N = fu(
      N,
      i
    )), U = dn(U, N, !1, !0));
  }
  if (n.dirs && (U = dn(U, null, !1, !0), U.dirs = U.dirs ? U.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const j = No(U.type) && Bl(U) || U;
    Tn(j, n.transition);
  }
  return K = U, _o(F), K;
}
function Xl(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    if (Bo(s)) {
      if (s.type !== Qe || s.children === "v-if") {
        if (n)
          return;
        n = s;
      }
    } else
      return;
  }
  return n;
}
const cu = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Fo(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, fu = (e, t) => {
  const n = {};
  for (const o in e)
    (!Po(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
};
function du(e, t, n) {
  const { props: o, children: s, component: i } = e, { props: l, children: r, patchFlag: a } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return o ? Fi(o, l, d) : !!l;
    if (a & 8) {
      const h = t.dynamicProps;
      for (let m = 0; m < h.length; m++) {
        const y = h[m];
        if (Zl(l, o, y) && !Do(d, y))
          return !0;
      }
    }
  } else
    return (s || r) && (!r || !r.$stable) ? !0 : o === l ? !1 : o ? l ? Fi(o, l, d) : !0 : !!l;
  return !1;
}
function Fi(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    if (!ae(e, i) || Zl(t, e, i) && !Do(n, i))
      return !0;
  }
  return !1;
}
function Zl(e, t, n) {
  const o = e[n], s = t[n];
  return n === "style" && de(o) && de(s) ? !Rt(o, s) : o !== s;
}
function hu({ vnode: e, parent: t, suspense: n }, o) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.suspense.vnode.el = s.el = o, e = s), s === e)
      (e = t.vnode).el = o, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = o);
}
const Ql = {}, er = () => Object.create(Ql), tr = (e) => Object.getPrototypeOf(e) === Ql;
function pu(e, t, n, o = !1) {
  const s = {}, i = er();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), nr(e, t, s, i);
  for (const l in e.propsOptions[0])
    l in s || (s[l] = void 0);
  n ? e.props = o ? s : /* @__PURE__ */ ya(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function gu(e, t, n, o) {
  const {
    props: s,
    attrs: i,
    vnode: { patchFlag: l }
  } = e, r = /* @__PURE__ */ ue(s), [a] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const h = e.vnode.dynamicProps;
      for (let m = 0; m < h.length; m++) {
        let y = h[m];
        if (Do(e.emitsOptions, y))
          continue;
        const S = t[y];
        if (a)
          if (ae(i, y))
            S !== i[y] && (i[y] = S, d = !0);
          else {
            const R = it(y);
            s[R] = ks(
              a,
              r,
              R,
              S,
              e,
              !1
            );
          }
        else
          S !== i[y] && (i[y] = S, d = !0);
      }
    }
  } else {
    nr(e, t, s, i) && (d = !0);
    let h;
    for (const m in r)
      (!t || // for camelCase
      !ae(t, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = Yt(m)) === m || !ae(t, h))) && (a ? n && // for camelCase
      (n[m] !== void 0 || // for kebab-case
      n[h] !== void 0) && (s[m] = ks(
        a,
        r,
        m,
        void 0,
        e,
        !0
      )) : delete s[m]);
    if (i !== r)
      for (const m in i)
        (!t || !ae(t, m)) && (delete i[m], d = !0);
  }
  d && Tt(e.attrs, "set", "");
}
function nr(e, t, n, o) {
  const [s, i] = e.propsOptions;
  let l = !1, r;
  if (t)
    for (let a in t) {
      if (On(a))
        continue;
      const d = t[a];
      let h;
      s && ae(s, h = it(a)) ? !i || !i.includes(h) ? n[h] = d : (r || (r = {}))[h] = d : Do(e.emitsOptions, a) || (!(a in o) || d !== o[a]) && (o[a] = d, l = !0);
    }
  if (i) {
    const a = /* @__PURE__ */ ue(n), d = r || pe;
    for (let h = 0; h < i.length; h++) {
      const m = i[h];
      n[m] = ks(
        s,
        a,
        m,
        d[m],
        e,
        !ae(d, m)
      );
    }
  }
  return l;
}
function ks(e, t, n, o, s, i) {
  const l = e[n];
  if (l != null) {
    const r = ae(l, "default");
    if (r && o === void 0) {
      const a = l.default;
      if (l.type !== Function && !l.skipFactory && G(a)) {
        const { propsDefaults: d } = s;
        if (n in d)
          o = d[n];
        else {
          const h = Jn(s);
          o = d[n] = a.call(
            null,
            t
          ), h();
        }
      } else
        o = a;
      s.ce && s.ce._setProp(n, o);
    }
    l[
      0
      /* shouldCast */
    ] && (i && !r ? o = !1 : l[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Yt(n)) && (o = !0));
  }
  return o;
}
const mu = /* @__PURE__ */ new WeakMap();
function or(e, t, n = !1) {
  const o = n ? mu : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const i = e.props, l = {}, r = [];
  let a = !1;
  if (!G(e)) {
    const h = (m) => {
      a = !0;
      const [y, S] = or(m, t, !0);
      Oe(l, y), S && r.push(...S);
    };
    !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!i && !a)
    return de(e) && o.set(e, on), on;
  if (W(i))
    for (let h = 0; h < i.length; h++) {
      const m = it(i[h]);
      Pi(m) && (l[m] = pe);
    }
  else if (i)
    for (const h in i) {
      const m = it(h);
      if (Pi(m)) {
        const y = i[h], S = l[m] = W(y) || G(y) ? { type: y } : Oe({}, y), R = S.type;
        let E = !1, F = !0;
        if (W(R))
          for (let K = 0; K < R.length; ++K) {
            const N = R[K], U = G(N) && N.name;
            if (U === "Boolean") {
              E = !0;
              break;
            } else U === "String" && (F = !1);
          }
        else
          E = G(R) && R.name === "Boolean";
        S[
          0
          /* shouldCast */
        ] = E, S[
          1
          /* shouldCastTrue */
        ] = F, (E || ae(S, "default")) && r.push(m);
      }
    }
  const d = [l, r];
  return de(e) && o.set(e, d), d;
}
function Pi(e) {
  return e[0] !== "$" && !On(e);
}
const qs = (e) => e === "_" || e === "_ctx" || e === "$stable", Ys = (e) => W(e) ? e.map(pt) : [pt(e)], vu = (e, t, n) => {
  if (t._n)
    return t;
  const o = jl((...s) => Ys(t(...s)), n);
  return o._c = !1, o;
}, sr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (qs(s)) continue;
    const i = e[s];
    if (G(i))
      t[s] = vu(s, i, o);
    else if (i != null) {
      const l = Ys(i);
      t[s] = () => l;
    }
  }
}, ir = (e, t) => {
  const n = Ys(t);
  e.slots.default = () => n;
}, lr = (e, t, n) => {
  for (const o in t)
    (n || !qs(o)) && (e[o] = t[o]);
}, yu = (e, t, n) => {
  const o = e.slots = er();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (lr(o, t, n), n && ul(o, "_", s, !0)) : sr(t, o);
  } else t && ir(e, t);
}, bu = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let i = !0, l = pe;
  if (o.shapeFlag & 32) {
    const r = t._;
    r ? n && r === 1 ? i = !1 : lr(s, t, n) : (i = !t.$stable, sr(t, s)), l = t;
  } else t && (ir(e, t), l = { default: 1 });
  if (i)
    for (const r in s)
      !qs(r) && l[r] == null && delete s[r];
}, je = Mu;
function wu(e) {
  return xu(e);
}
function xu(e, t) {
  const n = Ro();
  n.__VUE__ = !0;
  const {
    insert: o,
    remove: s,
    patchProp: i,
    createElement: l,
    createText: r,
    createComment: a,
    setText: d,
    setElementText: h,
    parentNode: m,
    nextSibling: y,
    setScopeId: S = yt,
    insertStaticContent: R
  } = e, E = (p, g, b, k = null, _ = null, w = null, P = void 0, A = null, T = !!g.dynamicChildren) => {
    if (p === g)
      return;
    p && !wn(p, g) && (k = Zt(p), He(p, _, w, !0), p = null), g.patchFlag === -2 && (T = !1, g.dynamicChildren = null), g.dynamicChildren && p && p.dynamicChildren && p.dynamicChildren.hasOnce && (g.dynamicChildren === on && (g.dynamicChildren = []), g.dynamicChildren.hasOnce = !0);
    const { type: x, ref: O, shapeFlag: I } = g;
    switch (x) {
      case Lo:
        F(p, g, b, k);
        break;
      case Qe:
        K(p, g, b, k);
        break;
      case us:
        p == null && N(g, b, k, P);
        break;
      case fe:
        V(
          p,
          g,
          b,
          k,
          _,
          w,
          P,
          A,
          T
        );
        break;
      default:
        I & 1 ? D(
          p,
          g,
          b,
          k,
          _,
          w,
          P,
          A,
          T
        ) : I & 6 ? oe(
          p,
          g,
          b,
          k,
          _,
          w,
          P,
          A,
          T
        ) : (I & 64 || I & 128) && x.process(
          p,
          g,
          b,
          k,
          _,
          w,
          P,
          A,
          T,
          St
        );
    }
    O != null && _ ? An(O, p && p.ref, w, g || p, !g) : O == null && p && p.ref != null && An(p.ref, null, w, p, !0);
  }, F = (p, g, b, k) => {
    if (p == null)
      o(
        g.el = r(g.children),
        b,
        k
      );
    else {
      const _ = g.el = p.el;
      g.children !== p.children && d(_, g.children);
    }
  }, K = (p, g, b, k) => {
    p == null ? o(
      g.el = a(g.children || ""),
      b,
      k
    ) : g.el = p.el;
  }, N = (p, g, b, k) => {
    [p.el, p.anchor] = R(
      p.children,
      g,
      b,
      k,
      p.el,
      p.anchor
    );
  }, U = ({ el: p, anchor: g }, b, k) => {
    let _;
    for (; p && p !== g; )
      _ = y(p), o(p, b, k), p = _;
    o(g, b, k);
  }, j = ({ el: p, anchor: g }) => {
    let b;
    for (; p && p !== g; )
      b = y(p), s(p), p = b;
    s(g);
  }, D = (p, g, b, k, _, w, P, A, T) => {
    if (g.type === "svg" ? P = "svg" : g.type === "math" && (P = "mathml"), p == null)
      z(
        g,
        b,
        k,
        _,
        w,
        P,
        A,
        T
      );
    else {
      const x = p.el && p.el._isVueCE ? p.el : null;
      try {
        x && x._beginPatch(), le(
          p,
          g,
          _,
          w,
          P,
          A,
          T
        );
      } finally {
        x && x._endPatch();
      }
    }
  }, z = (p, g, b, k, _, w, P, A) => {
    let T, x;
    const { props: O, shapeFlag: I, transition: B, dirs: J } = p;
    if (T = p.el = l(
      p.type,
      w,
      O && O.is,
      O
    ), I & 8 ? h(T, p.children) : I & 16 && X(
      p.children,
      T,
      null,
      k,
      _,
      as(p, w),
      P,
      A
    ), J && Qt(p, null, k, "created"), L(T, p, p.scopeId, P, k), O) {
      for (const re in O)
        re !== "value" && !On(re) && i(T, re, null, O[re], w, k);
      "value" in O && i(T, "value", null, O.value, w), (x = O.onVnodeBeforeMount) && ft(x, k, p);
    }
    J && Qt(p, null, k, "beforeMount");
    const te = _u(_, B);
    te ? B.beforeEnter(T) : B && !B.persisted && (T[Su] = !0), o(T, g, b), ((x = O && O.onVnodeMounted) || te || J) && je(() => {
      x && ft(x, k, p), te && B.enter(T), J && Qt(p, null, k, "mounted");
    }, _);
  }, L = (p, g, b, k, _) => {
    if (b && S(p, b), k)
      for (let w = 0; w < k.length; w++)
        S(p, k[w]);
    if (_) {
      let w = _.subTree;
      if (g === w || ar(w.type) && (w.ssContent === g || w.ssFallback === g)) {
        const P = _.vnode;
        L(
          p,
          P,
          P.scopeId,
          P.slotScopeIds,
          _.parent
        );
      }
    }
  }, X = (p, g, b, k, _, w, P, A, T = 0) => {
    for (let x = T; x < p.length; x++) {
      const O = p[x] = A ? Et(p[x]) : pt(p[x]);
      E(
        null,
        O,
        g,
        b,
        k,
        _,
        w,
        P,
        A
      );
    }
  }, le = (p, g, b, k, _, w, P) => {
    const A = g.el = p.el;
    let { patchFlag: T, dynamicChildren: x, dirs: O } = g;
    T |= p.patchFlag & 16;
    const I = p.props || pe, B = g.props || pe;
    let J;
    if (b && en(b, !1), (J = B.onVnodeBeforeUpdate) && ft(J, b, g, p), O && Qt(g, p, b, "beforeUpdate"), b && en(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    x && (!p.dynamicChildren || p.dynamicChildren.length !== x.length) && (T = 0, P = !1, x = null), (I.innerHTML && B.innerHTML == null || I.textContent && B.textContent == null) && h(A, ""), x ? xe(
      p.dynamicChildren,
      x,
      A,
      b,
      k,
      as(g, _),
      w
    ) : P || ie(
      p,
      g,
      A,
      null,
      b,
      k,
      as(g, _),
      w,
      !1
    ), T > 0) {
      if (T & 16)
        M(A, I, B, b, _);
      else if (T & 2 && I.class !== B.class && i(A, "class", null, B.class, _), T & 4 && i(A, "style", I.style, B.style, _), T & 8) {
        const te = g.dynamicProps;
        for (let re = 0; re < te.length; re++) {
          const se = te[re], he = I[se], Se = B[se];
          (Se !== he || se === "value") && i(A, se, he, Se, _, b);
        }
      }
      T & 1 && p.children !== g.children && h(A, g.children);
    } else !P && x == null && M(A, I, B, b, _);
    ((J = B.onVnodeUpdated) || O) && je(() => {
      J && ft(J, b, g, p), O && Qt(g, p, b, "updated");
    }, k);
  }, xe = (p, g, b, k, _, w, P) => {
    for (let A = 0; A < g.length; A++) {
      const T = p[A], x = g[A], O = T.el || Pn(T), I = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        O && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (T.type === fe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !wn(T, x) || // - In the case of a component, it could contain anything.
        T.shapeFlag & 198) ? m(O) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      E(
        T,
        x,
        I,
        null,
        k,
        _,
        w,
        P,
        !0
      );
    }
  }, M = (p, g, b, k, _) => {
    if (g !== b) {
      if (g !== pe)
        for (const w in g)
          !On(w) && !(w in b) && i(
            p,
            w,
            g[w],
            null,
            _,
            k
          );
      for (const w in b) {
        if (On(w)) continue;
        const P = b[w], A = g[w];
        P !== A && w !== "value" && i(p, w, A, P, _, k);
      }
      "value" in b && i(p, "value", g.value, b.value, _);
    }
  }, V = (p, g, b, k, _, w, P, A, T) => {
    const x = g.el = p ? p.el : r(""), O = g.anchor = p ? p.anchor : r("");
    let { patchFlag: I, dynamicChildren: B, slotScopeIds: J } = g;
    J && (A = A ? A.concat(J) : J), p == null ? (o(x, b, k), o(O, b, k), X(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      b,
      O,
      _,
      w,
      P,
      A,
      T
    )) : I > 0 && I & 64 && B && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren && p.dynamicChildren.length === B.length ? (xe(
      p.dynamicChildren,
      B,
      b,
      _,
      w,
      P,
      A
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || _ && g === _.subTree) && Gs(
      p,
      g,
      !0
      /* shallow */
    )) : ie(
      p,
      g,
      b,
      O,
      _,
      w,
      P,
      A,
      T
    );
  }, oe = (p, g, b, k, _, w, P, A, T) => {
    g.slotScopeIds = A, p == null ? g.shapeFlag & 512 ? _.ctx.activate(
      g,
      b,
      k,
      P,
      T
    ) : ke(
      g,
      b,
      k,
      _,
      w,
      P,
      T
    ) : Pe(p, g, T);
  }, ke = (p, g, b, k, _, w, P) => {
    const A = p.component = Au(
      p,
      k,
      _
    );
    if (Js(p) && (A.ctx.renderer = St), Pu(A, !1, P), A.asyncDep) {
      if (_ && _.registerDep(
        A,
        Ce,
        P,
        w
      ), !p.el) {
        const T = A.subTree = bt(Qe);
        K(null, T, g, b), p.placeholder = T.el;
      }
    } else
      Ce(
        A,
        p,
        g,
        b,
        _,
        w,
        P
      );
  }, Pe = (p, g, b) => {
    const k = g.component = p.component;
    if (du(p, g, b))
      if (k.asyncDep && !k.asyncResolved) {
        g.el = p.el, g.placeholder = p.placeholder, ne(k, g, b);
        return;
      } else
        k.next = g, k.update();
    else
      g.el = p.el, g.placeholder = p.placeholder, k.vnode = g;
  }, Ce = (p, g, b, k, _, w, P) => {
    const A = () => {
      if (p.isMounted) {
        let { next: I, bu: B, u: J, parent: te, vnode: re } = p;
        {
          const we = rr(p);
          if (we) {
            I && (I.el = re.el, ne(p, I, P)), we.asyncDep.then(() => {
              const Je = () => {
                p.job.flags & 8 || (_ && _.pendingBranch ? je(Je, _) : x());
              };
              Je.flags = 48, je(Je, _);
            });
            return;
          }
        }
        let se = I, he;
        en(p, !1), I ? (I.el = re.el, ne(p, I, P)) : I = re, B && vo(B), (he = I.props && I.props.onVnodeBeforeUpdate) && ft(he, te, I, re), en(p, !0);
        const Se = Ai(p), Ee = p.subTree;
        p.subTree = Se, E(
          Ee,
          Se,
          // parent may have changed if it's in a teleport. a root that is a
          // pending async component only has its placeholder comment
          m(
            Ee.el || Pn(Ee)
          ),
          // anchor may have changed if it's in a fragment
          Zt(Ee),
          p,
          _,
          w
        ), I.el = Se.el, se === null && hu(p, Se.el), J && je(J, _), (he = I.props && I.props.onVnodeUpdated) && je(
          () => ft(he, te, I, re),
          _
        );
      } else {
        let I;
        const { el: B, props: J } = g, { bm: te, m: re, parent: se, root: he, type: Se } = p, Ee = cn(g);
        en(p, !1), te && vo(te), !Ee && (I = J && J.onVnodeBeforeMount) && ft(I, se, g), en(p, !0);
        {
          he.ce && he.ce._hasShadowRoot() && he.ce._injectChildStyle(
            Se,
            p.parent ? p.parent.type : void 0
          );
          const we = p.subTree = Ai(p);
          E(
            null,
            we,
            b,
            k,
            p,
            _,
            w
          ), g.el = we.el;
        }
        if (re && je(re, _), !Ee && (I = J && J.onVnodeMounted)) {
          const we = g;
          je(
            () => ft(I, se, we),
            _
          );
        }
        (g.shapeFlag & 256 || se && cn(se.vnode) && se.vnode.shapeFlag & 256) && p.a && je(p.a, _), p.isMounted = !0, g = b = k = null;
      }
    };
    p.scope.on();
    const T = p.effect = new hl(A);
    p.scope.off();
    const x = p.update = T.run.bind(T), O = p.job = T.runIfDirty.bind(T);
    O.i = p, O.id = p.uid, T.scheduler = () => zs(O), en(p, !0), x();
  }, ne = (p, g, b) => {
    g.component = p;
    const k = p.vnode.props;
    p.vnode = g, p.next = null, gu(p, g.props, k, b), bu(p, g.children, b), wt(), Pl(p), xt();
  }, ie = (p, g, b, k, _, w, P, A, T = !1) => {
    const x = p && p.children, O = p ? p.shapeFlag : 0, I = g.children, { patchFlag: B, shapeFlag: J } = g;
    if (B > 0) {
      if (B & 128) {
        jt(
          x,
          I,
          b,
          k,
          _,
          w,
          P,
          A,
          T
        );
        return;
      } else if (B & 256) {
        et(
          x,
          I,
          b,
          k,
          _,
          w,
          P,
          A,
          T
        );
        return;
      }
    }
    J & 8 ? (O & 16 && Xt(x, _, w), I !== x && h(b, I)) : O & 16 ? J & 16 ? jt(
      x,
      I,
      b,
      k,
      _,
      w,
      P,
      A,
      T
    ) : Xt(x, _, w, !0) : (O & 8 && h(b, ""), J & 16 && X(
      I,
      b,
      k,
      _,
      w,
      P,
      A,
      T
    ));
  }, et = (p, g, b, k, _, w, P, A, T) => {
    p = p || on, g = g || on;
    const x = p.length, O = g.length, I = Math.min(x, O);
    let B;
    for (B = 0; B < I; B++) {
      const J = g[B] = T ? Et(g[B]) : pt(g[B]);
      E(
        p[B],
        J,
        b,
        null,
        _,
        w,
        P,
        A,
        T
      );
    }
    x > O ? Xt(
      p,
      _,
      w,
      !0,
      !1,
      I
    ) : X(
      g,
      b,
      k,
      _,
      w,
      P,
      A,
      T,
      I
    );
  }, jt = (p, g, b, k, _, w, P, A, T) => {
    let x = 0;
    const O = g.length;
    let I = p.length - 1, B = O - 1;
    for (; x <= I && x <= B; ) {
      const J = p[x], te = g[x] = T ? Et(g[x]) : pt(g[x]);
      if (wn(J, te))
        E(
          J,
          te,
          b,
          null,
          _,
          w,
          P,
          A,
          T
        );
      else
        break;
      x++;
    }
    for (; x <= I && x <= B; ) {
      const J = p[I], te = g[B] = T ? Et(g[B]) : pt(g[B]);
      if (wn(J, te))
        E(
          J,
          te,
          b,
          null,
          _,
          w,
          P,
          A,
          T
        );
      else
        break;
      I--, B--;
    }
    if (x > I) {
      if (x <= B) {
        const J = B + 1, te = J < O ? g[J].el : k;
        for (; x <= B; )
          E(
            null,
            g[x] = T ? Et(g[x]) : pt(g[x]),
            b,
            te,
            _,
            w,
            P,
            A,
            T
          ), x++;
      }
    } else if (x > B)
      for (; x <= I; )
        He(p[x], _, w, !0), x++;
    else {
      const J = x, te = x, re = /* @__PURE__ */ new Map();
      for (x = te; x <= B; x++) {
        const Le = g[x] = T ? Et(g[x]) : pt(g[x]);
        Le.key != null && re.set(Le.key, x);
      }
      let se, he = 0;
      const Se = B - te + 1;
      let Ee = !1, we = 0;
      const Je = new Array(Se);
      for (x = 0; x < Se; x++) Je[x] = 0;
      for (x = J; x <= I; x++) {
        const Le = p[x];
        if (he >= Se) {
          He(Le, _, w, !0);
          continue;
        }
        let qe;
        if (Le.key != null)
          qe = re.get(Le.key);
        else
          for (se = te; se <= B; se++)
            if (Je[se - te] === 0 && wn(Le, g[se])) {
              qe = se;
              break;
            }
        qe === void 0 ? He(Le, _, w, !0) : (Je[qe - te] = x + 1, qe >= we ? we = qe : Ee = !0, E(
          Le,
          g[qe],
          b,
          null,
          _,
          w,
          P,
          A,
          T
        ), he++);
      }
      const Yn = Ee ? Cu(Je) : on;
      for (se = Yn.length - 1, x = Se - 1; x >= 0; x--) {
        const Le = te + x, qe = g[Le], Gn = g[Le + 1], me = Le + 1 < O ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Gn.el || Pn(Gn)
        ) : k;
        Je[x] === 0 ? E(
          null,
          qe,
          b,
          me,
          _,
          w,
          P,
          A,
          T
        ) : Ee && (se < 0 || x !== Yn[se] ? Ct(qe, b, me, 2) : se--);
      }
    }
  }, Ct = (p, g, b, k, _ = null) => {
    const { el: w, type: P, transition: A, children: T, shapeFlag: x } = p;
    if (x & 6) {
      Ct(p.component.subTree, g, b, k);
      return;
    }
    if (x & 128) {
      p.suspense.move(g, b, k);
      return;
    }
    if (x & 64) {
      P.move(p, g, b, St);
      return;
    }
    if (P === fe) {
      o(w, g, b);
      for (let I = 0; I < T.length; I++)
        Ct(T[I], g, b, k);
      o(p.anchor, g, b);
      return;
    }
    if (P === us) {
      U(p, g, b);
      return;
    }
    if (k !== 2 && x & 1 && A)
      if (k === 0)
        A.persisted && !w[ls] ? o(w, g, b) : (A.beforeEnter(w), o(w, g, b), je(() => A.enter(w), _));
      else {
        const { leave: I, delayLeave: B, afterLeave: J } = A, te = () => {
          p.ctx.isUnmounted ? s(w) : o(w, g, b);
        }, re = () => {
          const se = w._isLeaving || !!w[ls];
          w._isLeaving && w[ls](
            !0
            /* cancelled */
          ), A.persisted && !se ? te() : I(w, () => {
            te(), J && J();
          });
        };
        B ? B(w, te, re) : re();
      }
    else
      o(w, g, b);
  }, He = (p, g, b, k = !1, _ = !1) => {
    const {
      type: w,
      props: P,
      ref: A,
      children: T,
      dynamicChildren: x,
      shapeFlag: O,
      patchFlag: I,
      dirs: B,
      cacheIndex: J,
      memo: te
    } = p;
    if ((I === -2 || x && x.hasOnce) && (_ = !1), A != null && (wt(), An(A, null, b, p, !0), xt()), J != null && (!p.ctx || p.ctx === g) && (g.renderCache[J] = void 0), O & 256 && g.ctx.deactivate(p))
      return;
    const re = O & 1 && B, se = !cn(p);
    let he;
    if (se && (he = P && P.onVnodeBeforeUnmount) && ft(he, g, p), O & 6)
      Ho(p.component, b, k);
    else {
      if (O & 128) {
        p.suspense.unmount(b, k);
        return;
      }
      re && Qt(p, null, g, "beforeUnmount"), O & 64 ? p.type.remove(
        p,
        g,
        b,
        St,
        k
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== fe || I > 0 && I & 64) ? Xt(
        x,
        g,
        b,
        !1,
        !0
      ) : (w === fe && I & 384 || !_ && O & 16) && Xt(T, g, b), k && pn(p);
    }
    const Se = te != null && J == null;
    (se && (he = P && P.onVnodeUnmounted) || re || Se) && je(() => {
      he && ft(he, g, p), re && Qt(p, null, g, "unmounted"), Se && (p.el = null);
    }, b);
  }, pn = (p) => {
    const { type: g, el: b, anchor: k, transition: _ } = p, w = g === fe;
    if (w && !_) {
      Gt(b, k);
      return;
    }
    if (g === us) {
      j(p), _ && !_.persisted && _.afterLeave && _.afterLeave();
      return;
    }
    const P = w ? Cs(p) : p, A = () => {
      w ? m(b) && Gt(b, k) : s(b), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (P && P.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: T, delayLeave: x } = _, O = P.el, I = () => T(O, A);
      x ? x(O, A, I) : I();
    } else
      A();
  }, Gt = (p, g) => {
    let b;
    for (; p !== g; )
      b = y(p), s(p), p = b;
    s(g);
  }, Ho = (p, g, b) => {
    const { bum: k, scope: _, job: w, subTree: P, um: A, m: T, a: x } = p;
    $i(T), $i(x), k && vo(k), _.stop(), w ? (w.flags |= 8, He(P, p, g, b)) : P && (P.transition = p.vnode.transition, He(P, p, g, b)), A && je(A, g);
    const O = () => {
      p.isUnmounted = !0;
    };
    O.flags = 16, je(O, g);
  }, Xt = (p, g, b, k = !1, _ = !1, w = 0) => {
    for (let P = w; P < p.length; P++)
      He(p[P], g, b, k, _);
  }, Zt = (p) => {
    if (p.shapeFlag & 6)
      return Zt(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const g = y(p.anchor || p.el), b = g && g[Ll];
    return b ? y(b) : g;
  }, qn = (p, g, b) => {
    const k = p && g._vnode ? void 0 : p && p.component ? p.component.uid : Tu();
    Aa(() => {
      p == null ? g._vnode && He(g._vnode, null, null, !0) : E(
        g._vnode || null,
        p,
        g,
        null,
        null,
        null,
        b
      ), g._vnode = p;
    }, k);
  }, St = {
    p: E,
    um: He,
    m: Ct,
    r: pn,
    mt: ke,
    mc: X,
    pc: ie,
    pbc: xe,
    n: Zt,
    o: e
  };
  return {
    render: qn,
    hydrate: void 0,
    createApp: lu(qn)
  };
}
function as({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function en({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function _u(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Gs(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (W(o) && W(s))
    for (let i = 0; i < o.length; i++) {
      const l = o[i];
      let r = s[i];
      r.shapeFlag & 1 && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && (r = s[i] = Et(s[i]), r.el = l.el), !n && r.patchFlag !== -2 && Gs(l, r)), r.type === Lo && (r.patchFlag === -1 && (r = s[i] = Et(r)), r.el = l.el), r.type === Qe && !r.el && (r.el = l.el);
    }
}
function Cu(e) {
  const t = e.slice(), n = [0];
  let o, s, i, l, r;
  const a = e.length;
  for (o = 0; o < a; o++) {
    const d = e[o];
    if (d !== 0) {
      if (s = n[n.length - 1], e[s] < d) {
        t[o] = s, n.push(o);
        continue;
      }
      for (i = 0, l = n.length - 1; i < l; )
        r = i + l >> 1, e[n[r]] < d ? i = r + 1 : l = r;
      d < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), n[i] = o);
    }
  }
  for (i = n.length, l = n[i - 1]; i-- > 0; )
    n[i] = l, l = t[l];
  return n;
}
function rr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : rr(t);
}
function $i(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Pn(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  if (t)
    return Pn(t.subTree);
  const n = e.suspense;
  return n && n.activeBranch ? Pn(n.activeBranch) : null;
}
const ar = (e) => e.__isSuspense, Su = /* @__PURE__ */ Symbol("_deferredEnter");
function Mu(e, t) {
  t && t.pendingBranch ? W(e) ? t.effects.push(...e) : t.effects.push(e) : Ta(e);
}
const fe = /* @__PURE__ */ Symbol.for("v-fgt"), Lo = /* @__PURE__ */ Symbol.for("v-txt"), Qe = /* @__PURE__ */ Symbol.for("v-cmt"), us = /* @__PURE__ */ Symbol.for("v-stc"), Pt = [];
let ze = null;
function Y(e = !1) {
  Pt.push(ze = e ? null : []);
}
function Xs() {
  Pt.pop(), ze = Pt[Pt.length - 1] || null;
}
let Ln = 1;
function Ri(e, t = !1) {
  Ln += e, e < 0 && ze && t && (ze.hasOnce = !0);
}
function ur(e) {
  return e.dynamicChildren = Ln > 0 ? ze || on : null, Xs(), Ln > 0 && ze && ze.push(e), e;
}
function Q(e, t, n, o, s, i) {
  return ur(
    v(
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
function Bn(e, t, n, o, s) {
  return ur(
    bt(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function Bo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function wn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const cr = ({ key: e }) => e ?? null, bo = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ye(e) || /* @__PURE__ */ Me(e) || G(e) ? { i: De, r: e, k: t, f: !!n } : e : null);
function v(e, t = null, n = null, o = 0, s = null, i = e === fe ? 0 : 1, l = !1, r = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && cr(t),
    ref: t && bo(t),
    scopeId: Il,
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
    ctx: De
  };
  return r ? (Mo(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= ye(n) ? 8 : 16), Ln > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && ze.push(a), a;
}
const bt = Ou;
function Ou(e, t = null, n = null, o = 0, s = null, i = !1) {
  if ((!e || e === Xa) && (e = Qe), Bo(e)) {
    const r = dn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Mo(r, n), Ln > 0 && !i && ze && (r.shapeFlag & 6 ? ze[ze.indexOf(e)] = r : ze.push(r)), r.patchFlag = -2, r;
  }
  if (ju(e) && (e = e.__vccOpts), t) {
    t = ku(t);
    let { class: r, style: a } = t;
    r && !ye(r) && (t.class = nt(r)), de(a) && (/* @__PURE__ */ Ws(a) && !W(a) && (a = Oe({}, a)), t.style = Vt(a));
  }
  const l = ye(e) ? 1 : ar(e) ? 128 : No(e) ? 64 : de(e) ? 4 : G(e) ? 2 : 0;
  return v(
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
function ku(e) {
  return e ? /* @__PURE__ */ Ws(e) ? Oe({}, e) : tr(e) ? Oe({}, e[pr] || e) : e : null;
}
function dn(e, t, n = !1, o = !1) {
  const { props: s, ref: i, patchFlag: l, children: r, transition: a } = e, d = t ? Es(s || {}, t) : s, h = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && cr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? W(i) ? i.concat(bo(t)) : [i, bo(t)] : bo(t)
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
    patchFlag: t && e.type !== fe ? l === -1 ? 16 : l | 16 : l,
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
    ssContent: e.ssContent && dn(e.ssContent),
    ssFallback: e.ssFallback && dn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return a && o && Tn(
    h,
    a.clone(h)
  ), h;
}
function _e(e = " ", t = 0) {
  return bt(Lo, null, e, t);
}
function Ae(e = "", t = !1) {
  return t ? (Y(), Bn(Qe, null, e)) : bt(Qe, null, e);
}
function pt(e) {
  return e == null || typeof e == "boolean" ? bt(Qe) : W(e) ? bt(
    fe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Bo(e) ? Et(e) : bt(Lo, null, String(e));
}
function Et(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : dn(e);
}
function Mo(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (W(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Mo(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !tr(t) ? t._ctx = De : s === 3 && De && (De.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (G(t)) {
    if (o & 65) {
      Mo(e, { default: t });
      return;
    }
    t = { default: t, _ctx: De }, n = 32;
  } else
    t = String(t), o & 64 ? (n = 16, t = [_e(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Es(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = nt([t.class, o.class]));
      else if (s === "style")
        t.style = Vt([t.style, o.style]);
      else if (Fo(s)) {
        const i = t[s], l = o[s];
        l && i !== l && !(W(i) && i.includes(l)) ? t[s] = i ? [].concat(i, l) : l : l == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Po(s) && (t[s] = l);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function ft(e, t, n, o = null) {
  at(e, t, 7, [
    n,
    o
  ]);
}
const Eu = /* @__PURE__ */ Yl();
let fr = 0;
function Tu() {
  return fr;
}
function Au(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || Eu, i = {
    uid: fr++,
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
    scope: new ea(
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
    propsOptions: or(o, s),
    emitsOptions: Gl(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: pe,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: pe,
    data: pe,
    props: pe,
    attrs: pe,
    slots: pe,
    refs: pe,
    setupState: pe,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = au.bind(null, i), e.ce && e.ce(i), i;
}
let Ve = null;
const Fu = () => Ve || De;
let Oo, Kn;
{
  const e = Ro(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (i) => {
      s.length > 1 ? s.forEach((l) => l(i)) : s[0](i);
    };
  };
  Oo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ve = n
  ), Kn = t(
    "__VUE_SSR_SETTERS__",
    (n) => Vn = n
  );
}
const Jn = (e) => {
  const t = Ve;
  return Oo(e), e.scope.on(), () => {
    e.scope.off(), Oo(t);
  };
}, Ii = () => {
  Ve && Ve.scope.off(), Oo(null);
};
function dr(e) {
  return e.vnode.shapeFlag & 4;
}
let Vn = !1;
function Pu(e, t = !1, n = !1) {
  t && Kn(t);
  const { props: o, children: s } = e.vnode, i = dr(e);
  pu(e, o, i, t), yu(e, s, n || t);
  const l = i ? $u(e, t) : void 0;
  return t && Kn(!1), l;
}
function $u(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Qa);
  const { setup: o } = n;
  if (o) {
    wt();
    const s = e.setupContext = o.length > 1 ? Iu(e) : null, i = Jn(e), l = zn(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), r = il(l);
    if (xt(), i(), (r || e.sp) && !cn(e) && Vl(e), r) {
      if (l.then(Ii, Ii), t)
        return l.then((a) => {
          Kn(!0);
          try {
            ji(e, a, t);
          } finally {
            Kn(!1);
          }
        }).catch((a) => {
          jo(a, e, 0, void 0, !0), e.ssrRender = (d, h) => h("<!---->");
        });
      e.asyncDep = l;
    } else
      ji(e, l);
  } else
    hr(e);
}
function ji(e, t, n) {
  G(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : de(t) && (e.setupState = Tl(t)), hr(e);
}
function hr(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || yt);
  {
    const s = Jn(e);
    wt();
    try {
      eu(e);
    } finally {
      xt(), s();
    }
  }
}
const pr = /* @__PURE__ */ Symbol(), Ru = {
  get(e, t) {
    return Ne(e, "get", ""), t === pr ? e : e[t];
  }
};
function Iu(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ru),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ko(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Tl(ba(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Fn)
        return Fn[n](e);
    },
    has(t, n) {
      return n in t || n in Fn;
    }
  })) : e.proxy;
}
function ju(e) {
  return G(e) && "__vccOpts" in e;
}
const Ue = (e, t) => /* @__PURE__ */ Sa(e, t, Vn), Nu = "3.5.45";
let Ts;
const Ni = typeof window < "u" && window.trustedTypes;
if (Ni)
  try {
    Ts = /* @__PURE__ */ Ni.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const gr = Ts ? (e) => Ts.createHTML(e) : (e) => e, Du = "http://www.w3.org/2000/svg", Lu = "http://www.w3.org/1998/Math/MathML", kt = typeof document < "u" ? document : null, Di = kt && /* @__PURE__ */ kt.createElement("template"), Bu = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? kt.createElementNS(Du, e) : t === "mathml" ? kt.createElementNS(Lu, e) : n ? kt.createElement(e, { is: n }) : kt.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => kt.createTextNode(e),
  createComment: (e) => kt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => kt.querySelector(e),
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
      Di.innerHTML = gr(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const r = Di.content;
      if (o === "svg" || o === "mathml") {
        const a = r.firstChild;
        for (; a.firstChild; )
          r.appendChild(a.firstChild);
        r.removeChild(a);
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
}, Ku = /* @__PURE__ */ Symbol("_vtc");
function Vu(e, t, n) {
  const o = e[Ku];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ko = /* @__PURE__ */ Symbol("_vod"), mr = /* @__PURE__ */ Symbol("_vsh"), Li = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[ko] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : xn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: o }) {
    !t != !n && (o ? t ? (o.beforeEnter(e), xn(e, !0), o.enter(e)) : o.leave(e, () => {
      xn(e, !1);
    }) : xn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    xn(e, t);
  }
};
function xn(e, t) {
  e.style.display = t ? e[ko] : "none", e[mr] = !t;
}
const Hu = /* @__PURE__ */ Symbol(""), Uu = /(?:^|;)\s*display\s*:/;
function Wu(e, t, n) {
  const o = e.style, s = ye(n);
  let i = !1;
  if (n && !s) {
    if (t)
      if (ye(t))
        for (const l of t.split(";")) {
          const r = l.slice(0, l.indexOf(":")).trim();
          n[r] == null && Mn(o, r, "");
        }
      else
        for (const l in t)
          n[l] == null && Mn(o, l, "");
    for (const l in n) {
      l === "display" && (i = !0);
      const r = n[l];
      r != null ? Ju(
        e,
        l,
        !ye(t) && t ? t[l] : void 0,
        r
      ) || Mn(o, l, r) : Mn(o, l, "");
    }
  } else if (s) {
    if (t !== n) {
      const l = o[Hu];
      l && (n += ";" + l), o.cssText = n, i = Uu.test(n);
    }
  } else t && e.removeAttribute("style");
  ko in e && ((!s || t !== n) && (e[ko] = i ? o.display : ""), e[mr] && (o.display = "none"));
}
const fo = /\s*!important$/;
function Mn(e, t, n) {
  if (W(n))
    n.forEach((o) => Mn(e, t, o));
  else if (n == null && (n = ""), t.startsWith("--"))
    fo.test(n) ? e.setProperty(t, n.replace(fo, ""), "important") : e.setProperty(t, n);
  else {
    const o = zu(e, t);
    fo.test(n) ? e.setProperty(
      Yt(o),
      n.replace(fo, ""),
      "important"
    ) : e[o] = n;
  }
}
const Bi = ["Webkit", "Moz", "ms"], cs = {};
function zu(e, t) {
  const n = cs[t];
  if (n)
    return n;
  let o = it(t);
  if (o !== "filter" && o in e)
    return cs[t] = o;
  o = al(o);
  for (let s = 0; s < Bi.length; s++) {
    const i = Bi[s] + o;
    if (i in e)
      return cs[t] = i;
  }
  return t;
}
function Ju(e, t, n, o) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ye(o) && n === o;
}
const Ki = "http://www.w3.org/1999/xlink";
function Vi(e, t, n, o, s, i = Xr(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ki, t.slice(6, t.length)) : e.setAttributeNS(Ki, t, n) : n == null || i && !cl(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : rt(n) ? String(n) : n
  );
}
function Hi(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? gr(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const r = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (r !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const r = typeof e[t];
    r === "boolean" ? n = cl(n) : n == null && r === "string" ? (n = "", l = !0) : r === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(s || t);
}
function Ut(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function qu(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Ui = /* @__PURE__ */ Symbol("_vei");
function Yu(e, t, n, o, s = null) {
  const i = e[Ui] || (e[Ui] = {}), l = i[t];
  if (o && l)
    l.value = o;
  else {
    const [r, a] = Zu(t);
    if (o) {
      const d = i[t] = tc(
        o,
        s
      );
      Ut(e, r, d, a);
    } else l && (qu(e, r, l, a), i[t] = void 0);
  }
}
const Gu = /(Once|Passive|Capture)$/, Xu = /^on:?(?:Once|Passive|Capture)$/;
function Zu(e) {
  let t, n;
  for (; (n = e.match(Gu)) && !Xu.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Yt(e.slice(2)), t];
}
let fs = 0;
const Qu = /* @__PURE__ */ Promise.resolve(), ec = () => fs || (Qu.then(() => fs = 0), fs = Date.now());
function tc(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    const s = n.value;
    if (W(s)) {
      const i = o.stopImmediatePropagation;
      o.stopImmediatePropagation = () => {
        i.call(o), o._stopped = !0;
      };
      const l = s.slice(), r = [o];
      for (let a = 0; a < l.length && !o._stopped; a++) {
        const d = l[a];
        d && at(
          d,
          t,
          5,
          r
        );
      }
    } else
      at(
        s,
        t,
        5,
        [o]
      );
  };
  return n.value = e, n.attached = ec(), n;
}
const Wi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, nc = (e, t, n, o, s, i) => {
  const l = s === "svg";
  t === "class" ? Vu(e, o, l) : t === "style" ? Wu(e, n, o) : Fo(t) ? Po(t) || Yu(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : oc(e, t, o, l)) ? (Hi(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Vi(e, t, o, l, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (sc(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ye(o))) ? Hi(e, it(t), o, i, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Vi(e, t, o, l));
};
function oc(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Wi(t) && G(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return Wi(t) && ye(n) ? !1 : t in e;
}
function sc(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const o = it(t);
  return Array.isArray(n) ? n.some((s) => it(s) === o) : Object.keys(n).some((s) => it(s) === o);
}
const hn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return W(t) ? (n) => vo(t, n) : t;
};
function ic(e) {
  e.target.composing = !0;
}
function zi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const mt = /* @__PURE__ */ Symbol("_assign"), ho = /* @__PURE__ */ Symbol("_initialValue");
function ds(e, t, n) {
  return t && (e = e.trim()), n && (e = Wn(e)), e;
}
const hs = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, s) {
    e.parentNode && (e.type === "text" ? e[ho] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[ho] = e.defaultValue.replace(/\r\n?/g, `
`))), e[mt] = hn(s);
    const i = o || s.props && s.props.type === "number";
    Ut(e, t ? "change" : "input", (l) => {
      l.target.composing || e[mt](ds(e.value, n, i));
    }), (n || i) && Ut(e, "change", () => {
      e.value = ds(e.value, n, i);
    }), t || (Ut(e, "compositionstart", ic), Ut(e, "compositionend", zi), Ut(e, "change", zi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: o } }) {
    const s = t ?? "", i = e[ho];
    delete e[ho], i !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== i ? e[mt](ds(e.value, n, o)) : e.value = s;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: o, trim: s, number: i } }, l) {
    if (e[mt] = hn(l), e.composing) return;
    const r = (i || e.type === "number") && !/^0\d/.test(e.value) ? Wn(e.value) : e.value, a = t ?? "";
    if (r === a)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (o && t === n || s && e.value.trim() === a) || (e.value = a);
  }
}, po = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[mt] = hn(n), Ut(e, "change", () => {
      const o = e._modelValue, s = Hn(e), i = e.checked, l = e[mt];
      if (W(o)) {
        const r = Ns(o, s), a = r !== -1;
        if (i && !a)
          l(o.concat(s));
        else if (!i && a) {
          const d = [...o];
          d.splice(r, 1), l(d);
        }
      } else if ($t(o)) {
        const r = new Set(o);
        i ? r.add(s) : r.delete(s), l(r);
      } else
        l(vr(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Ji,
  beforeUpdate(e, t, n) {
    e[mt] = hn(n), Ji(e, t, n);
  }
};
function Ji(e, { value: t, oldValue: n }, o) {
  e._modelValue = t;
  let s;
  if (W(t))
    s = Ns(t, o.props.value) > -1;
  else if ($t(t))
    s = t.has(o.props.value);
  else {
    if (t === n) return;
    s = Rt(t, vr(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
const lc = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, o) {
    e._modelValue = t, Ut(e, "change", () => {
      const s = Array.prototype.filter.call(e.options, (a) => a.selected).map(
        (a) => n ? Wn(Hn(a)) : Hn(a)
      ), i = e.multiple, l = i ? $t(e._modelValue) ? new Set(s) : s : s[0], r = e._pendingValue = [
        i,
        i ? W(l) ? s.slice() : s : l
      ];
      try {
        e[mt](l);
      } finally {
        Ht(() => {
          e._pendingValue === r && (e._pendingValue = void 0);
        });
      }
    }), e[mt] = hn(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t, modifiers: { number: n } }) {
    qi(e, t, n);
  },
  beforeUpdate(e, { value: t }, n) {
    e._modelValue = t, e[mt] = hn(n);
  },
  updated(e, { value: t, modifiers: { number: n } }) {
    const o = e._pendingValue;
    e._pendingValue = void 0, (!o || o[0] !== e.multiple || !rc(t, o[1], o[0])) && qi(e, t, n);
  }
};
function rc(e, t, n) {
  if (!n || W(e)) return Rt(e, t);
  if ($t(e)) {
    if (e.size !== t.length) return !1;
    for (const o of t)
      if (!e.has(o)) return !1;
    return !0;
  }
  return !1;
}
function qi(e, t, n = !1) {
  const o = e.multiple, s = W(t);
  if (!(o && !s && !$t(t))) {
    for (let i = 0, l = e.options.length; i < l; i++) {
      const r = e.options[i], a = Hn(r);
      if (o)
        if (s) {
          const d = typeof a;
          d === "string" || d === "number" ? r.selected = t.some((h) => String(h) === String(a)) : r.selected = Ns(t, a) > -1;
        } else
          r.selected = t.has(a) || n && typeof a == "string" && t.has(Wn(a));
      else if (Rt(Hn(r), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !o && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Hn(e) {
  return "_value" in e ? e._value : e.value;
}
function vr(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const ac = ["ctrl", "shift", "alt", "meta"], uc = {
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
  exact: (e, t) => ac.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ie = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = ((s, ...i) => {
    for (let l = 0; l < t.length; l++) {
      const r = uc[t[l]];
      if (r && r(s, t)) return;
    }
    return e(s, ...i);
  }));
}, cc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, go = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = ((s) => {
    if (!("key" in s))
      return;
    const i = Yt(s.key);
    if (t.some(
      (l) => l === i || cc[l] === i
    ))
      return e(s);
  }));
}, fc = /* @__PURE__ */ Oe({ patchProp: nc }, Bu);
let Yi;
function dc() {
  return Yi || (Yi = wu(fc));
}
const hc = ((...e) => {
  const t = dc().createApp(...e), { mount: n } = t;
  return t.mount = (o) => {
    const s = gc(o);
    if (!s) return;
    const i = t._component;
    !G(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const l = n(s, !1, pc(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), l;
  }, t;
});
function pc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function gc(e) {
  return ye(e) ? document.querySelector(e) : e;
}
const mc = /* @__PURE__ */ Kl({
  __name: "ModalMask",
  props: {
    open: { type: Boolean },
    topLayer: { type: Boolean }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t;
    return (o, s) => (Y(), Bn(Da, { to: "body" }, [
      e.open ? (Y(), Q(
        "div",
        {
          key: 0,
          class: "moss-modal",
          onMousedown: s[0] || (s[0] = Ie((i) => n("close"), ["self"]))
        },
        [
          Za(o.$slots, "default", {}, void 0)
        ],
        32
        /* NEED_HYDRATION */
      )) : Ae("v-if", !0)
    ]));
  }
}), yr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, vc = /* @__PURE__ */ yr(mc, [["__scopeId", "data-v-32f7ef2b"]]);
function yc(e, t, n, o) {
  const s = /* @__PURE__ */ ce([]), i = /* @__PURE__ */ ce([]), l = /* @__PURE__ */ ce(""), r = () => JSON.stringify(e.value);
  function a(F) {
    F !== r() && (s.value.push(F), s.value.length > 100 && s.value.shift(), i.value = [], t.value = "");
  }
  function d(F, K = !1) {
    K || n();
    const N = r();
    F(), a(N);
  }
  function h(F) {
    e.value = JSON.parse(F), o();
  }
  function m() {
    n();
    const F = s.value.pop();
    F && (i.value.push(r()), h(F));
  }
  function y() {
    n();
    const F = i.value.pop();
    F && (s.value.push(r()), h(F));
  }
  let S = null;
  function R(F, K) {
    const N = r(), U = S?.key === F && N === S.after && Date.now() - S.time < 750;
    d(K, !0), U && N !== r() && s.value.pop(), S = { key: F, time: Date.now(), after: r() };
  }
  function E() {
    S = null;
  }
  return { undoStack: s, redoStack: i, baseline: l, snapshot: r, remember: a, edit: d, restore: h, undo: m, redo: y, inputEdit: R, resetInputGroup: E };
}
const br = "moss-manga-layouts", wr = "bbi-manga-layouts", xr = 1;
function bc(e) {
  const t = e && typeof e == "object" && !Array.isArray(e) ? e : void 0;
  if (t?.format !== void 0 && ![br, wr].includes(t.format)) throw new Error("不支持的版式文件格式。");
  if (t?.format !== void 0 && t.version !== xr) throw new Error("不支持的版式文件版本，请更新插件。");
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
function Eo(e) {
  return Array.isArray(e) ? e.map(Eo) : e && typeof e == "object" ? Object.fromEntries(Object.keys(e).sort().map((t) => [t, Eo(e[t])])) : e;
}
function Zs(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) throw new Error("版式必须是对象。");
  const t = { ...e }, n = t.canvas;
  if (n !== void 0 && (!n || typeof n != "object" || Array.isArray(n))) throw new Error("版式需要有效画布。");
  const o = n ? n.width > n.height ? "landscape" : "portrait" : t.portrait ? "portrait" : "landscape", s = n ?? (o === "portrait" ? { width: 1088, height: 1920 } : { width: 1920, height: 1088 }), i = t.panels ?? t[o];
  if (!s || !Number.isInteger(s.width) || !Number.isInteger(s.height)) throw new Error("版式需要有效画布。");
  if (!Array.isArray(i) || !i.length) throw new Error("版式缺少分格。");
  if (t.panels && t[o] && JSON.stringify(Eo(t.panels)) !== JSON.stringify(Eo(t[o]))) throw new Error("panels 与同方向分格不一致，请明确保留哪一份。");
  return { ...t, canvas: { ...s }, panels: i };
}
function _r(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) throw new Error("版式必须是对象。");
  if (e.panels === void 0) return { ...e };
  if (!e.canvas) throw new Error("panels 格式需要 canvas.width 与 canvas.height。");
  const t = Zs(e), n = t.canvas.width > t.canvas.height ? "landscape" : "portrait";
  return t[n] = t.panels, delete t.panels, t;
}
function Gi(e, t = {}) {
  return JSON.stringify({
    format: t.legacy ? wr : br,
    version: xr,
    layouts: t.legacy ? e.map(_r) : e.map(Zs),
    deleted: t.deleted ?? [],
    order: t.order ?? e.map((n) => n.id)
  }, null, 2);
}
function Ft(e) {
  return e.replace(/_[1-9]\d*$/, "");
}
function $n(e, t) {
  return typeof e == "number" && typeof t == "number" && e > t ? "landscape" : "portrait";
}
function As(e) {
  return e === "portrait" ? { width: 1088, height: 1920 } : { width: 1920, height: 1088 };
}
function Cr(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch (s) {
    throw new Error(`JSON 解析失败:${s instanceof Error ? s.message : String(s)}`);
  }
  t = _r(t);
  const n = wc(t);
  if (!n)
    throw new Error('需要形如 {"id":"my_layout","label":"…","portrait":[{"position":"…","slots":{"F":[y1,x1,y2,x2]}}]}');
  if (!n.portrait?.length && !n.landscape?.length)
    throw new Error("portrait 与 landscape 至少要有一个方向的面板");
  const o = t;
  for (const s of ["omitFullPageFrame", "omitSmallFrames", "useBboxCorners"]) if (o[s] !== void 0 && typeof o[s] != "boolean") throw new Error(`${s} 需要布尔值。`);
  if (o.promptMode !== void 0 && !["llm", "manual"].includes(o.promptMode)) throw new Error("提示词模式需要 llm 或 manual。");
  for (const s of ["description", "promptCaption"]) if (o[s] !== void 0 && typeof o[s] != "string") throw new Error("画面描述需要字符串。");
  if (o.canvas !== void 0 && !Qs(o.canvas)) throw new Error("画布宽高必须是 64～8192 的偶数。");
  for (const s of ["portrait", "landscape"]) {
    if (o[s] === void 0) continue;
    const i = o[s], l = n.canvas ? $n(n.canvas.width, n.canvas.height) === s ? n.canvas : { width: n.canvas.height, height: n.canvas.width } : As(s);
    if (n.canvas && l.width !== l.height && $n(l.width, l.height) !== s) throw new Error("面板方向与自定义画布宽高不符。");
    const r = /* @__PURE__ */ new Set();
    if (!Array.isArray(i) || !i.length) throw new Error(`${s}:需要非空面板数组。`);
    for (const a of i) {
      const d = a, h = typeof d?.position == "string" ? d.position.trim().toLowerCase() : "";
      if (!h || r.has(h)) throw new Error(`${s}:面板位置不能为空或重复。`);
      if (r.add(h), d?.layer !== void 0 && !Number.isSafeInteger(d.layer)) throw new Error(`${s}/${h}:层级必须为安全整数。`);
      if (!d?.slots || typeof d.slots != "object" || Array.isArray(d.slots) || !Object.keys(d.slots).length)
        throw new Error(`${s}/${h}:需要槽位坐标。`);
      if (d?.locked !== void 0 && typeof d.locked != "boolean") throw new Error(`${s}/${h}:锁定状态需要布尔值。`);
      if (d?.slotContents !== void 0) {
        if (!d.slotContents || typeof d.slotContents != "object" || Array.isArray(d.slotContents)) throw new Error(`${s}/${h}:手填内容格式错误。`);
        const m = /* @__PURE__ */ new Set();
        for (const [y, S] of Object.entries(d.slotContents)) {
          const R = y.trim().toUpperCase();
          if (!d.slots[R] || m.has(R) || !Array.isArray(S) || S.some((E) => !E || !["object", "character", "text"].includes(E.label) || typeof E.caption != "string" || E.text !== void 0 && typeof E.text != "string" || E.textType !== void 0 && !["dialogue", "narration", "sfx"].includes(E.textType))) throw new Error(`${s}/${h}/${y}:手填内容或文字类型无效。`);
          m.add(R);
        }
      }
      for (const [m, y] of Object.entries(d.slots)) {
        if (Ft(m) === "X") throw new Error("X 槽位已移除，请将跨格主体放入 S 或编号主体框，并调整其实际坐标。");
        const S = Sr(y);
        if (!/^[A-Z]+(?:_[1-9]\d*)?$/.test(m) || !S || S[0] < -l.height / 2 || S[2] > l.height / 2 || S[1] < -l.width / 2 || S[3] > l.width / 2)
          throw new Error(`${s}/${h}/${m}:坐标无效或超出画布。`);
      }
      if (d.shapes !== void 0 && (!d.shapes || typeof d.shapes != "object" || Array.isArray(d.shapes))) throw new Error("shapes 需要对象。");
      for (const [m, y] of Object.entries(d.shapes ?? {}))
        if (!d.slots[m] || !ei(y) || y.some(([S, R]) => Math.abs(S) > l.width / 2 || Math.abs(R) > l.height / 2))
          throw new Error(`${s}/${h}/${m}:四边形角点无效、交叉或超出画布。`);
    }
  }
  return n;
}
function Sr(e) {
  if (!Array.isArray(e) || e.length !== 4) return null;
  const t = e;
  if (t.some((l) => !Number.isSafeInteger(l))) return null;
  const [n, o, s, i] = t;
  return n >= s || o >= i ? null : [n, o, s, i];
}
function Xi(e) {
  if (!Array.isArray(e)) return;
  const t = [];
  for (const n of e) {
    if (!n || typeof n != "object" || Array.isArray(n)) continue;
    const o = n, s = typeof o.position == "string" ? o.position.trim() : "", i = o.slots && typeof o.slots == "object" ? o.slots : null;
    if (!s || !i) continue;
    const l = {};
    for (const [h, m] of Object.entries(i)) {
      const y = Sr(m);
      y && (l[h.trim().toUpperCase()] = y);
    }
    const r = {};
    if (o.shapes && typeof o.shapes == "object")
      for (const [h, m] of Object.entries(o.shapes)) {
        const y = h.trim().toUpperCase();
        l[y] && ei(m) && (r[y] = m.map((S) => [...S]));
      }
    const a = {};
    if (o.slotNotes && typeof o.slotNotes == "object" && !Array.isArray(o.slotNotes))
      for (const [h, m] of Object.entries(o.slotNotes)) {
        const y = h.trim().toUpperCase();
        l[y] && typeof m == "string" && m.trim() && (a[y] = m.trim());
      }
    const d = {};
    if (o.slotContents && typeof o.slotContents == "object" && !Array.isArray(o.slotContents))
      for (const [h, m] of Object.entries(o.slotContents)) {
        const y = h.trim().toUpperCase();
        l[y] && Array.isArray(m) && (d[y] = JSON.parse(JSON.stringify(m)));
      }
    Object.keys(l).length && t.push({ position: s, slots: l, ...o.locked === !0 ? { locked: !0 } : {}, ...Number.isSafeInteger(o.layer) ? { layer: o.layer } : {}, ...Object.keys(r).length ? { shapes: r } : {}, ...Object.keys(a).length ? { slotNotes: a } : {}, ...Object.keys(d).length ? { slotContents: d } : {} });
  }
  return t.length ? t : void 0;
}
function wc(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, n = typeof t.id == "string" ? t.id.trim() : "";
  if (!n) return null;
  const o = Xi(t.portrait), s = Xi(t.landscape), i = typeof t.label == "string" ? t.label.trim() : void 0, l = typeof t.usage == "string" ? t.usage.trim() : void 0, r = typeof t.readingOrder == "string" ? t.readingOrder.trim() : void 0;
  if (!o && !s && !i && !l && !r) return null;
  const a = Qs(t.canvas);
  return { id: n, label: i, usage: l, readingOrder: r, portrait: o, landscape: s, ...typeof t.omitFullPageFrame == "boolean" ? { omitFullPageFrame: t.omitFullPageFrame } : {}, ...typeof t.omitSmallFrames == "boolean" ? { omitSmallFrames: t.omitSmallFrames } : {}, ...a ? { canvas: a } : {}, ...t.promptMode ? { promptMode: t.promptMode } : {}, ...typeof t.useBboxCorners == "boolean" ? { useBboxCorners: t.useBboxCorners } : {}, ...typeof t.promptCaption == "string" ? { promptCaption: t.promptCaption } : {}, ...typeof t.description == "string" ? { description: t.description } : {} };
}
function Mr(e) {
  return typeof e.description == "string" ? e.description : [...new Set([e.usage, e.promptCaption].filter((t) => typeof t == "string" && !!t.trim()).map((t) => t.trim()))].join(`

`);
}
function Qs(e) {
  if (!e || typeof e != "object") return null;
  const { width: t, height: n } = e;
  return [t, n].every((o) => Number.isInteger(o) && o >= 64 && o <= 8192 && o % 2 === 0) ? { width: t, height: n } : null;
}
function ei(e) {
  return !Array.isArray(e) || e.length !== 4 || e.some((t) => !Array.isArray(t) || t.length !== 2 || t.some((n) => typeof n != "number" || !Number.isFinite(n))) ? !1 : e.every((t, n) => {
    const o = e[(n + 1) % 4], s = e[(n + 2) % 4];
    return (o[0] - t[0]) * (s[1] - o[1]) - (o[1] - t[1]) * (s[0] - o[0]) > 0.01;
  });
}
function xc(e, t, n, o, s, i, l) {
  const r = Ue(() => t.value?.slotContents?.[o.value || "F"] ?? []), a = /* @__PURE__ */ ce(null), d = /* @__PURE__ */ ce(""), h = /* @__PURE__ */ ce();
  function m() {
    if (!t.value) return;
    const D = o.value || "F", z = ["T", "B", "TL", "TR", "BL", "BR", "ML", "MR"].includes(Ft(D)) ? "text" : ["S", "L", "R"].includes(Ft(D)) ? "character" : "object";
    i(() => {
      ((t.value.slotContents ??= {})[D] ??= []).push({ label: z, caption: "", ...z === "text" ? { text: "", textType: "dialogue" } : {} });
    }, !0);
  }
  function y(D, z, L) {
    const X = L.target.value;
    i(() => {
      Object.assign(r.value[D], { [z]: X });
    }, !0);
  }
  function S(D) {
    i(() => {
      r.value.splice(D, 1);
    }, !0);
  }
  function R(D, z) {
    const L = D + z;
    L < 0 || L >= r.value.length || i(() => {
      const [X] = r.value.splice(D, 1);
      r.value.splice(L, 0, X);
    }, !0);
  }
  function E(D, z) {
    return D.slotNotes?.[z] ?? (D.slotContents?.[z] ?? []).filter((L) => L.label !== "text" && L.caption.trim()).map((L) => L.caption).join(`
`);
  }
  function F(D, z, L) {
    const X = e.value.panels[D];
    X && l(`note:${D}:${z}`, () => {
      const le = (X.slotContents?.[z] ?? []).filter((xe) => xe.label !== "text");
      le.length === 1 && (!X.slotNotes?.[z] || X.slotNotes[z] === le[0].caption) && (le[0].caption = L), L ? (X.slotNotes ??= {})[z] = L : X.slotNotes && delete X.slotNotes[z];
    });
  }
  function K(D) {
    F(n.value, o.value || "F", D.target.value);
  }
  function N(D, z) {
    s(D, z === "F" ? "" : z), a.value = { index: D, key: z }, d.value = E(e.value.panels[D], z), Ht(() => h.value?.focus());
  }
  function U() {
    a.value && (F(a.value.index, a.value.key, d.value), a.value = null);
  }
  function j(D, z) {
    const L = E(D, z).replace(/\s+/g, " ").trim();
    return L.length > 80 ? L.slice(0, 80) + "…" : L;
  }
  return { contentItems: r, quickEdit: a, quickDraft: d, quickField: h, addContent: m, changeContent: y, removeContent: S, moveContent: R, frameDescription: E, setFrameDescription: F, changeSlotNote: K, openDescription: N, saveQuickDescription: U, previewDescription: j };
}
const vt = 24, ve = (e, t, n) => Math.max(t, Math.min(n, e));
function ps(e, t, n) {
  const o = ve(Math.round(e.x), 0, n.width), s = ve(Math.round(e.y), 0, n.height), i = ve(Math.round(t.x), 0, n.width), l = ve(Math.round(t.y), 0, n.height);
  return { x: Math.min(o, i), y: Math.min(s, l), width: Math.abs(i - o), height: Math.abs(l - s) };
}
function Zi(e, t) {
  let n = t, o = 2;
  for (; e.slots[n]; ) n = `${t}_${o++}`;
  return n;
}
function _c(e, t) {
  const n = (t.y + t.height / 2 - e.y) / e.height, o = t.x + t.width / 2 > e.x + e.width / 2;
  return t.width >= e.width * 0.7 && (n < 1 / 3 || n > 2 / 3) ? n < 1 / 3 ? "T" : "B" : (n < 1 / 3 ? "T" : n > 2 / 3 ? "B" : "M") + (o ? "R" : "L");
}
function Qi(e, t, n) {
  const o = Rn(e, t);
  return o.every(([s, i], l) => {
    const [r, a] = o[(l + 1) % o.length];
    return (r - s) * (n.y - i) - (a - i) * (n.x - s) >= -0.01;
  });
}
function st(e, t, n = vt) {
  const o = ve(Math.round(e.width), n, t.width), s = ve(Math.round(e.height), n, t.height);
  return { x: ve(Math.round(e.x), 0, t.width - o), y: ve(Math.round(e.y), 0, t.height - s), width: o, height: s };
}
function Cc(e, t) {
  const [n, o, s, i] = e.slots.F ?? e.slots.C ?? Object.values(e.slots)[0];
  return st({ x: o + t.width / 2, y: n + t.height / 2, width: i - o, height: s - n }, t);
}
function _n(e, t, n) {
  const o = { ...e, slots: {}, corners: {} };
  n?.layer !== void 0 && (o.layer = n.layer), n?.position && (o.position = n.position), n?.locked && (o.locked = !0);
  for (const [s, [i, l, r, a]] of Object.entries((n ?? Oc(e, t, "")).slots))
    s !== "F" && ln(o, s, { x: l + t.width / 2, y: i + t.height / 2, width: a - l, height: r - i });
  for (const [s, i] of Object.entries(n?.shapes ?? {})) {
    if (s !== "F" && !o.slots[s]) continue;
    const l = s === "F" ? o : Ge(o, s);
    o.corners[s] = i.map(([r, a]) => [(r + t.width / 2 - l.x) / l.width, (a + t.height / 2 - l.y) / l.height]);
  }
  return n?.slotNotes && (o.slotNotes = { ...n.slotNotes }), n?.slotContents && (o.slotContents = JSON.parse(JSON.stringify(n.slotContents))), o;
}
function Rn(e, t) {
  const n = t === "F" ? e : Ge(e, t);
  return (e.corners[t] ?? [[0, 0], [1, 0], [1, 1], [0, 1]]).map(([o, s]) => [n.x + o * n.width, n.y + s * n.height]);
}
function Sc(e, t, n, o) {
  const s = n.map(([a, d]) => [ve(Math.round(a), 0, o.width), ve(Math.round(d), 0, o.height)]);
  if (!ei(s)) return !1;
  const i = Math.min(...s.map((a) => a[0])), l = Math.min(...s.map((a) => a[1])), r = { x: i, y: l, width: Math.max(...s.map((a) => a[0])) - i, height: Math.max(...s.map((a) => a[1])) - l };
  return r.width < (t === "F" ? vt : 1) || r.height < (t === "F" ? vt : 1) ? !1 : (t === "F" ? Object.assign(e, r) : ln(e, t, r), e.corners[t] = s.map(([a, d]) => [(a - i) / r.width, (d - l) / r.height]), !0);
}
function Ge(e, t) {
  const n = e.slots[t];
  return { x: Math.round(e.x + n.x * e.width), y: Math.round(e.y + n.y * e.height), width: Math.max(1, Math.round(n.width * e.width)), height: Math.max(1, Math.round(n.height * e.height)) };
}
function ln(e, t, n) {
  e.slots[t] = { x: (n.x - e.x) / e.width, y: (n.y - e.y) / e.height, width: n.width / e.width, height: n.height / e.height };
}
function Mc(e, t, n) {
  const o = (r) => {
    const a = ve(Math.round(r.x), 0, t.width - 1), d = ve(Math.round(r.y), 0, t.height - 1);
    return [d - t.height / 2, a - t.width / 2, ve(Math.round(r.y + r.height), d + 1, t.height) - t.height / 2, ve(Math.round(r.x + r.width), a + 1, t.width) - t.width / 2];
  }, s = Object.fromEntries(Object.keys(e.corners).filter((r) => r === "F" || e.slots[r]).map((r) => [r, Rn(e, r).map(([a, d]) => [ve(Math.round(a), 0, t.width) - t.width / 2, ve(Math.round(d), 0, t.height) - t.height / 2])])), i = Object.fromEntries(Object.entries(e.slotNotes ?? {}).filter(([r, a]) => (r === "F" || e.slots[r]) && a.trim()).map(([r, a]) => [r, a.trim()])), l = Object.fromEntries(Object.entries(e.slotContents ?? {}).filter(([r, a]) => (r === "F" || e.slots[r]) && a.length).map(([r, a]) => [r, JSON.parse(JSON.stringify(a))]));
  return { position: n, ...e.locked ? { locked: !0 } : {}, ...e.layer !== void 0 ? { layer: e.layer } : {}, slots: { F: o(e), ...Object.fromEntries(Object.keys(e.slots).map((r) => [r, o(Ge(e, r))])) }, ...Object.keys(s).length ? { shapes: s } : {}, ...Object.keys(i).length ? { slotNotes: i } : {}, ...Object.keys(l).length ? { slotContents: l } : {} };
}
function Oc(e, t, n) {
  const o = st(e, t), s = (l, r, a, d) => [
    Math.round(o.y + o.height * r - t.height / 2),
    Math.round(o.x + o.width * l - t.width / 2),
    Math.round(o.y + o.height * d - t.height / 2),
    Math.round(o.x + o.width * a - t.width / 2)
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
function gs(e, t, n, o, s = !1, i = vt) {
  const l = (m, y, S, R) => {
    if (s) {
      const K = m + y, U = [...R, Math.round(K / 8) * 8].reduce((j, D) => Math.abs(D - K) < Math.abs(j - K) ? D : j, K + o + 1);
      return [m, Math.abs(U - K) <= o ? U - m : y];
    }
    let E = 0, F = o + 1;
    for (const K of [m, m + y / 2, m + y])
      for (const N of [...R, Math.round(K / 8) * 8])
        Math.abs(N - K) < F && (F = Math.abs(N - K), E = N - K);
    return [ve(m + (F <= o ? E : 0), 0, S - y), y];
  }, [r, a] = l(e.x, e.width, t.width, [0, t.width / 2, t.width, ...n.flatMap((m) => [m.x, m.x + m.width / 2, m.x + m.width])]), [d, h] = l(e.y, e.height, t.height, [0, t.height / 2, t.height, ...n.flatMap((m) => [m.y, m.y + m.height / 2, m.y + m.height])]);
  return st({ x: r, y: d, width: a, height: h }, t, i);
}
function Jt(e, t) {
  const n = /* @__PURE__ */ new Set();
  return t.filter((o) => e[o.panel] && (!o.slot || e[o.panel].slots[o.slot])).filter((o) => {
    const s = `${o.panel}:${o.slot}`;
    return n.has(s) || o.slot && t.some((i) => i.panel === o.panel && !i.slot) ? !1 : (n.add(s), !0);
  });
}
function ti(e, t) {
  const n = Jt(e, t).map((i) => i.slot ? Ge(e[i.panel], i.slot) : e[i.panel]);
  if (!n.length) return null;
  const o = Math.min(...n.map((i) => i.x)), s = Math.min(...n.map((i) => i.y));
  return { x: o, y: s, width: Math.max(...n.map((i) => i.x + i.width)) - o, height: Math.max(...n.map((i) => i.y + i.height)) - s };
}
function Fs(e, t, n, o) {
  if (e[t.panel].locked) return;
  const s = st(n, o, t.slot ? 1 : vt);
  t.slot ? ln(e[t.panel], t.slot, s) : Object.assign(e[t.panel], s);
}
function el(e, t, n, o, s) {
  const i = Jt(e, t).filter((r) => !e[r.panel].locked), l = ti(e, i);
  if (l) {
    n = Math.max(-l.x, Math.min(s.width - l.x - l.width, n)), o = Math.max(-l.y, Math.min(s.height - l.y - l.height, o));
    for (const r of i) {
      const a = r.slot ? Ge(e[r.panel], r.slot) : e[r.panel];
      Fs(e, r, { ...a, x: a.x + n, y: a.y + o }, s);
    }
  }
}
function kc(e, t, n, o) {
  const s = Jt(e, t).filter((r) => !e[r.panel].locked), i = ti(e, s);
  if (!i || s.length < 2) return;
  const l = (r) => r.slot ? Ge(e[r.panel], r.slot) : e[r.panel];
  if (n === "gap-x" || n === "gap-y") {
    if (s.length < 3) return;
    const r = n === "gap-x", a = r ? "x" : "y", d = r ? "width" : "height";
    s.sort((R, E) => l(R)[a] - l(E)[a]);
    const h = l(s[0]), m = l(s.at(-1)), y = (m[a] + m[d] - h[a] - s.reduce((R, E) => R + l(E)[d], 0)) / (s.length - 1);
    let S = h[a];
    for (const R of s) {
      const E = { ...l(R), [a]: S };
      S += E[d] + y, Fs(e, R, E, o);
    }
    return;
  }
  for (const r of s) {
    const a = { ...l(r) };
    n === "left" && (a.x = i.x), n === "right" && (a.x = i.x + i.width - a.width), n === "top" && (a.y = i.y), n === "bottom" && (a.y = i.y + i.height - a.height), n === "center-x" && (a.x = i.x + (i.width - a.width) / 2), n === "center-y" && (a.y = i.y + (i.height - a.height) / 2), Fs(e, r, a, o);
  }
}
function Ec(e, t, n) {
  const o = [];
  for (const s of Jt(e, t)) {
    const i = e[s.panel];
    if (!i.locked)
      if (s.slot) {
        const l = s.slot.replace(/_[1-9]\d*$/, ""), r = Ge(i, s.slot);
        let a = l, d = 2;
        for (; i.slots[a]; ) a = `${l}_${d++}`;
        ln(i, a, st({ ...r, x: r.x + 24, y: r.y + 24 }, n, 1)), i.corners[s.slot] && (i.corners[a] = JSON.parse(JSON.stringify(i.corners[s.slot]))), i.slotNotes?.[s.slot] && (i.slotNotes[a] = i.slotNotes[s.slot]), i.slotContents?.[s.slot] && (i.slotContents[a] = JSON.parse(JSON.stringify(i.slotContents[s.slot]))), o.push({ panel: s.panel, slot: a });
      } else {
        const l = JSON.parse(JSON.stringify(i));
        delete l.position, l.layer = Math.max(-1, ...e.map((r, a) => r.layer ?? a)) + 1, Object.assign(l, st({ ...l, x: l.x + 24, y: l.y + 24 }, n)), e.push(l), o.push({ panel: e.length - 1, slot: "" });
      }
  }
  return o;
}
function Tc(e, t) {
  for (const n of Jt(e, t).sort((o, s) => s.panel - o.panel)) {
    const o = e[n.panel];
    o.locked || (n.slot ? (delete o.slots[n.slot], delete o.corners[n.slot], delete o.slotNotes?.[n.slot], delete o.slotContents?.[n.slot]) : e.splice(n.panel, 1));
  }
}
function Ac(e, t, n) {
  const o = e[t];
  if (!o || o.locked) return;
  if (o.corners.F) throw new Error("请先将外框恢复为矩形，再使用等分。");
  const s = n === "x" ? "width" : "height", i = 8, l = Math.floor((o[s] - i) / 2);
  if (l < vt) throw new Error("分格太小，无法继续等分。");
  const r = { x: o.x, y: o.y, width: o.width, height: o.height, slots: {}, corners: {}, layer: Math.max(-1, ...e.map((a, d) => a.layer ?? d)) + 1 };
  r[n] = o[n] + l + i, r[s] = o[s] - l - i, o[s] = l, e.splice(t + 1, 0, r);
}
const Fc = ["aria-expanded"], Pc = {
  key: 0,
  class: "create-options",
  role: "group",
  "aria-label": "新框类型"
}, $c = ["disabled"], Rc = ["disabled"], Ic = ["disabled"], jc = {
  key: 1,
  class: "hit-list"
}, Nc = ["onClick"], Dc = ["disabled"], Lc = ["disabled"], Bc = { class: "inline" }, Kc = { class: "canvas-controls" }, Vc = { class: "hint" }, Hc = { class: "tools" }, Uc = ["value"], Wc = ["disabled"], zc = ["disabled"], Jc = ["disabled"], qc = { class: "inline" }, Yc = ["disabled"], Gc = ["disabled"], Xc = { class: "check" }, Zc = { class: "check" }, Qc = { class: "check" }, ef = { class: "check" }, tf = {
  class: "check",
  title: "实验功能：为斜切外框的四个顶点追加小 bbox；保存版式后用于提示词编译。"
}, nf = ["checked"], of = {
  open: "",
  class: "object-tree"
}, sf = ["onClick"], lf = { class: "tree-slots" }, rf = ["onClick", "onDblclick"], af = { class: "inline" }, uf = ["disabled"], cf = ["disabled"], ff = ["disabled"], df = { class: "inline" }, hf = ["disabled"], pf = ["disabled"], gf = { class: "inline" }, mf = ["disabled"], vf = ["disabled"], yf = { class: "hint" }, bf = { class: "canvas-area" }, wf = ["viewBox"], xf = ["width", "height"], _f = ["data-panel", "onContextmenu", "onPointerdown", "onDblclick"], Cf = ["points", "fill", "stroke"], Sf = ["x", "y", "width", "height"], Mf = ["title"], Of = ["data-slot", "onPointerdown", "onDblclick", "onContextmenu"], kf = ["points", "fill", "stroke", "stroke-width"], Ef = ["x", "y", "font-size"], Tf = ["x", "y", "width", "height"], Af = ["title"], Ff = ["x", "y", "font-size"], Pf = ["data-ctrl-deform", "data-handle", "rx", "x", "y", "width", "height", "fill", "aria-label", "onPointerdown"], $f = {
  key: 0,
  class: "draw-status",
  role: "status"
}, Rf = { class: "canvas-toolbar" }, If = ["disabled"], jf = ["disabled"], Nf = { class: "hint" }, Df = { class: "properties" }, Lf = ["aria-selected"], Bf = ["aria-selected"], Kf = ["value"], Vf = ["value"], Hf = ["value"], Uf = {
  key: 0,
  class: "slot-actions"
}, Wf = ["disabled"], zf = { class: "inline" }, Jf = ["value", "disabled"], qf = ["value"], Yf = ["disabled"], Gf = ["value", "placeholder"], Xf = {
  key: 1,
  class: "manual-content"
}, Zf = { class: "inline" }, Qf = ["value", "onChange"], ed = ["value", "onChange"], td = ["value", "onInput"], nd = ["value", "placeholder", "onInput"], od = { class: "inline" }, sd = ["disabled", "onClick"], id = ["disabled", "onClick"], ld = ["onClick"], rd = { class: "slot-list" }, ad = ["onClick"], ud = ["value", "aria-label", "onChange"], cd = {
  key: 1,
  class: "hint"
}, fd = {
  key: 1,
  role: "alert",
  class: "error"
}, dd = { key: 2 }, hd = /* @__PURE__ */ Kl({
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
    function s(f) {
      let u = f, c = 2;
      for (; n.existingIds.includes(u); ) u = `${f}_${c++}`;
      return u;
    }
    const i = /* @__PURE__ */ ce({ id: s("my_layout"), label: "自定义版式", description: "", promptMode: n.initialMode ?? "llm", useBboxCorners: !1, width: 1088, height: 1920, panels: [] }), l = /* @__PURE__ */ ce(-1), r = /* @__PURE__ */ ce(""), a = /* @__PURE__ */ ce([]), d = Ue(() => Jt(i.value.panels, a.value)), h = /* @__PURE__ */ ce(!0), m = /* @__PURE__ */ ce(!0), y = /* @__PURE__ */ ce(null), S = /* @__PURE__ */ ce(!1), R = /* @__PURE__ */ wa(null), E = /* @__PURE__ */ ce(null);
    let F = null;
    const K = Ue(() => R.value?.parent ? i.value.panels.indexOf(R.value.parent) : -1), N = Ue(() => !!y.value && !!i.value.panels[y.value.parent] && !i.value.panels[y.value.parent].locked);
    function U(f) {
      const u = f === "F" ? null : i.value.panels[y.value?.parent ?? l.value];
      if (f !== "F" && (!u || u.locked)) {
        b.value = "请先选择一个未锁定的 F 分格。";
        return;
      }
      D(), he(), R.value = { kind: f, parent: u }, y.value = null, b.value = "", w.value?.focus?.();
    }
    function j(f) {
      w.value?.hasPointerCapture(f) && w.value.releasePointerCapture(f);
    }
    function D() {
      const f = F?.id;
      F = null, E.value = null, R.value = null, f !== void 0 && j(f), Nt = null;
    }
    function z(f) {
      !R.value || f.button !== 0 || V || (f.preventDefault(), f.stopPropagation(), w.value?.focus?.(), Nt = w.value.getBoundingClientRect(), F = { id: f.pointerId, start: Lt(f) }, E.value = ps(F.start, F.start, me.value), w.value.setPointerCapture(f.pointerId));
    }
    function L(f) {
      if (!F || f.pointerId !== F.id) return;
      let u = ps(F.start, Lt(f), me.value);
      if (u.width > 0 && u.height > 0 && p.value && !f.altKey) {
        const c = R.value?.parent, C = c ? [c, ...Object.keys(c.slots).map((Z) => Ge(c, Z))] : i.value.panels, $ = 6 * i.value.width / Nt.width;
        u = gs(u, me.value, C, $, !1, 1), u = gs(u, me.value, C, $, !0, 1);
      }
      E.value = u;
    }
    function X(f, u) {
      if (!F || f.pointerId !== F.id) return;
      u || L(f);
      const c = R.value, C = F, $ = E.value, Z = ps(C.start, Lt(f), me.value), H = Nt, We = !u && Z.width * H.width / i.value.width >= 4 && Z.height * H.height / i.value.height >= 4 && $.width >= (c.kind === "F" ? vt : 1) && $.height >= (c.kind === "F" ? vt : 1);
      if (D(), !!We)
        if (c.kind === "F")
          $e(() => {
            const Te = _n($, me.value);
            Te.slots = {}, Te.layer = Math.max(-1, ...i.value.panels.map((Re, ut) => Re.layer ?? ut)) + 1, i.value.panels.push(Te);
          }), Ee(i.value.panels.length - 1);
        else {
          const Te = i.value.panels.indexOf(c.parent);
          if (Te < 0 || c.parent.locked) {
            b.value = "所属分格已变化，请重新选择后绘制。";
            return;
          }
          const Re = Zi(c.parent, c.kind === "text" ? _c(c.parent, $) : c.kind);
          $e(() => ln(c.parent, Re, $)), we(Te, Re);
        }
    }
    function le(f) {
      we(f.panel, f.slot), y.value = null;
    }
    function xe(f) {
      return `第 ${f.panel + 1} 格 · ${f.slot || "F"}${i.value.panels[f.panel].locked ? " · 已锁定" : ""}`;
    }
    const M = /* @__PURE__ */ ce(n.editingId ?? "");
    let V = !1, oe = null;
    const ke = /* @__PURE__ */ ce(null);
    let Pe = null;
    function Ce(f, u = "", c = !1) {
      if (c) {
        const C = [...d.value], $ = C.findIndex((H) => H.panel === f && H.slot === u);
        $ >= 0 ? C.splice($, 1) : C.push({ panel: f, slot: u });
        const Z = C.at(-1);
        Z ? we(Z.panel, Z.slot) : Ee(-1), a.value = C;
      } else we(f, u);
    }
    function ne(f, u = "") {
      return d.value.some((c) => c.panel === f && c.slot === u);
    }
    function ie(f) {
      const u = r.value;
      $e(f), a.value = Jt(i.value.panels, a.value), u && O.value?.slots[u] && (r.value = u);
    }
    function et() {
      ie(() => {
        a.value = Ec(i.value.panels, d.value, me.value);
      });
      const f = a.value.at(-1);
      f && (l.value = f.panel, r.value = f.slot);
    }
    function jt() {
      ie(() => Tc(i.value.panels, d.value)), a.value = [], Ee(-1);
    }
    function Ct(f) {
      ie(() => kc(i.value.panels, d.value, f, me.value));
    }
    function He(f) {
      try {
        ie(() => Ac(i.value.panels, l.value, f)), a.value = [{ panel: l.value, slot: "" }];
      } catch (u) {
        b.value = String(u instanceof Error ? u.message : u);
      }
    }
    function pn() {
      const f = [...new Set(d.value.map((c) => c.panel))], u = f.every((c) => i.value.panels[c].locked);
      $e(() => f.forEach((c) => i.value.panels[c].locked = !u));
    }
    function Gt(f = !1) {
      A.value = 1, Ht(() => {
        const u = P.value;
        if (!u || !w.value) return;
        if (!f) {
          u.scrollLeft = 0, u.scrollTop = 0;
          return;
        }
        const c = ti(i.value.panels, d.value);
        if (!c) return;
        const C = w.value.getBoundingClientRect();
        A.value = ve(Math.min(u.clientWidth / (c.width / i.value.width * C.width), u.clientHeight / (c.height / i.value.height * C.height)) * 0.85, 0.25, 4), Ht(() => {
          const $ = w.value.getBoundingClientRect(), Z = u.getBoundingClientRect();
          u.scrollLeft += $.left - Z.left + (c.x + c.width / 2) / i.value.width * $.width - u.clientWidth / 2, u.scrollTop += $.top - Z.top + (c.y + c.height / 2) / i.value.height * $.height - u.clientHeight / 2;
        });
      });
    }
    function Ho(f) {
      if (!V && f.button !== 1) return;
      f.preventDefault(), f.stopPropagation();
      const u = P.value;
      oe = { id: f.pointerId, x: f.clientX, y: f.clientY, left: u.scrollLeft, top: u.scrollTop }, u.setPointerCapture(f.pointerId);
    }
    function Xt(f) {
      if (oe?.id === f.pointerId) {
        const u = P.value;
        u.scrollLeft = oe.left + oe.x - f.clientX, u.scrollTop = oe.top + oe.y - f.clientY;
      }
    }
    function Zt(f) {
      if (oe?.id === f.pointerId) {
        oe = null;
        const u = P.value;
        u.hasPointerCapture(f.pointerId) && u.releasePointerCapture(f.pointerId);
      }
    }
    function qn(f) {
      if (f.button !== 0 || V) return;
      const u = Lt(f);
      Pe = { ...u, selection: f.shiftKey ? [...a.value] : [] }, ke.value = { ...u, width: 0, height: 0 }, w.value.setPointerCapture(f.pointerId);
    }
    function St(f, u = -1, c = "") {
      if (f.preventDefault(), f.stopPropagation(), F || Ye) return;
      D(), u >= 0 && !ne(u, c) && we(u, c);
      const C = Lt(f), $ = [];
      for (const { rect: H, index: We } of [...mn.value].reverse()) {
        for (const Te of Object.keys(H.slots).reverse()) Qi(H, Te, C) && $.push({ panel: We, slot: Te });
        Qi(H, "F", C) && $.push({ panel: We, slot: "" });
      }
      S.value = !1;
      const Z = Math.max(8, Math.min(f.clientY, window.innerHeight - 360));
      y.value = { x: Math.max(8, Math.min(f.clientX, window.innerWidth - 238)), y: Z, height: window.innerHeight - Z - 8, parent: u >= 0 ? u : l.value, hits: $ };
    }
    const gn = /* @__PURE__ */ ce(n.initialKey ?? ""), p = /* @__PURE__ */ ce(!0), g = /* @__PURE__ */ ce(!0), b = /* @__PURE__ */ ce(""), k = /* @__PURE__ */ ce(!1), _ = /* @__PURE__ */ ce(), w = /* @__PURE__ */ ce(), P = /* @__PURE__ */ ce(), A = /* @__PURE__ */ ce(1), T = /* @__PURE__ */ ce(1088), x = /* @__PURE__ */ ce(1920), O = Ue(() => i.value.panels[l.value]), I = Ue(() => O.value ? r.value && O.value.slots[r.value] ? Ge(O.value, r.value) : O.value : null), B = { C: "内区", S: "主体", T: "顶部文字", B: "底部文字", TL: "左上文字", TR: "右上文字", BL: "左下文字", BR: "右下文字", L: "左人物", R: "右人物", O: "道具/音效", ML: "左侧文字", MR: "右侧文字", E: "有限越线" }, J = /* @__PURE__ */ ce("S"), te = Ue(() => O.value ? ["C", "S", "T", "B", "TL", "TR", "BL", "BR", "ML", "MR", "L", "R", "O"] : []), re = Ue(() => te.value.includes(J.value) ? J.value : te.value[0] ?? "");
    let se = null;
    function he() {
      Er(), se = null, r.value = "";
    }
    function Se() {
      if (se) {
        const f = se;
        si(f.before), Zn.value = f.undo, Qn.value = f.redo;
      }
      he();
    }
    function Ee(f) {
      he(), l.value = f, a.value = f < 0 ? [] : [{ panel: f, slot: "" }];
    }
    function we(f, u) {
      l.value === f && r.value === u || (Ee(f), u && O.value?.slots[u] && (se = { before: rn(), undo: [...Zn.value], redo: [...Qn.value] }, r.value = u, a.value = [{ panel: f, slot: u }], g.value = !0));
    }
    function Je(f) {
      !O.value || O.value.locked || (r.value ? ln(O.value, r.value, f) : i.value.panels[l.value] = { ...O.value, ...f });
    }
    function Yn() {
      const f = r.value;
      O.value && f && $e(() => {
        delete O.value.slots[f], delete O.value.corners[f], O.value.slotNotes && delete O.value.slotNotes[f], O.value.slotContents && delete O.value.slotContents[f];
      });
    }
    function Le() {
      const f = re.value;
      if (!O.value || !f) return;
      const u = Zi(O.value, f);
      $e(() => {
        const c = O.value, C = Ge(_n(c, me.value), f), $ = 24 * Object.keys(c.slots).filter((Z) => Ft(Z) === f).length;
        ln(c, u, st({ ...C, x: C.x + $, y: C.y + $ }, me.value, 1));
      }), we(l.value, u);
    }
    function qe() {
      O.value && $e(() => {
        const f = O.value;
        f.slots = { ..._n(f, me.value).slots }, f.corners = Object.fromEntries(Object.entries(f.corners).filter(([u]) => u === "F")), r.value = "";
      });
    }
    function Gn(f, u) {
      return g.value ? Object.keys(f.slots).sort((c, C) => Number(ne(u, c)) - Number(ne(u, C)) || +(u === l.value && c === r.value) - +(u === l.value && C === r.value)).map((c) => ({ key: c, rect: Ge(f, c) })) : [];
    }
    const me = Ue(() => ({ width: i.value.width, height: i.value.height })), mn = Ue(() => i.value.panels.map((f, u) => ({ rect: f, index: u })).sort((f, u) => (f.rect.layer ?? f.index) - (u.rect.layer ?? u.index) || f.index - u.index)), Or = Ue(() => {
      const f = new Set(d.value.map((u) => u.panel));
      return [...mn.value].sort((u, c) => Number(f.has(u.index)) - Number(f.has(c.index)) || +(u.index === l.value) - +(c.index === l.value));
    }), vn = Ue(() => mn.value.findIndex((f) => f.index === l.value));
    function Xn(f) {
      const u = vn.value, c = u + f;
      if (u < 0 || c < 0 || c >= mn.value.length) return;
      const C = [...mn.value];
      [C[u], C[c]] = [C[c], C[u]], $e(() => {
        C.forEach(({ rect: $ }, Z) => {
          $.layer = Z;
        });
      });
    }
    const oi = Ue(() => {
      const f = new Set(i.value.panels.map((u) => u.position).filter(Boolean));
      return i.value.panels.map((u, c) => {
        if (u.position) return u.position;
        let C = c + 1;
        for (; f.has(`panel-${C}`); ) C++;
        const $ = `panel-${C}`;
        return f.add($), $;
      });
    }), { undoStack: Zn, redoStack: Qn, baseline: eo, snapshot: rn, remember: kr, edit: $e, restore: si, undo: Uo, redo: Wo, inputEdit: ii, resetInputGroup: Er } = yc(i, b, he, () => {
      T.value = i.value.width, x.value = i.value.height, l.value = Math.min(l.value, i.value.panels.length - 1), O.value?.slots[r.value] || (r.value = ""), a.value = Jt(i.value.panels, a.value), b.value = "", k.value = !1;
    }), { contentItems: li, quickEdit: Mt, quickDraft: zo, quickField: Tr, addContent: ri, changeContent: to, removeContent: Ar, moveContent: ai, frameDescription: Jo, changeSlotNote: ui, openDescription: no, saveQuickDescription: oo, previewDescription: so } = xc(i, O, l, r, we, $e, ii);
    function ci() {
      const f = n.sources.find((u) => u.key === gn.value);
      f && ($e(() => {
        const u = f.id === n.editingId;
        i.value = { metadata: JSON.parse(JSON.stringify(f)), id: u ? f.id : s(`${f.id}_copy`), label: u ? f.label : `${f.label}（副本）`, description: Mr(f), promptMode: f.promptMode ?? "llm", useBboxCorners: f.useBboxCorners === !0, omitFullPageFrame: f.omitFullPageFrame, omitSmallFrames: f.omitSmallFrames, ...f.canvas, panels: f.panels.map((c, C) => ({ ..._n(Cc(c, f.canvas), f.canvas, c), layer: c.layer ?? C })) };
      }), T.value = i.value.width, x.value = i.value.height, Ee(i.value.panels.length ? 0 : -1));
    }
    function Fr() {
      qo();
      const f = Qs({ width: T.value, height: x.value });
      if (!f) {
        b.value = "画布宽高须为 64～8192 的数值，输入完成后自动对齐到最近的 16 倍数。";
        return;
      }
      $e(() => {
        const u = me.value;
        i.value.panels = i.value.panels.map((c) => ({ ...c, ...st({ x: c.x * f.width / u.width, y: c.y * f.height / u.height, width: c.width * f.width / u.width, height: c.height * f.height / u.height }, f) })), Object.assign(i.value, f);
      });
    }
    function qo() {
      const f = (u) => Number.isFinite(u) ? Math.max(64, Math.min(8192, Math.round(u / 16) * 16)) : u;
      T.value = f(T.value), x.value = f(x.value);
    }
    function Pr() {
      $e(() => {
        const f = i.value.panels.length % 5 * 0.04, u = _n(st({ x: i.value.width * (0.08 + f), y: i.value.height * (0.08 + f), width: i.value.width * 0.55, height: i.value.height * 0.3 }, me.value), me.value);
        u.slots = {}, i.value.panels.push({ ...u, layer: Math.max(-1, ...i.value.panels.map((c, C) => c.layer ?? C)) + 1 }), Ee(i.value.panels.length - 1);
      });
    }
    function fi(f) {
      const u = l.value + f;
      !O.value || u < 0 || u >= i.value.panels.length || $e(() => {
        const [c] = i.value.panels.splice(l.value, 1);
        i.value.panels.splice(u, 0, c), l.value = u;
      });
    }
    function $r(f, u) {
      const c = Number(u.target.value);
      I.value && Number.isFinite(c) && $e(() => {
        Je(st({ ...I.value, [f]: c }, me.value, r.value ? 1 : vt));
      }, !0);
    }
    function Yo(f, u) {
      ii(`document:${f}`, () => {
        i.value[f] = u.target.value;
      });
    }
    function io(f) {
      const u = r.value;
      $e(() => {
        i.value.promptMode = f;
      }), u && we(l.value, u);
    }
    function Rr(f) {
      $e(() => {
        i.value.useBboxCorners = f.target.checked;
      });
    }
    let Nt = null, yn = null, Dt = 0;
    function Ir(f) {
      !Ye && !Pe && !F || (yn = f, Dt || (Dt = requestAnimationFrame(() => {
        Dt = 0;
        const u = yn;
        yn = null, u && di(u);
      })));
    }
    function Go(f, u = !1) {
      Dt && cancelAnimationFrame(Dt), Dt = 0;
      const c = yn;
      yn = null, c && !u && di(c), Nr(f, u), Nt = null;
    }
    let Ye = null;
    function jr(f) {
      if (!f.ctrlKey || !f.deltaY || (f.preventDefault(), f.stopPropagation(), Ye || F || !w.value || !P.value)) return;
      const u = P.value, c = w.value.getBoundingClientRect(), C = (f.clientX - c.left) / c.width, $ = (f.clientY - c.top) / c.height, Z = f.deltaY * (f.deltaMode === 1 ? 16 : f.deltaMode === 2 ? u.clientHeight : 1);
      A.value = ve(A.value * Math.exp(-Z * 2e-3), 0.25, 4), Ht(() => {
        const H = w.value?.getBoundingClientRect();
        H && (u.scrollLeft += H.left + C * H.width - f.clientX, u.scrollTop += H.top + $ * H.height - f.clientY);
      });
    }
    function Lt(f) {
      const u = Nt ?? w.value.getBoundingClientRect();
      return { x: (f.clientX - u.left) / u.width * i.value.width, y: (f.clientY - u.top) / u.height * i.value.height };
    }
    function Xo(f, u, c = "", C = "") {
      if (!(f.button !== 0 || Ye)) {
        if (w.value?.focus?.(), f.shiftKey) {
          Ce(u, C, !0);
          return;
        }
        (!ne(u, C) || c) && we(u, C), !O.value?.locked && (Nt = w.value.getBoundingClientRect(), Ye = { pointerId: f.pointerId, ...Lt(f), clientX: f.clientX, clientY: f.clientY, dragging: !1, rect: { ...I.value }, before: rn(), handle: c, quad: Rn(O.value, C || "F"), deform: f.ctrlKey && c.length === 2 });
      }
    }
    function di(f) {
      if (F) {
        L(f);
        return;
      }
      if (Pe) {
        const Re = Lt(f), ut = Pe;
        ke.value = { x: Math.min(ut.x, Re.x), y: Math.min(ut.y, Re.y), width: Math.abs(Re.x - ut.x), height: Math.abs(Re.y - ut.y) };
        return;
      }
      if (!Ye || f.pointerId !== Ye.pointerId) return;
      const u = Lt(f), c = Ye, C = u.x - c.x, $ = u.y - c.y;
      if (!c.dragging) {
        if (Math.hypot(f.clientX - c.clientX, f.clientY - c.clientY) < 3) return;
        c.dragging = !0, w.value.setPointerCapture(f.pointerId);
      }
      if (!c.handle && d.value.length > 1) {
        i.value.panels = JSON.parse(c.before).panels, el(i.value.panels, d.value, C, $, me.value);
        return;
      }
      const Z = r.value ? 1 : vt;
      if (c.deform) {
        const Re = ["nw", "ne", "se", "sw"].indexOf(c.handle), ut = c.quad.map((Zo, Br) => Br === Re ? [Zo[0] + C, Zo[1] + $] : Zo);
        Sc(O.value, r.value || "F", ut, me.value);
        return;
      }
      let H = { ...c.rect };
      c.handle ? (c.handle.includes("w") && (H.x = ve(c.rect.x + C, 0, c.rect.x + c.rect.width - Z), H.width = c.rect.x + c.rect.width - H.x), c.handle.includes("n") && (H.y = ve(c.rect.y + $, 0, c.rect.y + c.rect.height - Z), H.height = c.rect.y + c.rect.height - H.y), c.handle.includes("e") && (H.width = ve(c.rect.width + C, Z, i.value.width - H.x)), c.handle.includes("s") && (H.height = ve(c.rect.height + $, Z, i.value.height - H.y))) : (H.x += C, H.y += $), H = st(H, me.value, Z);
      const We = r.value ? [O.value, ...Object.keys(O.value.slots).filter((Re) => Re !== r.value).map((Re) => Ge(O.value, Re))] : i.value.panels.filter((Re, ut) => ut !== l.value), Te = { ...H };
      p.value && !f.altKey && (H = gs(H, me.value, We, 6 * i.value.width / (Nt ?? w.value.getBoundingClientRect()).width, !!c.handle, Z)), (c.handle === "e" || c.handle === "w") && (H.y = Te.y, H.height = Te.height), (c.handle === "n" || c.handle === "s") && (H.x = Te.x, H.width = Te.width), Je(H);
    }
    function Nr(f, u = !1) {
      if (F) {
        X(f, u);
        return;
      }
      if (Pe) {
        const C = ke.value, $ = Pe.selection;
        if (Pe = null, ke.value = null, !u) {
          a.value = [...$, ...i.value.panels.flatMap((H, We) => H.x >= C.x && H.y >= C.y && H.x + H.width <= C.x + C.width && H.y + H.height <= C.y + C.height ? [{ panel: We, slot: "" }] : [])];
          const Z = a.value.at(-1);
          l.value = Z?.panel ?? -1, r.value = "";
        }
        w.value?.hasPointerCapture(f.pointerId) && w.value.releasePointerCapture(f.pointerId);
        return;
      }
      if (!Ye || f.pointerId !== Ye.pointerId) return;
      const c = Ye.before;
      Ye = null, w.value?.hasPointerCapture(f.pointerId) && w.value.releasePointerCapture(f.pointerId), u ? si(c) : kr(c);
    }
    function Dr() {
      const f = Rn(O.value, r.value || "F");
      return ["nw", "ne", "se", "sw"].flatMap((u, c) => [{ name: u, x: f[c][0], y: f[c][1] }, { name: ["n", "e", "s", "w"][c], x: (f[c][0] + f[(c + 1) % 4][0]) / 2, y: (f[c][1] + f[(c + 1) % 4][1]) / 2 }]);
    }
    function hi(f, u) {
      return Rn(f, u).map((c) => c.join(",")).join(" ");
    }
    function lo() {
      D(), rn() !== eo.value || T.value !== i.value.width || x.value !== i.value.height ? k.value = !0 : o("close");
    }
    function Lr(f) {
      if (f.key === "Tab" && _.value) {
        const u = [..._.value.querySelectorAll('button:not(:disabled),input,textarea,select,[tabindex="0"]')], C = _.value.getRootNode().activeElement;
        f.shiftKey && (C === u[0] || C === _.value) ? (f.preventDefault(), u.at(-1)?.focus()) : !f.shiftKey && C === u.at(-1) && (f.preventDefault(), u[0]?.focus());
      }
      if (R.value && (f.key === "Escape" || (f.ctrlKey || f.metaKey) && f.key.toLowerCase() === "z")) {
        f.preventDefault(), f.stopPropagation(), D();
        return;
      }
      if (f.key === "Escape") {
        if (f.stopPropagation(), Mt.value) {
          Mt.value = null;
          return;
        }
        if (y.value) {
          y.value = null;
          return;
        }
        lo();
        return;
      }
      if ((f.ctrlKey || f.metaKey) && f.key.toLowerCase() === "s") {
        f.preventDefault(), f.stopPropagation(), f.target?.blur?.(), Ht(() => pi(!0));
        return;
      }
      if (!f.target.matches("input,textarea,select,[contenteditable=true]")) {
        if (f.code === "Space") {
          f.preventDefault(), V = !0;
          return;
        }
        if ((f.ctrlKey || f.metaKey) && f.key.toLowerCase() === "d") {
          f.preventDefault(), et();
          return;
        }
        if ((f.ctrlKey || f.metaKey) && f.key === "0") {
          f.preventDefault(), A.value = 1;
          return;
        }
        if (f.key === "Home") {
          f.preventDefault(), Gt();
          return;
        }
        if (f.key.toLowerCase() === "f" && !f.ctrlKey && !f.metaKey) {
          f.preventDefault(), Gt(!0);
          return;
        }
        if ((f.ctrlKey || f.metaKey) && ["z", "y"].includes(f.key.toLowerCase()))
          f.preventDefault(), f.key.toLowerCase() === "y" || f.shiftKey ? Wo() : Uo();
        else if (f.key === "Delete")
          f.preventDefault(), jt();
        else if (I.value && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(f.key)) {
          f.preventDefault();
          const u = f.shiftKey ? 10 : 1;
          ie(() => el(i.value.panels, d.value, f.key === "ArrowRight" ? u : f.key === "ArrowLeft" ? -u : 0, f.key === "ArrowDown" ? u : f.key === "ArrowUp" ? -u : 0, me.value));
        }
      }
    }
    function pi(f = !1) {
      if (D(), T.value !== i.value.width || x.value !== i.value.height) {
        b.value = "画布尺寸已修改，请先点击“应用尺寸”。";
        return;
      }
      if (!i.value.id.trim() || n.existingIds.includes(i.value.id.trim()) && i.value.id.trim() !== M.value) {
        b.value = "版式库已有此 ID，请填写未使用的 ID，或打开该版式编辑。";
        return;
      }
      if (!i.value.panels.length) {
        b.value = "请至少添加一格。";
        return;
      }
      try {
        const u = $n(i.value.width, i.value.height), c = As(u);
        if (i.value.id.trim() === n.editingId && n.sources.some((H) => {
          const We = $n(H.canvas.width, H.canvas.height), Te = As(We);
          return H.id === n.editingId && We !== u && (i.value.width !== c.width || i.value.height !== c.height || H.canvas.width !== Te.width || H.canvas.height !== Te.height);
        })) {
          b.value = "此版式含另一画布方向。使用非标准尺寸时请填写新的版式 ID，另存后可保留原版式的两个方向。";
          return;
        }
        const C = { ...i.value.metadata };
        delete C.panels, delete C.key;
        const $ = n.sources.find((H) => H.id === i.value.metadata?.id && $n(H.canvas.width, H.canvas.height) !== u);
        $ && (C[u === "portrait" ? "landscape" : "portrait"] = $.panels);
        const Z = Cr(JSON.stringify({ ...C, id: i.value.id.trim(), label: i.value.label.trim() || i.value.id.trim(), description: i.value.description.trim(), usage: C.usage ?? i.value.description.trim(), promptCaption: C.promptCaption ?? i.value.description.trim(), promptMode: i.value.promptMode, useBboxCorners: i.value.useBboxCorners, omitFullPageFrame: i.value.omitFullPageFrame, omitSmallFrames: i.value.omitSmallFrames, canvas: me.value, readingOrder: oi.value.join(" → "), [u]: i.value.panels.map((H, We) => Mc(H, me.value, oi.value[We])) }));
        o("save", Z, f, () => {
          M.value = Z.id, eo.value = rn();
        });
      } catch (u) {
        b.value = u instanceof Error ? u.message : String(u);
      }
    }
    return Wl(() => {
      Dt && cancelAnimationFrame(Dt), D();
    }), Ul(() => {
      n.initialKey && ci(), Zn.value = [], Qn.value = [], eo.value = rn(), Ht(() => _.value?.focus());
    }), (f, u) => (Y(), Bn(vc, {
      open: !0,
      "top-layer": "",
      onClose: lo
    }, {
      default: jl(() => [
        v(
          "section",
          {
            ref_key: "dialog",
            ref: _,
            class: "manga-designer",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "快捷自定义版式",
            tabindex: "-1",
            onKeydown: Ie(Lr, ["stop"]),
            onKeyup: u[59] || (u[59] = (c) => /* @__PURE__ */ Me(V) ? V.value = !1 : V = !1),
            onFocusout: u[60] || (u[60] = (c) => /* @__PURE__ */ Me(V) ? V.value = !1 : V = !1),
            onPointerdown: u[61] || (u[61] = (c) => y.value = null)
          },
          [
            y.value ? (Y(), Q(
              "div",
              {
                key: 0,
                class: "context-menu",
                role: "menu",
                "aria-label": "画布右键菜单",
                style: Vt({ left: y.value.x + "px", top: y.value.y + "px", maxHeight: y.value.height + "px" }),
                onPointerdown: u[11] || (u[11] = Ie(() => {
                }, ["stop"])),
                onContextmenu: u[12] || (u[12] = Ie(() => {
                }, ["prevent"]))
              },
              [
                v("button", {
                  type: "button",
                  role: "menuitem",
                  "aria-expanded": S.value,
                  onClick: u[0] || (u[0] = (c) => S.value = !S.value)
                }, "＋ 绘制新框 " + ee(S.value ? "▾" : "▸"), 9, Fc),
                S.value ? (Y(), Q("div", Pc, [
                  v("button", {
                    type: "button",
                    role: "menuitem",
                    onClick: u[1] || (u[1] = (c) => U("F"))
                  }, "外框 F"),
                  v("button", {
                    type: "button",
                    role: "menuitem",
                    disabled: !N.value,
                    onClick: u[2] || (u[2] = (c) => U("S"))
                  }, "人物 S", 8, $c),
                  v("button", {
                    type: "button",
                    role: "menuitem",
                    disabled: !N.value,
                    onClick: u[3] || (u[3] = (c) => U("O"))
                  }, "物品 O", 8, Rc),
                  v("button", {
                    type: "button",
                    role: "menuitem",
                    disabled: !N.value,
                    onClick: u[4] || (u[4] = (c) => U("text"))
                  }, "文字", 8, Ic),
                  v(
                    "small",
                    null,
                    ee(N.value ? `内框归第 ${y.value.parent + 1} 格` : "选择未锁定的 F 后可添加内框"),
                    1
                    /* TEXT */
                  )
                ])) : Ae("v-if", !0),
                y.value.hits.length ? (Y(), Q("details", jc, [
                  v(
                    "summary",
                    null,
                    "选择此处的框（" + ee(y.value.hits.length) + "）",
                    1
                    /* TEXT */
                  ),
                  v("div", null, [
                    (Y(!0), Q(
                      fe,
                      null,
                      tt(y.value.hits, (c) => (Y(), Q("button", {
                        key: `${c.panel}:${c.slot}`,
                        type: "button",
                        role: "menuitem",
                        onClick: (C) => le(c)
                      }, ee(xe(c)), 9, Nc))),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])) : Ae("v-if", !0),
                O.value ? (Y(), Q(
                  fe,
                  { key: 2 },
                  [
                    v("button", {
                      type: "button",
                      role: "menuitem",
                      onClick: u[5] || (u[5] = (c) => {
                        q(no)(l.value, r.value || "F"), y.value = null;
                      })
                    }, "编辑画面描述"),
                    v("button", {
                      type: "button",
                      role: "menuitem",
                      disabled: O.value.locked,
                      onClick: u[6] || (u[6] = (c) => {
                        et(), y.value = null;
                      })
                    }, "复制 Ctrl+D", 8, Dc),
                    v("button", {
                      type: "button",
                      role: "menuitem",
                      disabled: O.value.locked,
                      onClick: u[7] || (u[7] = (c) => {
                        jt(), y.value = null;
                      })
                    }, "删除 Delete", 8, Lc),
                    v("button", {
                      type: "button",
                      role: "menuitem",
                      onClick: u[8] || (u[8] = (c) => {
                        pn(), y.value = null;
                      })
                    }, "锁定 / 解锁"),
                    v("button", {
                      type: "button",
                      role: "menuitem",
                      onClick: u[9] || (u[9] = (c) => {
                        Xn(1), y.value = null;
                      })
                    }, "上移一层"),
                    v("button", {
                      type: "button",
                      role: "menuitem",
                      onClick: u[10] || (u[10] = (c) => {
                        Xn(-1), y.value = null;
                      })
                    }, "下移一层")
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : Ae("v-if", !0)
              ],
              36
              /* STYLE, NEED_HYDRATION */
            )) : Ae("v-if", !0),
            v("header", null, [
              v(
                "strong",
                null,
                ee(e.editingId ? "可视化编辑版式" : "快捷自定义版式"),
                1
                /* TEXT */
              ),
              v("div", Bc, [
                v("button", {
                  type: "button",
                  onClick: lo
                }, "取消"),
                v(
                  "button",
                  {
                    type: "button",
                    class: "primary",
                    onClick: u[13] || (u[13] = (c) => pi(!1))
                  },
                  ee(e.editingId && i.value.id.trim() === e.editingId ? "保存版式修改" : "保存新版式"),
                  1
                  /* TEXT */
                ),
                v("button", {
                  type: "button",
                  "aria-label": "关闭编辑器",
                  onClick: lo
                }, "✕")
              ])
            ]),
            v("div", Kc, [
              v("button", {
                type: "button",
                onClick: u[14] || (u[14] = (c) => h.value = !h.value)
              }, "对象栏"),
              v("button", {
                type: "button",
                onClick: u[15] || (u[15] = (c) => m.value = !m.value)
              }, "属性栏"),
              v(
                "span",
                Vc,
                ee(q(rn)() === q(eo) ? "已保存" : "有未保存修改") + " · Ctrl+S 保存并继续编辑",
                1
                /* TEXT */
              ),
              v("label", null, [
                u[62] || (u[62] = _e(
                  "画布宽 ",
                  -1
                  /* CACHED */
                )),
                ct(v(
                  "input",
                  {
                    "onUpdate:modelValue": u[16] || (u[16] = (c) => T.value = c),
                    "aria-label": "画布宽",
                    type: "number",
                    min: "64",
                    max: "8192",
                    step: "16",
                    onChange: qo
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [
                    hs,
                    T.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              v("label", null, [
                u[63] || (u[63] = _e(
                  "画布高 ",
                  -1
                  /* CACHED */
                )),
                ct(v(
                  "input",
                  {
                    "onUpdate:modelValue": u[17] || (u[17] = (c) => x.value = c),
                    "aria-label": "画布高",
                    type: "number",
                    min: "64",
                    max: "8192",
                    step: "16",
                    onChange: qo
                  },
                  null,
                  544
                  /* NEED_HYDRATION, NEED_PATCH */
                ), [
                  [
                    hs,
                    x.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              v("button", {
                type: "button",
                onClick: Fr
              }, "应用尺寸")
            ]),
            u[90] || (u[90] = v(
              "p",
              { class: "hint" },
              "改变画布尺寸会等比例换算各轴坐标。工作流与预设尺寸须与此画布一致；请连接节点的宽高输出到潜空间尺寸输入。",
              -1
              /* CACHED */
            )),
            v(
              "div",
              {
                class: nt(["designer-body", { "hide-objects": !h.value, "hide-properties": !m.value }])
              },
              [
                ct(v(
                  "aside",
                  Hc,
                  [
                    v("details", null, [
                      u[66] || (u[66] = v(
                        "summary",
                        null,
                        "载入其他版式",
                        -1
                        /* CACHED */
                      )),
                      v("label", null, [
                        u[65] || (u[65] = _e(
                          "从现有版式复制",
                          -1
                          /* CACHED */
                        )),
                        ct(v(
                          "select",
                          {
                            "onUpdate:modelValue": u[18] || (u[18] = (c) => gn.value = c),
                            "aria-label": "源版式"
                          },
                          [
                            u[64] || (u[64] = v(
                              "option",
                              { value: "" },
                              "请选择",
                              -1
                              /* CACHED */
                            )),
                            (Y(!0), Q(
                              fe,
                              null,
                              tt(e.sources, (c) => (Y(), Q("option", {
                                key: c.key,
                                value: c.key
                              }, ee(c.label) + " · " + ee(c.canvas.width) + "×" + ee(c.canvas.height), 9, Uc))),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ],
                          512
                          /* NEED_PATCH */
                        ), [
                          [lc, gn.value]
                        ])
                      ]),
                      v("button", {
                        type: "button",
                        disabled: !gn.value,
                        onClick: ci
                      }, "载入副本", 8, Wc)
                    ]),
                    v("button", {
                      type: "button",
                      onClick: Pr
                    }, "＋ 新增分格"),
                    v("button", {
                      type: "button",
                      disabled: !O.value,
                      onClick: et
                    }, "复制选中项", 8, zc),
                    v("button", {
                      type: "button",
                      disabled: !O.value,
                      onClick: jt
                    }, "删除选中项", 8, Jc),
                    v("div", qc, [
                      v("button", {
                        type: "button",
                        disabled: !q(Zn).length,
                        onClick: u[19] || (u[19] = //@ts-ignore
                        (...c) => q(Uo) && q(Uo)(...c))
                      }, "撤销", 8, Yc),
                      v("button", {
                        type: "button",
                        disabled: !q(Qn).length,
                        onClick: u[20] || (u[20] = //@ts-ignore
                        (...c) => q(Wo) && q(Wo)(...c))
                      }, "重做", 8, Gc)
                    ]),
                    v("label", Xc, [
                      ct(v(
                        "input",
                        {
                          "onUpdate:modelValue": u[21] || (u[21] = (c) => p.value = c),
                          type: "checkbox"
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [po, p.value]
                      ]),
                      u[67] || (u[67] = _e(
                        "对齐吸附",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    v("label", Zc, [
                      ct(v(
                        "input",
                        {
                          "onUpdate:modelValue": u[22] || (u[22] = (c) => g.value = c),
                          type: "checkbox"
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [po, g.value]
                      ]),
                      u[68] || (u[68] = _e(
                        "显示可编辑槽位",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    v("label", Qc, [
                      ct(v(
                        "input",
                        {
                          "onUpdate:modelValue": u[23] || (u[23] = (c) => i.value.omitFullPageFrame = c),
                          type: "checkbox"
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [po, i.value.omitFullPageFrame]
                      ]),
                      u[69] || (u[69] = _e(
                        "省略全画布 F 框说明",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    v("label", ef, [
                      ct(v(
                        "input",
                        {
                          "onUpdate:modelValue": u[24] || (u[24] = (c) => i.value.omitSmallFrames = c),
                          type: "checkbox"
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [po, i.value.omitSmallFrames]
                      ]),
                      u[70] || (u[70] = _e(
                        "省略小格 F 框说明",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    v("label", tf, [
                      v("input", {
                        checked: i.value.useBboxCorners,
                        type: "checkbox",
                        onChange: Rr
                      }, null, 40, nf),
                      u[71] || (u[71] = _e(
                        "使用 BBOX 角点",
                        -1
                        /* CACHED */
                      ))
                    ]),
                    u[73] || (u[73] = v(
                      "p",
                      { class: "hint" },
                      "拖动外框移动整格；拖动黄色/绿色小框单独编辑槽位。直接拖动四角或边中点缩放；按住 Ctrl 再拖四角才形变。Alt 暂停吸附，方向键微调，Delete 删除选中项，Ctrl+Z 撤销。",
                      -1
                      /* CACHED */
                    )),
                    v("details", of, [
                      u[72] || (u[72] = v(
                        "summary",
                        null,
                        "对象 · 读序（先读 1）",
                        -1
                        /* CACHED */
                      )),
                      (Y(!0), Q(
                        fe,
                        null,
                        tt(i.value.panels, (c, C) => (Y(), Q("div", {
                          key: C,
                          class: "tree-panel"
                        }, [
                          v("button", {
                            type: "button",
                            class: nt({ active: ne(C) }),
                            onClick: ($) => Ce(C, "", $.shiftKey)
                          }, "第 " + ee(C + 1) + " 格 · F " + ee(c.locked ? "🔒" : ""), 11, sf),
                          v("div", lf, [
                            (Y(!0), Q(
                              fe,
                              null,
                              tt(Object.keys(c.slots), ($) => (Y(), Q("button", {
                                key: $,
                                type: "button",
                                class: nt({ active: ne(C, $) }),
                                onClick: (Z) => Ce(C, $, Z.shiftKey),
                                onDblclick: (Z) => q(no)(C, $)
                              }, ee($), 43, rf))),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])
                        ]))),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    v("div", af, [
                      v("button", {
                        type: "button",
                        disabled: !d.value.length,
                        onClick: pn
                      }, "锁定 / 解锁", 8, uf),
                      v("button", {
                        type: "button",
                        disabled: !O.value || !!r.value,
                        onClick: u[25] || (u[25] = (c) => He("x"))
                      }, "左右等分", 8, cf),
                      v("button", {
                        type: "button",
                        disabled: !O.value || !!r.value,
                        onClick: u[26] || (u[26] = (c) => He("y"))
                      }, "上下等分", 8, ff)
                    ]),
                    u[74] || (u[74] = v(
                      "strong",
                      null,
                      "调整读序",
                      -1
                      /* CACHED */
                    )),
                    v("div", df, [
                      v("button", {
                        type: "button",
                        disabled: l.value <= 0,
                        onClick: u[27] || (u[27] = (c) => fi(-1))
                      }, "提前", 8, hf),
                      v("button", {
                        type: "button",
                        disabled: l.value < 0 || l.value >= i.value.panels.length - 1,
                        onClick: u[28] || (u[28] = (c) => fi(1))
                      }, "延后", 8, pf)
                    ]),
                    v("div", gf, [
                      v("button", {
                        type: "button",
                        disabled: vn.value < 0 || vn.value >= i.value.panels.length - 1,
                        onClick: u[29] || (u[29] = (c) => Xn(1))
                      }, "上移一层", 8, mf),
                      v("button", {
                        type: "button",
                        disabled: vn.value <= 0,
                        onClick: u[30] || (u[30] = (c) => Xn(-1))
                      }, "下移一层", 8, vf)
                    ]),
                    v(
                      "p",
                      yf,
                      ee(O.value ? `当前第 ${vn.value + 1} / ${i.value.panels.length} 层（数字越大越靠前）。` : "") + "层级控制重叠遮挡，不改变读序；遮挡关系自动写入生图提示词。",
                      1
                      /* TEXT */
                    )
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [Li, h.value]
                ]),
                v("div", bf, [
                  v(
                    "div",
                    {
                      ref_key: "canvasViewport",
                      ref: P,
                      class: "canvas-viewport",
                      "aria-label": "画布缩放区域",
                      onWheelCapture: jr,
                      onPointerdownCapture: Ho,
                      onPointermove: Xt,
                      onPointerup: Zt,
                      onPointercancel: Zt
                    },
                    [
                      (Y(), Q("svg", {
                        ref_key: "svg",
                        ref: w,
                        class: nt(["layout-canvas", { drawing: !!R.value }]),
                        onPointerdownCapture: z,
                        onContextmenu: u[31] || (u[31] = Ie((c) => St(c), ["prevent"])),
                        viewBox: `0 0 ${i.value.width} ${i.value.height}`,
                        style: Vt({ aspectRatio: `${i.value.width}/${i.value.height}`, width: `min(${100 * A.value}%, ${62 * i.value.width / i.value.height * A.value}vh)` }),
                        role: "img",
                        "aria-label": "版式画布",
                        tabindex: "0",
                        onPointermove: Ir,
                        onPointerup: u[32] || (u[32] = (c) => Go(c)),
                        onPointercancel: u[33] || (u[33] = (c) => Go(c, !0)),
                        onLostpointercapture: u[34] || (u[34] = (c) => Go(c, !0))
                      }, [
                        v("rect", {
                          width: i.value.width,
                          height: i.value.height,
                          fill: "white",
                          onPointerdown: qn
                        }, null, 40, xf),
                        (Y(!0), Q(
                          fe,
                          null,
                          tt(Or.value, ({ rect: c, index: C }) => (Y(), Q("g", {
                            key: C,
                            class: nt(["panel", { selected: ne(C) }]),
                            "data-panel": C,
                            onContextmenu: ($) => St($, C),
                            onPointerdown: Ie(($) => Xo($, C), ["stop"]),
                            onDblclick: Ie(($) => q(no)(C, "F"), ["stop", "prevent"])
                          }, [
                            v("polygon", {
                              points: hi(c, "F"),
                              fill: ne(C) ? "#dcecff" : "#f1f2f4",
                              stroke: ne(C) ? "#2675cf" : "#333",
                              "stroke-width": "2",
                              "vector-effect": "non-scaling-stroke"
                            }, null, 8, Cf),
                            q(so)(c, "F") ? (Y(), Q("foreignObject", {
                              key: 0,
                              x: c.x + 6,
                              y: c.y + i.value.width * 0.04,
                              width: Math.max(1, c.width - 12),
                              height: Math.max(1, Math.min(c.height - i.value.width * 0.04, i.value.width * 0.055)),
                              class: "frame-description"
                            }, [
                              v("div", {
                                style: Vt({ fontSize: `${i.value.width * 0.018}px` }),
                                title: q(Jo)(c, "F")
                              }, ee(q(so)(c, "F")), 13, Mf)
                            ], 8, Sf)) : Ae("v-if", !0),
                            (Y(!0), Q(
                              fe,
                              null,
                              tt(Gn(c, C), ($) => (Y(), Q("g", {
                                key: $.key,
                                class: "slot",
                                "data-slot": $.key,
                                onPointerdown: Ie((Z) => Xo(Z, C, "", $.key), ["stop"]),
                                onDblclick: Ie((Z) => q(no)(C, $.key), ["stop", "prevent"]),
                                onContextmenu: (Z) => St(Z, C, $.key)
                              }, [
                                v("polygon", {
                                  points: hi(c, $.key),
                                  fill: q(Ft)($.key) === "T" ? "#e5ba6638" : "#50a18a18",
                                  stroke: ne(C, $.key) ? "#df7827" : q(Ft)($.key) === "T" ? "#b48733" : "#50a18a",
                                  "stroke-width": ne(C, $.key) ? 2 : 1,
                                  "stroke-dasharray": "5 4",
                                  "vector-effect": "non-scaling-stroke"
                                }, null, 8, kf),
                                v("text", {
                                  x: $.rect.x + 5,
                                  y: $.rect.y + i.value.width * 0.025,
                                  "font-size": i.value.width * 0.021,
                                  fill: "#575c62"
                                }, ee($.key), 9, Ef),
                                q(so)(c, $.key) ? (Y(), Q("foreignObject", {
                                  key: 0,
                                  x: $.rect.x + 6,
                                  y: $.rect.y + i.value.width * 0.032,
                                  width: Math.max(1, $.rect.width - 12),
                                  height: Math.max(1, Math.min($.rect.height - i.value.width * 0.032, i.value.width * 0.055)),
                                  class: "frame-description"
                                }, [
                                  v("div", {
                                    style: Vt({ fontSize: `${i.value.width * 0.018}px` }),
                                    title: q(Jo)(c, $.key)
                                  }, ee(q(so)(c, $.key)), 13, Af)
                                ], 8, Tf)) : Ae("v-if", !0)
                              ], 40, Of))),
                              128
                              /* KEYED_FRAGMENT */
                            )),
                            v("text", {
                              x: c.x + 8,
                              y: c.y + i.value.width * 0.032,
                              "font-size": i.value.width * 0.026,
                              fill: "#164b83"
                            }, ee(C + 1), 9, Ff)
                          ], 42, _f))),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        E.value ? (Y(), Q(
                          "rect",
                          Es({
                            key: 0,
                            class: "draw-preview"
                          }, E.value, {
                            fill: "#2675cf22",
                            stroke: "#2675cf",
                            "stroke-dasharray": "6 4",
                            "vector-effect": "non-scaling-stroke",
                            "pointer-events": "none"
                          }),
                          null,
                          16
                          /* FULL_PROPS */
                        )) : Ae("v-if", !0),
                        ke.value ? (Y(), Q(
                          "rect",
                          Es({ key: 1 }, ke.value, {
                            fill: "#2675cf22",
                            stroke: "#2675cf",
                            "stroke-dasharray": "5 4",
                            "vector-effect": "non-scaling-stroke"
                          }),
                          null,
                          16
                          /* FULL_PROPS */
                        )) : Ae("v-if", !0),
                        !R.value && O.value && I.value && d.value.length === 1 && !O.value.locked ? (Y(!0), Q(
                          fe,
                          { key: 2 },
                          tt(Dr(), (c) => (Y(), Q("rect", {
                            key: c.name,
                            class: "resize-handle",
                            "data-ctrl-deform": c.name.length === 2,
                            "data-handle": c.name,
                            rx: c.name.length === 2 ? i.value.width * 9e-3 : 0,
                            x: c.x - i.value.width * 9e-3,
                            y: c.y - i.value.width * 9e-3,
                            width: i.value.width * 0.018,
                            height: i.value.width * 0.018,
                            fill: r.value ? "#df7827" : "#2675cf",
                            stroke: "white",
                            "vector-effect": "non-scaling-stroke",
                            style: Vt({ cursor: `${c.name}-resize` }),
                            "aria-label": `${c.name} 控制点`,
                            onPointerdown: Ie((C) => Xo(C, l.value, c.name, r.value), ["stop", "prevent"])
                          }, null, 44, Pf))),
                          128
                          /* KEYED_FRAGMENT */
                        )) : Ae("v-if", !0)
                      ], 46, wf))
                    ],
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ),
                  R.value ? (Y(), Q("div", $f, [
                    _e(
                      ee(R.value.kind === "F" ? "绘制外框 F" : `绘制${R.value.kind === "S" ? "人物" : R.value.kind === "O" ? "物品" : "文字"}内框 · 归第 ${K.value + 1} 格`) + "：按住左键拖动，Esc 取消",
                      1
                      /* TEXT */
                    ),
                    v("button", {
                      type: "button",
                      onClick: D
                    }, "取消绘制")
                  ])) : Ae("v-if", !0),
                  v("div", Rf, [
                    v("button", {
                      type: "button",
                      onClick: u[35] || (u[35] = (c) => Gt())
                    }, "适应画布"),
                    v("button", {
                      type: "button",
                      disabled: !d.value.length,
                      onClick: u[36] || (u[36] = (c) => Gt(!0))
                    }, "聚焦选中 F", 8, If),
                    v("button", {
                      type: "button",
                      onClick: u[37] || (u[37] = (c) => A.value = 1)
                    }, "100%"),
                    v(
                      "span",
                      null,
                      "已选 " + ee(d.value.length) + " 项",
                      1
                      /* TEXT */
                    ),
                    v("select", {
                      "aria-label": "批量对齐",
                      disabled: d.value.length < 2,
                      value: "",
                      onChange: u[38] || (u[38] = (c) => {
                        Ct(c.target.value), c.target.value = "";
                      })
                    }, [...u[75] || (u[75] = [
                      v(
                        "option",
                        { value: "" },
                        "对齐 / 分布",
                        -1
                        /* CACHED */
                      ),
                      v(
                        "option",
                        { value: "left" },
                        "左对齐",
                        -1
                        /* CACHED */
                      ),
                      v(
                        "option",
                        { value: "right" },
                        "右对齐",
                        -1
                        /* CACHED */
                      ),
                      v(
                        "option",
                        { value: "top" },
                        "顶对齐",
                        -1
                        /* CACHED */
                      ),
                      v(
                        "option",
                        { value: "bottom" },
                        "底对齐",
                        -1
                        /* CACHED */
                      ),
                      v(
                        "option",
                        { value: "center-x" },
                        "水平居中",
                        -1
                        /* CACHED */
                      ),
                      v(
                        "option",
                        { value: "center-y" },
                        "垂直居中",
                        -1
                        /* CACHED */
                      ),
                      v(
                        "option",
                        { value: "gap-x" },
                        "水平等间距（3项）",
                        -1
                        /* CACHED */
                      ),
                      v(
                        "option",
                        { value: "gap-y" },
                        "垂直等间距（3项）",
                        -1
                        /* CACHED */
                      )
                    ])], 40, jf)
                  ]),
                  v("p", Nf, [
                    _e(
                      ee(i.value.width) + "×" + ee(i.value.height) + " · " + ee(i.value.panels.length) + " 格 · 缩放 " + ee(Math.round(A.value * 100)) + "% · Ctrl＋滚轮缩放 · 空格拖动画布 · Shift 多选 · 空白处框选 · 双击编辑描述",
                      1
                      /* TEXT */
                    ),
                    u[76] || (u[76] = v(
                      "br",
                      null,
                      null,
                      -1
                      /* CACHED */
                    )),
                    u[77] || (u[77] = _e(
                      "右键绘制新框；选中框仅在编辑时临时置前，保存层级不变。槽位可单独移动，随外框缩放。",
                      -1
                      /* CACHED */
                    ))
                  ])
                ]),
                ct(v(
                  "aside",
                  Df,
                  [
                    v(
                      "div",
                      {
                        class: nt(["mode-switch", { manual: i.value.promptMode === "manual" }]),
                        role: "tablist",
                        "aria-label": "内容编辑模式",
                        onKeydown: [
                          u[41] || (u[41] = go(Ie((c) => io("llm"), ["prevent"]), ["left"])),
                          u[42] || (u[42] = go(Ie((c) => io("manual"), ["prevent"]), ["right"]))
                        ]
                      },
                      [
                        u[78] || (u[78] = v(
                          "span",
                          {
                            class: "mode-thumb",
                            "aria-hidden": "true"
                          },
                          null,
                          -1
                          /* CACHED */
                        )),
                        v("button", {
                          type: "button",
                          role: "tab",
                          "aria-selected": i.value.promptMode === "llm",
                          onClick: u[39] || (u[39] = (c) => io("llm"))
                        }, "← LLM 说明", 8, Lf),
                        v("button", {
                          type: "button",
                          role: "tab",
                          "aria-selected": i.value.promptMode === "manual",
                          onClick: u[40] || (u[40] = (c) => io("manual"))
                        }, "直接提示词 →", 8, Bf)
                      ],
                      34
                      /* CLASS, NEED_HYDRATION */
                    ),
                    v("details", null, [
                      u[81] || (u[81] = v(
                        "summary",
                        null,
                        "版式信息",
                        -1
                        /* CACHED */
                      )),
                      v("label", null, [
                        u[79] || (u[79] = _e(
                          "版式 ID",
                          -1
                          /* CACHED */
                        )),
                        v("input", {
                          value: i.value.id,
                          "aria-label": "版式 ID",
                          onChange: u[43] || (u[43] = (c) => Yo("id", c))
                        }, null, 40, Kf)
                      ]),
                      v("label", null, [
                        u[80] || (u[80] = _e(
                          "名称",
                          -1
                          /* CACHED */
                        )),
                        v("input", {
                          value: i.value.label,
                          "aria-label": "版式名称",
                          onChange: u[44] || (u[44] = (c) => Yo("label", c))
                        }, null, 40, Vf)
                      ])
                    ]),
                    v("label", null, [
                      u[82] || (u[82] = _e(
                        "画面描述",
                        -1
                        /* CACHED */
                      )),
                      v("textarea", {
                        value: i.value.description,
                        "aria-label": "整页画面描述",
                        rows: "3",
                        placeholder: "全页共用的画风、环境与光照；两种模式共用",
                        onInput: u[45] || (u[45] = (c) => Yo("description", c))
                      }, null, 40, Hf)
                    ]),
                    O.value ? (Y(), Q(
                      fe,
                      { key: 0 },
                      [
                        v(
                          "strong",
                          null,
                          "第 " + ee(l.value + 1) + " 格 · " + ee(r.value ? `${r.value} ${B[q(Ft)(r.value)] ?? "槽位"}` : "外框 F"),
                          1
                          /* TEXT */
                        ),
                        r.value ? (Y(), Q("div", Uf, [
                          v("div", { class: "inline" }, [
                            v("button", {
                              type: "button",
                              class: "primary",
                              onClick: he
                            }, "确定内框"),
                            v("button", {
                              type: "button",
                              onClick: Se
                            }, "取消内框修改")
                          ])
                        ])) : Ae("v-if", !0),
                        v("button", {
                          type: "button",
                          disabled: !r.value,
                          onClick: Yn
                        }, "删除选中槽位", 8, Wf),
                        v("button", {
                          type: "button",
                          onClick: qe
                        }, "恢复本格默认槽位"),
                        v("div", zf, [
                          v("select", {
                            value: re.value,
                            "aria-label": "新增内框类型",
                            disabled: !te.value.length,
                            onChange: u[46] || (u[46] = (c) => J.value = c.target.value)
                          }, [
                            (Y(!0), Q(
                              fe,
                              null,
                              tt(te.value, (c) => (Y(), Q("option", {
                                key: c,
                                value: c
                              }, ee(c) + " " + ee(B[c]), 9, qf))),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ], 40, Jf),
                          v("button", {
                            type: "button",
                            disabled: !re.value,
                            onClick: Le
                          }, "添加内框", 8, Yf)
                        ]),
                        v("label", null, [
                          _e(
                            ee(r.value ? `内框 ${r.value} 画面描述` : "外框 F 画面描述") + " ",
                            1
                            /* TEXT */
                          ),
                          v("textarea", {
                            value: q(Jo)(O.value, r.value || "F"),
                            "aria-label": "当前框画面描述",
                            rows: "3",
                            placeholder: r.value ? "描述本框的人物、动作、场景或取景" : "描述本格的场景与人物关系",
                            onInput: u[47] || (u[47] = //@ts-ignore
                            (...c) => q(ui) && q(ui)(...c))
                          }, null, 40, Gf)
                        ]),
                        i.value.promptMode === "manual" ? (Y(), Q("div", Xf, [
                          v(
                            "strong",
                            null,
                            ee(r.value ? `内框 ${r.value}` : "外框 F") + " 追加人物／台词",
                            1
                            /* TEXT */
                          ),
                          (Y(!0), Q(
                            fe,
                            null,
                            tt(q(li), (c, C) => (Y(), Q("div", {
                              key: C,
                              class: "content-card"
                            }, [
                              v("div", Zf, [
                                v(
                                  "span",
                                  null,
                                  ee(C + 1),
                                  1
                                  /* TEXT */
                                ),
                                v("select", {
                                  value: c.label,
                                  "aria-label": "内容类型",
                                  onChange: ($) => q(to)(C, "label", $)
                                }, [...u[83] || (u[83] = [
                                  v(
                                    "option",
                                    { value: "object" },
                                    "场景／物件",
                                    -1
                                    /* CACHED */
                                  ),
                                  v(
                                    "option",
                                    { value: "character" },
                                    "人物",
                                    -1
                                    /* CACHED */
                                  ),
                                  v(
                                    "option",
                                    { value: "text" },
                                    "文字",
                                    -1
                                    /* CACHED */
                                  )
                                ])], 40, Qf)
                              ]),
                              c.label === "text" ? (Y(), Q(
                                fe,
                                { key: 0 },
                                [
                                  v("label", null, [
                                    u[85] || (u[85] = _e(
                                      "文字类型",
                                      -1
                                      /* CACHED */
                                    )),
                                    v("select", {
                                      value: c.textType ?? "dialogue",
                                      onChange: ($) => q(to)(C, "textType", $)
                                    }, [...u[84] || (u[84] = [
                                      v(
                                        "option",
                                        { value: "dialogue" },
                                        "对白",
                                        -1
                                        /* CACHED */
                                      ),
                                      v(
                                        "option",
                                        { value: "narration" },
                                        "旁白",
                                        -1
                                        /* CACHED */
                                      ),
                                      v(
                                        "option",
                                        { value: "sfx" },
                                        "日文拟声",
                                        -1
                                        /* CACHED */
                                      )
                                    ])], 40, ed)
                                  ]),
                                  v("label", null, [
                                    u[86] || (u[86] = _e(
                                      "准确台词／文字",
                                      -1
                                      /* CACHED */
                                    )),
                                    v("textarea", {
                                      value: c.text ?? "",
                                      "aria-label": "准确台词",
                                      rows: "3",
                                      onInput: ($) => q(to)(C, "text", $)
                                    }, null, 40, td)
                                  ])
                                ],
                                64
                                /* STABLE_FRAGMENT */
                              )) : Ae("v-if", !0),
                              v("label", null, [
                                _e(
                                  ee(c.label === "text" ? "文字表现说明（选填）" : "画面描述"),
                                  1
                                  /* TEXT */
                                ),
                                v("textarea", {
                                  value: c.caption,
                                  "aria-label": "当前内容描述",
                                  rows: "3",
                                  placeholder: c.label === "text" ? "英文描述说话人、气泡形状与位置；留空使用常规样式" : "英文描述本框可见的场景、人物、动作与取景",
                                  onInput: ($) => q(to)(C, "caption", $)
                                }, null, 40, nd)
                              ]),
                              v("div", od, [
                                v("button", {
                                  type: "button",
                                  disabled: C === 0,
                                  onClick: ($) => q(ai)(C, -1)
                                }, "上移", 8, sd),
                                v("button", {
                                  type: "button",
                                  disabled: C === q(li).length - 1,
                                  onClick: ($) => q(ai)(C, 1)
                                }, "下移", 8, id),
                                v("button", {
                                  type: "button",
                                  onClick: ($) => q(Ar)(C)
                                }, "删除内容", 8, ld)
                              ])
                            ]))),
                            128
                            /* KEYED_FRAGMENT */
                          )),
                          v("button", {
                            type: "button",
                            onClick: u[48] || (u[48] = //@ts-ignore
                            (...c) => q(ri) && q(ri)(...c))
                          }, "＋ 添加画面／台词"),
                          u[87] || (u[87] = v(
                            "p",
                            { class: "hint" },
                            "一个框可添加多个人物或多条文字，按列表顺序输出。空白条目留作草稿；每句台词单独一项，人物与气泡可用独立内框定位。",
                            -1
                            /* CACHED */
                          ))
                        ])) : Ae("v-if", !0),
                        v("div", rd, [
                          v(
                            "button",
                            {
                              type: "button",
                              class: nt({ active: !r.value }),
                              onClick: he
                            },
                            "外框 F",
                            2
                            /* CLASS */
                          ),
                          (Y(!0), Q(
                            fe,
                            null,
                            tt(O.value.slots, (c, C) => (Y(), Q("button", {
                              key: C,
                              type: "button",
                              class: nt({ active: r.value === C }),
                              onClick: ($) => we(l.value, String(C))
                            }, ee(C) + " " + ee(B[q(Ft)(String(C))] ?? ""), 11, ad))),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        (Y(), Q(
                          fe,
                          null,
                          tt(["x", "y", "width", "height"], (c) => v("label", { key: c }, [
                            _e(
                              ee({ x: "左边距", y: "上边距", width: "宽度", height: "高度" }[c]),
                              1
                              /* TEXT */
                            ),
                            v("input", {
                              value: I.value?.[c],
                              "aria-label": `${r.value ? "槽位" : "分格"}${c}`,
                              type: "number",
                              step: "1",
                              onChange: (C) => $r(c, C)
                            }, null, 40, ud)
                          ])),
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : (Y(), Q("p", cd, "添加或选择一格，编辑精确尺寸。")),
                    u[88] || (u[88] = v(
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
                  [Li, m.value]
                ])
              ],
              2
              /* CLASS */
            ),
            b.value ? (Y(), Q(
              "p",
              fd,
              ee(b.value),
              1
              /* TEXT */
            )) : Ae("v-if", !0),
            k.value ? (Y(), Q("footer", dd, [
              u[89] || (u[89] = v(
                "span",
                null,
                "放弃未保存的修改？",
                -1
                /* CACHED */
              )),
              v("button", {
                type: "button",
                onClick: u[49] || (u[49] = (c) => k.value = !1)
              }, "继续编辑"),
              v("button", {
                type: "button",
                onClick: u[50] || (u[50] = (c) => o("close"))
              }, "放弃修改")
            ])) : Ae("v-if", !0),
            q(Mt) ? (Y(), Q(
              "div",
              {
                key: 3,
                class: "quick-mask",
                onMousedown: u[58] || (u[58] = Ie((c) => Mt.value = null, ["self"]))
              },
              [
                v(
                  "section",
                  {
                    class: "quick-dialog",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "快速编辑画面描述",
                    onKeydown: [
                      u[56] || (u[56] = Ie(() => {
                      }, ["stop"])),
                      u[57] || (u[57] = go(Ie((c) => Mt.value = null, ["prevent"]), ["esc"]))
                    ]
                  },
                  [
                    v("header", null, [
                      v(
                        "strong",
                        null,
                        "第 " + ee(q(Mt).index + 1) + " 格 · " + ee(q(Mt).key) + " 画面描述",
                        1
                        /* TEXT */
                      ),
                      v("button", {
                        type: "button",
                        "aria-label": "关闭快速编辑",
                        onClick: u[51] || (u[51] = (c) => Mt.value = null)
                      }, "✕")
                    ]),
                    ct(v(
                      "textarea",
                      {
                        ref_key: "quickField",
                        ref: Tr,
                        "onUpdate:modelValue": u[52] || (u[52] = (c) => /* @__PURE__ */ Me(zo) ? zo.value = c : null),
                        "aria-label": "快速画面描述",
                        rows: "7",
                        onKeydown: u[53] || (u[53] = go(Ie(
                          //@ts-ignore
                          (...c) => q(oo) && q(oo)(...c),
                          ["ctrl", "prevent"]
                        ), ["enter"]))
                      },
                      null,
                      544
                      /* NEED_HYDRATION, NEED_PATCH */
                    ), [
                      [hs, q(zo)]
                    ]),
                    v("footer", null, [
                      v("button", {
                        type: "button",
                        onClick: u[54] || (u[54] = (c) => Mt.value = null)
                      }, "取消"),
                      v("button", {
                        type: "button",
                        class: "primary",
                        onClick: u[55] || (u[55] = //@ts-ignore
                        (...c) => q(oo) && q(oo)(...c))
                      }, "确定画面描述")
                    ])
                  ],
                  32
                  /* NEED_HYDRATION */
                )
              ],
              32
              /* NEED_HYDRATION */
            )) : Ae("v-if", !0)
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        )
      ]),
      _: 1
      /* STABLE */
    }));
  }
}), pd = /* @__PURE__ */ yr(hd, [["__scopeId", "data-v-83cf7ec6"]]);
function Vo(e) {
  e = Zs(e), Cr(JSON.stringify(e));
  const { id: t, label: n, usage: o, readingOrder: s, canvas: i, promptMode: l, promptCaption: r, useBboxCorners: a } = e;
  if (a !== void 0 && typeof a != "boolean") throw new Error("使用 BBOX 角点需要布尔值 true 或 false。");
  if (!i || !t) throw new Error("版式缺少 id 或 canvas。");
  const d = e.panels ?? e.portrait ?? e.landscape;
  if (!Array.isArray(d) || !d.length) throw new Error("版式缺少分格。");
  return { ...e, id: t, label: n || t, description: Mr(e), usage: o || "", readingOrder: s || "", canvas: i, panels: d, ...l ? { promptMode: l } : {}, ...typeof a == "boolean" ? { useBboxCorners: a } : {}, ...typeof r == "string" ? { promptCaption: r } : {} };
}
function gd(e) {
  const t = bc(e).layouts;
  if (!Array.isArray(t)) throw new Error("导入需要版式数组。");
  return t.map(Vo);
}
function md(e) {
  const t = Vo(e), n = t.panels.map((o, s) => ({ panel: s + 1, position: o.position, slots: Object.keys(o.slots), slotNotes: { ...Object.fromEntries(Object.entries(o.slotContents ?? {}).map(([i, l]) => [i, l.filter((r) => r.label !== "text").map((r) => r.caption).filter(Boolean).join(`
`)]).filter(([, i]) => i)), ...o.slotNotes } }));
  return `以下为当前所选版式的画面描述，请结合用户最新要求和原文分配内容。F 描述整格，其余键是内容定位参考。槽位按需要选用，未使用区域省略，不补占位项；明确承担抓握、衣袖、饰品、局部出框或接触定位的辅助槽位，分别保留引用对应完整 slot 的局部 item，不能仅并入主体 caption 后省略。主体项写整体姿态，局部项写角色归属、部位、连接、接触与遮挡，描述保持一致；多个 item 不等于多个人物。槽位名称不强制规定内容类型。画面描述本身不是台词、旁白或可见印字；明确提供的准确字样另填 text。保留既定事件、身份、人数与准确台词。下方只含槽位清单和画面描述，不含完整画布坐标与 shapes；仅凭这段信息不能确认几何没有冲突，需要结合额外提供的实际几何或回编辑器核对。
` + JSON.stringify({ layout: t.id, description: t.description, readingOrder: t.readingOrder, panels: n }, null, 2);
}
function vd(e, t) {
  return e.trim() + `

` + md(t);
}
function yd(e, t, n) {
  const o = e.getContext("2d"), s = e.width, i = e.height;
  if (o.clearRect(0, 0, s, i), !t) return;
  const l = Math.min((s - 20) / t.canvas.width, (i - 20) / t.canvas.height), r = (s - t.canvas.width * l) / 2, a = (i - t.canvas.height * l) / 2;
  o.save(), o.translate(r, a), o.scale(l, l), o.translate(t.canvas.width / 2, t.canvas.height / 2), o.fillStyle = "#fff", o.fillRect(-t.canvas.width / 2, -t.canvas.height / 2, t.canvas.width, t.canvas.height);
  const d = t.panels.map((h, m) => ({ panel: h, index: m })).sort((h, m) => (h.panel.layer ?? h.index) - (m.panel.layer ?? m.index) || h.index - m.index);
  for (const { panel: h, index: m } of d) {
    const y = h.slots.F ?? h.slots.C ?? Object.values(h.slots)[0], [S, R, E, F] = y, K = h.shapes?.F ?? [[R, S], [F, S], [F, E], [R, E]];
    if (o.beginPath(), K.forEach(([N, U], j) => j ? o.lineTo(N, U) : o.moveTo(N, U)), o.closePath(), o.fillStyle = "#eef4fd", o.fill(), o.strokeStyle = "#235c9e", o.lineWidth = 2 / l, o.stroke(), o.save(), o.clip(), n) for (const [N, [U, j, D, z]] of Object.entries(h.slots)) {
      if (!["T", "TL", "TR", "B", "BL", "BR", "ML", "MR"].includes(Ft(N))) continue;
      const L = h.shapes?.[N] ?? [[j, U], [z, U], [z, D], [j, D]];
      o.beginPath(), L.forEach(([X, le], xe) => xe ? o.lineTo(X, le) : o.moveTo(X, le)), o.closePath(), o.strokeStyle = "#dd8838", o.lineWidth = 1 / l, o.stroke(), o.fillStyle = "#a65313", o.font = `${10 / l}px sans-serif`, o.fillText(N, j + 2 / l, U + 12 / l);
    }
    o.restore(), o.fillStyle = "#16375b", o.font = `bold ${13 / l}px sans-serif`, o.fillText(String(m + 1), R + 4 / l, S + 16 / l);
  }
  o.restore();
}
let be = { layouts: [], revision: "" };
const To = /* @__PURE__ */ new Set(), Ps = new URL(import.meta.url);
Ps.pathname = Ps.pathname.replace(/[^/]+$/, "moss_layout.css");
const ni = document.createElement("link");
ni.rel = "stylesheet";
ni.href = Ps.href;
document.head.append(ni);
async function Ao(e, t = {}) {
  const n = await Kr.fetchApi("/moss_manga_layout/" + e, t), o = await n.json();
  if (!n.ok) throw new Error(o.error || `请求失败：${n.status}`);
  return o;
}
async function tl() {
  be = await Ao("library"), To.forEach((e) => e());
}
async function $s(e) {
  be = await Ao("library", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layouts: e, revision: be.revision }) }), To.forEach((t) => t());
}
function nl(e, t, n) {
  const o = document.createElement("div");
  document.body.append(o);
  let s, i = e?.id;
  const l = () => {
    s.unmount(), o.remove();
  };
  s = hc(pd, {
    sources: [...e ? [e] : [], ...be.layouts.filter((r) => r.id !== e?.id)].map((r) => ({ ...r, key: r.id })),
    existingIds: be.layouts.map((r) => r.id),
    initialMode: n,
    initialKey: e?.id,
    editingId: e?.id,
    onClose: l,
    onSave: async (r, a = !1, d) => {
      try {
        const h = Vo(r), m = be.layouts.some((y) => y.id === h.id);
        if (m && h.id !== i) throw new Error("版式库已有此 ID，请改名或打开该版式编辑。");
        await $s(m ? be.layouts.map((y) => y.id === h.id ? h : y) : [...be.layouts, h]), i = h.id, t(h), d?.(), a || l();
      } catch (h) {
        window.alert(h.message);
      }
    }
  }), s.mount(o);
}
async function ol(e) {
  try {
    await navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement("textarea");
    t.value = e, t.style.position = "fixed", t.style.top = "-10000px", document.body.append(t), t.select();
    const n = document.execCommand("copy");
    if (t.remove(), !n) throw new Error("浏览器无法访问剪贴板。");
  }
}
function bd(e) {
  const t = e.widgets.find((M) => M.name === "layout_id"), n = e.widgets.find((M) => M.name === "layout_snapshot");
  if (!t || !n) return;
  n.type = "hidden", n.computeSize = () => [0, -4];
  const o = e.widgets.find((M) => M.name === "bleed");
  o && (o.type = "hidden", o.computeSize = () => [0, -4]);
  const s = e.widgets.find((M) => M.name === "library_mode") ?? { value: "llm" };
  s.type = "hidden", s.computeSize = () => [0, -4], t.type = "combo", t.options = { ...t.options, values: () => [...new Set([...be.layouts.map((M) => M.id), t.value].filter(Boolean))] };
  let i = 400, l, r;
  const a = document.createElement("div");
  a.className = "moss-layout-node-panel", a.style.cssText = "width:100%;height:400px;display:flex;flex-direction:column;gap:6px;padding:6px;box-sizing:border-box;overflow:hidden;background:#202733;color:#ecf1f7;font:12px system-ui;";
  const d = document.createElement("label");
  d.style.cssText = "display:flex;align-items:center;gap:8px;flex:none;min-height:32px", d.append(document.createTextNode("版式库"));
  const h = document.createElement("select");
  h.setAttribute("aria-label", "选择库中版式"), h.style.cssText = "flex:1;min-width:0;height:32px;color:#fff;background:#344052;border:1px solid #7d8b9e;border-radius:4px;padding:3px 6px", d.append(h), a.append(d);
  const m = document.createElement("div");
  m.style.cssText = "display:flex;flex-wrap:wrap;gap:5px;flex:none", a.append(m);
  const y = document.createElement("div");
  y.setAttribute("role", "status"), y.style.cssText = "min-height:30px;white-space:normal;overflow-wrap:anywhere;flex:none", a.append(y);
  const S = document.createElement("canvas");
  S.width = 1e3, S.height = 540, S.style.cssText = "display:block;width:100%;height:240px;min-height:240px;flex:none;object-fit:contain;background:#e9edf3", a.append(S);
  const R = document.createElement("label"), E = document.createElement("input");
  E.type = "checkbox", E.checked = !0, R.append(E, document.createTextNode("显示字区")), m.append(R);
  function F() {
    return n.value ? JSON.parse(n.value) : null;
  }
  function K() {
    if (!l) return;
    i = 36 + d.offsetHeight + m.offsetHeight + y.offsetHeight + 240, a.style.height = i + "px";
    const M = e.computeSize();
    e.size[1] < M[1] && e.setSize([e.size[0], M[1]]), mo.graph?.setDirtyCanvas(!0, !0);
  }
  function N() {
    cancelAnimationFrame(r), r = requestAnimationFrame(K);
  }
  function U() {
    h.replaceChildren();
    for (const M of be.layouts) {
      const V = document.createElement("option");
      V.value = M.id, V.textContent = `${M.id} · ${M.label || M.id}`, h.append(V);
    }
    if (!be.layouts.some((M) => M.id === t.value)) {
      const M = document.createElement("option");
      M.value = t.value || "", M.textContent = n.value ? `${t.value} · 当前工作流快照（库中已无此版式）` : "请选择版式，或新建／导入", M.disabled = !0, h.prepend(M);
    }
    h.value = t.value || "", h.disabled = !be.layouts.length;
  }
  function j() {
    U();
    try {
      const M = F();
      yd(S, M, E.checked), y.textContent = M ? `${M.label || M.id} · ${M.canvas.width}×${M.canvas.height} · ${M.panels.length} 格 · ${M.promptMode === "manual" ? "直接提示词（读取手填内容）" : "LLM 输入"} · 工作流快照` : "没有选中版式：请新建或导入。";
    } catch (M) {
      y.textContent = M.message;
    }
    mo.graph?.setDirtyCanvas(!0, !0), N();
  }
  function D(M) {
    s.value = M.promptMode ?? "llm", t.value = M.id, n.value = JSON.stringify(M), j(), mo.graph?.change();
  }
  function z(M, V) {
    const oe = document.createElement("button");
    oe.textContent = M, oe.type = "button", oe.style.cssText = "padding:4px 7px;border:1px solid #7d8b9e;border-radius:4px;background:#344052;color:#fff;cursor:pointer", oe.onclick = async () => {
      try {
        await V();
      } catch (ke) {
        y.textContent = ke.message;
      }
    }, m.append(oe);
  }
  z("编辑版式", () => {
    const M = F();
    if (!M) throw new Error("先选择版式。");
    nl(M, D, M.promptMode ?? "llm");
  }), z("新建", () => nl(null, D, "llm")), z("删除", async () => {
    const M = F();
    if (!M) throw new Error("先选择版式。");
    await $s(be.layouts.filter((V) => V.id !== M.id)), j(), y.textContent = "已从公共库删除。当前节点保留工作流快照；不会自动恢复到库。";
  }), z("刷新版式库", () => tl()), z("一键复制说明", async () => {
    const M = F();
    if (!M) throw new Error("先选择版式。");
    const V = await Ao("format", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(M) });
    await ol(vd(V.text, M)), y.textContent = "已复制内容整理要求和当前版式；交给 LLM 后可粘贴其 JSON 代码块，或含一个代码块的完整回复。";
  }), z("复制手填提示词", async () => {
    const M = F();
    if (!M) throw new Error("先选择版式。");
    const V = await Ao("manual", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layout: M }) });
    await ol(V.text), y.textContent = "已复制 MOSS 提示词，可直接送入文本编码器。";
  }), z("导出版式库", () => {
    const M = URL.createObjectURL(new Blob([Gi(be.layouts)], { type: "application/json" })), V = document.createElement("a");
    V.href = M, V.download = "moss-manga-layouts.json", V.click(), setTimeout(() => URL.revokeObjectURL(M), 1e3);
  }), z("导出旧版兼容文件", () => {
    const M = URL.createObjectURL(new Blob([Gi(be.layouts, { legacy: !0 })], { type: "application/json" })), V = document.createElement("a");
    V.href = M, V.download = "moss-manga-legacy.json", V.click(), setTimeout(() => URL.revokeObjectURL(M), 1e3);
  }), z("导出当前版式", () => {
    const M = F();
    if (!M) throw new Error("先选择版式。");
    const V = URL.createObjectURL(new Blob([JSON.stringify(Vo(M), null, 2)], { type: "application/json" })), oe = document.createElement("a");
    oe.href = V, oe.download = "moss-manga-current-layout.json", oe.click(), setTimeout(() => URL.revokeObjectURL(V), 1e3);
  }), z("导入", () => {
    const M = document.createElement("input");
    M.type = "file", M.accept = ".json,application/json", M.onchange = async () => {
      try {
        if (!M.files?.[0]) return;
        const V = JSON.parse(await M.files[0].text()), oe = gd(V);
        for (const Pe of oe) Pe.promptMode ??= V.mode ?? "llm";
        const ke = new Set(be.layouts.map((Pe) => Pe.id));
        if (oe.some((Pe) => ke.has(Pe.id))) throw new Error("导入含同名 ID，请先改名；不会覆盖已有版式。");
        await $s([...be.layouts, ...oe]), oe.length ? D(oe[0]) : j();
      } catch (V) {
        y.textContent = V.message;
      }
    }, M.click();
  }), E.onchange = j, h.onchange = () => {
    const M = be.layouts.find((V) => V.id === h.value);
    M && D(M);
  }, t.callback = (M) => {
    const V = be.layouts.find((oe) => oe.id === M);
    V ? D(V) : j();
  }, l = e.addDOMWidget("版式预览", "moss_layout_preview", a, { serialize: !1, hideOnZoom: !1, getMinHeight: () => i, getMaxHeight: () => i, getHeight: () => i }), l.computeSize = (M) => [M, i], e.setSize([Math.max(e.size[0], 460), Math.max(e.size[1], 640)]);
  const L = new ResizeObserver(N);
  [d, m, y].forEach((M) => L.observe(M));
  const X = e.onResize;
  e.onResize = function(...M) {
    const V = X?.apply(this, M);
    return N(), V;
  };
  const le = e.onConfigure;
  e.onConfigure = function(...M) {
    const V = le?.apply(this, M);
    return setTimeout(() => {
      n.value && (s.value = F()?.promptMode ?? "llm"), j();
    }, 0), V;
  }, To.add(j);
  const xe = e.onRemoved;
  e.onRemoved = function(...M) {
    return To.delete(j), L.disconnect(), cancelAnimationFrame(r), xe?.apply(this, M);
  }, tl().then(() => {
    if (n.value && (s.value = F()?.promptMode ?? "llm"), !n.value && !t.value && be.layouts.length) D(be.layouts[0]);
    else if (!n.value && t.value) {
      const M = be.layouts.find((V) => V.id === t.value);
      M && D(M);
    }
    j();
  }).catch((M) => {
    y.textContent = M.message;
  });
}
mo.registerExtension({ name: "MOSS.MangaLayout", beforeRegisterNodeDef(e, t) {
  if (t.name !== "MossMangaLayout") return;
  const n = e.prototype.onNodeCreated;
  e.prototype.onNodeCreated = function(...o) {
    const s = n?.apply(this, o);
    return bd(this), s;
  };
} });
