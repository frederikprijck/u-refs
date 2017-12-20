import { UpdateRefs } from "./update-refs";

describe("UpdateRefs", function() {
  const uRefs = new UpdateRefs();

  it("should update version", function() {
    const result = uRefs.update({
      dependencies: {
        'a': '1.1.1'
      }
    }, {
      dependencies: [
        { dependency: 'a', installed: '1.1.2', listed: '1.1.1' }
      ]
    });
    
    expect(result.dependencies.a).toEqual('1.1.2');
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
});