import { JsonLoader } from "./json-loader";

export interface DepDiffOptions {
  dependencies?: boolean;
  devDependencies?: boolean;
  peerDependencies?: boolean;
  optionalDependencies?: boolean;
}

export interface Dependency {
  dependency: string;
  listed: string;
  installed: string;
}

export interface DepDiffResult {
  dependencies?: Dependency[];
  devDependencies?: Dependency[];
  peerDependencies?: Dependency[];
  optionalDependencies?: Dependency[];
}

export class DepDiff {
  constructor(private options: DepDiffOptions) {
    
  }

  diff(pckg: any): DepDiffResult {
    return {
      dependencies: this.options.dependencies ? this.parseDependencies(pckg.dependencies) : null,
      devDependencies: this.options.devDependencies ? this.parseDependencies(pckg.devDependencies): null,
      peerDependencies: this.options.peerDependencies ? this.parseDependencies(pckg.peerDependencies) : null,
      optionalDependencies: this.options.optionalDependencies ? this.parseDependencies(pckg.optionalDependencies) : null
    };
  }

  private parseDependencies(dependencies: any[]) {
    const dependencyVersions = this.readVersions(dependencies);
    const installedDependencyVersions = dependencyVersions
      .map(x => this.readInstalledVersion(x.dependency));
    
    return this.compare(dependencyVersions, installedDependencyVersions)
      .filter(dependency => !this.equalVersion(dependency.listed, dependency.installed));
  }

  private readVersions(dependencies: any[]) {
    return dependencies ? Object
      .keys(dependencies)
      .map(key => ({ dependency: key, version: dependencies[key] })) : [];
  }

  private readInstalledVersion(dependency) {
    return {
      dependency,
      version: JsonLoader.load(`node_modules/${dependency}/package.json`).version
    };
  }

  private equalVersion(listed, installed) {
    const regex = new RegExp('(\^|\~)?(' + installed + ')', 'g');
    return regex.exec(listed);
  }

  private compare(dependencyVersions, installedDependencyVersions) {
    return dependencyVersions
      .map(x => {
        const installedVersion = installedDependencyVersions
          .find(y => y.dependency === x.dependency);
    
        return {
          dependency: x.dependency,
          listed: x.version,
          installed: installedVersion.version
        };
      });
  }
}