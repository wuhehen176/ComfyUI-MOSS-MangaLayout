import {describe,it,expect} from 'vitest';
import cases from '../../../tests/fixtures/layout-contract.json';
import {parseCustomLayout,canvasOf,orientationOf} from './layouts';
import {formatEntry} from '../preview';

describe('shared frontend/backend layout contract',()=>{
  for(const entry of cases) it(entry.name,()=>{
    const parse=()=>parseCustomLayout(JSON.stringify(entry.layout));
    const imported=()=>formatEntry(entry.layout);
    if(entry.valid){expect(parse).not.toThrow();expect(imported).not.toThrow();}
    else {expect(parse).toThrow();expect(imported).toThrow();}
  });
  it('keeps the legacy canvas defaults',()=>{
    expect(canvasOf(orientationOf(100,200))).toEqual({width:1088,height:1920});
    expect(canvasOf(orientationOf(200,100))).toEqual({width:1920,height:1088});
  });
  it('preserves fractional shape points instead of rounding away geometry',()=>{
    const entry=cases.find(c=>c.name==='fractional shape vertices')!;
    expect(parseCustomLayout(JSON.stringify(entry.layout)).portrait?.[0].shapes?.S).toEqual(entry.layout.panels![0].shapes!.S);
  });
});
