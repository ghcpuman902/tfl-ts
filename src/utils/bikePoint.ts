/**
 * Bike Point Utilities
 * 
 * This module provides utility functions for working with bike point data,
 * including status extraction, filtering, and property access.
 * 
 * @example
 * import { getPropertyValue, findElectricBikes } from 'tfl-ts/utils/bikePoint';
 * 
 * // Get property values from bike point data
 * const bikes = getPropertyValue(bikePoint, 'NbBikes');
 * console.log(`Bikes available: ${bikes || 0}`);
 * 
 * // Filter bike points with electric bikes
 * const eBikePoints = findElectricBikes(allBikePoints);
 * console.log(`Found ${eBikePoints.length} bike points with electric bikes`);
 */

import { BikePointInfo, BikePointProperty, BikePointStatus } from '../bikePoint';

/**
 * Extract bike point status information from raw bike point data
 * 
 * This internal utility function parses the additional properties of a bike point
 * to extract meaningful status information like available bikes, spaces, etc.
 * 
 * @internal This function is used internally by the BikePoint class and should not be used directly.
 * @param bikePoint - Raw bike point information from the API
 * @param keepTflTypes - Whether to preserve original additional properties
 * @returns Structured bike point status information
 */
const extractStatus = (bikePoint: BikePointInfo, keepTflTypes: boolean = false): BikePointStatus => {
  const id = bikePoint.id || '';
  const name = bikePoint.commonName || 'Unknown';
  const lat = bikePoint.lat;
  const lon = bikePoint.lon;

  // Extract property values
  const bikes = getPropertyValue(bikePoint, 'NbBikes');
  const docks = getPropertyValue(bikePoint, 'NbDocks');
  const spaces = getPropertyValue(bikePoint, 'NbEmptyDocks');
  const terminalName = getPropertyValue(bikePoint, 'TerminalName');
  const isInstalled = getPropertyValue(bikePoint, 'Installed');
  const isLocked = getPropertyValue(bikePoint, 'Locked');
  const installDate = getPropertyValue(bikePoint, 'InstallDate');
  const removalDate = getPropertyValue(bikePoint, 'RemovalDate');
  const isTemporary = getPropertyValue(bikePoint, 'Temporary');
  const standardBikes = getPropertyValue(bikePoint, 'StandardBikes');
  const eBikes = getPropertyValue(bikePoint, 'EBikes');

  // Parse numeric values
  const bikesCount = bikes ? Number(bikes) : 0;
  const docksCount = docks ? Number(docks) : 0;
  const spacesCount = spaces ? Number(spaces) : 0;
  const standardBikesCount = standardBikes ? Number(standardBikes) : 0;
  const eBikesCount = eBikes ? Number(eBikes) : 0;

  // Calculate broken docks
  const brokenDocks = Math.max(0, docksCount - (bikesCount + spacesCount));

  return {
    id,
    name,
    bikes: bikesCount,
    docks: docksCount,
    spaces: spacesCount,
    brokenDocks,
    lat,
    lon,
    terminalName,
    isInstalled: isInstalled === 'true',
    isLocked: isLocked === 'true',
    installDate,
    removalDate: removalDate === 'null' ? null : removalDate,
    isTemporary: isTemporary === 'true',
    standardBikes: standardBikesCount,
    eBikes: eBikesCount,
    ...(keepTflTypes && bikePoint.additionalProperties && { additionalProperties: bikePoint.additionalProperties })
  };
};

/**
 * Get a property value from bike point additional properties
 * 
 * This utility function searches through the additional properties
 * of a bike point to find a specific property by its key.
 * 
 * @param bikePoint - Bike point information
 * @param key - Property key to search for
 * @returns Property value or undefined if not found
 * @example
 * // Get number of bikes
 * const bikes = getPropertyValue(bikePoint, 'NbBikes');
 * console.log(`Bikes available: ${bikes || 0}`);
 * 
 * // Get terminal name
 * const terminal = getPropertyValue(bikePoint, 'TerminalName');
 * if (terminal) {
 *   console.log(`Terminal: ${terminal}`);
 * }
 */
export const getPropertyValue = (bikePoint: BikePointInfo, key: string): string | undefined => {
  if (!bikePoint.additionalProperties) {
    return undefined;
  }

  const property = bikePoint.additionalProperties.find(prop => prop.key === key);
  return property?.value;
};

// Export internal function for use by BikePoint class
export { extractStatus };

/**
 * Find bike points with electric bikes available
 * 
 * This utility function filters bike points to find those with electric bikes
 * available for hire.
 * 
 * @param bikePoints - Array of bike point information
 * @returns Array of bike points with electric bikes
 * @example
 * // Find bike points with electric bikes
 * const allBikePoints = await client.bikePoint.get();
 * const eBikePoints = findElectricBikes(allBikePoints);
 * 
 * console.log(`Found ${eBikePoints.length} bike points with electric bikes`);
 * 
 * eBikePoints.forEach(bikePoint => {
 *   const status = extractStatus(bikePoint);
 *   console.log(`${status.name}: ${status.eBikes} electric bikes`);
 * });
 */
export const findElectricBikes = (bikePoints: BikePointInfo[]): BikePointInfo[] => {
  return bikePoints.filter(bikePoint => {
    const eBikes = getPropertyValue(bikePoint, 'EBikes');
    return eBikes && Number(eBikes) > 0;
  });
};

/**
 * Sort bike points by distance from a location
 * 
 * This utility function sorts bike points by their distance from a given
 * location, with closest points first.
 * 
 * @param bikePoints - Array of bike point information
 * @param lat - Latitude of the reference point
 * @param lon - Longitude of the reference point
 * @returns Sorted array of bike points
 * @example
 * // Sort bike points by distance from a location
 * const allBikePoints = await client.bikePoint.get();
 * const sortedByDistance = sortByDistance(allBikePoints, 51.508418, -0.067048);
 * 
 * console.log('Closest bike points:');
 * sortedByDistance.slice(0, 5).forEach((bikePoint, index) => {
 *   const status = extractStatus(bikePoint);
 *   console.log(`${index + 1}. ${status.name} (${bikePoint.distance?.toFixed(0)}m)`);
 * });
 */
export const sortByDistance = (
  bikePoints: BikePointInfo[], 
  lat: number, 
  lon: number
): BikePointInfo[] => {
  return [...bikePoints].sort((a, b) => {
    const distanceA = a.distance || 0;
    const distanceB = b.distance || 0;
    return distanceA - distanceB;
  });
};

/**
 * Find the closest bike point with available bikes
 * 
 * This utility function finds the nearest bike point that has bikes available
 * for hire.
 * 
 * @param bikePoints - Array of bike point information
 * @returns Closest bike point with bikes, or undefined if none found
 * @example
 * // Find closest bike point with bikes
 * const allBikePoints = await client.bikePoint.get();
 * const closestWithBikes = findClosestWithBikes(allBikePoints);
 * 
 * if (closestWithBikes) {
 *   const status = extractStatus(closestWithBikes);
 *   console.log(`Closest bike point with bikes: ${status.name} (${closestWithBikes.distance?.toFixed(0)}m)`);
 * } else {
 *   console.log('No bike points with available bikes found');
 * }
 */
export const findClosestWithBikes = (bikePoints: BikePointInfo[]): BikePointInfo | undefined => {
  const availableBikes = bikePoints.filter(bikePoint => {
    const bikes = getPropertyValue(bikePoint, 'NbBikes');
    return bikes && Number(bikes) > 0;
  });
  const sortedByDistance = sortByDistance(availableBikes, 0, 0); // Distance already calculated
  return sortedByDistance[0];
}; 