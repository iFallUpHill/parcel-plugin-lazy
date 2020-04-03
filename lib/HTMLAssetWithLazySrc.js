const HTMLAsset = require('parcel-bundler/src/assets/HTMLAsset');

const lazysizes = ['data-src', 'data-srcset', 'data-lowsrc']

class HTMLAssetWithLazySrc extends HTMLAsset {
    collectDependencies() {
        super.collectDependencies();
        this.ast.walk(node => {
            if (node.attrs) {
                for (let attr in node.attrs) {
                    if (lazysizes.indexOf(attr) > -1) {
                        node.attrs[attr] = super.collectSrcSetDependencies(node.attrs[attr]);
                        this.isAstDirty = true;
                        continue;
                    }
                }
            }

            return node;
        });
    }
}

module.exports = HTMLAssetWithLazySrc;
