import { Uniform1f, Uniform1i, UniformColor } from '../uniform_binding';

import type { Color } from '@emuanalytics/maplibre-gl-style-spec';
import type { Context } from '../../gl/context';
import type { UniformLocations, UniformValues } from '../uniform_binding';

export type DebugUniformsType = {
    'u_color': UniformColor;
    'u_overlay': Uniform1i;
    'u_overlay_scale': Uniform1f;
};

const debugUniforms = (context: Context, locations: UniformLocations): DebugUniformsType => ({
    'u_color': new UniformColor(context, locations.u_color),
    'u_overlay': new Uniform1i(context, locations.u_overlay),
    'u_overlay_scale': new Uniform1f(context, locations.u_overlay_scale)
});

const debugUniformValues = (color: Color, scaleRatio: number = 1): UniformValues<DebugUniformsType> => ({
    'u_color': color,
    'u_overlay': 0,
    'u_overlay_scale': scaleRatio
});

export { debugUniforms, debugUniformValues };

