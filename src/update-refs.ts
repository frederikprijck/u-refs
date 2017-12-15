import { DepDiffResult, Dependency } from "./dep-diff";

export class UpdateRefs {
  
  update(pckg: any, diff: DepDiffResult): any {
    this.updateDependencies(pckg, diff.dependencies, (pckg) => pckg.dependencies);
    this.updateDependencies(pckg, diff.devDependencies, (pckg) => pckg.devDependencies);
    this.updateDependencies(pckg, diff.peerDependencies, (pckg) => pckg.peerDependencies);
    this.updateDependencies(pckg, diff.optionalDependencies, (pckg) => pckg.optionalDependencies);
    return pckg;
  }

  private updateDependencies(pckg, dependencies: Dependency[], selector: any) {
    const listedDependencies = selector(pckg);
    dependencies = dependencies || [];
    dependencies.forEach(dependency => {
      const regex = /(\^|\~)?(\d+.\d+.\d+)/g;
      const version = listedDependencies[dependency.dependency];
      listedDependencies[dependency.dependency] = version.replace(regex, '$1' + dependency.installed); 
    });
  };
}