import { UpdateRefs } from "./update-refs";

describe("UpdateRefs", function() {
  const uRefs = new UpdateRefs();

  it("should update version", function() {
    const result = uRefs.update({
      dependencies: {
        'a': '1.1.1',
        'b': '1.1.0'
      }
    }, {
      dependencies: [
        { dependency: 'a', installed: '1.1.2', listed: '1.1.1' }
      ]
    });
    
    expect(result.dependencies.a).toEqual('1.1.2');
    expect(result.dependencies.b).toEqual('1.1.0');
  });

  it("should update version without removing ~", function() {
    const result = uRefs.update({
      dependencies: {
        'a': '~1.1.1'
      }
    }, {
      dependencies: [
        { dependency: 'a', installed: '1.1.2', listed: '~1.1.1' }
      ]
    });
    
    expect(result.dependencies.a).toEqual('~1.1.2');
  });

  it("should update version without removing ^", function() {
    const result = uRefs.update({
      dependencies: {
        'a': '^1.1.1'
      }
    }, {
      dependencies: [
        { dependency: 'a', installed: '1.1.2', listed: '^1.1.1' }
      ]
    });
    
    expect(result.dependencies.a).toEqual('^1.1.2');
  });

  it("should not update version when using wildcards", function() {
    const result = uRefs.update({
      dependencies: {
        'a': '1.x.x'
      }
    }, {
      dependencies: [
        { dependency: 'a', installed: '1.1.2', listed: '1.x.x' }
      ]
    });
    
    expect(result.dependencies.a).toEqual('1.x.x');
  });

  it("should update version when using wildcards", function() {
    const result = uRefs.update({
      dependencies: {
        'a': '1.1.x'
      }
    }, {
      dependencies: [
        { dependency: 'a', installed: '1.2.2', listed: '1.1.x' }
      ]
    });
    
    expect(result.dependencies.a).toEqual('1.2.x');
  });
});