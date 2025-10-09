import { derefLayers, type StyleSpecification } from '@emuanalytics/maplibre-gl-style-spec';
import { createStyleLayer } from '../../../src/style/create_style_layer';
import Benchmark from '../lib/benchmark';
import fetchStyle from '../lib/fetch_style';

export default class StyleLayerCreate extends Benchmark {
    style: string | StyleSpecification;
    layers: Array<any>;

    constructor(style: string | StyleSpecification) {
        super();
        this.style = style;
    }

    async setup() {
        const json = await fetchStyle(this.style);
        this.layers = derefLayers(json.layers);
    }

    bench() {
        for (const layer of this.layers) {
            createStyleLayer(layer, {});
        }
    }
}
