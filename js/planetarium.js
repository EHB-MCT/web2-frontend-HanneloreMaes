/* <!--begin https://virtualsky.lco.global/ --> */

// longitude (53.0) - the longitude of the observer
// latitude (-2.5) - the latitude of the observer
//showposition (true) - show/hide the latitude and longitude

let planetarium;
S(document).ready(function() {
    planetarium = S.virtualsky({
        'id': 'starmapper',
        'projection': 'stereo',
        'ground': true,
        'gradient': true,
        'constellations': true,
        'constellationlabels': true,
        'showplanets': true,
        'showplanetslabels': true,
        'showstars': true,
        'showstarlabels': true,
        'gridlines_az': true,
        'live': true
    });
});

/* <!--eind https://virtualsky.lco.global/ --> */