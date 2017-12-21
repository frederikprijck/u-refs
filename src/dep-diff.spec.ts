import { UpdateRefs } from "./update-refs";
import { DepDiff } from "./dep-diff";
import { JsonLoader } from "./json-loader";


describe("DepDiff", function() {
  const depDiff = new DepDiff({
    dependencies: true
  });

  it("should include wildcard versions", function() {
    spyOn(JsonLoader, 'load').and.returnValue({ version: '1.1.2' });
    const result = depDiff.diff({
      dependencies: {
        'a': '1.1.x',
        'b': '1.x.x'
      }
    });

    expect(result.dependencies.length).toBe(2);
    expect(result.dependencies[0].installed).toBe('1.1.2');
    expect(result.dependencies[0].listed).toBe('1.1.x');
    expect(result.dependencies[1].installed).toBe('1.1.2');
    expect(result.dependencies[1].listed).toBe('1.x.x');
  });

  it("should ignore equal versions", function() {
    spyOn(JsonLoader, 'load').and.returnValue({ version: '1.1.2' });
    const result = depDiff.diff({
      dependencies: {
        'a': '1.1.1',
        'b': '1.1.2'
      }
    });

    expect(result.dependencies.length).toBe(1);
    expect(result.dependencies['b']).toBeUndefined();
  });

  it("should ignore http dependencies", function() {
    spyOn(JsonLoader, 'load').and.returnValue({ version: '1.1.3' });
    const result = depDiff.diff({
      dependencies: {
        'a': 'http://a.a.a',
        'b': '1.1.1',
        'c': '1.1.2'
      }
    });

    expect(result.dependencies.length).toBe(2);
    expect(result.dependencies['a']).toBeUndefined();
    expect(JsonLoader.load).toHaveBeenCalledTimes(2);
  });
});