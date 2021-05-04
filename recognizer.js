/**
 * The $1 Unistroke Recognizer (JavaScript version)
 *
 *  Jacob O. Wobbrock, Ph.D.
 *  The Information School
 *  University of Washington
 *  Seattle, WA 98195-2840
 *  wobbrock@uw.edu
 *
 *  Andrew D. Wilson, Ph.D.
 *  Microsoft Research
 *  One Microsoft Way
 *  Redmond, WA 98052
 *  awilson@microsoft.com
 *
 *  Yang Li, Ph.D.
 *  Department of Computer Science and Engineering
 *  University of Washington
 *  Seattle, WA 98195-2840
 *  yangli@cs.washington.edu
 *
 * The academic publication for the $1 recognizer, and what should be
 * used to cite it, is:
 *
 *     Wobbrock, J.O., Wilson, A.D. and Li, Y. (2007). Gestures without
 *     libraries, toolkits or training: A $1 recognizer for user interface
 *     prototypes. Proceedings of the ACM Symposium on User Interface
 *     Software and Technology (UIST '07). Newport, Rhode Island (October
 *     7-10, 2007). New York: ACM Press, pp. 159-168.
 *     https://dl.acm.org/citation.cfm?id=1294238
 *
 * The Protractor enhancement was separately published by Yang Li and programmed
 * here by Jacob O. Wobbrock:
 *
 *     Li, Y. (2010). Protractor: A fast and accurate gesture
 *     recognizer. Proceedings of the ACM Conference on Human
 *     Factors in Computing Systems (CHI '10). Atlanta, Georgia
 *     (April 10-15, 2010). New York: ACM Press, pp. 2169-2172.
 *     https://dl.acm.org/citation.cfm?id=1753654
 *
 * This software is distributed under the "New BSD License" agreement:
 *
 * Copyright (C) 2007-2012, Jacob O. Wobbrock, Andrew D. Wilson and Yang Li.
 * All rights reserved. Last updated July 14, 2018.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of the University of Washington nor Microsoft,
 *      nor the names of its contributors may be used to endorse or promote
 *      products derived from this software without specific prior written
 *      permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Jacob O. Wobbrock OR Andrew D. Wilson
 * OR Yang Li BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 **/
//
// Point class
//
function Point(x, y) // constructor
{
    this.X = x;
    this.Y = y;
}
//
// Rectangle class
//
function Rectangle(x, y, width, height) // constructor
{
    this.X = x;
    this.Y = y;
    this.Width = width;
    this.Height = height;
}
//
// Unistroke class: a unistroke template
//
function Unistroke(name, points) // constructor
{
    this.Name = name;
    this.Points = Resample(points, NumPoints);
    var radians = IndicativeAngle(this.Points);
    this.Points = RotateBy(this.Points, -radians);
    this.Points = ScaleTo(this.Points, SquareSize);
    this.Points = TranslateTo(this.Points, Origin);
    this.Vector = Vectorize(this.Points); // for Protractor
}
//
// Result class
//
function Result(name, score, ms) // constructor
{
    this.Name = name;
    this.Score = score;
    this.Time = ms;
}
//
// DollarRecognizer constants
//
const NumUnistrokes = 5;
const NumPoints = 64;
const SquareSize = 250.0;
const Origin = new Point(0,0);
const Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
const HalfDiagonal = 0.5 * Diagonal;
const AngleRange = Deg2Rad(45.0);
const AnglePrecision = Deg2Rad(2.0);
const Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio
//
// DollarRecognizer class
//
function DollarRecognizer() // constructor
{
    //
    // one built-in unistroke per gesture type
    //
    this.Unistrokes = new Array(NumUnistrokes);

    this.Unistrokes[0] = new Unistroke("smile", new Array (new Point(72, 78),
        new Point(72, 79),
        new Point(72, 80),
        new Point(72, 80.49519235301898),
        new Point(72, 82),
        new Point(72, 82.99038470603796),
        new Point(72, 83),
        new Point(72, 84),
        new Point(72, 85.48557705905694),
        new Point(72, 86),
        new Point(72, 87.98076941207592),
        new Point(72, 89),
        new Point(72, 90),
        new Point(72, 90.4759617650949),
        new Point(72, 92.97115411811387),
        new Point(72, 93),
        new Point(72, 94),
        new Point(72.35564125789602, 95.42256503158411),
        new Point(72.96081429482136, 97.84325717928546),
        new Point(73, 98),
        new Point(73, 99),
        new Point(73.94301567106689, 99.94301567106689),
        new Point(74, 100),
        new Point(74, 102.41460434219906),
        new Point(74, 104),
        new Point(74.64332341268978, 104.64332341268978),
        new Point(75, 105),
        new Point(75.62953848453583, 106.8886154536075),
        new Point(76, 108),
        new Point(76.59197224415091, 109.1839444883018),
        new Point(77, 110),
        new Point(77.70785618780853, 111.41571237561705),
        new Point(78, 112),
        new Point(79.02172388576884, 113.53258582865324),
        new Point(80, 115),
        new Point(80.51730518414793, 115.51730518414793),
        new Point(81, 116),
        new Point(82, 117),
        new Point(82.28167261733248, 117.28167261733248),
        new Point(84, 119),
        new Point(84.0291182846446, 119.05823656928919),
        new Point(85, 121),
        new Point(85.22926865361737, 121.22926865361737),
        new Point(86, 122),
        new Point(86.99363608680191, 122.99363608680191),
        new Point(87, 123),
        new Point(88, 124),
        new Point(88.75800351998646, 124.75800351998646),
        new Point(89, 125),
        new Point(90, 125),
        new Point(90, 126),
        new Point(90.15295764893729, 126),
        new Point(91, 126),
        new Point(92, 126),
        new Point(92.45831126160935, 126.45831126160935),
        new Point(93, 127),
        new Point(94, 127),
        new Point(94.51557191360735, 127.51557191360735),
        new Point(95, 128),
        new Point(96, 128),
        new Point(96.81010758324805, 128),
        new Point(97, 128),
        new Point(98, 128),
        new Point(99, 128),
        new Point(99.21587965523024, 128.21587965523025),
        new Point(100, 129),
        new Point(101, 129),
        new Point(101.38627872691293, 129),
        new Point(102, 129),
        new Point(103, 129),
        new Point(103.88147107993191, 129),
        new Point(104, 129),
        new Point(105, 129),
        new Point(106, 129),
        new Point(106.37666343295089, 129),
        new Point(107, 129),
        new Point(108, 129),
        new Point(108.87185578596987, 129),
        new Point(109, 129),
        new Point(110, 129),
        new Point(111, 129),
        new Point(111.36704813898885, 129),
        new Point(112, 129),
        new Point(113, 129),
        new Point(113.86224049200783, 129),
        new Point(114, 129),
        new Point(115, 129),
        new Point(116, 129),
        new Point(116.3574328450268, 129),
        new Point(117, 129),
        new Point(118, 129),
        new Point(118, 128.14737480195421),
        new Point(118, 128),
        new Point(118, 128),
        new Point(119, 128),
        new Point(120, 128),
        new Point(120, 127.65218244893524),
        new Point(120, 127),
        new Point(121, 127),
        new Point(121.84300990408374, 127),
        new Point(122, 127),
        new Point(123, 126),
        new Point(123.92398869472963, 126),
        new Point(124, 126),
        new Point(125, 125),
        new Point(125.71061932378102, 124.28938067621898),
        new Point(126, 124),
        new Point(126, 123),
        new Point(127, 123),
        new Point(127, 122.9140537239786),
        new Point(127, 122),
        new Point(128, 122),
        new Point(128, 121.41886137095962),
        new Point(128, 121),
        new Point(129, 120),
        new Point(129, 119.33788258031373),
        new Point(129, 119),
        new Point(130, 119),
        new Point(130, 118),
        new Point(130.1112348070268, 117.8887651929732),
        new Point(131, 117),
        new Point(131.87560224021135, 116.12439775978866),
        new Point(132, 116),
        new Point(133, 115),
        new Point(133, 114.09494620837606),
        new Point(133, 114),
        new Point(134, 114),
        new Point(134, 113),
        new Point(134.28301676302078, 112.71698323697922),
        new Point(135, 112),
        new Point(136, 112),
        new Point(136, 111.51877506471119),
        new Point(136, 111),
        new Point(136, 110),
        new Point(136.9764172883078, 110),
        new Point(137, 110),
        new Point(137, 109),
        new Point(138, 109),
        new Point(138, 108.52839035867322)
    ));

    this.Unistrokes[1] = new Unistroke("x", new Array(new Point(87,142),new Point(89,145),new Point(91,148),new Point(93,151),new Point(96,155),new Point(98,157),new Point(100,160),new Point(102,162),new Point(106,167),new Point(108,169),new Point(110,171),new Point(115,177),new Point(119,183),new Point(123,189),new Point(127,193),new Point(129,196),new Point(133,200),new Point(137,206),new Point(140,209),new Point(143,212),new Point(146,215),new Point(151,220),new Point(153,222),new Point(155,223),new Point(157,225),new Point(158,223),new Point(157,218),new Point(155,211),new Point(154,208),new Point(152,200),new Point(150,189),new Point(148,179),new Point(147,170),new Point(147,158),new Point(147,148),new Point(147,141),new Point(147,136),new Point(144,135),new Point(142,137),new Point(140,139),new Point(135,145),new Point(131,152),new Point(124,163),new Point(116,177),new Point(108,191),new Point(100,206),new Point(94,217),new Point(91,222),new Point(89,225),new Point(87,226),new Point(87,224)));
    this.Unistrokes[3] = new Unistroke("circle", new Array(new Point(127,141),new Point(124,140),new Point(120,139),new Point(118,139),new Point(116,139),new Point(111,140),new Point(109,141),new Point(104,144),new Point(100,147),new Point(96,152),new Point(93,157),new Point(90,163),new Point(87,169),new Point(85,175),new Point(83,181),new Point(82,190),new Point(82,195),new Point(83,200),new Point(84,205),new Point(88,213),new Point(91,216),new Point(96,219),new Point(103,222),new Point(108,224),new Point(111,224),new Point(120,224),new Point(133,223),new Point(142,222),new Point(152,218),new Point(160,214),new Point(167,210),new Point(173,204),new Point(178,198),new Point(179,196),new Point(182,188),new Point(182,177),new Point(178,167),new Point(170,150),new Point(163,138),new Point(152,130),new Point(143,129),new Point(140,131),new Point(129,136),new Point(126,139)));
    this.Unistrokes[4] = new Unistroke("v", new Array(new Point(89,164),new Point(90,162),new Point(92,162),new Point(94,164),new Point(95,166),new Point(96,169),new Point(97,171),new Point(99,175),new Point(101,178),new Point(103,182),new Point(106,189),new Point(108,194),new Point(111,199),new Point(114,204),new Point(117,209),new Point(119,214),new Point(122,218),new Point(124,222),new Point(126,225),new Point(128,228),new Point(130,229),new Point(133,233),new Point(134,236),new Point(136,239),new Point(138,240),new Point(139,242),new Point(140,244),new Point(142,242),new Point(142,240),new Point(142,237),new Point(143,235),new Point(143,233),new Point(145,229),new Point(146,226),new Point(148,217),new Point(149,208),new Point(149,205),new Point(151,196),new Point(151,193),new Point(153,182),new Point(155,172),new Point(157,165),new Point(159,160),new Point(162,155),new Point(164,150),new Point(165,148),new Point(166,146)));
    this.Unistrokes[2] = new Unistroke("frown", new Array(new Point(307,216),new Point(333,186),new Point(356,215),new Point(375,186),new Point(399,216),new Point(418,186)));
    //
    // The $1 Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
    //
    this.Recognize = function(points, useProtractor)
    {
        console.log(points)
        var t0 = Date.now();
        var candidate = new Unistroke("", points);

        var u = -1;
        var b = +Infinity;
        for (var i = 0; i < this.Unistrokes.length; i++) // for each unistroke template
        {
            var d;
            if (useProtractor)
                d = OptimalCosineDistance(this.Unistrokes[i].Vector, candidate.Vector); // Protractor
            else
                d = DistanceAtBestAngle(candidate.Points, this.Unistrokes[i], -AngleRange, +AngleRange, AnglePrecision); // Golden Section Search (original $1)
            if (d < b) {
                b = d; // best (least) distance
                u = i; // unistroke index
            }
        }
        var t1 = Date.now();
        return (u == -1) ? new Result("No match.", 0.0, t1-t0) : new Result(this.Unistrokes[u].Name, useProtractor ? (1.0 - b) : (1.0 - b / HalfDiagonal), t1-t0);
    }
    this.AddGesture = function(name, points)
    {
        this.Unistrokes[this.Unistrokes.length] = new Unistroke(name, points); // append new unistroke
        var num = 0;
        for (var i = 0; i < this.Unistrokes.length; i++) {
            if (this.Unistrokes[i].Name == name)
                num++;
        }
        return num;
    }
    this.DeleteUserGestures = function()
    {
        this.Unistrokes.length = NumUnistrokes; // clear any beyond the original set
        return NumUnistrokes;
    }
}
//
// Private helper functions from here on down
//
function Resample(points, n)
{
    var I = PathLength(points) / (n - 1); // interval length
    var D = 0.0;
    var newpoints = new Array(points[0]);
    for (var i = 1; i < points.length; i++)
    {
        var d = Distance(points[i-1], points[i]);
        if ((D + d) >= I)
        {
            var qx = points[i-1].X + ((I - D) / d) * (points[i].X - points[i-1].X);
            var qy = points[i-1].Y + ((I - D) / d) * (points[i].Y - points[i-1].Y);
            var q = new Point(qx, qy);
            newpoints[newpoints.length] = q; // append new point 'q'
            points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
            D = 0.0;
        }
        else D += d;
    }
    if (newpoints.length == n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
        newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
    return newpoints;
}
function IndicativeAngle(points)
{
    var c = Centroid(points);
    return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
}
function RotateBy(points, radians) // rotates points around centroid
{
    var c = Centroid(points);
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) {
        var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X
        var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
        newpoints[newpoints.length] = new Point(qx, qy);
    }
    return newpoints;
}
function ScaleTo(points, size) // non-uniform scale; assumes 2D gestures (i.e., no lines)
{
    var B = BoundingBox(points);
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) {
        var qx = points[i].X * (size / B.Width);
        var qy = points[i].Y * (size / B.Height);
        newpoints[newpoints.length] = new Point(qx, qy);
    }
    return newpoints;
}
function TranslateTo(points, pt) // translates points' centroid
{
    var c = Centroid(points);
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) {
        var qx = points[i].X + pt.X - c.X;
        var qy = points[i].Y + pt.Y - c.Y;
        newpoints[newpoints.length] = new Point(qx, qy);
    }
    return newpoints;
}
function Vectorize(points) // for Protractor
{
    var sum = 0.0;
    var vector = new Array();
    for (var i = 0; i < points.length; i++) {
        vector[vector.length] = points[i].X;
        vector[vector.length] = points[i].Y;
        sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
    }
    var magnitude = Math.sqrt(sum);
    for (var i = 0; i < vector.length; i++)
        vector[i] /= magnitude;
    return vector;
}
function OptimalCosineDistance(v1, v2) // for Protractor
{
    var a = 0.0;
    var b = 0.0;
    for (var i = 0; i < v1.length; i += 2) {
        a += v1[i] * v2[i] + v1[i+1] * v2[i+1];
        b += v1[i] * v2[i+1] - v1[i+1] * v2[i];
    }
    var angle = Math.atan(b / a);
    return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
}
function DistanceAtBestAngle(points, T, a, b, threshold)
{
    var x1 = Phi * a + (1.0 - Phi) * b;
    var f1 = DistanceAtAngle(points, T, x1);
    var x2 = (1.0 - Phi) * a + Phi * b;
    var f2 = DistanceAtAngle(points, T, x2);
    while (Math.abs(b - a) > threshold)
    {
        if (f1 < f2) {
            b = x2;
            x2 = x1;
            f2 = f1;
            x1 = Phi * a + (1.0 - Phi) * b;
            f1 = DistanceAtAngle(points, T, x1);
        } else {
            a = x1;
            x1 = x2;
            f1 = f2;
            x2 = (1.0 - Phi) * a + Phi * b;
            f2 = DistanceAtAngle(points, T, x2);
        }
    }
    return Math.min(f1, f2);
}
function DistanceAtAngle(points, T, radians)
{
    var newpoints = RotateBy(points, radians);
    return PathDistance(newpoints, T.Points);
}
function Centroid(points)
{
    var x = 0.0, y = 0.0;
    for (var i = 0; i < points.length; i++) {
        x += points[i].X;
        y += points[i].Y;
    }
    x /= points.length;
    y /= points.length;
    return new Point(x, y);
}
function BoundingBox(points)
{
    var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
    for (var i = 0; i < points.length; i++) {
        minX = Math.min(minX, points[i].X);
        minY = Math.min(minY, points[i].Y);
        maxX = Math.max(maxX, points[i].X);
        maxY = Math.max(maxY, points[i].Y);
    }
    return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}
function PathDistance(pts1, pts2)
{
    var d = 0.0;
    for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
        d += Distance(pts1[i], pts2[i]);
    return d / pts1.length;
}
function PathLength(points)
{
    var d = 0.0;
    for (var i = 1; i < points.length; i++)
        d += Distance(points[i - 1], points[i]);
    return d;
}
function Distance(p1, p2)
{
    var dx = p2.X - p1.X;
    var dy = p2.Y - p1.Y;
    return Math.sqrt(dx * dx + dy * dy);
}
function Deg2Rad(d) { return (d * Math.PI / 180.0); }