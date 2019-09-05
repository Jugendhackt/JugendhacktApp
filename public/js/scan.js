function ECB(count, dataCodewords) {
    this.count = count, this.dataCodewords = dataCodewords, this.__defineGetter__("Count", function () {
        return this.count
    }), this.__defineGetter__("DataCodewords", function () {
        return this.dataCodewords
    })
}

function ECBlocks(ecCodewordsPerBlock, ecBlocks1, ecBlocks2) {
    this.ecCodewordsPerBlock = ecCodewordsPerBlock, ecBlocks2 ? this.ecBlocks = [ecBlocks1, ecBlocks2] : this.ecBlocks = new Array(ecBlocks1), this.__defineGetter__("ECCodewordsPerBlock", function () {
        return this.ecCodewordsPerBlock
    }), this.__defineGetter__("TotalECCodewords", function () {
        return this.ecCodewordsPerBlock * this.NumBlocks
    }), this.__defineGetter__("NumBlocks", function () {
        for (var total = 0, i = 0; i < this.ecBlocks.length; i++) total += this.ecBlocks[i].length;
        return total
    }), this.getECBlocks = function () {
        return this.ecBlocks
    }
}

function Version(versionNumber, alignmentPatternCenters, ecBlocks1, ecBlocks2, ecBlocks3, ecBlocks4) {
    this.versionNumber = versionNumber, this.alignmentPatternCenters = alignmentPatternCenters, this.ecBlocks = [ecBlocks1, ecBlocks2, ecBlocks3, ecBlocks4];
    for (var total = 0, ecCodewords = ecBlocks1.ECCodewordsPerBlock, ecbArray = ecBlocks1.getECBlocks(), i = 0; i < ecbArray.length; i++) {
        var ecBlock = ecbArray[i];
        total += ecBlock.Count * (ecBlock.DataCodewords + ecCodewords)
    }
    this.totalCodewords = total, this.__defineGetter__("VersionNumber", function () {
        return this.versionNumber
    }), this.__defineGetter__("AlignmentPatternCenters", function () {
        return this.alignmentPatternCenters
    }), this.__defineGetter__("TotalCodewords", function () {
        return this.totalCodewords
    }), this.__defineGetter__("DimensionForVersion", function () {
        return 17 + 4 * this.versionNumber
    }), this.buildFunctionPattern = function () {
        var dimension = this.DimensionForVersion, bitMatrix = new BitMatrix(dimension);
        bitMatrix.setRegion(0, 0, 9, 9), bitMatrix.setRegion(dimension - 8, 0, 8, 9), bitMatrix.setRegion(0, dimension - 8, 9, 8);
        for (var max = this.alignmentPatternCenters.length, x = 0; max > x; x++) for (var i = this.alignmentPatternCenters[x] - 2, y = 0; max > y; y++) 0 == x && (0 == y || y == max - 1) || x == max - 1 && 0 == y || bitMatrix.setRegion(this.alignmentPatternCenters[y] - 2, i, 5, 5);
        return bitMatrix.setRegion(6, 9, 1, dimension - 17), bitMatrix.setRegion(9, 6, dimension - 17, 1), this.versionNumber > 6 && (bitMatrix.setRegion(dimension - 11, 0, 3, 6), bitMatrix.setRegion(0, dimension - 11, 6, 3)), bitMatrix
    }, this.getECBlocksForLevel = function (ecLevel) {
        return this.ecBlocks[ecLevel.ordinal()]
    }
}

function buildVersions() {
    return [new Version(1, [], new ECBlocks(7, new ECB(1, 19)), new ECBlocks(10, new ECB(1, 16)), new ECBlocks(13, new ECB(1, 13)), new ECBlocks(17, new ECB(1, 9))), new Version(2, [6, 18], new ECBlocks(10, new ECB(1, 34)), new ECBlocks(16, new ECB(1, 28)), new ECBlocks(22, new ECB(1, 22)), new ECBlocks(28, new ECB(1, 16))), new Version(3, [6, 22], new ECBlocks(15, new ECB(1, 55)), new ECBlocks(26, new ECB(1, 44)), new ECBlocks(18, new ECB(2, 17)), new ECBlocks(22, new ECB(2, 13))), new Version(4, [6, 26], new ECBlocks(20, new ECB(1, 80)), new ECBlocks(18, new ECB(2, 32)), new ECBlocks(26, new ECB(2, 24)), new ECBlocks(16, new ECB(4, 9))), new Version(5, [6, 30], new ECBlocks(26, new ECB(1, 108)), new ECBlocks(24, new ECB(2, 43)), new ECBlocks(18, new ECB(2, 15), new ECB(2, 16)), new ECBlocks(22, new ECB(2, 11), new ECB(2, 12))), new Version(6, [6, 34], new ECBlocks(18, new ECB(2, 68)), new ECBlocks(16, new ECB(4, 27)), new ECBlocks(24, new ECB(4, 19)), new ECBlocks(28, new ECB(4, 15))), new Version(7, [6, 22, 38], new ECBlocks(20, new ECB(2, 78)), new ECBlocks(18, new ECB(4, 31)), new ECBlocks(18, new ECB(2, 14), new ECB(4, 15)), new ECBlocks(26, new ECB(4, 13), new ECB(1, 14))), new Version(8, [6, 24, 42], new ECBlocks(24, new ECB(2, 97)), new ECBlocks(22, new ECB(2, 38), new ECB(2, 39)), new ECBlocks(22, new ECB(4, 18), new ECB(2, 19)), new ECBlocks(26, new ECB(4, 14), new ECB(2, 15))), new Version(9, [6, 26, 46], new ECBlocks(30, new ECB(2, 116)), new ECBlocks(22, new ECB(3, 36), new ECB(2, 37)), new ECBlocks(20, new ECB(4, 16), new ECB(4, 17)), new ECBlocks(24, new ECB(4, 12), new ECB(4, 13))), new Version(10, [6, 28, 50], new ECBlocks(18, new ECB(2, 68), new ECB(2, 69)), new ECBlocks(26, new ECB(4, 43), new ECB(1, 44)), new ECBlocks(24, new ECB(6, 19), new ECB(2, 20)), new ECBlocks(28, new ECB(6, 15), new ECB(2, 16))), new Version(11, [6, 30, 54], new ECBlocks(20, new ECB(4, 81)), new ECBlocks(30, new ECB(1, 50), new ECB(4, 51)), new ECBlocks(28, new ECB(4, 22), new ECB(4, 23)), new ECBlocks(24, new ECB(3, 12), new ECB(8, 13))), new Version(12, [6, 32, 58], new ECBlocks(24, new ECB(2, 92), new ECB(2, 93)), new ECBlocks(22, new ECB(6, 36), new ECB(2, 37)), new ECBlocks(26, new ECB(4, 20), new ECB(6, 21)), new ECBlocks(28, new ECB(7, 14), new ECB(4, 15))), new Version(13, [6, 34, 62], new ECBlocks(26, new ECB(4, 107)), new ECBlocks(22, new ECB(8, 37), new ECB(1, 38)), new ECBlocks(24, new ECB(8, 20), new ECB(4, 21)), new ECBlocks(22, new ECB(12, 11), new ECB(4, 12))), new Version(14, [6, 26, 46, 66], new ECBlocks(30, new ECB(3, 115), new ECB(1, 116)), new ECBlocks(24, new ECB(4, 40), new ECB(5, 41)), new ECBlocks(20, new ECB(11, 16), new ECB(5, 17)), new ECBlocks(24, new ECB(11, 12), new ECB(5, 13))), new Version(15, [6, 26, 48, 70], new ECBlocks(22, new ECB(5, 87), new ECB(1, 88)), new ECBlocks(24, new ECB(5, 41), new ECB(5, 42)), new ECBlocks(30, new ECB(5, 24), new ECB(7, 25)), new ECBlocks(24, new ECB(11, 12), new ECB(7, 13))), new Version(16, [6, 26, 50, 74], new ECBlocks(24, new ECB(5, 98), new ECB(1, 99)), new ECBlocks(28, new ECB(7, 45), new ECB(3, 46)), new ECBlocks(24, new ECB(15, 19), new ECB(2, 20)), new ECBlocks(30, new ECB(3, 15), new ECB(13, 16))), new Version(17, [6, 30, 54, 78], new ECBlocks(28, new ECB(1, 107), new ECB(5, 108)), new ECBlocks(28, new ECB(10, 46), new ECB(1, 47)), new ECBlocks(28, new ECB(1, 22), new ECB(15, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(17, 15))), new Version(18, [6, 30, 56, 82], new ECBlocks(30, new ECB(5, 120), new ECB(1, 121)), new ECBlocks(26, new ECB(9, 43), new ECB(4, 44)), new ECBlocks(28, new ECB(17, 22), new ECB(1, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(19, 15))), new Version(19, [6, 30, 58, 86], new ECBlocks(28, new ECB(3, 113), new ECB(4, 114)), new ECBlocks(26, new ECB(3, 44), new ECB(11, 45)), new ECBlocks(26, new ECB(17, 21), new ECB(4, 22)), new ECBlocks(26, new ECB(9, 13), new ECB(16, 14))), new Version(20, [6, 34, 62, 90], new ECBlocks(28, new ECB(3, 107), new ECB(5, 108)), new ECBlocks(26, new ECB(3, 41), new ECB(13, 42)), new ECBlocks(30, new ECB(15, 24), new ECB(5, 25)), new ECBlocks(28, new ECB(15, 15), new ECB(10, 16))), new Version(21, [6, 28, 50, 72, 94], new ECBlocks(28, new ECB(4, 116), new ECB(4, 117)), new ECBlocks(26, new ECB(17, 42)), new ECBlocks(28, new ECB(17, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(19, 16), new ECB(6, 17))), new Version(22, [6, 26, 50, 74, 98], new ECBlocks(28, new ECB(2, 111), new ECB(7, 112)), new ECBlocks(28, new ECB(17, 46)), new ECBlocks(30, new ECB(7, 24), new ECB(16, 25)), new ECBlocks(24, new ECB(34, 13))), new Version(23, [6, 30, 54, 74, 102], new ECBlocks(30, new ECB(4, 121), new ECB(5, 122)), new ECBlocks(28, new ECB(4, 47), new ECB(14, 48)), new ECBlocks(30, new ECB(11, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(16, 15), new ECB(14, 16))), new Version(24, [6, 28, 54, 80, 106], new ECBlocks(30, new ECB(6, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(6, 45), new ECB(14, 46)), new ECBlocks(30, new ECB(11, 24), new ECB(16, 25)), new ECBlocks(30, new ECB(30, 16), new ECB(2, 17))), new Version(25, [6, 32, 58, 84, 110], new ECBlocks(26, new ECB(8, 106), new ECB(4, 107)), new ECBlocks(28, new ECB(8, 47), new ECB(13, 48)), new ECBlocks(30, new ECB(7, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(13, 16))), new Version(26, [6, 30, 58, 86, 114], new ECBlocks(28, new ECB(10, 114), new ECB(2, 115)), new ECBlocks(28, new ECB(19, 46), new ECB(4, 47)), new ECBlocks(28, new ECB(28, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(33, 16), new ECB(4, 17))), new Version(27, [6, 34, 62, 90, 118], new ECBlocks(30, new ECB(8, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(22, 45), new ECB(3, 46)), new ECBlocks(30, new ECB(8, 23), new ECB(26, 24)), new ECBlocks(30, new ECB(12, 15), new ECB(28, 16))), new Version(28, [6, 26, 50, 74, 98, 122], new ECBlocks(30, new ECB(3, 117), new ECB(10, 118)), new ECBlocks(28, new ECB(3, 45), new ECB(23, 46)), new ECBlocks(30, new ECB(4, 24), new ECB(31, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(31, 16))), new Version(29, [6, 30, 54, 78, 102, 126], new ECBlocks(30, new ECB(7, 116), new ECB(7, 117)), new ECBlocks(28, new ECB(21, 45), new ECB(7, 46)), new ECBlocks(30, new ECB(1, 23), new ECB(37, 24)), new ECBlocks(30, new ECB(19, 15), new ECB(26, 16))), new Version(30, [6, 26, 52, 78, 104, 130], new ECBlocks(30, new ECB(5, 115), new ECB(10, 116)), new ECBlocks(28, new ECB(19, 47), new ECB(10, 48)), new ECBlocks(30, new ECB(15, 24), new ECB(25, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(25, 16))), new Version(31, [6, 30, 56, 82, 108, 134], new ECBlocks(30, new ECB(13, 115), new ECB(3, 116)), new ECBlocks(28, new ECB(2, 46), new ECB(29, 47)), new ECBlocks(30, new ECB(42, 24), new ECB(1, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(28, 16))), new Version(32, [6, 34, 60, 86, 112, 138], new ECBlocks(30, new ECB(17, 115)), new ECBlocks(28, new ECB(10, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(10, 24), new ECB(35, 25)), new ECBlocks(30, new ECB(19, 15), new ECB(35, 16))), new Version(33, [6, 30, 58, 86, 114, 142], new ECBlocks(30, new ECB(17, 115), new ECB(1, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(21, 47)), new ECBlocks(30, new ECB(29, 24), new ECB(19, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(46, 16))), new Version(34, [6, 34, 62, 90, 118, 146], new ECBlocks(30, new ECB(13, 115), new ECB(6, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(44, 24), new ECB(7, 25)), new ECBlocks(30, new ECB(59, 16), new ECB(1, 17))), new Version(35, [6, 30, 54, 78, 102, 126, 150], new ECBlocks(30, new ECB(12, 121), new ECB(7, 122)), new ECBlocks(28, new ECB(12, 47), new ECB(26, 48)), new ECBlocks(30, new ECB(39, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(41, 16))), new Version(36, [6, 24, 50, 76, 102, 128, 154], new ECBlocks(30, new ECB(6, 121), new ECB(14, 122)), new ECBlocks(28, new ECB(6, 47), new ECB(34, 48)), new ECBlocks(30, new ECB(46, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(2, 15), new ECB(64, 16))), new Version(37, [6, 28, 54, 80, 106, 132, 158], new ECBlocks(30, new ECB(17, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(29, 46), new ECB(14, 47)), new ECBlocks(30, new ECB(49, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(24, 15), new ECB(46, 16))), new Version(38, [6, 32, 58, 84, 110, 136, 162], new ECBlocks(30, new ECB(4, 122), new ECB(18, 123)), new ECBlocks(28, new ECB(13, 46), new ECB(32, 47)), new ECBlocks(30, new ECB(48, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(42, 15), new ECB(32, 16))), new Version(39, [6, 26, 54, 82, 110, 138, 166], new ECBlocks(30, new ECB(20, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(40, 47), new ECB(7, 48)), new ECBlocks(30, new ECB(43, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(10, 15), new ECB(67, 16))), new Version(40, [6, 30, 58, 86, 114, 142, 170], new ECBlocks(30, new ECB(19, 118), new ECB(6, 119)), new ECBlocks(28, new ECB(18, 47), new ECB(31, 48)), new ECBlocks(30, new ECB(34, 24), new ECB(34, 25)), new ECBlocks(30, new ECB(20, 15), new ECB(61, 16)))]
}

function PerspectiveTransform(a11, a21, a31, a12, a22, a32, a13, a23, a33) {
    this.a11 = a11, this.a12 = a12, this.a13 = a13, this.a21 = a21, this.a22 = a22, this.a23 = a23, this.a31 = a31, this.a32 = a32, this.a33 = a33, this.transformPoints1 = function (points) {
        for (var max = points.length, a11 = this.a11, a12 = this.a12, a13 = this.a13, a21 = this.a21, a22 = this.a22, a23 = this.a23, a31 = this.a31, a32 = this.a32, a33 = this.a33, i = 0; max > i; i += 2) {
            var x = points[i], y = points[i + 1], denominator = a13 * x + a23 * y + a33;
            points[i] = (a11 * x + a21 * y + a31) / denominator, points[i + 1] = (a12 * x + a22 * y + a32) / denominator
        }
    }, this.transformPoints2 = function (xValues, yValues) {
        for (var n = xValues.length, i = 0; n > i; i++) {
            var x = xValues[i], y = yValues[i], denominator = this.a13 * x + this.a23 * y + this.a33;
            xValues[i] = (this.a11 * x + this.a21 * y + this.a31) / denominator, yValues[i] = (this.a12 * x + this.a22 * y + this.a32) / denominator
        }
    }, this.buildAdjoint = function () {
        return new PerspectiveTransform(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21)
    }, this.times = function (other) {
        return new PerspectiveTransform(this.a11 * other.a11 + this.a21 * other.a12 + this.a31 * other.a13, this.a11 * other.a21 + this.a21 * other.a22 + this.a31 * other.a23, this.a11 * other.a31 + this.a21 * other.a32 + this.a31 * other.a33, this.a12 * other.a11 + this.a22 * other.a12 + this.a32 * other.a13, this.a12 * other.a21 + this.a22 * other.a22 + this.a32 * other.a23, this.a12 * other.a31 + this.a22 * other.a32 + this.a32 * other.a33, this.a13 * other.a11 + this.a23 * other.a12 + this.a33 * other.a13, this.a13 * other.a21 + this.a23 * other.a22 + this.a33 * other.a23, this.a13 * other.a31 + this.a23 * other.a32 + this.a33 * other.a33)
    }
}

function DetectorResult(bits, points) {
    this.bits = bits, this.points = points
}

function Detector(image) {
    this.image = image, this.resultPointCallback = null, this.sizeOfBlackWhiteBlackRun = function (fromX, fromY, toX, toY) {
        var steep = Math.abs(toY - fromY) > Math.abs(toX - fromX);
        if (steep) {
            var temp = fromX;
            fromX = fromY, fromY = temp, temp = toX, toX = toY, toY = temp
        }
        for (var dx = Math.abs(toX - fromX), dy = Math.abs(toY - fromY), error = -dx >> 1, ystep = toY > fromY ? 1 : -1, xstep = toX > fromX ? 1 : -1, state = 0, x = fromX, y = fromY; x != toX; x += xstep) {
            var realX = steep ? y : x, realY = steep ? x : y;
            if (1 == state ? this.image[realX + realY * qrcode.width] && state++ : this.image[realX + realY * qrcode.width] || state++, 3 == state) {
                var diffX = x - fromX, diffY = y - fromY;
                return Math.sqrt(diffX * diffX + diffY * diffY)
            }
            if (error += dy, error > 0) {
                if (y == toY) break;
                y += ystep, error -= dx
            }
        }
        var diffX2 = toX - fromX, diffY2 = toY - fromY;
        return Math.sqrt(diffX2 * diffX2 + diffY2 * diffY2)
    }, this.sizeOfBlackWhiteBlackRunBothWays = function (fromX, fromY, toX, toY) {
        var result = this.sizeOfBlackWhiteBlackRun(fromX, fromY, toX, toY), scale = 1, otherToX = fromX - (toX - fromX);
        0 > otherToX ? (scale = fromX / (fromX - otherToX), otherToX = 0) : otherToX >= qrcode.width && (scale = (qrcode.width - 1 - fromX) / (otherToX - fromX), otherToX = qrcode.width - 1);
        var otherToY = Math.floor(fromY - (toY - fromY) * scale);
        return scale = 1, 0 > otherToY ? (scale = fromY / (fromY - otherToY), otherToY = 0) : otherToY >= qrcode.height && (scale = (qrcode.height - 1 - fromY) / (otherToY - fromY), otherToY = qrcode.height - 1), otherToX = Math.floor(fromX + (otherToX - fromX) * scale), result += this.sizeOfBlackWhiteBlackRun(fromX, fromY, otherToX, otherToY), result - 1
    }, this.calculateModuleSizeOneWay = function (pattern, otherPattern) {
        var moduleSizeEst1 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(pattern.X), Math.floor(pattern.Y), Math.floor(otherPattern.X), Math.floor(otherPattern.Y)),
            moduleSizeEst2 = this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(otherPattern.X), Math.floor(otherPattern.Y), Math.floor(pattern.X), Math.floor(pattern.Y));
        return isNaN(moduleSizeEst1) ? moduleSizeEst2 / 7 : isNaN(moduleSizeEst2) ? moduleSizeEst1 / 7 : (moduleSizeEst1 + moduleSizeEst2) / 14
    }, this.calculateModuleSize = function (topLeft, topRight, bottomLeft) {
        return (this.calculateModuleSizeOneWay(topLeft, topRight) + this.calculateModuleSizeOneWay(topLeft, bottomLeft)) / 2
    }, this.distance = function (pattern1, pattern2) {
        return xDiff = pattern1.X - pattern2.X, yDiff = pattern1.Y - pattern2.Y, Math.sqrt(xDiff * xDiff + yDiff * yDiff)
    }, this.computeDimension = function (topLeft, topRight, bottomLeft, moduleSize) {
        var tltrCentersDimension = Math.round(this.distance(topLeft, topRight) / moduleSize),
            tlblCentersDimension = Math.round(this.distance(topLeft, bottomLeft) / moduleSize),
            dimension = (tltrCentersDimension + tlblCentersDimension >> 1) + 7;
        switch (3 & dimension) {
            case 0:
                dimension++;
                break;
            case 2:
                dimension--;
                break;
            case 3:
                throw"Error"
        }
        return dimension
    }, this.findAlignmentInRegion = function (overallEstModuleSize, estAlignmentX, estAlignmentY, allowanceFactor) {
        var allowance = Math.floor(allowanceFactor * overallEstModuleSize), alignmentAreaLeftX = Math.max(0, estAlignmentX - allowance),
            alignmentAreaRightX = Math.min(qrcode.width - 1, estAlignmentX + allowance);
        if (3 * overallEstModuleSize > alignmentAreaRightX - alignmentAreaLeftX) throw"Error";
        var alignmentAreaTopY = Math.max(0, estAlignmentY - allowance), alignmentAreaBottomY = Math.min(qrcode.height - 1, estAlignmentY + allowance),
            alignmentFinder = new AlignmentPatternFinder(this.image, alignmentAreaLeftX, alignmentAreaTopY, alignmentAreaRightX - alignmentAreaLeftX, alignmentAreaBottomY - alignmentAreaTopY, overallEstModuleSize, this.resultPointCallback);
        return alignmentFinder.find()
    }, this.createTransform = function (topLeft, topRight, bottomLeft, alignmentPattern, dimension) {
        var bottomRightX, bottomRightY, sourceBottomRightX, sourceBottomRightY, dimMinusThree = dimension - 3.5;
        null != alignmentPattern ? (bottomRightX = alignmentPattern.X, bottomRightY = alignmentPattern.Y, sourceBottomRightX = sourceBottomRightY = dimMinusThree - 3) : (bottomRightX = topRight.X - topLeft.X + bottomLeft.X, bottomRightY = topRight.Y - topLeft.Y + bottomLeft.Y, sourceBottomRightX = sourceBottomRightY = dimMinusThree);
        var transform = PerspectiveTransform.quadrilateralToQuadrilateral(3.5, 3.5, dimMinusThree, 3.5, sourceBottomRightX, sourceBottomRightY, 3.5, dimMinusThree, topLeft.X, topLeft.Y, topRight.X, topRight.Y, bottomRightX, bottomRightY, bottomLeft.X, bottomLeft.Y);
        return transform
    }, this.sampleGrid = function (image, transform, dimension) {
        var sampler = GridSampler;
        return sampler.sampleGrid3(image, dimension, transform)
    }, this.processFinderPatternInfo = function (info) {
        var topLeft = info.TopLeft, topRight = info.TopRight, bottomLeft = info.BottomLeft,
            moduleSize = this.calculateModuleSize(topLeft, topRight, bottomLeft);
        if (1 > moduleSize) throw"Error";
        var dimension = this.computeDimension(topLeft, topRight, bottomLeft, moduleSize),
            provisionalVersion = Version.getProvisionalVersionForDimension(dimension),
            modulesBetweenFPCenters = provisionalVersion.DimensionForVersion - 7, alignmentPattern = null;
        if (provisionalVersion.AlignmentPatternCenters.length > 0) for (var bottomRightX = topRight.X - topLeft.X + bottomLeft.X, bottomRightY = topRight.Y - topLeft.Y + bottomLeft.Y, correctionToTopLeft = 1 - 3 / modulesBetweenFPCenters, estAlignmentX = Math.floor(topLeft.X + correctionToTopLeft * (bottomRightX - topLeft.X)), estAlignmentY = Math.floor(topLeft.Y + correctionToTopLeft * (bottomRightY - topLeft.Y)), i = 4; 16 >= i; i <<= 1) {
            alignmentPattern = this.findAlignmentInRegion(moduleSize, estAlignmentX, estAlignmentY, i);
            break
        }
        var points, transform = this.createTransform(topLeft, topRight, bottomLeft, alignmentPattern, dimension),
            bits = this.sampleGrid(this.image, transform, dimension);
        return points = null == alignmentPattern ? [bottomLeft, topLeft, topRight] : [bottomLeft, topLeft, topRight, alignmentPattern], new DetectorResult(bits, points)
    }, this.detect = function () {
        var info = (new FinderPatternFinder).findFinderPattern(this.image);
        return this.processFinderPatternInfo(info)
    }
}

function FormatInformation(formatInfo) {
    this.errorCorrectionLevel = ErrorCorrectionLevel.forBits(formatInfo >> 3 & 3), this.dataMask = 7 & formatInfo, this.__defineGetter__("ErrorCorrectionLevel", function () {
        return this.errorCorrectionLevel
    }), this.__defineGetter__("DataMask", function () {
        return this.dataMask
    }), this.GetHashCode = function () {
        return this.errorCorrectionLevel.ordinal() << 3 | dataMask
    }, this.Equals = function (o) {
        var other = o;
        return this.errorCorrectionLevel == other.errorCorrectionLevel && this.dataMask == other.dataMask
    }
}

function ErrorCorrectionLevel(ordinal, bits, name) {
    this.ordinal_Renamed_Field = ordinal, this.bits = bits, this.name = name, this.__defineGetter__("Bits", function () {
        return this.bits
    }), this.__defineGetter__("Name", function () {
        return this.name
    }), this.ordinal = function () {
        return this.ordinal_Renamed_Field
    }
}

function BitMatrix(width, height) {
    if (height || (height = width), 1 > width || 1 > height) throw"Both dimensions must be greater than 0";
    this.width = width, this.height = height;
    var rowSize = width >> 5;
    0 != (31 & width) && rowSize++, this.rowSize = rowSize, this.bits = new Array(rowSize * height);
    for (var i = 0; i < this.bits.length; i++) this.bits[i] = 0;
    this.__defineGetter__("Width", function () {
        return this.width
    }), this.__defineGetter__("Height", function () {
        return this.height
    }), this.__defineGetter__("Dimension", function () {
        if (this.width != this.height) throw"Can't call getDimension() on a non-square matrix";
        return this.width
    }), this.get_Renamed = function (x, y) {
        var offset = y * this.rowSize + (x >> 5);
        return 0 != (1 & URShift(this.bits[offset], 31 & x))
    }, this.set_Renamed = function (x, y) {
        var offset = y * this.rowSize + (x >> 5);
        this.bits[offset] |= 1 << (31 & x)
    }, this.flip = function (x, y) {
        var offset = y * this.rowSize + (x >> 5);
        this.bits[offset] ^= 1 << (31 & x)
    }, this.clear = function () {
        for (var max = this.bits.length, i = 0; max > i; i++) this.bits[i] = 0
    }, this.setRegion = function (left, top, width, height) {
        if (0 > top || 0 > left) throw"Left and top must be nonnegative";
        if (1 > height || 1 > width) throw"Height and width must be at least 1";
        var right = left + width, bottom = top + height;
        if (bottom > this.height || right > this.width) throw"The region must fit inside the matrix";
        for (var y = top; bottom > y; y++) for (var offset = y * this.rowSize, x = left; right > x; x++) this.bits[offset + (x >> 5)] |= 1 << (31 & x)
    }
}

function DataBlock(numDataCodewords, codewords) {
    this.numDataCodewords = numDataCodewords, this.codewords = codewords, this.__defineGetter__("NumDataCodewords", function () {
        return this.numDataCodewords
    }), this.__defineGetter__("Codewords", function () {
        return this.codewords
    })
}

function BitMatrixParser(bitMatrix) {
    var dimension = bitMatrix.Dimension;
    if (21 > dimension || 1 != (3 & dimension)) throw"Error BitMatrixParser";
    this.bitMatrix = bitMatrix, this.parsedVersion = null, this.parsedFormatInfo = null, this.copyBit = function (i, j, versionBits) {
        return this.bitMatrix.get_Renamed(i, j) ? versionBits << 1 | 1 : versionBits << 1
    }, this.readFormatInformation = function () {
        if (null != this.parsedFormatInfo) return this.parsedFormatInfo;
        for (var formatInfoBits = 0, i = 0; 6 > i; i++) formatInfoBits = this.copyBit(i, 8, formatInfoBits);
        formatInfoBits = this.copyBit(7, 8, formatInfoBits), formatInfoBits = this.copyBit(8, 8, formatInfoBits), formatInfoBits = this.copyBit(8, 7, formatInfoBits);
        for (var j = 5; j >= 0; j--) formatInfoBits = this.copyBit(8, j, formatInfoBits);
        if (this.parsedFormatInfo = FormatInformation.decodeFormatInformation(formatInfoBits), null != this.parsedFormatInfo) return this.parsedFormatInfo;
        var dimension = this.bitMatrix.Dimension;
        formatInfoBits = 0;
        for (var iMin = dimension - 8, i = dimension - 1; i >= iMin; i--) formatInfoBits = this.copyBit(i, 8, formatInfoBits);
        for (var j = dimension - 7; dimension > j; j++) formatInfoBits = this.copyBit(8, j, formatInfoBits);
        if (this.parsedFormatInfo = FormatInformation.decodeFormatInformation(formatInfoBits), null != this.parsedFormatInfo) return this.parsedFormatInfo;
        throw"Error readFormatInformation"
    }, this.readVersion = function () {
        if (null != this.parsedVersion) return this.parsedVersion;
        var dimension = this.bitMatrix.Dimension, provisionalVersion = dimension - 17 >> 2;
        if (6 >= provisionalVersion) return Version.getVersionForNumber(provisionalVersion);
        for (var versionBits = 0, ijMin = dimension - 11, j = 5; j >= 0; j--) for (var i = dimension - 9; i >= ijMin; i--) versionBits = this.copyBit(i, j, versionBits);
        if (this.parsedVersion = Version.decodeVersionInformation(versionBits), null != this.parsedVersion && this.parsedVersion.DimensionForVersion == dimension) return this.parsedVersion;
        versionBits = 0;
        for (var i = 5; i >= 0; i--) for (var j = dimension - 9; j >= ijMin; j--) versionBits = this.copyBit(i, j, versionBits);
        if (this.parsedVersion = Version.decodeVersionInformation(versionBits), null != this.parsedVersion && this.parsedVersion.DimensionForVersion == dimension) return this.parsedVersion;
        throw"Error readVersion"
    }, this.readCodewords = function () {
        var formatInfo = this.readFormatInformation(), version = this.readVersion(), dataMask = DataMask.forReference(formatInfo.DataMask),
            dimension = this.bitMatrix.Dimension;
        dataMask.unmaskBitMatrix(this.bitMatrix, dimension);
        for (var functionPattern = version.buildFunctionPattern(), readingUp = !0, result = new Array(version.TotalCodewords), resultOffset = 0, currentByte = 0, bitsRead = 0, j = dimension - 1; j > 0; j -= 2) {
            6 == j && j--;
            for (var count = 0; dimension > count; count++) for (var i = readingUp ? dimension - 1 - count : count, col = 0; 2 > col; col++) functionPattern.get_Renamed(j - col, i) || (bitsRead++, currentByte <<= 1, this.bitMatrix.get_Renamed(j - col, i) && (currentByte |= 1), 8 == bitsRead && (result[resultOffset++] = currentByte, bitsRead = 0, currentByte = 0));
            readingUp ^= !0
        }
        if (resultOffset != version.TotalCodewords) throw"Error readCodewords";
        return result
    }
}

function DataMask000() {
    this.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; dimension > i; i++) for (var j = 0; dimension > j; j++) this.isMasked(i, j) && bits.flip(j, i)
    }, this.isMasked = function (i, j) {
        return 0 == (i + j & 1)
    }
}

function DataMask001() {
    this.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; dimension > i; i++) for (var j = 0; dimension > j; j++) this.isMasked(i, j) && bits.flip(j, i)
    }, this.isMasked = function (i, j) {
        return 0 == (1 & i)
    }
}

function DataMask010() {
    this.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; dimension > i; i++) for (var j = 0; dimension > j; j++) this.isMasked(i, j) && bits.flip(j, i)
    }, this.isMasked = function (i, j) {
        return j % 3 == 0
    }
}

function DataMask011() {
    this.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; dimension > i; i++) for (var j = 0; dimension > j; j++) this.isMasked(i, j) && bits.flip(j, i)
    }, this.isMasked = function (i, j) {
        return (i + j) % 3 == 0
    }
}

function DataMask100() {
    this.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; dimension > i; i++) for (var j = 0; dimension > j; j++) this.isMasked(i, j) && bits.flip(j, i)
    }, this.isMasked = function (i, j) {
        return 0 == (URShift(i, 1) + j / 3 & 1)
    }
}

function DataMask101() {
    this.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; dimension > i; i++) for (var j = 0; dimension > j; j++) this.isMasked(i, j) && bits.flip(j, i)
    }, this.isMasked = function (i, j) {
        var temp = i * j;
        return (1 & temp) + temp % 3 == 0
    }
}

function DataMask110() {
    this.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; dimension > i; i++) for (var j = 0; dimension > j; j++) this.isMasked(i, j) && bits.flip(j, i)
    }, this.isMasked = function (i, j) {
        var temp = i * j;
        return 0 == ((1 & temp) + temp % 3 & 1)
    }
}

function DataMask111() {
    this.unmaskBitMatrix = function (bits, dimension) {
        for (var i = 0; dimension > i; i++) for (var j = 0; dimension > j; j++) this.isMasked(i, j) && bits.flip(j, i)
    }, this.isMasked = function (i, j) {
        return 0 == ((i + j & 1) + i * j % 3 & 1)
    }
}

function ReedSolomonDecoder(field) {
    this.field = field, this.decode = function (received, twoS) {
        for (var poly = new GF256Poly(this.field, received), syndromeCoefficients = new Array(twoS), i = 0; i < syndromeCoefficients.length; i++) syndromeCoefficients[i] = 0;
        for (var dataMatrix = !1, noError = !0, i = 0; twoS > i; i++) {
            var eval = poly.evaluateAt(this.field.exp(dataMatrix ? i + 1 : i));
            syndromeCoefficients[syndromeCoefficients.length - 1 - i] = eval, 0 != eval && (noError = !1)
        }
        if (!noError) for (var syndrome = new GF256Poly(this.field, syndromeCoefficients), sigmaOmega = this.runEuclideanAlgorithm(this.field.buildMonomial(twoS, 1), syndrome, twoS), sigma = sigmaOmega[0], omega = sigmaOmega[1], errorLocations = this.findErrorLocations(sigma), errorMagnitudes = this.findErrorMagnitudes(omega, errorLocations, dataMatrix), i = 0; i < errorLocations.length; i++) {
            var position = received.length - 1 - this.field.log(errorLocations[i]);
            if (0 > position) throw"ReedSolomonException Bad error location";
            received[position] = GF256.addOrSubtract(received[position], errorMagnitudes[i])
        }
    }, this.runEuclideanAlgorithm = function (a, b, R) {
        if (a.Degree < b.Degree) {
            var temp = a;
            a = b, b = temp
        }
        for (var rLast = a, r = b, sLast = this.field.One, s = this.field.Zero, tLast = this.field.Zero, t = this.field.One; r.Degree >= Math.floor(R / 2);) {
            var rLastLast = rLast, sLastLast = sLast, tLastLast = tLast;
            if (rLast = r, sLast = s, tLast = t, rLast.Zero) throw"r_{i-1} was zero";
            r = rLastLast;
            for (var q = this.field.Zero, denominatorLeadingTerm = rLast.getCoefficient(rLast.Degree), dltInverse = this.field.inverse(denominatorLeadingTerm); r.Degree >= rLast.Degree && !r.Zero;) {
                var degreeDiff = r.Degree - rLast.Degree, scale = this.field.multiply(r.getCoefficient(r.Degree), dltInverse);
                q = q.addOrSubtract(this.field.buildMonomial(degreeDiff, scale)), r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale))
            }
            s = q.multiply1(sLast).addOrSubtract(sLastLast), t = q.multiply1(tLast).addOrSubtract(tLastLast)
        }
        var sigmaTildeAtZero = t.getCoefficient(0);
        if (0 == sigmaTildeAtZero) throw"ReedSolomonException sigmaTilde(0) was zero";
        var inverse = this.field.inverse(sigmaTildeAtZero), sigma = t.multiply2(inverse), omega = r.multiply2(inverse);
        return [sigma, omega]
    }, this.findErrorLocations = function (errorLocator) {
        var numErrors = errorLocator.Degree;
        if (1 == numErrors) return new Array(errorLocator.getCoefficient(1));
        for (var result = new Array(numErrors), e = 0, i = 1; 256 > i && numErrors > e; i++) 0 == errorLocator.evaluateAt(i) && (result[e] = this.field.inverse(i), e++);
        if (e != numErrors) throw"Error locator degree does not match number of roots";
        return result
    }, this.findErrorMagnitudes = function (errorEvaluator, errorLocations, dataMatrix) {
        for (var s = errorLocations.length, result = new Array(s), i = 0; s > i; i++) {
            for (var xiInverse = this.field.inverse(errorLocations[i]), denominator = 1, j = 0; s > j; j++) i != j && (denominator = this.field.multiply(denominator, GF256.addOrSubtract(1, this.field.multiply(errorLocations[j], xiInverse))));
            result[i] = this.field.multiply(errorEvaluator.evaluateAt(xiInverse), this.field.inverse(denominator)), dataMatrix && (result[i] = this.field.multiply(result[i], xiInverse))
        }
        return result
    }
}

function GF256Poly(field, coefficients) {
    if (null == coefficients || 0 == coefficients.length) throw"System.ArgumentException";
    this.field = field;
    var coefficientsLength = coefficients.length;
    if (coefficientsLength > 1 && 0 == coefficients[0]) {
        for (var firstNonZero = 1; coefficientsLength > firstNonZero && 0 == coefficients[firstNonZero];) firstNonZero++;
        if (firstNonZero == coefficientsLength) this.coefficients = field.Zero.coefficients; else {
            this.coefficients = new Array(coefficientsLength - firstNonZero);
            for (var i = 0; i < this.coefficients.length; i++) this.coefficients[i] = 0;
            for (var ci = 0; ci < this.coefficients.length; ci++) this.coefficients[ci] = coefficients[firstNonZero + ci]
        }
    } else this.coefficients = coefficients;
    this.__defineGetter__("Zero", function () {
        return 0 == this.coefficients[0]
    }), this.__defineGetter__("Degree", function () {
        return this.coefficients.length - 1
    }), this.__defineGetter__("Coefficients", function () {
        return this.coefficients
    }), this.getCoefficient = function (degree) {
        return this.coefficients[this.coefficients.length - 1 - degree]
    }, this.evaluateAt = function (a) {
        if (0 == a) return this.getCoefficient(0);
        var size = this.coefficients.length;
        if (1 == a) {
            for (var result = 0, i = 0; size > i; i++) result = GF256.addOrSubtract(result, this.coefficients[i]);
            return result
        }
        for (var result2 = this.coefficients[0], i = 1; size > i; i++) result2 = GF256.addOrSubtract(this.field.multiply(a, result2), this.coefficients[i]);
        return result2
    }, this.addOrSubtract = function (other) {
        if (this.field != other.field) throw"GF256Polys do not have same GF256 field";
        if (this.Zero) return other;
        if (other.Zero) return this;
        var smallerCoefficients = this.coefficients, largerCoefficients = other.coefficients;
        if (smallerCoefficients.length > largerCoefficients.length) {
            var temp = smallerCoefficients;
            smallerCoefficients = largerCoefficients, largerCoefficients = temp
        }
        for (var sumDiff = new Array(largerCoefficients.length), lengthDiff = largerCoefficients.length - smallerCoefficients.length, ci = 0; lengthDiff > ci; ci++) sumDiff[ci] = largerCoefficients[ci];
        for (var i = lengthDiff; i < largerCoefficients.length; i++) sumDiff[i] = GF256.addOrSubtract(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
        return new GF256Poly(field, sumDiff)
    }, this.multiply1 = function (other) {
        if (this.field != other.field) throw"GF256Polys do not have same GF256 field";
        if (this.Zero || other.Zero) return this.field.Zero;
        for (var aCoefficients = this.coefficients, aLength = aCoefficients.length, bCoefficients = other.coefficients, bLength = bCoefficients.length, product = new Array(aLength + bLength - 1), i = 0; aLength > i; i++) for (var aCoeff = aCoefficients[i], j = 0; bLength > j; j++) product[i + j] = GF256.addOrSubtract(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
        return new GF256Poly(this.field, product)
    }, this.multiply2 = function (scalar) {
        if (0 == scalar) return this.field.Zero;
        if (1 == scalar) return this;
        for (var size = this.coefficients.length, product = new Array(size), i = 0; size > i; i++) product[i] = this.field.multiply(this.coefficients[i], scalar);
        return new GF256Poly(this.field, product)
    }, this.multiplyByMonomial = function (degree, coefficient) {
        if (0 > degree) throw"System.ArgumentException";
        if (0 == coefficient) return this.field.Zero;
        for (var size = this.coefficients.length, product = new Array(size + degree), i = 0; i < product.length; i++) product[i] = 0;
        for (var i = 0; size > i; i++) product[i] = this.field.multiply(this.coefficients[i], coefficient);
        return new GF256Poly(this.field, product)
    }, this.divide = function (other) {
        if (this.field != other.field) throw"GF256Polys do not have same GF256 field";
        if (other.Zero) throw"Divide by 0";
        for (var quotient = this.field.Zero, remainder = this, denominatorLeadingTerm = other.getCoefficient(other.Degree), inverseDenominatorLeadingTerm = this.field.inverse(denominatorLeadingTerm); remainder.Degree >= other.Degree && !remainder.Zero;) {
            var degreeDifference = remainder.Degree - other.Degree,
                scale = this.field.multiply(remainder.getCoefficient(remainder.Degree), inverseDenominatorLeadingTerm),
                term = other.multiplyByMonomial(degreeDifference, scale), iterationQuotient = this.field.buildMonomial(degreeDifference, scale);
            quotient = quotient.addOrSubtract(iterationQuotient), remainder = remainder.addOrSubtract(term)
        }
        return [quotient, remainder]
    }
}

function GF256(primitive) {
    this.expTable = new Array(256), this.logTable = new Array(256);
    for (var x = 1, i = 0; 256 > i; i++) this.expTable[i] = x, x <<= 1, x >= 256 && (x ^= primitive);
    for (var i = 0; 255 > i; i++) this.logTable[this.expTable[i]] = i;
    var at0 = new Array(1);
    at0[0] = 0, this.zero = new GF256Poly(this, new Array(at0));
    var at1 = new Array(1);
    at1[0] = 1, this.one = new GF256Poly(this, new Array(at1)), this.__defineGetter__("Zero", function () {
        return this.zero
    }), this.__defineGetter__("One", function () {
        return this.one
    }), this.buildMonomial = function (degree, coefficient) {
        if (0 > degree) throw"System.ArgumentException";
        if (0 == coefficient) return zero;
        for (var coefficients = new Array(degree + 1), i = 0; i < coefficients.length; i++) coefficients[i] = 0;
        return coefficients[0] = coefficient, new GF256Poly(this, coefficients)
    }, this.exp = function (a) {
        return this.expTable[a]
    }, this.log = function (a) {
        if (0 == a) throw"System.ArgumentException";
        return this.logTable[a]
    }, this.inverse = function (a) {
        if (0 == a) throw"System.ArithmeticException";
        return this.expTable[255 - this.logTable[a]]
    }, this.multiply = function (a, b) {
        return 0 == a || 0 == b ? 0 : 1 == a ? b : 1 == b ? a : this.expTable[(this.logTable[a] + this.logTable[b]) % 255]
    }
}

function URShift(number, bits) {
    return number >= 0 ? number >> bits : (number >> bits) + (2 << ~bits)
}

function FinderPattern(posX, posY, estimatedModuleSize) {
    this.x = posX, this.y = posY, this.count = 1, this.estimatedModuleSize = estimatedModuleSize, this.__defineGetter__("EstimatedModuleSize", function () {
        return this.estimatedModuleSize
    }), this.__defineGetter__("Count", function () {
        return this.count
    }), this.__defineGetter__("X", function () {
        return this.x
    }), this.__defineGetter__("Y", function () {
        return this.y
    }), this.incrementCount = function () {
        this.count++
    }, this.aboutEquals = function (moduleSize, i, j) {
        if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize) {
            var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
            return 1 >= moduleSizeDiff || moduleSizeDiff / this.estimatedModuleSize <= 1
        }
        return !1
    }
}

function FinderPatternInfo(patternCenters) {
    this.bottomLeft = patternCenters[0], this.topLeft = patternCenters[1], this.topRight = patternCenters[2], this.__defineGetter__("BottomLeft", function () {
        return this.bottomLeft
    }), this.__defineGetter__("TopLeft", function () {
        return this.topLeft
    }), this.__defineGetter__("TopRight", function () {
        return this.topRight
    })
}

function FinderPatternFinder() {
    this.image = null, this.possibleCenters = [], this.hasSkipped = !1, this.crossCheckStateCount = [0, 0, 0, 0, 0], this.resultPointCallback = null, this.__defineGetter__("CrossCheckStateCount", function () {
        return this.crossCheckStateCount[0] = 0, this.crossCheckStateCount[1] = 0, this.crossCheckStateCount[2] = 0, this.crossCheckStateCount[3] = 0, this.crossCheckStateCount[4] = 0, this.crossCheckStateCount
    }), this.foundPatternCross = function (stateCount) {
        for (var totalModuleSize = 0, i = 0; 5 > i; i++) {
            var count = stateCount[i];
            if (0 == count) return !1;
            totalModuleSize += count
        }
        if (7 > totalModuleSize) return !1;
        var moduleSize = Math.floor((totalModuleSize << INTEGER_MATH_SHIFT) / 7), maxVariance = Math.floor(moduleSize / 2);
        return Math.abs(moduleSize - (stateCount[0] << INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(moduleSize - (stateCount[1] << INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(3 * moduleSize - (stateCount[2] << INTEGER_MATH_SHIFT)) < 3 * maxVariance && Math.abs(moduleSize - (stateCount[3] << INTEGER_MATH_SHIFT)) < maxVariance && Math.abs(moduleSize - (stateCount[4] << INTEGER_MATH_SHIFT)) < maxVariance
    }, this.centerFromEnd = function (stateCount, end) {
        return end - stateCount[4] - stateCount[3] - stateCount[2] / 2
    }, this.crossCheckVertical = function (startI, centerJ, maxCount, originalStateCountTotal) {
        for (var image = this.image, maxI = qrcode.height, stateCount = this.CrossCheckStateCount, i = startI; i >= 0 && image[centerJ + i * qrcode.width];) stateCount[2]++, i--;
        if (0 > i) return NaN;
        for (; i >= 0 && !image[centerJ + i * qrcode.width] && stateCount[1] <= maxCount;) stateCount[1]++, i--;
        if (0 > i || stateCount[1] > maxCount) return NaN;
        for (; i >= 0 && image[centerJ + i * qrcode.width] && stateCount[0] <= maxCount;) stateCount[0]++, i--;
        if (stateCount[0] > maxCount) return NaN;
        for (i = startI + 1; maxI > i && image[centerJ + i * qrcode.width];) stateCount[2]++, i++;
        if (i == maxI) return NaN;
        for (; maxI > i && !image[centerJ + i * qrcode.width] && stateCount[3] < maxCount;) stateCount[3]++, i++;
        if (i == maxI || stateCount[3] >= maxCount) return NaN;
        for (; maxI > i && image[centerJ + i * qrcode.width] && stateCount[4] < maxCount;) stateCount[4]++, i++;
        if (stateCount[4] >= maxCount) return NaN;
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
        return 5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal ? NaN : this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, i) : NaN
    }, this.crossCheckHorizontal = function (startJ, centerI, maxCount, originalStateCountTotal) {
        for (var image = this.image, maxJ = qrcode.width, stateCount = this.CrossCheckStateCount, j = startJ; j >= 0 && image[j + centerI * qrcode.width];) stateCount[2]++, j--;
        if (0 > j) return NaN;
        for (; j >= 0 && !image[j + centerI * qrcode.width] && stateCount[1] <= maxCount;) stateCount[1]++, j--;
        if (0 > j || stateCount[1] > maxCount) return NaN;
        for (; j >= 0 && image[j + centerI * qrcode.width] && stateCount[0] <= maxCount;) stateCount[0]++, j--;
        if (stateCount[0] > maxCount) return NaN;
        for (j = startJ + 1; maxJ > j && image[j + centerI * qrcode.width];) stateCount[2]++, j++;
        if (j == maxJ) return NaN;
        for (; maxJ > j && !image[j + centerI * qrcode.width] && stateCount[3] < maxCount;) stateCount[3]++, j++;
        if (j == maxJ || stateCount[3] >= maxCount) return NaN;
        for (; maxJ > j && image[j + centerI * qrcode.width] && stateCount[4] < maxCount;) stateCount[4]++, j++;
        if (stateCount[4] >= maxCount) return NaN;
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
        return 5 * Math.abs(stateCountTotal - originalStateCountTotal) >= originalStateCountTotal ? NaN : this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, j) : NaN
    }, this.handlePossibleCenter = function (stateCount, i, j) {
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4],
            centerJ = this.centerFromEnd(stateCount, j), centerI = this.crossCheckVertical(i, Math.floor(centerJ), stateCount[2], stateCountTotal);
        if (!isNaN(centerI) && (centerJ = this.crossCheckHorizontal(Math.floor(centerJ), Math.floor(centerI), stateCount[2], stateCountTotal), !isNaN(centerJ))) {
            for (var estimatedModuleSize = stateCountTotal / 7, found = !1, max = this.possibleCenters.length, index = 0; max > index; index++) {
                var center = this.possibleCenters[index];
                if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
                    center.incrementCount(), found = !0;
                    break
                }
            }
            if (!found) {
                var point = new FinderPattern(centerJ, centerI, estimatedModuleSize);
                this.possibleCenters.push(point), null != this.resultPointCallback && this.resultPointCallback.foundPossibleResultPoint(point)
            }
            return !0
        }
        return !1
    }, this.selectBestPatterns = function () {
        var startSize = this.possibleCenters.length;
        if (3 > startSize) throw"Couldn't find enough finder patterns";
        if (startSize > 3) {
            for (var totalModuleSize = 0, i = 0; startSize > i; i++) totalModuleSize += this.possibleCenters[i].EstimatedModuleSize;
            for (var average = totalModuleSize / startSize, i = 0; i < this.possibleCenters.length && this.possibleCenters.length > 3; i++) {
                var pattern = this.possibleCenters[i];
                Math.abs(pattern.EstimatedModuleSize - average) > .2 * average && (this.possibleCenters.remove(i), i--)
            }
        }
        return this.possibleCenters.Count > 3, [this.possibleCenters[0], this.possibleCenters[1], this.possibleCenters[2]]
    }, this.findRowSkip = function () {
        var max = this.possibleCenters.length;
        if (1 >= max) return 0;
        for (var firstConfirmedCenter = null, i = 0; max > i; i++) {
            var center = this.possibleCenters[i];
            if (center.Count >= CENTER_QUORUM) {
                if (null != firstConfirmedCenter) return this.hasSkipped = !0, Math.floor((Math.abs(firstConfirmedCenter.X - center.X) - Math.abs(firstConfirmedCenter.Y - center.Y)) / 2);
                firstConfirmedCenter = center
            }
        }
        return 0
    }, this.haveMultiplyConfirmedCenters = function () {
        for (var confirmedCount = 0, totalModuleSize = 0, max = this.possibleCenters.length, i = 0; max > i; i++) {
            var pattern = this.possibleCenters[i];
            pattern.Count >= CENTER_QUORUM && (confirmedCount++, totalModuleSize += pattern.EstimatedModuleSize)
        }
        if (3 > confirmedCount) return !1;
        for (var average = totalModuleSize / max, totalDeviation = 0, i = 0; max > i; i++) pattern = this.possibleCenters[i], totalDeviation += Math.abs(pattern.EstimatedModuleSize - average);
        return .05 * totalModuleSize >= totalDeviation
    }, this.findFinderPattern = function (image) {
        var tryHarder = !1;
        this.image = image;
        var maxI = qrcode.height, maxJ = qrcode.width, iSkip = Math.floor(3 * maxI / (4 * MAX_MODULES));
        (MIN_SKIP > iSkip || tryHarder) && (iSkip = MIN_SKIP);
        for (var done = !1, stateCount = new Array(5), i = iSkip - 1; maxI > i && !done; i += iSkip) {
            stateCount[0] = 0, stateCount[1] = 0, stateCount[2] = 0, stateCount[3] = 0, stateCount[4] = 0;
            for (var currentState = 0, j = 0; maxJ > j; j++) if (image[j + i * qrcode.width]) 1 == (1 & currentState) && currentState++, stateCount[currentState]++; else if (0 == (1 & currentState)) if (4 == currentState) if (this.foundPatternCross(stateCount)) {
                var confirmed = this.handlePossibleCenter(stateCount, i, j);
                if (confirmed) if (iSkip = 2, this.hasSkipped) done = this.haveMultiplyConfirmedCenters(); else {
                    var rowSkip = this.findRowSkip();
                    rowSkip > stateCount[2] && (i += rowSkip - stateCount[2] - iSkip, j = maxJ - 1)
                } else {
                    do j++; while (maxJ > j && !image[j + i * qrcode.width]);
                    j--
                }
                currentState = 0, stateCount[0] = 0, stateCount[1] = 0, stateCount[2] = 0, stateCount[3] = 0, stateCount[4] = 0
            } else stateCount[0] = stateCount[2], stateCount[1] = stateCount[3], stateCount[2] = stateCount[4], stateCount[3] = 1, stateCount[4] = 0, currentState = 3; else stateCount[++currentState]++; else stateCount[currentState]++;
            if (this.foundPatternCross(stateCount)) {
                var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
                confirmed && (iSkip = stateCount[0], this.hasSkipped && (done = haveMultiplyConfirmedCenters()))
            }
        }
        var patternInfo = this.selectBestPatterns();
        return qrcode.orderBestPatterns(patternInfo), new FinderPatternInfo(patternInfo)
    }
}

function AlignmentPattern(posX, posY, estimatedModuleSize) {
    this.x = posX, this.y = posY, this.count = 1, this.estimatedModuleSize = estimatedModuleSize, this.__defineGetter__("EstimatedModuleSize", function () {
        return this.estimatedModuleSize
    }), this.__defineGetter__("Count", function () {
        return this.count
    }), this.__defineGetter__("X", function () {
        return Math.floor(this.x)
    }), this.__defineGetter__("Y", function () {
        return Math.floor(this.y)
    }), this.incrementCount = function () {
        this.count++
    }, this.aboutEquals = function (moduleSize, i, j) {
        if (Math.abs(i - this.y) <= moduleSize && Math.abs(j - this.x) <= moduleSize) {
            var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
            return 1 >= moduleSizeDiff || moduleSizeDiff / this.estimatedModuleSize <= 1
        }
        return !1
    }
}

function AlignmentPatternFinder(image, startX, startY, width, height, moduleSize, resultPointCallback) {
    this.image = image, this.possibleCenters = [], this.startX = startX, this.startY = startY, this.width = width, this.height = height, this.moduleSize = moduleSize, this.crossCheckStateCount = [0, 0, 0], this.resultPointCallback = resultPointCallback, this.centerFromEnd = function (stateCount, end) {
        return end - stateCount[2] - stateCount[1] / 2
    }, this.foundPatternCross = function (stateCount) {
        for (var moduleSize = this.moduleSize, maxVariance = moduleSize / 2, i = 0; 3 > i; i++) if (Math.abs(moduleSize - stateCount[i]) >= maxVariance) return !1;
        return !0
    }, this.crossCheckVertical = function (startI, centerJ, maxCount, originalStateCountTotal) {
        var image = this.image, maxI = qrcode.height, stateCount = this.crossCheckStateCount;
        stateCount[0] = 0, stateCount[1] = 0, stateCount[2] = 0;
        for (var i = startI; i >= 0 && image[centerJ + i * qrcode.width] && stateCount[1] <= maxCount;) stateCount[1]++, i--;
        if (0 > i || stateCount[1] > maxCount) return NaN;
        for (; i >= 0 && !image[centerJ + i * qrcode.width] && stateCount[0] <= maxCount;) stateCount[0]++, i--;
        if (stateCount[0] > maxCount) return NaN;
        for (i = startI + 1; maxI > i && image[centerJ + i * qrcode.width] && stateCount[1] <= maxCount;) stateCount[1]++, i++;
        if (i == maxI || stateCount[1] > maxCount) return NaN;
        for (; maxI > i && !image[centerJ + i * qrcode.width] && stateCount[2] <= maxCount;) stateCount[2]++, i++;
        if (stateCount[2] > maxCount) return NaN;
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
        return 5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal ? NaN : this.foundPatternCross(stateCount) ? this.centerFromEnd(stateCount, i) : NaN
    }, this.handlePossibleCenter = function (stateCount, i, j) {
        var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2], centerJ = this.centerFromEnd(stateCount, j),
            centerI = this.crossCheckVertical(i, Math.floor(centerJ), 2 * stateCount[1], stateCountTotal);
        if (!isNaN(centerI)) {
            for (var estimatedModuleSize = (stateCount[0] + stateCount[1] + stateCount[2]) / 3, max = this.possibleCenters.length, index = 0; max > index; index++) {
                var center = this.possibleCenters[index];
                if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) return new AlignmentPattern(centerJ, centerI, estimatedModuleSize)
            }
            var point = new AlignmentPattern(centerJ, centerI, estimatedModuleSize);
            this.possibleCenters.push(point), null != this.resultPointCallback && this.resultPointCallback.foundPossibleResultPoint(point)
        }
        return null
    }, this.find = function () {
        for (var startX = this.startX, height = this.height, maxJ = startX + width, middleI = startY + (height >> 1), stateCount = [0, 0, 0], iGen = 0; height > iGen; iGen++) {
            var i = middleI + (0 == (1 & iGen) ? iGen + 1 >> 1 : -(iGen + 1 >> 1));
            stateCount[0] = 0, stateCount[1] = 0, stateCount[2] = 0;
            for (var j = startX; maxJ > j && !image[j + qrcode.width * i];) j++;
            for (var currentState = 0; maxJ > j;) {
                if (image[j + i * qrcode.width]) if (1 == currentState) stateCount[currentState]++; else if (2 == currentState) {
                    if (this.foundPatternCross(stateCount)) {
                        var confirmed = this.handlePossibleCenter(stateCount, i, j);
                        if (null != confirmed) return confirmed
                    }
                    stateCount[0] = stateCount[2], stateCount[1] = 1, stateCount[2] = 0, currentState = 1
                } else stateCount[++currentState]++; else 1 == currentState && currentState++, stateCount[currentState]++;
                j++
            }
            if (this.foundPatternCross(stateCount)) {
                var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
                if (null != confirmed) return confirmed
            }
        }
        if (0 != this.possibleCenters.length) return this.possibleCenters[0];
        throw"Couldn't find enough alignment patterns"
    }
}

function QRCodeDataBlockReader(blocks, version, numErrorCorrectionCode) {
    this.blockPointer = 0, this.bitPointer = 7, this.dataLength = 0, this.blocks = blocks, this.numErrorCorrectionCode = numErrorCorrectionCode, 9 >= version ? this.dataLengthMode = 0 : version >= 10 && 26 >= version ? this.dataLengthMode = 1 : version >= 27 && 40 >= version && (this.dataLengthMode = 2), this.getNextBits = function (numBits) {
        var bits = 0;
        if (numBits < this.bitPointer + 1) {
            for (var mask = 0, i = 0; numBits > i; i++) mask += 1 << i;
            return mask <<= this.bitPointer - numBits + 1, bits = (this.blocks[this.blockPointer] & mask) >> this.bitPointer - numBits + 1, this.bitPointer -= numBits, bits
        }
        if (numBits < this.bitPointer + 1 + 8) {
            for (var mask1 = 0, i = 0; i < this.bitPointer + 1; i++) mask1 += 1 << i;
            return bits = (this.blocks[this.blockPointer] & mask1) << numBits - (this.bitPointer + 1), this.blockPointer++, bits += this.blocks[this.blockPointer] >> 8 - (numBits - (this.bitPointer + 1)), this.bitPointer = this.bitPointer - numBits % 8, this.bitPointer < 0 && (this.bitPointer = 8 + this.bitPointer), bits
        }
        if (numBits < this.bitPointer + 1 + 16) {
            for (var mask1 = 0, mask3 = 0, i = 0; i < this.bitPointer + 1; i++) mask1 += 1 << i;
            var bitsFirstBlock = (this.blocks[this.blockPointer] & mask1) << numBits - (this.bitPointer + 1);
            this.blockPointer++;
            var bitsSecondBlock = this.blocks[this.blockPointer] << numBits - (this.bitPointer + 1 + 8);
            this.blockPointer++;
            for (var i = 0; i < numBits - (this.bitPointer + 1 + 8); i++) mask3 += 1 << i;
            mask3 <<= 8 - (numBits - (this.bitPointer + 1 + 8));
            var bitsThirdBlock = (this.blocks[this.blockPointer] & mask3) >> 8 - (numBits - (this.bitPointer + 1 + 8));
            return bits = bitsFirstBlock + bitsSecondBlock + bitsThirdBlock, this.bitPointer = this.bitPointer - (numBits - 8) % 8, this.bitPointer < 0 && (this.bitPointer = 8 + this.bitPointer), bits
        }
        return 0
    }, this.NextMode = function () {
        return this.blockPointer > this.blocks.length - this.numErrorCorrectionCode - 2 ? 0 : this.getNextBits(4)
    }, this.getDataLength = function (modeIndicator) {
        for (var index = 0; ;) {
            if (modeIndicator >> index == 1) break;
            index++
        }
        return this.getNextBits(qrcode.sizeOfDataLengthInfo[this.dataLengthMode][index])
    }, this.getRomanAndFigureString = function (dataLength) {
        var length = dataLength, intData = 0, strData = "",
            tableRomanAndFigure = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];
        do if (length > 1) {
            intData = this.getNextBits(11);
            var firstLetter = Math.floor(intData / 45), secondLetter = intData % 45;
            strData += tableRomanAndFigure[firstLetter], strData += tableRomanAndFigure[secondLetter], length -= 2
        } else 1 == length && (intData = this.getNextBits(6), strData += tableRomanAndFigure[intData], length -= 1); while (length > 0);
        return strData
    }, this.getFigureString = function (dataLength) {
        var length = dataLength, intData = 0, strData = "";
        do length >= 3 ? (intData = this.getNextBits(10), 100 > intData && (strData += "0"), 10 > intData && (strData += "0"), length -= 3) : 2 == length ? (intData = this.getNextBits(7), 10 > intData && (strData += "0"), length -= 2) : 1 == length && (intData = this.getNextBits(4), length -= 1), strData += intData; while (length > 0);
        return strData
    }, this.get8bitByteArray = function (dataLength) {
        var length = dataLength, intData = 0, output = [];
        do intData = this.getNextBits(8), output.push(intData), length--; while (length > 0);
        return output
    }, this.getKanjiString = function (dataLength) {
        var length = dataLength, intData = 0, unicodeString = "";
        do {
            intData = getNextBits(13);
            var lowerByte = intData % 192, higherByte = intData / 192, tempWord = (higherByte << 8) + lowerByte, shiftjisWord = 0;
            shiftjisWord = 40956 >= tempWord + 33088 ? tempWord + 33088 : tempWord + 49472, unicodeString += String.fromCharCode(shiftjisWord), length--
        } while (length > 0);
        return unicodeString
    }, this.__defineGetter__("DataByte", function () {
        for (var output = [], MODE_NUMBER = 1, MODE_ROMAN_AND_NUMBER = 2, MODE_8BIT_BYTE = 4, MODE_KANJI = 8; ;) {
            var mode = this.NextMode();
            if (0 == mode) {
                if (output.length > 0) break;
                throw"Empty data block"
            }
            if (mode != MODE_NUMBER && mode != MODE_ROMAN_AND_NUMBER && mode != MODE_8BIT_BYTE && mode != MODE_KANJI) throw"Invalid mode: " + mode + " in (block:" + this.blockPointer + " bit:" + this.bitPointer + ")";
            if (dataLength = this.getDataLength(mode), dataLength < 1) throw"Invalid data length: " + dataLength;
            switch (mode) {
                case MODE_NUMBER:
                    for (var temp_str = this.getFigureString(dataLength), ta = new Array(temp_str.length), j = 0; j < temp_str.length; j++) ta[j] = temp_str.charCodeAt(j);
                    output.push(ta);
                    break;
                case MODE_ROMAN_AND_NUMBER:
                    for (var temp_str = this.getRomanAndFigureString(dataLength), ta = new Array(temp_str.length), j = 0; j < temp_str.length; j++) ta[j] = temp_str.charCodeAt(j);
                    output.push(ta);
                    break;
                case MODE_8BIT_BYTE:
                    var temp_sbyteArray3 = this.get8bitByteArray(dataLength);
                    output.push(temp_sbyteArray3);
                    break;
                case MODE_KANJI:
                    var temp_str = this.getKanjiString(dataLength);
                    output.push(temp_str)
            }
        }
        return output
    })
}

GridSampler = {}, GridSampler.checkAndNudgePoints = function (image, points) {
    for (var width = qrcode.width, height = qrcode.height, nudged = !0, offset = 0; offset < points.Length && nudged; offset += 2) {
        var x = Math.floor(points[offset]), y = Math.floor(points[offset + 1]);
        if (-1 > x || x > width || -1 > y || y > height) throw"Error.checkAndNudgePoints ";
        nudged = !1, -1 == x ? (points[offset] = 0, nudged = !0) : x == width && (points[offset] = width - 1, nudged = !0), -1 == y ? (points[offset + 1] = 0, nudged = !0) : y == height && (points[offset + 1] = height - 1, nudged = !0)
    }
    nudged = !0;
    for (var offset = points.Length - 2; offset >= 0 && nudged; offset -= 2) {
        var x = Math.floor(points[offset]), y = Math.floor(points[offset + 1]);
        if (-1 > x || x > width || -1 > y || y > height) throw"Error.checkAndNudgePoints ";
        nudged = !1, -1 == x ? (points[offset] = 0, nudged = !0) : x == width && (points[offset] = width - 1, nudged = !0), -1 == y ? (points[offset + 1] = 0, nudged = !0) : y == height && (points[offset + 1] = height - 1, nudged = !0)
    }
}, GridSampler.sampleGrid3 = function (image, dimension, transform) {
    for (var bits = new BitMatrix(dimension), points = new Array(dimension << 1), y = 0; dimension > y; y++) {
        for (var max = points.length, iValue = y + .5, x = 0; max > x; x += 2) points[x] = (x >> 1) + .5, points[x + 1] = iValue;
        transform.transformPoints1(points), GridSampler.checkAndNudgePoints(image, points);
        try {
            for (var x = 0; max > x; x += 2) {
                var xpoint = 4 * Math.floor(points[x]) + Math.floor(points[x + 1]) * qrcode.width * 4,
                    bit = image[Math.floor(points[x]) + qrcode.width * Math.floor(points[x + 1])];
                qrcode.imagedata.data[xpoint] = bit ? 255 : 0, qrcode.imagedata.data[xpoint + 1] = bit ? 255 : 0, qrcode.imagedata.data[xpoint + 2] = 0, qrcode.imagedata.data[xpoint + 3] = 255, bit && bits.set_Renamed(x >> 1, y)
            }
        } catch (aioobe) {
            throw"Error.checkAndNudgePoints"
        }
    }
    return bits
}, GridSampler.sampleGridx = function (image, dimension, p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY) {
    var transform = PerspectiveTransform.quadrilateralToQuadrilateral(p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY);
    return GridSampler.sampleGrid3(image, dimension, transform)
}, Version.VERSION_DECODE_INFO = [31892, 34236, 39577, 42195, 48118, 51042, 55367, 58893, 63784, 68472, 70749, 76311, 79154, 84390, 87683, 92361, 96236, 102084, 102881, 110507, 110734, 117786, 119615, 126325, 127568, 133589, 136944, 141498, 145311, 150283, 152622, 158308, 161089, 167017], Version.VERSIONS = buildVersions(), Version.getVersionForNumber = function (versionNumber) {
    if (1 > versionNumber || versionNumber > 40) throw"ArgumentException";
    return Version.VERSIONS[versionNumber - 1]
}, Version.getProvisionalVersionForDimension = function (dimension) {
    if (dimension % 4 != 1) throw"Error getProvisionalVersionForDimension";
    try {
        return Version.getVersionForNumber(dimension - 17 >> 2)
    } catch (iae) {
        throw"Error getVersionForNumber"
    }
}, Version.decodeVersionInformation = function (versionBits) {
    for (var bestDifference = 4294967295, bestVersion = 0, i = 0; i < Version.VERSION_DECODE_INFO.length; i++) {
        var targetVersion = Version.VERSION_DECODE_INFO[i];
        if (targetVersion == versionBits) return this.getVersionForNumber(i + 7);
        var bitsDifference = FormatInformation.numBitsDiffering(versionBits, targetVersion);
        bestDifference > bitsDifference && (bestVersion = i + 7, bestDifference = bitsDifference)
    }
    return 3 >= bestDifference ? this.getVersionForNumber(bestVersion) : null
}, PerspectiveTransform.quadrilateralToQuadrilateral = function (x0, y0, x1, y1, x2, y2, x3, y3, x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p) {
    var qToS = this.quadrilateralToSquare(x0, y0, x1, y1, x2, y2, x3, y3), sToQ = this.squareToQuadrilateral(x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p);
    return sToQ.times(qToS)
}, PerspectiveTransform.squareToQuadrilateral = function (x0, y0, x1, y1, x2, y2, x3, y3) {
    return dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3, 0 == dy2 && 0 == dy3 ? new PerspectiveTransform(x1 - x0, x2 - x1, x0, y1 - y0, y2 - y1, y0, 0, 0, 1) : (dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, denominator = dx1 * dy2 - dx2 * dy1, a13 = (dx3 * dy2 - dx2 * dy3) / denominator, a23 = (dx1 * dy3 - dx3 * dy1) / denominator, new PerspectiveTransform(x1 - x0 + a13 * x1, x3 - x0 + a23 * x3, x0, y1 - y0 + a13 * y1, y3 - y0 + a23 * y3, y0, a13, a23, 1))
}, PerspectiveTransform.quadrilateralToSquare = function (x0, y0, x1, y1, x2, y2, x3, y3) {
    return this.squareToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3).buildAdjoint()
};
var FORMAT_INFO_MASK_QR = 21522,
    FORMAT_INFO_DECODE_LOOKUP = [[21522, 0], [20773, 1], [24188, 2], [23371, 3], [17913, 4], [16590, 5], [20375, 6], [19104, 7], [30660, 8], [29427, 9], [32170, 10], [30877, 11], [26159, 12], [25368, 13], [27713, 14], [26998, 15], [5769, 16], [5054, 17], [7399, 18], [6608, 19], [1890, 20], [597, 21], [3340, 22], [2107, 23], [13663, 24], [12392, 25], [16177, 26], [14854, 27], [9396, 28], [8579, 29], [11994, 30], [11245, 31]],
    BITS_SET_IN_HALF_BYTE = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];
FormatInformation.numBitsDiffering = function (a, b) {
    return a ^= b, BITS_SET_IN_HALF_BYTE[15 & a] + BITS_SET_IN_HALF_BYTE[15 & URShift(a, 4)] + BITS_SET_IN_HALF_BYTE[15 & URShift(a, 8)] + BITS_SET_IN_HALF_BYTE[15 & URShift(a, 12)] + BITS_SET_IN_HALF_BYTE[15 & URShift(a, 16)] + BITS_SET_IN_HALF_BYTE[15 & URShift(a, 20)] + BITS_SET_IN_HALF_BYTE[15 & URShift(a, 24)] + BITS_SET_IN_HALF_BYTE[15 & URShift(a, 28)]
}, FormatInformation.decodeFormatInformation = function (maskedFormatInfo) {
    var formatInfo = FormatInformation.doDecodeFormatInformation(maskedFormatInfo);
    return null != formatInfo ? formatInfo : FormatInformation.doDecodeFormatInformation(maskedFormatInfo ^ FORMAT_INFO_MASK_QR)
}, FormatInformation.doDecodeFormatInformation = function (maskedFormatInfo) {
    for (var bestDifference = 4294967295, bestFormatInfo = 0, i = 0; i < FORMAT_INFO_DECODE_LOOKUP.length; i++) {
        var decodeInfo = FORMAT_INFO_DECODE_LOOKUP[i], targetInfo = decodeInfo[0];
        if (targetInfo == maskedFormatInfo) return new FormatInformation(decodeInfo[1]);
        var bitsDifference = this.numBitsDiffering(maskedFormatInfo, targetInfo);
        bestDifference > bitsDifference && (bestFormatInfo = decodeInfo[1], bestDifference = bitsDifference)
    }
    return 3 >= bestDifference ? new FormatInformation(bestFormatInfo) : null
}, ErrorCorrectionLevel.forBits = function (bits) {
    if (0 > bits || bits >= FOR_BITS.Length) throw"ArgumentException";
    return FOR_BITS[bits]
};
var L = new ErrorCorrectionLevel(0, 1, "L"), M = new ErrorCorrectionLevel(1, 0, "M"), Q = new ErrorCorrectionLevel(2, 3, "Q"),
    H = new ErrorCorrectionLevel(3, 2, "H"), FOR_BITS = [M, L, H, Q];
DataBlock.getDataBlocks = function (rawCodewords, version, ecLevel) {
    if (rawCodewords.length != version.TotalCodewords) throw"ArgumentException";
    for (var ecBlocks = version.getECBlocksForLevel(ecLevel), totalBlocks = 0, ecBlockArray = ecBlocks.getECBlocks(), i = 0; i < ecBlockArray.length; i++) totalBlocks += ecBlockArray[i].Count;
    for (var result = new Array(totalBlocks), numResultBlocks = 0, j = 0; j < ecBlockArray.length; j++) for (var ecBlock = ecBlockArray[j], i = 0; i < ecBlock.Count; i++) {
        var numDataCodewords = ecBlock.DataCodewords, numBlockCodewords = ecBlocks.ECCodewordsPerBlock + numDataCodewords;
        result[numResultBlocks++] = new DataBlock(numDataCodewords, new Array(numBlockCodewords))
    }
    for (var shorterBlocksTotalCodewords = result[0].codewords.length, longerBlocksStartAt = result.length - 1; longerBlocksStartAt >= 0;) {
        var numCodewords = result[longerBlocksStartAt].codewords.length;
        if (numCodewords == shorterBlocksTotalCodewords) break;
        longerBlocksStartAt--
    }
    longerBlocksStartAt++;
    for (var shorterBlocksNumDataCodewords = shorterBlocksTotalCodewords - ecBlocks.ECCodewordsPerBlock, rawCodewordsOffset = 0, i = 0; shorterBlocksNumDataCodewords > i; i++) for (var j = 0; numResultBlocks > j; j++) result[j].codewords[i] = rawCodewords[rawCodewordsOffset++];
    for (var j = longerBlocksStartAt; numResultBlocks > j; j++) result[j].codewords[shorterBlocksNumDataCodewords] = rawCodewords[rawCodewordsOffset++];
    for (var max = result[0].codewords.length, i = shorterBlocksNumDataCodewords; max > i; i++) for (var j = 0; numResultBlocks > j; j++) {
        var iOffset = longerBlocksStartAt > j ? i : i + 1;
        result[j].codewords[iOffset] = rawCodewords[rawCodewordsOffset++]
    }
    return result
}, DataMask = {}, DataMask.forReference = function (reference) {
    if (0 > reference || reference > 7) throw"System.ArgumentException";
    return DataMask.DATA_MASKS[reference]
}, DataMask.DATA_MASKS = [new DataMask000, new DataMask001, new DataMask010, new DataMask011, new DataMask100, new DataMask101, new DataMask110, new DataMask111], GF256.QR_CODE_FIELD = new GF256(285), GF256.DATA_MATRIX_FIELD = new GF256(301), GF256.addOrSubtract = function (a, b) {
    return a ^ b
}, Decoder = {}, Decoder.rsDecoder = new ReedSolomonDecoder(GF256.QR_CODE_FIELD), Decoder.correctErrors = function (codewordBytes, numDataCodewords) {
    for (var numCodewords = codewordBytes.length, codewordsInts = new Array(numCodewords), i = 0; numCodewords > i; i++) codewordsInts[i] = 255 & codewordBytes[i];
    var numECCodewords = codewordBytes.length - numDataCodewords;
    try {
        Decoder.rsDecoder.decode(codewordsInts, numECCodewords)
    } catch (rse) {
        throw rse
    }
    for (var i = 0; numDataCodewords > i; i++) codewordBytes[i] = codewordsInts[i]
}, Decoder.decode = function (bits) {
    for (var parser = new BitMatrixParser(bits), version = parser.readVersion(), ecLevel = parser.readFormatInformation().ErrorCorrectionLevel, codewords = parser.readCodewords(), dataBlocks = DataBlock.getDataBlocks(codewords, version, ecLevel), totalBytes = 0, i = 0; i < dataBlocks.Length; i++) totalBytes += dataBlocks[i].NumDataCodewords;
    for (var resultBytes = new Array(totalBytes), resultOffset = 0, j = 0; j < dataBlocks.length; j++) {
        var dataBlock = dataBlocks[j], codewordBytes = dataBlock.Codewords, numDataCodewords = dataBlock.NumDataCodewords;
        Decoder.correctErrors(codewordBytes, numDataCodewords);
        for (var i = 0; numDataCodewords > i; i++) resultBytes[resultOffset++] = codewordBytes[i]
    }
    var reader = new QRCodeDataBlockReader(resultBytes, version.VersionNumber, ecLevel.Bits);
    return reader
}, qrcode = {}, qrcode.imagedata = null, qrcode.width = 0, qrcode.height = 0, qrcode.qrCodeSymbol = null, qrcode.debug = !1, qrcode.sizeOfDataLengthInfo = [[10, 9, 8, 8], [12, 11, 16, 10], [14, 13, 16, 12]], qrcode.callback = null, qrcode.decode = function (src) {
    if (0 == arguments.length) {
        var canvas_qr = document.getElementById("qr-canvas"), context = canvas_qr.getContext("2d");
        return qrcode.width = canvas_qr.width, qrcode.height = canvas_qr.height, qrcode.imagedata = context.getImageData(0, 0, qrcode.width, qrcode.height), qrcode.result = qrcode.process(context), null != qrcode.callback && qrcode.callback(qrcode.result), qrcode.result
    }
    var image = new Image;
    image.onload = function () {
        var canvas_qr = document.createElement("canvas"), context = canvas_qr.getContext("2d"), canvas_out = document.getElementById("out-canvas");
        if (null != canvas_out) {
            var outctx = canvas_out.getContext("2d");
            outctx.clearRect(0, 0, 320, 240), outctx.drawImage(image, 0, 0, 320, 240)
        }
        canvas_qr.width = image.width, canvas_qr.height = image.height, context.drawImage(image, 0, 0), qrcode.width = image.width, qrcode.height = image.height;
        try {
            qrcode.imagedata = context.getImageData(0, 0, image.width, image.height)
        } catch (e) {
            return qrcode.result = "Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!", void (null != qrcode.callback && qrcode.callback(qrcode.result))
        }
        try {
            qrcode.result = qrcode.process(context)
        } catch (e) {
            console.log(e), qrcode.result = "error decoding QR Code"
        }
        null != qrcode.callback && qrcode.callback(qrcode.result)
    }, image.src = src
}, qrcode.decode_utf8 = function (s) {
    return decodeURIComponent(escape(s))
}, qrcode.process = function (ctx) {
    var start = (new Date).getTime(), image = qrcode.grayScaleToBitmap(qrcode.grayscale());
    if (qrcode.debug) {
        for (var y = 0; y < qrcode.height; y++) for (var x = 0; x < qrcode.width; x++) {
            var point = 4 * x + y * qrcode.width * 4;
            qrcode.imagedata.data[point] = (image[x + y * qrcode.width], 0), qrcode.imagedata.data[point + 1] = (image[x + y * qrcode.width], 0), qrcode.imagedata.data[point + 2] = image[x + y * qrcode.width] ? 255 : 0
        }
        ctx.putImageData(qrcode.imagedata, 0, 0)
    }
    var detector = new Detector(image), qRCodeMatrix = detector.detect();
    qrcode.debug && ctx.putImageData(qrcode.imagedata, 0, 0);
    for (var reader = Decoder.decode(qRCodeMatrix.bits), data = reader.DataByte, str = "", i = 0; i < data.length; i++) for (var j = 0; j < data[i].length; j++) str += String.fromCharCode(data[i][j]);
    var end = (new Date).getTime(), time = end - start;
    return console.log(time), qrcode.decode_utf8(str)
}, qrcode.getPixel = function (x, y) {
    if (qrcode.width < x) throw"point error";
    if (qrcode.height < y) throw"point error";
    return point = 4 * x + y * qrcode.width * 4, p = (33 * qrcode.imagedata.data[point] + 34 * qrcode.imagedata.data[point + 1] + 33 * qrcode.imagedata.data[point + 2]) / 100, p
}, qrcode.binarize = function (th) {
    for (var ret = new Array(qrcode.width * qrcode.height), y = 0; y < qrcode.height; y++) for (var x = 0; x < qrcode.width; x++) {
        var gray = qrcode.getPixel(x, y);
        ret[x + y * qrcode.width] = th >= gray ? !0 : !1
    }
    return ret
}, qrcode.getMiddleBrightnessPerArea = function (image) {
    for (var numSqrtArea = 4, areaWidth = Math.floor(qrcode.width / numSqrtArea), areaHeight = Math.floor(qrcode.height / numSqrtArea), minmax = new Array(numSqrtArea), i = 0; numSqrtArea > i; i++) {
        minmax[i] = new Array(numSqrtArea);
        for (var i2 = 0; numSqrtArea > i2; i2++) minmax[i][i2] = [0, 0]
    }
    for (var ay = 0; numSqrtArea > ay; ay++) for (var ax = 0; numSqrtArea > ax; ax++) {
        minmax[ax][ay][0] = 255;
        for (var dy = 0; areaHeight > dy; dy++) for (var dx = 0; areaWidth > dx; dx++) {
            var target = image[areaWidth * ax + dx + (areaHeight * ay + dy) * qrcode.width];
            target < minmax[ax][ay][0] && (minmax[ax][ay][0] = target), target > minmax[ax][ay][1] && (minmax[ax][ay][1] = target)
        }
    }
    for (var middle = new Array(numSqrtArea), i3 = 0; numSqrtArea > i3; i3++) middle[i3] = new Array(numSqrtArea);
    for (var ay = 0; numSqrtArea > ay; ay++) for (var ax = 0; numSqrtArea > ax; ax++) middle[ax][ay] = Math.floor((minmax[ax][ay][0] + minmax[ax][ay][1]) / 2);
    return middle
}, qrcode.grayScaleToBitmap = function (grayScale) {
    for (var middle = qrcode.getMiddleBrightnessPerArea(grayScale), sqrtNumArea = middle.length, areaWidth = Math.floor(qrcode.width / sqrtNumArea), areaHeight = Math.floor(qrcode.height / sqrtNumArea), bitmap = new Array(qrcode.height * qrcode.width), ay = 0; sqrtNumArea > ay; ay++) for (var ax = 0; sqrtNumArea > ax; ax++) for (var dy = 0; areaHeight > dy; dy++) for (var dx = 0; areaWidth > dx; dx++) bitmap[areaWidth * ax + dx + (areaHeight * ay + dy) * qrcode.width] = grayScale[areaWidth * ax + dx + (areaHeight * ay + dy) * qrcode.width] < middle[ax][ay] ? !0 : !1;
    return bitmap
}, qrcode.grayscale = function () {
    for (var ret = new Array(qrcode.width * qrcode.height), y = 0; y < qrcode.height; y++) for (var x = 0; x < qrcode.width; x++) {
        var gray = qrcode.getPixel(x, y);
        ret[x + y * qrcode.width] = gray
    }
    return ret
}, Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    return this.length = 0 > from ? this.length + from : from, this.push.apply(this, rest)
};
var MIN_SKIP = 3, MAX_MODULES = 57, INTEGER_MATH_SHIFT = 8, CENTER_QUORUM = 2;
qrcode.orderBestPatterns = function (patterns) {
    function distance(pattern1, pattern2) {
        return xDiff = pattern1.X - pattern2.X, yDiff = pattern1.Y - pattern2.Y, Math.sqrt(xDiff * xDiff + yDiff * yDiff)
    }

    function crossProductZ(pointA, pointB, pointC) {
        var bX = pointB.x, bY = pointB.y;
        return (pointC.x - bX) * (pointA.y - bY) - (pointC.y - bY) * (pointA.x - bX)
    }

    var pointA, pointB, pointC, zeroOneDistance = distance(patterns[0], patterns[1]), oneTwoDistance = distance(patterns[1], patterns[2]),
        zeroTwoDistance = distance(patterns[0], patterns[2]);
    if (oneTwoDistance >= zeroOneDistance && oneTwoDistance >= zeroTwoDistance ? (pointB = patterns[0], pointA = patterns[1], pointC = patterns[2]) : zeroTwoDistance >= oneTwoDistance && zeroTwoDistance >= zeroOneDistance ? (pointB = patterns[1], pointA = patterns[0], pointC = patterns[2]) : (pointB = patterns[2], pointA = patterns[0], pointC = patterns[1]), crossProductZ(pointA, pointB, pointC) < 0) {
        var temp = pointA;
        pointA = pointC, pointC = temp
    }
    patterns[0] = pointA, patterns[1] = pointB, patterns[2] = pointC
};
