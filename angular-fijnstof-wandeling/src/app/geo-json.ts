export interface Properties {
    name: string;
}

export interface Crs {
    type: string;
    properties: Properties;
}

export interface Geometry {
    type: string;
    coordinates: number[][][];
}

export interface Properties2 {
    OBJECTID: number;
    ID: number;
    GRIDCODE: number;
    SHAPE_Length: number;
    SHAPE_Area: number;
}

export interface Feature {
    type: string;
    id: number;
    geometry: Geometry;
    properties: Properties2;
}

export interface GeoJSON {
    type: string;
    crs: Crs;
    features: Feature[];
}
