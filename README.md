# Omlox Angular Client

A TypeScript Angular client for the omlox Hub API with Bearer authentication support.

## Features

- Native Angular services using HttpClient
- Bearer token authentication
- Full TypeScript support with typed models
- Observable-based API

## Installation

```bash
npm install @kodira/omlox-client-typescript-angular
```

## Usage

### 1. Provide the services (recommended for modern Angular)

```typescript
import { bootstrapApplication } from '@angular/platform-browser'
import { provideOmloxClient } from '@kodira/omlox-client-typescript-angular'
import { AppComponent } from './app/app.component'

bootstrapApplication(AppComponent, {
    providers: [
        provideOmloxClient({
            baseUrl: 'https://your-omlox-hub.com/api',
        }),
    ],
})
```

### 1. Alternative: Import the module (legacy)

```typescript
import { OmloxClientModule } from '@kodira/omlox-client-typescript-angular'

@NgModule({
    imports: [
        OmloxClientModule.forRoot({
            baseUrl: 'https://your-omlox-hub.com/api',
        }),
    ],
})
export class AppModule {}
```

### 2. Use in your services

```typescript
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { OmloxTrackablesService, OmloxBaseService, Trackable } from '@kodira/omlox-client-typescript-angular'

@Injectable()
export class YourService {
    private trackablesService = inject(OmloxTrackablesService)
    private baseService = inject(OmloxBaseService)

    setupAuth(token: string): void {
        this.baseService.setBearerToken(token)
    }

    getTrackables(): Observable<Trackable[]> {
        return this.trackablesService.getAllTrackables()
    }
}
```

## Available Services

- `OmloxTrackablesService` - Trackable management
- `OmloxFencesService` - Fence and collision management
- `OmloxZonesService` - Zone management
- `OmloxProvidersService` - Location provider management
- `OmloxBaseService` - Base service with authentication

## Authentication

The client uses Bearer token authentication. Set the token using:

```typescript
baseService.setBearerToken('your-jwt-token')
```

The token will be automatically included in all subsequent API requests.

## Models

All omlox data models are fully typed:

```typescript
import { Trackable, Fence, Zone, Location, TrackableMotion } from '@kodira/omlox-client-typescript-angular'
```

