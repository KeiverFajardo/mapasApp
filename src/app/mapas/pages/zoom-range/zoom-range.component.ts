import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements  AfterViewInit, OnDestroy{

  @ViewChild('mapa') divMapa! : ElementRef
  mapa! : mapboxgl.Map;
  zoomLevel : number = 10;
  center: [number, number] = [ -75.921029433568, 45.28719674822362 ]

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
     container: this.divMapa.nativeElement,
     style: 'mapbox://styles/mapbox/streets-v11',
     center: this.center,
     zoom: this.zoomLevel
   });

   this.mapa.on('zoom', (ev) => {
    this.zoomLevel = this.mapa.getZoom();
   });

   this.mapa.on('zoomend', (ev) => {
    if (this.mapa.getZoom() > 18 ){
      this.mapa.zoomTo(18);
    }
   });

   //movimiento del mapa
   this.mapa.on('move', (ev) => {
    const target = ev.target;
    const { lng, lat } = target.getCenter()
    this.center = [lng, lat]
   })
 }

 zoomIn(){
    this.mapa.zoomIn();
 }

 zoomOut(){
    this.mapa.zoomOut();
 }

 zoomCambio(valor : string){
  this.mapa.zoomTo( Number(valor) )
 }
}
