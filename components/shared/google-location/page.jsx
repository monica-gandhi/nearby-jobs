'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_OPTIONS } from '@/lib/googleMapsLoader';
import { cn } from '@/common/utils/cn';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const GoogleMapPicker = ({
    initialLat,
    initialLng,
    onLocationSelect,
    label = "",
    required = false,
    formSubmitted = false,
    initalAddress = "",
}) => {
    const [selectedPosition, setSelectedPosition] = useState({ lat: initialLat, lng: initialLng });
    const [address, setAddress] = useState('');
    const [showMap, setShowMap] = useState(false);
    const [touched, setTouched] = useState(false);

    const autocompleteRef = useRef(null);
    const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_API_OPTIONS);

    useEffect(() => {
        if (!address) setTouched(false);
    }, [address]);

    useEffect(() => {
        if (initalAddress && initialLat && initialLng) {
            setAddress(initalAddress);
            setSelectedPosition({ lat: Number(initialLat), lng: Number(initialLng) });
            setShowMap(true);
        }
    }, [initalAddress, initialLat, initialLng]);

    const hasError = required && address === '' && (touched || formSubmitted);

    const fetchAddress = (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder();
        const latLng = new window.google.maps.LatLng(lat, lng);
        geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const resultAddress = results[0].formatted_address;
                setAddress(resultAddress);
                onLocationSelect(lat, lng, resultAddress);
            }
        });
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedPosition({ lat, lng });
        setAddress(place.formatted_address || '');
        onLocationSelect(lat, lng, place.formatted_address);
    };

    if (!isLoaded) return <p>Loading Map...</p>;

    const isValidLatLng =
        selectedPosition.lat &&
        selectedPosition.lng &&
        !isNaN(selectedPosition.lat) &&
        !isNaN(selectedPosition.lng);

    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor="google-map-address"
                    className={cn(
                        "text-sm font-medium leading-none",
                        hasError ? "text-destructive" : "text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}

            <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={handlePlaceChanged}
            >
                <input
                    id="google-map-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onFocus={() => setShowMap(true)}
                    onBlur={() => setTouched(true)}
                    placeholder="Search location"
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm " +
                        "ring-offset-background placeholder:text-muted-foreground " +
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        hasError && "border-destructive focus-visible:ring-destructive"
                    )}
                />
            </Autocomplete>

            {hasError && (
                <p className="text-sm text-destructive">
                    {label.split('(')?.[0] || "This field"} is required
                </p>
            )}

            {showMap && isValidLatLng && (
                <>
                    <div className="my-2">
                        <button
                            type="button"
                            onClick={() => setShowMap(false)}
                            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300"
                        >
                            Close Map
                        </button>
                    </div>

                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={selectedPosition}
                        zoom={15}
                    >
                        <Marker position={selectedPosition} />
                    </GoogleMap>
                </>
            )}
        </div>
    );
};

export default GoogleMapPicker;
