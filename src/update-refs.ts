import { DepDiffResult, Dependency } from "./dep-diff";

export class UpdateRefs {
  
  update(pckg: any, diff: DepDiffResult): any {
    pckg.dependencies = this.updateDependencies(pckg, diff.dependencies, (pckg) => pckg.dependencies);
    pckg.devDependencies = this.updateDependencies(pckg, diff.devDependencies, (pckg) => pckg.devDependencies);
    pckg.peerDependencies = this.updateDependencies(pckg, diff.peerDependencies, (pckg) => pckg.peerDependencies);
    pckg.optionalDependencies = this.updateDependencies(pckg, diff.optionalDependencies, (pckg) => pckg.optionalDependencies);
    return pckg;
  }

  private updateDependencies(pckg, dependencies: Dependency[] = [], selector: any) {
    const listedDependencies = selector(pckg);

    const updatedDependencies = dependencies.map(dependency => {
      const version = listedDependencies[dependency.dependency];
      if (version.indexOf('x') > -1) {
        const installed = dependency.installed.split('');
        return {
          [dependency.dependency]: version
          .split('')
          .map((item, index) => item === 'x' ? item : installed[index])
          .join('')
        };
      } else {
        return {
          [dependency.dependency]: version.replace(
            /(\^|\~)?(\d+.\d+.\d+)/g, 
            '$1' + dependency.installed
          )
        };
      }
    }).reduce((acc, item) => Object.assign(acc || {}, item), {});

    return Object.assign({}, listedDependencies, updatedDependencies);
  };
}