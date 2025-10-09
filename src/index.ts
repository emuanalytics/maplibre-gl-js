import Point from '@mapbox/point-geometry';
import packageJSON from '../package.json' with { type: 'json' };
import type { CollisionBoxArray } from './data/array_types.g';
import type { Bucket } from './data/bucket';
import type { FeatureIndex } from './data/feature_index';
import { EdgeInsets, type PaddingOptions } from './geo/edge_insets';
import { LngLat, type LngLatLike } from './geo/lng_lat';
import { LngLatBounds, type LngLatBoundsLike } from './geo/lng_lat_bounds';
import { MercatorCoordinate } from './geo/mercator_coordinate';
import type { CalculateTileZoomFunction, CoveringTilesOptions } from './geo/projection/covering_tiles';
import type { ProjectionData } from './geo/projection/projection_data';
import type { GlyphPosition, GlyphPositions } from './render/glyph_atlas';
import type { ImageAtlas } from './render/image_atlas';
import type { DashEntry } from './render/line_atlas';
import { CanvasSource, type CanvasSourceSpecification } from './source/canvas_source';
import { GeoJSONSource, type SetClusterOptions } from './source/geojson_source';
import type { GeoJSONFeatureDiff, GeoJSONFeatureId, GeoJSONSourceDiff } from './source/geojson_source_diff';
import { type CanonicalTileRange, type Coordinates, ImageSource, type UpdateImageOptions } from './source/image_source';
import { addProtocol, removeProtocol } from './source/protocol_crud';
import type { QueryRenderedFeaturesOptions, QuerySourceFeatureOptions } from './source/query_features';
import { RasterDEMTileSource } from './source/raster_dem_tile_source';
import { RasterTileSource } from './source/raster_tile_source';
import { rtlMainThreadPluginFactory } from './source/rtl_text_plugin_main_thread';
import { addSourceType, type Source, type SourceClass } from './source/source';
import type { Tile } from './source/tile';
import type { OverscaledTileID } from './source/tile_id';
import { VectorTileSource } from './source/vector_tile_source';
import { VideoSource } from './source/video_source';
import type { WorkerTileResult } from './source/worker_source';
import { type AddLayerObject, type FeatureIdentifier, Style, type StyleOptions, type StyleSetterOptions, type StyleSwapOptions, type TransformStyleFunction } from './style/style';
import type { StyleGlyph } from './style/style_glyph';
import type { StyleImage, StyleImageData, StyleImageInterface, StyleImageMetadata, TextFit } from './style/style_image';
import type { StyleLayer } from './style/style_layer';
import type { CustomLayerInterface, CustomRenderMethod, CustomRenderMethodInput } from './style/style_layer/custom_style_layer';
import type { PositionAnchor } from './ui/anchor';
import type { AnimationOptions, CameraForBoundsOptions, CameraOptions, CameraUpdateTransformFunction, CenterZoomBearing, EaseToOptions, FitBoundsOptions, FlyToOptions, JumpToOptions, PointLike } from './ui/camera';
import { AttributionControl, type AttributionControlOptions } from './ui/control/attribution_control';
import type { ControlPosition, IControl } from './ui/control/control';
import { FullscreenControl, type FullscreenControlOptions } from './ui/control/fullscreen_control';
import { GeolocateControl, type GeolocateControlOptions } from './ui/control/geolocate_control';
import { GlobeControl } from './ui/control/globe_control';
import { LogoControl, type LogoControlOptions } from './ui/control/logo_control';
import { NavigationControl, type NavigationControlOptions } from './ui/control/navigation_control';
import { ScaleControl, type ScaleControlOptions, type Unit } from './ui/control/scale_control';
import { TerrainControl } from './ui/control/terrain_control';
import { type MapContextEvent, type MapDataEvent, type MapEventType, type MapLayerEventType, type MapLayerMouseEvent, type MapLayerTouchEvent, type MapLibreEvent, type MapLibreZoomEvent, MapMouseEvent, type MapProjectionEvent, type MapSourceDataEvent, type MapSourceDataType, type MapStyleDataEvent, type MapStyleImageMissingEvent, type MapTerrainEvent, MapTouchEvent, MapWheelEvent } from './ui/events';
import { BoxZoomHandler } from './ui/handler/box_zoom';
import { CooperativeGesturesHandler, type GestureOptions } from './ui/handler/cooperative_gestures';
import { KeyboardHandler } from './ui/handler/keyboard';
import { ScrollZoomHandler } from './ui/handler/scroll_zoom';
import { DoubleClickZoomHandler } from './ui/handler/shim/dblclick_zoom';
import { DragPanHandler, type DragPanOptions } from './ui/handler/shim/drag_pan';
import { DragRotateHandler } from './ui/handler/shim/drag_rotate';
import { TwoFingersTouchZoomRotateHandler } from './ui/handler/shim/two_fingers_touch';
import { type AroundCenterOptions, TwoFingersTouchPitchHandler, TwoFingersTouchRotateHandler, TwoFingersTouchZoomHandler } from './ui/handler/two_fingers_touch';
import type { Handler, HandlerResult } from './ui/handler_manager';
import { Hash } from './ui/hash';
import { Map, type MapOptions, type WebGLContextAttributesWithType } from './ui/map';
import { type Alignment, Marker, type MarkerOptions } from './ui/marker';
import { type Offset, Popup, type PopupOptions } from './ui/popup';
import type { Actor, IActor } from './util/actor';
import { type ActorMessage, MessageType, type RequestResponseMessageMap } from './util/actor_messages';
import { AJAXError, type ExpiryData, type GetResourceResponse, type RequestParameters } from './util/ajax';
import { type AddProtocolAction, config } from './util/config';
import { createTileMesh, type CreateTileMeshOptions, type IndicesType, type TileMesh } from './util/create_tile_mesh';
import { type Dispatcher, getGlobalDispatcher } from './util/dispatcher';
import { type ErrorEvent, Event, Evented, type Listener } from './util/evented';
import { clearPrewarmedResources, prewarm } from './util/global_worker_pool';
import type { AlphaImage } from './util/image';
import type { RequestTransformFunction, ResourceType } from './util/request_manager';
import type { Complete, RequireAtLeastOne, Subscription } from './util/util';
import type { DistributiveKeys, DistributiveOmit, GeoJSONFeature, MapGeoJSONFeature } from './util/vectortile_to_geojson';
import { WorkerPool } from './util/worker_pool';
const version = packageJSON.version;

export type * from '@emuanalytics/maplibre-gl-style-spec';

/**
 * Sets the map's [RTL text plugin](https://www.mapbox.com/mapbox-gl-js/plugins/#mapbox-gl-rtl-text).
 * Necessary for supporting the Arabic and Hebrew languages, which are written right-to-left.
 *
 * @param pluginURL - URL pointing to the Mapbox RTL text plugin source.
 * @param lazy - If set to `true`, maplibre will defer loading the plugin until rtl text is encountered,
 * rtl text will then be rendered only after the plugin finishes loading.
 * @example
 * ```ts
 * setRTLTextPlugin('https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js', false);
 * ```
 * @see [Add support for right-to-left scripts](https://maplibre.org/maplibre-gl-js/docs/examples/mapbox-gl-rtl-text/)
 */
function setRTLTextPlugin(pluginURL: string, lazy: boolean): Promise<void> {
    return rtlMainThreadPluginFactory().setRTLTextPlugin(pluginURL, lazy);
}
/**
 * Gets the map's [RTL text plugin](https://www.mapbox.com/mapbox-gl-js/plugins/#mapbox-gl-rtl-text) status.
 * The status can be `unavailable` (i.e. not requested or removed), `loading`, `loaded` or `error`.
 * If the status is `loaded` and the plugin is requested again, an error will be thrown.
 *
 * @example
 * ```ts
 * const pluginStatus = getRTLTextPluginStatus();
 * ```
 */
function getRTLTextPluginStatus(): string {
    return rtlMainThreadPluginFactory().getRTLTextPluginStatus();
}
/**
 * Returns the package version of the library
 * @returns Package version of the library
 */
function getVersion() { return version; }
/**
 * Gets the number of web workers instantiated on a page with GL JS maps.
 * By default, workerCount is 1 except for Safari browser where it is set to half the number of CPU cores (capped at 3).
 * Make sure to set this property before creating any map instances for it to have effect.
 *
 * @returns Number of workers currently configured.
 * @example
 * ```ts
 * const workerCount = getWorkerCount()
 * ```
 */
function getWorkerCount() { return WorkerPool.workerCount; }
/**
 * Sets the number of web workers instantiated on a page with GL JS maps.
 * By default, workerCount is 1 except for Safari browser where it is set to half the number of CPU cores (capped at 3).
 * Make sure to set this property before creating any map instances for it to have effect.
 *
 * @example
 * ```ts
 * setWorkerCount(2);
 * ```
 */
function setWorkerCount(count: number) { WorkerPool.workerCount = count; }
/**
 * Gets and sets the maximum number of images (raster tiles, sprites, icons) to load in parallel,
 * which affects performance in raster-heavy maps. 16 by default.
 *
 * @returns Number of parallel requests currently configured.
 * @example
 * ```ts
 * getMaxParallelImageRequests();
 * ```
 */
function getMaxParallelImageRequests() { return config.MAX_PARALLEL_IMAGE_REQUESTS; }
/**
 * Sets the maximum number of images (raster tiles, sprites, icons) to load in parallel,
 * which affects performance in raster-heavy maps. 16 by default.
 *
 * @example
 * ```ts
 * setMaxParallelImageRequests(10);
 * ```
 */
function setMaxParallelImageRequests(numRequests: number) { config.MAX_PARALLEL_IMAGE_REQUESTS = numRequests; }
/**
 * Gets the worker url
 * @returns The worker url
 */
function getWorkerUrl() { return config.WORKER_URL; }
/**
 * Sets the worker url
 */
function setWorkerUrl(value: string) { config.WORKER_URL = value; }
/**
 * Allows loading javascript code in the worker thread.
 * *Note* that since this is using some very internal classes and flows it is considered experimental and can break at any point.
 *
 * It can be useful for the following examples:
 * 1. Using `self.addProtocol` in the worker thread - note that you might need to also register the protocol on the main thread.
 * 2. Using `self.registerWorkerSource(workerSource: WorkerSource)` to register a worker source, which should come with `addSourceType` usually.
 * 3. using `self.actor.registerMessageHandler` to override some internal worker operations
 * @param workerUrl - the worker url e.g. a url of a javascript file to load in the worker
 * @returns
 *
 * @example
 * ```ts
 * // below is an example of sending a js file to the worker to load the method there
 * // Note that you'll need to call the global function `addProtocol` in the worker to register the protocol there.
 * // add-protocol-worker.js
 * async function loadFn(params, abortController) {
 *     const t = await fetch(`https://${params.url.split("://")[1]}`);
 *     if (t.status == 200) {
 *         const buffer = await t.arrayBuffer();
 *         return {data: buffer}
 *     } else {
 *         throw new Error(`Tile fetch error: ${t.statusText}`);
 *     }
 * }
 * self.addProtocol('custom', loadFn);
 *
 * // main.js
 * importScriptInWorkers('add-protocol-worker.js');
 * ```
 */
function importScriptInWorkers(workerUrl: string) { return getGlobalDispatcher().broadcast(MessageType.importScript, workerUrl); }

export {
    addProtocol, addSourceType, AJAXError, AttributionControl, BoxZoomHandler, CanvasSource, clearPrewarmedResources, config, CooperativeGesturesHandler, createTileMesh, DoubleClickZoomHandler, DragPanHandler, DragRotateHandler, EdgeInsets, Event, Evented, FullscreenControl, GeoJSONSource, GeolocateControl, getMaxParallelImageRequests, getRTLTextPluginStatus, getVersion,
    getWorkerCount, getWorkerUrl, GlobeControl,
    Hash, ImageSource, importScriptInWorkers, KeyboardHandler, LngLat,
    LngLatBounds, LogoControl, Map, MapMouseEvent, MapTouchEvent, MapWheelEvent, Marker, MercatorCoordinate, NavigationControl, Point, Popup, prewarm, RasterDEMTileSource,
    RasterTileSource, removeProtocol, ScaleControl, ScrollZoomHandler, setMaxParallelImageRequests, setRTLTextPlugin, setWorkerCount, setWorkerUrl, Style, TerrainControl, TwoFingersTouchPitchHandler, TwoFingersTouchRotateHandler, TwoFingersTouchZoomHandler, TwoFingersTouchZoomRotateHandler, VectorTileSource,
    VideoSource, type Actor, type ActorMessage, type AddLayerObject, type AddProtocolAction, type Alignment, type AlphaImage, type AnimationOptions, type AroundCenterOptions, type AttributionControlOptions, type Bucket, type CalculateTileZoomFunction, type CameraForBoundsOptions, type CameraOptions, type CameraUpdateTransformFunction, type CanonicalTileRange, type CanvasSourceSpecification, type CenterZoomBearing, type CollisionBoxArray, type Complete, type ControlPosition, type Coordinates, type CoveringTilesOptions, type CreateTileMeshOptions, type CustomLayerInterface, type CustomRenderMethod, type CustomRenderMethodInput, type DashEntry, type Dispatcher, type DistributiveKeys, type DistributiveOmit, type DragPanOptions, type EaseToOptions, type ErrorEvent, type ExpiryData, type FeatureIdentifier, type FeatureIndex, type FitBoundsOptions,
    type FlyToOptions, type FullscreenControlOptions, type GeoJSONFeature, type GeoJSONFeatureDiff, type GeoJSONFeatureId, type GeoJSONSourceDiff,
    type GeolocateControlOptions, type GestureOptions, type GetResourceResponse, type GlyphPosition, type GlyphPositions, type Handler, type HandlerResult, type IActor, type IControl, type ImageAtlas, type IndicesType, type JumpToOptions, type Listener, type LngLatBoundsLike, type LngLatLike, type LogoControlOptions, type MapContextEvent, type MapDataEvent, type MapEventType, type MapGeoJSONFeature, type MapLayerEventType, type MapLayerMouseEvent, type MapLayerTouchEvent, type MapLibreEvent, type MapLibreZoomEvent, type MapOptions, type MapProjectionEvent, type MapSourceDataEvent, type MapSourceDataType, type MapStyleDataEvent, type MapStyleImageMissingEvent, type MapTerrainEvent, type MarkerOptions, type MessageType, type NavigationControlOptions, type Offset,
    type OverscaledTileID, type PaddingOptions, type PointLike, type PopupOptions, type PositionAnchor,
    type ProjectionData, type QueryRenderedFeaturesOptions,
    type QuerySourceFeatureOptions, type RequestParameters,
    type RequestResponseMessageMap, type RequestTransformFunction, type RequireAtLeastOne, type ResourceType, type ScaleControlOptions, type SetClusterOptions, type Source, type SourceClass, type StyleGlyph, type StyleImage,
    type StyleImageData, type StyleImageInterface, type StyleImageMetadata,
    type StyleLayer, type StyleOptions, type StyleSetterOptions, type StyleSwapOptions, type Subscription, type TextFit, type Tile, type TileMesh, type TransformStyleFunction, type Unit, type UpdateImageOptions, type WebGLContextAttributesWithType, type WorkerTileResult
};

