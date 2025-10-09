import { StyleLayer } from '../style_layer';

import { type PossiblyEvaluated, type Transitionable, type Transitioning } from '../properties';
import properties, { type RasterPaintPropsPossiblyEvaluated } from './raster_style_layer_properties.g';

import type { LayerSpecification } from '@emuanalytics/maplibre-gl-style-spec';
import type { RasterPaintProps } from './raster_style_layer_properties.g';

export const isRasterStyleLayer = (layer: StyleLayer): layer is RasterStyleLayer => layer.type === 'raster';

export class RasterStyleLayer extends StyleLayer {
    _transitionablePaint: Transitionable<RasterPaintProps>;
    _transitioningPaint: Transitioning<RasterPaintProps>;
    paint: PossiblyEvaluated<RasterPaintProps, RasterPaintPropsPossiblyEvaluated>;

    constructor(layer: LayerSpecification, globalState: Record<string, any>) {
        super(layer, properties, globalState);
    }
}
