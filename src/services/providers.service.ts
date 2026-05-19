import { Injectable } from '@angular/core'
import { HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { OmloxBaseService } from '../base.service'
import { LocationProvider, Location, Proximity, Fence, Trackable } from '../models'

@Injectable({
    providedIn: 'root',
})
export class OmloxProvidersService extends OmloxBaseService {
    /**
     * Get an array of all location providers.
     * Returns an array of all location provider objects. If authorization is enabled only the corresponding providers are returned.
     */
    getAllProviders(): Observable<LocationProvider[]> {
        return this.get<LocationProvider[]>('/providers/summary')
    }

    /**
     * Get a location provider.
     * Returns the location provider object with the given id.
     */
    getProvider(providerId: string): Observable<LocationProvider> {
        return this.get<LocationProvider>(`/providers/${providerId}`)
    }

    /**
     * Create a location provider.
     * Creates a new location provider and returns the created object.
     */
    createProvider(provider: LocationProvider): Observable<LocationProvider> {
        return this.post<LocationProvider>('/providers', provider)
    }

    /**
     * Update a location provider.
     * Updates the location provider object with the given id.
     */
    updateProvider(providerId: string, provider: LocationProvider): Observable<LocationProvider> {
        return this.put<LocationProvider>(`/providers/${providerId}`, provider)
    }

    /**
     * Delete location provider.
     * Deletes the location provider object with the given id.
     */
    deleteProvider(providerId: string): Observable<void> {
        return this.delete<void>(`/providers/${providerId}`)
    }

    /**
     * Delete all location providers.
     * This function deletes all location providers known to the system.
     */
    deleteAllProviders(): Observable<void> {
        return this.delete<void>('/providers')
    }

    /**
     * Get sensors for a location provider.
     * Returns sensor data associated with the specified location provider.
     */
    getProviderSensors(providerId: string): Observable<any[]> {
        return this.get<any[]>(`/providers/${providerId}/sensors`)
    }

    /**
     * Update location of a location provider.
     * Updates the current location of the location provider with the given id.
     */
    updateProviderLocation(providerId: string, location: Location): Observable<void> {
        return this.put<void>(`/providers/${providerId}/location`, location)
    }

    /**
     * Get location of a location provider.
     * Returns the last known location for a location provider.
     */
    getProviderLocation(providerId: string): Observable<Location> {
        return this.get<Location>(`/providers/${providerId}/location`)
    }

    /**
     * Delete location of a location provider.
     * Deletes the location object of the provider with the given id.
     */
    deleteProviderLocation(providerId: string): Observable<void> {
        return this.delete<void>(`/providers/${providerId}/location`)
    }

    /**
     * Update location of location provider via a proximity event.
     * Updates the current location of one location provider by an emitted proximity event.
     * A location object is generated internally by using the position and floor information related to the omlox™ zone that generated the proximity event.
     */
    updateProviderProximity(providerId: string, proximity: Proximity): Observable<void> {
        return this.put<void>(`/providers/${providerId}/proximity`, proximity)
    }

    /**
     * Get all locations for all location providers.
     * Returns the last known location for all location providers. If authorization is enabled only the corresponding locations are returned.
     */
    getAllLocations(params?: { crs?: string; zone_id?: string; geojson?: boolean }): Observable<Location[]> {
        let httpParams = new HttpParams()
        if (params?.crs) httpParams = httpParams.set('crs', params.crs)
        if (params?.zone_id) httpParams = httpParams.set('zone_id', params.zone_id)
        if (params?.geojson !== undefined) httpParams = httpParams.set('geojson', params.geojson.toString())
        return this.get<Location[]>('/providers/locations', httpParams)
    }

    /**
     * Bulk update of locations.
     * Updates multiple locations in a bulk operation.
     */
    updateLocations(locations: Location[]): Observable<void> {
        return this.put<void>('/providers/locations', locations)
    }

    /**
     * Bulk update of locations based on proximity events.
     * Updates locations related to proximity events in a bulk operation.
     * Location objects are generated internally by using the position and floor information related to the omlox™ zone that generated the proximity events.
     */
    updateProximities(proximities: Proximity[]): Observable<void> {
        return this.put<void>('/providers/proximities', proximities)
    }

    /**
     * Get all fences the location provider is within.
     * Returns all fences that the location provider is currently within.
     */
    getProviderFences(providerId: string): Observable<Fence[]> {
        return this.get<Fence[]>(`/providers/${providerId}/fences`)
    }

    /**
     * Get all trackables bound to a specific location provider.
     * Retrieves a list of trackables that are bound to a specific location provider.
     */
    getProviderTrackables(providerId: string): Observable<Trackable[]> {
        return this.get<Trackable[]>(`/providers/${providerId}/trackables`)
    }
}
