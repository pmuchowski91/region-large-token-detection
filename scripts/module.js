Hooks.once('init', () => {
    libWrapper.register('region-large-token-detection', 'TokenDocument.prototype.testInsideRegion', function (wrapped, ...args) {
        if (args.length < 2) {
            return wrapped(...args);
        }

        let [region, { x, y, elevation, width = 1, height = 1 }] = args;

        if (width < 2 && height < 2) {
            return wrapped(...args);
        }

        const points = [];
        const size = canvas.dimensions.size;

        for (let w = 0.5; w < width; w++) {
            for (let h = 0.5; h < height; h++) {
                points.push({ x: x + w * size, y: y + h * size, elevation });
            }
        }

        return points.some(point => region.testPoint(point));
    });

    libWrapper.register('region-large-token-detection', 'TokenDocument.prototype.segmentizeRegionMovementPath', function (wrapped, ...args) {
        let [region, waypoints] = args;
        let [{ width = 1, height = 1, elevation = 0 }] = waypoints;

        if (width < 2 && height < 2) {
            return wrapped(...args);
        }

        const points = [];
        const size = canvas.dimensions.size;

        for (let w = 0.5; w < width; w++) {
            for (let h = 0.5; h < height; h++) {
                points.push({ x: w * size, y: h * size, elevation });
            }
        }

        return region.segmentizeMovementPath(waypoints, points);
    });
});
