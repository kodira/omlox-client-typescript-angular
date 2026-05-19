/**
 * GeoJSON Point geometry representing a single coordinate position.
 * Used for specifying exact locations in 2D or 3D space.
 */
export interface Point {
    /** GeoJSON geometry type identifier */
    type: 'Point'
    /** Coordinate array: [longitude, latitude] or [longitude, latitude, altitude] */
    coordinates: [number, number] | [number, number, number]
}

/**
 * GeoJSON Polygon geometry representing a closed area.
 * Used for defining boundaries, zones, and fence regions.
 */
export interface Polygon {
    /** GeoJSON geometry type identifier */
    type: 'Polygon'
    /** Array of linear ring coordinate arrays defining the polygon */
    coordinates: number[][][]
}

/**
 * GeoJSON LineString geometry representing a series of connected points.
 * Used for defining paths, routes, or linear boundaries.
 */
export interface LineString {
    /** GeoJSON geometry type identifier */
    type: 'LineString'
    /** Array of coordinate arrays defining the line */
    coordinates: number[][]
}

/**
 * Union type for all supported GeoJSON geometry types.
 * Represents any geometric shape that can be used in the OMLOX system.
 */
export type Geometry = Point | Polygon | LineString

/**
 * Locating rule schema from the OMLOX Hub API specification.
 * Defines conditions for location provider selection.
 */
export interface RuleSetInner {
    /** The conditions of the LocatingRule. Supported properties are: accuracy, provider_id, type, source, floor, speed, timestamp_diff. */
    expression?: string
    /** The priority of the LocatingRule. The higher the value the higher the priority of the rule. */
    priority?: number
}

/**
 * Standard error response structure for API operations.
 * Provides consistent error information across the system.
 */
export interface ModelError {
    /** Numeric error code for programmatic error handling */
    code?: number
    /** Human-readable error description */
    message?: string
}

/**
 * Proximity event data schema from the OMLOX Hub API specification.
 * Represents proximity-based location updates from systems like RFID or iBeacon.
 */
export interface Proximity {
    /** Represents the unique identifier of the proximity system (ie. zone_id or foreign_id) that generated the proximity object. For example, this could be the RFID station id or iBeacon UUID. */
    source: string
    /** The location provider type that triggered the proximity update. */
    provider_type: 'rfid' | 'ibeacon' | 'virtual' | 'unknown'
    /** The location provider unique identifier, e.g. the UID or TID of a RFID tag. */
    provider_id: string
    /** The timestamp when the location was calculated. The timestamp MUST be an ISO 8601 timestamp using UTC timezone and it SHOULD have millisecond precision to allow for precise speed and course calculations. */
    timestamp_generated?: string
    /** The timestamp when the location was sent over the network. The timestamp MUST be an ISO 8601 timestamp using UTC timezone and it SHOULD have millisecond precision. Note: No delivery guarantee is made in case the data is lost in transit. */
    timestamp_sent?: string
    /** The estimated distance in meters to the center of the proximity event emitter (e.g. the distance to the iBeacon). */
    accuracy?: number
    /** Any additional application or vendor specific properties. An application implementing this object is not required to interpret any of the custom properties, but it MUST preserve the properties if set. */
    properties?: Record<string, any>
}

/**
 * Spatial transformation parameters for coordinate system conversion.
 * Used for translating and rotating coordinate systems.
 */
export interface SimpleTransform {
    /** Translation along X-axis in meters */
    x?: number
    /** Translation along Y-axis in meters */
    y?: number
    /** Translation along Z-axis in meters */
    z?: number
    /** Rotation around Z-axis in degrees (heading/bearing) */
    yaw?: number
    /** Rotation around Y-axis in degrees (elevation angle) */
    pitch?: number
    /** Rotation around X-axis in degrees (bank/tilt angle) */
    roll?: number
}
