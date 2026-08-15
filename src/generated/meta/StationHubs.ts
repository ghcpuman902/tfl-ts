// Generated from TfL StopPoint hub data. Do not edit by hand.
// Static topology only: hub membership and per-line arrival StopPoint ids; no operational state.
// Regenerate with: pnpm run generate -- --only=station-hubs

export type StationHubMember = {
  id: string;
  name: string;
  stopType: string;
  modes: readonly string[];
  lines: readonly string[];
};

export type StationHubInfo = {
  hubId?: string;
  hubName?: string;
  members: readonly StationHubMember[];
  lineMemberIds: Readonly<Record<string, string>>;
};

export const STATION_HUBS_GENERATED_AT = "2026-08-15T11:36:55.631Z";

export const STATION_HUB_LIST: readonly StationHubInfo[] = [
  {
    "members": [
      {
        "id": "910GACTNCTL",
        "name": "Acton Central Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GACTNCTL"
    }
  },
  {
    "members": [
      {
        "id": "910GACTONML",
        "name": "Acton Main Line Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GACTONML",
      "great-western-railway": "910GACTONML"
    }
  },
  {
    "members": [
      {
        "id": "910GANERLEY",
        "name": "Anerley Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southern",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GANERLEY",
      "windrush": "910GANERLEY"
    }
  },
  {
    "members": [
      {
        "id": "910GBARKRIV",
        "name": "Barking Riverside",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GBARKRIV"
    }
  },
  {
    "members": [
      {
        "id": "910GBHILLPK",
        "name": "Bush Hill Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "bus",
          "overground"
        ],
        "lines": [
          "377",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "weaver": "910GBHILLPK"
    }
  },
  {
    "members": [
      {
        "id": "910GBNHAM",
        "name": "Burnham (Berks) Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GBNHAM",
      "great-western-railway": "910GBNHAM"
    }
  },
  {
    "members": [
      {
        "id": "910GBRBY",
        "name": "Brondesbury Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GBRBY"
    }
  },
  {
    "members": [
      {
        "id": "910GBRBYPK",
        "name": "Brondesbury Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GBRBYPK"
    }
  },
  {
    "members": [
      {
        "id": "910GBROCKLY",
        "name": "Brockley Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southern",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GBROCKLY",
      "windrush": "910GBROCKLY"
    }
  },
  {
    "members": [
      {
        "id": "910GBRTWOOD",
        "name": "Brentwood Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GBRTWOOD"
    }
  },
  {
    "members": [
      {
        "id": "910GBRUCGRV",
        "name": "Bruce Grove Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GBRUCGRV",
      "weaver": "910GBRUCGRV"
    }
  },
  {
    "members": [
      {
        "id": "910GBTHNLGR",
        "name": "Bethnal Green Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GBTHNLGR",
      "weaver": "910GBTHNLGR"
    }
  },
  {
    "members": [
      {
        "id": "910GCAMHTH",
        "name": "Cambridge Heath (London) Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GCAMHTH",
      "weaver": "910GCAMHTH"
    }
  },
  {
    "members": [
      {
        "id": "910GCHDWLHT",
        "name": "Chadwell Heath Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GCHDWLHT"
    }
  },
  {
    "members": [
      {
        "id": "910GCHESHNT",
        "name": "Cheshunt Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GCHESHNT",
      "weaver": "910GCHESHNT"
    }
  },
  {
    "members": [
      {
        "id": "910GCHINGFD",
        "name": "Chingford Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "weaver": "910GCHINGFD"
    }
  },
  {
    "members": [
      {
        "id": "910GCLAPTON",
        "name": "Clapton Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GCLAPTON",
      "weaver": "910GCLAPTON"
    }
  },
  {
    "members": [
      {
        "id": "910GCLDNNRB",
        "name": "Caledonian Road & Barnsbury Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GCLDNNRB"
    }
  },
  {
    "members": [
      {
        "id": "910GCLPHHS",
        "name": "Clapham High Street Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "windrush": "910GCLPHHS"
    }
  },
  {
    "members": [
      {
        "id": "910GCMDNRD",
        "name": "Camden Road Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GCMDNRD"
    }
  },
  {
    "members": [
      {
        "id": "910GCNNB",
        "name": "Canonbury Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GCNNB",
      "windrush": "910GCNNB"
    }
  },
  {
    "members": [
      {
        "id": "910GCROUCHH",
        "name": "Crouch Hill Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GCROUCHH"
    }
  },
  {
    "members": [
      {
        "id": "910GCRPNDPK",
        "name": "Carpenders Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      }
    ],
    "lineMemberIds": {
      "lioness": "910GCRPNDPK"
    }
  },
  {
    "members": [
      {
        "id": "910GDALS",
        "name": "Dalston Junction Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "bus",
          "overground"
        ],
        "lines": [
          "149",
          "242",
          "243",
          "277",
          "488",
          "67",
          "76",
          "n242",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "windrush": "910GDALS"
    }
  },
  {
    "members": [
      {
        "id": "910GDALSKLD",
        "name": "Dalston Kingsland Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GDALSKLD"
    }
  },
  {
    "members": [
      {
        "id": "910GDENMRKH",
        "name": "Denmark Hill Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southeastern",
          "thameslink",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southeastern": "910GDENMRKH",
      "thameslink": "910GDENMRKH",
      "windrush": "910GDENMRKH"
    }
  },
  {
    "members": [
      {
        "id": "910GEDMNGRN",
        "name": "Edmonton Green Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GEDMNGRN",
      "weaver": "910GEDMNGRN"
    }
  },
  {
    "members": [
      {
        "id": "910GEMRSPKH",
        "name": "Emerson Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "liberty"
        ]
      }
    ],
    "lineMemberIds": {
      "liberty": "910GEMRSPKH"
    }
  },
  {
    "members": [
      {
        "id": "910GENFLDTN",
        "name": "Enfield Town Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "weaver": "910GENFLDTN"
    }
  },
  {
    "members": [
      {
        "id": "910GFNCHLYR",
        "name": "Finchley Road & Frognal Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GFNCHLYR"
    }
  },
  {
    "members": [
      {
        "id": "910GFORESTH",
        "name": "Forest Hill Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southern",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GFORESTH",
      "windrush": "910GFORESTH"
    }
  },
  {
    "members": [
      {
        "id": "910GFRSTGT",
        "name": "Forest Gate Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GFRSTGT"
    }
  },
  {
    "members": [
      {
        "id": "910GGIDEAPK",
        "name": "Gidea Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "greater-anglia"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GGIDEAPK",
      "greater-anglia": "910GGIDEAPK"
    }
  },
  {
    "members": [
      {
        "id": "910GGODMAYS",
        "name": "Goodmayes Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GGODMAYS"
    }
  },
  {
    "members": [
      {
        "id": "910GGOSPLOK",
        "name": "Gospel Oak Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay",
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GGOSPLOK",
      "suffragette": "910GGOSPLOK"
    }
  },
  {
    "members": [
      {
        "id": "910GHACKNYC",
        "name": "Hackney Central Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GHACKNYC"
    }
  },
  {
    "members": [
      {
        "id": "910GHACKNYW",
        "name": "Hackney Wick Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GHACKNYW"
    }
  },
  {
    "members": [
      {
        "id": "910GHAGGERS",
        "name": "Haggerston Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "windrush": "910GHAGGERS"
    }
  },
  {
    "members": [
      {
        "id": "910GHAKNYNM",
        "name": "Hackney Downs Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GHAKNYNM",
      "weaver": "910GHAKNYNM"
    }
  },
  {
    "members": [
      {
        "id": "910GHANWELL",
        "name": "Hanwell Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GHANWELL"
    }
  },
  {
    "members": [
      {
        "id": "910GHAYESAH",
        "name": "Hayes & Harlington Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GHAYESAH",
      "great-western-railway": "910GHAYESAH"
    }
  },
  {
    "members": [
      {
        "id": "910GHEDSTNL",
        "name": "Headstone Lane Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      }
    ],
    "lineMemberIds": {
      "lioness": "910GHEDSTNL"
    }
  },
  {
    "members": [
      {
        "id": "910GHGHMSPK",
        "name": "Highams Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "weaver": "910GHGHMSPK"
    }
  },
  {
    "members": [
      {
        "id": "910GHMPSTDH",
        "name": "Hampstead Heath Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GHMPSTDH"
    }
  },
  {
    "members": [
      {
        "id": "910GHOMRTON",
        "name": "Homerton Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GHOMRTON"
    }
  },
  {
    "members": [
      {
        "id": "910GHONROPK",
        "name": "Honor Oak Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southern",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GHONROPK",
      "windrush": "910GHONROPK"
    }
  },
  {
    "members": [
      {
        "id": "910GHOXTON",
        "name": "Hoxton Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "windrush": "910GHOXTON"
    }
  },
  {
    "members": [
      {
        "id": "910GHRGYGL",
        "name": "Harringay Green Lanes Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GHRGYGL"
    }
  },
  {
    "members": [
      {
        "id": "910GHRLDWOD",
        "name": "Harold Wood Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GHRLDWOD"
    }
  },
  {
    "members": [
      {
        "id": "910GHTCHEND",
        "name": "Hatch End Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      }
    ],
    "lineMemberIds": {
      "lioness": "910GHTCHEND"
    }
  },
  {
    "members": [
      {
        "id": "910GILFORD",
        "name": "Ilford Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "greater-anglia"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GILFORD",
      "greater-anglia": "910GILFORD"
    }
  },
  {
    "members": [
      {
        "id": "910GIVER",
        "name": "Iver Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GIVER",
      "great-western-railway": "910GIVER"
    }
  },
  {
    "members": [
      {
        "id": "910GKENR",
        "name": "Kensal Rise Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GKENR"
    }
  },
  {
    "members": [
      {
        "id": "910GKLBRNHR",
        "name": "Kilburn High Road Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      }
    ],
    "lineMemberIds": {
      "lioness": "910GKLBRNHR"
    }
  },
  {
    "members": [
      {
        "id": "910GKNTSHTW",
        "name": "Kentish Town West Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GKNTSHTW"
    }
  },
  {
    "members": [
      {
        "id": "910GLANGLEY",
        "name": "Langley (Berks) Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GLANGLEY",
      "great-western-railway": "910GLANGLEY"
    }
  },
  {
    "members": [
      {
        "id": "910GLEYTNMR",
        "name": "Leyton Midland Road Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GLEYTNMR"
    }
  },
  {
    "members": [
      {
        "id": "910GLONFLDS",
        "name": "London Fields Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GLONFLDS",
      "weaver": "910GLONFLDS"
    }
  },
  {
    "members": [
      {
        "id": "910GLYTNSHR",
        "name": "Leytonstone High Road Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GLYTNSHR"
    }
  },
  {
    "members": [
      {
        "id": "910GMANRPK",
        "name": "Manor Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GMANRPK"
    }
  },
  {
    "members": [
      {
        "id": "910GMDNHEAD",
        "name": "Maidenhead Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GMDNHEAD",
      "great-western-railway": "910GMDNHEAD"
    }
  },
  {
    "members": [
      {
        "id": "910GMRYLAND",
        "name": "Maryland Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GMRYLAND"
    }
  },
  {
    "members": [
      {
        "id": "910GPCKHMQD",
        "name": "Queens Road Peckham Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southern",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GPCKHMQD",
      "windrush": "910GPCKHMQD"
    }
  },
  {
    "members": [
      {
        "id": "910GPCKHMRY",
        "name": "Peckham Rye Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southeastern",
          "southern",
          "thameslink",
          "windrush"
        ]
      },
      {
        "id": "910GPKHMRYC",
        "name": "Peckham Rye Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [],
        "lines": []
      }
    ],
    "lineMemberIds": {
      "southeastern": "910GPCKHMRY",
      "southern": "910GPCKHMRY",
      "thameslink": "910GPCKHMRY",
      "windrush": "910GPCKHMRY"
    }
  },
  {
    "members": [
      {
        "id": "910GPENEW",
        "name": "Penge West Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southern",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GPENEW",
      "windrush": "910GPENEW"
    }
  },
  {
    "members": [
      {
        "id": "910GRCTRYRD",
        "name": "Rectory Road Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GRCTRYRD",
      "weaver": "910GRCTRYRD"
    }
  },
  {
    "members": [
      {
        "id": "910GRDNG4AB",
        "name": "Reading Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "great-western-railway",
          "south-western-railway"
        ]
      },
      {
        "id": "910GRDNGSTN",
        "name": "Reading Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway",
          "south-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GRDNGSTN",
      "great-western-railway": "910GRDNG4AB",
      "south-western-railway": "910GRDNG4AB"
    }
  },
  {
    "members": [
      {
        "id": "910GROMFORD",
        "name": "Romford Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail",
          "overground"
        ],
        "lines": [
          "elizabeth",
          "greater-anglia",
          "liberty"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GROMFORD",
      "greater-anglia": "910GROMFORD",
      "liberty": "910GROMFORD"
    }
  },
  {
    "members": [
      {
        "id": "910GRTHERHI",
        "name": "Rotherhithe Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "windrush": "910GRTHERHI"
    }
  },
  {
    "members": [
      {
        "id": "910GSACTON",
        "name": "South Acton Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GSACTON"
    }
  },
  {
    "members": [
      {
        "id": "910GSBURY",
        "name": "Southbury Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GSBURY",
      "weaver": "910GSBURY"
    }
  },
  {
    "members": [
      {
        "id": "910GSHENFLD",
        "name": "Shenfield Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "greater-anglia"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GSHENFLD",
      "greater-anglia": "910GSHENFLD"
    }
  },
  {
    "members": [
      {
        "id": "910GSHMPSTD",
        "name": "South Hampstead Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      }
    ],
    "lineMemberIds": {
      "lioness": "910GSHMPSTD"
    }
  },
  {
    "members": [
      {
        "id": "910GSHRDHST",
        "name": "Shoreditch High Street Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "windrush": "910GSHRDHST"
    }
  },
  {
    "members": [
      {
        "id": "910GSIVRST",
        "name": "Silver Street Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GSIVRST",
      "weaver": "910GSIVRST"
    }
  },
  {
    "members": [
      {
        "id": "910GSLOUGH",
        "name": "Slough Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GSLOUGH",
      "great-western-railway": "910GSLOUGH"
    }
  },
  {
    "members": [
      {
        "id": "910GSTHALL",
        "name": "Southall Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GSTHALL",
      "great-western-railway": "910GSTHALL"
    }
  },
  {
    "members": [
      {
        "id": "910GSTJMSST",
        "name": "St James Street (London) Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "weaver": "910GSTJMSST"
    }
  },
  {
    "members": [
      {
        "id": "910GSTKNWNG",
        "name": "Stoke Newington Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GSTKNWNG",
      "weaver": "910GSTKNWNG"
    }
  },
  {
    "members": [
      {
        "id": "910GSTMFDHL",
        "name": "Stamford Hill Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GSTMFDHL",
      "weaver": "910GSTMFDHL"
    }
  },
  {
    "members": [
      {
        "id": "910GSTOTNHM",
        "name": "South Tottenham Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GSTOTNHM"
    }
  },
  {
    "members": [
      {
        "id": "910GSURREYQ",
        "name": "Surrey Quays Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "windrush": "910GSURREYQ"
    }
  },
  {
    "members": [
      {
        "id": "910GSVNKNGS",
        "name": "Seven Kings Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "greater-anglia"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GSVNKNGS",
      "greater-anglia": "910GSVNKNGS"
    }
  },
  {
    "members": [
      {
        "id": "910GTAPLOW",
        "name": "Taplow Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GTAPLOW",
      "great-western-railway": "910GTAPLOW"
    }
  },
  {
    "members": [
      {
        "id": "910GTHBLDSG",
        "name": "Theobalds Grove Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GTHBLDSG",
      "weaver": "910GTHBLDSG"
    }
  },
  {
    "members": [
      {
        "id": "910GTURKYST",
        "name": "Turkey Street Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GTURKYST",
      "weaver": "910GTURKYST"
    }
  },
  {
    "members": [
      {
        "id": "910GTWYFORD",
        "name": "Twyford Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GTWYFORD",
      "great-western-railway": "910GTWYFORD"
    }
  },
  {
    "members": [
      {
        "id": "910GUPRHLWY",
        "name": "Upper Holloway Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GUPRHLWY"
    }
  },
  {
    "members": [
      {
        "id": "910GWAPPING",
        "name": "Wapping Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "windrush": "910GWAPPING"
    }
  },
  {
    "members": [
      {
        "id": "910GWATFDHS",
        "name": "Watford High Street Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      }
    ],
    "lineMemberIds": {
      "lioness": "910GWATFDHS"
    }
  },
  {
    "members": [
      {
        "id": "910GWDGRNPK",
        "name": "Woodgrange Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GWDGRNPK"
    }
  },
  {
    "members": [
      {
        "id": "910GWDRYTON",
        "name": "West Drayton Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GWDRYTON",
      "great-western-railway": "910GWDRYTON"
    }
  },
  {
    "members": [
      {
        "id": "910GWDST",
        "name": "Wood Street Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "weaver": "910GWDST"
    }
  },
  {
    "members": [
      {
        "id": "910GWEALING",
        "name": "West Ealing Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GWEALING",
      "great-western-railway": "910GWEALING"
    }
  },
  {
    "members": [
      {
        "id": "910GWHHRTLA",
        "name": "White Hart Lane Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GWHHRTLA",
      "weaver": "910GWHHRTLA"
    }
  },
  {
    "members": [
      {
        "id": "910GWLTHQRD",
        "name": "Walthamstow Queens Road Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GWLTHQRD"
    }
  },
  {
    "members": [
      {
        "id": "910GWNDSWRD",
        "name": "Wandsworth Road Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "windrush": "910GWNDSWRD"
    }
  },
  {
    "members": [
      {
        "id": "910GWNSTDPK",
        "name": "Wanstead Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GWNSTDPK"
    }
  },
  {
    "members": [
      {
        "id": "910GWOLWXR",
        "name": "Woolwich",
        "stopType": "NaptanRailStation",
        "modes": [
          "bus",
          "elizabeth-line"
        ],
        "lines": [
          "122",
          "161",
          "177",
          "180",
          "244",
          "291",
          "301",
          "380",
          "422",
          "469",
          "53",
          "54",
          "672",
          "96",
          "99",
          "elizabeth",
          "n1",
          "n472",
          "n53",
          "sl11"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GWOLWXR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZBPSUST",
        "name": "Battersea Power Station Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZBPSUST"
    }
  },
  {
    "members": [
      {
        "id": "940GZZCRADD",
        "name": "Addiscombe Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRADV",
        "name": "Addington Village Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRAMP",
        "name": "Ampere Way Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRARA",
        "name": "Arena Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRAVE",
        "name": "Avenue Road Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRBED",
        "name": "Beddington Lane Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRBGV",
        "name": "Belgrave Walk Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRBLA",
        "name": "Blackhorse Lane Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRBRD",
        "name": "Beckenham Road Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRCEN",
        "name": "George Street Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRCHR",
        "name": "Church Street Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRCOO",
        "name": "Coombe Lane Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRCTR",
        "name": "Centrale Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRDDR",
        "name": "Dundonald Road Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRFLD",
        "name": "Fieldway Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRGRA",
        "name": "Gravel Hill Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRHAR",
        "name": "Harrington Road Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRKGH",
        "name": "King Henry's Drive Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRLEB",
        "name": "Lebanon Road Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRLOY",
        "name": "Lloyd Park Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRMCH",
        "name": "Mitcham Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRMDN",
        "name": "Morden Road Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRMTP",
        "name": "Merton Park Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRNWA",
        "name": "New Addington Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRPHI",
        "name": "Phipps Bridge Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRRVC",
        "name": "Reeves Corner Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRSAN",
        "name": "Sandilands Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRTPA",
        "name": "Therapia Lane Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRWAD",
        "name": "Waddon Marsh Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRWAN",
        "name": "Wandle Park Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRWEL",
        "name": "Wellesley Road Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZCRWOD",
        "name": "Woodside Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {}
  },
  {
    "members": [
      {
        "id": "940GZZDLABR",
        "name": "Abbey Road DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLABR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLALL",
        "name": "All Saints DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLALL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLBEC",
        "name": "Beckton DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLBEC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLBLA",
        "name": "Blackwall DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLBLA"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLBOW",
        "name": "Bow Church DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLBOW"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLBPK",
        "name": "Beckton Park DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLBPK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLCLA",
        "name": "Crossharbour DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLCLA"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLCYP",
        "name": "Cyprus DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLCYP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLDEP",
        "name": "Deptford Bridge DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLDEP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLDEV",
        "name": "Devons Road DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLDEV"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLEIN",
        "name": "East India DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "bus",
          "dlr"
        ],
        "lines": [
          "d3",
          "dlr",
          "n550",
          "sl4"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLEIN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLELV",
        "name": "Elverson Road DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLELV"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLGAL",
        "name": "Gallions Reach DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLGAL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLHEQ",
        "name": "Heron Quays DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLHEQ"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLISL",
        "name": "Island Gardens DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLISL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLKGV",
        "name": "King George V DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLKGV"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLLDP",
        "name": "Langdon Park DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLLDP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLMUD",
        "name": "Mudchute DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLMUD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLPDK",
        "name": "Pontoon Dock DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "bus",
          "dlr"
        ],
        "lines": [
          "129",
          "241",
          "330",
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLPDK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLPOP",
        "name": "Poplar DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLPOP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLPRE",
        "name": "Prince Regent DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLPRE"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLPUD",
        "name": "Pudding Mill Lane DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLPUD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLRAL",
        "name": "Royal Albert DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLRAL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLSHS",
        "name": "Stratford High Street DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLSHS"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLSIT",
        "name": "Stratford International DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLSIT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLSOQ",
        "name": "South Quay DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLSOQ"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLSTL",
        "name": "Star Lane DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "bus",
          "dlr"
        ],
        "lines": [
          "276",
          "323",
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLSTL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLWFE",
        "name": "Westferry DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLWFE"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLWIQ",
        "name": "West India Quay DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLWIQ"
    }
  },
  {
    "members": [
      {
        "id": "940GZZDLWSV",
        "name": "West Silvertown DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLWSV"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUACT",
        "name": "Acton Town Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUACT",
      "piccadilly": "940GZZLUACT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUACY",
        "name": "Archway Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUACY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUADE",
        "name": "Aldgate East Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUADE",
      "hammersmith-city": "940GZZLUADE"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUAGL",
        "name": "Angel Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUAGL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUALD",
        "name": "Aldgate Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUALD",
      "metropolitan": "940GZZLUALD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUALP",
        "name": "Alperton Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUALP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUASG",
        "name": "Arnos Grove Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUASG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUASL",
        "name": "Arsenal Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUASL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBBB",
        "name": "Bromley-by-Bow Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUBBB",
      "hammersmith-city": "940GZZLUBBB"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBBN",
        "name": "Barbican Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city",
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUBBN",
      "hammersmith-city": "940GZZLUBBN",
      "metropolitan": "940GZZLUBBN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBDS",
        "name": "Bounds Green Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUBDS"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBEC",
        "name": "Becontree Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUBEC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBKE",
        "name": "Barkingside Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUBKE"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBKH",
        "name": "Buckhurst Hill Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "bus",
          "tube"
        ],
        "lines": [
          "167",
          "677",
          "central",
          "w14"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUBKH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBLG",
        "name": "Bethnal Green Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUBLG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBMY",
        "name": "Bermondsey Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUBMY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBOR",
        "name": "Borough Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUBOR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBOS",
        "name": "Boston Manor Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUBOS"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBSC",
        "name": "Barons Court Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUBSC",
      "piccadilly": "940GZZLUBSC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBST",
        "name": "Baker Street Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo",
          "circle",
          "hammersmith-city",
          "jubilee",
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUBST",
      "circle": "940GZZLUBST",
      "hammersmith-city": "940GZZLUBST",
      "jubilee": "940GZZLUBST",
      "metropolitan": "940GZZLUBST"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBTK",
        "name": "Burnt Oak Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUBTK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBTX",
        "name": "Brent Cross Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUBTX"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBWR",
        "name": "Bow Road Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUBWR",
      "hammersmith-city": "940GZZLUBWR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBWT",
        "name": "Bayswater Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUBWT",
      "district": "940GZZLUBWT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUBZP",
        "name": "Belsize Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUBZP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCAR",
        "name": "Caledonian Road Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUCAR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCFM",
        "name": "Chalk Farm Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUCFM"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCGN",
        "name": "Covent Garden Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUCGN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCHL",
        "name": "Chancery Lane Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUCHL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCKS",
        "name": "Cockfosters Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUCKS"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCND",
        "name": "Colindale Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUCND"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCPC",
        "name": "Clapham Common Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUCPC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCPK",
        "name": "Canons Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUCPK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCPN",
        "name": "Clapham North Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUCPN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCPS",
        "name": "Clapham South Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUCPS"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCSD",
        "name": "Colliers Wood Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUCSD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCSM",
        "name": "Chesham Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUCSM"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCTN",
        "name": "Camden Town Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUCTN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCWL",
        "name": "Chigwell Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "bus",
          "tube"
        ],
        "lines": [
          "167",
          "667",
          "677",
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUCWL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCWP",
        "name": "Chiswick Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUCWP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUCXY",
        "name": "Croxley Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUCXY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUDBN",
        "name": "Debden Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUDBN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUDGE",
        "name": "Dagenham East Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUDGE"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUDGY",
        "name": "Dagenham Heathway Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUDGY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUDOH",
        "name": "Dollis Hill Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUDOH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUEAE",
        "name": "Eastcote Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUEAE",
      "piccadilly": "940GZZLUEAE"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUEAN",
        "name": "East Acton Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUEAN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUECM",
        "name": "Ealing Common Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUECM",
      "piccadilly": "940GZZLUECM"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUECT",
        "name": "Earl's Court Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUECT",
      "piccadilly": "940GZZLUECT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUEFY",
        "name": "East Finchley Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUEFY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUEGW",
        "name": "Edgware Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUEGW"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUEHM",
        "name": "East Ham Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUEHM",
      "hammersmith-city": "940GZZLUEHM"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUEMB",
        "name": "Embankment Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo",
          "circle",
          "district",
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUEMB",
      "circle": "940GZZLUEMB",
      "district": "940GZZLUEMB",
      "northern": "940GZZLUEMB"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUEPG",
        "name": "Epping Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUEPG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUEPK",
        "name": "Elm Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUEPK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUEPY",
        "name": "East Putney Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUEPY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUERB",
        "name": "Edgware Road (Bakerloo) Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUERB"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUERC",
        "name": "Edgware Road (Circle Line) Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUERC",
      "district": "940GZZLUERC",
      "hammersmith-city": "940GZZLUERC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUESQ",
        "name": "Euston Square Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city",
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUESQ",
      "hammersmith-city": "940GZZLUESQ",
      "metropolitan": "940GZZLUESQ"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUFBY",
        "name": "Fulham Broadway Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUFBY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUFLP",
        "name": "Fairlop Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUFLP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUFYC",
        "name": "Finchley Central Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUFYC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUFYR",
        "name": "Finchley Road Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee",
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUFYR",
      "metropolitan": "940GZZLUFYR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUGDG",
        "name": "Goodge Street Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUGDG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUGGH",
        "name": "Grange Hill Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "bus",
          "tube"
        ],
        "lines": [
          "462",
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUGGH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUGGN",
        "name": "Golders Green Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUGGN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUGHK",
        "name": "Goldhawk Road Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUGHK",
      "hammersmith-city": "940GZZLUGHK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUGPK",
        "name": "Green Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee",
          "piccadilly",
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUGPK",
      "piccadilly": "940GZZLUGPK",
      "victoria": "940GZZLUGPK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUGPS",
        "name": "Great Portland Street Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city",
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUGPS",
      "hammersmith-city": "940GZZLUGPS",
      "metropolitan": "940GZZLUGPS"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUGTH",
        "name": "Gants Hill Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUGTH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUGTR",
        "name": "Gloucester Road Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUGTR",
      "district": "940GZZLUGTR",
      "piccadilly": "940GZZLUGTR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHBN",
        "name": "Holborn Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUHBN",
      "piccadilly": "940GZZLUHBN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHBT",
        "name": "High Barnet Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUHBT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHCH",
        "name": "Hornchurch Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUHCH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHCL",
        "name": "Hendon Central Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUHCL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHGD",
        "name": "Hillingdon Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUHGD",
      "piccadilly": "940GZZLUHGD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHGR",
        "name": "Hanger Lane Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUHGR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHGT",
        "name": "Highgate Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUHGT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHLT",
        "name": "Hainault Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUHLT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHNX",
        "name": "Hatton Cross Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUHNX"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHPC",
        "name": "Hyde Park Corner Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUHPC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHPK",
        "name": "Holland Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUHPK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHSK",
        "name": "High Street Kensington Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUHSK",
      "district": "940GZZLUHSK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHTD",
        "name": "Hampstead Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUHTD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHWC",
        "name": "Hounslow Central Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUHWC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHWE",
        "name": "Hounslow East Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUHWE"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHWT",
        "name": "Hounslow West Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUHWT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUHWY",
        "name": "Holloway Road Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUHWY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUICK",
        "name": "Ickenham Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUICK",
      "piccadilly": "940GZZLUICK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUKBN",
        "name": "Kilburn Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUKBN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUKBY",
        "name": "Kingsbury Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUKBY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUKNB",
        "name": "Knightsbridge Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "bus",
          "tube"
        ],
        "lines": [
          "137",
          "19",
          "22",
          "452",
          "c1",
          "n137",
          "n19",
          "n22",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUKNB"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUKNG",
        "name": "Kennington Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUKNG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUKPK",
        "name": "Kilburn Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUKPK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLULAD",
        "name": "Ladbroke Grove Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLULAD",
      "hammersmith-city": "940GZZLULAD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLULBN",
        "name": "Lambeth North Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLULBN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLULGN",
        "name": "Loughton Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "bus",
          "tube"
        ],
        "lines": [
          "167",
          "20",
          "397",
          "677",
          "central",
          "w14"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLULGN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLULGT",
        "name": "Lancaster Gate Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLULGT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLULRD",
        "name": "Latimer Road Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLULRD",
      "hammersmith-city": "940GZZLULRD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLULSQ",
        "name": "Leicester Square Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLULSQ",
      "piccadilly": "940GZZLULSQ"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLULYN",
        "name": "Leyton Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLULYN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLULYS",
        "name": "Leytonstone Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLULYS"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUMBA",
        "name": "Marble Arch Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUMBA"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUMDN",
        "name": "Morden Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUMDN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUMED",
        "name": "Mile End Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central",
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUMED",
      "district": "940GZZLUMED",
      "hammersmith-city": "940GZZLUMED"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUMHL",
        "name": "Mill Hill East Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUMHL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUMMT",
        "name": "Monument Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUMMT",
      "district": "940GZZLUMMT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUMPK",
        "name": "Moor Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUMPK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUMRH",
        "name": "Manor House Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUMRH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUMSH",
        "name": "Mansion House Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUMSH",
      "district": "940GZZLUMSH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUMTC",
        "name": "Mornington Crescent Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUMTC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUMVL",
        "name": "Maida Vale Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUMVL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNAN",
        "name": "North Acton Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUNAN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNBP",
        "name": "Newbury Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUNBP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNDN",
        "name": "Neasden Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUNDN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNEN",
        "name": "North Ealing Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUNEN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNFD",
        "name": "Northfields Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUNFD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNHA",
        "name": "North Harrow Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUNHA"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNHG",
        "name": "Notting Hill Gate Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central",
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUNHG",
      "circle": "940GZZLUNHG",
      "district": "940GZZLUNHG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNHT",
        "name": "Northolt Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUNHT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNKP",
        "name": "Northwick Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUNKP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNOW",
        "name": "Northwood Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUNOW"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUNWH",
        "name": "Northwood Hills Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUNWH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUOAK",
        "name": "Oakwood Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUOAK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUOSY",
        "name": "Osterley Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUOSY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUOVL",
        "name": "Oval Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUOVL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUOXC",
        "name": "Oxford Circus Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo",
          "central",
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUOXC",
      "central": "940GZZLUOXC",
      "victoria": "940GZZLUOXC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUPCC",
        "name": "Piccadilly Circus Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUPCC",
      "piccadilly": "940GZZLUPCC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUPCO",
        "name": "Pimlico Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "victoria": "940GZZLUPCO"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUPKR",
        "name": "Park Royal Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUPKR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUPLW",
        "name": "Plaistow Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUPLW",
      "hammersmith-city": "940GZZLUPLW"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUPNR",
        "name": "Pinner Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUPNR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUPRD",
        "name": "Preston Road Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUPRD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUPSG",
        "name": "Parsons Green Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUPSG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUPVL",
        "name": "Perivale Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUPVL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUPYB",
        "name": "Putney Bridge Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUPYB"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUQBY",
        "name": "Queensbury Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUQBY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUQWY",
        "name": "Queensway Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUQWY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLURBG",
        "name": "Redbridge Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLURBG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLURGP",
        "name": "Regent's Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLURGP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLURSG",
        "name": "Ruislip Gardens Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLURSG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLURSM",
        "name": "Ruislip Manor Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLURSM",
      "piccadilly": "940GZZLURSM"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLURSP",
        "name": "Ruislip Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLURSP",
      "piccadilly": "940GZZLURSP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLURSQ",
        "name": "Russell Square Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLURSQ"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLURVP",
        "name": "Ravenscourt Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLURVP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLURVY",
        "name": "Roding Valley Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLURVY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLURYL",
        "name": "Rayners Lane Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLURYL",
      "piccadilly": "940GZZLURYL"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLURYO",
        "name": "Royal Oak Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLURYO",
      "hammersmith-city": "940GZZLURYO"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSBM",
        "name": "Shepherd's Bush Market Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUSBM",
      "hammersmith-city": "940GZZLUSBM"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSEA",
        "name": "South Ealing Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUSEA"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSFB",
        "name": "Stamford Brook Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUSFB"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSFS",
        "name": "Southfields Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUSFS"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSGN",
        "name": "Stepney Green Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUSGN",
      "hammersmith-city": "940GZZLUSGN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSGT",
        "name": "Southgate Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUSGT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSHH",
        "name": "South Harrow Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUSHH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSJP",
        "name": "St. James's Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUSJP",
      "district": "940GZZLUSJP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSJW",
        "name": "St. John's Wood Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUSJW"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSKS",
        "name": "South Kensington Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUSKS",
      "district": "940GZZLUSKS",
      "piccadilly": "940GZZLUSKS"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSKW",
        "name": "Stockwell Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern",
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUSKW",
      "victoria": "940GZZLUSKW"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSNB",
        "name": "Snaresbrook Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUSNB"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSPU",
        "name": "St. Paul's Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUSPU"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSSQ",
        "name": "Sloane Square Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUSSQ",
      "district": "940GZZLUSSQ"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSTM",
        "name": "Stanmore Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUSTM"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSUH",
        "name": "Sudbury Hill Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUSUH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSUT",
        "name": "Sudbury Town Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUSUT"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSWC",
        "name": "Swiss Cottage Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUSWC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSWF",
        "name": "South Woodford Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUSWF"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSWK",
        "name": "Southwark Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUSWK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUSWN",
        "name": "South Wimbledon Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUSWN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUTAW",
        "name": "Totteridge & Whetstone Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUTAW"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUTBC",
        "name": "Tooting Bec Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUTBC"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUTBY",
        "name": "Tooting Broadway Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUTBY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUTFP",
        "name": "Tufnell Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUTFP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUTHB",
        "name": "Theydon Bois Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUTHB"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUTMP",
        "name": "Temple Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUTMP",
      "district": "940GZZLUTMP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUTNG",
        "name": "Turnham Green Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUTNG",
      "piccadilly": "940GZZLUTNG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUTPN",
        "name": "Turnpike Lane Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUTPN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUTWH",
        "name": "Tower Hill Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUTWH",
      "district": "940GZZLUTWH"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUUPB",
        "name": "Upminster Bridge Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUUPB"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUUPK",
        "name": "Upton Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUUPK",
      "hammersmith-city": "940GZZLUUPK"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUUPY",
        "name": "Upney Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUUPY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUUXB",
        "name": "Uxbridge Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUUXB",
      "piccadilly": "940GZZLUUXB"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWAF",
        "name": "Watford Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUWAF"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWCY",
        "name": "White City Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUWCY"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWFN",
        "name": "West Finchley Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUWFN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWHW",
        "name": "West Harrow Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "metropolitan": "940GZZLUWHW"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWIG",
        "name": "Willesden Green Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee",
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUWIG",
      "metropolitan": "940GZZLUWIG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWIP",
        "name": "Wimbledon Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUWIP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWKA",
        "name": "Warwick Avenue Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUWKA"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWKN",
        "name": "West Kensington Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUWKN"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWLA",
        "name": "Wood Lane Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUWLA",
      "hammersmith-city": "940GZZLUWLA"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWOF",
        "name": "Woodford Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUWOF"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWOG",
        "name": "Wood Green Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "piccadilly": "940GZZLUWOG"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWOP",
        "name": "Woodside Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUWOP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWRR",
        "name": "Warren Street Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern",
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUWRR",
      "victoria": "940GZZLUWRR"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWSD",
        "name": "Wanstead Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUWSD"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWSP",
        "name": "Westbourne Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUWSP",
      "hammersmith-city": "940GZZLUWSP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWTA",
        "name": "West Acton Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUWTA"
    }
  },
  {
    "members": [
      {
        "id": "940GZZLUWYP",
        "name": "Wembley Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee",
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUWYP",
      "metropolitan": "940GZZLUWYP"
    }
  },
  {
    "members": [
      {
        "id": "940GZZNEUGST",
        "name": "Nine Elms Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZNEUGST"
    }
  },
  {
    "hubId": "HUBABW",
    "hubName": "Abbey Wood",
    "members": [
      {
        "id": "910GABWD",
        "name": "Abbey Wood (London) Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern",
          "thameslink"
        ]
      },
      {
        "id": "910GABWDXR",
        "name": "Abbey Wood",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GABWDXR",
      "southeastern": "910GABWD",
      "thameslink": "910GABWD"
    }
  },
  {
    "hubId": "HUBAMR",
    "hubName": "Amersham",
    "members": [
      {
        "id": "910GAMERSHM",
        "name": "Amersham Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "chiltern-railways"
        ]
      },
      {
        "id": "940GZZLUAMS",
        "name": "Amersham Underground Station",
        "stopType": "",
        "modes": [],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "chiltern-railways": "910GAMERSHM",
      "metropolitan": "940GZZLUAMS"
    }
  },
  {
    "hubId": "HUBBAL",
    "hubName": "Balham",
    "members": [
      {
        "id": "910GBALHAM",
        "name": "Balham Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southern"
        ]
      },
      {
        "id": "940GZZLUBLM",
        "name": "Balham Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "northern": "940GZZLUBLM",
      "southern": "910GBALHAM"
    }
  },
  {
    "hubId": "HUBBAN",
    "hubName": "Bank",
    "members": [
      {
        "id": "940GZZDLBNK",
        "name": "Bank DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      },
      {
        "id": "940GZZLUBNK",
        "name": "Bank Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central",
          "northern",
          "waterloo-city"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUBNK",
      "dlr": "940GZZDLBNK",
      "northern": "940GZZLUBNK",
      "waterloo-city": "940GZZLUBNK"
    }
  },
  {
    "hubId": "HUBBDS",
    "hubName": "Bond Street",
    "members": [
      {
        "id": "910GBONDST",
        "name": "Bond Street",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      },
      {
        "id": "940GZZLUBND",
        "name": "Bond Street Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central",
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUBND",
      "elizabeth": "910GBONDST",
      "jubilee": "940GZZLUBND"
    }
  },
  {
    "hubId": "HUBBEK",
    "hubName": "Beckenham Junction",
    "members": [
      {
        "id": "910GBCKNHMJ",
        "name": "Beckenham Junction Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "bus",
          "national-rail"
        ],
        "lines": [
          "162",
          "354",
          "54",
          "southeastern",
          "southern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZCRBEK",
        "name": "Beckenham Junction Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {
      "southeastern": "910GBCKNHMJ",
      "southern": "910GBCKNHMJ",
      "thameslink": "910GBCKNHMJ"
    }
  },
  {
    "hubId": "HUBBFR",
    "hubName": "Blackfriars",
    "members": [
      {
        "id": "910GBLFR",
        "name": "London Blackfriars Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZLUBKF",
        "name": "Blackfriars Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUBKF",
      "district": "940GZZLUBKF",
      "southeastern": "910GBLFR",
      "thameslink": "910GBLFR"
    }
  },
  {
    "hubId": "HUBBHO",
    "hubName": "Blackhorse Road",
    "members": [
      {
        "id": "910GBLCHSRD",
        "name": "Blackhorse Road Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "suffragette"
        ]
      },
      {
        "id": "940GZZLUBLR",
        "name": "Blackhorse Road Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "suffragette": "910GBLCHSRD",
      "victoria": "940GZZLUBLR"
    }
  },
  {
    "hubId": "HUBBIR",
    "hubName": "Birkbeck",
    "members": [
      {
        "id": "910GBIRKBCK",
        "name": "Birkbeck Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southern"
        ]
      },
      {
        "id": "940GZZCRBIR",
        "name": "Birkbeck Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GBIRKBCK"
    }
  },
  {
    "hubId": "HUBBKG",
    "hubName": "Barking",
    "members": [
      {
        "id": "910GBARKING",
        "name": "Barking Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "c2c",
          "suffragette"
        ]
      },
      {
        "id": "940GZZLUBKG",
        "name": "Barking Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "c2c": "910GBARKING",
      "district": "940GZZLUBKG",
      "hammersmith-city": "940GZZLUBKG",
      "suffragette": "910GBARKING"
    }
  },
  {
    "hubId": "HUBBRX",
    "hubName": "Brixton",
    "members": [
      {
        "id": "910GBRIXTON",
        "name": "Brixton Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern"
        ]
      },
      {
        "id": "940GZZLUBXN",
        "name": "Brixton Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "southeastern": "910GBRIXTON",
      "victoria": "940GZZLUBXN"
    }
  },
  {
    "hubId": "HUBBSH",
    "hubName": "Bushey",
    "members": [
      {
        "id": "910GBUSHEY",
        "name": "Bushey Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "west-midlands-trains"
        ]
      },
      {
        "id": "910GBUSHYDC",
        "name": "Bushey Rail Station",
        "stopType": "",
        "modes": [],
        "lines": [
          "lioness"
        ]
      }
    ],
    "lineMemberIds": {
      "lioness": "910GBUSHYDC",
      "west-midlands-trains": "910GBUSHEY"
    }
  },
  {
    "hubId": "HUBCAN",
    "hubName": "Canning Town",
    "members": [
      {
        "id": "940GZZDLCGT",
        "name": "Canning Town DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      },
      {
        "id": "940GZZLUCGT",
        "name": "Canning Town Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLCGT",
      "jubilee": "940GZZLUCGT"
    }
  },
  {
    "hubId": "HUBCAW",
    "hubName": "Canary Wharf",
    "members": [
      {
        "id": "910GCANWHRF",
        "name": "Canary Wharf",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      },
      {
        "id": "940GZZDLCAN",
        "name": "Canary Wharf DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      },
      {
        "id": "940GZZLUCYF",
        "name": "Canary Wharf Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLCAN",
      "elizabeth": "910GCANWHRF",
      "jubilee": "940GZZLUCYF"
    }
  },
  {
    "hubId": "HUBCFO",
    "hubName": "Chalfont & Latimer",
    "members": [
      {
        "id": "910GCHLFNAL",
        "name": "Chalfont & Latimer Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "chiltern-railways"
        ]
      },
      {
        "id": "940GZZLUCAL",
        "name": "Chalfont & Latimer Underground Station",
        "stopType": "",
        "modes": [],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "chiltern-railways": "910GCHLFNAL",
      "metropolitan": "940GZZLUCAL"
    }
  },
  {
    "hubId": "HUBCHX",
    "hubName": "Charing Cross",
    "members": [
      {
        "id": "910GCHRX",
        "name": "London Charing Cross Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern"
        ]
      },
      {
        "id": "940GZZLUCHX",
        "name": "Charing Cross Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo",
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUCHX",
      "northern": "940GZZLUCHX",
      "southeastern": "910GCHRX"
    }
  },
  {
    "hubId": "HUBCLJ",
    "hubName": "Clapham Junction",
    "members": [
      {
        "id": "910GCLPHMJ1",
        "name": "Clapham Junction Rail Station",
        "stopType": "",
        "modes": [],
        "lines": [
          "mildmay",
          "windrush"
        ]
      },
      {
        "id": "910GCLPHMJC",
        "name": "Clapham Junction Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "mildmay",
          "south-western-railway",
          "southern"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GCLPHMJ1",
      "south-western-railway": "910GCLPHMJC",
      "southern": "910GCLPHMJC",
      "windrush": "910GCLPHMJ1"
    }
  },
  {
    "hubId": "HUBCLW",
    "hubName": "Chorleywood",
    "members": [
      {
        "id": "910GCHRW",
        "name": "Chorleywood Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "chiltern-railways"
        ]
      },
      {
        "id": "940GZZLUCYD",
        "name": "Chorleywood Underground Station",
        "stopType": "",
        "modes": [],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "chiltern-railways": "910GCHRW",
      "metropolitan": "940GZZLUCYD"
    }
  },
  {
    "hubId": "HUBCST",
    "hubName": "Cannon Street",
    "members": [
      {
        "id": "910GCANONST",
        "name": "London Cannon Street Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern"
        ]
      },
      {
        "id": "940GZZLUCST",
        "name": "Cannon Street Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUCST",
      "district": "940GZZLUCST",
      "southeastern": "910GCANONST"
    }
  },
  {
    "hubId": "HUBCUS",
    "hubName": "Custom House",
    "members": [
      {
        "id": "910GCUSTMHS",
        "name": "Custom House Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      },
      {
        "id": "940GZZDLCUS",
        "name": "Custom House (for ExCel) DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLCUS",
      "elizabeth": "910GCUSTMHS"
    }
  },
  {
    "hubId": "HUBCUT",
    "hubName": "Cutty Sark",
    "members": [
      {
        "id": "940GZZDLCUT",
        "name": "Cutty Sark (for Maritime Greenwich) DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLCUT"
    }
  },
  {
    "hubId": "HUBCYP",
    "hubName": "Crystal Palace",
    "members": [
      {
        "id": "910GCRYSTLP",
        "name": "Crystal Palace Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southern",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GCRYSTLP",
      "windrush": "910GCRYSTLP"
    }
  },
  {
    "hubId": "HUBEAL",
    "hubName": "Ealing Broadway",
    "members": [
      {
        "id": "910GEALINGB",
        "name": "Ealing Broadway Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway"
        ]
      },
      {
        "id": "940GZZLUEBY",
        "name": "Ealing Broadway Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central",
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUEBY",
      "district": "940GZZLUEBY",
      "elizabeth": "910GEALINGB",
      "great-western-railway": "910GEALINGB"
    }
  },
  {
    "hubId": "HUBECY",
    "hubName": "East Croydon",
    "members": [
      {
        "id": "910GECROYDN",
        "name": "East Croydon Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "gatwick-express",
          "southeastern",
          "southern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZCRECR",
        "name": "East Croydon Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {
      "gatwick-express": "910GECROYDN",
      "southeastern": "910GECROYDN",
      "southern": "910GECROYDN",
      "thameslink": "910GECROYDN"
    }
  },
  {
    "hubId": "HUBELM",
    "hubName": "Elmers End",
    "members": [
      {
        "id": "490G00019451",
        "name": "Elmers End Interchange",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "289",
          "54"
        ]
      },
      {
        "id": "910GELMERSE",
        "name": "Elmers End Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern"
        ]
      },
      {
        "id": "940GZZCRELM",
        "name": "Elmers End Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {
      "southeastern": "910GELMERSE"
    }
  },
  {
    "hubId": "HUBEPH",
    "hubName": "Elephant & Castle",
    "members": [
      {
        "id": "910GELPHNAC",
        "name": "Elephant & Castle Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZLUEAC",
        "name": "Elephant & Castle Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo",
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUEAC",
      "northern": "940GZZLUEAC",
      "southeastern": "910GELPHNAC",
      "thameslink": "910GELPHNAC"
    }
  },
  {
    "hubId": "HUBEUS",
    "hubName": "Euston",
    "members": [
      {
        "id": "490G000652",
        "name": "Euston Bus Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "30",
          "68",
          "n253"
        ]
      },
      {
        "id": "910GEUSTON",
        "name": "London Euston Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "avanti-west-coast",
          "lioness",
          "west-midlands-trains"
        ]
      },
      {
        "id": "940GZZLUEUS",
        "name": "Euston Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern",
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "avanti-west-coast": "910GEUSTON",
      "lioness": "910GEUSTON",
      "northern": "940GZZLUEUS",
      "victoria": "940GZZLUEUS",
      "west-midlands-trains": "910GEUSTON"
    }
  },
  {
    "hubId": "HUBFPK",
    "hubName": "Finsbury Park",
    "members": [
      {
        "id": "910GFNPK",
        "name": "Finsbury Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "great-northern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZLUFPK",
        "name": "Finsbury Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly",
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "great-northern": "910GFNPK",
      "piccadilly": "940GZZLUFPK",
      "thameslink": "910GFNPK",
      "victoria": "940GZZLUFPK"
    }
  },
  {
    "hubId": "HUBGFD",
    "hubName": "Greenford",
    "members": [
      {
        "id": "910GGFORD",
        "name": "Greenford Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "great-western-railway"
        ]
      },
      {
        "id": "940GZZLUGFD",
        "name": "Greenford Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUGFD",
      "great-western-railway": "910GGFORD"
    }
  },
  {
    "hubId": "HUBGNW",
    "hubName": "Greenwich",
    "members": [
      {
        "id": "910GGNWH",
        "name": "Greenwich Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZDLGRE",
        "name": "Greenwich DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLGRE",
      "southeastern": "910GGNWH",
      "thameslink": "910GGNWH"
    }
  },
  {
    "hubId": "HUBGUN",
    "hubName": "Gunnersbury",
    "members": [
      {
        "id": "910GGNRSBRY",
        "name": "Gunnersbury Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      },
      {
        "id": "940GZZLUGBY",
        "name": "Gunnersbury Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUGBY",
      "mildmay": "910GGNRSBRY"
    }
  },
  {
    "hubId": "HUBH13",
    "hubName": "Heathrow Terminals 2 & 3",
    "members": [
      {
        "id": "910GHTRWAPT",
        "name": "Heathrow Terminals 2 & 3 Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "heathrow-express"
        ]
      },
      {
        "id": "910GHTRWCBS",
        "name": "Heathrow Central Bus Stn (Rail-Air)",
        "stopType": "NaptanRailStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "105",
          "111",
          "278",
          "285",
          "a10",
          "n140",
          "n9",
          "sl7",
          "sl9",
          "u3"
        ]
      },
      {
        "id": "940GZZLUHRC",
        "name": "Heathrow Terminals 2 & 3 Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GHTRWAPT",
      "heathrow-express": "910GHTRWAPT",
      "piccadilly": "940GZZLUHRC"
    }
  },
  {
    "hubId": "HUBHDN",
    "hubName": "Harlesden",
    "members": [
      {
        "id": "910GHARLSDN",
        "name": "Harlesden Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      },
      {
        "id": "940GZZLUHSN",
        "name": "Harlesden Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUHSN",
      "lioness": "910GHARLSDN"
    }
  },
  {
    "hubId": "HUBHHY",
    "hubName": "Highbury & Islington",
    "members": [
      {
        "id": "910GHGHI",
        "name": "Highbury & Islington Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "great-northern",
          "mildmay",
          "windrush"
        ]
      },
      {
        "id": "940GZZLUHAI",
        "name": "Highbury & Islington Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "great-northern": "910GHGHI",
      "mildmay": "910GHGHI",
      "victoria": "940GZZLUHAI",
      "windrush": "910GHGHI"
    }
  },
  {
    "hubId": "HUBHMS",
    "hubName": "Hammersmith",
    "members": [
      {
        "id": "490G000565",
        "name": "Hammersmith Bus Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "110",
          "190",
          "211",
          "218",
          "220",
          "267",
          "27",
          "295",
          "306",
          "533",
          "72",
          "9",
          "h91",
          "n11",
          "n266",
          "n27",
          "n33",
          "n72",
          "n9",
          "n97"
        ]
      },
      {
        "id": "940GZZLUHSC",
        "name": "Hammersmith (H&C Line) Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city"
        ]
      },
      {
        "id": "940GZZLUHSD",
        "name": "Hammersmith (Dist&Picc Line) Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUHSC",
      "district": "940GZZLUHSD",
      "hammersmith-city": "940GZZLUHSC",
      "piccadilly": "940GZZLUHSD"
    }
  },
  {
    "hubId": "HUBHOH",
    "hubName": "Harrow-on-the-Hill",
    "members": [
      {
        "id": "490G000574",
        "name": "Harrow Bus Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "114",
          "140",
          "182",
          "183",
          "223",
          "258",
          "340",
          "395",
          "483",
          "640",
          "h10",
          "h11",
          "h14",
          "h17",
          "h18",
          "h19",
          "h9",
          "n140",
          "n18",
          "sl10",
          "sl9"
        ]
      },
      {
        "id": "910GHAROOTH",
        "name": "Harrow-on-the-Hill Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "chiltern-railways"
        ]
      },
      {
        "id": "940GZZLUHOH",
        "name": "Harrow-on-the-Hill Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "chiltern-railways": "910GHAROOTH",
      "metropolitan": "940GZZLUHOH"
    }
  },
  {
    "hubId": "HUBHRW",
    "hubName": "Harrow & Wealdstone",
    "members": [
      {
        "id": "910GHROW",
        "name": "Harrow & Wealdstone Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "lioness",
          "southern",
          "west-midlands-trains"
        ]
      },
      {
        "id": "940GZZLUHAW",
        "name": "Harrow & Wealdstone Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUHAW",
      "lioness": "910GHROW",
      "southern": "910GHROW",
      "west-midlands-trains": "910GHROW"
    }
  },
  {
    "hubId": "HUBHX4",
    "hubName": "Heathrow Airport Terminal 4",
    "members": [
      {
        "id": "910GHTRWTE4",
        "name": "Heathrow Terminal 4 (Rail-Air)",
        "stopType": "NaptanRailStation",
        "modes": [],
        "lines": []
      },
      {
        "id": "910GHTRWTM4",
        "name": "Heathrow Terminal 4 Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      },
      {
        "id": "940GZZLUHR4",
        "name": "Heathrow Terminal 4 Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GHTRWTM4",
      "piccadilly": "940GZZLUHR4"
    }
  },
  {
    "hubId": "HUBHX5",
    "hubName": "Heathrow Airport Terminal 5",
    "members": [
      {
        "id": "910GHTRWTM5",
        "name": "Heathrow Terminal 5 Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "heathrow-express"
        ]
      },
      {
        "id": "940GZZLUHR5",
        "name": "Heathrow Terminal 5 Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "piccadilly"
        ]
      }
    ],
    "lineMemberIds": {
      "elizabeth": "910GHTRWTM5",
      "heathrow-express": "910GHTRWTM5",
      "piccadilly": "940GZZLUHR5"
    }
  },
  {
    "hubId": "HUBIMP",
    "hubName": "Imperial Wharf",
    "members": [
      {
        "id": "910GCSEAH",
        "name": "Imperial Wharf Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "mildmay",
          "southern"
        ]
      }
    ],
    "lineMemberIds": {
      "mildmay": "910GCSEAH",
      "southern": "910GCSEAH"
    }
  },
  {
    "hubId": "HUBKGX",
    "hubName": "King's Cross & St Pancras International",
    "members": [
      {
        "id": "910GKNGX",
        "name": "London King's Cross Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "grand-central",
          "great-northern",
          "hull-trains",
          "london-north-eastern-railway",
          "lumo",
          "thameslink"
        ]
      },
      {
        "id": "910GSTPADOM",
        "name": "London St Pancras International Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern"
        ]
      },
      {
        "id": "910GSTPX",
        "name": "London St Pancras International Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "east-midlands-railway",
          "hull-trains",
          "southeastern",
          "thameslink"
        ]
      },
      {
        "id": "910GSTPXBOX",
        "name": "London St Pancras International LL Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "hull-trains",
          "thameslink"
        ]
      },
      {
        "id": "940GZZLUKSX",
        "name": "King's Cross St. Pancras Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city",
          "metropolitan",
          "northern",
          "piccadilly",
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUKSX",
      "east-midlands-railway": "910GSTPX",
      "grand-central": "910GKNGX",
      "great-northern": "910GKNGX",
      "hammersmith-city": "940GZZLUKSX",
      "hull-trains": "910GKNGX",
      "london-north-eastern-railway": "910GKNGX",
      "lumo": "910GKNGX",
      "metropolitan": "940GZZLUKSX",
      "northern": "940GZZLUKSX",
      "piccadilly": "940GZZLUKSX",
      "southeastern": "910GSTPX",
      "thameslink": "910GSTPX",
      "victoria": "940GZZLUKSX"
    }
  },
  {
    "hubId": "HUBKNL",
    "hubName": "Kensal Green",
    "members": [
      {
        "id": "910GKENSLG",
        "name": "Kensal Green Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      },
      {
        "id": "940GZZLUKSL",
        "name": "Kensal Green Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUKSL",
      "lioness": "910GKENSLG"
    }
  },
  {
    "hubId": "HUBKNT",
    "hubName": "Kenton",
    "members": [
      {
        "id": "910GKTON",
        "name": "Kenton Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      },
      {
        "id": "940GZZLUKEN",
        "name": "Kenton Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUKEN",
      "lioness": "910GKTON"
    }
  },
  {
    "hubId": "HUBKPA",
    "hubName": "Kensington (Olympia)",
    "members": [
      {
        "id": "910GKENOLYM",
        "name": "Kensington (Olympia) Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "mildmay",
          "southern"
        ]
      },
      {
        "id": "940GZZLUKOY",
        "name": "Kensington (Olympia) Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUKOY",
      "mildmay": "910GKENOLYM",
      "southern": "910GKENOLYM"
    }
  },
  {
    "hubId": "HUBKTN",
    "hubName": "Kentish Town",
    "members": [
      {
        "id": "910GKNTSHTN",
        "name": "Kentish Town Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "east-midlands-railway",
          "thameslink"
        ]
      },
      {
        "id": "940GZZLUKSH",
        "name": "Kentish Town Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "east-midlands-railway": "910GKNTSHTN",
      "northern": "940GZZLUKSH",
      "thameslink": "910GKNTSHTN"
    }
  },
  {
    "hubId": "HUBKWG",
    "hubName": "Kew Gardens",
    "members": [
      {
        "id": "910GKEWGRDN",
        "name": "Kew Gardens Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      },
      {
        "id": "940GZZLUKWG",
        "name": "Kew Gardens Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUKWG",
      "mildmay": "910GKEWGRDN"
    }
  },
  {
    "hubId": "HUBLBG",
    "hubName": "London Bridge",
    "members": [
      {
        "id": "490G000970",
        "name": "London Bridge Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "141",
          "149",
          "17",
          "388",
          "43",
          "n21",
          "n343"
        ]
      },
      {
        "id": "910GLNDNBDC",
        "name": "London Bridge Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern",
          "southern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZLULNB",
        "name": "London Bridge Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee",
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLULNB",
      "northern": "940GZZLULNB",
      "southeastern": "910GLNDNBDC",
      "southern": "910GLNDNBDC",
      "thameslink": "910GLNDNBDC"
    }
  },
  {
    "hubId": "HUBLCY",
    "hubName": "London City Airport",
    "members": [
      {
        "id": "940GZZDLLCA",
        "name": "London City Airport DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLLCA"
    }
  },
  {
    "hubId": "HUBLEW",
    "hubName": "Lewisham",
    "members": [
      {
        "id": "910GLEWISHM",
        "name": "Lewisham Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZDLLEW",
        "name": "Lewisham DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLLEW",
      "southeastern": "910GLEWISHM",
      "thameslink": "910GLEWISHM"
    }
  },
  {
    "hubId": "HUBLHS",
    "hubName": "Limehouse",
    "members": [
      {
        "id": "910GLIMHSE",
        "name": "Limehouse Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "c2c"
        ]
      },
      {
        "id": "940GZZDLLIM",
        "name": "Limehouse DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "c2c": "910GLIMHSE",
      "dlr": "940GZZDLLIM"
    }
  },
  {
    "hubId": "HUBLST",
    "hubName": "Liverpool Street",
    "members": [
      {
        "id": "910GLIVST",
        "name": "London Liverpool Street Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail",
          "overground"
        ],
        "lines": [
          "c2c",
          "elizabeth",
          "greater-anglia",
          "weaver"
        ]
      },
      {
        "id": "910GLIVSTLL",
        "name": "Liverpool Street",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      },
      {
        "id": "940GZZLULVT",
        "name": "Liverpool Street Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central",
          "circle",
          "hammersmith-city",
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "c2c": "910GLIVST",
      "central": "940GZZLULVT",
      "circle": "940GZZLULVT",
      "elizabeth": "910GLIVST",
      "greater-anglia": "910GLIVST",
      "hammersmith-city": "940GZZLULVT",
      "metropolitan": "940GZZLULVT",
      "weaver": "910GLIVST"
    }
  },
  {
    "hubId": "HUBMJT",
    "hubName": "Mitcham Junction",
    "members": [
      {
        "id": "910GMITCHMJ",
        "name": "Mitcham Junction Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZCRMJT",
        "name": "Mitcham Junction Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GMITCHMJ",
      "thameslink": "910GMITCHMJ"
    }
  },
  {
    "hubId": "HUBMYB",
    "hubName": "Marylebone",
    "members": [
      {
        "id": "910GMARYLBN",
        "name": "London Marylebone Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "chiltern-railways"
        ]
      },
      {
        "id": "940GZZLUMYB",
        "name": "Marylebone Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUMYB",
      "chiltern-railways": "910GMARYLBN"
    }
  },
  {
    "hubId": "HUBNGW",
    "hubName": "North Greenwich",
    "members": [
      {
        "id": "940GZZALGWP",
        "name": "Greenwich Peninsula",
        "stopType": "NaptanMetroStation",
        "modes": [
          "cable-car"
        ],
        "lines": [
          "london-cable-car"
        ]
      },
      {
        "id": "940GZZLUNGW",
        "name": "North Greenwich Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUNGW",
      "london-cable-car": "940GZZALGWP"
    }
  },
  {
    "hubId": "HUBNWB",
    "hubName": "North Wembley",
    "members": [
      {
        "id": "910GNWEMBLY",
        "name": "North Wembley Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      },
      {
        "id": "940GZZLUNWY",
        "name": "North Wembley Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUNWY",
      "lioness": "910GNWEMBLY"
    }
  },
  {
    "hubId": "HUBNWD",
    "hubName": "Norwood Junction",
    "members": [
      {
        "id": "910GNORWDJ",
        "name": "Norwood Junction Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southeastern",
          "southern",
          "thameslink",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southeastern": "910GNORWDJ",
      "southern": "910GNORWDJ",
      "thameslink": "910GNORWDJ",
      "windrush": "910GNORWDJ"
    }
  },
  {
    "hubId": "HUBNWX",
    "hubName": "New Cross",
    "members": [
      {
        "id": "910GNWCRELL",
        "name": "New Cross ELL Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southeastern",
          "windrush"
        ]
      },
      {
        "id": "910GNWCROSS",
        "name": "New Cross Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [],
        "lines": []
      }
    ],
    "lineMemberIds": {
      "southeastern": "910GNWCRELL",
      "windrush": "910GNWCRELL"
    }
  },
  {
    "hubId": "HUBNXG",
    "hubName": "New Cross Gate",
    "members": [
      {
        "id": "910GNEWXGEL",
        "name": "New Cross Gate ELL Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [],
        "lines": []
      },
      {
        "id": "910GNEWXGTE",
        "name": "New Cross Gate Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southern",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GNEWXGTE",
      "windrush": "910GNEWXGTE"
    }
  },
  {
    "hubId": "HUBOLD",
    "hubName": "Old Street",
    "members": [
      {
        "id": "910GOLDST",
        "name": "Old Street Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "great-northern"
        ]
      },
      {
        "id": "940GZZLUODS",
        "name": "Old Street Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "great-northern": "910GOLDST",
      "northern": "940GZZLUODS"
    }
  },
  {
    "hubId": "HUBPAD",
    "hubName": "Paddington",
    "members": [
      {
        "id": "910GPADTLL",
        "name": "Paddington",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      },
      {
        "id": "910GPADTON",
        "name": "London Paddington Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail"
        ],
        "lines": [
          "elizabeth",
          "great-western-railway",
          "heathrow-express"
        ]
      },
      {
        "id": "940GZZLUPAC",
        "name": "Paddington Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo",
          "circle",
          "district"
        ]
      },
      {
        "id": "940GZZLUPAH",
        "name": "Paddington (H&C Line)-Underground",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUPAC",
      "circle": "940GZZLUPAC",
      "district": "940GZZLUPAC",
      "elizabeth": "910GPADTLL",
      "great-western-railway": "910GPADTON",
      "hammersmith-city": "940GZZLUPAH",
      "heathrow-express": "910GPADTON"
    }
  },
  {
    "hubId": "HUBQPW",
    "hubName": "Queen's Park",
    "members": [
      {
        "id": "910GQPRK",
        "name": "Queens Park (London) Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      },
      {
        "id": "940GZZLUQPS",
        "name": "Queen's Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUQPS",
      "lioness": "910GQPRK"
    }
  },
  {
    "hubId": "HUBRIC",
    "hubName": "Rickmansworth",
    "members": [
      {
        "id": "910GRCKMNSW",
        "name": "Rickmansworth Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "chiltern-railways"
        ]
      },
      {
        "id": "940GZZLURKW",
        "name": "Rickmansworth Underground Station",
        "stopType": "",
        "modes": [],
        "lines": [
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "chiltern-railways": "910GRCKMNSW",
      "metropolitan": "940GZZLURKW"
    }
  },
  {
    "hubId": "HUBRMD",
    "hubName": "Richmond",
    "members": [
      {
        "id": "910GRICHMND",
        "name": "Richmond (London) Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "mildmay",
          "south-western-railway"
        ]
      },
      {
        "id": "940GZZLURMD",
        "name": "Richmond Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLURMD",
      "mildmay": "910GRICHMND",
      "south-western-railway": "910GRICHMND"
    }
  },
  {
    "hubId": "HUBRVC",
    "hubName": "Royal Victoria",
    "members": [
      {
        "id": "940GZZALRDK",
        "name": "Royal Docks",
        "stopType": "NaptanMetroStation",
        "modes": [
          "cable-car"
        ],
        "lines": [
          "london-cable-car"
        ]
      },
      {
        "id": "940GZZDLRVC",
        "name": "Royal Victoria DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLRVC",
      "london-cable-car": "940GZZALRDK"
    }
  },
  {
    "hubId": "HUBSBP",
    "hubName": "Stonebridge Park",
    "members": [
      {
        "id": "910GSTNBGPK",
        "name": "Stonebridge Park Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      },
      {
        "id": "940GZZLUSGP",
        "name": "Stonebridge Park Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUSGP",
      "lioness": "910GSTNBGPK"
    }
  },
  {
    "hubId": "HUBSDE",
    "hubName": "Shadwell",
    "members": [
      {
        "id": "910GSHADWEL",
        "name": "Shadwell Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      },
      {
        "id": "940GZZDLSHA",
        "name": "Shadwell DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLSHA",
      "windrush": "910GSHADWEL"
    }
  },
  {
    "hubId": "HUBSOK",
    "hubName": "South Kenton",
    "members": [
      {
        "id": "910GSKENTON",
        "name": "South Kenton Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness"
        ]
      },
      {
        "id": "940GZZLUSKT",
        "name": "South Kenton Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUSKT",
      "lioness": "910GSKENTON"
    }
  },
  {
    "hubId": "HUBSPB",
    "hubName": "Shepherd's Bush",
    "members": [
      {
        "id": "910GSHPDSB",
        "name": "Shepherds Bush Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "mildmay",
          "southern"
        ]
      },
      {
        "id": "940GZZLUSBC",
        "name": "Shepherd's Bush (Central) Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUSBC",
      "mildmay": "910GSHPDSB",
      "southern": "910GSHPDSB"
    }
  },
  {
    "hubId": "HUBSRA",
    "hubName": "Stratford",
    "members": [
      {
        "id": "490G00019793",
        "name": "Stratford City Bus Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "108",
          "241",
          "308",
          "339",
          "388",
          "97",
          "n205"
        ]
      },
      {
        "id": "490G000773",
        "name": "Stratford Bus Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "104",
          "158",
          "238",
          "241",
          "25",
          "257",
          "262",
          "276",
          "308",
          "425",
          "473",
          "678",
          "69",
          "86",
          "d8",
          "n25",
          "n8",
          "n86"
        ]
      },
      {
        "id": "910GSTFD",
        "name": "Stratford (London) Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line",
          "national-rail",
          "overground"
        ],
        "lines": [
          "c2c",
          "elizabeth",
          "greater-anglia",
          "mildmay"
        ]
      },
      {
        "id": "940GZZDLSTD",
        "name": "Stratford DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      },
      {
        "id": "940GZZLUSTD",
        "name": "Stratford Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central",
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "c2c": "910GSTFD",
      "central": "940GZZLUSTD",
      "dlr": "940GZZDLSTD",
      "elizabeth": "910GSTFD",
      "greater-anglia": "910GSTFD",
      "jubilee": "940GZZLUSTD",
      "mildmay": "910GSTFD"
    }
  },
  {
    "hubId": "HUBSRU",
    "hubName": "South Ruislip",
    "members": [
      {
        "id": "910GSRUISLP",
        "name": "South Ruislip Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "chiltern-railways"
        ]
      },
      {
        "id": "940GZZLUSRP",
        "name": "South Ruislip Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUSRP",
      "chiltern-railways": "910GSRUISLP"
    }
  },
  {
    "hubId": "HUBSVS",
    "hubName": "Seven Sisters",
    "members": [
      {
        "id": "910GSEVNSIS",
        "name": "Seven Sisters Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "greater-anglia",
          "weaver"
        ]
      },
      {
        "id": "940GZZLUSVS",
        "name": "Seven Sisters Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GSEVNSIS",
      "victoria": "940GZZLUSVS",
      "weaver": "910GSEVNSIS"
    }
  },
  {
    "hubId": "HUBSYD",
    "hubName": "Sydenham",
    "members": [
      {
        "id": "910GSYDENHM",
        "name": "Sydenham Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southern",
          "windrush"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GSYDENHM",
      "windrush": "910GSYDENHM"
    }
  },
  {
    "hubId": "HUBTCR",
    "hubName": "Tottenham Court Road",
    "members": [
      {
        "id": "910GTOTCTRD",
        "name": "Tottenham Court Road",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      },
      {
        "id": "940GZZLUTCR",
        "name": "Tottenham Court Road Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central",
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUTCR",
      "elizabeth": "910GTOTCTRD",
      "northern": "940GZZLUTCR"
    }
  },
  {
    "hubId": "HUBTOG",
    "hubName": "Tower Gateway",
    "members": [
      {
        "id": "940GZZDLTWG",
        "name": "Tower Gateway DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLTWG"
    }
  },
  {
    "hubId": "HUBTOM",
    "hubName": "Tottenham Hale",
    "members": [
      {
        "id": "490G000667",
        "name": "Tottenham Hale Bus Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": []
      },
      {
        "id": "910GTTNHMHL",
        "name": "Tottenham Hale Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "greater-anglia"
        ]
      },
      {
        "id": "940GZZLUTMH",
        "name": "Tottenham Hale Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "greater-anglia": "910GTTNHMHL",
      "victoria": "940GZZLUTMH"
    }
  },
  {
    "hubId": "HUBUPM",
    "hubName": "Upminster",
    "members": [
      {
        "id": "910GUPMNSTR",
        "name": "Upminster Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "c2c",
          "liberty"
        ]
      },
      {
        "id": "940GZZLUUPM",
        "name": "Upminster Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "c2c": "910GUPMNSTR",
      "district": "940GZZLUUPM",
      "liberty": "910GUPMNSTR"
    }
  },
  {
    "hubId": "HUBVIC",
    "hubName": "Victoria",
    "members": [
      {
        "id": "490G000812",
        "name": "Victoria Bus Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "3",
          "38",
          "390",
          "52",
          "n38"
        ]
      },
      {
        "id": "910GVICTRIC",
        "name": "London Victoria Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "gatwick-express",
          "southeastern",
          "southern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZLUVIC",
        "name": "Victoria Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district",
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUVIC",
      "district": "940GZZLUVIC",
      "gatwick-express": "910GVICTRIC",
      "southeastern": "910GVICTRIC",
      "southern": "910GVICTRIC",
      "thameslink": "910GVICTRIC",
      "victoria": "940GZZLUVIC"
    }
  },
  {
    "hubId": "HUBVXH",
    "hubName": "Vauxhall",
    "members": [
      {
        "id": "490G00020252",
        "name": "Vauxhall Bus Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": []
      },
      {
        "id": "910GVAUXHLM",
        "name": "Vauxhall Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "south-western-railway"
        ]
      },
      {
        "id": "940GZZLUVXL",
        "name": "Vauxhall Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "south-western-railway": "910GVAUXHLM",
      "victoria": "940GZZLUVXL"
    }
  },
  {
    "hubId": "HUBWAT",
    "hubName": "Waterloo",
    "members": [
      {
        "id": "910GWATRLMN",
        "name": "London Waterloo Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "south-western-railway"
        ]
      },
      {
        "id": "940GZZLUWLO",
        "name": "Waterloo Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo",
          "jubilee",
          "northern",
          "waterloo-city"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUWLO",
      "jubilee": "940GZZLUWLO",
      "northern": "940GZZLUWLO",
      "south-western-railway": "910GWATRLMN",
      "waterloo-city": "940GZZLUWLO"
    }
  },
  {
    "hubId": "HUBWBP",
    "hubName": "West Brompton",
    "members": [
      {
        "id": "910GWBRMPTN",
        "name": "West Brompton Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "mildmay",
          "southern"
        ]
      },
      {
        "id": "940GZZLUWBN",
        "name": "West Brompton Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUWBN",
      "mildmay": "910GWBRMPTN",
      "southern": "910GWBRMPTN"
    }
  },
  {
    "hubId": "HUBWCY",
    "hubName": "West Croydon",
    "members": [
      {
        "id": "490G000824",
        "name": "West Croydon Bus Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "109",
          "154",
          "157",
          "166",
          "194",
          "198",
          "250",
          "264",
          "289",
          "367",
          "403",
          "407",
          "410",
          "450",
          "60",
          "64",
          "645",
          "689",
          "75",
          "n109",
          "n250",
          "sl6",
          "sl7"
        ]
      },
      {
        "id": "910GWCROYDN",
        "name": "West Croydon Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "southern",
          "windrush"
        ]
      },
      {
        "id": "940GZZCRWCR",
        "name": "West Croydon Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      }
    ],
    "lineMemberIds": {
      "southern": "910GWCROYDN",
      "windrush": "910GWCROYDN"
    }
  },
  {
    "hubId": "HUBWEH",
    "hubName": "West Ham",
    "members": [
      {
        "id": "910GWHAMHL",
        "name": "West Ham Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "c2c"
        ]
      },
      {
        "id": "940GZZDLWHM",
        "name": "West Ham DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      },
      {
        "id": "940GZZLUWHM",
        "name": "West Ham Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "hammersmith-city",
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "c2c": "910GWHAMHL",
      "district": "940GZZLUWHM",
      "dlr": "940GZZDLWHM",
      "hammersmith-city": "940GZZLUWHM",
      "jubilee": "940GZZLUWHM"
    }
  },
  {
    "hubId": "HUBWFJ",
    "hubName": "Watford Junction",
    "members": [
      {
        "id": "910GWATFDJ",
        "name": "Watford Junction Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "avanti-west-coast",
          "southern",
          "west-midlands-trains"
        ]
      },
      {
        "id": "910GWATFJDC",
        "name": "Watford Junction Rail Station",
        "stopType": "",
        "modes": [],
        "lines": [
          "lioness"
        ]
      }
    ],
    "lineMemberIds": {
      "avanti-west-coast": "910GWATFDJ",
      "lioness": "910GWATFJDC",
      "southern": "910GWATFDJ",
      "west-midlands-trains": "910GWATFDJ"
    }
  },
  {
    "hubId": "HUBWHC",
    "hubName": "Walthamstow Central",
    "members": [
      {
        "id": "910GWLTWCEN",
        "name": "Walthamstow Central Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "weaver"
        ]
      },
      {
        "id": "940GZZLUWWL",
        "name": "Walthamstow Central Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "victoria"
        ]
      }
    ],
    "lineMemberIds": {
      "victoria": "940GZZLUWWL",
      "weaver": "910GWLTWCEN"
    }
  },
  {
    "hubId": "HUBWHD",
    "hubName": "West Hampstead",
    "members": [
      {
        "id": "910GWHMDSTD",
        "name": "West Hampstead Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "mildmay"
        ]
      },
      {
        "id": "910GWHMPSTM",
        "name": "West Hampstead Thameslink Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "thameslink"
        ]
      },
      {
        "id": "940GZZLUWHP",
        "name": "West Hampstead Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUWHP",
      "mildmay": "910GWHMDSTD",
      "thameslink": "910GWHMPSTM"
    }
  },
  {
    "hubId": "HUBWIJ",
    "hubName": "Willesden Junction",
    "members": [
      {
        "id": "910GWLSDJHL",
        "name": "Willesden Junction Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "lioness",
          "mildmay"
        ]
      },
      {
        "id": "940GZZLUWJN",
        "name": "Willesden Junction Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUWJN",
      "lioness": "910GWLSDJHL",
      "mildmay": "910GWLSDJHL"
    }
  },
  {
    "hubId": "HUBWIM",
    "hubName": "Wimbledon",
    "members": [
      {
        "id": "910GWDON",
        "name": "Wimbledon Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "south-western-railway"
        ]
      },
      {
        "id": "940GZZCRWMB",
        "name": "Wimbledon Tram Stop",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tram"
        ],
        "lines": [
          "tram"
        ]
      },
      {
        "id": "940GZZLUWIM",
        "name": "Wimbledon Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUWIM",
      "south-western-railway": "910GWDON"
    }
  },
  {
    "hubId": "HUBWMB",
    "hubName": "Wembley Central",
    "members": [
      {
        "id": "910GWMBY",
        "name": "Wembley Central Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail",
          "overground"
        ],
        "lines": [
          "lioness",
          "southern"
        ]
      },
      {
        "id": "940GZZLUWYC",
        "name": "Wembley Central Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "bakerloo"
        ]
      }
    ],
    "lineMemberIds": {
      "bakerloo": "940GZZLUWYC",
      "lioness": "910GWMBY",
      "southern": "910GWMBY"
    }
  },
  {
    "hubId": "HUBWRU",
    "hubName": "West Ruislip",
    "members": [
      {
        "id": "910GWRUISLP",
        "name": "West Ruislip Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "chiltern-railways"
        ]
      },
      {
        "id": "940GZZLUWRP",
        "name": "West Ruislip Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "central"
        ]
      }
    ],
    "lineMemberIds": {
      "central": "940GZZLUWRP",
      "chiltern-railways": "910GWRUISLP"
    }
  },
  {
    "hubId": "HUBWSM",
    "hubName": "Westminster",
    "members": [
      {
        "id": "940GZZLUWSM",
        "name": "Westminster Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "district",
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUWSM",
      "district": "940GZZLUWSM",
      "jubilee": "940GZZLUWSM"
    }
  },
  {
    "hubId": "HUBWWA",
    "hubName": "Woolwich Arsenal",
    "members": [
      {
        "id": "910GWOLWCHA",
        "name": "Woolwich Arsenal Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "southeastern",
          "thameslink"
        ]
      },
      {
        "id": "940GZZDLWLA",
        "name": "Woolwich Arsenal DLR Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "dlr"
        ],
        "lines": [
          "dlr"
        ]
      }
    ],
    "lineMemberIds": {
      "dlr": "940GZZDLWLA",
      "southeastern": "910GWOLWCHA",
      "thameslink": "910GWOLWCHA"
    }
  },
  {
    "hubId": "HUBZCW",
    "hubName": "Canada Water",
    "members": [
      {
        "id": "490G000438",
        "name": "Canada Water Bus Station",
        "stopType": "NaptanBusCoachStation",
        "modes": [
          "bus"
        ],
        "lines": [
          "1",
          "188",
          "199",
          "225",
          "381",
          "47",
          "c10",
          "n199",
          "n381",
          "p12"
        ]
      },
      {
        "id": "910GCNDAW",
        "name": "Canada Water Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      },
      {
        "id": "940GZZLUCWR",
        "name": "Canada Water Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "jubilee"
        ]
      }
    ],
    "lineMemberIds": {
      "jubilee": "940GZZLUCWR",
      "windrush": "910GCNDAW"
    }
  },
  {
    "hubId": "HUBZFD",
    "hubName": "Farringdon",
    "members": [
      {
        "id": "910GFRNDNLT",
        "name": "Farringdon Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "thameslink"
        ]
      },
      {
        "id": "910GFRNDXR",
        "name": "Farringdon",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      },
      {
        "id": "940GZZLUFCN",
        "name": "Farringdon Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city",
          "metropolitan"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUFCN",
      "elizabeth": "910GFRNDXR",
      "hammersmith-city": "940GZZLUFCN",
      "metropolitan": "940GZZLUFCN",
      "thameslink": "910GFRNDNLT"
    }
  },
  {
    "hubId": "HUBZMG",
    "hubName": "Moorgate",
    "members": [
      {
        "id": "910GMRGT",
        "name": "Moorgate Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "national-rail"
        ],
        "lines": [
          "great-northern"
        ]
      },
      {
        "id": "940GZZLUMGT",
        "name": "Moorgate Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "circle",
          "hammersmith-city",
          "metropolitan",
          "northern"
        ]
      }
    ],
    "lineMemberIds": {
      "circle": "940GZZLUMGT",
      "great-northern": "910GMRGT",
      "hammersmith-city": "940GZZLUMGT",
      "metropolitan": "940GZZLUMGT",
      "northern": "940GZZLUMGT"
    }
  },
  {
    "hubId": "HUBZWL",
    "hubName": "Whitechapel",
    "members": [
      {
        "id": "910GWCHAPEL",
        "name": "Whitechapel Rail Station",
        "stopType": "NaptanRailStation",
        "modes": [
          "overground"
        ],
        "lines": [
          "windrush"
        ]
      },
      {
        "id": "910GWCHAPXR",
        "name": "Whitechapel",
        "stopType": "NaptanRailStation",
        "modes": [
          "elizabeth-line"
        ],
        "lines": [
          "elizabeth"
        ]
      },
      {
        "id": "940GZZLUWPL",
        "name": "Whitechapel Underground Station",
        "stopType": "NaptanMetroStation",
        "modes": [
          "tube"
        ],
        "lines": [
          "district",
          "hammersmith-city"
        ]
      }
    ],
    "lineMemberIds": {
      "district": "940GZZLUWPL",
      "elizabeth": "910GWCHAPXR",
      "hammersmith-city": "940GZZLUWPL",
      "windrush": "910GWCHAPEL"
    }
  }
];

const indexHubs = (hubs: readonly StationHubInfo[]): Readonly<Record<string, StationHubInfo>> => {
  const index: Record<string, StationHubInfo> = {};
  for (const hub of hubs) {
    if (hub.hubId) index[hub.hubId] = hub;
    for (const member of hub.members) {
      index[member.id] = hub;
    }
  }
  return index;
};

export const STATION_HUBS: Readonly<Record<string, StationHubInfo>> = indexHubs(STATION_HUB_LIST);
