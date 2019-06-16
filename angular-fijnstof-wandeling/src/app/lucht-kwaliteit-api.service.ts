import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeoJSON } from './geo-json';
import { GeometryEnvelope } from './geometry-envelope';

@Injectable({
  providedIn: 'root'
})
export class LuchtKwaliteitApiService {
  // http://portaal-stadantwerpen.opendata.arcgis.com/datasets/2016-stikstofdioxide-no2
  readonly arcgisUrl = 'https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/';
  readonly arcgisMapNO2 = 'portal_publiek9/MapServer/870/query';

  constructor(private http: HttpClient) { }

  getLuchtkwaliteitWithinGeometry(geometrybox: GeometryEnvelope): Observable<GeoJSON> {
    // http://resources.esri.com/help/9.3/arcgisserver/apis/ArcObjects/esrigeodatabase/esriSpatialRelEnum.htm
    // esriSpatialRelIndexIntersects : Returns a feature if the envelope of the query geometry intersects the index entry for the target geometry.
    // Because it uses the underlying index grid, rather than the evelope of the feature, it is faster and is commonly used for return features for display purposes.

    let queryParams = '?where=1%3D1&outFields=*'
      + '&geometry=' + geometrybox.toString()
      + '&geometryType=esriGeometryEnvelope&inSR=4326'
      + '&spatialRel=esriSpatialRelIndexIntersects'
      + '&outSR=4326&f=geojson';
    let url = this.arcgisUrl + this.arcgisMapNO2 + queryParams;
    // console.log(`getLuchtkwaliteitWithinGeometry( ${url} )`);
    let response = this.http.get<GeoJSON>(url);
    return response;
  }
}
