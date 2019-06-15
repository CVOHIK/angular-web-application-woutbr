export class GeometryEnvelope {
    constructor(
        public xmin: number,
        public ymin: number,
        public xmax: number,
        public ymax: number) { }

    toString() {
        return [
            this.xmin,
            this.ymin,
            this.xmax,
            this.ymax
        ].join(',');
    }

    static createGeometryEnvelopeFromLatLngBounds(bounds: google.maps.LatLngBounds): GeometryEnvelope {
        let southWest = bounds.getSouthWest();
        let northEast = bounds.getNorthEast();
        //lat is y, lng is x
        return new GeometryEnvelope(
            southWest.lng(),
            southWest.lat(),
            northEast.lng(),
            northEast.lat()
        );
    }
}
