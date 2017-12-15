#! /usr/bin/env node
import { DepDiff } from "./dep-diff";
import { UpdateRefs } from "./update-refs";
import { JsonLoader } from "./json-loader";

const pckg = JsonLoader.load('package.json');
const depDiff = new DepDiff({
  dependencies: true,
  devDependencies: true,
  peerDependencies: true,
  optionalDependencies: true
});

const uRefs = new UpdateRefs();
const uPckg = uRefs.update(pckg, depDiff.diff(pckg));

JsonLoader.save('package.json', uPckg, (err) => {
  if (err) {
    console.log('errpr');
  }
});

