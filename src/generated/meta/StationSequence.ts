// Generated from TfL route-sequence data. Do not edit by hand.
// Static topology only: station identity, order, and branches; no operational state.
// Regenerate with: pnpm run generate -- --only=station-sequences

export const STATION_SEQUENCES_GENERATED_AT = "2026-08-17T18:15:50.841Z";

export const LINE_STATION_SEQUENCES = {
  "bakerloo": {
    "lineId": "bakerloo",
    "lineName": "Bakerloo",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUBST",
        "name": "Baker Street Underground Station"
      },
      {
        "id": "940GZZLUCHX",
        "name": "Charing Cross Underground Station"
      },
      {
        "id": "940GZZLUERB",
        "name": "Edgware Road (Bakerloo) Underground Station"
      },
      {
        "id": "940GZZLUEAC",
        "name": "Elephant & Castle Underground Station"
      },
      {
        "id": "940GZZLUEMB",
        "name": "Embankment Underground Station"
      },
      {
        "id": "940GZZLUHSN",
        "name": "Harlesden Underground Station"
      },
      {
        "id": "940GZZLUHAW",
        "name": "Harrow & Wealdstone Underground Station"
      },
      {
        "id": "940GZZLUKSL",
        "name": "Kensal Green Underground Station"
      },
      {
        "id": "940GZZLUKEN",
        "name": "Kenton Underground Station"
      },
      {
        "id": "940GZZLUKPK",
        "name": "Kilburn Park Underground Station"
      },
      {
        "id": "940GZZLULBN",
        "name": "Lambeth North Underground Station"
      },
      {
        "id": "940GZZLUMVL",
        "name": "Maida Vale Underground Station"
      },
      {
        "id": "940GZZLUMYB",
        "name": "Marylebone Underground Station"
      },
      {
        "id": "940GZZLUNWY",
        "name": "North Wembley Underground Station"
      },
      {
        "id": "940GZZLUOXC",
        "name": "Oxford Circus Underground Station"
      },
      {
        "id": "940GZZLUPAC",
        "name": "Paddington Underground Station"
      },
      {
        "id": "940GZZLUPCC",
        "name": "Piccadilly Circus Underground Station"
      },
      {
        "id": "940GZZLUQPS",
        "name": "Queen's Park Underground Station"
      },
      {
        "id": "940GZZLURGP",
        "name": "Regent's Park Underground Station"
      },
      {
        "id": "940GZZLUSKT",
        "name": "South Kenton Underground Station"
      },
      {
        "id": "940GZZLUSGP",
        "name": "Stonebridge Park Underground Station"
      },
      {
        "id": "940GZZLUWKA",
        "name": "Warwick Avenue Underground Station"
      },
      {
        "id": "940GZZLUWLO",
        "name": "Waterloo Underground Station"
      },
      {
        "id": "940GZZLUWYC",
        "name": "Wembley Central Underground Station"
      },
      {
        "id": "940GZZLUWJN",
        "name": "Willesden Junction Underground Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUHAW",
          "940GZZLUKEN",
          "940GZZLUSKT",
          "940GZZLUNWY",
          "940GZZLUWYC",
          "940GZZLUSGP",
          "940GZZLUHSN",
          "940GZZLUWJN",
          "940GZZLUKSL",
          "940GZZLUQPS",
          "940GZZLUKPK",
          "940GZZLUMVL",
          "940GZZLUWKA",
          "940GZZLUPAC",
          "940GZZLUERB",
          "940GZZLUMYB",
          "940GZZLUBST",
          "940GZZLURGP",
          "940GZZLUOXC",
          "940GZZLUPCC",
          "940GZZLUCHX",
          "940GZZLUEMB",
          "940GZZLUWLO",
          "940GZZLULBN",
          "940GZZLUEAC"
        ]
      },
      {
        "id": 1,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUEAC",
          "940GZZLULBN",
          "940GZZLUWLO",
          "940GZZLUEMB",
          "940GZZLUCHX",
          "940GZZLUPCC",
          "940GZZLUOXC",
          "940GZZLURGP",
          "940GZZLUBST",
          "940GZZLUMYB",
          "940GZZLUERB",
          "940GZZLUPAC",
          "940GZZLUWKA",
          "940GZZLUMVL",
          "940GZZLUKPK",
          "940GZZLUQPS",
          "940GZZLUKSL",
          "940GZZLUWJN",
          "940GZZLUHSN",
          "940GZZLUSGP",
          "940GZZLUWYC",
          "940GZZLUNWY",
          "940GZZLUSKT",
          "940GZZLUKEN",
          "940GZZLUHAW"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Harrow & Wealdstone  &harr;  Elephant & Castle ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHAW",
          "940GZZLUKEN",
          "940GZZLUSKT",
          "940GZZLUNWY",
          "940GZZLUWYC",
          "940GZZLUSGP",
          "940GZZLUHSN",
          "940GZZLUWJN",
          "940GZZLUKSL",
          "940GZZLUQPS",
          "940GZZLUKPK",
          "940GZZLUMVL",
          "940GZZLUWKA",
          "940GZZLUPAC",
          "940GZZLUERB",
          "940GZZLUMYB",
          "940GZZLUBST",
          "940GZZLURGP",
          "940GZZLUOXC",
          "940GZZLUPCC",
          "940GZZLUCHX",
          "940GZZLUEMB",
          "940GZZLUWLO",
          "940GZZLULBN",
          "940GZZLUEAC"
        ]
      },
      {
        "name": "Elephant & Castle  &harr;  Harrow & Wealdstone ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUEAC",
          "940GZZLULBN",
          "940GZZLUWLO",
          "940GZZLUEMB",
          "940GZZLUCHX",
          "940GZZLUPCC",
          "940GZZLUOXC",
          "940GZZLURGP",
          "940GZZLUBST",
          "940GZZLUMYB",
          "940GZZLUERB",
          "940GZZLUPAC",
          "940GZZLUWKA",
          "940GZZLUMVL",
          "940GZZLUKPK",
          "940GZZLUQPS",
          "940GZZLUKSL",
          "940GZZLUWJN",
          "940GZZLUHSN",
          "940GZZLUSGP",
          "940GZZLUWYC",
          "940GZZLUNWY",
          "940GZZLUSKT",
          "940GZZLUKEN",
          "940GZZLUHAW"
        ]
      }
    ]
  },
  "central": {
    "lineId": "central",
    "lineName": "Central",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUBNK",
        "name": "Bank Underground Station"
      },
      {
        "id": "940GZZLUBKE",
        "name": "Barkingside Underground Station"
      },
      {
        "id": "940GZZLUBLG",
        "name": "Bethnal Green Underground Station"
      },
      {
        "id": "940GZZLUBND",
        "name": "Bond Street Underground Station"
      },
      {
        "id": "940GZZLUBKH",
        "name": "Buckhurst Hill Underground Station"
      },
      {
        "id": "940GZZLUCHL",
        "name": "Chancery Lane Underground Station"
      },
      {
        "id": "940GZZLUCWL",
        "name": "Chigwell Underground Station"
      },
      {
        "id": "940GZZLUDBN",
        "name": "Debden Underground Station"
      },
      {
        "id": "940GZZLUEBY",
        "name": "Ealing Broadway Underground Station"
      },
      {
        "id": "940GZZLUEAN",
        "name": "East Acton Underground Station"
      },
      {
        "id": "940GZZLUEPG",
        "name": "Epping Underground Station"
      },
      {
        "id": "940GZZLUFLP",
        "name": "Fairlop Underground Station"
      },
      {
        "id": "940GZZLUGTH",
        "name": "Gants Hill Underground Station"
      },
      {
        "id": "940GZZLUGGH",
        "name": "Grange Hill Underground Station"
      },
      {
        "id": "940GZZLUGFD",
        "name": "Greenford Underground Station"
      },
      {
        "id": "940GZZLUHLT",
        "name": "Hainault Underground Station"
      },
      {
        "id": "940GZZLUHGR",
        "name": "Hanger Lane Underground Station"
      },
      {
        "id": "940GZZLUHBN",
        "name": "Holborn Underground Station"
      },
      {
        "id": "940GZZLUHPK",
        "name": "Holland Park Underground Station"
      },
      {
        "id": "940GZZLULGT",
        "name": "Lancaster Gate Underground Station"
      },
      {
        "id": "940GZZLULYN",
        "name": "Leyton Underground Station"
      },
      {
        "id": "940GZZLULYS",
        "name": "Leytonstone Underground Station"
      },
      {
        "id": "940GZZLULVT",
        "name": "Liverpool Street Underground Station"
      },
      {
        "id": "940GZZLULGN",
        "name": "Loughton Underground Station"
      },
      {
        "id": "940GZZLUMBA",
        "name": "Marble Arch Underground Station"
      },
      {
        "id": "940GZZLUMED",
        "name": "Mile End Underground Station"
      },
      {
        "id": "940GZZLUNBP",
        "name": "Newbury Park Underground Station"
      },
      {
        "id": "940GZZLUNAN",
        "name": "North Acton Underground Station"
      },
      {
        "id": "940GZZLUNHT",
        "name": "Northolt Underground Station"
      },
      {
        "id": "940GZZLUNHG",
        "name": "Notting Hill Gate Underground Station"
      },
      {
        "id": "940GZZLUOXC",
        "name": "Oxford Circus Underground Station"
      },
      {
        "id": "940GZZLUPVL",
        "name": "Perivale Underground Station"
      },
      {
        "id": "940GZZLUQWY",
        "name": "Queensway Underground Station"
      },
      {
        "id": "940GZZLURBG",
        "name": "Redbridge Underground Station"
      },
      {
        "id": "940GZZLURVY",
        "name": "Roding Valley Underground Station"
      },
      {
        "id": "940GZZLURSG",
        "name": "Ruislip Gardens Underground Station"
      },
      {
        "id": "940GZZLUSBC",
        "name": "Shepherd's Bush (Central) Underground Station"
      },
      {
        "id": "940GZZLUSNB",
        "name": "Snaresbrook Underground Station"
      },
      {
        "id": "940GZZLUSRP",
        "name": "South Ruislip Underground Station"
      },
      {
        "id": "940GZZLUSWF",
        "name": "South Woodford Underground Station"
      },
      {
        "id": "940GZZLUSPU",
        "name": "St. Paul's Underground Station"
      },
      {
        "id": "940GZZLUSTD",
        "name": "Stratford Underground Station"
      },
      {
        "id": "940GZZLUTHB",
        "name": "Theydon Bois Underground Station"
      },
      {
        "id": "940GZZLUTCR",
        "name": "Tottenham Court Road Underground Station"
      },
      {
        "id": "940GZZLUWSD",
        "name": "Wanstead Underground Station"
      },
      {
        "id": "940GZZLUWTA",
        "name": "West Acton Underground Station"
      },
      {
        "id": "940GZZLUWRP",
        "name": "West Ruislip Underground Station"
      },
      {
        "id": "940GZZLUWCY",
        "name": "White City Underground Station"
      },
      {
        "id": "940GZZLUWOF",
        "name": "Woodford Underground Station"
      }
    ],
    "branches": [
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUEPG",
          "940GZZLUTHB",
          "940GZZLUDBN",
          "940GZZLULGN",
          "940GZZLUBKH",
          "940GZZLUWOF"
        ]
      },
      {
        "id": 5,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          6
        ],
        "previousBranchIds": [
          2,
          0
        ],
        "stationIds": [
          "940GZZLUWOF",
          "940GZZLUSWF",
          "940GZZLUSNB",
          "940GZZLULYS"
        ]
      },
      {
        "id": 6,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3,
          4
        ],
        "previousBranchIds": [
          5,
          1
        ],
        "stationIds": [
          "940GZZLULYS",
          "940GZZLULYN",
          "940GZZLUSTD",
          "940GZZLUMED",
          "940GZZLUBLG",
          "940GZZLULVT",
          "940GZZLUBNK",
          "940GZZLUSPU",
          "940GZZLUCHL",
          "940GZZLUHBN",
          "940GZZLUTCR",
          "940GZZLUOXC",
          "940GZZLUBND",
          "940GZZLUMBA",
          "940GZZLULGT",
          "940GZZLUQWY",
          "940GZZLUNHG",
          "940GZZLUHPK",
          "940GZZLUSBC",
          "940GZZLUWCY",
          "940GZZLUEAN",
          "940GZZLUNAN"
        ]
      },
      {
        "id": 4,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "940GZZLUNAN",
          "940GZZLUHGR",
          "940GZZLUPVL",
          "940GZZLUGFD",
          "940GZZLUNHT",
          "940GZZLUSRP",
          "940GZZLURSG",
          "940GZZLUWRP"
        ]
      },
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          6
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUHLT",
          "940GZZLUFLP",
          "940GZZLUBKE",
          "940GZZLUNBP",
          "940GZZLUGTH",
          "940GZZLURBG",
          "940GZZLUWSD",
          "940GZZLULYS"
        ]
      },
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUHLT",
          "940GZZLUGGH",
          "940GZZLUCWL",
          "940GZZLURVY",
          "940GZZLUWOF"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "940GZZLUNAN",
          "940GZZLUWTA",
          "940GZZLUEBY"
        ]
      },
      {
        "id": 8,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          13
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUWRP",
          "940GZZLURSG",
          "940GZZLUSRP",
          "940GZZLUNHT",
          "940GZZLUGFD",
          "940GZZLUPVL",
          "940GZZLUHGR",
          "940GZZLUNAN"
        ]
      },
      {
        "id": 13,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11,
          12
        ],
        "previousBranchIds": [
          8,
          7
        ],
        "stationIds": [
          "940GZZLUNAN",
          "940GZZLUEAN",
          "940GZZLUWCY",
          "940GZZLUSBC",
          "940GZZLUHPK",
          "940GZZLUNHG",
          "940GZZLUQWY",
          "940GZZLULGT",
          "940GZZLUMBA",
          "940GZZLUBND",
          "940GZZLUOXC",
          "940GZZLUTCR",
          "940GZZLUHBN",
          "940GZZLUCHL",
          "940GZZLUSPU",
          "940GZZLUBNK",
          "940GZZLULVT",
          "940GZZLUBLG",
          "940GZZLUMED",
          "940GZZLUSTD",
          "940GZZLULYN",
          "940GZZLULYS"
        ]
      },
      {
        "id": 11,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          9,
          10
        ],
        "previousBranchIds": [
          13
        ],
        "stationIds": [
          "940GZZLULYS",
          "940GZZLUSNB",
          "940GZZLUSWF",
          "940GZZLUWOF"
        ]
      },
      {
        "id": 10,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          11
        ],
        "stationIds": [
          "940GZZLUWOF",
          "940GZZLUBKH",
          "940GZZLULGN",
          "940GZZLUDBN",
          "940GZZLUTHB",
          "940GZZLUEPG"
        ]
      },
      {
        "id": 12,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          13
        ],
        "stationIds": [
          "940GZZLULYS",
          "940GZZLUWSD",
          "940GZZLURBG",
          "940GZZLUGTH",
          "940GZZLUNBP",
          "940GZZLUBKE",
          "940GZZLUFLP",
          "940GZZLUHLT"
        ]
      },
      {
        "id": 9,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          11
        ],
        "stationIds": [
          "940GZZLUWOF",
          "940GZZLURVY",
          "940GZZLUCWL",
          "940GZZLUGGH",
          "940GZZLUHLT"
        ]
      },
      {
        "id": 7,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          13
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUEBY",
          "940GZZLUWTA",
          "940GZZLUNAN"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Epping  &harr;  West Ruislip ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUEPG",
          "940GZZLUTHB",
          "940GZZLUDBN",
          "940GZZLULGN",
          "940GZZLUBKH",
          "940GZZLUWOF",
          "940GZZLUSWF",
          "940GZZLUSNB",
          "940GZZLULYS",
          "940GZZLULYN",
          "940GZZLUSTD",
          "940GZZLUMED",
          "940GZZLUBLG",
          "940GZZLULVT",
          "940GZZLUBNK",
          "940GZZLUSPU",
          "940GZZLUCHL",
          "940GZZLUHBN",
          "940GZZLUTCR",
          "940GZZLUOXC",
          "940GZZLUBND",
          "940GZZLUMBA",
          "940GZZLULGT",
          "940GZZLUQWY",
          "940GZZLUNHG",
          "940GZZLUHPK",
          "940GZZLUSBC",
          "940GZZLUWCY",
          "940GZZLUEAN",
          "940GZZLUNAN",
          "940GZZLUHGR",
          "940GZZLUPVL",
          "940GZZLUGFD",
          "940GZZLUNHT",
          "940GZZLUSRP",
          "940GZZLURSG",
          "940GZZLUWRP"
        ]
      },
      {
        "name": "Epping  &harr;  Ealing Broadway ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUEPG",
          "940GZZLUTHB",
          "940GZZLUDBN",
          "940GZZLULGN",
          "940GZZLUBKH",
          "940GZZLUWOF",
          "940GZZLUSWF",
          "940GZZLUSNB",
          "940GZZLULYS",
          "940GZZLULYN",
          "940GZZLUSTD",
          "940GZZLUMED",
          "940GZZLUBLG",
          "940GZZLULVT",
          "940GZZLUBNK",
          "940GZZLUSPU",
          "940GZZLUCHL",
          "940GZZLUHBN",
          "940GZZLUTCR",
          "940GZZLUOXC",
          "940GZZLUBND",
          "940GZZLUMBA",
          "940GZZLULGT",
          "940GZZLUQWY",
          "940GZZLUNHG",
          "940GZZLUHPK",
          "940GZZLUSBC",
          "940GZZLUWCY",
          "940GZZLUEAN",
          "940GZZLUNAN",
          "940GZZLUWTA",
          "940GZZLUEBY"
        ]
      },
      {
        "name": "Hainault  &harr;  West Ruislip  via Newbury Park",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHLT",
          "940GZZLUFLP",
          "940GZZLUBKE",
          "940GZZLUNBP",
          "940GZZLUGTH",
          "940GZZLURBG",
          "940GZZLUWSD",
          "940GZZLULYS",
          "940GZZLULYN",
          "940GZZLUSTD",
          "940GZZLUMED",
          "940GZZLUBLG",
          "940GZZLULVT",
          "940GZZLUBNK",
          "940GZZLUSPU",
          "940GZZLUCHL",
          "940GZZLUHBN",
          "940GZZLUTCR",
          "940GZZLUOXC",
          "940GZZLUBND",
          "940GZZLUMBA",
          "940GZZLULGT",
          "940GZZLUQWY",
          "940GZZLUNHG",
          "940GZZLUHPK",
          "940GZZLUSBC",
          "940GZZLUWCY",
          "940GZZLUEAN",
          "940GZZLUNAN",
          "940GZZLUHGR",
          "940GZZLUPVL",
          "940GZZLUGFD",
          "940GZZLUNHT",
          "940GZZLUSRP",
          "940GZZLURSG",
          "940GZZLUWRP"
        ]
      },
      {
        "name": "Hainault  &harr;  Ealing Broadway ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHLT",
          "940GZZLUFLP",
          "940GZZLUBKE",
          "940GZZLUNBP",
          "940GZZLUGTH",
          "940GZZLURBG",
          "940GZZLUWSD",
          "940GZZLULYS",
          "940GZZLULYN",
          "940GZZLUSTD",
          "940GZZLUMED",
          "940GZZLUBLG",
          "940GZZLULVT",
          "940GZZLUBNK",
          "940GZZLUSPU",
          "940GZZLUCHL",
          "940GZZLUHBN",
          "940GZZLUTCR",
          "940GZZLUOXC",
          "940GZZLUBND",
          "940GZZLUMBA",
          "940GZZLULGT",
          "940GZZLUQWY",
          "940GZZLUNHG",
          "940GZZLUHPK",
          "940GZZLUSBC",
          "940GZZLUWCY",
          "940GZZLUEAN",
          "940GZZLUNAN",
          "940GZZLUWTA",
          "940GZZLUEBY"
        ]
      },
      {
        "name": "Hainault  &harr;  West Ruislip  via Woodford",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHLT",
          "940GZZLUGGH",
          "940GZZLUCWL",
          "940GZZLURVY",
          "940GZZLUWOF",
          "940GZZLUSWF",
          "940GZZLUSNB",
          "940GZZLULYS",
          "940GZZLULYN",
          "940GZZLUSTD",
          "940GZZLUMED",
          "940GZZLUBLG",
          "940GZZLULVT",
          "940GZZLUBNK",
          "940GZZLUSPU",
          "940GZZLUCHL",
          "940GZZLUHBN",
          "940GZZLUTCR",
          "940GZZLUOXC",
          "940GZZLUBND",
          "940GZZLUMBA",
          "940GZZLULGT",
          "940GZZLUQWY",
          "940GZZLUNHG",
          "940GZZLUHPK",
          "940GZZLUSBC",
          "940GZZLUWCY",
          "940GZZLUEAN",
          "940GZZLUNAN",
          "940GZZLUHGR",
          "940GZZLUPVL",
          "940GZZLUGFD",
          "940GZZLUNHT",
          "940GZZLUSRP",
          "940GZZLURSG",
          "940GZZLUWRP"
        ]
      },
      {
        "name": "Ealing Broadway  &harr;  Epping ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUEBY",
          "940GZZLUWTA",
          "940GZZLUNAN",
          "940GZZLUEAN",
          "940GZZLUWCY",
          "940GZZLUSBC",
          "940GZZLUHPK",
          "940GZZLUNHG",
          "940GZZLUQWY",
          "940GZZLULGT",
          "940GZZLUMBA",
          "940GZZLUBND",
          "940GZZLUOXC",
          "940GZZLUTCR",
          "940GZZLUHBN",
          "940GZZLUCHL",
          "940GZZLUSPU",
          "940GZZLUBNK",
          "940GZZLULVT",
          "940GZZLUBLG",
          "940GZZLUMED",
          "940GZZLUSTD",
          "940GZZLULYN",
          "940GZZLULYS",
          "940GZZLUSNB",
          "940GZZLUSWF",
          "940GZZLUWOF",
          "940GZZLUBKH",
          "940GZZLULGN",
          "940GZZLUDBN",
          "940GZZLUTHB",
          "940GZZLUEPG"
        ]
      },
      {
        "name": "Ealing Broadway  &harr;  Hainault ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUEBY",
          "940GZZLUWTA",
          "940GZZLUNAN",
          "940GZZLUEAN",
          "940GZZLUWCY",
          "940GZZLUSBC",
          "940GZZLUHPK",
          "940GZZLUNHG",
          "940GZZLUQWY",
          "940GZZLULGT",
          "940GZZLUMBA",
          "940GZZLUBND",
          "940GZZLUOXC",
          "940GZZLUTCR",
          "940GZZLUHBN",
          "940GZZLUCHL",
          "940GZZLUSPU",
          "940GZZLUBNK",
          "940GZZLULVT",
          "940GZZLUBLG",
          "940GZZLUMED",
          "940GZZLUSTD",
          "940GZZLULYN",
          "940GZZLULYS",
          "940GZZLUWSD",
          "940GZZLURBG",
          "940GZZLUGTH",
          "940GZZLUNBP",
          "940GZZLUBKE",
          "940GZZLUFLP",
          "940GZZLUHLT"
        ]
      },
      {
        "name": "West Ruislip  &harr;  Epping ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUWRP",
          "940GZZLURSG",
          "940GZZLUSRP",
          "940GZZLUNHT",
          "940GZZLUGFD",
          "940GZZLUPVL",
          "940GZZLUHGR",
          "940GZZLUNAN",
          "940GZZLUEAN",
          "940GZZLUWCY",
          "940GZZLUSBC",
          "940GZZLUHPK",
          "940GZZLUNHG",
          "940GZZLUQWY",
          "940GZZLULGT",
          "940GZZLUMBA",
          "940GZZLUBND",
          "940GZZLUOXC",
          "940GZZLUTCR",
          "940GZZLUHBN",
          "940GZZLUCHL",
          "940GZZLUSPU",
          "940GZZLUBNK",
          "940GZZLULVT",
          "940GZZLUBLG",
          "940GZZLUMED",
          "940GZZLUSTD",
          "940GZZLULYN",
          "940GZZLULYS",
          "940GZZLUSNB",
          "940GZZLUSWF",
          "940GZZLUWOF",
          "940GZZLUBKH",
          "940GZZLULGN",
          "940GZZLUDBN",
          "940GZZLUTHB",
          "940GZZLUEPG"
        ]
      },
      {
        "name": "West Ruislip  &harr;  Hainault  via Woodford",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUWRP",
          "940GZZLURSG",
          "940GZZLUSRP",
          "940GZZLUNHT",
          "940GZZLUGFD",
          "940GZZLUPVL",
          "940GZZLUHGR",
          "940GZZLUNAN",
          "940GZZLUEAN",
          "940GZZLUWCY",
          "940GZZLUSBC",
          "940GZZLUHPK",
          "940GZZLUNHG",
          "940GZZLUQWY",
          "940GZZLULGT",
          "940GZZLUMBA",
          "940GZZLUBND",
          "940GZZLUOXC",
          "940GZZLUTCR",
          "940GZZLUHBN",
          "940GZZLUCHL",
          "940GZZLUSPU",
          "940GZZLUBNK",
          "940GZZLULVT",
          "940GZZLUBLG",
          "940GZZLUMED",
          "940GZZLUSTD",
          "940GZZLULYN",
          "940GZZLULYS",
          "940GZZLUSNB",
          "940GZZLUSWF",
          "940GZZLUWOF",
          "940GZZLURVY",
          "940GZZLUCWL",
          "940GZZLUGGH",
          "940GZZLUHLT"
        ]
      },
      {
        "name": "West Ruislip  &harr;  Hainault  via Newbury Park",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUWRP",
          "940GZZLURSG",
          "940GZZLUSRP",
          "940GZZLUNHT",
          "940GZZLUGFD",
          "940GZZLUPVL",
          "940GZZLUHGR",
          "940GZZLUNAN",
          "940GZZLUEAN",
          "940GZZLUWCY",
          "940GZZLUSBC",
          "940GZZLUHPK",
          "940GZZLUNHG",
          "940GZZLUQWY",
          "940GZZLULGT",
          "940GZZLUMBA",
          "940GZZLUBND",
          "940GZZLUOXC",
          "940GZZLUTCR",
          "940GZZLUHBN",
          "940GZZLUCHL",
          "940GZZLUSPU",
          "940GZZLUBNK",
          "940GZZLULVT",
          "940GZZLUBLG",
          "940GZZLUMED",
          "940GZZLUSTD",
          "940GZZLULYN",
          "940GZZLULYS",
          "940GZZLUWSD",
          "940GZZLURBG",
          "940GZZLUGTH",
          "940GZZLUNBP",
          "940GZZLUBKE",
          "940GZZLUFLP",
          "940GZZLUHLT"
        ]
      }
    ]
  },
  "circle": {
    "lineId": "circle",
    "lineName": "Circle",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUALD",
        "name": "Aldgate Underground Station"
      },
      {
        "id": "940GZZLUBST",
        "name": "Baker Street Underground Station"
      },
      {
        "id": "940GZZLUBBN",
        "name": "Barbican Underground Station"
      },
      {
        "id": "940GZZLUBWT",
        "name": "Bayswater Underground Station"
      },
      {
        "id": "940GZZLUBKF",
        "name": "Blackfriars Underground Station"
      },
      {
        "id": "940GZZLUCST",
        "name": "Cannon Street Underground Station"
      },
      {
        "id": "940GZZLUERC",
        "name": "Edgware Road (Circle Line) Underground Station"
      },
      {
        "id": "940GZZLUEMB",
        "name": "Embankment Underground Station"
      },
      {
        "id": "940GZZLUESQ",
        "name": "Euston Square Underground Station"
      },
      {
        "id": "940GZZLUFCN",
        "name": "Farringdon Underground Station"
      },
      {
        "id": "940GZZLUGTR",
        "name": "Gloucester Road Underground Station"
      },
      {
        "id": "940GZZLUGHK",
        "name": "Goldhawk Road Underground Station"
      },
      {
        "id": "940GZZLUGPS",
        "name": "Great Portland Street Underground Station"
      },
      {
        "id": "940GZZLUHSC",
        "name": "Hammersmith (H&C Line) Underground Station"
      },
      {
        "id": "940GZZLUHSK",
        "name": "High Street Kensington Underground Station"
      },
      {
        "id": "940GZZLUKSX",
        "name": "King's Cross St. Pancras Underground Station"
      },
      {
        "id": "940GZZLULAD",
        "name": "Ladbroke Grove Underground Station"
      },
      {
        "id": "940GZZLULRD",
        "name": "Latimer Road Underground Station"
      },
      {
        "id": "940GZZLULVT",
        "name": "Liverpool Street Underground Station"
      },
      {
        "id": "940GZZLUMSH",
        "name": "Mansion House Underground Station"
      },
      {
        "id": "940GZZLUMMT",
        "name": "Monument Underground Station"
      },
      {
        "id": "940GZZLUMGT",
        "name": "Moorgate Underground Station"
      },
      {
        "id": "940GZZLUNHG",
        "name": "Notting Hill Gate Underground Station"
      },
      {
        "id": "940GZZLUPAH",
        "name": "Paddington (H&C Line)-Underground"
      },
      {
        "id": "940GZZLUPAC",
        "name": "Paddington Underground Station"
      },
      {
        "id": "940GZZLURYO",
        "name": "Royal Oak Underground Station"
      },
      {
        "id": "940GZZLUSBM",
        "name": "Shepherd's Bush Market Underground Station"
      },
      {
        "id": "940GZZLUSSQ",
        "name": "Sloane Square Underground Station"
      },
      {
        "id": "940GZZLUSKS",
        "name": "South Kensington Underground Station"
      },
      {
        "id": "940GZZLUSJP",
        "name": "St. James's Park Underground Station"
      },
      {
        "id": "940GZZLUTMP",
        "name": "Temple Underground Station"
      },
      {
        "id": "940GZZLUTWH",
        "name": "Tower Hill Underground Station"
      },
      {
        "id": "940GZZLUVIC",
        "name": "Victoria Underground Station"
      },
      {
        "id": "940GZZLUWSP",
        "name": "Westbourne Park Underground Station"
      },
      {
        "id": "940GZZLUWSM",
        "name": "Westminster Underground Station"
      },
      {
        "id": "940GZZLUWLA",
        "name": "Wood Lane Underground Station"
      }
    ],
    "branches": [
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          1,
          0
        ],
        "previousBranchIds": [
          1
        ],
        "stationIds": [
          "940GZZLUERC",
          "940GZZLUPAC",
          "940GZZLUBWT",
          "940GZZLUNHG",
          "940GZZLUHSK",
          "940GZZLUGTR",
          "940GZZLUSKS",
          "940GZZLUSSQ",
          "940GZZLUVIC",
          "940GZZLUSJP",
          "940GZZLUWSM",
          "940GZZLUEMB",
          "940GZZLUTMP",
          "940GZZLUBKF",
          "940GZZLUMSH",
          "940GZZLUCST",
          "940GZZLUMMT",
          "940GZZLUTWH",
          "940GZZLUALD",
          "940GZZLULVT",
          "940GZZLUMGT",
          "940GZZLUBBN",
          "940GZZLUFCN",
          "940GZZLUKSX",
          "940GZZLUESQ",
          "940GZZLUGPS",
          "940GZZLUBST",
          "940GZZLUERC"
        ]
      },
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          1
        ],
        "stationIds": [
          "940GZZLUERC",
          "940GZZLUPAH",
          "940GZZLURYO",
          "940GZZLUWSP",
          "940GZZLULAD",
          "940GZZLULRD",
          "940GZZLUWLA",
          "940GZZLUSBM",
          "940GZZLUGHK",
          "940GZZLUHSC"
        ]
      },
      {
        "id": 2,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUHSC",
          "940GZZLUGHK",
          "940GZZLUSBM",
          "940GZZLUWLA",
          "940GZZLULRD",
          "940GZZLULAD",
          "940GZZLUWSP",
          "940GZZLURYO",
          "940GZZLUPAH",
          "940GZZLUERC"
        ]
      },
      {
        "id": 3,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3
        ],
        "previousBranchIds": [
          2,
          3
        ],
        "stationIds": [
          "940GZZLUERC",
          "940GZZLUBST",
          "940GZZLUGPS",
          "940GZZLUESQ",
          "940GZZLUKSX",
          "940GZZLUFCN",
          "940GZZLUBBN",
          "940GZZLUMGT",
          "940GZZLULVT",
          "940GZZLUALD",
          "940GZZLUTWH",
          "940GZZLUMMT",
          "940GZZLUCST",
          "940GZZLUMSH",
          "940GZZLUBKF",
          "940GZZLUTMP",
          "940GZZLUEMB",
          "940GZZLUWSM",
          "940GZZLUSJP",
          "940GZZLUVIC",
          "940GZZLUSSQ",
          "940GZZLUSKS",
          "940GZZLUGTR",
          "940GZZLUHSK",
          "940GZZLUNHG",
          "940GZZLUBWT",
          "940GZZLUPAC",
          "940GZZLUERC"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Edgware Road (Circle Line)  &harr;  Hammersmith (H&C Line) ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUERC",
          "940GZZLUPAC",
          "940GZZLUBWT",
          "940GZZLUNHG",
          "940GZZLUHSK",
          "940GZZLUGTR",
          "940GZZLUSKS",
          "940GZZLUSSQ",
          "940GZZLUVIC",
          "940GZZLUSJP",
          "940GZZLUWSM",
          "940GZZLUEMB",
          "940GZZLUTMP",
          "940GZZLUBKF",
          "940GZZLUMSH",
          "940GZZLUCST",
          "940GZZLUMMT",
          "940GZZLUTWH",
          "940GZZLUALD",
          "940GZZLULVT",
          "940GZZLUMGT",
          "940GZZLUBBN",
          "940GZZLUFCN",
          "940GZZLUKSX",
          "940GZZLUESQ",
          "940GZZLUGPS",
          "940GZZLUBST",
          "940GZZLUERC",
          "940GZZLUPAH",
          "940GZZLURYO",
          "940GZZLUWSP",
          "940GZZLULAD",
          "940GZZLULRD",
          "940GZZLUWLA",
          "940GZZLUSBM",
          "940GZZLUGHK",
          "940GZZLUHSC"
        ]
      },
      {
        "name": "Hammersmith (H&C Line)  &harr;  Edgware Road (Circle Line) ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHSC",
          "940GZZLUGHK",
          "940GZZLUSBM",
          "940GZZLUWLA",
          "940GZZLULRD",
          "940GZZLULAD",
          "940GZZLUWSP",
          "940GZZLURYO",
          "940GZZLUPAH",
          "940GZZLUERC",
          "940GZZLUBST",
          "940GZZLUGPS",
          "940GZZLUESQ",
          "940GZZLUKSX",
          "940GZZLUFCN",
          "940GZZLUBBN",
          "940GZZLUMGT",
          "940GZZLULVT",
          "940GZZLUALD",
          "940GZZLUTWH",
          "940GZZLUMMT",
          "940GZZLUCST",
          "940GZZLUMSH",
          "940GZZLUBKF",
          "940GZZLUTMP",
          "940GZZLUEMB",
          "940GZZLUWSM",
          "940GZZLUSJP",
          "940GZZLUVIC",
          "940GZZLUSSQ",
          "940GZZLUSKS",
          "940GZZLUGTR",
          "940GZZLUHSK",
          "940GZZLUNHG",
          "940GZZLUBWT",
          "940GZZLUPAC",
          "940GZZLUERC"
        ]
      }
    ]
  },
  "district": {
    "lineId": "district",
    "lineName": "District",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUACT",
        "name": "Acton Town Underground Station"
      },
      {
        "id": "940GZZLUADE",
        "name": "Aldgate East Underground Station"
      },
      {
        "id": "940GZZLUBKG",
        "name": "Barking Underground Station"
      },
      {
        "id": "940GZZLUBSC",
        "name": "Barons Court Underground Station"
      },
      {
        "id": "940GZZLUBWT",
        "name": "Bayswater Underground Station"
      },
      {
        "id": "940GZZLUBEC",
        "name": "Becontree Underground Station"
      },
      {
        "id": "940GZZLUBKF",
        "name": "Blackfriars Underground Station"
      },
      {
        "id": "940GZZLUBWR",
        "name": "Bow Road Underground Station"
      },
      {
        "id": "940GZZLUBBB",
        "name": "Bromley-by-Bow Underground Station"
      },
      {
        "id": "940GZZLUCST",
        "name": "Cannon Street Underground Station"
      },
      {
        "id": "940GZZLUCWP",
        "name": "Chiswick Park Underground Station"
      },
      {
        "id": "940GZZLUDGE",
        "name": "Dagenham East Underground Station"
      },
      {
        "id": "940GZZLUDGY",
        "name": "Dagenham Heathway Underground Station"
      },
      {
        "id": "940GZZLUEBY",
        "name": "Ealing Broadway Underground Station"
      },
      {
        "id": "940GZZLUECM",
        "name": "Ealing Common Underground Station"
      },
      {
        "id": "940GZZLUECT",
        "name": "Earl's Court Underground Station"
      },
      {
        "id": "940GZZLUEHM",
        "name": "East Ham Underground Station"
      },
      {
        "id": "940GZZLUEPY",
        "name": "East Putney Underground Station"
      },
      {
        "id": "940GZZLUERC",
        "name": "Edgware Road (Circle Line) Underground Station"
      },
      {
        "id": "940GZZLUEPK",
        "name": "Elm Park Underground Station"
      },
      {
        "id": "940GZZLUEMB",
        "name": "Embankment Underground Station"
      },
      {
        "id": "940GZZLUFBY",
        "name": "Fulham Broadway Underground Station"
      },
      {
        "id": "940GZZLUGTR",
        "name": "Gloucester Road Underground Station"
      },
      {
        "id": "940GZZLUGBY",
        "name": "Gunnersbury Underground Station"
      },
      {
        "id": "940GZZLUHSD",
        "name": "Hammersmith (Dist&Picc Line) Underground Station"
      },
      {
        "id": "940GZZLUHSK",
        "name": "High Street Kensington Underground Station"
      },
      {
        "id": "940GZZLUHCH",
        "name": "Hornchurch Underground Station"
      },
      {
        "id": "940GZZLUKOY",
        "name": "Kensington (Olympia) Underground Station"
      },
      {
        "id": "940GZZLUKWG",
        "name": "Kew Gardens Underground Station"
      },
      {
        "id": "940GZZLUMSH",
        "name": "Mansion House Underground Station"
      },
      {
        "id": "940GZZLUMED",
        "name": "Mile End Underground Station"
      },
      {
        "id": "940GZZLUMMT",
        "name": "Monument Underground Station"
      },
      {
        "id": "940GZZLUNHG",
        "name": "Notting Hill Gate Underground Station"
      },
      {
        "id": "940GZZLUPAC",
        "name": "Paddington Underground Station"
      },
      {
        "id": "940GZZLUPSG",
        "name": "Parsons Green Underground Station"
      },
      {
        "id": "940GZZLUPLW",
        "name": "Plaistow Underground Station"
      },
      {
        "id": "940GZZLUPYB",
        "name": "Putney Bridge Underground Station"
      },
      {
        "id": "940GZZLURVP",
        "name": "Ravenscourt Park Underground Station"
      },
      {
        "id": "940GZZLURMD",
        "name": "Richmond Underground Station"
      },
      {
        "id": "940GZZLUSSQ",
        "name": "Sloane Square Underground Station"
      },
      {
        "id": "940GZZLUSKS",
        "name": "South Kensington Underground Station"
      },
      {
        "id": "940GZZLUSFS",
        "name": "Southfields Underground Station"
      },
      {
        "id": "940GZZLUSJP",
        "name": "St. James's Park Underground Station"
      },
      {
        "id": "940GZZLUSFB",
        "name": "Stamford Brook Underground Station"
      },
      {
        "id": "940GZZLUSGN",
        "name": "Stepney Green Underground Station"
      },
      {
        "id": "940GZZLUTMP",
        "name": "Temple Underground Station"
      },
      {
        "id": "940GZZLUTWH",
        "name": "Tower Hill Underground Station"
      },
      {
        "id": "940GZZLUTNG",
        "name": "Turnham Green Underground Station"
      },
      {
        "id": "940GZZLUUPB",
        "name": "Upminster Bridge Underground Station"
      },
      {
        "id": "940GZZLUUPM",
        "name": "Upminster Underground Station"
      },
      {
        "id": "940GZZLUUPY",
        "name": "Upney Underground Station"
      },
      {
        "id": "940GZZLUUPK",
        "name": "Upton Park Underground Station"
      },
      {
        "id": "940GZZLUVIC",
        "name": "Victoria Underground Station"
      },
      {
        "id": "940GZZLUWBN",
        "name": "West Brompton Underground Station"
      },
      {
        "id": "940GZZLUWHM",
        "name": "West Ham Underground Station"
      },
      {
        "id": "940GZZLUWKN",
        "name": "West Kensington Underground Station"
      },
      {
        "id": "940GZZLUWSM",
        "name": "Westminster Underground Station"
      },
      {
        "id": "940GZZLUWPL",
        "name": "Whitechapel Underground Station"
      },
      {
        "id": "940GZZLUWIP",
        "name": "Wimbledon Park Underground Station"
      },
      {
        "id": "940GZZLUWIM",
        "name": "Wimbledon Underground Station"
      }
    ],
    "branches": [
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3,
          4
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUUPM",
          "940GZZLUUPB",
          "940GZZLUHCH",
          "940GZZLUEPK",
          "940GZZLUDGE",
          "940GZZLUDGY",
          "940GZZLUBEC",
          "940GZZLUUPY",
          "940GZZLUBKG",
          "940GZZLUEHM",
          "940GZZLUUPK",
          "940GZZLUPLW",
          "940GZZLUWHM",
          "940GZZLUBBB",
          "940GZZLUBWR",
          "940GZZLUMED",
          "940GZZLUSGN",
          "940GZZLUWPL",
          "940GZZLUADE",
          "940GZZLUTWH",
          "940GZZLUMMT",
          "940GZZLUCST",
          "940GZZLUMSH",
          "940GZZLUBKF",
          "940GZZLUTMP",
          "940GZZLUEMB",
          "940GZZLUWSM",
          "940GZZLUSJP",
          "940GZZLUVIC",
          "940GZZLUSSQ",
          "940GZZLUSKS",
          "940GZZLUGTR",
          "940GZZLUECT"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5,
          6
        ],
        "previousBranchIds": [
          1,
          0
        ],
        "stationIds": [
          "940GZZLUECT",
          "940GZZLUWKN",
          "940GZZLUBSC",
          "940GZZLUHSD",
          "940GZZLURVP",
          "940GZZLUSFB",
          "940GZZLUTNG"
        ]
      },
      {
        "id": 6,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          3
        ],
        "stationIds": [
          "940GZZLUTNG",
          "940GZZLUCWP",
          "940GZZLUACT",
          "940GZZLUECM",
          "940GZZLUEBY"
        ]
      },
      {
        "id": 5,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          3
        ],
        "stationIds": [
          "940GZZLUTNG",
          "940GZZLUGBY",
          "940GZZLUKWG",
          "940GZZLURMD"
        ]
      },
      {
        "id": 4,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          1,
          0
        ],
        "stationIds": [
          "940GZZLUECT",
          "940GZZLUWBN",
          "940GZZLUFBY",
          "940GZZLUPSG",
          "940GZZLUPYB",
          "940GZZLUEPY",
          "940GZZLUSFS",
          "940GZZLUWIP",
          "940GZZLUWIM"
        ]
      },
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3,
          4,
          2
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUERC",
          "940GZZLUPAC",
          "940GZZLUBWT",
          "940GZZLUNHG",
          "940GZZLUHSK",
          "940GZZLUECT"
        ]
      },
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          0
        ],
        "stationIds": [
          "940GZZLUECT",
          "940GZZLUKOY"
        ]
      },
      {
        "id": 10,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          13
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUEBY",
          "940GZZLUECM",
          "940GZZLUACT",
          "940GZZLUCWP",
          "940GZZLUTNG"
        ]
      },
      {
        "id": 13,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11,
          12
        ],
        "previousBranchIds": [
          10,
          8
        ],
        "stationIds": [
          "940GZZLUTNG",
          "940GZZLUSFB",
          "940GZZLURVP",
          "940GZZLUHSD",
          "940GZZLUBSC",
          "940GZZLUWKN",
          "940GZZLUECT"
        ]
      },
      {
        "id": 12,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          13,
          9
        ],
        "stationIds": [
          "940GZZLUECT",
          "940GZZLUGTR",
          "940GZZLUSKS",
          "940GZZLUSSQ",
          "940GZZLUVIC",
          "940GZZLUSJP",
          "940GZZLUWSM",
          "940GZZLUEMB",
          "940GZZLUTMP",
          "940GZZLUBKF",
          "940GZZLUMSH",
          "940GZZLUCST",
          "940GZZLUMMT",
          "940GZZLUTWH",
          "940GZZLUADE",
          "940GZZLUWPL",
          "940GZZLUSGN",
          "940GZZLUMED",
          "940GZZLUBWR",
          "940GZZLUBBB",
          "940GZZLUWHM",
          "940GZZLUPLW",
          "940GZZLUUPK",
          "940GZZLUEHM",
          "940GZZLUBKG",
          "940GZZLUUPY",
          "940GZZLUBEC",
          "940GZZLUDGY",
          "940GZZLUDGE",
          "940GZZLUEPK",
          "940GZZLUHCH",
          "940GZZLUUPB",
          "940GZZLUUPM"
        ]
      },
      {
        "id": 8,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          13
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLURMD",
          "940GZZLUKWG",
          "940GZZLUGBY",
          "940GZZLUTNG"
        ]
      },
      {
        "id": 9,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11,
          12
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUWIM",
          "940GZZLUWIP",
          "940GZZLUSFS",
          "940GZZLUEPY",
          "940GZZLUPYB",
          "940GZZLUPSG",
          "940GZZLUFBY",
          "940GZZLUWBN",
          "940GZZLUECT"
        ]
      },
      {
        "id": 11,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          13,
          9,
          7
        ],
        "stationIds": [
          "940GZZLUECT",
          "940GZZLUHSK",
          "940GZZLUNHG",
          "940GZZLUBWT",
          "940GZZLUPAC",
          "940GZZLUERC"
        ]
      },
      {
        "id": 7,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUKOY",
          "940GZZLUECT"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Edgware Road (Circle Line)  &harr;  Kensington (Olympia) ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUERC",
          "940GZZLUPAC",
          "940GZZLUBWT",
          "940GZZLUNHG",
          "940GZZLUHSK",
          "940GZZLUECT",
          "940GZZLUKOY"
        ]
      },
      {
        "name": "Edgware Road (Circle Line)  &harr;  Wimbledon ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUERC",
          "940GZZLUPAC",
          "940GZZLUBWT",
          "940GZZLUNHG",
          "940GZZLUHSK",
          "940GZZLUECT",
          "940GZZLUWBN",
          "940GZZLUFBY",
          "940GZZLUPSG",
          "940GZZLUPYB",
          "940GZZLUEPY",
          "940GZZLUSFS",
          "940GZZLUWIP",
          "940GZZLUWIM"
        ]
      },
      {
        "name": "Edgware Road (Circle Line)  &harr;  Ealing Broadway ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUERC",
          "940GZZLUPAC",
          "940GZZLUBWT",
          "940GZZLUNHG",
          "940GZZLUHSK",
          "940GZZLUECT",
          "940GZZLUWKN",
          "940GZZLUBSC",
          "940GZZLUHSD",
          "940GZZLURVP",
          "940GZZLUSFB",
          "940GZZLUTNG",
          "940GZZLUCWP",
          "940GZZLUACT",
          "940GZZLUECM",
          "940GZZLUEBY"
        ]
      },
      {
        "name": "Edgware Road (Circle Line)  &harr;  Richmond ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUERC",
          "940GZZLUPAC",
          "940GZZLUBWT",
          "940GZZLUNHG",
          "940GZZLUHSK",
          "940GZZLUECT",
          "940GZZLUWKN",
          "940GZZLUBSC",
          "940GZZLUHSD",
          "940GZZLURVP",
          "940GZZLUSFB",
          "940GZZLUTNG",
          "940GZZLUGBY",
          "940GZZLUKWG",
          "940GZZLURMD"
        ]
      },
      {
        "name": "Upminster  &harr;  Wimbledon ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUUPM",
          "940GZZLUUPB",
          "940GZZLUHCH",
          "940GZZLUEPK",
          "940GZZLUDGE",
          "940GZZLUDGY",
          "940GZZLUBEC",
          "940GZZLUUPY",
          "940GZZLUBKG",
          "940GZZLUEHM",
          "940GZZLUUPK",
          "940GZZLUPLW",
          "940GZZLUWHM",
          "940GZZLUBBB",
          "940GZZLUBWR",
          "940GZZLUMED",
          "940GZZLUSGN",
          "940GZZLUWPL",
          "940GZZLUADE",
          "940GZZLUTWH",
          "940GZZLUMMT",
          "940GZZLUCST",
          "940GZZLUMSH",
          "940GZZLUBKF",
          "940GZZLUTMP",
          "940GZZLUEMB",
          "940GZZLUWSM",
          "940GZZLUSJP",
          "940GZZLUVIC",
          "940GZZLUSSQ",
          "940GZZLUSKS",
          "940GZZLUGTR",
          "940GZZLUECT",
          "940GZZLUWBN",
          "940GZZLUFBY",
          "940GZZLUPSG",
          "940GZZLUPYB",
          "940GZZLUEPY",
          "940GZZLUSFS",
          "940GZZLUWIP",
          "940GZZLUWIM"
        ]
      },
      {
        "name": "Upminster  &harr;  Ealing Broadway ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUUPM",
          "940GZZLUUPB",
          "940GZZLUHCH",
          "940GZZLUEPK",
          "940GZZLUDGE",
          "940GZZLUDGY",
          "940GZZLUBEC",
          "940GZZLUUPY",
          "940GZZLUBKG",
          "940GZZLUEHM",
          "940GZZLUUPK",
          "940GZZLUPLW",
          "940GZZLUWHM",
          "940GZZLUBBB",
          "940GZZLUBWR",
          "940GZZLUMED",
          "940GZZLUSGN",
          "940GZZLUWPL",
          "940GZZLUADE",
          "940GZZLUTWH",
          "940GZZLUMMT",
          "940GZZLUCST",
          "940GZZLUMSH",
          "940GZZLUBKF",
          "940GZZLUTMP",
          "940GZZLUEMB",
          "940GZZLUWSM",
          "940GZZLUSJP",
          "940GZZLUVIC",
          "940GZZLUSSQ",
          "940GZZLUSKS",
          "940GZZLUGTR",
          "940GZZLUECT",
          "940GZZLUWKN",
          "940GZZLUBSC",
          "940GZZLUHSD",
          "940GZZLURVP",
          "940GZZLUSFB",
          "940GZZLUTNG",
          "940GZZLUCWP",
          "940GZZLUACT",
          "940GZZLUECM",
          "940GZZLUEBY"
        ]
      },
      {
        "name": "Upminster  &harr;  Richmond ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUUPM",
          "940GZZLUUPB",
          "940GZZLUHCH",
          "940GZZLUEPK",
          "940GZZLUDGE",
          "940GZZLUDGY",
          "940GZZLUBEC",
          "940GZZLUUPY",
          "940GZZLUBKG",
          "940GZZLUEHM",
          "940GZZLUUPK",
          "940GZZLUPLW",
          "940GZZLUWHM",
          "940GZZLUBBB",
          "940GZZLUBWR",
          "940GZZLUMED",
          "940GZZLUSGN",
          "940GZZLUWPL",
          "940GZZLUADE",
          "940GZZLUTWH",
          "940GZZLUMMT",
          "940GZZLUCST",
          "940GZZLUMSH",
          "940GZZLUBKF",
          "940GZZLUTMP",
          "940GZZLUEMB",
          "940GZZLUWSM",
          "940GZZLUSJP",
          "940GZZLUVIC",
          "940GZZLUSSQ",
          "940GZZLUSKS",
          "940GZZLUGTR",
          "940GZZLUECT",
          "940GZZLUWKN",
          "940GZZLUBSC",
          "940GZZLUHSD",
          "940GZZLURVP",
          "940GZZLUSFB",
          "940GZZLUTNG",
          "940GZZLUGBY",
          "940GZZLUKWG",
          "940GZZLURMD"
        ]
      },
      {
        "name": "Ealing Broadway  &harr;  Upminster ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUEBY",
          "940GZZLUECM",
          "940GZZLUACT",
          "940GZZLUCWP",
          "940GZZLUTNG",
          "940GZZLUSFB",
          "940GZZLURVP",
          "940GZZLUHSD",
          "940GZZLUBSC",
          "940GZZLUWKN",
          "940GZZLUECT",
          "940GZZLUGTR",
          "940GZZLUSKS",
          "940GZZLUSSQ",
          "940GZZLUVIC",
          "940GZZLUSJP",
          "940GZZLUWSM",
          "940GZZLUEMB",
          "940GZZLUTMP",
          "940GZZLUBKF",
          "940GZZLUMSH",
          "940GZZLUCST",
          "940GZZLUMMT",
          "940GZZLUTWH",
          "940GZZLUADE",
          "940GZZLUWPL",
          "940GZZLUSGN",
          "940GZZLUMED",
          "940GZZLUBWR",
          "940GZZLUBBB",
          "940GZZLUWHM",
          "940GZZLUPLW",
          "940GZZLUUPK",
          "940GZZLUEHM",
          "940GZZLUBKG",
          "940GZZLUUPY",
          "940GZZLUBEC",
          "940GZZLUDGY",
          "940GZZLUDGE",
          "940GZZLUEPK",
          "940GZZLUHCH",
          "940GZZLUUPB",
          "940GZZLUUPM"
        ]
      },
      {
        "name": "Ealing Broadway  &harr;  Edgware Road (Circle Line) ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUEBY",
          "940GZZLUECM",
          "940GZZLUACT",
          "940GZZLUCWP",
          "940GZZLUTNG",
          "940GZZLUSFB",
          "940GZZLURVP",
          "940GZZLUHSD",
          "940GZZLUBSC",
          "940GZZLUWKN",
          "940GZZLUECT",
          "940GZZLUHSK",
          "940GZZLUNHG",
          "940GZZLUBWT",
          "940GZZLUPAC",
          "940GZZLUERC"
        ]
      },
      {
        "name": "Kensington (Olympia)  &harr;  Edgware Road (Circle Line) ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUKOY",
          "940GZZLUECT",
          "940GZZLUHSK",
          "940GZZLUNHG",
          "940GZZLUBWT",
          "940GZZLUPAC",
          "940GZZLUERC"
        ]
      },
      {
        "name": "Richmond  &harr;  Upminster ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLURMD",
          "940GZZLUKWG",
          "940GZZLUGBY",
          "940GZZLUTNG",
          "940GZZLUSFB",
          "940GZZLURVP",
          "940GZZLUHSD",
          "940GZZLUBSC",
          "940GZZLUWKN",
          "940GZZLUECT",
          "940GZZLUGTR",
          "940GZZLUSKS",
          "940GZZLUSSQ",
          "940GZZLUVIC",
          "940GZZLUSJP",
          "940GZZLUWSM",
          "940GZZLUEMB",
          "940GZZLUTMP",
          "940GZZLUBKF",
          "940GZZLUMSH",
          "940GZZLUCST",
          "940GZZLUMMT",
          "940GZZLUTWH",
          "940GZZLUADE",
          "940GZZLUWPL",
          "940GZZLUSGN",
          "940GZZLUMED",
          "940GZZLUBWR",
          "940GZZLUBBB",
          "940GZZLUWHM",
          "940GZZLUPLW",
          "940GZZLUUPK",
          "940GZZLUEHM",
          "940GZZLUBKG",
          "940GZZLUUPY",
          "940GZZLUBEC",
          "940GZZLUDGY",
          "940GZZLUDGE",
          "940GZZLUEPK",
          "940GZZLUHCH",
          "940GZZLUUPB",
          "940GZZLUUPM"
        ]
      },
      {
        "name": "Richmond  &harr;  Edgware Road (Circle Line) ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLURMD",
          "940GZZLUKWG",
          "940GZZLUGBY",
          "940GZZLUTNG",
          "940GZZLUSFB",
          "940GZZLURVP",
          "940GZZLUHSD",
          "940GZZLUBSC",
          "940GZZLUWKN",
          "940GZZLUECT",
          "940GZZLUHSK",
          "940GZZLUNHG",
          "940GZZLUBWT",
          "940GZZLUPAC",
          "940GZZLUERC"
        ]
      },
      {
        "name": "Wimbledon  &harr;  Upminster ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUWIM",
          "940GZZLUWIP",
          "940GZZLUSFS",
          "940GZZLUEPY",
          "940GZZLUPYB",
          "940GZZLUPSG",
          "940GZZLUFBY",
          "940GZZLUWBN",
          "940GZZLUECT",
          "940GZZLUGTR",
          "940GZZLUSKS",
          "940GZZLUSSQ",
          "940GZZLUVIC",
          "940GZZLUSJP",
          "940GZZLUWSM",
          "940GZZLUEMB",
          "940GZZLUTMP",
          "940GZZLUBKF",
          "940GZZLUMSH",
          "940GZZLUCST",
          "940GZZLUMMT",
          "940GZZLUTWH",
          "940GZZLUADE",
          "940GZZLUWPL",
          "940GZZLUSGN",
          "940GZZLUMED",
          "940GZZLUBWR",
          "940GZZLUBBB",
          "940GZZLUWHM",
          "940GZZLUPLW",
          "940GZZLUUPK",
          "940GZZLUEHM",
          "940GZZLUBKG",
          "940GZZLUUPY",
          "940GZZLUBEC",
          "940GZZLUDGY",
          "940GZZLUDGE",
          "940GZZLUEPK",
          "940GZZLUHCH",
          "940GZZLUUPB",
          "940GZZLUUPM"
        ]
      },
      {
        "name": "Wimbledon  &harr;  Edgware Road (Circle Line) ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUWIM",
          "940GZZLUWIP",
          "940GZZLUSFS",
          "940GZZLUEPY",
          "940GZZLUPYB",
          "940GZZLUPSG",
          "940GZZLUFBY",
          "940GZZLUWBN",
          "940GZZLUECT",
          "940GZZLUHSK",
          "940GZZLUNHG",
          "940GZZLUBWT",
          "940GZZLUPAC",
          "940GZZLUERC"
        ]
      }
    ]
  },
  "dlr": {
    "lineId": "dlr",
    "lineName": "DLR",
    "modeName": "dlr",
    "stations": [
      {
        "id": "940GZZDLABR",
        "name": "Abbey Road DLR Station"
      },
      {
        "id": "940GZZDLALL",
        "name": "All Saints DLR Station"
      },
      {
        "id": "940GZZDLBNK",
        "name": "Bank DLR Station"
      },
      {
        "id": "940GZZDLBEC",
        "name": "Beckton DLR Station"
      },
      {
        "id": "940GZZDLBPK",
        "name": "Beckton Park DLR Station"
      },
      {
        "id": "940GZZDLBLA",
        "name": "Blackwall DLR Station"
      },
      {
        "id": "940GZZDLBOW",
        "name": "Bow Church DLR Station"
      },
      {
        "id": "940GZZDLCAN",
        "name": "Canary Wharf DLR Station"
      },
      {
        "id": "940GZZDLCGT",
        "name": "Canning Town DLR Station"
      },
      {
        "id": "940GZZDLCLA",
        "name": "Crossharbour DLR Station"
      },
      {
        "id": "940GZZDLCUS",
        "name": "Custom House (for ExCel) DLR Station"
      },
      {
        "id": "940GZZDLCUT",
        "name": "Cutty Sark (for Maritime Greenwich) DLR Station"
      },
      {
        "id": "940GZZDLCYP",
        "name": "Cyprus DLR Station"
      },
      {
        "id": "940GZZDLDEP",
        "name": "Deptford Bridge DLR Station"
      },
      {
        "id": "940GZZDLDEV",
        "name": "Devons Road DLR Station"
      },
      {
        "id": "940GZZDLEIN",
        "name": "East India DLR Station"
      },
      {
        "id": "940GZZDLELV",
        "name": "Elverson Road DLR Station"
      },
      {
        "id": "940GZZDLGAL",
        "name": "Gallions Reach DLR Station"
      },
      {
        "id": "940GZZDLGRE",
        "name": "Greenwich DLR Station"
      },
      {
        "id": "940GZZDLHEQ",
        "name": "Heron Quays DLR Station"
      },
      {
        "id": "940GZZDLISL",
        "name": "Island Gardens DLR Station"
      },
      {
        "id": "940GZZDLKGV",
        "name": "King George V DLR Station"
      },
      {
        "id": "940GZZDLLDP",
        "name": "Langdon Park DLR Station"
      },
      {
        "id": "940GZZDLLEW",
        "name": "Lewisham DLR Station"
      },
      {
        "id": "940GZZDLLIM",
        "name": "Limehouse DLR Station"
      },
      {
        "id": "940GZZDLLCA",
        "name": "London City Airport DLR Station"
      },
      {
        "id": "940GZZDLMUD",
        "name": "Mudchute DLR Station"
      },
      {
        "id": "940GZZDLPDK",
        "name": "Pontoon Dock DLR Station"
      },
      {
        "id": "940GZZDLPOP",
        "name": "Poplar DLR Station"
      },
      {
        "id": "940GZZDLPRE",
        "name": "Prince Regent DLR Station"
      },
      {
        "id": "940GZZDLPUD",
        "name": "Pudding Mill Lane DLR Station"
      },
      {
        "id": "940GZZDLRAL",
        "name": "Royal Albert DLR Station"
      },
      {
        "id": "940GZZDLRVC",
        "name": "Royal Victoria DLR Station"
      },
      {
        "id": "940GZZDLSHA",
        "name": "Shadwell DLR Station"
      },
      {
        "id": "940GZZDLSOQ",
        "name": "South Quay DLR Station"
      },
      {
        "id": "940GZZDLSTL",
        "name": "Star Lane DLR Station"
      },
      {
        "id": "940GZZDLSTD",
        "name": "Stratford DLR Station"
      },
      {
        "id": "940GZZDLSHS",
        "name": "Stratford High Street DLR Station"
      },
      {
        "id": "940GZZDLSIT",
        "name": "Stratford International DLR Station"
      },
      {
        "id": "940GZZDLTWG",
        "name": "Tower Gateway DLR Station"
      },
      {
        "id": "940GZZDLWHM",
        "name": "West Ham DLR Station"
      },
      {
        "id": "940GZZDLWIQ",
        "name": "West India Quay DLR Station"
      },
      {
        "id": "940GZZDLWSV",
        "name": "West Silvertown DLR Station"
      },
      {
        "id": "940GZZDLWFE",
        "name": "Westferry DLR Station"
      },
      {
        "id": "940GZZDLWLA",
        "name": "Woolwich Arsenal DLR Station"
      }
    ],
    "branches": [
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3,
          4
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZDLLEW",
          "940GZZDLELV",
          "940GZZDLDEP",
          "940GZZDLGRE",
          "940GZZDLCUT",
          "940GZZDLISL",
          "940GZZDLMUD",
          "940GZZDLCLA",
          "940GZZDLSOQ",
          "940GZZDLHEQ",
          "940GZZDLCAN",
          "940GZZDLWIQ"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5
        ],
        "previousBranchIds": [
          2
        ],
        "stationIds": [
          "940GZZDLWIQ",
          "940GZZDLPOP"
        ]
      },
      {
        "id": 5,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          3
        ],
        "stationIds": [
          "940GZZDLPOP",
          "940GZZDLALL",
          "940GZZDLLDP",
          "940GZZDLDEV",
          "940GZZDLBOW",
          "940GZZDLPUD",
          "940GZZDLSTD"
        ]
      },
      {
        "id": 4,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          12
        ],
        "previousBranchIds": [
          2
        ],
        "stationIds": [
          "940GZZDLWIQ",
          "940GZZDLWFE"
        ]
      },
      {
        "id": 12,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          9,
          10
        ],
        "previousBranchIds": [
          4,
          6
        ],
        "stationIds": [
          "940GZZDLWFE",
          "940GZZDLLIM",
          "940GZZDLSHA"
        ]
      },
      {
        "id": 9,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          12
        ],
        "stationIds": [
          "940GZZDLSHA",
          "940GZZDLBNK"
        ]
      },
      {
        "id": 10,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          12
        ],
        "stationIds": [
          "940GZZDLSHA",
          "940GZZDLTWG"
        ]
      },
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          8
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZDLBEC",
          "940GZZDLGAL",
          "940GZZDLCYP",
          "940GZZDLBPK",
          "940GZZDLRAL",
          "940GZZDLPRE",
          "940GZZDLCUS",
          "940GZZDLRVC",
          "940GZZDLCGT"
        ]
      },
      {
        "id": 8,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          6
        ],
        "previousBranchIds": [
          1,
          0
        ],
        "stationIds": [
          "940GZZDLCGT",
          "940GZZDLEIN",
          "940GZZDLBLA",
          "940GZZDLPOP"
        ]
      },
      {
        "id": 6,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          12
        ],
        "previousBranchIds": [
          8
        ],
        "stationIds": [
          "940GZZDLPOP",
          "940GZZDLWFE"
        ]
      },
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          8,
          7
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZDLWLA",
          "940GZZDLKGV",
          "940GZZDLLCA",
          "940GZZDLPDK",
          "940GZZDLWSV",
          "940GZZDLCGT"
        ]
      },
      {
        "id": 7,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11
        ],
        "previousBranchIds": [
          0
        ],
        "stationIds": [
          "940GZZDLCGT",
          "940GZZDLSTL",
          "940GZZDLWHM",
          "940GZZDLABR",
          "940GZZDLSHS",
          "940GZZDLSTD"
        ]
      },
      {
        "id": 11,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          7
        ],
        "stationIds": [
          "940GZZDLSTD",
          "940GZZDLSIT"
        ]
      },
      {
        "id": 16,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          25
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZDLTWG",
          "940GZZDLSHA"
        ]
      },
      {
        "id": 25,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          22,
          23
        ],
        "previousBranchIds": [
          16,
          15
        ],
        "stationIds": [
          "940GZZDLSHA",
          "940GZZDLLIM",
          "940GZZDLWFE"
        ]
      },
      {
        "id": 22,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          19
        ],
        "previousBranchIds": [
          25
        ],
        "stationIds": [
          "940GZZDLWFE",
          "940GZZDLPOP"
        ]
      },
      {
        "id": 19,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          20,
          21
        ],
        "previousBranchIds": [
          22
        ],
        "stationIds": [
          "940GZZDLPOP",
          "940GZZDLBLA",
          "940GZZDLEIN",
          "940GZZDLCGT"
        ]
      },
      {
        "id": 21,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          19
        ],
        "stationIds": [
          "940GZZDLCGT",
          "940GZZDLRVC",
          "940GZZDLCUS",
          "940GZZDLPRE",
          "940GZZDLRAL",
          "940GZZDLBPK",
          "940GZZDLCYP",
          "940GZZDLGAL",
          "940GZZDLBEC"
        ]
      },
      {
        "id": 23,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          24
        ],
        "previousBranchIds": [
          25
        ],
        "stationIds": [
          "940GZZDLWFE",
          "940GZZDLCAN"
        ]
      },
      {
        "id": 24,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          23
        ],
        "stationIds": [
          "940GZZDLCAN",
          "940GZZDLHEQ",
          "940GZZDLSOQ",
          "940GZZDLCLA",
          "940GZZDLMUD",
          "940GZZDLISL",
          "940GZZDLCUT",
          "940GZZDLGRE",
          "940GZZDLDEP",
          "940GZZDLELV",
          "940GZZDLLEW"
        ]
      },
      {
        "id": 15,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          25
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZDLBNK",
          "940GZZDLSHA"
        ]
      },
      {
        "id": 20,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          19,
          17
        ],
        "stationIds": [
          "940GZZDLCGT",
          "940GZZDLWSV",
          "940GZZDLPDK",
          "940GZZDLLCA",
          "940GZZDLKGV",
          "940GZZDLWLA"
        ]
      },
      {
        "id": 14,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          17
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZDLSIT",
          "940GZZDLSTD"
        ]
      },
      {
        "id": 17,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          20
        ],
        "previousBranchIds": [
          14
        ],
        "stationIds": [
          "940GZZDLSTD",
          "940GZZDLSHS",
          "940GZZDLABR",
          "940GZZDLWHM",
          "940GZZDLSTL",
          "940GZZDLCGT"
        ]
      },
      {
        "id": 13,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          18
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZDLSTD",
          "940GZZDLPUD",
          "940GZZDLBOW",
          "940GZZDLDEV",
          "940GZZDLLDP",
          "940GZZDLALL",
          "940GZZDLPOP"
        ]
      },
      {
        "id": 18,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          13
        ],
        "stationIds": [
          "940GZZDLPOP",
          "940GZZDLWIQ",
          "940GZZDLCAN"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Beckton  &harr;  Tower Gateway ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZDLBEC",
          "940GZZDLGAL",
          "940GZZDLCYP",
          "940GZZDLBPK",
          "940GZZDLRAL",
          "940GZZDLPRE",
          "940GZZDLCUS",
          "940GZZDLRVC",
          "940GZZDLCGT",
          "940GZZDLEIN",
          "940GZZDLBLA",
          "940GZZDLPOP",
          "940GZZDLWFE",
          "940GZZDLLIM",
          "940GZZDLSHA",
          "940GZZDLTWG"
        ]
      },
      {
        "name": "Lewisham  &harr;  Stratford ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZDLLEW",
          "940GZZDLELV",
          "940GZZDLDEP",
          "940GZZDLGRE",
          "940GZZDLCUT",
          "940GZZDLISL",
          "940GZZDLMUD",
          "940GZZDLCLA",
          "940GZZDLSOQ",
          "940GZZDLHEQ",
          "940GZZDLCAN",
          "940GZZDLWIQ",
          "940GZZDLPOP",
          "940GZZDLALL",
          "940GZZDLLDP",
          "940GZZDLDEV",
          "940GZZDLBOW",
          "940GZZDLPUD",
          "940GZZDLSTD"
        ]
      },
      {
        "name": "Lewisham  &harr;  Bank ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZDLLEW",
          "940GZZDLELV",
          "940GZZDLDEP",
          "940GZZDLGRE",
          "940GZZDLCUT",
          "940GZZDLISL",
          "940GZZDLMUD",
          "940GZZDLCLA",
          "940GZZDLSOQ",
          "940GZZDLHEQ",
          "940GZZDLCAN",
          "940GZZDLWIQ",
          "940GZZDLWFE",
          "940GZZDLLIM",
          "940GZZDLSHA",
          "940GZZDLBNK"
        ]
      },
      {
        "name": "Woolwich Arsenal  &harr;  Bank ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZDLWLA",
          "940GZZDLKGV",
          "940GZZDLLCA",
          "940GZZDLPDK",
          "940GZZDLWSV",
          "940GZZDLCGT",
          "940GZZDLEIN",
          "940GZZDLBLA",
          "940GZZDLPOP",
          "940GZZDLWFE",
          "940GZZDLLIM",
          "940GZZDLSHA",
          "940GZZDLBNK"
        ]
      },
      {
        "name": "Woolwich Arsenal  &harr;  Stratford International ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZDLWLA",
          "940GZZDLKGV",
          "940GZZDLLCA",
          "940GZZDLPDK",
          "940GZZDLWSV",
          "940GZZDLCGT",
          "940GZZDLSTL",
          "940GZZDLWHM",
          "940GZZDLABR",
          "940GZZDLSHS",
          "940GZZDLSTD",
          "940GZZDLSIT"
        ]
      },
      {
        "name": "Bank  &harr;  Lewisham ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZDLBNK",
          "940GZZDLSHA",
          "940GZZDLLIM",
          "940GZZDLWFE",
          "940GZZDLCAN",
          "940GZZDLHEQ",
          "940GZZDLSOQ",
          "940GZZDLCLA",
          "940GZZDLMUD",
          "940GZZDLISL",
          "940GZZDLCUT",
          "940GZZDLGRE",
          "940GZZDLDEP",
          "940GZZDLELV",
          "940GZZDLLEW"
        ]
      },
      {
        "name": "Bank  &harr;  Woolwich Arsenal ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZDLBNK",
          "940GZZDLSHA",
          "940GZZDLLIM",
          "940GZZDLWFE",
          "940GZZDLPOP",
          "940GZZDLBLA",
          "940GZZDLEIN",
          "940GZZDLCGT",
          "940GZZDLWSV",
          "940GZZDLPDK",
          "940GZZDLLCA",
          "940GZZDLKGV",
          "940GZZDLWLA"
        ]
      },
      {
        "name": "Stratford  &harr;  Canary Wharf ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZDLSTD",
          "940GZZDLPUD",
          "940GZZDLBOW",
          "940GZZDLDEV",
          "940GZZDLLDP",
          "940GZZDLALL",
          "940GZZDLPOP",
          "940GZZDLWIQ",
          "940GZZDLCAN"
        ]
      },
      {
        "name": "Stratford International  &harr;  Woolwich Arsenal ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZDLSIT",
          "940GZZDLSTD",
          "940GZZDLSHS",
          "940GZZDLABR",
          "940GZZDLWHM",
          "940GZZDLSTL",
          "940GZZDLCGT",
          "940GZZDLWSV",
          "940GZZDLPDK",
          "940GZZDLLCA",
          "940GZZDLKGV",
          "940GZZDLWLA"
        ]
      },
      {
        "name": "Tower Gateway  &harr;  Beckton ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZDLTWG",
          "940GZZDLSHA",
          "940GZZDLLIM",
          "940GZZDLWFE",
          "940GZZDLPOP",
          "940GZZDLBLA",
          "940GZZDLEIN",
          "940GZZDLCGT",
          "940GZZDLRVC",
          "940GZZDLCUS",
          "940GZZDLPRE",
          "940GZZDLRAL",
          "940GZZDLBPK",
          "940GZZDLCYP",
          "940GZZDLGAL",
          "940GZZDLBEC"
        ]
      }
    ]
  },
  "elizabeth": {
    "lineId": "elizabeth",
    "lineName": "Elizabeth line",
    "modeName": "elizabeth-line",
    "stations": [
      {
        "id": "910GABWDXR",
        "name": "Abbey Wood"
      },
      {
        "id": "910GACTONML",
        "name": "Acton Main Line Rail Station"
      },
      {
        "id": "910GBONDST",
        "name": "Bond Street"
      },
      {
        "id": "910GBRTWOOD",
        "name": "Brentwood Rail Station"
      },
      {
        "id": "910GBNHAM",
        "name": "Burnham (Berks) Rail Station"
      },
      {
        "id": "910GCANWHRF",
        "name": "Canary Wharf"
      },
      {
        "id": "910GCHDWLHT",
        "name": "Chadwell Heath Rail Station"
      },
      {
        "id": "910GCUSTMHS",
        "name": "Custom House Rail Station"
      },
      {
        "id": "910GEALINGB",
        "name": "Ealing Broadway Rail Station"
      },
      {
        "id": "910GFRNDXR",
        "name": "Farringdon"
      },
      {
        "id": "910GFRSTGT",
        "name": "Forest Gate Rail Station"
      },
      {
        "id": "910GGIDEAPK",
        "name": "Gidea Park Rail Station"
      },
      {
        "id": "910GGODMAYS",
        "name": "Goodmayes Rail Station"
      },
      {
        "id": "910GHANWELL",
        "name": "Hanwell Rail Station"
      },
      {
        "id": "910GHRLDWOD",
        "name": "Harold Wood Rail Station"
      },
      {
        "id": "910GHAYESAH",
        "name": "Hayes & Harlington Rail Station"
      },
      {
        "id": "910GHTRWTM4",
        "name": "Heathrow Terminal 4 Rail Station"
      },
      {
        "id": "910GHTRWTM5",
        "name": "Heathrow Terminal 5 Rail Station"
      },
      {
        "id": "910GHTRWAPT",
        "name": "Heathrow Terminals 2 & 3 Rail Station"
      },
      {
        "id": "910GILFORD",
        "name": "Ilford Rail Station"
      },
      {
        "id": "910GIVER",
        "name": "Iver Rail Station"
      },
      {
        "id": "910GLANGLEY",
        "name": "Langley (Berks) Rail Station"
      },
      {
        "id": "910GLIVSTLL",
        "name": "Liverpool Street"
      },
      {
        "id": "910GLIVST",
        "name": "London Liverpool Street Rail Station"
      },
      {
        "id": "910GPADTON",
        "name": "London Paddington Rail Station"
      },
      {
        "id": "910GMDNHEAD",
        "name": "Maidenhead Rail Station"
      },
      {
        "id": "910GMANRPK",
        "name": "Manor Park Rail Station"
      },
      {
        "id": "910GMRYLAND",
        "name": "Maryland Rail Station"
      },
      {
        "id": "910GPADTLL",
        "name": "Paddington"
      },
      {
        "id": "910GRDNGSTN",
        "name": "Reading Rail Station"
      },
      {
        "id": "910GROMFORD",
        "name": "Romford Rail Station"
      },
      {
        "id": "910GSVNKNGS",
        "name": "Seven Kings Rail Station"
      },
      {
        "id": "910GSHENFLD",
        "name": "Shenfield Rail Station"
      },
      {
        "id": "910GSLOUGH",
        "name": "Slough Rail Station"
      },
      {
        "id": "910GSTHALL",
        "name": "Southall Rail Station"
      },
      {
        "id": "910GSTFD",
        "name": "Stratford (London) Rail Station"
      },
      {
        "id": "910GTAPLOW",
        "name": "Taplow Rail Station"
      },
      {
        "id": "910GTOTCTRD",
        "name": "Tottenham Court Road"
      },
      {
        "id": "910GTWYFORD",
        "name": "Twyford Rail Station"
      },
      {
        "id": "910GWDRYTON",
        "name": "West Drayton Rail Station"
      },
      {
        "id": "910GWEALING",
        "name": "West Ealing Rail Station"
      },
      {
        "id": "910GWCHAPXR",
        "name": "Whitechapel"
      },
      {
        "id": "910GWOLWXR",
        "name": "Woolwich"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          9
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GHTRWTM4",
          "910GHTRWAPT"
        ]
      },
      {
        "id": 9,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          10
        ],
        "previousBranchIds": [
          0,
          1
        ],
        "stationIds": [
          "910GHTRWAPT",
          "910GHAYESAH"
        ]
      },
      {
        "id": 10,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5,
          6
        ],
        "previousBranchIds": [
          9,
          3
        ],
        "stationIds": [
          "910GHAYESAH",
          "910GSTHALL",
          "910GHANWELL",
          "910GWEALING",
          "910GEALINGB",
          "910GACTONML"
        ]
      },
      {
        "id": 6,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          2
        ],
        "previousBranchIds": [
          10
        ],
        "stationIds": [
          "910GACTONML",
          "910GPADTLL"
        ]
      },
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          7,
          8
        ],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "910GPADTLL",
          "910GBONDST",
          "910GTOTCTRD",
          "910GFRNDXR",
          "910GLIVSTLL",
          "910GWCHAPXR"
        ]
      },
      {
        "id": 7,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11
        ],
        "previousBranchIds": [
          2
        ],
        "stationIds": [
          "910GWCHAPXR",
          "910GSTFD"
        ]
      },
      {
        "id": 11,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          7,
          4
        ],
        "stationIds": [
          "910GSTFD",
          "910GMRYLAND",
          "910GFRSTGT",
          "910GMANRPK",
          "910GILFORD",
          "910GSVNKNGS",
          "910GGODMAYS",
          "910GCHDWLHT",
          "910GROMFORD",
          "910GGIDEAPK",
          "910GHRLDWOD",
          "910GBRTWOOD",
          "910GSHENFLD"
        ]
      },
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          9
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GHTRWTM5",
          "910GHTRWAPT"
        ]
      },
      {
        "id": 8,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          2
        ],
        "stationIds": [
          "910GWCHAPXR",
          "910GCANWHRF",
          "910GCUSTMHS",
          "910GWOLWXR",
          "910GABWDXR"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          10
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GRDNGSTN",
          "910GTWYFORD",
          "910GMDNHEAD",
          "910GTAPLOW",
          "910GBNHAM",
          "910GSLOUGH",
          "910GLANGLEY",
          "910GIVER",
          "910GWDRYTON",
          "910GHAYESAH"
        ]
      },
      {
        "id": 5,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          10
        ],
        "stationIds": [
          "910GACTONML",
          "910GPADTON"
        ]
      },
      {
        "id": 4,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GLIVST",
          "910GSTFD"
        ]
      },
      {
        "id": 12,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          15,
          16
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GSHENFLD",
          "910GBRTWOOD",
          "910GHRLDWOD",
          "910GGIDEAPK",
          "910GROMFORD",
          "910GCHDWLHT",
          "910GGODMAYS",
          "910GSVNKNGS",
          "910GILFORD",
          "910GMANRPK",
          "910GFRSTGT",
          "910GMRYLAND",
          "910GSTFD"
        ]
      },
      {
        "id": 15,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          22
        ],
        "previousBranchIds": [
          12
        ],
        "stationIds": [
          "910GSTFD",
          "910GWCHAPXR"
        ]
      },
      {
        "id": 22,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          17
        ],
        "previousBranchIds": [
          15,
          14
        ],
        "stationIds": [
          "910GWCHAPXR",
          "910GLIVSTLL",
          "910GFRNDXR",
          "910GTOTCTRD",
          "910GBONDST",
          "910GPADTLL"
        ]
      },
      {
        "id": 17,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          23
        ],
        "previousBranchIds": [
          22
        ],
        "stationIds": [
          "910GPADTLL",
          "910GACTONML"
        ]
      },
      {
        "id": 23,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          18,
          19
        ],
        "previousBranchIds": [
          17,
          13
        ],
        "stationIds": [
          "910GACTONML",
          "910GEALINGB",
          "910GWEALING",
          "910GHANWELL",
          "910GSTHALL",
          "910GHAYESAH"
        ]
      },
      {
        "id": 18,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          20,
          21
        ],
        "previousBranchIds": [
          23
        ],
        "stationIds": [
          "910GHAYESAH",
          "910GHTRWAPT"
        ]
      },
      {
        "id": 20,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          18
        ],
        "stationIds": [
          "910GHTRWAPT",
          "910GHTRWTM4"
        ]
      },
      {
        "id": 21,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          18
        ],
        "stationIds": [
          "910GHTRWAPT",
          "910GHTRWTM5"
        ]
      },
      {
        "id": 19,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          23
        ],
        "stationIds": [
          "910GHAYESAH",
          "910GWDRYTON",
          "910GIVER",
          "910GLANGLEY",
          "910GSLOUGH",
          "910GBNHAM",
          "910GTAPLOW",
          "910GMDNHEAD",
          "910GTWYFORD",
          "910GRDNGSTN"
        ]
      },
      {
        "id": 14,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          22
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GABWDXR",
          "910GWOLWXR",
          "910GCUSTMHS",
          "910GCANWHRF",
          "910GWCHAPXR"
        ]
      },
      {
        "id": 13,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          23
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GPADTON",
          "910GACTONML"
        ]
      },
      {
        "id": 16,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          12
        ],
        "stationIds": [
          "910GSTFD",
          "910GLIVST"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Heathrow Terminal 4  &harr;  London Paddington ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GHTRWTM4",
          "910GHTRWAPT",
          "910GHAYESAH",
          "910GSTHALL",
          "910GHANWELL",
          "910GWEALING",
          "910GEALINGB",
          "910GACTONML",
          "910GPADTON"
        ]
      },
      {
        "name": "Heathrow Terminal 4  &harr;  Abbey Wood",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GHTRWTM4",
          "910GHTRWAPT",
          "910GHAYESAH",
          "910GSTHALL",
          "910GHANWELL",
          "910GWEALING",
          "910GEALINGB",
          "910GACTONML",
          "910GPADTLL",
          "910GBONDST",
          "910GTOTCTRD",
          "910GFRNDXR",
          "910GLIVSTLL",
          "910GWCHAPXR",
          "910GCANWHRF",
          "910GCUSTMHS",
          "910GWOLWXR",
          "910GABWDXR"
        ]
      },
      {
        "name": "Heathrow Terminal 4  &harr;  Shenfield ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GHTRWTM4",
          "910GHTRWAPT",
          "910GHAYESAH",
          "910GSTHALL",
          "910GHANWELL",
          "910GWEALING",
          "910GEALINGB",
          "910GACTONML",
          "910GPADTLL",
          "910GBONDST",
          "910GTOTCTRD",
          "910GFRNDXR",
          "910GLIVSTLL",
          "910GWCHAPXR",
          "910GSTFD",
          "910GMRYLAND",
          "910GFRSTGT",
          "910GMANRPK",
          "910GILFORD",
          "910GSVNKNGS",
          "910GGODMAYS",
          "910GCHDWLHT",
          "910GROMFORD",
          "910GGIDEAPK",
          "910GHRLDWOD",
          "910GBRTWOOD",
          "910GSHENFLD"
        ]
      },
      {
        "name": "Heathrow Terminal 5  &harr;  London Paddington ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GHTRWTM5",
          "910GHTRWAPT",
          "910GHAYESAH",
          "910GSTHALL",
          "910GHANWELL",
          "910GWEALING",
          "910GEALINGB",
          "910GACTONML",
          "910GPADTON"
        ]
      },
      {
        "name": "Heathrow Terminal 5  &harr;  Abbey Wood",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GHTRWTM5",
          "910GHTRWAPT",
          "910GHAYESAH",
          "910GSTHALL",
          "910GHANWELL",
          "910GWEALING",
          "910GEALINGB",
          "910GACTONML",
          "910GPADTLL",
          "910GBONDST",
          "910GTOTCTRD",
          "910GFRNDXR",
          "910GLIVSTLL",
          "910GWCHAPXR",
          "910GCANWHRF",
          "910GCUSTMHS",
          "910GWOLWXR",
          "910GABWDXR"
        ]
      },
      {
        "name": "Heathrow Terminal 5  &harr;  Shenfield ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GHTRWTM5",
          "910GHTRWAPT",
          "910GHAYESAH",
          "910GSTHALL",
          "910GHANWELL",
          "910GWEALING",
          "910GEALINGB",
          "910GACTONML",
          "910GPADTLL",
          "910GBONDST",
          "910GTOTCTRD",
          "910GFRNDXR",
          "910GLIVSTLL",
          "910GWCHAPXR",
          "910GSTFD",
          "910GMRYLAND",
          "910GFRSTGT",
          "910GMANRPK",
          "910GILFORD",
          "910GSVNKNGS",
          "910GGODMAYS",
          "910GCHDWLHT",
          "910GROMFORD",
          "910GGIDEAPK",
          "910GHRLDWOD",
          "910GBRTWOOD",
          "910GSHENFLD"
        ]
      },
      {
        "name": "London Liverpool Street  &harr;  Shenfield ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GLIVST",
          "910GSTFD",
          "910GMRYLAND",
          "910GFRSTGT",
          "910GMANRPK",
          "910GILFORD",
          "910GSVNKNGS",
          "910GGODMAYS",
          "910GCHDWLHT",
          "910GROMFORD",
          "910GGIDEAPK",
          "910GHRLDWOD",
          "910GBRTWOOD",
          "910GSHENFLD"
        ]
      },
      {
        "name": "Paddington &harr;  Shenfield ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GPADTLL",
          "910GBONDST",
          "910GTOTCTRD",
          "910GFRNDXR",
          "910GLIVSTLL",
          "910GWCHAPXR",
          "910GSTFD",
          "910GMRYLAND",
          "910GFRSTGT",
          "910GMANRPK",
          "910GILFORD",
          "910GSVNKNGS",
          "910GGODMAYS",
          "910GCHDWLHT",
          "910GROMFORD",
          "910GGIDEAPK",
          "910GHRLDWOD",
          "910GBRTWOOD",
          "910GSHENFLD"
        ]
      },
      {
        "name": "Reading  &harr;  London Paddington ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GRDNGSTN",
          "910GTWYFORD",
          "910GMDNHEAD",
          "910GTAPLOW",
          "910GBNHAM",
          "910GSLOUGH",
          "910GLANGLEY",
          "910GIVER",
          "910GWDRYTON",
          "910GHAYESAH",
          "910GSTHALL",
          "910GHANWELL",
          "910GWEALING",
          "910GEALINGB",
          "910GACTONML",
          "910GPADTON"
        ]
      },
      {
        "name": "Reading  &harr;  Abbey Wood",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GRDNGSTN",
          "910GTWYFORD",
          "910GMDNHEAD",
          "910GTAPLOW",
          "910GBNHAM",
          "910GSLOUGH",
          "910GLANGLEY",
          "910GIVER",
          "910GWDRYTON",
          "910GHAYESAH",
          "910GSTHALL",
          "910GHANWELL",
          "910GWEALING",
          "910GEALINGB",
          "910GACTONML",
          "910GPADTLL",
          "910GBONDST",
          "910GTOTCTRD",
          "910GFRNDXR",
          "910GLIVSTLL",
          "910GWCHAPXR",
          "910GCANWHRF",
          "910GCUSTMHS",
          "910GWOLWXR",
          "910GABWDXR"
        ]
      },
      {
        "name": "Abbey Wood &harr;  Heathrow Terminal 4 ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GABWDXR",
          "910GWOLWXR",
          "910GCUSTMHS",
          "910GCANWHRF",
          "910GWCHAPXR",
          "910GLIVSTLL",
          "910GFRNDXR",
          "910GTOTCTRD",
          "910GBONDST",
          "910GPADTLL",
          "910GACTONML",
          "910GEALINGB",
          "910GWEALING",
          "910GHANWELL",
          "910GSTHALL",
          "910GHAYESAH",
          "910GHTRWAPT",
          "910GHTRWTM4"
        ]
      },
      {
        "name": "Abbey Wood &harr;  Heathrow Terminal 5 ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GABWDXR",
          "910GWOLWXR",
          "910GCUSTMHS",
          "910GCANWHRF",
          "910GWCHAPXR",
          "910GLIVSTLL",
          "910GFRNDXR",
          "910GTOTCTRD",
          "910GBONDST",
          "910GPADTLL",
          "910GACTONML",
          "910GEALINGB",
          "910GWEALING",
          "910GHANWELL",
          "910GSTHALL",
          "910GHAYESAH",
          "910GHTRWAPT",
          "910GHTRWTM5"
        ]
      },
      {
        "name": "Abbey Wood &harr;  Reading ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GABWDXR",
          "910GWOLWXR",
          "910GCUSTMHS",
          "910GCANWHRF",
          "910GWCHAPXR",
          "910GLIVSTLL",
          "910GFRNDXR",
          "910GTOTCTRD",
          "910GBONDST",
          "910GPADTLL",
          "910GACTONML",
          "910GEALINGB",
          "910GWEALING",
          "910GHANWELL",
          "910GSTHALL",
          "910GHAYESAH",
          "910GWDRYTON",
          "910GIVER",
          "910GLANGLEY",
          "910GSLOUGH",
          "910GBNHAM",
          "910GTAPLOW",
          "910GMDNHEAD",
          "910GTWYFORD",
          "910GRDNGSTN"
        ]
      },
      {
        "name": "London Paddington  &harr;  Heathrow Terminal 4 ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GPADTON",
          "910GACTONML",
          "910GEALINGB",
          "910GWEALING",
          "910GHANWELL",
          "910GSTHALL",
          "910GHAYESAH",
          "910GHTRWAPT",
          "910GHTRWTM4"
        ]
      },
      {
        "name": "London Paddington  &harr;  Heathrow Terminal 5 ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GPADTON",
          "910GACTONML",
          "910GEALINGB",
          "910GWEALING",
          "910GHANWELL",
          "910GSTHALL",
          "910GHAYESAH",
          "910GHTRWAPT",
          "910GHTRWTM5"
        ]
      },
      {
        "name": "London Paddington  &harr;  Reading ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GPADTON",
          "910GACTONML",
          "910GEALINGB",
          "910GWEALING",
          "910GHANWELL",
          "910GSTHALL",
          "910GHAYESAH",
          "910GWDRYTON",
          "910GIVER",
          "910GLANGLEY",
          "910GSLOUGH",
          "910GBNHAM",
          "910GTAPLOW",
          "910GMDNHEAD",
          "910GTWYFORD",
          "910GRDNGSTN"
        ]
      },
      {
        "name": "Shenfield  &harr;  London Liverpool Street ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GSHENFLD",
          "910GBRTWOOD",
          "910GHRLDWOD",
          "910GGIDEAPK",
          "910GROMFORD",
          "910GCHDWLHT",
          "910GGODMAYS",
          "910GSVNKNGS",
          "910GILFORD",
          "910GMANRPK",
          "910GFRSTGT",
          "910GMRYLAND",
          "910GSTFD",
          "910GLIVST"
        ]
      },
      {
        "name": "Shenfield  &harr;  Heathrow Terminal 4 ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GSHENFLD",
          "910GBRTWOOD",
          "910GHRLDWOD",
          "910GGIDEAPK",
          "910GROMFORD",
          "910GCHDWLHT",
          "910GGODMAYS",
          "910GSVNKNGS",
          "910GILFORD",
          "910GMANRPK",
          "910GFRSTGT",
          "910GMRYLAND",
          "910GSTFD",
          "910GWCHAPXR",
          "910GLIVSTLL",
          "910GFRNDXR",
          "910GTOTCTRD",
          "910GBONDST",
          "910GPADTLL",
          "910GACTONML",
          "910GEALINGB",
          "910GWEALING",
          "910GHANWELL",
          "910GSTHALL",
          "910GHAYESAH",
          "910GHTRWAPT",
          "910GHTRWTM4"
        ]
      },
      {
        "name": "Shenfield  &harr;  Heathrow Terminal 5 ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GSHENFLD",
          "910GBRTWOOD",
          "910GHRLDWOD",
          "910GGIDEAPK",
          "910GROMFORD",
          "910GCHDWLHT",
          "910GGODMAYS",
          "910GSVNKNGS",
          "910GILFORD",
          "910GMANRPK",
          "910GFRSTGT",
          "910GMRYLAND",
          "910GSTFD",
          "910GWCHAPXR",
          "910GLIVSTLL",
          "910GFRNDXR",
          "910GTOTCTRD",
          "910GBONDST",
          "910GPADTLL",
          "910GACTONML",
          "910GEALINGB",
          "910GWEALING",
          "910GHANWELL",
          "910GSTHALL",
          "910GHAYESAH",
          "910GHTRWAPT",
          "910GHTRWTM5"
        ]
      }
    ]
  },
  "hammersmith-city": {
    "lineId": "hammersmith-city",
    "lineName": "Hammersmith & City",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUADE",
        "name": "Aldgate East Underground Station"
      },
      {
        "id": "940GZZLUBST",
        "name": "Baker Street Underground Station"
      },
      {
        "id": "940GZZLUBBN",
        "name": "Barbican Underground Station"
      },
      {
        "id": "940GZZLUBKG",
        "name": "Barking Underground Station"
      },
      {
        "id": "940GZZLUBWR",
        "name": "Bow Road Underground Station"
      },
      {
        "id": "940GZZLUBBB",
        "name": "Bromley-by-Bow Underground Station"
      },
      {
        "id": "940GZZLUEHM",
        "name": "East Ham Underground Station"
      },
      {
        "id": "940GZZLUERC",
        "name": "Edgware Road (Circle Line) Underground Station"
      },
      {
        "id": "940GZZLUESQ",
        "name": "Euston Square Underground Station"
      },
      {
        "id": "940GZZLUFCN",
        "name": "Farringdon Underground Station"
      },
      {
        "id": "940GZZLUGHK",
        "name": "Goldhawk Road Underground Station"
      },
      {
        "id": "940GZZLUGPS",
        "name": "Great Portland Street Underground Station"
      },
      {
        "id": "940GZZLUHSC",
        "name": "Hammersmith (H&C Line) Underground Station"
      },
      {
        "id": "940GZZLUKSX",
        "name": "King's Cross St. Pancras Underground Station"
      },
      {
        "id": "940GZZLULAD",
        "name": "Ladbroke Grove Underground Station"
      },
      {
        "id": "940GZZLULRD",
        "name": "Latimer Road Underground Station"
      },
      {
        "id": "940GZZLULVT",
        "name": "Liverpool Street Underground Station"
      },
      {
        "id": "940GZZLUMED",
        "name": "Mile End Underground Station"
      },
      {
        "id": "940GZZLUMGT",
        "name": "Moorgate Underground Station"
      },
      {
        "id": "940GZZLUPAH",
        "name": "Paddington (H&C Line)-Underground"
      },
      {
        "id": "940GZZLUPLW",
        "name": "Plaistow Underground Station"
      },
      {
        "id": "940GZZLURYO",
        "name": "Royal Oak Underground Station"
      },
      {
        "id": "940GZZLUSBM",
        "name": "Shepherd's Bush Market Underground Station"
      },
      {
        "id": "940GZZLUSGN",
        "name": "Stepney Green Underground Station"
      },
      {
        "id": "940GZZLUUPK",
        "name": "Upton Park Underground Station"
      },
      {
        "id": "940GZZLUWHM",
        "name": "West Ham Underground Station"
      },
      {
        "id": "940GZZLUWSP",
        "name": "Westbourne Park Underground Station"
      },
      {
        "id": "940GZZLUWPL",
        "name": "Whitechapel Underground Station"
      },
      {
        "id": "940GZZLUWLA",
        "name": "Wood Lane Underground Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUBKG",
          "940GZZLUEHM",
          "940GZZLUUPK",
          "940GZZLUPLW",
          "940GZZLUWHM",
          "940GZZLUBBB",
          "940GZZLUBWR",
          "940GZZLUMED",
          "940GZZLUSGN",
          "940GZZLUWPL",
          "940GZZLUADE",
          "940GZZLULVT",
          "940GZZLUMGT",
          "940GZZLUBBN",
          "940GZZLUFCN",
          "940GZZLUKSX",
          "940GZZLUESQ",
          "940GZZLUGPS",
          "940GZZLUBST",
          "940GZZLUERC",
          "940GZZLUPAH",
          "940GZZLURYO",
          "940GZZLUWSP",
          "940GZZLULAD",
          "940GZZLULRD",
          "940GZZLUWLA",
          "940GZZLUSBM",
          "940GZZLUGHK",
          "940GZZLUHSC"
        ]
      },
      {
        "id": 1,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUHSC",
          "940GZZLUGHK",
          "940GZZLUSBM",
          "940GZZLUWLA",
          "940GZZLULRD",
          "940GZZLULAD",
          "940GZZLUWSP",
          "940GZZLURYO",
          "940GZZLUPAH",
          "940GZZLUERC",
          "940GZZLUBST",
          "940GZZLUGPS",
          "940GZZLUESQ",
          "940GZZLUKSX",
          "940GZZLUFCN",
          "940GZZLUBBN",
          "940GZZLUMGT",
          "940GZZLULVT",
          "940GZZLUADE",
          "940GZZLUWPL",
          "940GZZLUSGN",
          "940GZZLUMED",
          "940GZZLUBWR",
          "940GZZLUBBB",
          "940GZZLUWHM",
          "940GZZLUPLW",
          "940GZZLUUPK",
          "940GZZLUEHM",
          "940GZZLUBKG"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Barking  &harr;  Hammersmith (H&C Line) ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUBKG",
          "940GZZLUEHM",
          "940GZZLUUPK",
          "940GZZLUPLW",
          "940GZZLUWHM",
          "940GZZLUBBB",
          "940GZZLUBWR",
          "940GZZLUMED",
          "940GZZLUSGN",
          "940GZZLUWPL",
          "940GZZLUADE",
          "940GZZLULVT",
          "940GZZLUMGT",
          "940GZZLUBBN",
          "940GZZLUFCN",
          "940GZZLUKSX",
          "940GZZLUESQ",
          "940GZZLUGPS",
          "940GZZLUBST",
          "940GZZLUERC",
          "940GZZLUPAH",
          "940GZZLURYO",
          "940GZZLUWSP",
          "940GZZLULAD",
          "940GZZLULRD",
          "940GZZLUWLA",
          "940GZZLUSBM",
          "940GZZLUGHK",
          "940GZZLUHSC"
        ]
      },
      {
        "name": "Hammersmith (H&C Line)  &harr;  Barking ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHSC",
          "940GZZLUGHK",
          "940GZZLUSBM",
          "940GZZLUWLA",
          "940GZZLULRD",
          "940GZZLULAD",
          "940GZZLUWSP",
          "940GZZLURYO",
          "940GZZLUPAH",
          "940GZZLUERC",
          "940GZZLUBST",
          "940GZZLUGPS",
          "940GZZLUESQ",
          "940GZZLUKSX",
          "940GZZLUFCN",
          "940GZZLUBBN",
          "940GZZLUMGT",
          "940GZZLULVT",
          "940GZZLUADE",
          "940GZZLUWPL",
          "940GZZLUSGN",
          "940GZZLUMED",
          "940GZZLUBWR",
          "940GZZLUBBB",
          "940GZZLUWHM",
          "940GZZLUPLW",
          "940GZZLUUPK",
          "940GZZLUEHM",
          "940GZZLUBKG"
        ]
      }
    ]
  },
  "jubilee": {
    "lineId": "jubilee",
    "lineName": "Jubilee",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUBST",
        "name": "Baker Street Underground Station"
      },
      {
        "id": "940GZZLUBMY",
        "name": "Bermondsey Underground Station"
      },
      {
        "id": "940GZZLUBND",
        "name": "Bond Street Underground Station"
      },
      {
        "id": "940GZZLUCWR",
        "name": "Canada Water Underground Station"
      },
      {
        "id": "940GZZLUCYF",
        "name": "Canary Wharf Underground Station"
      },
      {
        "id": "940GZZLUCGT",
        "name": "Canning Town Underground Station"
      },
      {
        "id": "940GZZLUCPK",
        "name": "Canons Park Underground Station"
      },
      {
        "id": "940GZZLUDOH",
        "name": "Dollis Hill Underground Station"
      },
      {
        "id": "940GZZLUFYR",
        "name": "Finchley Road Underground Station"
      },
      {
        "id": "940GZZLUGPK",
        "name": "Green Park Underground Station"
      },
      {
        "id": "940GZZLUKBN",
        "name": "Kilburn Underground Station"
      },
      {
        "id": "940GZZLUKBY",
        "name": "Kingsbury Underground Station"
      },
      {
        "id": "940GZZLULNB",
        "name": "London Bridge Underground Station"
      },
      {
        "id": "940GZZLUNDN",
        "name": "Neasden Underground Station"
      },
      {
        "id": "940GZZLUNGW",
        "name": "North Greenwich Underground Station"
      },
      {
        "id": "940GZZLUQBY",
        "name": "Queensbury Underground Station"
      },
      {
        "id": "940GZZLUSWK",
        "name": "Southwark Underground Station"
      },
      {
        "id": "940GZZLUSJW",
        "name": "St. John's Wood Underground Station"
      },
      {
        "id": "940GZZLUSTM",
        "name": "Stanmore Underground Station"
      },
      {
        "id": "940GZZLUSTD",
        "name": "Stratford Underground Station"
      },
      {
        "id": "940GZZLUSWC",
        "name": "Swiss Cottage Underground Station"
      },
      {
        "id": "940GZZLUWLO",
        "name": "Waterloo Underground Station"
      },
      {
        "id": "940GZZLUWYP",
        "name": "Wembley Park Underground Station"
      },
      {
        "id": "940GZZLUWHM",
        "name": "West Ham Underground Station"
      },
      {
        "id": "940GZZLUWHP",
        "name": "West Hampstead Underground Station"
      },
      {
        "id": "940GZZLUWSM",
        "name": "Westminster Underground Station"
      },
      {
        "id": "940GZZLUWIG",
        "name": "Willesden Green Underground Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUSTD",
          "940GZZLUWHM",
          "940GZZLUCGT",
          "940GZZLUNGW",
          "940GZZLUCYF",
          "940GZZLUCWR",
          "940GZZLUBMY",
          "940GZZLULNB",
          "940GZZLUSWK",
          "940GZZLUWLO",
          "940GZZLUWSM",
          "940GZZLUGPK",
          "940GZZLUBND",
          "940GZZLUBST",
          "940GZZLUSJW",
          "940GZZLUSWC",
          "940GZZLUFYR",
          "940GZZLUWHP",
          "940GZZLUKBN",
          "940GZZLUWIG",
          "940GZZLUDOH",
          "940GZZLUNDN",
          "940GZZLUWYP",
          "940GZZLUKBY",
          "940GZZLUQBY",
          "940GZZLUCPK",
          "940GZZLUSTM"
        ]
      },
      {
        "id": 1,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUSTM",
          "940GZZLUCPK",
          "940GZZLUQBY",
          "940GZZLUKBY",
          "940GZZLUWYP",
          "940GZZLUNDN",
          "940GZZLUDOH",
          "940GZZLUWIG",
          "940GZZLUKBN",
          "940GZZLUWHP",
          "940GZZLUFYR",
          "940GZZLUSWC",
          "940GZZLUSJW",
          "940GZZLUBST",
          "940GZZLUBND",
          "940GZZLUGPK",
          "940GZZLUWSM",
          "940GZZLUWLO",
          "940GZZLUSWK",
          "940GZZLULNB",
          "940GZZLUBMY",
          "940GZZLUCWR",
          "940GZZLUCYF",
          "940GZZLUNGW",
          "940GZZLUCGT",
          "940GZZLUWHM",
          "940GZZLUSTD"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Stratford  &harr;  Stanmore ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUSTD",
          "940GZZLUWHM",
          "940GZZLUCGT",
          "940GZZLUNGW",
          "940GZZLUCYF",
          "940GZZLUCWR",
          "940GZZLUBMY",
          "940GZZLULNB",
          "940GZZLUSWK",
          "940GZZLUWLO",
          "940GZZLUWSM",
          "940GZZLUGPK",
          "940GZZLUBND",
          "940GZZLUBST",
          "940GZZLUSJW",
          "940GZZLUSWC",
          "940GZZLUFYR",
          "940GZZLUWHP",
          "940GZZLUKBN",
          "940GZZLUWIG",
          "940GZZLUDOH",
          "940GZZLUNDN",
          "940GZZLUWYP",
          "940GZZLUKBY",
          "940GZZLUQBY",
          "940GZZLUCPK",
          "940GZZLUSTM"
        ]
      },
      {
        "name": "Stanmore  &harr;  Stratford ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUSTM",
          "940GZZLUCPK",
          "940GZZLUQBY",
          "940GZZLUKBY",
          "940GZZLUWYP",
          "940GZZLUNDN",
          "940GZZLUDOH",
          "940GZZLUWIG",
          "940GZZLUKBN",
          "940GZZLUWHP",
          "940GZZLUFYR",
          "940GZZLUSWC",
          "940GZZLUSJW",
          "940GZZLUBST",
          "940GZZLUBND",
          "940GZZLUGPK",
          "940GZZLUWSM",
          "940GZZLUWLO",
          "940GZZLUSWK",
          "940GZZLULNB",
          "940GZZLUBMY",
          "940GZZLUCWR",
          "940GZZLUCYF",
          "940GZZLUNGW",
          "940GZZLUCGT",
          "940GZZLUWHM",
          "940GZZLUSTD"
        ]
      }
    ]
  },
  "liberty": {
    "lineId": "liberty",
    "lineName": "Liberty",
    "modeName": "overground",
    "stations": [
      {
        "id": "910GEMRSPKH",
        "name": "Emerson Park Rail Station"
      },
      {
        "id": "910GROMFORD",
        "name": "Romford Rail Station"
      },
      {
        "id": "910GUPMNSTR",
        "name": "Upminster Rail Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "910GUPMNSTR",
          "910GEMRSPKH",
          "910GROMFORD"
        ]
      },
      {
        "id": 1,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "910GROMFORD",
          "910GEMRSPKH",
          "910GUPMNSTR"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Upminster  &harr;  Romford ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GUPMNSTR",
          "910GEMRSPKH",
          "910GROMFORD"
        ]
      },
      {
        "name": "Romford  &harr;  Upminster ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GROMFORD",
          "910GEMRSPKH",
          "910GUPMNSTR"
        ]
      }
    ]
  },
  "lioness": {
    "lineId": "lioness",
    "lineName": "Lioness",
    "modeName": "overground",
    "stations": [
      {
        "id": "910GBUSHYDC",
        "name": "Bushey Rail Station"
      },
      {
        "id": "910GCRPNDPK",
        "name": "Carpenders Park Rail Station"
      },
      {
        "id": "910GHARLSDN",
        "name": "Harlesden Rail Station"
      },
      {
        "id": "910GHROW",
        "name": "Harrow & Wealdstone Rail Station"
      },
      {
        "id": "910GHTCHEND",
        "name": "Hatch End Rail Station"
      },
      {
        "id": "910GHEDSTNL",
        "name": "Headstone Lane Rail Station"
      },
      {
        "id": "910GKENSLG",
        "name": "Kensal Green Rail Station"
      },
      {
        "id": "910GKTON",
        "name": "Kenton Rail Station"
      },
      {
        "id": "910GKLBRNHR",
        "name": "Kilburn High Road Rail Station"
      },
      {
        "id": "910GEUSTON",
        "name": "London Euston Rail Station"
      },
      {
        "id": "910GNWEMBLY",
        "name": "North Wembley Rail Station"
      },
      {
        "id": "910GQPRK",
        "name": "Queens Park (London) Rail Station"
      },
      {
        "id": "910GSHMPSTD",
        "name": "South Hampstead Rail Station"
      },
      {
        "id": "910GSKENTON",
        "name": "South Kenton Rail Station"
      },
      {
        "id": "910GSTNBGPK",
        "name": "Stonebridge Park Rail Station"
      },
      {
        "id": "910GWATFDHS",
        "name": "Watford High Street Rail Station"
      },
      {
        "id": "910GWATFJDC",
        "name": "Watford Junction Rail Station"
      },
      {
        "id": "910GWMBY",
        "name": "Wembley Central Rail Station"
      },
      {
        "id": "910GWLSDJHL",
        "name": "Willesden Junction Rail Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "910GWATFJDC",
          "910GWATFDHS",
          "910GBUSHYDC",
          "910GCRPNDPK",
          "910GHTCHEND",
          "910GHEDSTNL",
          "910GHROW",
          "910GKTON",
          "910GSKENTON",
          "910GNWEMBLY",
          "910GWMBY",
          "910GSTNBGPK",
          "910GHARLSDN",
          "910GWLSDJHL",
          "910GKENSLG",
          "910GQPRK",
          "910GKLBRNHR",
          "910GSHMPSTD",
          "910GEUSTON"
        ]
      },
      {
        "id": 1,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "910GEUSTON",
          "910GSHMPSTD",
          "910GKLBRNHR",
          "910GQPRK",
          "910GKENSLG",
          "910GWLSDJHL",
          "910GHARLSDN",
          "910GSTNBGPK",
          "910GWMBY",
          "910GNWEMBLY",
          "910GSKENTON",
          "910GKTON",
          "910GHROW",
          "910GHEDSTNL",
          "910GHTCHEND",
          "910GCRPNDPK",
          "910GBUSHYDC",
          "910GWATFDHS",
          "910GWATFJDC"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Watford Junction  &harr;  London Euston ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GWATFJDC",
          "910GWATFDHS",
          "910GBUSHYDC",
          "910GCRPNDPK",
          "910GHTCHEND",
          "910GHEDSTNL",
          "910GHROW",
          "910GKTON",
          "910GSKENTON",
          "910GNWEMBLY",
          "910GWMBY",
          "910GSTNBGPK",
          "910GHARLSDN",
          "910GWLSDJHL",
          "910GKENSLG",
          "910GQPRK",
          "910GKLBRNHR",
          "910GSHMPSTD",
          "910GEUSTON"
        ]
      },
      {
        "name": "London Euston  &harr;  Watford Junction ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GEUSTON",
          "910GSHMPSTD",
          "910GKLBRNHR",
          "910GQPRK",
          "910GKENSLG",
          "910GWLSDJHL",
          "910GHARLSDN",
          "910GSTNBGPK",
          "910GWMBY",
          "910GNWEMBLY",
          "910GSKENTON",
          "910GKTON",
          "910GHROW",
          "910GHEDSTNL",
          "910GHTCHEND",
          "910GCRPNDPK",
          "910GBUSHYDC",
          "910GWATFDHS",
          "910GWATFJDC"
        ]
      }
    ]
  },
  "metropolitan": {
    "lineId": "metropolitan",
    "lineName": "Metropolitan",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUALD",
        "name": "Aldgate Underground Station"
      },
      {
        "id": "940GZZLUAMS",
        "name": "Amersham Underground Station"
      },
      {
        "id": "940GZZLUBST",
        "name": "Baker Street Underground Station"
      },
      {
        "id": "940GZZLUBBN",
        "name": "Barbican Underground Station"
      },
      {
        "id": "940GZZLUCAL",
        "name": "Chalfont & Latimer Underground Station"
      },
      {
        "id": "940GZZLUCSM",
        "name": "Chesham Underground Station"
      },
      {
        "id": "940GZZLUCYD",
        "name": "Chorleywood Underground Station"
      },
      {
        "id": "940GZZLUCXY",
        "name": "Croxley Underground Station"
      },
      {
        "id": "940GZZLUEAE",
        "name": "Eastcote Underground Station"
      },
      {
        "id": "940GZZLUESQ",
        "name": "Euston Square Underground Station"
      },
      {
        "id": "940GZZLUFCN",
        "name": "Farringdon Underground Station"
      },
      {
        "id": "940GZZLUFYR",
        "name": "Finchley Road Underground Station"
      },
      {
        "id": "940GZZLUGPS",
        "name": "Great Portland Street Underground Station"
      },
      {
        "id": "940GZZLUHOH",
        "name": "Harrow-on-the-Hill Underground Station"
      },
      {
        "id": "940GZZLUHGD",
        "name": "Hillingdon Underground Station"
      },
      {
        "id": "940GZZLUICK",
        "name": "Ickenham Underground Station"
      },
      {
        "id": "940GZZLUKSX",
        "name": "King's Cross St. Pancras Underground Station"
      },
      {
        "id": "940GZZLULVT",
        "name": "Liverpool Street Underground Station"
      },
      {
        "id": "940GZZLUMPK",
        "name": "Moor Park Underground Station"
      },
      {
        "id": "940GZZLUMGT",
        "name": "Moorgate Underground Station"
      },
      {
        "id": "940GZZLUNHA",
        "name": "North Harrow Underground Station"
      },
      {
        "id": "940GZZLUNKP",
        "name": "Northwick Park Underground Station"
      },
      {
        "id": "940GZZLUNWH",
        "name": "Northwood Hills Underground Station"
      },
      {
        "id": "940GZZLUNOW",
        "name": "Northwood Underground Station"
      },
      {
        "id": "940GZZLUPNR",
        "name": "Pinner Underground Station"
      },
      {
        "id": "940GZZLUPRD",
        "name": "Preston Road Underground Station"
      },
      {
        "id": "940GZZLURYL",
        "name": "Rayners Lane Underground Station"
      },
      {
        "id": "940GZZLURKW",
        "name": "Rickmansworth Underground Station"
      },
      {
        "id": "940GZZLURSM",
        "name": "Ruislip Manor Underground Station"
      },
      {
        "id": "940GZZLURSP",
        "name": "Ruislip Underground Station"
      },
      {
        "id": "940GZZLUUXB",
        "name": "Uxbridge Underground Station"
      },
      {
        "id": "940GZZLUWAF",
        "name": "Watford Underground Station"
      },
      {
        "id": "940GZZLUWYP",
        "name": "Wembley Park Underground Station"
      },
      {
        "id": "940GZZLUWHW",
        "name": "West Harrow Underground Station"
      },
      {
        "id": "940GZZLUWIG",
        "name": "Willesden Green Underground Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          1,
          2
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUALD",
          "940GZZLULVT",
          "940GZZLUMGT",
          "940GZZLUBBN",
          "940GZZLUFCN",
          "940GZZLUKSX",
          "940GZZLUESQ",
          "940GZZLUGPS",
          "940GZZLUBST",
          "940GZZLUFYR",
          "940GZZLUWYP",
          "940GZZLUPRD",
          "940GZZLUNKP",
          "940GZZLUHOH"
        ]
      },
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3,
          4
        ],
        "previousBranchIds": [
          0
        ],
        "stationIds": [
          "940GZZLUHOH",
          "940GZZLUNHA",
          "940GZZLUPNR",
          "940GZZLUNWH",
          "940GZZLUNOW",
          "940GZZLUMPK"
        ]
      },
      {
        "id": 4,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5,
          6
        ],
        "previousBranchIds": [
          1
        ],
        "stationIds": [
          "940GZZLUMPK",
          "940GZZLURKW",
          "940GZZLUCYD",
          "940GZZLUCAL"
        ]
      },
      {
        "id": 5,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          4
        ],
        "stationIds": [
          "940GZZLUCAL",
          "940GZZLUCSM"
        ]
      },
      {
        "id": 6,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          4
        ],
        "stationIds": [
          "940GZZLUCAL",
          "940GZZLUAMS"
        ]
      },
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          0
        ],
        "stationIds": [
          "940GZZLUHOH",
          "940GZZLUWHW",
          "940GZZLURYL",
          "940GZZLUEAE",
          "940GZZLURSM",
          "940GZZLURSP",
          "940GZZLUICK",
          "940GZZLUHGD",
          "940GZZLUUXB"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          1
        ],
        "stationIds": [
          "940GZZLUMPK",
          "940GZZLUCXY",
          "940GZZLUWAF"
        ]
      },
      {
        "id": 8,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          17
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUAMS",
          "940GZZLUCAL"
        ]
      },
      {
        "id": 17,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          15
        ],
        "previousBranchIds": [
          8,
          10
        ],
        "stationIds": [
          "940GZZLUCAL",
          "940GZZLUCYD",
          "940GZZLURKW",
          "940GZZLUMPK"
        ]
      },
      {
        "id": 15,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11,
          12
        ],
        "previousBranchIds": [
          17,
          7
        ],
        "stationIds": [
          "940GZZLUMPK",
          "940GZZLUNOW",
          "940GZZLUNWH",
          "940GZZLUPNR",
          "940GZZLUNHA",
          "940GZZLUHOH"
        ]
      },
      {
        "id": 11,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          13,
          14
        ],
        "previousBranchIds": [
          15,
          9
        ],
        "stationIds": [
          "940GZZLUHOH",
          "940GZZLUNKP",
          "940GZZLUPRD",
          "940GZZLUWYP"
        ]
      },
      {
        "id": 16,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          13,
          14
        ],
        "stationIds": [
          "940GZZLUFYR",
          "940GZZLUBST",
          "940GZZLUGPS",
          "940GZZLUESQ",
          "940GZZLUKSX",
          "940GZZLUFCN",
          "940GZZLUBBN",
          "940GZZLUMGT",
          "940GZZLULVT",
          "940GZZLUALD"
        ]
      },
      {
        "id": 14,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          16
        ],
        "previousBranchIds": [
          11
        ],
        "stationIds": [
          "940GZZLUWYP",
          "940GZZLUWIG",
          "940GZZLUFYR"
        ]
      },
      {
        "id": 13,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          16
        ],
        "previousBranchIds": [
          11,
          12
        ],
        "stationIds": [
          "940GZZLUWYP",
          "940GZZLUFYR"
        ]
      },
      {
        "id": 10,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          17
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUCSM",
          "940GZZLUCAL"
        ]
      },
      {
        "id": 9,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUUXB",
          "940GZZLUHGD",
          "940GZZLUICK",
          "940GZZLURSP",
          "940GZZLURSM",
          "940GZZLUEAE",
          "940GZZLURYL",
          "940GZZLUWHW",
          "940GZZLUHOH"
        ]
      },
      {
        "id": 7,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          15
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUWAF",
          "940GZZLUCXY",
          "940GZZLUMPK"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Aldgate  &harr;  Watford ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUALD",
          "940GZZLULVT",
          "940GZZLUMGT",
          "940GZZLUBBN",
          "940GZZLUFCN",
          "940GZZLUKSX",
          "940GZZLUESQ",
          "940GZZLUGPS",
          "940GZZLUBST",
          "940GZZLUFYR",
          "940GZZLUWYP",
          "940GZZLUPRD",
          "940GZZLUNKP",
          "940GZZLUHOH",
          "940GZZLUNHA",
          "940GZZLUPNR",
          "940GZZLUNWH",
          "940GZZLUNOW",
          "940GZZLUMPK",
          "940GZZLUCXY",
          "940GZZLUWAF"
        ]
      },
      {
        "name": "Aldgate  &harr;  Amersham ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUALD",
          "940GZZLULVT",
          "940GZZLUMGT",
          "940GZZLUBBN",
          "940GZZLUFCN",
          "940GZZLUKSX",
          "940GZZLUESQ",
          "940GZZLUGPS",
          "940GZZLUBST",
          "940GZZLUFYR",
          "940GZZLUWYP",
          "940GZZLUPRD",
          "940GZZLUNKP",
          "940GZZLUHOH",
          "940GZZLUNHA",
          "940GZZLUPNR",
          "940GZZLUNWH",
          "940GZZLUNOW",
          "940GZZLUMPK",
          "940GZZLURKW",
          "940GZZLUCYD",
          "940GZZLUCAL",
          "940GZZLUAMS"
        ]
      },
      {
        "name": "Aldgate  &harr;  Chesham ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUALD",
          "940GZZLULVT",
          "940GZZLUMGT",
          "940GZZLUBBN",
          "940GZZLUFCN",
          "940GZZLUKSX",
          "940GZZLUESQ",
          "940GZZLUGPS",
          "940GZZLUBST",
          "940GZZLUFYR",
          "940GZZLUWYP",
          "940GZZLUPRD",
          "940GZZLUNKP",
          "940GZZLUHOH",
          "940GZZLUNHA",
          "940GZZLUPNR",
          "940GZZLUNWH",
          "940GZZLUNOW",
          "940GZZLUMPK",
          "940GZZLURKW",
          "940GZZLUCYD",
          "940GZZLUCAL",
          "940GZZLUCSM"
        ]
      },
      {
        "name": "Aldgate  &harr;  Uxbridge ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUALD",
          "940GZZLULVT",
          "940GZZLUMGT",
          "940GZZLUBBN",
          "940GZZLUFCN",
          "940GZZLUKSX",
          "940GZZLUESQ",
          "940GZZLUGPS",
          "940GZZLUBST",
          "940GZZLUFYR",
          "940GZZLUWYP",
          "940GZZLUPRD",
          "940GZZLUNKP",
          "940GZZLUHOH",
          "940GZZLUWHW",
          "940GZZLURYL",
          "940GZZLUEAE",
          "940GZZLURSM",
          "940GZZLURSP",
          "940GZZLUICK",
          "940GZZLUHGD",
          "940GZZLUUXB"
        ]
      },
      {
        "name": "Amersham  &harr;  Aldgate ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUAMS",
          "940GZZLUCAL",
          "940GZZLUCYD",
          "940GZZLURKW",
          "940GZZLUMPK",
          "940GZZLUNOW",
          "940GZZLUNWH",
          "940GZZLUPNR",
          "940GZZLUNHA",
          "940GZZLUHOH",
          "940GZZLUNKP",
          "940GZZLUPRD",
          "940GZZLUWYP",
          "940GZZLUWIG",
          "940GZZLUFYR",
          "940GZZLUBST",
          "940GZZLUGPS",
          "940GZZLUESQ",
          "940GZZLUKSX",
          "940GZZLUFCN",
          "940GZZLUBBN",
          "940GZZLUMGT",
          "940GZZLULVT",
          "940GZZLUALD"
        ]
      },
      {
        "name": "Chesham  &harr;  Aldgate ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUCSM",
          "940GZZLUCAL",
          "940GZZLUCYD",
          "940GZZLURKW",
          "940GZZLUMPK",
          "940GZZLUNOW",
          "940GZZLUNWH",
          "940GZZLUPNR",
          "940GZZLUNHA",
          "940GZZLUHOH",
          "940GZZLUNKP",
          "940GZZLUPRD",
          "940GZZLUWYP",
          "940GZZLUFYR",
          "940GZZLUBST",
          "940GZZLUGPS",
          "940GZZLUESQ",
          "940GZZLUKSX",
          "940GZZLUFCN",
          "940GZZLUBBN",
          "940GZZLUMGT",
          "940GZZLULVT",
          "940GZZLUALD"
        ]
      },
      {
        "name": "Uxbridge  &harr;  Aldgate ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUUXB",
          "940GZZLUHGD",
          "940GZZLUICK",
          "940GZZLURSP",
          "940GZZLURSM",
          "940GZZLUEAE",
          "940GZZLURYL",
          "940GZZLUWHW",
          "940GZZLUHOH",
          "940GZZLUNKP",
          "940GZZLUPRD",
          "940GZZLUWYP",
          "940GZZLUFYR",
          "940GZZLUBST",
          "940GZZLUGPS",
          "940GZZLUESQ",
          "940GZZLUKSX",
          "940GZZLUFCN",
          "940GZZLUBBN",
          "940GZZLUMGT",
          "940GZZLULVT",
          "940GZZLUALD"
        ]
      },
      {
        "name": "Watford  &harr;  Aldgate ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUWAF",
          "940GZZLUCXY",
          "940GZZLUMPK",
          "940GZZLUNOW",
          "940GZZLUNWH",
          "940GZZLUPNR",
          "940GZZLUNHA",
          "940GZZLUHOH",
          "940GZZLUNKP",
          "940GZZLUPRD",
          "940GZZLUWYP",
          "940GZZLUFYR",
          "940GZZLUBST",
          "940GZZLUGPS",
          "940GZZLUESQ",
          "940GZZLUKSX",
          "940GZZLUFCN",
          "940GZZLUBBN",
          "940GZZLUMGT",
          "940GZZLULVT",
          "940GZZLUALD"
        ]
      }
    ]
  },
  "mildmay": {
    "lineId": "mildmay",
    "lineName": "Mildmay",
    "modeName": "overground",
    "stations": [
      {
        "id": "910GACTNCTL",
        "name": "Acton Central Rail Station"
      },
      {
        "id": "910GBRBYPK",
        "name": "Brondesbury Park Rail Station"
      },
      {
        "id": "910GBRBY",
        "name": "Brondesbury Rail Station"
      },
      {
        "id": "910GCLDNNRB",
        "name": "Caledonian Road & Barnsbury Rail Station"
      },
      {
        "id": "910GCMDNRD",
        "name": "Camden Road Rail Station"
      },
      {
        "id": "910GCNNB",
        "name": "Canonbury Rail Station"
      },
      {
        "id": "910GCLPHMJ1",
        "name": "Clapham Junction Rail Station"
      },
      {
        "id": "910GCLPHMJC",
        "name": "Clapham Junction Rail Station"
      },
      {
        "id": "910GDALSKLD",
        "name": "Dalston Kingsland Rail Station"
      },
      {
        "id": "910GFNCHLYR",
        "name": "Finchley Road & Frognal Rail Station"
      },
      {
        "id": "910GGOSPLOK",
        "name": "Gospel Oak Rail Station"
      },
      {
        "id": "910GGNRSBRY",
        "name": "Gunnersbury Rail Station"
      },
      {
        "id": "910GHACKNYC",
        "name": "Hackney Central Rail Station"
      },
      {
        "id": "910GHACKNYW",
        "name": "Hackney Wick Rail Station"
      },
      {
        "id": "910GHMPSTDH",
        "name": "Hampstead Heath Rail Station"
      },
      {
        "id": "910GHGHI",
        "name": "Highbury & Islington Rail Station"
      },
      {
        "id": "910GHOMRTON",
        "name": "Homerton Rail Station"
      },
      {
        "id": "910GCSEAH",
        "name": "Imperial Wharf Rail Station"
      },
      {
        "id": "910GKENR",
        "name": "Kensal Rise Rail Station"
      },
      {
        "id": "910GKENOLYM",
        "name": "Kensington (Olympia) Rail Station"
      },
      {
        "id": "910GKNTSHTW",
        "name": "Kentish Town West Rail Station"
      },
      {
        "id": "910GKEWGRDN",
        "name": "Kew Gardens Rail Station"
      },
      {
        "id": "910GRICHMND",
        "name": "Richmond (London) Rail Station"
      },
      {
        "id": "910GSHPDSB",
        "name": "Shepherds Bush Rail Station"
      },
      {
        "id": "910GSACTON",
        "name": "South Acton Rail Station"
      },
      {
        "id": "910GSTFD",
        "name": "Stratford (London) Rail Station"
      },
      {
        "id": "910GWBRMPTN",
        "name": "West Brompton Rail Station"
      },
      {
        "id": "910GWHMDSTD",
        "name": "West Hampstead Rail Station"
      },
      {
        "id": "910GWLSDJHL",
        "name": "Willesden Junction Rail Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          2
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GRICHMND",
          "910GKEWGRDN",
          "910GGNRSBRY",
          "910GSACTON",
          "910GACTNCTL",
          "910GWLSDJHL"
        ]
      },
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          0,
          1
        ],
        "stationIds": [
          "910GWLSDJHL",
          "910GKENR",
          "910GBRBYPK",
          "910GBRBY",
          "910GWHMDSTD",
          "910GFNCHLYR",
          "910GHMPSTDH",
          "910GGOSPLOK",
          "910GKNTSHTW",
          "910GCMDNRD",
          "910GCLDNNRB",
          "910GHGHI",
          "910GCNNB",
          "910GDALSKLD",
          "910GHACKNYC",
          "910GHOMRTON",
          "910GHACKNYW",
          "910GSTFD"
        ]
      },
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          2
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GCLPHMJ1",
          "910GCSEAH",
          "910GWBRMPTN",
          "910GKENOLYM",
          "910GSHPDSB",
          "910GWLSDJHL"
        ]
      },
      {
        "id": 3,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          4,
          5
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GSTFD",
          "910GHACKNYW",
          "910GHOMRTON",
          "910GHACKNYC",
          "910GDALSKLD",
          "910GCNNB",
          "910GHGHI",
          "910GCLDNNRB",
          "910GCMDNRD",
          "910GKNTSHTW",
          "910GGOSPLOK",
          "910GHMPSTDH",
          "910GFNCHLYR",
          "910GWHMDSTD",
          "910GBRBY",
          "910GBRBYPK",
          "910GKENR",
          "910GWLSDJHL"
        ]
      },
      {
        "id": 4,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          3
        ],
        "stationIds": [
          "910GWLSDJHL",
          "910GACTNCTL",
          "910GSACTON",
          "910GGNRSBRY",
          "910GKEWGRDN",
          "910GRICHMND"
        ]
      },
      {
        "id": 5,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          3
        ],
        "stationIds": [
          "910GWLSDJHL",
          "910GSHPDSB",
          "910GKENOLYM",
          "910GWBRMPTN",
          "910GCSEAH",
          "910GCLPHMJC"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Clapham Junction  &harr;  Stratford (London) ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GCLPHMJ1",
          "910GCSEAH",
          "910GWBRMPTN",
          "910GKENOLYM",
          "910GSHPDSB",
          "910GWLSDJHL",
          "910GKENR",
          "910GBRBYPK",
          "910GBRBY",
          "910GWHMDSTD",
          "910GFNCHLYR",
          "910GHMPSTDH",
          "910GGOSPLOK",
          "910GKNTSHTW",
          "910GCMDNRD",
          "910GCLDNNRB",
          "910GHGHI",
          "910GCNNB",
          "910GDALSKLD",
          "910GHACKNYC",
          "910GHOMRTON",
          "910GHACKNYW",
          "910GSTFD"
        ]
      },
      {
        "name": "Richmond (London)  &harr;  Stratford (London) ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GRICHMND",
          "910GKEWGRDN",
          "910GGNRSBRY",
          "910GSACTON",
          "910GACTNCTL",
          "910GWLSDJHL",
          "910GKENR",
          "910GBRBYPK",
          "910GBRBY",
          "910GWHMDSTD",
          "910GFNCHLYR",
          "910GHMPSTDH",
          "910GGOSPLOK",
          "910GKNTSHTW",
          "910GCMDNRD",
          "910GCLDNNRB",
          "910GHGHI",
          "910GCNNB",
          "910GDALSKLD",
          "910GHACKNYC",
          "910GHOMRTON",
          "910GHACKNYW",
          "910GSTFD"
        ]
      },
      {
        "name": "Stratford (London)  &harr;  Richmond (London) ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GSTFD",
          "910GHACKNYW",
          "910GHOMRTON",
          "910GHACKNYC",
          "910GDALSKLD",
          "910GCNNB",
          "910GHGHI",
          "910GCLDNNRB",
          "910GCMDNRD",
          "910GKNTSHTW",
          "910GGOSPLOK",
          "910GHMPSTDH",
          "910GFNCHLYR",
          "910GWHMDSTD",
          "910GBRBY",
          "910GBRBYPK",
          "910GKENR",
          "910GWLSDJHL",
          "910GACTNCTL",
          "910GSACTON",
          "910GGNRSBRY",
          "910GKEWGRDN",
          "910GRICHMND"
        ]
      },
      {
        "name": "Stratford (London)  &harr;  Clapham Junction ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GSTFD",
          "910GHACKNYW",
          "910GHOMRTON",
          "910GHACKNYC",
          "910GDALSKLD",
          "910GCNNB",
          "910GHGHI",
          "910GCLDNNRB",
          "910GCMDNRD",
          "910GKNTSHTW",
          "910GGOSPLOK",
          "910GHMPSTDH",
          "910GFNCHLYR",
          "910GWHMDSTD",
          "910GBRBY",
          "910GBRBYPK",
          "910GKENR",
          "910GWLSDJHL",
          "910GSHPDSB",
          "910GKENOLYM",
          "910GWBRMPTN",
          "910GCSEAH",
          "910GCLPHMJC"
        ]
      }
    ]
  },
  "northern": {
    "lineId": "northern",
    "lineName": "Northern",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUAGL",
        "name": "Angel Underground Station"
      },
      {
        "id": "940GZZLUACY",
        "name": "Archway Underground Station"
      },
      {
        "id": "940GZZLUBLM",
        "name": "Balham Underground Station"
      },
      {
        "id": "940GZZLUBNK",
        "name": "Bank Underground Station"
      },
      {
        "id": "940GZZBPSUST",
        "name": "Battersea Power Station Underground Station"
      },
      {
        "id": "940GZZLUBZP",
        "name": "Belsize Park Underground Station"
      },
      {
        "id": "940GZZLUBOR",
        "name": "Borough Underground Station"
      },
      {
        "id": "940GZZLUBTX",
        "name": "Brent Cross Underground Station"
      },
      {
        "id": "940GZZLUBTK",
        "name": "Burnt Oak Underground Station"
      },
      {
        "id": "940GZZLUCTN",
        "name": "Camden Town Underground Station"
      },
      {
        "id": "940GZZLUCFM",
        "name": "Chalk Farm Underground Station"
      },
      {
        "id": "940GZZLUCHX",
        "name": "Charing Cross Underground Station"
      },
      {
        "id": "940GZZLUCPC",
        "name": "Clapham Common Underground Station"
      },
      {
        "id": "940GZZLUCPN",
        "name": "Clapham North Underground Station"
      },
      {
        "id": "940GZZLUCPS",
        "name": "Clapham South Underground Station"
      },
      {
        "id": "940GZZLUCND",
        "name": "Colindale Underground Station"
      },
      {
        "id": "940GZZLUCSD",
        "name": "Colliers Wood Underground Station"
      },
      {
        "id": "940GZZLUEFY",
        "name": "East Finchley Underground Station"
      },
      {
        "id": "940GZZLUEGW",
        "name": "Edgware Underground Station"
      },
      {
        "id": "940GZZLUEAC",
        "name": "Elephant & Castle Underground Station"
      },
      {
        "id": "940GZZLUEMB",
        "name": "Embankment Underground Station"
      },
      {
        "id": "940GZZLUEUS",
        "name": "Euston Underground Station"
      },
      {
        "id": "940GZZLUFYC",
        "name": "Finchley Central Underground Station"
      },
      {
        "id": "940GZZLUGGN",
        "name": "Golders Green Underground Station"
      },
      {
        "id": "940GZZLUGDG",
        "name": "Goodge Street Underground Station"
      },
      {
        "id": "940GZZLUHTD",
        "name": "Hampstead Underground Station"
      },
      {
        "id": "940GZZLUHCL",
        "name": "Hendon Central Underground Station"
      },
      {
        "id": "940GZZLUHBT",
        "name": "High Barnet Underground Station"
      },
      {
        "id": "940GZZLUHGT",
        "name": "Highgate Underground Station"
      },
      {
        "id": "940GZZLUKNG",
        "name": "Kennington Underground Station"
      },
      {
        "id": "940GZZLUKSH",
        "name": "Kentish Town Underground Station"
      },
      {
        "id": "940GZZLUKSX",
        "name": "King's Cross St. Pancras Underground Station"
      },
      {
        "id": "940GZZLULSQ",
        "name": "Leicester Square Underground Station"
      },
      {
        "id": "940GZZLULNB",
        "name": "London Bridge Underground Station"
      },
      {
        "id": "940GZZLUMHL",
        "name": "Mill Hill East Underground Station"
      },
      {
        "id": "940GZZLUMGT",
        "name": "Moorgate Underground Station"
      },
      {
        "id": "940GZZLUMDN",
        "name": "Morden Underground Station"
      },
      {
        "id": "940GZZLUMTC",
        "name": "Mornington Crescent Underground Station"
      },
      {
        "id": "940GZZNEUGST",
        "name": "Nine Elms Underground Station"
      },
      {
        "id": "940GZZLUODS",
        "name": "Old Street Underground Station"
      },
      {
        "id": "940GZZLUOVL",
        "name": "Oval Underground Station"
      },
      {
        "id": "940GZZLUSWN",
        "name": "South Wimbledon Underground Station"
      },
      {
        "id": "940GZZLUSKW",
        "name": "Stockwell Underground Station"
      },
      {
        "id": "940GZZLUTBC",
        "name": "Tooting Bec Underground Station"
      },
      {
        "id": "940GZZLUTBY",
        "name": "Tooting Broadway Underground Station"
      },
      {
        "id": "940GZZLUTCR",
        "name": "Tottenham Court Road Underground Station"
      },
      {
        "id": "940GZZLUTAW",
        "name": "Totteridge & Whetstone Underground Station"
      },
      {
        "id": "940GZZLUTFP",
        "name": "Tufnell Park Underground Station"
      },
      {
        "id": "940GZZLUWRR",
        "name": "Warren Street Underground Station"
      },
      {
        "id": "940GZZLUWLO",
        "name": "Waterloo Underground Station"
      },
      {
        "id": "940GZZLUWFN",
        "name": "West Finchley Underground Station"
      },
      {
        "id": "940GZZLUWOP",
        "name": "Woodside Park Underground Station"
      }
    ],
    "branches": [
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          9
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUHBT",
          "940GZZLUTAW",
          "940GZZLUWOP",
          "940GZZLUWFN",
          "940GZZLUFYC"
        ]
      },
      {
        "id": 9,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3,
          4
        ],
        "previousBranchIds": [
          1,
          2
        ],
        "stationIds": [
          "940GZZLUFYC",
          "940GZZLUEFY",
          "940GZZLUHGT",
          "940GZZLUACY",
          "940GZZLUTFP",
          "940GZZLUKSH",
          "940GZZLUCTN"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5
        ],
        "previousBranchIds": [
          9,
          0
        ],
        "stationIds": [
          "940GZZLUCTN",
          "940GZZLUMTC",
          "940GZZLUEUS"
        ]
      },
      {
        "id": 5,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          7,
          8
        ],
        "previousBranchIds": [
          3
        ],
        "stationIds": [
          "940GZZLUEUS",
          "940GZZLUWRR",
          "940GZZLUGDG",
          "940GZZLUTCR",
          "940GZZLULSQ",
          "940GZZLUCHX",
          "940GZZLUEMB",
          "940GZZLUWLO",
          "940GZZLUKNG"
        ]
      },
      {
        "id": 8,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          5,
          6
        ],
        "stationIds": [
          "940GZZLUKNG",
          "940GZZLUOVL",
          "940GZZLUSKW",
          "940GZZLUCPN",
          "940GZZLUCPC",
          "940GZZLUCPS",
          "940GZZLUBLM",
          "940GZZLUTBC",
          "940GZZLUTBY",
          "940GZZLUCSD",
          "940GZZLUSWN",
          "940GZZLUMDN"
        ]
      },
      {
        "id": 4,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          6
        ],
        "previousBranchIds": [
          9,
          0
        ],
        "stationIds": [
          "940GZZLUCTN",
          "940GZZLUEUS"
        ]
      },
      {
        "id": 6,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          8
        ],
        "previousBranchIds": [
          4
        ],
        "stationIds": [
          "940GZZLUEUS",
          "940GZZLUKSX",
          "940GZZLUAGL",
          "940GZZLUODS",
          "940GZZLUMGT",
          "940GZZLUBNK",
          "940GZZLULNB",
          "940GZZLUBOR",
          "940GZZLUEAC",
          "940GZZLUKNG"
        ]
      },
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3,
          4
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUEGW",
          "940GZZLUBTK",
          "940GZZLUCND",
          "940GZZLUHCL",
          "940GZZLUBTX",
          "940GZZLUGGN",
          "940GZZLUHTD",
          "940GZZLUBZP",
          "940GZZLUCFM",
          "940GZZLUCTN"
        ]
      },
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          9
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUMHL",
          "940GZZLUFYC"
        ]
      },
      {
        "id": 7,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          5
        ],
        "stationIds": [
          "940GZZLUKNG",
          "940GZZNEUGST",
          "940GZZBPSUST"
        ]
      },
      {
        "id": 11,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          12,
          13
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUMDN",
          "940GZZLUSWN",
          "940GZZLUCSD",
          "940GZZLUTBY",
          "940GZZLUTBC",
          "940GZZLUBLM",
          "940GZZLUCPS",
          "940GZZLUCPC",
          "940GZZLUCPN",
          "940GZZLUSKW",
          "940GZZLUOVL",
          "940GZZLUKNG"
        ]
      },
      {
        "id": 12,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          14
        ],
        "previousBranchIds": [
          11,
          10
        ],
        "stationIds": [
          "940GZZLUKNG",
          "940GZZLUWLO",
          "940GZZLUEMB",
          "940GZZLUCHX",
          "940GZZLULSQ",
          "940GZZLUTCR",
          "940GZZLUGDG",
          "940GZZLUWRR",
          "940GZZLUEUS"
        ]
      },
      {
        "id": 14,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          16,
          17
        ],
        "previousBranchIds": [
          12
        ],
        "stationIds": [
          "940GZZLUEUS",
          "940GZZLUMTC",
          "940GZZLUCTN"
        ]
      },
      {
        "id": 17,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          18,
          19
        ],
        "previousBranchIds": [
          14,
          15
        ],
        "stationIds": [
          "940GZZLUCTN",
          "940GZZLUKSH",
          "940GZZLUTFP",
          "940GZZLUACY",
          "940GZZLUHGT",
          "940GZZLUEFY",
          "940GZZLUFYC"
        ]
      },
      {
        "id": 18,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          17
        ],
        "stationIds": [
          "940GZZLUFYC",
          "940GZZLUWFN",
          "940GZZLUWOP",
          "940GZZLUTAW",
          "940GZZLUHBT"
        ]
      },
      {
        "id": 13,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          15
        ],
        "previousBranchIds": [
          11
        ],
        "stationIds": [
          "940GZZLUKNG",
          "940GZZLUEAC",
          "940GZZLUBOR",
          "940GZZLULNB",
          "940GZZLUBNK",
          "940GZZLUMGT",
          "940GZZLUODS",
          "940GZZLUAGL",
          "940GZZLUKSX",
          "940GZZLUEUS"
        ]
      },
      {
        "id": 15,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          17,
          16
        ],
        "previousBranchIds": [
          13
        ],
        "stationIds": [
          "940GZZLUEUS",
          "940GZZLUCTN"
        ]
      },
      {
        "id": 16,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          14,
          15
        ],
        "stationIds": [
          "940GZZLUCTN",
          "940GZZLUCFM",
          "940GZZLUBZP",
          "940GZZLUHTD",
          "940GZZLUGGN",
          "940GZZLUBTX",
          "940GZZLUHCL",
          "940GZZLUCND",
          "940GZZLUBTK",
          "940GZZLUEGW"
        ]
      },
      {
        "id": 19,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          17
        ],
        "stationIds": [
          "940GZZLUFYC",
          "940GZZLUMHL"
        ]
      },
      {
        "id": 10,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          12
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZBPSUST",
          "940GZZNEUGST",
          "940GZZLUKNG"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Edgware  &harr;  Morden  via Bank",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUEGW",
          "940GZZLUBTK",
          "940GZZLUCND",
          "940GZZLUHCL",
          "940GZZLUBTX",
          "940GZZLUGGN",
          "940GZZLUHTD",
          "940GZZLUBZP",
          "940GZZLUCFM",
          "940GZZLUCTN",
          "940GZZLUEUS",
          "940GZZLUKSX",
          "940GZZLUAGL",
          "940GZZLUODS",
          "940GZZLUMGT",
          "940GZZLUBNK",
          "940GZZLULNB",
          "940GZZLUBOR",
          "940GZZLUEAC",
          "940GZZLUKNG",
          "940GZZLUOVL",
          "940GZZLUSKW",
          "940GZZLUCPN",
          "940GZZLUCPC",
          "940GZZLUCPS",
          "940GZZLUBLM",
          "940GZZLUTBC",
          "940GZZLUTBY",
          "940GZZLUCSD",
          "940GZZLUSWN",
          "940GZZLUMDN"
        ]
      },
      {
        "name": "Edgware  &harr;  Battersea Power Station ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUEGW",
          "940GZZLUBTK",
          "940GZZLUCND",
          "940GZZLUHCL",
          "940GZZLUBTX",
          "940GZZLUGGN",
          "940GZZLUHTD",
          "940GZZLUBZP",
          "940GZZLUCFM",
          "940GZZLUCTN",
          "940GZZLUMTC",
          "940GZZLUEUS",
          "940GZZLUWRR",
          "940GZZLUGDG",
          "940GZZLUTCR",
          "940GZZLULSQ",
          "940GZZLUCHX",
          "940GZZLUEMB",
          "940GZZLUWLO",
          "940GZZLUKNG",
          "940GZZNEUGST",
          "940GZZBPSUST"
        ]
      },
      {
        "name": "Edgware  &harr;  Morden  via Charing Cross",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUEGW",
          "940GZZLUBTK",
          "940GZZLUCND",
          "940GZZLUHCL",
          "940GZZLUBTX",
          "940GZZLUGGN",
          "940GZZLUHTD",
          "940GZZLUBZP",
          "940GZZLUCFM",
          "940GZZLUCTN",
          "940GZZLUMTC",
          "940GZZLUEUS",
          "940GZZLUWRR",
          "940GZZLUGDG",
          "940GZZLUTCR",
          "940GZZLULSQ",
          "940GZZLUCHX",
          "940GZZLUEMB",
          "940GZZLUWLO",
          "940GZZLUKNG",
          "940GZZLUOVL",
          "940GZZLUSKW",
          "940GZZLUCPN",
          "940GZZLUCPC",
          "940GZZLUCPS",
          "940GZZLUBLM",
          "940GZZLUTBC",
          "940GZZLUTBY",
          "940GZZLUCSD",
          "940GZZLUSWN",
          "940GZZLUMDN"
        ]
      },
      {
        "name": "High Barnet  &harr;  Morden  via Bank",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHBT",
          "940GZZLUTAW",
          "940GZZLUWOP",
          "940GZZLUWFN",
          "940GZZLUFYC",
          "940GZZLUEFY",
          "940GZZLUHGT",
          "940GZZLUACY",
          "940GZZLUTFP",
          "940GZZLUKSH",
          "940GZZLUCTN",
          "940GZZLUEUS",
          "940GZZLUKSX",
          "940GZZLUAGL",
          "940GZZLUODS",
          "940GZZLUMGT",
          "940GZZLUBNK",
          "940GZZLULNB",
          "940GZZLUBOR",
          "940GZZLUEAC",
          "940GZZLUKNG",
          "940GZZLUOVL",
          "940GZZLUSKW",
          "940GZZLUCPN",
          "940GZZLUCPC",
          "940GZZLUCPS",
          "940GZZLUBLM",
          "940GZZLUTBC",
          "940GZZLUTBY",
          "940GZZLUCSD",
          "940GZZLUSWN",
          "940GZZLUMDN"
        ]
      },
      {
        "name": "High Barnet  &harr;  Battersea Power Station ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHBT",
          "940GZZLUTAW",
          "940GZZLUWOP",
          "940GZZLUWFN",
          "940GZZLUFYC",
          "940GZZLUEFY",
          "940GZZLUHGT",
          "940GZZLUACY",
          "940GZZLUTFP",
          "940GZZLUKSH",
          "940GZZLUCTN",
          "940GZZLUMTC",
          "940GZZLUEUS",
          "940GZZLUWRR",
          "940GZZLUGDG",
          "940GZZLUTCR",
          "940GZZLULSQ",
          "940GZZLUCHX",
          "940GZZLUEMB",
          "940GZZLUWLO",
          "940GZZLUKNG",
          "940GZZNEUGST",
          "940GZZBPSUST"
        ]
      },
      {
        "name": "High Barnet  &harr;  Morden  via Charing Cross",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHBT",
          "940GZZLUTAW",
          "940GZZLUWOP",
          "940GZZLUWFN",
          "940GZZLUFYC",
          "940GZZLUEFY",
          "940GZZLUHGT",
          "940GZZLUACY",
          "940GZZLUTFP",
          "940GZZLUKSH",
          "940GZZLUCTN",
          "940GZZLUMTC",
          "940GZZLUEUS",
          "940GZZLUWRR",
          "940GZZLUGDG",
          "940GZZLUTCR",
          "940GZZLULSQ",
          "940GZZLUCHX",
          "940GZZLUEMB",
          "940GZZLUWLO",
          "940GZZLUKNG",
          "940GZZLUOVL",
          "940GZZLUSKW",
          "940GZZLUCPN",
          "940GZZLUCPC",
          "940GZZLUCPS",
          "940GZZLUBLM",
          "940GZZLUTBC",
          "940GZZLUTBY",
          "940GZZLUCSD",
          "940GZZLUSWN",
          "940GZZLUMDN"
        ]
      },
      {
        "name": "Mill Hill East  &harr;  Morden  via Bank",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUMHL",
          "940GZZLUFYC",
          "940GZZLUEFY",
          "940GZZLUHGT",
          "940GZZLUACY",
          "940GZZLUTFP",
          "940GZZLUKSH",
          "940GZZLUCTN",
          "940GZZLUEUS",
          "940GZZLUKSX",
          "940GZZLUAGL",
          "940GZZLUODS",
          "940GZZLUMGT",
          "940GZZLUBNK",
          "940GZZLULNB",
          "940GZZLUBOR",
          "940GZZLUEAC",
          "940GZZLUKNG",
          "940GZZLUOVL",
          "940GZZLUSKW",
          "940GZZLUCPN",
          "940GZZLUCPC",
          "940GZZLUCPS",
          "940GZZLUBLM",
          "940GZZLUTBC",
          "940GZZLUTBY",
          "940GZZLUCSD",
          "940GZZLUSWN",
          "940GZZLUMDN"
        ]
      },
      {
        "name": "Mill Hill East  &harr;  Morden  via Charing Cross",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUMHL",
          "940GZZLUFYC",
          "940GZZLUEFY",
          "940GZZLUHGT",
          "940GZZLUACY",
          "940GZZLUTFP",
          "940GZZLUKSH",
          "940GZZLUCTN",
          "940GZZLUMTC",
          "940GZZLUEUS",
          "940GZZLUWRR",
          "940GZZLUGDG",
          "940GZZLUTCR",
          "940GZZLULSQ",
          "940GZZLUCHX",
          "940GZZLUEMB",
          "940GZZLUWLO",
          "940GZZLUKNG",
          "940GZZLUOVL",
          "940GZZLUSKW",
          "940GZZLUCPN",
          "940GZZLUCPC",
          "940GZZLUCPS",
          "940GZZLUBLM",
          "940GZZLUTBC",
          "940GZZLUTBY",
          "940GZZLUCSD",
          "940GZZLUSWN",
          "940GZZLUMDN"
        ]
      },
      {
        "name": "Battersea Power Station  &harr;  Edgware ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZBPSUST",
          "940GZZNEUGST",
          "940GZZLUKNG",
          "940GZZLUWLO",
          "940GZZLUEMB",
          "940GZZLUCHX",
          "940GZZLULSQ",
          "940GZZLUTCR",
          "940GZZLUGDG",
          "940GZZLUWRR",
          "940GZZLUEUS",
          "940GZZLUMTC",
          "940GZZLUCTN",
          "940GZZLUCFM",
          "940GZZLUBZP",
          "940GZZLUHTD",
          "940GZZLUGGN",
          "940GZZLUBTX",
          "940GZZLUHCL",
          "940GZZLUCND",
          "940GZZLUBTK",
          "940GZZLUEGW"
        ]
      },
      {
        "name": "Battersea Power Station  &harr;  High Barnet ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZBPSUST",
          "940GZZNEUGST",
          "940GZZLUKNG",
          "940GZZLUWLO",
          "940GZZLUEMB",
          "940GZZLUCHX",
          "940GZZLULSQ",
          "940GZZLUTCR",
          "940GZZLUGDG",
          "940GZZLUWRR",
          "940GZZLUEUS",
          "940GZZLUMTC",
          "940GZZLUCTN",
          "940GZZLUKSH",
          "940GZZLUTFP",
          "940GZZLUACY",
          "940GZZLUHGT",
          "940GZZLUEFY",
          "940GZZLUFYC",
          "940GZZLUWFN",
          "940GZZLUWOP",
          "940GZZLUTAW",
          "940GZZLUHBT"
        ]
      },
      {
        "name": "Morden  &harr;  Edgware  via Bank",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUMDN",
          "940GZZLUSWN",
          "940GZZLUCSD",
          "940GZZLUTBY",
          "940GZZLUTBC",
          "940GZZLUBLM",
          "940GZZLUCPS",
          "940GZZLUCPC",
          "940GZZLUCPN",
          "940GZZLUSKW",
          "940GZZLUOVL",
          "940GZZLUKNG",
          "940GZZLUEAC",
          "940GZZLUBOR",
          "940GZZLULNB",
          "940GZZLUBNK",
          "940GZZLUMGT",
          "940GZZLUODS",
          "940GZZLUAGL",
          "940GZZLUKSX",
          "940GZZLUEUS",
          "940GZZLUCTN",
          "940GZZLUCFM",
          "940GZZLUBZP",
          "940GZZLUHTD",
          "940GZZLUGGN",
          "940GZZLUBTX",
          "940GZZLUHCL",
          "940GZZLUCND",
          "940GZZLUBTK",
          "940GZZLUEGW"
        ]
      },
      {
        "name": "Morden  &harr;  Mill Hill East  via Bank",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUMDN",
          "940GZZLUSWN",
          "940GZZLUCSD",
          "940GZZLUTBY",
          "940GZZLUTBC",
          "940GZZLUBLM",
          "940GZZLUCPS",
          "940GZZLUCPC",
          "940GZZLUCPN",
          "940GZZLUSKW",
          "940GZZLUOVL",
          "940GZZLUKNG",
          "940GZZLUEAC",
          "940GZZLUBOR",
          "940GZZLULNB",
          "940GZZLUBNK",
          "940GZZLUMGT",
          "940GZZLUODS",
          "940GZZLUAGL",
          "940GZZLUKSX",
          "940GZZLUEUS",
          "940GZZLUCTN",
          "940GZZLUKSH",
          "940GZZLUTFP",
          "940GZZLUACY",
          "940GZZLUHGT",
          "940GZZLUEFY",
          "940GZZLUFYC",
          "940GZZLUMHL"
        ]
      },
      {
        "name": "Morden  &harr;  High Barnet  via Bank",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUMDN",
          "940GZZLUSWN",
          "940GZZLUCSD",
          "940GZZLUTBY",
          "940GZZLUTBC",
          "940GZZLUBLM",
          "940GZZLUCPS",
          "940GZZLUCPC",
          "940GZZLUCPN",
          "940GZZLUSKW",
          "940GZZLUOVL",
          "940GZZLUKNG",
          "940GZZLUEAC",
          "940GZZLUBOR",
          "940GZZLULNB",
          "940GZZLUBNK",
          "940GZZLUMGT",
          "940GZZLUODS",
          "940GZZLUAGL",
          "940GZZLUKSX",
          "940GZZLUEUS",
          "940GZZLUCTN",
          "940GZZLUKSH",
          "940GZZLUTFP",
          "940GZZLUACY",
          "940GZZLUHGT",
          "940GZZLUEFY",
          "940GZZLUFYC",
          "940GZZLUWFN",
          "940GZZLUWOP",
          "940GZZLUTAW",
          "940GZZLUHBT"
        ]
      },
      {
        "name": "Morden  &harr;  Edgware  via Charing Cross",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUMDN",
          "940GZZLUSWN",
          "940GZZLUCSD",
          "940GZZLUTBY",
          "940GZZLUTBC",
          "940GZZLUBLM",
          "940GZZLUCPS",
          "940GZZLUCPC",
          "940GZZLUCPN",
          "940GZZLUSKW",
          "940GZZLUOVL",
          "940GZZLUKNG",
          "940GZZLUWLO",
          "940GZZLUEMB",
          "940GZZLUCHX",
          "940GZZLULSQ",
          "940GZZLUTCR",
          "940GZZLUGDG",
          "940GZZLUWRR",
          "940GZZLUEUS",
          "940GZZLUMTC",
          "940GZZLUCTN",
          "940GZZLUCFM",
          "940GZZLUBZP",
          "940GZZLUHTD",
          "940GZZLUGGN",
          "940GZZLUBTX",
          "940GZZLUHCL",
          "940GZZLUCND",
          "940GZZLUBTK",
          "940GZZLUEGW"
        ]
      },
      {
        "name": "Morden  &harr;  Mill Hill East  via Charing Cross",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUMDN",
          "940GZZLUSWN",
          "940GZZLUCSD",
          "940GZZLUTBY",
          "940GZZLUTBC",
          "940GZZLUBLM",
          "940GZZLUCPS",
          "940GZZLUCPC",
          "940GZZLUCPN",
          "940GZZLUSKW",
          "940GZZLUOVL",
          "940GZZLUKNG",
          "940GZZLUWLO",
          "940GZZLUEMB",
          "940GZZLUCHX",
          "940GZZLULSQ",
          "940GZZLUTCR",
          "940GZZLUGDG",
          "940GZZLUWRR",
          "940GZZLUEUS",
          "940GZZLUMTC",
          "940GZZLUCTN",
          "940GZZLUKSH",
          "940GZZLUTFP",
          "940GZZLUACY",
          "940GZZLUHGT",
          "940GZZLUEFY",
          "940GZZLUFYC",
          "940GZZLUMHL"
        ]
      },
      {
        "name": "Morden  &harr;  High Barnet  via Charing Cross",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUMDN",
          "940GZZLUSWN",
          "940GZZLUCSD",
          "940GZZLUTBY",
          "940GZZLUTBC",
          "940GZZLUBLM",
          "940GZZLUCPS",
          "940GZZLUCPC",
          "940GZZLUCPN",
          "940GZZLUSKW",
          "940GZZLUOVL",
          "940GZZLUKNG",
          "940GZZLUWLO",
          "940GZZLUEMB",
          "940GZZLUCHX",
          "940GZZLULSQ",
          "940GZZLUTCR",
          "940GZZLUGDG",
          "940GZZLUWRR",
          "940GZZLUEUS",
          "940GZZLUMTC",
          "940GZZLUCTN",
          "940GZZLUKSH",
          "940GZZLUTFP",
          "940GZZLUACY",
          "940GZZLUHGT",
          "940GZZLUEFY",
          "940GZZLUFYC",
          "940GZZLUWFN",
          "940GZZLUWOP",
          "940GZZLUTAW",
          "940GZZLUHBT"
        ]
      }
    ]
  },
  "piccadilly": {
    "lineId": "piccadilly",
    "lineName": "Piccadilly",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUACT",
        "name": "Acton Town Underground Station"
      },
      {
        "id": "940GZZLUALP",
        "name": "Alperton Underground Station"
      },
      {
        "id": "940GZZLUASG",
        "name": "Arnos Grove Underground Station"
      },
      {
        "id": "940GZZLUASL",
        "name": "Arsenal Underground Station"
      },
      {
        "id": "940GZZLUBSC",
        "name": "Barons Court Underground Station"
      },
      {
        "id": "940GZZLUBOS",
        "name": "Boston Manor Underground Station"
      },
      {
        "id": "940GZZLUBDS",
        "name": "Bounds Green Underground Station"
      },
      {
        "id": "940GZZLUCAR",
        "name": "Caledonian Road Underground Station"
      },
      {
        "id": "940GZZLUCKS",
        "name": "Cockfosters Underground Station"
      },
      {
        "id": "940GZZLUCGN",
        "name": "Covent Garden Underground Station"
      },
      {
        "id": "940GZZLUECM",
        "name": "Ealing Common Underground Station"
      },
      {
        "id": "940GZZLUECT",
        "name": "Earl's Court Underground Station"
      },
      {
        "id": "940GZZLUEAE",
        "name": "Eastcote Underground Station"
      },
      {
        "id": "940GZZLUFPK",
        "name": "Finsbury Park Underground Station"
      },
      {
        "id": "940GZZLUGTR",
        "name": "Gloucester Road Underground Station"
      },
      {
        "id": "940GZZLUGPK",
        "name": "Green Park Underground Station"
      },
      {
        "id": "940GZZLUHSD",
        "name": "Hammersmith (Dist&Picc Line) Underground Station"
      },
      {
        "id": "940GZZLUHNX",
        "name": "Hatton Cross Underground Station"
      },
      {
        "id": "940GZZLUHR4",
        "name": "Heathrow Terminal 4 Underground Station"
      },
      {
        "id": "940GZZLUHR5",
        "name": "Heathrow Terminal 5 Underground Station"
      },
      {
        "id": "940GZZLUHRC",
        "name": "Heathrow Terminals 2 & 3 Underground Station"
      },
      {
        "id": "940GZZLUHGD",
        "name": "Hillingdon Underground Station"
      },
      {
        "id": "940GZZLUHBN",
        "name": "Holborn Underground Station"
      },
      {
        "id": "940GZZLUHWY",
        "name": "Holloway Road Underground Station"
      },
      {
        "id": "940GZZLUHWC",
        "name": "Hounslow Central Underground Station"
      },
      {
        "id": "940GZZLUHWE",
        "name": "Hounslow East Underground Station"
      },
      {
        "id": "940GZZLUHWT",
        "name": "Hounslow West Underground Station"
      },
      {
        "id": "940GZZLUHPC",
        "name": "Hyde Park Corner Underground Station"
      },
      {
        "id": "940GZZLUICK",
        "name": "Ickenham Underground Station"
      },
      {
        "id": "940GZZLUKSX",
        "name": "King's Cross St. Pancras Underground Station"
      },
      {
        "id": "940GZZLUKNB",
        "name": "Knightsbridge Underground Station"
      },
      {
        "id": "940GZZLULSQ",
        "name": "Leicester Square Underground Station"
      },
      {
        "id": "940GZZLUMRH",
        "name": "Manor House Underground Station"
      },
      {
        "id": "940GZZLUNEN",
        "name": "North Ealing Underground Station"
      },
      {
        "id": "940GZZLUNFD",
        "name": "Northfields Underground Station"
      },
      {
        "id": "940GZZLUOAK",
        "name": "Oakwood Underground Station"
      },
      {
        "id": "940GZZLUOSY",
        "name": "Osterley Underground Station"
      },
      {
        "id": "940GZZLUPKR",
        "name": "Park Royal Underground Station"
      },
      {
        "id": "940GZZLUPCC",
        "name": "Piccadilly Circus Underground Station"
      },
      {
        "id": "940GZZLURYL",
        "name": "Rayners Lane Underground Station"
      },
      {
        "id": "940GZZLURSM",
        "name": "Ruislip Manor Underground Station"
      },
      {
        "id": "940GZZLURSP",
        "name": "Ruislip Underground Station"
      },
      {
        "id": "940GZZLURSQ",
        "name": "Russell Square Underground Station"
      },
      {
        "id": "940GZZLUSEA",
        "name": "South Ealing Underground Station"
      },
      {
        "id": "940GZZLUSHH",
        "name": "South Harrow Underground Station"
      },
      {
        "id": "940GZZLUSKS",
        "name": "South Kensington Underground Station"
      },
      {
        "id": "940GZZLUSGT",
        "name": "Southgate Underground Station"
      },
      {
        "id": "940GZZLUSUH",
        "name": "Sudbury Hill Underground Station"
      },
      {
        "id": "940GZZLUSUT",
        "name": "Sudbury Town Underground Station"
      },
      {
        "id": "940GZZLUTNG",
        "name": "Turnham Green Underground Station"
      },
      {
        "id": "940GZZLUTPN",
        "name": "Turnpike Lane Underground Station"
      },
      {
        "id": "940GZZLUUXB",
        "name": "Uxbridge Underground Station"
      },
      {
        "id": "940GZZLUWOG",
        "name": "Wood Green Underground Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          1,
          2
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUCKS",
          "940GZZLUOAK",
          "940GZZLUSGT",
          "940GZZLUASG",
          "940GZZLUBDS",
          "940GZZLUWOG",
          "940GZZLUTPN",
          "940GZZLUMRH",
          "940GZZLUFPK",
          "940GZZLUASL",
          "940GZZLUHWY",
          "940GZZLUCAR",
          "940GZZLUKSX",
          "940GZZLURSQ",
          "940GZZLUHBN",
          "940GZZLUCGN",
          "940GZZLULSQ",
          "940GZZLUPCC",
          "940GZZLUGPK",
          "940GZZLUHPC",
          "940GZZLUKNB",
          "940GZZLUSKS",
          "940GZZLUGTR",
          "940GZZLUECT",
          "940GZZLUBSC",
          "940GZZLUHSD",
          "940GZZLUTNG",
          "940GZZLUACT"
        ]
      },
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          0
        ],
        "stationIds": [
          "940GZZLUACT",
          "940GZZLUECM",
          "940GZZLUNEN",
          "940GZZLUPKR",
          "940GZZLUALP",
          "940GZZLUSUT",
          "940GZZLUSUH",
          "940GZZLUSHH",
          "940GZZLURYL",
          "940GZZLUEAE",
          "940GZZLURSM",
          "940GZZLURSP",
          "940GZZLUICK",
          "940GZZLUHGD",
          "940GZZLUUXB"
        ]
      },
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3,
          4
        ],
        "previousBranchIds": [
          0
        ],
        "stationIds": [
          "940GZZLUACT",
          "940GZZLUSEA",
          "940GZZLUNFD",
          "940GZZLUBOS",
          "940GZZLUOSY",
          "940GZZLUHWE",
          "940GZZLUHWC",
          "940GZZLUHWT",
          "940GZZLUHNX"
        ]
      },
      {
        "id": 4,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          2
        ],
        "stationIds": [
          "940GZZLUHNX",
          "940GZZLUHRC",
          "940GZZLUHR5"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          2
        ],
        "stationIds": [
          "940GZZLUHNX",
          "940GZZLUHR4"
        ]
      },
      {
        "id": 5,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          8
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUUXB",
          "940GZZLUHGD",
          "940GZZLUICK",
          "940GZZLURSP",
          "940GZZLURSM",
          "940GZZLUEAE",
          "940GZZLURYL",
          "940GZZLUSHH",
          "940GZZLUSUH",
          "940GZZLUSUT",
          "940GZZLUALP",
          "940GZZLUPKR",
          "940GZZLUNEN",
          "940GZZLUECM",
          "940GZZLUACT"
        ]
      },
      {
        "id": 8,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          5,
          9
        ],
        "stationIds": [
          "940GZZLUACT",
          "940GZZLUTNG",
          "940GZZLUHSD",
          "940GZZLUBSC",
          "940GZZLUECT",
          "940GZZLUGTR",
          "940GZZLUSKS",
          "940GZZLUKNB",
          "940GZZLUHPC",
          "940GZZLUGPK",
          "940GZZLUPCC",
          "940GZZLULSQ",
          "940GZZLUCGN",
          "940GZZLUHBN",
          "940GZZLURSQ",
          "940GZZLUKSX",
          "940GZZLUCAR",
          "940GZZLUHWY",
          "940GZZLUASL",
          "940GZZLUFPK",
          "940GZZLUMRH",
          "940GZZLUTPN",
          "940GZZLUWOG",
          "940GZZLUBDS",
          "940GZZLUASG",
          "940GZZLUSGT",
          "940GZZLUOAK",
          "940GZZLUCKS"
        ]
      },
      {
        "id": 6,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          9
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUHR4",
          "940GZZLUHRC"
        ]
      },
      {
        "id": 9,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          8
        ],
        "previousBranchIds": [
          6,
          7
        ],
        "stationIds": [
          "940GZZLUHRC",
          "940GZZLUHNX",
          "940GZZLUHWT",
          "940GZZLUHWC",
          "940GZZLUHWE",
          "940GZZLUOSY",
          "940GZZLUBOS",
          "940GZZLUNFD",
          "940GZZLUSEA",
          "940GZZLUACT"
        ]
      },
      {
        "id": 7,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          9
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUHR5",
          "940GZZLUHRC"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Cockfosters  &harr;  Uxbridge ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUCKS",
          "940GZZLUOAK",
          "940GZZLUSGT",
          "940GZZLUASG",
          "940GZZLUBDS",
          "940GZZLUWOG",
          "940GZZLUTPN",
          "940GZZLUMRH",
          "940GZZLUFPK",
          "940GZZLUASL",
          "940GZZLUHWY",
          "940GZZLUCAR",
          "940GZZLUKSX",
          "940GZZLURSQ",
          "940GZZLUHBN",
          "940GZZLUCGN",
          "940GZZLULSQ",
          "940GZZLUPCC",
          "940GZZLUGPK",
          "940GZZLUHPC",
          "940GZZLUKNB",
          "940GZZLUSKS",
          "940GZZLUGTR",
          "940GZZLUECT",
          "940GZZLUBSC",
          "940GZZLUHSD",
          "940GZZLUTNG",
          "940GZZLUACT",
          "940GZZLUECM",
          "940GZZLUNEN",
          "940GZZLUPKR",
          "940GZZLUALP",
          "940GZZLUSUT",
          "940GZZLUSUH",
          "940GZZLUSHH",
          "940GZZLURYL",
          "940GZZLUEAE",
          "940GZZLURSM",
          "940GZZLURSP",
          "940GZZLUICK",
          "940GZZLUHGD",
          "940GZZLUUXB"
        ]
      },
      {
        "name": "Cockfosters  &harr;  Heathrow Terminal 4 ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUCKS",
          "940GZZLUOAK",
          "940GZZLUSGT",
          "940GZZLUASG",
          "940GZZLUBDS",
          "940GZZLUWOG",
          "940GZZLUTPN",
          "940GZZLUMRH",
          "940GZZLUFPK",
          "940GZZLUASL",
          "940GZZLUHWY",
          "940GZZLUCAR",
          "940GZZLUKSX",
          "940GZZLURSQ",
          "940GZZLUHBN",
          "940GZZLUCGN",
          "940GZZLULSQ",
          "940GZZLUPCC",
          "940GZZLUGPK",
          "940GZZLUHPC",
          "940GZZLUKNB",
          "940GZZLUSKS",
          "940GZZLUGTR",
          "940GZZLUECT",
          "940GZZLUBSC",
          "940GZZLUHSD",
          "940GZZLUTNG",
          "940GZZLUACT",
          "940GZZLUSEA",
          "940GZZLUNFD",
          "940GZZLUBOS",
          "940GZZLUOSY",
          "940GZZLUHWE",
          "940GZZLUHWC",
          "940GZZLUHWT",
          "940GZZLUHNX",
          "940GZZLUHR4"
        ]
      },
      {
        "name": "Cockfosters  &harr;  Heathrow Terminal 5 ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUCKS",
          "940GZZLUOAK",
          "940GZZLUSGT",
          "940GZZLUASG",
          "940GZZLUBDS",
          "940GZZLUWOG",
          "940GZZLUTPN",
          "940GZZLUMRH",
          "940GZZLUFPK",
          "940GZZLUASL",
          "940GZZLUHWY",
          "940GZZLUCAR",
          "940GZZLUKSX",
          "940GZZLURSQ",
          "940GZZLUHBN",
          "940GZZLUCGN",
          "940GZZLULSQ",
          "940GZZLUPCC",
          "940GZZLUGPK",
          "940GZZLUHPC",
          "940GZZLUKNB",
          "940GZZLUSKS",
          "940GZZLUGTR",
          "940GZZLUECT",
          "940GZZLUBSC",
          "940GZZLUHSD",
          "940GZZLUTNG",
          "940GZZLUACT",
          "940GZZLUSEA",
          "940GZZLUNFD",
          "940GZZLUBOS",
          "940GZZLUOSY",
          "940GZZLUHWE",
          "940GZZLUHWC",
          "940GZZLUHWT",
          "940GZZLUHNX",
          "940GZZLUHRC",
          "940GZZLUHR5"
        ]
      },
      {
        "name": "Heathrow Terminal 4  &harr;  Cockfosters ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHR4",
          "940GZZLUHRC",
          "940GZZLUHNX",
          "940GZZLUHWT",
          "940GZZLUHWC",
          "940GZZLUHWE",
          "940GZZLUOSY",
          "940GZZLUBOS",
          "940GZZLUNFD",
          "940GZZLUSEA",
          "940GZZLUACT",
          "940GZZLUTNG",
          "940GZZLUHSD",
          "940GZZLUBSC",
          "940GZZLUECT",
          "940GZZLUGTR",
          "940GZZLUSKS",
          "940GZZLUKNB",
          "940GZZLUHPC",
          "940GZZLUGPK",
          "940GZZLUPCC",
          "940GZZLULSQ",
          "940GZZLUCGN",
          "940GZZLUHBN",
          "940GZZLURSQ",
          "940GZZLUKSX",
          "940GZZLUCAR",
          "940GZZLUHWY",
          "940GZZLUASL",
          "940GZZLUFPK",
          "940GZZLUMRH",
          "940GZZLUTPN",
          "940GZZLUWOG",
          "940GZZLUBDS",
          "940GZZLUASG",
          "940GZZLUSGT",
          "940GZZLUOAK",
          "940GZZLUCKS"
        ]
      },
      {
        "name": "Heathrow Terminal 5  &harr;  Cockfosters ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUHR5",
          "940GZZLUHRC",
          "940GZZLUHNX",
          "940GZZLUHWT",
          "940GZZLUHWC",
          "940GZZLUHWE",
          "940GZZLUOSY",
          "940GZZLUBOS",
          "940GZZLUNFD",
          "940GZZLUSEA",
          "940GZZLUACT",
          "940GZZLUTNG",
          "940GZZLUHSD",
          "940GZZLUBSC",
          "940GZZLUECT",
          "940GZZLUGTR",
          "940GZZLUSKS",
          "940GZZLUKNB",
          "940GZZLUHPC",
          "940GZZLUGPK",
          "940GZZLUPCC",
          "940GZZLULSQ",
          "940GZZLUCGN",
          "940GZZLUHBN",
          "940GZZLURSQ",
          "940GZZLUKSX",
          "940GZZLUCAR",
          "940GZZLUHWY",
          "940GZZLUASL",
          "940GZZLUFPK",
          "940GZZLUMRH",
          "940GZZLUTPN",
          "940GZZLUWOG",
          "940GZZLUBDS",
          "940GZZLUASG",
          "940GZZLUSGT",
          "940GZZLUOAK",
          "940GZZLUCKS"
        ]
      },
      {
        "name": "Uxbridge  &harr;  Cockfosters ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUUXB",
          "940GZZLUHGD",
          "940GZZLUICK",
          "940GZZLURSP",
          "940GZZLURSM",
          "940GZZLUEAE",
          "940GZZLURYL",
          "940GZZLUSHH",
          "940GZZLUSUH",
          "940GZZLUSUT",
          "940GZZLUALP",
          "940GZZLUPKR",
          "940GZZLUNEN",
          "940GZZLUECM",
          "940GZZLUACT",
          "940GZZLUTNG",
          "940GZZLUHSD",
          "940GZZLUBSC",
          "940GZZLUECT",
          "940GZZLUGTR",
          "940GZZLUSKS",
          "940GZZLUKNB",
          "940GZZLUHPC",
          "940GZZLUGPK",
          "940GZZLUPCC",
          "940GZZLULSQ",
          "940GZZLUCGN",
          "940GZZLUHBN",
          "940GZZLURSQ",
          "940GZZLUKSX",
          "940GZZLUCAR",
          "940GZZLUHWY",
          "940GZZLUASL",
          "940GZZLUFPK",
          "940GZZLUMRH",
          "940GZZLUTPN",
          "940GZZLUWOG",
          "940GZZLUBDS",
          "940GZZLUASG",
          "940GZZLUSGT",
          "940GZZLUOAK",
          "940GZZLUCKS"
        ]
      }
    ]
  },
  "rb1": {
    "lineId": "rb1",
    "lineName": "RB1",
    "modeName": "river-bus",
    "stations": [
      {
        "id": "930GSWK",
        "name": "Bankside Pier"
      },
      {
        "id": "930GBRVS",
        "name": "Barking Riverside Pier"
      },
      {
        "id": "930GBSP",
        "name": "Battersea Power Station Pier"
      },
      {
        "id": "930GBFR",
        "name": "Blackfriars Pier"
      },
      {
        "id": "930GCAW",
        "name": "Canary Wharf Pier"
      },
      {
        "id": "930GEMB",
        "name": "Embankment Pier"
      },
      {
        "id": "930GGLP",
        "name": "Greenland Surrey Quays Pier"
      },
      {
        "id": "930GGNW",
        "name": "Greenwich Pier"
      },
      {
        "id": "930GLBR",
        "name": "London Bridge City Pier"
      },
      {
        "id": "930GWMP",
        "name": "London Eye Waterloo Pier"
      },
      {
        "id": "930GMHT",
        "name": "Masthouse Terrace Pier"
      },
      {
        "id": "930GMBK",
        "name": "Millbank Pier"
      },
      {
        "id": "930GMIL",
        "name": "North Greenwich Pier"
      },
      {
        "id": "930GWRF",
        "name": "Royal Wharf Pier"
      },
      {
        "id": "930GTMP",
        "name": "Tower Pier"
      },
      {
        "id": "930GSGW",
        "name": "Vauxhall St George Wharf Pier"
      },
      {
        "id": "930GWMR",
        "name": "Westminster Pier"
      },
      {
        "id": "930GWAS",
        "name": "Woolwich Arsenal Pier"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          1,
          2
        ],
        "previousBranchIds": [],
        "stationIds": [
          "930GBRVS",
          "930GWAS",
          "930GWRF",
          "930GMIL",
          "930GGNW",
          "930GMHT",
          "930GGLP",
          "930GCAW",
          "930GTMP",
          "930GLBR",
          "930GSWK"
        ]
      },
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          6
        ],
        "previousBranchIds": [
          0
        ],
        "stationIds": [
          "930GSWK",
          "930GBFR",
          "930GEMB"
        ]
      },
      {
        "id": 6,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3,
          4,
          5
        ],
        "previousBranchIds": [
          1,
          2
        ],
        "stationIds": [
          "930GEMB",
          "930GWMR"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          7
        ],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "930GWMR",
          "930GMBK",
          "930GSGW"
        ]
      },
      {
        "id": 7,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          3
        ],
        "stationIds": [
          "930GSGW",
          "930GBSP"
        ]
      },
      {
        "id": 8,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          12,
          13
        ],
        "previousBranchIds": [],
        "stationIds": [
          "930GBSP",
          "930GSGW"
        ]
      },
      {
        "id": 12,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          14
        ],
        "previousBranchIds": [
          8
        ],
        "stationIds": [
          "930GSGW",
          "930GMBK",
          "930GWMR"
        ]
      },
      {
        "id": 14,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          16,
          17
        ],
        "previousBranchIds": [
          12,
          13
        ],
        "stationIds": [
          "930GWMR",
          "930GWMP",
          "930GEMB"
        ]
      },
      {
        "id": 19,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          10,
          11
        ],
        "previousBranchIds": [
          16,
          17
        ],
        "stationIds": [
          "930GSWK",
          "930GLBR",
          "930GTMP",
          "930GCAW",
          "930GGLP"
        ]
      },
      {
        "id": 10,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          18
        ],
        "previousBranchIds": [
          19
        ],
        "stationIds": [
          "930GGLP",
          "930GMHT",
          "930GGNW"
        ]
      },
      {
        "id": 18,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          10
        ],
        "stationIds": [
          "930GGNW",
          "930GMIL",
          "930GWRF",
          "930GWAS",
          "930GBRVS"
        ]
      },
      {
        "id": 17,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          19
        ],
        "previousBranchIds": [
          14,
          9
        ],
        "stationIds": [
          "930GEMB",
          "930GBFR",
          "930GSWK"
        ]
      },
      {
        "id": 9,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          17
        ],
        "previousBranchIds": [],
        "stationIds": [
          "930GBSP",
          "930GEMB"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Barking Riverside  &harr;  Battersea Power Station  via Bankside ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GBRVS",
          "930GWAS",
          "930GWRF",
          "930GMIL",
          "930GGNW",
          "930GMHT",
          "930GGLP",
          "930GCAW",
          "930GTMP",
          "930GLBR",
          "930GSWK",
          "930GBFR",
          "930GEMB",
          "930GWMR",
          "930GMBK",
          "930GSGW",
          "930GBSP"
        ]
      },
      {
        "name": "Battersea Power Station  &harr;  Barking Riverside  via Blackfriars ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GBSP",
          "930GEMB",
          "930GBFR",
          "930GSWK",
          "930GLBR",
          "930GTMP",
          "930GCAW",
          "930GGLP",
          "930GMHT",
          "930GGNW",
          "930GMIL",
          "930GWRF",
          "930GWAS",
          "930GBRVS"
        ]
      },
      {
        "name": "Battersea Power Station  &harr;  Barking Riverside  via Bankside ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GBSP",
          "930GSGW",
          "930GMBK",
          "930GWMR",
          "930GWMP",
          "930GEMB",
          "930GBFR",
          "930GSWK",
          "930GLBR",
          "930GTMP",
          "930GCAW",
          "930GGLP",
          "930GMHT",
          "930GGNW",
          "930GMIL",
          "930GWRF",
          "930GWAS",
          "930GBRVS"
        ]
      }
    ]
  },
  "rb4": {
    "lineId": "rb4",
    "lineName": "RB4",
    "modeName": "river-bus",
    "stations": [
      {
        "id": "930GCAW",
        "name": "Canary Wharf Pier"
      },
      {
        "id": "930GNEL",
        "name": "Rotherhithe Pier"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "930GCAW",
          "930GNEL"
        ]
      },
      {
        "id": 1,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "930GNEL",
          "930GCAW"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Canary Wharf  &harr;  Rotherhithe ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GCAW",
          "930GNEL"
        ]
      },
      {
        "name": "Rotherhithe  &harr;  Canary Wharf ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GNEL",
          "930GCAW"
        ]
      }
    ]
  },
  "rb6": {
    "lineId": "rb6",
    "lineName": "RB6",
    "modeName": "river-bus",
    "stations": [
      {
        "id": "930GSWK",
        "name": "Bankside Pier"
      },
      {
        "id": "930GBRVS",
        "name": "Barking Riverside Pier"
      },
      {
        "id": "930GBSP",
        "name": "Battersea Power Station Pier"
      },
      {
        "id": "930GBFR",
        "name": "Blackfriars Pier"
      },
      {
        "id": "930GBSE",
        "name": "Cadogan Pier"
      },
      {
        "id": "930GCAW",
        "name": "Canary Wharf Pier"
      },
      {
        "id": "930GCHP",
        "name": "Chelsea Harbour Pier"
      },
      {
        "id": "930GEMB",
        "name": "Embankment Pier"
      },
      {
        "id": "930GGLP",
        "name": "Greenland Surrey Quays Pier"
      },
      {
        "id": "930GGNW",
        "name": "Greenwich Pier"
      },
      {
        "id": "930GLBR",
        "name": "London Bridge City Pier"
      },
      {
        "id": "930GWMP",
        "name": "London Eye Waterloo Pier"
      },
      {
        "id": "930GMHT",
        "name": "Masthouse Terrace Pier"
      },
      {
        "id": "930GMBK",
        "name": "Millbank Pier"
      },
      {
        "id": "930GMIL",
        "name": "North Greenwich Pier"
      },
      {
        "id": "930GPUT",
        "name": "Putney Pier"
      },
      {
        "id": "930GWRF",
        "name": "Royal Wharf Pier"
      },
      {
        "id": "930GPLW",
        "name": "St Mary’s Wandsworth Pier"
      },
      {
        "id": "930GTMP",
        "name": "Tower Pier"
      },
      {
        "id": "930GSGW",
        "name": "Vauxhall St George Wharf Pier"
      },
      {
        "id": "930GWRQ",
        "name": "Wandsworth Riverside Quarter Pier"
      },
      {
        "id": "930GWMR",
        "name": "Westminster Pier"
      },
      {
        "id": "930GWAS",
        "name": "Woolwich Arsenal Pier"
      }
    ],
    "branches": [
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          2,
          3,
          4
        ],
        "previousBranchIds": [],
        "stationIds": [
          "930GBRVS",
          "930GWAS",
          "930GWRF",
          "930GMIL",
          "930GGNW"
        ]
      },
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          30
        ],
        "previousBranchIds": [
          1
        ],
        "stationIds": [
          "930GGNW",
          "930GMHT",
          "930GGLP"
        ]
      },
      {
        "id": 30,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5,
          6,
          7
        ],
        "previousBranchIds": [
          2,
          4
        ],
        "stationIds": [
          "930GGLP",
          "930GCAW"
        ]
      },
      {
        "id": 5,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          8,
          9
        ],
        "previousBranchIds": [
          30,
          3
        ],
        "stationIds": [
          "930GCAW",
          "930GTMP",
          "930GLBR"
        ]
      },
      {
        "id": 8,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11,
          12
        ],
        "previousBranchIds": [
          5
        ],
        "stationIds": [
          "930GLBR",
          "930GSWK"
        ]
      },
      {
        "id": 13,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          16,
          17,
          18
        ],
        "previousBranchIds": [
          11,
          29
        ],
        "stationIds": [
          "930GEMB",
          "930GWMR"
        ]
      },
      {
        "id": 16,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          19,
          20
        ],
        "previousBranchIds": [
          13
        ],
        "stationIds": [
          "930GWMR",
          "930GMBK"
        ]
      },
      {
        "id": 19,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          31
        ],
        "previousBranchIds": [
          16,
          15
        ],
        "stationIds": [
          "930GMBK",
          "930GSGW"
        ]
      },
      {
        "id": 31,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          21,
          22,
          23,
          24
        ],
        "previousBranchIds": [
          19,
          18,
          14
        ],
        "stationIds": [
          "930GSGW",
          "930GBSP"
        ]
      },
      {
        "id": 21,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          25,
          26
        ],
        "previousBranchIds": [
          31,
          20
        ],
        "stationIds": [
          "930GBSP",
          "930GBSE",
          "930GCHP"
        ]
      },
      {
        "id": 25,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          27,
          28
        ],
        "previousBranchIds": [
          21,
          22
        ],
        "stationIds": [
          "930GCHP",
          "930GPLW"
        ]
      },
      {
        "id": 27,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          32
        ],
        "previousBranchIds": [
          25
        ],
        "stationIds": [
          "930GPLW",
          "930GWRQ"
        ]
      },
      {
        "id": 32,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          27
        ],
        "stationIds": [
          "930GWRQ",
          "930GPUT"
        ]
      },
      {
        "id": 12,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          29
        ],
        "previousBranchIds": [
          8
        ],
        "stationIds": [
          "930GSWK",
          "930GBFR"
        ]
      },
      {
        "id": 29,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          13,
          14,
          15
        ],
        "previousBranchIds": [
          12,
          9,
          7
        ],
        "stationIds": [
          "930GBFR",
          "930GEMB"
        ]
      },
      {
        "id": 9,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          29
        ],
        "previousBranchIds": [
          5,
          6
        ],
        "stationIds": [
          "930GLBR",
          "930GBFR"
        ]
      },
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "930GBFR",
          "930GBSP"
        ]
      },
      {
        "id": 33,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          35,
          36
        ],
        "previousBranchIds": [],
        "stationIds": [
          "930GPUT",
          "930GWRQ"
        ]
      },
      {
        "id": 35,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          60
        ],
        "previousBranchIds": [
          33
        ],
        "stationIds": [
          "930GWRQ",
          "930GPLW"
        ]
      },
      {
        "id": 60,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          37,
          38
        ],
        "previousBranchIds": [
          35,
          34
        ],
        "stationIds": [
          "930GPLW",
          "930GCHP"
        ]
      },
      {
        "id": 37,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          39,
          41
        ],
        "previousBranchIds": [
          60,
          36
        ],
        "stationIds": [
          "930GCHP",
          "930GBSE",
          "930GBSP"
        ]
      },
      {
        "id": 39,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          42,
          43,
          44
        ],
        "previousBranchIds": [
          37,
          38
        ],
        "stationIds": [
          "930GBSP",
          "930GSGW"
        ]
      },
      {
        "id": 45,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          48,
          49
        ],
        "previousBranchIds": [
          42,
          55,
          53,
          54,
          40
        ],
        "stationIds": [
          "930GEMB",
          "930GBFR"
        ]
      },
      {
        "id": 56,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          58,
          59
        ],
        "previousBranchIds": [
          50,
          51
        ],
        "stationIds": [
          "930GCAW",
          "930GGLP"
        ]
      },
      {
        "id": 58,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          62
        ],
        "previousBranchIds": [
          56
        ],
        "stationIds": [
          "930GGLP",
          "930GMHT",
          "930GGNW"
        ]
      },
      {
        "id": 62,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          58
        ],
        "stationIds": [
          "930GGNW",
          "930GMIL",
          "930GWRF",
          "930GWAS",
          "930GBRVS"
        ]
      },
      {
        "id": 51,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          56,
          57
        ],
        "previousBranchIds": [
          48,
          61,
          47
        ],
        "stationIds": [
          "930GLBR",
          "930GTMP",
          "930GCAW"
        ]
      },
      {
        "id": 49,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          61
        ],
        "previousBranchIds": [
          45
        ],
        "stationIds": [
          "930GBFR",
          "930GSWK"
        ]
      },
      {
        "id": 61,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          51,
          50
        ],
        "previousBranchIds": [
          49,
          46
        ],
        "stationIds": [
          "930GSWK",
          "930GLBR"
        ]
      },
      {
        "id": 43,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          52,
          53
        ],
        "previousBranchIds": [
          39
        ],
        "stationIds": [
          "930GSGW",
          "930GMBK"
        ]
      },
      {
        "id": 52,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          54,
          55
        ],
        "previousBranchIds": [
          43,
          41
        ],
        "stationIds": [
          "930GMBK",
          "930GWMR"
        ]
      },
      {
        "id": 54,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          45,
          46
        ],
        "previousBranchIds": [
          52,
          44
        ],
        "stationIds": [
          "930GWMR",
          "930GWMP",
          "930GEMB"
        ]
      },
      {
        "id": 48,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          50,
          51
        ],
        "previousBranchIds": [
          45
        ],
        "stationIds": [
          "930GBFR",
          "930GLBR"
        ]
      },
      {
        "id": 38,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          39,
          40
        ],
        "previousBranchIds": [
          60
        ],
        "stationIds": [
          "930GCHP",
          "930GBSP"
        ]
      },
      {
        "id": 40,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          45,
          47
        ],
        "previousBranchIds": [
          38
        ],
        "stationIds": [
          "930GBSP",
          "930GEMB"
        ]
      },
      {
        "id": 47,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          51
        ],
        "previousBranchIds": [
          40
        ],
        "stationIds": [
          "930GEMB",
          "930GLBR"
        ]
      },
      {
        "id": 34,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          60
        ],
        "previousBranchIds": [],
        "stationIds": [
          "930GPUT",
          "930GPLW"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Barking Riverside  &harr;  Putney  via Bankside ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GBRVS",
          "930GWAS",
          "930GWRF",
          "930GMIL",
          "930GGNW",
          "930GMHT",
          "930GGLP",
          "930GCAW",
          "930GTMP",
          "930GLBR",
          "930GSWK",
          "930GBFR",
          "930GEMB",
          "930GWMR",
          "930GMBK",
          "930GSGW",
          "930GBSP",
          "930GBSE",
          "930GCHP",
          "930GPLW",
          "930GWRQ",
          "930GPUT"
        ]
      },
      {
        "name": "Barking Riverside  &harr;  Putney  via Blackfriars ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GBRVS",
          "930GWAS",
          "930GWRF",
          "930GMIL",
          "930GGNW",
          "930GMHT",
          "930GGLP",
          "930GCAW",
          "930GTMP",
          "930GLBR",
          "930GBFR",
          "930GEMB",
          "930GWMR",
          "930GMBK",
          "930GSGW",
          "930GBSP",
          "930GBSE",
          "930GCHP",
          "930GPLW",
          "930GWRQ",
          "930GPUT"
        ]
      },
      {
        "name": "Blackfriars  &harr;  Battersea Power Station ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GBFR",
          "930GBSP"
        ]
      },
      {
        "name": "Putney  &harr;  Barking Riverside  via Chelsea Harbour ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GPUT",
          "930GPLW",
          "930GCHP",
          "930GBSP",
          "930GEMB",
          "930GLBR",
          "930GTMP",
          "930GCAW",
          "930GGLP",
          "930GMHT",
          "930GGNW",
          "930GMIL",
          "930GWRF",
          "930GWAS",
          "930GBRVS"
        ]
      },
      {
        "name": "Putney  &harr;  Barking Riverside  via Bankside ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GPUT",
          "930GWRQ",
          "930GPLW",
          "930GCHP",
          "930GBSE",
          "930GBSP",
          "930GSGW",
          "930GMBK",
          "930GWMR",
          "930GWMP",
          "930GEMB",
          "930GBFR",
          "930GSWK",
          "930GLBR",
          "930GTMP",
          "930GCAW",
          "930GGLP",
          "930GMHT",
          "930GGNW",
          "930GMIL",
          "930GWRF",
          "930GWAS",
          "930GBRVS"
        ]
      },
      {
        "name": "Putney  &harr;  Barking Riverside  via Blackfriars ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GPUT",
          "930GWRQ",
          "930GPLW",
          "930GCHP",
          "930GBSE",
          "930GBSP",
          "930GSGW",
          "930GMBK",
          "930GWMR",
          "930GWMP",
          "930GEMB",
          "930GBFR",
          "930GLBR",
          "930GTMP",
          "930GCAW",
          "930GGLP",
          "930GMHT",
          "930GGNW",
          "930GMIL",
          "930GWRF",
          "930GWAS",
          "930GBRVS"
        ]
      }
    ]
  },
  "suffragette": {
    "lineId": "suffragette",
    "lineName": "Suffragette",
    "modeName": "overground",
    "stations": [
      {
        "id": "910GBARKING",
        "name": "Barking Rail Station"
      },
      {
        "id": "910GBARKRIV",
        "name": "Barking Riverside"
      },
      {
        "id": "910GBLCHSRD",
        "name": "Blackhorse Road Rail Station"
      },
      {
        "id": "910GCROUCHH",
        "name": "Crouch Hill Rail Station"
      },
      {
        "id": "910GGOSPLOK",
        "name": "Gospel Oak Rail Station"
      },
      {
        "id": "910GHRGYGL",
        "name": "Harringay Green Lanes Rail Station"
      },
      {
        "id": "910GLEYTNMR",
        "name": "Leyton Midland Road Rail Station"
      },
      {
        "id": "910GLYTNSHR",
        "name": "Leytonstone High Road Rail Station"
      },
      {
        "id": "910GSTOTNHM",
        "name": "South Tottenham Rail Station"
      },
      {
        "id": "910GUPRHLWY",
        "name": "Upper Holloway Rail Station"
      },
      {
        "id": "910GWLTHQRD",
        "name": "Walthamstow Queens Road Rail Station"
      },
      {
        "id": "910GWNSTDPK",
        "name": "Wanstead Park Rail Station"
      },
      {
        "id": "910GWDGRNPK",
        "name": "Woodgrange Park Rail Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "910GBARKRIV",
          "910GBARKING",
          "910GWDGRNPK",
          "910GWNSTDPK",
          "910GLYTNSHR",
          "910GLEYTNMR",
          "910GWLTHQRD",
          "910GBLCHSRD",
          "910GSTOTNHM",
          "910GHRGYGL",
          "910GCROUCHH",
          "910GUPRHLWY",
          "910GGOSPLOK"
        ]
      },
      {
        "id": 1,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "910GGOSPLOK",
          "910GUPRHLWY",
          "910GCROUCHH",
          "910GHRGYGL",
          "910GSTOTNHM",
          "910GBLCHSRD",
          "910GWLTHQRD",
          "910GLEYTNMR",
          "910GLYTNSHR",
          "910GWNSTDPK",
          "910GWDGRNPK",
          "910GBARKING",
          "910GBARKRIV"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Barking Riverside &harr;  Gospel Oak ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GBARKRIV",
          "910GBARKING",
          "910GWDGRNPK",
          "910GWNSTDPK",
          "910GLYTNSHR",
          "910GLEYTNMR",
          "910GWLTHQRD",
          "910GBLCHSRD",
          "910GSTOTNHM",
          "910GHRGYGL",
          "910GCROUCHH",
          "910GUPRHLWY",
          "910GGOSPLOK"
        ]
      },
      {
        "name": "Gospel Oak  &harr;  Barking Riverside",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GGOSPLOK",
          "910GUPRHLWY",
          "910GCROUCHH",
          "910GHRGYGL",
          "910GSTOTNHM",
          "910GBLCHSRD",
          "910GWLTHQRD",
          "910GLEYTNMR",
          "910GLYTNSHR",
          "910GWNSTDPK",
          "910GWDGRNPK",
          "910GBARKING",
          "910GBARKRIV"
        ]
      }
    ]
  },
  "tram": {
    "lineId": "tram",
    "lineName": "Tram",
    "modeName": "tram",
    "stations": [
      {
        "id": "940GZZCRADV",
        "name": "Addington Village Tram Stop"
      },
      {
        "id": "940GZZCRADD",
        "name": "Addiscombe Tram Stop"
      },
      {
        "id": "940GZZCRAMP",
        "name": "Ampere Way Tram Stop"
      },
      {
        "id": "940GZZCRARA",
        "name": "Arena Tram Stop"
      },
      {
        "id": "940GZZCRAVE",
        "name": "Avenue Road Tram Stop"
      },
      {
        "id": "940GZZCRBEK",
        "name": "Beckenham Junction Tram Stop"
      },
      {
        "id": "940GZZCRBRD",
        "name": "Beckenham Road Tram Stop"
      },
      {
        "id": "940GZZCRBED",
        "name": "Beddington Lane Tram Stop"
      },
      {
        "id": "940GZZCRBGV",
        "name": "Belgrave Walk Tram Stop"
      },
      {
        "id": "940GZZCRBIR",
        "name": "Birkbeck Tram Stop"
      },
      {
        "id": "940GZZCRBLA",
        "name": "Blackhorse Lane Tram Stop"
      },
      {
        "id": "940GZZCRCTR",
        "name": "Centrale Tram Stop"
      },
      {
        "id": "940GZZCRCHR",
        "name": "Church Street Tram Stop"
      },
      {
        "id": "940GZZCRCOO",
        "name": "Coombe Lane Tram Stop"
      },
      {
        "id": "940GZZCRDDR",
        "name": "Dundonald Road Tram Stop"
      },
      {
        "id": "940GZZCRECR",
        "name": "East Croydon Tram Stop"
      },
      {
        "id": "940GZZCRELM",
        "name": "Elmers End Tram Stop"
      },
      {
        "id": "940GZZCRFLD",
        "name": "Fieldway Tram Stop"
      },
      {
        "id": "940GZZCRCEN",
        "name": "George Street Tram Stop"
      },
      {
        "id": "940GZZCRGRA",
        "name": "Gravel Hill Tram Stop"
      },
      {
        "id": "940GZZCRHAR",
        "name": "Harrington Road Tram Stop"
      },
      {
        "id": "940GZZCRKGH",
        "name": "King Henry's Drive Tram Stop"
      },
      {
        "id": "940GZZCRLEB",
        "name": "Lebanon Road Tram Stop"
      },
      {
        "id": "940GZZCRLOY",
        "name": "Lloyd Park Tram Stop"
      },
      {
        "id": "940GZZCRMTP",
        "name": "Merton Park Tram Stop"
      },
      {
        "id": "940GZZCRMJT",
        "name": "Mitcham Junction Tram Stop"
      },
      {
        "id": "940GZZCRMCH",
        "name": "Mitcham Tram Stop"
      },
      {
        "id": "940GZZCRMDN",
        "name": "Morden Road Tram Stop"
      },
      {
        "id": "940GZZCRNWA",
        "name": "New Addington Tram Stop"
      },
      {
        "id": "940GZZCRPHI",
        "name": "Phipps Bridge Tram Stop"
      },
      {
        "id": "940GZZCRRVC",
        "name": "Reeves Corner Tram Stop"
      },
      {
        "id": "940GZZCRSAN",
        "name": "Sandilands Tram Stop"
      },
      {
        "id": "940GZZCRTPA",
        "name": "Therapia Lane Tram Stop"
      },
      {
        "id": "940GZZCRWAD",
        "name": "Waddon Marsh Tram Stop"
      },
      {
        "id": "940GZZCRWAN",
        "name": "Wandle Park Tram Stop"
      },
      {
        "id": "940GZZCRWEL",
        "name": "Wellesley Road Tram Stop"
      },
      {
        "id": "940GZZCRWCR",
        "name": "West Croydon Tram Stop"
      },
      {
        "id": "940GZZCRWMB",
        "name": "Wimbledon Tram Stop"
      },
      {
        "id": "940GZZCRWOD",
        "name": "Woodside Tram Stop"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          6
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZCRWMB",
          "940GZZCRDDR",
          "940GZZCRMTP",
          "940GZZCRMDN",
          "940GZZCRPHI",
          "940GZZCRBGV",
          "940GZZCRMCH",
          "940GZZCRMJT",
          "940GZZCRBED",
          "940GZZCRTPA",
          "940GZZCRAMP",
          "940GZZCRWAD",
          "940GZZCRWAN",
          "940GZZCRRVC",
          "940GZZCRCTR"
        ]
      },
      {
        "id": 6,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          2,
          3
        ],
        "previousBranchIds": [
          0,
          1
        ],
        "stationIds": [
          "940GZZCRCTR",
          "940GZZCRWCR",
          "940GZZCRWEL",
          "940GZZCRECR",
          "940GZZCRLEB",
          "940GZZCRSAN"
        ]
      },
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          4,
          5
        ],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "940GZZCRSAN",
          "940GZZCRADD",
          "940GZZCRBLA",
          "940GZZCRWOD",
          "940GZZCRARA"
        ]
      },
      {
        "id": 4,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          2
        ],
        "stationIds": [
          "940GZZCRARA",
          "940GZZCRHAR",
          "940GZZCRBIR",
          "940GZZCRAVE",
          "940GZZCRBRD",
          "940GZZCRBEK"
        ]
      },
      {
        "id": 5,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          2
        ],
        "stationIds": [
          "940GZZCRARA",
          "940GZZCRELM"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "940GZZCRSAN",
          "940GZZCRLOY",
          "940GZZCRCOO",
          "940GZZCRGRA",
          "940GZZCRADV",
          "940GZZCRFLD",
          "940GZZCRKGH",
          "940GZZCRNWA"
        ]
      },
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          6
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZCRCHR",
          "940GZZCRCTR"
        ]
      },
      {
        "id": 7,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          10
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZCRBEK",
          "940GZZCRBRD",
          "940GZZCRAVE",
          "940GZZCRBIR",
          "940GZZCRHAR",
          "940GZZCRARA"
        ]
      },
      {
        "id": 10,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11
        ],
        "previousBranchIds": [
          7,
          8
        ],
        "stationIds": [
          "940GZZCRARA",
          "940GZZCRWOD",
          "940GZZCRBLA",
          "940GZZCRADD",
          "940GZZCRSAN"
        ]
      },
      {
        "id": 11,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          12
        ],
        "previousBranchIds": [
          10,
          9
        ],
        "stationIds": [
          "940GZZCRSAN",
          "940GZZCRLEB",
          "940GZZCRECR",
          "940GZZCRCEN",
          "940GZZCRCHR"
        ]
      },
      {
        "id": 12,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          11
        ],
        "stationIds": [
          "940GZZCRCHR",
          "940GZZCRWAN",
          "940GZZCRWAD",
          "940GZZCRAMP",
          "940GZZCRTPA",
          "940GZZCRBED",
          "940GZZCRMJT",
          "940GZZCRMCH",
          "940GZZCRBGV",
          "940GZZCRPHI",
          "940GZZCRMDN",
          "940GZZCRMTP",
          "940GZZCRDDR",
          "940GZZCRWMB"
        ]
      },
      {
        "id": 8,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          10
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZCRELM",
          "940GZZCRARA"
        ]
      },
      {
        "id": 9,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          11
        ],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZCRNWA",
          "940GZZCRKGH",
          "940GZZCRFLD",
          "940GZZCRADV",
          "940GZZCRGRA",
          "940GZZCRCOO",
          "940GZZCRLOY",
          "940GZZCRSAN"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Church Street  &harr;  New Addington ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZCRCHR",
          "940GZZCRCTR",
          "940GZZCRWCR",
          "940GZZCRWEL",
          "940GZZCRECR",
          "940GZZCRLEB",
          "940GZZCRSAN",
          "940GZZCRLOY",
          "940GZZCRCOO",
          "940GZZCRGRA",
          "940GZZCRADV",
          "940GZZCRFLD",
          "940GZZCRKGH",
          "940GZZCRNWA"
        ]
      },
      {
        "name": "Wimbledon  &harr;  Elmers End ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZCRWMB",
          "940GZZCRDDR",
          "940GZZCRMTP",
          "940GZZCRMDN",
          "940GZZCRPHI",
          "940GZZCRBGV",
          "940GZZCRMCH",
          "940GZZCRMJT",
          "940GZZCRBED",
          "940GZZCRTPA",
          "940GZZCRAMP",
          "940GZZCRWAD",
          "940GZZCRWAN",
          "940GZZCRRVC",
          "940GZZCRCTR",
          "940GZZCRWCR",
          "940GZZCRWEL",
          "940GZZCRECR",
          "940GZZCRLEB",
          "940GZZCRSAN",
          "940GZZCRADD",
          "940GZZCRBLA",
          "940GZZCRWOD",
          "940GZZCRARA",
          "940GZZCRELM"
        ]
      },
      {
        "name": "Wimbledon  &harr;  Beckenham Junction ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZCRWMB",
          "940GZZCRDDR",
          "940GZZCRMTP",
          "940GZZCRMDN",
          "940GZZCRPHI",
          "940GZZCRBGV",
          "940GZZCRMCH",
          "940GZZCRMJT",
          "940GZZCRBED",
          "940GZZCRTPA",
          "940GZZCRAMP",
          "940GZZCRWAD",
          "940GZZCRWAN",
          "940GZZCRRVC",
          "940GZZCRCTR",
          "940GZZCRWCR",
          "940GZZCRWEL",
          "940GZZCRECR",
          "940GZZCRLEB",
          "940GZZCRSAN",
          "940GZZCRADD",
          "940GZZCRBLA",
          "940GZZCRWOD",
          "940GZZCRARA",
          "940GZZCRHAR",
          "940GZZCRBIR",
          "940GZZCRAVE",
          "940GZZCRBRD",
          "940GZZCRBEK"
        ]
      },
      {
        "name": "Beckenham Junction  &harr;  Wimbledon ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZCRBEK",
          "940GZZCRBRD",
          "940GZZCRAVE",
          "940GZZCRBIR",
          "940GZZCRHAR",
          "940GZZCRARA",
          "940GZZCRWOD",
          "940GZZCRBLA",
          "940GZZCRADD",
          "940GZZCRSAN",
          "940GZZCRLEB",
          "940GZZCRECR",
          "940GZZCRCEN",
          "940GZZCRCHR",
          "940GZZCRWAN",
          "940GZZCRWAD",
          "940GZZCRAMP",
          "940GZZCRTPA",
          "940GZZCRBED",
          "940GZZCRMJT",
          "940GZZCRMCH",
          "940GZZCRBGV",
          "940GZZCRPHI",
          "940GZZCRMDN",
          "940GZZCRMTP",
          "940GZZCRDDR",
          "940GZZCRWMB"
        ]
      },
      {
        "name": "Elmers End  &harr;  Wimbledon ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZCRELM",
          "940GZZCRARA",
          "940GZZCRWOD",
          "940GZZCRBLA",
          "940GZZCRADD",
          "940GZZCRSAN",
          "940GZZCRLEB",
          "940GZZCRECR",
          "940GZZCRCEN",
          "940GZZCRCHR",
          "940GZZCRWAN",
          "940GZZCRWAD",
          "940GZZCRAMP",
          "940GZZCRTPA",
          "940GZZCRBED",
          "940GZZCRMJT",
          "940GZZCRMCH",
          "940GZZCRBGV",
          "940GZZCRPHI",
          "940GZZCRMDN",
          "940GZZCRMTP",
          "940GZZCRDDR",
          "940GZZCRWMB"
        ]
      },
      {
        "name": "New Addington  &harr;  Church Street ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZCRNWA",
          "940GZZCRKGH",
          "940GZZCRFLD",
          "940GZZCRADV",
          "940GZZCRGRA",
          "940GZZCRCOO",
          "940GZZCRLOY",
          "940GZZCRSAN",
          "940GZZCRLEB",
          "940GZZCRECR",
          "940GZZCRCEN",
          "940GZZCRCHR"
        ]
      }
    ]
  },
  "victoria": {
    "lineId": "victoria",
    "lineName": "Victoria",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUBLR",
        "name": "Blackhorse Road Underground Station"
      },
      {
        "id": "940GZZLUBXN",
        "name": "Brixton Underground Station"
      },
      {
        "id": "940GZZLUEUS",
        "name": "Euston Underground Station"
      },
      {
        "id": "940GZZLUFPK",
        "name": "Finsbury Park Underground Station"
      },
      {
        "id": "940GZZLUGPK",
        "name": "Green Park Underground Station"
      },
      {
        "id": "940GZZLUHAI",
        "name": "Highbury & Islington Underground Station"
      },
      {
        "id": "940GZZLUKSX",
        "name": "King's Cross St. Pancras Underground Station"
      },
      {
        "id": "940GZZLUOXC",
        "name": "Oxford Circus Underground Station"
      },
      {
        "id": "940GZZLUPCO",
        "name": "Pimlico Underground Station"
      },
      {
        "id": "940GZZLUSVS",
        "name": "Seven Sisters Underground Station"
      },
      {
        "id": "940GZZLUSKW",
        "name": "Stockwell Underground Station"
      },
      {
        "id": "940GZZLUTMH",
        "name": "Tottenham Hale Underground Station"
      },
      {
        "id": "940GZZLUVXL",
        "name": "Vauxhall Underground Station"
      },
      {
        "id": "940GZZLUVIC",
        "name": "Victoria Underground Station"
      },
      {
        "id": "940GZZLUWWL",
        "name": "Walthamstow Central Underground Station"
      },
      {
        "id": "940GZZLUWRR",
        "name": "Warren Street Underground Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUWWL",
          "940GZZLUBLR",
          "940GZZLUTMH",
          "940GZZLUSVS",
          "940GZZLUFPK",
          "940GZZLUHAI",
          "940GZZLUKSX",
          "940GZZLUEUS",
          "940GZZLUWRR",
          "940GZZLUOXC",
          "940GZZLUGPK",
          "940GZZLUVIC",
          "940GZZLUPCO",
          "940GZZLUVXL",
          "940GZZLUSKW",
          "940GZZLUBXN"
        ]
      },
      {
        "id": 1,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUBXN",
          "940GZZLUSKW",
          "940GZZLUVXL",
          "940GZZLUPCO",
          "940GZZLUVIC",
          "940GZZLUGPK",
          "940GZZLUOXC",
          "940GZZLUWRR",
          "940GZZLUEUS",
          "940GZZLUKSX",
          "940GZZLUHAI",
          "940GZZLUFPK",
          "940GZZLUSVS",
          "940GZZLUTMH",
          "940GZZLUBLR",
          "940GZZLUWWL"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Walthamstow Central  &harr;  Brixton ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUWWL",
          "940GZZLUBLR",
          "940GZZLUTMH",
          "940GZZLUSVS",
          "940GZZLUFPK",
          "940GZZLUHAI",
          "940GZZLUKSX",
          "940GZZLUEUS",
          "940GZZLUWRR",
          "940GZZLUOXC",
          "940GZZLUGPK",
          "940GZZLUVIC",
          "940GZZLUPCO",
          "940GZZLUVXL",
          "940GZZLUSKW",
          "940GZZLUBXN"
        ]
      },
      {
        "name": "Brixton  &harr;  Walthamstow Central ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUBXN",
          "940GZZLUSKW",
          "940GZZLUVXL",
          "940GZZLUPCO",
          "940GZZLUVIC",
          "940GZZLUGPK",
          "940GZZLUOXC",
          "940GZZLUWRR",
          "940GZZLUEUS",
          "940GZZLUKSX",
          "940GZZLUHAI",
          "940GZZLUFPK",
          "940GZZLUSVS",
          "940GZZLUTMH",
          "940GZZLUBLR",
          "940GZZLUWWL"
        ]
      }
    ]
  },
  "waterloo-city": {
    "lineId": "waterloo-city",
    "lineName": "Waterloo & City",
    "modeName": "tube",
    "stations": [
      {
        "id": "940GZZLUBNK",
        "name": "Bank Underground Station"
      },
      {
        "id": "940GZZLUWLO",
        "name": "Waterloo Underground Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUBNK",
          "940GZZLUWLO"
        ]
      },
      {
        "id": 1,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "940GZZLUWLO",
          "940GZZLUBNK"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Bank  &harr;  Waterloo ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUBNK",
          "940GZZLUWLO"
        ]
      },
      {
        "name": "Waterloo  &harr;  Bank ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "940GZZLUWLO",
          "940GZZLUBNK"
        ]
      }
    ]
  },
  "weaver": {
    "lineId": "weaver",
    "lineName": "Weaver",
    "modeName": "overground",
    "stations": [
      {
        "id": "910GBTHNLGR",
        "name": "Bethnal Green Rail Station"
      },
      {
        "id": "910GBRUCGRV",
        "name": "Bruce Grove Rail Station"
      },
      {
        "id": "910GBHILLPK",
        "name": "Bush Hill Park Rail Station"
      },
      {
        "id": "910GCAMHTH",
        "name": "Cambridge Heath (London) Rail Station"
      },
      {
        "id": "910GCHESHNT",
        "name": "Cheshunt Rail Station"
      },
      {
        "id": "910GCHINGFD",
        "name": "Chingford Rail Station"
      },
      {
        "id": "910GCLAPTON",
        "name": "Clapton Rail Station"
      },
      {
        "id": "910GEDMNGRN",
        "name": "Edmonton Green Rail Station"
      },
      {
        "id": "910GENFLDTN",
        "name": "Enfield Town Rail Station"
      },
      {
        "id": "910GHAKNYNM",
        "name": "Hackney Downs Rail Station"
      },
      {
        "id": "910GHGHMSPK",
        "name": "Highams Park Rail Station"
      },
      {
        "id": "910GLONFLDS",
        "name": "London Fields Rail Station"
      },
      {
        "id": "910GLIVST",
        "name": "London Liverpool Street Rail Station"
      },
      {
        "id": "910GRCTRYRD",
        "name": "Rectory Road Rail Station"
      },
      {
        "id": "910GSEVNSIS",
        "name": "Seven Sisters Rail Station"
      },
      {
        "id": "910GSIVRST",
        "name": "Silver Street Rail Station"
      },
      {
        "id": "910GSBURY",
        "name": "Southbury Rail Station"
      },
      {
        "id": "910GSTJMSST",
        "name": "St James Street (London) Rail Station"
      },
      {
        "id": "910GSTMFDHL",
        "name": "Stamford Hill Rail Station"
      },
      {
        "id": "910GSTKNWNG",
        "name": "Stoke Newington Rail Station"
      },
      {
        "id": "910GTHBLDSG",
        "name": "Theobalds Grove Rail Station"
      },
      {
        "id": "910GTURKYST",
        "name": "Turkey Street Rail Station"
      },
      {
        "id": "910GWLTWCEN",
        "name": "Walthamstow Central Rail Station"
      },
      {
        "id": "910GWHHRTLA",
        "name": "White Hart Lane Rail Station"
      },
      {
        "id": "910GWDST",
        "name": "Wood Street Rail Station"
      }
    ],
    "branches": [
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          4
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GCHESHNT",
          "910GTHBLDSG",
          "910GTURKYST",
          "910GSBURY",
          "910GEDMNGRN"
        ]
      },
      {
        "id": 4,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3
        ],
        "previousBranchIds": [
          1,
          2
        ],
        "stationIds": [
          "910GEDMNGRN",
          "910GSIVRST",
          "910GWHHRTLA",
          "910GBRUCGRV",
          "910GSEVNSIS",
          "910GSTMFDHL",
          "910GSTKNWNG",
          "910GRCTRYRD",
          "910GHAKNYNM"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          4,
          0
        ],
        "stationIds": [
          "910GHAKNYNM",
          "910GLONFLDS",
          "910GCAMHTH",
          "910GBTHNLGR",
          "910GLIVST"
        ]
      },
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          4
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GENFLDTN",
          "910GBHILLPK",
          "910GEDMNGRN"
        ]
      },
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          3
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GCHINGFD",
          "910GHGHMSPK",
          "910GWDST",
          "910GWLTWCEN",
          "910GSTJMSST",
          "910GCLAPTON",
          "910GHAKNYNM"
        ]
      },
      {
        "id": 5,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          6,
          7
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GLIVST",
          "910GBTHNLGR",
          "910GCAMHTH",
          "910GLONFLDS",
          "910GHAKNYNM"
        ]
      },
      {
        "id": 6,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          8,
          9
        ],
        "previousBranchIds": [
          5
        ],
        "stationIds": [
          "910GHAKNYNM",
          "910GRCTRYRD",
          "910GSTKNWNG",
          "910GSTMFDHL",
          "910GSEVNSIS",
          "910GBRUCGRV",
          "910GWHHRTLA",
          "910GSIVRST",
          "910GEDMNGRN"
        ]
      },
      {
        "id": 8,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "910GEDMNGRN",
          "910GSBURY",
          "910GTURKYST",
          "910GTHBLDSG",
          "910GCHESHNT"
        ]
      },
      {
        "id": 9,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "910GEDMNGRN",
          "910GBHILLPK",
          "910GENFLDTN"
        ]
      },
      {
        "id": 7,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          5
        ],
        "stationIds": [
          "910GHAKNYNM",
          "910GCLAPTON",
          "910GSTJMSST",
          "910GWLTWCEN",
          "910GWDST",
          "910GHGHMSPK",
          "910GCHINGFD"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Cheshunt  &harr;  London Liverpool Street ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GCHESHNT",
          "910GTHBLDSG",
          "910GTURKYST",
          "910GSBURY",
          "910GEDMNGRN",
          "910GSIVRST",
          "910GWHHRTLA",
          "910GBRUCGRV",
          "910GSEVNSIS",
          "910GSTMFDHL",
          "910GSTKNWNG",
          "910GRCTRYRD",
          "910GHAKNYNM",
          "910GLONFLDS",
          "910GCAMHTH",
          "910GBTHNLGR",
          "910GLIVST"
        ]
      },
      {
        "name": "Chingford  &harr;  London Liverpool Street ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GCHINGFD",
          "910GHGHMSPK",
          "910GWDST",
          "910GWLTWCEN",
          "910GSTJMSST",
          "910GCLAPTON",
          "910GHAKNYNM",
          "910GLONFLDS",
          "910GCAMHTH",
          "910GBTHNLGR",
          "910GLIVST"
        ]
      },
      {
        "name": "Enfield Town  &harr;  London Liverpool Street ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GENFLDTN",
          "910GBHILLPK",
          "910GEDMNGRN",
          "910GSIVRST",
          "910GWHHRTLA",
          "910GBRUCGRV",
          "910GSEVNSIS",
          "910GSTMFDHL",
          "910GSTKNWNG",
          "910GRCTRYRD",
          "910GHAKNYNM",
          "910GLONFLDS",
          "910GCAMHTH",
          "910GBTHNLGR",
          "910GLIVST"
        ]
      },
      {
        "name": "London Liverpool Street  &harr;  Chingford ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GLIVST",
          "910GBTHNLGR",
          "910GCAMHTH",
          "910GLONFLDS",
          "910GHAKNYNM",
          "910GCLAPTON",
          "910GSTJMSST",
          "910GWLTWCEN",
          "910GWDST",
          "910GHGHMSPK",
          "910GCHINGFD"
        ]
      },
      {
        "name": "London Liverpool Street  &harr;  Enfield Town ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GLIVST",
          "910GBTHNLGR",
          "910GCAMHTH",
          "910GLONFLDS",
          "910GHAKNYNM",
          "910GRCTRYRD",
          "910GSTKNWNG",
          "910GSTMFDHL",
          "910GSEVNSIS",
          "910GBRUCGRV",
          "910GWHHRTLA",
          "910GSIVRST",
          "910GEDMNGRN",
          "910GBHILLPK",
          "910GENFLDTN"
        ]
      },
      {
        "name": "London Liverpool Street  &harr;  Cheshunt ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GLIVST",
          "910GBTHNLGR",
          "910GCAMHTH",
          "910GLONFLDS",
          "910GHAKNYNM",
          "910GRCTRYRD",
          "910GSTKNWNG",
          "910GSTMFDHL",
          "910GSEVNSIS",
          "910GBRUCGRV",
          "910GWHHRTLA",
          "910GSIVRST",
          "910GEDMNGRN",
          "910GSBURY",
          "910GTURKYST",
          "910GTHBLDSG",
          "910GCHESHNT"
        ]
      }
    ]
  },
  "windrush": {
    "lineId": "windrush",
    "lineName": "Windrush",
    "modeName": "overground",
    "stations": [
      {
        "id": "910GANERLEY",
        "name": "Anerley Rail Station"
      },
      {
        "id": "910GBROCKLY",
        "name": "Brockley Rail Station"
      },
      {
        "id": "910GCNDAW",
        "name": "Canada Water Rail Station"
      },
      {
        "id": "910GCNNB",
        "name": "Canonbury Rail Station"
      },
      {
        "id": "910GCLPHHS",
        "name": "Clapham High Street Rail Station"
      },
      {
        "id": "910GCLPHMJ1",
        "name": "Clapham Junction Rail Station"
      },
      {
        "id": "910GCRYSTLP",
        "name": "Crystal Palace Rail Station"
      },
      {
        "id": "910GDALS",
        "name": "Dalston Junction Rail Station"
      },
      {
        "id": "910GDENMRKH",
        "name": "Denmark Hill Rail Station"
      },
      {
        "id": "910GFORESTH",
        "name": "Forest Hill Rail Station"
      },
      {
        "id": "910GHAGGERS",
        "name": "Haggerston Rail Station"
      },
      {
        "id": "910GHGHI",
        "name": "Highbury & Islington Rail Station"
      },
      {
        "id": "910GHONROPK",
        "name": "Honor Oak Park Rail Station"
      },
      {
        "id": "910GHOXTON",
        "name": "Hoxton Rail Station"
      },
      {
        "id": "910GNWCRELL",
        "name": "New Cross ELL Rail Station"
      },
      {
        "id": "910GNEWXGTE",
        "name": "New Cross Gate Rail Station"
      },
      {
        "id": "910GNORWDJ",
        "name": "Norwood Junction Rail Station"
      },
      {
        "id": "910GPCKHMRY",
        "name": "Peckham Rye Rail Station"
      },
      {
        "id": "910GPENEW",
        "name": "Penge West Rail Station"
      },
      {
        "id": "910GPCKHMQD",
        "name": "Queens Road Peckham Rail Station"
      },
      {
        "id": "910GRTHERHI",
        "name": "Rotherhithe Rail Station"
      },
      {
        "id": "910GSHADWEL",
        "name": "Shadwell Rail Station"
      },
      {
        "id": "910GSHRDHST",
        "name": "Shoreditch High Street Rail Station"
      },
      {
        "id": "910GSURREYQ",
        "name": "Surrey Quays Rail Station"
      },
      {
        "id": "910GSYDENHM",
        "name": "Sydenham Rail Station"
      },
      {
        "id": "910GWNDSWRD",
        "name": "Wandsworth Road Rail Station"
      },
      {
        "id": "910GWAPPING",
        "name": "Wapping Rail Station"
      },
      {
        "id": "910GWCROYDN",
        "name": "West Croydon Rail Station"
      },
      {
        "id": "910GWCHAPEL",
        "name": "Whitechapel Rail Station"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          4
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GWCROYDN",
          "910GNORWDJ",
          "910GANERLEY",
          "910GPENEW",
          "910GSYDENHM"
        ]
      },
      {
        "id": 4,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5
        ],
        "previousBranchIds": [
          0,
          1
        ],
        "stationIds": [
          "910GSYDENHM",
          "910GFORESTH",
          "910GHONROPK",
          "910GBROCKLY",
          "910GNEWXGTE",
          "910GSURREYQ"
        ]
      },
      {
        "id": 5,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          4,
          3,
          2
        ],
        "stationIds": [
          "910GSURREYQ",
          "910GCNDAW",
          "910GRTHERHI",
          "910GWAPPING",
          "910GSHADWEL",
          "910GWCHAPEL",
          "910GSHRDHST",
          "910GHOXTON",
          "910GHAGGERS",
          "910GDALS",
          "910GCNNB",
          "910GHGHI"
        ]
      },
      {
        "id": 3,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GCLPHMJ1",
          "910GWNDSWRD",
          "910GCLPHHS",
          "910GDENMRKH",
          "910GPCKHMRY",
          "910GPCKHMQD",
          "910GSURREYQ"
        ]
      },
      {
        "id": 1,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          4
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GCRYSTLP",
          "910GSYDENHM"
        ]
      },
      {
        "id": 2,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          5
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GNWCRELL",
          "910GSURREYQ"
        ]
      },
      {
        "id": 6,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          7,
          8,
          9
        ],
        "previousBranchIds": [],
        "stationIds": [
          "910GHGHI",
          "910GCNNB",
          "910GDALS",
          "910GHAGGERS",
          "910GHOXTON",
          "910GSHRDHST",
          "910GWCHAPEL",
          "910GSHADWEL",
          "910GWAPPING",
          "910GRTHERHI",
          "910GCNDAW",
          "910GSURREYQ"
        ]
      },
      {
        "id": 7,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [
          10,
          11
        ],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "910GSURREYQ",
          "910GNEWXGTE",
          "910GBROCKLY",
          "910GHONROPK",
          "910GFORESTH",
          "910GSYDENHM"
        ]
      },
      {
        "id": 10,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          7
        ],
        "stationIds": [
          "910GSYDENHM",
          "910GPENEW",
          "910GANERLEY",
          "910GNORWDJ",
          "910GWCROYDN"
        ]
      },
      {
        "id": 9,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "910GSURREYQ",
          "910GPCKHMQD",
          "910GPCKHMRY",
          "910GDENMRKH",
          "910GCLPHHS",
          "910GWNDSWRD",
          "910GCLPHMJ1"
        ]
      },
      {
        "id": 11,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          7
        ],
        "stationIds": [
          "910GSYDENHM",
          "910GCRYSTLP"
        ]
      },
      {
        "id": 8,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [
          6
        ],
        "stationIds": [
          "910GSURREYQ",
          "910GNWCRELL"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Clapham Junction  &harr;  Highbury & Islington ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GCLPHMJ1",
          "910GWNDSWRD",
          "910GCLPHHS",
          "910GDENMRKH",
          "910GPCKHMRY",
          "910GPCKHMQD",
          "910GSURREYQ",
          "910GCNDAW",
          "910GRTHERHI",
          "910GWAPPING",
          "910GSHADWEL",
          "910GWCHAPEL",
          "910GSHRDHST",
          "910GHOXTON",
          "910GHAGGERS",
          "910GDALS",
          "910GCNNB",
          "910GHGHI"
        ]
      },
      {
        "name": "Crystal Palace  &harr;  Highbury & Islington ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GCRYSTLP",
          "910GSYDENHM",
          "910GFORESTH",
          "910GHONROPK",
          "910GBROCKLY",
          "910GNEWXGTE",
          "910GSURREYQ",
          "910GCNDAW",
          "910GRTHERHI",
          "910GWAPPING",
          "910GSHADWEL",
          "910GWCHAPEL",
          "910GSHRDHST",
          "910GHOXTON",
          "910GHAGGERS",
          "910GDALS",
          "910GCNNB",
          "910GHGHI"
        ]
      },
      {
        "name": "New Cross ELL  &harr;  Highbury & Islington ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GNWCRELL",
          "910GSURREYQ",
          "910GCNDAW",
          "910GRTHERHI",
          "910GWAPPING",
          "910GSHADWEL",
          "910GWCHAPEL",
          "910GSHRDHST",
          "910GHOXTON",
          "910GHAGGERS",
          "910GDALS",
          "910GCNNB",
          "910GHGHI"
        ]
      },
      {
        "name": "West Croydon  &harr;  Highbury & Islington ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GWCROYDN",
          "910GNORWDJ",
          "910GANERLEY",
          "910GPENEW",
          "910GSYDENHM",
          "910GFORESTH",
          "910GHONROPK",
          "910GBROCKLY",
          "910GNEWXGTE",
          "910GSURREYQ",
          "910GCNDAW",
          "910GRTHERHI",
          "910GWAPPING",
          "910GSHADWEL",
          "910GWCHAPEL",
          "910GSHRDHST",
          "910GHOXTON",
          "910GHAGGERS",
          "910GDALS",
          "910GCNNB",
          "910GHGHI"
        ]
      },
      {
        "name": "Highbury & Islington  &harr;  New Cross ELL ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GHGHI",
          "910GCNNB",
          "910GDALS",
          "910GHAGGERS",
          "910GHOXTON",
          "910GSHRDHST",
          "910GWCHAPEL",
          "910GSHADWEL",
          "910GWAPPING",
          "910GRTHERHI",
          "910GCNDAW",
          "910GSURREYQ",
          "910GNWCRELL"
        ]
      },
      {
        "name": "Highbury & Islington  &harr;  Crystal Palace ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GHGHI",
          "910GCNNB",
          "910GDALS",
          "910GHAGGERS",
          "910GHOXTON",
          "910GSHRDHST",
          "910GWCHAPEL",
          "910GSHADWEL",
          "910GWAPPING",
          "910GRTHERHI",
          "910GCNDAW",
          "910GSURREYQ",
          "910GNEWXGTE",
          "910GBROCKLY",
          "910GHONROPK",
          "910GFORESTH",
          "910GSYDENHM",
          "910GCRYSTLP"
        ]
      },
      {
        "name": "Highbury & Islington  &harr;  West Croydon ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GHGHI",
          "910GCNNB",
          "910GDALS",
          "910GHAGGERS",
          "910GHOXTON",
          "910GSHRDHST",
          "910GWCHAPEL",
          "910GSHADWEL",
          "910GWAPPING",
          "910GRTHERHI",
          "910GCNDAW",
          "910GSURREYQ",
          "910GNEWXGTE",
          "910GBROCKLY",
          "910GHONROPK",
          "910GFORESTH",
          "910GSYDENHM",
          "910GPENEW",
          "910GANERLEY",
          "910GNORWDJ",
          "910GWCROYDN"
        ]
      },
      {
        "name": "Highbury & Islington  &harr;  Clapham Junction ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "910GHGHI",
          "910GCNNB",
          "910GDALS",
          "910GHAGGERS",
          "910GHOXTON",
          "910GSHRDHST",
          "910GWCHAPEL",
          "910GSHADWEL",
          "910GWAPPING",
          "910GRTHERHI",
          "910GCNDAW",
          "910GSURREYQ",
          "910GPCKHMQD",
          "910GPCKHMRY",
          "910GDENMRKH",
          "910GCLPHHS",
          "910GWNDSWRD",
          "910GCLPHMJ1"
        ]
      }
    ]
  },
  "woolwich-ferry": {
    "lineId": "woolwich-ferry",
    "lineName": "Woolwich Ferry",
    "modeName": "river-bus",
    "stations": [
      {
        "id": "930GWWC",
        "name": "Woolwich Ferry North Pier"
      },
      {
        "id": "930GWWS",
        "name": "Woolwich Ferry South Pier"
      }
    ],
    "branches": [
      {
        "id": 0,
        "direction": "inbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "930GWWC",
          "930GWWS"
        ]
      },
      {
        "id": 1,
        "direction": "outbound",
        "serviceType": "Regular",
        "nextBranchIds": [],
        "previousBranchIds": [],
        "stationIds": [
          "930GWWS",
          "930GWWC"
        ]
      }
    ],
    "orderedRoutes": [
      {
        "name": "Woolwich Ferry North  &harr;  Woolwich Ferry South ",
        "direction": "inbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GWWC",
          "930GWWS"
        ]
      },
      {
        "name": "Woolwich Ferry South  &harr;  Woolwich Ferry North ",
        "direction": "outbound",
        "serviceType": "Regular",
        "stationIds": [
          "930GWWS",
          "930GWWC"
        ]
      }
    ]
  }
} as const;

export type StaticLineId = keyof typeof LINE_STATION_SEQUENCES;
export type StaticLineStationSequence = (typeof LINE_STATION_SEQUENCES)[StaticLineId];
