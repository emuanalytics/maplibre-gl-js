import { StyleLayer } from '../style_layer';

import { type PossiblyEvaluated, type Transitionable, type Transitioning } from '../properties';
import properties, { type BackgroundPaintPropsPossiblyEvaluated } from './background_style_layer_properties.g';

import type { LayerSpecification } from '@emuanalytics/maplibre-gl-style-spec';
import type { BackgroundPaintProps } from './background_style_layer_properties.g';

export const isBackgroundStyleLayer = (layer: StyleLayer): layer is BackgroundStyleLayer => layer.type === 'background';

export class BackgroundStyleLayer extends StyleLayer {
    _transitionablePaint: Transitionable<BackgroundPaintProps>;
    _transitioningPaint: Transitioning<BackgroundPaintProps>;
    paint: PossiblyEvaluated<BackgroundPaintProps, BackgroundPaintPropsPossiblyEvaluated>;

    constructor(layer: LayerSpecification, globalState: Record<string, any>) {
        super(layer, properties, globalState);
    }
}
